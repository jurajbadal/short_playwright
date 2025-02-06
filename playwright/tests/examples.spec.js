import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://www.example.com/');
  await expect(page).toHaveURL('http://www.example.com/');

  await page.getByRole('link', { name: 'More information...' }).click();
  //await expect(page).toHaveLink(/More Information/);
  // Check if link exists and has specific href
  //await expect(page.getByRole('link', { name: 'More information...' })).toHaveAttribute('href', '/more-info');

  // Check if link is visible
  //await expect(page.getByRole('link', { name: 'More information...' })).toBeVisible();

  // Check if multiple properties of a link
  //await expect(page.getByRole('link', { name: 'More information...' })).toHaveAttribute({
  //href: '/more-info',
  //target: '_blank'
  //});

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
  // Use one of these more specific selectors:
  await expect(page.getByRole('heading', { level: 1 })).toContainText('News');
  // or
  await expect(page.getByRole('heading', { name: 'News', exact: true })).toBeVisible();
  // or
  await expect(page.locator('h1:has-text("News")')).toBeVisible();
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