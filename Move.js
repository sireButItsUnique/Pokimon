class Move {
	constructor({name, type, power, priority=0, special=false, pp=10}) {
		this.name = name;
		this.type = type;
		this.power = power;
		this.priority = priority;
		this.special = special;
		this.pp = pp;
	}
}

// Moves
class QuickAttack extends Move {
	constructor() {
		super({
			name: "Quick Attack", 
			type: "Normal",
			power: 40,
			priority: 1
		});
	}
}

class Agility extends Move {
	constructor() {
		super({
			name: "Agility", 
			type: "Psychic",
			power: 0,
			special: true
		});
	}
}

class ThunderShock extends Move {
	constructor() {
		super({
			name: "Thunder Shock", 
			type: "Electric",
			power: 40,
			special: true
		});
	}
}

class ThunderBolt extends Move {
	constructor() {
		super({
			name: "Thunder Bolt", 
			type: "Electric",
			power: 90,
			special: true
		});
	}
}

class WaterPulse extends Move {
	constructor() {
		super({
			name: "Water Pulse", 
			type: "Water",
			power: 60,
			special: true
		});
	}
}

class AuroraBeam extends Move {
	constructor() {
		super({
			name: "Aurora Beam", 
			type: "Ice",
			power: 65,
			special: true
		});
	}
}

class HydroPump extends Move {
	constructor() {
		super({
			name: "Hydro Pump", 
			type: "Water",
			power: 110,
			special: true
		});
	}
}

class Bite extends Move {
	constructor() {
		super({
			name: "Bite", 
			type: "Dark",
			power: 60,
			special: false
		});
	}
}

class BabyDollEyes extends Move {
	constructor() {
		super({
			name: "Baby-Doll Eyes", 
			type: "Fairy",
			power: 0,
			special: true
		});
	}
}

class DoubleEdge extends Move {
	constructor() {
		super({
			name: "Double-Edge", 
			type: "Normal",
			power: 120,
			special: false
		});
	}
}

class Pound extends Move {
    constructor() {
        super({
            name: "Pound", 
            type: "Normal",
            power: 40,
            special: false
        });
    }
}

class WaterGun extends Move {
    constructor() {
        super({
            name: "Water Gun", 
            type: "Water",
            power: 40,
            special: true
        });
    }
}

class Lick extends Move {
    constructor() {
        super({
            name: "Lick", 
            type: "Ghost",
            power: 30,
            special: false
        });
    }
}

class Bounce extends Move {
    constructor() {
        super({
            name: "Bounce", 
            type: "Flying",
            power: 85,
            special: false
        });
    }
}

class VineWhip extends Move {
    constructor() {
        super({
            name: "Vine Whip", 
            type: "Grass",
            power: 45,
            special: false
        });
    }
}

class SolarBeam extends Move {
    constructor() {
        super({
            name: "Solar Beam", 
            type: "Grass",
            power: 120,
            special: true
        });
    }
}

class SweetScent extends Move {
    constructor() {
        super({
            name: "Sweet Scent", 
            type: "Normal",
            power: 0,
            special: true
        });
    }
}

class PoisonPowder extends Move {
    constructor() {
        super({
            name: "Poison Powder", 
            type: "Poison",
            power: 0,
            special: true
        });
    }
}

class PowerWhip extends Move {
    constructor() {
        super({
            name: "Power Whip", 
            type: "Grass",
            power: 120,
            special: false
        });
    }
}


class PetalDance extends Move {
    constructor() {
        super({
            name: "Petal Dance", 
            type: "Grass",
            power: 120,
            special: true
        });
    }
}

class Ember extends Move {
    constructor() {
        super({
            name: "Ember", 
            type: "Fire",
            power: 40,
            special: true
        });
    }
}


class DragonBreath extends Move {
    constructor() {
        super({
            name: "Dragon Breath", 
            type: "Dragon",
            power: 60,
            special: true
        });
    }
}


class Inferno extends Move {
    constructor() {
        super({
            name: "Inferno", 
            type: "Fire",
            power: 100,
            special: true
        });
    }
}

class Flamethrower extends Move {
    constructor() {
        super({
            name: "Flamethrower", 
            type: "Fire",
            power: 90,
            special: true
        });
    }
}

class FireFang extends Move {
    constructor() {
        super({
            name: "Fire Fang", 
            type: "Fire",
            power: 65,
            special: false
        });
    }
}

class FlareBlitz extends Move {
    constructor() {
        super({
            name: "Flare Blitz", 
            type: "Fire",
            power: 120,
            special: false
        });
    }
}

class HeatWave extends Move {
    constructor() {
        super({
            name: "Heat Wave", 
            type: "95",
            power: 120,
            special: true
        });
    }
}



