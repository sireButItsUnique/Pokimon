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


class ShadowBall extends Move {
    constructor() {
        super({
            name: "Shadow Ball",
            type: "Ghost",
            power: 80,
            special: true
        });
    }
}


class SuckerPunch extends Move {
    constructor() {
        super({
            name: "Sucker Punch",
            type: "Dark",
            power: 70,
            special: false
        });
    }
}

class Payback extends Move {
    constructor() {
        super({
            name: "Payback",
            type: "Dark",
            power: 50,
            special: false
        });
    }
}


class RockSlide extends Move {
    constructor() {
        super({
            name: "Rock Slide",
            type: "Rock",
            power: 75,
            special: false
        });
    }
}

class Slam extends Move {
    constructor() {
        super({
            name: "Slam",
            type: "Normal",
            power: 80,
            special: false
        });
    }
}


class Headbutt extends Move {
    constructor() {
        super({
            name: "Headbutt",
            type: "Normal",
            power: 70,
            special: false
        });
    }
}


class ChargeBeam extends Move {
    constructor() {
        super({
            name: "Charge Beam",
            type: "Electric",
            power: 50,
            special: true
        });
    }
}

class MudShot extends Move {
    constructor() {
        super({
            name: "Mud Shot",
            type: "Ground",
            power: 55,
            special: true
        });
    }
}

class CircleThrow extends Move {
    constructor() {
        super({
            name: "Circle Throw",
            type: "Fighting",
            power: 60,
            special: false
        });
    }
}


class ThunderPunch extends Move {
    constructor() {
        super({
            name: "Thunder Punch",
            type: "Electric",
            power: 75,
            special: false
        });
    }
}


class FirePunch extends Move {
    constructor() {
        super({
            name: "Fire Punch",
            type: "Fire",
            power: 75,
            special: false
        });
    }
}

class IcePunch extends Move {
    constructor() {
        super({
            name: "Ice Punch",
            type: "Ice",
            power: 75,
            special: false
        });
    }
}


class PsychoCut extends Move {
    constructor() {
        super({
            name: "Psycho Cut",
            type: "Psychic",
            power: 70,
            special: false
        });
    }
}


class StringShot extends Move {
    constructor() {
        super({
            name: "String Shot",
            type: "Bug",
            power: 0,
            special: true
        });
    }
}


class BugBite extends Move {
    constructor() {
        super({
            name: "Bug Bite",
            type: "Bug",
            power: 60,
            special: false
        });
    }
}


class Harden extends Move {
    constructor() {
        super({
            name: "Harden",
            type: "Normal",
            power: 0,
            special: true
        });
    }
}


class FuryCutter extends Move {
    constructor() {
        super({
            name: "Fury Cutter",
            type: "Bug",
            power: 40,
            special: false
        });
    }
}


class PinMissle extends Move {
    constructor() {
        super({
            name: "Pin Missle",
            type: "Bug",
            power: 25,
            special: false
        });
    }
}


class Crunch extends Move {
    constructor() {
        super({
            name: "Crunch",
            type: "Dark",
            power: 80,
            special: false
        });
    }
}



class Peck extends Move {
    constructor() {
        super({
            name: "Peck",
            type: "Flying",
            power: 35,
            special: false
        });
    }
}


class FuryAttack extends Move {
    constructor() {
        super({
            name: "Fury Attack",
            type: "Normal",
            power: 15,
            special: false
        });
    }
}



class DrillRun extends Move {
    constructor() {
        super({
            name: "Drill Run",
            type: "Ground",
            power: 80,
            special: false
        });
    }
}


class Acid extends Move {
    constructor() {
        super({
            name: "Acid",
            type: "Poison",
            power: 40,
            special: true
        });
    }
}

class FurySwipes extends Move {
    constructor() {
        super({
            name: "Fury Swipes",
            type: "Normal",
            power: 18,
            special: false
        });
    }
}


class EarthPower extends Move {
    constructor() {
        super({
            name: "EarthPower",
            type: "Ground",
            power: 90,
            special: true
        });
    }
}


class DoubleKick extends Move {
    constructor() {
        super({
            name: "Double Kick",
            type: "Fighting",
            power: 30,
            special: false
        });
    }
}


class HornAttack extends Move {
    constructor() {
        super({
            name: "Horn Attack",
            type: "Normal",
            power: 65,
            special: false
        });
    }
}

class Astonish extends Move {
    constructor() {
        super({
            name: "Astonish",
            type: "Ghost",
            power: 30,
            special: false
        });
    }
}

class Absorb extends Move {
    constructor() {
        super({
            name: "Absorb",
            type: "Grass",
            power: 20,
            special: true
        });
    }
}


