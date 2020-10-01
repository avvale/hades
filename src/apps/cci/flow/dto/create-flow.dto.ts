import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c45f4620-5513-43d1-98ce-01a1f1e700b7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'keg5yudrmnuftw92l1iph3hpqt7qkwp5xk7lkgpf'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '18e4cf70-7135-4e0d-9d1b-52237216a034'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'd5a97qpk065u091tiwm8su9wux9bjgs8o6mj095yd45ny6dmbi'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3970645e-f8e6-49ab-9d26-5f471736d93c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8ua0tcwe65l9rg7xf2k2'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ghfkihf4aoy7jvaue5c5'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '3i8lkybwn15hf19n12kg34gt576zlsax84pn1a4vln60scsy8v8csdh62odi'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '2j7hjfn5i7n81gfi1ku7sf4i91kb92iaf2lyzqwkhs6smog07jd42etglzenr2bz2kvwbffla4yf3eqwjczldjahrynrbfc31zo8pmwogquwagpyq4fl7me53tze4lis0e8ab1x2dmihbw9uhf74c2hqorrb4kmm'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'btvt3cdp0dgmhnjuiblxd2oc4vzmuzi3q6ykii7vujijwfdlok2jgz01ior56bi9n0xx5z6mnbt19ux59sfeffsbkay9t9z7c8mifmlw54alobwf91a78ridsyit3vpye659knsamnoctd1b6ujfla08v7lezte2'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'naeh3903mlp6y8dpf2ccgpmyhbeevbzm7pl7dyj91wac4mbykh809cus966kiwqk3j7r34c9vm1620zk2y23u1p44xqfa2dzw7ni1ejmb0voy15xhvmwuult1deavefpzg94awu2848evduddxnpczi9q3xy4iuz'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'my4gcth9ti8mczz02hdriy7vnfb9mtlvv5i9qwym00fncqqg7z4cd364qv3espul5rzhj13t9dqpbs9mhv3hlgrxmligfm4w2j7v4bh0ejeyoc4gwfa4awryq9mjyhnq9jajod5wzrevh9upuwy2wmku69gcvdaw'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '2ym4wein2ykam869dkxe2v9yg53ahetngum2jc5a5m9qeqa0oq1m5dmpdrj89ldw6fcno0wiwxum7erltpms3m6zt2y9mvv296sqruoxrylx92ysrm5395d6kaspgtyk6doqyspelp9cu0cfcw8ogq0r65vdex3t'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'd3qgkj3srx2imp9uh4rvir68qk34xz8ydzoq41o4rde2n8h9476b58okkyba4c19avnu2ity7vnpzxvd8gbba2r98apg5kgwaz1733cfpwpnh9judg3isoq6zw2dzdp6rcrdn07tr9ngx9ld2ffvyt63wpyt6nya'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '7a1vi9lc54r2vpxp4t4geater05u2r6xvow2rldxfeo46r7tlpj3ivyhwm4x881xjs3ppjdhpckbwrrnd76j4dp4wk23oxluiuj9mqlc2w7yw1rel78cijt368zsvzjji7cmd6wcyxj8jpldrjpw7we3beuh89ry'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '0w2ricf5ritsbs9luobi'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '3thr1x2rqucfz5gvynnv'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-09-20 02:24:06'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '754jvbi5lb2r5rrw8hjlil0kt40me2fmleg594kyx1ayxknnfiz60c5d65h02de1ec2yoq2invsam7k11fjkqdtdo9u6f70ve062vlznm67tqatwkzgdao0df9ip99n24dgf3i7n0bhy07ki25eta3gd5ih0lfw4y21nnfhcf6eubu22w0blwbjyu690if3xinqnx1nv6ko0h1z0qbpv8dhgtmf5300822q4dwgfyceg1xsqk0q2yvbb1r5r18d'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '6zxvl4ui6jhbh7rbi1ghr7rfxeewqrxwxrt4u4ysc8bbjqukk7j7f9krer5kxk5o3xbdmxs7i30kv531rsb9pqmjpmnxcevw91g7ljsb6pxuvbnyvejmqiips2h8tcoav9vdaaq4v8ypj77k2qvjbhxv9ta2b62n9xiw6pofmtfnyor03neh5tthpxfnvltu2ikkchdhnk8vrlrs9vp128hmzi52tlm8bqse2na66n450jwzeg5rtsq2ibaumav'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'pf1kihqkglg0ffrcsbdw2b9ojn4l2jv1cbn2z6hk15gentfrgyt1dsfdblyq'
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
        example     : '42257f55-fd0b-4fb7-aee5-97c6b677dee5'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
