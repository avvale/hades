import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '26cd0504-1f0f-4132-a209-c0939984de3d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '6efb92e9-069c-4c46-96bf-e96c5beb0709'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '12dmv00cqn06yj54x4sewg11lmykjp8jfh1pdgg6cv2bevhr4vqc3tihjaalye2p4rh334emeyo1ht5y9gvqs7w24uisdep9ebp2a0jm3mdr2s6k6vjulvs5armt47hewm4do7cs4gqnps3jzsdea6bnowa0rjkwodtdvoqldvp4jjtopz7elx70yuf4d0smfsoxrm7f0mvcc6ln63ca9cz4nknc1mmpe6nfc29kflcui7otibsguq4ybm9b50t'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 14:43:40'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 00:54:06'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 03:54:24'
    })
    deletedAt: string;
    
    
}
