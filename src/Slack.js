// @flow

import request from 'request-promise-native';
import SiteStatus from './SiteStatus';

export default class Slack {
  webhookUrl: string;
  channel: string;
  username: string;
  iconEmoji: ?string;

  constructor(webhookUrl: string, channel: string, username: string, iconEmoji: ?string = null) {
    this.webhookUrl = webhookUrl;
    this.channel = channel;
    this.username = username;
    this.iconEmoji = iconEmoji;
  }

  getPayload(text: ?string, attachments: Array<Object>): Object {
    return {
      channel: this.channel,
      username: this.username,
      icon_emoji: this.iconEmoji,
      text,
      attachments
    };
  }

  async post(channel: string, username: string, text: ?string, attachments: Array<Object> = []): Promise<boolean> {
    try {
      const options = {
        method: 'POST',
        uri: this.webhookUrl,
        form: `payload=${JSON.stringify(this.getPayload(text, attachments))}`,
        json: true,
        resolveWithFullResponse: true
      };
      await request(options);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  getColor(status: SiteStatus) {
    if (status.isHealthy()) return 'good';
    return status.statusCode && 500 <= status.statusCode && status.statusCode < 600 ? 'danger' : 'warning';
  }

  getMessage(status: SiteStatus) {
    return status.isHealthy() ? `:ok_woman: Health check succeeded on  ${status.site.hostname}` : `:warning: Health check failed on ${status.site.hostname}`;
  }

  async notifySlack(status: SiteStatus, mentionTargets: Array<string> = []) {
    const mentionText = status.isSucceeded() ? '' : mentionTargets.map(x => `<${x}>`).join(' ');
    const attachements = [
      {
        color: this.getColor(status),
        title: this.getMessage(status),
        title_link: status.site.url,
        fields: [
          {
            title: 'target_url',
            value: status.site.url,
            short: false
          },
          {
            title: 'method',
            value: status.site.method,
            short: true
          },
          {
            title: 'status_code',
            value: status.statusCode || '-',
            short: true
          },
          {
            title: 'response_time(msec)',
            value: status.responseTime || '-',
            short: true
          },
          {
            title: 'message',
            value: status.message || '-',
            short: true
          }
        ]
      }
    ];
    await this.post(this.channel || '#random', this.username || 'Soucie Health Checker', mentionText, attachements);
  }
}
