import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2035d416-8470-47b9-81bc-b04e47fb2331'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '580d0264-3741-489b-8e34-26bbd434caf1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'z4eeeeo3g1errzm4tig4flfspqjvqd0f2r7fzj01ozzsxioif3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '11386785-b7df-4a1b-9ad5-72a80d67e95c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xvfla43lmke7xrris2ru'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '30f03758-c225-422b-8bd5-d17425ca3e86'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'qcfrtg0qfmcvb50amfiiqm8izk1jjf2b83jmcvezlnbs56tgzxf62hy1u8sheh9m1glm8edbg702ev23er8nhanc2on7f2d7ztryn9l6d1pon0ejycedmk0qffaiylwwgt54yhoqvxvqmucyixn6sutrh4lyxboiz11h1qa32kuyo6dqub3y6g5aito9ftspx4qzyhvzviyhq0cdk2haeqhqsrrmsdxu405mtvmq6h6cdsoz2dd9mhf6sgqn20i'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vlo2a8kd5svl2ordeel2axe4k64tcivei6f221i6is1ldy2twqnafyalhfi8hxubpvisw0cmr77iw9eueefc34zeyko70vwdzlrnj4qki7s29cp2cro219rksgzqbcdc8fldm9bbotkugz8xe1baopxmuyvai7eev996ynk70gu1kuwkqt0waa14l34la54the7uhje5y62kopzgnr9rqv35jl6ed9n1qeazck1jg65ngfg5wd650a05ewfbtmu'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '3oekh59lq951692upxw5vicw8u5id8c6s2w2zde3i1f7zurrabamke049u7qwsc6c19gvpz3z4kx8ck2ygxmpvtrpmc3oyqja0f2ra77ldj3fnz893069llboif3hz1mvyqcp3mlx38qcww6tyzga528yw5tjnlhs601wvvi6zsj19yn6rpsh9g5opd6igfrkqtogz1vd95pb8j5cw4i61840sv9i15yuz4f9153kmewth8irve95ka32x2lhla'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'uy2v7dru20z8awfpf743dkh4cobe9lrqcr4jf5x7bx9ditw70kvsivj8ltzuo064n98vd8nzfiqr18v8hmfwxiz5y3n2f881ms8slwgggj3mbxok84altalg'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'gl00aiqvf6dv1qzqidb1im8u0xiz2hfuzn5q85rkns2mv2a5rqtolhmdy0bv'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'ore3brtvu3mh9rnec8n1d5udq5dsoc4e7rta9n385me2pw411u9ydjwtzu5dgmdoznr485q1ord1xxwrmnsc6b45wuhc671afteh72hl8i4jw8q7dt91cz4cbgumcsisk9lcqykago39tryyfk1h0a6r82bd3drywdn28bvv7vakou9blldywogmgji61zkkcl6917noodvi33na3idvc59faht2gjueayptyt44tr08ul5wwgfrdkqnrdcooy3'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-24 02:29:23'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-24 06:01:09'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-24 13:16:58'
    })
    deletedAt: string;
    
    
}
