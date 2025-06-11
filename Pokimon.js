class Pokimon {
	// Basic info
	constructor({ name, img, level, type1, type2 = "none", evo = false, pokimon }) {
		// if (evo) {
		// 	this.name =
		// }

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
			spd: Math.floor(randInt(1, 32)),
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
		let req = (this.level ** 3 * (150 - this.level)) / 100; // XP required to level up
		while (this.xp >= req) {
			this.level += 1;
			this.xp -= req;
			req = (this.level ** 3 * (150 - this.level)) / 100;

			// learn move
			for (let i = 0; i < this.movePool.length; i++) {
				if (this.movePool[i].level === this.level) {
					this.learnMove(this.movePool[i].move);
				}
			}
		}
		this.level = Math.min(this.level, 100); // max level is 100
	}

	display() {}
	
	evolution() {
		console.log(this.evo)
		return new nameToPokimon[this.evo](this.level);
	}
}

class DataLoad extends Pokimon {
	constructor({xp, name, level, type1, type2, hpBASE, atkBASE, spAtkBASE, defBASE, spDefBASE, spdBASE, hpIV, atkIV, spAtkIV, defIV, spDefIV, spdIV, moves, movePool, evo, evoLvl}) {
		super({ name, level, type1, type2 });
		this.setBaseStats({ hp: hpBASE, atk: atkBASE, spAtk: spAtkBASE, def: defBASE, spDef: spDefBASE, spd: spdBASE });
		this.setIvStats({ hp: hpIV, atk: atkIV, spAtk: spAtkIV, def: defIV, spDef: spDefIV, spd: spdIV });
		this.xp = xp;
		this.moves = moves;
		this.movePool = movePool;
		this.evo = evo;
		this.evoLvl = evoLvl;
	}
}

// Pokimons
class Bulbasaur extends Pokimon {
	constructor(level = 1) {
		super({
			name: "Bulbasaur",
			level: level,
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 45, atk: 49, spAtk: 65, def: 49, spDef: 65, spd: 45 });
		this.setRandomIvs();
		this.learnMove(new VineWhip());
		this.evoLvl = 16;
		this.evo = "Ivysaur";
		this.movePool = [
			{ level: 3, move: new VineWhip() },
			{ level: 36, move: new SolarBeam() },
			{ level: 24, move: new SweetScent() },
			{ level: 13, move: new PoisonPowder() },
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
			type2: "Poison",
		});
		this.setBaseStats({ hp: 60, atk: 62, spAtk: 80, def: 63, spDef: 80, spd: 60 });
		this.setRandomIvs();
		this.learnMove(new PowerWhip());
		this.evoLvl = 32;
		this.evo = "Venusaur";
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
			type2: "Poison",
		});
		this.setBaseStats({ hp: 80, atk: 82, spAtk: 100, def: 83, spDef: 100, spd: 80 });
		this.setRandomIvs();
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

		this.evoLvl = 16;
		this.evo = "Charmeleon";
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
		this.learnMove(new FireFang());

		this.evoLvl = 36;
		this.evo = "Charizard";
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
			type2: "Flying",
		});
		this.setBaseStats({ hp: 78, atk: 84, spAtk: 109, def: 78, spDef: 85, spd: 100 });
		this.setRandomIvs();
		this.learnMove(new HeatWave());
		this.learnMove(new DragonBreath());

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

		this.evoLvl = 16;
		this.evo = "Wartortle";
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

		this.evoLvl = 36;
		this.evo = "Blastoise";
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

		this.evoLvl = 7;
		this.evo = "Metapod";
		this.movePool = [
			{ level: 1, move: new StringShot() },
			{ level: 1, move: new Tackle() },
			{ level: 9, move: new BugBite() },
		];
	}

	evolution() {
		return new Metapod(this.level);
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
		this.evo = "Butterfree";
		this.movePool = [{ level: 1, move: new Harden() }];
	}

	evolution() {
		return new Butterfree(this.level);
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
		this.learnMove(new BugBite());

		this.evoLvl = 7;
		this.evo = "Kakuna";
		this.movePool = [
			{ level: 1, move: new PoisonSting() },
			{ level: 1, move: new StringShot() },
			{ level: 9, move: new BugBite() },
		];
	}

	evolution() {
		return new Kakuna(this.level);
	}
}

