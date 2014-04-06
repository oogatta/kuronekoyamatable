/*global chrome:false*/
(function () {
  var reloadInterval = 3 * 60 * 1000;
  var previousStatus = sessionStorage.getItem('previousStatus');
  var message;

  var checker = {
    toi : function () {
      var trs = document.querySelectorAll('.saisin tr');
      var status = null;
      var packageInfo = '';

      Array.prototype.reduce.call(trs, function (previousSiblingTr, currentTr, index) {
        if ( index % 2 === 1 ) {
          if ( index > 1 ) return;

          status      = currentTr.querySelector('.font14').innerHTML;
          packageInfo = previousSiblingTr.querySelector('.bold').innerHTML;
        }
        return currentTr;
      }, null);

      return {
        status:      status,
        packageInfo: packageInfo
      };
    },
    search : function () {
      var main = document.querySelectorAll('center')[2];

      var status      = main.querySelectorAll('p:last-child table tr:last-child td:first-child')[0].innerText;
      var packageInfo = Array.prototype.map.call(main.querySelectorAll('* > font'), function (font) {
        return font.innerText.replace(/　/g, '');
      }).join(' ');

//      console.log(status);
      return {
        status:      status,
        packageInfo: packageInfo
      };
    }
  };

  var __checker;
  if ( location.href.indexOf('http://toi.kuronekoyamato.co.jp/cgi-bin/tneko') >= 0 ) {
    message = checker.toi();
    __checker = checker.toi;
  }
  else if ( location.href.indexOf('http://search.kuronekoyamato.co.jp/google/tnekog') >= 0 ) {
    message = checker.search();
    __checker = checker.search;
  }

  var sender = function () {
//    console.log(previousStatus + '>>>' + message.status );

    if (previousStatus === null || previousStatus !== message.status) {
      message.action = 'notify';
      message.previousStatus = previousStatus;
      chrome.runtime.sendMessage(message);
      sessionStorage.setItem('previousStatus', message.status);
    }
  };
  sender();

  setInterval(function () {location.reload();}, reloadInterval);

//  setInterval(function () {
//    previousStatus = sessionStorage.getItem('previousStatus');
//    message = __checker();
//    sender();
//  }, 10000);
})();
