function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function imageBounded(img, x, y, boxW, boxH) {
  let imgRatio = img.width / img.height;
  let boxRatio = boxW / boxH;

  let w = boxW;
  let h = boxH;

  if (imgRatio > boxRatio) {
    // Wider image
    h = boxW / imgRatio;
  } else {
    // Taller image
    w = boxH * imgRatio;
  }

  // Center the image in the box
  image(img, x + (boxW - w) / 2, y + (boxH - h) / 2, w, h);
}

const base_0 = "#171717";
const base_1 = "#2c2c2c";
const base_2 = "#434343";
const base_3 = "#5b5b5b";
const base_4 = "#747474";
const base_5 = "#8e8e8e";

const tone_0 = "#1e2427";
const tone_1 = "#33383b";
const tone_2 = "#494e51";
const tone_3 = "#616567";
const tone_4 = "#797d7f";
const tone_5 = "#929597";

const highlight_0 = "#54b3d6";
const highlight_1 = "#6cbbdb";
const highlight_2 = "#81c4df";
const highlight_3 = "#95cce4";
const highlight_4 = "#a7d4e8";
const highlight_5 = "#badded";

const typeColor = {
  Normal: "#A8A77A",
  Fire: "#EE8130",
  Water: "#6390F0",
  Electric: "#F7D02C",
  Grass: "#7AC74C",
  Ice: "#96D9D6",
  Fighting: "#C22E28",
  Poison: "#A33EA1",
  Ground: "#E2BF65",
  Flying: "#A98FF3",
  Psychic: "#F95587",
  Bug: "#A6B91A",
  Rock: "#B6A136",
  Ghost: "#735797",
  Dragon: "#6F35FC",
  Dark: "#705746",
  Steel: "#B7B7CE",
  Fairy: "#D685AD"
};

const typeMult = {
  Normal: {
    Rock: 0.5,
    Ghost: 0,
    Steel: 0.5
  },
  Fire: {
    Grass: 2,
    Ice: 2,
    Bug: 2,
    Steel: 2,
    Fire: 0.5,
    Water: 0.5,
    Rock: 0.5,
    Dragon: 0.5
  },
  Water: {
    Fire: 2,
    Ground: 2,
    Rock: 2,
    Water: 0.5,
    Grass: 0.5,
    Dragon: 0.5
  },
  Electric: {
    Water: 2,
    Flying: 2,
    Electric: 0.5,
    Grass: 0.5,
    Dragon: 0.5,
    Ground: 0
  },
  Grass: {
    Water: 2,
    Ground: 2,
    Rock: 2,
    Fire: 0.5,
    Grass: 0.5,
    Poison: 0.5,
    Flying: 0.5,
    Bug: 0.5,
    Dragon: 0.5,
    Steel: 0.5
  },
  Ice: {
    Grass: 2,
    Ground: 2,
    Flying: 2,
    Dragon: 2,
    Fire: 0.5,
    Water: 0.5,
    Ice: 0.5,
    Steel: 0.5
  },
  Fighting: {
    Normal: 2,
    Ice: 2,
    Rock: 2,
    Dark: 2,
    Steel: 2,
    Poison: 0.5,
    Flying: 0.5,
    Psychic: 0.5,
    Bug: 0.5,
    Fairy: 0.5,
    Ghost: 0
  },
  Poison: {
    Grass: 2,
    Fairy: 2,
    Poison: 0.5,
    Ground: 0.5,
    Rock: 0.5,
    Ghost: 0.5,
    Steel: 0
  },
  Ground: {
    Fire: 2,
    Electric: 2,
    Poison: 2,
    Rock: 2,
    Steel: 2,
    Grass: 0.5,
    Bug: 0.5,
    Flying: 0
  },
  Flying: {
    Grass: 2,
    Fighting: 2,
    Bug: 2,
    Electric: 0.5,
    Rock: 0.5,
    Steel: 0.5
  },
  Psychic: {
    Fighting: 2,
    Poison: 2,
    Psychic: 0.5,
    Steel: 0.5,
    Dark: 0
  },
  Bug: {
    Grass: 2,
    Psychic: 2,
    Dark: 2,
    Fire: 0.5,
    Fighting: 0.5,
    Poison: 0.5,
    Flying: 0.5,
    Ghost: 0.5,
    Steel: 0.5,
    Fairy: 0.5
  },
  Rock: {
    Fire: 2,
    Ice: 2,
    Flying: 2,
    Bug: 2,
    Fighting: 0.5,
    Ground: 0.5,
    Steel: 0.5
  },
  Ghost: {
    Psychic: 2,
    Ghost: 2,
    Dark: 0.5,
    Normal: 0
  },
  Dragon: {
    Dragon: 2,
    Steel: 0.5,
    Fairy: 0
  },
  Dark: {
    Psychic: 2,
    Ghost: 2,
    Fighting: 0.5,
    Dark: 0.5,
    Fairy: 0.5
  },
  Steel: {
    Ice: 2,
    Rock: 2,
    Fairy: 2,
    Fire: 0.5,
    Water: 0.5,
    Electric: 0.5,
    Steel: 0.5
  },
  Fairy: {
    Fighting: 2,
    Dragon: 2,
    Dark: 2,
    Fire: 0.5,
    Poison: 0.5,
    Steel: 0.5
  }
};

function getTypeEffectiveness(attacking, defending) {
  if (typeMult[attacking] && typeMult[attacking][defending] !== undefined) return typeMult[attacking][defending];
  return 1; // Neutral if not explicitly defined
}

function getDmg(move, attacking, defending) {
  let dmg = 0.4 * attacking.level + 2;
  dmg *= move.power;

  let { atk, spAtk } = attacking.getStats();
  let { def, spDef } = defending.getStats();
  if (move.special) dmg *= (spAtk / spDef);
  else dmg *= (atk / def);

  dmg /= 50;
  dmg + 2;
  dmg = Math.floor(dmg);

  dmg *= getTypeEffectiveness(move.type, defending.type1);
  dmg *= getTypeEffectiveness(move.type, defending.type2);
  return dmg;
}

let images = {};
const wallMaterial = [];

function preload() {
  images["Pikachew"] = loadImage("/assets/pikachu.gif");
  images["Vapoureon"] = loadImage("/assets/vaporeon.gif");
  images["Eevee"] = loadImage("/assets/eevee.gif");
  images["Bulbasaur"] = loadImage("/assets/bulbasaur.gif");
  wallMaterial.push(loadImage("assets/texture_stone.png"));
  wallMaterial.push(loadImage("assets/texture_wood.avif"));
  wallMaterial.push(loadImage("assets/texture_grass.png"));
  images["Ivysaur"] = loadImage("/assets/ivysaur.gif");
  images["Venusaur"] = loadImage("/assets/venusaur.gif");
  images["Charmander"] = loadImage("/assets/charmander.gif");
  images["Charmeleon"] = loadImage("/assets/charmeleon.gif");
  images["Charizard"] = loadImage("/assets/charizard.gif");
  images["Squirtle"] = loadImage("/assets/squirtle.gif");
  images["Wartortle"] = loadImage("/assets/wartortle.gif");

}