import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { AdminLang } from './../../../../graphql';

@Resolver()
@Permissions('admin.lang.get')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class GetLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminGetLangs')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<AdminLang[]>
    {
        return await this.queryBus.ask(new GetLangsQuery(queryStatement, constraint));
    }
}