import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IFlowRepository } from './../../domain/flow.repository';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';
import { BplusItSappiFlowModel } from './sequelize-flow.model';
import { SequelizeFlowMapper } from './sequelize-flow.mapper';

@Injectable()
export class SequelizeFlowRepository extends SequelizeRepository<BplusItSappiFlow> implements IFlowRepository
{
    public readonly aggregateName: string = 'BplusItSappiFlow';
    public readonly mapper: SequelizeFlowMapper = new SequelizeFlowMapper();

    constructor(
        @InjectModel(BplusItSappiFlowModel)
        public readonly repository: typeof BplusItSappiFlowModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
    async create(aggregate: BplusItSappiFlow): Promise<void>
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
            
            if (aggregate.contactsIdId.length > 0) model.$add('contactsId', aggregate.contactsIdId.value);
            
        }
        catch (error)
        {
            throw new ConflictException(error.message);
        }
    }

    async update(aggregate: BplusItSappiFlow): Promise<void> 
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
        if (aggregate.contactsIdId.isArray()) model.$set('contactsId', aggregate.contactsIdId.value);
         
    }
    
}