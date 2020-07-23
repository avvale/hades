import { ApiProperty } from '@nestjs/swagger';

export class UpdateDataLakeDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '075d6ff6-accf-4f73-9651-ac474c56439e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ebdd867a-086e-462c-b8f5-90f645199afd'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '87g1elb2lsb4nttwlf9t1crvqdn1x1crc6cwafj5ys0hvgkbob'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
