import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalDto } from './create-hospital.dto';
import { IsOptional, IsNumber, IsString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateHospitalDto extends PartialType(CreateHospitalDto) {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    totalBeds?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    icuBeds?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    emergencyBeds?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    staffCount?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    ambulances?: number;

    @IsOptional()
    @IsString()
    hospitalName?: string;

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
}
