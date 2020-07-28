import { ApiProperty } from '@nestjs/swagger';

export class DataLakeDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4058f96e-53d0-49c1-a34b-14d25dd9730e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '20ed4e44-96db-4e2c-9299-fc9a6870b1a7'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '25d537fc-7e09-4b55-85a7-e74fae70e0de'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '02v57hil7oa90xszkj9pk37jm64kaj0j5w0b9wsir6x7t8q030'
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
        example     : '2020-07-28 08:49:25'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 19:55:45'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 10:10:16'
    })
    deletedAt: string;
    
    
}
