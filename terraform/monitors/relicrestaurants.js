/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

var assert = require('assert');
const url = "http://relicrestaurants.uempfel.de"
const address="432 Wiggly Rd, Mountain View, 94043"

$browser.get(url).then(function(){
  // Check the H1 title matches "Example Domain"
  return $browser.findElement($driver.By.xpath("//input[@placeholder='Enter your address']")).then(function(element){
    return element.sendKeys(address).then(function(click){
      return $browser.findElement($driver.By.css(".ant-btn-primary")).click()
    });
  });
});
