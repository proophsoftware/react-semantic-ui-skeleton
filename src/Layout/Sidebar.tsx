import * as React from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import TopMenu from './TopMenu';
import Sidemenu from './Sidemenu';

interface StateProps {
    visible: boolean;
}

interface OwnProps {
}

class SidebarPusher extends React.Component<OwnProps, StateProps> {
    state = {visible: false};

    componentWillUpdate(nextProps: OwnProps, nextState: StateProps) {
        // when the menu becomes visible, setup some handlers so we can close the menu easily
        // TODO
        /*
        if (nextState.visible === true) {
            window.addEventListener('keydown', this.handleKeyPress);
            document.querySelector('.pusher').addEventListener('click', this.handleClick);
        } else {
            window.removeEventListener('keydown', this.handleKeyPress);
            document.querySelector('.pusher').removeEventListener('click', this.handleClick);
        }
        */
    }

    handleClick = () => {
        if (this.state.visible) {
            this.setState({visible: false});
        }
    };

    toggleVisibility = () => this.setState((prevstate: StateProps) => {
        return {visible: !prevstate.visible};
    });

    hideSidebar = () => this.state.visible && this.setState((prevstate: StateProps) => {
        return {visible: false};
    });

    handleKeyPress = (e: React.KeyboardEvent) => e.keyCode === 27 && this.hideSidebar();

    render() {
        const {visible} = this.state;

        return (
            <Sidebar.Pushable as={Segment}>
                <Sidemenu visible={visible} handleClick={this.handleClick}/>
                <TopMenu>
                    <Menu.Item as="a" onClick={this.toggleVisibility}>
                        <Icon size="large" name="sidebar"/>
                    </Menu.Item>
                </TopMenu>
                <Sidebar.Pusher
                    style={{
                        marginTop: '4em',
                        padding: '0 1.5em',
                    }}
                >
                    {this.props.children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default SidebarPusher;
