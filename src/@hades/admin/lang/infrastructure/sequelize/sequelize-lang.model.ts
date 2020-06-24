import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ modelName: 'admin_lang', freezeTableName: true })
export class AdminLangModel extends Model<AdminLangModel> 
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
        primaryKey: false,
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;
        
             
        
    @Column({
        field: 'image',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    image: string;
        
             
        
    @Column({
        field: 'iso_639_2',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.CHAR(2),
    })
    iso6392: string;
        
             
        
    @Column({
        field: 'iso_639_3',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.CHAR(3),
    })
    iso6393: string;
        
             
        
    @Column({
        field: 'ietf',
        primaryKey: false,
        allowNull: false,
        type: DataTypes.CHAR(5),
    })
    ietf: string;
        
             
        
    @Column({
        field: 'sort',
        primaryKey: false,
        allowNull: true,
        type: DataTypes.SMALLINT,
    })
    sort: number;
        
             
        
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