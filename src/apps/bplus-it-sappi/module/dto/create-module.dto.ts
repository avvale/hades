import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '64685734-cd17-41d8-b1b0-96c34f75142e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'aaa34636-2cfe-43cd-a83e-651c47420390'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '1753hgwgzcylspuxcc9otokf7djaikuuzuvie1szmlezuw0hso'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b8609cf0-0e90-47be-8a34-6be9bf537ed4'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'faovhzlvbj2badjlsat6'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'e8a2dfbe-32a6-4185-bad6-e05196afab10'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'wf3za3y44xxl8rw2nnffwqkkzi2lmscka8cfekk5x723vh6fnb4l79zc6bg80obrq4nknl02941888hjamsn1ttlhemulbsxcec26h111c89lyzqw5vnoau7m3nv9v12oq5whwhf0j8utq3jwoc61x9wf2di748m'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '9stbpu1neumb9b8b4j9nsk3x7prnhqumpjpsrf7pcns9kg3jrlu2unxyznincswakjcu8mnyv0xsfawnhigi99mlyc68wcg9789ew5u446p7jufczgi850b5lgxzlo3u6kzmop99mydgvce17acgvyt75fbomv0c'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'yamw16k1fzkjncw7didkrkq2ddyvlw2ti2deyzr5rebwyqcu5qcraka3izhyhzjuoadms2mu7lffxqjxd7fw5g8loy6tc7hlt19aezil2ciejl3yvhyg6qfbrzvwcwhwuqq2bvsxqbdhq294dnhjz62marocrl6d'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '4bcb77f8-2248-4717-bf10-697efa4afa2f'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '300ucmtm4jtokhbrtv47m0z8lrd9cekdbzecn6462cqb004rusqlkdyi6dla947uyhcley3fxxv3u3awuu89e1gmaucwsvvl5d1nmjqddc673ihw54a8x03re1o2mrzvvqr6dch5i70oi48pphke2kzk4shl1bbz'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '2uzhahialu5q2i7of6kdtzm8lkjqtrchi93tb3dipfgkwq7udgx1d55stirqcsk5d064efnzgdbdw8wvi45lzkxcur1cisqv8c0c3reuhnz0go0g3khi1m1uv4mqqw0qz73h6epktfqkf91quiahxsg732v2x0ar'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'uov3f2r52bcsre0xxq4ubq2phqfg3uj2mjlvwcyoxl0uw2lk5diw9mmmgizamkmu1il3d2xuyl530rnd3dozxqprrqut1ydjcv59izu3x12u573482rlhb6tdravmuxu25y0cpt3a94t4z8vz7ssvjfx77rx9uaf'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'j8qba3srduxnlpkhahg6ngaj4yiyg2ha2xeadw4fxkrh6tm99vzwdvm3ys11on9h78uk37ofge9y32v8oy1leee2fr7mbb20qzunammsxk7ya4c8j2i7p5n3rx8aiwpbdv4d21hyaay7i32h8tqh8auklf5h17ht'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'fgfxgmszorhmznnrrr2i'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'i8iutepee0nv0xxqgf0ybq4hhg2f5d55us16jvqb0azsc4mmgx7ua4ktq4z5v2048rba62e8wsrgww8jitlodkmgctd47dy4rzufal8gvzi8dvqrm83pxl6pu9wttflgrsxjq5w6i8xggl6uzyehq6g3z2em2jhpy97ku5024l4gh6op69uee1a42kvairlb3zgfolvcafj1biub4w7pjnjhywu4bcj3vijmywsa8lcr70e4gk482kc9j2p882m'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'rtgzwldoelk9vx4rduescv19o018wcaf26f0mlru444o4blnr542hc4chu54o25j1bqe0g3sg7xuxerf4mraee1t4k5akoy0fv487mlpuhh0clamaz1v4lc0ychvfoszv7ae9tvfaivomnqf566e0vlipqhn35eqaxw9bjpbdigov3cbgpdzf642qx388p5he51jtwmvgxqmtjwhfpkuv0mfjeo4oinexzmxaravzrzxk6l78f4bl7yplg3uovef1nybmpv48y56c0fm04vmgczvhfevuvoetm4ym0nio2igk6ekicv25g6mkw01p0do'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'x7amhmtsudurx48l9qsms1pxhwez57k3lq0vmf5lm2m2jkyg2vo9tpjlxq1iamk0govu5vtj2pxx0ycaa1zrk2hzxh5ed5cbzj17i8z0aiebu3kf9v5okwtier7tbuq7g162122feshf93tzirl0n3ubn5k47nhd3w8gr08qs831a2tguhliabm49nif2wo3b86opsf37q6rbpoym7bmyamdcfjl3ynsx5uwdedkw9bgk8n4cele4h5z7kb13982lymkcmtmjbu1uiya19sryhl2l3ahgqprwl4r2alw7fmqjxhptp1xf0moyrbwt5jg'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'j1alj3u5ie7ps122h487ayikdncwt1m0juqfvce5pbbfek7re37o1r0nue6nizg2kt8uthq0f4xgi7hxtyrz50w2w9jydt7rhtwfmfbim0jrtnwogv44dsdh2dfcvyo98jeo2y5aq58cu0wo1ol3rgzgpj0jj9sb7h2kxwrz9kivijdluiysbaprgpjb6nl38eta7kg8r3p0cntn6zzt4ktm52sj35q3ortd7fas37u9fn73buwa0u4jp7oxsv6mx7hcj5k19z7dwngz7ku91sf2tw69ycc6b3himocamreepl8ye0sflr7ra9lqp8qxda6hyhu0f04i29lc62vh7omd4qtg0dhyst2jgg4koyoepzy84cvicpx5lp2chbz6nhz4ru29xycs4u6w4kbh9c8opa3mm3vq2uhs15shf7fhtzngm4luecrttaaexh9p2vvugob007ca6wp0gm0k1xr7nxghhpxf8f6jz9zovzsxliczhwqdawwmt7wtvzngfaotzw4tuebn47o5c7vwreeeiy2mc2a92mxwrtiunbtqxly6jq28mb36h3hy4xtuemoahkbz7losde8mrqle0v1s2g7aqfapu0mgzk35biebge2y0mum8ohwx8vfoc8lolzd1l47q0o53nulswd8kl4klwym5j2km3xh6kxf093js6uwdqzzv8dojn2qikzqy0u98ae926ywzzmpq58duxofp5pchifeyc0bplefvfmm5temzn7todnjvaxy5a7ycwsnn1h1gmhng6ywajy5b6g2v9i92xwcbh1ttgxmz9p725yseytzmbwxpfhv4317ywk74pqhzpn8194h26zqqmmaczrkzm0wa2xx3ekgjo3jmsw6boe9rv0494zd9fxpn1ele0zl3u6fnhh5mckn0srnax16qje4re2q170ihphp3pj6sjx8f2xcf12oddgori71pmdj0tshdi3c1pat02ik9od22cr17gthqudyhqts760iw8bo8786n79yjs28'
    })
    parameterValue: string;
    
    
}
