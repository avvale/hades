import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { AdminBoundedContext } from './../../domain/bounded-context.aggregate';
import { BoundedContextMapper } from './../../domain/bounded-context.mapper';
import { AdminBoundedContextModel } from './sequelize-bounded-context.model';

@Injectable()
export class SequelizeBoundedContextRepository extends SequelizeRepository<AdminBoundedContext> implements IBoundedContextRepository
{
    public readonly aggregateName: string = 'AdminBoundedContext';
    public readonly mapper: BoundedContextMapper = new BoundedContextMapper();

    constructor(
        @InjectModel(AdminBoundedContextModel)
        public readonly repository: typeof AdminBoundedContextModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}