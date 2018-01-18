// @flow

import https from 'https';

const fetch: Function = (url: string): Promise<any> =>
  new Promise((resolve, reject) => {
    https.get(url, res => resolve(res)).on('error', e => reject(e));
  });

export default fetch;
