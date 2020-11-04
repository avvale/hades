import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IRoleRepository } from './../../domain/role.repository';
import { CciRole } from './../../domain/role.aggregate';
import { RoleMapper } from './../../domain/role.mapper';
import { CciRoleModel } from './sequelize-role.model';

@Injectable()
export class SequelizeRoleRepository extends SequelizeRepository<CciRole, CciRoleModel> implements IRoleRepository
{
    public readonly aggregateName: string = 'CciRole';
    public readonly mapper: RoleMapper = new RoleMapper();
    public readonly timezoneColumns: string[] = ['createdAt','updatedAt','deletedAt'];

    constructor(
        @InjectModel(CciRoleModel)
        public readonly repository: typeof CciRoleModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}