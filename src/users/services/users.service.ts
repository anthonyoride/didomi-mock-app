import {Injectable, NotFoundException} from '@nestjs/common'
import {Repository} from 'typeorm'
import {User} from '../entities/user.entity'
import {IUserPayload} from '../interfaces/user-payload.interface'
import {InjectRepository} from '@nestjs/typeorm'
import {IUser} from '../interfaces/user.interface'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(payload: IUser): Promise<User> {
        return this.userRepository.save(payload)
    }

    async findById(id: number): Promise<IUserPayload> {
        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.id = :id', {id})
            .leftJoin('user.consents', 'consent')
            .select(['user.id', 'user.email', 'consent.enabled', 'consent.cid'])
            .orderBy('consent.cid', 'ASC')
            .addOrderBy('consent.id', 'DESC')
            .distinctOn(['consent.cid'])
            .getOne()
        
        if(!user) {
            throw new NotFoundException(null, 'User not found')
        }
        
        return {
            id: user.id,
            email: user.email,
            consents: user.consents.map(consent => {
                return {
                    id: consent.cid,
                    enabled: consent.enabled
                }
            })
        }
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({email})
    }

    async delete(id: number) {
        return this.userRepository.softDelete(id)
    }
}