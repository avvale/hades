import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dc694634-ad9b-4f35-9087-284a376220eb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '2ccdda47-9886-451e-9dc2-928db63e43cd'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'py7avtc4wrk0g3rsjmlr9l0byuun98hqvyep718fd6y61ia2uo7e3mvg9loewjpaihb5q4t0tp4v9vdq6p5ad5981n5gub0msesygdcvhljhcb2ofl19zio466s3jh3825qid9suk0tgb05p8edlih1m7jr7ihcg1w9tsmtzk01rpsd19cotx3hdwjrt7wgxq2sckygosf4gfgv31zsuv1xh5nj8t29zkxbw373una4gz1nxzup1pmimx5w7pox'
    })
    name: string;
    
    
}
