import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d4604ef-36ec-4231-8ea3-df91fc2646e0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fb3abe84-8b28-4426-bbdc-cc202aca33e0'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ex4znsc1ljtymusqj7zd8pawpwlss1ptrtz3u7v4j06yurfilh'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '88c30783-e234-4aca-8d22-1508f0033aec'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'qzf2c8tpmj8xitpm3fxb'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'cf4614ed-748a-4f8f-b59c-2091b234167d'
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
        example     : '2020-08-03 21:12:23'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 00:36:11'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 20:33:53'
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
        example     : 'bxlssqnkv39enney2bpabr32htf74leobensa931jbvcdlcn5worvtna4f1o5uh1gnbgw6hf8o3gz0g52mfoc8jggarjvuatnbs98h7dffz9mtcofk9vgrx6nipl5otcpf9tbjbauvet7ebs2mjriequjiosbbti065v00f3x3aqfla2fsi8rgkxcwuqzb4puk9hdols43qwqk0b4uq0vi26m491207aqvva0imhul7qf8866zx9rnmlzebxsnj'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 7028684195
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '5y0clayeoshp4lre042zqwae54izfm3dwe7i3lxa3f6wotthg3aw2kpu9f8t34hnaw1rd7e0dxse1oz03rvi7js9lstludj43zkzpfhwm7bvaruuidg1sdk3cryoavh60a2scrp8bvz0jnepj5w02o5rj6ms1mbb'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'gc8ne8fqtmeh7q5dm8pasl9qvl5s1uofm02cva5j5lff7mzoyux29ki5mokad55gwt77w36pse6y72vf53d2zbpbst0l2623rsiu2tg8llk052i96fflpzeaapkvoywhj1bfvwxgyo1ydpp1toeiuqhss59jupm0zve3nkzb2xsiploi5yedcurynwjiy9bufgx32io9iz1gebe1alwrdavkneoufzp3i1d4fzw0zgfz5o24naeppuidr1h3l8m'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-08-03 15:56:07'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-08-04 04:20:25'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 03:22:27'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 01:04:32'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 06:08:29'
    })
    deletedAt: string;
    
    
}
