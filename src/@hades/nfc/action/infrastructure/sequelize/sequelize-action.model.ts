import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
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
        primaryKey: false,
        allowNull: false,
        type: DataTypes.UUID,
    })
    tagId: string;
        
    
    @BelongsTo(() => NfcTagModel)
    tag: NfcTagModel;
             
        
    @Column({
        field: 'type',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.ENUM('CMS','ZAP','TCI','MULESOFT'),
    })
    type: string;
        
             
        
    @Column({
        field: 'section_id',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.UUID,
    })
    sectionId: string;
        
             
        
    @Column({
        field: 'data',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.JSON,
    })
    data: any;
        
             
        
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