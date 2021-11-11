import {
    Controller, 
    Post, 
    Get, 
    Delete, 
    Body, 
    Param, 
    ParseIntPipe, 
    UseInterceptors, 
    ClassSerializerInterceptor
} from '@nestjs/common'
import {UsersService} from '../services/users.service'
import {CreateUserDto} from '../dto/create-user.dto'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('create')
    async create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload)
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findById(id)
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }
}