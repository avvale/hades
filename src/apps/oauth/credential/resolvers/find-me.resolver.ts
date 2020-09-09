import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateCredentialCommand } from '@hades/oauth/credential/application/create/create-credential.command';

@Resolver()
export class FindMeResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthFindMe')
    async main()
    {
        return {
            createdAt: null,
            data: {shortcuts: []},
            deletedAt: null,
            email: 'john@gmail.com',
            id: '78982281-2974-4fac-8bbb-cadbffe0aa27',
            isActive: true,
            lang: {
                createdAt: null,
                deletedAt: null,
                id: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                ietf: 'es-ES',
                image: 'es',
                isActive: true,
                iso6392: 'es',
                iso6393: 'spa',
                name: 'Español',
                sort: 1,
                updatedAt: null
            },
            langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
            name: 'John',
            profiles: [],
            surname: 'Doe',
            updatedAt: '2020-04-28 14:43:25',
            username: 'john@gmail.com'
        };
    }
}