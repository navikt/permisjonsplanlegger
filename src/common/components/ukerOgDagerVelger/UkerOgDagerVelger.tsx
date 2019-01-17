import * as React from 'react';
import { UkerOgDager } from 'app/types';
import { Fieldset, SkjemaGruppe } from 'nav-frontend-skjema';
import { Feil } from 'common/components/skjema/skjemaInputElement/types';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';
import BEMHelper from 'common/utils/bem';

import './ukerOgDagerVelger.less';

interface Props {
    tittel: string;
    uker: number;
    dager: number;
    feil?: Feil;
    onChange: (ukerOgDager: UkerOgDager) => void;
}

const bem = BEMHelper('ukerOgDagerVelger');

const UkerOgDagerVelger: React.StatelessComponent<Props> = ({ uker, dager, feil, tittel, onChange }) => (
    <div className={bem.block}>
        <SkjemaGruppe feil={feil}>
            <Fieldset legend={tittel}>
                <div className={bem.element('ukerOgDager')}>
                    <div className={bem.element('uker')}>
                        <SkjemaNumberStepper
                            tittel="Uker"
                            min={0}
                            value={uker}
                            onChange={(u) => onChange({ uker: u, dager })}
                        />
                    </div>
                    <div className={bem.element('dager')}>
                        <SkjemaNumberStepper
                            tittel="Dager"
                            min={uker > 0 ? -1 : 1}
                            value={dager}
                            onChange={(d) => onChange({ uker, dager: d })}
                        />
                    </div>
                </div>
            </Fieldset>
        </SkjemaGruppe>
    </div>
);

export default UkerOgDagerVelger;