import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dc46ba40-8746-4735-9f39-e0322bf00392'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd9481fd0-b445-4a6b-a3c3-1a426349f042'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bw4unv2l668ttm17vujbqgxco2h3h9272hc6xxltnrd0nx9c01'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b43908ab-f52f-428e-b7d6-ee1b805bf069'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2uzawnc4ffwfnwon77po'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '60baa61e-ca17-4a2f-90d8-6bd2adcd466e'
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
        example     : '2020-07-29 12:51:18'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 05:23:08'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 02:12:14'
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
        example     : '5yi09wh60eerfpqiq4oj8ngwkmatyzh29z0vznzx'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'dng9pjbihqnl1vbh1iy7iuwliqde06hnlp17wmc41hx7dhfxad'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'c77373i5rniqah49o6bzaz3say70x5oqi52kkqupf0i3vqo8wkd05hlkd0h23aghnuifzyzgsd1l7be5aykw0a4uius8jdhcjm3vd2a9068gvsv8gqpedpd7rdzztwdd5vgm2vq7uj2oudx5shmkewdzz6p33fwv'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'zprphks9lxhkjljogm00akdl7ozoefhdhxvun0rjsx7ejken688pw7ozwxxu1c74hukjowzwjp6cvvxh6ftde5hadcf70lo771g2sz69pec4n3cvzlbozj77zom6wb52qkxe2gx14pgklymknwwglrn6qt2g5ubo'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '1wih4sou45n7up72o6l1g9p4uz61bqw7dkiw7bartollar8kp739t1ywk63oyrnur3tdxz73lthl6k7etbcj89gufw9qmwlo05l5xy3384i7dbamk82j8uj08ox0pd3gpfj2f4nkn2kbc7a0ke22g5148u7nj7j1'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Nesciunt in esse similique vero facere architecto harum. Illum ad magnam aut enim. Quod nemo occaecati odit.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 16:18:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 10:31:58'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 01:25:14'
    })
    deletedAt: string;
    
    
}
