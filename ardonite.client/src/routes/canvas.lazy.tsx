import { Sprite } from "@/lib/sprite";
import { createLazyFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createLazyFileRoute("/canvas")({
	component: Page,
});

function Page() {
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const playerRef = React.useRef<Sprite>(null);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) throw new Error("Canvas is null");
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Canvas context is null");

		let player = playerRef.current;
		if (player) throw new Error("Player already initialized");

		player = new Sprite({
			canvas,
			ctx,
			position: [0, 0],
			velocity: [0, 3],
			height: 100,
			width: 50,
		});

		player.draw();

		function animate(
			canvas: HTMLCanvasElement,
			ctx: CanvasRenderingContext2D,
			sprite: Sprite,
		) {
			window.requestAnimationFrame(() => animate(canvas, ctx, sprite));
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			sprite.update();
			console.log("test");
		}

		animate(canvas, ctx, player);

		return () => {
			console.info("cleanup");
		};
	}, []);

	return <canvas id="canvas" ref={canvasRef} width={1024} height={576} />;
}
