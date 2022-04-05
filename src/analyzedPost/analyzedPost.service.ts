import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnalyzedPostDto } from './dto/create-analyzedPost.dto';
import { AnalyzedPost } from './entities/analyzedPost.entity';

@Injectable()
export class AnalyzedPostService {
  @InjectRepository(AnalyzedPost)
  private readonly repository: Repository<AnalyzedPost>;

  public getAnalyzedPost(id: number): Promise<AnalyzedPost> {
    return this.repository.findOne(id);
  }

  public createAnalyzedPost(body: CreateAnalyzedPostDto) {
    // const user: Post = new Post();
    // user.name = body.name;
    // user.email = body.email;
    // return this.repository.save(user);
  }
}
