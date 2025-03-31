import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://wpsz.ssd.sk/');
  await page.getByRole('link', { name: 'Domácnosť' }).click();
  await page.getByRole('heading', { name: 'Nový' }).click();  
  //await page.getByRole('heading', { name: 'Nový' }).click();
  page.on('request', request => {
    console.log('>> Request sent:', {
      url: request.url(),
      method: request.method(),
      data: request.postData()
    });
  });

  // Set up response listener
  page.on('response', async response => {
    console.log('<< Response received:', {
      url: response.url(),
      status: response.status(),
      data: await response.json().catch(() => 'Not JSON')
    });
  });

  // Navigate and wait for specific request/response
  const [response] = await Promise.all([
    page.waitForResponse(response => response.url().includes('api/ziadost/draft?typZiadosti=nove-pripojenie')),
    page.getByRole('link', { name: 'Nové pripojenie (A01)' }).click()
  ]);

  console.log('Full response data:', await response.json());

  //await page.getByRole('link', { name: 'Nové pripojenie (A01)' }).click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.mesto"] span').first().click();
  await page.getByText('Abovce').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.psc"] span').first().click();
  await page.getByText('PSČ: 980').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.ulica"]').getByRole('combobox').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.ulica"]').getByRole('combobox').fill('Testovacia');
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.supisneCislo"]').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.ulica"] span').first().click();
  await page.getByText('Ulica: Abovce').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.supisneCislo"]').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.supisneCislo"]').fill('999');
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.orientacneCislo"]').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.orientacneCislo"]').fill('1');
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.katasterUzemie"]').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.katasterUzemie"]').fill('Abovce');
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.parcelneCislo"]').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.parcelneCislo"]').fill('1234,4321');
  await page.getByRole('button', { name: '  Otvoriť mapu' }).click();
  await page.locator('#SSED_geoportal_10').click({
    position: {
      x: 501,
      y: 380
    }
  });
  await page.getByRole('textbox', { name: 'orient_cislo' }).click();
  await page.getByText('11', { exact: true }).click();
  await page.getByRole('button', { name: 'Označiť parcelu' }).click();
  await page.locator('#SSED_geoportal_10').click({
    position: {
      x: 534,
      y: 344
    }
  });
  await page.getByRole('button', { name: 'Dokončiť' }).click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.poznamka"]').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.poznamka"]').fill('Testovaci rezim');
  await page.getByRole('radio', { name: 'fáza' }).check();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.ziadostLokalitaDataList\\[0\\]\\.spotreba\\.vykonPozadovany\\.hodnotaA"]').click();
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.ziadostLokalitaDataList\\[0\\]\\.spotreba\\.vykonPozadovany\\.hodnotaA"]').fill('10');
  await page.locator('[data-test="ziadostLokalitaList\\[0\\]\\.ziadostLokalitaDataList\\[0\\]\\.spotreba\\.druhMiestaSpotreby"] span').first().click();
  await page.getByText('Chata').click();
  await page.locator('div').filter({ hasText: /^Bez el\. kúrenia$/ }).click();
  await page.getByRole('radio', { name: 'Bez el. kúrenia' }).check();
  await page.getByRole('radio', { name: 'Bez el. ohrevu vody' }).check();
  await page.getByRole('checkbox', { name: 'Bežné spotrebiče (svetlo,' }).check();
  await page.getByRole('button', { name: 'Pokračovať' }).click();
  await page.getByRole('button', { name: 'Pokračovať' }).click();
  await page.locator('[data-test="zakaznik\\.titulPredMenom"]').getByRole('combobox').click();
  await page.getByText('Bc.').click();
  await page.locator('[data-test="zakaznik\\.meno"]').click();
  await page.locator('[data-test="zakaznik\\.meno"]').fill('Janko');
  await page.locator('[data-test="zakaznik\\.priezvisko"]').click();
  await page.locator('[data-test="zakaznik\\.priezvisko"]').fill('Tester');
  await page.locator('[data-test="zakaznik\\.titulZaMenom"]').getByRole('combobox').click();
  await page.getByText('DrSc.').click();
  await page.locator('[data-test="zakaznik\\.datumNarodenia\\.den"]').click();
  await page.locator('[data-test="zakaznik\\.datumNarodenia\\.den"]').fill('11');
  await page.locator('[data-test="zakaznik\\.datumNarodenia\\.mesiac"]').click();
  await page.locator('[data-test="zakaznik\\.datumNarodenia\\.mesiac"]').fill('5');
  await page.locator('[data-test="zakaznik\\.datumNarodenia\\.rok"]').click();
  await page.locator('[data-test="zakaznik\\.datumNarodenia\\.rok"]').fill('2025');
  await page.locator('[data-test="zakaznik\\.email"]').click();
  await page.locator('[data-test="zakaznik\\.email"]').press('ArrowLeft');
  await page.locator('[data-test="zakaznik\\.email"]').fill('juraj.badal@');
  await page.locator('[data-test="zakaznik\\.email"]').click();
  await page.locator('[data-test="zakaznik\\.email"]').fill('juraj.badal@gmail.com');
  await page.locator('[data-test="zakaznik\\.telefon"]').click();
  await page.locator('[data-test="zakaznik\\.telefon"]').fill('+421999666444');
  await page.locator('[data-test="zakaznik\\.adresaBydliska\\.mesto"] span').first().click();
  await page.getByRole('option', { name: 'Mesto: Abovce Okres : Rimavsk' }).locator('small').click();
  await page.locator('[data-test="zakaznik\\.adresaBydliska\\.psc"] span').first().click();
  await page.getByText('PSČ: 980').click();
  await page.locator('[data-test="zakaznik\\.adresaBydliska\\.ulica"]').getByRole('combobox').click();
  await page.locator('div').filter({ hasText: /^Ulica: Abovce$/ }).locator('span').click();
  await page.locator('[data-test="zakaznik\\.adresaBydliska\\.supisneCislo"]').click();
  await page.locator('[data-test="zakaznik\\.adresaBydliska\\.supisneCislo"]').fill('999');
  await page.locator('[data-test="zakaznik\\.adresaBydliska\\.orientacneCislo"]').click();
  await page.locator('[data-test="zakaznik\\.adresaBydliska\\.orientacneCislo"]').fill('1');
  await page.getByRole('radio', { name: 'Rovnaký ako zákazník (Janko' }).check();
  await page.getByRole('button', { name: 'Pokračovať' }).click();
  await page.locator('[data-test="zakaznik\\.datumNarodenia\\.rok"]').click();
  await page.locator('[data-test="zakaznik\\.datumNarodenia\\.rok"]').fill('1999');
  await page.getByText('Dátum narodenia (deň, mesiac').click();
  await page.getByRole('group', { name: 'Osobné údaje' }).click();
  await page.getByRole('button', { name: 'Pokračovať' }).click();
  await page.getByRole('radio', { name: 'Potvrdzujem', exact: true }).check();
});