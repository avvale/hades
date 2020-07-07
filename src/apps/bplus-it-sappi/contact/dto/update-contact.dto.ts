import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
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
        example     : 'olltkrlvuijph9l2f6ru'
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
        example     : 'pms0btd9jq5rb8vytjt3qnq2tfuyac6f2zrdzcyinh52nkzmbhewhbm4dw2u7kmrviywfarxmwx58cdq4ce8tum0escsm4k5gbh0z1ph1kgdooen8x7iu9s8n5zcvmflvmns0k4z8je5wq0q3wjnrl5mwy5dc4oa8s4a2mgrdue65l2s4lldetzpg5lnksz7p3n0tltoovvhxsw5u4h1oh8k38wx84k65p36f476mvj5zsraofe1kpiqkgzxhvc'
    })
    roleName: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tlhlqqt5tdn1hjgqbgb24fwe3fct6c8n1l6dl019l8h4lyq7mwsrk39flof6eawbek2f5omj4g0m1clzwoqkufse8a8mb3ao899rm2adqxbkxhzda04x2v01iarq5a4chg2ydjzpz09418pavaz9jtdk2x8z846f97ubozd64vc82jzj9s0r7urx4gghkine601bxgsuitl50hnkmdjlbprz4slsh50a9bp447d3ir0izzo8x7cq14oqfc11j5t'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '8dyiddfabm5igrm0vnexul27o1g5ankgl9kw8gm0lqsl6pd8xknc1ksq5wrv5iiik9xqr7dfii34h4t06pthj62odl6kmeao8qmioc883f3juboc1pzq7wdvlq0fcqlmwq9z3hcdf5sduwdt4stv0nwy313tjji9s2l3nm3mtkh2bl7awxv4j8l3kgtzfjo9dch89qj8nlmt36ahrgoydt3nopx3jlqm7ejb1bgj6ewh9fzikktis0cls2x70gj'
    })
    surname: string;
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '21563yvoklvx2234jn2pw0a5lmn70ev5e0vz6q8ny1ovr4d5p80y41i9m6f628utyol7soqq2cky9we6e681ac9az9cjm4bhmn028tgzy2x4ctu9bwzq9bem'
    })
    email: string;
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'i3kq6nayy4xhoy73kfxinxsgx46u0zphbyez7gjdfe9ka8z0foyy2p5yc6rs'
    })
    mobile: string;
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '9fo43ms7ypk4n46juf9nyzni52gdjkko8dftktcpsnrkltt298f7xmnzvr3ow5jc4l2wzmr8oxn7kjof26t1pxci1e52055nseod19zfx0bvx7510acpjr8t7vt67vv1qy7i2sv4jn0ge0xsce3c5njjq20uwnx8zebodno3heji49ht87rnizc2jsaafcizdxau7ceia43nqc1cupfwbiuv0jht4otlr6x0ehdgtz6zv4x7w794syqbmgsgfn0'
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
