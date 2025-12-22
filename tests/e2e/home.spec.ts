import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.hero')).toBeVisible()
})

test('skip to content link is focusable', async ({ page }) => {
  await page.goto('/')
  const skip = page.locator('text=Skip to content')
  await skip.focus()
  await expect(skip).toBeVisible()
})
