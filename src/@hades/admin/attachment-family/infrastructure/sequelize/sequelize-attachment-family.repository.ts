import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { AdminAttachmentFamily } from './../../domain/attachment-family.aggregate';
import { AttachmentFamilyMapper } from './../../domain/attachment-family.mapper';
import { AdminAttachmentFamilyModel } from './sequelize-attachment-family.model';

@Injectable()
export class SequelizeAttachmentFamilyRepository extends SequelizeRepository<AdminAttachmentFamily, AdminAttachmentFamilyModel> implements IAttachmentFamilyRepository
{
    public readonly aggregateName: string = 'AdminAttachmentFamily';
    public readonly mapper: AttachmentFamilyMapper = new AttachmentFamilyMapper();

    constructor(
        @InjectModel(AdminAttachmentFamilyModel)
        public readonly repository: typeof AdminAttachmentFamilyModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(aggregate: AdminAttachmentFamily, model: AdminAttachmentFamilyModel)
    {
        // add many to many relation
        if (aggregate.resourceIds.length > 0) await model.$add('resources', aggregate.resourceIds.value);
    }

    // hook called after create aggregate
    async updatedAggregateHook(aggregate: AdminAttachmentFamily, model: AdminAttachmentFamilyModel)
    {
        // set many to many relation
        if (aggregate.resourceIds.isArray()) await model.$set('resources', aggregate.resourceIds.value);
    }
}