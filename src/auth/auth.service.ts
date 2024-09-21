import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SignUpDto } from "src/deck/dto/signup.dto";
import * as bcrypt from 'bcryptjs';
import { LoginDto } from "src/deck/dto/login.dto";


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}


   async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {

     const { name, email, password, role } = signUpDto

     const hashedPassword = await bcrypt.hash(password, 10)

     const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role
     })

     const token = this.jwtService.sign( { id: user._id, email: user.email } )
     return { token }
   
   }

   async login(loginDto: LoginDto): Promise<{ token: string }> {
     
     const { email, password } = loginDto

     const user = await this.userModel.findOne({ email })

     if(!user){
        throw new UnauthorizedException("Email ou senha invalido.")
     }

     const isPasswordMatched = await bcrypt.compare(password, user.password)

     if(!isPasswordMatched){
        throw new UnauthorizedException("Email ou senha invalido.")
     }

     const token = this.jwtService.sign({ id: user._id, email: user.email })
     return { token }
   } 

   //------------------------------------------------------------

   async findAll(): Promise<User[]> {
      const users = await this.userModel.find();
      return users;
   }
   
   
   async create(user: User): Promise<User> {
      const res = await this.userModel.create(user);
      return res;
   }
   
   
   async findById(id: string): Promise<User> {
      const user = await this.userModel.findById(id);
   
      if(!user){
         throw new NotFoundException('O User não foi encontrado');
      }
   
      return user;
   }
   
   
   async updateById(id: string, user: User): Promise<User> {
      return await this.userModel.findByIdAndUpdate(id, user, {
         new: true,
         runValidators: true,
      });
   }
   
   
   async deleteById(id: string): Promise<User> {
      return await this.userModel.findByIdAndDelete(id);
   }

}
