import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b3dc3df4-87df-4d86-865e-7f685a93814e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '85e435d1-fd09-4add-8ff0-3f474bd43568'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '46ed1zt8i71jtvoqh1d1nlh2mmjjpuwpltdn7o5oh1ls30775b'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c06bb8b3-38e9-4c8f-a614-9a525eca3187'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'l8lv4oak3s6b5545jsq3'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '2547a432-7b81-4764-a0bc-72e0944a1c72'
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
        example     : '2020-07-27 20:10:15'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 08:57:46'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 09:15:55'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'cu0i51z5yqjyfs4279v1zuvppb8l2pwf7akwcm21auyq167s0rlgaubfji3lqmcoa6fat6msdwkj5358s137fyn8xcj970vsbh3p5vryog360g19vk8hm33qwr9lyoch05slpmqx51gavvgwffbdunn9fhpdpx9d9b1qwezkbpvy7vyk21yxv08fk4ckfn7uklzn7m0moisbugcvkklp2ua966jpcl48e1ite41vf13bzrd4w0rgbcdhux0s1iv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 7432225317
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'jhql4sjhztp2m0n33wl5gq7fwndavj06aqkfzrloh1zvvhazop2trs0tbfgf8nv3dgczfbwtv0zfb9dpvuhqi5k6sdr9l85jimoe0cm8ymglj77847dpimq6d2oco6fgv8jfgl9e3bsfrp1tnssw9vr4o17269em'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'matxh1l693je0lqeotlga90ltffr00ku00k4vmh15jtqwgkb8n224kck9oyx43f18hbgbymdrf849h3h45nar3hwkggekjzw6kc37lvxhfrao369guqwn8ddr7ew85ys92kax6xcv3lpica8ga33gjtqbfz6lc8apdzot4rnbp5qupeuuh0gvmhamm6qh89nm68gh43ozmazur6sr56zgg6y9chxwkh6sr113pbsv3ug4k4xrgfazxkpcmfrcns'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 02:16:16'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-27 20:07:00'
    })
    endAt: string;
    
    
}
