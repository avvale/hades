import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateDataLakeCommand } from '@hades/cci/data-lake/application/create/create-data-lake.command';
import { FindDataLakeByIdQuery } from '@hades/cci/data-lake/application/find/find-data-lake-by-id.query';
import { CciCreateDataLakeInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.dataLake.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateDataLakeResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciCreateDataLake')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciCreateDataLakeInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateDataLakeCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindDataLakeByIdQuery(payload.id, {}, { timezone }));
    }
}