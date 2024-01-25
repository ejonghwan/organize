import Request from "./request.js";
import Loading from './loading.js';

class App {
    constructor() {
        this.el = document.querySelector('.el')
        this.el2 = document.querySelector('.el2')
        this.obSwitch = true;
        this.start = 0;
        this.end = 10;
        this.viewLen = 10;
        this.loadingBar = new Loading();
        // window.addEventListener('scroll', this.ob.bind(this))
    }
    

    init() {
        console.log('app init')
        this.request(0, 10);
        this.ob()
    }


    request(start, end) {
        try {
            const request = new Request()
            const posts = request.init('get', `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${end}`)

            
            // posts.then(data => this.render(this.el, data)).then(() => this.ob())
            posts.then(res => {
                if(!res.length) throw new Error('no data');
                res.forEach(data => this.DOMAdd(this.el, 'beforeend',  
                    `<div class="conts_wrap">
                        <span>${data.id}</span>
                        <strong>${data.title}</strong>
                        <p>${data.body}</p>
                    </div>`
                ))
            }
            ).then(() => {
                this.el.querySelectorAll('.conts_wrap').forEach(el => el.classList.remove('target'))
                this.el.lastChild.classList.add('target')
                this.ob();
            })

            
            // const images = request.init('get', `https://jsonplaceholder.typicode.com/photos?_start=${0}&_limit=${10}`)
            // images.then(data => this.imageRender(this.el2, data))
        } catch(e) {
            console.error(e)
        }
    }


    render(el, data) {
        let str = '';
        // console.log(data)
        for(let i = 0; i < data.length; i++) {
            str += `
                <div class="conts_wrap ${data.length - 1 === i ? 'target': ''}">
                    <span>${data[i].id}</span>
                    <strong>${data[i].title}</strong>
                    <p>${data[i].body}</p>
                </div>
            `
        }
        el.innerHTML = str;
    }

    DOMAdd(el, pos, str) {
        el.insertAdjacentHTML(pos, str)
    }

    imageRender(el, data) {
        let str = '';
        console.log(data)
        for(let i = 0; i < data.length; i++) {
            str += `
                <div class="img_wrap">
                    <img src=${data[i].thumbnailUrl} class="img" />
                </div>
                <span class="img_cap">${data[i].title}</span>
            `
        }
        el.innerHTML = str;
    }

    ob() {
        const list = document.querySelectorAll('.conts_wrap');
        const target = document.querySelector('.target');
        const inter = new IntersectionObserver((ents, ob) => {
            ents.forEach( ent => {
                if(ent.isIntersecting && this.obSwitch) {
                    this.obSwitch = false;

                    this.start += this.viewLen;
                    this.loadingBar.render('로딩중!!')
                    setTimeout(() => {
                        this.request(this.start, this.viewLen)
                        this.loadingBar.close()
                    }, 1000)

                    ob.unobserve(ent.target);
                    this.obSwitch = true;
                }
            })
        });

        // list.forEach( el => inter.observe(el) );
        
        // 처음 실행될 때 inter.observe(target)가 더 늦게 실행됨. or 두번실행됨
        // console.log('ta?', target instanceof Element )
        
        if(target instanceof Element) inter.observe(target);
    }

    lastCallDebounce(cb, delay) {
        let timeout;
        return args => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            cb(args);
          }, delay);
        };
    };
}


export default App;