// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {TweenMax} from './TweenMax'
var gameController = require('GameplayController')
var dragController = require('DragController')

cc.Class({
    extends: cc.Component,

    ctor(){
        // this.sprite = cc.Sprite
        // this.firstPos = cc.v2
        // this.id = cc.Integer
        this.isBack = false
        //this.spriteTick = cc.Sprite
        this.isFill = false
    },

    properties: {
        pos: cc.v2,
        sprite: cc.Sprite,
        id: cc.Integer,
        isRaycast: cc.Boolean
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this

        self.isBack = false

        self.mouseDown = false

        self.node.on(cc.Node.EventType.MOUSE_ENTER, function(evt){
            if(self.isFill) return
            TweenMax.to(self.node, 0.2, {scale: 1.2, ease: Back.easeOut.config(1.3)})
        })

        self.node.on(cc.Node.EventType.MOUSE_LEAVE, function(evt){
            if(self.isFill) return
            if(self.mouseDown) return
            
            TweenMax.to(self.node, 0.2, {scale: 1, ease: Back.easeIn.config(0.9)})
        })

        self.node.on(cc.Node.EventType.MOUSE_DOWN, function(evt){
            if(self.isFill) return
        
            dragController.instance.setDragNode(self.node)
            self.setBlockToNodeParent(true)
            self.mouseDown = true
        })

        // self.node.on(cc.Node.EventType.MOUSE_MOVE, (evt) =>{
        //     if(self.isFill) return

        //     if(!mouseDown) return

        //     let delta = evt.getDelta()

        //     let direct = cc.v2(self.node.x + delta.x, self.node.y + delta.y)

        //     self.node.x = direct.x
        //     self.node.y = direct.y
        // })

        // self.node.on(cc.Node.EventType.MOUSE_UP, (evt) => {
        //     if(self.isFill) return
        //     mouseDown = false

        //     // let camera = cc.Camera.findCamera(self.node)
        //     // let ray = camera.getRay(cc.v2(self.node.x, self.node.y))

        //     // var result = cc.geomUtils.intersect.raycast(null, ray)

        //     // let hasMatchIcon = false
        //     // cc.log(result.length)
        //     // result.forEach(element => {
                
        //     //     let matchIcon = element.node.getComponent('MatchIcon')
        //     //     if(matchIcon != null){
        //     //         hasMatchIcon = true;
        //     //         cc.log('ok baby')
        //     //     }else{
        //     //         cc.log('null nè ' + element.node.name)
        //     //     }
        //     // });

        //     let matchNode = gameController.instance.getMatchIcon(200.0, cc.v2(self.node.x, self.node.y))

        //     if(matchNode == null){
        //         if(!self.isBack){
        //             self.isBack = true
        //             self.backToFirstPos()
        //         }
        //     }else{

        //         let comp = matchNode.getComponent('MatchIcon')

        //         if(comp.getId() == self.id){
        //             self.isFill = true
        //             TweenMax.to(self.node, 0.2, {scale: 1, ease: Back.easeIn.config(0.9)})
        //             self.moveTo(matchNode.position)
                    
        //         }else{
        //             if(!self.isBack){
        //                 self.isBack = true
        //                 self.backToFirstPos()
        //             }
        //         }
        //     }
        // })
    },

    doCheckMatch(){
        var self = this
        self.mouseDown = false
        let matchNode = gameController.instance.getMatchIcon(200.0, cc.v2(self.node.x, self.node.y))

            if(matchNode == null){
                if(!self.isBack){
                    self.isBack = true
                    self.backToFirstPos()
                }
            }else{

                let comp = matchNode.getComponent('MatchIcon')

                if(comp.getId() == self.id){
                    self.isFill = true
                    TweenMax.to(self.node, 0.2, {scale: 1, ease: Back.easeIn.config(0.9)})
                    self.moveTo(matchNode.position)
                    gameController.instance.checkWin()
                    
                }else{
                    if(!self.isBack){
                        self.isBack = true
                        self.backToFirstPos()
                    }
                }
            }
            // self.scaleDefault()
    },

    scaleDefault(){
        var self = this
        TweenMax.to(self.node, 0.2, {scale: 1, ease: Back.easeIn.config(0.9)})
    },

    moveTo(pos){
        var self = this
        TweenMax.to(self.node, 0.2, {x: pos.x, y: pos.y})

    },

    autoSetSize(){

        var self = this

        var size = self.sprite.spriteFrame.getTexture()
        self.node.width = size.width
        self.node.height = size.height
    },

    backToFirstPos(){
        var self = this
        TweenMax.to(self.node, 0.3, {x: self.pos.x, y: self.pos.y, ease: Back.easeOut,
            onComplete: ()=>{
                self.isBack = false
            }
        })
        self.scaleDefault()
        self.setBlockToNodeParent(false)
    },

    setBlockToNodeParent(isMoving){
        var self = this

        let parent = null
        if(isMoving){
            parent = gameController.instance.getMovingContainer()
        }else{
            parent = gameController.instance.getDragContainer()
        }

        if(parent != null){
            self.node.parent = parent
        }
    },

    setIcon(img, _id){
        var self = this

        self.pos = self.node.position

        self.sprite = self.node.getComponent(cc.Sprite)
        self.sprite.spriteFrame = img
        self.id = _id
        self.autoSetSize()
    },

    getId(){
        var self = this
        return self.id
    },

    // update (dt) {
    //     var self = this

    //     if(!self.isRaycast) return

        
    // }
});
