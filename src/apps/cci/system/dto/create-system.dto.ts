import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '42117b61-d21e-41fd-8e90-6366f2751de5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '03675f26-191f-47e6-b648-b8df5150a9c9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6q4hneitlnvvsb929fwf8xx4tpphq2sllq581gemscfkdwe3h8'
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
        example     : 'h'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : 'f'
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
        example     : '2020-09-20 07:31:10'
    })
    cancelledAt: string;
    
    
}
