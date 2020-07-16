import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6e521ac7-7f34-453c-b979-6cca399cf44b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '656171ec-fd59-46ef-b5fd-d64472f2ca81',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ww024blsjzuu1vn1yvlm',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '607751ae-2828-48ca-818a-d079459234a9',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 's2n21sq4xib484e33jhh3obw10ostrwfx67hueygnrj6nhs5ds3enxq8yiui84142zrqjkfwe11fbt7r0gh4l20ft7v331uqrocwierevppvgtcgebev5r2c1zv9iyf07kj93hcbgsvoy06l68ne0a6ysearrg7te1i37o5hecin06u1f07zqlzbjxhnf2x0usx951c54guqz3snwrzjda06vbp9onu3he2bfu46id32jjzo0y055eqnvjwuj55',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'plev2kdet49i55j79h00mz8ssnwpnf5fhzyava8uhqz58o1p38v9o5w1stf9oyd7a0ywtwd99qi2og7zqq02mma11ji084yem10lkqhz6cuw67wfi40e68dxxu0uzguqf21yzb3w6djqs05qeihl4z47jqk54le2lrg6vvqblp2tevim91fz36i39jn0xp4n4ek367q620zqa1ckwvpxmq1epajcy5bkzyu19mk3fxzidi25o7xtme34wb34coy',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 's3m4z6kb7jiokgh1nugrbmavybwlqefg1q2cruc46jw6gvzew97spp3fet9secy3djioeqxvr9p9e7enk75sbw1u21ugzujur27iml7w2ky5j4mzlvu2xa7t7bqa753lqvnxddhyomx7s7jshhqaoxjgkl46cwx6h8wz09sderdjq6l8sltxzxu4t7lzfkvqq41up59fa2zybzozoodfrmxf31ya8ko4m8f9f2xorx8rwfyj57v5u5vi769nefh',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'xekz8tz8isu1s1n13hel8lood71tim9zy1d0oizjeklmilyij0t14bom6qk2kh2alv3wu6hlyauxskci5dkmi4e372w5j34c3qosjqr7xwkxvs06rctqquis',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '9rnxehs8xaelsw47h1buxts32wa22sf0ps9v9xk30dh69xlkc8igmwc97kvh',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'tb9921qlzyt905tk4jx1p1w96h5o8siu1whq1ycjb0o89ds30kwwceeixtnz6wr6m8uwaeezl1aii1kkybuolm98pi7czc2r8nap5xv5vz0cgx3gf23u1xavrm3n2kppb44cqjgj7olma1gzrczmfp3m4sdpwtjb2eelai48qs7205gtp3gy2pnbysf2i5qj1f21bona8u7pf994c5xmy5eai98a5ye0k4oc029ay93e4wtne3c4jwxh9omp0bm',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-15 20:16:59',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 00:56:43',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 17:25:46',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
