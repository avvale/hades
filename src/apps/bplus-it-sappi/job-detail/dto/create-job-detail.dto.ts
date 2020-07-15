import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6cb9ea29-9d2a-41b9-b3d4-0e6e6daae1ea'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '93280fac-34d0-4f7e-8447-8e6314664cf0'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7df7f500-6d68-4fe8-861a-22d7314d2562'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '69kp62ngoaliliv2tgjy'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'eccd75df-265a-4cf6-8f6a-57eec5ab1cef'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-14 23:26:08'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 12:10:31'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-14 23:59:44'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'duw4uazudopv402rogec5rp6e28fdpts62gb5uk02adqrgnv1c1otmq9qgjwio5jlbmd4r0frz512w4f7e0pb0olbvgdny6fr7ak088ivmnqp8cxfehocgg4jyjwlua6lyfz7h5zex159rf0yapdae1lkmiizxbpy0hwkyy5sy9o7acxv1nmkpo17sjm13ytw7vhwdk69slku5vm8pmpvez63xw7lttklguxubp3npy4lutxv4coqu95jiwp5bw'
    })
    name: string;
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 5346324837
    })
    returnCode: number;
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'sfk1e7xfild0h8su55exksvc2rp9eb7m1kjl0pu2lb2pabl8huaqf2zc6g2earqpsp6jmo37r0esesifi57gpnqr1kajekk7s931c5uxj6p7uk7gbmgd1z2ac9i4d5gpi8qgh4315te5bi2x37mpg0oxcd5hefe2'
    })
    node: string;
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'qb3ry95y9dyr6kvvkud9pmazmvhiihgdbhl5j83pn8rp69vcbpom6yl81102q4hxj4zxpj50v5mazpfi1tj8ymod8uzw8atwl0sqseqkx4nwyv73i5070obvy9gu03vuij6ci5vuji1zo0i4wtzqldd1xm3m13k25trgmj1yxg54pieylej33eepa01xc7owm2bnudui9qqrpi003egjpbbs5nqkbqkat3iwc49k6ri848tm1f9nq1xs6lhkr6r'
    })
    user: string;
    
}
