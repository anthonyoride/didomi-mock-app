import {Module} from '@nestjs/common'
import {UserModule} from './users/users.module'
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import * as Joi from 'joi'
import {getConnectionOptions} from 'typeorm'

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV}`,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('dev', 'production', 'test')
                    .default('dev'),
                PORT: Joi.number().default(3000)
            })
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => Object.assign(await getConnectionOptions(), {
                autoLoadEntities: true
            })
        })
    ]
})

export class AppModule {}