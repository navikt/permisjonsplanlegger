import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Radioliste from 'shared/components/radioliste/Radioliste';
import Sporsmal from 'app/elements/sporsmal/Sporsmal';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import { Dekningsgrad, Permisjonsregler } from 'app/types';
import { Infotekster } from 'app/redux/reducers/viewReducer';
import DekningsgradInfo from 'app/components/content/DekningsgradInfo';

export interface OwnProps {
	permisjonsregler: Permisjonsregler;
	dekningsgrad?: Dekningsgrad;
	antallUkerTotalt80: number;
	antallUkerTotalt100: number;
	onChange: (dekningsgrad: Dekningsgrad) => void;
}

type Props = OwnProps & InjectedIntlProps;

const SkjemaDekningsgrad: React.StatelessComponent<Props> = ({
	intl,
	onChange,
	antallUkerTotalt80,
	antallUkerTotalt100,
	permisjonsregler,
	dekningsgrad
}) => (
	<Radioliste
		inputnavn="dekningsgrad"
		tittel={
			<Sporsmal
				info={{
					id: Infotekster.sats,
					label: intlString(intl, 'skjema.veiledning.sats.alttekst')
				}}>
				<IntlTekst id="skjema.label.sats" />
			</Sporsmal>
		}
		beskrivelse={<DekningsgradInfo />}
		valgtVerdi={dekningsgrad}
		onChange={(value) => onChange(value as Dekningsgrad)}
		stil="ekstern"
		kolonner="2"
		valg={[
			{
				tittel: intlString(intl, 'skjema.label.sats100', {
					uker: antallUkerTotalt100
				}),
				verdi: '100%'
			},
			{
				tittel: intlString(intl, 'skjema.label.sats80', {
					uker: antallUkerTotalt80
				}),
				verdi: '80%'
			}
		]}
	/>
);

export default injectIntl(SkjemaDekningsgrad);
