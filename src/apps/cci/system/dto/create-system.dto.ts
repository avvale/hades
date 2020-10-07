import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ff8a25c9-6b2f-426d-8bfe-8078ef29dfcf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '178616d5-3730-44e7-b381-c318a0f8741c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ch9j2abkvmt2mq99zrtip2h49jsl10umnm0pasmnis6m6qmcji'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'j'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'l'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : 'e'
    })
    environment: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'technology [input here api field description]',
        example     : 'SAPSCI',
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
        example     : '2020-10-07 12:06:29'
    })
    cancelledAt: string;
    
    
}
