import {Inject} from '@nestjs/common'
import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import {UsersService} from '../../../users/services/users.service'

@ValidatorConstraint({name: 'UserExists', async: true})
export class UserExists implements ValidatorConstraintInterface {
    constructor(@Inject(UsersService) private usersService: UsersService) {}

    async validate(id: number) {
        const user = await this.usersService.findById(id)
        if(user) {
            return true
        }

        return false
    }

    defaultMessage() {
        return 'User does not exist'
    }
}