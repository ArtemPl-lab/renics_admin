import { makeAutoObservable } from "mobx";
import api from "../api/api";

class UserStore{
    accessToken = localStorage.accessToken;
    data = null;
    root
    constructor(root){
        this.root = root;
        makeAutoObservable(this, {
            root: false
        });
        this.checkAccess = this.checkAccess.bind(this);
    }
    async auth(credentials){
        if(await this.checkAccess()) return true;
        const resp = await api.post('/accounts/login', credentials);
        if(resp.status === 200){
            const json = await resp.json();
            this.accessToken = json.id;
            localStorage.accessToken = json.id;
            this.data = { ...json };
            return true;
        }
    }
    async logout(){

    }
    async checkAccess(){
        if(!this.accessToken) return false;
        const resp = await api.get('/accounts/self');
        if(resp.status === 200) {
            const json = await resp.json();
            this.data = { ...json };
            return true;
        }
        localStorage.accessToken = "";
        return false;
    }

}

export default UserStore;