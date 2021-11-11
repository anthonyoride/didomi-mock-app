export interface IEvent {
    userId: number
    consents: Array<{id: string, enabled: boolean}>
}