import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateContactDto } from './../dto/create-contact.dto';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindContactByIdQuery } from '@hades/cci/contact/application/find/find-contact-by-id.query';
import { CreateContactCommand } from '@hades/cci/contact/application/create/create-contact.command';

@ApiTags('[cci] contact')
@Controller('cci/contact')
export class CreateContactController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create contact' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ContactDto })
    async main(@Body() payload: CreateContactDto)
    {
        await this.commandBus.dispatch(new CreateContactCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.roleId,
            payload.roleName,
            payload.name,
            payload.surname,
            payload.email,
            payload.mobile,
            payload.area,
            payload.hasConsentEmail,
            payload.hasConsentMobile,
            payload.isActive,
            
        ));

        return await this.queryBus.ask(new FindContactByIdQuery(payload.id));
    }
}