
# -------------------- tab-menu--a -------------------- #

tabMenuOnClick = ->
  
  $(".tab-item--a a").on "click", (event) ->
      
      event.preventDefault()

      parentTabItem = $(this).parent(".tab-item--a")
      currentAttr = $(this).attr("href")

      $(".tab" + currentAttr).fadeIn(400).siblings().hide()
      parentTabItem.addClass("is-active").siblings().removeClass("is-active")

tabMenuOnClick()