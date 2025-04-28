let walls = [];

class Wall {
    /**
     * @description Create a wall in the game map
     * @param x X-position of top left of wall 
     * @param y Y-position of top left of wall
     * @param w Width of wall (multiple of 10)
     * @param h Height of wall (multiple of 10)
     * @param ghostThrough Ghost through wall (boolean)
     * @param type Material of wall (0: stone, 1: wood, 2: grass) 
     */
    constructor(x, y, w, h, ghostThrough, type) {
        if (w % 10 || h % 10) return;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ghostThrough = ghostThrough;
        this.type = type;
    }

    setup() {
        for (let i = 0; i < Math.max(this.w, this.h); i += 10) {
            walls.push(new Wall(Math.min(this.x + i, this.x), Math.min(this.y + i, this.y), 10, 10));
        }
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
        new Wall(0, 0, 500, 500, true, 2).setup();

        for (let i = 0; i < walls.length; i++) {
            walls[i].display();
        }
    }
}