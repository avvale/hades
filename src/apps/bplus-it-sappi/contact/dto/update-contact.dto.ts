import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'afd4f63e-b392-4b42-9fb0-4dbc917c014b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'm1cb9bp3l3hc431w6vscjxj0b9h6do4o5shui66q332u4w6rhz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '48589111-984e-4c69-8f49-fb35c30d2e43'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lr14cp0lias3eze8mabt'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'pfgby277yvjeqynlex7n1g9iqa4w3y2te0ksj9hjx9dpbqyozxzj1dgv65rf6p1cak4mu7jawrwkxx6kq0rat8pliuq7xxo0mhm05c7mhwgoxa0n3yshw5c8fdoblh1tnhvohqdr049ibmdt8on89nx9d4ztaujguwk4whmba9azcf4ugauyvan7x3rr6nzji87vdflvdnlcmp5vj0omkqy94602jqhx7ickbbyfr33ymbe1llzy5qpiz5ayg68'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'i5r0f38jm3arycnjh35havfsg7p4zsvw0z84hxitrbxv6v225b3j3xq9w1np60vqwrwocpyh8cds64m0wujym84wqcar7wzjvbxz6pxfzosqz4w1e7ab12b29xwturv3idzglz2yuqvudxzu7y8v9v6zcscnp6u8t2zevh2wjgfkth6gmt6mxoim8e02xvlyljrljvsw8mz6pcm2wc3a7baurgsfvr95qlkhfav13ktgo0y5t116s6vcidwobjy'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'gx7j4bz57g27k6d4n25zko10wwb58wjw4ra8o9dvtw7f02fqv094rxl9bo7d5uo7wwk09yy24z4kn8j28gg8plep1tj1nixb6bhro8mt1g33ta17m4y4d40d4blr0ann1w3bxsudkxlf7infrq2e9xqgxbikaapi4yvv36gv5qzokwj81ux7j6u1w5kuw31fy5lio1wwjk78d1ag1z855oym2kg422sm6eg7y5ryi9m44d6abdqmocwlob8ay89'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'sjwcyxjh5b4t91s8wxiky3wktjbxkirrykk89r2rz2n69xh51cg1xs4zgeqa1gxk7zfdyspmi64vqxuy0hyoxiddc3fdetbzo52wcmfb895dz8nkuqir2ypu'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'uoa49us84ibysao056o09xts8jvbxr2b0i1g4lbay94w24ndqjggjpo3knz9'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '8osirrt1llj2svuvonhwezw665vu888gfac48p2gcoex3a071zlo1ivaij470oqf6hlyd61w247lji3g54q2ukr67lshdlu4brksam2c2yek8l5futyxrkekbcb8bliu9ap510luoomlyom3cdh9qhp0di145x5qasv6nyclsdigtpk79oqocsgqj0zu86q9fjq0ofik0lxt5vbeje3zpoqsqgbj7bhcny483nkzriyu42t9792f52hzsmms92w'
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
        example     : true
    })
    isActive: boolean;
    
    
}
