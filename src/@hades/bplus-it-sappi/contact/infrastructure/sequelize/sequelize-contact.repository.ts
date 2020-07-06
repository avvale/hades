import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IContactRepository } from './../../domain/contact.repository';
import { BplusItSappiContact } from './../../domain/contact.aggregate';
import { BplusItSappiContactModel } from './sequelize-contact.model';
import { SequelizeContactMapper } from './sequelize-contact.mapper';

@Injectable()
export class SequelizeContactRepository extends SequelizeRepository<BplusItSappiContact> implements IContactRepository
{
    public readonly aggregateName: string = 'BplusItSappiContact';
    public readonly mapper: SequelizeContactMapper = new SequelizeContactMapper();

    constructor(
        @InjectModel(BplusItSappiContactModel)
        public readonly repository: typeof BplusItSappiContactModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
    async create(aggregate: BplusItSappiContact): Promise<void>
    {
        // check if exist object in database, if allow save aggregate with the same uuid, update this aggregate in database instead of create it
        const aggregateInDB = await this.repository.findOne(
            {
                where: {
                    id: aggregate.id.value
                }
            }
        );
        
        if (aggregateInDB) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${aggregate['id']['value']} already exist in database`);
        
        try
        {
            const model = await this.repository.create(aggregate.toDTO());

            // add many to many relation
            
            if (aggregate.flowsId.length > 0) model.$add('flows', aggregate.flowsId.value);
            
        }
        catch (error)
        {
            throw new ConflictException(error.message);
        }
    }

    async update(aggregate: BplusItSappiContact): Promise<void> 
    { 
        // check that aggregate exist
        const aggregateInDB = await this.repository.findOne(
            {
                where: {
                    id: aggregate.id.value
                }
            }
        );

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        // clean undefined fields
        const objectLiteral = this.cleanUndefined(aggregate.toDTO());

        const model = await aggregateInDB.update(objectLiteral);

        
        // set many to many relation
        if (aggregate.flowsId.isArray()) model.$set('flows', aggregate.flowsId.value);
         
    }
    
}