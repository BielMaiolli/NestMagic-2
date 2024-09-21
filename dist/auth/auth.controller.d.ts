import { AuthService } from './auth.service';
import { SignUpDto } from 'src/deck/dto/signup.dto';
import { LoginDto } from 'src/deck/dto/login.dto';
import { User } from './schemas/user.schema';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    getAllUsers(): Promise<User[]>;
    getById(id: string): Promise<User>;
    updateUser(id: string, user: User): Promise<User>;
    deleteById(id: string): Promise<User>;
}
