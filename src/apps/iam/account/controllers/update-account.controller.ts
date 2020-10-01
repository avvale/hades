import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateAccountDto } from './../dto/update-account.dto';
import { AccountDto } from './../dto/account.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateAccountCommand } from '@hades/iam/account/application/update/update-account.command';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';

@ApiTags('[iam] account')
@Controller('iam/account')
export class UpdateAccountController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update account' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AccountDto})
    async main(@Body() payload: UpdateAccountDto)
    {
        await this.commandBus.dispatch(new UpdateAccountCommand(
            payload.id,
            payload.type,
            payload.email,
            payload.isActive,
            payload.clientId,
            payload.applicationCodes,
            payload.permissions,
            payload.data,
            payload.roleIds,
            payload.tenantIds,
            
        ));

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id));
    }
}