import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateContactDto } from './../dto/update-contact.dto';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateContactCommand } from '@hades/bplus-it-sappi/contact/application/update/update-contact.command';
import { FindContactByIdQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact-by-id.query';

@ApiTags('[bplus-it-sappi] contact')
@Controller('bplus-it-sappi/contact')
export class UpdateContactController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update contact' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ContactDto})
    async main(@Body() payload: UpdateContactDto)
    {
        await this.commandBus.dispatch(new UpdateContactCommand(
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