import type { PlaywrightTestConfig } from '@playwright/test';
// @ts-ignore
import os from 'os';

const numOfCpus = os.cpus().length;

const xrayOptions = {
  // Whether to add <properties> with all annotations; default is false
  embedAnnotationsAsProperties: true,

  // By default, annotation is reported as <property name='' value=''>.
  // These annotations are reported as <property name=''>value</property>.
  textContentAnnotations: ['test_description'],

  // Where to put the report.
  outputFile: './results.xml',
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const playwrightTestConfig: PlaywrightTestConfig = {
  grep: new RegExp(process.env.SUITE_TAG || ''),
  /* Maximum time one test can run for. */
  globalTimeout: 7200000, // Timeout per execution
  timeout: 600000, // Timeout per test
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 300000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: numOfCpus,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['line'], ['html', { open: 'never' }], ['junit', xrayOptions]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
};

export default playwrightTestConfig;
