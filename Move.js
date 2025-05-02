class Move {
	constructor({ name, type, power, priority = 0, special = false, pp = 10 }) {
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
            type: "Fire",
            power: 95,
            special: true
        });
    }
}

class WaveCrash extends Move {
    constructor() {
        super({
            name: "Wave Crash", 
            type: "Water",
            power: 120,
            special: false
        });
    }
}

class AquaTail extends Move {
    constructor() {
        super({
            name: "Aqua Tail", 
            type: "Water",
            power: 90,
            special: false
        });
    }
}

class RapidSpin extends Move {
    constructor() {
        super({
            name: "Rapid Spin", 
            type: "Normal",
            power: 50,
            special: false
        });
    }
}

class Tackle extends Move {
    constructor() {
        super({
            name: "Tackle", 
            type: "Normal",
            power: 40,
            special: false
        });
    }
}

class Discharge extends Move {
    constructor() {
        super({
            name: "Discharge", 
            type: "Normal",
            power: 80,
            special: true
        });
    }
}

class IronTail extends Move {
    constructor() {
        super({
            name: "Iron Tail", 
            type: "Steel",
            power: 100,
            special: false
        });
    }
}


class DisarmingVoice extends Move {
    constructor() {
        super({
            name: "Disarming Voice", 
            type: "Fairy",
            power: 40,
            special: true
        });
    }
}


class HyperVoice extends Move {
    constructor() {
        super({
            name: "Hyper Voice", 
            type: "Normal",
            power: 90,
            special: true
        });
    }
}

class BodySlam extends Move {
    constructor() {
        super({
            name: "Body Slam", 
            type: "Normal",
            power: 85,
            special: false
        });
    }
}


class PlayRough extends Move {
    constructor() {
        super({
            name: "Play Rough", 
            type: "Fairy",
            power: 90,
            special: false
        });
    }
}


class Stomp extends Move {
    constructor() {
        super({
            name: "Stomp", 
            type: "Normal",
            power: 65,
            special: false
        });
    }
}

class Rollout extends Move {
    constructor() {
        super({
            name: "Rollout", 
            type: "Rock",
            power: 30,
            special: false
        });
    }
}


class Swift extends Move {
    constructor() {
        super({
            name: "Swift", 
            type: "Normal",
            power: 60,
            special: true
        });
    }
}


class ThunderFang extends Move {
    constructor() {
        super({
            name: "Thunder Fang", 
            type: "Electric",
            power: 65,
            special: false
        });
    }
}


class FireBlitz extends Move {
    constructor() {
        super({
            name: "Fire Blitz", 
            type: "Fire",
            power: 120,
            special: false
        });
    }
}

class LastResort extends Move {
    constructor() {
        super({
            name: "Last Resort", 
            type: "Normal",
            power: 140,
            special: false
        });
    }
}

class Smog extends Move {
    constructor() {
        super({
            name: "Smog", 
            type: "Poison",
            power: 30,
            special: true
        });
    }
}

class Psychic extends Move {
    constructor() {
        super({
            name: "Psychic", 
            type: "Psychic",
            power: 90,
            special: true
        });
    }
}


class Psybeam extends Move {
    constructor() {
        super({
            name: "Psybeam", 
            type: "Psychic",
            power: 65,
            special: true
        });
    }
}


class DarkPulse extends Move {
    constructor() {
        super({
            name: "Dark Pulse", 
            type: "Dark",
            power: 80,
            special: true
        });
    }
}


class LeafBlade extends Move {
    constructor() {
        super({
            name: "Leaf Blade", 
            type: "Grass",
            power: 90,
            special: false
        });
    }
}


class IceFang extends Move {
    constructor() {
        super({
            name: "Ice Fang", 
            type: "Ice",
            power: 65,
            special: false
        });
    }
}


class FreezeDry extends Move {
    constructor() {
        super({
            name: "Freeze Dry", 
            type: "Ice",
            power: 70,
            special: true
        });
    }
}

class Blizzard extends Move {
    constructor() {
        super({
            name: "Blizzard", 
            type: "Ice",
            power: 110,
            special: true
        });
    }
}


class MoonBlast extends Move {
    constructor() {
        super({
            name: "Moonblast", 
            type: "fairy",
            power:  95,
            special: true
        });
    }
}

class DrainingKiss extends Move {
    constructor() {
        super({
            name: "Draining Kiss", 
            type: "Fairy",
            power: 50,
            special: true
        });
    }
}


class SweetKiss extends Move {
    constructor() {
        super({
            name: "Sweet Kiss", 
            type: "Fairy",
            power: 0,
            special: true
        });
    }
}

class Nuzzle extends Move {
    constructor() {
        super({
            name: "Nuzzle", 
            type: "Electric",
            power: 20,
            special: false
        });
    }
}


class TailWhip extends Move {
    constructor() {
        super({
            name: "Tail Whip", 
            type: "Normal",
            power: 0,
            special: true
        });
    }
}


class Amnesia extends Move {
    constructor() {
        super({
            name: "Amnesia", 
            type: "Psychic",
            power: 0,
            special: true
        });
    }
}

