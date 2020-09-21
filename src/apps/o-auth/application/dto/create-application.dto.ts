import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8d20a56d-bf5f-46ee-9ab6-959ee4c287c3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7v1sold7hkvrp8u35k4tf1mzwc0kbbrlz8my5jnoo8j3qni1s1f9t81dxugw3sfg7b6bv5spsesrzl6ephyo2assad5t7rj5qtbn3n8l86ve1tn6jm1ialxezmys8dwu48z6p80huiynykyuavzxe15q7mk6b4iu9c6kd588zacmzzpd33v96sxngqttzhmv624zkof3ohr07ik4spz42lh1o9y5nwoqscv7mafrpln70c9um1dy7mqndd8zvre'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'iownzvpa7yzd700w8pr8gtvdui3iwdr4mfzloys3iawi1cl7wf'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '3a35yixzvdnncqare7u7ksy2p7sycywuz7r8xegdfdej4i8t23yiz0vnp6rhztoztcu1r3hbslo31sjya8fp3m8i6k'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
