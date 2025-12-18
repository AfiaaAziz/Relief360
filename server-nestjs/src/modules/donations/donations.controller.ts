import { Controller, Get, Post, Body } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('api/donations')
export class DonationsController {
    constructor(private donationsService: DonationsService) {}

    @Get()
    async findAll() {
        return this.donationsService.findAll();
    }

    @Post()
    async create(@Body() dto: CreateDonationDto) {
        return this.donationsService.create(dto);
    }
}
