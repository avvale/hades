import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';

@Table({ modelName: 'CciModule', freezeTableName: true, timestamps: false })
export class CciModuleModel extends Model<CciModuleModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => IamTenantModel)
    @Column({
        field: 'tenantId',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    tenantId: string;

    @BelongsTo(() => IamTenantModel)
    tenant: IamTenantModel;

    @Column({
        field: 'tenantCode',
        allowNull: false,
        type: DataTypes.STRING(50),
    })
    tenantCode: string;

    @ForeignKey(() => CciSystemModel)
    @Column({
        field: 'systemId',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    systemId: string;

    @BelongsTo(() => CciSystemModel)
    system: CciSystemModel;

    @Column({
        field: 'systemName',
        allowNull: false,
        type: DataTypes.STRING(20),
    })
    systemName: string;

    @Index
    @Column({
        field: 'channelHash',
        allowNull: false,
        type: DataTypes.CHAR(40),
    })
    channelHash: string;

    @Column({
        field: 'channelParty',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    channelParty: string;

    @Column({
        field: 'channelComponent',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    channelComponent: string;

    @Column({
        field: 'channelName',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    channelName: string;

    @Index
    @Column({
        field: 'flowHash',
        allowNull: true,
        type: DataTypes.CHAR(40),
    })
    flowHash: string;

    @Column({
        field: 'flowParty',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowParty: string;

    @Column({
        field: 'flowReceiverParty',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowReceiverParty: string;

    @Column({
        field: 'flowComponent',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowComponent: string;

    @Column({
        field: 'flowReceiverComponent',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowReceiverComponent: string;

    @Column({
        field: 'flowInterfaceName',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowInterfaceName: string;

    @Column({
        field: 'flowInterfaceNamespace',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    flowInterfaceNamespace: string;

    @Column({
        field: 'version',
        allowNull: false,
        type: DataTypes.STRING(20),
    })
    version: string;

    @Column({
        field: 'parameterGroup',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    parameterGroup: string;

    @Column({
        field: 'name',
        allowNull: true,
        type: DataTypes.STRING(320),
    })
    name: string;

    @Column({
        field: 'parameterName',
        allowNull: true,
        type: DataTypes.STRING(320),
    })
    parameterName: string;

    @Column({
        field: 'parameterValue',
        allowNull: true,
        type: DataTypes.STRING(2048),
    })
    parameterValue: string;

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}