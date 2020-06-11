import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class LangModel extends Model<LangModel> 
{
    @Column
    id: string;
    
    @Column
    name: string;   
    
    @Column
    image: string;
    
    @Column
    iso6392: string;
    
    @Column
    iso6393: string;
    
    @Column
    ietf: string;
    
    @Column
    sort: number;
    
    @Column
    isActive: boolean;
    
    @Column
    createdAt: string;
    
    @Column
    updatedAt: string;
    
    @Column
    deletedAt: string;
}