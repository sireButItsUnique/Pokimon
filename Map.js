class Block {
	/**
	 * @description Create a block in the game map
	 * @param x X-position of top left of block
	 * @param y Y-position of top left of block
	 * @param w Width of block (multiple of 10)
	 * @param h Height of block (multiple of 10)
	 * @param type Material of block (0: rock, 1: wood, 2: grass)
	 * @param ghostThrough Ghost through block (boolean)
	 * @param opacity Opacity (0 - 1)
	 */
	constructor(x, y, w, h, type, ghostThrough = false, opacity = 1) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.type = type; // 0: rock, 1: wood, 2: grass
		this.ghostThrough = ghostThrough; // Can ghost through block
		this.opacity = opacity; // 0 - 1
	}
}

class SpawnData {
	constructor(name, poki, x, y) {
		this.img = images[name];
		this.poki = poki;
		this.x = x;
		this.y = y;
	}
}

class GameMap {
	constructor() {
		this.playerX = 0;
		this.playerY = 0;
		this.playerW = 60;
		this.playerH = 100;
		this.mapBg = createGraphics(1200, 800, WEBGL);
		this.caughtStarter = true; // TODO implement
		this.gymsCompleted = true; // TODO implement
		this.ballThrown = false;
		this.characters = [];
		this.blocks = [];
		this.pokimonSpawn = [];

		this.pokimonSpawn.push(new SpawnData("Bulbasaur", new Bulbasaur(1), 300, 300));
		let randomPoki = pickSpawnPokimon();
		this.pokimonSpawn.push(new SpawnData(randomPoki[0], randomPoki[1], 350, 1150));
		randomPoki = pickSpawnPokimon();
		this.pokimonSpawn.push(new SpawnData(randomPoki[0], randomPoki[1], 3220, 1370));
		randomPoki = pickSpawnPokimon();
		this.pokimonSpawn.push(new SpawnData(randomPoki[0], randomPoki[1], 2500, 1500));
		randomPoki = pickSpawnPokimon();
		this.pokimonSpawn.push(new SpawnData(randomPoki[0], randomPoki[1], 4700, 3700));
		randomPoki = pickSpawnPokimon();
		this.pokimonSpawn.push(new SpawnData(randomPoki[0], randomPoki[1], 6200, 1850));

		// walls
		this.blocks.push(new Block(800, 100, 1, 200, 3)); // completion path wall (keep at index 0)
		this.blocks.push(new Block(200, 600, 400, 1, 3)); // beginning wall (keep at index 1);

		this.blocks.push(new Block(0, 0, 800, 600, 2, true, 1)); // start

		this.blocks.push(new Block(200, 600, 400, 1000, 1, true, 1)); // path 1
		this.blocks.push(new Block(600, 1200, 1000, 400, 1, true, 1));
		this.blocks.push(new Block(250, 1000, 250, 300, 2, true, 0.7)); // grass

		this.blocks.push(new Block(1600, 800, 1000, 1200, 0, true, 1)); // gym 1 area; exit right; ends x = 2600; ymid = 1400
		this.blocks.push(new Block(1600, 800, 1000, 40, 1, false)); // wall
		this.blocks.push(new Block(1600, 2000, 1000, 40, 1, false)); // wall
		this.blocks.push(new Block(1600, 800, 40, 400, 1, false)); // wall
		this.blocks.push(new Block(1600, 1600, 40, 400, 1, false)); // wall
		this.blocks.push(new Block(2600, 800, 40, 400, 1, false)); // wall
		this.blocks.push(new Block(2600, 1600, 40, 440, 1, false)); // wall
		this.blocks.push(new Block(1600, 1600, 400, 40, 1, false)); // wall
		this.blocks.push(new Block(1960, 1000, 40, 600, 1, false)); // wall
		this.blocks.push(new Block(1960, 1000, 200, 40, 1, false)); // wall
		this.blocks.push(new Block(2300, 800, 40, 1000, 1, false)); // wall

		this.blocks.push(new Block(2600, 1200, 1600, 400, 2, true, 1)); // path 2; ends x = 4200; ymid = 1400
		this.blocks.push(new Block(3200, 1325, 120, 40, 0, false));
		this.blocks.push(new Block(3200, 1435, 120, 40, 0, false));
		this.blocks.push(new Block(3320, 1325, 40, 150, 0, false));

		this.blocks.push(new Block(4200, 1200, 400, 2000, 1, true, 1)); // gym 2 area; exit bottom; ends xmid = 4400; y = 3200
		this.blocks.push(new Block(4200, 1200, 400, 40, 0, false));
		this.blocks.push(new Block(4600, 1200, 40, 2000, 0, false));
		this.blocks.push(new Block(4200, 1600, 40, 1600, 0, false));
		this.blocks.push(new Block(4200, 1600, 40, 1600, 0, false));
		this.blocks.push(new Block(4200, 3200, 100, 40, 2, false, 0.7));
		this.blocks.push(new Block(4500, 3200, 140, 40, 2, false, 0.7));
		this.blocks.push(new Block(4200, 2000, 150, 40, 0, false));
		this.blocks.push(new Block(4450, 2000, 150, 40, 0, false));
		this.blocks.push(new Block(4200, 2800, 150, 40, 0, false));
		this.blocks.push(new Block(4450, 2800, 150, 40, 0, false));

		this.blocks.push(new Block(4300, 3200, 200, 600, 0, true, 1)); // path 3
		this.blocks.push(new Block(4500, 3600, 1000, 200, 0, true, 1));
		this.blocks.push(new Block(4500, 3650, 400, 150, 2, true, 0.8));

		this.blocks.push(new Block(5500, 2000, 400, 1800, 2, true, 1)); // gym 3 area; exit top; ends xmid = 5700; y = 2000
		this.blocks.push(new Block(5500, 3800, 440, 40, 1, false));
		this.blocks.push(new Block(5900, 2000, 40, 1800, 1, false));
		this.blocks.push(new Block(5500, 2000, 40, 1600, 1, false));
		this.blocks.push(new Block(5500, 2000, 40, 1600, 1, false));
		this.blocks.push(new Block(5500, 3000, 150, 40, 1, false));
		this.blocks.push(new Block(5750, 3000, 150, 40, 1, false));
		this.blocks.push(new Block(5500, 2500, 150, 40, 1, false));
		this.blocks.push(new Block(5750, 2500, 150, 40, 1, false));

		this.blocks.push(new Block(5500, 1800, 1000, 200, 0, true, 1)); // path 4
		this.blocks.push(new Block(6300, 1000, 200, 800, 0, true, 1));
		this.blocks.push(new Block(6000, 1830, 400, 150, 2, true, 0.9));

		this.blocks.push(new Block(4300, 600, 2200, 400, 1, true, 1)); // gym 4 area; exit left; ends x = 4300, ymid = 800
		this.blocks.push(new Block(4300, 600, 2200, 40, 0, false));
		this.blocks.push(new Block(6500, 600, 40, 440, 0, false));
		this.blocks.push(new Block(4300, 1000, 2000, 40, 0, false));
		this.blocks.push(new Block(4300, 600, 40, 100, 0, false));
		this.blocks.push(new Block(4300, 900, 40, 100, 0, false));
		this.blocks.push(new Block(5800, 600, 40, 250, 2, false));
		this.blocks.push(new Block(4800, 750, 40, 250, 2, false));

		this.blocks.push(new Block(3300, 700, 1000, 200, 2, true, 1)); // path 5 (back to start area)
		this.blocks.push(new Block(3300, 100, 200, 600, 2, true, 1));
		this.blocks.push(new Block(800, 100, 2500, 200, 0, true, 1));
	}

