
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';

@ApiTags('[core] gcp')
@Controller('_ah/warmup')
export class CorePreparationRequestController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'GCP app engine instance management' })
    @ApiCreatedResponse({ description: 'Request called by GCP to keep the instance alive.' })
    async main()
    {
        // request called by GCP to keep the instance alive

        return { status: true };
    }
}