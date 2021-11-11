import {IsNotEmpty, IsInt, IsArray, ArrayMaxSize, ValidateNested, Validate} from 'class-validator'
import {Type} from 'class-transformer'
import {ConsentItemsDto} from './consent-items.dto'
import {UserExists} from '../../common/decorators/validations/user-exists.decorator'

export class CreateEventDto {
    @IsNotEmpty()
    @IsInt()
    @Validate(UserExists)
    userId: number

    @IsArray()
    @ArrayMaxSize(2)
    @ValidateNested({each: true})
    @Type(() => ConsentItemsDto)
    consents: ConsentItemsDto[]
}