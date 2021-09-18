import { observer } from "mobx-react-lite";
import { useStore } from "../../store"
import { Toast } from 'react-bootstrap';
import styles from './Toasts.module.css';
const Toasts = observer(props => {
    const { toasts } = useStore();
    return(
        <div className={styles.wrapper}>
            {toasts.list.map(toast => {
                return(
                    <Toast onClose={() => toasts.remove(toast.id)} show={true} delay={toast.delay || 3000} autohide>
                        <Toast.Header>
                            <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                            />
                            <strong className="mr-auto">{toast.title}</strong>
                            <small>just now</small>
                        </Toast.Header>
                        {
                            toast.content ? 
                            <Toast.Body>{toast.content}</Toast.Body> : ''
                        }
                    </Toast>
                );
            })}
        </div>
    );
});

export default Toasts;