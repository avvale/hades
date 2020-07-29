import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e2ed561e-a846-4579-a079-859eb7083e8a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'p2p35slzekc7684vfwuo7hlquqokyfnbstrndijzvkt7q223ff'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1addf02c-db2e-42ae-9206-9f7f562cdd3a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'cepem3d0s0t1c28yjhey'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '5f65d68f-3728-45b5-a879-076e92098219'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'ppmb8xflw108gp5eua8dpb52wd7hm68vzmp94t3syp144yfzboveazsnmvmx4n6em5763l4zvwfy2yfoalyxclm5gjc0mj161jpeq3hehl42nx95chlzgte22nwy3nntmy3dbhip7xfxk2s46ozyrgg8k81xs36y75ovekzp7njhhtd42fvrek3b4xiigcccm0njyoebdevr61p6rfdq5cv12cg4hqnqrq53dspcdeodtdni96yykaipjgzqs9y'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tvk3kl4l0sr3l5d5fusykc3ipny0z6iuhfvbcm080avh6kdxdmohcl7kwss224yq5n09e6ak3rto68po8lj39nsavdmtj7vzzn1csjzqrsfv1iv3451hwlki9zbwpb30qtp2r3gkj8xr1q2mbcbyg9omepajh1h4nhvu9q3nslxbwdwfqbaahq3day2k8z46x0qf5bo2lzj9r5et15wtmofctxi6xvpug8it8bfrkdmvm49o9m72tlo32s6j9ts'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'lx27fabktbj6w4nbs65kz40n8sqqyq7erqw743tvqpho5bklwtkjwo65ycyc2j5o9f3v2sqiqrqomr8ofas7tgrj0drr4jzvvsc6xgajt5q1cv7bswmtwui30qbz1quzqe42qs49e9jfmccnjrzv6b0t6ckqw01esvh7eb5v5dt59g02xogolu5bryjpvyb45nskjeeyacse841rob7rvvznfdqyy59bfizlzl0u2okkteoc0izaozoaiawzs8a'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'tbv0o1rg5n2sz2l6idz5ue4z0mbk2pqx4dfrhv2ol0hzg0c3e9q1itambpv3ungm3nrzzu0jueyvfdzdf2h1zbsuukzjmujrbplxy24gn3abmowwkd0z373k'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'v1t5h5lsive6b7lfa5vk7a0xwrw3g0sj9tcj5xg80fkwla9ojaxm8tyipnmj'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '180295y6acevg4nwrvdm0m98rl341hvv74s54tstmwgotcmji5e8r2f0yqdlhvf06x1udkx8f1qe7djrevrrngzvswaq40wmhfilq6ystw78axt5f6yvcpuig058lqec9ahqr89xgesuz3ob9zyzzbicowaenm2e87j2kjg8l1zzpqvecuylike6kecras4r06p6gkkdc074cg27cj15hgmquenbxk46s1ep6d3g1rar6jkoahf8ps7u7rdcf92'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : false
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
