import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f7535896-33dd-443d-8c67-ebad67c40cc3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1bfe9550-9bec-48a0-973b-027e1c28664d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jk9lj52dy97xrimmfhc89elizl9ihfuikyiry6tvh2mp3qvz1k'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd55f9b87-8235-4db1-8fee-6478dd366ca2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gk6q9qdbx046u1ilku51'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'sp8ne03qtzcg6n5clsfy'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'pofp45v3q2xvgvdi66zqpotxmnmn8yzb1bko6srmn7hjey3n0qsc8xhivyd9'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '5fpled1p3up3xqxag9t1bmujt2l5ybpx2bcni1mgzl6sbrfspm1qx7p3gexoe21evep8s2d6cwbsiiaj5k0u93m2hewefzrc2hts0730hazqokyfbi44xmj5l93htthtx5go50st9n0emc343z8kvt9qw608zjju'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ocpfacactefn8upzwc4lxtrybhxkvl1vf4hm2jxbi6x397uk0a0yihwogfsow9im3fkh2atjm0afguz20gki2keuwabc8vw1ddy7avomrz65ptsve69ue995u9m56ooupffvourgdbx24t4ms4hfaga04toiik7e'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 't6wyctf04euigjb0cvz5adkej7b6f2jlwdsg9ii11vjb3fsk3a5zju537zux74160q2j78lsb3uko92rvgb6thdq320so44wa193sl11f2d2na7tg0qbgebhb3s1ah2txqa03atvjokdnsrhwzjguixjoff17oaz'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '7783j0r4n40vou68lvchw8qoqz9tvl2jijjwmggs752wclb0b0x3r8drjd7bra6kz5fc4iygg1do7bky5wkwner2w40ix0qywdg2srxx124bj9ocw7yf0fkovyitqc7vbvvgrzckk3tyy1sitz8lfz3tq2we73t7'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'jhq300ubamy885vj090xmolzdl446kg6qz78jx266fbkvog7134a97r6ztj3w5yv3zqjmhqxf8qhl6ee04sqgqe3scfcp5f7fzixkeu8b8grfg19dnslpajlxejunhryzddzzmvnyhd8m3zq6dymu9y7cl7a8nab'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'ijkunioayz0c60qmt3qb'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'kiwkgbqic7h75oqttqdu'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 07:50:34'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'jpk593no7mabylg9znoclfcmjsuryn4nqztviq294gupq04xptiknj2x12b8c5tfalnxi60h83184ph9t8g6qafb4q84xanfcbbz4dwe1e9ledp90mnpn4fxdpd6tnwcvf64489wqqt23l970ahep6187wzb2fph86gi3ndd7i6mqnlyw2h4wb4e1kym5b6gmiama3ozxat3xhwcod0pwajat77fgugjlln2rkgphmrduir2s8wkua8hj0ydv7v'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'x9m4e8glbivxk4gr5xu8mbqes3g44q52h8la3zlqcjguimuh94wvmjad9m5d0ocyf6sad9ozzenmg5d9weazftrf84rzs5emobb5bps9a29ib6l5d5r5dr0xfjigc70p5ytir5wqmxa9pqgh14txbrmunfej4vulc6l0mfn1fdj2ttoa5lgwdktvn6zy7e8j95v0g9nfyatdvp12f60iwye6ehi82lhtiwe2aostiabd4a8otlh5fosrzlwuqj9'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'obijconcfa5nhdy1bay83z4x5soqahr2n7glk33xbh5lhqrmyvrlpj9vw1zu'
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
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