class Kakuna extends Pokimon {
	/**
	 * @param {*} level
	 */
	constructor(level = 1) {
		super({
			name: "Kakuna",
			level: level,
			type1: "Bug",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 40, atk: 25, spAtk: 25, def: 50, spDef: 25, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new Harden());

		this.evoLvl = 10;
		this.evo = "Beedrill";
		this.movePool = [{ level: 1, move: new Harden() }];
	}

	evolution() {
		return new Beedrill(this.level);
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
		this.learnMove(new AerialAce());

		this.evoLvl = 18;
		this.evo = "Pidgeotto";
		this.movePool = [
			{ level: 9, move: new Gust() },
			{ level: 1, move: new Tackle() },
			{ level: 33, move: new WingAttack() },
			{ level: 45, move: new AerialAce() },
		];
	}

	evolution() {
		return new Pidgeotto(this.level);
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
		this.learnMove(new WingAttack());
		this.learnMove(new AerialAce());

		this.evoLvl = 36;
		this.evo = "Pidgeot";
		this.movePool = [
			{ level: 57, move: new AirSlash() },
			{ level: 1, move: new Tackle() },
			{ level: 37, move: new WingAttack() },
			{ level: 52, move: new AerialAce() },
		];
	}
	evolution() {
		return new Pidgeot(this.level);
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
		this.learnMove(new SuckerPunch());
		this.learnMove(new Crunch());

		this.evoLvl = 20;
		this.evo = "Raticate";
		this.movePool = [
			{ level: 1, move: new Tackle() },
			{ level: 4, move: new QuickAttack() },
			{ level: 25, move: new SuckerPunch() },
			{ level: 22, move: new Crunch() },
		];
	}
	evolution() {
		return new Raticate(this.level);
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
		this.evo = "Fearow";
		this.movePool = [
			{ level: 1, move: new Peck() },
			{ level: 15, move: new AerialAce() },
			{ level: 18, move: new WingAttack() },
			{ level: 11, move: new FuryAttack() },
		];
	}
	evolution() {
		return new Fearow(this.level);
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
		this.evo = "Arbok";
		this.movePool = [
			{ level: 4, move: new PoisonSting() },
			{ level: 9, move: new Bite() },
			{ level: 20, move: new Acid() },
			{ level: 1, move: new Wrap() },
		];
	}
	evolution() {
		return new Arbok(this.level);
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
			type1: "Electric",
		});
		this.setBaseStats({ hp: 35, atk: 55, spAtk: 40, def: 50, spDef: 50, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		this.learnMove(new Agility());
		this.learnMove(new ThunderShock());
		this.learnMove(new ThunderBolt());

		this.evoLvl = 36;
		this.movePool = [
			{ level: 1, move: new QuickAttack() },
			{ level: 24, move: new Agility() },
			{ level: 1, move: new ThunderShock() },
			{ level: 36, move: new ThunderBolt() },
		];
	}
	evolution() {
		return new Raichu(this.level);
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
		this.movePool = [
			{ level: 45, move: new Earthquake() },
			{ level: 21, move: new Swift() },
			{ level: 33, move: new Dig() },
			{ level: 1, move: new Scratch() },
		];
	}
	evolution() {
		return new Sandslash(this.level);
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

		this.movePool = [
			{ level: 1, move: new PoisonSting() },
			{ level: 5, move: new Scratch() },
			{ level: 30, move: new Bite() },
			{ level: 50, move: new Crunch() },
		];
	}

	evolution() {
		return new Nidorina(this.level);
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

		this.movePool = [
			{ level: 15, move: new FurySwipes() },
			{ level: 1, move: new Scratch() },
			{ level: 36, move: new Bite() },
			{ level: 64, move: new Crunch() },
		];
	}
	evolution() {
		return new Nidoqueen(this.level);
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

		this.movePool = [
			{ level: 1, move: new PoisonSting() },
			{ level: 5, move: new Peck() },
			{ level: 15, move: new FuryAttack() },
			{ level: 50, move: new PoisonJab() },
		];
	}
	evolution() {
		return new Nidorino(this.level);
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

		this.movePool = [
			{ level: 29, move: new DoubleKick() },
			{ level: 1, move: new Peck() },
			{ level: 15, move: new FuryAttack() },
			{ level: 1, move: new PoisonJab() },
		];
	}

	evolution() {
		return new Nidoking(this.level);
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
			type2: "Ground",
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

		this.movePool = [
			{ level: 4, move: new StoredPower() },
			{ level: 32, move: new MeteorMash() },
			{ level: 44, move: new MoonBlast() },
			{ level: 1, move: new Pound() },
		];
	}
	evolution() {
		return new Clefable(this.level);
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

		this.movePool = [
			{ level: 4, move: new DisarmingVoice() },
			{ level: 32, move: new Charm() },
			{ level: 44, move: new StoredPower() },
			{ level: 1, move: new Pound() },
		];
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

		this.movePool = [
			{ level: 1, move: new Ember() },
			{ level: 8, move: new QuickAttack() },
			{ level: 48, move: new Inferno() },
			{ level: 1, move: new TailWhip() },
		];
	}

	evolution() {
		return new Ninetales(this.level);
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

		this.movePool = [
			{ level: 1, move: new Flamethrower() },
			{ level: 1, move: new QuickAttack() },
			{ level: 1, move: new TailWhip() },
		];
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

		this.movePool = [
			{ level: 1, move: new DisarmingVoice() },
			{ level: 44, move: new DoubleEdge() },
			{ level: 36, move: new HyperVoice() },
			{ level: 1, move: new Pound() },
		];
	}
	evolution() {
		return new Wigglytuff(this.level);
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

		this.movePool = [
			{ level: 1, move: new DisarmingVoice() },
			{ level: 1, move: new DoubleEdge() },
			{ level: 5, move: new PlayRough() },
			{ level: 1, move: new BodySlam() },
		];
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

		this.movePool = [
			{ level: 5, move: new Astonish() },
			{ level: 30, move: new Bite() },
			{ level: 50, move: new AirSlash() },
			{ level: 1, move: new Absorb() },
		];
	}

	evolution() {
		return new Golbat(this.level);
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

		this.movePool = [
			{ level: 15, move: new PoisonFang() },
			{ level: 34, move: new Bite() },
			{ level: 62, move: new AirSlash() },
			{ level: 1, move: new Absorb() },
		];
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

		this.movePool = [
			{ level: 28, move: new MoonBlast() },
			{ level: 4, move: new Acid() },
			{ level: 14, move: new PoisonPowder() },
			{ level: 1, move: new Absorb() },
		];
	}

	evolution() {
		return new Gloom(this.level);
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

		this.movePool = [
			{ level: 32, move: new MoonBlast() },
			{ level: 1, move: new Acid() },
			{ level: 14, move: new PoisonPowder() },
			{ level: 1, move: new Absorb() },
		];
	}

	evolution() {
		return new Vileplume(this.level);
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

		this.movePool = [
			{ level: 1, move: new MoonBlast() },
			{ level: 1, move: new Acid() },
			{ level: 1, move: new PoisonPowder() },
			{ level: 1, move: new Absorb() },
		];
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

		this.movePool = [
			{ level: 1, move: new Scratch() },
			{ level: 11, move: new Absorb() },
			{ level: 6, move: new PoisonPowder() },
			{ level: 11, move: new Absorb() },
		];
	}
	evolution() {
		return new Parasect(this.level);
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

		this.movePool = [
			{ level: 29, move: new Slash() },
			{ level: 11, move: new Absorb() },
			{ level: 6, move: new PoisonPowder() },
			{ level: 17, move: new FuryCutter() },
		];
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

		this.movePool = [
			{ level: 1, move: new Tackle() },
			{ level: 17, move: new Psybeam() },
			{ level: 37, move: new ZenHeadbutt() },
			{ level: 41, move: new PoisonFang() },
		];
	}

	evolution() {
		return new Venomoth(this.level);
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

		this.movePool = [
			{ level: 11, move: new Confusion() },
			{ level: 17, move: new Psybeam() },
			{ level: 41, move: new ZenHeadbutt() },
			{ level: 47, move: new PoisonFang() },
		];
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

		this.movePool = [
			{ level: 1, move: new Scratch() },
			{ level: 32, move: new Dig() },
			{ level: 16, move: new Bulldoze() },
			{ level: 24, move: new Slash() },
		];
	}

	evolution() {
		return new Dugtrio(this.level);
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

		this.movePool = [
			{ level: 1, move: new Astonish() },
			{ level: 36, move: new Dig() },
			{ level: 16, move: new Bulldoze() },
			{ level: 24, move: new Slash() },
		];
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

		this.movePool = [
			{ level: 16, move: new Bite() },
			{ level: 36, move: new Slash() },
			{ level: 8, move: new Scratch() },
			{ level: 44, move: new PlayRough() },
		];
	}
	evolution() {
		return new Persian(this.level);
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

		this.movePool = [
			{ level: 24, move: new Assurance() },
			{ level: 42, move: new Slash() },
			{ level: 1, move: new Scratch() },
			{ level: 54, move: new PlayRough() },
		];
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

		this.movePool = [
			{ level: 18, move: new ZenHeadbutt() },
			{ level: 12, move: new WaterPulse() },
			{ level: 1, move: new Scratch() },
			{ level: 24, move: new AquaTail() },
		];
	}

	evolution() {
		return new Golduck(this.level);
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

		this.movePool = [
			{ level: 1, move: new AquaJet() },
			{ level: 12, move: new WaterPulse() },
			{ level: 1, move: new Scratch() },
			{ level: 24, move: new AquaTail() },
		];
	}
}




class Mankey extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Mankey",
			level: level, 
			type1: "Fighting",
		});
		this.setBaseStats({hp: 40, atk: 80, spAtk: 35, def: 35, spDef: 45, spd: 70});
		this.setRandomIvs();
		this.learnMove(new Scratch());	
		this.learnMove(new Assurance());
		this.learnMove(new FurySwipes());
		this.learnMove(new Thrash());
	
		this.movePool = [
			{ level: 1, move: new Scratch() },
			{ level: 26, move: new Assurance() },
			{ level: 5, move: new FurySwipes() },
			{ level: 29, move: new Thrash() },
		];
	}

	evolution() {
		return new Primeape(this.level);
	}
}



