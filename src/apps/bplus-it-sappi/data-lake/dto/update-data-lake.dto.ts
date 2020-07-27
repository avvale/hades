import { ApiProperty } from '@nestjs/swagger';

export class UpdateDataLakeDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1eb23b09-0f99-40e1-896f-d60538de81f4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4306784b-4920-4fd0-a89b-bbb0e038cb56'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bcojk45lz24mokm6tj055co47s1bfsbcphrb3zfa5wqzyhwax1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
