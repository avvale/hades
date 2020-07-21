import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5b766746-0377-422f-9532-537209df1406'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f0dfcb1d-30b6-4adc-878c-b25b89bca551'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'iopfxhx48wsn2l165auh'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791'
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
        example     : '2020-07-21 03:28:51'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-21 13:56:29'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-21 08:07:43'
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
        description : 'channelId [input here api field description]',
        example     : '86589264-60af-4ace-a380-4c2761014c43'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'kzu3arpv6f6jyxsk4ispml6xqbk7way3u4l6tsufpbjwb7wrkd2osyk9za9oy6535ma9nnflcd4xyysx9xauypbpqiw6ke7r7lpltvqui31rq3tlxg0uqfq85waj7hkh2awbt6e8kmvon2apq3dt50ig49i6q82q'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'nqzouf79si5458d9npkge9unpgj71ak44xtzqhz9e622bbs1lg3sg4cx4dphjvzv685aibh6z62psnnwmwzluoo4hxi74k9ib938psz41ggpskjwp6limoc5d1j586d1iv3n9di5eivauniyd6o9nwuxozflp6if'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '2iot5jtrfxn0up9b5cagnqejlzj8xqxst1xc5y5a9w0d5jecnz826fd5y326pih2hqmnvke14x3ix4o6vuvo61g3qasqgaro9510hqfdetyddhae5ki1hkbvbtqdykhtrtmz7glqnine97klwov0i5a1ooe8r0kz'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Sed iure ut. Ut iste vero. Et non et nulla quia. Saepe similique nostrum debitis aut. Molestias adipisci architecto adipisci fuga sint.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '4749f5537b43e4hlf30ws2k8hb6wfgv2i6dka6i54vq1bjm54i6qbp5uu42x2htzvw343hu0n9p3bcp88hq2n8cxhu9u26o8yi123kqw296b6wpmoqv2faw6l548pdpbi98lauv6lo391pe7wchrt6dyq0pfac6f'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 08:34:24'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 06:00:32'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 19:42:03'
    })
    deletedAt: string;
    
    
}
