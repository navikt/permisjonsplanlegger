import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Checkbox, Radio, SkjemaGruppe } from 'nav-frontend-skjema';

export default class TransformingRadioGroup extends Component {
	radioGroupClsNames() {
		return classNames('transformingRadioGroup', {
			'transformingRadioGroup--expanded': this.props.expanded === true,
			'transformingRadioGroup--collapsed': this.props.collapsed === true
		});
	}

	renderCollapsed() {
		const checkboxAttrs = this.props.stage.values.find(
			(el) => el.value === this.props.stage.selectedValue
		);
		return (
			<Checkbox
				defaultChecked
				{...checkboxAttrs}
				onClick={($e) => {
					this.props.onClickCollapsed($e, this.props.stage);
				}}
			/>
		);
	}

	renderExpanded() {
		const { name, values } = this.props.stage;
		return values.map((radioAttrs) => (
			<div className="transformingRadioGroup__option" key={radioAttrs.value}>
				<Radio
					name={name}
					onClick={($e) => {
						this.props.onClickExpanded($e, radioAttrs.value);
					}}
					{...radioAttrs}
				/>
			</div>
		));
	}

	render() {
		const { collapsed, expanded } = this.props;
		return (
			<div className={this.radioGroupClsNames()}>
				<SkjemaGruppe title={this.props.stage.legend}>
					{expanded && this.renderExpanded()}
					{collapsed && this.renderCollapsed()}
				</SkjemaGruppe>
			</div>
		);
	}
}

TransformingRadioGroup.propTypes = {
	collapsed: PropTypes.bool,
	expanded: PropTypes.bool,
	stage: PropTypes.shape({
		legend: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		values: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired
			}).isRequired
		).isRequired,
		selectedValue: PropTypes.string
	}).isRequired,
	onClickCollapsed: PropTypes.func,
	onClickExpanded: PropTypes.func
};

TransformingRadioGroup.defaultProps = {
	onClickCollapsed: () => {},
	onClickExpanded: () => {},
	collapsed: false,
	expanded: false
};
