import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2d9a6100-8699-42ea-82b3-6b87f096d0bf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'k6y1vp67ojicevf4q3oul2i31ga0h17r5sbsxfc6okmy2mjd82rdg2jidtvlfe44udcemblpvzvbeblm4gndk1rdadsyjwzf9yic924987glcrufjf2xg9b1cmqppa5kt4jwfbuybyrj62ysejua36varh0id9bh9liherw9oc5b3od62pb4oq054qojze43uqlw372fluwz6whfu2iywlmh336zub0cvykvulrn8eid2k6wjwbn91yx1l04mjn'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '6tidfhad9swqer2z406x'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 666460
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
        example     : '2020-09-07 20:06:15'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-07 21:05:50'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-07 01:47:12'
    })
    deletedAt: string;
    
    
}
