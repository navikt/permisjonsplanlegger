import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import Sirkelknapp, { Stil } from 'common/components/sirkelknapp/Sirkelknapp';
import LukkInfoIkon from 'common/components/ikoner/LukkInfoIkon';
import InfoIkon from 'common/components/ikoner/InfoIkon';
import { Collapse } from 'react-collapse';
import classNames from 'classnames';
import getMessage from 'common/util/i18nUtils';

import './infoboks.less';
import { Normaltekst } from 'nav-frontend-typografi';

interface InfoboksProps {
    tekst: string | React.ReactNode;
    stil?: Stil;
    contentFullWidth?: boolean;
}

interface InfoboksState {
    isExpanded: boolean;
}

interface IntlProp {
    intl: IntlShape;
}

type Props = InfoboksProps & IntlProp;

class Infoboks extends React.Component<Props, InfoboksState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isExpanded: false,
        };

        this.toggleIsExpanded = this.toggleIsExpanded.bind(this);
    }

    toggleIsExpanded() {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    }

    render() {
        const { tekst, stil = 'info', contentFullWidth, intl } = this.props;
        const { isExpanded } = this.state;

        const ikon = isExpanded ? <LukkInfoIkon /> : <InfoIkon />;
        return (
            <React.Fragment>
                <span className="infoboks__sirkel">
                    <Sirkelknapp
                        stil={stil}
                        ariaLabel={getMessage(intl, 'infoboks.sirkeltekst')}
                        onClick={this.toggleIsExpanded}
                        ikon={ikon}
                        toggle={{ pressed: isExpanded }}
                    />
                </span>
                <Collapse
                    hasNestedCollapse={true}
                    className={classNames('infoboks', {
                        'infoboks--open': isExpanded,
                        'infoboks__content--fullWidth': contentFullWidth,
                    })}
                    isOpened={isExpanded}
                    springConfig={{ stiffness: 250, damping: 30 }}>
                    {isExpanded ? <Normaltekst className="infoboks__wrapper">{tekst}</Normaltekst> : <span />}
                </Collapse>
            </React.Fragment>
        );
    }
}

export default injectIntl(Infoboks);
