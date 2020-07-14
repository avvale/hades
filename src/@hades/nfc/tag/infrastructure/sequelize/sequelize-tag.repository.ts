import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ITagRepository } from './../../domain/tag.repository';
import { NfcTag } from './../../domain/tag.aggregate';
import { TagMapper } from './../../domain/tag.mapper';
import { NfcTagModel } from './sequelize-tag.model';

@Injectable()
export class SequelizeTagRepository extends SequelizeRepository<NfcTag> implements ITagRepository
{
    public readonly aggregateName: string = 'NfcTag';
    public readonly mapper: TagMapper = new TagMapper();

    constructor(
        @InjectModel(NfcTagModel)
        public readonly repository: typeof NfcTagModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}