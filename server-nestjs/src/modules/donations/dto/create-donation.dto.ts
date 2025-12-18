import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class CreateDonationDto {
    @IsOptional()
    @IsString()
    donor?: string;

    @IsOptional()
    @IsString()
    donor_name?: string;

    @IsOptional()
    @IsString()
    @IsIn(['Money', 'money', 'Supplies', 'supplies', 'Supply'])
    type?: string;

    @IsOptional()
    @IsString()
    amount?: string;

    @IsOptional()
    @IsNumber()
    amount_value?: number;

    @IsOptional()
    @IsString()
    item?: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;
}
