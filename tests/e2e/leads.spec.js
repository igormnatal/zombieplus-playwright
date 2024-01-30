const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  //visit
  await page.landing.visit()
  //open leadModal
  await page.landing.openLeadModal()
  //submit LeadForm
  await page.landing.leadForm(leadName, leadEmail)
  //Toast have text
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)
});

test('não deve cadastrar quando um e-mail já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  expect(newLead.ok()).toBeTruthy()
  //visit
  await page.landing.visit()
  //open leadModal
  await page.landing.openLeadModal()
  //submit LeadForm
  await page.landing.leadForm(leadName, leadEmail)
  //Toast have text

  //visit
  await page.landing.visit()
  //open leadModal
  await page.landing.openLeadModal()
  //submit LeadForm
  await page.landing.leadForm(leadName, leadEmail)
  //Toast have text
  //Toast have text
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
});

test('não deve cadastrar com e-mail incorreto', async ({ page }) => {
  //visit
  await page.landing.visit()
  //open leadModal
  await page.landing.openLeadModal()
  //submit LeadForm
  await page.landing.leadForm('igor natal', 'globo.com')
  await page.landing.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando nome não é preenchido', async ({ page }) => {
  //visit
  await page.landing.visit()
  //open leadModal
  await page.landing.openLeadModal()
  //submit LeadForm
  await page.landing.leadForm('', 'igor.natal@hotmail.com')
  await page.landing.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o e-mail não é preenchido', async ({ page }) => {
  //visit
  await page.landing.visit()
  //open leadModal
  await page.landing.openLeadModal()
  //submit LeadForm
  await page.landing.leadForm('igor natal', '')
  await page.landing.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  //visit
  await page.landing.visit()
  //open leadModal
  await page.landing.openLeadModal()
  //submit LeadForm
  await page.landing.leadForm('', '')
  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório']) //validação de um mesmo texto em mais de um campo
});
