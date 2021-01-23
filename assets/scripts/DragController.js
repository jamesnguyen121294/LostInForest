// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const existingModule = require("./TweenMax");

var dragController = cc.Class({
    extends: cc.Component,

    statics: {
        instance: null
    },

    ctor(){
        this.dragNode = null
    },

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this
        dragController.instance = self
        
        self.registerMouseEvent()
    },

    start () {
        
    },

    // update (dt) {},

    registerMouseEvent(){
        var self = this

        self.node.on(cc.Node.EventType.MOUSE_LEAVE, (evt) =>{
            if(self.dragNode == null) return

            var comp = self.dragNode.getComponent('DragIcon')

            if(comp != null){
                comp.backToFirstPos()
            }

            self.setDragNode(null)
        })

        self.node.on(cc.Node.EventType.MOUSE_MOVE, (evt) => {
            if(self.dragNode == null) return

            let pos = evt.getDelta()

            let minX = -self.node.width / 2 + self.dragNode.width / 2;
            let maxX = self.node.width / 2 - self.dragNode.width / 2;
            let minY = -self.node.height / 2 + self.dragNode.height / 2;
            let maxY = self.node.height / 2 - self.dragNode.height / 2;

            let x = pos.x + self.dragNode.x
            let y = pos.y + self.dragNode.y

            if(x < minX){
                moveX = minX;
            }else if(x > maxX){
                x = maxX;
            }
            if(y < minY){
                y = minY;
            }else if(y > maxY){
                y = maxY;
            }

            self.dragNode.x = x
            self.dragNode.y = y
        })

        self.node.on(cc.Node.EventType.MOUSE_UP, (evt) => {
            if(self.dragNode == null) return

            var comp = self.dragNode.getComponent('DragIcon')

            if(comp != null){
                // cc.log('có vào check match')
                comp.doCheckMatch()
            }

            self.setDragNode(null)
        })
        
    },

    setDragNode(dragNode){
        var self = this

        self.dragNode = dragNode
    }
});

module.exports = dragController
