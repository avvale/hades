import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AccountDto } from './../dto/account.dto';
import { CreateAccountDto } from './../dto/create-account.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateAccountsCommand } from '@hades/iam/account/application/create/create-accounts.command';

@ApiTags('[iam] account')
@Controller('iam/accounts')
export class CreateAccountsController 
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