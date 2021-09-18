import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import styles from './Navigation.module.css';
const Navigation = observer(props => {
    const { language } = useStore();
    return(
        <div className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${styles.wrapper}`}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <img src="/logo.svg" alt="Логотип"/>
            </a>
            <hr />
            <ul className="list-unstyled ps-0 mb-auto">
                <li className="mb-1">
                    <button className={`btn btn-toggle align-items-center rounded collapsed text-white ${styles.btnToggle}`} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                    Home
                    </button>
                    <div className="collapse" id="home-collapse" >
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="#" className="link-dark rounded">Overview</a></li>
                        <li><a href="#" className="link-dark rounded">Updates</a></li>
                        <li><a href="#" className="link-dark rounded">Reports</a></li>
                    </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className={`btn btn-toggle align-items-center rounded collapsed text-white ${styles.btnToggle}`} data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                    Dashboard
                    </button>
                    <div className="collapse" id="dashboard-collapse" >
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="#" className="link-dark rounded">Overview</a></li>
                        <li><a href="#" className="link-dark rounded">Weekly</a></li>
                        <li><a href="#" className="link-dark rounded">Monthly</a></li>
                        <li><a href="#" className="link-dark rounded">Annually</a></li>
                    </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className={`btn btn-toggle align-items-center rounded collapsed text-white ${styles.btnToggle}`} data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                    Orders
                    </button>
                    <div className="collapse" id="orders-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="#" className="link-dark rounded">New</a></li>
                        <li><a href="#" className="link-dark rounded">Processed</a></li>
                        <li><a href="#" className="link-dark rounded">Shipped</a></li>
                        <li><a href="#" className="link-dark rounded">Returned</a></li>
                    </ul>
                    </div>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                    <button className={`btn btn-toggle align-items-center rounded collapsed text-white ${styles.btnToggle}`} data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                    Account
                    </button>
                    <div className="collapse" id="account-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="#" className="link-dark rounded">New...</a></li>
                        <li><a href="#" className="link-dark rounded">Profile</a></li>
                        <li><a href="#" className="link-dark rounded">Settings</a></li>
                        <li><a href="#" className="link-dark rounded">Sign out</a></li>
                    </ul>
                    </div>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong>mdo</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
            </div>
        </div>
    );
});

export default Navigation;