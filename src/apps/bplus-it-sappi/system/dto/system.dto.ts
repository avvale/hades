import { ApiProperty } from '@nestjs/swagger';

export class SystemDto 
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
        example     : '94tv9rwry3amwhna8h2y0k6rlkdza7dz6sbdi5qp33w39w3hsf'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'w'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'u'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : 't'
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
        example     : '2020-08-05 08:29:34'
    })
    cancelledAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-05 02:16:31'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-05 04:37:13'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 20:15:53'
    })
    deletedAt: string;
    
    
}
