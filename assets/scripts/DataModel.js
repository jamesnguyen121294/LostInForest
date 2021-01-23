var imgId = cc.Enum({
    One: 1,
    Two: 2,
    Three: 3,
    Four: 4
})

var sprite = cc.Class({
    name: 'sprite',
    properties: {
        sprite: cc.SpriteFrame,
        id: {
            type: imgId,
            default: imgId.One
        },
        isDragObj: cc.Boolean
    }
})

var Data = cc.Class({
    name: "Data",
    properties: {
        data: {
            type: sprite,
            default: []
        },
        level: {
            default: 1
        }
    }
})

module.export = Data