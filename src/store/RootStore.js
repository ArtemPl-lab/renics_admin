import LanguageStore from "./LanguageStore";
import ProductsStore from "./ProductsStore";
import ToastsStore from "./ToastsStore";
import UserStore from "./UserStore";


class RootStore{
    constructor(){
        this.user = new UserStore(this);
        this.language = new LanguageStore(this);
        this.products = new ProductsStore(this);
        this.toasts = new ToastsStore(this);
    }
}

export default new RootStore;
