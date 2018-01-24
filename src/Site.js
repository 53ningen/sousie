// @flow

import URL from 'url';
import request from 'request-promise-native';
import SiteStatus from './SiteStatus';

const defaultUserAgent = 'Mozilla/5.0 (Soucie Health Checker;)';

export default class Site {
  method: string;
  protocol: string;
  hostname: string;
  port: number;
  path: string;
  hash: ?string;
  options: { userAgent: string };

  constructor(method: string, url: string, port: ?number = null, options: ?{ userAgent: string } = null) {
    const u = URL.parse(url);
    this.method = method;
    this.protocol = u.protocol || '';
    this.hostname = u.hostname || '';
    this.port = port || (u.protocol === 'https:' ? 443 : 80);
    this.options = options || { userAgent: defaultUserAgent };
    this.path = u.path || '/';
    this.hash = u.hash;
  }

  getUrl(): string {
    const isDefaultPort = (this.protocol === 'http:' && this.port === 80) || (this.protocol === 'https:' && this.port === 443);
    const port = isDefaultPort ? '' : `:${this.port}`;
    return `${this.protocol}//${this.hostname}${port}${this.path}${this.hash || ''}`;
  }

  async getStatus(timeoutMillisec: number = 5000): Promise<SiteStatus> {
    const status = new SiteStatus(this);
    const options = {
      method: this.method,
      uri: this.getUrl(),
      timeout: timeoutMillisec,
      headers: {
        'User-Agent': this.options.userAgent || defaultUserAgent
      },
      resolveWithFullResponse: true
    };
    try {
      const { statusCode, statusMessage } = await request(options);
      status.statusCode = statusCode;
      status.message = statusMessage;
      return status;
    } catch (err) {
      console.log(JSON.stringify(err));
      if (err.response) {
        status.statusCode = err.response.statusCode;
        status.message = err.response.statusMessage;
      } else {
        status.message = err.message;
      }
      return status;
    }
  }
}
