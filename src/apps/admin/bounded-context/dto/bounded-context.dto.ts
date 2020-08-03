import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4q3ek0p7son6hnxv3n2ne1ujsw524tagtihf342bu4exvzxdcyqekot68eallaojhg087zcif8y6qivld5n60hc6a8o4v4jiogebxjxpwwtww80a66hgwsgm4smelopgjk28oerykm53c83n0eic0bfwx6meq5s69his2kvy1xe3d1rd5562jka6703bkfopxphzb2laq0c02gagwf5vqqf772n614hm4ihl8go83gjwcblquo0c2r0z47l5tqb'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'l6rlfu1nzqzy4btx386f'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 949086
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 17:48:43'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 03:10:57'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 05:45:42'
    })
    deletedAt: string;
    
    
}
