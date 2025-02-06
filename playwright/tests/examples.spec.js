import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://www.example.com/');
  await expect(page).toHaveURL('http://www.example.com/');

  await page.getByRole('link', { name: 'More information...' }).click();
  //await expect(page).toHaveLink(/More Information/);

  await page.getByRole('link', { name: 'Domains', exact: true }).click();
  //await expect(page.getByRole('heading')).toContainText('Domains');

  await page.locator('#header').getByRole('link', { name: 'Protocols' }).click();
  await expect(page.locator('#header')).toBeVisible();
  
  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/.*about/);

  await page.locator('#sidenav').getByRole('heading', { name: 'About us' }).click();
  await expect(page.locator('#sidenav')).toBeVisible();

  await page.locator('#sidenav').getByRole('link', { name: 'News' }).click();
  //await expect(page.getByRole('heading')).toContainText('News');

  await page.locator('div').filter({ hasText: 'Update 5 November 2024 DNSSEC' }).nth(2).click();
  //await expect(page.getByText('DNSSEC')).toBeVisible();

  await page.getByRole('link', { name: 'https://www.iana.org/dnssec/' }).click();
  await expect(page).toHaveURL(/.*dnssec/);

  await page.getByRole('link', { name: 'Domains', exact: true }).click();
  //await expect(page.getByText('Domains')).toBeVisible();

  await page.locator('#header').getByRole('link', { name: 'Protocols' }).click();
  await expect(page.locator('#header')).toContainText('Protocols');

  await page.getByRole('link', { name: 'Numbers', exact: true }).click();
  //await expect(page.getByText('Numbers')).toBeVisible();

  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/.*about/);

  await page.getByRole('link', { name: 'Contact us', exact: true }).click();
  //await expect(page.getByText('Contact us')).toBeVisible();

  await page.getByRole('link', { name: 'iana@iana.org' }).click();
  await expect(page.getByRole('link', { name: 'iana@iana.org' })).toBeVisible();
});