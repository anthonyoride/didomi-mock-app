export interface IUserPayload {
    id: number,
    email: string,
    consents: Array<{id: string, enabled: boolean}>
}