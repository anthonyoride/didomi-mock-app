import {Module} from '@nestjs/common'
import {User} from './entities/user.entity'
import {Event} from './entities/event.entity'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UsersService} from './services/users.service'
import {EventsService} from './services/events.service'
import {UsersController} from './controllers/users.controller'
import {EventsController} from './controllers/events.controller'
import {EmailUnique} from '../common/decorators/validations/email-unique.decorator'
import {UserExists} from '../common/decorators/validations/user-exists.decorator'

@Module({
    exports: [UsersService, EventsService, EmailUnique, UserExists],
    imports: [TypeOrmModule.forFeature([User, Event])],
    controllers: [UsersController, EventsController],
    providers: [UsersService, EventsService, EmailUnique, UserExists]
})

export class UserModule {}