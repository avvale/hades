import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c300a290-1bfe-4329-9384-b1626fcfece0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6a4c3e39-3938-46d8-be10-02ae6113b5a5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'afk348kdf423b6ynfotl0xu4myo1r0l2azegps5kunqddsamr7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '9m5cfr6bd66acj3clxji'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'b1279008-b3a0-4753-9fe2-11c1bd1b9613'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'qakyx5bmw1xj62tyhifrbwnh53gqof4uzdqzifpmfs3uonb8xuc0gr6lujgpd6o4w9gp82pbtiasr7a21koiz5wqzazbxfq6c9wla4f7mwne7qdijys5c4tdbmztvepeef5wvgvwvi314oqhge4vn5emuvgmz2hixixm09l22glm67gcg1smrwq1ti8ytw7zsti4nuz1bxzbkz4p88c2pbmoo0xhbq8txxowua96vm33ip2wv0fsob7xdctyt32'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lk5z0sfcl1gquiv2ntv1236sk1hxc89vc1vmkobbra8t9gp9186xdrsruiis7o94mjflmypiod67taezkxjg230jzsmkdqkzkj02rewbu9nzd945solu0zr2kcmqiy1k5hal44l6kdpxdw057k3t3d9yf6uxgvsc58vennfio1ymajifnw2egu4igdk86kzkse0qv132u2vptgnytrssnzpowp9st395n6b0r65oegtryt9fpxyhkry6oguj19w'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'cdd5ynjstob1sq22g7n039kykzrv8trnk8t1xe6qlfpx4rjt2jymlr9j2vcuzze2on90m4iggu7mxfb6qtc8qucey6izm81n3gr00a95l8yhj4wztxlonemtelvsty35wpyj9avpv3rjc7mi22qndhljoesstf2ea0v5q1tgh38kuu45dw7btv2rolaupsf25tulexgcsm2sed9unv3l8hogz37u380hnkipt98psl1invbhkdsjx16bvyavt10'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'ypankl7kd2wxyn4ly1845y1hw1q0gc7kn277i346igahigml22f9nnwyfhcghw0091l1dw3f8d59zlkzk4iexs0mb9wc8q3rzk8lhdc5jwzb2l05pstwr4ge'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'kmn71e46t30ohnc764s4seyzsysx4e7uleibpmxz9rug65ckgefizypey0kt'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '19wapku72eicvdeujir9o59vbkr011ok8wbbuxjajzxrxi7ulsnx80u8vrrgy30014dzy2j6fmmjyc3u5x4na0re2paezvy0ex4jseyttc4wuowjsmdmfyu2s1v4yg3vm4u270yxpzl18f8a8xsjyw0h2tre6b685uwz0jvjbg5s77tlvcz1t4ym8m8v5nt7v97pkuojagjodq2q7eada8gvjjmj3yrwfuzedb9r5qcgjvs95kh18p5wqgwqdah'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : false
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : false
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-23 10:20:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 14:51:08'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 11:38:47'
    })
    deletedAt: string;
    
    
}
