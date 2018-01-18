// @flow

import https from 'https';

const targetUrl: ?string = 'https://53ningen.com';

const fetch = (url: string) =>
  new Promise((resolve, reject) => {
    https.get(url, res => resolve(res)).on('error', e => reject(e));
  });

exports.handle = async (e: any, ctx: any, cb: Function) => {
  if (targetUrl == null) {
    cb(null, { is_ok: false, message: 'TARGET_URL is not set.' });
    return;
  }
  try {
    await fetch(targetUrl);
    cb(null, { is_ok: true });
  } catch (err) {
    console.log(err);
    cb(null, { is_ok: false, message: err });
  }
};
