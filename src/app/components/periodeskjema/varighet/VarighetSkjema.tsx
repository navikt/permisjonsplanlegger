import * as React from 'react';
import DatoInput from 'common/components/skjema/datoInput/DatoInput';
import { Checkbox } from 'nav-frontend-skjema';
import Block from 'common/components/block/Block';
import TabPanel from 'common/components/tabPanel/TabPanel';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { getUkerOgDagerFromDager, formaterDato, formaterDatoUtenDag } from 'common/utils/datoUtils';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import DropdownDialogTittel from '../../periodeliste/parts/DropdownDialogTittel';
import Varighet from '../../varighet/Varighet';
import { Periode, Periodetype } from '../../../types';
import { Periodene } from '../../../utils/Periodene';
import AlertStripe from 'nav-frontend-alertstriper';
import LinkButton from 'common/components/linkButton/LinkButton';
import { getDagerGradert } from '../../../utils/forbrukUtils';
import { Element } from 'nav-frontend-typografi';

export interface VarighetChangeEvent {
    ingenVarighet?: boolean;
    dager?: number;
}

export interface VarighetSkjemaProps {
    tidsperiode: Partial<Tidsperiode>;
    minDato?: Date;
    maksDato?: Date;
    antallUttaksdager?: number;
    antallUttaksdagerBrukt?: number;
    ingenVarighet?: boolean;
    perioder: Periode[];
    erNyPeriode: boolean;
    periodetype: Periodetype | undefined;
    nesteUttaksdag?: Date;
    gjenståendeDager?: number;
    gradering?: number;
    onTidsperiodeChange: (tidsperiode: Partial<Tidsperiode>) => void;
    onVarighetChange: (evt: VarighetChangeEvent) => void;
}

type Props = VarighetSkjemaProps;

interface State {
    varighetEllerSluttdato: 'sluttdato' | 'varighet';
}

const getKonsekvensNyPeriodeInniPlan = (perioder: Periode[], dato: Date): React.ReactNode => {
    const berørtPeriode = Periodene(perioder).finnPeriodeMedDato(dato);
    if (berørtPeriode) {
        return (
            <Block marginTop="xs">
                <AlertStripe type="info">
                    Dager etter <strong>{formaterDato(dato)}</strong> vil bli forskjøvet tilsvarende varigheten på denne
                    perioden
                </AlertStripe>
            </Block>
        );
    }
    return null;
};

const VarighetStartdato: React.StatelessComponent<Props> = ({
    onTidsperiodeChange,
    tidsperiode,
    minDato,
    maksDato,
    periodetype,
    erNyPeriode
}) => {
    const låstStartdato = periodetype !== Periodetype.UttakFørTermin && erNyPeriode === false;
    return (
        <>
            <Block margin={låstStartdato ? 's' : 'none'}>
                <DatoInput
                    id="fom"
                    name="fom"
                    label={låstStartdato ? 'Perioden starter:' : 'Når skal perioden starte?'}
                    visÅrValger={true}
                    dato={tidsperiode.fom}
                    disabled={låstStartdato}
                    avgrensninger={{ minDato, maksDato, helgedagerIkkeTillatt: true }}
                    onChange={(dato) => onTidsperiodeChange({ fom: dato, tom: tidsperiode.tom })}
                />
            </Block>
            {låstStartdato && (
                <div className="comment">
                    Startdato bestemmes ut fra når foregående periode slutter. For å endre denne periodens startdato, må
                    du endre sluttdatoen på den foregående.
                </div>
            )}
        </>
    );
};

const VarighetSluttdato: React.StatelessComponent<Props> = ({
    onTidsperiodeChange,
    tidsperiode,
    minDato,
    maksDato
}) => {
    return (
        <DatoInput
            id="tom"
            name="tom"
            label="Sluttdato"
            visÅrValger={true}
            dato={tidsperiode.tom}
            avgrensninger={{ minDato: tidsperiode.fom || minDato, maksDato, helgedagerIkkeTillatt: true }}
            onChange={(dato) => onTidsperiodeChange({ tom: dato, fom: tidsperiode.fom })}
        />
    );
};

