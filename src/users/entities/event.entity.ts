import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import {User} from './user.entity'

@Entity({name: 'events'})
export class Event {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'uuid', name: 'user_id'})
    userId: number

    @Column({name: 'cid'})
    cid: string

    @Column()
    enabled: boolean

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @ManyToOne(() => User, user => user.consents)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user?: User
}