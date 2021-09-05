import { Ball } from './ball.js'
import { Block } from './block.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')

        document.body.appendChild(this.canvas);
        this.resize();
        
        window.addEventListener('resize', this.resize.bind(this))
        


        this.ball = new Ball(this.stageWidth, this.stageHeight, 20, 10)
        this.ball2 = new Ball(this.stageWidth, this.stageHeight, 10, 7)
        this.ball3 = new Ball(this.stageWidth, this.stageHeight, 30, 5)
        // console.log(this.ball)

        this.block = new Block(300, 30, 150, 300);


        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2
        this.canvas.height = this.stageHeight * 2
        this.ctx.scale(2, 2)

        this.ball = new Ball(this.stageWidth, this.stageHeight, 20, 10)
        this.ball2 = new Ball(this.stageWidth, this.stageHeight, 10, 7)
        this.ball3 = new Ball(this.stageWidth, this.stageHeight, 30, 5)
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

        // ball
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block)
        this.ball2.draw(this.ctx, this.stageWidth, this.stageHeight, this.block)
        this.ball3.draw(this.ctx, this.stageWidth, this.stageHeight, this.block)
        // console.log(1)
        
        // block
        this.block.draw(this.ctx)
    }

}

window.onload = () => {
    new App();
}