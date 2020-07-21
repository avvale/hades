import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
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
        primaryKey: false,
        allowNull: false,
        type: DataTypes.CHAR(undefined),
    })
    ip: string;
        
             
        
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
        field: 'uid',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(64),
    })
    uid: string;
        
             
        
    @Column({
        field: 'counter',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    counter: number;
        
             
        
    @Column({
        field: 'expired_at',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.DATE,
    })
    expiredAt: string;
        
             
        
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