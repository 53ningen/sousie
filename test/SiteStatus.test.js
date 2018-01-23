import SiteStatus from '../src/SiteStatus';

describe('SiteStatus', () => {
  test('status_code 200', () => {
    const status = new SiteStatus();
    status.statusCode = 200;
    expect(status.isSucceeded()).toBe(true);
    expect(status.isHealthy()).toBe(true);
  });
  test('status_code 201', () => {
    const status = new SiteStatus();
    status.statusCode = 201;
    expect(status.isSucceeded()).toBe(true);
    expect(status.isHealthy()).toBe(true);
  });
  test('status_code 301', () => {
    const status = new SiteStatus();
    status.statusCode = 301;
    expect(status.isSucceeded()).toBe(false);
    expect(status.isHealthy()).toBe(false);
  });
  test('status_code 400', () => {
    const status = new SiteStatus();
    status.statusCode = 400;
    expect(status.isSucceeded()).toBe(false);
    expect(status.isHealthy()).toBe(false);
  });
  test('status_code 404', () => {
    const status = new SiteStatus();
    status.statusCode = 404;
    expect(status.isSucceeded()).toBe(false);
    expect(status.isHealthy()).toBe(false);
  });
  test('status_code 503', () => {
    const status = new SiteStatus();
    status.statusCode = 503;
    expect(status.isSucceeded()).toBe(false);
    expect(status.isHealthy()).toBe(false);
  });
});
