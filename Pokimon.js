class Pokimon {

	// Basic info
	constructor({ name, img, level, type1, type2 = "none" }) {
		this.name = name;
		this.level = level;
		this.type1 = type1;
		this.type2 = type2;
		this.moves = [];
		this.xp = 0;
	}

	// Base stats
	setBaseStats({ hp, atk, spAtk, def, spDef, spd }) {
		this.hpBASE = hp;
		this.atkBASE = atk;
		this.spAtkBASE = spAtk;
		this.defBASE = def;
		this.spDefBASE = spDef;
		this.spdBASE = spd;
	}

	// IV stats
	setIvStats({ hp, atk, spAtk, def, spDef, spd }) {
		this.hpIV = hp;
		this.atkIV = atk;
		this.spAtkIV = spAtk;
		this.defIV = def;
		this.spDefIV = spDef;
		this.spdIV = spd;
	}

	setRandomIvs() {
		this.setIvStats({
			hp: Math.floor(randInt(1, 32)),
			atk: Math.floor(randInt(1, 32)),
			spAtk: Math.floor(randInt(1, 32)),
			def: Math.floor(randInt(1, 32)),
			spDef: Math.floor(randInt(1, 32)),
			spd: Math.floor(randInt(1, 32))
		});
	}

	// Moves
	learnMove(move) {
		if (this.moves.length < 4) this.moves.push(move);
		else {
			// if already has 4 moves, replace the oldest one
			this.moves.shift(); // remove the first move
			this.moves.push(move); // add the new move
		}
	}

	// Stat calc, to be implemented: natures
	getStats() {
		let { level } = this;
		return {
			hp: Math.floor((2 * this.hpBASE + this.hpIV) * (level / 100)) + level + 10, // hp calc is different for some reason
			atk: Math.floor((2 * this.atkBASE + this.atkIV) * (level / 100)) + 5,
			spAtk: Math.floor((2 * this.spAtkBASE + this.spAtkIV) * (level / 100)) + 5,
			def: Math.floor((2 * this.defBASE + this.defIV) * (level / 100)) + 5,
			spDef: Math.floor((2 * this.spDefBASE + this.spDefIV) * (level / 100)) + 5,
			spd: Math.floor((2 * this.spdBASE + this.spdIV) * (level / 100)) + 5,
		};
	}

	levelUp() {
		let req = ((this.level ** 3) * (150 - this.level)) / 100; // XP required to level up
		while (this.xp >= req) {
			this.level += 1;
			this.xp -= req;
			req = ((this.level ** 3) * (150 - this.level)) / 100;

			// learn move
			for (let i = 0; i < this.movePool.length; i++) {
				if (this.movePool[i].level === this.level) {
					this.learnMove(this.movePool[i].move);
					break; // learn only one move per level up
				}
			}
		}
		this.level = Math.min(this.level, 100); // max level is 100
	}

	display() {

	}
}

// Pokimons
class Bulbasaur extends Pokimon {
	constructor(level = 1) {
		super({
			name: "Bulbasaur",
			level: level,
			type1: "Grass",
			type2: "Poison"
		});
		this.setBaseStats({ hp: 45, atk: 49, spAtk: 65, def: 49, spDef: 65, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new VineWhip());
		this.learnMove(new SolarBeam());
		this.learnMove(new SweetScent());
		this.learnMove(new PoisonPowder());
		this.evoLvl = 16;
		this.evo = (new Ivysaur());
		this.movePool = [
			{ level: 3, move: new VineWhip() },
			{ level: 36, move: new SolarBeam() },
			{ level: 24, move: new SweetScent() },
			{ level: 15, move: new PoisonPowder() },
		];
	}
}



class Ivysaur extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Ivysaur",
			level: level,
			type1: "Grass",
			type2: "Poison"
		});
		this.setBaseStats({ hp: 60, atk: 62, spAtk: 80, def: 63, spDef: 80, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new VineWhip());
		this.learnMove(new SweetScent());
		this.learnMove(new PoisonPowder());
		this.learnMove(new PowerWhip());
		this.evoLvl = 32;
		this.evo = (new Venusaur());
		this.movePool = [
			{ level: 3, move: new VineWhip() },
			{ level: 45, move: new PowerWhip() },
			{ level: 24, move: new SweetScent() },
			{ level: 15, move: new PoisonPowder() },
		];

	}
}


class Venusaur extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Venusaur",
			level: level,
			type1: "Grass",
			type2: "Poison"
		});
		this.setBaseStats({ hp: 80, atk: 82, spAtk: 100, def: 83, spDef: 100, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new VineWhip());
		this.learnMove(new SweetScent());
		this.learnMove(new PetalDance());
		this.learnMove(new PowerWhip());

		this.movePool = [
			{ level: 3, move: new VineWhip() },
			{ level: 45, move: new PowerWhip() },
			{ level: 24, move: new SweetScent() },
			{ level: 1, move: new PetalDance() },
		];
	}
}


class Charmander extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Charmander",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 39, atk: 52, spAtk: 60, def: 43, spDef: 50, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new Ember());
		this.learnMove(new DragonBreath());
		this.learnMove(new Flamethrower());
		this.learnMove(new Inferno());

		this.evoLvl = 16;
		this.evo = (new Charmeleon());
		this.movePool = [
			{ level: 4, move: new Ember() },
			{ level: 12, move: new DragonBreath() },
			{ level: 24, move: new Flamethrower() },
			{ level: 36, move: new Inferno() },
		];



	}
}

class Charmeleon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Charmeleon",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 58, atk: 64, spAtk: 80, def: 58, spDef: 65, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new Ember());
		this.learnMove(new DragonBreath());
		this.learnMove(new FlareBlitz());
		this.learnMove(new FireFang());



		this.evoLvl = 36;
		this.evo = (new Charizard());
		this.movePool = [
			{ level: 1, move: new Ember() },
			{ level: 12, move: new DragonBreath() },
			{ level: 54, move: new FlareBlitz() },
			{ level: 19, move: new FireFang() },
		];
	}
}

class Charizard extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Charizard",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 78, atk: 84, spAtk: 109, def: 78, spDef: 85, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new HeatWave());
		this.learnMove(new DragonBreath());
		this.learnMove(new FlareBlitz());
		this.learnMove(new FireFang());

		this.movePool = [
			{ level: 1, move: new HeatWave() },
			{ level: 12, move: new DragonBreath() },
			{ level: 54, move: new FlareBlitz() },
			{ level: 19, move: new FireFang() },
		];
	}
}


class Squirtle extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Squirtle",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 44, atk: 48, spAtk: 50, def: 65, spDef: 64, spd: 43 });
		this.setRandomIvs();
		this.learnMove(new AquaTail());
		this.learnMove(new WaveCrash());
		this.learnMove(new HydroPump());
		this.learnMove(new Bite());



		this.evoLvl = 16;
		this.evo = (new Wartortle());
		this.movePool = [
			{ level: 24, move: new AquaTail() },
			{ level: 36, move: new WaveCrash() },
			{ level: 33, move: new HydroPump() },
			{ level: 12, move: new Bite() },
		];
	}
}


class Wartortle extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Wartortle",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 59, atk: 63, spAtk: 65, def: 80, spDef: 80, spd: 58 });
		this.setRandomIvs();
		this.learnMove(new WaterPulse());
		this.learnMove(new WaveCrash());
		this.learnMove(new RapidSpin());
		this.learnMove(new Bite());


		this.evoLvl = 36;
		this.evo = (new Blastoise());
		this.movePool = [
			{ level: 15, move: new WaterPulse() },
			{ level: 50, move: new WaveCrash() },
			{ level: 9, move: new RapidSpin() },
			{ level: 12, move: new Bite() },
		];
	}
}

class Blastoise extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Blastoise",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 79, atk: 83, spAtk: 85, def: 100, spDef: 105, spd: 78 });
		this.setRandomIvs();
		this.learnMove(new WaterPulse());
		this.learnMove(new WaveCrash());
		this.learnMove(new Tackle());
		this.learnMove(new Bite());

		this.movePool = [
			{ level: 15, move: new WaterPulse() },
			{ level: 56, move: new WaveCrash() },
			{ level: 1, move: new Tackle() },
			{ level: 12, move: new Bite() },
		];
	}
}


class Caterpie extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Caterpie",
			level: level,
			type1: "Bug",
		});
		this.setBaseStats({ hp: 45, atk: 30, spAtk: 20, def: 35, spDef: 20, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new StringShot());
		this.learnMove(new Tackle());
		this.learnMove(new BugBite());


		this.evoLvl = 7;
		this.evo = (new Metapod());
		this.movePool = [
			{ level: 1, move: new StringShot() },
			{ level: 1, move: new Tackle() },
			{ level: 9, move: new BugBite() },
		];
	}
}



class Metapod extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Metapod",
			level: level,
			type1: "Bug",
		});
		this.setBaseStats({ hp: 50, atk: 20, spAtk: 25, def: 55, spDef: 25, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Harden());

		this.evoLvl = 10;
		this.evo = (new Butterfree());
		this.movePool = [
			{ level: 1, move: new Harden() },
		]
	}
}



class Butterfree extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Butterfree",
			level: level,
			type1: "Bug",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 60, atk: 45, spAtk: 90, def: 50, spDef: 80, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new BugBite());
		this.learnMove(new Psybeam());
		this.learnMove(new Tackle());
		this.learnMove(new Confusion());

		this.movePool = [
			{ level: 1, move: new BugBite() },
			{ level: 16, move: new Psybeam() },
			{ level: 1, move: new Tackle() },
			{ level: 8, move: new Confusion() },
		];
	}
}



class Weedle extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Weedle",
			level: level,
			type1: "Bug",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 40, atk: 35, spAtk: 20, def: 30, spDef: 20, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new PoisonSting());
		this.learnMove(new StringShot());
		this.learnMove(new BugBite());

		this.evoLvl = 7;
		this.evo = (new Kakuna());
		this.movePool = [
			{ level: 1, move: new PoisonSting() },
			{ level: 1, move: new StringShot() },
			{ level: 9, move: new BugBite() },
		];

	}
}


class Kakuna extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Weedle",
			level: level,
			type1: "Bug",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 40, atk: 25, spAtk: 25, def: 50, spDef: 25, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new Harden());

		this.evoLvl = 10;
		this.evo = (new Beedrill());
		this.movePool = [
			{ level: 1, move: new Harden() },
		]

	}
}



