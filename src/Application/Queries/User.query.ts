export class User {
    readonly id: string;
    readonly email: string;
    readonly name: string;
}

export interface UserQuery {
    findById: (id: string) => Promise<User>
}