import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '4c2cdda9-73fa-4cc4-9180-394fa67710f1'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '5ebacb23-a452-47aa-afb4-045d24c31538'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'd51cde54-0e5b-4ad7-bc61-33ab44931585'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : '5q228g7cryif6fi8ho5u'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : '28324a33-9d00-48d1-aaa6-2758a7c1bbe7'
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
            example     : '2020-07-21 02:45:08'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 19:54:52'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 15:26:40'
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
            example     : '42hl99ge3iq1utf5ufbhaeakb5hgaq4izd85ba0hccz9acedasoncbvzxb67avhdt532jtgwkty6xrn0s9yo45wkpy4hajfzc6hzzhfpt0lny0ukgsmc1wlxbsy2zuovzep0sfgpkcwxyfoe9c6gcq11cnac8vm7ci5f9zdua7sdwsqyh4cddynu7q12jyjs09p15pq012sl1ni2gi8xe0hnxynskd1ysrafhy9k1ccnqei2ett2560pqupxj2h'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'returnCode [input here api field description]',
            example     : 5860724591
        })
        returnCode: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'node [input here api field description]',
            example     : '3j38ofw2gfj9ai779oyzlgfpk120wfwss7x0lwdirxni1mh7f03acfzcnpmzrcc34d2zh0izwo3dxh5r1h62xkjo1zh2jf5hllxvhez55wn0q27ivpl4c7wuy70r4p97djllmql1e4ybzqruse08h8z33i1tzihe'
        })
        node: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'user [input here api field description]',
            example     : 'vm0q4a4a9pxl89pkplx9hpq6y018tfgr186liet00lgl40qhsotr53ihgamgtne0pqu4348fnza9xacvwfyh1mgbclln95bbb0ftnkqs5ufp693k8vwcrjlh13g5xtm4hnidkjoqoly9oeoxi9t1a63ihlh0r0uvyujxcky2809cl3ohqa98jpj2dejmm7m7feyaxxlsutxz2vr6xlk6xqfwmy7kmt7b616n5fm89cmh63bjmafeek75ppxir0e'
        })
        user: string;
    
    
}
