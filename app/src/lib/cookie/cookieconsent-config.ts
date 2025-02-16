import * as CookieConsent from 'vanilla-cookieconsent';

const config: CookieConsent.CookieConsentConfig = {
	categories: {
		necessary: {
			enabled: true,
			readOnly: true
		},
		analytics: {
			autoClear: {
				cookies: [
					{
						name: /^_ga/ // regex: match all cookies starting with '_ga'
					},
					{
						name: '_gid' // string: exact cookie name
					}
				]
			},

			// https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
			services: {
				ga: {
					label: 'Google Analytics',
					onAccept: () => {},
					onReject: () => {}
				},
				another: {
					label: 'Another service',
					onAccept: () => {},
					onReject: () => {}
				}
			}
		},
		ads: {}
	},

	onFirstConsent: ({ cookie }) => {
		console.log('onFirstConsent fired', cookie);
	},

	onConsent: ({ cookie }) => {
		console.log('onConsent fired!', cookie, CookieConsent.getUserPreferences());
	},

	onChange: ({ changedCategories, changedServices }) => {
		console.log('onChange fired!', changedCategories, changedServices);
	},

	onModalReady: ({ modalName }) => {
		console.log('ready:', modalName);
	},

	onModalShow: ({ modalName }) => {
		console.log('visible:', modalName);
	},

	onModalHide: ({ modalName }) => {
		console.log('hidden:', modalName);
	},

	guiOptions: {
		consentModal: {
			layout: 'box inline',
			position: 'bottom right',
			equalWeightButtons: true,
			flipButtons: false
		},
		preferencesModal: {
			layout: 'box',
			equalWeightButtons: true,
			flipButtons: false
		}
	},

	language: {
		default: 'de',
		translations: {
			de: {
				consentModal: {
					title: 'Wir verwenden Cookies',
					description: 'Diese Website verwendet Cookies, um Ihre Nutzererfahrung zu verbessern und bestimmte Dienste bereitzustellen.',
					acceptAllBtn: 'Alle akzeptieren',
					acceptNecessaryBtn: 'Alle ablehnen',
					showPreferencesBtn: 'Einstellungen verwalten',
					footer: `
						<a target="_blank" href="https://www.freiraumstrategen.com/impressum/">Impressum</a>
						<a target="_blank" href="https://www.freiraumstrategen.com/datenschutz/" target="_blank">Datenschutzerklärung</a>
					`
				},
				preferencesModal: {
					title: 'Cookie-Einstellungen verwalten',
					acceptAllBtn: 'Alle akzeptieren',
					acceptNecessaryBtn: 'Alle ablehnen',
					savePreferencesBtn: 'Auswahl speichern',
					closeIconLabel: 'Schließen',
					serviceCounterLabel: 'Dienst|Dienste',
					sections: [
						{
							title: 'Ihre Datenschutz-Einstellungen',
							description: `In diesem Bereich können Sie Ihre Präferenzen für die Verarbeitung Ihrer personenbezogenen Daten festlegen. Sie können Ihre Auswahl jederzeit überprüfen und ändern, indem Sie dieses Fenster über den entsprechenden Link erneut öffnen. Um bestimmten Verarbeitungsaktivitäten zu widersprechen, schalten Sie die Schalter aus oder nutzen Sie die Schaltfläche "Alle ablehnen" und bestätigen Sie Ihre Auswahl.`
						},
						{
							title: 'Technisch notwendige Cookies',
							description: 'Diese Cookies sind für die grundlegende Funktionalität der Website erforderlich und können nicht deaktiviert werden.',
							linkedCategory: 'necessary'
						},
						{
							title: 'Analyse und Leistung',
							description: 'Diese Cookies sammeln Informationen darüber, wie Sie unsere Website nutzen. Alle Daten werden anonymisiert und können nicht zur Identifizierung Ihrer Person verwendet werden.',
							linkedCategory: 'analytics',
							cookieTable: {
								caption: 'Cookie-Übersicht',
								headers: {
									name: 'Cookie',
									domain: 'Domain',
									desc: 'Beschreibung'
								},
								body: [
									{
										name: '_ga',
										domain: 'yourdomain.com',
										desc: 'Beschreibung 1'
									},
									{
										name: '_gid',
										domain: 'yourdomain.com',
										desc: 'Beschreibung 2'
									}
								]
							}
						},
						{
							title: 'Werbung und Marketing',
							description: 'Diese Cookies werden verwendet, um Werbung für Sie relevanter zu gestalten. Sie dienen dazu, Anzeigen zu schalten, die für Sie interessant und ansprechend sind und damit wertvoller für Herausgeber und Werbetreibende.',
							linkedCategory: 'ads'
						},
						{
							title: 'Weitere Informationen',
							description: 'Bei Fragen zu unseren Cookie-Richtlinien und Ihren Wahlmöglichkeiten <a href="#contact-page">kontaktieren Sie uns</a> bitte.'
						}
					]
				}
			}
		}
	}
};

export default config;
