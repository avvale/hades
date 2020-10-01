import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AccountDto } from './../dto/account.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { DeleteAccountByIdCommand } from '@hades/iam/account/application/delete/delete-account-by-id.command';

@ApiTags('[iam] account')
@Controller('iam/account')
export class DeleteAccountByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete account by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AccountDto })
    async main(@Param('id') id: string)
    {
        const account = await this.queryBus.ask(new FindAccountByIdQuery(id));

        await this.commandBus.dispatch(new DeleteAccountByIdCommand(id));

        return account;
    }
}