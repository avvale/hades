import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { SystemDto } from './../dto/system.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindSystemByIdQuery } from '@hades/bplus-it-sappi/system/application/find/find-system-by-id.query';

@ApiTags('system')
@ApiOkResponse({ description: 'The record has been successfully created.', type: SystemDto})
@Controller('bplus-it-sappi/system')
export class FindSystemByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindSystemByIdQuery(id));
    }
}