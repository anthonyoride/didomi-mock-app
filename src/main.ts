import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'
import {useContainer} from 'class-validator'

const bootstrap = async(): Promise<void> => {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api/v1')
    useContainer(app.select(AppModule), {fallbackOnErrors: true})
    await app.listen(3000)
}

bootstrap()