import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState, ConnectedReduxProps } from '../../reducer';
import { Command } from '../actions';
import Notifications from '../components/Notifications';
// import { NotificationsSelector } from '../selectors';


// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({notificationSystem}: ApplicationState) => ({
    messages: notificationSystem.messages,
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
    {
        onMessageShown: Command.notify,
    },
    dispatch,
);

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notifications);
