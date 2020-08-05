import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from "../router/PrivateRoute"
import loadable from '../ways/loadable'
const Home = loadable(() => import('../pages/home'))
const Login = loadable(() => import('../pages/login'))
const Regist = loadable(() => import('../pages/Regist'))
const Dating = loadable(() => import('../pages/Dating'))
const Inbox = loadable(() => import('../pages/Inbox'))
const Meetyou = loadable(() => import('../pages/Meetyou'))
const InSearch = loadable(() => import('../pages/inSearch'))
const Mycity = loadable(() => import('../pages/Mycity'))
const Lastsignup = loadable(() => import('../pages/Lastsignup'))
const Witheme = loadable(() => import('../pages/Witheme'))
const Online = loadable(() => import('../pages/Online'))
const Myresume = loadable(() => import('../pages/myResume'))
const onSearch = loadable(() => import('../pages/onSearch'))
const meLike = loadable(() => import('../pages/melike'))
const onCity = loadable(() => import('../pages/oncity'))
const perosenInfo = loadable(() => import('../pages/peroseninfo'))
const converSation = loadable(() => import('../pages/converSation'))
const chitChat = loadable(() => import('../pages/chitChat'))
const ErrorPage = loadable(() => import('../pages/Error'));
const BasicRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <Home />
                        )
                )} />
                <Route exact path="/login" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <Login />
                        )
                )} />
                <Route exact path="/regist" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <Regist />
                        )
                )} />
                <Route exact path="/dating" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <Dating />
                        )
                )} />
                <Route exact path="/inbox" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <Inbox />
                        )
                )} />
                <Route exact path="/meetyou" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <Meetyou />
                        )
                )} />
                <Route exact path="/insearch" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <InSearch />
                        )
                )} />
                <Route exact path="/mycity" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <Mycity />
                        )
                )} />
                <Route exact path="/lastsignup" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <Lastsignup />
                        )
                )} />
                <Route exact path="/witheme" render={() => (
                    Boolean(sessionStorage.getItem("token")) ? (
                        <Redirect to="/online" />
                    ) : (
                            <Witheme />
                        )
                )} />
                <PrivateRoute exact path="/online" component={Online} />
                <PrivateRoute exact path="/myresume:key" component={Myresume} />
                <PrivateRoute exact path="/search" component={onSearch} />
                <PrivateRoute exact path="/like" component={meLike} />
                <PrivateRoute exact path="/city" component={onCity} />
                <PrivateRoute exact path="/personinfo" component={perosenInfo} />
                <PrivateRoute exact path="/conver" component={converSation} />
                <PrivateRoute exact path="/chat" component={chitChat} />
                <Route path="*" exact component={ErrorPage}></Route>
            </Switch>
        </BrowserRouter>
    )
}
export default BasicRoute