class Primeape extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Primeape",
			level: level, 
			type1: "Fighting",
		});
		this.setBaseStats({hp: 65, atk: 105, spAtk: 60, def: 60, spDef: 70, spd: 95});
		this.setRandomIvs();
		this.learnMove(new Scratch());	
		this.learnMove(new CloseCombat());
		this.learnMove(new FurySwipes());
		this.learnMove(new Thrash());
	

		this.movePool = [
			{ level: 1, move: new Scratch() },
			{ level: 39, move: new CloseCombat() },
			{ level: 5, move: new FurySwipes() },
			{ level: 30, move: new Thrash() },
		];
	}
}


class Poliwag extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Poliwag",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 40, atk: 50, spAtk: 40, def: 40, spDef: 40, spd: 90});
		this.setRandomIvs();
		this.learnMove(new WaterGun());	
		this.learnMove(new BubbleBeam());
		this.learnMove(new HydroPump());
		this.learnMove(new BodySlam());

		this.movePool = [
			{ level: 1, move: new WaterGun() },
			{ level: 18, move: new BubbleBeam() },
			{ level: 42, move: new HydroPump() },
			{ level: 30, move: new BodySlam() },
		];
	
	}

	evolution() {
		return new Poliwhirl(this.level);
	}
}


class Poliwhirl extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Poliwhirl",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 65, atk: 65, spAtk: 50, def: 65, spDef: 50, spd: 90});
		this.setRandomIvs();
		this.learnMove(new MudShot());	
		this.learnMove(new BubbleBeam());
		this.learnMove(new HydroPump());
		this.learnMove(new BodySlam());

		this.movePool = [
			{ level: 1, move: new MudShot() },
			{ level: 18, move: new BubbleBeam() },
			{ level: 48, move: new HydroPump() },
			{ level: 32, move: new BodySlam() },
		];
	
	}

	evolution() {
		return new Poliwrath(this.level);
	}
}



class Poliwrath extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Poliwrath",
			level: level, 
			type1: "Water",
			type2: "Fighting",
		});
		this.setBaseStats({hp: 90, atk: 95, spAtk: 70, def: 95, spDef: 90, spd: 70});
		this.setRandomIvs();
		this.learnMove(new CircleThrow());	
		this.learnMove(new BubbleBeam());
		this.learnMove(new HydroPump());
		this.learnMove(new BodySlam());

		this.movePool = [
			{ level: 1, move: new CircleThrow() },
			{ level: 1, move: new BubbleBeam() },
			{ level: 1, move: new HydroPump() },
			{ level: 1, move: new BodySlam() },
		];
	
	}
}




class Abra extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Abra",
			level: level, 
			type1: "Psychic",
		});
		this.setBaseStats({hp: 25, atk: 20, spAtk: 105, def: 15, spDef: 55, spd: 90});
		this.setRandomIvs();
		this.learnMove(new Confusion());	
		this.learnMove(new FirePunch());
		this.learnMove(new ThunderPunch());
		this.learnMove(new IcePunch());

		this.movePool = [
			{ level: 1, move: new Confusion() },
			{ level: 15, move: new FirePunch() },
			{ level: 32, move: new ThunderPunch() },
			{ level: 8, move: new IcePunch() },
		];
	
	}


	evolution() {
		return new Kadabra(this.level);
	}
}


class Kadabra extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Kadabra",
			level: level, 
			type1: "Psychic",
		});
		this.setBaseStats({hp: 40, atk: 35, spAtk: 120, def: 30, spDef: 70, spd: 105});
		this.setRandomIvs();
		this.learnMove(new PsychoCut());	
		this.learnMove(new FirePunch());
		this.learnMove(new ThunderPunch());
		this.learnMove(new IcePunch());
	

		this.movePool = [
			{ level: 20, move: new PsychoCut() },
			{ level: 15, move: new FirePunch() },
			{ level: 32, move: new ThunderPunch() },
			{ level: 8, move: new IcePunch() },
		];
	}

	evolution() {
		return new Alakazam(this.level);
	}
}