class Beedrill extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Beedrill",
			level: level,
			type1: "Bug",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 65, atk: 90, spAtk: 45, def: 40, spDef: 80, spd: 75 });
		this.setRandomIvs();
		this.learnMove(new BugBite());
		this.learnMove(new PoisonSting());
		this.learnMove(new FuryCutter());
		this.learnMove(new PinMissle());

		this.movePool = [
			{ level: 1, move: new BugBite() },
			{ level: 17, move: new PoisonSting() },
			{ level: 11, move: new FuryCutter() },
			{ level: 32, move: new PinMissle() },
		];


	}
}

class Pidgey extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Pidgey",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 40, atk: 45, spAtk: 35, def: 40, spDef: 35, spd: 56 });
		this.setRandomIvs();
		this.learnMove(new Gust());
		this.learnMove(new Tackle());
		this.learnMove(new WingAttack());
		this.learnMove(new AerialAce());


		this.evoLvl = 18;
		this.evo = (new Pidgeotto());
		this.movePool = [
			{ level: 9, move: new Gust() },
			{ level: 1, move: new Tackle() },
			{ level: 33, move: new WingAttack() },
			{ level: 45, move: new AerialAce() },
		];
	}
}


class Pidgeotto extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Pidgeotto",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 63, atk: 60, spAtk: 50, def: 55, spDef: 50, spd: 71 });
		this.setRandomIvs();
		this.learnMove(new AirSlash());
		this.learnMove(new Tackle());
		this.learnMove(new WingAttack());
		this.learnMove(new AerialAce());

		this.evoLvl = 36;
		this.evo = (new Pidgeot());
		this.movePool = [
			{ level: 57, move: new AirSlash() },
			{ level: 1, move: new Tackle() },
			{ level: 37, move: new WingAttack() },
			{ level: 52, move: new AerialAce() },
		];
	}
}


class Pidgeot extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Pidgeot",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 83, atk: 80, spAtk: 70, def: 75, spDef: 70, spd: 101 });
		this.setRandomIvs();
		this.learnMove(new AirSlash());
		this.learnMove(new Tackle());
		this.learnMove(new Twister());
		this.learnMove(new AerialAce());



		this.movePool = [
			{ level: 57, move: new AirSlash() },
			{ level: 1, move: new Tackle() },
			{ level: 22, move: new Twister() },
			{ level: 52, move: new AerialAce() },
		];
	}
}

class Rattata extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Rattata",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 30, atk: 56, spAtk: 25, def: 35, spDef: 35, spd: 72 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new QuickAttack());
		this.learnMove(new SuckerPunch());
		this.learnMove(new Crunch());


		this.evoLvl = 20;
		this.evo = (new Raticate());
		this.movePool = [
			{ level: 1, move: new Tackle() },
			{ level: 4, move: new QuickAttack() },
			{ level: 25, move: new SuckerPunch() },
			{ level: 22, move: new Crunch() },
		];
	}
}


class Raticate extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Raticate",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 55, atk: 81, spAtk: 50, def: 60, spDef: 70, spd: 97 });
		this.setRandomIvs();
		this.learnMove(new Bite());
		this.learnMove(new QuickAttack());
		this.learnMove(new SuckerPunch());
		this.learnMove(new Crunch());



		this.movePool = [
			{ level: 10, move: new Bite() },
			{ level: 1, move: new QuickAttack() },
			{ level: 29, move: new SuckerPunch() },
			{ level: 24, move: new Crunch() },
		];
	}
}


class Spearow extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Spearow",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 40, atk: 60, spAtk: 31, def: 30, spDef: 31, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new Peck());
		this.learnMove(new AerialAce());
		this.learnMove(new WingAttack());
		this.learnMove(new FuryAttack());


		this.evoLvl = 20;
		this.evo = (new Fearow());
		this.movePool = [
			{ level: 1, move: new Peck() },
			{ level: 15, move: new AerialAce() },
			{ level: 18, move: new WingAttack() },
			{ level: 11, move: new FuryAttack() },
		];
	}
}



class Fearow extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Fearow",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 65, atk: 90, spAtk: 61, def: 65, spDef: 61, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new Assurance());
		this.learnMove(new DrillRun());
		this.learnMove(new WingAttack());
		this.learnMove(new FuryAttack());



		this.movePool = [
			{ level: 8, move: new Assurance() },
			{ level: 1, move: new DrillRun() },
			{ level: 18, move: new WingAttack() },
			{ level: 11, move: new FuryAttack() },
		];
	}
}


class Ekans extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Ekans",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 35, atk: 60, spAtk: 40, def: 44, spDef: 54, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new PoisonSting());
		this.learnMove(new Bite());
		this.learnMove(new Acid());
		this.learnMove(new Wrap());


		this.evoLvl = 22;
		this.evo = (new Arbok());
		this.movePool = [
			{ level: 4, move: new PoisonSting() },
			{ level: 9, move: new Bite() },
			{ level: 20, move: new Acid() },
			{ level: 1, move: new Wrap() },
		];
	}
}


class Arbok extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Arbok",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 60, atk: 95, spAtk: 65, def: 69, spDef: 79, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new FireFang());
		this.learnMove(new Bite());
		this.learnMove(new IceFang());
		this.learnMove(new Acid());

		this.movePool = [
			{ level: 1, move: new FireFang() },
			{ level: 1, move: new Bite() },
			{ level: 1, move: new IceFang() },
			{ level: 20, move: new Acid() },
		];
	}
}


class Pikachu extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Pikachu",
			level: level,
			type1: "Electric"
		});
		this.setBaseStats({ hp: 35, atk: 55, spAtk: 40, def: 50, spDef: 50, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		this.learnMove(new Agility());
		this.learnMove(new ThunderShock());
		this.learnMove(new ThunderBolt());


		this.evoLvl = 30;
		this.evo = (new Raichu());
		this.movePool = [
			{ level: 1, move: new QuickAttack() },
			{ level: 24, move: new Agility() },
			{ level: 1, move: new ThunderShock() },
			{ level: 36, move: new ThunderBolt() },
		];
	}
}

class Raichu extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Raichu",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 60, atk: 90, spAtk: 90, def: 55, spDef: 80, spd: 110 });
		this.setRandomIvs();
		this.learnMove(new Discharge());
		this.learnMove(new ThunderBolt());
		this.learnMove(new IronTail());
		this.learnMove(new ThunderShock());



		this.movePool = [
			{ level: 1, move: new Discharge() },
			{ level: 5, move: new ThunderBolt() },
			{ level: 1, move: new IronTail() },
			{ level: 1, move: new ThunderShock() },
		];
	}
}

class Sandshrew extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Sandshrew",
			level: level,
			type1: "Ground",
		});
		this.setBaseStats({ hp: 50, atk: 75, spAtk: 20, def: 85, spDef: 30, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new Earthquake());
		this.learnMove(new Swift());
		this.learnMove(new Dig());
		this.learnMove(new Scratch());

		this.evoLvl = 22;
		this.evo = (new Sandslash());
		this.movePool = [
			{ level: 45, move: new Earthquake() },
			{ level: 21, move: new Swift() },
			{ level: 33, move: new Dig() },
			{ level: 1, move: new Scratch() },
		];

	}
}

class Sandslash extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Sandslash",
			level: level,
			type1: "Ground",
		});
		this.setBaseStats({ hp: 75, atk: 100, spAtk: 45, def: 110, spDef: 55, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new Slash());
		this.learnMove(new Bulldoze());
		this.learnMove(new CrushClaw());
		this.learnMove(new Scratch());

		this.movePool = [
			{ level: 36, move: new Slash() },
			{ level: 18, move: new Bulldoze() },
			{ level: 1, move: new CrushClaw() },
			{ level: 1, move: new Scratch() },
		];

	}
}



class NidoranF extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Nidoran (Female)",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 55, atk: 47, spAtk: 40, def: 52, spDef: 40, spd: 41 });
		this.setRandomIvs();
		this.learnMove(new PoisonSting());
		this.learnMove(new Scratch());
		this.learnMove(new Bite());
		this.learnMove(new Crunch());

	}
}

class Nidorina extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Nidorina",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 70, atk: 62, spAtk: 55, def: 67, spDef: 55, spd: 56 });
		this.setRandomIvs();
		this.learnMove(new FurySwipes());
		this.learnMove(new Scratch());
		this.learnMove(new Bite());
		this.learnMove(new Crunch());

	}
}



class Nidoqueen extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Nidoqueen",
			level: level,
			type1: "Poison",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 90, atk: 92, spAtk: 75, def: 87, spDef: 85, spd: 76 });
		this.setRandomIvs();
		this.learnMove(new EarthPower());
		this.learnMove(new Scratch());
		this.learnMove(new Bite());
		this.learnMove(new Crunch());

	}
}



class NidoranM extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Nidoran (Male)",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 46, atk: 57, spAtk: 40, def: 40, spDef: 40, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new PoisonSting());
		this.learnMove(new Peck());
		this.learnMove(new FuryAttack());
		this.learnMove(new PoisonJab());

	}
}


class Nidorino extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Nidorino",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 61, atk: 72, spAtk: 55, def: 57, spDef: 55, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new DoubleKick());
		this.learnMove(new Peck());
		this.learnMove(new FuryAttack());
		this.learnMove(new PoisonJab());

	}
}



class Nidoking extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Nidoking",
			level: level,
			type1: "Poison",
			type2: "Ground"
		});
		this.setBaseStats({ hp: 81, atk: 102, spAtk: 85, def: 77, spDef: 75, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new HornAttack());
		this.learnMove(new Peck());
		this.learnMove(new FuryAttack());
		this.learnMove(new PoisonJab());

	}
}

class Clefairy extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Clefairy",
			level: level,
			type1: "Fairy",
		});
		this.setBaseStats({ hp: 70, atk: 45, spAtk: 60, def: 48, spDef: 65, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new StoredPower());
		this.learnMove(new MeteorMash());
		this.learnMove(new MoonBlast());
		this.learnMove(new Pound());

	}
}


class Clefable extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Clefable",
			level: level,
			type1: "Fairy",
		});
		this.setBaseStats({ hp: 95, atk: 70, spAtk: 95, def: 73, spDef: 90, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new DisarmingVoice());
		this.learnMove(new Charm());
		this.learnMove(new StoredPower());
		this.learnMove(new Pound());

	}
}



