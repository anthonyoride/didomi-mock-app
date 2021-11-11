import {IsNotEmpty, IsInt, IsArray, ArrayMaxSize, ValidateNested, Validate} from 'class-validator'
import {Type} from 'class-transformer'
import {ConsentItemsDto} from './consent-items.dto'
import {UserExists} from '../../common/decorators/validations/user-exists.decorator'

export class CreateEventDto {
    @Validate(UserExists)
    @IsInt()
    @IsNotEmpty()
    userId: number

    @ValidateNested({each: true})
    @ArrayMaxSize(2)
    @IsArray()
    @Type(() => ConsentItemsDto)
    consents: ConsentItemsDto[]
}