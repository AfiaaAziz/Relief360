import { IsString, IsEmail, IsOptional, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';

export class CreateVolunteerDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    age?: string;

    @IsOptional()
    @IsString()
    availability?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    experience?: string;

    @IsOptional()
    @IsString()
    motivation?: string;

    @IsOptional()
    @IsBoolean()
    terms_accepted?: boolean;

    @IsOptional()
    @IsBoolean()
    background_check?: boolean;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    selected_skills?: string[];

    @IsOptional()
    @IsString()
    password?: string;
}
