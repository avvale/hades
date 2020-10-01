import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthAccessTokenModel } from '@hades/o-auth/access-token/infrastructure/sequelize/sequelize-access-token.model';

@Table({ modelName: 'o_auth_refresh_token', freezeTableName: true })
export class OAuthRefreshTokenModel extends Model<OAuthRefreshTokenModel> 
{ 
        
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
        
    })
    id: string;
        
                     
        
    @ForeignKey(() => OAuthAccessTokenModel)
    
    
    @Column({
        field: 'access_token_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        
    })
    accessTokenId: string;
        
        
    @BelongsTo(() => OAuthAccessTokenModel)
    accessToken: OAuthAccessTokenModel;
                 
        
    
    
    @Column({
        field: 'token',
        
        allowNull: false,
        type: DataTypes.TEXT,
        
        
    })
    token: string;
        
                     
        
    
    
    @Column({
        field: 'is_revoked',
        
        allowNull: false,
        type: DataTypes.BOOLEAN,
        
        
    })
    isRevoked: boolean;
        
                     
        
    
    
    @Column({
        field: 'expires_at',
        
        allowNull: true,
        type: DataTypes.DATE,
        
        
    })
    expiresAt: string;
        
                     
        
    
    
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