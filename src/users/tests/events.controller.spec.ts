import {Test} from '@nestjs/testing'
import {EventsController} from '../controllers/events.controller'
import {EventsService} from '../services/events.service'

describe('EventsController', () => {
    let eventsController: EventsController
    let eventsService: EventsService

    beforeAll(async() => {
        const moduleRef = await Test.createTestingModule({
            controllers: [EventsController],
            providers: [
                {
                    provide: EventsService,
                    useValue: {
                        create: jest.fn()
                    }
                }
            ]
        }).compile()

        eventsService = moduleRef.get<EventsService>(EventsService)
        eventsController = moduleRef.get<EventsController>(EventsController)
    })

    describe('create', () => {
        it('should create a new consent change event for a user', async () => {
            const payload = {
                userId: 1,
                consents: [
                    {
                        id: 'email_notifications',
                        enabled: true
                    },
                    {
                        id: 'sms_notifications',
                        enabled: false
                    }
                ]
            }
            const result = [
                {
                    id: 1,
                    userId: 1,
                    cid: 'email_notifications',
                    enabled: true,
                    createdAt: (new Date()),
                    updatedAt: (new Date()),
                    user: null
                },
                {
                    id: 2,
                    userId: 1,
                    cid: 'sms_notifications',
                    enabled: false,
                    createdAt: (new Date()),
                    updatedAt: (new Date()),
                    user: null
                },
            ]

            jest.spyOn(eventsService, 'create').mockImplementation(async () => result)
            expect(await eventsController.create(payload)).toBe(result)
        })
    })
})