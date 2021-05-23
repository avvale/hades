import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';
import { CreateContactDto } from './../dto/create-contact.dto';
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
import { CreateContactsCommand } from '@hades/cci/contact/application/create/create-contacts.command';

@ApiTags('[cci] contact')
@Controller('cci/contacts')
@Permissions('cci.contact.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateContactsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create contacts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ContactDto] })
    @ApiBody({ type: [CreateContactDto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateContactDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateContactsCommand(payload, { timezone }));
    }
}