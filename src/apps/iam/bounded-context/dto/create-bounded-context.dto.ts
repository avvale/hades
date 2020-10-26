import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '100be2dd-fc5a-482d-9093-45dd8d9d58fb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'etm1piitawv4g0qel0v1mwaicz7wu0vp2od5vu2qltu8sjcehpelpjz900mqosrrbe2b5bqx6l1zs3gsug5vkf0hrgrms5yj5tydttxksmmv2x9htbzy6r9qlu2p9eno9q745a6ctenypiwh1ukkb476xdeglwmsgi90f64ti5yzihnu90012b2eygz2u66aftiq0nqu0ognls7hfb0xt2e2y801g8yn5wu79gda2ugmux9urygjtcib0951dwp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '5s04wdfj3m4oaelc63gp9lno70ki5w'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 715983
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
