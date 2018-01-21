// @flow

import request from 'request-promise-native';

export default class Http {
  static async request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD',
    uri: string,
    body: any = null
  ): Promise<any> {
    const options = {
      method,
      uri,
      body,
      resolveWithFullResponse: true
    };
    console.log(options);
    return request(options);
  }
}
