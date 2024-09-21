import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enums/role.enum";

@Schema({
    timestamps: true,
})

export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ unique: true, required: true, message: 'O email já foi utilizado' })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        type: [{type: String, enum: Role}],
        default: [Role.USER]
    })
    role: Role[];

}

export const UserSchema = SchemaFactory.createForClass(User);
