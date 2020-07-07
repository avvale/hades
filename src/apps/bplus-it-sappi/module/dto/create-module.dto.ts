import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e2f1f5c8-e585-4398-adbe-bc6c81a60d53'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '34301028-4942-45fa-ac1a-80ee2764a9dc'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'cc916bb1-7995-47be-8a93-30554c14395f'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'qvorrmjhlfodzm3cwk9u'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '8b95de32-4c8a-4f61-bdad-bd53890e1bff'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'cpa1hv0b6j88q0welsu7xjh9y650wra5ekhzxa7ok242odz47iz2bqadpyuk0z6o2el6mm0tg71l13bobvtdl8kryh6z9wto8yaplixgwh9t8rh1ok79m0yi0b9rn85w9hwxczprfuhvdfpwvmc1c2y2v9xvkoa0'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'akuxk0i0fyawqhb963bi6bthpqgouo7qo0ybho5q3t2w513wi2sa9mmo6yd2gnn72pvixpmg9j84ib24uth4ymsj3loqwh0wi13s8f8lymaofys4ltmmd7fu2c252fg1f7c0kgospa2qorrrvhqaimeppl6s3e04'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'xl2e8occlybzqktyd16jxkxva5yn6dta091ao0xymamk7qdbrmo7fv1z69oib9sds1grfud5g343u6d9x8vkun8f2ttgmtypuzfihoocruvhnbxyio1rhd3n4wi4ooxu8fqzqj9j94tijs3c9080n7r7q8d0jvue'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'cb2xbrgwdx8rau100yw12md9zzkyywsvlk0uy44q2chvhsaqtthyfc4gst9riadn91ge1eqjmab6o5x8axjw3ze55lufuko6slbhr8b8j4iqoaeur4v0nct2jqgutv6vt7f7qqyfdukombva7lhxummfw1fms51v'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'cmgmdbtb8jyxxfkfl7qujuyc3s5madzgm5aj4essv119thg84cxab06c5eofwd82v9h4ov5ax9uvupi9uyzh4hyz4x557dq81o4u9b0obnbgc1qx8op9uka9scmokixpivk37scn0hkwqbiijx4ba6j535pyexz4'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '30vjo2dt5jd5w5h57mk6gov9j4sickfaw4xa9xlehhbtli37ahegmmrprzb583v1hok8k7li40h1bbth749azfzpj6dayw1p2qehjkcgxe9741g37sim4nd0vm2uekfon9z9s9pn3v00q667b0ro5o9dx5iib21r'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'rliwef7dnt48edlju1j0dn5kq6jcg59nj2lfijw7t0q3pfr27k7rqse961yz0vf8n79q1nyl5zv8kaeqd8u9tufc8eux1klcs0u0p8z39asf2jjsculrfxvbcog4lyg2l92modsn8wjjlrwp5vpbwvh4hq0dz5k8'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 't7wlgiqimtc7kkk1jb7ijpsw8q4kk72cbk97kde4m923f2beb6i8b6ik01ev6z4ukez2jklhf4oujkt9am939dzxcj8m3grq9sz461k2isxzibnup5a69loex66h763aabi3ph2u0ccf6wiw9ym66pbtb3e1f5uobi1qd0nnsey0lv8k2of7eedhbkd8ntmmnbxhb4dp89runsxdhpcqvxtwqyogulodcj09iqqjyl1dwf4r4xj45ksd1vx3my4'
    })
    parameterGroup: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6zwukix3urx2wa640ro0ipza2trdojxe30l4myyoygichtdb88xqq8f8sr9t41gmthyifjc3pzol5zuzvmb5hgos4nrjvfanrtrbviwaio9a8d2mza7vdce78xqgefbfuo8vc56113pg9ard9xc2dgnmfpbmdy7xd4q8369v1vm36yxgsz940amqni6bfyk58fy0usgaxehfonqzmwqs2yf0bycvwr6ypfbz99wck7777fn16jim5f287kkdb15a8aakrxlwcgle1e6u9ofad7q9beei5r0qd0eaifipr8o2eds2lw7jbb4yx1ytu2zc'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'l0l944t34bppbyjq3ytbsb59p5tqg1o5852lc8hmk554nfq04gx1vfw20rbszdmsx41bkqn1yp30cftbuva5obxe473jeyxtso8064bvu7b6b667fh33ket5st516h46hoa0m1nougcdmc9k3np0avhd9la9l40lyzg821ugpz7b6ryei0bg4eafggapg3d3elhouhkgg6ph23ri22ic1chyz033mulyh37xgjt99se97mza2v5tvpka1w7db0vzvxx2sfwiv770ev637lf3yhaepcpdrx0cv3wl65sd9zvk88a2gwk1t0a43zfcigrg'
    })
    parameterName: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'pks4nuuw298hnyca1iok1syh474u58knr8de85xlwdl2hncphqja06hmiexhidv57mey3uuzn4fp4l5jsn9eiehnwsi4z15and7zdunx12bbirvlxfxd8w46p3r28coct8hhv7p29pyow0uy97g2k4uy7rsc9fgcosrthktthgkfv9x7a6wp9z0qjtprgbv2uj1icq7l6tarouydjc6bz2mubgif1440gn4hgepgz04xjn6b8qupu7gwpdrcaexniddmpymqmq6ok45894l20ll0wmk6j6u4p77ck547cr3q5jgpml32ht6oavupp3wm9l6g1zsnkhxlamc2yxegp0q2iy4g5lxl82ssvb28cmojrrf6ijjzse5ujp6zd76zlfyx8ws6iiamlzbjvd07y5vc0gp87g33b1m4wrs11qm2c8d55xo006fldvgbhpucwrl082k78h35tb88v4pg0vcl2iwv2kwnpt8gc5oabc9rzt9v81cv0l4nv2p4h2k27k1qn9h83kcgicci8opkitmmnb8v4enetx8dm7i1txo31ofibl9llkzw06jn5guv4u4jan6gaswrmo1pfq6pczge7wphzxvcm68evfiyaa7x3d15ozotsv7zzdndv8sgkj1e82t56zsxo4eea6cbg02agx10cb6xs2df8z992xv9e49a3mh3xv8r8ayidflgd8b6qm0d61mwmcxekzgvy2lh9uys5f5llekx9m0e9xtbsdcrtrhsjrc2s1w6svr5t4ivjj7fwigng4fxv9c9xkwy0jjle4r4ajv0c59qo124uqhjf2om7pjiwdbwpmxj9cw3p5d7yhilk7k8dhzt56dhsk347xaj5gg24fc9z7od2lmde39ntqok1tccpwbgbb6s0f9bqiu2v724jhw8lx33tbxbovj2audkvixwg1meh4s6t9y67l13ktmkpmi3oplcst25n9fvqetpnmk7xz91whmqii8ulf229foqql8i5iin7h97p5cnpm3e15uq'
    })
    parameterValue: string;
    
}
