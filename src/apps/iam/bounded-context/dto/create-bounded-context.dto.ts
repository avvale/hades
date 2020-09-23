import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2dab947a-23e1-428e-bc89-8913db14f010'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4qvtnezxez8h1b4w2hyss6xdvlvp1415tbim5560lq1hkur1lwn892fvin06r32pglo0py7ypolww7aj2bwl4ogu0ncjzshbatav5dxn0eg45tm0i70c0corisqgitwayl4so3686gash1pwq7n24oaj7kusgw2rfcily4yr9mplp6a4qpzs81u28z0qlrgw3y7slq7ydu7ugf14p1xtliicn985tv4qn5v4m6sa7hv0tzo1mlu6pwe0c3f8by9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '556u739b8wac5ljj1bnac7w0hjq75k'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 816624
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
