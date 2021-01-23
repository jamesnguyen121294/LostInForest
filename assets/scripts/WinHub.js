// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {TweenMax} from './TweenMax'
import Helper from './Helper'

var gameController = require('GameplayController')

var WinHub = cc.Class({
    extends: cc.Component,

    properties: {
        main: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    //     var self = this
    // },

    start () {

    },

    // update (dt) {},

    open(){
        var self = this
        self.node.active = true
        TweenMax.to(self.main, 0.3, {scale: 1, ease: Back.easeOut})
    },

    close(){
        var self = this

        TweenMax.to(self.main, 0.3, {scale: 0, ease: Back.easeIn, onComplete: ()=>{
            Helper.currentLevel++
            cc.director.loadScene('gameplay')
        }})

    },

    nextLevel(){
        var self = this
        self.close()
    }
});

module.exports = WinHub


