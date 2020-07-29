import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b5c8236f-8381-425a-9320-978649a142ba'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ygornm0pd3ax1b8j806jm7ksofg9sma0s24irqc8xrakv7g6iz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8fejqn7iow8hp4u5imuw6lvpzd7lfrzel751ljxk3jlbov65phlmy7o2dle662fo895pnlbzjpmk279cchf0wpnd69zy37ujq9cldvlwi1otk3egfkpvvfbd9350jaljvmbi3fyf3wkqga4csmqpxnqfy2p77i8ailfu99rzkg1ak3mjqn93pk6ve3fufw0l7fw25ygzmcgivwwbzvkeunnt2qhb2uc99ghxhjq3l6jfnecj6fp5uwp9v2kasjw'
    })
    name: string;
    
    
}
