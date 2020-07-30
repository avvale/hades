import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4ac91fcb-c8e4-418b-ab7d-bb9b83d2ebf0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '820ecb20-b97a-433b-a4d8-35a4a3df7e14'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9xdn2ywbsmo91uc5irerlsyqdaqdgaopfx487n3czoi1pajufa'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0bc27a1c-220f-43de-a154-c67655924e86'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'pseu3aljoqkmt9tbgtck'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5c630944-af1e-4115-9a84-9b3e04feea1b'
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
        example     : '2020-07-29 22:16:31'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 03:55:53'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 07:47:19'
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
        example     : '33mzb5pe8452fkovnh4l26mskpd06gkiw7u75yzlv4gccwvnkg6p4wlhtr7by65ynbwmcegjvoaapcn96wh9wegh72yogjl86lu1xhqny9lrzp6okucxpp3i3aexsrjim451pyzka3dxs9b31pcnm3o4upchxmyrsxs1tmli2u7k63ywbts9d2y6shqr9e4gbubaf9t33gza7bbjpstx1sztjtk208migmgbm78ds6k0mvxtuchqmif3o91kspc'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 4858572790
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'p8kv82azursdu4r8cu1q6i89d5j9dpz9ybh8wimhnnmqz7xa1e9faa968am8bzvj4dcctv1gz0we5whv8up799bkpnlk0g4sd8h6jac095ilsm4rcrsx0l1rpbh5et5vudcyixbfhbtfhyys5opw9vd4dei5vzvt'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '7qj5z33ksy2c8kuukjnfz4rsv5dxhikvblioia9fawmk60l3ww5wkgm6cuujdu6yge1i0pptsfns7xf34arf45swhj3vzewjpxyiizwz42garpo2b7su4jrgz1cpsg48faxmo7m7tpao4drqf0midc6szvvl5tf4eqs7lsnlitj0bn7y5yem2jszn0u87kzoijbfp5y6ddexlbxpplvppsxohd98bpvgiabgsc3tczspd9r0ezwllqcx98fejyl'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-30 01:59:50'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-30 00:46:20'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 19:26:21'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 22:37:36'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 12:08:43'
    })
    deletedAt: string;
    
    
}
