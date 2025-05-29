class Block {
    /**
    * @description Create a block in the game map
    * @param x X-position of top left of block 
    * @param y Y-position of top left of block
    * @param w Width of block (multiple of 10)
    * @param h Height of block (multiple of 10)
    * @param type Material of block (0: rock, 1: wood, 2: grass) 
    * @param ghostThrough Ghost through block (boolean)
    * @param opacity Opacity (0 - 1)
    */
    constructor(x, y, w, h, type, ghostThrough = false, opacity = 1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type; // 0: rock, 1: wood, 2: grass
        this.ghostThrough = ghostThrough; // Can ghost through block
        this.opacity = opacity; // 0 - 1

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
        this.playerW = 60;
        this.playerH = 100;
        this.mapWidth = 1200;
        this.mapHeight = 800;
        this.mapBg = createGraphics(this.mapWidth, this.mapHeight, WEBGL);
        this.characters = [];
        this.blocks = [];
        this.blocks.push(new Block(0, 0, 1200, 800, 2, true, 0.8)); // Background block
        this.blocks.push(new Block(50, 50, 200, 200, 1));
    }

    // playerInBoundary(dX, dY) {
    //     for (let block of this.blocks) {
    //         if (block.ghostThrough) continue;

    //         console.log(block.topLeftX, block.topRightX, block.topLeftY, block.bottomLeftY);
    //         console.log(this.playerX - 20, this.playerY);

    //         if ((this.playerX - 20 + this.playerW + dX) > block.topLeftX && (this.playerX - 20 + dX) < block.topRightX && (this.playerY + dY) < block.bottomLeftY && (this.playerY + this.playerH + dY) > block.topLeftY) {
    //             return false;
    //         }
    //     }

    //     return true;
    // }

    playerInBoundary() {
        let inside = false;

        for (let block of this.blocks) {
            if (block.ghostThrough && this.overlaps(block)) {
                inside = true;
            } else if (!block.ghostThrough && this.overlaps(block)) {
                return false;
            }
        }

        console.log(`inside: ${inside}`)
        return inside;
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
        let { playerX, playerY, playerW, playerH } = this;
        playerX -= 20; // Offset for player size

        return (playerX + playerW > obj.x && playerX < obj.x + obj.w && playerY + playerH > obj.y && playerY < obj.y + obj.h);
    }

    listenMove() {
        let speed = 3;
        let walking = 0;

        if (keyIsDown(68) || keyIsDown(39)) {
            this.playerX += speed;
            if (!this.playerInBoundary()) this.playerX -= speed;
            // if (this.playerInBoundary(speed, 0)) {
                walking = 1;
            // }
        }
        if (keyIsDown(65) || keyIsDown(37)) {
            this.playerX -= speed;
            if (!this.playerInBoundary()) this.playerX += speed;

            // if (this.playerInBoundary(-speed, 0)) {
                walking = 2;
            // }
        }
        if (keyIsDown(87) || keyIsDown(38)) {
            this.playerY -= speed;
            if (!this.playerInBoundary()) this.playerY += speed;

            // if (this.playerInBoundary(0, -speed)) {
                walking = 3;
            // }
        }
        if (keyIsDown(83) || keyIsDown(40)) {
            this.playerY += speed
            if (!this.playerInBoundary()) this.playerY -= speed;

            // if (this.playerInBoundary(0, speed)) {
                walking = 4;
            // }
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
        let { x, y, w, h, type, ghostThrough, opacity } = block;
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
        for (let block of this.blocks) {
            this.renderBlock(block);
        }

        image(this.mapBg, 0, 0);

        // for (let block of this.blocks) {
        //     let { x, y, w, h, type, ghostThrough, opacity } = block;
        //     let originX = x - this.playerX;
        //     let originY = y - this.playerY;
        //     fill(255);
        //     rect(originX + 600, originY + 400, w, h);
        // }

        for (let i = 0; i < this.characters.length; i++) {
            this.characters[i].render(this.playerX, this.playerY);
        }
    }
}