class Alakazam extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Alakazam",
			level: level, 
			type1: "Psychic",
		});
		this.setBaseStats({hp: 55, atk: 50, spAtk: 135, def: 45, spDef: 95, spd: 120});
		this.setRandomIvs();
		this.learnMove(new PsychoCut());	
		this.learnMove(new FirePunch());
		this.learnMove(new ThunderPunch());
		this.learnMove(new IcePunch());

		this.movePool = [
			{ level: 20, move: new PsychoCut() },
			{ level: 15, move: new FirePunch() },
			{ level: 32, move: new ThunderPunch() },
			{ level: 8, move: new IcePunch() },
		];
	
	}
}


class Machop extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Machop",
			level: level, 
			type1: "Fighting",
		});
		this.setBaseStats({hp: 70, atk: 80, spAtk: 35, def: 50, spDef: 35, spd: 35});
		this.setRandomIvs();
		this.learnMove(new Revenge());	
		this.learnMove(new DoubleEdge());
		this.learnMove(new KnockOff());
		this.learnMove(new DynamicPunch());
	

		this.movePool = [
			{ level: 8, move: new Revenge() },
			{ level: 52, move: new DoubleEdge() },
			{ level: 16, move: new KnockOff() },
			{ level: 44, move: new DynamicPunch() },
		];
	}

	evolution() {
		return new Machoke(this.level);
	}
}



class Machoke extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Machoke",
			level: level, 
			type1: "Fighting",
		});
		this.setBaseStats({hp: 80, atk: 100, spAtk: 50, def: 70, spDef: 60, spd: 45});
		this.setRandomIvs();
		this.learnMove(new LowSweep());	
		this.learnMove(new DoubleEdge());
		this.learnMove(new KnockOff());
		this.learnMove(new DynamicPunch());
	

		this.movePool = [
			{ level: 12, move: new LowSweep() },
			{ level: 66, move: new DoubleEdge() },
			{ level: 16, move: new KnockOff() },
			{ level: 54, move: new DynamicPunch() },
		];
	}

	evolution() {
		return new Machamp(this.level);
	}
}


class Machamp extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Machamp",
			level: level, 
			type1: "Fighting",
		});
		this.setBaseStats({hp: 90, atk: 130, spAtk: 65, def: 80, spDef: 85, spd: 55});
		this.setRandomIvs();
		this.learnMove(new LowSweep());	
		this.learnMove(new DoubleEdge());
		this.learnMove(new KnockOff());
		this.learnMove(new DynamicPunch());
	

		this.movePool = [
			{ level: 12, move: new LowSweep() },
			{ level: 66, move: new DoubleEdge() },
			{ level: 16, move: new KnockOff() },
			{ level: 54, move: new DynamicPunch() },
		];
	}
}


class Bellsprout extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Bellsprout",
			level: level, 
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({hp: 50, atk: 75, spAtk: 70, def: 35, spDef: 30, spd: 40});
		this.setRandomIvs();
		this.learnMove(new VineWhip());	
		this.learnMove(new Wrap());
		this.learnMove(new PowerWhip());
		this.learnMove(new PoisonJab());

		this.movePool = [
			{ level: 1, move: new VineWhip() },
			{ level: 11, move: new Wrap() },
			{ level: 52, move: new PowerWhip() },
			{ level: 41, move: new PoisonJab() },
		];
	
	}

	evolution() {
		return new Weepinbell(this.level);
	}
}


class Weepinbell extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Weepinbell",
			level: level, 
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({hp: 65, atk: 90, spAtk: 85, def: 50, spDef: 45, spd: 55});
		this.setRandomIvs();
		this.learnMove(new KnockOff());	
		this.learnMove(new RazorLeaf());
		this.learnMove(new PowerWhip());
		this.learnMove(new PoisonJab());
	

		this.movePool = [
			{ level: 29, move: new KnockOff() },
			{ level: 44, move: new RazorLeaf() },
			{ level: 58, move: new PowerWhip() },
			{ level: 47, move: new PoisonJab() },
		];
	}

	evolution() {
		return new Victreebel(this.level);
	}
}


class Victreebel extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Victreebel",
			level: level, 
			type1: "Grass",
			type2: "Poison",
		});
		this.setBaseStats({hp: 80, atk: 105, spAtk: 100, def: 65, spDef: 70, spd: 70});
		this.setRandomIvs();
		this.learnMove(new LeafBlade());	
		this.learnMove(new RazorLeaf());
		this.learnMove(new PowerWhip());
		this.learnMove(new PoisonJab());
	

		this.movePool = [
			{ level: 44, move: new LeafBlade() },
			{ level: 1, move: new RazorLeaf() },
			{ level: 1, move: new PowerWhip() },
			{ level: 1, move: new PoisonJab() },
		];
	}
}



class Tentacool extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Tentacool",
			level: level, 
			type1: "Water",
			type2: "Poison",
		});
		this.setBaseStats({hp: 40, atk: 40, spAtk: 50, def: 35, spDef: 100, spd: 70});
		this.setRandomIvs();
		this.learnMove(new PoisonSting());	
		this.learnMove(new Surf());
		this.learnMove(new HydroPump());
		this.learnMove(new BubbleBeam());
	
		this.movePool = [
			{ level: 1, move: new PoisonSting() },
			{ level: 40, move: new Surf() },
			{ level: 48, move: new HydroPump() },
			{ level: 24, move: new BubbleBeam() },
		];
	}

	evolution() {
		return new Tentacruel(this.level);
	}
}


class Tentacruel extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Tentacruel",
			level: level, 
			type1: "Water",
			type2: "Poison",
		});
		this.setBaseStats({hp: 80, atk: 70, spAtk: 80, def: 65, spDef: 120, spd: 100});
		this.setRandomIvs();
		this.learnMove(new PoisonSting());	
		this.learnMove(new Surf());
		this.learnMove(new HydroPump());
		this.learnMove(new BubbleBeam());
	

		this.movePool = [
			{ level: 1, move: new PoisonSting() },
			{ level: 46, move: new Surf() },
			{ level: 58, move: new HydroPump() },
			{ level: 24, move: new BubbleBeam() },
		];
	}
}


