import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8336595c-4691-44db-bb63-a7fd9c7f8349'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8c12e5b7-3d27-4955-ae4f-10e545033b47'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '4pw5s6h2m0qs07ewa0d0at03yfd0ulyk28irhvrg5n076kbwzz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '72677ac2-de78-44cd-b75d-06bb7299013a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'mjd2llmgkrxms8v5dvpy'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50'
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
        example     : '2020-07-31 01:51:27'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-31 01:35:10'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-30 18:47:02'
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
        example     : 'mjxeiw0bs948825v3tch6vkrzyocf88xpumcvo28'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'yqxqu6epff6c683qvlgm6ynk1q18fnmuyq8prjhkwk9u7u2qiw'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'n852k8dffafed2qs62jq5fblyxywo0siyccoi3ai3i1won4wv8fxl0h8zu7owk60k1olee6py5sz8varr1nunryv19fsjopkbpjh6j287j8p3tfa6e62b1w4rrrakqq93qwcsrlt3dxnyse8jud8e3a4900j9kee'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'fdsseyzklcpvj0qcthhfk3ki5ddm65rca39gkqedpglo3kzl1wtcrwqj5it53llsk3llymzpqw7e3blopc59ryhvgt9jdywq5oih8a2f6ie6fsoak35m5pqnvo5ev6fdsdpv4bc5868msw8yd4y91dzfdhp0q4j6'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ru5wrjfgoejbehwd5sn0ukp5o56vo0mu10c7lxc8a36dc3m7ae9toy5ss8pl2sf2ltyqk8kqgqlp7jsbzyuwe1znkjltorokb4utudv78lgx08w2scmx4j2l7zobr5zogs9csfrgsw5zktziciz2wyww9h0rk3zx'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quibusdam unde esse. Et sed ex eveniet sed sint et sit. Itaque nobis aut earum vitae eius voluptatem quisquam.'
    })
    detail: string;
    
    
}
