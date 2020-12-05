import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateResourceDto } from './../dto/update-resource.dto';
import { ResourceDto } from './../dto/resource.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateResourceCommand } from '@hades/admin/resource/application/update/update-resource.command';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';

@ApiTags('[admin] resource')
@Controller('admin/resource')
@Permissions('admin.resource.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateResourceController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update resource' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ResourceDto})
    async main(
        @Body() payload: UpdateResourceDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateResourceCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindResourceByIdQuery(payload.id, constraint, { timezone }));
    }
}