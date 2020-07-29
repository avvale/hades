import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '17a20da0-c6cb-4e2a-a625-c2790c8502bc'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6ea2c877-2cd6-4fda-b26b-d7e12d4be435'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'l2kegd39wf87461wb2tkre45lym5pzfim23stvgpo3xp2hl71g'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lnd7c0q821i00s02ot7z84xuraxm43pkthywz7ztc94zgtia1auiywsvs3oirfwu2li86vjzxsfe7y2p3sm5j37xksavtdkactbxqr9ryrw0gktrduqgucw8sel8f0yizpligmeszuesmsll69js4hgnf769i6q6kyrkeniv845cuzxp1jwugmfox8ejrxoeb7ta5yht4f6xlyx8to0qouzjxpn4zc15fr9gg868y7jn9ux40wz0kmbp3ztnxtn'
    })
    name: string;
    
    
}
