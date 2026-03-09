import { useEffect, useRef } from "react";

type WatermarkOptions = {
	text: string;
};

type WatermarkedCanvasProps = {
	src: string;
	alt?: string;
	className?: string;
	crossOrigin?: "" | "anonymous" | "use-credentials";
	watermark: WatermarkOptions;
	ready?: boolean;
	setReady: (value: boolean) => void;
	onError: (value: boolean) => void;
	onLoad: (value: boolean) => void;
};

export function WatermarkedCanvasImage({
	                                       src,
	                                       alt,
	                                       className,
	                                       crossOrigin = "anonymous",
	                                       watermark,
	                                       onError,
	                                       onLoad,
	                                       ready,
	                                       setReady
                                       }: WatermarkedCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!src) return;

		const img = new Image();
		// Если изображение с другого домена — нужен корректный CORS, иначе canvas станет "tainted"
		// и ты не сможешь экспортировать (toDataURL/toBlob). Но показывать на странице обычно можно.
		if (crossOrigin !== "") img.crossOrigin = crossOrigin;

		img.decoding = "async";
		img.loading = "eager";

		img.onload = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));

			const w = img.naturalWidth;
			const h = img.naturalHeight;

			canvas.width = w * dpr;
			canvas.height = h * dpr;

			canvas.style.width = "100%";
			canvas.style.height = "100%";

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);

			ctx.drawImage(img, 0, 0, w, h);
			drawWatermark(ctx, h, watermark.text);

			setReady(true);
			onLoad(true);
		};

		img.onerror = () => {
			onError(true);
		};

		img.src = src;

	}, [src, crossOrigin, watermark, onError, onLoad]);

	return (
		<div className="relative h-full w-full">
			<canvas
				ref={canvasRef}
				className={[
					className ?? "h-full w-full",
					"select-none",
				].join(" ")}
				aria-label={alt}
				onContextMenu={(e) => e.preventDefault()}
				onDragStart={(e) => e.preventDefault()}
			/>

			{ready && (
				<div
					className="absolute inset-0 cursor-default"
					aria-hidden="true"
					onContextMenu={(e) => e.preventDefault()}
					onDragStart={(e) => e.preventDefault()}
					onMouseDown={(e) => e.preventDefault()}
					onPointerDown={(e) => e.preventDefault()}
					onTouchStart={(e) => e.preventDefault()}
				/>
			)}
		</div>
	);
}

function drawWatermark(
	ctx: CanvasRenderingContext2D,
	h: number,
	text: string
) {
	const padding = 24;

	ctx.save();

	ctx.globalAlpha = 0.65;
	ctx.font = "16px system-ui";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";

	ctx.fillStyle = "white";

	ctx.fillText(text, padding, h - padding);

	ctx.restore();
}
