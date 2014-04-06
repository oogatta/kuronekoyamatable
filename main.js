/*global chrome:false*/
(function(){
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if ( request.action === 'notify' ) {
        var message     = request.status;
        var packageInfo = request.packageInfo;

        if ( request.previousStatus !== null ) {
          message = request.previousStatus + '→' + message;
        }

        webkitNotifications.createNotification(
          'img/RoundIcons-Free-Set-50-48.png',
          'from kuronekoyamatable',
          packageInfo + '\n' + message
        ).show();

        chrome.storage.sync.get({
          apiToken: '',
          userKey:  ''
        }, function(values) {
          if (values.apiToken.length > 0) {
            if (values.userKey.length) {
              var xhr = new XMLHttpRequest();
              xhr.open('POST', 'https://api.pushover.net/1/messages.json', true);
              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                }
              };
              xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
              xhr.send('token=' + encodeURIComponent(values.apiToken) + '&user=' + encodeURIComponent(values.userKey) + '&message=' + encodeURIComponent(packageInfo + '\n' + message));
            }
          }
        });
      }
    }
  );
})();