import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
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
        example     : 'kdd9bfa7z4fwiw3kh4gzwpmlh5722zikeao3e5r5rtevh69sdy'
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
        example     : 'iyqa6hg10pfkh6a9iq5h'
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
        example     : '65ur78v2ry1sl03wbmpz60cj4gwcv5sgyq28wv2d3zmwnfyxrupflfow3gez1zt52a5eeb2842samaram0q41o9vqclzzawe0jsu59lkbrw02lgqrg9qlp0hbt87soi3ay0ybb215k49zppd275dw9upsn1jl33pydp833pnpw6fxu4h9g7dt31kfgwl6z110kh30x39vgc1azwja1eo7roznfl78cj83dg3dk2kofctuh9d0ocv7lcpfnbvebr'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ip56f46mgc0z41b8yue5f7oysh2uhy06ozusjh43cjgpm2ac9hmno9z1w2cafkt5jx7buwohaqoz9nwhk74ct7zqub44r93ahap6g0viuy0xqxmylu1brzq75rpl8irvefihzfbzcqwia9bmlj5a0ic87uk87hd2oat2jymo8vyhlu7vyvypkvod2ulp0259qvpbfbfibjj6y6x0qjwty26hntrjcxbkhjqwbgs0nzpe5xgq53upvxfnbcvn123'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'erzma0wl0dz7kctikmrfy6e5fqqsauhm30fz81s6pi7ier4ehbcojeksfh2aq7knpj3j8gzdg7hbgi6ra5i8c6kby53xb8kywwgjaenoc1af7z2z1trfucoxlt3icfj6vshjblh900qv3w4qtds79u5ihjuxbfinlovsk8s48kpp3z413d4qd5bpw39vqe7k1u87fox6v3n8elnuhqo9345pgk06q7agcyapk127obpn8ln3q487ijndcmobvr0'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'n1s9crox8tjttsy1967wrqc1vc8bqlqnx3heyjaugpv29b45yce1erkq7eczfqnbkepn91a7f5meeukq8i74eg1n5ti2wwufhekkgdo24soufukvet731wpu'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '05mdcknl3v4eygxgesfzwilbmu4eeo933oa98oaguvzsekz3ukcsrjd8jre3'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '2u2rjqc1vgfa3peayqp5qn3lu39aux4qv46lywdxj97k5q12n30wh3n7098n2wbn88evxl8hg7x8h0gygt9pm355sn0owgks7rwb2yiv1eqoyxfdcfj6meb0r2aysk87pj08gfpjso93v74ueice2f6she1sqlucw5tmmb3xwn3rk4d03lg3cvtfeu491id3viw5aov60znctc1nt5af1b7oh61den4qrp3vr48x1ixczbpiuhohex66x4nhvli'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 23:13:52'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 18:35:29'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 07:12:04'
    })
    deletedAt: string;
    
    
}
