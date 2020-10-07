import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import * as _ from 'lodash';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateChannelsQuery } from '@hades/cci/channel/application/paginate/paginate-channels.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
@Permissions('iam.tenant.update')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class PaginateChannelsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciPaginateChannels')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        const constraint2 = _.merge(constraint, {
            where: {
                tenantId: 'a'
            }
        })
        console.log(constraint2)

        console.log(constraint)
       /*  {
            where: {
                tenantId
            }
        } */
        return await this.queryBus.ask(new PaginateChannelsQuery(queryStatement, constraint));   
    }
}