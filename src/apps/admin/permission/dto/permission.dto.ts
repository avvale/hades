import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'a5a17m2uvftwg3qv9f6z6qlv6wr73vqjmvh88j7p5di53l0yyilzpr0wr5xgva8hfiy1wcti2fa2lrh06q38qt35d4m155ygicdois8o6hfoo4p2rc67z1gezsxcxjwhwsnkmz9hx9fk6ilgvtzjd3bef2r2r9bfrz9l3v5wi6fhbsmidsik9pycemsgym6zz40qh0ndwrkz35wn0hf7mwh92j61gmd8zz6i5qh28lsoamddxpawrxsmvrtp4cu'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 01:58:49'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 23:40:48'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 18:59:35'
    })
    deletedAt: string;
    
    
}
