import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9de10197-9c32-4f68-8ae9-acf02f56ed77'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2y4x5l7ihn5jhu9thk92qmjs41cn6m1ekizf4i7999ctcn4p2q160lpt9zeqtfd6vtydnwvdinvltn30jmo3jkvaqxsqs9cnx5sal9nhz8s2eznv4wyfo2t31u8cvq06qgmhamq492xrjuqwnrufaazuvhohmk0an3whzqpsmc72ci88zrniknl7xiys7r3eo3i79onxnie7r4xfkt0qwlvvphc1p7dwqtcq9i57nvjou7ie8ihp7tim81yakv6'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'srqmekmwjg9pc4l0snb7'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 765915
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
