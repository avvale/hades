import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindBoundedContextByIdQuery } from '@hades/admin/bounded-context/application/find/find-bounded-context-by-id.query';

@ApiTags('[admin] bounded-context')
@ApiOkResponse({ description: 'The record has been successfully created.', type: BoundedContextDto})
@Controller('admin/bounded-context')
export class FindBoundedContextByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find bounded-context by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(id));
    }
}