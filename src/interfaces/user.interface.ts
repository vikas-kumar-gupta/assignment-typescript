declare namespace UserRequest {

    export interface Register {
        username: string,
        email: string,
        password: string,
        status: String,
        createdAt: Date,
        updatedAt: Date,
    }

    export interface Login {
        username: string,
        password: string
    }

    export interface Username {
        username: string
    }

    export interface UpdateUser {
        email: string,
        password: string,
        status: String,
        updatedAt: Date,
    }
}