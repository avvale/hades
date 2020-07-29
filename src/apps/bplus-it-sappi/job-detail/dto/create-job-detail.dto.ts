import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'db4f5d87-76f1-44a8-a983-52c855191056'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'yp2s1y9o63cwop26zfsavnrfb45dqqnchci3x70snsgaunyqwr'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'nblbfr40a0hijihjwtv9'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b'
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
        example     : '2020-07-29 14:45:31'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 10:56:40'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 19:11:51'
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
        example     : '5z8d4ciyk820kjavhn931cj0dbyzy5c3j62lmqjnmxwwk9v6dgswz3ofav00u42a4o6bczk4vkvpxa8s3dzoytkeagjzr1m89y4et8danknosjuu6rw0vfuvwsp83h2xzmpfk6nkh8g9w43zgna9o2c4tv16sa61zpjw36gvgd475efauoepf89joxxjdsbo0u3fzm0t8dkra7uq8nz59x0vvnmz4modl646cueez573hn3ihggrdjton2sn303'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 4718543537
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '1hok3tpq6fekhors78qcnrslkl6i2bz8z5gu768638tnzari1y4oe1rzqo4vbnaz1j2aghokyx50yi5mqagq3ljpgtykomo91zf4ptea60ukympug42qnnwcvsxku86nho2gg1j3yx3ars8ma6m08eb3dke7e7qs'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'lev7u3saij7u8ydilevwua9nie68phaivgukj9vqbl1wjda2x58wxf4gmg10u2m35xldwoaepo5bdkbc7j3vqjao720kwsy97mshzj5nzvsqlffo6j98x8rttwb9ls6rf9mqgdl1io3wdz4agdabrz1izk1sh3lb7vmfayvpknpmncxaai1elpbpm59xlm5wsdi8ekj5axoc0c1g01h76zg9zx9upd2zsi7s6wgs2wsr6mywihow9zajg38w777'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-28 23:52:50'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 03:41:14'
    })
    endAt: string;
    
    
}
