const wallMaterial = {
    0: loadImage("assets/texture_stone.png"),
    1: loadImage("assets/texture_wood.avif")
};

class Wall {
    /**
     * @description Create a wall in the game map
     * @param x X-position of top left of wall 
     * @param y Y-position of top left of wall
     * @param type Material of wall (0: stone, 1: wood) 
     */
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

class Map {
    constructor() {

    }

    render() {

    }
}