import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateBoundedContextDto } from './../dto/update-bounded-context.dto';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateBoundedContextCommand } from '@hades/iam/bounded-context/application/update/update-bounded-context.command';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
@Permissions('iam.boundedContext.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateBoundedContextController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update bounded-context' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: BoundedContextDto})
    async main(@Body() payload: UpdateBoundedContextDto, @Body('constraint') constraint?: QueryStatement)
    {
        await this.commandBus.dispatch(new UpdateBoundedContextCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            constraint,
        ));

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id, constraint));
    }
}