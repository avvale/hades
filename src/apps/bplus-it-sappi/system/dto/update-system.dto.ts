import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6031af03-16ab-4961-95a9-e0fe80046e0c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6d6f348f-5953-4e11-8eb9-42f8a5ad019b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gukim76aynjznm8uqfzimuy82hbecir2qm4mh585r8jye6h89x'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'g'
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
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'cancelledAt [input here api field description]',
        example     : '2020-07-31 02:17:29'
    })
    cancelledAt: string;
    
    
}
