import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '060fded3-7730-49d9-be73-7c0076f39471'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : 'e237907a-6d33-4f0e-b77a-103d6bff5a35'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Et a ratione quam tempora saepe et quisquam. Hic quas voluptas inventore. Quod numquam voluptates aut est cupiditate. Eum explicabo magnam at suscipit. Id tenetur tempore mollitia quod consequuntur quasi sed aut.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'wn10jtytcnkj8ua4zvbczrsp0c1q00nkslmejrxkirmmgqr79h8sfmzomeo807yxzr2vi2w1kawtfyl7ujwp8kbrvw3wkbf2nxqof7wn0oh42nyn769cvnsbpznmx6pr9gy8owcfroqbt5q3g9xvn2r8zgvil6pbaw2a04xrzmh6tigu1cvboe2byah2lcz3taa4r4jh4mbwqff34j8588zmgjwm2srhgwmoxnixi30umwz7o5tux2opf67npbs'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiresAt [input here api field description]',
        example     : 9757607135
    })
    expiresAt: number;
    
    
}
