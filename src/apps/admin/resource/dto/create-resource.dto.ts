import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '7c1f725a-2fd6-48e4-b73a-9814c76458ac'
    })
    boundedContextId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'nawurd2yima8c38azx67ljzmq3hbraajefphez7mo0nzc4mhcfz4h6cumm3ihsskst82eyudcj9p5flm1lx8xpmjkx742cgn6tqbov837fqrmjby63ilbcqt7ep8ruaf3fodlkamcjbtrorl9dzajdkmhh7xzda2bxf0m0pptnf83edzfryrd3a71fx5gyalwsqd01ee61vtgqddnekecxq1yj0uu20ub2wdeuex0n0fhp6c85w6puqrq8zmums'
    })
    name: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : false
    })
    hasCustomFields: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
}
