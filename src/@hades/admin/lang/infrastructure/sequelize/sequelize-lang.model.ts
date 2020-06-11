import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({ modelName: 'admin_langs' })
export class LangModel extends Model<LangModel> 
{
    @Column({
        primaryKey: true,
        field: 'id',
        type: DataTypes.UUID,
    })
    id: string;
    
    @Column({
        field: 'name' 
    })
    name: string;   
    
    @Column({
        field: 'image' 
    })
    image: string;
    
    @Column({ 
        field: 'iso_6392' 
    })
    iso6392: string;
    
    @Column({ 
        field: 'iso_6393' 
    })
    iso6393: string;
    
    @Column({
        field: 'ietf' 
    })
    ietf: string;
    
    @Column({
        field: 'sort' 
    })
    sort: number;
    
    @Column({ 
        field: 'is_active' 
    })
    isActive: boolean;
    
    @Column({ 
        field: 'created_at' 
    })
    createdAt: string;
    
    @Column({ 
        field: 'updated_at' 
    })
    updatedAt: string;
    
    @Column({ 
        field: 'deleted_at' 
    })
    deletedAt: string;
}