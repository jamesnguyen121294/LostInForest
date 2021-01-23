var distance = function(x1, y1, x2, y2){
    let x = x2 - x1
    let y = y2 - y1

    let powX = Math.pow(x, 2)
    let powY = Math.pow(y, 2)

    return Math.sqrt(powX + powY)
}

var covertTimeString = function(time){
    let div = Math.floor(time / 60)
    let per = time % 60;

    let minus = div < 10? '0' + div : '' + div
    let second = per < 10? '0' + per : '' + per

    return '' + minus + ':' + second
}

var currentLevel = 1

var helper = {
    distance,
    currentLevel,
    covertTimeString
}

module.exports = helper