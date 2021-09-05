import { BLOCKS } from './Blocks.js'

//dom
const ground = document.querySelector('.ground > ul')
const gameover = document.querySelector('.gameover')
const reStart = document.querySelector('button')
const scoreEle = document.querySelector('.score')

reStart.addEventListener('click', function() {
    ground.innerHTML = '';
    gameover.style.display = 'none'
    score = 0;
    init();
})

// setting
const GAME_ROWS = 20;
const GAME_COLS = 10;


//variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;



const movingItem = {
    type: "tree",
    direction: 0,
    top: 0,
    left: 3,

};



//functions
init();


function init() {
    tempMovingItem = {...movingItem};

    for(let i = 0; i < GAME_ROWS; i++) {
        prependNewLine()
    }
    // renderBlocks()
    blockGenerater()

 
}



function prependNewLine() {
        const li = document.createElement('li');
        const ul = document.createElement('ul');
        ground.prepend(li)
        li.prepend(ul);

        for(let j = 0; j < GAME_COLS; j++) {
            const matrix = document.createElement('li');
            ul.prepend(matrix);
        }
}


function renderBlocks(moveType = '') {
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll('.moving')

    movingBlocks.forEach( moving => {
        moving.classList.remove(type, "moving")
    })

    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = ground.childNodes[y] ? ground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target)

        if(isAvailable) {
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = {...movingItem} //원상복귀
            if(moveType === 'retry') {
                clearInterval(downInterval)
                showGameover()
            }
            setTimeout(() => { //모든 스택이 비웠을 때
                renderBlocks('retry')
                if(moveType === 'top') {
                    seizeBlock();
                }
            }, 0)
            return true; //forEach 대신 some return true를 쓴 이유는 ? else에 걸렸을 때 한개의 블럭만 걸리게. 기본적으로 반복은 블록의 개수만큼 돌리기 때문
        }

        // console.log(target)
    })

    movingItem.left = left
    movingItem.top = top;
    movingItem.direction = direction
}

function showGameover() {
    gameover.style.display = 'flex'
}

function seizeBlock() {
    console.log('seize block')
    const movingBlocks = document.querySelectorAll('.moving')

    movingBlocks.forEach( moving => {
        // console.log(moving)
        moving.classList.remove("moving")
        moving.classList.add("seized")
    })

    // blockGenerater()
    checkMatch();
}

function checkMatch() {
    const childNodes = ground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li => {

            if(!li.classList.contains('seized')) {
                matched = false;
            }
        })
        if(matched) {
            child.remove();
            prependNewLine()
            score += 1
            scoreEle.innerHTML = score
            
        }
       
    })

    blockGenerater()
}


function blockGenerater() {

    clearInterval(downInterval)
    downInterval = setInterval(() => {
        moveBlock('top', 1)
    }, duration)

    const obj = Object.entries(BLOCKS)
    const randomIndex = Math.floor(Math.random() * obj.length)
    

    movingItem.type = obj[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem}
    renderBlocks();

}

function checkEmpty(target) {
    if(!target || target.classList.contains('seized')) {
        return false
    };

    return true;
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
}

function changeDirction() {

    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1
    renderBlocks()
}

function dropBlock() {
    clearInterval(downInterval)
    downInterval = setInterval(() => {
        moveBlock('top', 1)
    }, 10)
}

window.addEventListener('keydown', e => {
    switch(e.keyCode) {
        case 39: {
            return moveBlock('left', 1)
            break
        }

        case 37: {
            return moveBlock('left', -1)
            break
        }

        case 40: {
            return moveBlock('top', 1)
            break
        }

        case 38: {
            return changeDirction()
            break
        }

        case 32: {
            return dropBlock()
            break
        }



        default: {
            break
        }
    }
})