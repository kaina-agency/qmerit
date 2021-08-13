function analytics() {
	if (typeof window === 'object') {
		window.addEventListener('load', () => {
			const form = document.querySelector('form')
			const orientation =
				window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait'
			const lang =
				window.location.host === 'www.offrerechargechevrolet.ca' ? 'fr' : 'en'
			let bp = 'small' // let's keep this real simple
			if (window.innerWidth >= 420) bp = 'medium'
			if (window.innerWidth >= 600) bp = 'large'
			if (window.innerWidth >= 960) bp = 'xlarge'
			if (window.innerWidth >= 1500) bp = 'xxlarge'

			var digitalData = window['digitalData'] || {
				pageInfo: {},
			}

			digitalData.pageInfo = {
				siteSectionsLevel1: 'welcome',
				url: window.location.href,
				seoStrategyPageName: document.title,
				pageType: 'form',
				languageSelected: lang,
				siteName: document.title,
				brand: 'chevrolet',
				country: 'canada',
				region: 'north america',
				renderedExperience: bp,
				viewport: `${window.innerWidth}x${window.innerHeight}`,
				orientation: orientation,
				formName: 'installation request',
			}

			const observer = new MutationObserver((mutationsList) => {
				const sections = form.querySelectorAll(
					'[class^=form-section_container]'
				)
				const currentSection = sections[sections.length - 1]
				const currentSectionTitle = currentSection
					.querySelector('[class^=form-section_title]')
					['innerText'].toLowerCase()
					.replace(/ /g, '-')

				if (digitalData.siteSectionsLevel1 !== currentSectionTitle) {
					digitalData.siteSectionsLevel1 = currentSectionTitle
					const _satellite = window['_satellite']
					if (_satellite) _satellite.track('next-steps')
				}
			})
			observer.observe(form, {
				attributes: false,
				childList: true,
				subtree: true,
			})
		})
	}
}

export default analytics
