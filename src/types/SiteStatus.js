// @flow

export default class SiteStatus {
  url: string;
  statusCode: ?number;
  statusMessage: ?string;
  responsems: ?number;

  isSucceeded(): boolean {
    if (this.statusCode == null) return false;
    return 200 <= this.statusCode && this.statusCode < 300;
  }
}
