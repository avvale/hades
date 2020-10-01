import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
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
        example     : 'w6tm3t7ax0rtabgmdq9bxavl3jfyr2sl619cw0yiohhep2ti1e'
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
        example     : 'a4dttd4e0uoge3u0yp2w'
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
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-09-20 09:11:39'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-20 09:35:46'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-19 20:32:01'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'STOPPED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'd7kaf5so4au6ua6vlgrfeuejimxl7c6wno0tnzj7'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'zmvngo6ju66e8antkxkxyhdm9qwkbcy1nbibvr86fhywg7ixhy'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'c0qf74px3tszki34tfg4rswenzgz5an5v3omieg3pl42iaj2e75r4m5afknrsixmnup1xgf3kny07dwqoz8itw6iuaj3q33gdthuqtmhjb0xmadnjskrdnmb1zjph5zmep4ezzx4h60tfw1i9qilt3y8aaqj2e5s'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'cxlgoscfopvh4sxetzsghgb1vr5usno77o9k0tr0qaece3aqsni8dioycn2hmbuqjuzxx8mv2xn99vqmbrm53o81cxzcg04w7jm42pj5fbg3qwpa0pdimp2lasbcnc9q9vjwwoym76603ieh0i2hc8mkufyrx9s9'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'a7eafo4j83qtojwqalzrigvmznxalnaas959dvlctkoqmq4eua3hkha6d2calyj9bk8j2hdyti9jt40b210k7lyhy2mgbebv5kfdtetfczea8f8yv612os36qruwnfwf1hutnsmih2mc2w8gxupz569girh0sxv6'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Pariatur consequatur qui debitis id quo id corporis suscipit. Dignissimos eligendi nihil dolor non eius veniam ratione qui voluptatem. Ad quidem earum voluptatem excepturi omnis mollitia eligendi molestiae maxime. Ut eum rerum qui.'
    })
    detail: string;
    
    
}
