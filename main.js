let gameMap;

function setup() {
	createCanvas(1200, 800);
	background(255);
	gameMap = new GameMap();
}

let player = new Trainer({
	name: "sire",
	team: [new Charizard(50), new Pikachew(2), new Pikachew(61), new Pikachew(42), new Pikachew(64), new Pikachew(32)],
	img: "191.PNG"
});

let opp = new Trainer({
	name: "Opponent",
	team: [new Pikachew(30), new Charizard(50)],
	img: "191.PNG"
})

let battle = new Battle({
	plr: player,
	opp: opp
})


let state = "map";
function draw() {
	if (state == "battle") battle.render();
	if (state == "map") gameMap.render();
	if (state == "map") gameMap.listenMove();
}

function mouseClicked() {
	if (battle.state == "move") battle.listenForMove();
	if (battle.state == "switch") battle.listenForSwitch();
	if (battle.state == "turn") battle.listenForTurn();
	if (battle.state != "turn") battle.listenForMenu();
}

// switch between battle and map
function keyPressed() {
	if (keyCode == 66) state = "battle";
	if (keyCode == 77) state = "map";
}