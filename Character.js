class Character {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }

    render(mapX, mapY) {
        imageBounded(this.img, this.x - mapX, this.y - mapY, this.w, this.h);
    }
}