import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
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
        example     : 'v6wg2pe10t86w9jxyi63134jxxxt3ddd341wo5i9emxesffbw2'
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
        example     : '7j641mwcs2ez2mmuewz1'
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
        example     : '755t2gabts7vs92hl7j9w3afvy6d1h901dwismip0m631szvnt2rjhdcua1oetx599byjdymnazpsb8jojz274xeganw5qwlo38bom0495x5gd4elz6if1uzustwdvcw9h3m8pyt8rltic4dgunrst2hvfe5etk21sxpukb9tdgbmj3xhbjor0031jpurd1zqw86kveqxyi03u8axlr1g6u5d485qqzotbycivmdh62bvuw9aiat6eqi2pkz66s'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'f2j6f3rkak28t08ye6u1f7mfezt8wkvhhgfhig0usanp0iyrjikskcumc0cnayk2yo49zlsx6mrwavvm7sxma5drk7j31sleuogwmadnunkhklhcuq6hni83ztca1ctz3nmd4kixivwp74k5z8cmee8nm0kjmi7ns6eshx2ludd16ds21psv5oiy3u7iefacotdfsohl0g58sr0oefkffv8p182id3he11pjsx5r49729ozhc7um2qo46mv6dfk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'cn8189ymyyis3j6yhvptusd2il4mq8o05g1rgdan7g3mxviwc7a7saf5oe7y8z9s5c7bc2itp9lgjkncupl14zx1abhwidm5vb11fmhakf7bkwuzovsc6fib798vr3xnt20y9xd6pld0mtddy2mputkwlwil10y40ky4aw74bupyhvxo7s3weizohwj2x92r9021j3vdjfuz0qn43afkx12x0ssxnmheje82l118p6wkqqhclmiezi7n3ezerf5'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'd4vfx0hlumzh8xg3spdk300nl4ewmxoh5y1jptjnerlmnnv8d9xv0yxgnbse10pyvjir5dhhfgziihebzjxdxqo4k3h5lsoig22p5fgo83a4wfmlszw10veu'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'jstwbbmv136ivcjl3lccl1zna96233qdpbfhqgqtxude0evqlkaregvmex30'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'upj2skvvo1ft2kfbzgar6ugvsok62usibd9k6c3f3q7ymm09m8nqtkbppg8f2w5g0kd7nan70xllxvzeomerrw06btvqb6yvwii8lkdnwrpyc9d45iips393xvilqyu0uzgnp97k7anpi37ltv7q3toi0kg2vlcbt69yiwoz413vfsop7oznr9f4a3970tn8io89gsohqoxwoohjwkr3vg0uqvosjs44a6x8vtxcuqopteduwx8gbd3hcexuiy1'
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
        example     : true
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
