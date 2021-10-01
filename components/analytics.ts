function analytics() {
	if (typeof window === 'object') {
		window.addEventListener('load', () => {
			const isFrench = window.location.host === 'www.offrerechargechevrolet.ca'

			let bp = 'small' // let's keep this real simple
			if (window.innerWidth >= 420) bp = 'medium'
			if (window.innerWidth >= 600) bp = 'large'
			if (window.innerWidth >= 960) bp = 'xlarge'
			if (window.innerWidth >= 1500) bp = 'xxlarge'

			window['digitalData'] = {
				pageInfo: {
					brand: 'chevrolet',
					country: 'canada',
					formName: 'installation request',
					languageSelected: isFrench ? 'french' : 'english',
					orientation:
						window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait',
					pageName: `ch:NA:CA:${isFrench ? 'fr' : 'en'}:t1:index`,
					pageSubType: '',
					pageType: 'forms',
					region: 'north america',
					renderedExperience: bp,
					seoStrategyPageName: document.title,
					siteName: 'microsite_gm qmerit',
					siteSectionsLevel1: 'installation-request-form',
					siteSectionsLevel2: '',
					siteSectionsLevel3: '',
					siteSectionsLevel4: '',
					siteSectionsLevel5: '',
					url: window.location.href,
					viewport: `${window.innerWidth}x${window.innerHeight}`,
				},
			}

			window.dispatchEvent(new Event('analytics-loaded'))
		})
	}
}

export function setAnalytics(name) {
	if (typeof window === 'object') {
		const isFrench = window.location.host === 'www.offrerechargechevrolet.ca'

		const setPageName = () => {
			window['digitalData'].pageInfo.pageName = `ch:NA:CA:${
				isFrench ? 'fr' : 'en'
			}:t1:index:${name}`
			window['digitalData'].pageInfo.siteSectionsLevel2 = name
		}

		if (window['digitalData']) {
			setPageName()
		} else {
			window.addEventListener('analytics-loaded', () => {
				setPageName()
			})
		}
	}
}

export function satelliteTrack(event) {
	console.log('next')
	if (typeof window === 'object' && window['_satellite']) {
		window['_satellite'].track(event)
	}
}

export default analytics
