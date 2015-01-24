
# -------------------- nav-menu--a behavior -------------------- #

showHideNavMenu = (navMenu) ->

  $(window).on "resize", ->
      if $(window).width() >= 1080
          navMenu.show()
      else
          navMenu.hide()

showHideNavMenu $(".nav-menu--a")