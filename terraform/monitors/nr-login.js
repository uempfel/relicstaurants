var assert = require('assert');
var defaultTimeout = 3000;
$browser.get('https://login.newrelic.com').then(function () {
  $browser.waitForAndFindElement($driver.By.id('login_email'), defaultTimeout).then(function (loginEmail) {
    loginEmail.sendKeys($secure.NR_EMAIL).then(function () {
      $browser.waitForAndFindElement($driver.By.id('login_password'), defaultTimeout).then(function (passInput) {
        passInput.sendKeys($secure.NR_PASSWORD).then(function () {
          $browser.waitForAndFindElement($driver.By.id('login_submit'), defaultTimeout).then(function (loginButton) {
            loginButton.click();
          })
        })
      })
    })
  })
})