(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.mobileReadMore = {
    attach: function (context, settings) {

      // todo: restrict to full view mode
      // todo: specify content types

      var pluginName = 'mobileReadMore';
      var defaults = {
        visibleMax: 768
      };

      function MobileReadMore(element, options) {
        this.element = $(element);
        this.wrapper = this.element.parent();
        this.settings = $.extend({}, defaults, options);
        this.defaults = defaults;
        this.init();
      }

      MobileReadMore.prototype = {
        init: function () {
          if (this.isVisible()) {
            this.activate()
              .bindEventClick();
          }

          return this;
        },
        isVisible: function () {
          return !!(window.innerWidth < this.settings.visibleMax);
        },
        activate: function() {
          var wrapper = '<div class="mobile-read-more--wrapper"></div>';
          var overlay = '<div class="mobile-read-more--overlay">' +
            '<div class="mobile-read-more--gradient"></div>' +
            '<div class="mobile-read-more--button">Read More</div>' +
          '</div>';

          this.element
            .wrap(wrapper)
            .parent()
            .append(overlay);

          return this;
        },
        bindEventClick: function() {
          this.wrapper.find('.mobile-read-more--button').on('click.mobileReadMore', function(e) {
            $(e.target).closest('.mobile-read-more--wrapper')
              .css({
                height: 'auto'
              })
              .addClass('mobile-read-more--wrapper--expanded');
          });

          return this;
        }
      };

      $.fn.mobileReadMore = function(options) {
        return this.each(function() {
          if ( !$.data(this, "plugin_" + pluginName) ) {
            $.data(this, "plugin_" + pluginName, new MobileReadMore(this, options) );
          }
        });
      };

      $('.node', context).mobileReadMore();
    }
  };

})(jQuery, Drupal, this, this.document);
