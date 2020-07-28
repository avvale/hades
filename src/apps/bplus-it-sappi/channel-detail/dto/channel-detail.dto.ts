import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '11e36733-928e-4ff3-99e2-523d69ae370f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8ec4d98-010d-4b1e-941d-a7a86c30a653'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'kim4c0ikjgf4uq4axokb3m6kc4wokeqqzo7f81jia0om2vdz1v'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5dbbfb28-421f-4131-9f54-668dc4f9273d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ynu7u6czlfq8qcsmzgct'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c30b8a03-f9ca-4346-944c-918dc83d6aef'
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
        example     : '2020-07-28 00:45:06'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 13:22:36'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 21:29:44'
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
        description : 'channelId [input here api field description]',
        example     : 'b9ac1ac4-324f-449c-8260-37cef826edbd'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'ymn24ga0j2rdkh08bgq23zn0lj7wjb2uaw4lyaozt4xku65f5w'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ooe5s6cxko50oacot9pvenumiklkd5uuu3tmzhp5wxjflj6dh7ql2a6qq1goymo3v67ba6gw85646iaxjkbkhgges08kaasg2nmh3pyrgtcfcytff4tbf2j5xs1rxnehkpawtzvmptfvlhrm83ud78boih8bppsn'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'c1cq5otwy75br6hxtqik1iqfbpzxd0lv15vwzk503s9al3ddz52h85uhfogsyfn6cn7cyxwhnjk9u3mtqbt3nbvtguak8kp8x5pzft6wkunaqc8vyhp590t4jm210n6cykbgz3ltevbgctjdlvebaazgzplp0nr3'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'pa8qzq6d4stgl4cbwg4tdf54i5vcx3smglqdck3rrlzy8tkffchh98ek1bvxjlrsemzo5l1p8jpqrwgzfzf5lan0qkqkg5opz3y5aqv71mytdlw3svipzxvii2863o3p3760uzw4xg36yvqxy5oijvr75ad24wqi'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Saepe necessitatibus quis minus ipsum harum voluptate modi sint. Atque consectetur occaecati provident facere qui voluptatem aperiam aut et. Nobis ullam cupiditate itaque sed.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 04:39:59'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 16:49:54'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 10:00:40'
    })
    deletedAt: string;
    
    
}
