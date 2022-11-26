// const {Builder, By, until}= require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome'); 


async function create_driver() {
    const chromeOptions = new chrome.Options()
    chromeOptions.addArguments("--headless")
    chromeOptions.excludeSwitches("enable-logging")
    let mobile_emulation = {"userAgent": "Mozilla/5.0 (Linux; Android 7.0; Lenovo K33b36 Build/NRD90N; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/65.0.3325.109 Mobile Safari/537.36 Instagram 41.0.0.13.92 Android (24/7.0; 480dpi; 1080x1920; LENOVO/Lenovo; Lenovo K33b36; K33b36; qcom; pt_BR; 103516666)"}
    chromeOptions.setMobileEmulation(mobile_emulation)
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    return driver
};

async function login(driver, username, user_password){
    await driver.get("https://instagram.com/login")

    let base_url = await driver.getCurrentUrl()

    await new Promise(resolve => setTimeout(resolve, Math.random()*1000));
    await driver.wait(until.elementsLocated(By.xpath('//*[@id="loginForm"]/div[1]/div[3]/div/label/input')), 3000);
    let login = driver.findElement(By.xpath('//*[@id="loginForm"]/div[1]/div[3]/div/label/input'))
    login.sendKeys(username)

    await new Promise(resolve => setTimeout(resolve, Math.random()*1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="loginForm"]/div[1]/div[4]/div/label/input')))
    let password = driver.findElement(By.xpath('//*[@id="loginForm"]/div[1]/div[4]/div/label/input'))
    password.sendKeys(user_password)

    await new Promise(resolve => setTimeout(resolve, Math.random()*1000));
    await driver.wait(until.elementLocated(By.xpath('//*[@id="loginForm"]/div[1]/div[6]/button/div')))
    let login_button = driver.findElement(By.xpath('//*[@id="loginForm"]/div[1]/div[6]/button/div'))
    login_button.click()

    while (base_url == await driver.getCurrentUrl()){
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

}

async function get_followers(driver, target_id){
    let url = `https://i.instagram.com/api/v1/friendships/${target_id}/followers`
    await driver.get(url)

    await driver.wait(until.elementLocated(By.xpath('/html/body/pre')))
    let json_response = await driver.findElement(By.xpath('/html/body/pre')).getText()
    json_response = JSON.parse(json_response)

    var followers = json_response['users']
    var theres_more = "next_max_id" in json_response

    while (theres_more){
        driver.get(`${url}/?max_id=${json_response['next_max_id']}`)
        await driver.wait(until.elementLocated(By.xpath('/html/body/pre')))
        json_response = await driver.findElement(By.xpath('/html/body/pre')).getText()
        json_response = JSON.parse(json_response)
        followers.push(json_response['users'])
        theres_more = "next_max_id" in json_response
    
    }

    return followers
}


async function main(){

    let driver = await create_driver()
    await login(driver, 'roronoashks', 'roronoashks1')

    let followers_ = await get_followers(driver, "21544973574")
    console.log(followers_)
    await driver.quit()

}

main()
