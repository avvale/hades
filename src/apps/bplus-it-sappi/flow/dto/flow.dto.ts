import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9b7e77cd-a1ca-4aad-a773-b1d844ce6b7b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'ey96as8et6edqqv1e5wirpesrq3dcjhusk4sgana'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8176d89d-edf6-4e6f-a15b-e85ca1299ea8'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '67oh01juxfpnqd17yprxxk6wshrxygr0j0tisvey8w92g8qshy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f07631f5-827b-457e-96cc-04e344ac8e48'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hqp3cgbkh80sazu0juw1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '5eld0jxc3vua8vk3lwpq'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'yioz662kluv5a0pnaq9h64qia4miqhgp0bsqbjbgn0ehux7nqon6tfc25n9v'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'oh2gdp3fxsocjdakdw6ew9jv42u0aeg0bvt5tfvq25jbgm43qobichbkv6d4yxcentiqlc3apgm7tubj8b5s0dim8ldzpdcgz1d1217lw0j9zd028t1525t2yd1jz9dnc75sqhoewcpk3lv76rigj6ob0l18a7kq'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '7nuwv2jgk8hpy7lq75tp2b5nm3snpmyvyxe2qya71xqfw1u4op8n0e2y4svqn842vdtprc9q2pd05gglsuyzjpsyouhf3nv9131uc4udxvwcn6cq4r3oqw5hkpwab7rv7qqf93e4o71d8bh44djsvpkd9gondj5u'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'lha22alcbl29n5vi32865joy5z3pn9b979autq5x17k9woptb74ute3s7onvvbxiwi0eek58t13voaho55u8fkh5n839dxia4lw4t7zozlr16sukwek15c7v6pfrggsqeh7qj4izuwjfi7s5g2zfpgks2d415qtv'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '7cwkxmdcowbdbcc5c3vmuyofvpgwewsh4nv4lvvy1ywk0indqci4ewkn1ijvcrt5jygx2578f34io5w85sxzcovoswcl3lcuguo95tfauikbr46pve4tuyqsrq2w5qd40gr65u677aeqb6mc9ibwr31x6jjiea28'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '1spj59497jn9ruczu3kehjplvdd1v2st7y8cbhv5bbh6guf2sl6lauf3rpip42m1gg3hl245nmytfdka3ykh1mhs47uxrteklk0nx3ra5tbig7tol57609uqn0gifs5pgo0e18jjgiaw38a5vmqbiq5iuzhshwt8'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'hdg7e5htt93gusijj0eq'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'uhkranclfu16t1hem9wy'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 06:51:36'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'nv6iaaxdxjurli0kchcwh90py843sgj0vyyluezugjxven1mqhspihpaobds7ysmcscmdyraw0nql69ifavx4s1jobc5utb1camtkpc6576x65rirzvx47mn0fpq8rxnc62rps2bg76m35ol6bj6yjxnzktxm67dan8jve6iy03jpogow108vunqlmy1mvszjffdj2v9evw2nsch8i8axvf1zws4xa68oiwtt41afh4shfhxzjgn8y5d0uf938q'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'bdhx4tqtye0zdo580m0f4odwgf1stltkgb0xza99zs0w8ds86drcuh2xe78165qjh4v7tvwx87ybjnmprdavrarr7d3hme9n7djbxngi3w5bvm15fzvdqg30r7xjwn957ek9lh98jy5w3bh4d1atap2xx072axfa0ewgnzxkgajww59tscsi9jt9rypur8v6j3lpf664eog4zhv3x79k51wwyjudcty67bvnbdxfbcf1igvwfggyd8x5uxf2of2'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '3i1bvkx57ybxxu3tt9k5gzvp6ezb1w2mrjtbxojtpfxk0wetutijq55we1y4'
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
        example     : '268343f3-70ac-4874-89df-aa7bc1d198c0'
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
        example     : '2020-07-29 08:10:31'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 14:14:18'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 14:42:08'
    })
    deletedAt: string;
    
    
}
