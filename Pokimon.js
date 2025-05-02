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

class Umbreon extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Umbreon",
			level: level, 
			type1: "Dark",
		});
		this.setBaseStats({hp: 95, atk: 65, spAtk: 60, def: 110, spDef: 130, spd: 65});
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
	constructor(level=1) {
		super({
			name: "Leafeon",
			level: level, 
			type1: "Grass",
		});
		this.setBaseStats({hp: 65, atk: 110, spAtk: 60, def: 130, spDef: 65, spd: 95});
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
	constructor(level=1) {
		super({
			name: "Glaceon",
			level: level, 
			type1: "Ice",
		});
		this.setBaseStats({hp: 65, atk: 60, spAtk: 130, def: 60, spDef: 95, spd: 65});
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
	constructor(level=1) {
		super({
			name: "Pichu",
			level: level, 
			type1: "Electric",
		});
		this.setBaseStats({hp: 20, atk: 40, spAtk: 35, def: 15, spDef: 35, spd: 60});
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
	constructor(level=1) {
		super({
			name: "Wobbuffet",
			level: level, 
			type1: "Psychic",
		});
		this.setBaseStats({hp: 190, atk: 33, spAtk: 33, def: 58, spDef: 58, spd: 33});
		this.setRandomIvs();
		this.learnMove(new Amnesia());	
		this.learnMove(new Charm());
		this.learnMove(new Counter());
		this.learnMove(new DestinyBond());
	
	}
}

class Sandshrew extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Sandshrew",
			level: level, 
			type1: "Ground",
		});
		this.setBaseStats({hp: 50, atk: 75, spAtk: 20, def: 85, spDef: 30, spd: 40});
		this.setRandomIvs();
		this.learnMove(new Earthquake());	
		this.learnMove(new Swift());
		this.learnMove(new Dig());
		this.learnMove(new Scratch());
	
	}
}

class Sandslash extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Sandslash",
			level: level, 
			type1: "Ground",
		});
		this.setBaseStats({hp: 75, atk: 100, spAtk: 45, def: 110, spDef: 55, spd: 65});
		this.setRandomIvs();
		this.learnMove(new Slash());	
		this.learnMove(new Bulldoze());
		this.learnMove(new CrushClaw());
		this.learnMove(new Scratch());
	
	}
}


class Clefairy extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Clefairy",
			level: level, 
			type1: "Fairy",
		});
		this.setBaseStats({hp: 70, atk: 45, spAtk: 60, def: 48, spDef: 65, spd: 35});
		this.setRandomIvs();
		this.learnMove(new StoredPower());	
		this.learnMove(new MeteorMash());
		this.learnMove(new MoonBlast());
		this.learnMove(new Pound());
	
	}
}


class Clefable  extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Clefable",
			level: level, 
			type1: "Fairy",
		});
		this.setBaseStats({hp: 95, atk: 70, spAtk: 95, def: 73, spDef: 90, spd: 60});
		this.setRandomIvs();
		this.learnMove(new DisarmingVoice());	
		this.learnMove(new Charm());
		this.learnMove(new StoredPower());
		this.learnMove(new Pound());
	
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
			type2: "Ground"
		});
		this.setBaseStats({hp: 40, atk: 80, spAtk: 30, def: 100, spDef: 30, spd: 20});
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
	constructor(level=1) {
		super({
			name: "Graveler",
			level: level, 
			type1: "Rock",
			type2: "Ground"
		});
		this.setBaseStats({hp: 55, atk: 95, spAtk: 45, def: 115, spDef: 45, spd: 35});
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
	constructor(level=1) {
		super({
			name: "Graveler",
			level: level, 
			type1: "Rock",
			type2: "Ground"
		});
		this.setBaseStats({hp: 80, atk: 120, spAtk: 55, def: 130, spDef: 65, spd: 45});
		this.setRandomIvs();
		this.learnMove(new RockBlast());	
		this.learnMove(new Tackle());
		this.learnMove(new StoneEdge());
		this.learnMove(new SmackDown());
	
	}
}


class Pidgey extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Pidgey",
			level: level, 
			type1: "Normal",
			type2: "Flying"
		});
		this.setBaseStats({hp: 40, atk: 45, spAtk: 35, def: 40, spDef: 35, spd: 56});
		this.setRandomIvs();
		this.learnMove(new Gust());	
		this.learnMove(new Tackle());
		this.learnMove(new WingAttack());
		this.learnMove(new AerialAce());
	
	}
}


class Pidgeotto extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Pidgeotto",
			level: level, 
			type1: "Normal",
			type2: "Flying"
		});
		this.setBaseStats({hp: 63, atk: 60, spAtk: 50, def: 55, spDef: 50, spd: 71});
		this.setRandomIvs();
		this.learnMove(new AirSlash());	
		this.learnMove(new Tackle());
		this.learnMove(new WingAttack());
		this.learnMove(new AerialAce());
	
	}
}


class Pidgeot extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Pidgeot",
			level: level, 
			type1: "Normal",
			type2: "Flying"
		});
		this.setBaseStats({hp: 83, atk: 80, spAtk: 70, def: 75, spDef: 70, spd: 101});
		this.setRandomIvs();
		this.learnMove(new AirSlash());	
		this.learnMove(new Tackle());
		this.learnMove(new Twister());
		this.learnMove(new AerialAce());
	
	}
}


class Meowth extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Meowth",
			level: level, 
			type1: "Normal",
		});
		this.setBaseStats({hp: 40, atk: 45, spAtk: 40, def: 35, spDef: 40, spd: 90});
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
	constructor(level=1) {
		super({
			name: "Persian",
			level: level, 
			type1: "Normal",
		});
		this.setBaseStats({hp: 65, atk: 70, spAtk: 65, def: 60, spDef: 65, spd: 115});
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
	constructor(level=1) {
		super({
			name: "Psyduck",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 50, atk: 52, spAtk: 65, def: 48, spDef: 50, spd: 55});
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
	constructor(level=1) {
		super({
			name: "Golduck",
			level: level, 
			type1: "Water",
		});
		this.setBaseStats({hp: 80, atk: 82, spAtk: 95, def: 78, spDef: 80, spd: 85});
		this.setRandomIvs();
		this.learnMove(new AquaJet());	
		this.learnMove(new WaterPulse());
		this.learnMove(new Scratch());
		this.learnMove(new AquaTail());
	
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
	
	}
}


class Steelix extends Pokimon {
	/**
	 * @param {*} level 
	 */
	constructor(level=1) {
		super({
			name: "Steelix",
			level: level, 
			type1: "Steel",
			type2: "Ground",
		});
		this.setBaseStats({hp: 75, atk: 85, spAtk: 55, def: 200, spDef: 65, spd: 30});
		this.setRandomIvs();
		this.learnMove(new IceFang());	
		this.learnMove(new ThunderFang());
		this.learnMove(new Slam());
		this.learnMove(new IronTail());
	
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
	
	}
}







