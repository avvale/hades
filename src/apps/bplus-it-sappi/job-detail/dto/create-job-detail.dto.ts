import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '33cfa3a2-0ea7-4bf2-9f0e-a291e34b583f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ef0326c1-65d3-4515-a38d-627a6bfec5cd'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'axxmj8q3zoihanqm14kuo2kflxjymrpwsg1hn9gfa2b2oprus1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '666ce5a8-7b9a-4d53-ad66-ed1e4c464391'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4cd5uylog4i7ellcelnt'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'a8d0b3de-9107-424c-926a-deb2e2399796'
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
        example     : '2020-07-27 12:43:42'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 09:36:28'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 08:55:30'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'dgoh4xjgih4ms4s54c42nlhlzy2rdqtg6u49d8hpq8gw76t4d9vevgx0utmllnr1phsmn1mt8ngwic3did83tkk1aiuayx7fdyfytzc7ojsl4pusnjbhbkjr5y1kd8gja7ce14b04z22hh663u8jjerbhjeeyoqpj1k081lni2c0lov7or44hy80he3q0wmm8dx5rtnl0ln9ijmjg2vqtzmtkyszfvxd0vfa0npk2s3bu8e1bz95d5swh22rcpg'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 3178959066
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'n3uaw3k5m6wsi4ka9p30dnds8rj8l6p85sc2sc07trtjgmo1to0ebytle19b07f84ymmdztkutl9oxdlbyvnzsbkorb7kpg6ybcdprmwihan30hdhy6ji0jfkd6nnmprzgwfq6pt55666gsxk178nhedurd2desp'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '2pfkooufaqkqjxhk82iovaj09t6rfvejzgb7jhp5t9zghxe0a808ob8s78qzwi77vbt9gc59cazqpk1shp4mfrvd3ysdddn9h50rw9yylcd960oyifdnkn1942xis5v23zx9ibfxlmop6y5a1wbsf6tbwupiurxr3btaddmeyc6oakow3txvea3ufeg4zj6ykt4yooc1or42lc8w03k1tidnzsarlx4zhtz59l27mr430ldlcljqd78xu1zjllm'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-27 14:47:25'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-27 12:56:04'
    })
    endAt: string;
    
    
}
