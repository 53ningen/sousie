// @flow

import Site from './Site';
import Slack from './Slack';
import config from '../config.json';

async function handle(item: Object): Promise<Object> {
  const { method, url } = item;
  if (!url || !method) return Promise.reject();

  // health check
  const userAgent = config['user-agent'];
  const timeoutMillisec = item.timeout_millisec;
  const site = new Site(method, url, null, { userAgent });
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
  return {
    method: status.site.method,
    url: status.site.getUrl(),
    is_ok: status.isSucceeded(),
    status_code: status.statusCode
  };
}

exports.handle = async (e: any, ctx: any, cb: Function) => {
  const tasks = config.items.map(item => handle(item));
  const results = await Promise.all(tasks);
  cb(null, { results });
};
