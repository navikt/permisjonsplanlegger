import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { Row, Column } from 'nav-frontend-grid';
import Block from 'common/components/block/Block';

interface TidsperiodeChangeEvent {
    fom?: Date;
    tom?: Date;
}

interface OwnProps {
    fom: Date | undefined;
    tom: Date | undefined;
    minDato: Date;
    maksDato: Date;
    låstFomDato?: boolean;
    låstTomDato?: boolean;
    tomLabel?: React.ReactNode;
    fomLabel?: React.ReactNode;
    disabled?: boolean;
    footer?: React.ReactNode;
    skjulLåstVerdi?: boolean;
    onChange: (evt: TidsperiodeChangeEvent) => void;
    onSetVarighet?: (dager: number) => void;
    onDisabledFomClick?: () => void;
    onDisabledTomClick?: () => void;
}

type Props = OwnProps & InjectedIntlProps;

const FomTomValg: React.StatelessComponent<Props> = ({
    intl,
    onChange,
    fom,
    tom,
    låstFomDato,
    låstTomDato,
    minDato,
    maksDato,
    fomLabel = 'Startdato',
    tomLabel = 'Sluttdato',
    disabled,
    onDisabledFomClick,
    onDisabledTomClick,
    skjulLåstVerdi,
    footer
}) => {
    const visFomInput = låstFomDato ? skjulLåstVerdi !== true : true;
    const visTomInput = låstTomDato ? skjulLåstVerdi !== true : true;
    return (
        <>
            <Block margin="none">
                <Row>
                    {visFomInput && (
                        <Column xs="12" sm="6">
                            <Block margin="xs">
                                <DatoInput
                                    name="startdato"
                                    label={fomLabel}
                                    dato={fom}
                                    visÅrValger={true}
                                    locale={intl.locale}
                                    id="tidsperiodeFra"
                                    disabled={disabled || låstFomDato}
                                    avgrensninger={{ helgedagerIkkeTillatt: true, minDato, maksDato }}
                                    onChange={(dato) =>
                                        onChange({
                                            fom: dato,
                                            tom
                                        })
                                    }
                                    onDisabledClick={
                                        (disabled || låstFomDato) && onDisabledFomClick
                                            ? () => onDisabledFomClick()
                                            : undefined
                                    }
                                />
                            </Block>
                        </Column>
                    )}
                    {visTomInput && (
                        <Column xs="12" sm="6">
                            <Block margin="xs">
                                <DatoInput
                                    name="sluttdato"
                                    label={tomLabel}
                                    dato={tom}
                                    visÅrValger={true}
                                    locale={intl.locale}
                                    id="tidsperiodeTil"
                                    disabled={disabled || låstTomDato}
                                    dayPickerProps={{ initialMonth: fom }}
                                    avgrensninger={{
                                        helgedagerIkkeTillatt: true,
                                        minDato: fom ? fom : minDato,
                                        maksDato
                                    }}
                                    onChange={(dato) =>
                                        onChange({
                                            fom,
                                            tom: dato
                                        })
                                    }
                                    onDisabledClick={
                                        (disabled || låstTomDato) && onDisabledTomClick
                                            ? () => onDisabledTomClick()
                                            : undefined
                                    }
                                />
                            </Block>
                        </Column>
                    )}
                </Row>
            </Block>
            {footer}
        </>
    );
};

export default injectIntl(FomTomValg);
