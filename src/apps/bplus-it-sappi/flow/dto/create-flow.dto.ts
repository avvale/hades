import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
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
        example     : '26wdhaxclryyvwmaqmsdrftighdlw2ul4ugfjlw3'
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
        example     : 'eu67icg08d82ev78kolszn804rxnp4n9fr8o5vokx898m7jyvh'
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
        example     : 'ap1da7f5fckryy3ia32c'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'xz052296119yakf6kpva'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'ijr23y228rksxpzv3qfc35d61zkx14j8sgd9ftwzt5lklrjcn9dozuf2ns47'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'd7uf1l0yoahdhdctydhg3jj5jsydkebr93mv6rdtkh303pvci7ihxzfbc2c0f5qlhpc5hejhyof4poyawigjngj46lcnznvl8u5mo0off6sobi5i2t80f1jbb8d8uz3w7vy2a30km6wmplb4t79nob7qf8zjg39d'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'm6e2fn2ul3wiuy3h4mklsbi71iqul6klnw6hzxjz6hbtudl4ki9km9mgm2s2mq7x1rhpfekpw9vyf9y5ot1qb9uj4dhdgds2wrcb8r9nmnngl6car4elchy7i2f2jiaxy6wmx9x9s83qh3b5r2je5hbfpylj7ruz'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'dt7vwjigwdbuhbog9j21hv8ir3eqrx0gkms858tn16hpdxvztyovbzrmc37s46gdfetcwm006q28i7scy3hn04x7jui3ev9l1oiujfq2jgwf2lscwial7jxr77h8qyq9eehgo76o847l6o3tugf8994z2yifx2pv'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'hji4hoe03mrpnpbayvtda1fz6hujrcxod2up6zbep07g6jwfeisfavvz1o191w33oyf4hy1oqjsqef3yv1nf48wxz9sx3jqmilki76mqre515cyb6734k0wkp64vlibd8lsh0sgj0xdqut10x6frujqtjkouit2z'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'ds9omyrnrnxkmfvq4ehe9hdmxc53rndto7o5jma3scnbsnuuiup4p5hwa34pubqzmg5as405pe0z34c56pr8vpwnyw0bo81eccbnr8k2ft94gdc1e8aohydiyn1xxw0sdokf8y63ixs0cu6o7bwsmu2d71wimito'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '7iij70yusta2vuu3pvjl'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'a04qmi6yx6jqsi7ejbyo'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 16:37:54'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'k7nykao7bkma676u00q7y3y2503ipw0gy3vakobh87h6pjvie90hi2k1pjj7c8sph8xb1hs5r6gsta4w1uzuz1zi3096fhrrhqbvpt9buh0d1cs4ahl5crbzbibowrc71y4nyqrxdm20ke8emf0mr2ozsar2z10fcls76s0o5uevw66l5l7gscrqvxoamlh76sta4ff0n3v4wlwbbly7uyv43253xzczvaho8x6ylhqruywk2b0pxv4c9lkphw0'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '0109a8f846c09mtc4uwpajgs1yi0ucxs960jgneolcfexcxdrap6zs4xwedrlvenhibg5hj37ls5ee05dibkv949361dhv4znd9g2h6ogasphror8w4hvb5atvwwtwjpgh7z2pn8cpfexpsl6ctisx57rm86h67rtib7e46w687fvt7c0ixno828bic7wejnx2phbooxtsvd7opb8j682q1wqm828769v5q6tytph6jenm7obgmbro4z9l3ti7z'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '4z8fzu4pzvc7xfinizjvfyn5ww34hie4khpazf06zz5267h434bg6sbmfi7r'
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
        example     : '268343f3-70ac-4874-89df-aa7bc1d198c0'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
