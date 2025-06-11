class Gui {
	constructor(player) {
		this.width = 1200;
		this.height = 800;
		this.player = player;
		this.showTeam = false;
		this.showSaved = false;
		this.showInfo = false;
		this.showIdx = -1;
		this.playerPos = []; // x, y
	}

	render() {
		fill(tone_1);
		rect(0, 100, 100, 600, 0, 10, 10, 0);

		let labels = ["Team", "Save", "Info"];
		for (let i = 0; i < labels.length; i++) {
			fill(tone_2);
			stroke(highlight_2);
			strokeWeight(1);
			rect(10, 110 + i * 50, 80, 40, 5);
			fill(255);
			textAlign(CENTER, CENTER);
			textSize(16);
			strokeWeight(0);
			text(labels[i], 50, 130 + i * 50);
		}
	}

	pushPlayerPos(x, y) {
		this.playerPos = [];
		this.playerPos.push(x);
		this.playerPos.push(y);
	}

	renderTeam(team) {
		// bg
		strokeWeight(1);
		stroke(255);
		fill(tone_1);
		rect(100, 100, 1000, 380, 10);

		if (this.showIdx == -1) {
			// team
			for (let i = 0; i < team.length; i++) {
				let x1 = 135 + (i % 2) * 480;
				let y1 = 120 + floor(i / 2) * 120;

				fill(base_1);
				strokeWeight(1);
				stroke(255);
				if (mouseX > x1 && mouseX < x1 + 450 && mouseY > y1 && mouseY < y1 + 100) stroke(highlight_2);
				rect(x1, y1, 450, 100, 10);

				if (team[i].maxHp <= 0) tint(255, 100);
				imageBounded(images[team[i].name], x1 + 10, y1 + 10, 80, 80);
				tint(255, 255);

				strokeWeight(0);
				fill(255);
				textAlign(LEFT, TOP);
				if (team[i].maxHp <= 0) text(`${team[i].name} - Fainted`, x1 + 100, y1 + 20);
				else text(`${team[i].name} - Lvl ${team[i].level}`, x1 + 100, y1 + 20);
				fill(base_2);
				rect(x1 + 100, y1 + 50, 300, 25, 15);
				fill(highlight_2);
				if (team[i].maxHp > 0) rect(x1 + 102.5, y1 + 52.5, 295 * (team[i].maxHp / team[i].maxHp), 20, 15);
			}
		} else {
			// show single pokemon's stats (moves, stats, level, type, etc)
			let x1 = 135;
			let y1 = 120;
			fill(base_1);
			strokeWeight(1);
			stroke(255);
			rect(x1, y1, 925, 325, 10);
			imageBounded(images[team[this.showIdx].name], x1 + 10, y1 + 10, 80, 80);
			strokeWeight(0);
			fill(255);
			textAlign(LEFT, TOP);
			textSize(50);
			text(`${team[this.showIdx].name} - Lvl ${team[this.showIdx].level}`, x1 + 100, y1 + 20);

			// put types in squares with colored backgrounds
			let type = team[this.showIdx].type1;
			let typeX = x1 + 100;
			let typeY = y1 + 80;
			fill(typeColor[type]);
			rect(typeX, typeY, 90, 40, 10);
			fill(255);
			textAlign(CENTER, CENTER);
			textSize(20);
			text(type, typeX + 45, typeY + 20);
			type = team[this.showIdx].type2;
			if (typeColor[type] != undefined) {
				typeX += 100;
				fill(typeColor[type]);
				rect(typeX, typeY, 90, 40, 10);
				fill(255);
				text(type, typeX + 45, typeY + 20);
			}

			// draw stats
			let { hp, atk, spAtk, def, spDef, spd } = team[this.showIdx].getStats();
			let stats = [
				{ name: "HP", value: hp, max: 511 },
				{ name: "Atk", value: atk, max: 255 },
				{ name: "Sp. Atk", value: spAtk, max: 255 },
				{ name: "Def", value: def, max: 255 },
				{ name: "Sp. Def", value: spDef, max: 255 },
				{ name: "Spd", value: spd, max: 255 },
			];
			let statX = x1 + 100;
			let statY = y1 + 140;
			for (let i = 0; i < stats.length; i++) {
				let col = i % 3;
				let row = floor(i / 3);
				let offsetX = col * 220;
				let offsetY = row * 50;

				fill(base_2);
				rect(statX + offsetX, statY + offsetY, 200, 30, 10);

				fill(highlight_1);
				rect(statX + offsetX + 2.5, statY + offsetY + 2.5, 195 * (stats[i].value / stats[i].max), 25, 10);

				fill(255);
				textAlign(LEFT, CENTER);
				textSize(20);
				text(`${stats[i].name}: ${stats[i].value}`, statX + offsetX + 10, statY + offsetY + 15);
			}

			// fill out moves below stats
			let moves = team[this.showIdx].moves;
			let moveX = x1 + 100;
			let moveY = y1 + 260;
			for (let i = 0; i < moves.length; i++) {
				let offsetX = i * 170;
				let offsetY = 0;

				fill(typeColor[moves[i].type]);
				rect(moveX + offsetX, moveY + offsetY, 150, 40, 10);

				fill(255);
				textAlign(LEFT, CENTER);
				textSize(20);
				text(moves[i].name, moveX + offsetX + 10, moveY + offsetY + 20);
			}
		}
	}

	renderSaved() {
		strokeWeight(1);
		stroke(255);
		fill(tone_1);
		rect(100, 150, 300, 100, 10);
		textSize(30);
		noStroke();
		fill("#eee");
		text("Game saved!", 250, 200);
	}

	renderInfo() {
		strokeWeight(1);
		stroke(255);
		fill(tone_1);
		rect(100, 200, 1000, 300, 10);
		textSize(30);
		noStroke();
		fill("#eee");
		textAlign(LEFT);
		text("Instructions:", 110, 210);
	}

	listen() {
		if (mouseX > 10 && mouseX < 90 && mouseY > 110 && mouseY < 150) {
			this.showTeam = !this.showTeam;
			this.showIdx = -1;
		}

		if (mouseX > 10 && mouseX < 90 && mouseY > 160 && mouseY < 200) {
			this.showSaved = !this.showSaved;
			this.saveGame();
		}

		if (mouseX > 10 && mouseX < 90 && mouseY > 210 && mouseY < 250) {
			this.showInfo = !this.showInfo;
			
			if (this.showInfo) {
				this.renderInfo();
			}
		}
	}

	saveGame() {
		let team = this.player.team;
		let arr = [
			{team: team},
			{pos: this.playerPos}
		];

		localStorage.clear();
		localStorage.setItem("data", JSON.stringify(arr));
	}

	listenForTeam(team) {
		if (this.showIdx != -1) return;
		for (let i = 0; i < team.length; i++) {
			let x1 = 135 + (i % 2) * 480;
			let y1 = 120 + floor(i / 2) * 120;
			if (mouseX > x1 && mouseX < x1 + 450 && mouseY > y1 && mouseY < y1 + 100) {
				this.showIdx = i;
				return;
			}
		}
	}
}
