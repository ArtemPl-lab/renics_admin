import { useRef, useState, useEffect } from 'react';
import { Modal, Button, Nav, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import styles from './EditProduct.module.css';
import { useStore } from '../../store';
import { observer } from 'mobx-react-lite';
import api from '../../api/api';

const supportedLanguages = ["ru", "en"];
const i18nFormFields = ["name", "defaultPrice", "salePrice","description"];
const initialState = i18nFormFields.reduce((prev, curr) => ({
    ...prev,
    [curr]: supportedLanguages.reduce((p, c) => ({...p, [c]: ''}), {})
}), {});

export const EditProduct = observer(props => {
    const [show, setShow] = useState(false);
    const { products, language } = useStore();
    const [lang, setLang] = useState(language.current);
    const [state, setState] = useState({...initialState});
    const history = useHistory();
    const { id } = useParams();
    const imageRef = useRef(null);
    const galleryRef = useRef(null);
    const handleClose = () => {
        setShow(false);
        setTimeout(history.goBack, 300);
    }
    const handleShow = () => setShow(true);
    const handleChange = e => {
        setState((st)=>{
            if(i18nFormFields.includes(e.target.name)){
                return {
                    ...st,
                    [e.target.name]: {
                        ...st[e.target.name],
                        [lang]: e.target.value
                    }
                }
            }
            return {
                ...st,
                [e.target.name]:  e.target.value
            }
        });
    }
    const onSubmit = async e => {
        let changedProduct = {...state};
        e.preventDefault();
        if(imageRef.current.files[0]){
            changedProduct["thumbnail"] = await api.uploadMedia(imageRef.current.files[0]);
        }
        if(galleryRef.current.files){
            const images = [];
            for(let i = 0; i < galleryRef.current.files.length; i++){
                const file = await api.uploadMedia(galleryRef.current.files[i]);
                images.push(file);
            }
            changedProduct["gallery"] = [...images];
        }
        products.saveProduct(changedProduct);
        handleClose();
    }
    useEffect(()=>{
        handleShow();
        async function fetchProduct(){
            const loadedProduct = await products.getProduct(id);
            if(loadedProduct) setState(loadedProduct);
        }
        if(id) fetchProduct();
    }, [id, products]);
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Body className="p-0">
                <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <Modal.Title>{id ? language.translate('Редактирование товара') : language.translate('Добавление товара')}</Modal.Title>
                        <Nav variant="tabs" defaultActiveKey={language.current} onSelect={setLang} className={styles.tabs}>
                            {supportedLanguages.map((l, key) => (
                                <Nav.Item key={key}>
                                    <Nav.Link eventKey={l} className="h-100">
                                        {l.toLocaleUpperCase()}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <div className="mb-3">
                            <label className="form-label">Назване продукта</label>
                            <input type="text" className="form-control" name="name" onChange={handleChange} value={state.name[lang]} />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md">
                                <label className="form-label">Цена по умолчанию</label>
                                <div className="input-group">
                                    <input type="number" className="form-control" name="defaultPrice" onChange={handleChange} value={state.defaultPrice[lang]}/>
                                    <span class="input-group-text">{language.translate("₽", lang)}</span>
                                </div>
                            </div>
                            <div className="col-md">
                                <label className="form-label">Цена распродажи</label>
                                <div className="input-group">
                                    <input type="number" className="form-control" name="salePrice" onChange={handleChange} value={state.salePrice[lang]}/>
                                    <span class="input-group-text">{language.translate("₽", lang)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Товаров в наличии</label>
                            <input type="number" className="form-control" name="inStock" onChange={handleChange} value={state.inStock}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Кол-во лайков</label>
                            <input type="number" className="form-control" name="likedCounter" onChange={handleChange} value={state.likedCounter}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Артикул</label>
                            <input type="number" className="form-control" name="articul" onChange={handleChange} value={state.articul}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Описание товара</label>
                            <textarea type="number" className="form-control" name="description" onChange={handleChange} value={state.description[lang]}/>
                        </div>
                        <label className="form-label">Миниатюра товара</label>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" ref={imageRef}/>
                            <label class="input-group-text" for="inputGroupFile02">Загрузить</label>
                        </div>
                        <label className="form-label">Галлерея товара</label>
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" ref={galleryRef} multiple/>
                            <label class="input-group-text" for="inputGroupFile02">Загрузить</label>
                        </div>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});