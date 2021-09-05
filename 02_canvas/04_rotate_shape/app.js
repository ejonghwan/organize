
import { Polygon } from './polygon.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        /*
        이렇게 가상 디스플레이에서 실제 사용자의 디스플레이로 어떻게 이동하는 것일까? devicePixelRatio를 입력해보자. devicePixelRatio는 전역 변수이며, 이 값은 CSS 픽셀을 구성하는데 필요한 물리적 픽셀 수를 나타낸다. 만약 devicePixelRatio(dPR)이 1이면, 약 96DPI 모니터로 작업 중인 게 된다. 만약 레티나 화면일 경우, dPR은 2일 것이다. 모바일에서는 2, 3 또는 2.65와 같이 더 높은 dPR 값이 나타날 수 도 있다. 이 값은 정밀한 값이긴 하지만, 모니터의 실제 DPI 값을 가져오지 못하도록 하는 것이 핵심이다. 2 dPR은 1CSS 픽셀이 실제로 물리적 픽셀 2개와 대응됨(mapping)을 의미한다.
        */


        window.addEventListener('resize', this.resize.bind(this))
        this.resize();

        this.isDown = false;
        this.moveX = 0
        this.offsetX = 0
        document.addEventListener('pointerdown', this.onDown.bind(this))
        document.addEventListener('pointermove', this.onMove.bind(this))
        document.addEventListener('pointerup', this.onUp.bind(this))

        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio
        this.ctx.scale(this.pixelRatio, this.pixelRatio)


        this.polygon = new Polygon(
            this.stageWidth / 2,
            // this.stageHeight + (this.stageHeight / 4),
            this.stageHeight / 2 ,
            this.stageHeight / 4,
            3
        )

    }

    animate() {
        // window.requestAnimationFrame(this.animate.bind(this))

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight )
        this.moveX *= 0.92
        this.polygon.animate(this.ctx, this.moveX)
        
    }

    onDown(e) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;
        // console.log('down')
        
    }

    onMove(e) {
        if(this.isDown) {
            this.moveX = e.clientX - this.offsetX; //무브한값에서 처음값 뺴기
            this.offsetX = e.clientX; //
            // console.log('mvoe')
        }
    }

    onUp(e) {
        this.isDown = false;
        // console.log('up')
    }


}


window.onload = new App();