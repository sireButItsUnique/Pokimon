let gameMap, battle;
let state = "map";
let player = new Trainer({
	name: "sire",
	team: [new Charizard(50), new Pikachew(2), new Pikachew(61), new Pikachew(42), new Pikachew(64), new Pikachew(32)],
	img: "191.PNG"
});

function setup() {
	createCanvas(1200, 800);
	background(255);
	gameMap = new GameMap();
	// gameMap.mapSetup();

	// loading map data
	let opp = new Trainer({
		name: "Opponent",
		team: [new Pikachew(30), new Charizard(50)],
		img: "191.PNG"
	})
	gameMap.characters.push(new Character(500, 0, 100, 100, loadImage("assets/roxanne.png"), opp));
}

function draw() {
	if (state == "battle") {
		battle.render();

		if (battle.state == "won") {
			gameMap.playerX -= 10;
			gameMap.playerY -= 10;
			state = "map";
		}
	}
	if (state == "map") {
		gameMap.render();
		gameMap.listenMove();
		
		// battle collision
		for (c of gameMap.characters) {
			if (gameMap.overlaps(c) && c.canBattle) {
				battle = new Battle({
					plr: player,
					opp: c.trainer
				});
				
				state = "battle";
			}
		}
	}
}

function mouseClicked() {
	if (state == "battle") {
		if (battle.state == "move") battle.listenForMove();
		if (battle.state == "switch") battle.listenForSwitch();
		if (battle.state == "turn") battle.listenForTurn();
		if (battle.state != "turn") battle.listenForMenu();
	}
}

// switch between battle and map
function keyPressed() {
	if (keyCode == 66) state = "battle";
	if (keyCode == 77) state = "map";
}