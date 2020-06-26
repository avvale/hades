import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SystemResponse } from './../../domain/system.response';
import { FindSystemQuery } from './find-system.query';
import { FindSystemService } from './find-system.service';

@QueryHandler(FindSystemQuery)
export class FindSystemQueryHandler implements IQueryHandler<FindSystemQuery>
{
    constructor(
        private readonly findSystemService: FindSystemService
    ) { }

    async execute(query: FindSystemQuery): Promise<SystemResponse>
    {
        const system = await this.findSystemService.main(query.queryStatements);

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