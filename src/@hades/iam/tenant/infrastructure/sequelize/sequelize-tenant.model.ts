import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamAccountModel } from '@hades/iam/account/infrastructure/sequelize/sequelize-account.model';
    
import { IamTenantsAccountsModel } from '@hades/iam/tenant/infrastructure/sequelize/sequelize-tenants-accounts.model';

@Table({ modelName: 'iam_tenant', freezeTableName: true })
export class IamTenantModel extends Model<IamTenantModel> 
{ 
        
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
        
    })
    id: string;
        
                     
        
    
    
    @Column({
        field: 'name',
        
        allowNull: false,
        type: DataTypes.STRING(255),
        
        
    })
    name: string;
        
                     
        
    
    
    @Column({
        field: 'code',
        
        allowNull: false,
        type: DataTypes.STRING(50),
        
        
    })
    code: string;
        
                     
        
    
    
    @Column({
        field: 'logo',
        
        allowNull: true,
        type: DataTypes.STRING(255),
        
        
    })
    logo: string;
        
                     
        
    
    
    @Column({
        field: 'is_active',
        
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
        
    })
    isActive: boolean;
        
                     
        
    
    
    @Column({
        field: 'data',
        
        allowNull: true,
        type: DataTypes.JSON,
        
        
    })
    data: any;
        
                     
        
                    
    @BelongsToMany(() => IamAccountModel, () => IamTenantsAccountsModel)
    accountIds: IamAccountModel[];

    @BelongsToMany(() => IamAccountModel, () => IamTenantsAccountsModel)
    accounts: IamAccountModel[];
     
        
    
    
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