import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnalyzedPostDto } from './dto/create-analyzedPost.dto';
import { AnalyzedPost } from './entities/analyzedPost.entity';
/**
 * @classdesc
 * This class defines AnalyzedPost service and includes these methods:
 * createAnalyzedPost
 * getAnalyzedPost
 */
@Injectable()
export class AnalyzedPostService {
  constructor(private readonly logger: Logger) {}
  @InjectRepository(AnalyzedPost)
  private readonly repository: Repository<AnalyzedPost>;

  /**
   * @function
   * Use id for quest an AnalyzedPost
   * @param {number} id - analyzedPost id
   * @return {AnalyzedPost} - An instance of AnalyzedPost
   */
  public getAnalyzedPost(id: number): Promise<AnalyzedPost> {
    return this.repository.findOne(id);
  }

  /**
   * @function
   * This function create and save an AnalyzedPost in database
   * @param {CreateAnalyzedPostDto} analyzedPostParam - A createAnalyzedDto object
   * @return {AnalyzedPost | null} - A created and saved analyzedPost object or returns null if any error happens
   */
  public async createAnalyzedPost(
    analyzedPostParam: CreateAnalyzedPostDto,
  ): Promise<AnalyzedPost | null> {
    const analyzedPost: AnalyzedPost = new AnalyzedPost();
    Object.assign(analyzedPost, analyzedPostParam);
    try {
      return await this.repository.save(analyzedPost);
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }
}
