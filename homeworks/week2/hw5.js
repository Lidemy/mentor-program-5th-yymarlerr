function join(arr, concatStr) {
    if (arr.length > 1){
        var combine = ''
        for (i = 0; i<arr.length - 1; i++){
        var combine = combine + arr[i] + concatStr
        var result = combine + arr[arr.length - 1]
    }
    return result
    } 
    return arr[0]
}

function repeat(str, times) {
    var array = []
    for(i = 0; i<times; i++){
    array.push(str)
    }
    return array.join('')
}
   

console.log(join(['a'], '!'));
console.log(repeat('a', 5));