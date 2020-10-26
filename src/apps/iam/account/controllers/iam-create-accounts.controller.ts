import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AccountDto } from './../dto/account.dto';
import { CreateAccountDto } from './../dto/create-account.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAccountsCommand } from '@hades/iam/account/application/create/create-accounts.command';

@ApiTags('[iam] account')
@Controller('iam/accounts')
@Permissions('iam.account.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateAccountsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create accounts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AccountDto] })
    @ApiBody({ type: [CreateAccountDto] })
    async main(@Body() payload: CreateAccountDto[])
    {
        await this.commandBus.dispatch(new CreateAccountsCommand(payload));
    }
}