class Geodude extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Geodude",
			level: level, 
			type1: "Rock",
			type2: "Ground",
		});
		this.setBaseStats({hp: 40, atk: 80, spAtk: 30, def: 100, spDef: 30, spd: 20});
		this.setRandomIvs();
		this.learnMove(new Bulldoze());	
		this.learnMove(new Tackle());
		this.learnMove(new StoneEdge());
		this.learnMove(new SmackDown());
	
		this.movePool = [
			{ level: 12, move: new Bulldoze() },
			{ level: 1, move: new Tackle() },
			{ level: 42, move: new StoneEdge() },
			{ level: 18, move: new SmackDown() },
		];
	}

	evolution() {
		return new Graveler(this.level);
	}
}


class Graveler extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Graveler",
			level: level, 
			type1: "Rock",
			type2: "Ground",
		});
		this.setBaseStats({hp: 55, atk: 95, spAtk: 45, def: 115, spDef: 45, spd: 35});
		this.setRandomIvs();
		this.learnMove(new RockThrow());	
		this.learnMove(new Tackle());
		this.learnMove(new StoneEdge());
		this.learnMove(new SmackDown());
	
		
		this.movePool = [
			{ level: 16, move: new RockThrow() },
			{ level: 1, move: new Tackle() },
			{ level: 54, move: new StoneEdge() },
			{ level: 18, move: new SmackDown() },
		];
	}

	evolution() {
		return new Golem(this.level);
	}
}


class Golem extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Graveler",
			level: level, 
			type1: "Rock",
			type2: "Ground",
		});
		this.setBaseStats({hp: 80, atk: 120, spAtk: 55, def: 130, spDef: 65, spd: 45});
		this.setRandomIvs();
		this.learnMove(new RockBlast());	
		this.learnMove(new Tackle());
		this.learnMove(new StoneEdge());
		this.learnMove(new SmackDown());
	
		this.movePool = [
			{ level: 34, move: new RockBlast() },
			{ level: 1, move: new Tackle() },
			{ level: 54, move: new StoneEdge() },
			{ level: 18, move: new SmackDown() },
		];
	}
}



class Ponyta extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Ponyta",
			level: level, 
			type1: "Fire",
		});
		this.setBaseStats({hp: 50, atk: 85, spAtk: 65, def: 55, spDef: 65, spd: 90});
		this.setRandomIvs();
		this.learnMove(new Tackle());	
		this.learnMove(new FlameCharge());
		this.learnMove(new Ember());
		this.learnMove(new Stomp());
	
		this.movePool = [
			{ level: 1, move: new Tackle() },
			{ level: 15, move: new FlameCharge() },
			{ level: 10, move: new Ember() },
			{ level: 30, move: new Stomp() },
		];
	}

	evolution() {
		return new Rapidash(this.level);
	}
}


class Rapidash extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Rapidash",
			level: level, 
			type1: "Fire",
		});
		this.setBaseStats({hp: 65, atk: 100, spAtk: 80, def: 70, spDef: 80, spd: 105});
		this.setRandomIvs();
		this.learnMove(new PoisonJab());	
		this.learnMove(new FlameCharge());
		this.learnMove(new Ember());
		this.learnMove(new SmartStrike());
	

		this.movePool = [
			{ level: 1, move: new PoisonJab() },
			{ level: 15, move: new FlameCharge() },
			{ level: 1, move: new Ember() },
			{ level: 1, move: new SmartStrike() },
		];
	}
}



class Slowpoke extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Slowpoke",
			level: level, 
			type1: "Water",
			type2: "Psychic",
		});
		this.setBaseStats({hp: 90, atk: 65, spAtk: 40, def: 65, spDef: 40, spd: 15});
		this.setRandomIvs();
		this.learnMove(new WaterGun());	
		this.learnMove(new Surf());
		this.learnMove(new Psychic());
		this.learnMove(new Tackle());
	

		this.movePool = [
			{ level: 6, move: new WaterGun() },
			{ level: 30, move: new Surf() },
			{ level: 36, move: new Psychic() },
			{ level: 1, move: new Tackle() },
		];
	}

	evolution() {
		return new Slowbro(this.level);
	}
}


class Slowbro extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Slowbro",
			level: level, 
			type1: "Water",
			type2: "Psychic",
		});
		this.setBaseStats({hp: 95, atk: 75, spAtk: 100, def: 110, spDef: 80, spd: 30});
		this.setRandomIvs();
		this.learnMove(new Confusion());	
		this.learnMove(new Surf());
		this.learnMove(new Psychic());
		this.learnMove(new Tackle());
	
		this.movePool = [
			{ level: 12, move: new Confusion() },
			{ level: 30, move: new Surf() },
			{ level: 36, move: new Psychic() },
			{ level: 1, move: new Tackle() },
		];
	}
}

class Magnemite extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Magnemite",
			level: level, 
			type1: "Electric",
			type2: "Steel",
		});
		this.setBaseStats({hp: 25, atk: 35, spAtk: 95, def: 70, spDef: 55, spd: 45});
		this.setRandomIvs();
		this.learnMove(new Spark());	
		this.learnMove(new Discharge());
		this.learnMove(new ThunderShock());
		this.learnMove(new Tackle());
	
		this.movePool = [
			{ level: 20, move: new Spark() },
			{ level: 36, move: new Discharge() },
			{ level: 1, move: new ThunderShock() },
			{ level: 1, move: new Tackle() },
		];
	}

	evolution() {
		return new Magneton(this.level);
	}
}


class Magneton extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Magneton",
			level: level, 
			type1: "Electric",
			type2: "Steel",
		});
		this.setBaseStats({hp: 50, atk: 60, spAtk: 120, def: 95, spDef: 70, spd: 70});
		this.setRandomIvs();
		this.learnMove(new Spark());	
		this.learnMove(new ZapCannon());
		this.learnMove(new ThunderShock());
		this.learnMove(new Tackle());
	

		this.movePool = [
			{ level: 20, move: new Spark() },
			{ level: 64, move: new ZapCannon() },
			{ level: 1, move: new ThunderShock() },
			{ level: 1, move: new Tackle() },
		];
	}
}


