

export default class EventManager {
    private static instance: EventManager = null;
    public static getInstance(): EventManager
    {
        if(this.instance == null)
        {
            this.instance = new EventManager();
        }
        return this.instance;
    }

    private listenerMap = new Map<string,Map<any,Function[]>>();
    private constructor()
    {
       
    }
    public notify(event: string, ...arg) {
		if (!event) {
			console.error("Listener type is null!");
			return ;
		}
		var targetMap = this.listenerMap.get(event);
		if (targetMap ) {
           for (const target in targetMap) {
                let callfunkArr = targetMap.get(target);
                if(callfunkArr){
                    for (const callfunk of callfunkArr) {
                        callfunk.call(target,arg);
                    }
                }
           }
		}
    }
    public register(event:string,target:any,callfunk:Function) {
        let targetMap = this.listenerMap.get(event);
        if(!targetMap){
            this.listenerMap.set(event,new Map<any,Function[]>());
            let callfunkArr = targetMap.get(target);
                if(!callfunkArr){
                    callfunkArr = new Array<Function>();
                }
                callfunkArr.push(callfunk);
        }

    }
    public unregister(event:string,target:any,callfunk:Function) {
        var targetMap = this.listenerMap.get(event);
		if (targetMap ) {
            let callfunkArr = targetMap.get(target);
            if(callfunkArr){
                for (let index = 0; index < callfunkArr.length; index++) {
                    if(callfunk === callfunkArr[index]){
                        callfunkArr.splice(index,1);
                        break;
                    } 
                }
            }
		}

    }
    public targetOff(target:any) {
       for (const event in this.listenerMap) {
            var targetMap = this.listenerMap.get(event);
            targetMap.delete(target);
       }
    }
}

