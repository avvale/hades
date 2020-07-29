import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6bf26010-a993-4870-9263-58c16db28cb8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'cb75a608-d00f-4b1b-8c96-ec59158b5bec'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'rir13zc4ngcldaet7awk9ta0lcayi0slp3wvzh6wf9wuaixrat'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ce797352-393f-412d-ab4d-68f1d8f2d600'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'nxzaoxzzpgaqbr7hn0w0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '4738be3a-7976-4914-aeac-c984332ed211'
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
        example     : '2020-07-29 12:29:11'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 06:47:13'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 04:10:54'
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
        example     : '2tn1g9qx6zeaaojn2mn2ch8eyl4q8p0jagbcmosjisucxmlm2q3kt3cf08sveg3bs5dz4ugey0nnn7i3vig636th89gnc6e7k1n430xt04eryyc9gj32a4ewndz3ffwu37bj7vxxmavb31lllm4ccwego7so0ixx0vpiylrj95usey9zqektzo9cm9cx8bu4zi6uozi0ctoho54wwkn13jf2s7fxz8qunoc2xqdlat074zovwt0bu3jik7zksih'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 5523006731
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '6ghdc2nynh6yj0lqsuby72frr31j4acryyp3uzh4qu4o43e7yuymojift49xmchizysxhxd99shgudmdntuafi3b8wsn1bwwbduamm44u6p7d4x2vpso58lva38diethee7lgjqiiba6z2r8030p6yxa6pt5ay5n'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 's58eafx37qd3w1cuf0aalxkd35v54rwjjjw1kc5cno7r4sc6wq3449w5k6cnzod43oj76zzn1j41k1hoom3bubvqx5dr8a96yqruhuwvph52yjimh5apqz5bows1kw541k39u90lvnqcyau37zix728xboot4vp1cch47keok24q7mnbqi8hiikc97r437tougbgphfiz3l3p9fatizncq7f20pihg19irjfk3un5w405mabxpwhyvw1193f1b0'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 19:18:22'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 14:27:37'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 21:09:50'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 22:43:09'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 14:37:55'
    })
    deletedAt: string;
    
    
}
