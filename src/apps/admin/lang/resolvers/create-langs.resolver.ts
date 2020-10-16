import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';
import { AdminCreateLangInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.lang.create')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class CreateLangsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateLangs')
    async main(@Args('payload') payload: AdminCreateLangInput[])
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload));
        return true;
    }
}