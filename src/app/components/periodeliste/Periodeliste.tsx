import * as React from 'react';
import { Periode } from '../../types';
import PeriodeElement from './PeriodeElement';

import './periodeliste.less';

type onDeleteEvent = (periode: Periode) => void;
type onChangeEvent = (periode: Periode) => void;

interface OwnProps {
    perioder: Periode[];
    onUpdate: onChangeEvent;
    onDelete: onDeleteEvent;
}

const Periodeliste: React.StatelessComponent<OwnProps> = ({ perioder, onDelete, onUpdate }) => {
    if (perioder.length === 0) {
        return <div>Ingen perioder registrert</div>;
    }

    return (
        <ol className="periodeliste">
            {perioder.map((periode: Periode, index: number) => {
                return (
                    <li className="periodeliste__periode" key={periode.id}>
                        <PeriodeElement periode={periode} onDelete={onDelete} onChange={onUpdate} />
                    </li>
                );
            })}
        </ol>
    );
};

export default Periodeliste;
