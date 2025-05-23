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
        this.playerX = 0;
        this.playerY = 0;
        this.mapWidth = 1200;
        this.mapHeight = 800;
        this.mapBg = createGraphics(this.mapWidth, this.mapHeight, WEBGL);
        characters.push(new Character(0, 0, 100, 100, loadImage("assets/roxanne.png")));
        for (let i = 0; i < 10; i++) {
            characters.push(new Character(500, 100 + 100 * i, 80, 80, loadImage("assets/tree.png")));
        }
    }

    listenMove() {
        let speed = 2;
        let walking = 0;
        if (keyIsDown(68) || keyIsDown(39)) {
            this.playerX += speed;
            walking = 1;
        }
        if (keyIsDown(65) || keyIsDown(37)) {
            this.playerX -= speed;
            walking = 2;
        }
        if (keyIsDown(87) || keyIsDown(38)) {
            this.playerY -= speed;
            walking = 3;
        }
        if (keyIsDown(83) || keyIsDown(40)) {
            this.playerY += speed;
            walking = 4;
        }
        
        if (!walking) imageBounded(images["Standing"], 550, 350, 100, 100);
        else if (walking == 1) imageBounded(images["RightWalking"], 550, 350, 100, 100);
        else if (walking == 2) imageBounded(images["LeftWalking"], 550, 350, 100, 100);
        else if (walking == 3) imageBounded(images["Walking"], 550, 350, 100, 100, -PI / 2);
        else if (walking == 4) imageBounded(images["Walking"], 550, 350, 100, 100, PI / 2);
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

    rectangle(x, y, w, h) {
        let originX = x - 600 - this.playerX;
        let originY = y - 400 - this.playerY;
        let numTile = w / 40;

        this.mapBg.beginShape();
        this.mapBg.vertex(originX, originY, 0, 0, 0);
        this.mapBg.vertex(originX + w, originY, 0, numTile, 0);
        this.mapBg.vertex(originX + w, originY + h, 0, numTile, numTile);
        this.mapBg.vertex(originX, originY + h, 0, 0, numTile);
        this.mapBg.endShape(CLOSE);
    }

    render() {
        this.mapBg.background(base_0);        

        this.mapBg.noStroke();
        this.mapBg.textureMode(NORMAL);
        this.mapBg.textureWrap(REPEAT);
        this.mapBg.texture(textures[2]);
        this.rectangle(0, 0, 1200, 800, );
        
        image(this.mapBg, 0, 0);

        for (let i = 0; i < characters.length; i++) {
            characters[i].render(this.playerX, this.playerY);
        }
    }
}