import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';

@ApiTags('[cci] module')
@Controller('cci/module')
export class FindModuleByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find module by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ModuleDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindModuleByIdQuery(id));
    }
}