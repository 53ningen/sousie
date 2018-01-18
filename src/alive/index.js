// @flow

import Site from '../types/Site';

const targetUrl: ?string = 'https://53ningen.com';

exports.handle = async (e: any, ctx: any, cb: Function) => {
  if (targetUrl == null) {
    cb(null, { is_ok: false, message: 'TARGET_URL is not set.' });
    return;
  }
  try {
    const site = new Site(targetUrl);
    const status = await site.getStatus();
    const obj = {
      is_ok: status.isSucceeded(),
      status_code: status.statusCode,
      response_millisec: status.responsems,
      message: status.statusMessage
    };
    cb(null, obj);
  } catch (err) {
    console.log(err);
    cb(null, { is_ok: false, message: err });
  }
};
