import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1852c4c5-065d-4339-87ec-ac0250ed36cf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6e4bce49-333b-4441-b565-3adc6914baaf'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bak75sek8uqzk7m25mn6go1vlz1z4ka2rf4jwk4noksmle8nt0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tb9fi0v8tasbfhs295jyfqs1mn07ty6b84f4bis4301a8jj85kl9r7scjqen1e81uecwefg2878rqxaakpusuq4o5tdm8p5z4c8qfcsc7smzg5g7xmfkpdlh3ujusd6bzcc82nd5hdbbygjqqxfdp8dhf9zr2hbtyi93yb7nes4ft0rfx29yvtyrcnutdlvx03ftf8zxtmioszdr2cf98s3p3q4zhclcwl8sd5nekod8pm8s2dy5sh0d5jdw5fl'
    })
    name: string;
    
    
}
