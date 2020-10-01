import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserDto } from './../dto/user.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';

@ApiTags('[iam] user')
@Controller('iam/user')
export class FindUserByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find user by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: UserDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindUserByIdQuery(id));
    }
}