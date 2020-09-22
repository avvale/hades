import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthAccessTokenModel } from '@hades/o-auth/access-token/infrastructure/sequelize/sequelize-access-token.model';
import { OAuthApplicationModel } from '@hades/o-auth/application/infrastructure/sequelize/sequelize-application.model';
    
import { OAuthApplicationsClientsModel } from '@hades/o-auth/application/infrastructure/sequelize/sequelize-applications-clients.model';

@Table({ modelName: 'o_auth_client', freezeTableName: true })
export class OAuthClientModel extends Model<OAuthClientModel> 
{ 
        
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
        
    })
    id: string;
        
             
        
    
    
    @Column({
        field: 'grant_type',
        
        allowNull: false,
        type: DataTypes.ENUM('AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD'),
        
        
    })
    grantType: string;
        
             
        
    
    
    @Column({
        field: 'name',
        
        allowNull: false,
        type: DataTypes.STRING(255),
        
        
    })
    name: string;
        
             
        
    
    
    @Column({
        field: 'secret',
        
        allowNull: false,
        type: DataTypes.STRING(90),
        
        
    })
    secret: string;
        
             
        
    
    
    @Column({
        field: 'auth_url',
        
        allowNull: true,
        type: DataTypes.STRING(2048),
        
        
    })
    authUrl: string;
        
             
        
    
    
    @Column({
        field: 'redirect',
        
        allowNull: true,
        type: DataTypes.STRING(2048),
        
        
    })
    redirect: string;
        
             
        
    
    
    @Column({
        field: 'expired_access_token',
        
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
        
    })
    expiredAccessToken: number;
        
             
        
    
    
    @Column({
        field: 'expired_refresh_token',
        
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        
        
    })
    expiredRefreshToken: number;
        
             
        
    
    
    @Column({
        field: 'is_revoked',
        
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
        
    })
    isRevoked: boolean;
        
             
        
    
    
    @Column({
        field: 'is_master',
        
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
        
    })
    isMaster: boolean;
        
             
        
            
    @BelongsToMany(() => OAuthApplicationModel, () => OAuthApplicationsClientsModel)
    applicationIds: OAuthApplicationModel[];

    @BelongsToMany(() => OAuthApplicationModel, () => OAuthApplicationsClientsModel)
    applications: OAuthApplicationModel[];
     
        
        
    @HasMany(() => OAuthAccessTokenModel)
    accessTokens: OAuthAccessTokenModel[];
         
        
    
    
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