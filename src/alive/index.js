// @flow

import Site from './Site';
import Slack from './Slack';
import config from '../../config.json';

const targetUrl: ?string = config.url;
const slackChannel: ?string = config.slack_notification_channel;
const slackUsername: ?string = config.slack_notification_username;

async function notifySlack() {
  const slackWebhookUrl: ?string = config.slack_webhook_url;
  const slack = new Slack(slackWebhookUrl || '');
  await slack.post(slackChannel || '', slackUsername || '', 'health check failed');
}

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
    await notifySlack();
    cb(null, { is_ok: false, message: err.message });
  }
};
