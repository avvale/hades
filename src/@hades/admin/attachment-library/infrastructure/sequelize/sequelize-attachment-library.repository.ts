import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { AdminAttachmentLibrary } from './../../domain/attachment-library.aggregate';
import { AttachmentLibraryMapper } from './../../domain/attachment-library.mapper';
import { AdminAttachmentLibraryModel } from './sequelize-attachment-library.model';

@Injectable()
export class SequelizeAttachmentLibraryRepository extends SequelizeRepository<AdminAttachmentLibrary, AdminAttachmentLibraryModel> implements IAttachmentLibraryRepository
{
    public readonly aggregateName: string = 'AdminAttachmentLibrary';
    public readonly mapper: AttachmentLibraryMapper = new AttachmentLibraryMapper();

    constructor(
        @InjectModel(AdminAttachmentLibraryModel)
        public readonly repository: typeof AdminAttachmentLibraryModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}