import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteLangsCommand } from '@hades/admin/lang/application/delete/delete-langs.command';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('admin.lang.delete')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class DeleteLangsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteLangs')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, )
    {
        const langs = await this.queryBus.ask(new GetLangsQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeleteLangsCommand(queryStatement, constraint));

        return langs;
    }
}