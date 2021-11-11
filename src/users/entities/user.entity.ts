import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from 'typeorm'
import {Event} from './event.entity'

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    email: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => Event, event => event.user)
    consents: Event[]
}