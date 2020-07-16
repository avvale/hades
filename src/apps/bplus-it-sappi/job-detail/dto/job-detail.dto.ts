import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '93ba12a4-8601-47a7-8fc7-3da34e71a248',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6konosa6bbcy3sd6kpdo',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 06:02:38',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 19:57:08',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 22:50:57',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '79ogpuq93z41o773ytlpjvp13k28qdo9gf2xrtmb0txing5qzspkm0q0nolr6j0pilxwiothixw880aaiuva6ar4iz8mdubo0dja7mdxjjmtelrjo31g94adabk8cjydpnfvo0z3lwpmf8dp4j6r24jmfr0yxvfgbvzj2675tpk2f4srw2behncwpa1he77guu6xmlyfsvc7ypsqt74ofrpdwdusepxgq80u0888lwor5dr86yqondsfv1mqdeq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 1341411597,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '542xi1cl07rmc5bi99ezdx0olokhwb8qug0cf9x8ppjhw49i98gk8392bscuqt5cah4mhxzj5h7wmylqof3j05msgoru18r9akp7g0970x7i1ylpqs29w8s5oszlms45tdts8sej5l3wd7blnf5anyw0wtyjhzsp',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'jrvy13awstnymyufsi4j4ijdxncn8oz7eepxyf60jt2lwluio9bowg3wnvdjn72xxt6q99acgps0rowvu6lw5h3lo20f2trzs722vh65gmgbcv0h4gdovovkq8aagekm7cjeq7pl1fu2j29hjl44hew42hk9b256qfqz6lrflhrww5pxhdpbd3wsnqpiby55u9uzyfqtv0k7zr4197id88r31apns67h5uors9mfcmxk0xllwc3lq02rz9sn9wr',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 03:38:40',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-15 23:43:51',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 08:40:07',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
