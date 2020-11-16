import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateUsersCommand
{
    constructor(
        public readonly payload: {
            id: string,
            accountId: string,
            name: string,
            surname?: string,
            avatar?: string,
            mobile?: string,
            langId?: string,
            username: string,
            password: string,
            rememberToken?: string,
            data?: any,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}