import { ApiProperty } from '@nestjs/swagger';

export class CreateDataLakeDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '54ad27da-32c7-48c6-a24e-df86973f1484'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '68d9dd63-92a0-42ff-8cc5-676b213cc335'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '9ed1df92-ee6c-4295-b805-81b874de5dc8'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'uv4mh8d4uupd6p1h2uu6mybtoh4903278jliecamy3od6cxpyi'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'payload [input here api field description]',
        example     : { "foo" : "bar" }
    })
    payload: any;
    
    
}
