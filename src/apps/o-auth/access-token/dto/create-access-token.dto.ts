import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '56b7a133-4e47-4b8e-90c7-5e0b10355ec5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '627a36ef-faf1-4221-9c39-940293e6ab79'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Nemo nihil voluptatem amet quo quibusdam quia. Eum reprehenderit ipsum qui dolor fuga aut mollitia eius. Minus eum inventore inventore facilis doloribus illo ea quo. Soluta iusto dolorem qui et ut. Autem est optio.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6nhsdwrvzj9vgkua72sovp1vwvsw6x85uerivxfdb0qj4y5gp8670m98i6bg36emkioc7rcovn4eddgd4vbbxflrccvllyl5ci3ljfqnpu5drs52ka3zpely7nox176yg01bxfc5prdc8kuncuzs375a4ytt1j0yoknoutduvfx81f8f4fuzf6bl5lj335q43xjmfowl54y2y7m96dm5txijjpns34a4115roer82jh1h1cdqrh5zo9p555i1qy'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-20 04:57:30'
    })
    expiresAt: string;
    
    
}
