import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemDto 
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
        example     : 'id4s42sa2dok7kis7sj8vmbdo6rii4l922qty2v9aayx5fu3k5'
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
        example     : 'l'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : 'l'
    })
    environment: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'technology [input here api field description]',
        example     : 'WSO_2',
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
        example     : '2020-10-07 18:00:14'
    })
    cancelledAt: string;
    
    
}