class PoisonFang extends Move {
    constructor() {
        super({
            name: "Poison Fang",
            type: "Poison",
            power: 50,
            special: false
        });
    }
}


class Thrash extends Move {
    constructor() {
        super({
            name: "Thrash",
            type: "Normal",
            power: 120,
            special: false
        });
    }
}



class CloseCombat extends Move {
    constructor() {
        super({
            name: "Close Combat",
            type: "Fighting",
            power: 120,
            special: false
        });
    }
}



class Revenge extends Move {
    constructor() {
        super({
            name: "Revenge",
            type: "Fighting",
            power: 60,
            special: false
        });
    }
}


class DynamicPunch extends Move {
    constructor() {
        super({
            name: "Dynamic Punch",
            type: "Fighting",
            power: 100,
            special: false
        });
    }
}



class LowSweep extends Move {
    constructor() {
        super({
            name: "Low Sweep",
            type: "Fighting",
            power: 65,
            special: false
        });
    }
}


class FlameCharge extends Move {
    constructor() {
        super({
            name: "Flame Charge",
            type: "Fire",
            power: 50,
            special: false
        });
    }
}


class SmartStrike extends Move {
    constructor() {
        super({
            name: "Smart Strike",
            type: "Steel",
            power: 70,
            special: false
        });
    }
}


class Pluck extends Move {
    constructor() {
        super({
            name: "Pluck",
            type: "Flying",
            power: 60,
            special: false
        });
    }
}


class IcyWind extends Move {
    constructor() {
        super({
            name: "Icy Wind",
            type: "Ice",
            power: 55,
            special: true
        });
    }
}

class IceShard extends Move {
    constructor() {
        super({
            name: "Ice Shard",
            type: "Ice",
            power: 40,
            special: false
        });
    }
}



class Dive extends Move {
    constructor() {
        super({
            name: "Dive",
            type: "Water",
            power: 80,
            special: false
        });
    }
}


class Belch extends Move {
    constructor() {
        super({
            name: "Belch",
            type: "Poison",
            power: 120,
            special: true
        });
    }
}


class MudSlap extends Move {
    constructor() {
        super({
            name: "Mud-Slap",
            type: "Ground",
            power: 20,
            special: true
        });
    }
}


class GunkShot extends Move {
    constructor() {
        super({
            name: "Gunk Shot",
            type: "Poison",
            power: 120,
            special: false
        });
    }
}



class RazorShell extends Move {
    constructor() {
        super({
            name: "Razor Shell",
            type: "Water",
            power: 75,
            special: false
        });
    }
}



class IcicleCrash extends Move {
    constructor() {
        super({
            name: "Icicle Crash",
            type: "Ice",
            power: 85,
            special: false
        });
    }
}


class MetalClaw extends Move {
    constructor() {
        super({
            name: "Metal Claw",
            type: "Steel",
            power: 50,
            special: false
        });
    }
}


class HammerArm extends Move {
    constructor() {
        super({
            name: "Hammer Arm",
            type: "Fighting",
            power: 100,
            special: false
        });
    }
}


class BulletSeed extends Move {
    constructor() {
        super({
            name: "Bullet Seed",
            type: "Grass",
            power: 25,
            special: false
        });
    }
}

class MegaDrain extends Move {
    constructor() {
        super({
            name: "Mega Drain",
            type: "Grass",
            power: 40,
            special: true
        });
    }
}



class SeedBomb extends Move {
    constructor() {
        super({
            name: "Seed Bomb",
            type: "Grass",
            power: 80,
            special: false
        });
    }
}


class BoneRush extends Move {
    constructor() {
        super({
            name: "Bone Rush",
            type: "Ground",
            power: 25,
            special: false
        });
    }
}


class FalseSwipe extends Move {
    constructor() {
        super({
            name: "False Swipe",
            type: "Normal",
            power: 40,
            special: false
        });
    }
}


class Bonemerang extends Move {
    constructor() {
        super({
            name: "Bonemerang",
            type: "Ground",
            power: 50,
            special: false
        });
    }
}

class BulletPunch extends Move {
    constructor() {
        super({
            name: "Bullet Punch",
            type: "Steel",
            power: 40,
            special: false
        });
    }
}



class Covet extends Move {
    constructor() {
        super({
            name: "Covet",
            type: "Normal",
            power: 60,
            special: false
        });
    }
}

class TakeDown extends Move {
    constructor() {
        super({
            name: "Take Down",
            type: "Normal",
            power: 90,
            special: false
        });
    }
}



class Leer extends Move {
    constructor() {
        super({
            name: "Leer",
            type: "Normal",
            power: 0,
            special: true
        });
    }
}






















