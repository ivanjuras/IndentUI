/* global jQuery */

;( function( global, $ ) {

    var $global = $( global ),
        breakpointMedium = 1180;

    var indentUI = {
        smoothScrolling: function() {
            var scrollSpeed = 500;

            $('a[href*=#]:not([href=#]):not([href*=#tab])').on( 'click', function(e) {
                e.preventDefault();
                $('html, body').animate(
                    { scrollTop: $(this.hash).offset().top},
                    scrollSpeed
                );
            });
        }, // Smooth scrolling on click event

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
        }, // ButtonToTop scroll to top on click

        hamburgerButtonClick: function() {
            var $btnHamburger = $('.HamburgerButton'),
                $navMenuA = $('.NavMenu'),
                menuToggleSpeed = 400;
            
            $btnHamburger.on( 'click', function() {
                $navMenuA.toggle( menuToggleSpeed );
            });
        }, // HamburgerButton on click

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
        }, // Tab menu on click

        showHideNavMenu: function() {
            var $navMenuA = $('.NavMenu');
            
            $global.on( 'resize', function() {
                $(this).width() >= breakpointMedium ? $navMenuA.show() : $navMenuA.hide();
            });
        } // Show navigation menu on resize
    }; // IndentUI object
    

    // ----------  Call functions ---------- //

    indentUI.smoothScrolling();
    indentUI.scrollTop();
    indentUI.hamburgerButtonClick();
    indentUI.showHideNavMenu();
    indentUI.tabMenuOnClick();


    // ---------- Make IndentUI global ---------- //

    // global.indentUI = indentUI;

}( window, jQuery ));


