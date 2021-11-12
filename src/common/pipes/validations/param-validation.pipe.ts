import {PipeTransform, Injectable, ArgumentMetadata, NotFoundException} from '@nestjs/common'
import {UsersService} from '../../../users/services/users.service'

@Injectable()
export class ParamValidationPipe implements PipeTransform {
    constructor(private usersService: UsersService) {}
    async transform(value: any, metadata: ArgumentMetadata) {
        const user = await this.usersService.findById(value)
        if(!user) {
            throw new NotFoundException(null, 'User not found')
        }

        return value
    }
}