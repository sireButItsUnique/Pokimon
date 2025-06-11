class Character {
	constructor(x, y, img, trainer, exitX, exitY) {
		this.x = x;
		this.y = y;
		this.w = 60;
		this.h = 100;
		this.img = img;
		this.trainer = trainer;
		this.canBattle = true;
		this.exitX = exitX;
		this.exitY = exitY;
	}

	render(mapX, mapY) {
		fill(255);
		//rect(this.x + 600 - mapX - 30, this.y + 400 - mapY - 50, this.w, this.h);
		imageBounded(this.img, this.x + 600 - mapX - 50, this.y + 400 - mapY - 60, this.w + 40, this.h);
	}
}
