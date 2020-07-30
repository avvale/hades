import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ff79b338-0f61-439b-b2bf-7384600e5d98'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89a17434-83c3-4525-9bdc-7dfd41edf243'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'mhw263pnlgn6j6ggcp0uwpu7xc9yi9drnaowp87q8txjvq11i4'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'j10r0ma6o55zwp1chrdqdyjm15oaqcb7bemh4yrl1lcmwvyoq1d5892awt5krno4liea2948qj22kjq58f3zrqmjpgk7g4khuwozcbusfnf3pvkovnynys9amqjseseqguix15m5ojdq36zklm25ea8rt25dhdro7p5tf2c9vb4k7k6l34vxnzfpzumepf51n6np67k9vzooz1zlj0mc4tna6050vj2lwi58l57vec42yex9lo8kswqd946jvlp'
    })
    name: string;
    
    
}
