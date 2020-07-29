import { ApiProperty } from '@nestjs/swagger';

export class CreateDataLakeDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3fb56be9-0dcf-4ad4-b067-e8f034d611b4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '86e52565-fd29-49aa-a725-49f65c6fc6b4'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fe9bd58e-16d2-4c6d-aad6-0970005c5437'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '7s5g6ydqyl2g77w6gtsln2fv6cd6zjrsak92032nlfngnvtlcs'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'payload [input here api field description]',
        example     : { "foo" : "bar" }
    })
    payload: any;
    
    
}
