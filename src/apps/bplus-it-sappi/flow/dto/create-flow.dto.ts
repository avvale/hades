import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '0545asmrjlq1x41ev01lsw6ybgd7fnbfo3wv81aq'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e100c5c7-62a9-4d07-a293-08d41b59792f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '26l2420n9mx3luew4hhxips314gehg8ubthy4mhjv6bm4xpp2y'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd2cdf6a6-c106-4e6f-8319-041619fc96ba'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'v6791wu47mm304wj4xzb'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '6ck5yzb33liiosxjrm4u'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'j5kos4b7tan9nqae766wqb4p2pat9igr4dnt4747ppy6px0w91m5no7aji95'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'totfrprecy21sdyhnlmenzbdggjtj18l2njaei54sz2bp7skrv26ux6m2qmun7l1wzi8rjuhgo3fxdzpj4kyn55f6581t9kw81k2w688d2y5s9ejjrrhrxqmuajf5477ae4p84eajrsqk5ly15xvmghe38o0e66u'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'u9ie0bqku1bisrphqejhmzky39p8gebhse7yyvvtvir1pm4i7o67mk0yt2t95jo134ismsncufyamx7fh67c6z90exlxgk4ohquomcp59hnsi2b2ug8s6tmidwoi5n7qr8y4waf1j74hwqco28dkfxyjkqnmzqho'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '98qsobyn5iiiom43wlcox52rit4mfflveduz72hoqzbaznkowu1rhg80d762o7ya57jodwztrk6fiwxnavia01xhwtmp6m7ohdctt4faejbo28bymwa61hezrrolcupd26awqimu0ilkn8kwsofvevj9j0ycziqb'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'n0o0jovnq7zsjbo30vc0thqwqz2wcz2l7n9b8ym817aft9m1y4wreltx27dy66vop7ysv38l7993mdyb7lo4x1vhfj0ufkvdrow05he55ukp58t1g8v1yw9kfctzn2wiao36rfqn9yimvvqej78g4ulpwqujyvfk'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'iz8h0605hqon3vunztzd2efb7yjtrgmw4jesatlf2qx01jt5yr2hsbon9oz1bm2kt4b3pzmzyrhkq40g8zfmxlqoc9qc338gmtjtfxdptkr8p00fkxbjwheya03zqoqtysxkkrlzxwtbvtheyua0zx4h244nvtsf'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'ry8aredtmc7h9v0dl034'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'wwx5iilha7c4td7g263q'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 18:52:49'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'qmilul4ml4u9dg9t46rfnb4r4nuv9z9dh0t73v5a56pko3uewvmuqnn7wk2omdek0r26py0hly2ocpxe8z5jreyee69vaz3rqn4t6sc201d4ah92paqxeeug7d86olplnq4bwlm9ggb4544ja9kch2ub1shgtuoy2e93k91059bsnbapbptam24tym3d0xpnk1jfh35co2cc86tnaxhln6bchvgmintk4c7z5f4wdbjsb6crrl6r9icylzgnx2b'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'sgjlnhzugy7mzhckqzxxbtkqx3a3d7zptnomumjp22yklrjvtfnme86h8mb25xrxcuja71jdvm0rcav3e2bl1fj9i6wlzof2jh4w10fpy04kd11ep2pprhq40eqcnpc6wbloedxofahtb79d5ml2y3bdkxcugzy7uos7vi8ek897w2jhb24wuyfces6edzbctuyiiv3niknm5ekl1mno2lcrkyd1k3tg53og7wwboo2zdez5zgaxq87myorv91e'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'e2s5ylbie2cyb8otiy5m8yhza7t6i3iwbbxnvlkwnfwf1pycidgfza83vx70'
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
        example     : 'e314c0e9-7531-4753-9e17-85f341a25a6a'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
