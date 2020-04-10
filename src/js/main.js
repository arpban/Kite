jQuery(document).ready(function () {
  /* Search */
  jQuery('#site-header-search-toggle').on('click', function () {
    jQuery('.block-search').toggleClass('active')
  })
  jQuery('#search-view-close').on('click', function () {
    jQuery('.block-search').removeClass('active')
  })
})
