import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f10700e8-add5-4be5-ad9f-3ab1fce72996'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f1394b0d-77fb-4613-a343-1b6dd20aea71'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '22zvb79yrmu34wb9jt6a'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'nugke39wid4o5elwqkir'
    })
    tenantCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : 'guv0cfpgm40fg3ayf0a4'
    })
    environment: string;
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '891289byzjykv70t4yfw'
    })
    version: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    @ApiProperty({
        type        : String,
        description : 'cancelledAt [input here api field description]',
        example     : '2020-06-26 12:23:02'
    })
    cancelledAt: string;
    
}
