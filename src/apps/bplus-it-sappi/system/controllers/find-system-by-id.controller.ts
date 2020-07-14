import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSystemByIdQuery } from '@hades/bplus-it-sappi/system/application/find/find-system-by-id.query';

@ApiTags('[bplus-it-sappi] system')
@ApiOkResponse({ description: 'The record has been successfully created.', type: SystemDto})
@Controller('bplus-it-sappi/system')
export class FindSystemByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find system by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindSystemByIdQuery(id));
    }
}