class Farfetchd extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Farfetch'd",
			level: level, 
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({hp: 52, atk: 90, spAtk: 58, def: 55, spDef: 62, spd: 60});
		this.setRandomIvs();
		this.learnMove(new Peck());	
		this.learnMove(new FuryCutter());
		this.learnMove(new KnockOff());
		this.learnMove(new LeafBlade());
	

		this.movePool = [
			{ level: 1, move: new Peck() },
			{ level: 10, move: new FuryCutter() },
			{ level: 30, move: new KnockOff() },
			{ level: 55, move: new LeafBlade() },
		];
	}
}



class Doduo extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Doduo",
			level: level, 
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({hp: 35, atk: 85, spAtk: 35, def: 45, spDef: 35, spd: 75});
		this.setRandomIvs();
		this.learnMove(new Pluck());	
		this.learnMove(new QuickAttack());
		this.learnMove(new DoubleHit());
		this.learnMove(new Peck());
	

		this.movePool = [
			{ level: 14, move: new Pluck() },
			{ level: 5, move: new QuickAttack() },
			{ level: 19, move: new DoubleHit() },
			{ level: 1, move: new Peck() },
		];
	}

	evolution() {
		return new Dodrio(this.level);
	}
}



class Dodrio extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Dodrio",
			level: level, 
			type1: "Normal",
			type2: "Flying",
		});
		this.setBaseStats({hp: 60, atk: 110, spAtk: 60, def: 70, spDef: 60, spd: 110});
		this.setRandomIvs();
		this.learnMove(new Pluck());	
		this.learnMove(new QuickAttack());
		this.learnMove(new DoubleHit());
		this.learnMove(new Peck());

		this.movePool = [
			{ level: 15, move: new Pluck() },
			{ level: 1, move: new QuickAttack() },
			{ level: 19, move: new DoubleHit() },
			{ level: 1, move: new Peck() },
		];
	
	}
}

class Seel extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Seel",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 65, atk: 45, spAtk: 45, def: 55, spDef: 70, spd: 45});
		this.setRandomIvs();
		this.learnMove(new IcyWind());	
		this.learnMove(new Headbutt());
		this.learnMove(new AquaTail());
		this.learnMove(new IceShard());
	
		this.movePool = [
			{ level: 11, move: new IcyWind() },
			{ level: 1, move: new Headbutt() },
			{ level: 43, move: new AquaTail() },
			{ level: 17, move: new IceShard() },
		];
	
	}

	evolution() {
		return new Dewgong(this.level);
	}
}



class Dewgong extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Dewgong",
			level: level, 
			type1: "Water",
			type2: "Ice",
		});
		this.setBaseStats({hp: 90, atk: 70, spAtk: 70, def: 80, spDef: 95, spd: 70});
		this.setRandomIvs();
		this.learnMove(new Dive());	
		this.learnMove(new Headbutt());
		this.learnMove(new AquaTail());
		this.learnMove(new IceShard());
	

		this.movePool = [
			{ level: 45, move: new Dive() },
			{ level: 1, move: new Headbutt() },
			{ level: 49, move: new AquaTail() },
			{ level: 17, move: new IceShard() },
		];
	}
}


class Grimer extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Grimer",
			level: level, 
			type1: "Poison",
		});
		this.setBaseStats({hp: 80, atk: 80, spAtk: 40, def: 50, spDef: 50, spd: 25});
		this.setRandomIvs();
		this.learnMove(new Pound());	
		this.learnMove(new MudShot());
		this.learnMove(new Belch());
		this.learnMove(new MudSlap());
	

		this.movePool = [
			{ level: 1, move: new Pound() },
			{ level: 18, move: new MudShot() },
			{ level: 46, move: new Belch() },
			{ level: 7, move: new MudSlap() },
		];
	}

	evolution() {
		return new Muk(this.level);
	}
}


class Muk extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Muk",
			level: level, 
			type1: "Poison",
		});
		this.setBaseStats({hp: 105, atk: 105, spAtk: 65, def: 75, spDef: 100, spd: 50});
		this.setRandomIvs();
		this.learnMove(new GunkShot());	
		this.learnMove(new MudShot());
		this.learnMove(new Belch());
		this.learnMove(new MudSlap());
	

		this.movePool = [
			{ level: 40, move: new GunkShot() },
			{ level: 18, move: new MudShot() },
			{ level: 52, move: new Belch() },
			{ level: 1, move: new MudSlap() },
		];
	}
}


class Shellder extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Shellder",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 30, atk: 65, spAtk: 45, def: 100, spDef: 25, spd: 40});
		this.setRandomIvs();
		this.learnMove(new Tackle());	
		this.learnMove(new WaterGun());
		this.learnMove(new RazorShell());
		this.learnMove(new HydroPump());
	

		
		this.movePool = [
			{ level: 1, move: new Tackle() },
			{ level: 1, move: new WaterGun() },
			{ level: 32, move: new RazorShell() },
			{ level: 48, move: new HydroPump() },
		];
	}

	evolution() {
		return new Cloyster(this.level);
	}
}


class Cloyster extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Cloyster",
			level: level, 
			type1: "Water",
			type2: "Ice",
		});
		this.setBaseStats({hp: 50, atk: 95, spAtk: 85, def: 180, spDef: 45, spd: 70});
		this.setRandomIvs();
		this.learnMove(new IceShard());	
		this.learnMove(new IcicleCrash());
		this.learnMove(new RazorShell());
		this.learnMove(new HydroPump());
	

		this.movePool = [
			{ level: 1, move: new IceShard() },
			{ level: 1, move: new IcicleCrash() },
			{ level: 5, move: new RazorShell() },
			{ level: 1, move: new HydroPump() },
		];
	}
}

class Gastly extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Gastly",
			level: level, 
			type1: "Ghost",
			type2: "Poison",
		});
		this.setBaseStats({hp: 30, atk: 35, spAtk: 100, def: 30, spDef: 35, spd: 80});
		this.setRandomIvs();
		this.learnMove(new Lick());	
		this.learnMove(new ShadowBall());
		this.learnMove(new SuckerPunch());
		this.learnMove(new Payback());

		
		this.movePool = [
			{ level: 1, move: new Lick() },
			{ level: 40, move: new ShadowBall() },
			{ level: 32, move: new SuckerPunch() },
			{ level: 12, move: new Payback() },
		];
	
	}

	evolution() {
		return new Haunter(this.level);
	}
}


