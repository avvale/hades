import { ApiProperty } from '@nestjs/swagger';

export class SessionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ip [input here api field description]',
        example     : 'xguiv46pqmb0set',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    ip: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'uid [input here api field description]',
        example     : '7db7pedr9u8gh4y42t9pmgr87ywi18xg2ce4si46953nn75sue9grfj656xgzvfi',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    uid: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 940019,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiredAt [input here api field description]',
        example     : '2020-07-08 22:45:03',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    expiredAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-08 17:08:19',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-09 00:57:33',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-09 06:37:10',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
