import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '99d5404c-1667-48d4-b10a-809991f67d6b'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '99dd7bdf-e50d-4e46-9710-3df4cefc6cf2'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9bda5c93-a5db-4631-aa26-9c9d77a8454d'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'nd6vs9qylroiwgcxewtm'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5b2c2d78-3728-4ef2-845c-960c83585d67'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 11:22:30'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 23:40:43'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 17:14:08'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNKNOWN'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '3afea616-40f1-4ec5-87cf-84636acb0a49'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '82fadxhinq4nysw276sntouws4kih3zp3nadstp37p9twuqoxuyyqbiexebhtr5ts8xz8xt7pkhlor7vad6c30bcce15phmtvhs2prorzptvyn0ydxjg7s4vsujkmpu7ge30bk8cubcuh3bdjj8jptjqloyn264b'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'nnld5h51fym2w6rjvu91ojy5l1boztjh37uf75agpceb04u6j45mitssrj1z20ch3aq4gpexi2o4hxwkxd37v9hu2vdmwllfd1oa1uq11w9cggkuz0ckluhq5a07m2d2zrpzkv42pr5zs97mo3y5ms0b6rlnnnxu'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'k5jvaw5y93xjvmnzvh1o5dssv5f2hb5iz2h1ggnvsfpkhge8f9nevfzx1pxgnvj6vls443hnk131prbi6gw7vyvecuwwv8pensqipg782086kfsqsee1eb4t8izcqw40to6nddumjx7geawaw9z695eanshs22ux'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Voluptatem ut consectetur soluta est corrupti et. Est eum ut sit porro. In recusandae tempore nam iste aut temporibus ab fugiat aut. Nulla voluptates nihil dolorum molestiae ad. Ipsum et expedita ut est totam illo provident qui totam. Iusto voluptatem aut.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'sqhdbr45ymt257h6emobq9j0yuu2akyiav3e4pzg0vf5yn3ck46lpr4r4ykc4uxnvyhe4hp1892a1q61yptp01cij6izid1lf28hqahxorm716n7rim20284v506j41iqiyfq9qiigiz56t19mbm5qg4kmkmipus'
    })
    example: string;
    
}