class Haunter extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Haunter",
			level: level, 
			type1: "Ghost",
			type2: "Poison",
		});
		this.setBaseStats({hp: 45, atk: 50, spAtk: 115, def: 45, spDef: 55, spd: 95});
		this.setRandomIvs();
		this.learnMove(new Lick());	
		this.learnMove(new ShadowBall());
		this.learnMove(new SuckerPunch());
		this.learnMove(new Payback());

		this.movePool = [
			{ level: 1, move: new Lick() },
			{ level: 48, move: new ShadowBall() },
			{ level: 36, move: new SuckerPunch() },
			{ level: 12, move: new Payback() },
		];
	
	}

	evolution() {
		return new Gengar(this.level);
	}
}





class Gengar extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Gengar",
			level: level, 
			type1: "Ghost",
			type2: "Poison",
		});
		this.setBaseStats({hp: 60, atk: 65, spAtk: 130, def: 60, spDef: 75, spd: 110});
		this.setRandomIvs();
		this.learnMove(new DarkPulse());	
		this.learnMove(new ShadowBall());
		this.learnMove(new SuckerPunch());
		this.learnMove(new Payback());
	

		this.movePool = [
			{ level: 42, move: new DarkPulse() },
			{ level: 48, move: new ShadowBall() },
			{ level: 36, move: new SuckerPunch() },
			{ level: 12, move: new Payback() },
		];
	}
}


class Onix extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Onix",
			level: level, 
			type1: "Rock",
			type2: "Ground",
		});
		this.setBaseStats({hp: 35, atk: 45, spAtk: 30, def: 160, spDef: 45, spd: 70});
		this.setRandomIvs();
		this.learnMove(new SmackDown());	
		this.learnMove(new RockThrow());
		this.learnMove(new RockSlide());
		this.learnMove(new IronTail());

		this.movePool = [
			{ level: 4, move: new SmackDown() },
			{ level: 1, move: new RockThrow() },
			{ level: 20, move: new RockSlide() },
			{ level: 48, move: new IronTail() },
		];
	
	}
}


class Drowzee extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Drowzee",
			level: level, 
			type1: "Psychic",
		});
		this.setBaseStats({hp: 60, atk: 48, spAtk: 43, def: 45, spDef: 90, spd: 42});
		this.setRandomIvs();
		this.learnMove(new Confusion());	
		this.learnMove(new Psybeam());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new Headbutt());
	

		this.movePool = [
			{ level: 9, move: new Confusion() },
			{ level: 21, move: new Psybeam() },
			{ level: 29, move: new ZenHeadbutt() },
			{ level: 13, move: new Headbutt() },
		];
	}

	evolution() {
		return new Hypno(this.level);
	}
}



class Hypno extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Hypno",
			level: level, 
			type1: "Psychic",
		});
		this.setBaseStats({hp: 85, atk: 73, spAtk: 73, def: 70, spDef: 115, spd: 67});
		this.setRandomIvs();
		this.learnMove(new Pound());	
		this.learnMove(new Psybeam());
		this.learnMove(new ZenHeadbutt());
		this.learnMove(new Headbutt());
	

		this.movePool = [
			{ level: 1, move: new Pound() },
			{ level: 21, move: new Psybeam() },
			{ level: 32, move: new ZenHeadbutt() },
			{ level: 13, move: new Headbutt() },
		];
	}
}

class Krabby extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Krabby",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 30, atk: 105, spAtk: 25, def: 90, spDef: 25, spd: 50});
		this.setRandomIvs();
		this.learnMove(new WaterGun());	
		this.learnMove(new MetalClaw());
		this.learnMove(new Stomp());
		this.learnMove(new Slam());
	
		this.movePool = [
			{ level: 1, move: new WaterGun() },
			{ level: 8, move: new MetalClaw() },
			{ level: 24, move: new Stomp() },
			{ level: 36, move: new Slam() },
		];
	}

	evolution() {
		return new Kingler(this.level);
	}
}


class Kingler extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Kingler",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 55, atk: 130, spAtk: 50, def: 115, spDef: 50, spd: 75});
		this.setRandomIvs();
		this.learnMove(new HammerArm());	
		this.learnMove(new MetalClaw());
		this.learnMove(new Stomp());
		this.learnMove(new Slam());
	

		this.movePool = [
			{ level: 1, move: new HammerArm() },
			{ level: 1, move: new MetalClaw() },
			{ level: 24, move: new Stomp() },
			{ level: 42, move: new Slam() },
		];
	}
}


class Voltorb extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Voltorb",
			level: level, 
			type1: "Electric",
		});
		this.setBaseStats({hp: 40, atk: 30, spAtk: 55, def: 50, spDef: 55, spd: 100});
		this.setRandomIvs();
		this.learnMove(new Tackle());	
		this.learnMove(new ThunderShock());
		this.learnMove(new Spark());
		this.learnMove(new Rollout());
	
		this.movePool = [
			{ level: 1, move: new Tackle() },
			{ level: 4, move: new ThunderShock() },
			{ level: 9, move: new Spark() },
			{ level: 11, move: new Rollout() },
		];
		
	}

	evolution() {
		return new Electrode(this.level);
	}
}


class Electrode extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Electrode",
			level: level, 
			type1: "Electric",
		});
		this.setBaseStats({hp: 60, atk: 50, spAtk: 80, def: 70, spDef: 80, spd: 150});
		this.setRandomIvs();
		this.learnMove(new ChargeBeam());	
		this.learnMove(new ThunderShock());
		this.learnMove(new Spark());
		this.learnMove(new Rollout());
	

		this.movePool = [
			{ level: 16, move: new ChargeBeam() },
			{ level: 1, move: new ThunderShock() },
			{ level: 9, move: new Spark() },
			{ level: 11, move: new Rollout() },
		];
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

		this.movePool = [
			{ level: 5, move: new Twister() },
			{ level: 25, move: new Slam() },
			{ level: 31, move: new AquaTail() },
			{ level: 1, move: new Leer() },
		];
	}

	evolution() {
		return new Dragonair(this.level);
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

		this.movePool = [
			{ level: 1, move: new Wrap() },
			{ level: 25, move: new Slam() },
			{ level: 33, move: new AquaTail() },
			{ level: 1, move: new Leer() },
		];
	}

	evolution() {
		return new Dragonite(this.level);
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

		this.movePool = [
			{ level: 1, move: new FirePunch() },
			{ level: 1, move: new Leer() },
			{ level: 25, move: new Slam() },
			{ level: 33, move: new AquaTail() },
		];
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

		this.movePool = [
			{ level: 1, move: new Confusion() },
			{ level: 1, move: new Psychic() },
			{ level: 25, move: new AuraSphere() },
			{ level: 33, move: new PsychoCut() },
		];
	}
}


