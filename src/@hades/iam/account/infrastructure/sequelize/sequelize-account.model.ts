import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamUserModel } from '@hades/iam/user/infrastructure/sequelize/sequelize-user.model';
import { IamRoleModel } from '@hades/iam/role/infrastructure/sequelize/sequelize-role.model';
    
import { OAuthRolesAccountsModel } from '@hades/iam/role/infrastructure/sequelize/sequelize-roles-accounts.model';
import { IamTenantModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
    
import { OAuthTenantsAccountsModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenants-accounts.model';

@Table({ modelName: 'iam_account', freezeTableName: true })
export class IamAccountModel extends Model<IamAccountModel> 
{ 
        
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
        
    })
    id: string;
        
                     
        
    
    
    @Column({
        field: 'type',
        
        allowNull: false,
        type: DataTypes.ENUM('USER','SERVICE'),
        
        
    })
    type: string;
        
                     
        
    
    
    @Column({
        field: 'name',
        
        allowNull: false,
        type: DataTypes.STRING(255),
        
        
    })
    name: string;
        
                     
        
    
    
    @Column({
        field: 'is_active',
        
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
        
    })
    isActive: boolean;
        
                     
        
    
    
    @Column({
        field: 'client_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        
    })
    clientId: string;
        
                     
        
    
    
    @Column({
        field: 'application_codes',
        
        allowNull: false,
        type: DataTypes.JSON,
        
        
    })
    applicationCodes: any;
        
                     
        
    
    
    @Column({
        field: 'permissions',
        
        allowNull: false,
        type: DataTypes.JSON,
        
        
    })
    permissions: any;
        
                     
        
    
    
    @Column({
        field: 'data',
        
        allowNull: true,
        type: DataTypes.JSON,
        
        
    })
    data: any;
        
                     
        
                    
    @BelongsToMany(() => IamRoleModel, () => OAuthRolesAccountsModel)
    roleIds: IamRoleModel[];

    @BelongsToMany(() => IamRoleModel, () => OAuthRolesAccountsModel)
    roles: IamRoleModel[];
     
        
                    
    @BelongsToMany(() => IamTenantModel, () => OAuthTenantsAccountsModel)
    tenantIds: IamTenantModel[];

    @BelongsToMany(() => IamTenantModel, () => OAuthTenantsAccountsModel)
    tenants: IamTenantModel[];
     
        
    
    @HasOne(() => IamUserModel)
    user: IamUserModel;
                     
        
    
    
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