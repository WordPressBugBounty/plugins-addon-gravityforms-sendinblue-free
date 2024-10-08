jQuery(function ($) {
   const { __ } = wp.i18n;

   const disableOptionsInit = function () {
      const container = $(this);
      // Disable some options
      const disableOptions = function (select) {
         select.find('option[value="***disabled***"]').attr('disabled', 'disabled');
      };
      const addFieldLimit = 2;
      const disableAddFieldButton = function () {
         // Add +1 to the limit for the field header
         container.find('.gform-settings-generic-map__table tbody').find('.add_field_choice').prop('disabled',
             container.find('.gform-settings-generic-map__table tbody').find('.gform-settings-generic-map__row').length >= addFieldLimit + 1
         );
      };
      disableOptions(container.find('.gform-settings-generic-map__row select'));
      disableAddFieldButton();
      // Disable select options when a new row is added + disable + button if we already have two rows (email & consent)
      container.find('.gform-settings-generic-map__table tbody').each(function () {
         var targetNode = this;
         var config = { childList: true };
         var observer = new MutationObserver(function(mutationsList) {
            for(var mutation of mutationsList) {
               if (mutation.type == 'childList') {
                  disableOptions($(targetNode).find('select'));
                  disableAddFieldButton();
               }
            }
         });
         observer.observe(targetNode, config);
      });
   };

   $('#gform-settings-section-wpco-sib-integration-settings').each(disableOptionsInit);

   // Append Pro button
   $('#gform-settings-section-wpco-sib-integration-settings .gform-settings-panel__title, #gform-settings-section-sendinblue-add-on-settings .gform-settings-panel__title').append(
       $('<a href="https://wpconnect.co/gravity-forms-sendinblue-add-on" target="_blank" class="button primary dkgfsib-free-btn-pro"></a>').text(__('Upgrade to Pro version', 'addon-gravityforms-sendinblue-free'))
   );
});
