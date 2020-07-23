import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f81822f8-1b02-48c7-904a-5b6065e948da'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '68b6f949-4079-442b-b6a3-e1dee017c9e4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'uah0lxd3ewill1yv2q09dx48cwo8r58exblyc7fiiz97jemz8e'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2eaed4f5-6368-4be0-8502-748a2eb4c853'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '0nml2vs0tfdy3ld7cu9s'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'e6p427h68yb6kn3jw6lugm5ysj5h2cou8z9ui37ejiojp2m9bk5uj6isgahi'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8fea31d0-e7fc-4b34-a633-2babb168114d'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-23 05:11:54'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-23 11:27:46'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 13:20:47'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '9ffd3ec1-ad51-4e28-be31-d94d80a15728'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'gfhlhj8bcr9ytbefjdzm2laahjp27z2jr8v3hb4ow4uu89b8sqhhijfgsa55ai8ioov6gyyu84f147m89giyae99dv8rktyyaabdo11ots1cogzn0hrrmlvewf5fujxut2md0770oxt4q2nli9fys29yyjg9uxqh'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'uie3tnuh6dqmn58x3vzrn232dfgp49omb9rn4nibti0z3g9fxihk85s5a0xu77ht7zc7l4a5ycotlve3jwjn1hkxnhbh4m7ftd9aom9xltu5033ceg9pyznm5by7tra3by27v5d37ebygt1zgwndqyvk9g8iqha7'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'mb8b5ru2y8f6mw9u2vw0iw0w7v4zh6ndu09o474m2qy99edx5p6yw7wi572s27jec1mapyr36khdqbgqysap5goe6wfcdqchn148tz3jrncmbhcosimzn6tgmvxupzt58974npdy896wwhd34rmhusu6b2zsmmo4'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'z206d6s8zhx8ehsdxuq1xn48oramr8myuknb0z66d3f9fsfsnr8rs3zlxtws8475liz9x7a6gh568wizqw01eu8micdckrlycmhrdovd5w44pgv7oiefm2mw35rkrbr016vu7itp913l0fk9bxe927bjq4k8q6q4'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Molestiae maxime atque explicabo id sapiente qui. Qui ex et. Officiis tenetur porro sed ut sed. Provident nisi cumque eveniet molestias repudiandae sed est voluptatem voluptates.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '1ulkbkon3cvg36wlajece99vt7oom5vlys6891lx2vmmpg4yjow1eso71nm37saxs52640672pdq2h2ptzvjzoyalwxmwmxc9uwdw7m4cazph3c1uevrmt4w8cvz5ujpxp263bv7o7xp0x6bv1qe3brc1fap4mq1'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-23 00:05:34'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'INBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : '1ehvkpcag1lafxm7eo6ui0cg8ttak0txe95xg07dpnt9xikldtf1125czwro8btc7dsorxqozpj4bnzbrp2y2o1cvw1taji1irr3zp20kisebh1ptkcph5ilf5ax8uteo3ahft7tmgnffb0e1zxyp7l199hq8lkq'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'o3w2tu0p1zult6btcc22'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 274993
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 7047607958
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '0l4ysina5if2vbg513ip'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'mwjmgxignjikt2l07luz'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'uegiumdhnlhpqgomi62zwlyjp9oy36gfbod2o3gqbskvrh7fq5zz3tiqtcd04mvk05mjedfi8bin8f346v4n5dx3hl2ssy7x6gac89vn8r18hcmcvfdwy9ov2s4275n9gp30esf00pbjcpkad01q2e3fkmfpbywy'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'fgdom955pds28u30fcwjbjvhxvkjftjq2urp373axqyhjqcf55q6lvn6nvy7ghwshisqepriwnbsklr6bk800bpr526c4862bu1inn9od1itjy7aenl31d8gxvl2km7c0vdwfgr3we3n8nab2ezcagzd1jzz7dfz'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'yt155972iy3i2vocrl6oqm3uzgc2g3td8fw6txa4yi2ey00jird3pcf7yqrnk87ev64u0r0hl0i4jcf17s411how5yt84rjfe7tsq20u1mua9ksgut4ktwwm6i8hqtweyxpoqxplsdeqswiemuihkkv6unxfyfoq'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '95l6m150ggpan6w30jts3bza9cdsb8xjviq7811y6bp6nil08btk7weheg23zokutphcthq73i4c3va3lq2izvdably7m7ua8petgvgrl6nyrg1r68xxhcbaull9h2l2sshawadl5x26tqbyfz8ae3bsctpoc6od'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 8462510893
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 6290332123
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 8370921276
    })
    timesFailed: number;
    
    
}
