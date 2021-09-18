import { makeAutoObservable } from "mobx";

class LanguageStore{
    current = "ru";
    list = ["ru", "en"];
    resourses = {
        en: {
            "Редактирование товара": "Editing a product",
            "Добавление товара": "Adding a product",
            "₽": "$"
        },
        ru: {}
    }
    constructor(){
        makeAutoObservable(this);
        this.changeLanguage = this.changeLanguage.bind(this);
    }
    changeLanguage(lng){
        if(!this.list.includes(lng)) throw "Нет такой локали";
        this.current = lng;
    }
    translate(key, lang = this.current){
        if(this.resourses[lang][key]) return this.resourses[lang][key];
        return key;
    } 
}

export default LanguageStore;