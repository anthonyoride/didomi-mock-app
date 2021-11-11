import {Exclude} from 'class-transformer'

export class UserEntity {
    id: number
    email: string

    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date

    @Exclude()
    deletedAt: Date

    @Exclude()
    consents: Array<{id: string, enabled: boolean}>

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }
}