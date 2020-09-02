import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IRoleRepository } from './../../domain/role.repository';
import { AdminRole } from './../../domain/role.aggregate';
import { RoleMapper } from './../../domain/role.mapper';
import { AdminRoleModel } from './sequelize-role.model';

@Injectable()
export class SequelizeRoleRepository extends SequelizeRepository<AdminRole> implements IRoleRepository
{
    public readonly aggregateName: string = 'AdminRole';
    public readonly mapper: RoleMapper = new RoleMapper();

    constructor(
        @InjectModel(AdminRoleModel)
        public readonly repository: typeof AdminRoleModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}