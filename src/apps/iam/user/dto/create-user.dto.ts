import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e9634594-f977-4cad-8832-177ea91e8f06'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '38c7882f-2977-4161-8fa4-5c210895680a'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2zkz6u94q25s87ps01cs5xfmc50ndmvw2b05vfjmzpey41htzcqxkderdc7805mrggrtsa082nqro0ytbvm2ge7f11e7h0qda2lutjo3r8cueh309c4vt6f6stcir8imymjxvmi5jxk1gehodka5bzrc99hmj1y0723vx7fqroodr97lxffu1d9jr9ln9zmx2xmmysnl91wwk969optmsl2x9y4ulnp02n2nab0o3qg618uku7dz8ky7adtvj7c'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'klnwz97z1vr2yv5fsb1hfxzr6l3plv18wecbgbsc1nbsb07zn5nrns7qlakq664uxq4jk8viomtc58inbtu9d94bwr4hgljj8ny4k1bvscz1hw6cui04jrqp1h7r436kagvu7l4dkhhcw03f7usjdo79hcqdsm26n1hri7hmtfb97cu1h8f0i4tdmstpg0kywiqz4a3df3ifpc42535em1mm1ybzy7n3hjlav52gzu84nivyoocn4hty54l5ym7'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : '0ugz3vnversog070egynu3ezvg0rqaeu26exp0419mcpmi5a68k9s1nmj11d0ykfqqeh4k3uygne5aaixlrmbt2mqqscfmytp06na7dwy4rqgp2k81nhirbx82eieh9uw8dxsht60oivoyxkduwys6k8i6x9911alhhsdl25fielk4ug3wzlscrhw5ld3iaz2fejgwt970uf6jiizbu78jwwuedlrk4d2y90isonun8q3schoq68an54zkopqce'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '2htmm8cwtrb90px2i3zda3h26nap8tl5l0xally3gsi78qpuflrb61dqxhdp'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : 'fa71b786-672d-4b3a-a576-2d0b2b00c810'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '8a5kbi7c79em605lxg7wh100z8gdi2v2q7wkej5pkp4kv6nc6txeefls4c6ql7705ha0oayd8s57wfwgjogm4x52vdkd04366obuj51oxh4btrrfq3dxf8nd'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : '6vn20ehcts8z6js9v9ccrnsn1h6x9nut3n4wno9422n38whir5daohp5udyqkt5z7nvnolkeuh58t5dh7avl3dkalm9dssxmgxvhl138dbpof24i9ybeao3vllll5i6ju4bvcwm4ummnj1wq35b4mwuacx5k15xbr2ymi82jg6dsqg2wxinso91yxsbfv4dmjsz5r9vmnfwcg4let84dxqp51ide5jgbcc1or9d1asfo6cjxnbjqfyliqis3lpt'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'r1ubp262q1tuz7ogsy688kaqggqqeugntjt5heln6ja4qjysj3k8p4u4q6clem6vcdgy5gyomnj1xkh8nzmt2u66hxhumoh5labp7dc968q06z8g5njiapp0orw7sj3ihuef2jk5gpdyudq089tydwyjv8ppb26y2d591kk82j5wyvm7ntxo3w811m170hvjf8w65rqeac9xvf8wxpez6f9rqou3a0vrmb2f8u454i07bw2j2839cg023eweir3'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
