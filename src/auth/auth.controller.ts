import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/deck/dto/signup.dto';
import { LoginDto } from 'src/deck/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

@Post('/signup')
signUp( @Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
}

@Get('/login')
login( @Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
}

//---------------------------------------------------

@Get('allUsers')
async getAllUsers(): Promise<User[]> {
  return this.authService.findAll();
}   

@Get(':id')
async getById(
 @Param('id')
 id: string,
): Promise<User> {
  return this.authService.findById(id);
}

@Put('updateUser/:id')
@UseGuards(AuthGuard())
async updateUser(
  @Param('id')
  id: string,
  @Body()
  user: User,
): Promise<User> {
  return this.authService.updateById(id, user);
}


@Delete('deleteUser/:id')
@UseGuards(AuthGuard())
async deleteById(
     @Param('id')
     id: string,
 ): Promise<User> {
     return this.authService.deleteById(id);
 }
}

