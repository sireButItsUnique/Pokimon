class Pokimon {

	// Basic info
	constructor({ name, img, level, type1, type2 = "none" }) {
		this.name = name;
		this.level = level;
		this.type1 = type1;
		this.type2 = type2;
		this.moves = [];
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
}

// Pokimons
class Pikachew extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Pikachew",
			level: level,
			type1: "Electric"
		});
		this.setBaseStats({ hp: 35, atk: 55, spAtk: 40, def: 50, spDef: 50, spd: 90 });
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		this.learnMove(new Agility());
		this.learnMove(new ThunderShock());
		this.learnMove(new ThunderBolt());
	}
}

class Vapoureon extends Pokimon {
	constructor(level=1) {
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

class Eevee extends Pokimon {
	constructor(level=1) {
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

class Bulbasaur extends Pokimon {
	constructor(level=1) {
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
	
	}
}

class Ivysaur extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Ivysaur",
			level: level, 
			type1: "Grass",
			type2: "Poison"
		});
		this.setBaseStats({hp: 60, atk: 62, spAtk: 80, def: 63, spDef: 80, spd: 60});
		this.setRandomIvs();
		this.learnMove(new VineWhip());
		this.learnMove(new SweetScent());
		this.learnMove(new PoisonPowder());
		this.learnMove(new PowerWhip());
	
	}
}


class Venusaur extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Venusaur",
			level: level, 
			type1: "Grass",
			type2: "Poison"
		});
		this.setBaseStats({hp: 80, atk: 82, spAtk: 100, def: 83, spDef: 100, spd: 80});
		this.setRandomIvs();
		this.learnMove(new VineWhip());	
		this.learnMove(new SweetScent());
		this.learnMove(new PetalDance());
		this.learnMove(new PowerWhip());
	
	}
}


class Charmander extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Charmander",
			level: level, 
			type1: "Fire",
		});
		this.setBaseStats({hp: 39, atk: 52, spAtk: 60, def: 43, spDef: 50, spd: 65});
		this.setRandomIvs();
		this.learnMove(new Ember());	
		this.learnMove(new DragonBreath());
		this.learnMove(new Flamethrower());
		this.learnMove(new Inferno());
	
	}
}


class Charmeleon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Charmeleon",
			level: level, 
			type1: "Fire",
		});
		this.setBaseStats({hp: 58, atk: 64, spAtk: 80, def: 58, spDef: 65, spd: 80});
		this.setRandomIvs();
		this.learnMove(new Ember());	
		this.learnMove(new DragonBreath());
		this.learnMove(new FlareBlitz());
		this.learnMove(new FireFang());
	
	}
}

class Charizard extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Charizard",
			level: level, 
			type1: "Fire",
		});
		this.setBaseStats({hp: 78, atk: 84, spAtk: 109, def: 78, spDef: 85, spd: 100});
		this.setRandomIvs();
		this.learnMove(new HeatWave());	
		this.learnMove(new DragonBreath());
		this.learnMove(new FlareBlitz());
		this.learnMove(new FireFang());
	
	}
}


class Squirtle extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Squirtle",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 44, atk: 48, spAtk: 50, def: 65, spDef: 64, spd: 43});
		this.setRandomIvs();
		this.learnMove(new AquaTail());	
		this.learnMove(new WaveCrash());
		this.learnMove(new HydroPump());
		this.learnMove(new Bite());
	
	}
}


class Wartortle extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Wartortle",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 59, atk: 63, spAtk: 65, def: 80, spDef: 80, spd: 58});
		this.setRandomIvs();
		this.learnMove(new WaterPulse());	
		this.learnMove(new WaveCrash());
		this.learnMove(new RapidSpin());
		this.learnMove(new Bite());
	
	}
}

class Blastoise extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Blastoise",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 79, atk: 83, spAtk: 85, def: 100, spDef: 105, spd: 78});
		this.setRandomIvs();
		this.learnMove(new WaterPulse());	
		this.learnMove(new WaveCrash());
		this.learnMove(new Tackle());
		this.learnMove(new Bite());
	
	}
}


class Raichu extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Raichu",
			level: level, 
			type1: "Electric",
		});
		this.setBaseStats({hp: 60, atk: 90, spAtk: 90, def: 55, spDef: 80, spd: 110});
		this.setRandomIvs();
		this.learnMove(new Discharge());	
		this.learnMove(new ThunderBolt());
		this.learnMove(new IronTail());
		this.learnMove(new ThunderShock());
	
	}
}

class Jigglypuff extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Jigglypuff",
			level: level, 
			type1: "Normal",
			type2: "Fairy",
		});
		this.setBaseStats({hp: 115, atk: 45, spAtk: 45, def: 20, spDef: 25, spd: 20});
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
	constructor(level=1) {
		super({
			name: "Wigglytuff",
			level: level, 
			type1: "Normal",
			type2: "Fairy",
		});
		this.setBaseStats({hp: 140, atk: 70, spAtk: 85, def: 45, spDef: 50, spd: 45});
		this.setRandomIvs();
		this.learnMove(new DisarmingVoice());	
		this.learnMove(new DoubleEdge());
		this.learnMove(new PlayRough());
		this.learnMove(new BodySlam());
	
	}
}

class Lickitung extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Lickitung",
			level: level, 
			type1: "Normal",
		});
		this.setBaseStats({hp: 90, atk: 55, spAtk: 60, def: 75, spDef: 75, spd: 30});
		this.setRandomIvs();
		this.learnMove(new Lick());	
		this.learnMove(new PowerWhip());
		this.learnMove(new Stomp());
		this.learnMove(new Rollout());
	
	}
}

class Jolteon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Jolteon",
			level: level, 
			type1: "Electric",
		});
		this.setBaseStats({hp: 65, atk: 65, spAtk: 110, def: 60, spDef: 95, spd: 130});
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
	constructor(level=1) {
		super({
			name: "Flareon",
			level: level, 
			type1: "Fire",
		});
		this.setBaseStats({hp: 65, atk: 130, spAtk: 95, def: 60, spDef: 110, spd: 65});
		this.setRandomIvs();
		this.learnMove(new LastResort());	
		this.learnMove(new FireBlitz());
		this.learnMove(new Smog());
		this.learnMove(new Bite());
	
	}
}


class Espeon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Espeon",
			level: level, 
			type1: "Psychic",
		});
		this.setBaseStats({hp: 65, atk: 65, spAtk: 130, def: 60, spDef: 95, spd: 110});
		this.setRandomIvs();
		this.learnMove(new LastResort());	
		this.learnMove(new Psychic());
		this.learnMove(new Psybeam());
		this.learnMove(new Bite());
	
	}
}

