import { BaseUI } from "../ui/BaseUI";
import { GlobalConfig } from "../Config";


export class UIManager{
    private static instance: UIManager;
    private uiList: BaseUI[] = [];

    private uiRoot: cc.Node = null;
    
    public static getInstance(): UIManager{
        if(this.instance == null){
            this.instance = new UIManager();
        }
        return this.instance;
    }

    constructor(){
        this.uiRoot = cc.find("Canvas");
    }

    public addUI(uiName:string, zOrder?: number, callback?: Function, onProgress?: Function, ...args: any[]){
        if(this.getUI(uiName)){
            return;
        }
        cc.loader.loadRes(GlobalConfig.prefabPath + uiName,(completedCount: number, totalCount: number, item: any)=>{
            if(onProgress){
                onProgress(completedCount, totalCount, item);
            }
        }, (error, prefab)=>{
            if(error){
                cc.log(error);
                return;
            }
            if(this.getUI(uiName)){
                return;
            }
            let uiNode: cc.Node = cc.instantiate(prefab);
            uiNode.parent = this.uiRoot;
            if (zOrder) { uiNode.zIndex = zOrder; }
            let ui = uiNode.getComponent(BaseUI) as BaseUI;
            this.uiList.push(ui);
            if(callback){
                callback(ui, args);
            }
        });
    }

    public removeUI(uiName: string){
        for(let i = 0; i < this.uiList.length; ++i){
            if(this.uiList[i].name === uiName){
                this.uiList[i].node.destroy();
                this.uiList.splice(i, 1);
                return;
            }
        }
    }

    public showUI(uiName:string, callback?: Function){
        let ui = this.getUI(uiName);
        if(ui){
            ui.node.active = true;
            callback&&callback(ui);
        }
        else{
            this.addUI(uiName, 0, ()=>{
                let ui = this.getUI(uiName);
                callback&&callback(ui);
            });
        }
    }

    public hideUI(uiName: string){
        let ui = this.getUI(uiName);
        if(ui){
            ui.node.active = false;
        }
    }

    public getUI(uiName: string): BaseUI{
        for(let i = 0; i < this.uiList.length; ++i){
            if(this.uiList[i].name === uiName){
                return this.uiList[i];
            }
        }
        return null;
    }
}