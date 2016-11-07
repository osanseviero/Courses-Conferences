require('chromedriver');

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('https://docs.google.com/forms/d/1ur9GAsIYH4WEzxf5VpCycoxVOyWSR9QaXLkN3rkVIek');
driver.findElement(By.xpath('//*[@id="mG61Hd"]/div/div[2]/div[2]/div/div[2]/div/content/div/label[1]')).click();
driver.findElement(By.xpath('//*[@id="mG61Hd"]/div/div[2]/div[3]/div/div')).click();

