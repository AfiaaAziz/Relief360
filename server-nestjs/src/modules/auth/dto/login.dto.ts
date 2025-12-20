import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    @IsIn(['citizen', 'volunteer', 'hospital'])
    role?: string;
}
