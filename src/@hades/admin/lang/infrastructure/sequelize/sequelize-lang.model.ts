import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ modelName: 'admin_lang' })
export class AdminLangModel extends Model<AdminLangModel> 
{
    @Column({
        primaryKey: true,
        field: 'id',
        type: DataTypes.UUID,
        allowNull: false,
    })
    id: string;
    
    @Column({
        field: 'name',
        allowNull: false,
    })
    name: string;   
    
    @Column({
        field: 'image',
        type: DataTypes.STRING,
        allowNull: true,
    })
    image: string;
    
    @Column({ 
        field: 'iso_6392',
        type: DataTypes.CHAR(2),
        allowNull: false,
    })
    iso6392: string;
    
    @Column({ 
        field: 'iso_6393',
        type: DataTypes.CHAR(3),
        allowNull: false,
    })
    iso6393: string;
    
    @Column({
        field: 'ietf',
        type: DataTypes.CHAR(5),
        allowNull: false,
    })
    ietf: string;
    
    @Column({
        field: 'sort',
        type: DataTypes.SMALLINT,
        allowNull: true,
    })
    sort: number;
    
    @Column({ 
        field: 'is_active',
        allowNull: false,
    })
    isActive: boolean;
    
    @Column({ 
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: true,
    })
    createdAt: string;
    
    @Column({ 
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: true,
    })
    updatedAt: string;
    
    @Column({ 
        field: 'deleted_at',
        type: DataTypes.DATE,
        allowNull: true,
    })
    deletedAt: string;
}