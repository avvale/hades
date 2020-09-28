import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5109fd03-621e-4c9b-bfcf-b240394770f9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : 'a8ac502f-deeb-4168-934f-3d5a038e830a'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'eddbk7u9hbluf3e2ya1ew3f1vb3snt521bsuefrhb0g6kxllme46xppdwi5iup504fjujphqer0ibb8vf78i6c8wplxp7eovk3a9d7awd8e2rt3dxh47q4imggtr3z2c7zlzujrag516l0bepqrb16ahynyl2kahf19aehz9eqgvfmvftwbr125cnwal495oegmr9ue54bgd9nri1x5v5evwp62nhisn9ihobkyd1ug00nzu2t7vf02379dihdm'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'xz92tgtt2f2a2xd54no6b47ri4z1824y395jpi0tz4fqoo4j8xsr2r2jgr80ur9dm2owmizjsbwekiuvgliyxzykmtbij5uqo5r3fxlcjv5nhxf47ll2bnlig54ugbhcp6knn980xzlzwdqowzhd6nx18tqbmgty9hyybcrmktz6wk5o71t7l3mf2i7fy6ym8ulj1fpi9vdogvmwmev342s97gzwlwfrj6p2ocb0u9mderadwrpun3eszc75ra3'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'e8sgtog3zd5hb83f5mjucf5elj0hxzyvcdeaqt6ubjwg2mk7sthmfzy6llum6ihmbx21dsnfjf678jg7ne3q1bm6vctdnn0mu8ig4jo9n5m1i9ferltwnpop2h35bmdpj9ykw9khtbk35zs0bleghekirwb9sh0ikkyaz2ypt2xuhty432pwdjig3w08hgalhgbm4ihwm9atm1keepv8nr0mbmsoabxebyflyzudtq7m6y4uz87ezwht0zubbfx'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'ux4enck422703510np3dnysf5flg13wv5fby18c83ln27dz16dbqum9vml82'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : '7bb5e1e1-5d7a-4f51-97cd-6b2713dce924'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '61753vemlva3fj84luzrly30lgv6c4rnyersx58r1cci31320ydi9puw7hcni1uc9aomk43w0znsv77qtd0nlylwox6k66bffiqopbsqoi00iprqge84zf0x'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'nm7cup7zd8wxx65g23ryye0drd0c8jbloodyps7mk499epy0fbzk8rhvk3da1kyo9pik0gh0h40dhuzracb7jirc3zvqzjslizwrh0i0ygd1x716g8k1v04yyam6n5gd0gtqfm6n6cnba5j9ops02nd5umgw4lh6gxedwek45iei9oa6jh4qm79vf02uygqmdwi09zfyapxgy0lllqyy2b2w95px03ttcqunz6ntxlhocm9v2scuzfzu10veapc'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'tpmtfdqhglcy238c5dn215rgfkyt9ros6iabp5uactxnrqx8s7ulp7fl2emuxbpc26wzeqqyrjda5unh6ianb5q4im2iz9obe1agd2ksnc93mne24t33jns3m3ek2l82djglfdc6vy778lc050fl1jjw4chw69skrspm0dwin6wxp2qbg33ripzxop07l1o2ulh2e22uqtbn3ilowvrqkqiog1abw5u6y78wq1yhracl4hweuii0qahu38gy193'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
