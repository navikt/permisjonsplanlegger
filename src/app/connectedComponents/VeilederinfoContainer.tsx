import * as React from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-collapse';
import { AppState } from 'app/redux/types';

export interface StateProps {
	isOpen: boolean;
}

export interface OwnProps {
	id: string;
}

type Props = StateProps & OwnProps;

const SkjemaVeileder: React.StatelessComponent<Props> = (props) => (
	<Collapse
		isOpened={props.isOpen}
		springConfig={{ stiffness: 250, damping: 30 }}>
		{props.children}
	</Collapse>
);

export default connect((state: AppState, props: OwnProps) => {
	return {
		isOpen: state.view.synligInfo.has(props.id)
	};
})(SkjemaVeileder);