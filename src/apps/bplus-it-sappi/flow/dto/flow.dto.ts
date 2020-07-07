import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '16aebac5-50d0-4830-a9ce-4ecfab242f14',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '37f36d7c-2f62-4e6c-b8db-52e18c340a25',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zvd1c3efk15xtffxkl7p',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '51eq0cwjdi5kxzd1ydjwg2u2sxomomf9q3j0msgsqjvmbl5578b7ft5tvso8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '52df6h6o9qt1yi5i2g0hsoyup1cs3efiopelbyt96eexabrmugpznr3js5d1nyhejsgd1yjm8n06epy0zfxv8ykg63hs6vqonzncmy94kz66gxa1toatwx7goe5c217c51fb4xrtojgaxket4s17rpwbz6v02ngm',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ldfrqbqkr8xxzwvs337bcix680kiu4t89egbp4zetfz9mxl5qljg1mwn5tpfkd82arj4o6w9tc4hjywcgakb582fz2bvxtuk9ljdsdrk3ctqwwdmgbb1pv6p1f0bsanzusod7wg4gx6za71u8a45ppij5ahmxuyw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'y6arlw3r3cw4evmif5hu5cra4tr7hfpiocx93frryqx0nuqzom0vtfxjcjxfjlalusp89iyo5qabnxthtqp176nk80s9g8jnjk1j7ohtu4auhl9qm527cul33glnu2lbhrh3wkke7ygk5h1mqu8yn3cxs9yzrez2',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'n8d9iebluasmvr4a0uhhgmwc3nwldgaexba9jmaw5lf523njdxafmg6lbspvav0u93xrthct2wqz9fumvyaeexldp6dmdwjoanothwlk89vyskushvtamhau9cbmh2sf3la1olpgzm0uvzfhj5p7bfbhdi8mk3z9',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'h102unuymw989aplxu2z3f98nwi88jkbyulmeih39vujauctdk8capu8t2i5b0nv0fqv231qwox410pxnuyt82ppq410ij6776x1d0j0490hk8oa5d22t5k5zy0ygjt22h48zmyo9vdc50016lmdwum4vw2ahjms',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'zcndeegtucpcbif6hytn',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '0o7688n7baagjp6xhbhn',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-07 00:30:05',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'q9278fevdzak21ysmowxm0zfmnky75eutq1so9r7e1tqqfiszjtdssp6ra923vjig49snwjw5t8fy4i3fu7aqlsjhedcruzermmj2li3xnemi4umgp6l6ufwcskwbnnh5pq53ekfsn7lx0ij1kalf0cdzdol59kr8ghercfq7ante05r2qnny3z5rkv6oiethve9dqg4uinjgj99xksaqmw5o1j1gjo7fxeluqgx5dumo9hdv3sop3q60tnwca4',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'j7rh8wn8vpt1nw61wva4caye11ncl2e47hdx9pk5uaqd63wxbgzyp71dhpaigjfnvi25gnwbl6hg3vqo92f721c2etqtkzof69451onbe520gmhsa2nlfn5zmt6471cjha5z1nqzk65o46mrxyrc6rrmbtjic7kr54xytltch55yodpcymkxmdmzo303paemep6k5tvmi2jeu0by6rdkgs0nk8kjy6awgg55uf2eqwxx9djbsyyjobtumwnsn1y',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '1uei9iwomwtceyqtnvyuq9v6gq0op1ddm0lpqccuattapcxwamkt4jvbvmv8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : false,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : 'dee11500-fcc6-4d17-a45b-59cc6bfa6477',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" },
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-07 04:01:54',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-07 07:36:37',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-06 13:14:44',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
