import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '04c09944-d525-41dd-ab5b-11b7e2fb184d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '741590e0-20a2-400e-afbc-c02fa05e8e2d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'r71lx91i7bzrx3zwwyffotqq3fr8wydj8y25bdk04byr2ioleu'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'zhj3qa8og7rlnw7iy7j2'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5e8d8cc3-d973-4074-953b-8eb40d3ec026'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'p92sn1iwqw9tv4kp72s9'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'or53zib0pu06w1jw3898o5a4x7z721rcp183bnjwiune4w4qb5wgvmnrff80'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'j16oudqckw9p32i510dpa29mlk4hvd3b4082k1nexbekhhytqist2jiwa40tt2hfrn50oqmz85rcb02arjs5pdwanjzttm9x56av5ob9s1150thnkbxnmbt9vgaj45o5690o410kdgktr4s6k5q8plukisedc8py'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'yk3sj5h4c6lwp6nz8oq87mku8feo48bnc3npo1awk9qkb3ue36iwltg16ytp2lkqubsj0zyqgutyfzwf4l4bb5qee39zywjhr14kc43ysorhs4nddxh0nypt1kd8ivaxok4rtry7fwdvbgulmwntrguqhvvcv3w3'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'ey5uyxzm8cy4vf47vio0a74zq33yn2a7fqlnyouis97vk36vxxycwk8meuzve39sz23tocmosed9t1bxkm97f0bszoj73fd56i20n41wov73smmz8mi71yw30p04p8ezilgwyyr1rfmthyv0uixi7hs3mq8i8v33'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'giozjv0s3c2ezymcihl9oph8nvxxsirfwr9vj7n9b0j8fkwarfnqwgfhypxi679riyu2f956h8oil0lheid3p3qf180dcd3ogu2eia2zgs2bvop9nuykeveusvvkjiwhyujl60g67xa5kxurvjd7etynd7w7ofk1'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '2siofthqd6m2d5v8vd1hcxn1hz1id8gpsl6k8s1t9sfn5j13dmvcvvmujvku5mhtuxckhcihn5sog84nzxhdp2m2hvom87at8nxeiwymuy0jee62xt7mvlcw2y8y9c1via3tgz5smwikkwwdhlroankcnqcqov5m'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'b48ygq1cojyf8u9wehv9'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'kyxjnullt76bv4o7lb6o'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 06:12:56'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '406qp630a3en75gl78lxrhz64ew13k5dh8h4xsbssmt085ghe415s9xjcgex4urd98ekzdyd8tiixedaa1t1a1faiteq9fvhuvr3am9vmoi7cd3x3lgo6ypdt2kukpstlz49f5l2n27cvnqhwk26ec0v3bxs8g88e2zvdov56jx4y63xkeulieam3mv2y6hegxuzljil3b1riop12ya8vgk43xeyo5zd8vzqooo06o3frfgngsm7761g3a5ajft'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'nc7iu9vet9zum43jki52fpoiowuf2gi65ibj2jrkypxwbkoqpcb0p7v5a0igim2khcdi6tetfztwrwjuslosytt33q5ux5bivhwzc1wjsd1gt2sg92izf2nrpet5jf34q2tq0y3pv4fsyuqc94ubhc1t9wr5bnj4b0365t9fztgo95r0dzeszwk86qjuetyymk7ah1u62imie95yr25m061gnqx1a8t0ed60fkc2du2ps98w8avlkgtbbsnkbe5'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'jnn9w7rew5ws2cx2oj0869x3w5hh781n5dywk1jxnynb3ucana533gmilj5a'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : false
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '0e445eba-8f2c-4e3c-9a7f-dd83dc09e029'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 03:39:08'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-26 22:48:36'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-26 21:49:12'
    })
    deletedAt: string;
    
    
}
