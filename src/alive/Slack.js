// @flow

import request from 'request-promise-native';

export default class Slack {
  webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  static getPayload(channel: string, username: string, text: string): Object {
    return {
      channel,
      username,
      text
    };
  }

  async post(channel: string, username: string, text: string): Promise<boolean> {
    try {
      const options = {
        method: 'POST',
        uri: this.webhookUrl,
        form: `payload=${JSON.stringify(Slack.getPayload(channel, username, text))}`,
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
}
