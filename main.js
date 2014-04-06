/*global chrome:false*/
(function(){
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if ( request.action === 'notify' ) {
        var message = request.status;

        if ( request.previousStatus !== null ) {
          message = request.previousStatus + '→' + message;
        }

        webkitNotifications.createNotification(
          'img/RoundIcons-Free-Set-50.png',
          'from kuronekoyamatable',
          message
        ).show();
      }
    }
  );
})();