import { ApiProperty } from '@nestjs/swagger';

export class CreateDataLakeDto 
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
        example     : 'tcjs6ox9g2mu7knj4qq4hkihy6czxw9uyyxziyjsuilsvwgnnr'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'payload [input here api field description]',
        example     : { "foo" : "bar" }
    })
    payload: any;
    
    
}
