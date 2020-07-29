import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
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
        example     : 'fhulci0vhuati5p31v42l7cm6478yk6heifldme4p18l1xpno4'
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
        example     : 'pawbp446qgnxgy5c0d2l'
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
        example     : '0hcmjkzqlhc29vzhl3g7cwobdkgmvvnzflzqrxhoqzxlkxg2bznxivbopfrxmrchttbxrq0j5ozkqjh3rnuk6m0u4zer4npf3fkpilr99agmtsrxgcsh9519mbalz4nluu8x0b1gouhg90afd5yloujv2fzyf4xp8v9yauujyqhq39m7r5lghnffteh02g856i0ib1cm6o3m0sdfha87szxkm70z92y1lbr080ryqdl6jun7io7eysz7q8qer1h'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8vfvq86kypn7xmirqn09c3z3rgsihwg4b6wdskw16d7u5xaq2cy28eef3yfoqf5xczd96aoi0qo2pscuhuv1eky30m80a7n6eq7v1dhd1eet2ur2xvtjf57ghc6ut6ms518igbofb8ga0z658v7qow4idz2rf9kyuuoso29g483h8i21cwmgpu24zhryuh5encq3gjg05mbzy174hiugd3g663wgije7yvcolcinllgpljwviyzcoy2pgq88185'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'ozu232faclsfaoe3nvvx3oy8w36dlig5jmc153dsylkkyg4qzh18i6etyclbukt8maouum5xvhewnhlp5z8qp7k3z0sqrlpbsyfrw0lvnpjmz58wkl7omcfg56ropc86cytzvvb35a41llgiab0jiqifn10hsv7viay0p6y6wa7ullifkq4wws58qzi56z8lt9q0uydeqqt6lfpxfrjjyraxkvdkaob8gr9zz8ia4qj2zn1wso5pbthk5kooixn'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '6dd1x6xvpycziyn96ton9jjrrbuzkdmq7552z3ztgt7xm5n9qa33u4e40f2igaxktn788cpob6mp4zibkbf9ra50x7o1nsgbdv5zxi075s0tpl4yytqkluhe'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'pp4og9mbk2vp6t3mnluvttivt9lfax4riw731m3nh0ur9im3gi01ufe157jf'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'u6iyz0e6yunk7ksi1sutr9htjs8bzgoewr2io6wu04n8x5bomt3t48lyq32veueijm0calkg61bxlfs9m7tdwh5e7ds7vlase0dic8qzukkhjz9zkhd4mfliigfgpi3iwd0vw0scnpk2bocs9gv765ghwpmdzednw899pyihbizb56xrxbu82pnzcxx2u0tc2bzqx96djuz4pq0fj8my487wpttpoyz6t9qh3ruv2kaiheulxkzwmhrk3lrfx6h'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 04:39:45'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 20:13:37'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 01:40:03'
    })
    deletedAt: string;
    
    
}
