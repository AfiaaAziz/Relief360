import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateFeedbackDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    priority?: string;
}