class Vulpix extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Vulpix",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 38, atk: 41, spAtk: 50, def: 40, spDef: 65, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new Ember());
		this.learnMove(new QuickAttack());
		this.learnMove(new Inferno());
		this.learnMove(new TailWhip());

	}
}



class Ninetales extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Ninetales",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 73, atk: 76, spAtk: 81, def: 75, spDef: 100, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new Flamethrower());
		this.learnMove(new QuickAttack());
		this.learnMove(new TailWhip());


	}
}


class Jigglypuff extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Jigglypuff",
			level: level,
			type1: "Normal",
			type2: "Fairy",
		});
		this.setBaseStats({ hp: 115, atk: 45, spAtk: 45, def: 20, spDef: 25, spd: 20 });
		this.setRandomIvs();
		this.learnMove(new DisarmingVoice());
		this.learnMove(new DoubleEdge());
		this.learnMove(new HyperVoice());
		this.learnMove(new Pound());

	}
}

class Wigglytuff extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Wigglytuff",
			level: level,
			type1: "Normal",
			type2: "Fairy",
		});
		this.setBaseStats({ hp: 140, atk: 70, spAtk: 85, def: 45, spDef: 50, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new DisarmingVoice());
		this.learnMove(new DoubleEdge());
		this.learnMove(new PlayRough());
		this.learnMove(new BodySlam());

	}
}



class Zubat extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Zubat",
			level: level,
			type1: "Poison",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 40, atk: 45, spAtk: 30, def: 35, spDef: 40, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new Astonish());
		this.learnMove(new Bite());
		this.learnMove(new AirSlash());
		this.learnMove(new Absorb());

	}
}



class Golbat extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Golbat",
			level: level,
			type1: "Poison",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 75, atk: 80, spAtk: 65, def: 70, spDef: 75, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new PoisonFang());
		this.learnMove(new Bite());
		this.learnMove(new AirSlash());
		this.learnMove(new Absorb());

	}
}


class Oddish extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Oddish",
			level: level,
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 45, atk: 50, spAtk: 75, def: 55, spDef: 65, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new MoonBlast());
		this.learnMove(new Acid());
		this.learnMove(new PoisonPowder());
		this.learnMove(new Absorb());

	}
}


class Gloom extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Gloom",
			level: level,
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 60, atk: 65, spAtk: 85, def: 70, spDef: 75, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new MoonBlast());
		this.learnMove(new Acid());
		this.learnMove(new PoisonPowder());
		this.learnMove(new Absorb());

	}
}


class Vileplume extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Vileplume",
			level: level,
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 75, atk: 80, spAtk: 110, def: 85, spDef: 90, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new MoonBlast());
		this.learnMove(new Acid());
		this.learnMove(new PoisonPowder());
		this.learnMove(new Absorb());

	}
}


class Paras extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Paras",
			level: level,
			type1: "Bug",
			type2: "Grass",
		});
		this.setBaseStats({ hp: 35, atk: 70, spAtk: 45, def: 55, spDef: 55, spd: 25 });
		this.setRandomIvs();
		this.learnMove(new Scratch());
		this.learnMove(new Absorb());
		this.learnMove(new PoisonPowder());
		this.learnMove(new FuryCutter());

	}
}



class Parasect extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Parasect",
			level: level,
			type1: "Bug",
			type2: "Grass",
		});
		this.setBaseStats({ hp: 60, atk: 95, spAtk: 60, def: 80, spDef: 80, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Slash());
		this.learnMove(new Absorb());
		this.learnMove(new PoisonPowder());
		this.learnMove(new FuryCutter());

	}
}



class Venonat extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Venonat",
			level: level,
			type1: "Bug",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 60, atk: 55, spAtk: 55, def: 50, spDef: 40, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new Psybeam());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new PoisonFang());

	}
}



class Venomoth extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Venomoth",
			level: level,
			type1: "Bug",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 70, atk: 65, spAtk: 90, def: 60, spDef: 75, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new Confusion());
		this.learnMove(new Psybeam());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new PoisonFang());

	}
}


class Diglett extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Diglett",
			level: level,
			type1: "Ground",
		});
		this.setBaseStats({ hp: 10, atk: 55, spAtk: 35, def: 25, spDef: 45, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new Scratch());
		this.learnMove(new Dig());
		this.learnMove(new Bulldoze());
		this.learnMove(new Slash());

	}
}



class Dugtrio extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Dugtrio",
			level: level,
			type1: "Ground",
		});
		this.setBaseStats({ hp: 35, atk: 100, spAtk: 50, def: 50, spDef: 70, spd: 120 });
		this.setRandomIvs();
		this.learnMove(new Astonish());
		this.learnMove(new Dig());
		this.learnMove(new Bulldoze());
		this.learnMove(new Slash());

	}
}


class Meowth extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Meowth",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 40, atk: 45, spAtk: 40, def: 35, spDef: 40, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new Bite());
		this.learnMove(new Slash());
		this.learnMove(new Scratch());
		this.learnMove(new PlayRough());

	}
}


class Persian extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Persian",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 65, atk: 70, spAtk: 65, def: 60, spDef: 65, spd: 115 });
		this.setRandomIvs();
		this.learnMove(new Assurance());
		this.learnMove(new Slash());
		this.learnMove(new Scratch());
		this.learnMove(new PlayRough());

	}
}


class Psyduck extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Psyduck",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 50, atk: 52, spAtk: 65, def: 48, spDef: 50, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new WaterPulse());
		this.learnMove(new Scratch());
		this.learnMove(new AquaTail());

	}
}

class Golduck extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Golduck",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 80, atk: 82, spAtk: 95, def: 78, spDef: 80, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new AquaJet());
		this.learnMove(new WaterPulse());
		this.learnMove(new Scratch());
		this.learnMove(new AquaTail());

	}
}



class Mankey extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Mankey",
			level: level,
			type1: "Fighting",
		});
		this.setBaseStats({ hp: 40, atk: 80, spAtk: 35, def: 35, spDef: 45, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new Scratch());
		this.learnMove(new Assurance());
		this.learnMove(new FurySwipes());
		this.learnMove(new Thrash());

	}
}



class Primeape extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Primeape",
			level: level,
			type1: "Fighting",
		});
		this.setBaseStats({ hp: 65, atk: 105, spAtk: 60, def: 60, spDef: 70, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new Scratch());
		this.learnMove(new CloseCombat());
		this.learnMove(new FurySwipes());
		this.learnMove(new Thrash());

	}
}



class Growlithe extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Growlithe",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 55, atk: 70, spAtk: 70, def: 45, spDef: 50, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new Ember());
		this.learnMove(new Bite());
		this.learnMove(new Flamethrower());
		this.learnMove(new PlayRough());

	}
}



class Arcanine extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Arcanine",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 90, atk: 110, spAtk: 100, def: 80, spDef: 80, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new FireFang());
		this.learnMove(new Bite());
		this.learnMove(new Flamethrower());
		this.learnMove(new PlayRough());

	}
}


class Poliwag extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Poliwag",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 40, atk: 50, spAtk: 40, def: 40, spDef: 40, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new WaterGun());
		this.learnMove(new BubbleBeam());
		this.learnMove(new HydroPump());
		this.learnMove(new BodySlam());

	}
}


class Poliwhirl extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Poliwhirl",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 65, atk: 65, spAtk: 50, def: 65, spDef: 50, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new MudShot());
		this.learnMove(new BubbleBeam());
		this.learnMove(new HydroPump());
		this.learnMove(new BodySlam());

	}
}



class Poliwrath extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Poliwrath",
			level: level,
			type1: "Water",
			type2: "Fighting",
		});
		this.setBaseStats({ hp: 90, atk: 95, spAtk: 70, def: 95, spDef: 90, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new CircleThrow());
		this.learnMove(new BubbleBeam());
		this.learnMove(new HydroPump());
		this.learnMove(new BodySlam());

	}
}


class Abra extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Abra",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 25, atk: 20, spAtk: 105, def: 15, spDef: 55, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new Confusion());
		this.learnMove(new FirePunch());
		this.learnMove(new ThunderPunch());
		this.learnMove(new IcePunch());

	}
}


class Kadabra extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Kadabra",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 40, atk: 35, spAtk: 120, def: 30, spDef: 70, spd: 105 });
		this.setRandomIvs();
		this.learnMove(new PsychoCut());
		this.learnMove(new FirePunch());
		this.learnMove(new ThunderPunch());
		this.learnMove(new IcePunch());

	}
}


class Alakazam extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Alakazam",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 55, atk: 50, spAtk: 135, def: 45, spDef: 95, spd: 120 });
		this.setRandomIvs();
		this.learnMove(new PsychoCut());
		this.learnMove(new FirePunch());
		this.learnMove(new ThunderPunch());
		this.learnMove(new IcePunch());

	}
}



class Machop extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Machop",
			level: level,
			type1: "Fighting",
		});
		this.setBaseStats({ hp: 70, atk: 80, spAtk: 35, def: 50, spDef: 35, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new Revenge());
		this.learnMove(new DoubleEdge());
		this.learnMove(new KnockOff());
		this.learnMove(new DynamicPunch());

	}
}



class Machoke extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Machoke",
			level: level,
			type1: "Fighting",
		});
		this.setBaseStats({ hp: 80, atk: 100, spAtk: 50, def: 70, spDef: 60, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new LowSweep());
		this.learnMove(new DoubleEdge());
		this.learnMove(new KnockOff());
		this.learnMove(new DynamicPunch());

	}
}


class Machamp extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Machamp",
			level: level,
			type1: "Fighting",
		});
		this.setBaseStats({ hp: 90, atk: 130, spAtk: 65, def: 80, spDef: 85, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new LowSweep());
		this.learnMove(new DoubleEdge());
		this.learnMove(new KnockOff());
		this.learnMove(new DynamicPunch());

	}
}

class Bellsprout extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Bellsprout",
			level: level,
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 50, atk: 75, spAtk: 70, def: 35, spDef: 30, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new VineWhip());
		this.learnMove(new Wrap());
		this.learnMove(new PowerWhip());
		this.learnMove(new PoisonJab());

	}
}


class Weepinbell extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Weepinbell",
			level: level,
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 65, atk: 90, spAtk: 85, def: 50, spDef: 45, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new KnockOff());
		this.learnMove(new RazorLeaf());
		this.learnMove(new PowerWhip());
		this.learnMove(new PoisonJab());

	}
}


