import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IPermissionRepository } from './../../domain/permission.repository';
import { AdminPermission } from './../../domain/permission.entity';
import { AdminPermissionModel } from './sequelize-permission.model';
import { SequelizePermissionMapper } from './sequelize-permission.mapper';

@Injectable()
export class SequelizePermissionRepository extends SequelizeRepository<AdminPermission> implements IPermissionRepository
{
    public readonly entityName: string = 'AdminPermission';
    public readonly mapper: SequelizePermissionMapper = new SequelizePermissionMapper();

    constructor(
        @InjectModel(AdminPermissionModel)
        public readonly repository: typeof AdminPermissionModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}