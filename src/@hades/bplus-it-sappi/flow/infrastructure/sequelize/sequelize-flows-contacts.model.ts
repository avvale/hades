import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { BplusItSappiFlowModel } from '@hades/bplus-it-sappi/flow/infrastructure/sequelize/sequelize-flow.model';
import { BplusItSappiContactModel } from '@hades/bplus-it-sappi/contact/infrastructure/sequelize/sequelize-contact.model';

@Table({ modelName: 'bplus_it_sappi_flows_contacts', freezeTableName: true })
export class BplusItSappiFlowsContactsModel extends Model<BplusItSappiFlowsContactsModel> 
{   
    @ForeignKey(() => BplusItSappiFlowModel)
    @Column({
        field: 'flow_id',
        type: DataTypes.UUID,
    })
    flowId: string;

    @ForeignKey(() => BplusItSappiContactModel)
    @Column({
        field: 'contact_id',
        type: DataTypes.UUID,
    })
    contactId: string;
}