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
		this.movePool = [
			{ level: 3, move: new VineWhip() },
			{ level: 36, move: new SolarBeam() },
			{ level: 24, move: new SweetScent() },
			{ level: 13, move: new PoisonPowder() },
		];
	}

	evolution() {
		return new Ivysaur(this.level);
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
		this.movePool = [
			{ level: 3, move: new VineWhip() },
			{ level: 45, move: new PowerWhip() },
			{ level: 24, move: new SweetScent() },
			{ level: 15, move: new PoisonPowder() },
		];
	}

	evolution() {
		return new Venusaur(this.level);
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
		this.movePool = [
			{ level: 4, move: new Ember() },
			{ level: 12, move: new DragonBreath() },
			{ level: 24, move: new Flamethrower() },
			{ level: 36, move: new Inferno() },
		];
	}

	evolution() {
		return new Charmeleon(this.level);
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
		this.movePool = [
			{ level: 1, move: new Ember() },
			{ level: 12, move: new DragonBreath() },
			{ level: 54, move: new FlareBlitz() },
			{ level: 19, move: new FireFang() },
		];
	}

	evolution() {
		return new Charizard(this.level);
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
		this.movePool = [
			{ level: 24, move: new AquaTail() },
			{ level: 36, move: new WaveCrash() },
			{ level: 33, move: new HydroPump() },
			{ level: 12, move: new Bite() },
		];
	}

	evolution() {
		return new Wartortle(this.level);
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
		this.movePool = [
			{ level: 15, move: new WaterPulse() },
			{ level: 50, move: new WaveCrash() },
			{ level: 9, move: new RapidSpin() },
			{ level: 12, move: new Bite() },
		];
	}

	evolution() {
		return new Blastoise(this.level);
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
			name: "Weedle",
			level: level,
			type1: "Bug",
			type2: "Poison",
		});
		this.setBaseStats({ hp: 40, atk: 25, spAtk: 25, def: 50, spDef: 25, spd: 35 });
		this.setRandomIvs();
		this.learnMove(new Harden());

		this.evoLvl = 10;
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

		this.evoLvl = 30;
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
