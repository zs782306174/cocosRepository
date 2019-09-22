import EventManager from "../manager/EventManager";



const {ccclass, property} = cc._decorator;
@ccclass
export abstract class BaseUI extends cc.Component{
   
    
    protected abstract initRegister(event:string,target:any,callfunk:Function):void;
    
    onDestroy(): void{
        EventManager.getInstance().targetOff(this);
    }

}