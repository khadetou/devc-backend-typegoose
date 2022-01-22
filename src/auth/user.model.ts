import { prop } from '@typegoose/typegoose';

import { IsString, Matches, IsEmail } from 'class-validator';

export class User {
  @IsString()
  @prop({ required: true })
  name: string;
  @prop()
  avatar: string;
  @IsEmail()
  @prop({ required: true })
  email: string;
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
  )
  @prop({ required: true })
  password: string;
  @prop()
  date: Date;
  @prop()
  createdAt: Date;
  @prop()
  updatedAt: Date;
}
