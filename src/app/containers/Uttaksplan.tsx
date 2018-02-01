import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Tidslinje from 'app/components/tidslinje/Tidslinje';
import Skjema from './Skjema';
import { AppState, UtsettelseState, DispatchProps, FormState } from 'app/redux/types';
import { TidslinjeInnslag } from 'app/components/tidslinje/types';
import { periodeSelector, tidslinjeFraPerioder } from 'app/selectors/tidslinjeSelector';
import Veileder from 'shared/components/veileder/Veileder';
import UtsettelseDialog from 'app/containers/UtsettelseDialog';
import { Periode } from 'app/types';
import { toggleMockUtsettelse } from 'app/redux/actions';
import { Knapp } from 'nav-frontend-knapper';

export interface StateProps {
	form: FormState;
	innslag: TidslinjeInnslag[];
	perioder: Periode[];
	utsettelse: UtsettelseState;
	visTidslinje: boolean;
}

export type Props = StateProps & RouteComponentProps<{}> & DispatchProps;

export class Uttaksplan extends React.Component<Props> {
	render() {
		return (
			<div>
				<div className="introtekst">
					<div className="introtekst__veileder">
						<Veileder type="intro" svgClassName="veilederSvg" />
					</div>
					<p>
						Hei, hver forelder har rett på 14 uker permisjon hver. I tillegg har dere enten 28 eller 18 uker dere kan
						fordele mellom dere basert på den totale permisjonslengden dere velger, som er 59 uker eller 49 uker.
					</p>
				</div>

				<div className="blokk-m">
					<Skjema />
				</div>

				<div className="blokk-m">
					<UtsettelseDialog />
				</div>

				{this.props.visTidslinje && (
					<div>
						<div className="blokk-m">
							<Knapp type="standard" onClick={() => this.props.dispatch(toggleMockUtsettelse())}>
								0
							</Knapp>
							<Knapp type="standard" onClick={() => this.props.dispatch(toggleMockUtsettelse('1'))}>
								1
							</Knapp>
							<Knapp type="standard" onClick={() => this.props.dispatch(toggleMockUtsettelse('2'))}>
								2
							</Knapp>
						</div>
						<Tidslinje innslag={this.props.innslag} />
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	const innslag = tidslinjeFraPerioder(state);
	const perioder = periodeSelector(state);
	return {
		innslag,
		perioder,
		form: state.form,
		utsettelse: state.utsettelse,
		visTidslinje: innslag && innslag.length > 0 && state.form.dekningsgrad !== undefined
	};
};

export default connect(mapStateToProps)(withRouter(Uttaksplan));
