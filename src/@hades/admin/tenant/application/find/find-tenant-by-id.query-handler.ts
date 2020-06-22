import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TenantResponse } from './../../domain/tenant.response';
import { TenantId } from './../../domain/value-objects';
import { FindTenantByIdQuery } from './find-tenant-by-id.query';
import { FindTenantByIdService } from './find-tenant-by-id.service';

@QueryHandler(FindTenantByIdQuery)
export class FindTenantByIdQueryHandler implements IQueryHandler<FindTenantByIdQuery>
{
    constructor(
        private readonly findTenantByIdService: FindTenantByIdService
    ) { }

    async execute(query: FindTenantByIdQuery): Promise<TenantResponse>
    {
        const tenant = await this.findTenantByIdService.main(new TenantId(query.id));

        return new TenantResponse(
                tenant.id.value,
                tenant.name.value,
                tenant.code.value,
                tenant.logo.value,
                tenant.isActive.value,
                tenant.data.value,
                tenant.createdAt.value,
                tenant.updatedAt.value,
                tenant.deletedAt.value,
                
            );
    }
}