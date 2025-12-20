import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateIncidentDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    location: string;

    @IsEnum(['low', 'medium', 'high', 'critical'])
    severity: string;

    @IsOptional()
    @IsString()
    contact_person?: string;

    @IsOptional()
    @IsString()
    contact_phone?: string;

    @IsOptional()
    @IsString()
    reported_by_email?: string;

    @IsOptional()
    @IsString()
    media_files?: string; // JSON string of file information
}
