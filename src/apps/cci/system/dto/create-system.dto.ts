import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '237d2072-de65-46be-ac8e-6c2e879b2c9d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6fc49df0-1546-4676-a2e7-e3e7f1aa1164'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'w3yp006340ge5hpx5sj0ritcrzf6moe7pd45ir5i1ldxk5a17j'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '5'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : '4'
    })
    environment: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'technology [input here api field description]',
        example     : 'MULESOFT',
        enum        : ['WSO_2','SAPPI','B_2_B','MULESOFT','SAPSCI']
    })
    technology: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'cancelledAt [input here api field description]',
        example     : '2020-10-07 11:39:24'
    })
    cancelledAt: string;
    
    
}
