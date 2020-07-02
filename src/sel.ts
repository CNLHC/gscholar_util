import { Builder, By, Key, until } from 'selenium-webdriver'
import path from 'path'
import fs from 'fs'



(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();

    for (let i = 300; i < 530; i += 10) {
        await driver.get(`https://scholar.google.com/scholar?start=${i}&hl=en&newwindow=1&as_sdt=0,5&sciodt=0,5&cites=487658230308010277&scipsc=`);
        while(1){
        driver.sleep(1)
            try{
                await driver.findElement(By.xpath("/html/body/div/div[9]/div[3]"))
                await driver.findElement(By.xpath("/html/body/div/div[10]/div[1]/div/div[2]"))
                break
            } catch{}
        }
        const res = await driver.getPageSource()
        fs.writeFileSync(path.resolve(".","data",`page-${i/10+1}.html`),res)
    }
})();
