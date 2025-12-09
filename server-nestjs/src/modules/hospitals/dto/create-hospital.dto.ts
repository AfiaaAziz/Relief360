import { IsString, IsEmail, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateHospitalDto {
    @IsString()
    @IsNotEmpty()
    hospitalName: string;

    @IsOptional()
    @IsString()
    hospitalType?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    emergencyPhone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNumber()
    totalBeds?: number;

    @IsOptional()
    @IsNumber()
    icuBeds?: number;

    @IsOptional()
    @IsNumber()
    emergencyBeds?: number;

    @IsOptional()
    @IsNumber()
    ambulances?: number;

    @IsOptional()
    @IsNumber()
    staffCount?: number;

    @IsOptional()
    @IsString()
    contactName?: string;

    @IsOptional()
    @IsString()
    contactPosition?: string;

    @IsOptional()
    @IsString()
    contactPhone?: string;

    @IsOptional()
    @IsEmail()
    contactEmail?: string;

    @IsOptional()
    @IsString()
    additionalInfo?: string;

    @IsOptional()
    services?: string[];

    @IsOptional()
    terms?: boolean;

    @IsOptional()
    dataSharing?: boolean;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    confirmPassword?: string;
}
