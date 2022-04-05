import { Processor, Process } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { INlpService } from 'src/nlp/interfaces/nlp.interface';

import { BullConstants } from 'src/shared/bull/constant';
import { UtilService } from 'src/util/util.service';
import { TribeService } from '../services/tribe.service';
import { Content } from '../types/tribe.type';

@Processor(BullConstants.BULL_QUEUE_NAME)
//TODO: add logger
export class AudioConsumer {
  constructor(
    private readonly tribeService: TribeService,
    private readonly utilService: UtilService,
    //TODO: use constants
    @Inject('nlpService') private nlpService: INlpService,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {
    const logger = new Logger();
    logger.log('alireza');
  }
  @Process()
  async transcode(job: Job<Content>) {
    console.log('processing job');

    //const post = this.tribeService.getPost();

    const postBody = job.data.data.object.mappingFields.find(
      //  TODO: use constatnt
      (item) => item.key == 'content',
    );

    const postStrippedText = this.utilService.stripText(postBody.value);
    console.log(postStrippedText);
    const wordCount = this.utilService.wordCount(postStrippedText);
    console.log(wordCount);
    if (wordCount < this.config.get<number>('MINIMUM_WORD')) {
      return 'text is too short';
    }
    //this.nlpService.analyze(postStrippedText);
    console.log(await this.tribeService.getSpace(job.data.data.object.spaceId));
    console.log(await this.tribeService.getMember(job.data.data.actor.id));
    const result = await this.nlpService.analyzeSentiment(postStrippedText);
    console.log('google result', result);
    //get space
    //TODO: "publishedAt": "2022-04-01T16:42:21.938Z",
    //TODO: store all data

    //   client.posts.

    //let progress = 0;
    /*
      get post 
      get member(authur)
      get space
      get title
      */
    return {};
  }
}
