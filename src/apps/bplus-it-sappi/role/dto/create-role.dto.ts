import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6f22b4b1-1899-4f82-8717-fafe9a72032b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9dedd47c-1e9b-4b60-ad3b-6c93b5ed9a9f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'n4a13uvr0851maj1i0za0vhw8ryjlergcdahf7pniunlukvd1g'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2b17sxqpt4x2w7eu0z0c3xk7g4feqexj5pz28jiz9nge2u1pi7lziucojpvevnf61gl4att0rceu1ob0atu7ua7urb7tbplw7efq31rjefpo4lrworakz4qc1bh0lnquj59ufgz6hynxohaxaezhh1nz15ic6pr7tm6bg6c29uqkv3c9ynfsqtsw6hiqikputk5s1rulneoaj0wtcdgdw1yvy501hixx6hxeislj2ngk87x62j89o1cbj5ct260'
    })
    name: string;
    
    
}
