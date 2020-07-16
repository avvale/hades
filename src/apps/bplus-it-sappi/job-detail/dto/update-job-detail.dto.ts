import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e72d76ab-361e-43b5-b0e9-11e045bbd835'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '93ba12a4-8601-47a7-8fc7-3da34e71a248'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4b0edacf-4b04-4fa8-8621-11e0ca532d69'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'eo7x3ck6yxegw9pnwc3x'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 08:12:34'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 01:05:11'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 02:10:37'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ktom9b3jk83398bf65ra9nw6casxy2d75gjgj5x8hf2avzsdy87c64nujzehb34xfka5rxnmvc25n1kxdd4fhjvkz3whlmddj014ia0twu9qh7ayy28ejocakaoc7fcwm2su6kxjqg6zbzinzvyquf5decmbz57nhn2bsiw36sm23ukgrd75uae3sigb0mkn4gmu6iecdz316434p1syytqd1umzjfeezmoquz53ecxpmjwh7cxqzo7ygqeq3jl'
    })
    name: string;
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2313673770
    })
    returnCode: number;
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'qnp19huam3hahesnm4rz8i49tg3s89vh5clwixot2tnebztnok8yr1s047sumflhj9wj3x8dk4loofttt4pl6qgiccwmbhmzi2harbrjhutjq29oe16bs6wy7yqcboihd74ggh7tbrp19tmt3011py5yckb2agiy'
    })
    node: string;
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '5wcd8vntdorityk5su1ufzpqech3yxy29u7cul15fcx180n773vegnxofyw0ia25duqbdgzhgfskvbpydc25kb7p5kzo6t58g9tefydknwqs2kuj0y8sjk8za5bl51z3rgzj064fb3q8hvkj8m0jus9d2aze6w4z39hyyhq3r5jhb3w7r5yzfcjupc4giqgbyjja8hrfmnvps3mg88kdgtjed3velh50ofka3wmgbaedkzhp46iyritj5usma3r'
    })
    user: string;
    
}
