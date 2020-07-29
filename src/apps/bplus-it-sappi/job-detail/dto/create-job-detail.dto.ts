import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '81611d4d-e85b-4ae3-9405-fab0b18c73f5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6ix7jewnd1g8yhx8g0h9bv1bx0winm2puggy25k6iylqqojhjq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '648cfca8-ad0f-4226-8784-294418508a88'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'os71k8ep33zyn650c7uw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '104e97fd-31e6-4673-9382-1b374502a2ed'
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
        example     : '2020-07-28 17:12:54'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 03:31:34'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 19:23:46'
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
        example     : 'kgxrqvlljc0kwvbu3bhvxq1iw8wne602qgslgdqlfsj5wvj1h937t34o4mj8pd9y9kwyg7w8700o2js57gg1tij5ytk6z2ufvgpg7tzy8vellg57plzx6nfacdak3jhvfrukqtj1785s6vxw6h9kjiynqntflbep88hyqco3bioiznt4yzx8o0z42t6kwwk3r57r2okzwq2am5mrp9is0xbey1uzrx6fmzdfuevppypxy23mzxxxasjmz8j917v'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6036735204
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '9p0849uw4r9zdr9cev5ylp4hsx9i94qp6mks3noj4mpx6zuif0402c56pvxy80sty0a6lb9sndllenifkj7w2vrgrnh17vhc426s8cltuiedneidyln7qfgz97a2q1tnc45lfntwqjb6cxqs9qazbbvp8mfylp16'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '1zfr2xvyaobo7w4odo4k08sywp8ndtth4otrr1wj5nb52o2c00dovc5zad9joimxu2hiv35sitvtutphfsoh5xe9mf2zhbmhk8b23oeygzjupoc14ymh22t02jq51jbm3zarpknf4lhmjo2tsam2i0app9zzdehfvlocbaio11sl99k3q7zbj9dujhylrzwzdq5e71gx2cn552d975ach1hullhpl5ari0vc76oalt0zmlfqn9eqw0z8uoeiccf'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 03:05:01'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 08:16:35'
    })
    endAt: string;
    
    
}
