import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PermissionDto } from './../dto/permission.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindPermissionByIdQuery } from '@hades/iam/permission/application/find/find-permission-by-id.query';

@ApiTags('[iam] permission')
@Controller('iam/permission')
export class FindPermissionByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find permission by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: PermissionDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindPermissionByIdQuery(id));
    }
}