this.blocks = [];

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
    constructor(mapBg, x, y, w, h, type, ghostThrough = false, opacity = 1) {
        this.mapBg = mapBg;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.topLeftX = x;
        this.topLeftY = y;
        this.topRightX = x + w;
        this.topRightY = y;
        this.bottomRightX = x + w;
        this.bottomRightY = y + h;
        this.bottomLeftX = x;
        this.bottomLeftY = y + h;
    }
}

class GameMap {
    constructor() {
        this.playerX = 0;
        this.playerY = 0;
        this.mapWidth = 1200;
        this.mapHeight = 800;
        this.mapBg = createGraphics(this.mapWidth, this.mapHeight, WEBGL);
        this.characters = [];
        this.blocks = [];
        this.blocks.push(new Block(this.mapBg, 0, 0, 1200, 800, 2, true, 0.8)); // Background block
    }

    /** 
        * @description Check if the player overlaps with an object
        * @param obj Object to check overlap with
        * @returns {boolean} True if overlaps, false otherwise
        * @example
        * let obj = {x: 100, y: 100, w: 50, h: 50};
        * let isOverlapping = gameMap.overlaps(obj);
        * if (isOverlapping) {
        *   console.log("Player overlaps with the object");
        * } else {
        *  console.log("Player does not overlap with the object");
        * }
    */
    overlaps(obj) {
        if (obj);

        let { playerX, playerY, playerW, playerH } = this;
        playerX -= 20; // Offset for player size
        playerW = 60;
        playerH = 100;

        return (playerX + playerW > obj.x && playerX < obj.x + obj.w && playerY + playerH > obj.y && playerY < obj.y + obj.h);
    }

    // mapSetup() {
    //     this.blocks.push(this.block(0, 0, 1200, 800, 2, true, 0.8));
    //     this.blocks.push(this.block(100, 100, 200, 200, 1, false, 1));
    // }

    listenMove() {
        let speed = 3;
        let walking = 0;
        // console.log(this.playerX, this.playerY);

        if (keyIsDown(68) || keyIsDown(39)) {
            if (playerInBoundary(this, speed, 0)) {
                this.playerX += speed;
            }
            walking = 1;
        }
        if (keyIsDown(65) || keyIsDown(37)) {
            if (playerInBoundary(this, -speed, 0)) {
                this.playerX -= speed;
            }
            walking = 2;
        }
        if (keyIsDown(87) || keyIsDown(38)) {
            if (playerInBoundary(this, 0, -speed)) {
                this.playerY -= speed;
            }
            walking = 3;
        }
        if (keyIsDown(83) || keyIsDown(40)) {
            if (playerInBoundary(this, 0, speed)) {
                this.playerY += speed;
            }
            walking = 4;
        }

        fill(255)
        rect(570, 350, 60, 100);
        if (!walking) imageBounded(images["Standing"], 550, 350, 100, 100);
        else if (walking == 1) imageBounded(images["RightWalking"], 550, 350, 100, 100);
        else if (walking == 2) imageBounded(images["LeftWalking"], 550, 350, 100, 100);
        else if (walking == 3) imageBounded(images["Walking"], 550, 350, 100, 100, -PI / 2);
        else if (walking == 4) imageBounded(images["Walking"], 550, 350, 100, 100, PI / 2);
    }
    
    renderBlock(block) {
        let {x, y, w, h, type, ghostThrough, opacity} = block;
        let originX = x - this.playerX;
        let originY = y - this.playerY;
        let numTile = w / 40;

        this.mapBg.noStroke();
        this.mapBg.textureMode(NORMAL);
        this.mapBg.textureWrap(REPEAT);
        this.mapBg.tint(255, opacity * 255);
        this.mapBg.texture(textures[type]);

        this.mapBg.beginShape();
        this.mapBg.vertex(originX, originY, 0, 0, 0); // top left
        this.mapBg.vertex(originX + w, originY, 0, numTile, 0); // top right
        this.mapBg.vertex(originX + w, originY + h, 0, numTile, numTile); // bottom right
        this.mapBg.vertex(originX, originY + h, 0, 0, numTile); // bottom left
        this.mapBg.endShape(CLOSE);
    }
    
    render() {
        this.mapBg.background(base_0);

        // render blocks
        for (block in this.blocks) {
            this.renderBlock(block);
        }
        image(this.mapBg, 0, 0);


        for (let i = 0; i < this.characters.length; i++) {
            this.characters[i].render(this.playerX, this.playerY);
        }
    }
}