import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1b73a7cd-aab9-4f86-bb7e-da3b1b1a1c0c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'ak1d7wsqzdf9wze9jhcf'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'l1zsai1cklupgq162uffr2mu351jerde9e1derw0txijqmeji9t768lnptintdafd3xrk7ndh4994tpufpe52d7czk'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'j4mqs0g3etlth8y6a1ttrztwa6dqon61se98yhdo7q2tinfdno9851yiiwoy956j17w21967wie4jrrgg66gyid81a1d94ic4eipzmqyun0tr1gavrnvjaruj80rt65w95s68t85c4wg2m08tkjxjipfrmbtzocd9mwc0yquebklb0vnmn15u8t5kcg9h2cgoccdytpoq04hn9njkinscd5yepe8r4piza2zym7koxts8e0423h9bsqr98al2xe'
    })
    name: string;
    
    
}