class Victreebel extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Victreebel",
			level: level,
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 80, atk: 105, spAtk: 100, def: 65, spDef: 70, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new LeafBlade());
		this.learnMove(new RazorLeaf());
		this.learnMove(new PowerWhip());
		this.learnMove(new PoisonJab());

	}
}

class Tentacool extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Tentacool",
			level: level,
			type1: "Water",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 40, atk: 40, spAtk: 50, def: 35, spDef: 100, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new PoisonSting());
		this.learnMove(new Surf());
		this.learnMove(new HydroPump());
		this.learnMove(new BubbleBeam());

	}
}


class Tentacruel extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Tentacruel",
			level: level,
			type1: "Water",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 80, atk: 70, spAtk: 80, def: 65, spDef: 120, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new PoisonSting());
		this.learnMove(new Surf());
		this.learnMove(new HydroPump());
		this.learnMove(new BubbleBeam());

	}
}


class Geodude extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Geodude",
			level: level,
			type1: "Rock",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 40, atk: 80, spAtk: 30, def: 100, spDef: 30, spd: 20 });
		this.setRandomIvs();
		this.learnMove(new Bulldoze());
		this.learnMove(new Tackle());
		this.learnMove(new StoneEdge());
		this.learnMove(new SmackDown());

	}
}


class Graveler extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Graveler",
			level: level,
			type1: "Rock",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 55, atk: 95, spAtk: 45, def: 115, spDef: 45, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new RockThrow());
		this.learnMove(new Tackle());
		this.learnMove(new StoneEdge());
		this.learnMove(new SmackDown());

	}
}


class Golem extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Graveler",
			level: level,
			type1: "Rock",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 80, atk: 120, spAtk: 55, def: 130, spDef: 65, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new RockBlast());
		this.learnMove(new Tackle());
		this.learnMove(new StoneEdge());
		this.learnMove(new SmackDown());

	}
}




class Ponyta extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Ponyta",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 50, atk: 85, spAtk: 65, def: 55, spDef: 65, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new FlameCharge());
		this.learnMove(new Ember());
		this.learnMove(new Stomp());

	}
}


class Rapidash extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Rapidash",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 65, atk: 100, spAtk: 80, def: 70, spDef: 80, spd: 105 });
		this.setRandomIvs();
		this.learnMove(new PoisonJab());
		this.learnMove(new FlameCharge());
		this.learnMove(new Ember());
		this.learnMove(new SmartStrike());

	}
}


class Slowpoke extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Slowpoke",
			level: level,
			type1: "Water",
			type2: "Psychic",
		});
		this.setBaseStats({ hp: 90, atk: 65, spAtk: 40, def: 65, spDef: 40, spd: 15 });
		this.setRandomIvs();
		this.learnMove(new WaterGun());
		this.learnMove(new Surf());
		this.learnMove(new Psychic());
		this.learnMove(new Tackle());

	}
}


class Slowbro extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Slowbro",
			level: level,
			type1: "Water",
			type2: "Psychic",
		});
		this.setBaseStats({ hp: 95, atk: 75, spAtk: 100, def: 110, spDef: 80, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Confusion());
		this.learnMove(new Surf());
		this.learnMove(new Psychic());
		this.learnMove(new Tackle());

	}
}

class Magnemite extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Magnemite",
			level: level,
			type1: "Electric",
			type2: "Steel",
		});
		this.setBaseStats({ hp: 25, atk: 35, spAtk: 95, def: 70, spDef: 55, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new Spark());
		this.learnMove(new Discharge());
		this.learnMove(new ThunderShock());
		this.learnMove(new Tackle());

	}
}


class Magneton extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Magneton",
			level: level,
			type1: "Electric",
			type2: "Steel",
		});
		this.setBaseStats({ hp: 50, atk: 60, spAtk: 120, def: 95, spDef: 70, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new Spark());
		this.learnMove(new ZapCannon());
		this.learnMove(new ThunderShock());
		this.learnMove(new Tackle());

	}
}



class Farfetchd extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Farfetch'd",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 52, atk: 90, spAtk: 58, def: 55, spDef: 62, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new Peck());
		this.learnMove(new FuryCutter());
		this.learnMove(new KnockOff());
		this.learnMove(new LeafBlade());

	}
}



class Doduo extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Doduo",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 35, atk: 85, spAtk: 35, def: 45, spDef: 35, spd: 75 });
		this.setRandomIvs();
		this.learnMove(new Pluck());
		this.learnMove(new FuryCutter());
		this.learnMove(new KnockOff());
		this.learnMove(new LeafBlade());

	}
}



class Dodrio extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Dodrio",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 60, atk: 110, spAtk: 60, def: 70, spDef: 60, spd: 110 });
		this.setRandomIvs();
		this.learnMove(new Thrash());
		this.learnMove(new FuryCutter());
		this.learnMove(new KnockOff());
		this.learnMove(new LeafBlade());

	}
}



class Seel extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Seel",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 65, atk: 45, spAtk: 45, def: 55, spDef: 70, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new IcyWind());
		this.learnMove(new Headbutt());
		this.learnMove(new AquaTail());
		this.learnMove(new IceShard());

	}
}



class Dewgong extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Dewgong",
			level: level,
			type1: "Water",
			type2: "Ice",
		});
		this.setBaseStats({ hp: 90, atk: 70, spAtk: 70, def: 80, spDef: 95, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new Dive());
		this.learnMove(new Headbutt());
		this.learnMove(new AquaTail());
		this.learnMove(new IceShard());

	}
}



class Grimer extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Grimer",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 80, atk: 80, spAtk: 40, def: 50, spDef: 50, spd: 25 });
		this.setRandomIvs();
		this.learnMove(new Pound());
		this.learnMove(new MudShot());
		this.learnMove(new Belch());
		this.learnMove(new MudSlap());

	}
}


class Muk extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Muk",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 105, atk: 105, spAtk: 65, def: 75, spDef: 100, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new GunkShot());
		this.learnMove(new MudShot());
		this.learnMove(new Belch());
		this.learnMove(new MudSlap());

	}
}


class Shellder extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Shellder",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 30, atk: 65, spAtk: 45, def: 100, spDef: 25, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new WaterGun());
		this.learnMove(new RazorShell());
		this.learnMove(new HydroPump());

	}
}


class Cloyster extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Cloyster",
			level: level,
			type1: "Water",
			type2: "Ice",
		});
		this.setBaseStats({ hp: 50, atk: 95, spAtk: 85, def: 180, spDef: 45, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new IceShard());
		this.learnMove(new IcicleCrash());
		this.learnMove(new RazorShell());
		this.learnMove(new HydroPump());

	}
}

class Gastly extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Gastly",
			level: level,
			type1: "Ghost",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 30, atk: 35, spAtk: 100, def: 30, spDef: 35, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new Lick());
		this.learnMove(new ShadowBall());
		this.learnMove(new SuckerPunch());
		this.learnMove(new Payback());

	}
}


class Haunter extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Haunter",
			level: level,
			type1: "Ghost",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 45, atk: 50, spAtk: 115, def: 45, spDef: 55, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new Lick());
		this.learnMove(new ShadowBall());
		this.learnMove(new SuckerPunch());
		this.learnMove(new Payback());

	}
}





class Gengar extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Gengar",
			level: level,
			type1: "Ghost",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 60, atk: 65, spAtk: 130, def: 60, spDef: 75, spd: 110 });
		this.setRandomIvs();
		this.learnMove(new DarkPulse());
		this.learnMove(new ShadowBall());
		this.learnMove(new SuckerPunch());
		this.learnMove(new Payback());

	}
}



class Onix extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Onix",
			level: level,
			type1: "Rock",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 35, atk: 45, spAtk: 30, def: 160, spDef: 45, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new SmackDown());
		this.learnMove(new RockThrow());
		this.learnMove(new RockSlide());
		this.learnMove(new IronTail());

	}
}


class Drowzee extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Drowzee",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 60, atk: 48, spAtk: 43, def: 45, spDef: 90, spd: 42 });
		this.setRandomIvs();
		this.learnMove(new Confusion());
		this.learnMove(new Psybeam());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new Headbutt());

	}
}



class Hypno extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Hypno",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 85, atk: 73, spAtk: 73, def: 70, spDef: 115, spd: 67 });
		this.setRandomIvs();
		this.learnMove(new Pound());
		this.learnMove(new Psybeam());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new Headbutt());

	}
}



class Krabby extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Krabby",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 30, atk: 105, spAtk: 25, def: 90, spDef: 25, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new WaterGun());
		this.learnMove(new MetalClaw());
		this.learnMove(new Stomp());
		this.learnMove(new Slam());

	}
}


class Kingler extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Kingler",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 55, atk: 130, spAtk: 50, def: 115, spDef: 50, spd: 75 });
		this.setRandomIvs();
		this.learnMove(new HammerArm());
		this.learnMove(new MetalClaw());
		this.learnMove(new Stomp());
		this.learnMove(new Slam());

	}
}


class Voltorb extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Voltorb",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 40, atk: 30, spAtk: 55, def: 50, spDef: 55, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new ThunderShock());
		this.learnMove(new Spark());
		this.learnMove(new Rollout());

	}
}


class Electrode extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Electrode",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 60, atk: 50, spAtk: 80, def: 70, spDef: 80, spd: 150 });
		this.setRandomIvs();
		this.learnMove(new ChargeBeam());
		this.learnMove(new ThunderShock());
		this.learnMove(new Spark());
		this.learnMove(new Rollout());

	}
}

class Exeggcute extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Exeggcute",
			level: level,
			type1: "Grass",
			type2: "Psychic",
		});
		this.setBaseStats({ hp: 60, atk: 40, spAtk: 60, def: 80, spDef: 45, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new Absorb());
		this.learnMove(new BulletSeed());
		this.learnMove(new Confusion());
		this.learnMove(new MegaDrain());

	}
}


class Exeggutor extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Exeggutor",
			level: level,
			type1: "Grass",
			type2: "Psychic",
		});
		this.setBaseStats({ hp: 95, atk: 95, spAtk: 125, def: 85, spDef: 75, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new SeedBomb());
		this.learnMove(new BulletSeed());
		this.learnMove(new Confusion());
		this.learnMove(new MegaDrain());

	}
}


