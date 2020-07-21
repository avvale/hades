import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'f57e19cf-e0a7-4976-b49e-40d4fe1f20c2'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '2186eac0-4963-4b7c-a768-4dc9c97286a4'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'bea95f09-4110-4ade-a8c8-97cede034565'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'i62oamxo7yepc6l3ljxb'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'roleId [input here api field description]',
            example     : 'f7099a6f-8b0b-44b1-bb10-e63d853c9ffd'
        })
        roleId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'roleName [input here api field description]',
            example     : '2mj65gg7o4dclkqc455xrt5kih4wf1bjsrupuf5mlxj1h6zal06w3i4vyhicrohrrkfydyweega8qh621j3tg3vx9g2szes44tlpyey3mkwfl4joc65ikzgw547rzzhj751qbj99yhr07za2lyio1otbsndx36eawf61czhcbk6ce8hrqehpytx64wzv5iygr0kg46z02om5vh4n3tx818f7n7j58utt8n6ecnczyfzmlmsyqegfjswhstfvj1a'
        })
        roleName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '25jh72fomt89555z5h9vin91zlzbx2qvtcjydzlfzo3upof8vfiay69qbp2qd1dyzos531no67usqx976ty83rw6uzbtk4r7uy9bgs9s93m6fm99trsidw0nt7ihm0a2noc4ztde8y0sklv1n63d12fhezei0hcby00jgfv3aoily8jg2vprh1q5nmpbr3pxm0s68c6dntx22f0sgz65wbkowtejl5slo90x96p2jn30p29bvpxhmeqxel6mvhu'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'surname [input here api field description]',
            example     : 'pipp3qn3ks8ck62s7m3pzabe2xy9a4mdn5p9dhuqzwwdlvvt0sv5vrd11h8jptmsm1c4fpqu363kksvldcvjudtkc279n7n5ocjh57b63g1i2et3cejk69m62e987u1bfxoz3m08jtin9oqqe3dvlp0bva4pxb251inh7ibu4emo45s56gfghi615gozxv55xd20a5nu8wiyj7dpx7eshk3c3j8luxr8aeq9g8zzt5hamn17vqrpch4bxsx6w2b'
        })
        surname: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'email [input here api field description]',
            example     : '8n4ssb5w6vxlvf34y2qtq8nxk2drnzazyohibguhufj5wuo40f854q12ah2giz61r8y9za83zp6k85u21y61mgiim8c6hmalpdzf74no3pmncigncevbm2r9'
        })
        email: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'mobile [input here api field description]',
            example     : 'da7r2cjp8a079x4tbidmo6f5689tn3j63kw0gm761yo47h1kz0srki0ugbfi'
        })
        mobile: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'area [input here api field description]',
            example     : 'w4lim3a8n7ld3qn7ki42mjlnszix5dvwdo714e7lug1n87q11zhp5b02bplsy9hbbnqq1vhvybv9jl32os12773gm71vge0var8zzqzj14hyy8id00wqb8756rzfr64nxv9pz8ywe39lzy7ptry6swu8tdb9o74893z6t843m9gd1nlha9qjl15gu1fd9h0ksjzgkablp60684ulkpv94ws65f9voxh64p0mr6njouarxx4x9zbrwlssojpafp9'
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
            example     : false
        })
        isActive: boolean;
    
    
}
