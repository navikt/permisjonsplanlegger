import * as React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';
import BEMHelper from 'common/utils/bem';
import ForelderMeny from './parts/ForelderMeny';
import PeriodetypeMeny from './parts/PeriodetypeMeny';
import { changePeriodeType } from '../../utils/typeUtils';
import VarighetMeny, { VarighetChangeEvent } from './parts/VarighetMeny';
import { SortableHandle } from 'react-sortable-hoc';
import { PeriodelisteElementProps } from './types';
import GraderingMeny from './parts/GraderingMeny';
import PeriodeFargestrek from './parts/periodeFargestrek/periodeFargestrek';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import { OmForeldre, Forelder, Periodetype, Periode } from '../../types';
import { Tidsperioden } from '../../utils/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';

import './periodeElement.less';

type Props = PeriodelisteElementProps;

const bem = BEMHelper('periodeElement');

const DragHandle = SortableHandle(() => (
    <span className="dragHandle">
        <span className="dragHandle__content">::</span>
    </span>
));

const getForelderNavn = (forelder: Forelder | undefined, omForeldre: OmForeldre): string | undefined => {
    if (forelder === undefined || omForeldre === undefined) {
        return;
    }
    if (forelder === Forelder.farMedmor) {
        return omForeldre.farMedmor.navn;
    } else {
        return omForeldre.mor ? omForeldre.mor.navn : undefined;
    }
};

class PeriodeElement extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleChangeVarighet = this.handleChangeVarighet.bind(this);
    }

    handleChangeVarighet(evt: VarighetChangeEvent) {
        const { periode } = this.props;
        const { tidsperiode } = periode;
        const { ukerOgDager, ingenVarighet } = evt;
        if (periode.type === Periodetype.UttakFørTermin) {
            const oppdatertPeriode = {
                ...periode,
                tidsperiode: Tidsperioden(tidsperiode || {}).setUkerOgDagerFlyttStartdato(
                    ukerOgDager.uker,
                    ukerOgDager.dager
                ),
                skalIkkeHaUttakFørTermin: ingenVarighet
            };
            this.props.onUpdate(oppdatertPeriode as Periode);
        } else {
            this.props.onUpdate({
                ...periode,
                tidsperiode: Tidsperioden(tidsperiode || {}).setUkerOgDager(
                    ukerOgDager.uker,
                    ukerOgDager.dager
                ) as Tidsperiode
            });
        }
    }

    render() {
        const {
            sortable,
            typeErLåst,
            forelderErLåst,
            startdatoErLåst,
            sluttdatoErLåst,
            slettErLåst,
            omForeldre,
            onRemove,
            onUpdate
        } = this.props;

        const { uttaksinfo } = this.props.periode;
        const periode = this.props.periode;

        if (uttaksinfo === undefined) {
            return <div>Ingen periodeinfo</div>;
        }

        const { uker, dager } = uttaksinfo.ukerOgDager;
        const foreldernavn = getForelderNavn(periode.forelder, omForeldre);
        const harFlereForelder = omForeldre.antallForeldre > 1;

        return (
            <div className={bem.block}>
                <PeriodeFargestrek farge={getPeriodetypeFarge(this.props.periode.type, this.props.periode.forelder)} />
                <div className={bem.element('periode')}>
                    <PeriodetypeMeny
                        flereForeldre={harFlereForelder}
                        periode={this.props.periode}
                        foreldernavn={foreldernavn}
                        erLåst={typeErLåst}
                        onChange={(periodetype) => onUpdate(changePeriodeType(this.props.periode, periodetype))}
                    />
                </div>
                {this.props.periode.type === Periodetype.GradertUttak && (
                    <div className={bem.element('gradering')}>
                        <GraderingMeny
                            foreldernavn={omForeldre.antallForeldre === 2 ? foreldernavn : 'du'}
                            gradering={this.props.periode.gradering}
                            onChange={(gradering) => onUpdate({ ...this.props.periode, gradering })}
                        />
                    </div>
                )}
                {harFlereForelder && (
                    <div className={bem.element('forelder')}>
                        <ForelderMeny
                            forelder={this.props.periode.forelder}
                            omForeldre={omForeldre}
                            erLåst={forelderErLåst}
                            onChange={(forelder) =>
                                onUpdate({
                                    ...this.props.periode,
                                    forelder
                                })
                            }
                        />
                    </div>
                )}
                <div className={bem.element('tidsperiode')}>
                    <VarighetMeny
                        tidsperiode={this.props.periode.tidsperiode}
                        startdatoErLåst={startdatoErLåst}
                        sluttdatoErLåst={sluttdatoErLåst}
                        uker={uker}
                        dager={dager}
                        minDager={periode.type === Periodetype.UttakFørTermin ? 0 : 1}
                        onTidsperiodeChange={(tidsperiode) => {
                            onUpdate({
                                ...this.props.periode,
                                tidsperiode
                            });
                        }}
                        onVarighetChange={this.handleChangeVarighet}
                        ingenVarighet={
                            this.props.periode.type === Periodetype.UttakFørTermin
                                ? this.props.periode.skalIkkeHaUttakFørTermin
                                : undefined
                        }
                    />
                </div>
                {(slettErLåst !== true || sortable) && (
                    <div className={bem.element('tools')}>
                        {sortable && (
                            <div className={bem.element('tool')}>
                                <DragHandle />
                            </div>
                        )}
                        {slettErLåst !== true && (
                            <Lukknapp
                                onClick={() => onRemove(this.props.periode)}
                                ariaLabel="Slett periode"
                                title="Slett periode">
                                Slett periode
                            </Lukknapp>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default PeriodeElement;
