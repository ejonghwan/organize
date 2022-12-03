
/*
    함수형 프로그래밍
    1. 순수 함수들의 평가시점들을 다루거나 
    2. 함수가 함수를 리턴하거나 
    3. 함수가 함수를 실행하거나 
    4. 함수를 값으로 사용하거나 
    5. 인자로 받은 함수의 값을 반전시키거나 
    6. 인자로 받은 함수의 값을 사용해서 또 다른 함수의 값을 내보내거나

    이런식으로 함수의 조합과 응용을 강조하는게 함수형 프로그래밍

    *외부에 영향을 주지도 받지도 않는 한가지 기능을 하는 간결한 함수들을 서로 조합하는게 중요.
    *10개의 복잡하고 긴 함수를 만드는 것보다 100개의 다양한 함수를 만드는게 프로그래밍에서는 유리함


    고차함수 모두 같냐(_every) 한개만 같냐(_some)을 선택하고 보조함수로 
    상세 조건을 선택하게 하여 조립하는? 조합하는 프로그래밍

*/



var users = [
    { id:1, name: "ID", age: 36 },
    { id:2, name: "BJ", age: 12 },
    { id:3, name: "JB", age: 43 },
    { id:4, name: "AS", age: 23 },
    { id:5, name: "EW", age: 34 },
    { id:6, name: "TR", age: 65 },
    { id:7, name: "GF", age: 23 },
    { id:8, name: "TR", age: 11 },
]



let c_map = _curryr(_map)
let c_filter = _curryr(_filter)




function add(a, b) {
    return a + b;
}


function _each(list, iter) {
    let keys = _keys(list);
    // console.log('???', keys) //['13', '18', '29']
    for(let i = 0; i < keys.length; i++) {
        iter(list[keys[i]]) //list[13] list[18] list[29]
    }
}


function _filter(iter, fn) {
    var new_list = []
    _each(iter, function(val) {
        if(fn(val)) { //배열을 그대로 함수 인자로 넘겨줌 
            new_list.push(val)
        }
    })
    return new_list
}


function _map(iter, fn) {
    var new_list = [];
    _each(iter, function(val) {
        new_list.push(fn(val))
    })
    return new_list;
}

// key를 입력하면 return value 
function _get(obj, key) {
    return obj == null ? undefined : obj[key]
};

// key를 입력하면 return value. 커링으로도 가능
let _get2 = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key]
});

function _curry(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(a, b) }    
    }
}

function _curryr(fn) { 
    return function(a, b){
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a) }  
    }
}



function _reduce2(list, iter, memo) {
    // 3번째 인자가 없을 때 첫번째 값으로 시작하며 리스트가 3개일떄 2번만 돌게끔 해야함
    if(arguments.length == 2) {
        memo = list[0]
        list = _rest(list)
    }
    _each(list, function(val) {
        memo = iter(memo, val)
    });
    return memo;
}

let slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1)
}



function _pipe() {
    let fns = arguments;
    return function(arg) {
        return _reduce2(fns, function(arg, fn) {
            return fn(arg)
        }, arg)
    }
}


function _go(arg) {
    let fns = _rest(arguments); //앞에 1개를 제외한 나머지
    _pipe.apply(null, fns)(arg)
}


function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : []
}


function _values(data) {
    return curryr_map(data, function(val) { return val })
}

function _identity(val) {
    return val;
}


function _pluck(data, key) {
    return curryr_map(data, _get2(key))
}

// 함수를 받아 반대만 리턴하는 함수 
function _negate(func) {
    return function(val) {
        return !func(val)
    }
}

// 조건의 반대를 찾음
function _reject(data, fn) {
    return _filter(data, _negate(fn))
}

// 필터함수의 null false 0 등을 제외한 값만 가져옴
let compact = c_filter(_identity)


// 조건에 맞는 한개만 찾음 
function _find(list, fn) {
    let keys = _keys(list);
    for(let i = 0; i < keys.length; i++) {
        let val = list[keys[i]];
        if(fn(val)) return val
    }
}

// 조건에 맞는 한개의 인덱스만 찾음
function _find_index(list, fn) {
    let keys = _keys(list);
    for(let i = 0; i < keys.length; i++) {
        let val = list[keys[i]];
        if(fn(val)) return i
    }
}

let c_find = _curryr(function(list, fn) {
    let keys = _keys(list);
    for(let i = 0; i < keys.length; i++) {
        let val = list[keys[i]];
        if(fn(val)) return val
    }
})


let c_find_index = _curryr(function(list, fn) {
    let keys = _keys(list);
    for(let i = 0; i < keys.length; i++) {
        let val = list[keys[i]];
        if(fn(val)) return i
    }
    return -1;
})

function _some(data, fn) {
    // fn이 만족하는인덱스를 찾아보고 찾아지느게 있으면 트루
    return c_find_index(data, fn || _identity) != -1;
}

function _every(data, fn) {
    return c_find_index(data, _negate(fn || _identity)) == -1;
}