import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'code [input here api field description]',
            example     : 8041865664
        })
        code: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '0d7ba885-0f6d-4149-8d2b-8e15081fa80c'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantCode [input here api field description]',
            example     : 'k6t044mkdu090tvpflqeix4klx821t5lydd5ob9lvdxu8s7qq7'
        })
        tenantCode: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'urlBase [input here api field description]',
            example     : 'wp7wy03haht5pdd10suzgvwrexdouw3stev7k31872xavarw6ak1h6y2dq1csgolex2qjw1cvlarlittmo7ntttaaokho2lmps0cj5gnahgum940pi40nvvrzdsclcbjetyihf0pgl5gjgygaxeb942svb82cf0oj3bwlujvq9qttv8ke4j2zx1rdy00kdn9c8i1vaz1dm0hvld7xx28ls9ornsi3i7a54mtzeb9gw4zhy1hmabk5yw4e3g306m'
        })
        urlBase: string;
    
    
    
        @ApiProperty({
            type        : Object,
            description : 'params [input here api field description]',
            example     : { "foo" : "bar" }
        })
        params: any;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'offset [input here api field description]',
            example     : 453024
        })
        offset: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isSessionRequired [input here api field description]',
            example     : false
        })
        isSessionRequired: boolean;
    
    
}
