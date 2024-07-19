type Params = {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	position: [x: number, y: number];
	width: number;
	height: number;
	velocity: [x: number, y: number];
};

export class Sprite {
	params: Params;

	constructor(params: Params) {
		this.params = params;
	}

	draw() {
		const { ctx, position, width, height } = this.params;
		ctx.fillStyle = "red";
		ctx.fillRect(position[0], position[1], width, height);
	}

	update() {
		this.draw();
		this.params.position[1] += this.params.velocity[1];

		if (
			this.params.position[1] + this.params.height + this.params.velocity[1] >=
			this.params.canvas.height
		) {
			this.params.velocity[1] = 0;
		}
	}
}
