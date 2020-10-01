import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7df7ef26-28a4-4818-bf0b-3277c32fea01'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '51669471-36c1-4325-921d-9f2c21906974'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '88jzw4p5cjpmjnzbhmpf269qeo8hdvxbqztd8cxdvmbup2223y'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '428c8487-5c5e-462f-bd82-ec830fe87cb7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'l5za0jan4amwzxlwh8ta'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '64bdfd55-a734-4b05-b5f5-87f54b789c02'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-09-20 16:09:52'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-20 15:19:53'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-19 22:18:09'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'rycbwnhfyf07c4w9ib5bvk42nkirt5nhugtzcc4r'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'itja0pv0tvv43q6qbcex3k8k37e0yt16pzz4b889pj80to7gc0'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'pikeyd95p5cnxtipn0rqgpm3rpgkobkrq5qizwcecmz9jb3rq2ceoirt2va6j5c5p80li283ep0edz2jxum9g0qyd8axlic05dm2u4lo7ohqd5gdr6f79j788l5lam20otlk8i9brtdzz4wriqhwymzpfk7my2ij'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '0g89p7nik2xdgzxpnkb9bg7d4eivf46wb2dcxlkrvd544ca1ebsfgdwa6tofb5nqdpzn78mo7hdiasrmlxzl8espha3gxlqz32vq8n6dhwawte3p0r9ubs152mo3y1w279akawq7is4ud92rpiwhu8ub3ygrf240'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'vgvjylaioo7713q3dajyhqj4v5n7fq15y2j4zu3b5035ot0yg8i3cwwltqe4aq7vkprhlkwlmv6hb2gyouwh0qq62hgljsy53kasg8kq3i63crdzlesq6kdhi5i2c45ornlunajmz5wt13h9s5x7d8e077olvkpd'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Et nihil cum laboriosam iste ut dicta. At culpa est quia facere amet facere dolor. Quis qui doloribus fuga nobis voluptate est voluptatibus. Sit ea ut temporibus a exercitationem quaerat non illum eum.'
    })
    detail: string;
    
    
}
