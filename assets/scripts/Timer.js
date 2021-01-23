// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var Timer = cc.Class({
    extends: cc.Component,

    ctor(){
        this.isPlaying = false
        this.time = 0
        this.callback = null
        this.onEnd = null
        this.isEnding = false
    },

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},

    startCountDown(time, callback, onEnd){
        var self = this

        self.time = time
        self.callback = callback
        self.onEnd = onEnd
        self.isEnding = false
        self.isPlaying = true

        self.resume()
        
    },

    doCountDown(){

        var self = this

        if(!self.isPlaying) return

        self.time--
        if(self.callback != null){
            self.callback(self.time)
        }

        if(self.time <= 0){
            self.isEnding = true
            if(self.onEnd != null){
                self.onEnd()
            }
            self.pause()
            // self.unschedule(self.doCountDown)
        }
    },

    pause(){
        var self = this
        self.unschedule(self.doCountDown)
        self.isPlaying = false
    },

    resume(){
        var self = this
        if(self.isEnding || self.time <= 0) return

        self.isPlaying = true
        self.schedule(self.doCountDown, 1)
    }

});

module.exports = Timer
