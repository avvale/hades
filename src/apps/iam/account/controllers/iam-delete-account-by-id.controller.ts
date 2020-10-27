import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AccountDto } from './../dto/account.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { DeleteAccountByIdCommand } from '@hades/iam/account/application/delete/delete-account-by-id.command';

@ApiTags('[iam] account')
@Controller('iam/account')
@Permissions('iam.account.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteAccountByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete account by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AccountDto })
    async main(@Param('id') id: string, @Body('constraint') constraint?: QueryStatement)
    {
        const account = await this.queryBus.ask(new FindAccountByIdQuery(id, constraint));

        await this.commandBus.dispatch(new DeleteAccountByIdCommand(id, constraint));

        return account;
    }
}