	playerInBoundary() {
		let inside = false;

		for (let block of this.blocks) {
			if (block.ghostThrough && this.overlaps(block)) {
				inside = true;
			} else if (!block.ghostThrough && this.overlaps(block)) {
				return false;
			}
		}

		// console.log(`inside: ${inside}`);
		return inside;
	}

	/**
	 * @description Check if the player overlaps with an object
	 * @param obj Object to check overlap with
	 * @returns {boolean} True if overlaps, false otherwise
	 * @example
	 * let obj = {x: 100, y: 100, w: 50, h: 50};
	 * let isOverlapping = gameMap.overlaps(obj);
	 * if (isOverlapping) {
	 *   console.log("Player overlaps with the object");
	 * } else {
	 *  console.log("Player does not overlap with the object");
	 * }
	 */
	overlaps(obj) {
		let { playerX, playerY, playerW, playerH } = this;

		return (
			playerX + playerW > obj.x && playerX < obj.x + obj.w && playerY + playerH > obj.y && playerY < obj.y + obj.h
		);
	}

	listenThrowBall() {
		let { playerW, playerH } = this;
		let finalX = mouseX;
		let finalY = mouseY;
		this.ballX = 550 + playerW / 2 + 10;
		this.ballY = 340 + playerH / 2;

		if (keyIsDown(CONTROL)) {
			console.log("yes");

			this.ballThrown = true;

			let speed = 5;

			let dx = finalX - this.ballX;
			let dy = finalY - this.ballY;
			let angle = Math.atan(dy / dx);
			let xSpeed = speed * Math.cos(angle);
			let ySpeed = speed * Math.sin(angle);

			this.ballX += xSpeed;
			this.ballY += ySpeed;
		}
		// else {
		// 	this.ballThrown = false;
		// }
	}

