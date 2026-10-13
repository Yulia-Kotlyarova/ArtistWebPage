import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronUp, ChevronDown } from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import picturesInfo from "@/data/images.json";
import { ArtworkCard, type ArtworkCardList } from "@/entities/artwork";
import { Subtitle } from "@/shared/subtitle";

const TITLES: Record<string, string> = {
  landscape: "Landscape",
  "still-life": "Still life",
  abstract: "Abstract",
  cats: "Cats",
};

export function GallerySwiper() {
  const { slug } = useParams<{ slug: string }>();
  const title = (slug && TITLES[slug]) || "Gallery";

  const imageList: ArtworkCardList = useMemo(() => {
    if (!Object.keys?.(picturesInfo)) return [];

    const result: ArtworkCardList = [];
    Object.keys(picturesInfo)?.forEach((key) => {
      const picId = key;
      const [slugKey, imageId] = key.split("-");

      if (!imageId || !slugKey || !slug) return;
      if (slugKey !== slug) return;

      const { name, size, materials, isSold } = picturesInfo[picId as keyof typeof picturesInfo];

      result.push({
        src: `/images/${slug}/${slug}-${imageId}/${slug}-${imageId}-full.jpeg`,
        alt: `${title} ${imageId}`,
        title: name,
        size,
        materials,
        isSold,
        picId,
      });
    });

    return result;
  }, [picturesInfo, slug, title]);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const safeThumbs =
    thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative flex w-full gap-6">
      {/* MAIN SWIPER */}
      <div className="relative flex-1">
        {/* arrows */}
        <div className="pointer-events-none absolute inset-y-0 right-2 z-10 flex flex-col justify-between py-6">
          <button
            ref={prevRef}
            type="button"
            className="pointer-events-auto cursor-pointer text-muted-foreground"
          >
            <ChevronUp size={36} strokeWidth={1.25} />
          </button>

          <button
            ref={nextRef}
            type="button"
            className="pointer-events-auto cursor-pointer text-muted-foreground"
          >
            <ChevronDown size={36} strokeWidth={1.25} />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Thumbs, Keyboard]}
          direction="vertical"
          keyboard={{ enabled: true }}
          thumbs={{ swiper: safeThumbs }}
          navigation={{ enabled: true }}
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation;

            if (navigation && typeof navigation !== "boolean") {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }}
          style={{ height: "70vh" }}
          className="w-full"
        >
          {imageList.map((img) => (
            <SwiperSlide key={img.src}>
              <div className="group relative mx-auto max-w-[1100px] overflow-hidden bg-muted/20">
                {/* Image */}
                <ArtworkCard
                  title={img?.title}
                  src={img.src}
                  alt={img.alt}
                  swiperClassName="h-[70vh] w-full object-contain"
                />

                {/* overlay */}
                <div
                  className={[
                    "pointer-events-none absolute inset-0",
                    "hidden group-hover:flex",
                    "items-end",
                    "bg-black/40",
                  ].join(" ")}
                  aria-hidden
                >
                  <div className="w-full p-6">
                    <Subtitle as={"div"} className="space-y-2 text-white/85">
                      {img?.title && <h3>{img.title}</h3>}

                      {(img.size || img.materials) && (
                        <h4>
                          {img.size && <span>{img.size}</span>}
                          {img.materials && <span>• {img.materials}</span>}
                        </h4>
                      )}

                      {img?.title && (
                        <h4>{img.isSold ? "Sold" : "Available"}</h4>
                      )}
                    </Subtitle>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* THUMBS (RIGHT SIDE) */}
      <div className="w-32">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          direction="vertical"
          freeMode
          watchSlidesProgress
          spaceBetween={10}
          slidesPerView={6}
          centeredSlides={false}
          className="h-[70vh]"
        >
          {imageList.map((img) => (
            <SwiperSlide key={`${img.src}-thumb`}>
              <button
                type="button"
                className="block w-full cursor-pointer bg-muted/20"
                aria-label={`Open ${img.alt}`}
              >
                <ArtworkCard
                  title={img.title}
                  src={img.src}
                  alt={img.alt}
                  swiperClassName="h-24 w-full object-cover"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
