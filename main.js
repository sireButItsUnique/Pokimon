let gameMap, battle;
let state = "map";
let player = new Trainer({
	name: "sire",
	// team: [new Blastoise(100), new Charizard(50), new Pikachew(61), new Pikachew(42), new Pikachew(64), new Pikachew(32)],
	team: [new Bulbasaur(4)],
	img: "191.PNG"
});
let gui = new Gui(player);
let result = new Results({plr: player, opp: player, rewardExp: 50});
result.show = false;

function setup() {
	createCanvas(1200, 800);
	background(255);
	gameMap = new GameMap();

	// loading map data
	let opp = new Trainer({
		name: "Roxanne",
		team: [new Pikachew(30), new Charizard(50)],
		img: "191.PNG"
	})
	gameMap.characters.push(new Character(500, 0, loadImage("assets/roxanne.png"), opp));
}

function draw() {
	if (state == "battle") {
		battle.render();

		// battle end, create results
		if (battle.state == "end") {
			gameMap.playerX = battle.exitX;
			gameMap.playerY = battle.exitY;
			result = new Results(battle.resultData);
			state = "map";
		}
	}
	
	if (state == "map") {
		gameMap.render();
		gameMap.listenMove();
		gameMap.listenThrowBall();
		gui.render();
		
		// battle collision
		for (c of gameMap.characters) {
			if (gameMap.overlaps(c) && c.canBattle) {
				battle = new Battle({
					plr: player,
					opp: c.trainer,
					exitX: c.x - 80,
					exitY: gameMap.playerY,
				});
				
				state = "battle";
			}
		}

		if (result.show) result.render();
	}
}

function mouseClicked() {
	if (state == "battle") {
		if (battle.state == "move") battle.listenForMove();
		if (battle.state == "switch") battle.listenForSwitch();
		if (battle.state == "turn") battle.listenForTurn();
		if (battle.state != "turn") battle.listenForMenu();
	}

	if (state == "map") {
		result.listen();
	}
}

// switch between battle and map
function keyPressed() {
	if (keyCode == 66) state = "battle";
	if (keyCode == 77) state = "map";
}