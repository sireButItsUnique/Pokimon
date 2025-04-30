let blocks = []; // Block feature

class Block {
    /**
     * @description Create a block in the game map
     * @param x X-position of top left of block 
     * @param y Y-position of top left of block
     * @param w Width of block (multiple of 10)
     * @param h Height of block (multiple of 10)
     * @param ghostThrough Ghost through block (boolean)
     * @param type Material of block (0: rock, 1: wood, 2: grass) 
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
        image(texture[this.type], this.x, this.y, this.w, this.h);
    }
}

class GameMap {
    constructor() { }

    /**
     * @description Split a large block into multiple blocks in multiples of 20px
     * @param x Top left corner x-position
     * @param y Top left corner y-position
     * @param xBlocks Number of blocks in the x-axis
     * @param yBlocks Number of blocks in the y-axis
     * @param ghostThrough Ghost thruogh block (boolean)
     * @param type Material of block (0: rock, 1: wood, 2: grass)
     */
    splitBlocks(x, y, xBlocks, yBlocks, ghostThrough, type) {
        rectMode(CORNER);

        for (let i = 0; i < xBlocks; i++) {
            blocks.push(new Block(x + i * 20, y, 20, 20, ghostThrough, type));
        }

        for (let i = 0; i < yBlocks; i++) {
            blocks.push(new Block(x, y + i * 20, 20, 20, ghostThrough, type));
        }
    }

    render() {
        background(base_0);
        this.splitBlocks(0, 0, 10, 10, true, 2);

        for (let i = 0; i < blocks.length; i++) {
            blocks[i].display();
        }
    }
}