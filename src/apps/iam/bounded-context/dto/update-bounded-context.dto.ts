import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
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
        example     : 'oin1pmjj8sumv5cgy9o5382uje0qwy8doo6x6bh8nml7ur6w0uin6ksd48p03526dt1kjdphrsy4vvkmzssiyh5wy8mkml7re34tqav31hkx2ch7cqagpn3r6e1id13tcb3t4pdfne3n4fz9391eqaflhljudyvldr4l8uunr58797gaqlshrwlpl2viydxg0jk342cxlfnckbmragwy3n2fxaauv9agqictmoazdlpy3a24amey7wyrlyjfufd'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'darf0l2ubpa69l79gwf3dz4wfz3ka7'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 374353
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
