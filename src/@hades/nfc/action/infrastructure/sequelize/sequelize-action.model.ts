import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, Index, Unique } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { NfcTagModel } from '@hades/nfc/tag/infrastructure/sequelize/sequelize-tag.model';

@Table({ modelName: 'nfc_action', freezeTableName: true })
export class NfcActionModel extends Model<NfcActionModel> 
{ 
            
    
    
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        
    })
    id: string;
        
             
        
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
        field: 'type',
        
        allowNull: false,
        type: DataTypes.ENUM('CMS','ZAP','TCI','MULESOFT'),
        
    })
    type: string;
        
             
            
    
    
    @Column({
        field: 'section_id',
        
        allowNull: true,
        type: DataTypes.UUID,
        
    })
    sectionId: string;
        
             
            
    
    
    @Column({
        field: 'data',
        
        allowNull: true,
        type: DataTypes.JSON,
        
    })
    data: any;
        
             
            
    
    
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