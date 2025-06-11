let gameMap, battle;
let state = "map";
let player = new Trainer({
	name: "sire",
	team: [
		new Blastoise(100),
		new Charizard(50),
		new Bulbasaur(10),
		new Bulbasaur(10),
		new Bulbasaur(10),
	],
	img: "191.PNG",
});
let gui = new Gui(player);
let result = new Results({ plr: player, opp: player, rewardExp: 50 });
result.show = false;

function setup() {
	createCanvas(1200, 800);
	background(255);
	gameMap = new GameMap();

	if (localStorage.key("data")) {
		let savedTeam = JSON.parse(localStorage.getItem("data"))[0].team;
		for (let i = 0; i < savedTeam.length; i++) {
			savedTeam[i] = new DataLoad(savedTeam[i]);
		}
		let savedPos = JSON.parse(localStorage.getItem("data"))[1].pos;
		player.team = savedTeam;
		gameMap.playerX = savedPos[0];
		gameMap.playerY = savedPos[1];
	}

	// loading map data
	let opp = new Trainer({
		name: "Roxanne",
		team: [new Charmander(90), new Charmander(90), new Charmander(90)],
		img: "191.PNG",
	});
	let bugOpp = new Trainer({
		name: "Buggy Duggy",
		team: [new Caterpie(20), new Metapod(40), new Butterfree(50)],
		img: "buggyduggy.png",
	});
	let bugOppLeader = new Trainer({
		name: "Katy",
		team: [new Beedrill(50), new Parasect(80), new Kakuna(90)],
		img: "katy.png",
	});
	let grassOpp = new Trainer({
		name: "Grassy the First",
		team: [new Bulbasaur(40), new Ivysaur(50), new Bulbasaur(80)],
		img: "brock.png",
	});
	let grassOppLeader = new Trainer({
		name: "Cynthia",
		team: [new Ivysaur(80), new Venusaur(80), new Gloom(80)],
		img: "cynthia.png",
	});
	let waterOpp = new Trainer({
		name: "Mr. Oily",
		team: [new Wartortle(70), new Psyduck(80), new Squirtle(90)],
		img: "mroily.png",
	});
	let waterOppLeader = new Trainer({
		name: "Misty",
		team: [new Wartortle(80), new Blastoise(80), new Golduck(80)],
		img: "misty.png",
	});
	let fireOpp = new Trainer({
		name: "Mr. Fired Up",
		team: [new Charmeleon(80), new Charmander(90), new Vulpix(90)],
		img: "mrfiredup.png",
	});
	let fireOppLeader = new Trainer({
		name: "Flint",
		team: [new Charizard(100), new Ninetales(100), new Charmeleon(100)],
		img: "flint.png",
	});

	gameMap.characters.push(new Character(500, 150, loadImage("assets/roxanne.png"), opp, 80, 0));
	gameMap.characters.push(new Character(1900, 900, loadImage("assets/buggyduggy.png"), bugOpp, 80, 0));
	gameMap.characters.push(new Character(2200, 1800, loadImage("assets/katy.png"), bugOppLeader, 80, 0));
	gameMap.characters.push(new Character(4380, 2000, loadImage("assets/mroily.png"), waterOpp, 0, 120));
	gameMap.characters.push(new Character(4380, 2800, loadImage("assets/misty.png"), waterOppLeader, 0, 120));
	gameMap.characters.push(new Character(5700, 3000, loadImage("assets/brock.png"), grassOpp, 0, -120));
	gameMap.characters.push(new Character(5700, 2500, loadImage("assets/cynthia.png"), grassOppLeader, 0, -120));
	gameMap.characters.push(new Character(4800, 630, loadImage("assets/mrfiredup.png"), fireOpp, -80, 0));
	gameMap.characters.push(new Character(5800, 900, loadImage("assets/flint.png"), fireOppLeader, -80, 0));
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
		gameMap.listenBall(player.team);
		gameMap.renderBall();
		gui.render();

		// battle collision
		for (c of gameMap.characters) {
			if (gameMap.overlaps(c) && c.canBattle) {
				battle = new Battle({
					plr: player,
					opp: c.trainer,
					exitX: c.exitX ? c.x + c.exitX : c.x,
					// exitY: c.exitY ? gameMap.playerY + c.exitY : gameMap.playerY,
					exitY: c.exitY ? c.y + c.exitY : c.y,
				});

				state = "battle";
			}
		}

		if (result.show) result.render();
		if (gui.showTeam) gui.renderTeam(player.team);
		if (gui.showSaved) gui.renderSaved();
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
		gui.pushPlayerPos(gameMap.playerX, gameMap.playerY);
		gui.listen();
		if (gui.showTeam) gui.listenForTeam(player.team);
		if (!gui.showTeam) gameMap.listenThrowBall();
	}
}

// switch between battle and map
function keyPressed() {
	if (keyCode == 66) state = "battle";
	if (keyCode == 77) state = "map";
}
