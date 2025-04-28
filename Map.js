const walls = [];

class Wall {
    /**
     * @description Create a wall in the game map
     * @param x X-position of top left of wall 
     * @param y Y-position of top left of wall
     * @param w Width of wall
     * @param h Height of wall
     * @param ghostThrough Ghost through wall (boolean)
     * @param type Material of wall (0: stone, 1: wood, 2: grass) 
     */
    constructor(x, y, w, h, ghostThrough, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ghostThrough = ghostThrough;
        this.type = type;
    }

    display() {
        noStroke();
        texture(wallMaterial[this.type]);
        rectMode(CORNER);
        rect(this.x, this.y, this.w, this.h);
    }
}

class GameMap {
    constructor() { }

    render() {
        background(base_0);
        walls.push(new Wall(0, 0, 200, 200, false, 2));

        for (let i = 0; i < walls.length; i++) {
            walls[i].display();
        }
    }
}
