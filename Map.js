let blocks = []; // Block feature
let characters = []; // Character feature

class Block {
    /**
     * @description Create a block in the game map
     * @param map Game map
     * @param x X-position of top left of block 
     * @param y Y-position of top left of block
     * @param w Width of block (multiple of 10)
     * @param h Height of block (multiple of 10)
     * @param type Material of block (0: rock, 1: wood, 2: grass) 
     * @param ghostThrough Ghost through block (boolean)
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
}

class GameMap {
    constructor() {
        this.playerX = -50;
        this.playerY = 0;
        this.mapBg = createGraphics(1200, 800, WEBGL);
        characters.push(new Character(0, 0, 100, 100, loadImage("assets/roxanne.png")));
        for (let i = 0; i < 10; i++) {
            characters.push(new Character(500, 100 + 100 * i, 80, 80, loadImage("assets/tree.png")));
        }
    }

    listenMove() {
        let speed = 2;
        let walking = false;
        if (keyIsDown(87) || keyIsDown(38)) {
            this.playerY -= speed;
            walking = true;
        }
        if (keyIsDown(83) || keyIsDown(40)) {
            this.playerY += speed;
            walking = true;
        }
        if (keyIsDown(65) || keyIsDown(37)) {
            this.playerX -= speed;
            walking = true;
        }
        if (keyIsDown(68) || keyIsDown(39)) {
            this.playerX += speed;
            walking = true;
        }
        
        if (walking) imageBounded(images["Walking"], 550, 350, 100, 100);
        else imageBounded(images["Standing"], 550, 350, 100, 100);
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
        this.mapBg.background(base_0);        

        // this.splitBlocks(0, 0, 200, 200, 2, true);
        this.mapBg.noStroke();
        this.mapBg.textureMode(NORMAL);
        this.mapBg.textureWrap(REPEAT);
        this.mapBg.texture(textures[2]);
        this.mapBg.rect(0 - this.playerX, 0 - this.playerY, 800, 800);
        image(this.mapBg, 0, 0);

        for (let i = 0; i < characters.length; i++) {
            characters[i].render(this.playerX, this.playerY);
        }
        

        // for (let i = 0; i < blocks.length; i++) {
        //     blocks[i].display();
        // }
    }
}