/* states:
	move
	switch
	info
	turn 
*/

class Action {
	constructor(start, col, speed) {
		this.start = start;
		this.col = col;
		this.x = start;
		this.y = randInt(350, 400);
		this.speed = speed;
	}

	render() {
		let { x, y, col, speed } = this;
		fill(col);
		circle(x, y, 50);
		this.x += speed;
	}
}

class Battle {
	constructor({ plr, opp, exitX, exitY }) {
		this.plr = plr;
		this.opp = opp;
		this.plrTeam = plr.team;
		this.oppTeam = opp.team;
		this.plrActive = plr.team[0];
		this.oppActive = opp.team[0];
		this.plrIdx = 0;
		this.oppIdx = 0;
		this.actionQueue = [];
		this.actions = [];
		this.exitX = exitX;
		this.exitY = exitY;
		for (let i = 0; i < this.plrTeam.length; i++) {
			this.plrTeam[i].curHp = this.plrTeam[i].getStats().hp;
			this.plrTeam[i].maxHp = this.plrTeam[i].getStats().hp;
		}
		for (let i = 0; i < this.oppTeam.length; i++) {
			this.oppTeam[i].curHp = this.oppTeam[i].getStats().hp;
			this.oppTeam[i].maxHp = this.oppTeam[i].getStats().hp;
		}
		this.state = "move";
		this.resultData = {
			plr: plr,
			opp: opp,
			rewardExp: 0,
			won: false,
		};
	}

	runAction() {
		if (this.actionQueue.length <= 0) return;

		let { plrActive, oppActive, plrIdx, oppIdx } = this;
		let { pokimon, move, type, newIdx, res } = this.actionQueue[0];

		if (type == "switch") {
			this.plrActive = this.plrTeam[newIdx];
			this.plrIdx = newIdx;
			return;
		}

		if (type == "sub") {
			this.oppIdx = newIdx;
			this.oppActive = this.oppTeam[this.oppIdx];
			return;
		}

		if (type == "move") {
			// animations
			this.actions = [];
			if (pokimon == plrActive) this.actions.push(new Action(400, typeColor[move.type], 16));
			else this.actions.push(new Action(800, typeColor[move.type], -16));

			// damage
			if (pokimon == plrActive) this.oppTeam[oppIdx].curHp -= getDmg(move, plrActive, oppActive);
			else this.plrTeam[plrIdx].curHp -= getDmg(move, oppActive, plrActive);
			return;
		}

		if (type == "endbattle") {
			// calc reward exp
			this.resultData.rewardExp = 0;
			for (let i = 0; i < this.oppTeam.length; i++) {
				if (this.oppTeam[i].curHp > 0) continue; // don't reward for alive pokimon
				let xp = this.oppTeam[i].level * 67;
				xp /= 2;
				xp *= 1.5;
				this.resultData.rewardExp += Math.floor(xp);
			}
			if (res == "Won") this.resultData.won = true;

			this.state = "end";
			return;
		}
	}

	pushOppSub() {
		let { plrActive, oppActive, plrIdx, oppIdx } = this;
		let { plrTeam, oppTeam } = this;

		// switch
		console.log("defeated!");
		console.log(this.actionQueue);
		if (oppIdx >= oppTeam.length - 1) {
			this.actionQueue.push({
				type: "text",
				txt: `You have defeated ${this.opp.name}!`,
			});
			this.actionQueue.push({
				type: "endbattle",
				res: "Won",
			});
			return;
		}
		this.actionQueue.push({
			type: "sub",
			txt: `Go ${oppTeam[oppIdx + 1].name}!`,
			newIdx: oppIdx + 1,
		});
	}

	pushAttack(attacking, defending, move) {
		// move
		this.actionQueue.push({
			type: "move",
			pokimon: attacking,
			move: move,
			txt: `${attacking.name} used ${move.name}!`,
		});

		// type effectiveness
		let effectiveness = getTypeEffectiveness(move.type, defending.type1);
		effectiveness *= getTypeEffectiveness(move.type, defending.type2);
		if (effectiveness != 1) {
			let text = "It had no effect...";
			if (effectiveness > 0 && effectiveness < 1) text = "It wasn't very effective...";
			if (effectiveness > 1) text = "It was super effective!";
			this.actionQueue.push({
				type: "text",
				txt: text,
			});
		}
	}

