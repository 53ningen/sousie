import Site from 'Site';

describe('Site', () => {
  test('properties: https endpoint', () => {
    const site = new Site('GET', 'https://example.com');
    expect(site.method).toBe('GET');
    expect(site.protocol).toBe('https:');
    expect(site.hostname).toBe('example.com');
    expect(site.port).toBe(443);
    expect(site.path).toBe('/');
    expect(site.hash).toBeNull();
    expect(site.getUrl()).toBe('https://example.com/');
  });
  test('properties: http endpoint', () => {
    const site = new Site('GET', 'http://example.com');
    expect(site.method).toBe('GET');
    expect(site.protocol).toBe('http:');
    expect(site.hostname).toBe('example.com');
    expect(site.port).toBe(80);
    expect(site.path).toBe('/');
    expect(site.hash).toBeNull();
    expect(site.getUrl()).toBe('http://example.com/');
  });
  test('properties: http endpoint with port', () => {
    const site = new Site('GET', 'http://example.com', 8080);
    expect(site.method).toBe('GET');
    expect(site.protocol).toBe('http:');
    expect(site.hostname).toBe('example.com');
    expect(site.port).toBe(8080);
    expect(site.path).toBe('/');
    expect(site.hash).toBeNull();
    expect(site.getUrl()).toBe('http://example.com:8080/');
  });
});
