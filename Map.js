let blocks = []; // Block feature
let characters = []; // Character feature

class Block {
    /**
     * @description Create a block in the game map
     * @param x X-position of top left of block 
     * @param y Y-position of top left of block
     * @param w Width of block (multiple of 10)
     * @param h Height of block (multiple of 10)
     * @param ghostThrough Ghost through block (boolean)
     * @param type Material of block (0: rock, 1: wood, 2: grass) 
     * @param opacity Opacity (0 - 1)
     */
    constructor(x, y, w, h, type, ghostThrough=false, opacity=1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
        this.ghostThrough = ghostThrough;
        this.opacity = opacity;
    }

    display() {
        noStroke();
        texture(texture[this.type]);
        rect(this.x, this.y, this.w, this.h);
        // tint(255, 255 * this.opacity);
        // image(texture[this.type], this.x, this.y, this.w, this.h);
    }
}

class GameMap {
    constructor() {
        this.playerX = -50;
        this.playerY = 0;
        this.map = createGraphics(1200, 800, WEBGL);
        characters.push(new Character(0, 0, 100, 100, loadImage("assets/roxanne.png")));
        for (let i = 0; i < 10; i++) {
            characters.push(new Character(500, 100 + 100 * i, 80, 80, loadImage("assets/tree.png")));
        }
    }

    listenMove() {
        let speed = 2;
        if (keyIsDown(87)) this.playerY -= speed;
        if (keyIsDown(83)) this.playerY += speed;
        if (keyIsDown(65)) this.playerX -= speed;
        if (keyIsDown(68)) this.playerX += speed;
    }

    /**
     * @description Split a large block into multiple blocks in multiples of 20px
     * @param x Top left corner x-position
     * @param y Top left corner y-position
     * @param xBlocks Number of blocks in the x-axis
     * @param yBlocks Number of blocks in the y-axis
     * @param ghostThrough Ghost thruogh block (boolean)
     * @param type Material of block (0: rock, 1: wood, 2: grass)
     */
    splitBlocks(x, y, xBlocks, yBlocks, type, ghostThrough=false, opacity=1) {
        rectMode(CORNER);

        for (let i = 0; i < xBlocks; i++) {
            for (let j = 0; j < yBlocks; j++) {
                blocks.push(new Block(x + i * 40, y + j * 40, 40, 40, type, ghostThrough, opacity));
            }
        }
    }

    render() {
        this.map.tint(255, 255);
        this.map.background(base_0);
        // this.map.translate(-this.map.width / 50, -this.map.height / 50);
        image(this.map, 0, 0);
        
        for (let i = 0; i < characters.length; i++) {
            characters[i].render(this.playerX, this.playerY);
        }
        ellipse(600, 400, 100, 100);

        // this.splitBlocks(0, 0, 200, 200, true, 2);

        // for (let i = 0; i < blocks.length; i++) {
        //     blocks[i].display();
        // }
    }
}