import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';

@Table({ modelName: 'CciFlow', freezeTableName: true, timestamps: false })
export class CciFlowModel extends Model<CciFlowModel>
{
    @Unique
    @Column({
        field: 'id',
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'hash',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.CHAR(40),
    })
    hash: string;

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

    @Column({
        field: 'version',
        allowNull: false,
        type: DataTypes.STRING(20),
    })
    version: string;

    @Column({
        field: 'scenario',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    scenario: string;

    @Column({
        field: 'party',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    party: string;

    @Column({
        field: 'receiverParty',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverParty: string;

    @Column({
        field: 'component',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    component: string;

    @Column({
        field: 'receiverComponent',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    receiverComponent: string;

    @Column({
        field: 'interfaceName',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    interfaceName: string;

    @Column({
        field: 'interfaceNamespace',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    interfaceNamespace: string;

    @Column({
        field: 'iflowName',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    iflowName: string;

    @Column({
        field: 'responsibleUserAccount',
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    responsibleUserAccount: string;

    @Column({
        field: 'lastChangeUserAccount',
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    lastChangeUserAccount: string;

    @Column({
        field: 'lastChangedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    lastChangedAt: string;

    @Column({
        field: 'folderPath',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    folderPath: string;

    @Column({
        field: 'description',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    description: string;

    @Column({
        field: 'application',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    application: string;

    @Column({
        field: 'isCritical',
        allowNull: true,
        type: DataTypes.BOOLEAN,
    })
    isCritical: boolean;

    @Column({
        field: 'isComplex',
        allowNull: true,
        type: DataTypes.BOOLEAN,
    })
    isComplex: boolean;

    @Column({
        field: 'fieldGroupId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    fieldGroupId: string;

    @Column({
        field: 'data',
        allowNull: true,
        type: DataTypes.JSON,
    })
    data: any;

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