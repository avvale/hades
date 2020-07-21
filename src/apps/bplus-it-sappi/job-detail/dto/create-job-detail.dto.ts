import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '59563238-3020-4aac-957b-1e8e91805f46'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'c05f19c8-3590-4d2f-a384-427e73afcd57'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : '31i7rk5v68jfel2yu42y'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d'
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
            example     : '2020-07-21 22:43:21'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-22 01:00:25'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 14:51:59'
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
            example     : 'koxrfvrcuxb6shz8fwf0e2chnxzqrlqggk6a0ql7cnsh2yad5usxvw6e75hbhydy0tzorsoglglgie7p8wcjsp0r32udi89uyjvl05omaq15ueqmbbniqoafik9rwmktmjs9tktd26ho997epl2do8q1x80ry1p75ett61u9riqgcnv126le2hdgmpzc8hx9oh69rgnu0c3s93hv9gapsha2mc05rc6ssbmbevov5fllo1bbrbk63j6pf4m86wb'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'returnCode [input here api field description]',
            example     : 2029462869
        })
        returnCode: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'node [input here api field description]',
            example     : 'rc4gpaz5nxwtqnqfuodaepnb5hdjtd3y7bzylj9lfjy5w42lpk7rl7ba2eqgwta75g1be1skjvahkftybxmbzorksxcy1g5xqtfl51a3yox80fjbo7829qmyshmdm8p0udhwa28d9p5y7w95mbg7lf0u2ywzgepx'
        })
        node: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'user [input here api field description]',
            example     : '0skll6f5r3n5izxfiwyqc8u9gj2xodrmol0jxvw0uxuxj0owwffn80qns9wzi8wsp296tydgon8rnc23kcbob5hq27ebm4xp41g7knhczrk6f40mr9u3f5z4d1f4mfuszwsfgf1261tp7pvc9bq2av1m4v33rely8x734k4g56mem0nqegrp5y6wpzno5dkt18pkgy6zrs45a2n7v6j1idpmu0ja55xkv6cxsp28ad9jnmmsstxtl8hkagdf2b4'
        })
        user: string;
    
    
}
