import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '794001b9-8cf4-41dd-a73f-15418d3472de'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '782585c4-40cf-438a-b856-3d4028f1ec38'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'pzjsf5l2yts0vefn2c17ahdfgv7fv998i4f2w9mjlxs1l775a9'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd2492e4f-c54d-432a-a1e7-5bf6fc002707'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ovgv2kzwx834kguc8zep'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'aeicudl2hncxuunnl48caoownjstk939w98aet4s5akagmpud7c29gdlylw5'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'b140syudh9bou5afxbgbw9c4k0mzepkyw0e4xtgcmefd5gvnpoiequ12uca5xk8vbmt1uqh7awad9ahzplydb8jfcsmszsz7xrxyj8asubfzily5ov08ciz63mc1pz6lzbt207at2q3syg6fiwuwzqtgypk0lkfy'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'rv7vt8vdvt29qk530qo26e64hd2gy5t6qmm9ht6jb0xv9cp718hc5d913zejld0w593kixo7ksryg6hc7rp2e81znbu3id7t2j49bq09qwpw5vt1p746nl383gs89n9p54g9a4kjcf7yb3hgqopua3tgwrdszjbm'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '2zyd8flhg57by32dbriof2b7xn8d4wbfz1ckiso4fbbucch2ah1eybg7okyp8mw3v4oo5f10q9syzt8xx6i663mvv9ji9ionnx7lrlw9q6mh013s469cjbmohhllkokeq72uj2jvagfa0tqybvwfe7j2rykjbjit'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'j0fsmhskfowx5joim0ep7iy1tdpd7tkg2pzckkd9mi8qbw9y580t5v4no64386erd75hzlcm4alqfb1ozst5140s12ktxf8s4wb2rsdjg50fhbuae1b67zoairzfhloz312a5wcyhod1s1j91bbhq2egcvl5s5wo'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '2r1uewk2ocxgdo65ah6hjngm3f9ecbp29ue0n4gzrw99pgadut29p6og2x0u6ka9aqelj45ur7vtlhgcalarnj3f2hvmz9aefha0c4bxf13cuyecb4nvzrqw0qj6vec5pqw8regb23z2em1iido33ckrropqcgk8'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '4b52f02kpcwjqm1hyy7w'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'bu6l2zolc959h1mfpq9u'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-24 13:44:37'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '71wxy31f3l86i4wcd0w2zhnip467yjgpkc2jfm00koeh20sfz1vh3yg63tvtxhizqrjogtrb6kyqk2085oyd3vycq36ujkspp9wx5ihronvm7bq0rsk0acz8sb4cp0d147z96mct1rl57opcp8eux7tgbcmgd49p5aqqnlfsymf3ci8zzfnn61wgo8z55zn02j2uh13o0wq7y2sprk9rascp81p6yntyr0uiwok56yiswjcnr5edkri41gasgcp'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'b8wqo0569nhi6czjye7w6f5jgvx859vdk8391ogcxyqfsi6tgl6c4hjgms453ix08dvacd8e178b7u8auxaiiqyi36jpvyxzbtuxju83mxyup6ya8tqoloa8lwj44zw7r2oi6ba8jkoy9gxpq9zzz5pqw6ydv81mq5vezi9o9jul8dl4ic6p5lc1n7degmppl17orkhvayuoozpmzu5c9lp8wi1do1h8k731uiqydjcq4zfh20tjot1611yd6ee'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'qriwu8uwwkvgry7a4bnfyehs8ulq6ex82sk8c1fhwsykld71ium39znaw412'
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
        example     : '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0'
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
        example     : '2020-07-24 09:11:59'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-24 12:33:13'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 23:50:19'
    })
    deletedAt: string;
    
    
}
