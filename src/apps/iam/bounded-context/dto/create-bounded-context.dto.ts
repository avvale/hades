import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c2ac7dce-ec63-466d-80ce-3d53995522ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'rm4ewln7ucd7q0x333zpxf2pk4go3hsrfjspxcs9oqnrctlq84s20uhza7vwxg7w5opd3abv6jlsi289tmgn9gpbnsryhnaf2ub7178h368m042ffowzjom49s20hd6iqutknjbeqvhkd6gwe03d4ypey6m825koewpbmc52485quz8yf7mcx222bbg5bp01y2g9svzz6q246wr37lxi9t0gz3sfbh8yppg9jveri6s8ptuyg2t80cjjau7ndhb'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'ey3fsmexkvxerfpc8ltjfatfqokj3a'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 402264
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
