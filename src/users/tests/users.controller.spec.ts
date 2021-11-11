import {Test} from '@nestjs/testing'
import {UsersController} from '../controllers/users.controller'
import {UsersService} from '../services/users.service'

describe('UsersController', () => {
    let usersController: UsersController
    let usersService: UsersService

    beforeAll(async() => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        create: jest.fn(),
                        getUser: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        }).compile()

        usersService = moduleRef.get<UsersService>(UsersService)
        usersController = moduleRef.get<UsersController>(UsersController)
    })

    describe('create', () => {
        it('should create a new user', async () => {
            const payload = {email: 'anthonyoride@gmail.com'}
            const result = {
                id: 1, 
                email: 'anthonyoride@gmail.com', 
                createdAt: (new Date()), 
                updatedAt: (new Date()), 
                deletedAt: (new Date()),
                consents: []
            }

            jest.spyOn(usersService, 'create').mockImplementation(async () => result)
            expect(await usersController.create(payload)).toBe(result)
        })
    })

    describe('getUser', () => {
        it('should return a user and their consents', async () => {
            const result = {
                id: 1,
                email: 'anthonyoride@gmail.com',
                consents: [
                    {
                        id: 'email_notifications',
                        enabled: false
                    },
                    {
                        id: 'sms_notifications',
                        enabled: true
                    }
                ]
            }

            jest.spyOn(usersService, 'getUser').mockImplementation(async () => result)
            expect(await usersController.getUser(1)).toBe(result)
        })
    })

    describe('delete', () => {
        it('should remove a user from the database', async () => {
            const result = {
                generatedMaps: [],
                raw: [],
                affected: 1
            }

            jest.spyOn(usersService, 'delete').mockImplementation(async () => result)
            expect(await usersController.delete(1)).toBe(result)
        })
    }) 
})