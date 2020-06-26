import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SystemResponse } from './../../domain/system.response';
import { SystemId } from './../../domain/value-objects';
import { FindSystemByIdQuery } from './find-system-by-id.query';
import { FindSystemByIdService } from './find-system-by-id.service';

@QueryHandler(FindSystemByIdQuery)
export class FindSystemByIdQueryHandler implements IQueryHandler<FindSystemByIdQuery>
{
    constructor(
        private readonly findSystemByIdService: FindSystemByIdService
    ) { }

    async execute(query: FindSystemByIdQuery): Promise<SystemResponse>
    {
        const system = await this.findSystemByIdService.main(new SystemId(query.id));

        return new SystemResponse(
                system.id.value,
                system.tenantId.value,
                system.name.value,
                system.tenantCode.value,
                system.environment.value,
                system.version.value,
                system.isActive.value,
                system.cancelledAt.value,
                system.createdAt.value,
                system.updatedAt.value,
                system.deletedAt.value,
                
            );
    }
}