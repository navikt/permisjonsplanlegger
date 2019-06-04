import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import Multibar from 'app/components/multibar/Multibar';
import { UttaksplanHexFarge } from 'common/utils/colors';

interface Props {
    mor: {
        pstAvTotal: number;
        pstBrukt: number;
    };
    felles: {
        pstAvTotal: number;
        pstBruktMor: number;
        pstBruktFar: number;
        pstForMye: number;
    };
    farMedmor: {
        pstAvTotal: number;
        pstBrukt: number;
    };
}
const bem = BEMHelper('fordelingGraf');

const GrafDeltOmsorg: React.StatelessComponent<Props> = ({ mor, farMedmor, felles }) => {
    const childBem = bem.child('graf');
    return (
        <div className={childBem.block}>
            <div className={childBem.element('forelder1')} style={{ width: `${mor.pstAvTotal}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.lilla}
                    leftBar={{
                        width: mor.pstBrukt,
                        color: UttaksplanHexFarge.lilla
                    }}
                />
            </div>
            <div className={childBem.element('felles')} style={{ width: `${felles.pstAvTotal}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.graa}
                    leftBar={{
                        width: felles.pstBruktMor,
                        color: UttaksplanHexFarge.lilla
                    }}
                    rightBar={{
                        width: felles.pstBruktFar,
                        color: UttaksplanHexFarge.blaa
                    }}
                    centerBar={
                        felles.pstForMye > 0
                            ? {
                                  width: felles.pstForMye,
                                  color: UttaksplanHexFarge.rod
                              }
                            : undefined
                    }
                />{' '}
            </div>
            <div className={childBem.element('forelder2')} style={{ width: `${farMedmor.pstAvTotal}%` }}>
                <Multibar
                    borderColor={UttaksplanHexFarge.blaa}
                    rightBar={{
                        width: farMedmor.pstBrukt,
                        color: UttaksplanHexFarge.blaa
                    }}
                />
            </div>
        </div>
    );
};

export default GrafDeltOmsorg;