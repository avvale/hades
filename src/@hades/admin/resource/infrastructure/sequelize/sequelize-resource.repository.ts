import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';
import { AdminResourceModel } from './sequelize-resource.model';
import { SequelizeResourceMapper } from './sequelize-resource.mapper';

@Injectable()
export class SequelizeResourceRepository extends SequelizeRepository<AdminResource> implements IResourceRepository
{
    public readonly aggregateName: string = 'AdminResource';
    public readonly mapper: SequelizeResourceMapper = new SequelizeResourceMapper();

    constructor(
        @InjectModel(AdminResourceModel)
        public readonly repository: typeof AdminResourceModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}