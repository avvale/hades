import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2012959b-9f2f-40f1-8359-3acd9368fe15'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '44b6aba8-6206-4212-b0d9-c7e02dd42083'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ijwghuwdoigb7svql3dlvrfdhzyti9zycwhrvc2519cj13fhwx'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'q'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : '9'
    })
    environment: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'cancelledAt [input here api field description]',
        example     : '2020-08-04 20:51:43'
    })
    cancelledAt: string;
    
    
}
