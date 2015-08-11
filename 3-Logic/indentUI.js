/* global jQuery */

;( function( global, $ ) {

	// ---------- Global variables ---------- //

		var $global = $( global ),
				breakpointMedium = 1180;


	// ---------- indentUI object ---------- //

	var indentUI = {

		// Smooth scrolling on click
		smoothScrolling: function() {

			var scrollSpeed = 500;

			$('a[href*=#]:not([href=#]):not([href*=#tab])').on( 'click', function(e) {
				e.preventDefault();
				$('html, body').animate(
					{ scrollTop: $(this.hash).offset().top},
					scrollSpeed
				);
			});

		},

		// ButtonToTop scroll to top on click
		scrollTop: function() {

			var $btnToTop = $( '.ToTopButton' ),
					fadeInSpeed = 500,
					fadeOutSpeed = 500,
					toTopScrollSpeed = 300;

			$global.scroll( function() {
				if ( ( $global.scrollTop() > 150 ) && ( $global.width() < breakpointMedium ) ) {
					$btnToTop.fadeIn( fadeInSpeed );
				} else {
					$btnToTop.fadeOut( fadeOutSpeed );
				}
			});

			$btnToTop.on( 'click', function() {
				$( 'html, body' ).animate(
					{ scrollTop: 0 },
					toTopScrollSpeed
				);
			});

		},

		// HamburgerButton on click
		hamburgerButtonClick: function() {

			var $btnHamburger = $('.HamburgerButton'),
					$navMenuA = $('.NavMenu'),
					menuToggleSpeed = 400;
			
			$btnHamburger.on( 'click', function() {
				$navMenuA.toggle( menuToggleSpeed );
			});

		},

		// Tab menu on click
		tabMenuOnClick: function() {

			var $tabItem = $( '.TabMenu-tabItem' ),
					$tabItemLink = $( '.TabMenu-tabLink' ),
					tabContent = '.TabMenu-tabContent',
					fadeInSpeed = 400,
					isActiveClass = 'is-active';

			$tabItemLink.on( 'click', function( e ) {

				var parentTabItem = $( this ).parent( $tabItem ),
						currentAttr = $( this ).attr('href');

				e.preventDefault();
				$( tabContent + currentAttr ).fadeIn( fadeInSpeed ).siblings().hide();
				parentTabItem.addClass( isActiveClass ).siblings().removeClass( isActiveClass );

			});

		},

		// Show navigation menu on resize
		showHideNavMenu: function() {

			var $navMenuA = $('.NavMenu');
			
			$global.on( 'resize', function() {
				if ( $(this).width() >= breakpointMedium ) {
					$navMenuA.show();
				} else {
					$navMenuA.hide();
				}
			});

		}

	};
	

	// ----------  Call functions ---------- //

	indentUI.smoothScrolling();
	indentUI.scrollTop();
	indentUI.hamburgerButtonClick();
	indentUI.showHideNavMenu();
	indentUI.tabMenuOnClick();


	// ---------- Make IndentUI global ---------- //

	// global.indentUI = indentUI;

}( window, jQuery ));


