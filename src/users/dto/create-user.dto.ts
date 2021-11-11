import {IsEmail, IsNotEmpty, Validate} from 'class-validator'
import {EmailUnique} from '../../common/decorators/validations/email-unique.decorator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @Validate(EmailUnique)
    email: string
}