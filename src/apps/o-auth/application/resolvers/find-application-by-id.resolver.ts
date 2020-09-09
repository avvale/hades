import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';
import { OAuthApplication } from './../../../../graphql';

@Resolver()
export class FindApplicationByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindApplicationById')
    async main(@Args('id') id: string): Promise<OAuthApplication>
    {
        return await this.queryBus.ask(new FindApplicationByIdQuery(id));
    }
}