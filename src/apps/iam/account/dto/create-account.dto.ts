import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '39a835ee-32a8-41ef-a186-bb67e7d429df'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'SERVICE',
        enum        : ['USER','SERVICE']
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vq7qxwwu23bz5685pw6curyxy4xo5j9k50vi4nd1ibum2yyaqlrrav9scvzwomww31lj7ido5nchdxhf6eyjaimi5lvbk2ful6cq81cc4lz2y6sb7ym2yrah2gd7oabwnf1v0t34xcjxyyw01e4cy5s1ts4tpde3c7u8mcqtgxq8q339gyp1k01n59fapiafu2z8srwx1ou3acxq2q9397tdpib8cg04v2knc86708003yg779vhmsn2k3gh50m'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : 'fda397b2-2dc1-4f94-88fa-92a08076df97'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'applicationCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    applicationCodes: any;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'permissions [input here api field description]',
        example     : { "foo" : "bar" }
    })
    permissions: any;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roleIds: string[];
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'tenantIds [input here api field description]',
        example     : '',
    })
    tenantIds: string[];
    
    
}
