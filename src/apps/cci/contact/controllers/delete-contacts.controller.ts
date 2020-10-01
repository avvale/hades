import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetContactsQuery } from '@hades/cci/contact/application/get/get-contacts.query';
import { DeleteContactsCommand } from '@hades/cci/contact/application/delete/delete-contacts.command';

@ApiTags('[cci] contact')
@Controller('cci/contacts')
export class DeleteContactsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete contacts in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ContactDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const contacts = await this.queryBus.ask(new GetContactsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteContactsCommand(queryStatement));

        return contacts;
    }
}