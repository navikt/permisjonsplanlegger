import * as React from 'react';
import * as classnames from 'classnames';

import { RadioProps, Feil, SkjemaGruppe } from 'nav-frontend-skjema';
import EkspanderbartInnhold from 'shared/components/ekspanderbartInnhold/EkspanderbartInnhold';
import { RadioPanel } from 'nav-frontend-skjema';

type RadiolisteValgVerdi = string | number | undefined;

type RadiolisteChangeEvent = (verdi: RadiolisteValgVerdi) => void;

type RadiobuttonStil = 'intern' | 'ekstern';

export interface RadiolisteValg {
	tittel: string;
	verdi: string;
	radioProps?: RadioProps;
	detailsRenderer?: () => React.ReactNode;
}

export interface Props {
	valg: RadiolisteValg[];
	inputnavn: string;
	tittel: string | React.ReactNode;
	beskrivelse?: React.ReactNode;
	valgtVerdi?: RadiolisteValgVerdi;
	onChange: RadiolisteChangeEvent;
	feil?: Feil;
	stil?: RadiobuttonStil;
	kolonner?: '1' | '2';
}

interface RadiolisteRadioProps extends RadiolisteValg {
	/** Navn på inputelementene i listen */
	navn: string;
	/** Om radio er valgt */
	valgt: boolean;
	/** Kall når en radio velges */
	onChange: () => void;
	/** Ekstrainfo som vises når den er valt */
	detailsRenderer?: () => React.ReactNode;
}

const RadiolisteRadio: React.StatelessComponent<RadiolisteRadioProps> = ({
	navn,
	tittel,
	verdi,
	valgt,
	onChange,
	detailsRenderer,
	radioProps
}) => (
	<div>
		<RadioPanel
			value={verdi}
			name={navn}
			label={<span className="satsValg">{tittel}</span>}
			checked={valgt}
			onChange={() => onChange()}
			inputProps={{ 'data-ref': `${navn}_${verdi}` }}
		/>
		{detailsRenderer && (
			<div aria-live="polite">
				<EkspanderbartInnhold erApen={valgt}>
					{valgt && (
						<div className="radioliste__radio__details">
							{detailsRenderer()}
						</div>
					)}
				</EkspanderbartInnhold>
			</div>
		)}
	</div>
);

const Radioliste: React.StatelessComponent<Props> = ({
	valg,
	valgtVerdi,
	inputnavn,
	feil,
	tittel,
	beskrivelse,
	onChange,
	stil,
	kolonner
}) => {
	const cls = classnames('radioliste', {
		'radioliste--ekstern': stil === 'ekstern',
		'radioliste--toKolonner': kolonner === '2'
	});
	return (
		<SkjemaGruppe feil={feil}>
			<fieldset className={cls}>
				<legend>{tittel}</legend>
				{beskrivelse && (
					<div className="radioliste__beskrivelse">{beskrivelse}</div>
				)}
				<div className="radioliste__radioer">
					{valg.map((option) => (
						<div
							className="radioliste__radiowrapper"
							key={`${inputnavn}${option.verdi}`}>
							<div className="radioliste__radio">
								<RadiolisteRadio
									{...option}
									navn={inputnavn}
									valgt={valgtVerdi === option.verdi}
									onChange={() => onChange(option.verdi)}
								/>
							</div>
						</div>
					))}
				</div>
			</fieldset>
		</SkjemaGruppe>
	);
};

export default Radioliste;
