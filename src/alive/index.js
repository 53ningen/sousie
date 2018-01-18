// @flow

import fetch from '../utils/fetch';

const targetUrl: ?string = 'https://53ningen.com';

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