	pushRound(plrMove, oppMove, plrGoesFirst) {
		let { plrActive, oppActive, plrIdx, oppIdx } = this;

		if (plrGoesFirst) {
			// plr move
			this.pushAttack(plrActive, oppActive, plrMove);

			// fainted
			if (getDmg(plrMove, plrActive, oppActive) >= this.oppTeam[oppIdx].curHp) {
				this.actionQueue.push({
					type: "text",
					txt: `${oppActive.name} has fainted!`,
				});
				this.pushOppSub();
				this.runAction();
				return;
			}

			// opp move
			this.pushAttack(oppActive, plrActive, oppMove);

			// fainted
			if (getDmg(oppMove, oppActive, plrActive) >= this.plrTeam[plrIdx].curHp) {
				this.actionQueue.push({
					type: "text",
					txt: `${plrActive.name} has fainted!`,
				});

				let alive = 0;
				for (let i = 0; i < this.plrTeam.length; i++) {
					if (this.plrTeam[i].curHp > 0) {
						alive++;
					}
				}
				if (alive <= 1) {
					this.actionQueue.push({
						type: "text",
						txt: `You have lost the battle!`,
					});
					this.actionQueue.push({
						type: "endbattle",
						res: `Lost`,
					});
				}
				this.runAction();
				return;
			}
		} else {
			// opp move
			this.pushAttack(oppActive, plrActive, oppMove);

			// fainted
			if (getDmg(oppMove, oppActive, plrActive) >= this.plrTeam[plrIdx].curHp) {
				this.actionQueue.push({
					type: "text",
					txt: `${plrActive.name} has fainted!`,
				});
				let alive = 0;
				for (let i = 0; i < this.plrTeam.length; i++) {
					if (this.plrTeam[i].curHp > 0) {
						alive++;
					}
				}
				if (alive <= 1) {
					this.actionQueue.push({
						type: "text",
						txt: `You have lost the battle!`,
					});
					this.actionQueue.push({
						type: "endbattle",
						res: `Lost`,
					});
				}

				this.runAction();
				return;
			}

			// plr move
			this.pushAttack(plrActive, oppActive, plrMove);

			// fainted
			if (getDmg(plrMove, plrActive, oppActive) >= this.oppTeam[oppIdx].curHp) {
				this.actionQueue.push({
					type: "text",
					txt: `${oppActive.name} has fainted!`,
				});
				this.pushOppSub();
				this.runAction();
				return;
			}
		}

		// start thing
		this.runAction();
	}

	makeMove(idx) {
		let { plrActive, oppActive, plrTeam, oppTeam } = this;
		let plrStats = plrActive.getStats();
		let oppStats = oppActive.getStats();

		// order moves correctly in queue
		let oppMove = randInt(0, oppActive.moves.length - 1);
		if (plrActive.moves[idx].priority > oppActive.moves[oppMove].priority) {
			this.pushRound(plrActive.moves[idx], oppActive.moves[oppMove], true);
		} else if (plrActive.moves[idx].priority < oppActive.moves[oppMove].priority) {
			this.pushRound(plrActive.moves[idx], oppActive.moves[oppMove], false);
		} else if (plrStats.spd >= oppStats.spd) {
			this.pushRound(plrActive.moves[idx], oppActive.moves[oppMove], true);
		} else {
			this.pushRound(plrActive.moves[idx], oppActive.moves[oppMove], false);
		}
		setTimeout(() => {
			this.state = "turn";
		}, 100);
	}

	makeSwitch(idx) {
		let { plrActive, oppActive, plrTeam, oppTeam } = this;

		// switching
		this.actionQueue.push({
			type: "text",
			txt: `Come back, ${plrActive.name}!`,
		});
		this.actionQueue.push({
			type: "switch",
			txt: `Go ${plrTeam[idx].name}!`,
			newIdx: idx,
		});

		// opp move
		let oppMove = randInt(0, oppActive.moves.length - 1);
		this.pushAttack(oppActive, plrTeam[idx], oppActive.moves[oppMove]);

		// fainted
		if (getDmg(oppActive.moves[oppMove], oppActive, plrTeam[idx]) >= this.plrTeam[idx].curHp) {
			this.actionQueue.push({
				type: "text",
				txt: `${plrTeam[idx].name} has fainted!`,
			});
		}
		this.runAction();

		setTimeout(() => {
			this.state = "turn";
		}, 100);
	}

	renderMove() {
		// force switch if fainted
		if (this.plrActive.curHp <= 0) {
			this.state = "switch";
			return;
		}

		// draw moves
		for (let i = 0; i < this.plrActive.moves.length; i++) {
			let move = this.plrActive.moves[i];

			// bg
			strokeWeight(1);
			stroke(tone_1);
			if (mouseX > 145 + 230 * i && mouseX < 145 + 230 * i + 220 && mouseY > 620 && mouseY < 680)
				stroke(highlight_2);
			fill(typeColor[move.type]);
			rect(145 + 230 * i, 620, 220, 60, 5);
			strokeWeight(0);

			// text
			fill(base_2);
			textAlign(CENTER, TOP);
			textSize(25);
			text(move.name, 145 + 230 * i, 630, 220, 60);
			textAlign(LEFT, BOTTOM);
			textSize(15);
			text(move.type, 150 + 230 * i, 650, 220, 30);
		}

		// draw empty moves
		for (let i = this.plrActive.moves.length; i < 4; i++) {
			// bg
			strokeWeight(1);
			stroke(highlight_2);
			fill(0, 0, 0, 0);
			rect(145 + 230 * i, 620, 220, 60, 5);

			// text
			strokeWeight(0);
			fill(highlight_2);
			textAlign(CENTER, TOP);
			textSize(25);
			text("None", 145 + 230 * i, 630, 220, 60);
		}
	}

