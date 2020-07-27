import { ApiProperty } from '@nestjs/swagger';

export class CreateDataLakeDto 
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
        example     : 'hiiq2if1egsq4kg5tmbw4o4j143z4dmgyivpq1kfdkz7cmp6vx'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
