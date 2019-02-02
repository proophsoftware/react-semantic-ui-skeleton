import * as React from 'react';
import { pure } from 'recompose';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Menu, MenuItem, Sidebar, Image } from 'semantic-ui-react';
const logo = require('../theme/img/prooph-logo@0.5x.png');

export interface SidemenuProps extends WithNamespaces {
    visible: boolean;
    handleClick: any;
}

const Sidemenu = pure((props: SidemenuProps) => {
    return (
        <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={props.visible}
            icon="labeled"
            vertical={true}
            inverted={true}
        >
            <MenuItem active={false}>
                <Image src={logo}/>
            </MenuItem>
            <MenuItem
                link={true}
                as={NavLink}
                onClick={props.handleClick}
                to="/"
                activeClassName="active"
            >
                {props.t('app.title')}
            </MenuItem>
        </Sidebar>
    );
});

export default withNamespaces('translation')(Sidemenu);
