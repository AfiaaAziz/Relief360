import { IsOptional, IsString } from 'class-validator';

export class ReplyContactMessageDto {
    @IsOptional()
    @IsString()
    subject?: string;

    @IsString()
    message: string;
}


