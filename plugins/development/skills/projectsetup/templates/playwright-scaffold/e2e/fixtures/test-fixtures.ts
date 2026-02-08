import { test as base } from '@playwright/test';
import { TestDataFactory } from './test-data';

type TestFixtures = {
  testData: TestDataFactory;
};

export const test = base.extend<TestFixtures>({
  testData: async ({ page }, use) => {
    const factory = new TestDataFactory(page);
    await use(factory);
    await factory.cleanup();
  },
});

export { expect } from '@playwright/test';
