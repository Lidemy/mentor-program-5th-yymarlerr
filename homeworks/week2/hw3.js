function reverse(str) {
    var result = ''
    for(i = 1; i<=str.length; i++){
    var num = str.charCodeAt(str.length - i)
    var alp = String.fromCharCode(num)
    result = result + alp
    }
    console.log(result)
}

reverse('hello');
