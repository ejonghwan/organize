import { Hill } from './hills.js'
import { SheepCon } from './SheepCon.js'
import { Sun } from './Sun.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.div = document.createElement('div');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        document.body.appendChild(this.div);

        this.hills = [
            new Hill('#fd6bea', 0.2, 30),
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 0.8, 10),
        ]
        // console.log(this.hills[0])

        this.sheepCon = new SheepCon()
        this.sun = new Sun();

        window.addEventListener('resize', this.resize.bind(this), false)
        this.resize()
        requestAnimationFrame(this.animate.bind(this))
        
    }


    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2)

        this.sun.resize(this.stageWidth, this.stageHeight)

        for(let i = 0; i < this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight)
            // console.log(this.hills[i])
        }

       
        this.sheepCon.resize(this.stageWidth, this.stageHeight)

    }
 
    animate(t) {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageWidth)

        this.sun.draw(this.ctx, t)

        let dots;
        for(let i = 0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx)
        }


        this.sheepCon.draw(this.ctx, t, dots)
    }

}

window.onload = () => {
    new App();
}