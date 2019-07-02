import React from "react";

import {BrowserRouter, Route, Switch} from "react-router-dom"
import {HomePage} from "./pages/Home/Home";
import {LoginPage} from "./pages/Login/Login";

function Test() {
    let [v1, setv1] = React.useState(1)
    let [v2, setv2] = React.useState(100)
    console.log('update')
    return (
        <div>
            {v1}
            {v2}
            <button onClick={() => {
                setv1(p => p + 1)
                setv1(p => p + 1)
                setv2(p => p - 1)
            }}>click</button>
        </div>
    )
}

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/login'} component={LoginPage}/>
                <Route exact path={'/home'} component={HomePage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
