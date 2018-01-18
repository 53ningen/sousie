// @flow

import fetch from '../utils/fetch';
import SiteStatus from './SiteStatus';

export default class Site {
  url: string;
  statusCode: ?number;
  statusMessage: ?string;
  responsems: ?number;

  constructor(url: string) {
    this.url = url;
  }

  async getStatus(): Promise<SiteStatus> {
    const status = new SiteStatus();
    const start = new Date();
    const { statusCode, statusMessage } = await fetch(this.url);
    status.responsems = new Date() - start;
    status.statusCode = statusCode;
    status.statusMessage = statusMessage;
    return status;
  }
}
