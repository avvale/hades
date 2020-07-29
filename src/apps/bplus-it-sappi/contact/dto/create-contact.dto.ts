import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e60c8538-c42a-4b27-8fbb-7f24537caa68'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'cc49be6d-23d7-45d8-bd32-fb29e230cfe2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'evr93eqmc6g9n6upru5flj2djge26wnn0n2t96d9sqriobo1to'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bf65679f-14bb-497a-9015-7e5b17016c69'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'cg030t9918f7gdo7odrk'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '16574f2a-6689-4135-bead-3d85d50e2c05'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'hqcgn076hsm83rdsl3h41qo3wj5q8ukg2w9edfumsyn64sr4v0paiulaouhskenzsdobol2gct7tll0rexfh9ip90krpyum26teakpbvoqwbhdlz3j5ub4f95p7z4zlpe7bxxgm3265gluksqg9riaj4gexjt9q48rcrl00dptwii8hczylwpplqkmajn0567gydfnnguihbwopy8da5a3mkj2t9yg8px0acn3ebsdusu5f4olcz2gqr1u6d17f'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hc3oczo5qx92y6jvxwkeebwgc1tt35kz0lwxtk6rue8kriugqe10nwqvh58spnzi22u1rcp5euq55ykkopm6ppehdfrn7p4yod2iw1x4ug226evm4y1jms0092jbx9zb0gt25sfk5sb1qxepxh6ttkctgljjinakencklmz70wlvvqi9i6aa369w3rngso5m59nk2spv8l8k7hgppk543iy2oqz0l9elcbzqx7tfm7qvb2ng5fe3tcdajttwhgd'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'ucftqzq7qdow5j28br9ra89kqp5q0101gxgbw1ocl23twhsx7g3uwxt3grr60hqcfzaz34m59d16lpa6xcx96fdienynrlmfcs57t5ua3a4mohio7qx72apz423us885gws2e1p22big9aa76cncqswdzsbgu0komnjwmfwdtkc93sxt6xtrii3q1abgle4ae6qfi4jbv19zdslw78m8k9vvhkr1teh3k50kmbkeh68v4g1lk9wu5pzb99xquhl'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 's78r101m3p1yeyeugycovjdc1l06lufft1xydgo36ye597mxul1ep4ilv9nd8up78m8775hlmz5wjbns5gwjgac3g8fkg9ndjwkndgk3cpeus1yaxnqimo7o'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'kkhzn5pa6staco3tdlzsz3y9xxjb9kyjt1gs82nbmqt78ybpi06hblb0bjis'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'nncbeb5wo9ecr9i4eltsgtyoqxf4l02uyp1ls60auvbeni0q68h9umrdk8xj7c4vzspnnc1364q0hgcani1h4rmxan5hmidgwjdwlnalkgd9yxofc2q2sw5pyiv7d3e0zwhhgs2zvodd8cne1bmtysvwf7iw3b1z5wg9itzayxxjpptccrs7d8osgb0j3gjacn7re20t5ppuux0lc9c5n9hz08bujvc7fg7a6tv4eyzg5zmbh96xa507bohaugd'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : false
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