nameToPokimon = {};
nameToPokimon["Bulbasaur"] = Bulbasaur;
nameToPokimon["Ivysaur"] = Ivysaur;
nameToPokimon["Venusaur"] = Venusaur;
nameToPokimon["Charmander"] = Charmander;
nameToPokimon["Charmeleon"] = Charmeleon;
nameToPokimon["Charizard"] = Charizard;
nameToPokimon["Squirtle"] = Squirtle;
nameToPokimon["Wartortle"] = Wartortle;
nameToPokimon["Blastoise"] = Blastoise;
nameToPokimon["Caterpie"] = Caterpie;
nameToPokimon["Metapod"] = Metapod;
nameToPokimon["Butterfree"] = Butterfree;
nameToPokimon["Weedle"] = Weedle;
nameToPokimon["Kakuna"] = Kakuna;
nameToPokimon["Beedrill"] = Beedrill;
nameToPokimon["Pidgey"] = Pidgey;
nameToPokimon["Pidgeotto"] = Pidgeotto;
nameToPokimon["Pidgeot"] = Pidgeot;
nameToPokimon["Rattata"] = Rattata;
nameToPokimon["Raticate"] = Raticate;
nameToPokimon["Spearow"] = Spearow;
nameToPokimon["Fearow"] = Fearow;
nameToPokimon["Ekans"] = Ekans;
nameToPokimon["Arbok"] = Arbok;
nameToPokimon["Pikachu"] = Pikachu;
nameToPokimon["Raichu"] = Raichu;
nameToPokimon["Sandshrew"] = Sandshrew;
nameToPokimon["Sandslash"] = Sandslash;
nameToPokimon["NidoranF"] = NidoranF;
nameToPokimon["Nidorina"] = Nidorina;
nameToPokimon["Nidoqueen"] = Nidoqueen;
nameToPokimon["NidoranM"] = NidoranM;
nameToPokimon["Nidorino"] = Nidorino;
nameToPokimon["Nidoking"] = Nidoking;
nameToPokimon["Clefairy"] = Clefairy;
nameToPokimon["Clefable"] = Clefable;
nameToPokimon["Vulpix"] = Vulpix;
nameToPokimon["Ninetales"] = Ninetales;
nameToPokimon["Jigglypuff"] = Jigglypuff;
nameToPokimon["Wigglytuff"] = Wigglytuff;
nameToPokimon["Zubat"] = Zubat;
nameToPokimon["Golbat"] = Golbat;
nameToPokimon["Oddish"] = Oddish;
nameToPokimon["Gloom"] = Gloom;
nameToPokimon["Vileplume"] = Vileplume;
nameToPokimon["Paras"] = Paras;
nameToPokimon["Parasect"] = Parasect;
nameToPokimon["Venonat"] = Venonat;
nameToPokimon["Venomoth"] = Venomoth;
nameToPokimon["Diglett"] = Diglett;
nameToPokimon["Dugtrio"] = Dugtrio;
nameToPokimon["Meowth"] = Meowth;
nameToPokimon["Persian"] = Persian;
nameToPokimon["Psyduck"] = Psyduck;
nameToPokimon["Golduck"] = Golduck;
nameToPokimon["Mankey"] = Mankey;
nameToPokimon["Primeape"] = Primeape;
nameToPokimon["Poliwag"] = Poliwag;
nameToPokimon["Poliwhirl"] = Poliwhirl;
nameToPokimon["Poliwrath"] = Poliwrath;
nameToPokimon["Abra"] = Abra;
nameToPokimon["Kadabra"] = Kadabra;
nameToPokimon["Alakazam"] = Alakazam;
nameToPokimon["Machop"] = Machop;
nameToPokimon["Machoke"] = Machoke;
nameToPokimon["Machamp"] = Machamp;
nameToPokimon["Bellsprout"] = Bellsprout;
nameToPokimon["Weepinbell"] = Weepinbell;
nameToPokimon["Victreebel"] = Victreebel;
nameToPokimon["Tentacool"] = Tentacool;
nameToPokimon["Tentacruel"] = Tentacruel;
nameToPokimon["Geodude"] = Geodude;
nameToPokimon["Graveler"] = Graveler;
nameToPokimon["Golem"] = Golem;
nameToPokimon["Ponyta"] = Ponyta;
nameToPokimon["Rapidash"] = Rapidash;
nameToPokimon["Slowpoke"] = Slowpoke;
nameToPokimon["Slowbro"] = Slowbro;
nameToPokimon["Magnemite"] = Magnemite;
nameToPokimon["Magneton"] = Magneton;
nameToPokimon["Farfetchd"] = Farfetchd;
nameToPokimon["Doduo"] = Doduo;
nameToPokimon["Dodrio"] = Dodrio;
nameToPokimon["Seel"] = Seel;
nameToPokimon["Dewgong"] = Dewgong;
nameToPokimon["Grimer"] = Grimer;
nameToPokimon["Muk"] = Muk;
nameToPokimon["Shellder"] = Shellder;
nameToPokimon["Cloyster"] = Cloyster;
nameToPokimon["Gastly"] = Gastly;
nameToPokimon["Haunter"] = Haunter;
nameToPokimon["Gengar"] = Gengar;
nameToPokimon["Onix"] = Onix;
nameToPokimon["Drowzee"] = Drowzee;
nameToPokimon["Hypno"] = Hypno;
nameToPokimon["Krabby"] = Krabby;
nameToPokimon["Kingler"] = Kingler;
nameToPokimon["Voltorb"] = Voltorb;
nameToPokimon["Electrode"] = Electrode;
nameToPokimon["Dratini"] = Dratini;
nameToPokimon["Dragonair"] = Dragonair;
nameToPokimon["Dragonite"] = Dragonite;
nameToPokimon["Mewtwo"] = Mewtwo;
