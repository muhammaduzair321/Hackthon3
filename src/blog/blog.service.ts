import { Body, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from 'src/models/BlogModel';
import { InjectModel } from '@nestjs/mongoose';
// import * as path from 'path';
// import * as fs from 'fs';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async create(
    createBlogDto: CreateBlogDto,
    // file: Express.Multer.File,
  ): Promise<BlogDocument> {
    // Process the thumbnail file and save it to your preferred storage (e.g., Amazon S3, local storage)
    // const thumbnailUrl = await this.uploadThumbnail(file);
    // Create a new Post entity with the thumbnail URL
    // console.log('object', createBlogDto, thumbnailUrl);
    const newBlog = new this.blogModel({
      ...createBlogDto,
      // thumbnailUrl,
    });
    return newBlog.save();
  }
  // async uploadThumbnail(file: Express.Multer.File): Promise<string> {
  //   const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //   const uploadPath = path.join('uploads', uniqueFilename);
  //   await fs.promises.writeFile(uploadPath, file.buffer);
  //   return uploadPath;
  // }

  findAll() : Promise<Blog[]>{
    // return `This action returns all blog`;
    return this.blogModel.find().populate("authorId").sort({ createdAt: -1 }) // Sort in descending order;
  }

  findOne(id: string) {
    console.log(id)
    return this.blogModel.findById(id).populate("authorId");
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}

// @Injectable()
// export class BlogService {
//   constructor(
//     @InjectRepository(Post)
//     private postRepository: Repository<Post>,
//   ) {}
//   async createPost(createPostDto: CreatePostDto, thumbnail: Express.Multer.File): Promise<Post> {
//     // Process the thumbnail file and save it to your preferred storage (e.g., Amazon S3, local storage)
//     const thumbnailUrl = await this.uploadThumbnail(thumbnail);
//     // Create a new Post entity with the thumbnail URL
//     const post = this.postRepository.create({
//       title: createPostDto.title,
//       thumbnailUrl,
//       description: createPostDto.description,
//     });
//     return this.postRepository.save(post);
//   }
//   async uploadThumbnail(thumbnail: Express.Multer.File): Promise<string> {
//     // Handle the file upload logic here (e.g., save to local storage or cloud storage)
//     // Return the URL or path of the uploaded thumbnail
//     return 'path/to/uploaded/thumbnail';
//   }
// }
