// test.js

// Import requirement packages
require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');

describe('Now testing marksandspicy.com...', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
	});
	
    afterEach(async function(){
	await driver.sleep(2000);
	});
	
    it('test 1 running...', async function() {
        // Load the page
		await driver.get('https://marksandspicy.com/my-account');
		
		// click on email textbox & add email
		await driver.findElement(By.id('email')).click();
		await driver.findElement(By.id("email")).sendKeys('test@test.com');
	   
		// click on password textbox & add password
		await driver.findElement(By.id('passwd')).click();
		await driver.findElement(By.id("passwd")).sendKeys("ThisIs@T3st");
		
		// submit button
		await driver.findElement(By.id('SubmitLogin')).click();
		await driver.sleep(2000);
		await driver.wait(until.elementLocated(By.className("alert-danger")), 10000);
		if (driver.findElements(By.className("alert-danger")).length !== 0) {
			driver.findElements(By.className("alert-danger")).then(async function(elements){
				console.log("Test 1 : login issue");
				await elements.forEach(async function (element) {
					await element.getText().then(async function(text){
					await console.log(text);
					});
				});	
			});
		} 
		else console.log("Test 1 : no login error found");
    })

/*  it('test 2 running...', async function() {
        // Load the page
		await driver.get('https://marksandspicy.com/my-account');
		
		// click on email textbox & add text
		await driver.findElement(By.id('email')).click();
		await driver.findElement(By.id("email")).sendKeys("test");
		// triggers "not valid email" & focus it
		await driver.findElement(By.id("passwd")).click();
		let toolTip = await driver.findElement(By.id("email"));
		await driver.findElement(By.id("email")).addEventListener("mouseover", mouseOver);
		function mouseOver(){
				};
		
		// search tooltip ?
		//let hover = await driver.findElement(By.xpath("/themes/default-bootstrap/js/modules/blocktopmenu/js/hoverIntent.js")).then(function(text){
		});

    });  
*/
	it('test 3 running...', async function() {
        // Load the page
		await driver.get('https://marksandspicy.com/my-account');
		
		// Trigger both validation input
		await driver.findElement(By.id('email')).click();
		await driver.findElement(By.id('passwd')).click();
		await driver.findElement(By.id('email')).click();
				
		// will log the count of form-error instance.	
		await driver.wait(until.elementLocated(By.className("form-error")), 10000);		
		var size = driver.findElements(By.className("form-error")).then(function(eles){
		  return eles.length;
		});
		size.then(function(result) {
			if(result > 0){
		   	console.log("test 3 : Wrong login/password validation appears in the input box");
		   }
		})
		await driver.sleep(2000);
    })

    it('test 4 running...', async function() {
        // Load the page
		await driver.get('https://marksandspicy.com/create-account');
		
		// click on email input & add an email 
		await driver.findElement(By.id('email')).click();
		await driver.findElement(By.id("email")).sendKeys("test@test.com");

		// click on password input & add a password
		await driver.findElement(By.id('password')).click();
		await driver.findElement(By.id("password")).sendKeys("ThisIs@T3st");
		
		// click on password confirm input & add a password
		await driver.findElement(By.id('password2')).click();
		await driver.findElement(By.id("password2")).sendKeys("ThisIs@T3st");
		
		// fill all account details
		await driver.findElement(By.className('lbl_checkbox')).click();
		await driver.findElement(By.id("nom")).sendKeys("test_nom");
		await driver.findElement(By.id("prenom")).sendKeys("test_prenom");
		await driver.findElement(By.id("adresse")).sendKeys("4th test road");
		await driver.findElement(By.id("codePostal")).sendKeys("10012");		
		await driver.findElement(By.id("telephonePortable")).sendKeys("911911");
		
		// checking the city field completion
		await driver.wait(until.elementLocated(By.id("ville")), 10000);	
		let city = await driver.findElement(By.id('ville'));
		let size = city.getAttribute("value").then(function(eles){
			return eles.length;
		});
		size.then(function(result){
			if(result === 0){
				console.log("test 4 : Warning ! City field is empty, autocomplete didn't work");
			}
		})
		
		 // checking url before and after pressing submit button
		await driver.wait(until.elementLocated(By.id("BtnCreationSubmit")), 10000);	
		let beforeUrl = await driver.getCurrentUrl();
		await driver.sleep(2000);
		await driver.findElement(By.id('BtnCreationSubmit')).click();
		let newUrl = await driver.getCurrentUrl().then(function(thisUrl) {
			if(thisUrl === beforeUrl) {
				console.log(`test 4 : Warning ! Url didn't change after using Submit : ${thisUrl}`);
			}
			else {
				console.log(`test 4 : New url after using submit is : ${ThisUrl}`);
			}
		});
	})

    // comment & close the browser 
	after(async function() { 
	await console.log("All testing is done, see above for details");
	await driver.quit()});
});