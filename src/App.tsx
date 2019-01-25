import { History } from 'history'
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { Store } from 'redux';
import i18n from './i18n';
import * as Layout from './Layout';
import {NotificationContainer} from './NotificationSystem';
import Overview from './Overview';
import { ApplicationState } from './reducer';
import * as Routes from './routes';
import './theme/css/style.css';
import './theme/semantic/semantic.css';

// The Main component renders one of provided
// Routes (provided that one matches).
const Main = () => (
    <Switch>
        <Route exact={true} path={Routes.rootPath} component={Overview}/>
    </Switch>
);

const Root = () => (
    <Layout.Sidebar>
        <Main/>
        <NotificationContainer/>
    </Layout.Sidebar>
);

// Separate props from state and props from dispatch to their own interfaces.

// Any additional component props go here.
interface OwnProps {
    store: Store<ApplicationState>
    history: History
}

// Create an intersection type of the component props and our Redux props.
type AllProps =  OwnProps

class App extends React.Component<AllProps> {
    public render() {
        const { store, history } = this.props;

        return (
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <Router history={history}>
                        <Root/>
                    </Router>
                </Provider>
            </I18nextProvider>
        )
    }
}

export default App;