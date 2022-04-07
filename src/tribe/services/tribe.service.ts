import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TribeClient } from '@tribeplatform/gql-client';
import { Member, Space } from '@tribeplatform/gql-client/types';
import { Queue } from 'bull';
import { BullConstants } from '../../shared/bull/constant';
import { Webhook } from '../types/webhook.type';

@Injectable()
export class TribeService {
  client: TribeClient;
  clientToken: string;
  constructor(
    @InjectQueue(BullConstants.BULL_QUEUE_NAME) private postAnalyzeQueue: Queue,
    private readonly config: ConfigService,
  ) {
    this.client = new TribeClient({
      clientId: this.config.get<string>('CLIENT_ID'),
      clientSecret: this.config.get<string>('CLIENT_SECRET'),
      graphqlUrl: this.config.get<string>('GRAPH_QL_URL'),
    });

    this.client
      .generateToken({
        networkId: this.config.get<string>('NETWORK_ID'),
      })
      .then(async (accessToken) => {
        //set globally
        console.log(accessToken);
        this.clientToken = accessToken;
      });
  }
  async getPost() {
    return null;
  }
  async getSpace(id: string): Promise<Space> {
    const p = await this.client.spaces.get({ id }, 'basic', this.clientToken);
    console.log(p);
    console.log('sdfsdf');
    return p;
  }
  async getMember(id: string): Promise<Member> {
    const p = await this.client.members.get(id, 'basic', this.clientToken);
    console.log(p);
    console.log('sdfsdf');
    return p;
  }
  async analyzePost(webhookBody: Webhook) {
    /*
    TODO: check id and name of data
     "id": "3d2815e42e3ad441078cee53f941abf8",
        "name": "post.published",
    */
    await this.postAnalyzeQueue.add(webhookBody);

    return 'webhook data has been received';
  }
}
