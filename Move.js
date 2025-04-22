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

