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
  images["Bulbasaur"] = loadImage("/assets/bulbasaur.gif");
  images["Ivysaur"] = loadImage("/assets/ivysaur.gif");
  images["Venusaur"] = loadImage("/assets/venusaur.gif");
  images["Charmander"] = loadImage("/assets/charmander.gif");
  images["Charmeleon"] = loadImage("/assets/charmeleon.gif");
  images["Charizard"] = loadImage("/assets/charizard.gif");
  images["Squirtle"] = loadImage("/assets/squirtle.gif");
  images["Wartortle"] = loadImage("/assets/wartortle.gif");
  images["Blastoise"] = loadImage("/assets/blastoise.gif");
  images["Caterpie"] = loadImage("/assets/caterpie.gif");
  images["Metapod"] = loadImage("/assets/metapod.gif");
  images["Butterfree"] = loadImage("/assets/butterfree.gif");
  images["Weedle"] = loadImage("/assets/weedle.gif");
  images["Kakuna"] = loadImage("/assets/kakuna.gif");
  images["Beedrill"] = loadImage("/assets/beedrill.gif");
  images["Pidgey"] = loadImage("/assets/pidgey.gif");
  images["Pidgeotto"] = loadImage("/assets/pidgeotto.gif");
  images["Pidgeot"] = loadImage("/assets/pidgeot.gif");
  images["Rattata"] = loadImage("/assets/rattata.gif");
  images["Raticate"] = loadImage("/assets/raticate.gif");
  images["Spearow"] = loadImage("/assets/spearow.gif");
  images["Fearow"] = loadImage("/assets/fearow.gif");
  images["Ekans"] = loadImage("/assets/ekans.gif");
  images["Arbok"] = loadImage("/assets/arbok.gif");
  images["Pikachu"] = loadImage("/assets/pikachu.gif");
  images["Raichu"] = loadImage("/assets/raichu.gif");
  images["Sandshrew"] = loadImage("/assets/sandshrew.gif");
  images["Sandslash"] = loadImage("/assets/sandslash.gif");
  images["NidoranF"] = loadImage("/assets/nidoran-f.gif");
  images["Nidorina"] = loadImage("/assets/nidorina.gif");
  images["Nidoqueen"] = loadImage("/assets/nidoqueen.gif");
  images["NidoranM"] = loadImage("/assets/nidoran-m.gif");
  images["Nidorino"] = loadImage("/assets/nidorino.gif");
  images["Nidoking"] = loadImage("/assets/nidoking.gif");
  images["Clefairy"] = loadImage("/assets/clefairy.gif");
  images["Clefable"] = loadImage("/assets/clefable.gif");
  images["Vulpix"] = loadImage("/assets/vulpix.gif");
  images["Ninetales"] = loadImage("/assets/ninetales.gif");
  images["Jigglypuff"] = loadImage("/assets/jigglypuff.gif");
  images["Wigglytuff"] = loadImage("/assets/wigglytuff.gif");
  images["Zubat"] = loadImage("/assets/zubat.gif");
  images["Golbat"] = loadImage("/assets/golbat.gif");
  images["Oddish"] = loadImage("/assets/oddish.gif");
  images["Gloom"] = loadImage("/assets/gloom.gif");
  images["Vileplume"] = loadImage("/assets/vileplume.gif");
  images["Paras"] = loadImage("/assets/paras.gif");
  images["Parasect"] = loadImage("/assets/parasect.gif");
  images["Venonat"] = loadImage("/assets/venonat.gif");
  images["Venomoth"] = loadImage("/assets/venomoth.gif");
  images["Diglett"] = loadImage("/assets/diglett.gif");
  images["Dugtrio"] = loadImage("/assets/dugtrio.gif");
  images["Meowth"] = loadImage("/assets/meowth.gif");
  images["Persian"] = loadImage("/assets/persian.gif");
  images["Psyduck"] = loadImage("/assets/psyduck.gif");
  images["Golduck"] = loadImage("/assets/golduck.gif");
  images["Mankey"] = loadImage("/assets/mankey.gif");
  images["Primeape"] = loadImage("/assets/primeape.gif");
  images["Growlithe"] = loadImage("/assets/growlithe.gif");
  images["Arcanine"] = loadImage("/assets/arcanine.gif");
  images["Poliwag"] = loadImage("/assets/poliwag.gif");
  images["Poliwhirl"] = loadImage("/assets/poliwhirl.gif");
  images["Poliwrath"] = loadImage("/assets/poliwrath.gif");
  images["Abra"] = loadImage("/assets/abra.gif");
  images["Kadabra"] = loadImage("/assets/kadabra.gif");
  images["Alakazam"] = loadImage("/assets/alakazam.gif");
  images["Machop"] = loadImage("/assets/machop.gif");
  images["Machoke"] = loadImage("/assets/machoke.gif");
  images["Machamp"] = loadImage("/assets/machamp.gif");
  images["Bellsprout"] = loadImage("/assets/bellsprout.gif");
  images["Weepinbell"] = loadImage("/assets/weepinbell.gif");
  images["Victreebel"] = loadImage("/assets/victreebel.gif");
  images["Tentacool"] = loadImage("/assets/tentacool.gif");
  images["Tentacruel"] = loadImage("/assets/tentacruel.gif");
  images["Geodude"] = loadImage("/assets/geodude.gif");
  images["Graveler"] = loadImage("/assets/graveler.gif");
  images["Golem"] = loadImage("/assets/golem.gif"); 
  images["Ponyta"] = loadImage("/assets/ponyta.gif"); 
  images["Rapidash"] = loadImage("/assets/rapidash.gif"); 
  images["Slowpoke"] = loadImage("/assets/slowpoke.gif");
  images["Slowbro"] = loadImage("/assets/slowbro.gif");
  images["Magnemite"] = loadImage("/assets/magnemite.gif");
  images["Magneton"] = loadImage("/assets/magneton.gif");
  images["Farfetch'd"] = loadImage("/assets/farfetchd.gif");
  images["Doduo"] = loadImage("/assets/doduo.gif");
  images["Dodrio"] = loadImage("/assets/dodrio.gif");
  images["Seel"] = loadImage("/assets/seel.gif");
  images["Dewgong"] = loadImage("/assets/dewgong.gif");
  images["Grimer"] = loadImage("/assets/grimer.gif");
  images["Muk"] = loadImage("/assets/muk.gif");
  images["Shellder"] = loadImage("/assets/shellder.gif");
  images["Cloyster"] = loadImage("/assets/cloyster.gif");
  images["Haunter"] = loadImage("/assets/haunter.gif");
  images["Gastly"] = loadImage("/assets/gastly.gif");
  images["Gengar"] = loadImage("/assets/gengar.gif");
  images["Onix"] = loadImage("/assets/onix.gif");
  images["Drowzee"] = loadImage("/assets/drowzee.gif");
  images["Hypno"] = loadImage("/assets/hypno.gif");
  images["Krabby"] = loadImage("/assets/krabby.gif");
  images["Kingler"] = loadImage("/assets/kingler.gif");
  images["Voltorb"] = loadImage("/assets/voltorb.gif");
  images["Electrode"] = loadImage("/assets/electrode.gif");
  images["Exeggcute"] = loadImage("/assets/exeggcute.gif");
  images["Exeggutor"] = loadImage("/assets/exeggutor.gif");
  images["Cubone"] = loadImage("/assets/cubone.gif");
  images["Marowak"] = loadImage("/assets/marowak.gif");
  images["Hitmonlee"] = loadImage("/assets/hitmonlee.gif");
  images["Hitmonchan"] = loadImage("/assets/hitmonchan.gif");
  images["Lickitung"] = loadImage("/assets/lickitung.gif");
  images["Koffing"] = loadImage("/assets/koffing.gif");
  images["Weezing"] = loadImage("/assets/weezing.gif");
  images["Rhyhorn"] = loadImage("/assets/rhyhorn.gif");
  images["Rhydon"] = loadImage("/assets/rhydon.gif");
  images["Chansey"] = loadImage("/assets/chansey.gif");
  images["Tangela"] = loadImage("/assets/tangela.gif");
  images["Kangaskhan"] = loadImage("/assets/kangaskhan.gif");
  images["Horsea"] = loadImage("/assets/horsea.gif");
  images["Seadra"] = loadImage("/assets/seadra.gif");
  images["Goldeen"] = loadImage("/assets/goldeen.gif");
  images["Seaking"] = loadImage("/assets/seaking.gif");
  images["Staryu"] = loadImage("/assets/staryu.gif");
  images["Starmie"] = loadImage("/assets/starmie.gif");
  images["Mr. Mime"] = loadImage("/assets/mr-mime.gif");
  images["Scyther"] = loadImage("/assets/scyther.gif");
  images["Jynx"] = loadImage("/assets/jynx.gif");
  images["Electrabuzz"] = loadImage("/assets/electrabuzz.gif");
  images["Magmar"] = loadImage("/assets/magmar.gif");
  images["Pinsir"] = loadImage("/assets/pinsir.gif");
  images["Tauros"] = loadImage("/assets/tauros.gif");
  images["Magikarp"] = loadImage("/assets/magikarp.gif");
  images["Gyarados"] = loadImage("/assets/gyarados.gif");
  images["Lapras"] = loadImage("/assets/lapras.gif");
  images["Ditto"] = loadImage("/assets/ditto.gif");
  images["Eevee"] = loadImage("/assets/eevee.gif");
  images["Vapoureon"] = loadImage("/assets/vaporeon.gif");
  images["Jolteon"] = loadImage("/assets/jolteon.gif");
  images["Flareon"] = loadImage("/assets/flareon.gif");
  images["Porygon"] = loadImage("/assets/porygon.gif");
  images["Omanyte"] = loadImage("/assets/omanyte.gif");
  images["Omastar"] = loadImage("/assets/omastar.gif");
  images["Kabuto"] = loadImage("/assets/kabuto.gif");
  images["Kabutops"] = loadImage("/assets/kabutops.gif");
  images["Aerodactyl"] = loadImage("/assets/aerodactyl.gif");
  images["Snorlax"] = loadImage("/assets/snorlax.gif");
  images["Articuno"] = loadImage("/assets/articuno.gif");
  images["Zapdos"] = loadImage("/assets/zapdos.gif");
  images["Moltres"] = loadImage("/assets/moltres.gif");
  images["Dratini"] = loadImage("/assets/dratini.gif");
  images["Dragonair"] = loadImage("/assets/dragonair.gif");
  images["Dragonite"] = loadImage("/assets/dragonite.gif");
  images["Mewtwo"] = loadImage("/assets/mewtwo.gif");
  images["Mew"] = loadImage("/assets/mew.gif");
  images["Treecko"] = loadImage("/assets/treecko.gif");
  
 
  
  
 
  images["Espeon"] = loadImage("/assets/espeon.gif");
  images["Umbreon"] = loadImage("/assets/umbreon.gif");
  images["Leafeon"] = loadImage("/assets/leafeon.gif");
  images["Glaceon"] = loadImage("/assets/glaceon.gif");
  images["Pichu"] = loadImage("/assets/pichu.gif");
  images["Wobbuffet"] = loadImage("/assets/wobbuffet.gif");
 
  
  
  
 
  
  
 
  
  images["Steelix"] = loadImage("/assets/steelix.gif");
 
  
 
  

}