import 'next-auth'

declare module 'next-auth'{
    interface Session {
        user : {
            _id? : string,
            isVerified? : boolean,
            isAcceptingMessage? : boolean,
            username? : string
        } & DefaulrSessin['user']
    }
    interface User {
        _id? : string,
        isVerified? : boolean,
        isAcceptingMessage? : boolean,
        username? : string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id? : string,
        isVerified? : boolean,
        isAcceptingMessage? : boolean,
        username? : string
    }
}