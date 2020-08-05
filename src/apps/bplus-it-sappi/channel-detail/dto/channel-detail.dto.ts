import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c665e62f-88c2-46bf-9488-96f4c064c3d5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'cde92c0c-99c9-48b4-9e95-54222e6de843'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'w7qhhckzmv57sburfhjkbddjd4dvol30l00co259u807ewbclz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lubxyzpav9aqocdpu6bo'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '7a2c0d25-1de7-463f-bd98-7b34289c8947'
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
        example     : '2020-08-04 22:25:42'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-05 05:13:39'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-04 20:21:00'
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
        example     : 'yn1pyddjl71s3pgj3hht6v8hpdivebrk1wwc3tsz'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '0uxa1grrhxmd03zuqs1r7qq6zt624rirdwiubyfxcns1ulystg'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'yh48n28kmsfp84xuhwi5ld06dh7apb6yruzpq7azaq7q90k2tgqt8de46d8pixb19yditxp3g01sgen30tvh6yaic3bo625j7iumtyzl11akspklltfn21guaupi8y61jjwkwi1tqq35fpp05rl1meygf3ay89to'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 's6r4g154op7hmdjjprdu9mgslwtdm87yq7ojxu227bb6oe9d4006j6w66amlkho72qadcj59galo4557edt5sf6p9kzx5cu072uje5ksdqe526xs6wa9linhtkylobslo2ltfscsrap49yr05r661gcgjfr9drd4'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'wnhzlq8kmjffi9f7ih9ccxizuvq9yirhcfhuktu22f0zt6e0l8nmgs3ifufg7y0kzcddh0hnp0yf6s8b6ws3qlxtgi8nb4p3ccyx3cfks0fk0kml47q2tjwcdqqnpk6wem3b6qayj946ozs040hm6llmqi01x430'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Iusto quas temporibus architecto ut. Eos aut deleniti voluptates quia consequatur ullam temporibus ut nihil. Esse omnis ipsam. Et nostrum ut. Cumque vel voluptatem unde.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 21:43:11'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-05 07:42:33'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-05 03:28:13'
    })
    deletedAt: string;
    
    
}
