import * as React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { Grid, Image } from 'semantic-ui-react';
const logo = require('./theme/img/prooph_sticker.png');

interface Overview extends RouteComponentProps<{ id: string }>, WithNamespaces {
}

const Overview = (props: Overview) => {
    const { t } = props;
    // Add your containers here
    return <Grid centered={true}>
        <Grid.Row>
            <p>{t('app.welcome')}</p>
        </Grid.Row>
        <Grid.Row>
            <Image src={logo} style={{width:300, height:300}}/>
        </Grid.Row>
    </Grid>;
};

export default withNamespaces()(Overview);
