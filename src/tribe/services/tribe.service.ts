import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TribeClient } from '@tribeplatform/gql-client';
import { Member, Space } from '@tribeplatform/gql-client/types';
import { Queue } from 'bull';
import { BullConstants } from '../../shared/constants/bull.constant';
import { WebhookDataType } from '../types/webhook.type';

/**
 * @classdesc
 * This class related to handle these tasks:
 * - creating tribeClient using Tribe gpl library
 * - get space from Tribe using Tribe client
 * - get member from Tribe using Tribe client
 * - provides a function for Tribe webhook controller
 */
@Injectable()
export class TribeService {
  client: TribeClient;
  clientToken: string;
  constructor(
    @InjectQueue(BullConstants.BULL_QUEUE_NAME) private postAnalyzeQueue: Queue,
    private readonly config: ConfigService,
  ) {
    this.initTribeClient();
  }
  /**
   * @function
   * This function is called at the constructor to create Tribe client and storing the client access token
   */
  initTribeClient() {
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

  /**
   * @function
   * This function uses Tribe client to find Tribe space
   * @param {string} id - A space id
   * @return {Space} - A founded space object
   */
  async getSpace(id: string): Promise<Space> {
    return await this.client.spaces.get({ id }, 'basic', this.clientToken);
  }

  /**
   * @function
   * This function uses Tribe client to find Tribe member
   * @param {string} id - A member id
   * @return {Member} - A  founded member object
   */
  async getMember(id: string): Promise<Member> {
    return await this.client.members.get(id, 'basic', this.clientToken);
  }

  /**
   * @function
   * This function uses Bull Queue for processing webhook data by adding the webhook data to Queue
   * @param {WebhookDataType} webhookData - A webhook data
   * @return {string} - A string that shows a webhook has been received
   */
  async analyzePost(webhookData: WebhookDataType): Promise<string> {
    await this.postAnalyzeQueue.add(webhookData);
    return 'webhook data has been received';
  }
}
