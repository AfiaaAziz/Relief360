import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateContactMessageDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsString()
    department: string;

    @IsString()
    subject: string;

    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    priority?: string;
}
