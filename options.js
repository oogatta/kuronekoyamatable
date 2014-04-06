(function () {
  var form = document.getElementsByTagName('form')[0];

  form.addEventListener('submit', function (evt) {
    var apiToken = evt.target.elements['api-token'].value;
    var userKey  = evt.target.elements['user-key'].value;
    if( apiToken.length === 0 || userKey.length === 0 ) {
      vex.dialog.alert('どっちも必須項目です。');
    }

    chrome.storage.sync.set({
      apiToken: apiToken,
      userKey:  userKey
    }, function() {
      vex.dialog.alert('保存しました。');
    });

    evt.preventDefault();
  });

  chrome.storage.sync.get({
    apiToken: '',
    userKey:  ''
  }, function(values) {
    form.elements['api-token'].value = values.apiToken;
    form.elements['user-key'].value  = values.userKey;
  });
})();