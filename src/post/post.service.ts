import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto as CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  @InjectRepository(Post)
  private readonly repository: Repository<Post>;

  public getUser(id: number): Promise<Post> {
    return this.repository.findOne(id);
  }

  public createPost(body: CreatePostDto) {
    // const user: Post = new Post();
    // user.name = body.name;
    // user.email = body.email;
    // return this.repository.save(user);
  }
}
