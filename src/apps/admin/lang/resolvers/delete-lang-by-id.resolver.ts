import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { DeleteLangByIdCommand } from '@hades/admin/lang/application/delete/delete-lang-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('admin.lang.delete')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class DeleteLangByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteLangById')
    async main(@Args('id') id: string, @Args('constraint') constraint?: QueryStatement, )
    {
        const lang = await this.queryBus.ask(new FindLangByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteLangByIdCommand(id, constraint));

        return lang;
    }
}