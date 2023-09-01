import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentDB, CommentDBSchema } from 'src/models/CommentsModel';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CommentDB.name, schema: CommentDBSchema }]),
    AuthModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
