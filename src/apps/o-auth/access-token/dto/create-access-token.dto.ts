import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '68b8a401-923b-43c9-be91-63c250376975'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '215e45fb-6b16-4fbe-9deb-5ce1a73ca00c'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Est quasi aspernatur perspiciatis quis. Molestiae et porro non nostrum molestiae commodi est voluptatum omnis. Voluptas ut sed consequatur eius. Quos eveniet perferendis. Aut rem pariatur in qui. Et necessitatibus qui non eum non repellendus nihil impedit nihil.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2xfpp0dhmfvn89j7ng5uetvxz2dlsn86niquw5qk2tuqiwmckg6rlccqkm2q42r51v9cbpy1jpqezuxa2f6z7vayklz4kqdqnpvup5zruzsgdprtkkih2pi8ckjriycaoa025ptm7itidwk8hmoee1e5prsgtfyac37nd8y35ikkdaag7djbizmt44osp2t2qfnw7049bmt5s9gm6bpxspzahzbxsqkihx7cf3cllhi35j71u33vokkats97hny'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-19 13:03:03'
    })
    expiresAt: string;
    
    
}
