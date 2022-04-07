import { Processor, Process } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { AnalyzedPostService } from '../../analyzedPost/analyzedPost.service';
import { INlpService } from '../../nlp/interfaces/nlp.interface';

import { BullConstants } from '../../shared/bull/constant';
import { UtilService } from '../../util/util.service';
import { TribeService } from '../services/tribe.service';

import { Webhook } from '../types/webhook.type';

@Processor(BullConstants.BULL_QUEUE_NAME)
//TODO: add logger
export class TribeConsumer {
  constructor(
    private readonly tribeService: TribeService,
    private readonly utilService: UtilService,
    private readonly analyzedPost: AnalyzedPostService,
    //TODO: use constants
    @Inject('nlpService') private nlpService: INlpService,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {
    const logger = new Logger();
    logger.log('alireza');
  }
  @Process()
  async transcode(job: Job<Webhook>) {
    console.log('processing job');
    //TODO: check id and header
    let postBody: string;
    let postTitle: string;
    this.specifyPostItems();
    job.data.dataList.forEach((element) => {
      if (element.key == 'content') {
        postBody = element.value;
      }
      if (element.key == 'title') {
        postTitle = element.value;
      }
    });

    const postStrippedText = this.utilService.stripText(postBody);
    console.log(postStrippedText);
    const wordCount = this.utilService.wordCount(postStrippedText);
    console.log(wordCount);
    if (wordCount < this.config.get<number>('MINIMUM_WORD')) {
      return 'text is too short';
    }
    //this.nlpService.analyze(postStrippedText);
    const space = await this.tribeService.getSpace(job.data.spaceId);
    const author = await this.tribeService.getMember(job.data.actorId);
    const result = await this.nlpService.analyzeSentiment(postStrippedText);
    console.log('google result', result);

    await this.analyzedPost.createAnalyzedPost({
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

    return {};
  }
  specifyPostItems() {
    throw new Error('Method not implemented.');
  }
}
