import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'b8h0i6yj3pnfaebpnpdo4re3oa27raepk7hcqlh5fcbgi7u42fua9z42te8kxvwg5dzscsgjwqv13rlmkltrx6ennqv3t2f1suw2mg7dieeqotgm5v3hai0fag3wbnp9gax63klnnjo9y0grifmhxrlvav05n5oc4rkrfxntygn6xk92qz8elxrryl9qwrhj3qy4ol2q4i6exr9f8zt9untargc0ih4r7hipe9cap1a5bf0mmg0ypb7ldku4w44',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : false,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    hasAttachments: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-05 12:31:37',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-05 11:20:51',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-05 01:33:34',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
