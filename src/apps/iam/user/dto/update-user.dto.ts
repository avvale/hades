import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bbc14aea-623e-4df4-9efa-0de9d9231a5b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '55363e9f-d499-4070-b5e6-a28ea026fb79'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '5jgg6dpjghlxfp12xpkxmuofoub7oyiphtcu96p3fo7irsdacncqdrbzs2xrabtrl2c3oxo6k0tmhzcvmv5gp5sua0a12yau39d8l74ok3kpkni5rqg046d1b8jgtsl4amji9qvzqtx3sb9fv17gtojkb9mwgrdtx6vhws2ci53d7wrasxfv9pthmx8y8sqeo3f09xartt6xrugq39kt436mwso5nbuardje1t6l510ck74et1c84gnb8rbave0'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : '7p2w8q5arphuoovfqokdsgr4mvz0ad54v3f7lharqng94bj73mjfogbcc37jilytc9ophj1ql0w219a4v4lw0q5rbg40j852n6vdqyf0qa1ujml40njqacttgfhw3i4dcym59cvvky6vldz1wtebikzieuhpcbztyxn1i94zeb86k8qvog9ga92pdn8e1yuyvd5dhs74xrbtu3mgj5yaokzrt1hmli7lnmmvaivwwiotkmr43oe3hxcpj7be0gs'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'sjz5i82lje2afcyaavnq0ckx0ebznhp6b1rq9mtlit7sewaqaim4fs048kqovgnco3okd73s4qa85erdwzyignq983deaxv68d1e157rr7egb3bkfkh62owt'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'tcv2z6papt2inklrxyfkcse7ix9xm96cy9nhv27u7ez7ryt6cf2on6pphbar'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : '86549ec5-24b4-47ad-b0da-ea55cb64b7fa'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ac9l4df8z4kpvwb0w7kaxh2a0xolj08jlqlomky2lzexkxw2wmgxkoqjkl0l29c783dvnt605q43qpl7l8ezdpzp1pbshvpnsxtxlyxbp1i1g4zaibkub2q1'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'ii6uqbqusv5sxlsyhizvkjoprx0jmvylsxp36845lx7fny5zrybdv2osp7jc6p0gwhn59exfg316u6negvvi6xi7tdf87v0ieotjih78i4ym7uoetu4w29ma9h650rh8cjbwxkiogii5bmvfjg16217o97mtqjksm735gkncqg8a9qanji4p4r293fqalnq0wcl6kapbqeosjuiwea9iv7fa0794t5t3ezrm7270zgb798kd66tpt4v4pu6n6zg'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : 'oq9itrktl3poa0nhw14qb3lgyfnq6gkxlbhykv586ijw1o184l3nqldukakr9lkatcwn9i8old16fqsmh1oacdmv8wzbs6dnvm9wnea453zzrjj35w1m9baxm08e6hdormavubppfa238wg9p64tcdgrc710wxjslz42k5dqi4zgbws0ml3on6hvyz9mqxoqx59rjj3nspxuyr2mutm3jc4oyiup8dw98083efd8otfvi2mlv2m1cbhj7fyuo51'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
