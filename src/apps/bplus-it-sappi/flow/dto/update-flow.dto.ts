import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '115d69a9-fab7-4051-9265-75375754b2e3'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '709c6586-cc95-4d58-b738-eb8c23e06b09'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'pz5m2x4htdsm6v8lx4qo'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'scenario [input here api field description]',
            example     : 'jsn0vr7ngggz9lb5j3nbm3hvrsh9lh058wlmdlpvkfbo3y8qbe3zconhk2nf'
        })
        scenario: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : 'enlojxukgrwyxn96li203debl3bwfqr2cxv0rhyy6mshhds1uglqw2xqw09dob2gwfz416vpn4v3m9b4t95h2xld4xtbikca3489iiife1sulaqqwn72gpewkrzd0q7brmhk2bpq8x7norp9wgwqyeuo8u4zptq3'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : 'k8vgkboejmdno6k1zsxu0p8ayjtbh39nw68shqzk0ylxosdz126lwf619k5rfhk17rk10dk0xwkuvzcuifmslozh3p3v6ks4holtgrxysjfq5cn6wkeibxyk2v3ykgbig4l7pl9azb5eew3x931djeiorepmukmz'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'interfaceName [input here api field description]',
            example     : 'a4ty1hctm0birzcy8rfa8f54k4xb6la4q2erlisqjjaluxcv0skewkgxnox1r8ctjx7kjpkua5skmkaqbe02mh65a6nnzg9vlis79wbp9u9mm4lzs7cu3zzxgvm2l1sfihmoe88fla760qnf8k9hniu4rvskyxlx'
        })
        interfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'interfaceNamespace [input here api field description]',
            example     : 'w0lye4kph5dbaz03l0ishhrdbh5d58k0cj4nhg5h92t6mik7a1vm9pvmma83thofmltr1so1kcjsl0sabczxcovtal6tiv9tgxr696mud1scup46ipz350tta9k9r4xemt938mxsodufkhw90ipfemy819n7wa7s'
        })
        interfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iflowName [input here api field description]',
            example     : 'ls2rlfblyw7c0quvzpirulhqxsbka5xz43g7miwzutz7z709z4m5pe07cptr65fhc9k6yxr8kbodcrftcagh1yjiopvrufrqyzidtyexwq22x3rdex500wxxpuwuew7uqhxd3f8lhp9iddh4wgruqb6n7mp6c65w'
        })
        iflowName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccount [input here api field description]',
            example     : 'frdk8kpvaxj28gla3pvz'
        })
        responsibleUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : '8jtzxlh6vfsyoqem1val'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-21 07:50:33'
        })
        lastChangedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'folderPath [input here api field description]',
            example     : '6qio5uayk5ywptmmfandl8rj14p4np0llid3fvo5lg6acj8ly2e8mavema89auf1exotbvkrl2emlff3q9vnifi0s34s8ls7vze4h98b4juupt5x8atxeou0at4p94rzq1kr7ieojechnzql2zp50noof7ta3zu2pnrd8ooenqpahefhadg0clu93s1kl4nq9szgjaq9j470asvzgibkxbqlsr3c7l9s6a4aksnk39mupfnxe2y4nb0mmflxhtp'
        })
        folderPath: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'description [input here api field description]',
            example     : 'lu9413hv7wycgzljsizns6fc78lbqs70hykoj73vyjbnz76zttae2lnosh0tr4f1mdbcr4tgk0elfi3vovad4d2yuyf2115sf1nhadh9kjpcuiqlxjxejbrm8cfe335z59gozekehmxyz1njcg71ad68r6757c5wlqa0sjstuucvwucc0448vxsr4fqvk2d48nawqvj12gg8gkjlptx8gnt3bbwdnwiivckg03n56ub97du3dovd2kyyhyv5i8x'
        })
        description: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'application [input here api field description]',
            example     : '31e0qcanlktl0wtqr0rbwgx9d0da93mxnsvndghe0ajrcmh24ia28hz72f8j'
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
            example     : 'e01330c6-950c-47db-94df-596b83e53e55'
        })
        fieldGroupId: string;
    
    
    
        @ApiProperty({
            type        : Object,
            description : 'data [input here api field description]',
            example     : { "foo" : "bar" }
        })
        data: any;
    
    
}
