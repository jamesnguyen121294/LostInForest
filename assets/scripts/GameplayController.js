// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataModel from './DataModel'
import Helper from './Helper'
import WinHub from './WinHub'
import PauseHub from './PauseHub'
import Timer from './Timer'

var gameController = cc.Class({
    extends: cc.Component,
    statics: {
        instance: null
    },
    _ctor(){
        this.leftPosIndex = cc.Integer
        this.rightPosIndex = cc.Integer
    },

    properties: {
        localData: {
            default: [],
            type: DataModel,
        },
        leftPoses: {
            default: [],
            type: cc.Node
        },
        rightPoses: {
            type: cc.Node,
            default: []
        },
        matchIconList: {
            type: cc.Node,
            default: [],
            visible: false
        },
        container: cc.Node,
        containerMatchIcon: cc.Node,
        containerMoving: cc.Node,
        dragIconPrefab: cc.Prefab,
        matchIconPrefab: cc.Prefab,
        totalBlockAGame: {
            type: cc.Integer,
            default: 4
        },
        currentMatch: {
            type: cc.Integer,
            default: 0
        },
        winHub: {
            type: WinHub,
            default: null
        },
        pauseHub: {
            type: PauseHub,
            default: null
        },
        timer: {
            type: Timer,
            default: null
        },
        timerTxt: cc.RichText,
        gameOverNode: cc.Node,
        outOfLevelNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        gameController.instance = this
    },

    start () {
    
        var self = this
        self.leftPosIndex = 0
        self.rightPosIndex = 0
        // matchIconList = [cc.Node]
        self.initOnScene()
    },

    // update (dt) {},

    initOnScene(){
        var self = this
        var data = self.getData(Helper.currentLevel)

        let listPosRightShuffle = self.shufflePos(self.rightPoses)
        let listPosLeftShuffle = self.shufflePos(self.leftPoses)

        if(data != null){
            
            data.data.forEach(element => {
                if(element.isDragObj){
                    self.spawnDragIcon(element.sprite, listPosLeftShuffle[self.leftPosIndex], element.id)
                    self.leftPosIndex++
                }else{
                    self.spawnMatchIcon(element.sprite, listPosRightShuffle[self.rightPosIndex], element.id)
                    self.rightPosIndex++
                }
            });
        }else{
            self.setOutOfLevel()
        }

        // start timer
        self.startTimer()
    },

    startTimer(){
        var self = this

        self.timer.startCountDown(10, (time) => {
            // set time text
            self.timerTxt.string = Helper.covertTimeString(time)
        }, () => {
            // time out
            self.gameOverNode.active = true
            cc.log('time out')
        })
    },

    onReplay(){
        cc.director.loadScene('gameplay')
    },

    shufflePos(listPos){
        for(let i =0; i< 20; i++){
            let firstIndex = Math.floor(Math.random() * listPos.length)
            var firstElement = listPos[firstIndex]

            let secondIndex = Math.floor(Math.random() * listPos.length)
            var secondElement = listPos[secondIndex]

            listPos[firstIndex] = secondElement
            listPos[secondIndex] = firstElement
        }

        return listPos
    },

    getData(level){
        var self = this
        let i = 0
        for(i = 0; i< self.localData.length; i++){
            if(level == self.localData[i].level){
                return self.localData[i]
            }
        }
        return null
    },

    spawnDragIcon(img, pos, id){
        var self = this
        let node = cc.instantiate(self.dragIconPrefab)
        node.parent = self.container
        node.position = pos
        
        var comp = node.getComponent("DragIcon")

        if(comp != null){
            comp.setIcon(img, id)
        }
    },

    spawnMatchIcon(spriteFrame, pos, id){
        var self = this

        let node = cc.instantiate(self.matchIconPrefab)
        node.parent = self.containerMatchIcon
        node.position = pos

        let comp = node.getComponent("MatchIcon")

        if(comp != null){
            comp.init(spriteFrame, id)
        }

        self.matchIconList.push(node)
    },

    getMovingContainer(){
        return this.containerMoving
    },

    getDragContainer(){
        return this.container
    },

    getMatchIcon(distance, dragPos){
        var self = this
        let valueBack = 9999999.0
        let node = null

        self.matchIconList.forEach(element => {
            let _distance = Helper.distance(dragPos.x, dragPos.y, element.x, element.y)

            if(_distance <= distance && valueBack > _distance){
                valueBack = _distance
                node = element
            }
        })

        return node
    },

    checkWin(){
        var self = this

        self.currentMatch++

        if(self.currentMatch >= self.totalBlockAGame){
            self.timer.pause()
            self.scheduleOnce(self.setWin, 1)
        }
    },

    setWin(){
        var self = this
        self.winHub.open()
    },

    setOutOfLevel(){
        var self = this
        self.outOfLevelNode.active = true
    },

    onPauseGame(){
        var self = this
        self.timer.pause()
        self.pauseHub.open(()=> {
            self.timer.resume()
        })
    }
});

//gameController.instance = new gameController()
module.exports = gameController
