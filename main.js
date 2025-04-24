function setup() {
	createCanvas(1200, 800, WEBGL);
	background(255);
}

let player = new Trainer({
	name: "sire",
	team: [new Eevee(50), new Pikachew(2), new Pikachew(61), new Pikachew(42), new Pikachew(64), new Pikachew(32)],
	img: "191.PNG"
});

let opp = new Trainer({
	name: "Opponent",
	team: [new Vapoureon(30)],
	img: "191.PNG"
})

let battle = new Battle({
	plr: player,
	opp: opp
})

let gameMap = new GameMap();

function draw() {
	// battle.render();
	gameMap.render();
}

function mouseClicked() {
	if (battle.state == "move") battle.listenForMove();
	if (battle.state == "turn") battle.listenForTurn();
	if (battle.state != "turn") battle.listenForMenu();
}