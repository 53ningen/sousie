// @flow

import Site from './Site';

export default class SiteStatus {
  site: Site;
  url: string;
  statusCode: ?number;
  statusMessage: ?string;

  constructor(site: Site) {
    this.site = site;
  }

  isHealthy(): boolean {
    return this.isSucceeded();
  }

  isSucceeded(): boolean {
    if (!this.statusCode) return false;
    return 200 <= this.statusCode && this.statusCode < 300;
  }
}
