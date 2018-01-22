// @flow

export default class SiteStatus {
  url: string;
  statusCode: ?number;
  statusMessage: ?string;
  responsems: ?number;

  isHealthy(): boolean {
    return this.isSucceeded();
  }

  isSucceeded(): boolean {
    if (!this.statusCode) return false;
    return 200 <= this.statusCode && this.statusCode < 300;
  }
}