	listenMove() {
		let speed = 25;
		let walking = 0;

		if (keyIsDown(68) || keyIsDown(39)) {
			this.playerX += speed;
			if (!this.playerInBoundary()) this.playerX -= speed;
			// if (this.playerInBoundary(speed, 0)) {
			walking = 1;
			// }
		}
		if (keyIsDown(65) || keyIsDown(37)) {
			this.playerX -= speed;
			if (!this.playerInBoundary()) this.playerX += speed;

			// if (this.playerInBoundary(-speed, 0)) {
			walking = 2;
			// }
		}
		if (keyIsDown(87) || keyIsDown(38)) {
			this.playerY -= speed;
			if (!this.playerInBoundary()) this.playerY += speed;

			// if (this.playerInBoundary(0, -speed)) {
			walking = 3;
			// }
		}
		if (keyIsDown(83) || keyIsDown(40)) {
			this.playerY += speed;
			if (!this.playerInBoundary()) this.playerY -= speed;

			// if (this.playerInBoundary(0, speed)) {
			walking = 4;
			// }
		}

		fill(255, 0);
		strokeWeight(1);
		stroke(255);
		rect(570, 350, 60, 100);
		if (!walking) imageBounded(images["Standing"], 550, 350, 100, 100);
		else if (walking == 1) imageBounded(images["RightWalking"], 550, 350, 100, 100);
		else if (walking == 2) imageBounded(images["LeftWalking"], 550, 350, 100, 100);
		else if (walking == 3) imageBounded(images["Walking"], 550, 350, 100, 100, -PI / 2);
		else if (walking == 4) imageBounded(images["Walking"], 550, 350, 100, 100, PI / 2);

		if (this.gymsCompleted) this.blocks[0].ghostThrough = true;
		if (this.caughtStarter) this.blocks[1].ghostThrough = true;
	}

	renderBlock(block) {
		let { x, y, w, h, type, ghostThrough, opacity } = block;
		let originX = x - this.playerX - 30;
		let originY = y - this.playerY - 50;
		let numTile = w / 40;

		this.mapBg.noStroke();
		this.mapBg.textureMode(NORMAL);
		this.mapBg.textureWrap(REPEAT);
		this.mapBg.tint(255, opacity * 255);

		if (type <= textures.length - 1) this.mapBg.texture(textures[type]);

		this.mapBg.beginShape();
		this.mapBg.vertex(originX, originY, 0, 0, 0); // top left
		this.mapBg.vertex(originX + w, originY, 0, numTile, 0); // top right
		this.mapBg.vertex(originX + w, originY + h, 0, numTile, numTile); // bottom right
		this.mapBg.vertex(originX, originY + h, 0, 0, numTile); // bottom left
		this.mapBg.endShape(CLOSE);
	}

	renderPokimon(pokimon) {
		let { img, x, y } = pokimon;
		let originX = x + 600 - this.playerX - 30;
		let originY = y + 400 - this.playerY - 50;

		image(img, originX, originY);
	}

	render() {
		this.mapBg.background(base_0);

		// render blocks
		for (let block of this.blocks) {
			this.renderBlock(block);
		}

		image(this.mapBg, 0, 0);

		// render pokimon
		for (let pokimon of this.pokimonSpawn) {
			this.renderPokimon(pokimon);
		}

		if (this.ballThrown) image(images["Pokeball"], this.ballX, this.ballY, 20, 20);

		for (let i = 0; i < this.characters.length; i++) {
			//console.log(characters[i]);
			this.characters[i].render(this.playerX, this.playerY);
		}
	}
}
