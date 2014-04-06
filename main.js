/*global chrome:false*/
(function(){
  var previousStatus = null;

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if ( request.action === 'get_previous_status' ) {
        sendResponse({previousStatus: previousStatus});
      }
      else if ( request.action === 'notify' ) {
        var message = request.status;

        if ( request.previousStatus !== null ) {
          message = request.previousStatus + '→' + message;
        }

        webkitNotifications.createNotification(
          'img/RoundIcons-Free-Set-50.png',
          'from kuronekoyamatable',
          message
        ).show();

        previousStatus = request.status;
      }
    }
  );
})();