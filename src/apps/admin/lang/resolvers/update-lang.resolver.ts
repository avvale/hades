import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminUpdateLangInput } from './../../../../graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateLangCommand } from '@hades/admin/lang/application/update/update-lang.command';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';

@Resolver()
@Permissions('admin.lang.update')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class UpdateLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminUpdateLang')
    async main(@Args('payload') payload: AdminUpdateLangInput, @Args('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateLangCommand(
            payload.id,
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.sort,
            payload.isActive,
            constraint,
        ));
        
        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, constraint));
    }
}