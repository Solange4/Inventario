(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			global: {
				href: 'css/style.css',
				containers: 1400,
				grid: { gutters: ['2em', 0] }
			},
			xlarge: {
				media: '(max-width: 1680px)',
				href: 'css/style-xlarge.css',
				containers: 1200
			},
			
			small: {
				media: '(max-width: 736px)',
				href: 'css/style-small.css',
				containers: '90%!',
				grid: { gutters: ['1.25em', 0] }
			},
			
		},
		plugins: {
			layers: {
				config: {
					mode: 'transform'
				},
				navButton: {
					breakpoints: 'medium',
					height: '4em',
					html: '<span class="toggle" data-action="toggleLayer" data-args="navPanel"></span>',
					position: 'top-left',
					side: 'top',
					width: '6em'
				},
				navPanel: {
					animation: 'overlayX',
					breakpoints: 'medium',
					clickToHide: true,
					height: '100%',
					hidden: true,
					html: '<div data-action="moveElement" data-args="nav"></div>',
					orientation: 'vertical',
					position: 'top-left',
					side: 'left',
					width: 250
				}
			}
		}
	});

})(jQuery);