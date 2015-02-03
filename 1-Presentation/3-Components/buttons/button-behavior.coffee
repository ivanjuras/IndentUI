
# -------------------- btn--to-top behavior -------------------- #

scrolltoTop = (breakpointMedium) ->

  $(window).scroll ->
    if ($(window).scrollTop() > 150) and($(window).width() < breakpointMedium)
      $(".btn--to-top").fadeIn(500)
    else
      $(".btn--to-top").fadeOut(500)

  $(".btn--to-top").click ->
    if (navigator.userAgent.indexOf('MSIE') isnt -1 or navigator.appVersion.indexOf('Trident/') > 0) and $(window).width() < breakpointMedium
      $("html, body").scrollTop(0)
    else
      $("html, body").animate
        scrollTop: 0
      ,
      500
      
scrolltoTop 1080


# -------------------- btn--hamburger behavior -------------------- #

hamburgerButtonClick = (hamburgerButton, navMenu) ->
  
  hamburgerButton.on "click", ->
    navMenu.toggle(400)

hamburgerButtonClick $(".btn--hamburger"), $(".nav-menu--a")