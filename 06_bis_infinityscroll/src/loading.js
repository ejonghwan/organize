class Loading {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('loading')
        document.body.appendChild(this.element);
    }

    render(txt) {
        this.element.style.display = 'flex'
        this.element.textContent = txt;
    };

    close() {
        this.element.style.display = 'none'
    }
}

export default Loading;