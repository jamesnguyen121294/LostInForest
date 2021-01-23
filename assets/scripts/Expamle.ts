// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    getSprite(){
        var self = this
        let sprite: cc.SpriteFrame

        var size = sprite.getTexture()

        // this.node.height

        let array = [0, 1, 2]

        let i;
        for(i=0; i< array.length; i++){

        }

        // cc.tween(self.node).to(0.2, cc.v2(0, 0))

        let a: cc.Sprite
        // this.node.parent = 
        var hit = cc.director.getPhysicsManager().rayCast(cc.v2(this.node.x, this.node.y), cc.v2(0,0), cc.RayCastType.Any)

        if(hit.length > 0){
            hit[0].collider.node.name
        }
        
        

        
    }

    // update (dt) {}
}
