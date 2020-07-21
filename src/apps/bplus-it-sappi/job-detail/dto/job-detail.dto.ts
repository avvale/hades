import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
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
        example     : 'p7x8gaw5z1jfxlfb024k'
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
        example     : '2020-07-21 14:53:00'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-21 09:17:40'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-21 14:28:31'
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
        example     : 's53p62ivkeyaduvrm6vuwg3b4gvn19t5jy34o2svesypq2wxa1v66evllhqhqo2hmljwpobvfbv8gvvfry0ugfm5xdwqg5ninb8bxh8ctz3fw0nn0ksvefi6l7o5tw76k27dyd3mydd3vps8agbqaw2gyn65v4424i63tkqqt3d63rde7q2xn87srr9ip2bikl42qd6jsg8szz5u0spg03te77elb0260xho5o9d6wyy4qo9th0cunvhyrz3ns9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 1220956213
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'klkfj8j602c8zahg4qkwc44sfn0vqrmogr4hjpjx6qnds4528rw3m2f4n6fgzfq7vefl1dh6ajkurh1lrrisix1nplau23p8g4rpnwxbaq6s28hcir06mqrpwluyxeolwak8s7n4mk65jxm0pjf7iijttuikn9i9'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '9c67ejv9z79itd5i7hgn0hx7twabn36b7emwmnsyg643vqk7p1xnfd4sts9328tz57djjb424xmmy9kvn47lvo9bn69k2p35fcettlquy17ps0eneeumaq2bkii5j2h77ap9oaawl5x515xyznxpbt71l0zmehgnr2m9u638hg39lekjxenu9nodxedrz0xeaek8p9xrjdl6f0oy26be5pmwthfvbefclhu1zx3tewro0adee94ky7aazpdq9l0'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 10:56:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 17:52:23'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 18:27:45'
    })
    deletedAt: string;
    
    
}
