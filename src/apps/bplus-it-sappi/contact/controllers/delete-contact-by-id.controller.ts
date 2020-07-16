import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindContactByIdQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact-by-id.query';
import { DeleteContactByIdCommand } from '@hades/bplus-it-sappi/contact/application/delete/delete-contact-by-id.command';

@ApiTags('[bplus-it-sappi] contact')
@Controller('bplus-it-sappi/contact')
export class DeleteContactByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete contact by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ContactDto })
    async main(@Param('id') id: string)
    {
        const contact = await this.queryBus.ask(new FindContactByIdQuery(id));

        await this.commandBus.dispatch(new DeleteContactByIdCommand(id));

        return contact;
    }
}