import {Inject} from '@nestjs/common'
import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import {UsersService} from '../../../users/services/users.service'

@ValidatorConstraint({name: 'EmailUnique', async: true})
export class EmailUnique implements ValidatorConstraintInterface {
    constructor(@Inject(UsersService) private usersService: UsersService) {}

    async validate(email: string) {
        const user = await this.usersService.findByEmail(email)
        if(user) {
            return false
        }

        return true
    }

    defaultMessage() {
        return 'Email already exists'
    }
}