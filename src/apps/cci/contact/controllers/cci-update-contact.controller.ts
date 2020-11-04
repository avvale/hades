import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateContactDto } from './../dto/update-contact.dto';
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
import { UpdateContactCommand } from '@hades/cci/contact/application/update/update-contact.command';
import { FindContactByIdQuery } from '@hades/cci/contact/application/find/find-contact-by-id.query';

@ApiTags('[cci] contact')
@Controller('cci/contact')
@Permissions('cci.contact.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciUpdateContactController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update contact' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ContactDto})
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: UpdateContactDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateContactCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindContactByIdQuery(payload.id, constraint, { timezone }));
    }
}