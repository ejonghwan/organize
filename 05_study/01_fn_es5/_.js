
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


let _get2 = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key]
});

let curryr_map = _curryr(_map)
let curryr_filter = _curryr(_filter)




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


function _get(obj, key) {
    return obj == null ? undefined : obj[key]
};


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