import { makeAutoObservable } from "mobx";
class ToastsStore{
    list = [];
    constructor(){
        makeAutoObservable(this, );
    }
    add(toast){
        this.list.push({
            id: `${Date.now()}-${Math.round(Math.random(1, 1000))}`,
            ...toast
        });
    }
    remove(id){
        this.list = this.list.filter(t => t.id !== id);
    }
}

export default ToastsStore;