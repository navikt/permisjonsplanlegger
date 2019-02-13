import classNames from 'classnames';
import Block from 'common/components/block/Block';
import InfoIkon from 'common/components/ikoner/InfoIkon';
import LukkInfoIkon from 'common/components/ikoner/LukkInfoIkon';
import IkonKnapp from 'common/components/ikonKnapp/IkonKnapp';
import Sirkelknapp from 'common/components/sirkelknapp/Sirkelknapp';
import SlettKnapp from 'common/components/slett-knapp/SlettKnapp';
import BEMHelper from 'common/utils/bem';
import AlertStripe from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import * as React from 'react';
import { Regelbrudd, RegelAlvorlighet } from '../../../utils/regler/types';
import './periodelisteElement.less';
import { FormattedMessage } from 'react-intl';
import AdvarselIkon from 'common/components/ikoner/AdvarselIkon';
import { getAlertstripeTypeFromRegelbrudd } from '../periodelisteUtils';

interface Props {
    menyer: PeriodeElementMeny[];
    slett?: {
        onRemove: () => void;
        ariaLabel: string;
    };
    info?: string[];
    regelbrudd?: Regelbrudd[];
}

interface State {
    infoVisible?: boolean;
    regelInfoVisible?: boolean;
}

interface PeriodeElementMeny {
    id: string;
    render: () => React.ReactNode;
    className?: string;
    isVisibleCheck?: () => boolean;
}
const bem = BEMHelper('periodelisteElement');

const PeriodeElementMenyWrapper: React.StatelessComponent<{ meny: PeriodeElementMeny }> = ({ meny }) => {
    return (
        <div className={classNames(bem.element('menyWrapper'), meny.className)} id={meny.id}>
            {meny.render()}
        </div>
    );
};

class PeriodelisteElement extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            infoVisible: true,
            regelInfoVisible: false
        };
    }
    componentWillReceiveProps(nextProps: Props) {
        if (this.props.info === undefined && nextProps.info !== undefined) {
            this.setState({ infoVisible: true });
        }
    }
    render() {
        const { menyer, slett, info, regelbrudd } = this.props;
        const infoId = guid();
        const regelId = guid();
        const { regelInfoVisible, infoVisible } = this.state;
        return (
            <div className={bem.block}>
                <div className={bem.element('mainContent')}>
                    {menyer
                        .filter((meny) => (meny.isVisibleCheck ? meny.isVisibleCheck() : true))
                        .map((meny) => (
                            <PeriodeElementMenyWrapper meny={meny} key={meny.id} />
                        ))}

                    {(slett || info || regelbrudd) && (
                        <div className={bem.element('tools')}>
                            {slett && (
                                <div className={bem.element('tool')}>
                                    <SlettKnapp
                                        onClick={() => slett.onRemove()}
                                        ariaLabel={slett.ariaLabel}
                                        title={slett.ariaLabel}
                                    />
                                </div>
                            )}
                            {info && (
                                <div className={bem.element('tool')}>
                                    {
                                        <Sirkelknapp
                                            ikon={infoVisible ? <LukkInfoIkon /> : <InfoIkon />}
                                            stil="info"
                                            toggle={{ pressed: infoVisible || false }}
                                            ariaLabel="f"
                                            onClick={() => this.setState({ infoVisible: !infoVisible })}
                                            aria-describedby={infoId}
                                        />
                                    }
                                </div>
                            )}
                            {regelbrudd && regelbrudd.length > 0 && (
                                <div className={bem.element('tool')}>
                                    {
                                        <IkonKnapp
                                            onClick={() => this.setState({ regelInfoVisible: !regelInfoVisible })}
                                            ikon={
                                                regelbrudd[0].alvorlighet === RegelAlvorlighet.ULOVLIG ? (
                                                    <AdvarselIkon type="feil" />
                                                ) : (
                                                    <InfoIkon />
                                                )
                                            }
                                            ariaLabel="Perioden har regelbrudd"
                                        />
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {info && (
                    <div className={bem.element('info')} id={infoId}>
                        <Block visible={infoVisible} animated={true} style="info" margin="none">
                            {info.map((i, idx) => (
                                <p key={idx} className={bem.element('infoText')}>
                                    {i}
                                </p>
                            ))}
                        </Block>
                    </div>
                )}
                {regelbrudd && regelbrudd.length > 0 && regelInfoVisible && (
                    <div className={bem.element('regelbrudd')} id={regelId}>
                        <Block visible={regelInfoVisible} animated={true} margin="none">
                            <AlertStripe type={getAlertstripeTypeFromRegelbrudd(regelbrudd[0])} solid={true}>
                                <ul className={bem.element('regelbruddListe')}>
                                    {regelbrudd.map((brudd, idx) => (
                                        <li className={bem.element('regelbruddListe__brudd')} key={idx}>
                                            <FormattedMessage
                                                id={brudd.feilmelding.intlKey}
                                                values={brudd.feilmelding.values}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </AlertStripe>
                        </Block>
                    </div>
                )}
            </div>
        );
    }
}

export default PeriodelisteElement;
