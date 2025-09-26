import { Page, test,Locator, expect } from '@playwright/test';

export default class customs
{
       
        constructor(private page: Page) {
       
        }
      
        private async waitForElementToBeEnabled(locator: Locator, timeout: number = 5000) {
            await locator.waitFor({ state: 'visible', timeout });
            await expect(locator).toBeEnabled({ timeout });
        }
        
        private async waitForElementToBeAttached(locator: Locator, timeout: number = 10000) {
        try {
                await locator.waitFor({ state: 'attached', timeout });
                await locator.waitFor({ state: 'visible', timeout });
                console.log('Element is attached and visible.');
                } catch (error) {
                console.error('Element not attached within timeout:', error);
                throw error; 
                }
            }
            async clickOn(locator: Locator, friendlyNameOfButton: string) {
                await this.waitForElementToBeEnabled(locator);
                let loggingLine = 'Clicking on ';
                loggingLine = friendlyNameOfButton != undefined ? loggingLine + friendlyNameOfButton : loggingLine;
                console.log(loggingLine);
                await test.step(loggingLine, async () => {
                    await locator.click();``
                })
            }

           async clickButton(locator: Locator, friendlyNameOfButton: string) {
                    await this.waitForElementToBeAttached(locator);
                    let loggingLine = 'Clicking on button ';
                    loggingLine = friendlyNameOfButton != undefined ? loggingLine + friendlyNameOfButton : loggingLine;
                    console.log(loggingLine);
                    await test.step(loggingLine, async () => {
                        await locator.click({ timeout:10000});
                    })
                }

}