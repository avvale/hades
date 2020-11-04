import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetContactsQuery } from '@hades/cci/contact/application/get/get-contacts.query';
import { DeleteContactsCommand } from '@hades/cci/contact/application/delete/delete-contacts.command';

@ApiTags('[cci] contact')
@Controller('cci/contacts')
@Permissions('cci.contact.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteContactsController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete contacts in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ContactDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const contacts = await this.queryBus.ask(new GetContactsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteContactsCommand(queryStatement, constraint, { timezone }));

        return contacts;
    }
}