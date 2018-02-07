import * as React from 'react';
import Dato from 'app/components/dato/Dato';
import { getAntallUttaksdagerITidsperiode } from 'app/utils';
import { Tidsperiode } from 'app/types';

export interface Props {
	tidsperiode: Tidsperiode;
	visDager?: boolean;
}

const TidsperiodeTelst: React.StatelessComponent<Props> = ({ tidsperiode, visDager }) => (
	<div>
		<Dato dato={tidsperiode.startdato} /> - <Dato dato={tidsperiode.sluttdato} />
		{visDager && <span> ({getAntallUttaksdagerITidsperiode(tidsperiode.startdato, tidsperiode.sluttdato)} dager)</span>}
	</div>
);

export default TidsperiodeTelst;