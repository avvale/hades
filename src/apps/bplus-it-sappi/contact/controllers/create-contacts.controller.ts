import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';
import { CreateContactDto } from './../dto/create-contact.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateContactsCommand } from '@hades/bplus-it-sappi/contact/application/create/create-contacts.command';

@ApiTags('[bplus-it-sappi] contact')
@Controller('bplus-it-sappi/contacts')
export class CreateContactsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create contacts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ContactDto] })
    @ApiBody({ type: [CreateContactDto] })
    async main(@Body() payload: CreateContactDto[])
    {
        await this.commandBus.dispatch(new CreateContactsCommand(payload));
    }
}