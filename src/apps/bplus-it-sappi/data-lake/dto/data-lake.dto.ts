import { ApiProperty } from '@nestjs/swagger';

export class DataLakeDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b0007a8c-9ed4-43a3-8d69-5d14734ddf7d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8b7b887a-467e-40dc-88f5-9324cb9b1137'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '03628647-8dc4-4ea4-b41a-4b9a672413f3'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'u2u51grjdynasretwenohthzij2wg4ggwclhtzvr1gwered5x9'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'payload [input here api field description]',
        example     : { "foo" : "bar" }
    })
    payload: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-05 06:55:21'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 15:09:15'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-05 03:07:14'
    })
    deletedAt: string;
    
    
}
