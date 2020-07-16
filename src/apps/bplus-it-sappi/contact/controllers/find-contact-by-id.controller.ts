import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ContactDto } from './../dto/contact.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindContactByIdQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact-by-id.query';

@ApiTags('[bplus-it-sappi] contact')
@Controller('bplus-it-sappi/contact')
export class FindContactByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find contact by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ContactDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindContactByIdQuery(id));
    }
}