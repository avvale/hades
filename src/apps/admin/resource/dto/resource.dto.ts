import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '577bec9c-af19-4a48-a5e3-0355abfb6dbf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'doeplc1akrb2qmp4l81eobe7xvrwiy31o9xs660j4wf0jf3ssyqnoqay7j3t0qc32q6v7lbqg9tnq59xvtqhzcbsf7iw01xzjyk3ryn8su9bz69jg2h3p45rt8juao2m50l72cqo9habti32skjkzjh5qqar2lp3pyebus8vn8x9pcet4ins5zi56o7xik1s88m7vla6pkspnherwbxzcs04p2id1wq2vglzk9vyfxivdnx7dkpx2yvx0vk0ydq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : true
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-23 02:40:15'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 08:07:04'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 04:38:51'
    })
    deletedAt: string;
    
    
}
