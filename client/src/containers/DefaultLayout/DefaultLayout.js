import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../routes';
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
export default class DefaultLayout extends Component{
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    render() {
        return (
            <div>
                <div>
                    <Suspense fallback={this.loading()}>
                        <DefaultHeader />
                    </Suspense>
                </div>
               
                <div>
                    <Suspense fallback={this.loading()}>
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => (
                                    <route.component {...props} />
                                    )} />
                                ) : (null);
                            })}
                        <Redirect to="/home" />
                        </Switch>
                    </Suspense>
                </div>
            </div>
            
        )
    }
}