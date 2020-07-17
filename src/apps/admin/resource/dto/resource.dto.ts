import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'ef62f526-feac-4e8c-a9c9-9ed906bb3891'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'dip6c5iaur05fa2bstues411eo4b1e1xngbafh4nvt5fugb6jrnzfn3mdfclysggju1ts15fufz2vp53xh8rsq4om5hafue3mh0nb272h3m17hqa135pm781q8v38dzlcpdo0pmyocjihdi8hm13rc7u63o8w03kb4ggbcwdv18fkolj3qxy08pzfyiiydljur61cgw0hmdt8e1545cvyg2sapbnxs6yet2v9melzxmbn04w7h5wibvdbu04523'
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
        example     : false
    })
    hasAttachments: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-17 08:50:53'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 20:02:40'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-17 17:17:10'
    })
    deletedAt: string;
    
    
}
