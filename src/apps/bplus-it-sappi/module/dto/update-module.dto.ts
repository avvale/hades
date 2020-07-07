import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
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
        example     : 'sp90xj3q5ap4jc2f179f'
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
        example     : 'b2hghbitwz8vf2r0gdp7af42r9art5lbqcl61jzyeui75x6zobtpb1yd6pk8xpeo0jw4iwe0mp874qkayfqlej5csp0ijr7qhcyr7m2kowjkohq0oj5uxiq3e64uar347z0tqrwix6rplogwkqzx6h45lv7gkbup'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'lj6m9bbm25hgkf6ib0db69nqmi909h8kp1ngjlqdeb9zvc7mxmul4i5z1olm04p39z43t9j8jbndxauq2e1zxdcdmqhi860nijj01kel3wo8jmv6gdptmwpysvkoho7p85wl5vci0kcv34038pz92smncne321ib'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'fet35tfg317il4pq8n0l6dyobl0y5y3fhrlbrwgtp8tdxnl2gc1we06zsd2umq6lpf8uo50eys9wkeuhnbw3u04cfdgsbpjernm3nvvd2urj287rvqm5pg7ki4e5k1bes2vwk0m4anwcuboacpvteey6xjgn0fi8'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '1jfl2wx33r0ce1lozl99dymfihx1qq23r5b9ojelp684cyf94d2tbugsv3ytsi0o8amjiyczyxmhkq8fmkxg8ib1rffm1gkz1wzyhhvc91oyhvxz02c2e41bo1smgblfgomjdt25eyp77u8zxnk8kyqe1j61w4dq'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'o2hwjuzdqu4p6dc3zdn37eus3e184xsw27yic6voz6mjzsgs1w16qp4y8h643o69isehofow5b36iw7qk4crd8qu63g3dvyas7w69ua8t561lpsu4cam7zswobx4mt9t6a13bt6p1fpasx70fty802nfeaesl51r'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'p4c3851x2n9ifbi1w59ud0kg1i79gsudfjieaw4fapzu1qvepch36yzgip1bpn3u7nmcts8x6s6l6l7vwmgasp5s34nt9s9wulswqetkgz4dds8knhp6txrzykzcyu89abcpsh9ov68ov9xrzdes2756oz8f2rds'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'm6tfn3vegbontxogm2v2hsp9iuqayu7jbbqd4be7w3modyygpo6ieg1p3avdz1spo70nhthpk5bgyg6s8i3j4r8vk5hv5dug9injevnwnxmg74elvs91e4v2u2ee1ga9e1kdwvopv5zmhautv62fift7b9ro648v'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'y5gwlm9focit2fz29w1ki6md2uus0xn4c45q0sbsw3h9zwqyh3tmc7y4onum4r91uaupr29qksej911dtdg6fomdo21se7c349u94qtij7v0lumsvynb4ik667ldm5c8skp97rb0jbumpm0nrr1hdren8hvb7vq5nymrs5ufpsvjhrat9tihnnjagpficx3cjv4tdhtpct9964sjsef6ktimze9kwx0gxp0mzaxvt3f0f8ncnaaaygrdh03wj4z'
    })
    parameterGroup: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yad2a3ujqbbrzzogx4odadvbss7axqczxr7iae2pdbcdtruimmsc2mmuz6wvaxbexkxfn8qnfjrk039uppvg4sbrmza9a8plvxhlxjzc7ti1j8z3odjax7aklwu8tkf7dfrvrb45yhdt31tkxt4sb64gv9yn1cgb5cwjfo8e9hzuvbujbsb9iddrcah7a9le349ioz0xmbc11knu1tg84okn7q06majl6b8ckiaavt1z05eihxdxpxqu8e7z663m7l1f86gap1y4020z7os5ckv56tvvacgw6wtgvxf09y2g8exzetryqsyfdj0qjhd2'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '8dq2lh702r3on6l05d9pdd5ak90h9kvdthj6gyxm28dyuhcf2asxb6jxpow7hj0ft2243wryfwg56x8xa758fxxqql4jtvep93u65d1p1o4c38ay349fozihgqaax3o3s8d1ku6rs3tfqjegy6v2lgg6mm7s1fk5t722q7af7ydc2ab5ncn0f8lewev3bmlf9xolaetj0t2nnqdq15yar34see99p94jdgxsdyd3q5vmhmcpqm4sa5559ayy4vvcbig70c1bbnux48h2w7idofpwj1mqhfi8pbsmfotjs3ng0h5lqjwqmh2wroei0dqv'
    })
    parameterName: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '9drmd0pb369ssk3i9bk9gst8ji2awyh1ox885rhw86bz66kjuvans5cnwbp1ayxs6otr2nwjd9ebvroy65scz092vc91lcafog09po07bykaeogpkgzsh08bm34ub1gbzo6gk77jj2g5cj24dq4ip0gjtm8ei9onufg59n7867a0lkr3zibadgoib2148tgfc9a5u0xuhsschvakwhz461nbcj4u6k1udbrg85oqyohlo1kf59xhxhodo5l16nc638syrewxuudty42f0r76wwgl2cf16drme6nwr0if81nnutwfggiv3o44ramov8yvmnz7udh3d9tiexjvwrd3jwxaqgeg2intw2exbi2o47g6nha1cet1p2uawu1p5am08oe3fdemuv6jzukkqhpm0ki13gd7ywwrnzctnt2nk7q9uejpqdzd5l9q5li1abptvvisn4fjfasgrv9430pkjjvu2uzqpez9v0dka27dppa1ctej2sxxnd02pbb07verb9pcytsbirw523zrtg9ymf0zexbxz0wdvpimheeqz63t7qae77x50fluxdal1i9akb33tw5e947zpdls9fzx5xmq52utcv8aot17e5uzllbe9ijb4pugxfywa0efjg8ptx8ecant8sj7a0jt7yss4c8ufvbt0m664nqcdybwatlqupsl2b2los0erdol0o7ujsncll6fxefw8ux2xsjza89s0dfgyf4vy56qc4xuv1v346m2ryiy5l54b5aid78grztx6nslk4w7jeo8neop902ho063ct41d1dgrzdndqljvvf2onzx3xemhsj4obsf0fsuzjrc2kimj4i5n9tw0mxf04vrdfd9zy8ac94v5t4qds7pyuxwl6ji5b7wkwhxjk5scv0no9w9frbzbvql1zd8qh3uom7wbyzxzw8gfcosb42kre5nucb3a0gb64rvqzf1mp47b867pytn8unkpo3skj4kdp34v45n1z38fhkj2c9vty9nso14l83l13q9'
    })
    parameterValue: string;
    
}
