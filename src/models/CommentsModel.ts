import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument , Schema as MongooseSchema, Types} from 'mongoose';

export type CommentDBDocument = HydratedDocument<CommentDB>;

@Schema({ timestamps: true })
export class CommentDB {
    @Prop({ required: true })
    content: string;
  
    @Prop({ type: MongooseSchema.Types.ObjectId , ref: 'User' })
    userID:  Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId , ref: 'Blog' })
    blogID:  Types.ObjectId 
}

export const CommentDBSchema = SchemaFactory.createForClass(CommentDB);

