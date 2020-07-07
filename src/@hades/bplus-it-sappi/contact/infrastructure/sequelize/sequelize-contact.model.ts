import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminTenantModel } from '@hades/admin/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { BplusItSappiSystemModel } from '@hades/bplus-it-sappi/system/infrastructure/sequelize/sequelize-system.model';
import { BplusItSappiRoleModel } from '@hades/bplus-it-sappi/role/infrastructure/sequelize/sequelize-role.model';

@Table({ modelName: 'bplus_it_sappi_contact', freezeTableName: true })
export class BplusItSappiContactModel extends Model<BplusItSappiContactModel> 
{ 
        
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;
        
             
        
    @ForeignKey(() => AdminTenantModel)
    
    @Column({
        field: 'tenant_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    tenantId: string;
        
    
    @BelongsTo(() => AdminTenantModel)
    tenant: AdminTenantModel;
             
        
    @ForeignKey(() => BplusItSappiSystemModel)
    
    @Column({
        field: 'system_id',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    systemId: string;
        
    
    @BelongsTo(() => BplusItSappiSystemModel)
    system: BplusItSappiSystemModel;
             
        
    @Column({
        field: 'system_name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(20),
    })
    systemName: string;
        
             
        
    @ForeignKey(() => BplusItSappiRoleModel)
    
    @Column({
        field: 'role_id',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.UUID,
    })
    roleId: string;
        
    
    @BelongsTo(() => BplusItSappiRoleModel)
    role: BplusItSappiRoleModel;
             
        
    @Column({
        field: 'role_name',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    roleName: string;
        
             
        
    @Column({
        field: 'name',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;
        
             
        
    @Column({
        field: 'surname',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    surname: string;
        
             
        
    @Column({
        field: 'email',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(120),
    })
    email: string;
        
             
        
    @Column({
        field: 'mobile',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(60),
    })
    mobile: string;
        
             
        
    @Column({
        field: 'area',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    area: string;
        
             
        
    @Column({
        field: 'has_consent_email',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    hasConsentEmail: boolean;
        
             
        
    @Column({
        field: 'has_consent_mobile',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    hasConsentMobile: boolean;
        
             
        
    @Column({
        field: 'is_active',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isActive: boolean;
        
             
        
    @Column({
        field: 'created_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;
        
             
        
    @Column({
        field: 'updated_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;
        
             
        
    @Column({
        field: 'deleted_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;
        
            
}