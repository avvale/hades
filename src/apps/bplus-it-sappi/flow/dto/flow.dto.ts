import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '049dfba2-c985-4a0d-9349-eacd2961a92d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'irz6jd5fr9k7kj1zttrrf9nt4cywaj1b82wbu3p3'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '79b12cad-c428-42df-8f7b-411f865c3f47'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vvna7s083iocnqm5pr33mkwlux1v9rg38oibaevu2p59o7isc1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '62c34638-d7a4-463a-a635-5f070479bcb9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'niez5hqdtpjiaao9viat'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'wue10h39a2nfrxs9t198'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '2yu76ec6ggs29q5gnow0fdxmmpcvae7sqq14nvr7k5vuuucjdb23iym1i8lj'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'd47l4uhkjblxcqbalwu2xz126ed59vwm33ct6xft2yna7qo4yxms2bgylz7iatrhr9gmd7qk4bb0vv5q3k5yl6imkqg39223kluqkoqvy3kilsr46f1e4pi568zmolmk6omd2vzjelljcvij87n4ayqk6n0trye7'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'wquvyrxi0s6qsmp4g66uha0rrftitrdcy0dwddqofxvsbzodgb9hohi29y6jyu5osauzxk8twdz3td1wtubrc28f12jidx82ux6qkjthjinf3e8oq3y1ktno9ysmkpgk64pa03ylmg4agnqruvzw1x47xqr1czbg'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'bow9gkp3kw8zjdnv2ie0942rxc6cwkea0combq12s1ft4hihmqxakhyipthxy5xcpvtt59gxog7v9pbs8gxy2m2b45pdns190k92mnirb3bvrjkmn3tz0bw1injo2laao5r35lv7hhswi8mr2825trjue26w6zrb'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '39tw658blk1op00cfhepz2gonyxtdv73e7ntrvo6wqr5x0ydkyj9im5ilkqp5gv3xztp0wyful57g6d1isu199d32mwf8hfzpce7qi0vzbcwaupulg826tqd4357z9lbrpqqpmqx9txik2ttsmc001ok1e36nrn0'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'tp06crkow35xkvwc74hrj4gccmzjrfcustepbmh7seoi1yr0twj1z6rnzo3orkyfcvh2p3upzouy90bgkb6sheukni2vg0ja72x6fcsg9hylk2s6ht566jh8a5ig9zwnf815dblbdr2htjitg08uthzce3aic0ph'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '956dik4zzdat0o8xxu4n'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'qsudn1pzokj1ucup6y3i'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 10:37:02'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'r1o4xwc171hkke8it4ghxgvkxfsulqmby050svitlc5ttajk8d7rbdxcetujprqetoa4b03acyojekmjikm0goxt33jzwaa3ymx4jlf6n7fyxrx7rkuzg3ky19qv6d9vn9uad4m4pqxgo6fcda8lgnc2fo9ye06iuyphwv9w4he1jl0ifl489dg2q750alyooi38yqcfpnrz5e9oacohkwjelx5vvw5ptwcyfc5zp9yk0lwb5pu97ylojr7lie6'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '37x69wzsc4s0kw1yv2p57bxdjcvpl9ui6g5d3zp5e3g9hvpv3vvkln8nybpilqr3xl4c63wgc601662wagp3pac2i4e6djndr27duua7vy36mwlixa4l6lvfkzi691vj6dclye7ffi0ynu0o9n9e6n0zjuhged237ju7us7shfmmmivp8w1wivw3fpnd3mk4naa3vogw4jev39ev077oqych6f3gxtqz4469q4mwjpjlt1yl6lxs4p2qubuxapg'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'ehk8z1y3vzwb0wg3lar5dyzix4ya43990yzeft0cpl0sxw5nwy1285k69e9f'
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
        example     : '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c'
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
        example     : '2020-07-30 00:41:11'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 05:35:21'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 14:39:31'
    })
    deletedAt: string;
    
    
}
