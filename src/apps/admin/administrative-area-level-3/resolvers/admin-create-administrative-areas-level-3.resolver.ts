import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateAdministrativeAreasLevel3Command } from '@hades/admin/administrative-area-level-3/application/create/create-administrative-areas-level-3.command';
import { AdminCreateAdministrativeAreaLevel3Input } from './../../../../graphql';

@Resolver()
@Permissions('admin.administrativeAreaLevel3.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCreateAdministrativeAreasLevel3')
    async main(
        @Args('payload') payload: AdminCreateAdministrativeAreaLevel3Input[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAdministrativeAreasLevel3Command(payload, { timezone }));
        return true;
    }
}