import {
    IsString,
    IsEmail,
    IsOptional,
    IsNumber,
    IsNotEmpty,
    IsBoolean,
    IsArray,
    ArrayNotEmpty,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class CreateHospitalDto {
    @IsString()
    @IsNotEmpty()
    hospitalName: string;
  
    @IsString()
    @IsNotEmpty()
    hospitalType: string;
  
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @IsString()
    @IsNotEmpty()
    phone: string;
  
    @IsString()
    @IsNotEmpty()
    emergencyPhone: string;
  
    @IsEmail()
    email: string;
  
    @Type(() => Number)
    @IsNumber()
    totalBeds: number;
  
    @Type(() => Number)
    @IsNumber()
    icuBeds: number;
  
    @Type(() => Number)
    @IsNumber()
    emergencyBeds: number;
  
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    ambulances?: number;
  
    @Type(() => Number)
    @IsNumber()
    staffCount: number;
  
    @IsString()
    contactName: string;
  
    @IsString()
    contactPosition: string;
  
    @IsString()
    contactPhone: string;
  
    @IsEmail()
    contactEmail: string;
  
    @IsOptional()
    @IsString()
    additionalInfo?: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    services?: string[];
  
    @IsBoolean()
    terms: boolean;
  
    @IsOptional()
    @IsBoolean()
    dataSharing?: boolean;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsOptional()
    @IsString()
    confirmPassword?: string;
  }
  