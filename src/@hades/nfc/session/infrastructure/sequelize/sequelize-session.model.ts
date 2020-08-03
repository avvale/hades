import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { NfcTagModel } from '@hades/nfc/tag/infrastructure/sequelize/sequelize-tag.model';

@Table({ modelName: 'nfc_session', freezeTableName: true })
export class NfcSessionModel extends Model<NfcSessionModel> 
{ 
            
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
    })
    id: string;
        
             
            
    
    
    @Column({
        field: 'ip',
        
        allowNull: false,
        type: DataTypes.CHAR(15),
        
    })
    ip: string;
        
             
        
    @ForeignKey(() => NfcTagModel)    
    
    
    @Column({
        field: 'tag_id',
        
        allowNull: false,
        type: DataTypes.UUID,
        
        references: {  
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    tagId: string;
        
             
            
    
    
    @Column({
        field: 'uid',
        
        allowNull: false,
        type: DataTypes.STRING(64),
        
    })
    uid: string;
        
             
            
    
    
    @Column({
        field: 'counter',
        
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
        
    })
    counter: number;
        
             
            
    
    
    @Column({
        field: 'expired_at',
        
        allowNull: true,
        type: DataTypes.DATE,
        
    })
    expiredAt: string;
        
             
            
    
    
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