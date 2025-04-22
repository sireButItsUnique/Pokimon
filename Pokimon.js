class Pokimon {
	
	// Basic info
	constructor({name, img, level, type1, type2="none"}) {
		this.name = name;
		this.level = level;
		this.type1 = type1;
		this.type2 = type2;
		this.moves = [];
	}
	
	// Base stats
	setBaseStats({hp, atk, spAtk, def, spDef, spd}) {
		this.hpBASE = hp;
		this.atkBASE = atk;
		this.spAtkBASE = spAtk;
		this.defBASE = def;
		this.spDefBASE = spDef;
		this.spdBASE = spd;
	}
	
	// IV stats
	setIvStats({hp, atk, spAtk, def, spDef, spd}) {
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
	constructor(level=1) {
		super({
			name: "Pikachew",
			level: level, 
			type1: "Electric"
		});
		this.setBaseStats({hp: 35, atk: 55, spAtk: 40, def: 50, spDef: 50, spd: 90});
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
		this.setBaseStats({hp: 130, atk: 65, spAtk: 110, def: 60, spDef: 95, spd: 65});
		this.setRandomIvs();
		this.learnMove(new QuickAttack());
		// this.learnMove(new AuroraBeam());
		// this.learnMove(new WaterPulse());
		// this.learnMove(new HydroPump());
	}
}