class Cubone extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Cubone",
			level: level,
			type1: "Ground",
		});
		this.setBaseStats({ hp: 50, atk: 50, spAtk: 40, def: 95, spDef: 50, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new MudSlap());
		this.learnMove(new BoneRush());
		this.learnMove(new DoubleEdge());
		this.learnMove(new FalseSwipe());

	}
}



class Marowak extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Marowak",
			level: level,
			type1: "Ground",
		});
		this.setBaseStats({ hp: 60, atk: 80, spAtk: 50, def: 110, spDef: 80, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new Headbutt());
		this.learnMove(new BoneRush());
		this.learnMove(new DoubleEdge());
		this.learnMove(new Bonemerang());

	}
}



class Hitmonlee extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Hitmonlee",
			level: level,
			type1: "Fighting",
		});
		this.setBaseStats({ hp: 50, atk: 120, spAtk: 35, def: 53, spDef: 110, spd: 87 });
		this.setRandomIvs();
		this.learnMove(new LowSweep());
		this.learnMove(new Tackle());
		this.learnMove(new DoubleKick());
		this.learnMove(new SuckerPunch());

	}
}


class Hitmonchan extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Hitmonchan",
			level: level,
			type1: "Fighting",
		});
		this.setBaseStats({ hp: 50, atk: 105, spAtk: 35, def: 79, spDef: 110, spd: 76 });
		this.setRandomIvs();
		this.learnMove(new BulletPunch());
		this.learnMove(new Tackle());
		this.learnMove(new FirePunch());
		this.learnMove(new IcePunch());

	}
}


class Lickitung extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Lickitung",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 90, atk: 55, spAtk: 60, def: 75, spDef: 75, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Lick());
		this.learnMove(new PowerWhip());
		this.learnMove(new Stomp());
		this.learnMove(new Rollout());

	}
}


class Koffing extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Koffing",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 40, atk: 65, spAtk: 60, def: 95, spDef: 45, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new Assurance());
		this.learnMove(new Belch());
		this.learnMove(new Smog());

	}
}


class Weezing extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Weezing",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 65, atk: 90, spAtk: 85, def: 120, spDef: 70, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new HeatWave());
		this.learnMove(new Assurance());
		this.learnMove(new Belch());
		this.learnMove(new Smog());

	}
}


class Rhyhorn extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Rhyhorn",
			level: level,
			type1: "Ground",
			type2: "Rock",
		});
		this.setBaseStats({ hp: 80, atk: 85, spAtk: 30, def: 95, spDef: 30, spd: 25 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new SmackDown());
		this.learnMove(new Bulldoze());
		this.learnMove(new Stomp());

	}
}


class Rhydon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Rhydon",
			level: level,
			type1: "Ground",
			type2: "Rock",
		});
		this.setBaseStats({ hp: 105, atk: 130, spAtk: 45, def: 120, spDef: 45, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new Earthquake());
		this.learnMove(new SmackDown());
		this.learnMove(new StoneEdge());
		this.learnMove(new Stomp());

	}
}


class Chansey extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Chansey",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 250, atk: 5, spAtk: 35, def: 5, spDef: 105, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new Covet());
		this.learnMove(new DisarmingVoice());
		this.learnMove(new TailWhip());
		this.learnMove(new TakeDown());

	}
}


class Tangela extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Tangela",
			level: level,
			type1: "Grass",
		});
		this.setBaseStats({ hp: 65, atk: 55, spAtk: 100, def: 115, spDef: 40, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new Absorb());
		this.learnMove(new VineWhip());
		this.learnMove(new KnockOff());
		this.learnMove(new Slam());

	}
}

class Kangaskhan extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Kangaskhan",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 105, atk: 95, spAtk: 40, def: 80, spDef: 80, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new Pound());
		this.learnMove(new TailWhip());
		this.learnMove(new Bite());
		this.learnMove(new Headbutt());

	}
}


class Horsea extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Horsea",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 30, atk: 40, spAtk: 70, def: 70, spDef: 25, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new WaterGun());
		this.learnMove(new BubbleBeam());
		this.learnMove(new HydroPump());
		this.learnMove(new Leer());

	}
}



class Seadra extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Seadra",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 55, atk: 65, spAtk: 95, def: 95, spDef: 45, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new DragonPulse());
		this.learnMove(new BubbleBeam());
		this.learnMove(new HydroPump());
		this.learnMove(new Leer());

	}
}



class Goldeen extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Goldeen",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 45, atk: 67, spAtk: 35, def: 60, spDef: 50, spd: 63 });
		this.setRandomIvs();
		this.learnMove(new Peck());
		this.learnMove(new WaterPulse());
		this.learnMove(new Waterfall());
		this.learnMove(new TailWhip());

	}
}


class Seaking extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Seaking",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 80, atk: 92, spAtk: 65, def: 65, spDef: 80, spd: 68 });
		this.setRandomIvs();
		this.learnMove(new Peck());
		this.learnMove(new WaterPulse());
		this.learnMove(new Waterfall());
		this.learnMove(new HornAttack());

	}
}


class Staryu extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Staryu",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 30, atk: 45, spAtk: 70, def: 55, spDef: 55, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new WaterGun());
		this.learnMove(new RapidSpin());
		this.learnMove(new ConfuseRay());

	}
}




class Starmie extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Starmie",
			level: level,
			type1: "Water",
			type2: "Psychic",
		});
		this.setBaseStats({ hp: 60, atk: 75, spAtk: 100, def: 85, spDef: 85, spd: 115 });
		this.setRandomIvs();
		this.learnMove(new Psychic());
		this.learnMove(new WaterGun());
		this.learnMove(new RapidSpin());
		this.learnMove(new ConfuseRay());

	}
}




class MrMime extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Mr. Mime",
			level: level,
			type1: "Psychic",
			type2: "Fairy",
		});
		this.setBaseStats({ hp: 40, atk: 45, spAtk: 100, def: 65, spDef: 120, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new Pound());
		this.learnMove(new Confusion());
		this.learnMove(new Psybeam());
		this.learnMove(new SuckerPunch());

	}
}




class Scyther extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Scyther",
			level: level,
			type1: "Bug",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 70, atk: 110, spAtk: 55, def: 80, spDef: 80, spd: 115 });
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		this.learnMove(new FuryCutter());
		this.learnMove(new WingAttack());
		this.learnMove(new Slash());

	}
}



class Jynx extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Jynx",
			level: level,
			type1: "Ice",
			type2: "Psychic",
		});
		this.setBaseStats({ hp: 65, atk: 50, spAtk: 115, def: 35, spDef: 95, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new Lick());
		this.learnMove(new Pound());
		this.learnMove(new Confusion());
		this.learnMove(new IcePunch());

	}
}



class Electrabuzz extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Electrabuzz",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 65, atk: 83, spAtk: 95, def: 57, spDef: 85, spd: 105 });
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		this.learnMove(new Swift());
		this.learnMove(new ThunderBolt());
		this.learnMove(new ThunderShock());

	}
}




class Magmar extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Magmar",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 65, atk: 95, spAtk: 100, def: 57, spDef: 85, spd: 93 });
		this.setRandomIvs();
		this.learnMove(new Ember());
		this.learnMove(new Leer());
		this.learnMove(new FirePunch());
		this.learnMove(new Smog());

	}
}



class Pinsir extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Pinsir",
			level: level,
			type1: "Bug",
		});
		this.setBaseStats({ hp: 65, atk: 125, spAtk: 55, def: 100, spDef: 70, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new BugBite());
		this.learnMove(new DoubleHit());
		this.learnMove(new Superpower());
		this.learnMove(new Harden());

	}
}




class Tauros extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Tauros",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 75, atk: 100, spAtk: 40, def: 95, spDef: 70, spd: 110 });
		this.setRandomIvs();
		this.learnMove(new HornAttack());
		this.learnMove(new Payback());
		this.learnMove(new TailWhip());
		this.learnMove(new Assurance());

	}
}




class Magikarp extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Magikarp",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 20, atk: 10, spAtk: 15, def: 55, spDef: 20, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new Splash());
		this.learnMove(new Tackle());
		this.learnMove(new Flail());

	}
}




class Gyarados extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Gyarados",
			level: level,
			type1: "Water",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 95, atk: 125, spAtk: 60, def: 79, spDef: 100, spd: 81 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new IceFang());
		this.learnMove(new AquaTail());
		this.learnMove(new HydroPump());

	}
}


class Lapras extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Lapras",
			level: level,
			type1: "Water",
			type2: "Ice",
		});
		this.setBaseStats({ hp: 130, atk: 85, spAtk: 85, def: 80, spDef: 95, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new WaterGun());
		this.learnMove(new IceBeam());
		this.learnMove(new IceShard());
		this.learnMove(new HydroPump());

	}
}



class Ditto extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Ditto",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 48, atk: 48, spAtk: 48, def: 48, spDef: 48, spd: 48 });
		this.setRandomIvs();
		this.learnMove(new Transform());
	}
}

class Eevee extends Pokimon {
	constructor(level = 1) {
		super({
			name: "Eevee",
			level: level,
			type1: "Normal"
		});
		this.setBaseStats({ hp: 55, atk: 55, spAtk: 45, def: 50, spDef: 65, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		this.learnMove(new Bite());
		this.learnMove(new BabyDollEyes());
		this.learnMove(new DoubleEdge());

	}
}



class Vapoureon extends Pokimon {
	constructor(level = 1) {
		super({
			name: "Vapoureon",
			level: level,
			type1: "Water"
		});
		this.setBaseStats({ hp: 130, atk: 65, spAtk: 110, def: 60, spDef: 95, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		this.learnMove(new AuroraBeam());
		this.learnMove(new WaterPulse());
		this.learnMove(new HydroPump());
	}
}

class Jolteon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Jolteon",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 65, atk: 65, spAtk: 110, def: 60, spDef: 95, spd: 130 });
		this.setRandomIvs();
		this.learnMove(new Swift());
		this.learnMove(new ThunderFang());
		this.learnMove(new QuickAttack());
		this.learnMove(new Bite());

	}
}

class Flareon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Flareon",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 65, atk: 130, spAtk: 95, def: 60, spDef: 110, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new LastResort());
		this.learnMove(new FireBlitz());
		this.learnMove(new Smog());
		this.learnMove(new Bite());

	}
}







class Porygon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Porygon",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 65, atk: 60, spAtk: 85, def: 70, spDef: 75, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new ThunderShock());
		this.learnMove(new Discharge());
		this.learnMove(new Psybeam());

	}
}




