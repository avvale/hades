import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
@UseGuards(AuthGuard('jwt'))
export class FindBoundedContextByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find bounded-context by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: BoundedContextDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(id));
    }
}