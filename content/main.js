/*global chrome:false*/
(function () {
  var reloadInterval = 3 * 60 * 1000;
  var previousStatus = sessionStorage.getItem('previousStatus');
  var trs = document.querySelectorAll('.saisin tr');

  var check = function () {
    Array.prototype.reduce.call(trs, function (previousSiblingTr, currentTr, index) {
      if ( index % 2 === 1 ) {
        if ( index > 1 ) return;

        var status = currentTr.querySelector('.font14').innerHTML;

        if (previousStatus === null || previousStatus !== status ) {
          var message = {
            action:         'notify',
            previousStatus: previousStatus,
            status:         status,
            packageInfo:    previousSiblingTr.querySelector('.bold').innerHTML
          };
          chrome.runtime.sendMessage(message);
          sessionStorage.setItem('previousStatus', status);
        }
      }
      return currentTr;
    }, null);
  };

  check();
  setInterval(function () {location.reload();}, reloadInterval);
})();
