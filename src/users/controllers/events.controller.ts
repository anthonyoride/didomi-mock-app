import {Controller, Post, Body} from '@nestjs/common'
import {EventsService} from '../services/events.service'
import {CreateEventDto} from '../dto/create-event.dto'

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @Post('create')
    async create(@Body() payload: CreateEventDto) {
        return this.eventsService.create(payload)
    }
}