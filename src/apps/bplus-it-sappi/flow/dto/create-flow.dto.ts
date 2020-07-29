import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dca73653-5f25-4652-b032-04a805aaaa71'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'uu76ruwmkawouuelaw0uzmnrjqce0babquhpeyzp'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '805fbff4-17b6-4b1e-89ba-15bd0330d86e'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5zfhdcfk00oxs6nfti2xldp40zyvrob01vsxl3ibm96lo8hwnu'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c729ce28-3b1b-4572-b781-ef38c7e06766'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '92sylzkfdutj9k3wy0w4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'zarm7fn2g33brhrh0cge'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '45fdqt86z4p99wnc1d1eute6w7227oj5uba8je22fr9he8ife2u5pliwb18q'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '9oe0wpeps9qzr9acafwr9gn9q1do3skgzebbnq3fy4ugwf2kjvphrux4l8juwlo3l7eo0mewikjnbg0wu07txzyx3wrpov3xxou3irujd132twr3pkrau5acdq28q8l4mdnmtb8varg3clcomhp4ib5eo44fd7i7'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'lheb9bmadescvar8pvdgz55119hhzp6n78rqpsyp7k4zkehbk6j19tzttm9gfddc5087zc6b39mptmrxgb0flkyze6rqrarbda929gq3s7ztkfix7zuzbsqt39cebi8a4mskmv0q6yepez174aojvjj2aaqetpup'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'nehw5sudl2p3p8dkxpddjx3fwmvylo5qv2v6mdsb3g7tfm825q7aeoju9kls5nnn3hfb89928yx6j5bldcrai3oym4i7hx69x0m7djyj8ksa0h5853pzhagq55di87qvry0kxdfqd1ngi22e1wu6dbkt5pwuczoa'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '9xe2lacawojotcw6wyrwds3jspe8mnswi502bflukfae3oljs39dhys2aq7ksihkwh3yw7jg0qomd0wfop4uwaqzwcj7mbsg2k4ivh91xppdbc7klj08wvrcxx9ey2uc65bsxwk0sz35nbcyb6aclkduw4ctahnd'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'kbcp0wqnzm41994ht7mmpf1r151sjorqseshp1rfrgji1cxk8q4786uhud722ddlpmvb8uvyveelhqgvmutzm7ykxzilm3mtobrw67xrpjz0a4gog7wrrbyrf4jl2u1bgti5u05cgnvxi74au8oyxlxb88ezt5ja'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '6zein8nx351jcg967v72'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2f0d2qspcaq1n0z0lo8x'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 07:12:14'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '9vhq3bkke3cqc78r6zajygt4d03wdohbe4w382ewnaikr1kfuisnbcntv4l9r1gdbyjgsi51pwjf9a8jc0ma0j7vpnauswq3l5k4bhauc2037eodbjschedqxaznwo0iv1wabe73xhpkhkxbb5g4zsbhn0j4e4mqnqrwm7j6bfr7jiukduyibdzja5uccbhef2inkb1il8mt340i1df9q5goa6aglwo6vtuirmk4yy4pv5hbzm796tdr8pg6b34'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'p9r28fax4kza6ikfi8iievvyqtujacitto8kvxwri75sgtv6m5ow886g20rg2cl3nkoz5wdo17e0lngbozu5kew9p9aw7tkij0me6o40rc88n522w5deycdgnxdazew64z2wtlik6w1lmg85kgzbwqnkv2dazafrp7hxipmv2lz42t1di6q8dguxuudtmicy29d3pes8v428v5xnln15nv2ypg04sxdjkamzccyj6opz5sb0d0dzcr32zjugk9c'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '4fd2yg75aknia0hvv4ointbbs6apbdrkg36ocyb9exyp7mpr02pf2ibyyvm5'
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
        example     : '913dc527-b649-4dfc-a892-98142524b324'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
