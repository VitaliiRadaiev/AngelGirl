@@include('files/utils.js');
@@include('files/dynamic_adapt.js');

class App {
	constructor() {
		this.utils = new Utils();
		this.dynamicAdapt = new DynamicAdapt('max');
	}

	init() {
		if (this.utils.isMobile()) {
			document.body.classList.add('mobile');
		}

		if (this.utils.iOS()) {
			document.body.classList.add('mobile-ios');
		}

		this.utils.numberCounterAnim();
		this.utils.initTruncateString();
		this.dynamicAdapt.init();
		this.headerHandler();
		this.popupHandler();
		this.initSmoothScroll();
		this.inputMaskInit();
		this.tabsInit();
		this.selectInit();
		this.spollerInit();

		window.addEventListener('load', () => {
			document.body.classList.add('page-is-load');
			//this.videoHandlerInit();
			this.slidersInit();
			this.componentsScripts();
			this.setFontSize();
		});

	}

	headerHandler() {
		@@include('../common/header/header.js');
	}

	popupHandler() {
		@@include('../common/popup/popup.js');
	}

	slidersInit() {
		@@include('../common/carousel/carousel.js');
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					triggerItems[0].classList.add('tab-active');
					getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');

					triggerItems.forEach(item => {
						item.addEventListener('click', () => {
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if (trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}
	}

	videoHandlerInit() {
		@@include('../common/video/video.js');
	}

	initSmoothScroll() {
		let anchors = document.querySelectorAll('a[href*="#"]:not([data-popup="open-popup"])');
		if (anchors.length) {
			let header = document.querySelector('.header');

			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

				anchor.addEventListener('click', (e) => {
					let el = document.querySelector(`#${id}`);

					if (el) {
						e.preventDefault();
						let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

						if (header) {
							top = top - header.clientHeight;
						}

						window.scrollTo({
							top: top,
							behavior: 'smooth',
						})
					} else {
						e.preventDefault();
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					}
				})

			})
		}

	}

	selectInit() {
		@@include('../common/select/select.js');
	}

	setFontSize() {
		let elements = document.querySelectorAll('[data-set-font-size]');
		if (elements.length) {
			elements.forEach(el => {
				const setFontSize = () => {
					let value = 10 / 1400 * el.clientWidth;
					el.style.fontSize = value + 'px';
				}

				setFontSize();

				window.addEventListener('resize', setFontSize);
			})
		}
	}


	componentsScripts() {
		@@include('../common/promo-header/promo-header.js');
	}

}

window.addEventListener('DOMContentLoaded', function () {
	let app = new App();
	app.init();
});

