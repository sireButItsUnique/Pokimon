function setup() {
	createCanvas(1200, 800);
	background(255);
}

let player = new Trainer({
	name: "sire",
	team: [new Charmeleon(50), new Pikachew(2), new Pikachew(61), new Pikachew(42), new Pikachew(64), new Pikachew(32)],
	img: "191.PNG"
});

let opp = new Trainer({
	name: "Opponent",
	team: [new Pikachew(30)],
	img: "191.PNG"
})

let battle = new Battle({
	plr: player,
	opp: opp
})

let map = new Map();

function draw() {
	battle.render();
	// map.render();
}

function mouseClicked() {
	if (battle.state == "move") battle.listenForMove();
	if (battle.state == "switch") battle.listenForSwitch();
	if (battle.state == "turn") battle.listenForTurn();
	if (battle.state != "turn") battle.listenForMenu();
}