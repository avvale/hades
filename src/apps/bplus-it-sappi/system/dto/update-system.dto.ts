import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemDto 
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
        example     : '8c1e1lio33v6je0d1xnh'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '3n10pn39m3b4zkfr2ww1'
    })
    tenantCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'environment [input here api field description]',
        example     : 'rdqrqevoc852m51w8htu'
    })
    environment: string;
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'av8tbp92st00xm381tjm'
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
        example     : '2020-06-26 13:08:09'
    })
    cancelledAt: string;
    
}
