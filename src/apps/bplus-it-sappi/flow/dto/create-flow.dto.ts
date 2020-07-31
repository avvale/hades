import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '8c5z4g2j0tkui3sw0u4ahkofdwwh93rnparcgjnp'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'uo541u5zbjn8qrg4obf21b26kl97wlz3vsqqx6xht41g0tj5vj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7ebcfeb6-6479-47f8-9051-506ae6d3872a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'k8q9uh74y03imp722r8g'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'mc1vemdn33cyg77whzq7'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'y3qrlofj0ul5pp2xyr2wk6eg0dfxndoning8m8bv0s01e44jli03w7jlditn'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'w9ioe80bbm1ohliv2z85fnq3iqw9xurdceakzxifikjq9yl75rkfo40zg5enu8pek5o6fvb3g1rv0ofal8e18n3mc4wvtunsyb1pfgkhucow8if9jhpe45qss2hcqr2y3rjn8mowj1lwbzel1dxc885k1r1rgwq3'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '4ry40rja6kwd8roc81qvshn32cs0h4axw61qyaa0p7wf1j1m6l92rru41vtrjtgun42ydwb78vi1c6amcpazbvmez3jrcoohj27vfy4kgxhwp83t4i72np2gzlgrgp18248u5cvp8j0p8rpljyzr5nv7nlbteo7m'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'c62rbmip392omc4j4337w9bnla4bdvuwmrugu5qw3g9uplu94oqotzuot6j99xdl1psb5tvwpphlxp6o40c0ih3zvmcm0fsuv8ccylcms6a7tpttw2tzvjcvtagx8gmquckr2sczp5wk32weclgc0y9g3oo2f8nb'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '4oaplqxs48kc5op89p2er7oquxpnhf1yuid6hpxxyp0v5d6ieog4wtvp7lcv4hpe0lkr1mwrard9qz52pkxjmiceysbc1nj43we357sjmeudjsxantpmplbuf8u196jyhr1phg793ap093hoezp6ocmz2w1gxe6q'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '0dkbnivo3xf1jne9op3e00hh9s0uhcp4a5iioe1r1askw0wdpl5oy160dd1deywgaf33c8tpij9f4grt50mwcq03mbucxc4mtwfi861n4zihcqxn3uudzmuxetzcj9pzlwlxjlvpeh637nd2qgpg1q2jzrb5k1b3'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '7azp8321bdyegw92hcpa'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'm1e399lqevqk92etn5mm'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-30 23:56:14'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'ewei3v3ailr3su4nixsulckjdhqmryfsu74qlym2vjmirvs8vpsoeyb8q2p8btgy4ly39sgg0vyifdy4s8bj6k2x7ognozodowuqoqt4m3irs8op8vg46oaejkh26tub0wr5p4ii8y80z1yl58lb6pb1386yu66n6ewmdjrtxi6o22e0r7t4v2yg0uypwe2o24f11hn0gnf7xr8sg66d5zdt6mllstzj563z9cx5251aa8215huobgkmcwkafzw'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '8b2ueg4g6g8s5f90q3un8jobggugm4on4f752416q3e84blownqkaef4ienvjy7b9shmzh9pmoammnxz0tp33re9kz83xk8zxgc36z267gx6rn7oo4d9jbg50u3mb0ma7l8qvg8ik3v89fwoklp3qkp58lcgjabdk4bq4rtk9hfvidrlthf1be6cgm6qvznx0ut7dj7hjlg9hc6rb345kka0h5hi6yi9c7bmvwkn1nmml9e1lqvkls9dlkdgzoq'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'gnqx48tmb5yqnnd80d9q5saplbkufonovja79w6uzooagydi72h6ibhg1sqb'
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
        example     : '106d932f-8e63-4b49-a441-13aec0deee54'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
