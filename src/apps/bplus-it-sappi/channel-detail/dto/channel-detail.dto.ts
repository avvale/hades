import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8955fb29-e3b9-48f1-aed1-e0609284bee0',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '08ea6898-c808-46e0-b5aa-6587eb458e0d',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1872191d-3649-49d6-9bfe-4f871cb90c87',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2ecp9mu008ou6dk6319q',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bab4872b-d33f-4ebf-8e26-e24112fdb459',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 19:49:17',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-17 05:10:51',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 22:35:07',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'STOPPED',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '65a58e8f-a01c-4206-bd23-33c36604ea63',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'keba4kwstez8o0feb3dn8xfmbdmy5yjkt57kvbsm3f1tppnhrt1n50rvadmpkz0vvoizxvf6izw8n62xtnsgdpa823wjcdbiamnr1qi23g3kxll41a4fbkcl7wmfehn0jzszq0t4vhiu6pjxnho18vsmxq6lwvnu',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '5iy8unrdyp1o881jvh73u28nld4fxaqj7pwpari38vmqh8f4k0ow1m16en7fkq9jsp69oemqk63l3y0jxx963s3i0qodrlhpggih2iltnxzh4xd1ci5plpmnkvqz1lktv2r7v415c5xt37vp0otlo3scyyktvogn',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'mxkzph5wmf4drjj6gx2pu86ia2m0hzxh4s2d5s0sn8kk2ftomr48fmion74hukauroh4t8uv9iu0wkdofj7ndoygecoye9f0z96jnbt8ykdxg7p4htfbx9rzb2rpr30awdkuibesoz6dhyae9ndnhgx8lo783lbr',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Qui quae vel. Nemo aut ipsum quam sed consequatur officiis. Consequatur sit quaerat nostrum. Quis rerum odio dolores quisquam omnis.',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'xruuq1otk47f4fzbq65um1aqrdbk7j2fxh8cm433a7n4xgllcuotcgeq1bltiqcwxipipgmk9mtt2eaaquy5aubwt8b9hmx6wug5syp77b9yemh22sf51w8887mnagmrjv3a13u23q05mlkuldjjg50ixbkj1w6y',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-17 10:20:09',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 15:45:31',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 22:17:10',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
