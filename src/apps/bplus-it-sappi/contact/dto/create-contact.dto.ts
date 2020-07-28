import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'af06e73a-a913-4312-868b-9aefef33dc29'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b741d8e2-973c-4e89-88c3-ada737c839ca'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'zp1mb3c705l93xqzv2gd00cs74gu1cll6xwm4blz7xi3e7oixf'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '083426f0-6fac-44f3-8805-43894eab80e1'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'r96gohn7l0eheq2kvluf'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '360a5cd6-ab91-40df-a0ea-9a99a91260f5'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 't2xcahwvichy4wbiw5kjmtzhkdt2gvygm4k9hzbit2e8l977qgwa2dn8ud0umhmollksh0qhgobmier6z0x4vof0vpglf37f71993smn81i8kjeplth695h3kkjmvl6cy06bs1ci53u88niuog6ylw10t57bew68myypw7grv4gepxue4ryvj3sbjrsj38fpgsjar0vi2lfg85r2j62uoyl9kvxn572ud2hriftwaubbag6irbsvadhk9tp08c2'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1ovc8s74ushr8xhap9d3ua6ejrds65ts7hd7emb338y29qm5gdankau6ui723b5yavtatmd22s0ec1hk9tfl974rzjp47mm9b3mfdmjga0135vo28yrnaqrvovzxb8hjdr9i16iyu3buj3k0svhphmpd8rch889yyjk4z0b3b6rehks1zo7xuo6aekkdceqrgc3rjf6hbm7w2ms3q8yp6ej114y4ia9wd2ng39iz80pphbjkinc6puay20h4mgi'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'yvaqnrncvcr2dopo55mtyphmdzctvi7k8jrvtilihtg95tul0v8z92p2si87in4dyv4p2hrwavtl06j4r92cfhi9p1ycz0xa01mhl88up65xjtn8l8ugl409vdy8xhxfk55fcpohw0dpo32d3p2fzg74nxn3isfm8aqsykrjg4buzpon9v6p72muw99c0k9oa8r0hnd2e02im4577dpqj8062rs60dn3w1n0olyaq0oluibvcir5eoma90u7pg5'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'mvrfo4evp8kwyseu1av3dvxemitw9nmqf10r7ys5h5ggpr9w587kwhe1pyj677vwxmw59u4oyhor3lwl6i7l1kiu26zxd2t2atyjxc9thzka6f8jtqaju78z'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'xa9bo413900ulo5yvgpcpzprxkeah6ajr3ak3rtrl5lkrgzwap2tneh5tphn'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'j0xhhxhj8rgbz15suj4ahg9b4c6mpn8qe1o5t34ko9t8j1w0wq9h6ip9risamh5xr7gw3h496f8wii88tj6lqu4jvcrsu7paq9dqdpzlu9pq76zbsbezb8lz68ljz2u1739qsjj7xozdbg8u4mb4e5345kjt45tpyqoaug621nlu67ernahs6nq02k7w9zyj004q8eft781yuu400gnil1ipyuxsdfcfpuwlo8p182au04louhzoxa9iorh5evi'
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
