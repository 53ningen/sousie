// @flow

import URL from 'url';
import request from 'request-promise-native';
import SiteStatus from './SiteStatus';

export default class Site {
  method: string;
  protocol: string;
  hostname: string;
  port: number;
  path: string;
  hash: ?string;

  constructor(method: string, url: string, port: ?number = null) {
    const u = URL.parse(url);
    this.method = method;
    this.protocol = u.protocol || '';
    this.hostname = u.hostname || '';
    this.port = port || (u.protocol === 'https:' ? 443 : 80);
    this.path = u.path || '/';
    this.hash = u.hash;
  }

  getUrl(): string {
    const isDefaultPort = (this.protocol === 'http:' && this.port === 80) || (this.protocol === 'https:' && this.port === 443);
    const port = isDefaultPort ? '' : `:${this.port}`;
    return `${this.protocol}//${this.hostname}${port}${this.path}${this.hash || ''}`;
  }

  async getStatus(): Promise<SiteStatus> {
    const status = new SiteStatus(this);
    const options = {
      method: this.method,
      uri: this.getUrl(),
      resolveWithFullResponse: true
    };
    try {
      const { statusCode, statusMessage } = await request(options);
      status.statusCode = statusCode;
      status.statusMessage = statusMessage;
      return status;
    } catch (err) {
      console.log(JSON.stringify(err));
      status.statusCode = err.response.statusCode;
      status.statusMessage = err.message;
      return status;
    }
  }
}
