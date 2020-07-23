import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8d138995-0002-4206-98fb-3578d373a05d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xmba5vmcpkwvnm24tfk71bu0ti7ajgkxl5h99x4k2gojryxr0s'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2abbc253-ec0e-4cbd-9eae-6619845cd0c1'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'u05pt4ojru5hoeklb9lk'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '78ccbd24-77fa-4dd7-8db7-f475e5c41e22'
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
        example     : '2020-07-23 04:13:36'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 07:05:54'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 14:51:12'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'wkube3wists3qassn4e2lrov5z44uk6btdlkgec61fr2o1ryojnj5ikryg4pld9r3hnetg83bo9d6ap5uyxzmtsirw1eentzy42gwvqg4009686dnh2gfxh809gceh07yo2p93pcgd0skyb10onieqptl3yjj0kse8udvibjpsaefp06fc85f8om9xqlv3gm0g0i787plo0ntwvmnarnnxnsbjewbhj92c7nd481wmd1gxp85w810x4jng0jwwx'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 9167420245
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '62wd3aq2xw9lp8upreciqizdng8bdu9vv8oj6iqefpzbgy3yoyuojm0z72z5csgx80ee9rsdtmhn3b7art0v2ndp6xoce3i39ao5qjn6f4f6u7qv38esp5fqdslmwh639v8k9yu7zrf74z1de4ulx2eevi65347y'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'rf4gy7inm54eok7ngx4hwm9ck9oh32zr4zdp9gvjzi3lyjdasmo5v4k5uai2mmk0td8412n9yab824yo3swupvx0o63io0vn8z0plpukbiyb3sqr1oe4zf4833gi9cvwu06zt51xywqcz6r9ntii29q5isx526hk1786bta8r1bvseg2k7nhqkvmifjdn15l3vi034xiz1qptea57mhtm6tl2ytypbmsa4hm2lofyawh4fjww69mvhu9z88xhr9'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-23 02:49:27'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-23 16:09:10'
    })
    endAt: string;
    
    
}
