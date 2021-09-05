export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y
        this.speed = 0.07;
        this.cur = index;
        this.max = Math.random() * 100 + 150; // 150 ~ 250
    }

    update() {
        // console.log(this.cur)
        this.cur += this.speed;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max)
        
    }

    test() {
        console.log('test inner')
    }

}