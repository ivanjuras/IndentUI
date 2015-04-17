
(function( global, $ ) {

	// -------------------- Global variables -------------------- // 
		var $global = $( global ),
				breakpointMedium = 1180;


	// -------------------- indentUI object -------------------- // 
	var indentUI = {

		// On click - smooth scrolling
		smoothScrolling: function() {

			var scrollSpeed = 500;

			$('a[href*=#]:not([href=#]):not([href*=#tab])').on( 'click', function(e) {
				e.preventDefault();
				$('html, body').animate( {scrollTop: $(this.hash).offset().top} , scrollSpeed );
			});

		},

		// On click - button scroll to top
		scrollTop: function() {

			var $btnToTop = $( '.Button--toTop' ),
					fadeInSpeed = 500,
					fadeOutSpeed = 500,
					toTopScrollSpeed = 300;

			$global.scroll(function() {
				if ( ( $global.scrollTop() > 150 ) && ( $global.width() < breakpointMedium ) ) {
					$btnToTop.fadeIn( fadeInSpeed );
				} else {
					$btnToTop.fadeOut( fadeOutSpeed );
				}
			});

			$btnToTop.on( 'click', function() {
				$( 'html, body' ).animate( { scrollTop: 0 }, toTopScrollSpeed );
			});

		},

		// On click - hamburger button
		hamburgerButtonClick: function() {

			var $btnHamburger = $('.Button--hamburger'),
					$navMenuA = $('.NavMenu'),
					menuToggleSpeed = 400;
			
			$btnHamburger.on( 'click', function() {
				$navMenuA.toggle( menuToggleSpeed );
			});

		},

		// On click - tab menu
		// tabMenuOnClick: function() {

		// 	var $tabItem = $( '.TabMenu-tabItem' ),
		// 			$tabItemLink = $( '.TabMenu-tabLink' ),
		// 			tabContent = '.TabMenu-tabContent',
		// 			fadeInSpeed = 400,
		// 			isActiveClass = 'is-active';

		// 	$tabItemLink.on( 'click', function( e ) {
		// 		e.preventDefault();
		// 		var parentTabItem = $(this).parent( $tabItem ),
		// 				currentAttr = $(this).attr('href');
		// 		$( tabContent + currentAttr ).fadeIn( fadeInSpeed ).siblings().hide();
		// 		parentTabItem.addClass( isActiveClass ).siblings().removeClass( isActiveClass );
		// 	});

		// },

		// On resize - show hide navigation menu a 
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
	

	// -------------------- Call functions -------------------- // 
	indentUI.smoothScrolling();
	indentUI.scrollTop();
	indentUI.hamburgerButtonClick();
	indentUI.showHideNavMenu();
	indentUI.tabMenuOnClick();


	// -------------------- Make IndentUI global -------------------- // 
	// global.indentUI = indentUI;

}( window, jQuery ));


