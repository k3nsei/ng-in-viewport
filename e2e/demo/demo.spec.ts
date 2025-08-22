import { test, expect } from '@playwright/test';

test.describe('GIVEN: Demo Application', () => {
  test.describe('WHEN page was loaded', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('THEN should render title', async ({ page }) => {
      const title = page.locator('.app-header__title');
      await expect(title).toBeVisible();
      await expect(title).toContainText('ng-in-viewport demo');
    });

    test('THEN should render 1st column', async ({ page }) => {
      const firstColumn = page.locator('.example--first');
      await expect(firstColumn).toBeVisible();
      await expect(firstColumn).not.toBeEmpty();
    });

    test('THEN 1st column items from 1st to 9th should be active', async ({ page }) => {
      await assertColumnItems(page, 'first', 1, 9);
    });

    test('THEN should render 2nd column', async ({ page }) => {
      const secondColumn = page.locator('.example--second');
      await expect(secondColumn).toBeVisible();
      await expect(secondColumn).not.toBeEmpty();
    });

    test('THEN 2nd column items from 1st to 7th should be active', async ({ page }) => {
      await assertColumnItems(page, 'second', 1, 7);
    });

    test.describe('AND scrolled into view 10th item of 1st column', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.locator('.example--first .item:nth-child(10)').scrollIntoViewIfNeeded();
      });

      test('THEN 1st column items from 10th to 18th should be active', async ({ page }) => {
        await assertColumnItems(page, 'first', 10, 18);
      });

      test('THEN 2nd column items from 1st to 7th should be active', async ({ page }) => {
        await assertColumnItems(page, 'second', 1, 7);
      });
    });

    test.describe('AND scrolled 2nd column vertically by 779px', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.locator('.example--second').evaluate((el) => {
          el.scrollTo(0, 779);
        });
      });

      test('THEN 1st column items from 1st to 9th should be active', async ({ page }) => {
        await assertColumnItems(page, 'first', 1, 9);
      });

      test('THEN 2nd column items from 11th to 17th should be active', async ({ page }) => {
        await assertColumnItems(page, 'second', 11, 17);
      });
    });
  });
});

async function assertColumnItems(page: any, column: 'first' | 'second', start: number, end?: number): Promise<void> {
  const items = page.locator(`.example--${column} .item`);
  const itemCount = await items.count();

  for (let i = 0; i < itemCount; i++) {
    const item = items.nth(i);
    const number = i + 1;

    if (inRange(number, start, end)) {
      await expect(item).toHaveClass(/item--active/);
    } else {
      await expect(item).not.toHaveClass(/item--active/);
    }
  }
}

function inRange(value: number, start: number, end?: number): boolean {
  if (end === undefined) {
    return value === start;
  }
  return value >= start && value <= end;
}
