import * as React from 'react';
import * as Layout from './Layout';
import * as Routes from './routes';
import { ApplicationState } from './reducer';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch, Router } from 'react-router';
import i18n from './i18n';
import { History } from 'history'
import Overview from './Overview';
import './theme/semantic/semantic.css';
import './theme/css/style.css';
import { I18nextProvider } from 'react-i18next';


// The Main component renders one of provided
// Routes (provided that one matches).
const Main = () => (
    <Switch>
        <Route exact path={Routes.rootPath} component={Overview}/>
    </Switch>
);

const Root = () => (
    <Layout.Sidebar>
        <Main/>
        {/*<Notifications/>*/}
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