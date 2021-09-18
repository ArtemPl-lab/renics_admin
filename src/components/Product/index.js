import { observer } from 'mobx-react-lite';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../store';

const Product = observer(props => {
    const { language } = useStore();
    return(
        <Card className="h-100">
            <Card.Img variant="top" src={props.thumbnail} height={270} style={{objectFit: "contain"}}/>
            <Card.Body>
                <Card.Title>{props.name[language.current]}</Card.Title> 
                <Card.Text>
                    {props.description[language.current].slice(0, 150).trim()}
                    {props.description[language.current].length > 150 ? '...' : ''}
                </Card.Text>
            </Card.Body>
            <ButtonGroup className="w-100">
                <Link to={`/shop/products/edit/${props.id}`} className="btn btn-outline-primary" style={{width: "50%", borderTopLeftRadius: 0}}>
                    Редактировать
                </Link>
                <Button variant="outline-danger"style={{width: "50%", borderTopRightRadius: 0}} onClick={props.delete}>Удалить</Button>
            </ButtonGroup>
        </Card>
    );
});

export default Product;