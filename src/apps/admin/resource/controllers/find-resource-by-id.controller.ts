import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResourceDto } from './../dto/resource.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';

@ApiTags('[admin] resource')
@ApiOkResponse({ description: 'The record has been successfully created.', type: ResourceDto})
@Controller('admin/resource')
export class FindResourceByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find resource by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindResourceByIdQuery(id));
    }
}