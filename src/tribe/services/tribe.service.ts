import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TribeClient } from '@tribeplatform/gql-client';
import { Queue } from 'bull';
import { BullConstants } from 'src/shared/bull/constant';
type Content = {
  data: {
    object: {
      mapingFields: {
        key: string;
        value: string;
        type: string;
      }[];
    };
  };
};
@Injectable()
export class TribeService {
  client: TribeClient;
  clientToken: string;
  constructor(
    @InjectQueue(BullConstants.BULL_QUEUE_NAME) private audioQueue: Queue,
    private readonly config: ConfigService,
  ) {
    const client = new TribeClient({
      clientId: this.config.get<string>('CLIENT_ID'),
      clientSecret: this.config.get<string>('CLIENT_SECRET'),
      graphqlUrl: this.config.get<string>('GRAPH_QL_URL'),
    });

    client
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
  async analyzePost(webhookBody: Content) {
    const job = await this.audioQueue.add(webhookBody);
    console.log(job.id);
    return 'webhook data has been received';
  }
}
