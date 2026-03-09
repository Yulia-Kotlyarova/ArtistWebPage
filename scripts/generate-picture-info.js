// src/helpers/generate-picture-info.js
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const IMAGES_DIR = path.resolve(ROOT, "public/images");
const OUTPUT_FILE = path.resolve(ROOT, "src/data/images.json");

// какие расширения считаем изображениями
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : full;
  });
}

function readExistingJson(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    console.warn("⚠️ images.json exists but could not be parsed, starting fresh");
    return {};
  }
}

// Заполняем только если значение "пустое":
// - undefined / null / ""
// (false/0 считаются валидными и НЕ перетираются)
function mergeIfEmpty(existing, incoming) {
  const result = { ...existing };

  for (const key of Object.keys(incoming)) {
    const current = existing?.[key];
    const isEmpty = current === undefined || current === null || current === "";
    if (isEmpty) result[key] = incoming[key];
  }

  return result;
}

function isImageFile(filePath) {
  return IMAGE_EXTS.has(path.extname(filePath).toLowerCase());
}

// ✅ подходит ли файл под правило "имя файла начинается с имени папки"
function matchesFolderPrefix(filePath, folderName) {
  const base = path.basename(filePath).toLowerCase();
  const folder = String(folderName).toLowerCase();

  // пример: landscape-1-full.jpeg -> startsWith("landscape-1-")
  return base.startsWith(folder + "-") && isImageFile(filePath);
}

// (опционально) если в папке несколько файлов, берём самый "full"-похожий
function pickBestFile(files, folderName) {
  const matched = files.filter((f) => matchesFolderPrefix(f, folderName));
  if (matched.length === 0) return null;

  // приоритет: содержит "-full" или "full"
  const fullFirst = [...matched].sort((a, b) => {
    const A = path.basename(a).toLowerCase();
    const B = path.basename(b).toLowerCase();
    const aScore = (A.includes("-full") ? 2 : 0) + (A.includes("full") ? 1 : 0);
    const bScore = (B.includes("-full") ? 2 : 0) + (B.includes("full") ? 1 : 0);
    return bScore - aScore;
  });

  return fullFirst[0];
}

if (!fs.existsSync(IMAGES_DIR)) {
  throw new Error(`Images directory not found: ${IMAGES_DIR}`);
}

const existingData = readExistingJson(OUTPUT_FILE);
const result = { ...existingData };

const allFiles = walk(IMAGES_DIR);

// 1) старый кейс cover-full.jpeg
const coverFiles = allFiles.filter((f) => path.basename(f) === "cover-full.jpeg");

// 2) новый кейс: <folder>/<folder>-*.{jpg,jpeg,png,webp}
// Чтобы корректно выбрать один файл на папку, сначала сгруппируем файлы по родительской папке
const filesByParentDir = new Map();
for (const f of allFiles) {
  if (!isImageFile(f)) continue;
  const dir = path.dirname(f);
  if (!filesByParentDir.has(dir)) filesByParentDir.set(dir, []);
  filesByParentDir.get(dir).push(f);
}

// --- обработка cover-full.jpeg ---
for (const filePath of coverFiles) {
  const parent = path.basename(path.dirname(filePath)); // "cover"
  const grandParent = path.basename(path.dirname(path.dirname(filePath))); // "<slug>"
  const name = parent === "cover" ? grandParent : parent;

  const generated = { name, size: "", materials: "", isSold: true };

  result[name] = result[name] ? mergeIfEmpty(result[name], generated) : generated;
}

// --- обработка нового правила (имя файла начинается с имени папки) ---
for (const [dir, files] of filesByParentDir.entries()) {
  const parentFolderName = path.basename(dir);

  // пропускаем папки cover — их уже обработали выше
  if (parentFolderName.toLowerCase() === "cover") continue;

  const best = pickBestFile(files, parentFolderName);
  if (!best) continue;

  // ключ = имя папки (landscape-1)
  const name = parentFolderName;

  const generated = { name, size: "", materials: "", isSold: true };

  result[name] = result[name] ? mergeIfEmpty(result[name], generated) : generated;
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), "utf-8");

console.log(`✔ images.json generated • total: ${Object.keys(result).length}`);
