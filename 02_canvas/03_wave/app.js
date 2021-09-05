import { WaveGroup } from "./waveGroup.js";

console.log(11)


class App {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d');
        this.body = document.querySelector('body')
        this.body.appendChild(this.canvas)

        this.waveGroup = new WaveGroup();

        this.resize();

        window.requestAnimationFrame(this.animate.bind(this))
        window.addEventListener('resize', this.resize.bind(this))
    }

    resize() {
        this.stageWidth = this.body.clientWidth
        this.stageHeight = this.body.clientHeight
        this.canvas.width = this.stageWidth * 2
        this.canvas.height = this.stageHeight * 2
        this.ctx.scale(2, 2)

        this.waveGroup.resize(this.stageWidth, this.stageHeight)

    }

    animate() {
        // console.log(11)
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
        this.waveGroup.draw(this.ctx)
        window.requestAnimationFrame(this.animate.bind(this))
    }
}

window.onload = new App();