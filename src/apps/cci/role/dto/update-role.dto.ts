import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '08244bd8-bd19-48d2-afc8-22c18d1d571a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9a709050-aa31-4825-8316-e106c9d1f084'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'h18kr2808dews9c2djxrl7kv41usxqz9w0x6z5pqjqarazwf5k'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'e32bgkcqml7hhvgf2svlkcb3rzoecom7jdyagrmnetwubeaa4iivjkwpucyds3j3nwdk2t0ynso1ij6vbyvjhjtt4e5jo75gistfuphrvmwpeh3g15esbouz1fgiizuuci9getqvnzqa09ro1f8yza1r62k99qa6e7j3o7wa1rsmc0jgeuevi94wcmoz9py37aqegskzp5xnuo4n6mkum5885innltg4gpmf4pynw9xg2uu6ga12uk5louylmvd'
    })
    name: string;
    
    
}
