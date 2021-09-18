import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as Pages from './pages';
const Routes = props => {
    return(
        <>
            <Route exact path="/">
                <Redirect to="/shop/products" />
            </Route>
            <Route path="/shop/products/edit/:id?">
                <Pages.EditProduct />
            </Route>
            <Route path="/shop/products/">
                <Pages.Products />
            </Route>
        </>
    );
}

export default Routes;