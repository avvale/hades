import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6b05d4c4-bbb6-408f-b640-dcc5e2939960'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'nndettwfepxoeafobb1c0tzj98kt34dtwfdallji'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f47af28d-aad2-4336-9207-0a6b77e9bfdb'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'pklpxwsx1qv20fy7yhcytewdztbmhpkl3bc6lb1wg69hk0yogm'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8db51b8b-b745-4e7e-aebb-80bb967a02f1'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4d951rctkvp6ueudebbz'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ik2solejeedi5fung45o'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '91r2bdzjnrdkp2rxsqeij4q3sown4cmd204vhfdzy5idax1jqrw9zm2xqn6n'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '4lwcqarl8lgg7syqn1b2j11705hdadq4e08f5sb6sbypx3sdlspf6bvxhtu3dc0k8moiupatxhoovg324z7v2tuct48p39fzu7jilim70o73yrwnpb4n0p63z1tbu21h4b9h1gsi84532n6pwrxg0xwkb8viqoe0'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ts3ffczv2zs4a4sub0bulysqjer9k4tzhw7zqezk3ebm1ofr3vqp5xta11cy5t01fkttrduu8sc2okt9r48wkcs1fyd7uzyekolgzkk09f7jkzh74vh3vmbopws8bapxmtx2m269tvgep2gpziwmceau94pre27q'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'j073hn18het27ir7i23hljdqcwoallqrfgah913y0555du6jyyxy11kgbvrgeouaep7bgl8tpgs16dkxpz7kvmpljfpythusqf4ucl83jmou24c4iyo0jpk7xkbce29yug8n73r8t9en8idqk4tro7xt2fqkzqk2'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'iu7hs17h6ofo5b8dozkmce9f9i0mm6cf9s8ngitwh3jxi5ow9lp6m7qv21gge2ptkdgl7qq9etny1hqnkgoz64mlfnf2fzck4kvj2mp78551v9nxag5iibarhqhtjr3lwerlr349y45eybb1g7hkjxy8mu5ib37o'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'qxp01c8yc9tyypksa56gzr1iyom2ntih2v2td2lupnwmz77xhuf6br06w6tj0grp6tz72n3l0iqhkwyoviirym9gqbwimsa9hqemar2o6sqc1d1xz7ywfxbr3c3huzaux816d51xbi9a69o4tztm100vrax013hx'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'obqy97j27eewtrzylezt'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'ukyz8dzw9qas0oifg7mj'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 00:43:15'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'oyyrgarok5g8m21vnh8w9vh2j0s5hjxmrhhjs8nagepiu1boxwpr3ewvs0qqji2rp196cq6ys9wh1og0mp3z5v6cbka3xlncbqbvufwfy3wgu18037n7h6uim1i9lfxrp4fyo4brlqqp4uwy8n94079pu6gcggeqs3o0db3iwn5rt8zo77bcgrsaxt3nt1yn5k5x4nu3bjqsgeieu779kps8arbqmbpmc3kzu9cytnvj4nghvr9cx3t895mynvw'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'zq3738hyxtxq1zw51xrdz2rw2pe6qzcrogvn364a5hwn2uhioxp3li2dqtgj7xy53aridu32fac4el81sjc2crvf2e1s19lo37mt6whzulwrrktjpvvqezg16yzqzolg3m2a3ynpjc07iwz9pqpukyf35c0sk3ay4875a6gllqvztyomd4bfcsdw2qfra2h0jwrvhntjmahpa3341exmprb2o9udivt53qxr8qvxesebtcyhycei4a0ht84rx6y'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'ifyxwoqloc3vpegdhzo4femwwf4mgxbw1xoe29dy4vt8pgb9vt9oaj2psy3o'
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
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '818b53b1-d946-45c3-9006-1bf5decd917b'
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
        example     : '2020-08-03 18:23:56'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 17:39:20'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 10:03:56'
    })
    deletedAt: string;
    
    
}
