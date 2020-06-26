import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '92442675-0203-4d7b-a251-1c3657038203'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '19tzgkugojsmybyigb4ie4huaq0byh1yv0n0zsqk0e8kn27nr37957qmn585gld9tr4aajz05h34axniih9604dpl31qrzd87nf3dvhi88i2p7o981r9cnglsooss2ygn5os0wnwfi7tkglr5k7vrpsvgdm61bwf59328dw6ghg10wvc4r7w0h6660fs0316ncs82kzc5qtghl048je68kg9ubaaa45gwvh61s0wvw4cmjziq8uhzsa0315pl0f'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'rq9prev3dbtnlf0ft1ww'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 290983
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-06-26 16:17:14'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-06-26 10:58:51'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-06-25 23:59:35'
    })
    deletedAt: string;
    
    
}
