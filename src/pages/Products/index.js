import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import Product from "../../components/Product";
import { Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const Products = observer(props => {
    const { products } = useStore();
    return(
        <>
            <Link className="mt-3 mb-3 btn btn-primary d-block" to="/shop/products/edit">
                Добавить новый товар
            </Link>
            <div class="input-group mb-3 input-group-lg">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Начните вводить наименование товара" 
                    aria-label="Начните вводить наименование товара"
                />
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Найти</button>
            </div>
            <Row>
                {products.list.map(prod => <Col md={6} sm={12} xs={12} lg={4} className="mb-5"><Product {...prod} delete={()=>products.deleteProduct(prod)} /></Col>)}
            </Row>
        </>
    );
});