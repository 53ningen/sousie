// @flow

console.log('starting function');

exports.handle = (e: any, ctx: any, cb: Function) => {
  console.log('processing event: %j', e);
  cb(null, { hello: 'world' });
};