class Omanyte extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Omanyte",
			level: level,
			type1: "Rock",
			type2: "Water",
		});
		this.setBaseStats({ hp: 35, atk: 40, spAtk: 90, def: 100, spDef: 55, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new Rollout());
		this.learnMove(new MudShot());
		this.learnMove(new Surf());
		this.learnMove(new HydroPump());

	}
}


class Omastar extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Omastar",
			level: level,
			type1: "Rock",
			type2: "Water",
		});
		this.setBaseStats({ hp: 70, atk: 60, spAtk: 115, def: 125, spDef: 70, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new Crunch());
		this.learnMove(new MudShot());
		this.learnMove(new Rollout());
		this.learnMove(new HydroPump());

	}
}


class Kabuto extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Kabuto",
			level: level,
			type1: "Rock",
			type2: "Water",
		});
		this.setBaseStats({ hp: 30, atk: 80, spAtk: 55, def: 90, spDef: 45, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new Absorb());
		this.learnMove(new Harden());
		this.learnMove(new Scratch());
		this.learnMove(new MudShot());

	}
}




class Kabutops extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Kabutops",
			level: level,
			type1: "Rock",
			type2: "Water",
		});
		this.setBaseStats({ hp: 60, atk: 115, spAtk: 65, def: 105, spDef: 70, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new NightSlash());
		this.learnMove(new Harden());
		this.learnMove(new Scratch());
		this.learnMove(new MudShot());

	}
}


class Aerodactyl extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Aerodactyl",
			level: level,
			type1: "Rock",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 80, atk: 105, spAtk: 60, def: 65, spDef: 75, spd: 130 });
		this.setRandomIvs();
		this.learnMove(new Bite());
		this.learnMove(new WingAttack());
		this.learnMove(new StoneEdge());
		this.learnMove(new Crunch());

	}
}


class Snorlax extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Snorlax",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 160, atk: 110, spAtk: 65, def: 65, spDef: 110, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Flail());
		this.learnMove(new Lick());
		this.learnMove(new Crunch());
		this.learnMove(new BodySlam());

	}
}



class Articuno extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Articuno",
			level: level,
			type1: "Ice",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 90, atk: 85, spAtk: 95, def: 100, spDef: 125, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new Gust());
		this.learnMove(new IceShard());
		this.learnMove(new IceBeam());
		this.learnMove(new AncientPower());

	}
}



class Zapdos extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Zapdos",
			level: level,
			type1: "Electric",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 90, atk: 90, spAtk: 125, def: 85, spDef: 90, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new Peck());
		this.learnMove(new ThunderShock());
		this.learnMove(new Discharge());
		this.learnMove(new Pluck());

	}
}




class Moltres extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Moltres",
			level: level,
			type1: "Fire",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 90, atk: 100, spAtk: 125, def: 90, spDef: 85, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new Gust());
		this.learnMove(new WingAttack());
		this.learnMove(new HeatWave());
		this.learnMove(new Hurricane());

	}
}


class Dratini extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Dratini",
			level: level,
			type1: "Dragon",
		});
		this.setBaseStats({ hp: 41, atk: 64, spAtk: 50, def: 45, spDef: 50, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new Twister());
		this.learnMove(new Slam());
		this.learnMove(new AquaTail());
		this.learnMove(new Leer());

	}
}


class Dragonair extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Dragonair",
			level: level,
			type1: "Dragon",
		});
		this.setBaseStats({ hp: 61, atk: 84, spAtk: 70, def: 65, spDef: 70, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new Wrap());
		this.learnMove(new Slam());
		this.learnMove(new AquaTail());
		this.learnMove(new Leer());

	}
}



class Dragonite extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Dragonite",
			level: level,
			type1: "Dragon",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 91, atk: 134, spAtk: 100, def: 95, spDef: 100, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new FirePunch());
		this.learnMove(new Leer());
		this.learnMove(new Slam());
		this.learnMove(new AquaTail());

	}
}


class Mewtwo extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Mewtwo",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 106, atk: 110, spAtk: 154, def: 90, spDef: 90, spd: 130 });
		this.setRandomIvs();
		this.learnMove(new Confusion());
		this.learnMove(new Psychic());
		this.learnMove(new AuraSphere());
		this.learnMove(new PsychoCut());

	}
}


class Mew extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Mew",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 100, atk: 100, spAtk: 100, def: 100, spDef: 100, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new Pound());
		this.learnMove(new AncientPower());
		this.learnMove(new AuraSphere());
		this.learnMove(new Psychic());

	}
}




class Treecko extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Treecko",
			level: level,
			type1: "Grass",
		});
		this.setBaseStats({ hp: 40, atk: 45, spAtk: 65, def: 35, spDef: 55, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new Leer());
		this.learnMove(new Pound());
		this.learnMove(new Slam());
		this.learnMove(new Leafage());

	}
}





class Grovyle extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Grovyle",
			level: level,
			type1: "Grass",
		});
		this.setBaseStats({ hp: 50, atk: 65, spAtk: 85, def: 45, spDef: 65, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new Assurance());
		this.learnMove(new Pound());
		this.learnMove(new LeafStorm());
		this.learnMove(new Leafage());

	}
}





class Sceptile extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Sceptile",
			level: level,
			type1: "Grass",
		});
		this.setBaseStats({ hp: 70, atk: 85, spAtk: 105, def: 65, spDef: 85, spd: 120 });
		this.setRandomIvs();
		this.learnMove(new Slam());
		this.learnMove(new Pound());
		this.learnMove(new LeafStorm());
		this.learnMove(new GigaDrain());

	}
}



class Torchic extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Torchic",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 45, atk: 60, spAtk: 70, def: 40, spDef: 50, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new Scratch());
		this.learnMove(new Ember());
		this.learnMove(new QuickAttack());
		this.learnMove(new FlameCharge());

	}
}



class Combusken extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Combusken",
			level: level,
			type1: "Fire",
			type2: "Fighting",
		});
		this.setBaseStats({ hp: 60, atk: 85, spAtk: 85, def: 60, spDef: 60, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new AerialAce());
		this.learnMove(new Ember());
		this.learnMove(new BlazeKick());
		this.learnMove(new FlameCharge());

	}
}



class Blaziken extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Blaziken",
			level: level,
			type1: "Fire",
			type2: "Fighting",
		});
		this.setBaseStats({ hp: 80, atk: 120, spAtk: 110, def: 70, spDef: 70, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new FireBlitz());
		this.learnMove(new Ember());
		this.learnMove(new BlazeKick());
		this.learnMove(new FlameCharge());

	}
}




class Mudkip extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Mudkip",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 50, atk: 70, spAtk: 50, def: 50, spDef: 50, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new WaterGun());
		this.learnMove(new RockThrow());
		this.learnMove(new Surf());

	}
}




class Marshtomp extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Marshtomp",
			level: level,
			type1: "Water",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 70, atk: 85, spAtk: 60, def: 70, spDef: 70, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new WaterPulse());
		this.learnMove(new WaterGun());
		this.learnMove(new RockThrow());
		this.learnMove(new Surf());

	}
}



class Swampert extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Swampert",
			level: level,
			type1: "Water",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 100, atk: 110, spAtk: 85, def: 90, spDef: 90, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new TakeDown());
		this.learnMove(new WaterGun());
		this.learnMove(new RockThrow());
		this.learnMove(new Surf());

	}
}



class Poochyena extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Poochyena",
			level: level,
			type1: "Dark",
		});
		this.setBaseStats({ hp: 35, atk: 55, spAtk: 30, def: 35, spDef: 30, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new SandAttack());
		this.learnMove(new Bite());
		this.learnMove(new Crunch());

	}
}





class Mightyena extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Mightyena",
			level: level,
			type1: "Dark",
		});
		this.setBaseStats({ hp: 70, atk: 90, spAtk: 60, def: 70, spDef: 60, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new PlayRough());
		this.learnMove(new IceFang());
		this.learnMove(new Bite());
		this.learnMove(new FireFang());

	}
}



class Zigzagoon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Zigzagoon",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 38, atk: 30, spAtk: 30, def: 41, spDef: 41, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new Headbutt());
		this.learnMove(new PinMissle());
		this.learnMove(new TailWhip());

	}
}

class Linoone extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Linoone",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 78, atk: 70, spAtk: 50, def: 61, spDef: 61, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new TakeDown());
		this.learnMove(new Headbutt());
		this.learnMove(new PinMissle());
		this.learnMove(new TailWhip());

	}
}



class Wurmple extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Wurmple",
			level: level,
			type1: "Bug",
		});
		this.setBaseStats({ hp: 45, atk: 45, spAtk: 20, def: 35, spDef: 30, spd: 20 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new PoisonSting());
		this.learnMove(new BugBite());
		this.learnMove(new StringShot());

	}
}


class Silcoon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Silcoon",
			level: level,
			type1: "Bug",
		});
		this.setBaseStats({ hp: 50, atk: 35, spAtk: 25, def: 55, spDef: 25, spd: 15 });
		this.setRandomIvs();
		this.learnMove(new Harden());
	}
}



class Beautifly extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Beautifly",
			level: level,
			type1: "Bug",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 60, atk: 70, spAtk: 100, def: 50, spDef: 50, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new BugBite());
		this.learnMove(new Gust());
		this.learnMove(new MegaDrain());
		this.learnMove(new Absorb());

	}
}



class Cascoon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Cascoon",
			level: level,
			type1: "Bug",
		});
		this.setBaseStats({ hp: 50, atk: 35, spAtk: 25, def: 55, spDef: 25, spd: 15 });
		this.setRandomIvs();
		this.learnMove(new Harden());
	}
}



class Dustox extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Dustox",
			level: level,
			type1: "Bug",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 60, atk: 50, spAtk: 50, def: 70, spDef: 90, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new BugBite());
		this.learnMove(new Gust());
		this.learnMove(new PoisonSting());
		this.learnMove(new Psybeam());

	}
}


class Lotad extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Lotad",
			level: level,
			type1: "Water",
			type2: "Grass",
		});
		this.setBaseStats({ hp: 40, atk: 30, spAtk: 40, def: 30, spDef: 50, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Absorb());
		this.learnMove(new BubbleBeam());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new WaterGun());

	}
}