	renderTurn() {
		if (this.actionQueue.length <= 0) {
			this.state = "move";
			return;
		}
		let { pokimon, move, txt } = this.actionQueue[0];

		// turn text
		fill(255);
		textAlign(LEFT, CENTER);
		textSize(25);
		text(txt, 145, 620, 600, 60);
		strokeWeight(0);
		textSize(15);
		text("(Click anywhere to continue)", 145, 650, 600, 60);

		// turn animations
		for (let i = 0; i < this.actions.length; i++) {
			this.actions[i].render();
			if (Math.abs(this.actions[i].x - this.actions[i].start) > 500) {
				this.actions.splice(i, 1);
				i--;
			}
		}
	}

	renderSwitch() {
		let { plrTeam } = this;

		// text
		fill(255);
		textAlign(LEFT, CENTER);
		textSize(25);
		text("Choose a Pokimon to switch to:", 145, 620, 600, 60);

		// bg
		strokeWeight(1);
		stroke(255);
		fill(tone_1);
		rect(100, 100, 1000, 380, 10);

		// team
		for (let i = 0; i < plrTeam.length; i++) {
			let x1 = 135 + (i % 2) * 480;
			let y1 = 120 + floor(i / 2) * 120;

			fill(base_1);
			strokeWeight(1);
			stroke(255);
			if (mouseX > x1 && mouseX < x1 + 450 && mouseY > y1 && mouseY < y1 + 100) stroke(highlight_2);
			rect(x1, y1, 450, 100, 10);

			if (plrTeam[i].curHp <= 0) tint(255, 100);
			imageBounded(images[plrTeam[i].name], x1 + 10, y1 + 10, 80, 80);
			tint(255, 255);

			strokeWeight(0);
			fill(255);
			textAlign(LEFT, TOP);
			if (plrTeam[i].curHp <= 0) text(`${plrTeam[i].name} - Fainted`, x1 + 100, y1 + 20);
			else text(`${plrTeam[i].name} - Lvl ${plrTeam[i].level}`, x1 + 100, y1 + 20);
			fill(base_2);
			rect(x1 + 100, y1 + 50, 300, 25, 15);
			fill(highlight_2);
			if (plrTeam[i].curHp > 0) rect(x1 + 102.5, y1 + 52.5, 295 * (plrTeam[i].curHp / plrTeam[i].maxHp), 20, 15);
		}
	}

	/**
	 * Render the battle screen.
	 * @description This function renders the battle screen, including the player's and opponent's Pokemon, their health bars, and the GUI for moves and actions.
	 */
	render() {
		let { state, plrActive, oppActive, plrTeam, oppTeam, plrIdx, oppIdx } = this;

		background(base_0);
		fill(255);
		let imgWidth = 300;

		// player pokemon
		if (plrTeam[plrIdx].curHp > 0) {
			push();
			translate(imgWidth + 100, 0);
			scale(-1, 1);
			imageBounded(images[plrActive.name], 0, 250, imgWidth, 300);
			pop();

			// player healthbar
			fill(base_2);
			rect(100, 225, 400, 25, 15);
			fill(highlight_2);
			rect(105, 232.5, 390 * (plrTeam[plrIdx].curHp / plrTeam[plrIdx].maxHp), 10, 15);
			fill(255);
			textAlign(LEFT, CENTER);
			textSize(20);
			text(`${plrActive.name} - Lvl ${plrActive.level}`, 100, 200, 1500, 25);

			for (let i = 0; i < plrTeam.length; i++) {
				if (plrTeam[i].curHp <= 0) tint(255, 128);
				imageBounded(images["Pokeball"], 100 + i * 50, 150, 40, 40);
				tint(255, 255);
			}
		}

		// opp pokemon
		if (oppTeam[oppIdx].curHp > 0) {
			imageBounded(images[oppActive.name], 1200 - imgWidth - 100, 250, imgWidth, 300);

			// opp healthbar
			fill(base_2);
			rect(1200 - 100 - 400, 225, 400, 25, 15);
			fill(highlight_2);
			rect(1200 - 105 - 390, 232.5, 390 * (oppTeam[oppIdx].curHp / oppTeam[oppIdx].maxHp), 10, 15);
			fill(255);
			textAlign(RIGHT, CENTER);
			textSize(20);
			text(`${oppActive.name} - Lvl ${oppActive.level}`, 1200 - 100 - 1500, 200, 1500, 25);

			for (let i = 0; i < oppTeam.length; i++) {
				if (oppTeam[i].curHp <= 0) tint(255, 128);
				imageBounded(images["Pokeball"], 700 + i * 50, 150, 40, 40);
				tint(255, 255);
			}
		}

		// draw gui
		strokeWeight(1);
		stroke(255);
		fill(tone_1);
		rect(100, 600, 1000, 180, 10);
		if (state == "move") this.renderMove();
		if (state == "turn") this.renderTurn();
		if (state == "switch") this.renderSwitch();
		let labels = ["Move", "Switch", "Info", "Run"];
		for (let i = 0; i < 4; i++) {
			// bg
			strokeWeight(1);
			stroke(255);
			if (mouseX > 145 + 230 * i && mouseX < 145 + 230 * i + 220 && mouseY > 700 && mouseY < 760)
				stroke(highlight_2);
			fill(base_1);
			rect(145 + 230 * i, 700, 220, 60, 5);

			// text
			strokeWeight(0);
			fill(255);
			textAlign(CENTER, TOP);
			textSize(25);
			text(labels[i], 145 + 230 * i, 720, 220, 60);
			textAlign(LEFT, BOTTOM);
		}
	}

