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
}
