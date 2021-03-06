import * as React from 'react';
import BEMHelper from 'common/util/bem';
import OppsummeringBlokk from './oppsummeringBlokk/OppsummeringBlokk';
import AntallBarnSirkel from './antallBarnSirkel/AntallBarnSirkel';
import SituasjonSirkel from './situasjonSirkel/SituasjonSirkel';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import getMessage from 'common/util/i18nUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import { ForeldreparSituasjon, OmForeldre } from 'shared/types';

export interface SituasjonsoppsummeringProps {
    situasjon: ForeldreparSituasjon;
    omForeldre: OmForeldre;
    antallBarn: number;
    familiehendelsesdato: Date;
    onRequestChange: () => void;
}

const bem = BEMHelper('oppsummering');

const Situasjonsoppsummering: React.FunctionComponent<SituasjonsoppsummeringProps> = (props) => {
    const intl = useIntl();
    const { antallBarn, familiehendelsesdato, omForeldre, onRequestChange } = props;
    const barn = getMessage(intl, `antallBarn.alternativ.barn-${antallBarn}`);
    const termin = formaterDatoUtenDag(familiehendelsesdato);

    return (
        <OppsummeringBlokk
            onRequestChange={onRequestChange}
            tittel={getMessage(intl, 'oppsummering.situasjon.tittel', {
                antallBarn,
                antallForeldre: omForeldre.erDeltOmsorg ? 2 : 1,
            })}
            illustrasjoner={
                <div className={bem.classNames(bem.element('deler', 'illustrasjoner'))}>
                    <div className={bem.element('illustrasjon')}>
                        <AntallBarnSirkel antallBarn={antallBarn} />
                    </div>
                    <div className={bem.element('illustrasjon')}>
                        <SituasjonSirkel {...props} valgtForelder={omForeldre.forelderVedAleneomsorg} />
                    </div>
                </div>
            }>
            <FormattedMessage
                id="oppsummering.situasjon.tekst"
                values={{
                    antallForeldre: omForeldre.erDeltOmsorg ? 2 : 1,
                    strong: (msg: any) => <strong>{msg}</strong>,
                    barn,
                    termin,
                }}
            />
        </OppsummeringBlokk>
    );
};

export default Situasjonsoppsummering;
