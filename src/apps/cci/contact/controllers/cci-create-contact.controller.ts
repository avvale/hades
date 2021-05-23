import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateContactDto } from './../dto/create-contact.dto';
import { ContactDto } from './../dto/contact.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { TenantPolicy } from '@hades/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindContactByIdQuery } from '@hades/cci/contact/application/find/find-contact-by-id.query';
import { CreateContactCommand } from '@hades/cci/contact/application/create/create-contact.command';

@ApiTags('[cci] contact')
@Controller('cci/contact')
@Permissions('cci.contact.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateContactController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create contact' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ContactDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateContactDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateContactCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindContactByIdQuery(payload.id, {}, { timezone }));
    }
}