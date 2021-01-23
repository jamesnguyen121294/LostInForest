// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {TweenMax} from './TweenMax'

cc.Class({
    extends: cc.Component,

    properties: {
        isMatched: {
            type: cc.Boolean,
            default: false,
            visible: false
        },

        sprite: {
            type: cc.Sprite,
            default: null,
            visible: false
        },

        id: {
            type: cc.Integer,
            default: 0,
            visible: false
        }


    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},

    init(spriteFrame, _id){
        var self = this

        self.sprite = self.node.getComponent(cc.Sprite)

        self.changeSprite(spriteFrame)
        self.autoSetSize()

        self.id = _id

    },

    changeSprite(spriteFrame){
        var self = this

        self.sprite.spriteFrame = spriteFrame
    },

    autoSetSize(){

        var self = this

        var size = self.sprite.spriteFrame.getTexture()

        self.node.width = size.width
        self.node.height = size.height
    },

    getId(){
        return this.id;
    }
});
