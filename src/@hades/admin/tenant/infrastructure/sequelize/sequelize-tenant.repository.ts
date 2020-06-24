import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ITenantRepository } from './../../domain/tenant.repository';
import { AdminTenant } from './../../domain/tenant.entity';
import { AdminTenantModel } from './sequelize-tenant.model';
import { SequelizeTenantMapper } from './sequelize-tenant.mapper';

@Injectable()
export class SequelizeTenantRepository extends SequelizeRepository<AdminTenant> implements ITenantRepository
{
    public readonly entityName: string = 'AdminTenant';
    public readonly mapper: SequelizeTenantMapper = new SequelizeTenantMapper();

    constructor(
        @InjectModel(AdminTenantModel)
        public readonly repository: typeof AdminTenantModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}