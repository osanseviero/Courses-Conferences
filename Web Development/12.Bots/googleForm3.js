require('chromedriver');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('https://docs.google.com/forms/d/e/1FAIpQLSdqfVkFdLHlTTabnuY7V51BVtXn68bA8M20VD3OCZRTqXpKUQ/viewform').then(function(){
	driver.findElement(By.xpath('//*[@id="mG61Hd"]/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div/div[1]/input')).sendKeys('20').then(function() {
		driver.findElement(By.xpath('//*[@id="mG61Hd"]/div/div[2]/div[2]/div[2]/div[2]/div/content/div/label[2]')).click().then(function() {
			driver.findElement(By.xpath('//*[@id="mG61Hd"]/div/div[2]/div[2]/div[3]/div[2]/div/content/div/label[1]')).click().then(function() {
				driver.findElement(By.xpath('//*[@id="mG61Hd"]/div/div[2]/div[2]/div[6]/div[2]/div/content/div/label[1]')).click().then(function() {
					driver.findElement(By.xpath('//*[@id="mG61Hd"]/div/div[2]/div[2]/div[7]/div[2]/div/content/div/label[4]')).click().then(function(){
						driver.findElement(By.xpath('//*[@id="mG61Hd"]/div/div[2]/div[2]/div[9]/div[2]/div/content/div/label[4]')).click().then(function() {
							driver.findElement(By.xpath('//*[@id="mG61Hd"]/div/div[2]/div[3]/div[1]/div/div/content/span')).click().then(function() {
								driver.quit();
							});

						});
					});
				});
			});

		});
	});
});
