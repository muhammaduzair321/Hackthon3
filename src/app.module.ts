import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { CategorylistModule } from './categorylist/categorylist.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://uzairsb321:2548FAEf@hackathon01.y7kxsdm.mongodb.net/', {
      dbName: 'CodingApp',
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    BlogModule,
    CategorylistModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
