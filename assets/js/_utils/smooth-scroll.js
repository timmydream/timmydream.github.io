/*
  Safari doesn't support CSS `scroll-behavior: smooth`,
  so here is a compatible sollution for all browser to smooth scrolling

  See: <https://css-tricks.com/snippets/jquery/smooth-scrolling/>

  Warning: It must be called after all `<a>` tags (e.g., the dynamic TOC) are ready.
*/
$(function() {
  $("a[href*='#']")
    .not("[href='#']")
    .not("[href='#0']")
    .click(function(event) {
    /* On-page links */
    if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "")
      && location.hostname === this.hostname) {
      /* Figure out element to scroll to */
      var target = $(this.hash);
      target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);

      if (target.length) {
        /* Only prevent default if animation is actually gonna happen */
        event.preventDefault();

        $("html, body").animate({
          scrollTop: target.offset().top
        }, 800, function() {
          /* Callback after animation
           Must change focus! */
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { /* Checking if the target was focused */
            return false;
          } else {
            $target.attr("tabindex", "-1"); /* Adding tabindex for elements not focusable */
            $target.focus(); /* Set focus again */
          }
        });
      }
    }

  }); /* click() */
});
