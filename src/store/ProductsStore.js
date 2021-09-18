import { makeAutoObservable } from "mobx";
import api from "../api/api";

class ProductsStore{
    list = [];
    loading = false;
    root
    constructor(root){
        this.root = root;
        makeAutoObservable(this, {
            root: false
        });
        this.load();
    }
    async getProduct(id){
        const inStore = this.list.find(p => p.id === id);
        if(inStore) return inStore
        const prodResp = await api.get(`https://api.renics.org/products/${id}`);
        if(prodResp.status === 200) return await prodResp.json();
        return null;
    }
    async saveProduct(product){
        const method = product.id ? 'PATCH' : 'POST';
        const added = await api.request('/products', {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(product)
        });
        if(added.status === 200){
            const prod = await added.json();
            this.root.toasts.add({
                title: product.id ? "Отредактирован продукт" : "Добавлен продукт",
                content: prod.name[this.root.language.current],
                delay: 5000
            });
            const ind = this.list.findIndex(p => p.id === prod.id);
            if(ind !== -1) this.list[ind] = {...prod};
            else this.list.push(prod);
        }
        else{
            this.root.toasts.add({
                title: `Произошла ошибка, код ${added.status}`,
                content: (await added.json()).error.message,
                delay: 5000
            });
        }
    }
    async deleteProduct(product){
        const conf = window.confirm(`Удалить "${product.name}"`);
        if(conf){
            const resp = await api.delete(`/products/${product.id}`);
            if(resp.status){
                this.list = this.list.filter(p => p.id !== product.id);
                this.root.toasts.add({
                    title: "Удалён товар",
                    content: product.name[this.root.language.current],
                    delay: 5000
                });
            }
        }
    }
    async load(){
        if(this.loading) return;
        this.loading = true;
        const resp = await api.get('/products');
        if(resp.status){
            const json = await resp.json();
            this.list = this.list.concat(json);
        }
        this.loading = false;
    }
}

export default ProductsStore;