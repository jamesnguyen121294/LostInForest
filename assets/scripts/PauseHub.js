// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {TweenMax} from './TweenMax'

var PauseHub = cc.Class({
    extends: cc.Component,

    ctor(){
        this.callback = null
    },

    properties: {
        main: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},

    open(callback){
        var self = this

        self.callback = callback

        self.node.active = true
        TweenMax.to(self.main, 0.3, {scale: 1, ease: Back.easeOut})
    },

    close(){
        var self = this

        TweenMax.to(self.main, 0.3, {scale: 0, ease: Back.easeIn, onComplete: ()=> {

            if(self.callback != null){
                self.callback()
            }

            self.node.active = false
        }})
    },

    onClickResume(){
        var self = this
        self.close()
    }
});

module.exports = PauseHub
