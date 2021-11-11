import {Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'
import {Event} from '../entities/event.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {IEvent} from '../interfaces/event.interface'

@Injectable()
export class EventsService {
    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>) {}

    async create(payload: IEvent): Promise<Event[]> {
        let createdEvents = []
        for(let index = 0; index < payload.consents.length; index++) {
            const eventPayload = this.eventRepository.create({
                userId: payload.userId,
                cid: payload.consents[index].id,
                enabled: payload.consents[index].enabled
            })

            const event = await this.eventRepository.save(eventPayload)
            createdEvents.push(event)
        }

        return createdEvents
    }
}