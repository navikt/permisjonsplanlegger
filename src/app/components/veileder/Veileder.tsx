import * as React from 'react';
import * as classnames from 'classnames';

import './veileder.less';

interface Props {
	ansikt: 'glad' | 'undrende' | 'skeptisk';
	farge?: 'lilla' | 'gronn' | 'bla';
	stil?: 'normal' | 'kompakt';
	className?: string;
}

const Veileder = (props: Props) => {
	const {
		className,
		farge = 'lilla',
		ansikt = 'glad',
		stil = 'normal',
		...rest
	} = props;
	return (
		<svg
			viewBox="0 0 92 92"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			className={classnames(
				'veileder',
				`veileder--tema-${farge}`,
				`veileder--${ansikt}`,
				`veileder--${stil}`,
				props.className
			)}
			{...rest}>
			<title>NAV Veileder</title>
			<defs>
				<circle id="a" cx={46} cy={46} r={46} />
				<path
					d="M58.017 28.867h-.05C57.967 12.924 46.552 0 32.469 0 18.39 0 6.974 12.924 6.974 28.867v.015C6.97 42.497 0 50.282 0 50.282s6.882 8.505 32.47 8.505h.05c25.59 0 32.472-8.505 32.472-8.505s-6.975-7.79-6.975-21.415"
					id="c"
				/>
				<path
					d="M37.813 2.87C43.588 5.927 52 13.389 52 20.323V32c0 6.627-5.373 12-12 12H0V20.323c0-6.657 7.62-13.8 13.28-17.066 1.04 1.77 3.781 8.823 12.126 8.823 8.283 0 12.238-7.459 12.407-9.21z"
					id="e"
				/>
			</defs>
			<g id="VeilederSVG" fill="none" fillRule="evenodd">
				<g id="ansikt">
					<mask id="b" fill="#fff">
						<use xlinkHref="#a" />
					</mask>
					<use id="bakgrunn" fill="#9BD0B0" xlinkHref="#a" />
					<g id="kvinne/-forfra/-B" mask="url(#b)">
						<g id="person" className="veileder-person">
							<g transform="translate(13.417 6.708)">
								<g id="b/damme/-hår/-halvlangt">
									<g id="hårfarge/-brunn">
										<mask id="d" fill="#fff">
											<use xlinkHref="#c" />
										</mask>
										<use id="Mask" fill="#E57F68" xlinkHref="#c" />
										<g
											id="g/hårfarge/-rød"
											mask="url(#d)"
											fill="#D2654C"
											className="hair">
											<path
												d="M0 0h66v76H0z"
												transform="translate(0 -1.925)"
												id="hårfarge/-rød"
											/>
										</g>
									</g>
								</g>
								<g id="Group" transform="translate(6.691 15.333)">
									<path
										d="M13.382 36.103c.977 1.565 3.719 29.064 11.949 29.064 8.232 0 11.948-28.01 11.948-29.468-12.603-7.239-23.897.404-23.897.404z"
										id="Combined-Shape"
										fill="#E7E5E2"
									/>
									<g
										id="b/kropp/sideprofil/-nav-ansatt"
										transform="translate(0 32.583)">
										<mask id="f" fill="#fff">
											<use xlinkHref="#e" />
										</mask>
										<use fill="#D8A25D" xlinkHref="#e" />
										<g id="+20/-Lilla" mask="url(#f)">
											<g transform="translate(-31.778 -19.297)">
												<path id="Fill-58" fill="#5C4378" d="M0 89h121V0H0z" />
											</g>
										</g>
										<g id="nav-id/-kort" mask="url(#f)">
											<g transform="translate(29.852 16.3)" id="NAV-Copy-2">
												<g id="Group-11">
													<g transform="translate(0 .688)" id="Navansatt-dame">
														<path
															d="M15.817 11.23H1.182A1.173 1.173 0 0 1 0 10.064V2.31c0-.643.529-1.165 1.182-1.165h14.635c.653 0 1.183.522 1.183 1.165v7.754c0 .643-.53 1.164-1.183 1.164"
															id="Fill-97"
															fill="#D2242A"
														/>
														<path
															d="M12.15 6.653c0 1.905-1.599 3.45-3.57 3.45-1.976 0-3.575-1.545-3.575-3.45 0-1.904 1.6-3.45 3.574-3.45 1.972 0 3.57 1.546 3.57 3.45"
															id="Fill-98"
															fill="#FFF"
														/>
														<path
															id="Fill-99"
															fill="#FFF"
															d="M3.952 8.174h-.697l.744-1.762h.699z"
														/>
														<path
															id="Fill-100"
															fill="#FFF"
															d="M12.732 8.174H12.3l.745-1.762h.431z"
														/>
														<path
															id="Fill-101"
															fill="#FFF"
															d="M13.924 8.174h-.183l.743-1.762h.182z"
														/>
														<path
															d="M5.866 8.165h.548c.029 0 .05-.02.05-.047v-1.65c0-.026-.021-.047-.05-.047H5.86a.062.062 0 0 0-.064.062l-.218.52c-.013.026.009.058.038.058h.157c.023 0 .043.017.043.042v1.015c0 .026.022.047.05.047"
															id="Fill-102"
															fill="#C52D35"
														/>
														<path
															d="M7.057 8.165h.55c.029 0 .053-.02.053-.047v-1.65c0-.026-.024-.047-.053-.047h-.855a.063.063 0 0 0-.065.062l-.218.52-.076.058h.438c.097 0 .177.075.177.17v.887c0 .026.021.047.05.047"
															id="Fill-103"
															fill="#C52D35"
														/>
														<path
															d="M9.516 6.421h-.55a.049.049 0 0 0-.05.048v1.649c0 .027.023.048.05.048h.556a.062.062 0 0 0 .064-.063l.218-.519c.013-.028-.008-.059-.041-.059H9.61a.042.042 0 0 1-.043-.041V6.469c0-.027-.025-.048-.052-.048"
															id="Fill-104"
															fill="#C52D35"
														/>
														<path
															d="M7.254 8.165h.362a.063.063 0 0 0 .063-.061l.218-.52c.013-.028-.008-.06-.04-.06h-.152l-.45.641z"
															id="Fill-105"
															fill="#C52D35"
														/>
														<path
															d="M10.988 6.421h.654c.032 0 .055.03.041.057l-.692 1.66c-.005.018-.021.028-.04.028h-.592l.586-1.717a.046.046 0 0 1 .043-.028"
															id="Fill-106"
															fill="#C52D35"
														/>
														<path
															d="M10.168 6.421h-.925c-.065 0 .266.062.29.119l.654 1.57a.088.088 0 0 0 .083.056h.561l-.576-1.686a.089.089 0 0 0-.087-.059"
															id="Fill-107"
															fill="#C52D35"
														/>
														<path
															d="M8.96 6.98c0 .352-.045.373-.045.373s-.052-.337-.321-.337c-.265 0-.325.149-.325.26 0 .129.135.25.21.25h.482l-.284.607a.058.058 0 0 1-.053.033h-.22c-.228 0-.826-.29-.826-.851 0-.562.445-.894.815-.894.306 0 .568.203.568.56z"
															id="Fill-108"
															fill="#C52D35"
														/>
														<path
															d="M9.38 2.746H7.862a.2.2 0 0 1-.203-.196v-.246a.2.2 0 0 1 .203-.196h1.516a.2.2 0 0 1 .203.196v.246a.2.2 0 0 1-.203.196"
															id="Fill-109"
															fill="#5A1F57"
														/>
														<path
															id="Fill-110"
															fill="#C2B5CF"
															d="M8.182 2.52h.879V.23h-.879z"
														/>
													</g>
												</g>
											</g>
										</g>
									</g>
									<path
										d="M6.251 11.04s-.1.571-.23.477a1.548 1.548 0 0 0-.58-.118c-.886 0-1.607.746-1.609 1.668l-.008 6.379c-.002.921.715 1.67 1.603 1.671.355 0 .681-.122.948-.326 2.146 10.272 9.798 17.527 18.921 17.542 9.124.015 16.8-7.215 18.976-17.48.266.204.591.329.947.33.888 0 1.609-.746 1.61-1.667l.01-6.38c0-.922-.717-1.67-1.605-1.672-.204 0-.4.044-.58.117C24.079 14.026 16.902 0 16.295 0c0 0-8.605 8.076-10.043 11.04z"
										id="Fill-337-Copy-7"
										fill="#E7E5E2"
									/>
								</g>
							</g>
							<g id="ansikt--undrende" mask="url(#b)">
								<g transform="translate(37.473 33.542)">
									<path
										d="M1.95 3.886C.544 3.96.151 2.51.573 1.561c.08-.18.545-.998 1.368-.998.823 0 1.186.448 1.236.525.605.923.308 2.717-1.229 2.798"
										id="undrende-lefteye"
										className="eye"
										fill="#635E59"
									/>
									<path
										d="M16.653 3.886c1.405.074 1.798-1.377 1.374-2.325-.08-.18-.544-.998-1.367-.998-.822 0-1.185.448-1.236.525-.604.923-.308 2.717 1.23 2.798"
										id="undrende-righteye"
										className="eye"
										fill="#635E59"
									/>
									<path
										d="M10.157 6.404c.84-.127 1.658-.096 2.043.365.936 1.127.667 2.428-.91 3.388-.788.48-1.904.677-2.588.38"
										id="undrende-nose"
										className="nose"
										stroke="#D1BFA3"
										strokeLinecap="round"
									/>
									<path
										d="M3.668 15.882s.716.809 2.71.794l1.996-.016"
										id="undrende-mouth"
										className="mouth"
										stroke="#D19E9C"
										strokeLinecap="round"
									/>
								</g>
							</g>
							<g id="ansikt--glad" mask="url(#b)">
								<g transform="translate(36.502 33.542)">
									<path
										d="M2.257 5.493C.853 5.597.46 3.571.883 2.247c.08-.25.544-1.392 1.368-1.392.822 0 1.185.624 1.235.731.605 1.29.308 3.793-1.229 3.907"
										id="Fill-42"
										className="eye"
										fill="#635E59"
									/>
									<path
										d="M17.932 5.493c1.404.104 1.797-1.922 1.374-3.246-.08-.25-.544-1.392-1.367-1.392s-1.186.624-1.236.731c-.605 1.29-.308 3.793 1.229 3.907"
										id="Fill-44"
										className="eye"
										fill="#635E59"
									/>
									<path
										d="M10.54 7.823c.826-.124 1.39-.046 1.592.196.762.918.519 1.888-.79 2.685-.687.418-1.634.566-2.135.349a.49.49 0 0 0-.64.242c-.11.24.002.52.247.626.828.36 2.102.161 3.041-.41 1.778-1.083 2.185-2.702 1.03-4.091-.49-.588-1.354-.707-2.493-.536a.477.477 0 0 0-.406.542c.041.26.289.437.554.397z"
										id="Stroke-46"
										fill="#D1BFA3"
										className="nose"
										fillRule="nonzero"
									/>
									<path
										d="M16.072 14.75a4.3 4.3 0 0 1-.306.533 6.769 6.769 0 0 1-1.032 1.23c-1.241 1.168-2.857 1.843-4.913 1.78-2.005-.06-3.613-.724-4.874-1.795a7.139 7.139 0 0 1-1.151-1.235 4.308 4.308 0 0 1-.342-.534.49.49 0 0 0-.65-.216.47.47 0 0 0-.22.636c.07.142.21.373.421.665.348.478.781.956 1.305 1.4 1.424 1.21 3.243 1.962 5.481 2.03 2.33.07 4.194-.709 5.615-2.046a7.717 7.717 0 0 0 1.179-1.404 5.16 5.16 0 0 0 .376-.665.471.471 0 0 0-.25-.625.49.49 0 0 0-.64.245z"
										id="Stroke-48"
										fill="#D19E9C"
										className="mouth"
										fillRule="nonzero"
									/>
								</g>
							</g>
							<g id="ansikt--skeptisk" mask="url(#b)">
								<g transform="translate(36.502 33.542)">
									<path
										d="M14.657 15.687c-.117-.207-.343-.49-.698-.769-.654-.512-1.499-.792-2.531-.72l-1.99.138a.478.478 0 0 0-.45.508.482.482 0 0 0 .519.44l1.99-.14c.78-.053 1.386.148 1.855.516.245.192.395.38.455.486a.49.49 0 0 0 .66.187.47.47 0 0 0 .19-.646z"
										id="Stroke-145"
										fill="#D19E9C"
										className="mouth"
										fillRule="nonzero"
									/>
									<path
										d="M2.11 4.205C.705 4.294.312 2.563.736 1.433c.08-.214.544-1.19 1.367-1.19.822 0 1.185.534 1.236.625.604 1.102.307 3.24-1.23 3.337"
										id="Fill-147"
										className="eye"
										fill="#635E59"
									/>
									<path
										d="M17.784 4.205c1.405.089 1.798-1.642 1.375-2.772-.08-.214-.545-1.19-1.368-1.19-.822 0-1.185.534-1.235.625-.605 1.102-.31 3.24 1.228 3.337"
										id="Fill-149"
										className="eye"
										fill="#635E59"
									/>
									<path
										d="M10.392 6.873c.827-.124 1.39-.046 1.592.196.763.918.519 1.888-.789 2.685-.688.419-1.635.566-2.136.349a.49.49 0 0 0-.64.242c-.109.24.002.52.247.626.828.36 2.102.161 3.042-.41 1.777-1.083 2.184-2.702 1.029-4.091-.488-.588-1.353-.707-2.493-.536a.477.477 0 0 0-.405.542c.04.26.288.437.553.397z"
										id="Stroke-151"
										fill="#D1BFA3"
										className="nose"
										fillRule="nonzero"
									/>
								</g>
							</g>
						</g>
					</g>
				</g>
			</g>
		</svg>
	);
};

export default Veileder;
