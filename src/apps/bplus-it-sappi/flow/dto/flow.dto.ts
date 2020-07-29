import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
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
        example     : 'uuva4qqlpre0fcebf32gskg0dx0kkgd0iogzspet'
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
        example     : 'iqd51nvtvcz61sdyh5481ng1gbhj0dlrlev8a68xmvw9e9dqbd'
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
        example     : '7begzi99jtw40gww2o00'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ycc7beskf4i3l9djy0bf'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'qgtv3uiyw6nc78sqjimch8n89vlxl8t69qy152r76rpt1omriw2mgdal3sae'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '0fat95slnvvcfblmzvz6iovh4ablin5erlm8z4yhjec5rf2zx2s1ip7wyj6bgftt20gty8ac36chxu6xzfn0sp0csom9t6jvzksp2mql7ibkclsv3h3bxjes44b1nrm2edp5wn7lnzx0yejjrgcmc7mgxwysjwn0'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'ard62z3o8wneo8r7xvezeml7wiqygidqrscglgtrrtbns03qhg18x4m15ihotvnmeu5yy580yggnwxrl94wv6loi3lnriawny0huiye1qcwnu05h8d0znb2fttsl3n5b7sbbx46ez11a6pwcy7j5dym3pxetpsn8'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'dg0and902q56rjgqn81j9vraqh7flwpsctz7bp5jd1u2041gn09i1h1vrutwtg4239u2yvcal7m42236908eqkp0chvktb7fne93pfwr9x168la9uf7p7tcjotv9ol1t4kmozfjansfh06nrtrpgfgb4miknfzvx'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '5xkt3wvv4pdfi7foyqphitez5o4v31aunt4mz9fxdvtibycnudxgpub20et1cp0oakdqlnoqhbdm9ob02yfr2r2n3fprvhnoqesp1i7m3zo86svjtqhvdjmu4xh2iia6iqqtix3ke0zhmiyqjqzmu5ghsj35auc3'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'r2oi3pfey7nn12syztcbsxi2a17k5d0mgwhdtmxcstytvocb0tx5mlve7gge4wx2qd6p1lg86w1swmynvvdcqhmlbb6ci4x63na1mwgdjnxygcjgvct6e0ppbtzjhbfv66q40eskqrmp3z69sh0i3rnz0dlgk917'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '0b0gld40cph1h3dgaf5o'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'a471nuyu53kvlb6lu44g'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 16:14:10'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'a3nqxu3t2ai1ilrd92etof7eow5xmunk6a9fefnhjcvp39226erkzg3jawjfl4t2ixqetr8wq6gculy2voyr4tnn8pwuq624i6kj3oj9se80n0ayox8t2h90mq9zhilvz9f932lsy2kguu4ldaej4oeofiq6pfway4e7ibzfrndikk77wti4gi0fs6q24gm9d1shhig41xsmud2vg5p0zybpsorqlhpbotb7ct3vfb5y3mxj8ayquvggqncxk4j'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'keog1f5vd5wgeg9haydarx0dgac2zolsy8zo6eyz7aza3szk13bmmd8c4bm2ykkjsckpzw760kafiq7ehpstqw47zo4aemd592xi14ft4nhgs70d1774egljvjj6y3szgb3nwocqq73hi31k4cdhntvwl8gzy0pmqjzf6at1f62zss667k1rd5jo6wt4hins03stlezn6x62bpziksmgz2epvkcywv323x6kzwazebpxhiio7b2boe7ii15c90t'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'ij2s413hnwvzxnm1tc3r6vnpb3fwhpguy4wq6e0fva27468x6c1jzh8pzx5i'
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
        example     : '913dc527-b649-4dfc-a892-98142524b324'
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
        example     : '2020-07-29 03:53:43'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 12:09:37'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 17:24:06'
    })
    deletedAt: string;
    
    
}
