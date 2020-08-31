import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '587eba99-315a-4cec-9a33-9417cf9ded57'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'mt9mcg6apiskkgtv771wptsmp4wh02edui0w0i7p'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89fa92da-387a-46d9-a7a8-a694b6e40124'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'kerirhhaw1g3wgdshpne1uvjay4ld0r8v0bdu3p9znv24z6agy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4de55c5c-628e-4e9b-9ab6-97649e3e7d57'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'kqarzt0xa5mxpk176xy0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'fjb7llv1n55gogbqzloc'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'a689k67yclugc5rthuvqxq3tuwtn74v3ub8i23v33smr1vyir9ot589778kx'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'dy98tv0l8ik54i7rfw063bahay3ze8gm82sgswq4yo9uefgvdfyn6ypmbsn0ifjoq4iomukn4xcxqwogvu8f821kgxkq3uz4wlgl0q878cg0am1yu06ue319euazw04w40wrmsw6pc9huwqc56u42t7ug878rsnu'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'g8ra0e7nuulyrc0g6i9oh9b6ry7y5cg86hzvx7s6asrnhaxi11v2vmkoz4hb1b94rp7czn18olgdt4e7zpgdeszqbbduz632a1qddvkaedllaqnbtfalhimk0jzasm67njal4mbgmn3n53s9x6nll0zjycujj79b'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'jdg3n8jpblybay7asl86z6zydrxb93wbfgjm4dnw4mbixfdyaqy44t4h6ihu3e4w3k9fpshxa08u5addj4ebxa35zkjmbt539esdaho30rwnvrah93d12s8ewww07oybd2c421i1b3q2mncd62cm3qmxm2d07kba'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '7pwfj2lbkzgue5j52vdpq8hktv9wwk5570i077sjz8hok4vnnr2gsrixtkr2oec539up1jfmrnyietqomuk7ww0auin85eq2pt0hlzg47ywbve8eplzgwn4mgt2ol8dy5h6ma0wveac0xiawmciqi7lm88manq2w'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '2288gn73tnn4n5secf40q8qlayqivfu3q2jqq7e6n20j02emxvq6eqqx20z17t7wcjmsqjxs6pxpccbuwg3f30okvtwej3y5gf9cjiswfi2sin4vstcl1yfom98fo5651fi1ibos99wz8zkrj4j9ep3f69m4qlyf'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '1pxw361eltlm58e1pbq4'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '8s8lt0fw3lppk0fprryy'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-31 05:15:12'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '15qzneunh1v3ly2mr06jj2ci0nok8urdl8h04gzcf0yelpikl5nuc2c0e4v3wdp29hwevfu05f5emdxw8k00o2bcevx03wkrfqajt0qs4rrenm7vam8dg7c3x6sjg0o519cuj8iyeoq0q3qmawusddvp3rdfs9ga9xpozw52somo1wctw1xv3s65l8135fe8g3efwkr53n4o0s2tlnsch9s44ikoa9v583vzhjxqreiiglxfizm801ou8bdo93u'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'ja61tho35a3inhhtpzhwvmoel9sp7zakz4ku5ukzkjqih15xgadniycy15itonv8lqev4lk2dzefet4kpllpzqowrczw8noe2oynxaum3uzp10uq6yshuaa5fh7jd1rx1s3m3oa3becn2mqtgc8tdwgzyr7fopum5l22k215du86ll9g10xrkg8bab3efiw1xdxtdrib1i2ktozqigmaido8sr7hcmzfcqgeyn7ljn68xrxex41fsljq23hx8ua'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'blcqg3vqn0zr3mp4ur1liikd16a7lxr4gmb5sznzhg4y7cvh9r6gytzu9363'
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
        example     : 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
