import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemDto 
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
        example     : 'xye2yyr8e5k03c6w6oiekwh61czdo6dwozf6l277rwictvvp5x'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'k'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : '6'
    })
    environment: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'technology [input here api field description]',
        example     : 'WSO2',
        enum        : ['WSO2','SAPPI','B2B','MULESOFT','SAPSCI']
    })
    technology: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'cancelledAt [input here api field description]',
        example     : '2020-10-07 03:40:19'
    })
    cancelledAt: string;
    
    
}
