import * as React from 'react';
import BEMHelper from 'common/util/bem';
import Sirkelmaske from '../../../../components/sirkelmaske/Sirkelmaske';
import SituasjonForeldrepar from '../../../../components/situasjonForeldrepar/SituasjonForeldrepar';

import './situasjonSirkel.less';
import { ForeldreparSituasjon } from 'shared/types';
import { Forelder } from 'common/types';

interface Props {
    situasjon: ForeldreparSituasjon;
    valgtForelder?: Forelder;
}

const bem = BEMHelper('situasjonSirkel');

const SituasjonSirkel: React.FunctionComponent<Props> = ({ situasjon, valgtForelder }) => {
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>
                <Sirkelmaske diameter="5rem">
                    <SituasjonForeldrepar situasjon={situasjon} kompakt={true} valgtForelder={valgtForelder} />
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default SituasjonSirkel;
