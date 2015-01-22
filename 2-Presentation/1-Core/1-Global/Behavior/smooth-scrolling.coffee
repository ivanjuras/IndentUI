
# -------------------- Smooth scrolling behavior -------------------- #

smoothScrolling = ($breakpointMedium, $breakPointSmall) ->

  $("a[href*=#]:not([href=#])").on "click", (event) ->
    event.preventDefault()
    if (navigator.userAgent.indexOf('MSIE') isnt -1 or navigator.appVersion.indexOf('Trident/') > 0) and $(window).width() < $breakpointMedium
      $("html, body").scrollTop $(@.hash).offset().top
    else
      $("html, body").animate
        scrollTop: $(@.hash).offset().top
      ,
      500
    console.log(nepostojim)

smoothScrolling 1080, 400