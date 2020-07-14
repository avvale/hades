import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IRoleRepository } from './../../domain/role.repository';
import { BplusItSappiRole } from './../../domain/role.aggregate';
import { RoleMapper } from './../../domain/role.mapper';
import { BplusItSappiRoleModel } from './sequelize-role.model';

@Injectable()
export class SequelizeRoleRepository extends SequelizeRepository<BplusItSappiRole> implements IRoleRepository
{
    public readonly aggregateName: string = 'BplusItSappiRole';
    public readonly mapper: RoleMapper = new RoleMapper();

    constructor(
        @InjectModel(BplusItSappiRoleModel)
        public readonly repository: typeof BplusItSappiRoleModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}