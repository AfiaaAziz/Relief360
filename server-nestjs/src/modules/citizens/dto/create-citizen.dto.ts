import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCitizenDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    postal_code?: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

