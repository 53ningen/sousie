// @flow

import request from 'request-promise-native';
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
    const options = {
      method: 'GET',
      uri: this.url,
      resolveWithFullResponse: true
    };
    const start = new Date();
    const { statusCode, statusMessage } = await request(options);
    status.responsems = new Date() - start;
    status.statusCode = statusCode;
    status.statusMessage = statusMessage;
    return status;
  }
}
