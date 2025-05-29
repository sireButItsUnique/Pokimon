class Gui {
    constructor(player) {
        this.width = 1200;
        this.height = 800;
        this.player = player;
    }

    render() {
        fill(tone_1)
        rect(0, 100, 100, 600, 0, 10, 10, 0);
        
        let labels = ["Team", "Bag", "Save"];
        for (let i = 0; i < labels.length; i++) {
            fill(tone_2);
            stroke(highlight_2)
            strokeWeight(1);
            rect(10, 110 + i * 50, 80, 40, 5);
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(16);
            strokeWeight(0)
            text(labels[i], 50, 130 + i * 50);
        }
    }
}