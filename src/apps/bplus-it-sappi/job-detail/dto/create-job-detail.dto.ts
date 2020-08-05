import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'rewjb0t4223kulvma2dt8fs1x5p7qn85y1tpan6fjovswpi86w'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '6abd2e32-5f16-409f-94a4-7df6b437ccb6'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'v0xl6gzwteruwwu1kns0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'f772aa06-83fa-4847-96e0-6f7a3cc3922e'
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
        example     : '2020-08-04 10:08:00'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 09:40:26'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-04 15:00:57'
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
        example     : '23dj8cyz2imrp4tmpwz1l81b5oztxumgkgojf3o7bm0srm24hwi5yxpi7vqzuegozapsfbcku1tgh1zt0ylqqbuuy73qrnrd0857ielhj8oj5dpvbjip8yf8q194zh565q5csfurx8960omi6syqjiay5y9a88u9ctditgqcr9y2htqr8fu1rtvq89xqu804yjdyz4hj9ng7wbsxnnflkp48ojpwfpt1ctpnpa7xbol9bh022fw0s5qxk939v18'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 3600617456
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'qlmxolfr0x2rpitv8y7g8iupwla48cw6ivaqcnskln6161fty10q223zgmnir78whsb2efp6xig709rshj1gmpi11xurrbqua3i6ln5ixin3o0xekqvde3lrqcvzplzoghiu9sy5dlg9py46iteuiu2a4mn0s7ex'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'qx8g1u5bkhuocznuse9696jsmcpa6jmmuuxq5wmxnd1k7gysp68ogmg4vnqdv05zbjwh07o10ba7z9g3gnm4weidzhuxppvau2dtuct01oqdcun34iljckvjhx0b1z9wtpcekvsozhp1f2ks4bd01z6s57bpn3x8f4fn4zckc90dz7hvqjp3qpe10gmwfsuztq298dq84w13ql8epycjiy5zebt3b8iigq871jp1o3jhbbezgnwm05g51uowmc0'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-08-04 15:55:46'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-08-05 01:37:29'
    })
    endAt: string;
    
    
}
