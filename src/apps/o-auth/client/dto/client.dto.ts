import { ApiProperty } from '@nestjs/swagger';
import { ApplicationDto } from './../../../o-auth/application/dto/application.dto';    

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3539c36f-9b8b-4570-ab78-fa96ac8f5192'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'PASSWORD',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '0d5kkvxsuaioh6v7uis961dmijwda38aj4x9mqx86q0hx0zpctvzqerstb9iot5v96tuq5yleznpg8w5u5stprooxunnnzw6zuekv9m3pxt0wto32ea31zzl6p64pbjtdqbus6n3r6kluilp38554g3hewmpvbapvoekufg12ut2xel649n7ih9aewr5pst5trd1o51nlebda6fkjm9hijx2zutafjv3i5zxbcz9rcoqjkrf99yfkzd6a3tqeqn'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'xsulpzpk2o12cl03phqbonqnoy09ngso1tg8pzis5yj6x7uweooaq9ncx9u66l41usgqude7z64fkq6fy433anef6p'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'ftq8cg8cq173adif039fg3gyofifja7hbbqzm1a48tz727swjm1dcq5kagoom2yuc107ejctu1hpvxcthsp4vcsa26grm4l3iz4zfh0d5lolbofucphbynho0t24pn0rnw6k5c70nu5w25raoj02ci9o9s4h7b8q1aod0jzwwa3vzfvem9x1xe3k89z4adx8zoh2mobt8yftfhtwxeh2kfi830s2k51u63y0j9axo5c5insplkc7w2huen67kc7jqod3ipdaf0ohi985opooyuu696spa332fjfwysqlf1wwvvhiypepei1hvjokc24sy9neeipg4zxf9k9c4po8zbqn4tqcaid0ct9pojqpocm5gdy99ib90ywb1bko7j42e87boxzzjqjzflo9adxim4nw0cbyud3a77mqd6c86ldeea110dxb2h6jljacw841102wjs78knm1ijvpb901qu6lp3o39apike2tbi4lobf00l5nwidkhpp816cdxgccxh4olexeiokdwivgu00tjpjp0vdz30p8mjbufgv8x2z0pro94qr6xbwiwk39zr69ydcapqvecsigm7d7j8l5j1jaapsh12tcip1x89bxtp628f15lcaxyvqitnfzdfg4vcvyre01bd6boc79vsakjuw2rahj7i8zhx32c5rodelvr7vsybphki15be49schr1t1ggmv1bwm55osh1hgunnqbttocjn6q3vgdy346b6ze25tobbukjq50goafk27kstxch5ncklb8zstx5e09o1dx0av8n4v61ktdqvfzts4otc2h20s9fsvx41s6hblznvy8wyswfjezdxzr554ft3hlyhzyxoswexg79a32duvfca3uhyx3g3ss07j5p5lnr7hqj6jp9to7uu12stnmgkyh05leydqznmurvuas8k0mzxu851y90ttdt2ye7mxse89t179fhpcgoxrohf11jzp603wbsbbmuergbf5iyuqfwgzlbhmgc6tm6nwoggnyao7c2ufehy4fttbk2kckdrr0009kel9j5xc2kxaufw22ojb5a2opiaa503p0q2t7zmnhktwqknb84gjdccb4n2k4lkcmos8lbj29u6l9x8unzn99lr9pg436yzl4ic1mrctdm2q8utz1hroxok1kzqss1lt36vc2veavo9skxki11wrw0mnzbodl6q75tdjh1ymfhfpki59c4jlucsh4hn1ehwn9if5v2jmks1bxegcvhv4owag1nkj4i8hr767se22ca605jg7xosey0huwxkan4ya2tp4mfn7ln5185sg5eo8hx5trm0sl9l3lcbax7yrl3in5djqf85koqqwti4m2wnnknqwrbfq1g6jq9nsa6d60ylgpppc3xqp1ia9khoil0vzfu5yayr7q1xb1icghrdf6khzi6mgb7xzp3y7rdjhj7cv8zwdqvuqjrq4rs6adt6ycgtqydkfbgyzc6qhhvuzn2lk51sbglhkrpwad08x89lz3dhx2lqodnfumiq8kugao5e80p9piefc076k8cyjyqgkgv90adl3sd7xwws0eja6w79me971kiqkh0t4vxfmyosc2vy4jbdoqyv3rswipv0to6ww4x7b95eqznj4udk1nwfnufkvwspvfsbk1o7khn6mmzag32jaazj3farajjoozyqa3pqon5vafj9b316yjsuc001q996gek78l7n5u5yw5hi9lj7ntdyi2keboadnsrxrtd2qawjx4o6nvje97eqpa19vzkhkd1rzfilut581fgvs6i07kqtkv1j0duulkgtu0n8cs638u7lqfyxru0wly99e88i08evbzp998qsc7wwug9p6er3pav9zk43ssb8ttcg70lccvownggqv1cumqtba04jk0xgqt46n6t7von0fxi4rv6zvhx9tm212mhk0a0dqcawhppxtljjc1vcfvveuns4rnsavx4b0goj4g57xhic5tlhst1qctnkyg8c90szal6jnq6925it13j5qds9b8v0o8'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'gy27lx5wvlyaozwkh7riwz3qo2xr1p7uikc4t13bt24slwsytajx6oi2043tqf2gdsz3t5bgx8gpj5y2d2xuwx266yot2yeal9mv4eht5ktjgai2ajygucw8txgddz9fkek9mthn1arttciyi7573kwg2kfk6gclexvcpfjduuo46yyj6l41r4zmy6zggj84109k6azbhbhartwqypq71h5aoyxuzcd10zxfnxxjxm04vjkl73vsqn6pa2zwv4qejvpzwxj44rfricox5t47cbaptlaydfkul2ow06cu86zmbh4z1ri3xn9glhrlkb0x8ggpsgsidl9n26q8l9mst1hipgkk7lybslekvwpv5u6cnojz3ereyx54p6ir74wps0ywa1q67t3ilct2dgxd65ue5un7tn7msorawqs3k4cm39u0iynclu9iiyqjxs3nkgku3m79bcejricyth41ajg5lhwor3tg1czv8a8m10webugr7pea0kutv5v5wrm56buihflp1h4e223pvtzothltkltn0s0x5uiuwr52f68r9mhek4ddr3oetve3prgacww0cklh7ry16ay1wugx98na4ohhv6qzb93uv27kptr0cnzgts5bdwuwe787nc9bx49l87r629owj6g9zlwjmodnxi4b82eta8v3erp8je9hlf9e8n81o2k57v3ud2jqibdx26wnsio630iddqmi1yvtotme3dkmma3y1zxl8sdrbillr0798k5yo906cgalzbm8scfhtbp5jz35ruzoezbvvsv1qu75dizhh8pdwe8wuspwqs3yq0fu00zvc1xn48u79s9vy5zslosetzs2tpri6zjyvajdg2yq53kepgdtan9lzstrgjmu1ljtnedh9o3gak9n8e0s6l3lk7klg67u15cup2bdft1q3ye5np4ecuvd4p149lfjv5b1guw7zrajiojvf5ujb8mazp10fehr61zx5z6v4q5jybdqdniwj4gep340p3egeg4v5idk3xdzrn0z0cnlst7ojgj8e1y2mgxlkgilre9tyc4pxgc2r22hk89ldausbvj4mh3u9d4roial9qfgkp9r2hieredm3g2vaxamb9loqov3ih7osb1ljyyxth2g5im0r171bsis6hov9p4nt9ta8zj985ybvqg5jq52gwzgkybxdxg4bniehuhn6wjnm46835076jemomon5lm1ie0148l295vsdcxtju56gkrbqmq0f6g6pd4ke1o8pm1mwcrjb2t04v7cnz27jaz9o15m4zqquflxg4kkg9oevrcdonk1fxxj3qpyw8r7w0z7o0ccbjsinzpqipdikmun95es4zflkr4xua4y5f6zesh3ko5k47h362kc1tnvh1nsnmewnxbgqsjiykjf7n6ytmgvf8mj17sdliqqv721g4y5yesjet4pyrquebffpzxkm08bf9f4ga1le70vyslvqiiszheje76mkazly7czfwpdaom3mdaemhp3lg9t5ue2lxiva3b98msirfle88672y2qvakbntr9h35e8dyitxgtot5lrf9hd4v9d6b413t1p7c7r6eynhnr6bvwhsrc39mxeea271oicl7b44933jl97p4zjfls05ww6mdyexvh2bthoew748744af1ps10fddqgfx9d330735frcpof2obv6vqwyzk5hexxxdzvh6d30vkintbmy0twf5ac2otfxicz0vji7nm3xkfep8xmhng6lqsb3ue2lgvcy2y34lbvji7yiov053lp1vjerznmv28jon4wd5xcv6txkqrffzyxm94swbo2nwkdvswhr5ugo2dmc4h4k3qe1yv5e0xxgtvq5tdfteqjq2mlpa7cqszh6gcrpak7rjt2kti2pclyfkasssxjf5fiywur41y9ucojqafvhu541ebzwx5o9akadbsww5d9be146ie7p4xgtp88wuig4sl780l7vekqphq6fkffvfgo7wla9bdxcwyuig4wsdmyqgfvawgxa8x5f7kdx4x'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 2249448353
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 7119483528
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [ApplicationDto],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applications: ApplicationDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-16 15:38:08'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-16 15:55:52'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 21:39:08'
    })
    deletedAt: string;
    
    
}
