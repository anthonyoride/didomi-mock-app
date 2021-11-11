import {IsNotEmpty, IsBoolean, IsIn} from 'class-validator'

export class ConsentItemsDto {
    @IsNotEmpty()
    @IsIn(['email_notifications', 'sms_notifications'])
    id: string

    @IsNotEmpty()
    @IsBoolean()
    enabled: boolean
}