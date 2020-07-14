import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IPermissionRepository } from './../../domain/permission.repository';
import { AdminPermission } from './../../domain/permission.aggregate';
import { PermissionMapper } from './../../domain/permission.mapper';
import { AdminPermissionModel } from './sequelize-permission.model';

@Injectable()
export class SequelizePermissionRepository extends SequelizeRepository<AdminPermission> implements IPermissionRepository
{
    public readonly aggregateName: string = 'AdminPermission';
    public readonly mapper: PermissionMapper = new PermissionMapper();

    constructor(
        @InjectModel(AdminPermissionModel)
        public readonly repository: typeof AdminPermissionModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}