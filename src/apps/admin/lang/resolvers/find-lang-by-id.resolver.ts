import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { AdminLang } from './../../../../graphql';

@Resolver()
@Permissions('admin.lang.get')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class FindLangByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindLangById')
    async main(@Args('id') id: string, @Args('constraint') constraint?: QueryStatement, ): Promise<AdminLang>
    {
        return await this.queryBus.ask(new FindLangByIdQuery(id, constraint));
    }
}