import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSystemByIdQuery } from '@hades/cci/system/application/find/find-system-by-id.query';

@ApiTags('[cci] system')
@Controller('cci/system')
export class FindSystemByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find system by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: SystemDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindSystemByIdQuery(id));
    }
}