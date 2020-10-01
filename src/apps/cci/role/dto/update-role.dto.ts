import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '868748f0-5009-43ad-b304-a067b09d79bc'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '315fecba-e580-4736-993a-142d44ac0206'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vbtbpvg9dj4pg2a14vfqcfxdnwo8g7gcnjulhiqokrjh7bixxz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'n7sg07qdoihyzi8en05xjuvd5vc1pzz1442swd04np6eofh3qttg58g1mzjlddvrjixtm5y8mus9mycl05jmxuphapkkr8830n3vgbiv31316m8ra4y3cqnmsm7hdmq8un6xwee9azdpfcb0zrygprctjhay2v0o95i6v17vm97vpotrn3dlzbm9l1c8pt9r8ouzehbztgkcj313oqk85ql3txj061gbxktf6j68777ikysenhjclhc3ly1vlov'
    })
    name: string;
    
    
}
