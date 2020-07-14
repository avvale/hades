import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateContactDto } from './../dto/create-contact.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { InsertContactsCommand } from '@hades/bplus-it-sappi/contact/application/insert/insert-contacts.command';

@ApiTags('[bplus-it-sappi] contact')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('bplus-it-sappi/contacts')
export class InsertContactsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Insert contacts in batch' })
    @ApiBody({ 
        type: [CreateContactDto]
    })
    async main(@Body() payload: CreateContactDto[])
    {
        await this.commandBus.dispatch(new InsertContactsCommand(payload));
    }
}