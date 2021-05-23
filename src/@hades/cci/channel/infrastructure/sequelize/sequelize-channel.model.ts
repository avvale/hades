import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';

@Table({ modelName: 'CciChannel', freezeTableName: true, timestamps: false })
export class CciChannelModel extends Model<CciChannelModel>
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
        field: 'party',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    party: string;

    @Column({
        field: 'component',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    component: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(160),
    })
    name: string;

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
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    version: string;

    @Column({
        field: 'adapterType',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    adapterType: string;

    @Column({
        field: 'direction',
        allowNull: true,
        type: DataTypes.ENUM('SENDER','RECEIVER'),
    })
    direction: string;

    @Column({
        field: 'transportProtocol',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    transportProtocol: string;

    @Column({
        field: 'messageProtocol',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    messageProtocol: string;

    @Column({
        field: 'adapterEngineName',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    adapterEngineName: string;

    @Column({
        field: 'url',
        allowNull: true,
        type: DataTypes.STRING(320),
    })
    url: string;

    @Column({
        field: 'username',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    username: string;

    @Column({
        field: 'remoteHost',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    remoteHost: string;

    @Column({
        field: 'remotePort',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    remotePort: number;

    @Column({
        field: 'directory',
        allowNull: true,
        type: DataTypes.STRING(1024),
    })
    directory: string;

    @Column({
        field: 'fileSchema',
        allowNull: true,
        type: DataTypes.STRING(1024),
    })
    fileSchema: string;

    @Column({
        field: 'proxyHost',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    proxyHost: string;

    @Column({
        field: 'proxyPort',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    proxyPort: number;

    @Column({
        field: 'destination',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    destination: string;

    @Column({
        field: 'adapterStatus',
        allowNull: true,
        type: DataTypes.ENUM('ACTIVE','INACTIVE'),
    })
    adapterStatus: string;

    @Column({
        field: 'softwareComponentName',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    softwareComponentName: string;

    @Column({
        field: 'responsibleUserAccountName',
        allowNull: true,
        type: DataTypes.STRING(20),
    })
    responsibleUserAccountName: string;

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
        field: 'riInterfaceName',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    riInterfaceName: string;

    @Column({
        field: 'riInterfaceNamespace',
        allowNull: true,
        type: DataTypes.STRING(160),
    })
    riInterfaceNamespace: string;

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