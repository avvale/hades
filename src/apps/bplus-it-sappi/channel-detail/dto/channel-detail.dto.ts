import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8a31e12b-018d-43e9-8d58-8746bae6b01a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0btmems3xjt4hgw7cmsnq2cxjaadoyn8q2e8zhq50p3wiyg3rs'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '484039ed-36fe-48ad-9862-3ee3a36c0f04'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'okdi9mtbt9loz3z9s148'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '656afb0e-aeb8-4710-905d-df224440e09a'
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
        example     : '2020-07-29 02:22:10'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 13:15:25'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 03:27:28'
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
        example     : 'c32u3lh59gcsqh9qbam4667e2o8amlryxozkcg4p'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'iqqjhp95t2j2wgfvd345emt5xsedxte0dbeu2iim3hz6dmxfue'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'i5a2f6sg4fybm4jfhkekj9zh2be2ppvse1qpmq8wiblpbvu7relqm1bj247xmo3xm01zshno2pd6eowadqtpijr84bdbmnzgq1kt1cezx917i2v7wxs285mhqy5x0x3ovvis9hquaq58ceb5h9mo32x84r3snvvx'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '3ry5g435qnl0ef7y1fa2s754n6roibixp0we6oewuw85lahikksscufw20iooqlpu9qnw90lli2bwrsr6c06gbpqiij5bjfqo5t6bqwlktiz8sq4jg8q092om5ix4qyvqy4wizto3lajlt44yciwuek6h0mlw19i'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'uq3ix2qevig5p5ea0wlsw0yg6fw8q8rk6ho60t70hre7i7c9w19ty6ros0py779vpc38vw8ollokzwgcf8sn796w2swdjnfouhv6cz5yjtmj2btkhnlaokxl53fey9erzs403pd5pkl0w6r8hi8qt2f4tpg5yk58'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Id beatae possimus deleniti quae et. Beatae consequatur molestiae nam quisquam amet dolorum assumenda incidunt. Mollitia nisi debitis dolorum fuga inventore.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 12:19:59'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 02:12:29'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 07:03:22'
    })
    deletedAt: string;
    
    
}
