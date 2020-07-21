import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'e7e8f251-44c8-44b2-a9c2-57c7e9d92d07'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '627f8463-f2ca-4d3e-a58c-9d915d7dc9bf'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '4656ddca-bd05-4403-9f07-e40b3f66d107'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'i8tstw7507l7vz477nlz'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelId [input here api field description]',
            example     : 'beeadc23-e9ea-4efb-8641-f0f54437148e'
        })
        channelId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelParty [input here api field description]',
            example     : 'dk8h1xnbbuaakn4mx4i7ly2wgbjmxxh8l4ugpc85937qqj86o9dj3kixgr5ver0lzvubgane8rb4tnrolqj5f7d7y1k8kh87xon08blxmjy5778e3qp8aa286dv2ewvwzxlqfy9qxoynfs0090f1movq1ayq3hsz'
        })
        channelParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelComponent [input here api field description]',
            example     : 'g8wcufhxar6r0et9ee4g9skx9gprp7s4rj540fkkte2cpclxqrdc8jdlk01kv7owav8kx8nc43mzlbxn7rfqabt4a8fpbwuptv4j0ey1gwol9ro1n5nmnv8zezqdu6hzb3cyu2k0em7flv8rxg8app0pz63dn2rt'
        })
        channelComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelName [input here api field description]',
            example     : 'uil8p3l6ekdm47gd71ta7gjrxd33fbqiu8khmcfu2u6z7bm7ei7ej4rfv6wmabbhy2g0lxvkqbkzrzswhso3wobghvjc7l4y04r5qu557yirsgi5s9surny22xknjjr9fglefcxfcl9fnkam53i25vzk953if32c'
        })
        channelName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : 'mw5gf22fvp9eck3s4mosj9wfn3b0s0mejw58dc06sunw7owomhw63t45x5cel5f3pd13rxf27i3jyxj2wluojqn627k6bxolbtmbynic1wcbc6u3movprnm2lnnegu1lwvqyfmwf3marhfpkd48pyuokx3vtxawl'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'g33jum5fh3hm0gudxklwcqxo9qsshbz6jbjhzozhfvw5yo69vpvj5yi9syg9cyj1m6m87x8x1e8fh02d8yw4vihkojbc9bjwkux4d9rhk7m14iv9t2q4i7iw1we5oas7bb7xlkmia8kuvgdle3rzb4d8uhfelgrl'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'odn23s7zi94i8bjclbomv6dyf8z0o9s723srrsxanr53p3djel0h26fyazr3xsi64cxmpas2zmj2klf8h7a5ly6n9aqxivnu4gg8qxl035yce75mgc4f0p593y1xemvfhbzm0w2xfu18q82od60lkjbvsdb80lnp'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 'e10w249uab0mdfp2pnd3hrn2lwojiys8wswbq6ql6dkgfekj06e077nqnn2mm5ld0x7cpxgourrgd32wgu7u6dqwzbzx16rajf5oe25yc72hrq024ctxc4kh0f967sug9grwrrzaq9wgzgalj4c9l3xyx2g5cksk'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterGroup [input here api field description]',
            example     : 'c4c7ix0vcyclp8le7urt8j0lyom3y7ctx4zarkkufr18d8io8w94fn4z8oljvt1ae1qqbplmsl9k0sy43vfwj9x205e9ow1y48g4cyc15ksp0go0d3jk982p6o5m9btrr4gphue3hebsg1ivzv9fca4k8q2me5o8169jq99eonytmo3sasozibsdvzq1v5pyff411bcnz5yjnq9ujieskz8dpd0yicx4fawev9y13tm3zmwfw25h4dv185mav93'
        })
        parameterGroup: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'onjan2icuyzkv542k45q11fstqxnmocy2zulzgwqkzosukr2ta69hkl37hrp6ql5pmhttoft0ly84yo0eknba61grbkz2f1fzd80kwze289h1cq4afd7z9893yfpsux38w1iitatvoqq494cec3nvbgb593hdhtqjo7mm012he8bi53dayzsld48e60pxjt6jogzszgycfcn5zhw0moynn6auau629l8qat5vh0g50crt6bpb8di9ffarukbworfcuyqrf51kqeo8j30d4hkrhkjifur7munp5k1165tca7dzr41flbzvx9c40w00ub8'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterName [input here api field description]',
            example     : 'e0cato8iwtflh9brrcav81sqkulanrzk9dudjmwyte1qq2oxforcigxwhbuk5g2x1vz17o7qzrkmvdi6taz2w0pzg46xnt4ppueye0rh7i3sbcu7wyjiqb1x2msidunscej0l1rusd7fibvlfpsdjhqkergiztbj3nmxae1tfs1mrlow97fvmspeteu9fqsvbmctfiqtxldfjw1xzh0ry75iw1o6pwavy4hpc5aog07yzk2mi35amufax9wzylsh9m0sn4rd841vfqhi1675u0we2x3hg1l3shnzlrt626qsqr5514890qeo2svq3a4h'
        })
        parameterName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterValue [input here api field description]',
            example     : '5sxks3e66bq6tza87td9nybaf4z5z9cknkwdktngti953hot8t0zjzsopckhxst0fcfefp7e8al9fgfa9h7vnrk8dud0v0130huaiyuqh08cbid9jxppnyg4g572c3hseqx45eyuety3du1gsm0gupt1jnemxb0cwdccsik1058hve3mdi5x6fvy3dxmpj73kwcgkrt1oj2ndc6bfgxq88waihyr1up1ukmgoq2r93ezrkr1fd6fe0e1fy7xvz37epy6ih1yh0bwl7bupjz6dtzrok76obcdsr8aupjty7cozp2vj3k6u3uf0qszxk02upqp8i32otvjuiobefjsh8b4rg2j5qyrug9trfocj9b46y3v6kz9i4olkwa3nrk77emyz8i3ktls2ozjvvcaa3q5yw98dw8nxlwvbj6sbyen595r35qshgcq866dwgf2zenp6s8l3qgkbocaegdyq9oaafyj9cccg6w8rj4l4ji8fwjmic42eww63zsrm9qwtx03ewkeva6qil0y68wg49l7zde19p2ttgaresy7fjob81q9ntpnkqm9wt0k3wrfr68f3mk5omnht3yy9oa804jttcpgjsjlzo36c9ffnwzu9mw1df10m1dupbozglrccilmxun6bu5sl5yfej7rtq2glh4j5aedqgrc1btwh8zso1ijxmrrl9udmm4fw89qvd3ktdp9e97p08d8l6u9vasvy6mkw1hf6hwp146qcjwuxnuio2vfotm2p6zzrx04mu7r6i2isb7ovccmai7ct8kim5y357l8u56xr3jr2eas7x3r2zdl5efzj71xo64fodromj7y7ltpwted6v77ckrt1bqeu8o4uxs5ck91hh3kva140kp1xnvmykgyvjarafxi62dobr8fjh6v1iifjlz7qdh7vsbsfhs8afgdujgohqpdrn78l6kgb4grvotefbldt1k62rauez64hea6e4pt6hh8akso69w8pil1spm4xvfz2wooox27e5rc2zjm'
        })
        parameterValue: string;
    
    
}
