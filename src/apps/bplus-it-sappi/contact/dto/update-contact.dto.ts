import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7229ef37-da9b-4a52-85b8-d195873c6f8d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9661d7e7-019c-41c3-bc61-44e69a44c7f4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ykmw53flet8pc2o4oxm4gmxgwya339p963smpcld6vo9md80m0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'eee9f9e7-3598-40cc-a476-0d73d877a52a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'mrctj79uz2723ycsldo2'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '977070f6-62e9-4738-a02b-df061466b504'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'tuxlk5blp82638gjgbrf3dgw4svlwnp55r63g1hzdl8nrrhr3rt4vr82l0c5c0gkc6iu4pcl303ll4z4iwzs3ub2i4fm73npznoh2vmmqf8c3cw8ft9rd35s06bpjhwdcc36zpgzcz6dov977nu2vcfng10ofbrjritlwvt31p3a1414tpi2gxmb7p0kowzfg23o746vyxoi43mqrb3s6z4cejfdjal063iotymwnn3rrvbqagosiy6xhjn8qg7'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1hntu48na954yuhjgcu09edk4uz101h7zjfzvciartaljxmnlzxbhftwyibmbbek4ivvxtjf31gvsg8e0tj9z11dvtbdspx2252etdq4hmb5i97d1b91vaamkyuwmzm0xpdldxeudleoxbgh1wk34xe1bl661geg8iazkq6p48rzsvb32zz00dwzxn6va4pgtplkvlkotw5aq4jecqlyxidshbajj20vk05ewvo4uzkspabvx055rt9o9g36ms3'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'skyfnv649hkxjolv72dkjp0z1y88q89ygm1e7qv9b0bqez9r3cmqvkd99u2b2ioe8huw2nnmgjwrrvmit5ym7367n914nhpo5frryqp3zl0h61uqquffntkm9a8l6vprsrs7tv6tc08ssz6jhofsewg3k2ylqx76fz154lupsval05idw4xq3xkg249bd615lqgjmbuc8vz8v7ljzgvgay6l04zdotv5ibaf8zyyrf6kxy7w84kcuqwjau3l6k9'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'gd1mdhtatafsd12x5j60tyhp2koke1enf5d0zsdtrgrk0t1l1w9uysbjlcgou4lgdkndo0tde4d1w2f13vhl1uwoejxi0kw01rehmsky701ktps3lq1myk1x'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'dqkpeqgoat9bml8yvdv8khlch1ecqoxxk8v8i4esyu033qoyj9ueg8oc0vkk'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'ih4r8kaw6ac7bvwzh4dbs38zh603tnyvqkrz06ap0v6r3k48y5zqyxona2m6jgvl6wdyxuumdunu4s2086r3mflsatkfcy5gtpxogr8p4asl24zoi60mfemsuq7kmdma0u4t9p5jaz3br1a9n4go7ugygrgbsed4o4uy09ntlush73xf3fub6tuiopt3wj31wfyu96q4s5hd9ih4djuhmjh92hd9qf6uu20yw263mg60zkniv0laer1hnpwqvm8'
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
