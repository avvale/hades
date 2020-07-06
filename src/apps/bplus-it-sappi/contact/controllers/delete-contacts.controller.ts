import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetContactsQuery } from '@hades/bplus-it-sappi/contact/application/get/get-contacts.query';
import { DeleteContactsCommand } from '@hades/bplus-it-sappi/contact/application/delete/delete-contacts.command';

@ApiTags('[bplus-it-sappi] contact')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: ContactDto})
@Controller('bplus-it-sappi/contacts')
export class DeleteContactsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete contacts in batch according to query' })
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const contacts = await this.queryBus.ask(new GetContactsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteContactsCommand(queryStatements));

        return contacts;
    }
}