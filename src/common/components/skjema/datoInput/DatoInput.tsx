import * as React from 'react';

import NavDatovelger, { DatovelgerAvgrensninger } from 'nav-datovelger';
import { useIntl } from 'react-intl';
import { DatovelgerCommonProps } from 'nav-datovelger/dist/datovelger/Datovelger';
import AriaText from 'common/components/aria/AriaText';
import moment from 'moment';
import { Avgrensninger, Tidsperiode } from 'common/types';
import './datoInput.less';
import { Feil } from 'common/components/skjema/skjemaInputElement/types';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';
import BEMHelper from 'common/util/bem';
import { getAvgrensningerDescriptionForInput } from 'common/components/skjema/datoInput/datoInputDescription';
import SkjemaInputElement from 'common/components/skjema/skjemaInputElement/SkjemaInputElement';

interface ComponentWithAriaLabel {
    label: React.ReactNode;
    ariaLabel: string;
}

export interface DatoInputProps extends DatovelgerCommonProps {
    name: string;
    label: string | ComponentWithAriaLabel;
    dato?: Date;
    postfix?: string;
    feil?: Feil;
    visÅrVelger?: boolean;
    onChange: (dato?: Date) => void;
    datoAvgrensninger?: Avgrensninger;
}

const parseAvgrensinger = (avgrensinger: Avgrensninger): DatovelgerAvgrensninger => {
    return {
        maksDato: dateToISOFormattedDateString(avgrensinger.maksDato),
        minDato: dateToISOFormattedDateString(avgrensinger.minDato),
        helgedagerIkkeTillatt: avgrensinger.helgedagerIkkeTillatt,
        ugyldigeTidsperioder:
            avgrensinger.ugyldigeTidsperioder &&
            avgrensinger.ugyldigeTidsperioder.map((t: Tidsperiode) => ({
                fom: dateToISOFormattedDateString(t.fom)!,
                tom: dateToISOFormattedDateString(t.tom)!,
            })),
    };
};

const bem = BEMHelper('datoInput');
const DatoInput: React.FunctionComponent<DatoInputProps> = ({
    id,
    label,
    postfix,
    feil,
    onChange,
    kalender,
    name,
    dato,
    visÅrVelger,
    datoAvgrensninger,
    ...rest
}) => {
    const intl = useIntl();
    const avgrensningerTekst = rest.avgrensninger
        ? getAvgrensningerDescriptionForInput(intl, rest.avgrensninger)
        : undefined;
    const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;
    const compLabel = typeof label === 'string' ? undefined : (label as ComponentWithAriaLabel);

    return (
        <SkjemaInputElement id={id} feil={feil} label={compLabel ? compLabel.ariaLabel : label}>
            <div className={bem.block}>
                <div className={bem.element('datovelger')}>
                    <NavDatovelger.Datovelger
                        {...rest}
                        valgtDato={dato ? moment.utc(dato).format('YYYY-MM-DD') : undefined}
                        id={id ? id : name}
                        locale={intl.locale}
                        kalender={kalender}
                        visÅrVelger={visÅrVelger}
                        input={{
                            id,
                            placeholder: 'dd.mm.åååå',
                            name,
                            ariaDescribedby: ariaDescriptionId,
                            ariaLabel: compLabel ? compLabel.ariaLabel : undefined,
                            onChange: (datoString: string, evt: any) => {
                                if (moment(datoString, 'DDMMYYYY', true).isValid()) {
                                    onChange(moment.utc(datoString, 'DDMMYYYY').toDate());
                                }

                                if (moment(datoString, 'D.M.YYYY', true).isValid()) {
                                    onChange(moment.utc(datoString, 'D.M.YYYY').toDate());
                                }
                            },
                        }}
                        onChange={(datoString: string) => {
                            const nyDato =
                                datoString && datoString !== 'Invalid date'
                                    ? moment.utc(datoString).toDate()
                                    : undefined;
                            if (dato !== nyDato) {
                                onChange(nyDato);
                            }
                        }}
                        avgrensninger={datoAvgrensninger ? parseAvgrensinger(datoAvgrensninger) : undefined}
                    />
                    {ariaDescriptionId && (
                        <AriaText id={ariaDescriptionId} aria-role="presentation" aria-hidden="true">
                            {avgrensningerTekst}
                        </AriaText>
                    )}
                </div>
                {postfix ? <div className={bem.element('postfix')}>{postfix}</div> : undefined}
            </div>
        </SkjemaInputElement>
    );
};

export default DatoInput;
