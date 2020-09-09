import { Resolver, Query } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';

@Resolver()
export class FindMePermissionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindMePermissions')
    async main()
    {
        return [
            {
                createdAt: null,
                deletedAt: null,
                uuid: '03eff917-097a-41db-9401-f73e63fec943',
                laravelThroughKey: '78982281-2974-4fac-8bbb-cadbffe0aa27',
                name: 'admin.permission.role.create',
                package: {
                    createdAt: null,
                    deletedAt: null,
                    id: '9e8dbba3-b82b-406f-b71f-060a0494ffba',
                    isActive: true,
                    name: 'Admin',
                    root: 'admin',
                    sort: 20,
                    updatedAt: null,
                },
                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba',
                updatedAt: null,
            }
        ];
    }
}