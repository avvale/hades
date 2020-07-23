import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
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
        example     : 'sulr556la0qed48ziva39wt831fim2kda7itnf7u48dndc81nj'
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
        example     : '8o9d4f0lw0dq1m9idvk4'
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
        example     : '2020-07-23 04:18:54'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 04:26:48'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 07:11:34'
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
        example     : '14xmoa4dozcn8wq1z9llbsexzi8p5180hoi5wyzbs2xj2o42d7hvt5k0inifgwh0vwvyncv783nemz1ls77tex4uzcybqojo0hjha476mgrxlju0iqayme1eg5ggqpf0tjhr69djj21gowvn74bw4qnxzm677ba6w8c475trysh4itqoa3w3dnmijd15xol4sec52yc9wxr4wz77skxbg4cbhq0js13oaiiyo2pccdpoq4t9e1td3yh40ozux55'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2876574521
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '0lktb2fky5c1iwxyiohx52ingscwcvegz6h00z0ijunqow4j6k27fmycz3w434pchs4mc0u5zli61me6ewibj1uecphtm5ocrnw60r2qt7zi237cbm13dzb76ltmbf3ev472tswkq9s8ln7cj9ed2b99o63fbdmi'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'gbmmilmjdvmqq29f906jijb27wqn5lj4i97hmd32oovdp2ulzxl1oslj6b6a97cdiry35rhcq6r0t75k9l3fwovnzykt1kyx424vlngpou30xh43wnsp79ih0hv6l7dwgckgl84182bvpljuh0r5tyqidmg3qctrlm2wbi6j9kn47oeu41qvhizzmg48g163gmu48zvuwl4c0gt27kgk6i7fq7zirvsiu8sokng28w5a2g3kfgmpd661eh8miqd'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-23 04:07:57'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-23 02:04:43'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-22 21:05:47'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 12:16:56'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 02:17:18'
    })
    deletedAt: string;
    
    
}