class Charm extends Move {
    constructor() {
        super({
            name: "Charm", 
            type: "Fairy",
            power: 0,
            special: true
        });
    }
}


class Counter extends Move {
    constructor() {
        super({
            name: "Counter", 
            type: "Fighting",
            power: 0,
            special: false
        });
    }
}

class DestinyBond extends Move {
    constructor() {
        super({
            name: "Destiny Bond", 
            type: "Ghost",
            power: 0,
            special: true
        });
    }
}

class Earthquake extends Move {
    constructor() {
        super({
            name: "Earthquake", 
            type: "Ground",
            power: 100,
            special: false
        });
    }
}

class Dig extends Move {
    constructor() {
        super({
            name: "Dig", 
            type: "Ground",
            power: 80,
            special: false
        });
    }
}


class Scratch extends Move {
    constructor() {
        super({
            name: "Scratch", 
            type: "Normal",
            power: 40,
            special: false
        });
    }
}


class Slash extends Move {
    constructor() {
        super({
            name: "Slash", 
            type: "Normal",
            power: 70,
            special: false
        });
    }
}


class Bulldoze extends Move {
    constructor() {
        super({
            name: "Bulldoze", 
            type: "Ground",
            power: 60,
            special: false
        });
    }
}

class CrushClaw extends Move {
    constructor() {
        super({
            name: "Crush Claw", 
            type: "Normal",
            power: 75,
            special: false
        });
    }
}


class StoredPower extends Move {
    constructor() {
        super({
            name: "Stored Power", 
            type: "Psychic",
            power: 20,
            special: true
        });
    }
}

class MeteorMash extends Move {
    constructor() {
        super({
            name: "Meteor Mash",
            type: "Steel",
            power: 90,
            special: false
        });
    }
}


class StoneEdge extends Move {
    constructor() {
        super({
            name: "Stone Edge",
            type: "Rock",
            power: 100,
            special: false
        });
    }
}

class SmackDown extends Move {
    constructor() {
        super({
            name: "Smack Down",
            type: "Rock",
            power: 50,
            special: false
        });
    }
}


class RockThrow extends Move {
    constructor() {
        super({
            name: "Rock Throw",
            type: "Rock",
            power: 50,
            special: false
        });
    }
}


class RockBlast extends Move {
    constructor() {
        super({
            name: "Rock Blast",
            type: "Rock",
            power: 25,
            special: false
        });
    }
}

class Gust extends Move {
    constructor() {
        super({
            name: "Gust",
            type: "Flying",
            power: 40,
            special: true
        });
    }
}


class WingAttack extends Move {
    constructor() {
        super({
            name: "Wing Attack",
            type: "Flying",
            power: 60,
            special: false
        });
    }
}


class AerialAce extends Move {
    constructor() {
        super({
            name: "Aerial Ace",
            type: "Flying",
            power: 60,
            special: false
        });
    }
}


class AirSlash extends Move {
    constructor() {
        super({
            name: "Air slash",
            type: "Flying",
            power: 75,
            special: true
        });
    }
}

class Twister extends Move {
    constructor() {
        super({
            name: "Twister",
            type: "Dragon",
            power: 40,
            special: true
        });
    }
}


class Assurance extends Move {
    constructor() {
        super({
            name: "Assurance",
            type: "Dark",
            power: 60,
            special: false
        });
    }
}

class ZenHeadbutt extends Move {
    constructor() {
        super({
            name: "Zen Headbutt",
            type: "Psychic",
            power: 80,
            special: false
        });
    }
}


class AquaJet extends Move {
    constructor() {
        super({
            name: "Aqua Jet",
            type: "Water",
            power: 40,
            special: false
        });
    }
}

class Wrap extends Move {
    constructor() {
        super({
            name: "Wrap",
            type: "Normal",
            power: 15,
            special: false
        });
    }
}


class PoisonJab extends Move {
    constructor() {
        super({
            name: "Poison Jab",
            type: "Poison",
            power: 80,
            special: false
        });
    }
}

class KnockOff extends Move {
    constructor() {
        super({
            name: "Knock Off",
            type: "Dark",
            power: 65,
            special: false
        });
    }
}


class RazorLeaf extends Move {
    constructor() {
        super({
            name: "Razor Leaf",
            type: "Grass",
            power: 55,
            special: false
        });
    }
}

class BubbleBeam extends Move {
    constructor() {
        super({
            name: "Bubble Beam",
            type: "Water",
            power: 65,
            special: true
        });
    }
}


class Surf extends Move {
    constructor() {
        super({
            name: "Surf",
            type: "Water",
            power: 90,
            special: true
        });
    }
}


class PoisonSting extends Move {
    constructor() {
        super({
            name: "Poison Sting",
            type: "Poison",
            power: 15,
            special: false
        });
    }
}


class Confusion extends Move {
    constructor() {
        super({
            name: "Confusion",
            type: "Psychic",
            power: 50,
            special: true
        });
    }
}

class Spark extends Move {
    constructor() {
        super({
            name: "Spark",
            type: "Electric",
            power: 65,
            special: false
        });
    }
}

class ZapCannon extends Move {
    constructor() {
        super({
            name: "Zap Cannon",
            type: "Electric",
            power: 120,
            special: true
        });
    }
}






