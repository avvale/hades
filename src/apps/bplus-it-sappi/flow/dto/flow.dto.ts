import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7370121f-7db7-4db1-8d18-f949b51bebe3',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c13e8197-55c4-4a60-b7d3-5061e48f7a56',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '6334b1ff-77ac-4635-b471-fbe50e95e21d',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'e3rkv9qwwigzck1is11l',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '443vbh1nno3ga9w99owrnmac6miqx9iqghrnd0gdilrs5r9ufh4hizodc43x',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'y65akup5ek975tiwfg8vu64uxyj1n2qqqlrmiekxw0a1syc1bfftbf898750im60onq3fzovuz4irupwv9q4gmdno9qtqdqx071j413x49lyy4edvtwkpvvaj99co0psvt2wz5ce9lqq775kgi5jzp2u94s8as5f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '0desgbpy08w3afae1ntsyl92h9icf4cl5xr5599fdlwg512pqdje44xhux5c6jnlmcsu0pwottn8nd7wcmpfhejzxow1n31mcym7tgvnf8rbfipyq07rmrn2lzkis9emh3eqyp2kpgx8zfqshm2e2b0bcj712aqw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'dgk6ev4dmqt4wnrujm7d4986psm4udhogoiil6uyjt1sb48frw7v76yyuxdvsp10if1v5bul30m67ks3hj7b853wo5nngg65hw88zyj988cw6pz4khw1qxce9107gqyeli0zh8pj6s4gxzt94jxp99xj5v7fep1v',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'd8c9f5oxbptwqs81r16hwltz0s8m793vewnlu8b7u7k9r6o5ylpyu8w29eznmypj2qqyez10519gtcbxwqo88kxsia6ajkqu0nfi0d28ccc0e7l0rr6bdvby447p4rawwk28uzebrfjvzaicbajoavix43a51afj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '2p4clbvumghbto2gf5s9pbx1vjq20age78e3s5cdegvnm1xrpm1ccw030s6fa3jgds9kvwi5buzi50q4u5i784wagtokvx7x155kqmxljdya8pcaat2b1wefi5pgxygjcwqht4yhohyd16ex7rrawwbcttepmz5q',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'eydfp0hk5xct5yyl0o8v',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'wq8o3ns0mkkal79c21yn',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-16 00:12:30',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'rv92uwn6l2au0cljnjhiyvcetj2th4opipg6f5l2ueb734on81vpxwr2fbm5eovf108vwezzhbxb72hl6a9ygyz71i5339ck0dx76r96yxlvbvei54gifqfko1830mo0ek60ds7ttoq81z2pzwavgsx9qpvdvhg95ebziwgycmgs9thlo79dfp80iuwz1lhxfpdui0lil6jgq82yjdtd4m3tk56lwyf5ym3qfoklq04jphuj5s3xzsbhc3bsons',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'u6crk1nvuzddprwhfqi8iigqiytnl68uzds0t0rh5w8j6enunj6spoe98kxv3anh130mbfsfmo7ispddx5f1dyj9upnbpibtd4xdmb6dt7vsadf8uufyg7tytz5xm75lx7rn3ubth4h8c3pbh9avm2wkp2r7ws8mfpciqvd7vayn0mvtc60y8bu6vhyrbxmaxh5ua7yblji98pt65kzuhn85ticpobo9ae26t6niiy5vcudt61rq9s77u4hj6uw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'i1it084qerolp9pnzw7tkizh7a83vpihigz78j0zm725f1m4siv2byjmfa2n',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true,
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
        example     : 'eb72687d-b23d-43f2-af77-153dbbb6f19d',
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
        example     : '2020-07-16 04:02:10',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 03:34:16',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 04:51:05',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
