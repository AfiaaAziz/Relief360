import { IsString, IsEnum } from 'class-validator';

export class CreateIncidentDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    location: string;

    @IsString()
    incident_type: string;

    @IsEnum(['low', 'medium', 'high', 'critical'])
    severity: string;
}
