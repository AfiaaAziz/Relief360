import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('admin-login')
    async adminLogin(@Body() adminLoginDto: AdminLoginDto) {
        return this.authService.adminLogin(adminLoginDto);
    }

    @Get('me')
    @UseGuards(JwtGuard)
    async getMe(@Request() req) {
        return this.authService.validateUser(req.user.id);
    }
}
