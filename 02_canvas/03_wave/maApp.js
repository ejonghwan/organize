
// app
class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.body = document.body.appendChild(this.canvas)

        
        this.WaveGrouup = new WaveGrouup()
        this.resize();
        

        window.addEventListener('resize', this.resize.bind(this))
        window.requestAnimationFrame(this.animate.bind(this))
        
    }

    resize() {
        this.stageWidth = this.body.clientWidth;
        this.stageHeight = this.body.clientHeight;
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2)

        // console.log(this.wave)
        this.WaveGrouup.resize(this.stageWidth * 2, this.stageHeight * 2)

    }   

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
        
        this.WaveGrouup.draw(this.ctx)

        window.requestAnimationFrame(this.animate.bind(this))
    }
    
}




// ######################################################### point
 class Point {
    constructor(index, x, y, mouseMax) {
        this.x = x;
        this.y = y
        this.fixedY = y
        this.max = Math.random() * mouseMax || Math.random() * 50  ;
        this.cur = index
        this.speed = 0.07;
        this.mouseMax = mouseMax
        

    }
    
    update() {

        // console.log(this.mouseMax)
        this.cur -= this.speed
        this.y = this.fixedY + (Math.sin(this.cur) * this.max)
        
    }

}




// ######################################################### wave
 class Wave {
    constructor(totalPoint, index, color) {
        this.totalPoint = totalPoint
        // this.index = index
        this.wid = window.innerWidth;
        this.hei = window.innerHeight;
        this.color = color;

        // console.log(this.color)
        this.ismove = false;
        this.max = 0
        window.addEventListener('mousedown', this.mousedown.bind(this))
        window.addEventListener('mousemove', this.move.bind(this))
        window.addEventListener('mouseup', this.mouseup.bind(this))
       
    }


    init(x, y) {
        this.points = [];
        this.gap = x / (this.totalPoint-1)
       
        for(let i = 0; i < this.totalPoint; i++) {
            const point = new Point(
                i, 
                this.gap * i, 
                y,
                this.max,
            )
            this.points[i] = point;
        }

        // console.log(this.points)
    }

    resize(stageWidth, stageHeight) {
        this.middleW = stageWidth / 2
        this.middleH = stageHeight / 2
        this.init(this.middleW, this.middleH / 1.5)
        
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        let prevX = this.points[0].x;
        let prevY = this.points[0].y; 

        ctx.moveTo(this.points[0].x, this.points[0].y)


        for(let i = 1; i < this.totalPoint; i++) {
           if(i < this.totalPoint - 1) {
                this.points[i].update(ctx) //포인트 찍고
           }
           
            const cx = (prevX + this.points[i].x) / 2 //0번째 포인트는 시작점과 제어점이 같음
            const cy = (prevY + this.points[i].y) / 2

            // ctx.lineTo(cx, cy);
            ctx.quadraticCurveTo(prevX, prevY, cx, cy)
            // ctx.arc(cx, cy, 10, 0, Math.PI * 2)

            prevX = this.points[i].x
            prevY = this.points[i].y
        }
        // 반복문 다 끝나면 끝포인트 - 1 에 라인이 가있음.

        
        
        ctx.lineTo(prevX, prevY) //마지막포인트 연결
        ctx.lineTo(this.wid, this.hei)
        ctx.lineTo(0, this.hei)
        ctx.closePath()
        // ctx.stroke()
        ctx.fill()



        // ctx.arc(this.points[i].x, this.points[i].y, 10, 0, 2 * Math.PI)
        // ctx.moveTo(this.points[0].x, this.points[0].y)
        // ctx.lineTo(this.points[i].x, this.points[i].y)
        // ctx.lineTo(this.points[this.totalPoint-1].x, this.points[this.totalPoint-1].y)
        // ctx.lineTo(this.wid, this.hei)
        // ctx.lineTo(0, this.hei)
        // ctx.lineTo(this.points[0].x, this.points[0].y)
        // ctx.closePath()
        // prevX = this.points[i-1].x
        // prevY = this.points[i-1].y
        // cpx = this.points[i].x / prevX 
        // cpy = this.points[i].y / prevY
        
        // console.log(this.points[i].x)
        // ctx.quadraticCurveTo(0, 0, this.points[i].x, this.points[i].y)
       
    }

    mousedown(e) {
        this.ismove = true;
        this.start = e.pageY
        // console.log(this.cy)
    }

    move(e) {
        if(this.ismove) {
            this.max = (Math.abs(e.pageY - this.start)) 
            // this.start = e.pageY

            // this.max += (Math.abs(e.pageY - this.start) / 2) 
            // this.start = e.pageY
        }
    }

    mouseup(e) {
        this.ismove = false;
        this.init(this.middleW, this.middleH / 1.5)
        // console.log('끝', e.pageY)
    }

}


// ######################################################### WaveGrouup

class WaveGrouup {
    constructor() {
        this.totalPoint = 6;
        this.totalWave = 3;
        this.waves = []
        this.color = ['rgba(50, 161, 255, 0.3)', 'rgba(8, 198, 253, 0.3)', 'rgba(22, 99, 255, 0.3)']
        // this.color = ['rgba(22, 99, 255, 0.7)', 'rgba(222, 919, 25, 0.2)', 'rgba(11, 22, 25, 0.7)']

        for(let i = 0; i < this.totalWave; i++) {
            const waves = new Wave(this.totalPoint, i, this.color[i])
            this.waves[i] = waves;
        }
    }


    resize(stageWidth, stageHeight) {
        for(let i = 0; i < this.totalWave; i++) {
            const wave = this.waves[i]
            wave.resize(stageWidth, stageHeight)
        }
        // console.log(this.waves)
    }


    draw(ctx) {
        for(let i = 0; i < this.totalWave; i++) {
            const wave = this.waves[i];
            wave.draw(ctx)
        }
    }
}




window.onload = new App();    