const VarighetStartdatoFørTermin: React.StatelessComponent<Props> = (props) => {
    const { ingenVarighet, onVarighetChange } = props;
    return (
        <Block margin="s">
            <DropdownDialogTittel>Når ønsker du å starte uttaket før termin?</DropdownDialogTittel>
            <Block margin="s">
                <VarighetStartdato {...props} />
            </Block>
            <Checkbox
                label="Jeg skal ikke ha uttak før termin"
                checked={ingenVarighet === true || false}
                onChange={(evt) => onVarighetChange({ ingenVarighet: evt.target.checked })}
            />
        </Block>
    );
};

const UttaksdagerInfo: React.StatelessComponent<Props> = ({ antallUttaksdager, antallUttaksdagerBrukt }) => {
    if (antallUttaksdager !== undefined && antallUttaksdager > 0) {
        return (
            <Block margin="xs">
                Varighet:{' '}
                <strong>
                    <Varighet dager={antallUttaksdager} separator={' og '} />
                </strong>
                .{' '}
                {antallUttaksdagerBrukt && antallUttaksdagerBrukt !== antallUttaksdager && (
                    <>
                        Dager med foreldrepenger:{' '}
                        <strong>
                            <Varighet dager={antallUttaksdagerBrukt} separator={' og '} />
                        </strong>
                        .
                    </>
                )}
            </Block>
        );
    }
    return null;
};

class VarighetSkjema extends React.Component<Props, State> {
    render() {
        const {
            onVarighetChange,
            antallUttaksdager,
            antallUttaksdagerBrukt,
            tidsperiode,
            onTidsperiodeChange,
            nesteUttaksdag,
            perioder,
            erNyPeriode,
            gjenståendeDager,
            periodetype,
            gradering
        } = this.props;
        const { uker, dager } = getUkerOgDagerFromDager(antallUttaksdager || 0);
        const { fom } = tidsperiode;

        if (periodetype === Periodetype.UttakFørTermin) {
            return <VarighetStartdatoFørTermin {...this.props} />;
        }
        return (
            <div>
                <DropdownDialogTittel>Velg tid</DropdownDialogTittel>
                <Block>
                    <VarighetStartdato {...this.props} />
                    {fom === undefined && nesteUttaksdag !== undefined && (
                        <Block marginTop="xs">
                            Neste dag:{' '}
                            <LinkButton
                                onClick={() => onTidsperiodeChange({ fom: nesteUttaksdag, tom: tidsperiode.tom })}>
                                {formaterDatoUtenDag(nesteUttaksdag)}
                            </LinkButton>
                        </Block>
                    )}
                    {fom && erNyPeriode && getKonsekvensNyPeriodeInniPlan(perioder, fom)}
                </Block>
                <Block visible={tidsperiode.fom !== undefined} margin="s">
                    <Block margin="xs">
                        <Element>Når skal perioden slutte?</Element>
                    </Block>
                    <TabPanel
                        tabs={[
                            {
                                label: 'Velg sluttdato',
                                contentRenderer: () => (
                                    <>
                                        <Block margin="s">
                                            <VarighetSluttdato {...this.props} />
                                        </Block>
                                        <UttaksdagerInfo {...this.props} />
                                    </>
                                )
                            },
                            {
                                label: 'Velg varighet',
                                contentRenderer: () => (
                                    <>
                                        <Block margin="s">
                                            <UkerOgDagerVelger
                                                tittel="Varighet"
                                                dager={dager}
                                                uker={uker}
                                                minDager={1}
                                                onChange={(ukerOgDager) =>
                                                    onVarighetChange({
                                                        dager: ukerOgDager.dager + ukerOgDager.uker * 5
                                                    })
                                                }
                                            />
                                        </Block>
                                        {tidsperiode.tom && (
                                            <Block margin="xs">
                                                Siste dag blir <strong>{formaterDato(tidsperiode.tom)}</strong>.
                                            </Block>
                                        )}
                                        {gjenståendeDager !== undefined &&
                                            gjenståendeDager > 0 &&
                                            (antallUttaksdager === undefined ||
                                                (antallUttaksdagerBrukt !== undefined &&
                                                    antallUttaksdagerBrukt !== gjenståendeDager)) && (
                                                <LinkButton
                                                    onClick={() =>
                                                        onVarighetChange({
                                                            dager: getDagerGradert(gjenståendeDager, gradering)
                                                        })
                                                    }>
                                                    Bruk gjenstående dager
                                                </LinkButton>
                                            )}
                                    </>
                                )
                            }
                        ]}
                    />
                </Block>
            </div>
        );
    }
}

export default VarighetSkjema;