import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8955fb29-e3b9-48f1-aed1-e0609284bee0'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '08ea6898-c808-46e0-b5aa-6587eb458e0d'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1872191d-3649-49d6-9bfe-4f871cb90c87'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '1f8zc86vx1w6xsa498u2'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'bab4872b-d33f-4ebf-8e26-e24112fdb459'
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
        example     : '2020-07-17 14:28:50'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 17:44:35'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-17 10:17:14'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESSFUL'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '65a58e8f-a01c-4206-bd23-33c36604ea63'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '2v267651fy6c40rc9qy41d13qr6ruct0lto286zkzsc567si9sv91a4t0su8t5j3jelxb8hmr3bha44twjqmkixpqllqjpi17l8zmmevn6tn40188svibh6e43ky9frojvylvh83y1nfjay6poqfnuu4lw7imv9e'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '8i0re7fmantumqjuokokmk9slnr0zm3d5k3tjixntxhjxnnevimozrmb4wmnemtjg0rim8dj6gbill2h525pjnjs8a3t3d3wjgvs5ywyo7qh83h81xqsmay6w7i6uod1xl7odbozv9x2v0s5c4puwfru434ahiu6'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'tm2taf28dk5ysr0zji93i7x02wtewucxd4tjir6mvewasibeo7gpvl37zz46e4irs0ouqmv4yzj4nobz19d2menxm9w3f3wv4xfc0j9x96glluhzmlgyxpzckrs08h77g8cfia9jjji4ilq0jv14tk5ogtvd2nbh'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Ad velit vitae perspiciatis. Placeat unde aut. Quam saepe id rerum ad aut pariatur dolore vel. Qui omnis sunt perferendis quia saepe natus vero quisquam. Doloribus mollitia dolorem consectetur molestias.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '5mqrpbq9fbw4i52alrerf5bt5aozccc206fqpihy2xtydsfe08o8k2gg9zxz432vyx6heme907awhi9mkyzhhpgg3lfq0pczpwqm8ho8fxsc3qjhj9y9ahzwtd4sxp63u3zgx65yn5a3s8n3ymr3qfpgaof2ne0u'
    })
    example: string;
    
}
