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
import { CreateCountriesCommand } from '@hades/admin/country/application/create/create-countries.command';
import { AdminCreateCountryInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.country.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminCreateCountriesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminCreateCountries')
    async main(
        @Args('payload') payload: AdminCreateCountryInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateCountriesCommand(payload, { timezone }));
        return true;
    }
}