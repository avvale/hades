import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { IamBoundedContext } from './../../domain/bounded-context.aggregate';
import { BoundedContextMapper } from './../../domain/bounded-context.mapper';
import { IamBoundedContextModel } from './sequelize-bounded-context.model';

@Injectable()
export class SequelizeBoundedContextRepository extends SequelizeRepository<IamBoundedContext, IamBoundedContextModel> implements IBoundedContextRepository
{
    public readonly aggregateName: string = 'IamBoundedContext';
    public readonly mapper: BoundedContextMapper = new BoundedContextMapper();
    public readonly timezoneColumns: string[] = ['createdAt','updatedAt','deletedAt'];

    constructor(
        @InjectModel(IamBoundedContextModel)
        public readonly repository: typeof IamBoundedContextModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}