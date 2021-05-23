import { UserDTO } from "./user";

export interface User {
    name: string;
    password: string;
}

export function toUser(userDTO: UserDTO): User {
    return {
        name: userDTO.name,
        password: userDTO.password,
    };
}