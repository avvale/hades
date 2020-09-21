import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fccc7357-a0b1-4e74-8890-825947f99c5d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '4e0fe39a-79bc-4ee9-a008-2120c9c4d2d1'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Eos voluptatum libero sint. Eos eos nostrum dignissimos sit in aut ut voluptas. Est rerum aspernatur nobis et doloremque deleniti. Itaque enim consequatur facere consequuntur corporis. Doloribus eos nesciunt et sit explicabo voluptate.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '676dol2gkzgre5nl33m3y5dtdfbrudldjg7vp0vtsclg6jjouhv0cc3cla418xcsz0z6blym7cdsp1rhgkaq7q8s6wzvimjddfd9g9wvhykgaovi095rtvyirz97g599hjf9d3ut121nkd9jdcuolm34xp3kw82i7dgczpqwgqsnbmfv0x3luw0vkyhfyxtqxpcpjespl5cl1j9gbszc2b0twpw964wqmcv1c1i60vujmzemqrd4wi0ug22r8mc'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiresAt [input here api field description]',
        example     : 4131945578
    })
    expiresAt: number;
    
    
}
