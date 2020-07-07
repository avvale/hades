import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f0150f22-5d78-44ef-9051-af1f0e215b0a'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '121df1c1-08f1-42c0-bae4-4221ac7625aa'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8c0ttn5c7sygoga1oaz8'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '0db2de56-02b0-4e93-9015-bebd4285b8ea'
    })
    roleId: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '0047vbk3uygo43gre0spx0we26rmo0bczoor6w46dqk8i0vvjxrjwvexq6benpy4vhep9cu8a2k0wjsl7j3j4tj8sidl5bznjpkekeetfugqy6z8n6ui0cifj4cbl411zcfs059var8ey2p8jegkmrca76peq3tciypx06kjexj5b49gc4grs7xfvxkzdmzyiko1wqj9819e545t5crpfyuig9ck5j0u11tw0gdi43c5rbdx9f1i5t73wdh2m6m'
    })
    roleName: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7nfvkn46yqg7olyvu3clg54iuy0ymy72sbhktd57vtvvjqfm91cplor8as5his6ae6mii9pcbpxnzki9sdwevxbjej0gxrpnaammodh2r8zhz5iv2pivtbflmaycvvbsxdfk1chuy1xob62neot1zj4kft3lluptf062tz15nlqxsu73r1s6bgqfkxbxkiky7zuh4e9pxlrwltvinmjia82pkl21g84aw917iqe6c41n2nibuo5cml9nv6lviij'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'hu9rwshkwwga955edwsan6asieqdqg9269ibcrl9xj8g2ndc0xe53wa3xgldtdjuuj8dyntin98qitwtm8g64vwf3j9iqevzdnhsf11j7pru94gm4moii1zrdqa4eopp96jpw8qdu5egq9yowaaagg3n887ua5aun5vt52utpxbdrpx9xpfg40zed4yup25h34bf6i81qsnjrbha7k643hx01oz56yqfai4ku0kkpzyutt9x0elmvashpmf8o52'
    })
    surname: string;
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'tyamuetynh3m73sq05v11hxifm0k6eio4du79u43507zaljs1tmlnptke113piugvf38vpsgl5s451gqe0y7p9l2b04pc22i4llj281jcf4f0x4bgczetx51'
    })
    email: string;
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '6holp9fi09ktn1d7rhls9msuuhyjh0zxavwtvo94g37zx0cumpkf7tnfpwpl'
    })
    mobile: string;
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'l9xaquv3zem4j7f873rsnuq8o9vut8imb4iqrwadexng3b62g3t73mu534v3n3fogfk289p3bc2q55qfr28zm9em6dtbueaibosh1hpewpffr14am76rol9unh2nf04rfzi0ajw65uyr26xnwkhjmo9g0znwgsyib03h5ppj4hn538i7uvijeyb8z7gnnpra3ug5pe11bt8yph06mip1j442ls5thead7zv1536ul4j3ed0v41gberd0d9k6v3m'
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
        example     : false
    })
    isActive: boolean;
    
}
