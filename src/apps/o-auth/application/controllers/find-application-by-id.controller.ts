import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApplicationDto } from './../dto/application.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';

@ApiTags('[o-auth] application')
@Controller('o-auth/application')
export class FindApplicationByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find application by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ApplicationDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindApplicationByIdQuery(id));
    }
}