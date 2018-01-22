import * as React from 'react';
import { connect } from 'react-redux';

import { Input } from 'nav-frontend-skjema';
import { AppState } from 'app/redux/reducers';
import { FormState } from 'app/redux/reducers/form';

import { DispatchProps } from '../redux/reduxTypes';
import { setNavnForelder1, setNavnForelder2, settTermindato } from '../redux/actions';
import DateInput from 'shared/components/date-input/DateInput';

export interface StateProps {
	form: FormState;
}

type Props = StateProps & DispatchProps;

class Skjema extends React.Component<Props> {
	render() {
		const { dispatch, form } = this.props;
		return (
			<div className="planlegger-skjema">
				<Input
					name="navnforelder1"
					label="Forelder 1"
					value={form.navnForelder1}
					onChange={(e: any) => dispatch(setNavnForelder1(e.target.value))}
				/>
				<Input
					name="navnforelder2"
					label="Forelder 2"
					value={form.navnForelder2}
					onChange={(e: any) => dispatch(setNavnForelder2(e.target.value))}
				/>
				<DateInput
					id="input-termindato"
					input={{ value: form.termindato }}
					label="Termindato"
					onChange={(e) => dispatch(settTermindato(e.value))}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => {
	return {
		form: state.form
	};
};

export default connect<StateProps, {}>(mapStateToProps)(Skjema);
