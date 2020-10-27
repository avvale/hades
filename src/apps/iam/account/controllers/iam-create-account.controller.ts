import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateAccountDto } from './../dto/create-account.dto';
import { AccountDto } from './../dto/account.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { CreateAccountCommand } from '@hades/iam/account/application/create/create-account.command';

@ApiTags('[iam] account')
@Controller('iam/account')
@Permissions('iam.account.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateAccountController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create account' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AccountDto })
    async main(@Body() payload: CreateAccountDto)
    {
        await this.commandBus.dispatch(new CreateAccountCommand(
            payload.id,
            payload.type,
            payload.email,
            payload.isActive,
            payload.clientId,
            payload.dApplicationCodes,
            payload.dPermissions,
            payload.data,
            payload.roleIds,
            payload.tenantIds,
            
        ));

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id));
    }
}