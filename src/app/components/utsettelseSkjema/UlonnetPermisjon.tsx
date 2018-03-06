import * as React from 'react';
import IntlTekst from 'app/intl/IntlTekst';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import EksterneLenker from 'app/eksterneLenker';
import Lenke from 'nav-frontend-lenker';
import { Element } from 'nav-frontend-typografi';

export interface Props {}

const UlonnetPermisjon: React.StatelessComponent<Props & InjectedIntlProps> = ({
	intl
}) => {
	return (
		<div>
			<Element tag="h2">
				<IntlTekst id="veileder.ulonnetpermisjon.tittel" />
			</Element>
			<div className="blokkPad-s">
				<p>
					<IntlTekst id="veileder.ulonnetpermisjon.tekst1" />
				</p>
				<p>
					<IntlTekst id="veileder.ulonnetpermisjon.tekst2" />
				</p>
				<Lenke href={EksterneLenker.nav_ulonnetPermisjon} target="_blank">
					{' '}
					<IntlTekst id="veileder.ulonnetpermisjon.navlenketekst" />
				</Lenke>
			</div>
		</div>
	);
};

export default injectIntl(UlonnetPermisjon);