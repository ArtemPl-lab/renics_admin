import { useState } from "react";
import { useStore } from "../../store";
import styles from './Auth.module.css';

export const Auth = props => {
    const { user } = useStore();
    const [ state, setState ] = useState({});

    const handleChange = e => {
        setState(s => ({
            ...s,
            [e.target.name]: e.target.value
        }));
    }
    const onSubmit = e => {
        e.preventDefault();
        user.auth(state);
    }
    return(
        <main className={styles.form} onSubmit={onSubmit}>
            <form>
                <img className="mb-4" src="/logo.png" alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Требуется авторизация</h1>

                <div className="form-floating">
                    <input 
                        type="text"
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="Логин"
                        name="username"
                        value={state.username}
                        onChange={handleChange} 
                    />
                    <label htmlFor="floatingInput">Логин</label>
                </div>
                <div className="form-floating">
                    <input 
                        type="password" 
                        className="form-control"
                        id="floatingPassword" 
                        placeholder="Пароль"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="floatingPassword">Пароль</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
            </form>
        </main>
    );
}