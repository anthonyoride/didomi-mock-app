import {Exclude} from 'class-transformer'

export class EventEntity {
    id: string
    enabled: boolean

    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date

    constructor(partial: Partial<EventEntity>) {
        Object.assign(this, partial)
    }
}