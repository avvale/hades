import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a8a619c0-f32a-48f1-8b56-87821e187ac9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'db5bad96-c700-4aee-a85c-dfe278dc97f1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'mzom9nfhonbkuvl6bs83uc6h6xf66rx44hyu4t8qgpdi44e6gx'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9daa226c-1e69-4364-859f-98f77ce408a0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'bh4er0zaib1oayksrft4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '3d9ed954-a7e6-4415-9558-c588f3a67d5f'
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
        example     : '2020-07-29 10:59:21'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 01:10:47'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 17:23:39'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'zm8mvamqdlncek2fqd884j0hcmf3zd546ufwab1c'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'y6xmtg5rqzys8sk09yzp7kzr60js13mt2khd2m9hnptyisi3ym'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ofa61o0jo9eyu7zzc647gwzn5k41ek5ev9pifskvw9il6l4fyljrlei3y5xxz4cybyq0wm5e54m3kpvquuuce8rmwswvh6waq0l7r428dk37zt6379avjre2twnpse1fpmi2nso05odv6hzc7p0nok5tasqu0co3'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '4k8vpvw1zcdf3izw5t3w0vsisowtuo02zogm64n235ypaetvjdac1w32jjnamw2scqcqb4jw9j3kiahwsv7mtxknsiutnuchjdelltug68g3537mb1cehs5blu0k9mqm9xcy8qguif3xr9rvveuo1t5u8zmiep1v'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'nue9kgrzav4hf0k6ec1ivi42zsse0bn1hq8p1if3dmohb4axbyjmz0p92jdr2rbzxzjnma53xrwoxztxb7cresawhrf48r8vi4ovehulvyvwzf04g32foj698sutxfhjorltid5qjrd4yae3qtpomskjct1r793c'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Similique sequi nesciunt optio in alias. Nobis fugit voluptates eligendi illum molestiae. Deserunt optio praesentium dolorum inventore reiciendis.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 22:00:31'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 01:30:36'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 00:54:57'
    })
    deletedAt: string;
    
    
}
