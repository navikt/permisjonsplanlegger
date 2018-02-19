declare module 'nav-frontend-typografi' {
	import * as React from 'react';

	export interface Props {
		className?: string;
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
	}

	export class Sidetittel extends React.Component<Props, {}> {}
	export class Innholdstittel extends React.Component<Props, {}> {}
	export class Systemtittel extends React.Component<Props, {}> {}
	export class Undertittel extends React.Component<Props, {}> {}
	export class Normaltekst extends React.Component<Props, {}> {}
	export class EtikettLiten extends React.Component<Props, {}> {}
	export class Element extends React.Component<Props, {}> {}
	export class UndertekstBold extends React.Component<Props, {}> {}
}
