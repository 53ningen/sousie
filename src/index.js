// @flow

import Site from './Site';
import Slack from './Slack';
import config from '../config.json';

exports.handle = async (e: any, ctx: any, cb: Function) => {
  const { method, url } = config;
  if (!url || !method) {
    cb(null, { is_ok: false, message: 'config.method or config.url is not set.' });
    return;
  }

  // health check
  const timeoutMillisec = config.timeout_millisec;
  const site = new Site(method, url);
  const status = await site.getStatus(timeoutMillisec);

  // slack notification
  const notifyOnSuccess = config.slack['notify-on-success'] === true;
  const webhookUrl = config.slack.webhook_url;
  const iconEmoji = config.slack.icon_emoji;
  const mentionTargets = config.slack.mention_targets;
  const { channel, username } = config.slack;
  if (url && channel && username) {
    const slack = new Slack(webhookUrl, channel, username, iconEmoji);
    if (!status.isSucceeded() || notifyOnSuccess) await slack.notifySlack(status, mentionTargets);
  }

  // callback
  const obj = {
    is_ok: status.isSucceeded(),
    status_code: status.statusCode
  };
  cb(null, obj);
};