class Lombre extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Lombre",
			level: level,
			type1: "Water",
			type2: "Grass",
		});
		this.setBaseStats({ hp: 60, atk: 50, spAtk: 60, def: 50, spDef: 70, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new KnockOff());
		this.learnMove(new HydroPump());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new WaterGun());

	}
}



class Ludicolo extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Ludicolo",
			level: level,
			type1: "Water",
			type2: "Grass",
		});
		this.setBaseStats({ hp: 80, atk: 70, spAtk: 90, def: 70, spDef: 100, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new KnockOff());
		this.learnMove(new HydroPump());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new WaterGun());

	}
}



class Seedot extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Seedot",
			level: level,
			type1: "Grass",
		});
		this.setBaseStats({ hp: 40, atk: 40, spAtk: 30, def: 50, spDef: 30, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new Absorb());
		this.learnMove(new Astonish());
		this.learnMove(new Payback());

	}
}



class Nuzleaf extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Nuzleaf",
			level: level,
			type1: "Grass",
			type2: "Dark",
		});
		this.setBaseStats({ hp: 70, atk: 70, spAtk: 60, def: 40, spDef: 40, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new AirCutter());
		this.learnMove(new Absorb());
		this.learnMove(new Astonish());
		this.learnMove(new Payback());

	}
}



class Shiftry extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Shiftry",
			level: level,
			type1: "Grass",
			type2: "Dark",
		});
		this.setBaseStats({ hp: 90, atk: 100, spAtk: 90, def: 60, spDef: 60, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new AirCutter());
		this.learnMove(new Hurricane());
		this.learnMove(new Payback());
		this.learnMove(new SunnyDay());

	}
}


class Taillow extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Taillow",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 40, atk: 55, spAtk: 30, def: 30, spDef: 30, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new Peck());
		this.learnMove(new QuickAttack());
		this.learnMove(new WingAttack());
		this.learnMove(new AerialAce());

	}
}


class Swellow extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Swellow",
			level: level,
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 60, atk: 85, spAtk: 75, def: 60, spDef: 50, spd: 125 });
		this.setRandomIvs();
		this.learnMove(new AirSlash());
		this.learnMove(new QuickAttack());
		this.learnMove(new WingAttack());
		this.learnMove(new AerialAce());

	}
}



class Wingull extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Wingull",
			level: level,
			type1: "Water",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 40, atk: 30, spAtk: 55, def: 30, spDef: 30, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new WaterGun());
		this.learnMove(new QuickAttack());
		this.learnMove(new WingAttack());
		this.learnMove(new AerialAce());

	}
}


class Pelipper extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Pelipper",
			level: level,
			type1: "Water",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 60, atk: 50, spAtk: 95, def: 100, spDef: 70, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new WaterPulse());
		this.learnMove(new QuickAttack());
		this.learnMove(new WingAttack());
		this.learnMove(new AerialAce());

	}
}



class Ralts extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Ralts",
			level: level,
			type1: "Psychic",
			type2: "Fairy",
		});
		this.setBaseStats({ hp: 28, atk: 25, spAtk: 45, def: 25, spDef: 35, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new DisarmingVoice());
		this.learnMove(new Confusion());
		this.learnMove(new Psybeam());
		this.learnMove(new Psychic());

	}
}


class Kirlia extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Kirlia",
			level: level,
			type1: "Psychic",
			type2: "Fairy",
		});
		this.setBaseStats({ hp: 38, atk: 35, spAtk: 65, def: 35, spDef: 55, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new DrainingKiss());
		this.learnMove(new Confusion());
		this.learnMove(new Psybeam());
		this.learnMove(new Psychic());

	}
}


class Gardevoir extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Gardevoir",
			level: level,
			type1: "Psychic",
			type2: "Fairy",
		});
		this.setBaseStats({ hp: 68, atk: 65, spAtk: 125, def: 65, spDef: 115, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new MysticalFire());
		this.learnMove(new Confusion());
		this.learnMove(new Psybeam());
		this.learnMove(new Psychic());

	}
}


class Surskit extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Surskit",
			level: level,
			type1: "Bug",
			type2: "Water",
		});
		this.setBaseStats({ hp: 40, atk: 30, spAtk: 50, def: 32, spDef: 52, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new WaterGun());
		this.learnMove(new QuickAttack());
		this.learnMove(new BubbleBeam());
		this.learnMove(new Soak());

	}
}



class Masquerain extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Masquerain",
			level: level,
			type1: "Bug",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 70, atk: 60, spAtk: 100, def: 62, spDef: 82, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new AirCutter());
		this.learnMove(new QuickAttack());
		this.learnMove(new BubbleBeam());
		this.learnMove(new Soak());

	}
}



class Shroomish extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Shroomish",
			level: level,
			type1: "Grass",
		});
		this.setBaseStats({ hp: 60, atk: 40, spAtk: 40, def: 60, spDef: 60, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new Absorb());
		this.learnMove(new Tackle());
		this.learnMove(new Headbutt());
		this.learnMove(new MegaDrain());

	}
}




class Breloom extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Breloom",
			level: level,
			type1: "Grass",
			type2: "Fighting",
		});
		this.setBaseStats({ hp: 60, atk: 130, spAtk: 60, def: 80, spDef: 60, spd: 70 });
		this.setRandomIvs();
		this.learnMove(new Headbutt());
		this.learnMove(new Tackle());
		this.learnMove(new Headbutt());
		this.learnMove(new MegaDrain());

	}
}



class Slakoth extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Slakoth",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 60, atk: 60, spAtk: 35, def: 60, spDef: 35, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Scratch());
		this.learnMove(new Headbutt());
		this.learnMove(new PlayRough());
		this.learnMove(new Covet());

	}
}




class Vigoroth extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Vigoroth",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 80, atk: 80, spAtk: 55, def: 80, spDef: 55, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new Slash());
		this.learnMove(new FurySwipes());
		this.learnMove(new Scratch());
		this.learnMove(new ThroatChop());

	}
}


class Slaking extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Slaking",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 150, atk: 160, spAtk: 95, def: 100, spDef: 65, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new Covet());
		this.learnMove(new SuckerPunch());
		this.learnMove(new Scratch());
		this.learnMove(new ThroatChop());

	}
}




class Nincada extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Nincada",
			level: level,
			type1: "Bug",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 31, atk: 45, spAtk: 30, def: 90, spDef: 30, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new SandAttack());
		this.learnMove(new Scratch());
		this.learnMove(new MudSlap());
		this.learnMove(new Dig());

	}
}



class Ninjask extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Ninjask",
			level: level,
			type1: "Bug",
			type2: "Flying",
		});
		this.setBaseStats({ hp: 61, atk: 90, spAtk: 50, def: 45, spDef: 50, spd: 160 });
		this.setRandomIvs();
		this.learnMove(new AerialAce());
		this.learnMove(new MetalClaw());
		this.learnMove(new MudSlap());
		this.learnMove(new Dig());

	}
}



class Shedinja extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Shedinja",
			level: level,
			type1: "Bug",
			type2: "Ghost",
		});
		this.setBaseStats({ hp: 1, atk: 90, spAtk: 30, def: 45, spDef: 30, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new FalseSwipe());
		this.learnMove(new MetalClaw());
		this.learnMove(new MudSlap());
		this.learnMove(new Dig());

	}
}



class Whismur extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Whismur",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 64, atk: 51, spAtk: 51, def: 23, spDef: 23, spd: 28 });
		this.setRandomIvs();
		this.learnMove(new Pound());
		this.learnMove(new Stomp());
		this.learnMove(new Astonish());
		this.learnMove(new EchoedVoice());

	}
}



class Loudred extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Loudred",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 84, atk: 71, spAtk: 71, def: 43, spDef: 43, spd: 48 });
		this.setRandomIvs();
		this.learnMove(new Bite());
		this.learnMove(new Pound());
		this.learnMove(new Astonish());
		this.learnMove(new Stomp());

	}
}


class Exploud extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Exploud",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 104, atk: 91, spAtk: 91, def: 63, spDef: 73, spd: 78 });
		this.setRandomIvs();
		this.learnMove(new FireFang());
		this.learnMove(new IceFang());
		this.learnMove(new Astonish());
		this.learnMove(new Stomp());

	}
}



class Makuhita extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Makuhita",
			level: level,
			type1: "Fighting",
		});
		this.setBaseStats({ hp: 72, atk: 60, spAtk: 20, def: 30, spDef: 30, spd: 25 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new FakeOut());
		this.learnMove(new SandAttack());
		this.learnMove(new ArmThrust());

	}
}



class Hariyama extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Hariyama",
			level: level,
			type1: "Fighting",
		});
		this.setBaseStats({ hp: 144, atk: 120, spAtk: 40, def: 60, spDef: 60, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new ArmThrust());
		this.learnMove(new Tackle());
		this.learnMove(new KnockOff());
		this.learnMove(new FakeOut());

	}
}




class Azurill extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Azurill",
			level: level,
			type1: "Normal",
			type2: "Fairy",
		});
		this.setBaseStats({ hp: 50, atk: 20, spAtk: 20, def: 40, spDef: 40, spd: 20 });
		this.setRandomIvs();
		this.learnMove(new WaterGun());
		this.learnMove(new TailWhip());
		this.learnMove(new Slam());
		this.learnMove(new BubbleBeam());

	}
}


class Nosepass extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Nosepass",
			level: level,
			type1: "Rock",
		});
		this.setBaseStats({ hp: 30, atk: 45, spAtk: 45, def: 135, spDef: 90, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new RockThrow());
		this.learnMove(new RockBlast());
		this.learnMove(new Discharge());

	}
}




class Skitty extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Skitty",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 50, atk: 45, spAtk: 35, def: 45, spDef: 35, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new FakeOut());
		this.learnMove(new Tackle());
		this.learnMove(new Payback());
		this.learnMove(new DisarmingVoice());

	}
}



class Delcatty extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Delcatty",
			level: level,
			type1: "Normal",
		});
		this.setBaseStats({ hp: 70, atk: 65, spAtk: 55, def: 65, spDef: 55, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new Covet());
		this.learnMove(new DisarmingVoice());
		this.learnMove(new DoubleEdge());
		this.learnMove(new FakeOut());

	}
}


class Sableye extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Sableye",
			level: level,
			type1: "Dark",
			type2: "Ghost",
		});
		this.setBaseStats({ hp: 50, atk: 75, spAtk: 65, def: 75, spDef: 65, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new Scratch());
		this.learnMove(new Astonish());
		this.learnMove(new FakeOut());
		this.learnMove(new KnockOff());

	}
}



