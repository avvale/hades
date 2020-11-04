import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { CciSystemModel } from '@hades/cci/system/infrastructure/sequelize/sequelize-system.model';
import { CciRoleModel } from '@hades/cci/role/infrastructure/sequelize/sequelize-role.model';

@Table({ modelName: 'cci_contact', freezeTableName: true, timestamps: false })
export class CciContactModel extends Model<CciContactModel>
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
        field: 'tenant_id',
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
        field: 'tenant_code',
        allowNull: false,
        type: DataTypes.STRING(50),
    })
    tenantCode: string;

    @ForeignKey(() => CciSystemModel)
    @Column({
        field: 'system_id',
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
        field: 'system_name',
        allowNull: false,
        type: DataTypes.STRING(20),
    })
    systemName: string;

    @ForeignKey(() => CciRoleModel)
    @Column({
        field: 'role_id',
        allowNull: true,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    roleId: string;

    @BelongsTo(() => CciRoleModel)
    role: CciRoleModel;

    @Column({
        field: 'role_name',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    roleName: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'surname',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    surname: string;

    @Column({
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING(120),
    })
    email: string;

    @Column({
        field: 'mobile',
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    mobile: string;

    @Column({
        field: 'area',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    area: string;

    @Column({
        field: 'has_consent_email',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    hasConsentEmail: boolean;

    @Column({
        field: 'has_consent_mobile',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    hasConsentMobile: boolean;

    @Column({
        field: 'is_active',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isActive: boolean;

    @Column({
        field: 'created_at',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updated_at',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deleted_at',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}