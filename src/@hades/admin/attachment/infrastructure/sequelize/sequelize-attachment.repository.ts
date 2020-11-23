import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { AdminAttachment } from './../../domain/attachment.aggregate';
import { AttachmentMapper } from './../../domain/attachment.mapper';
import { AdminAttachmentModel } from './sequelize-attachment.model';

@Injectable()
export class SequelizeAttachmentRepository extends SequelizeRepository<AdminAttachment, AdminAttachmentModel> implements IAttachmentRepository
{
    public readonly aggregateName: string = 'AdminAttachment';
    public readonly mapper: AttachmentMapper = new AttachmentMapper();

    constructor(
        @InjectModel(AdminAttachmentModel)
        public readonly repository: typeof AdminAttachmentModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}