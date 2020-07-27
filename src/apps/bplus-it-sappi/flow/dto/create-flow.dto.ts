import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4867cd6e-c455-45b4-930d-ad6eb256d8a1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '4fac95361zll66yk09ijnqm4q7eo8ooyng8svwkjbai6bpkit5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '485fc9f4-8687-4102-8431-b9d71015d8be'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hdqbfwmnfrcrxcmemft9'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'awvx3x6agqfkarqtdcbb'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '4ejc102yv3p7hsfmxc3i446l5dup30cs146bobdmjm6ur75hml2z7lufvafo'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '0ammkzjhlyr0hm4la5ibnoizfzix0yndni62rg706w23w4deamhrzavpi7k1gxfr3x7m03tci3b1bfxiffl9bma4ve1zvjl4lrse6j5te40nf9g0496ccw7lcba0d1b40cx9c7wd8h4aiyehn7k87labb7sv4vnw'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'r69y3qzzic2iuwm8w3iff8eu8krax2p3fn3vq4nl43xxk7dh8y11209fgsyk0aj0via2zbnh4pm13wn2jc4nbm5wa4pzgd2a4j30wte2lhn1d3xwkhiwapvkwrre9uyc0ie35oa78e57092i6rm4dfdblt70vzkn'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'l3k0huxmaicsl19ruxfw8ksw6xeqxsnsqobms1qqh94kkxjx9sf5h3mkh4mjkjxkzqh9687vbivn21al21s3e300ns6d5e4926x5t7cibu5zhjk4uno3k1khxu9olr8m16q7qb3mlx0zu0jspohdyhbowiaszt47'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '6fl3pi7zj7gsoxuq0db0jw1v419939dqcs0cg0vq93nwyddqhdwmdwjfuorqxb8ahvkzvk3tuteafcpqfd6uqbazdty8mi7yxi3m22hk0awes8d7o760yd7u4cckcxgqe5k9htu7lmrr8kfjzdmkma2hvbo05o06'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'bkqe90jme8tf8btvklefjlpbxxzojd6k7mc5ranz8lxuj58a3j6g9f6cpww5yhkb7w9f6g28yjfrieaepnso2edckzsnd2mwa5dcz2asg9527h3jy3ueds01ocyln40z3sg7idyo4bh6ltd06aqxhgqn9n1cpisy'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'yi0ygthcvbc6qbxulw8a'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'mydmipsh0cc5f7w1d4gr'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 13:47:20'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'ygdu63ornyfixexs08ccahk0mrb984np80qcnqyde3wwd0t235x3ky7u7s6q6vjuum321gg8h53l03n4ge38hbm5kkvy1n4bgchpj1c91ayj350z13c0gbzl8macwri7aselw6ox056b1x6x0v6q9la36knltgmadz0opli8bcri4ysoqj84lgy8atfi9ufvhmxj0ysdm473gbz8jawpiq5z4va0br0wu4kp9wjyvokx4vqj9lz396xktlrh9xm'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '82455do499p51y5q23gfpgg2eanj6u6ico9bva2umltyzol2xnsn6h2y5teakzgrg04fcuped0knpts2dalflrqcpce49lv5aq2gsvw7crf0m5kpeflus9pyn7qhrfllzzn2vi69kqdv4yt3o7hngj9paluyniymcoot5kxykxkyr4sau2kedgdad0570nneiywhbaommvtjr2p8hj6nqu2hi8o25keho4i612fe71v94hwkznolhfa4jk2v3uw'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '0kdy2x7fjcbc173o1z7ty0n5rlutmo1e8vrlgkt09ar38yberusrm9brlar5'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true
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
        example     : 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
