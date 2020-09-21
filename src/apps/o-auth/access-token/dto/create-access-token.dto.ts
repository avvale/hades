import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'aca2f62d-123c-4830-a6b8-828c4d95b661'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : 'b2cd938f-6b5a-401e-97cb-e78355e4b54c'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Et vero doloribus commodi beatae porro doloremque ea sed libero. Amet totam dolorem id. Voluptatem modi voluptatem. Vel nemo numquam repellendus nulla. Rem id quos nihil. Ut saepe atque pariatur temporibus consequatur quia et occaecati sed.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'efdol0bf2o8biemn9ekasvvktcr2zj5gp0963qv7q33vm53u6rgm9mgfs31dalqa8hxxagecrgeqe4c24l7dqied2k8vut7sgm3fcj5haumvxdgyry97c1ezin689r2qemtp9t777fea7z5ipn7nmjqy5w3rfcr1kiwnkxmcu98pzd7egz5n65s48qm1gy4xq019qdrurshxwv3z3kmkhigp81yhkdx9fm2b7os959vefk3bcawuox7x59gdwe6'
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
        example     : '2020-09-21 08:47:25'
    })
    expiresAt: string;
    
    
}
