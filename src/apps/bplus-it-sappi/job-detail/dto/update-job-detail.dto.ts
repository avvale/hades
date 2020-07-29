import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2412f3ed-d085-4c94-b97e-35a7b50cc6d4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '81611d4d-e85b-4ae3-9405-fab0b18c73f5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'hc9uplkduu8eawv8su6sxjty15cvfet15nhpnzavu5xisxtqfh'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '648cfca8-ad0f-4226-8784-294418508a88'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'c5zqoeaojoz5bxx3y8kw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '104e97fd-31e6-4673-9382-1b374502a2ed'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-29 01:29:06'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 09:41:24'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 22:26:56'
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
        example     : 'a5yblrabhn0z9910431ybwdvov6ncyb6o11l43akmem6vremcvbrlragw3ty52buogwvz8dfr5shlgi4oon15r0pnp410tr7hquncxc43t2n85vjmb49taudkr6smdjno3souxogc29ut17nmbws798mvhu2nsgki8qrtaspebq2gh6kjmlpxybvkwra575cgfhya6az2v8v7rsaycti3ob4fgl4cxk2n6frussbwsu1k8dw84v4n4w1lkkw5yv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 4952667159
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'hhiksawhb5qkncxyo43ayt389u7gm6w6mw1nlb5ojmkm2llxdccpt5rq35npi6qapkfyz5lqnzek9ws22uftvummcd0fecvsxmju3rgu1vf0ck9fz6rjhb03rd6q8n91mj9766k6znahhxwdlj10ufns9qi8f205'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'zxwcxxwgmbb4dpk7nudxuetesc64a0n54gk2934be2oupx0pe0t3vr0uvtyxqgxz9v1livqfaumbaezu1s5bro5w6ocjn6gkacq4s5w5d4qclmjeoid1bj2lsor6mx5278ar1raha19kfghokw4p5hshl926wvh69bco1hsklt1u77g801ng721nxykhim5hwbl04d2aqu8it8ps618j7twsd05ush8fc3u9vivt4nf7oyrx0lexjkge8j63g3y'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 15:30:18'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 16:09:30'
    })
    endAt: string;
    
    
}
