class Character {
    constructor(x, y, img, trainer) {
        this.x = x;
        this.y = y;
        this.w = 60;
        this.h = 100;
        this.img = img;
        this.trainer = trainer;
        this.canBattle = true;
    }

    
    render(mapX, mapY) {
        fill(255)
        rect(this.x + 600 - mapX, this.y + 400 - mapY, this.w, this.h);
        imageBounded(this.img, this.x + 600 - mapX - 20, this.y + 400 - mapY, this.w + 40, this.h);
    }
}