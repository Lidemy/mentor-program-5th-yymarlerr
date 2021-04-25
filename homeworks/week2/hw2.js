function capitalize(str) {
    var first = str.charCodeAt(0)
    if(first>=97 & first <= 122){
        var num = str.charCodeAt(0) 
        var small = String.fromCharCode(num)
        var cap = String.fromCharCode(num - 32)
        str = str.replace(small,cap) 
        return str
    } else {return str}
}

console.log(capitalize('hello'));
