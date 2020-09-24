import { AccountResponse } from '@hades/iam/account/domain/account.response';




export class UserResponse 
{
    constructor(
        public readonly id: string,
        public readonly accountId: string,
        public readonly surname: string,
        public readonly avatar: string,
        public readonly email: string,
        public readonly mobile: string,
        public readonly langId: string,
        public readonly username: string,
        public readonly password: string,
        public readonly rememberToken: string,
        public readonly data: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
        public readonly account: AccountResponse,
        
        
        
        
        
    ) {}
}