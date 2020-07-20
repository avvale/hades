import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import * as _ from 'lodash';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateSnapshotDto } from '../dto/create-snapshot.dto';

@ApiTags('[bplus-it-sappi] snapshot')
@Controller('bplus-it-sappi/snapshot')
export class CreateSnapshotController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create snapshot' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: CreateSnapshotDto })
    async main(@Body() payload: CreateSnapshotDto)
    {
       
    } 
}