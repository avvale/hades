import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'eb375bd5-0f7a-4b15-b617-8ace4437c646'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '14e8adae-7ae9-4146-817e-36f43618ad8b'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'slvou8hzpro46j6s80fyebqstzzmnagsau6twocqibxahz3g0vchfjb63njf79znag7mx883t9vik29c8ycxlultrix8yd2ih15u35hf82cdm46zdbllfjwrsk7c2aj3uokrvloyjun7phpt4wp09455xc9wqzp136f4xyrcdsamwphmpamwv5ag31wavd1nwtgr0r73ppajsbsmnnid6utnu3dzcjiboy9r8q55iskob0898zlyk51xryddgzb'
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
        example     : '2020-07-23 13:34:49'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 23:15:33'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-24 11:23:11'
    })
    deletedAt: string;
    
    
}
