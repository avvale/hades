import { ApiProperty } from '@nestjs/swagger';

export class UpdateDataLakeDto 
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
        example     : 'gawboyuomwl263ib0cf2aoo8bjd09f26tdb7ymbsf1xdzyk5a5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'payload [input here api field description]',
        example     : { "foo" : "bar" }
    })
    payload: any;
    
    
}
