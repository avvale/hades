import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateAccountDto } from './../dto/create-account.dto';
import { AccountDto } from './../dto/account.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { CreateAccountCommand } from '@hades/iam/account/application/create/create-account.command';

@ApiTags('[iam] account')
@Controller('iam/account')
export class CreateAccountController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
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
            payload.dTenants,
            payload.data,
            payload.roleIds,
            payload.tenantIds,
            
        ));

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id));
    }
}