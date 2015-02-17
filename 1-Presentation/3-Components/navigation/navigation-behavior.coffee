
# -------------------- nav-menu--a behavior -------------------- #

showHideNavMenu = (navMenu, breakpointMedium) ->

  $(window).on "resize", ->
    if $(window).width() >= breakpointMedium
      navMenu.show()
    else
      navMenu.hide()

showHideNavMenu $(".nav-menu--a"), 1180