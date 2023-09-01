import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument , Schema as MongooseSchema, Types} from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
    @Prop({ required: true })
    title: string;
  
    // @Prop({ required: true })
    // shortDescription: string;
  
    @Prop({ required: true })
    blogBody: string;

    // @Prop({ required: true })
    // thumbnailUrl: string;

    @Prop({ type: MongooseSchema.Types.ObjectId , ref: 'User' })
    authorId:  Types.ObjectId 

}

export const BlogSchema = SchemaFactory.createForClass(Blog);

