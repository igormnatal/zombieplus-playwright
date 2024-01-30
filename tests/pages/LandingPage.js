const { expect } = require('@playwright/test');
export class LandingPage {

    constructor(page) { //construtor para a função do playwright page
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000')
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();//buscando elemento por parte do texto "substring"

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')//checkpoint modal é da propriedade acima do texto esperado. heading é o elemento h2, heading é válido para todos os tipos de H1 ao H6
        //await this.page.click('//button[text()="Aperte o play... se tiver coragem"]');//forma 1 de encontrar um elemento
        //await this.page.getByRole('button', {name:'Aperte o play... se tiver coragem'}).click();//forma 2 de encontrar um elemento
    }

    async leadForm(name, email) {
        //await this.page.locator('#name').fill('igor natal') 
        await this.page.getByPlaceholder('Informe seu nome').fill(name)//localizando elemento pela propriedade placeholder
        await this.page.getByPlaceholder('Informe seu email').fill(email)//localizando elemento pela propriedade placeholder

        /*await this.page.getByText('seus dados conosco').click()
         const content = await this.page.content()
        console.log(content)*///técnica para capturar o texto durante a execução em modo debug.

        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}