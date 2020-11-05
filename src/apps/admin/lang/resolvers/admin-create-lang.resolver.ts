import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateLangCommand } from '@hades/admin/lang/application/create/create-lang.command';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { AdminCreateLangInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.lang.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCreateLang')
    async main(
        @Args('payload') payload: AdminCreateLangInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateLangCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, {}, { timezone }));
    }
}