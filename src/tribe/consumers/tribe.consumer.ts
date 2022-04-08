import { Processor, Process } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { AnalyzedPostService } from '../../analyzedPost/analyzedPost.service';
import { INlpService } from '../../nlp/interfaces/nlp.interface';

import { BullConstants } from '../../shared/constants/bull.constant';
import { UtilService } from '../../util/util.service';
import { TribeService } from '../services/tribe.service';

import { WebhookDataType as WebhookDataType } from '../types/webhook.type';
/**
 * @classdesc
 * This class defines Tribe webhook data consumer
 * The consumer processes any job that is added to Tribe webhook data Queue
 */
@Processor(BullConstants.BULL_QUEUE_NAME)
//TODO: add logger
export class TribeWebhookDataConsumer {
  constructor(
    private readonly tribeService: TribeService,
    private readonly utilService: UtilService,
    private readonly analyzedPost: AnalyzedPostService,
    private readonly logger: Logger,
    //TODO: use constants
    @Inject('nlpService') private nlpService: INlpService,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}

  /**
   * @function
   * This function process Tribe webhood data job
   * @param {Job} job - A produced job that has added to Queue
   * @return {string} - A string that shows job process was finished
   */
  @Process()
  async processWebhookData(job: Job<WebhookDataType>): Promise<string> {
    console.log('processing job');
    //TODO: check id and header

    const [postBody, postTitle] = this.specifyPostItems(job.data.dataList);
    const postStrippedText = this.utilService.stripText(postBody);
    const wordCount = this.utilService.wordCount(postStrippedText);
    if (wordCount < this.config.get<number>('MINIMUM_WORD')) {
      return 'text is too short';
    }
    const space = await this.tribeService.getSpace(job.data.spaceId);
    const author = await this.tribeService.getMember(job.data.actorId);
    const result = await this.nlpService.analyzeSentiment(postStrippedText);
    console.log('google result', result);

    await this.analyzedPost.createAnalyzedPost({
      spaceId: space.id,
      spaceName: space.name,
      category: result.category,
      title: postTitle,
      webhookEventId: job.data.dataId,
      content: postStrippedText,
      categoryScore: result.categoryConfidence,
      sentiment: result.sentiment,
      sentimentScore: result.sentimentScore,
      authorName: author.name,
      authorEmail: author.email,
    });

    //TODO: "publishedAt": "2022-04-01T16:42:21.938Z",

    return 'job process was finished';
  }
  /**
   * @function
   * This function search for content and title in the data list
   * @param {any} dataList - A dataList that includes content and title objects
   * @return {string[]} - An array includes postBody and postTitle
   */
  specifyPostItems(dataList: any): string[] {
    let postTitle: string;
    let postBody: string;
    dataList.forEach((element) => {
      if (element.key == 'content') {
        postBody = element.value;
      }
      if (element.key == 'title') {
        postTitle = element.value;
      }
    });
    return [postBody, postTitle];
  }
}