class Mawile extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Mawile",
			level: level,
			type1: "Steel",
			type2: "Fairy",
		});
		this.setBaseStats({ hp: 50, atk: 85, spAtk: 55, def: 58, spDef: 55, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new Bite());
		this.learnMove(new Astonish());
		this.learnMove(new SuckerPunch());
		this.learnMove(new FairyWind());

	}
}



class Aron extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Aron",
			level: level,
			type1: "Steel",
			type2: "Rock",
		});
		this.setBaseStats({ hp: 50, atk: 70, spAtk: 40, def: 100, spDef: 40, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new Headbutt());
		this.learnMove(new TakeDown());
		this.learnMove(new MetalClaw());

	}
}


class Lairon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Lairon",
			level: level,
			type1: "Steel",
			type2: "Rock",
		});
		this.setBaseStats({ hp: 60, atk: 90, spAtk: 50, def: 140, spDef: 50, spd: 49 });
		this.setRandomIvs();
		this.learnMove(new RockSlide());
		this.learnMove(new Headbutt());
		this.learnMove(new TakeDown());
		this.learnMove(new MetalClaw());

	}
}



class Aggron extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Lairon",
			level: level,
			type1: "Steel",
			type2: "Rock",
		});
		this.setBaseStats({ hp: 70, atk: 110, spAtk: 60, def: 180, spDef: 60, spd: 50 });
		this.setRandomIvs();
		this.learnMove(new IronHead());
		this.learnMove(new Headbutt());
		this.learnMove(new TakeDown());
		this.learnMove(new MetalClaw());

	}
}



class Meditite extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Meditite",
			level: level,
			type1: "Fighting",
			type2: "Psychic",
		});
		this.setBaseStats({ hp: 30, atk: 40, spAtk: 40, def: 55, spDef: 55, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new Confusion());
		this.learnMove(new Psybeam());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new Feint());

	}
}



class Medicham extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Medicham",
			level: level,
			type1: "Fighting",
			type2: "Psychic",
		});
		this.setBaseStats({ hp: 60, atk: 60, spAtk: 60, def: 75, spDef: 75, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new Confusion());
		this.learnMove(new FirePunch());
		this.learnMove(new IcePunch());
		this.learnMove(new Feint());

	}
}


class Electrike extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Electrike",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 40, atk: 45, spAtk: 65, def: 40, spDef: 40, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new Leer());
		this.learnMove(new QuickAttack());
		this.learnMove(new Bite());

	}
}


class Manectric extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Manectric",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 70, atk: 75, spAtk: 105, def: 60, spDef: 60, spd: 105 });
		this.setRandomIvs();
		this.learnMove(new FireFang());
		this.learnMove(new Discharge());
		this.learnMove(new QuickAttack());
		this.learnMove(new Bite());

	}
}


class Plusle extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Plusle",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 60, atk: 50, spAtk: 85, def: 40, spDef: 75, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		this.learnMove(new Discharge());
		this.learnMove(new Swift());
		this.learnMove(new ElectroBall());

	}
}


class Minun extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Minun",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 60, atk: 40, spAtk: 75, def: 50, spDef: 85, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		this.learnMove(new Discharge());
		this.learnMove(new Swift());
		this.learnMove(new ElectroBall());

	}
}




class Volbeat extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Volbeat",
			level: level,
			type1: "Bug",
		});
		this.setBaseStats({ hp: 65, atk: 73, spAtk: 47, def: 75, spDef: 85, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new QuickAttack());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new PlayRough());

	}
}



class Illumise extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Illumise",
			level: level,
			type1: "Bug",
		});
		this.setBaseStats({ hp: 65, atk: 47, spAtk: 73, def: 75, spDef: 85, spd: 85 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new QuickAttack());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new PlayRough());

	}
}


class Roselia extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Roselia",
			level: level,
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 50, atk: 60, spAtk: 100, def: 45, spDef: 80, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new Absorb());
		this.learnMove(new PoisonSting());
		this.learnMove(new MegaDrain());
		this.learnMove(new GigaDrain());

	}
}



class Gulpin extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Gulpin",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 70, atk: 43, spAtk: 43, def: 53, spDef: 53, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new Pound());
		this.learnMove(new Sludge());
		this.learnMove(new Amnesia());
		this.learnMove(new AcidSpray());

	}
}


class Swalot extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Swalot",
			level: level,
			type1: "Poison",
		});
		this.setBaseStats({ hp: 100, atk: 73, spAtk: 73, def: 83, spDef: 83, spd: 55 });
		this.setRandomIvs();
		this.learnMove(new Pound());
		this.learnMove(new Sludge());
		this.learnMove(new Amnesia());
		this.learnMove(new AcidSpray());

	}
}


class Carvanha extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Carvanha",
			level: level,
			type1: "Water",
			type2: "Dark",
		});
		this.setBaseStats({ hp: 45, atk: 90, spAtk: 65, def: 20, spDef: 20, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new Leer());
		this.learnMove(new PoisonFang());
		this.learnMove(new Bite());
		this.learnMove(new IceFang());

	}
}


class Sharpedo extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Sharpedo",
			level: level,
			type1: "Water",
			type2: "Dark",
		});
		this.setBaseStats({ hp: 70, atk: 120, spAtk: 95, def: 40, spDef: 40, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new AquaJet());
		this.learnMove(new PoisonFang());
		this.learnMove(new Bite());
		this.learnMove(new IceFang());

	}
}



class Wailmer extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Wailmer",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 130, atk: 70, spAtk: 70, def: 35, spDef: 35, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new Splash());
		this.learnMove(new WaterGun());
		this.learnMove(new Astonish());
		this.learnMove(new WaterPulse());

	}
}



class Wailord extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Wailord",
			level: level,
			type1: "Water",
		});
		this.setBaseStats({ hp: 170, atk: 90, spAtk: 90, def: 45, spDef: 45, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new Splash());
		this.learnMove(new Soak());
		this.learnMove(new Astonish());
		this.learnMove(new WaterPulse());

	}
}


class Numel extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Numel",
			level: level,
			type1: "Fire",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 60, atk: 60, spAtk: 65, def: 40, spDef: 45, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new Tackle());
		this.learnMove(new Ember());
		this.learnMove(new Bulldoze());
		this.learnMove(new TakeDown());

	}
}



class Camerupt extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Camerupt",
			level: level,
			type1: "Fire",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 70, atk: 100, spAtk: 105, def: 70, spDef: 75, spd: 40 });
		this.setRandomIvs();
		this.learnMove(new TakeDown());
		this.learnMove(new Ember());
		this.learnMove(new Bulldoze());
		this.learnMove(new TakeDown());

	}
}



class Torkoal extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Torkoal",
			level: level,
			type1: "Fire",
		});
		this.setBaseStats({ hp: 70, atk: 85, spAtk: 85, def: 140, spDef: 70, spd: 20 });
		this.setRandomIvs();
		this.learnMove(new Amnesia());
		this.learnMove(new Ember());
		this.learnMove(new RapidSpin());
		this.learnMove(new HeatWave());

	}
}



class Spoink extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Spoink",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 60, atk: 25, spAtk: 70, def: 35, spDef: 80, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new Confusion());
		this.learnMove(new Psybeam());
		this.learnMove(new Psychic());
		this.learnMove(new Bounce());

	}
}


class Grumpig extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Grumpig",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 80, atk: 45, spAtk: 90, def: 65, spDef: 110, spd: 80 });
		this.setRandomIvs();
		this.learnMove(new Payback());
		this.learnMove(new Psybeam());
		this.learnMove(new Psychic());
		this.learnMove(new Bounce());

	}
}

class Espeon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Espeon",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 65, atk: 65, spAtk: 130, def: 60, spDef: 95, spd: 110 });
		this.setRandomIvs();
		this.learnMove(new LastResort());
		this.learnMove(new Psychic());
		this.learnMove(new Psybeam());
		this.learnMove(new Bite());

	}
}

class Umbreon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Umbreon",
			level: level,
			type1: "Dark",
		});
		this.setBaseStats({ hp: 95, atk: 65, spAtk: 60, def: 110, spDef: 130, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new DarkPulse());
		this.learnMove(new LastResort());
		this.learnMove(new Swift());
		this.learnMove(new Bite());

	}
}

class Leafeon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Leafeon",
			level: level,
			type1: "Grass",
		});
		this.setBaseStats({ hp: 65, atk: 110, spAtk: 60, def: 130, spDef: 65, spd: 95 });
		this.setRandomIvs();
		this.learnMove(new LeafBlade());
		this.learnMove(new LastResort());
		this.learnMove(new QuickAttack());
		this.learnMove(new DoubleEdge());

	}
}


class Glaceon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Glaceon",
			level: level,
			type1: "Ice",
		});
		this.setBaseStats({ hp: 65, atk: 60, spAtk: 130, def: 60, spDef: 95, spd: 65 });
		this.setRandomIvs();
		this.learnMove(new IceFang());
		this.learnMove(new FreezeDry());
		this.learnMove(new Blizzard());
		this.learnMove(new DoubleEdge());

	}
}


class Pichu extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Pichu",
			level: level,
			type1: "Electric",
		});
		this.setBaseStats({ hp: 20, atk: 40, spAtk: 35, def: 15, spDef: 35, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new SweetKiss());
		this.learnMove(new Nuzzle());
		this.learnMove(new ThunderShock());
		this.learnMove(new TailWhip());

	}
}


class Wobbuffet extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Wobbuffet",
			level: level,
			type1: "Psychic",
		});
		this.setBaseStats({ hp: 190, atk: 33, spAtk: 33, def: 58, spDef: 58, spd: 33 });
		this.setRandomIvs();
		this.learnMove(new Amnesia());
		this.learnMove(new Charm());
		this.learnMove(new Counter());
		this.learnMove(new DestinyBond());

	}
}


class Steelix extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level = 1) {
		super({
			name: "Steelix",
			level: level,
			type1: "Steel",
			type2: "Ground",
		});
		this.setBaseStats({ hp: 75, atk: 85, spAtk: 55, def: 200, spDef: 65, spd: 30 });
		this.setRandomIvs();
		this.learnMove(new IceFang());
		this.learnMove(new ThunderFang());
		this.learnMove(new Slam());
		this.learnMove(new IronTail());

	}
}