	listenForMove() {
		for (let i = 0; i < this.plrActive.moves.length; i++) {
			let x = 145 + 230 * i;
			let y = 620;
			if (mouseX > x && mouseX < x + 220 && mouseY > y && mouseY < y + 60) this.makeMove(i);
		}
	}

	listenForTurn() {
		this.actionQueue.shift();
		this.runAction();
	}

	listenForSwitch() {
		let { plrTeam } = this;
		for (let i = 0; i < plrTeam.length; i++) {
			let x1 = 135 + (i % 2) * 480;
			let y1 = 120 + floor(i / 2) * 120;
			if (plrTeam[i].curHp <= 0) continue;
			if (mouseX > x1 && mouseX < x1 + 450 && mouseY > y1 && mouseY < y1 + 100) {
				this.makeSwitch(i);
				return;
			}
		}
	}

	listenForMenu() {
		let labels = ["move", "switch", "info", "end"];
		for (let i = 0; i < 4; i++) {
			if (mouseX > 145 + 230 * i && mouseX < 145 + 230 * i + 220 && mouseY > 700 && mouseY < 760)
				this.state = labels[i];
		}
	}
}

class Results {
	constructor({ plr, opp, won = true, rewardExp }) {
		this.plr = plr;
		this.opp = opp;
		this.won = won;
		this.rewardExp = rewardExp;
		this.show = true;

		this.oldTeam = plr.team.map((p) => ({ ...p })); // Store old team for comparison
		let { team } = plr;
		for (let i = 0; i < team.length; i++) {
			team[i].xp += rewardExp;
			team[i].levelUp();
			if (team[i].evoLvl != undefined && team[i].level >= team[i].evoLvl) team[i] = team[i].evolution();
		}
		this.newTeam = team;
	}

	render() {
		let { rewardExp, plr, opp, won } = this;
		let startX = 600 - 250;
		let c = color(tone_1);
		c.setAlpha(120);
		fill(c);

		rect(startX, 100, 500, 600, 10);
		fill(highlight_1);
		textAlign(CENTER, CENTER);
		textSize(40);
		text("X", startX, 110, 50, 50);

		fill(255);
		textAlign(CENTER, CENTER);
		textSize(25);
		text(`You have ${won ? "defeated" : "been defeated by"} ${opp.name}!`, startX, 175, 500, 50);

		fill(highlight_3);
		textAlign(CENTER, CENTER);
		textSize(20);
		text(`Your entire team has earned ${rewardExp} EXP!`, startX + 250, 250); // Adjust position if necessary

		fill(255);
		text(`Your team:`, startX + 250, 300);
		fill(highlight_3);
		for (let i = 0; i < plr.team.length; i++) {
			let p = this.oldTeam[i];
			text(
				`${p.name} - Lvl ${p.level} -> ${this.newTeam[i].name} - Lvl ${this.newTeam[i].level}`,
				startX + 250,
				330 + i * 30
			);
		}
	}

	listen() {
		let startX = 600 - 250;
		if (mouseX > startX && mouseX < startX + 50 && mouseY > 100 && mouseY < 150) this.show = false;
	}
}
