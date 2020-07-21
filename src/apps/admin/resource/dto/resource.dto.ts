import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a016b6d2-437a-46ba-92dc-d42c891ba04c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'c466f698-71db-4cb2-ae46-08604fc10fe0'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'j72bsxrownl2hzc8qwwa0qbk31iwgo0oak0dwzv82epci9bhauewckh7m1voblytutwl1y9lc85lamhazfa7t8isfplbznfs8ybgs6hj2i7arxynuaolm2raxl7ws5qdzps5sy71whel9p2ntqr81s7o510ivg85882m79ktnk6y29llqtcs36ja4nciwnwrzl25u51jn6ugon85xau2w2xyb6spku1q6pyhlu8ifv48novfhfukoo51lo5y5bk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : true
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 18:56:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 09:44:39'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 20:42:44'
    })
    deletedAt: string;
    
    
}
