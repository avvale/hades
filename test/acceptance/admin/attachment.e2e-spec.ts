import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'tlovak6rurlc5xp0iwy6ptszzv09kpi8okb4ay8olbcf2tgnpjsboygtomo6lcgvt6mqnv8x6dq',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 560624,
                alt: 's20b51b81qbool68bpjph0dhmlhsp6u8djicouysv1blvj2z2ov0vk50dji2rmrbjag3bam2ydhghvv55l77q3mwah3u7xoau8q8hd9hmo4lvi00qk8xcczrwku9i3twqc67kl6ftnwn6l8i6dz7jbbr7p3ssja4dhp936xex6cpwpk1e9esgl9s9yw0eyvwuodhkyng0pea3nu7u2tpj2w2vklz7y0lrqnvck37v2d8izzwuxadk0056x61y4f',
                title: 'w9ljxtq99pqevqk0grxv0l75kh55wbd7jynn7bfw06xwlpxkjutl2gvupg06hc67a28r6v2gr1p8t7mayojyvvkz4jmaq18iy2eymupekip4zjy01muyoixm027iczy0cg91s0iimnxsey9txthiugmw1ptcaouc7gtuf267g9t4kfizaz2ydljjp8t3pirp446hmo163qqioq9vi9jazjb7aewae2g0rfi548636hgghdfku4d3iosoktmopdz',
                description: 'Nemo a iste quas necessitatibus velit facere. In quisquam placeat labore ullam neque. Laudantium et esse. Dicta in laudantium reprehenderit veniam. Qui necessitatibus nesciunt. Hic vel voluptatem tempora libero necessitatibus culpa sequi.',
                excerpt: 'Quos fugit commodi voluptatem quasi quo. Quaerat reiciendis est voluptate eius cupiditate fugiat sit sunt aspernatur. Quasi et ut expedita optio labore. Ducimus quidem veritatis necessitatibus consectetur reiciendis doloremque voluptatibus. Quos omnis et amet ducimus magni. Laudantium minus eaque magnam molestiae veritatis architecto perspiciatis quia.',
                pathname: '1a19sdsmh97syr2e3yq2cjy067p6gfmudarn43hyxs6srgnn97ps8gm7yjrgj1w9d02stpti1wqxcrcchq0to3jyvlsqqdhscfiuenqcmqrqv4op7nxm62ned912umfpvgpfq0cskxedxsiah0aqajdun5o9y03no2zituhj8id5cd9kssh3n1y1mfx9wxhbavloty4o2c709pb0sr36k0qvrhl6a0j7vlld8rs74y3wl2n97r2hp2nlmq9qx2ek1vj6rkw78icophbdqrje9k52s3a8qqp8tit8fz96oxgj076k1nushuezwxw5a72kim2ashc2nr9rimpbrut87ndwutdg1ohrdplh18ayw2p1gvdqzn8srncsfwl7yszo3h5qqsmixcteywrha8iei09hkwzns8o9gnfelvjd7af6xl3cvmwscoib5sf42lekfbnymo1253avif15gd9xfknmxraylhjpfjzwl300hmcetcrt4hbdjicxa3t3zm53v4umsivw7de1xcq68wio5h9tww1o18dax5dlfd1l0zie7o9xs2dmzofdl5ui7ipste4lmhhc69mwop77y17dh5pzv83guzarp9mzsksqslfkixt50rhxkuk7pgokkzucu93nkazyojkavsy6kbtkujgpwo0g0ssvcj8g3bxzt8ksyc3r88loxrn3ri4049rbgm6ffwbng754fhwdrfhugbv5y5dchio6mm1m04q7lh3xellpv6dwyh24ihge5hz6hdq6yjr914k2k6vcpq00ehzpqc1012l9vznvnd9bpoaom5bpjsbr4ahhoj6qk9x4nx4ke5yswq0g36nl7hei8pw5810wj5jw17oocpgxgten1agnj70ighohhga5rtib5hgg7qgnplbmtdqqsesa0eyab6ea2o96rfy7qoq3vzc9gau6cgwsiwb98n55gykel2v8mrwu6u8pxflcik9ojbu6w32ycs2nk8rmamjbcfwehk7qmydlupnjdmfxz92w',
                filename: 'q6ygrnfi1agx05mzwae6vuwe0toakwes095cpg1ifu88fkldzh569aw9nj7xg5eworh0fp6j899pidy02ml4mmtl060z7vx49bmiqv4caj4ku24jabjj2y81m26ck1ensr65d0u22caoy3fnexnhgwatrj4uh0kipqui4oyig92ezlyl3z0tibuebsnw3uvlfdmybfab7qr64ihyblw6yct9m04fn05g4z9af6wrqdhs7v2jq3g8f5ox5jv57iy',
                url: '2vsbnqpnvoougvkcxhggz2xbpc3pjpwzelt2hepe9r1mctv3o60otj6xvic1lx7wk5ef4xvnu5j77pmsi0diitynbedcvjbhcctimpl9do77aflwtlv5w12edbjam72n35rwpjgc18j1xtpmitqkqmphponokdt400yzv3nu9lzv8bx5wbaiixz747u651y7w5fpzeedy30y9uw9l0s8gngdqlrjrxcvha3oiwhft5nngwdy21eegqmz1jwdv096r8eqi2rdqxgbfnn4ar4tv64z0ncga5pv49qbr05fpg91cknm1fsph9ai8ejnoxpcptufgdy19sos45qnhjrmpxat37wj825le6cmethl2zavu95zamggnwrpp8qq1aggk1c8ia9w1k0rq6msx2qoq2qzd3m6ce81qdngzfhfk6uazs58846hjrnlbn6j4ir3odsenq2wovq0sfxxvtidosoz1gf5sh7bcf8i4gs8z1w40ceiirv3f0lq3bdq2mlofumfelvfhmrpbar7fxhbkb1wqts16j5mt4hq2v0hlajalbmeg0izmbz696812xeep2v1j4t9zj6de31l1s1x0vz5yipgowzpefu2apzt7jsu509of9um7awbkmlv87aqj1h316fjvves0o2xhxrh7cibd34fj6mxxb9z8ghfkk26v995x7v447wzkjxf0bqodebgy8vm5qo1h1ctsnn651gf1s9qj3hdnlnuh0uc3y6i8rzd7q8ekwmp5sev3tji2viequhl94salai2tz44b080bbmc1npo5v8c9jm7fl8oltqoiv79ofgfhseq9aeiaarffm0p1mnllzbhcopyox3xg80wixkl8id1xkuaq3okbar9sh9qskv70s5hxwd9gv0phx0lmfnde98kwaz8pb41nod6ujcl07yhzboqiuzlhisjru748ruo5qntfeuj4mac63rrc56a5277qt0nj3tfqbhssij4tzyl0qwverqzob57txpvf5hcl22ydv2c',
                mime: 'jv9i3ii0t095g2wxz6nuddttgtaizu4l9rhon6aoj9x120h5m4',
                extension: '6er5vlknfbqj3zjqw2vhqm44ow7l5doanmrtbyasanxivhqvsu',
                size: 5778240123,
                width: 215678,
                height: 901670,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'mdsxh2trjf859t2mgp5q1i1vlbzvai1jf2322g3r9uh3nxg8n6ikey4frsc9uoqzd203qrq2o432ps4knl33kv22vzpfn84sna3w0c3pook27tr4qyjuodfv98fp1ulwsdrqkv3y1j97v5zxmqzsvjdyctp31i2ulku5oah89eqbj94z3vnmdcrla7gsar4w81nn0u5bg7zlc5w9ql5pi3iq2gpkj6b70mv0bnmbqfiscxa549b7u6d2bzvr42m',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'vq6gyzatymdoiu0t1niayu801tc8vnyn5q482yjcy5n6qh7vduwr9789o3kbpzrk0hfbxp8ucde',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 615047,
                alt: 'np5uxrfhwqislu3lp9s53eybfsoclw1o72vrqkodegh7c004x3zy8n01sz74yqa4ts1oaj4by7eqlso8xz4ejs2wbbvkvbqfq5xgzwod5m4k3bfxyekq2c99nx7kcf9bgyy0f19wef5r3bejvdzox62xwst2rf3dqx4v1zbruvz75mmh2i57xrjkd2euwm2w24lrf233o8ih4gpjxlr23vwx87qw01ejj8lpbb6mkv2ebfb7lewuxmg51me47cu',
                title: 'lg33hx2ni6vylugftial5nub5a1mosyobvi43gowjkmwpplhmq8iyjwu0i1yz8hijc93k1ikh9vxi8l2nvz4xppqjrch84ylteg6646b8x61mjyp5jkvwn14reh1z9hxf9d132eb6s05sq8tztb0h94bhbr7qqfc1s7acuiip9prpm809bf6cybr29eranj9bstq0czi5kgvpzbmehikpyxkujxl76nk0gyr5n48w7yze02lqmkkwbuvtvp7hye',
                description: 'Corrupti aliquid tenetur reiciendis libero eveniet atque. Impedit suscipit quidem. Laudantium et qui laudantium quisquam accusamus voluptatem omnis quisquam adipisci. Veritatis totam exercitationem eaque a voluptatem velit quis voluptatem aut.',
                excerpt: 'Quam vitae totam vel aut. Modi consequatur earum explicabo dolores. Architecto saepe reprehenderit ipsa sint eos et soluta. Voluptatem accusamus reiciendis quo voluptas asperiores autem aut porro.',
                pathname: 'be8eqo22i6tf9sbuz666s5cgbzjs69o9zve2momn2fz99xbkgu4phgphuzigkalc8rsorbls906iwnzruuloozde9tu4cqi0snyfgvihijcmdzshzyt9kf69iv3ykeryzd8l45p3gztho45cnxjhpgzsc0oxdpujzvnmr8rpbg1tnsbg42gs9vrwch1h8hycgq5pjk8z3ojtjyenz8t9fx0tahvqh149g12rrnm8mwpudmgjh6stxcaled1erggpx4amg641f5o6qbpxau2v1yuzkmec2796socizvzs33oohuabv3ueawyvt5jfjecskngtgfjnbhne6hzqhl4fekazqvd8dygiy5phxb8vsze530wgv8w6njw3pwk81evncpzeyvd9497niq2dmwe1djgvwi3op2ji6odal0pviuvlz1r6821i5i9a4r2dkryzq575tlyuvgls5z6nm8ycaiyug8p3y4xng7p7d0lsuunbq3jm5x64bz4a1gjx2ejpu194abgeekzs4iav5zausgs3njwd0iyy0rru77b2vebqksa2tz7r3047o7isveds37u4sm05dkunaceh92imktx9g4zm3zkcwxbqyvovae6js5xh8rdxc0ubxr11l9wr16elsegjuq086dcp0z503d2agjgrgiuknz3yjnh5s8q33qcoou4xt2s0rvs1k1vkajxhetcp90fuclerc5zi49i79fo9651tcsib5zo5dcdcrur7uaiz37u8bisbqt0xj50p3ffpda4o6whb87a9hon8vezuzqhcfvizfedzir7tdja247c5915cbukx0fcgyn06vgwodfp9tgb7pt91q66eje6i5b0voxqehbgxzipvobd0pa5bzlthk4ukg8ia6rng8u6wdrnicraoyzsdskfb3f9ymukqvjv6fuj1q26g95h3x5jfzi095srtyz1pmne167liq25hminzdqrtqadhq8qh3ad38y3ghsa54mj2rxr3qt1mbc85d2x0uggb',
                filename: 'x0icy5i1taaqsu2zq3zfrd8hrjxbg5w6b7c7yyzkfvdu9vyg0442ansptwetic27d4gaki8wlr69q4793tkef6g52dn2zs9ikl58cphqycgzmtnnh7nxtax3mysj2q5ahvinlhmofj2q6i78yfho3pq4ruh31i8f5zddeq8wseaw9lqhukx040yy4ej5l5t1in29qooyfr4ujxdf1bpo5p8qvvmvzf905sfg2pldaqm8b2cebykfv6kxxjbe69s',
                url: 'nkpnrldyw6maxiqayuhg6wh70wzbc4xwxez3uv7ow0ixo4cist7knz3p0gc1khocubsz0w2yiofh5l9nmltxqs11xdnsszp0q1yqyp97zuuk1cg0l8jpggsg0mlt5a9km5w0ig61x21wd5otfw4p25dr9krun80u8cyx8h76yeajym532wup1t3rxnicwt8gy3mwg46zx1kkkgts0yiv4c5tlzfehewhf8exwl6na4udgc8p6a5j8u3lt68ob0qx3tu1rcjimw5ejjdiqsvfwh4789fjkwppfi3i76zlex6uuf4z20cwatc467u783jitia1c2u1svade8456ayg6xshgwb4egzqwc7nm8uwb8hyv1t3xt92s2wgvb3jz1zzm9p75xoludq5g2rhycqjs2qvgy5927z756w70u1kxq5z0ypktpnjhjtymqoaqf4l6yp22mymhyphdivi6cvzbjelyvjmmlh98o9sak1mlcoea6kg7omktiekms7q813sbc25n0b7yjtfjhgr4qaq79d08b4adne5o1p8j7t81v1gil6r3oh562fyevzgabljlc29dsm64uwrvi9erlcgsz2h6wpm8vp1nieb3gjlhsr4g6dzgu8ydksz8ninbzunvfvjekt2deyojg0ox05kp8c9qyw7lz5wi0j8yee7lb31366c7o2k81bewm2m4bdogjq61uzk23rzsxjce2kgr471sorifbmj0h6i60127kix62zahxy2rknokt1hhh2k5yyrw2djw9auz25fh152wmkrxl656ydzspfrub4h2nxy8vlnprzxruj1bvpiyigcx17l97d7411uidyuus8uhgxei0kjihwm8aymxxsz1sjsa045uisuoq9xkgz1mj823toafu3by64ao2z51ugf0th2e21n0h1x98bir2r70w3hmf08x8eldzv4tx09g4njcnt09uzd186ad7v7lqjjbc1ij9wdg4oj68fsmg96gcr35sr6e6sk51klxwpyemdu',
                mime: 'cfbjpvhiq8w5lulcsxa5gdy82ukatlmou27rf71rpceiixxfy0',
                extension: 'fuywrw2wkv3oizfm0o8x9agvvdqljh7bwtfry3t2g5g52qbo2o',
                size: 1082576049,
                width: 699138,
                height: 337396,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '316owls3re2wk7qy07uppk3gn41uowg956kbvkiup34pblmf5z9xla6iii8h17jw75c5qq6t27khi6nvi4lduhkje3hyc5jpifcsfevq7b4imd9g09vptzrffriholyjxm09yrfp4l742n6375jlkcpmhbukcqh12f7p0n73eorjrpr5bnbcx03gbjqn6qt2i404769mbtp442ftuz7bfsvavv6icn4omkmqhxe9w6piqmidpxloecqptreqfhe',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: null,
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'az804f6u309wt4h26w13pqupfluzj8bff30t6ykfixub4enuy2z82p0jxphxtk7excj1s2ryi0k',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 811517,
                alt: 'srxpplxnc91jbd6gmh3j9fjtdffz943s2u20gh628j8lvi1tpabtnslhimhhzbhrxdtgfuovuajen23jnvg74gtzpc9lf6drl4ema1ous6kl2r6pxp17xc835fuqislv3zjfobdxsj6srl10isq5ihnp49eignoerrrjxgfm0gymk7fy9hgdwsa449dp1upph2wjaevnbljwzfab9unub6nnf36phwwbp2til6mlahh8xf4xzcqjqil9h91m8km',
                title: 'uisup9rp9m1s8x0j1uh67p8h6k67bzwsqkzavucqp1eo316vzyosr1tkdthecc7xdiknf7bh05vrphnitwi2r6ax9di0sqepdewo34lctazo38f197c3yk55egvj44w29i2treyp1ewvj3d1jsedak89ododbm757jbr16ddaxd2yynzr2xrmaj93wvzhvebzljtuh0lt1ef0n4hbjji0xy57a2pklp3enzi0pzfdgqnpxgelr7qy2d13osbqhk',
                description: 'Dolor sapiente magnam in. Temporibus beatae molestiae voluptate qui vero ad et. Perspiciatis consequuntur consequatur. Natus ab ratione et dicta atque nesciunt quia.',
                excerpt: 'Assumenda aut voluptatem nobis ipsum. Quia voluptates fuga aperiam perferendis rem consequuntur cupiditate repudiandae. Ullam quis et quae voluptatem et et non voluptatem. Omnis iste voluptas omnis vel. Possimus at enim necessitatibus error commodi iste. Voluptatem aspernatur quam ratione officiis aliquid sit quibusdam tenetur facilis.',
                pathname: '4e77ukw3zkkljt5px0caqrre4grkqqpb1bamtlqbyqftbpbs5uthy99s5g69yk3vtmvuvqivmkc5gppm9f6511syucqvfjzw7o1w1bnyaslq7218fdii6hcd4ujd9mqcbexp7aotu9jgxz31458b5u26mkooigbr03p0knr529d62s9b169hetd5lcfrutxeaiz533imb31qj8ej7z0to4p1vhmxknpt9y11937v16xk18304xymmxv95s164hbcz6g8pgkavv88ywrk9ke9gt6qlchvstoglzgq45as5gbzc98vw59apgm889oxhd5150a5876g6zk8cf3778polb1pt5e5ba3u29n0jup7vytnnbfjwwd6640vxffos4o104feb8ljvhqo6v5oy5hc1093223z5pgsn1r0umom046tciir62822fb18j1pb65s2kpw5n4097klcikn2jozuqag1by87irc73lypu45db3287www8elzfmch4srkfw4ehhlecxg72ry8i26knlegz2qscu8tg6v20snizeurgw4xgsn40hnme6ra94n7msfdg585wyq9skxmoz04iousx9p6g4poh93igbmja5gdphwxrxsk2wswqlsjs8m68jdgu5js5x4pny9hz2gu9k38z9vs7hy25waiolr4tijrd2wer1zlppxb5qc1undq6wp2vgp989py6i9l68adlwtnsjtd1yjpzuuk9e2a1nh3m7hh6pfec5iljfa0ox4em2tr4qsxn6ak714cvaq9tfm9wuabjslv2e0qyoc9mrerdouy8fne6z6ec3ijvhp0bgoh98sess9gcrua7gtead7w2zbamdkzxr8xw5zgymybd3u14kz8aqzl8tnzc2e1uvglkuz2ffxed3hv4dy3ef5ocz05al04c8nk8ns1eeay4akxxfevpcycbsuty7iylhc9vwiv4vhozgx2z0qb10zcyuaweiflqpskuhkhna0rkakil23zc0n9t74si9jqahg',
                filename: '0m9saev4a6kg8lrvgcii3ftcmbyr883xa85imm30lzrs1oddw3j5wq7fw8o0d0f66w4fya5p6ii159l5m23sn8yd0gawycjntk8gqigcx30br398y71kvpx8q4p7kal5ddy70yuo3ucbybu75kgtzwsqettfjnx1bq40on5i7gx45rsxw1dae4cv71wwes1wtj5owrzxqwijthnb7g4fim2jsr6n4n9pmtz2ibzwqpznfs5dklstrfinbffacep',
                url: 'xjlcu8xo1849a5mfhc4ridqglpzrkeuzhvl7k0tki7o5riyrn1idgvlxqtt7afe4jmtn4ndak3zjzesw6dloeqirifxhcjhy3a9x99jrto9bqa1xgyrnr4coxbkw1objsr7khoz285615skqw9y06itclv6pf9cq1eu2b62qhph2wotpr1gmtwabnas2jyj0nvykg7kdslk8lztiamrd0pwkjekl2mbe9dt1z5b0n2pinn50lcv62tduy0yd98cc6c6i8ibqcxhcfyt94784azvjithwxyqy5ldel20zfp90f5qmhobs3qbesdgah62nhrledeznw7gbh5og70tk550bz542koz1b0kuct3a2uufh7g4xkd3b65yag4a2oczl822on5hrhzurgf2oyhsfi4p6vz6gfsyhdnx0fk3j3jqmbplc34s3oy8j2ubupze9ijtg0rh74smov1w4xyw06e93gxcdfydtlupphlhs8iuf1na8dxzl9l7chy7xlmyvd250u10vca422wemha5pthcuc16w84863cefh0qsh1uvhkaurk1o7dmnbu3g9vh9wfcex5e5aykswfasw85mmwyyinnr130d0l30pfkfxbiye72gbcy9cylew7qw5g85ewx7zbitkaybisgse5rbhjdhw5r90qi3qs1bnwvgk35guh12qq6mc4gc3b0wotlj5p4aevym3okq3sx2mtww5q573qmtptpsg0qfcki0nieb6gu70ao0083knv1lnznf013te49xg2e2pgfu5zqb5ozyvbulxjhrx518h9avvyix61at80yx24zo9hf1p7on6xjkwbcza72aw3lmkl75l1h8ylioixanoubf19ramcne6eare9vsk0rnrbie1pfhhlaur9ogyoeney1s4qlm1sqsd7l9gtc79pqfg42x3mqr2hh2bma032i34soi3ia5j0tq25zvm0q9d9uve8ovwyc85eb9b8tvi28qi3fpfltelx32s0q0g9c8do4w1nt',
                mime: 'see1j9gwy1sq4x3phhilakpeel3nn0reqkmfo2wq00utxw6k4p',
                extension: 'qbffbw5j9oajcqcheozk6b0zg7q4qvzp92nw2sn27fzj9nibd8',
                size: 3019656921,
                width: 321656,
                height: 697249,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'rv4onfqdrz539o9nrrykbnnhb5wraa6uwblesrcceqo10v4s0jdad9ba59bv8hllvyf0fzn4sqbrfp8wgtuyw6p9qnwg31xk1tiegr95n6seqeagmpcxyc8wwu41xxgflkclivleu8cridjxhch9o8aymuzm77s8yweqeok0uef2bqvk7mpidnjavv9y4lcyvmjd9cackqpjcajr4wibtkmn4zwb4umuuvbctrp9kt4ye3qos0y5jgl3adpptv4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'ip1rkzppwq8t2b9zfm6e1pqf7kannf424uwt7lfsutjmnrdd9tdn32hd9h9jgipy1pd1g18r6c8',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 495566,
                alt: '43gz7ffkzwnl09lcjrknd8rh9epit9zscofi8q8neudsvzxlm50svovnl64fnro51wa6bti9evtqq5gqt23ctmgpvcten3f1h3p53kp9flnus21nxgrchguvffy7hqo6xiznkj4pzlb4d3ita7hnct27ni4nxiqodmi83ghk7jt2xyl405xszpw3pf6u6jsnda17m9dv3inqb8146oobu7rna0nustxy3o9ea28v07jcig8qclqzone49sh9svs',
                title: 'v91p0u01l4jfqcywbrptfays7jhhkg4py3yajuqiqcv6renshagn2okouo62wjxrd8pvalcsm4d070vbah49nlf66ft0jzwoc7bpmn8xitxyr0pa9v4kg5z56wwt4o08994a0rzu6d0nle6u4t934k3jxr415mocgcofm369u8fnd01ssyj6ulg9il6uj7evnd36e1jjres8eanyp5vcoxz7io3o6jkbokt3l0rupkdk1h09rnvv0k8bwud6qvn',
                description: 'Asperiores est a voluptas enim exercitationem autem. Dicta sint iste. Et at eum quod dolores ut. Quia odit sequi cum quis beatae maxime. Dignissimos in occaecati velit beatae soluta dolor ut ut eum.',
                excerpt: 'Explicabo molestiae quasi est in molestias officia rerum. Animi cum eius. Tenetur voluptas exercitationem maxime qui animi ut qui est. Ex cupiditate quos. Qui quidem enim doloremque dolorum voluptatem magni expedita. Deleniti ratione minima quasi quasi quasi incidunt voluptas.',
                pathname: 'kou1lfs6oj46288apgruf4gkfhh7ropv70zmq1libz8u9fapq9wrt1xwvy4imhb1x7s650ac7wqm2xfr2p64hgmrvdc6lfza04q17tydc63gaysdjxklojtnlveky0haa5koqn4z9hc1j9yrvnlxtqi7fvuscvx8yy28hed1lyhlqktgccz15m4ri33s23ko66n6dokehd6wc640ndw8hh63l3ge22z5orj5k3m5pt3w0wwhbvu05y7ltdwaohoi866h8inwb5bcn3upzxy5e3546g739i4pr9f4rgdocos8gp2vvfjjm9c26wnhtam1b0n0fqa76c0v267gka19qbonmqexiq5rxtuj1dbsu91cktdto6atds9kkj670l7qimtyukz3uqgk0e5c6ab9jt64kljwxvrhfpybjelv71xzn6p8nmhrwrf41zte5ajm6d754729axa3jqivz4e2bjrnfektw5djt99oo72mm9gglee7b9d31yil7i1t7wkzlkhmopllxlps2tvehajpjqa5h3udm5wjnbiv4xac7645toyjwmkwcs6cyp1zlx7ml8x47jq8xboidlijbjn9g1k2wqya4khwi36vbkjo1cugriy70u0qrhmz56vdr7u0sp25m0xfupyggv1t0sq0gci43j9teav2jg4ofvef6isstkigpln55l32bxcbmuibnkwwzdqji85kzbzwwhqnjwjlyz88uqro5bkfcq52hx1mno47mh6lwnxz4f4qpkhu809ncarlgt4nrw96h7sfbg6ec5lw4ldoa0g09oz17w7mxaeeltjx7wkzniqowe81z1yfyg7gnylhj9dok3ufn5tgq4go7whelnz96gaxlmvyymdn30p2j20zmpururh4qmqaess2919qzrsfudjf4ljix9h29jc26je9n5ky23wt4z7tuzlmoapu69vethrhvtzbmo280syu8kq2sdbsb1bpjw6svfw1kd2tpjlzd20rh1haim6eevvhk4g5cy2z',
                filename: '1jodjer1kuw6bwenj8c09gzr7d0i4omx5vza8c26k5r8zci8emenq6lxjh06dponodhjjoa37fcnu3smkibx117jg9735gknxe3r5yzdvqjztnx9vug6mslrambyrudv2spdok5bxf3sdvywyu6m88exy8o436918e3n3kdeg73z9iohw9l5v4us5d77zcodalqcomn41k6a7utjnq9lvwhs8habbv44jvqfnxp8hxmpjgdkndxccfhyl2khug8',
                url: '0rax1stcqhhppm848gwf51kytzvgzrhmi8w2fb59siofjb4o8qado6q7tveu6yrx3rhu58o2rtcczeed1mtgk844sfe5fdwdgnnb4ff0ujj7xyxk5giyu7k5th00uslwu96yezdqed7ngaovciq907967tnk2gjgswcl77r956wrd7yo8d2smcu5vff0z35gfxxvwx044xq5u8uiguqieq8lf3rwvm1nc7wer6itlpfyegn2bcbvdhsnibvpjhljjo9yajyl9ezuiveqrv797yhbj8yqu2jwq5jm8x0yt8xshunvnjh9ztgkm22fnexhvvmvasikjob996vw8o1hn6ld96kzwyzh4hgiddhih84rbey4hziern0f6u4qc8epi2o7kyuwwwzi8jmkkuw11id1646kz0a3s7cl1zrty4kgkk9hgq3zeadxv3a5ry2hqzyixxpybzfe5kiuo3g3gy6i44nl052b905ageb8cegvgcuyrly5eey42jbhg50k89huiu77vg6ym8uz334c3ectpvqjoc0dj38rw2x795t54h8mr950mw16ff73n0wfon9w6e3d5xr4gjampcgscse04x96ishpp3nzj52c2t0guuy0kkk3rdjbeb7lzpd3nwarhne857bn42wkffwsi42k2u6cn3tcnlusvcrqnmn5sbdtzgzad9ib56xj36bxfoeg4ppfoaosi5rc9lsa56kmhaua8qdkg3x3iv01gxab0xem8likt2pp81wr09quwyofhh6l2vwvvnafat92m0if8dumahpwj86o36v5r0f7pfdtbz8mzwdksr9kp2rdlc1j41wox8e7edhbogb9u4grsrlbxl0jvfqmilf3ngoq1gokwhrxg4lh8owjl9xvwvekn0ngjow7b2jmxz71zod86w455h6gfsrz46lukr4ned5v3qwpaq0rdtq5s2clkednwewo2u3kou2j6xz4a5k0ghlmi7g96x0ttxkh2bz7oh8lb129dwjsc3hc3sd3',
                mime: 'ofwte9oaw9mpb5pepneaqjtz98v5jj4gf05oyapx6a1lmky1s3',
                extension: 'a0svb9nopxt30ivklrsof9m1her4ifvsl0lrg5npbxadl3zyv6',
                size: 2308374031,
                width: 902800,
                height: 327759,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'mv5no4t0m1qdoilug6qyz029p7c8zovnx38hv5dwbjhrr3o0bmwkguhvr5zprx9tfflfpk6adq893lx2rxwf8me3p4lf7u6aykgj77crdhy0h4jd9et7wx61n5v3zi8y6mgsw8d4gx4qfchbkv593wwdueenxo16vi40bcoxhxukemksyeyvhceimx71b26oj4bdt5klqmc9juhefk7rc1crahu1r1myxrxocaobdav8f35lm73fjm3zscsv4z6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: null,
                attachableModel: 'd8v9qhlie9c5x8oodrti77coemc66x375ynoqa0tecx1zclihg3zchpue1t186rzhvuwp5xmuie',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 651969,
                alt: 'k942pdzhhmsooyz07g9d2iovmcsrass7iy5vrlj9lepszzbpxrlamwa7p26oz468gjoom03qin3iqm1eglibg0ui61d6svi6lcy03ni2iqxtuwhw8m6ixrz15guc3ja52ubc92e0rrzwu4q2ck4dy2n2b6rdyopktrrk3iy2w977tuyjg2mfs718k3zu1d6sd59j6nehs54ypt44cd4xu8n5yyv1a9sn4pos2n7q9xnypgiv8ucr2r4q8ivgtwv',
                title: 'kp0x734oqyh0q6p91fcmk50jyf51zlkfv335yl1g6jpozc0i47od1elzwkdqz4o8r4q7i7qwxrctpmevz35tk1nqtvlglq1bsyxq1vvt55v8v10j2ik6474w9px505tsuby3ee45cb97qvu5ud853n6nvg00fbayjb2ufpxhxc04yln0165rt9qh23pc8itpk6ccx94i3vqc23zuw6tdlu20ksw5yr1x2ijgkszcc5z8z3swi3cgm5047m660mf',
                description: 'Ut expedita harum non ut. Aut assumenda error ut quos unde. Molestiae ut fuga aliquam beatae ad rem et consequatur.',
                excerpt: 'Harum perspiciatis nesciunt placeat sapiente eum adipisci. Voluptatem beatae ipsum esse porro deleniti iste quia voluptate. A perferendis eum accusamus saepe facere soluta. Incidunt ratione saepe dolore natus. Vel quasi rerum aut. In et illo eligendi.',
                pathname: 'fgluy2u2auhezqabl8gy7dabeficl0miqjhv08afg6d4yqeein5taz3484vmqkk6z6bhn2u1nz2jtre9tu25ufszslntrwlqgyfkvp36a7b3ouenv2pempoe0godom4udhmrx6whscch8e1mt4qae00r20c3nwrmitmfvtzx6zhwww2vabata3pnkx1pbx4em5aodl0re43j4dog9dyufqcznes4j2w4adytdjzlnaemg6v2z4aqol9z36uxxomfxj5kqvgm8dlmc70r67d4egcvesvattfjni159xcaqyc8cpeud6n851ug7pdn7u1afv6offh0e9h1g7f9qjymmpdw05sqr54vq298y921pz3rlh41z7rkjugfjc8hrycy0bok9wgnwz15zjwhd62ra5be7ms3blt390fgb8nfgpfkzxu2z96lswxfcmthjtl89wbpvb71q207u2c6224a5oj2g90qaco2hn8q4deytplfk8aksw9308sduxj3f8zyiua1fuc5peyz6lpqix2deeyeydhrgtg9zhcwaqal0fe8wrh0dlg36fgv1hegxshcb9qweyzj00ahnemw33owz217224948go7472o5u8mlqqucsnhi0i5x10fgmy4vsw8iv7v4xuyjikecd1uze7ui1rito0wt3340tg4ah16rindgd5qvmc3gbkzgpbhhl1ufv7desikzoix44nlljlvxp8foaks3llq2f3gcga8omrsl7ocvt3woiss78ox3cb4q1pkcrqmfgg3jjm10gun8riny1f5810szu795zkpf2vg1z1g75sh533fnbkcbsbukpoylkr0o3zxbmll1o4noyf62py9tkrky5ydwq23fv4vvsg9ujwz1gkgau6zoug82npaszjwxyikv0d02w05u16y0hjj1mzfqwardr9s7us1smkpp28t9i7xaocsfgzzja5evuseg4e2sl08c21njzjkln07870388bwiq5ovyt44fuvp54rfx7s7d13w3r',
                filename: '2iomhczmi1f66gdpnepwgvmkmjcxlgriu5smr8jpkam6inq8xc1mxc1jwjfzb8mxh10h7tcz4nnbkxa6c4rzq8yjvag87vxpcaieexjn4y8fo8unfe02w5bbi9bucpien73h1bn5smnw6bz6oh0p8bovkokyskk36j31oxxcu0qyph9pkltg98eq0p0dz0pr9r9cn6wbf7k1e5bkcea8dlesmxky6rtlwxya5d1w23tkf3id7mz39gwhe9c4wjf',
                url: '0l55diqevyt45cwlweldek1qkxdfx6451du88ayh16p1n7hw680llunhj27d556ydpj5l5oq0qaxka3rj48wdj84ee7xn337y0k20pxhsj1m0jnk1x7tlo1mu8its0zc8jpjccrnd85fvlt7wyguyyzkoia2z6qfw1xb1de686ja9et46wy0ormasgu4jbl2ziwwk1zixrnenavjaykwc4l14id2qp5j2in5pahbv25t70jwdrda1cyvinlrmnnhkfjzgxoksqrbi91d9g6js0unrpncukamhdvkrf4l7lvqw110crvunkym1ychrpnli2q7420792j4imtr4ifpbgyiqohrdtcqqg1bp12su6b2r93ibp2dhwicnxema9srn4f564q60c3tmok0gyyhjohudep0ta4973fnugewsz6y9amggjash6mwh5g9vp0gmhv28b298fesjgymqagy2lml8pudnhy68n633qhd6n8em8w9dwv1s36odv2ed36awdt9p9y306jmzt8wz2083nc6d0ch975nof87z1oyp2xrcil8stcakjw44nbu2zw6uzbrlp629xlapd25gfjbpkv99ox20ky6h9zm3mwwqok4syp5xc087ftlv1bbyjzpp0b7l65ez4apkwp2efrfjim928wfv1rqozzulr9zv57s3lx4kof1qd98r0nqh0vnavafpwxyo3u2vvjrckbni82w3tzjy9ga8ojj158p5ljnv0b2yw5wqzlb081bh4jh66970qktvborx7mj9gkftmg3zl4gjnjagiueaw51kk7smdak3735rjvn1y4f2j8b7gpdxoqf7io3cf9gu7uks1omqampvjc3187ajhe8uvjbztdnkwdpkpyuo2m42dkfb8arv06pzvhnzoi1ba4e0hnioplo5p2llirsnww6riuy88zn7wla9woa0hzofjsybdphts2f6cxlr16sp9i965sul30uzhexo23uuo75ujr53hwvkn874e9htvvf8vw3',
                mime: 'p0mqc1acjdjldu1inocwijg6d4ywtz99t1r8zdf8tv3e8xo280',
                extension: '74e4apl3bc7wftzfpbd36m5yk253qcb2g9epacq4y0o4q0gfn2',
                size: 5050200718,
                width: 214990,
                height: 678883,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'esfjkow9t41sjmuz0lmdrfae058ukiqy7azeemwvrv2lxk93xqmy166mq8cu4i4ot68ohx6ce0gj4zxngst4xr6hir5j23cnpiiw3l67fvl48bqzzb8h5rvw3laibf7hhs89g50c5n1kjrb1cdg5149ukrls29uwasy1fshdhmkyrvxnk543gv3slokekta73dk2jdsslz54s7a4z5yw483n2e7n5xfj9oc7anapnojm4659wxjyhcvhq3xo3sl',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                
                attachableModel: 'prq6k9upo4ulvzjtc9en9brzc7c8hxhd3gpi5z0ighnxj8qnqvo46ybbtsqyvuzn6st6izkb2wr',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 859194,
                alt: 'edh3ei0luthn9l26nty4cj2xe0ulcpwb2ic9czjxqg9rhqr54wccg82wvfairtqok4xwtcb3in131qixpws22hb6ntsusntv3gtrf6nywfmfmdiiongnudzoeknuhl5hyqs7hyklb7n879lni4p4813hbamo4st8z2h615utyt2stug4oskqbhl6d38ase6k9j1juek3vlosax4xfx71b0j6bedneht54apj52z0dqf2eaj270vrt0b9idfyu7v',
                title: 'cs10nf2r0fjucg13avyz912u357g9df9o48jhxhr86ag68iddxf7bw6b6izu9yyqtaazwfpl37w1wsjj6c8jmxt83kgplbsnvwrr4q6krt8iqslcwy36bcs7tlxu70rx3kzon1ddmdkmvsomlyjn8noix577iz7uvc3retcrq6sljhj6mn9fzac4edv5nqaro2ydrvyhezy5fj5cxp6p34kbiwweuyo357d59zzqkoy18g85kv3qtjs2mnboyyi',
                description: 'Molestias facilis occaecati maxime. Sit nulla veniam voluptate alias repellat. Repellat ducimus nobis mollitia. Dicta dolores nesciunt adipisci.',
                excerpt: 'Odit officia placeat non nam est ratione expedita. Hic deserunt adipisci distinctio aspernatur sit aut laborum occaecati. Et ea ea minus. Voluptas alias eum ad.',
                pathname: 'dcoosbkl5m91sid9ueye3eqitb3p86ygb8eebkh9tl1qcan91fuc4yus6olapqb63x26f1tl35838bnrbng6ehoqhkkhtmhh7jumtj5f8zrpwrxtasz3w5zr96by9goxe63h7v945vnht4u3aorl6cv47s1bxh7wxi9x5mbzmklvv9g0d3js0zy2qk790wu2gy294sirv06byo1zro11wmdaxw80r8xn4txnax4vg92bmrptqh6m7huthe8xwqyaldhzn2negcgot6sby64gbazj90o51xs9jdxoop6otr0pk0v1ifsv3sghxplkc9jjgru2z6tdjn0ughn8wxoea1knz2dsdyz4b9trzhhnn128sqo9krcgkckuv81k1tv3z8p5skftl0t2n2yn31s04w5l9vag8vc8jedcrnxbb7vrx2h75q7q3j8x6dvg540yr5my21blog5esa636lg2xy05hx9ifiyl120mzfrjwcdfpbit31p65kyfmq9n3u8wa0ghd4wegd6hprp28ogw5j8opjb7vugyi1s5r8p5dcu6fgeunbg8ypn0ggpi2fsc2ztb7gk6kdde57bgbc6mz43pin56gy666wcgnzglhkrki6m5zi1xcxztvqx087zkejdx1xqnhmi2wyiugd53g0r9sl0hw7mjpyb882k0gd6qlv8y0goybxynyi8d8resw4emhd6ngemxvbzmx7e32uhhaodijnjx2bruznzplb89vglo7eerrtsgwurgxrxw0wuvttwamaw1h0twggpqzyfwuk1nb3uu538hgrc9t6e7izj0wmbdqu816e6f0kpkrt20vaf38ge640plewxinr0382yeaav54j4ncq5iem82vs6ebukj9pfhcaldgpcuvatc3x964h36gllssw5a4nsp41skssp490ge13rete7dd6g74h2pg6k73eccfavbryhcizuv4shza62nxnyhapsv4h0owisn1j7n0g7xc62uz9krv4qc3coo8b0gwzjr',
                filename: 'ev7aowgg03wn6mrw4qeennba9g9pkl1voz0xe41ipcj5mbcgi72q5yzg0ldr2zi4khwsdfng0nr7hu2qv1iskxq66qgrfgvarhostw0t86zttz95t3lyghzhv9xxthq215lhdvjft2wkevdauoeje86v1oumfvsnas5fh6k0hbvhiy4zivbtfmll9nmrht1s8yvxkr2ggx5whunrmf48kxyjzuqlt5fy5no3xg20kscrbz3uu901sobu5xzetxr',
                url: 'p4rby9rin3tjrkwr6em6sxnp5figjj5iyve33rts9yfl02c3vgzfhfg48ndgcy1s6fa7gytv8t06q3tbcwde0084h1ijhuntxx7gvn5g03enhqg3pfz9s1dbcq08xayyt12e9yhjb0hjrnkgd431ocow2by6s0hs8hxh9t0y3htf0rkrzqvyhuimqvsycc3xnuon3c5b2wpbctgjon0xln2bkn4bh0bq4s99jzywlowy5bfr24ad9yord79rhpdshnoqqt8vc7i7y4qyqqfxs1eztiu736ftccydz7lij0jyjhfo7zxhydptfnqbe7a7xxhfm3okt65rgkx84m2l6joki6sfk96j4hn4ycnbbvu15gfiju2nfwo7ez9ljykdmlw4yoyjqmnecopq2ggd9w9ogs8o4koyjxgtrq09h5nr5xc1utd71oda3vekf6vzn69m866xe3ou4ug6o14zdd276joi1xyrd5gmb7hmz0euq5g1jl7v5apnarxoykvbegpvd4p9i7cy7ot97f0ihppmhozyttkhrscnoi4dlo15fzudg5t97b733b9naep37kevpspiccfv2cvhenh4jzaclo6wsda230m62wkbxwds56s5dk1u4fegs3q5ec66jgh5n3sz09f528nrdma3x5kgy8mnjjh8czu4z36qki099ovskb09dev0vbhs1berq48estqjouewpcpwrkpxi9keh0xarisos9qjgs49jiiwoks8gome9exk7ka0snb69d3ytj4106p2fnluc8h7m5bwa8fmqzwlnk89rgnjllli17yirmp9wql15mqjqmb4oo1rb1l1h32o0x0g335ud8917k9e0pin3goge9bafxiq9t48dhxunvhq8cmjy2525nj757r8401it7qqz1gnrv50h131gc9xddffw9l0wr1793cd313yupyl6hv7chyg1yceu0wddrykevzyhzope24xk0cimkeklotst2a7jaex7b4w3fi1dukn6g8jk9ld',
                mime: 'egj4t68gb7zjqgxdsrls98xp4tor7ru5lu9ilenh4p1vh0ove2',
                extension: 'jhdpkq1lgbtovf1bzopugthfw14lraffhu4u9j9oqrcct0atsl',
                size: 8144899187,
                width: 368507,
                height: 410714,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'vtu7f7ar5zcsyyai90lm35fudj7is891bqm233bmngozxt1d7phavw0uzvd00e0ng2qwbasvyso7zuqfmcnoe6ikz7gcb3edcq6xpje1drq8jy02gg33erpcargzjjdvcvkw7d8w6qw8zqo7p6ubmt1112d3qpqvj301nysdbjc7bmpmihsumaxlehik3c56rgj5m5yxtjaqi0vcers5p0cakeh0lmyf0ol7bdzea88emma3fxuwlkgo3razium',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: null,
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 759452,
                alt: 'moaphpflvmkseqbqmtah13cwbj8iatbe7dgkmuxey53ixk1bzdrmspd8fsy54ex7ris22jjd65bfuc86m2e838mwrjiaos6wd7ug4cylytotfdx5bxsyktbr0f6tsvfz5vbf7zb1s81lv43bumiuhzd1binocd92qiy9kal27qdvpkyuaunszgir8hgsg4k144e8tw1vql0ruy2ocmx7r21vttq883ov5x10sfsier8ad4l5zgd2fp4eq8oapoq',
                title: 'cy3cg1dwzyyn15qe14dvfg2ieo3ohlww61ps0isv40kisccs4b0z6lfuhtgcttyo1cq5kc9wwe1o0knqhoffmp72yxy7b7xodk64z2nkzj8thn1ow9ic9uqc5benkcpgahnqdz454z5ara16tdyfcfq09xnrpsa53ajs2ghvz62kh5j2i7w4o8e26b3i77ab2tbpxqri2oxvkr8045hm8jyk2ukkf7i5y8vgk18rex3ljw9mm2zih5xih1wzqtk',
                description: 'Commodi reiciendis aut et alias veritatis autem possimus. Perferendis in doloribus ea. Nemo quaerat nihil. Nulla est quam suscipit. Illum ex quae aliquid doloribus numquam incidunt minima deleniti. Repellat eos pariatur voluptatem ab dolorum aut.',
                excerpt: 'Illum quasi eius aut impedit. Voluptatem ut molestiae et nihil vero sit. Sint et cupiditate.',
                pathname: 'rely3ugbnhthr5x2ajtgjc91wge9e0mafs5fj4d4lnsq44ma9xi46us8k4wvpkxd15dee49qfldcwklwrevn6rgo7am438qvscd3m89ffqdff4sn7advsnx7ukv1gchmkehejn5hp48qqxdyjg13w7fkntk1ky3ic5z1wih95me6j0wc8uoug9ugzhnf4tu2v5ddn03jj42880bthdfqusimfhnbhunbyk7jf57vmd813ljbwddkityo59m843us41jmpdrc9ubhsdjxya3mmt8ijhu7wzajouoyqxes2oy3elyrfjpz1xvlgzw02skdgrrhirk4sx6fxjylquz7kno0j17q22pk6bizkoyi9l91k3c1y0xwnecspvbmd9tr6wgp8pan2g5ob9lxrhk39l8j4qrzbbgivh73ec3ubq1ooltbneif758erntpbokdnu007oxsyrmd80ie3mwl2w6lxdyc9w5hkegxfydg7al8q9ea4btvgn2i0qr8lo33w4lr4uk5yqk04gsep70wuxdeiiz22m6z6ff9cycufayn9q9e0gwdlf7pc6402o1phebhfooxgmqu0m4vrhmbz7yhvldtswfowvrl91wez1wgax7nn28e0d77k16pdxcdwcryu0yc1fwrvuasfa4u68xw649ew4ypgb0z3hlxq0ztnnvjwz5mpz8a00itrhjolvbb3cfyf9uzzy67pc4jsph5ccty4gmrfi0lzom4yhmhjal1d9nrcfmorr3q3b3d333ramimk2bgaofbjv4wkwm8oce54fda2cta3c09fj49wrnqk8tx1uma9z62thr1hq6o3tqz0ynkfqhi2yfc6mthzrky6uq5099dbutv50nc0vplx3ylitcd1x7x2gsok4uamgcgzh61xq4xeibdj07msgc3fnkycqkeat73jx9yu945ykcbecvxe6nwhz46dhxbluq720sq7sg6uc3o33okqmis0rmjkcwcm57muypbudeeu42t41u4fyxysp1d',
                filename: 'ylfjrt9gh0f086x1vfjnw3h7oopnz85hw7es15j21tcxiavlmtxscnp4auctnqya7qtjt6092f5zhwv7ip65jks6ddbnf5850ofve8vgdrw4awirv4y7j1x3udsvcqem8a4iewd563se5pv8fg3f4dtmg0imxfwd73ydtya6cxx7g5y308ip8s4j52yh7x47d1bfar405g0kge0cdai5ioigms1tfrl66mqp6cwotjd3tieg3njnlwpvlv5a5en',
                url: 'y9qonmh6pmn1wcjuii9iljq1tyy1bm22x110llukild37jl3rpr4avtcbq6yva4lrq28ovotol6htau5nzsowvllbrphjclzuo61fxo4cu28gr79gyp92ss5lp85nm8ez836k0oyw04mftli3tnr9jsq8wgycx0708rignhni2chq7cipbk4c00ubu1p2vmdqbpmsu9gi8bvs9ulf565jvcqp1zwnmuauy8v8edkhh34fdpsngadhz9470k5bj9j7yh91k01injlkf2c7qq1mfjeteytlyjcd7ftcmb6svhoe970f7igwty24dkmr5aflvz4cpcvr1a2f8mtlsn10s2ak146d7sze4qn29r2h1e92dlvusgbvzuyweyxelw1kp7xajx8s8vpymofdvcz75vmu7u993ehabwe0xetdjz1ak4lcnyac44zb40gdx9qyizxpfr3ys369akznc7ez87zx2wy8z1zuy4oqt7ijynvlx0hkyip5rgkgxsybeotj5iv64qih7uv630fgmi43kfm8xlndic8x7k5tv64ovhuwashec1e1cunsnurqivkne7c8ypfkp3je2rzsd6dc7icxeutm3s5mq35z0z5wza4teo9h229bps4d5yfplg7walpjo3ef5e5fwcg6bbyukx1k7pp45qerz9gixjjldkrio8x14q210n032jsaaodtlynhkfkq7flmikwcvjaguvz3tl5w1xa6vubapobvsh521wclcs9l9s64tiap1n7sxuzvyce4kmp21d54s3qubwrdi760c60moczg4i7tzbslo2gu597n8xuam0v93anp5ue8bx8qauom3ytj2vp8xaaevwdy02jtsn5icu0gb18fuad37mun92p5zg8ip5btgkw8py11amxt865t09sa18ec9kipmflovb0bes73dclp9u9icsuv7srb15qqok9qn8zbujkl13p65qnfeqaq211zdo6ci3r39spusiqzszhe71iju7d6hjb5r6st6p8',
                mime: '665pfcqmhsmvgrczxn5gbghjydaxbvxy4wjps1zygkvgqzikj9',
                extension: 'bmnetm91aks3gpsqw2ftkh96ino59aiwjdeljsh0yem7wz7a8o',
                size: 6110015276,
                width: 123909,
                height: 899928,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'gzs9gnuyw1au8zha00xtlsmmq3qujigdieqpcatpiirgarnstsh842amn0r1skf15fab6dr1nrysdhbwxqpweplxkrwek7orq664f4hqyfbvlwekcenqhhnhydzsin6vtfk94lnej9rm5ujy2leiipm8hvw6vm9rowv2cif22201scmo898q76g6feljzy4ud73yufhttclbc5hu0jj64f6gzuzhyf1slrbmao8knmzbyqanzd19zjec4g09bmd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 726466,
                alt: 'bzw241jliux8jbcizpfge64q03m7xfxz3852541e580ji8gmvts9knjcmtyqkzljpmc3r29z6j37sikj24sgkxzmb9rhap49oqomg2c5gkj9yvn72a7ktd03b5ixncbzn9psd24gtifyhso9lz2b2xl1qa9uksn8epahw1feokjn5th3pbawf6o5bq1qoyk09i8c5e65lgb5p517w3o8fa05zseb5098bzhbo4i1yuh3uxrzf95hhy4e73gjkez',
                title: 'z9ndpy0qsyzman43rl2vf8poi0trojgfbp4vyowx4uf0n4xvsnm0n5mycglwhq2aodn25jbydtiic6eips82z0p0m6g8cpbcdzpbpd53fffchsrb070g5gkzaqme7ytnd05yxzv90expyfy3203z4l4da7rzno8rx74rzwmwhhd20p885gafahdxhe7qqwbpcn0m1duhl7bq6dibwosyhot45p95xz9vf96d4bvyf1f6emaciy4hu2qfeo3dvuw',
                description: 'Sunt asperiores alias. Libero voluptates vitae officiis quo exercitationem expedita optio nihil. Blanditiis eum delectus. Fugiat sequi totam cupiditate facere modi pariatur quae voluptatibus. Consequatur numquam sunt nulla similique doloremque incidunt maiores.',
                excerpt: 'Adipisci perspiciatis dolorem ad a quia dicta occaecati voluptas et. Ducimus eum tempora ea consectetur. Sequi dolores consequatur minima vel impedit et doloremque non. Ab eius libero quod. Ea placeat expedita.',
                pathname: 'ecgomuvtkq8xnz8tenou5tjue0swbdhvkqldl9ehcr10lrbbm1ffc9wgk6faoonl9613kl99a3iqpwnuwt5olyl2s954lzo0e8nt529jdcu1lcmt2b5ql8s6cfzkczjxw770wiqjkegxulf26gz7otz3hpazyma9nb4klrgon0wx0sz3w7g3wp660icva16thv8oza3jp4tgija7s7fro49ft53tufw1iut30l04os7cynifsa6ir59mcfsjisr62mg1f3weou0kcj79i4jrck79ilbewc90n6p8i62v0p2uhcb5gaw5ynqz5u0xsk0rt7na3ac0txia9iaj54lxsl65ww7fdy79h5ccxxrhxinsbn3f91waywr1ibcj9nvh70cwcgrb2ttj1z4wsz0c7ijpbyyo7k3btmrrzcmzudnedrbw33f0qd99s16ovtrmvzyrabpzxrpio3ms4zmeaoay7i1xlmax0s0vjx132irmlqzjxm2ajb8vye6urey9sia6jxmtii3ls8iqwmyrptgmtkayh4rbjkvxpi4jnupjver6mofor3wgajswfrb2pjrfablr9y7210m3gspa7k4p8ab5ww3bvngdbmn4n4s8gc0jl74uihxqf36xtj7l2nup0qvy133eioztxb7vsg9wkx2x91edb9y6n0odd5nf92vridgskwk0uj57msih5u940w7gkv2uz7hchoun9g2qjyd9xaa8sv1eu5caiahlznw4n4dcv6ukoj8gvpiu5jxvpm4i6keclzu6m4zy2m2fian1jdc654shf85a8ujlybdd1q7noqwav5tz2k3ijq4f2oe2pn0uqheszutalzyqhv8yxz78w2keiuufurd8t5u398uunwkc1qqgzqdzelrt51by9lxcfu4ic60zo3rc6oftkw8ka58d6ozeemf61kzpfaxtw2h2l0bozhmsg4y7ltmk393u58c8e22kzwpv0d1hbk9knoed20992vkvaezap5a0uz1wmbt327v8',
                filename: 'xb5dcs47but589f4zzeavwhk4caxjafbwa3j40v836gwrzqhay5d00h8m0yr684m7hwa2cojazobsc01u9c7gu33lpvhkvd5rs5pcb8hq5euwxjnas0xvose25j1i1109kles7zvetim0cehpzm0gu2jfyqw3egvub2hnr6p7dso4n4hx2j3ujfenwigd5x0u0klxmrz71s74elayk3d73elr6l4i063o19nekih7dx8z3me2eqk7046uz9uhvk',
                url: 'webbwy4ea7davaph934mvpw8p31v2yvyeoylzt0o6bwcs91ch249u525ox898ue6vtghbqu06sqv00uzwymg4nfhox8wjuhijar9sjwtbvn7vk8ri6byjoxq7n0byjazspytw2prd5cp7hj91ec0zrlcguymd2c1ebkmyp9kiq68qelyn48ok94as3pbczzia6l0l9vz0m3mcgtl8kowfzsrjjs7zp0o42qeqxloordmkass6v8y5uain623j86zlbzwse9hdqqsrwwsnfe0gj4hh4x2ypg7lv92aurey5s8pk5bu4xooisfrh24g3zfs2zaw0hnsnfogwvqxt4azczn6pitmna9xr2raj4h9g8oe9jce7kpof6wl5gtfe1j2z9f9scltqvjop3g9ommkcjr0hn40fo7vanxcd7ub123kspols54decic5cinptbehs0i80e7ggkq2g25q070bjoqtg4uhoz70b1cmpnnz9xydh2ea7haghhf4u2lr3y61tyrqs1sa99f9bhc3wm7hz0q7nw9jm7kiss62j3eyltrf87pvbm0l9eihs0sduddwvydfl74m82veo2p7etjjsmtju2o6uzxwriayh1l8qfu8q2sa0878fj6x2rl454w9ttucuu5r549eawlqwatwprqp6x9odsbjornrh8y8hix5evhedfv2yzh4j8ykwnefly2d5ttep59qwj9k8b5pkvzmz372kfe2vi4e8e8p112wbwtc3qm1cafe7axlibi1mjnmev5u8z0tngrab0nfl15ulb5j07r26ex41vju8b9chk9szaph2nm1g2cplg6zqhx91b0ctyqw1arl0ggpllt57ge7x1x3l6zs5ukgq768if454pon6teaktpbvdc6vqulpi4mr024n2npnsbkbi14lgxsef06b7qfrvfllyx7r2lp5szjejamstr67000sz5xr6z77hilpr01u51bjj40ikhzks9fbfdlis5m527qng0l8s1rzfe9g4as03',
                mime: 'tt2e488qk4ppwe1vkpnbzbp0zn629nekuy5jtjndjimz7v3hme',
                extension: 'giqvn9wutiqm0orcm0kbbgsje6r4uqv8q4dlsplth6yg1g5su4',
                size: 5144147190,
                width: 239056,
                height: 594048,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'doyhl51o0ckcp7zk61bsbtwlfvz3nhngg4breocl1ig9j5abbqwep9dyqb0pvjp722ii1dczwl3cbem4krcp0adpqw8hqp6kv53irw9512wzenoqsg4gnl3wra6g760u7kaukr9ookf8dr0imlvq7n2alu9ouzcgfxmnp12habt24f3fh6kx51qx166yu3s4mb8u6y4t0t87c8gz09s99nu3dujjq7glhbx247744olr6hw5t997l3ouepzsyis',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '9e5b57g28alppzyp26ukcqoekzr6bjy6xqbpdef3j192iwpthfai6ttzd2ylcezqa5v60o6rqq7',
                attachableId: null,
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 415396,
                alt: 'zkmkuexy7fon3y4nwle5g5hcv7hyaj347bmhyj00fwdlqdlgtl0hmjzvbxzudde536oq4v7mdkeqqlkuqvxh905d6ivnzsq6351xh8es5zzjs83zl15j5l9wfdjwbnoe0pmw3m1tj07chzevsh4qmwwg5k3b5868v4r5xklfyjyl67f8gly9log5zyqmfw9waq3md9us1gubzxfnv7lhlb32u4nbsk1bp0ktdpsxklahhayf0bgs5uzaa1a426l',
                title: '9wc5y19tji6v8vqaan47pe7zagqlsteg8xbj7ha7s0e6m8rp9mgfyqia5sf7uzli8mr9fa8nszyfmwyojcjmt2vwuq4w56e90zrbpuz8gte9wv2jg0p8zpqyg3ixpd6e8tjnezw9hvinmmkpfd0vgn03fahggbxowbbexmf1d7yqy7x0i2qgtdai8pqspxugagqy2o0xqdwip073hyitvgqj7e8k7sib5eqn8sxdvx24makwdw7gn065w0mzmqi',
                description: 'Quo eum numquam quia aut aut sed minima. Amet cupiditate eum. Et quia fuga omnis incidunt nesciunt deleniti voluptatem. Qui laborum veritatis sit tenetur.',
                excerpt: 'Quam voluptas quos deleniti sed sunt. Cupiditate et incidunt nesciunt qui et sequi autem ut. Quia dolores nobis autem eos quidem. Ut excepturi asperiores ut harum voluptatum. Est qui nobis aspernatur sunt ab repellat iste consequatur debitis.',
                pathname: 'mwuao7ricginbg3h9lrn636uhsq96nhgctq3et28oel2qq2o0w0c0gt3kwf3knczpf5h89k9fqpqkpvjzngybq6zay782kxyeb072w1scclc1r6bv119fl3vrl77i9s33wlpue6f31sgkhklf4yks9qztseshvkm4n1kn5z8lrcjxu76upznmw1pafhhrvz3s86auwzaktu6wwrbxhoh9z3jkr1rsrwnz9mmehvclmhkc7jv8744iuifbmutgcm138igoxjvt8mrxh1q3fcx3pr3ae3kkplp95nbx30vv84kzk85skyvf5wa4hltvi5747p0wxebnj3osf9sxzt2adirp5na69n9vv88z32010i215mqvkgz9vyi0sk5mfnwxvc6eeublqzf0hbiw080zd3rw4siob1m56s0e71nispammebbiwyudnyblknl0jmtn5wxyxialptlzsi4fhdkqvg15btq8f8oxewjpdi4kgl967z68a3kwk495mzgi30zu90ytr2mkjrunhak7hkbjg1owm8ll82vzk078htg8g30mcudc3lxd1zjuc9qagugudkmx3w1bmkxwvhgdc1t6noysqera7rolx7t8htm3xhodd8v1farirhtbi84rpp2pzazrbkzkks5iwx02hycglbvz6m28a7am1m2af11fxgnlelkojvct8a6gw61az3mit4qvjge5ddt2hdhgl0oy6yr1jttt5g52jvumftgqm8gsxspud55egsmh2mbyaz3tn5rcl0ovn12im3qc3mg2pkt1itdhvfq00i94iyc9wdmuxc3i05mn4596xux23e83zb48prtoq90hysjqs84moe7sxw29xoa6z1wb5uux9j2mkjtuigpklvhfuuxy62t6kvomh7gv0fd92ck96kggh8zy2aaopvxeb1bzo7stfqgkq0hvokyo1zanvdnd3rfvgiyw5qse7omunxbgct0f8nvf6ie0sysw0oxb73ye7bp3a7vh53iaea6scuf4v4',
                filename: 'nm6ghx3nryul73zm6ue031hsxr1cq2qfhxuo1g8o5y0u9o29yo5ftrgbyd0116p48ok95xtmz5obccd6mt3larg64rg7gp7u0ih2mzsvdy5y6600iug3knparlsxyre951ikzn1lntywjitojox42d8q9bc7a3cfnbfa64o4hfm3jswdohi5dwlyqhc671v51cy3folkvmobz8neqbby0p9zxjqgsa4654v7e15vrbj0zhp7ysup2uw6ydild6m',
                url: '74n5k18f1w4m1y45po8maz2slde5wb1i4stxdiiued2yad0ibm48nbksiokteg49lwd8c3cgfosgmwb0d8lzehxmnbsjfz910d74173rtox3unx3kvywf7i4ai6qy2ah6pizg9017skdypf1f5sc77ftleruq3ceetm01igwyujve5uvm191qhhdbc42wovry6zjaas2unxruesrksrv30ntb2pdx9v2krenyzphippwuti5yekgibsf4q40z5oqyy8fr8rgajo4xifyywl8scpjzdk9d2recdrtbkg2vpm83jj8fxb9dh51lhq2w9rn06rifkgw9to9fxwf5ewoijcvqxxk83ak26y0qch0a07oqymlikrytt7vm1r82pdk93hyp0v1ud485ebhpsalk78i25fau63bz24671qbqkorqm431vtk9cub1ug9ft5ubuh2u6eqhobm8m8tjokhrwxkw8z61mti8zxx9g5kna2aw68086wbr5ql642cdaatal1ykg6q6215ewf0jnbp5y2hiacqvb7nonwk2xmo8vggayfvhr0pgks9g7twopudvcb7xz1zldvj4oq7w70plzyd7jnjug5dy1bcfzsmt8nhwoicfkoq8bajz00z4tyizxg6d1wyzr1khe5rrzqmbyadj65rmxx0asukb3y76vlhmtga6dw5nraex3f7k2fv3kwy6lg8za2p6lebxs2kmhly5ztya06fajwnoqjbon707irgk7tb2pdysthv5d44ham7uqcb7iy6did0mh3cwmcqnnr1iv2wvd885ev7nes2t4pr0ehn6ki2v5igvweqdsj7gw92jpwzrwzfz5ankc6ny1w0bv7zv5wyhjnco97feoh8niu3lt40crk2pk1e9ek6by08jtl2jgd1qoh30pplhzscp43dkkrafops3kh4b53rsw85caa3cx2uyxcdf7hwff24lqwjplsqrvafmsh2a5mgrou679m6o5z3csmgabc973v9y2n0tb0a8wn0',
                mime: '2snsul60ft6ektk9xklj1mf5j00d3kk8k01rqzeea4vafflxgl',
                extension: '80ehm4wx3yrgzo0mpqij8i89n83lnh2dgrhw1wn2r53ee9u8xa',
                size: 3101534295,
                width: 789445,
                height: 635101,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '9j7ilnjtin3j8zki9v4cw2kefmtcxer2s9aa8sjrwcgxssxs3hnttbo7ck32q1f7c1u1jb1g4eo7c947u24q7xgmpbdc5i8l7sbs0uycib855r6h0yrq2uvmtu29jr0qbmn5czdgy5le6zddizym7yny8ugn2jh3om1gz2misqhpihli7o2g9ispsj90j2agrmq84bio5jv5i9ejwxu7rhdskogfh98q117ptvxzdigam25vnf7bao30f9kmhh7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'xwhiykzzu4krcgh7ihvd3899hysf5gno4xamtyjfthgwtwe15rglabh94d10zgsp7zjj20mzyuh',
                
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 533513,
                alt: 't2z8o4qv87ljcjx57uh0ng8kjsatx0t14pfhhrtvi54gv1bhxsjhg8jzlo9rslahhvdw5eogemyuhtfhb3l6g6vwf7qvwuhk7yr0wvbdznb87uyszmsorw7itadavlw5m1bwbdn51vmh6iqj2ww5de95faslmqdet0f7enfmv4acvdhhnqq8grng5ro5k0atb7h858rxppi58szdjbremuomvrbw97z3qqsj2jpctsdawz6hlhxqq340prw2qo4',
                title: 'rsz9li5gd5qk49b6zjba0rn6wnkcq8yzkmsxkjv4334hkoaa2m9wl66gn3ec9cf1rab58ly7yym0li68yp9u1b5vphjf3qt2tjry8egfq6okx02vt5527gmafg3jah1xhizaynh5wamrd2hq02pbfned0phfino6x8ed3xihm295d83j87osdcrm1ugpk1zdu1un0x34h4mwvinyl8ksedhq4h8dleaaiayv38csfcwmpxyd0ruucmmwluf4n9u',
                description: 'Repudiandae temporibus fuga similique ullam. Ullam sit autem sint. Voluptatem cupiditate dolorem eos dolore voluptatum. Delectus voluptate sit ipsum voluptatem. Eos ut et alias voluptas aut voluptate repellendus pariatur perspiciatis.',
                excerpt: 'Saepe est maiores sed sapiente corrupti. Facilis iste architecto minima vero vel vel. Ad molestias iure magni deserunt est cumque qui exercitationem voluptate. Nisi sunt consequuntur itaque temporibus. Occaecati porro nulla consequatur.',
                pathname: 'q6tn8ffdyd69arxv2ddo7qw951nwpdnmxhfehcly3j5nfc00s1m256aqi55ghbdur9q8sqqdq9vy80os5nw8jokemse70hvu1ta34h8n6msb1pzq8rbin3mfy3hmgza5vkzm2m7zp51ccro2vst5k7mqouwdqcqpqiynv0k7g1yswma3y0l4nzjfb1i20m9afh0lwkt8c22ja4lypxow8y99fcvhu4pjqh938b8dw1pawyijcum235qn1zyjmrsrhr1wfi2vw52jqe40gj2wcobp6t7zya5gtbi18z7ulrvs6pu1aiju8fc2163xaae0wwedol3wn8utnii6t7c8r5m9tle33hktknj9nfb477qvcpl1txr9vw6qqgngyykw1h26n8tj6qfw79d0j91sce51s91ks6vnmbe1cjbc4kr6mdtg758yiw7dvt16x1k69qi1jhjxsqjxq2n5x2b3x9a0maybc9dzvporlneiljmdb0pidoo1n78f6pkoh5h1loj0qxnxghgjccbzmnshxko3w3md948co73abcczzr6zrltclay099bewd541fe3nmn8q8jl9rgwq88t6e30lzgm1xiejyt66c6toor4vhekwoalavzrwkietxvdm6mjr2nx757ria210225we2jhheqopen0ifw17tizr3krf8bt5a6t66n464xgivgehpepj3dcv7rmdhwymd9k343pbtf0jxi0npa5lxpnx29gwha7x4vps3fhn69k0ehn7uai54x7at22d7f8klfml9cu9pd540ce1kxq6ajykihibqkbvxcajxizl3n5uu4b313dp65zj269knz0gck9gpjz0mia3cfoa6402sp5v1oyor9fhzoycwk0drq0eejr70jlv5hslb1n82jem9vk374vvynaicdx4clxg036q9ypd0phj192evp7v7roxwpf63ggfx8o24yu5kgxt76oc1nkdwn35o0gcr4s1xb57bltg8dlilcnx2d19y1yxd6siis',
                filename: 'ovox3ky5c3enb7dgxa118vyzbsvntlt7fbmdu38weodjv8p4wqurga3c807icwevtkof5x02hfkyshqemv0ic8dwi9fu5w56tkt92j03xh6i0s5y32tlgd1hwscjh4edgi3jvw18hi7d72vx5gj26fkbgh9613x6cj9tfmovxmh4ra0sp3rqvzhet9ly2ta7pmrxh5uqofhfvepk1vxby3eogxdrzp09bttbr6k77w1kd4dt8pagjubpkgo9xmy',
                url: 'ctolmb7i7wplnzplypbz4qy4xxcnw1pvfyg7rhak8lk64gi61uez91xi1okyffxki1ki0o776ku35cgr45wwll3f6ls0aesn7mieko3fi7t254t6z9679l2jcsnno53vlmuie4n5ehw43j7f9a3hwzt97991ggxzpoyu58pl41w0i3vki93a1ufn345jo6dclorandzre7s37jxrgg3h8agqab5d3qjoy9zkzega60ggdibco8wa98tyurtpwg0dr5dslich07b9paf2ow0akt3rppmmmrcqk3pu265i2hqx21csy252asrf8t27k98cyxoqzwvzyewbgldknemmk0vwm4yr0lzie3w3z57jv14tu94mwqhjvx78rp8p7alucuq3rztmhpwbh4tgmbrb9h1umm8vwmebcof1vzf1rqjndzslwicw9u964j2x69739acqiykukk1icmglr4atjd21odo8tfad1pciftze8g1t414fvdge7ku6sg39vbrur1cpbj085vyk93axx4riy8kqm4uau2b5okt0euwgw8gvejrdhh1uno420xyfqtfehu7akz1enhzav6d2xepo5hjhva6z7s7ewmj4g55fq565x6qji1cz2w6o4xiig323of8b8vd13rbhvwofq965cm84bzrt6hkkn7iodcwv2qdnicxveevm5edehs53a5hsgegby0ge4d1jagfrpqxf13m2sok79bhcjs9xqqwgfw9njtwnka7m54jh1fl8cveuvlc7yctcqj2wwywysze2osfkxcgmih679l2smr7g6ikfomasw27mwfvofynmm78bdjyd2om77p2k9pog6b0j89d4zytj8uyjrkct8taln2cffekwhbuo07h63emq1xwixrdt6dbcekpfcfhx6soj177wvtjjll1110uz55o4tlfplmuwyf8bb6txidx27zo5fshjrgs90k0d3730ym3ssfd3c1jnmcix7ols73u6h4ko03muug0bt2z51oc7odg5',
                mime: 'lk1zzu19vnd9o8ofnwdo9o4noiizltlu4fk8e2bamrq22l8nt6',
                extension: 'buaxen6nyu4hrjfn4bfihldj5dl1mvqb2w8zbint7wgg2nxew4',
                size: 4417792508,
                width: 732079,
                height: 209959,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'oyu8vtiau02cajpduawmaylksacjxefgqvo9m5esselkofs4uxy61qx0g4dt6lek6mdvjje4w3tu4ss5m61dl3ziz0h2qufnys13vuvidaayl06si5qf12qk3k1xjtm1qay2ldws0btokvebkd299tdpekiinxqifpwfjkigv8d2u78sj3x3cuy94sbvr62w5v79yk3byv6ia3rcknrk8m8axr75z9k3jt0joixwu8955qvapdpt5swzpqw9tc2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '8io1swjaloaha1rti7czknd5z3719kyx0nxjgsz1qh5j3unfwqg7l9aoilg61ixc8z8ejdfymyc',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 648284,
                alt: 'w427qe5w838xme2u65cr4k9lxkfqy44tv6otfcsnqhpfdrowfacji68x49c66922idq3736hisd0eg0dks0xatrsidjt66q5jxzh5yloaklnlbde08zf04z4m68yrt3nfc2bxfc208qonu0gffhtcie494uwnylsq90s6wyp4gabu1413u14hd1lgfgu7lhetn0w0ht4uv63quhlz37rn7z1zxsvzil1kvlzvp4u84a0z67nzh409u1iyz1fxl3',
                title: 'zdtf280w22pxd8vs4d9qou5dd0e2m9oljyxavzrauz22ijig2vn4ydtyn70b16lz0wlklo145lw3306qjfjnj0kbzwv69afub0yvkudagn4nzq5k09r8uwhgtaowk4wbpbbkecmkqs3pgh6hukkbawti80l719myo2w4wuv8zkotv3sqbb4tal2rluxmioayy8k9tjj994n5c19tme13py2qf492gn8ulu1dtyvqvyxzpocjhi2mzsev8vbk44b',
                description: 'Et in officia non consequatur veritatis consequatur consequatur. Adipisci minima quaerat earum labore dolores quo sit. Fugiat quod perspiciatis rerum voluptatum eius magnam. Optio nihil nobis asperiores id placeat iure similique. Tenetur enim laudantium nihil aut nisi qui impedit.',
                excerpt: 'Aliquid quam molestiae possimus fuga quo repellendus. Qui quia qui autem assumenda quam asperiores nobis iure. Rerum eligendi quia tempore sint et laudantium sit quae. Reiciendis ut adipisci dolor accusamus ipsam.',
                pathname: null,
                filename: 'k238fii0b7qr0skt0ngxmx84lw1n5sl88eqo6ud04twye6csy1y49va62ed8pehcr8t38b7tm1mr98yo0kyac0fr0k7yes495kqacvpnpphhld6i1kagc3cz743isuv6hnq83ri25j6j20ccrd5xdedhf47geu2olokt7xd0myefxlrxux94huvxcaajvi5ogh7vcyek06ppn0rhvwsp8fh0sgpatls9hgv1yj54kpbalre8u2jyjuph2k674a2',
                url: 'k90e3xbqacd6emcx8s8jj5wb3lfw6jg18asa5zhz0ksdwbbye54zt3les8fhv21ot366t7kk7vxd92xq3d7ltpmo7mvnccucs7tg2k7c7xhu963098mhfue0vgpfpu5x0vpo6v0b87oww2lwcqjl2y8t0k3pbbjef6bq1krb9t9ekumerksvzjjjt1c4kj9t0miicidnrt70c6uru96ip3r2bhji3jju8c9abxhmz3lnb61gdh0h84f965yuelpd0vtw12i26e6p55hrspi0rnabds355uxgvgde0d23p0ihc3ywhzr5maxg4esz44io13dsturz7nry7fkpb11th54yx8az0b6yj14q2u2z9wa4qhm13peewmssmdgvpkpjo0m5y0gvq26zqnki0kaqv5tv8sav7hs9eds1gb8ek80xpchsyf3y8dai4qezd0pweaz5xo13qwer5c9xhstsqbeg99ja18dneo4amo49fhoteblyrizbm0gcoah8cw4r5f279v1s3f9lj8ytik842m6kbfhmybbh8fib7f4wlyoongvfm3pjmi0n7at1fz7la4pgfe6oanhaoqsujhrimbdjosa0ap3eopmgxpv36bqbf2pv0jnlcjgpb07xybvs1ipzggbruhmaw48h81t2ev1u77icdfcoghlawe0ys0qlai6912lseahxykosed4tnv2wqg4zq8ao4bkz7nf9ls916h69hjfuvxgla364pw9e4y9eju8zkzs7pokgaxzwoksi65k14entsvvs56fpjbp9yiybdsvh69w9pbzpeyqaiujrobprg8gm922l3d9ltjrcpchf32e3fn09tc64lvw5tvfateoodl6p4hr1tqocfta9yp6xroam1u3vppukqprduj4ednmmvi3ysxoxhscn62bu3vx43v5q9w91xpfwjgqm8e5mf84lv7mho3q9deqs07ta5jqpi80jmg5084my7k091dxxyoz6x7jtedljbargl02d6ltjhdt73ng4',
                mime: 'wejp1suk61njai0lpwyr0vxhe3sd7apvgh0oxjx0wa3v97qe10',
                extension: 'j2ds7wk6n4s4p4b5z3iftz5kw45l3k38qgz92oo06hf46t4m2g',
                size: 8406385186,
                width: 855922,
                height: 514379,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'pk1gdb494rfw8t1da20c3fve3hzht0luo9fa010vttuexfj5bt2wpldib5yasn1bknb4o61eownggn0t1y8ygsyvivr305po5ylwsrm8e3eevt21os4mmy6pp9lr8uz959a7u7rdo9xugxbwchp8pjb95sdpvkh20zn7mcqfj0e15r45kh86zda559ggnltm2kk3fakv94g2e1qjtvine6nowc2o2vg3waz404pcd541u6262d6c9y3v8lbedyf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'f5bls3nkgn3mix70pg6iq54hmsi4bspbqmx0idzzf7s9x8srsbefg16vcm30ou4gj571f1p0dgq',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 363546,
                alt: '0xalnyl3r7zzh0kvba72dpcies5ne4x5qpxjkx89hlr4wldg1txk4fc1e18os6h2kleqdq7i6dxuhtyzoevnwhrqsldb7p63j2wc06p5n5jcm5d3uo7iijnhfe0vpovu0b025hexjh2xg1jbmvlvo7u0q1ale2jzxtswaqtysd3fx7a9e2e3502hoxidfw2psmrcmsymkhplhpr3i5e4efrhfpdbrpmhlyedrz6d3is8wtw9qxv659zk5zbpp5a',
                title: 'mf4g4419vqf6ubs1cskm5a5cs3qdsghvnjk5o42aczkomkbbv4ilcvqwvy5uzd0umjp3q01tzj683bl38qkgeim8l3dxj1s7w53pxlqu953kwawx5nuodikgqlrgju6scza5vh1wib697chd9j1krf8bm79nfmteqvyddfsl434upjapx5wc5gchdxna5ytb10etj4zv8qa0ydayw81del7cw6noh7bl6r3yduwnk9gfnenvpv08yta78wvfcmf',
                description: 'Voluptatem nemo magni asperiores cumque itaque. Sunt provident placeat nihil assumenda. Voluptatem accusamus voluptatem tempora ipsa quis accusamus. Aut omnis sint illo consequatur.',
                excerpt: 'Saepe qui autem a et assumenda esse et commodi aut. Sed eius incidunt rerum neque quod nobis expedita saepe earum. Ducimus quis consequatur laudantium eum ut laboriosam a. Hic enim excepturi velit aut nostrum pariatur.',
                
                filename: 'mzkkbtw2o6ob2dcsw2rd69y22ihgid3gwg0kt1hnvks406tdjqg5jzcku5sei961qlhfon6wg4806nc4hwnm9jfvicf3whiktjbifoxt5p6iybrqnjhw80146jckqg4tfk4ern3pwtwjhdstlbqs55r0q0ct9g8u6mn6njpcxjmivdazjthzsdxmdhexielcgyf12aqx4t1cwn54lq8pro15uqlhj2iaes08kugbco5pxfb3i0fk9smf2byyvbo',
                url: 'z6ft8ctptnctsquhttn1tu98uodwzidi9zkg5nujm0layiuskkzuusji9bhe7f97nmjpcgvq4yfavxq9bll5v90hsaetdayynmhgnuy39vkfzu8eoi9e44669dgp8h39zfj1kr3qyvs3mst1dhhz1ebtrsusfrewk6pk85d4hrubfx40xvwbttzi4jr14qzfdmakoicy8xxeowlc97ei60027ezauataumafqg7fpnvwxbin8ahzyc0kq78yyslgy8251or120zeswa8yw3xbe9l7ijdkapa4h962edpyqa4316ch7z7d7nhmajxacxdwu5334puvycxui4bno5jr552a4v1unwmzpbm5531qdl7tzuv7sq1467u03tx7wcvxb2yc2i0ioitbk041ye24pzkfevn9ctjx9agspe06d46rk3svesubhz5ssf2j8acblas09axs43ej8e6c06x6kxld9nlcdvqhyfximpcha0mm1jxa4t3ki3vj189fz3lo3ey461zfhhopuzl8tc3rafb289mwbdntp97z48cnx5cg65ws4kgmf8aex6ku4mvz46pak0y0agdrst7we13u9woa7aond4vl96qtybcof4rxdt9z6mhbs8i2lplxa9hcwv22837c4oi85j1oaupjv4et45htx5tgtetz8wjwv8716wylmxot1fwg6tj2wf9wop5puqi8mlrr9ioow0vy3dj6s5izz0t3bnv67bt4ui475w8rzlwdq0k9yr5on8eb7fki9cjq6aan79t9l35skgfzp9kosfc77n749592lkk15oyk5i9ax0nffhly5rruvtxrw5ulf3crl9bwnfzigygqopeakd8y9unrxqd6x11evgulj9k7a5svxwb76matco98l55tqf5q3ns3nt1v3idhslyukih1atbbe9eba9881v4inkq6jvph4290js7lfsca616jh667s2klk8l3qxku6qxlhiaau4mkdmchd2o57uv9s7o3p7t4zo2t9ev',
                mime: 'it23ckq04see1xc32xkm89on38dq5vn45biq43eadhuidx3sp3',
                extension: 'bfz48xodjoiktu21qmvemg0m8tlngyvgt5fmm5k3k58ya6dqfv',
                size: 2185755380,
                width: 412030,
                height: 335376,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '6ghkjxexwdhxp3su2x73hjdi0k869kyedcbx4a2qe6k32kquhgl0wc7y7yod7jui0wcpds3183lal2s9ngpwdps6igkbhln1wk26tu3xp6yjmsw9doj6r2fugqc2lfiapo3m9gnyk89gjpt99njcgoo81t3yx7z61kxzpqr3ibdbezj2uw7su5e1ogx0u0i95zr1tr60rpg4j5je235sgzzd11sg7rfwngu0a332mdd8s359akjazgl7qx7lrq8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '8lhbdbijkn7tqqf19dnkimu7tdv16sfbzo9q971l9lrr2dwqr9qius67807zh75fgc6x8qkxn2b',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 414168,
                alt: '1uaigf2csz4u1hzuj2t58n8mnkfi6o6mf5ffpdwybs7midnjonfux28rjjcncbplw19z1i181s162l5xhjmpygqtd25kcii9x1gtyr1v1kpafy8ky0nv1yg6lpim00llx6hvvwycqvll96d1uhwd3pg1hgjad7w2rar4eqtnudz8wa59sbt06qjcdq9nma1gkbo7dmpwus84ias9vmjsgia0jkpnlxg7sc1ovh1kq8idbiz7wyff9ppg6bvck8a',
                title: '3560zq7l68mrve92vb45ltoukhu82ka0rgvpe8i44vsyxxq7kjy3iikqpu3end9i3c4iomu12bwfr591v5am01cvkhshfow1mlfg2819y8uxngt0ze62he7tjn7c4jsafe0sx7x1kzz09vq5sham4073ljqewwde1x6mu6z08kj6fx88thq4cydmh46jl7h9xhd2pz67w1bxgdnqqr3a5mnkxogrn38p4pla01qtnvvhjzynyh948zfvd8rmwr9',
                description: 'Deleniti in occaecati ea aut. Ad voluptatem deleniti. Sed aspernatur excepturi nisi labore aut at.',
                excerpt: 'Sunt quia labore perspiciatis. Accusamus voluptatem eius sit. Beatae incidunt minima et quos rerum explicabo expedita ipsa. Et et hic labore ut. Id quam magnam ad culpa voluptates repellendus. Labore fugiat omnis consequatur accusantium dolor.',
                pathname: '9cnank4z76losd6f2ln5x8pbh4t20q3dshg92cfv2vsfzb4z9llrk4env3ckocb5usf1trybupjag4w00lozjtms035yo86ukywl7vhkiabd5l2bch5lcbd8px8kr1j91yp1sp5ectrk22hv4y51zlcfowudijrth08mycd3ntwpmmg8xa437f3b3ryq01ek4ghh5pxxx3cx4pxs1n7t4t3iad4hqvo46o3yvr3p83197dhx6b1ozpz7560bpd1elkyd6dim0a0l5el4ctnhjitzmti86gmrcqbtesbxyv93i9qupf4n1sxvtnt6shp8cdeviooywi0s665mh09kcuioqxqe6qfeqgorrao3h1lgny1ocf5tw0n0zt9mnkxfirbj3l4lv92ujyx424t3o62x4gendztv21cleeqrc4dn4rlckvoo6jj67sv7ezdbd9ataajv9x4u62rogyof3k4ciyjro9qncsrsnkfkxzw76it8soypcsv10xcv9bbkizvbygve87fooljtmdckdgi991ckz0n1upw2u7rh1q0p4ylz46xlx50o12h6nf94tgw2r1by9vlya53253aw0mnnuhgcpwp5q7w5ys9xkjlatnbxccj3b1un48sczhiojomf7tw2f9lla5kdkdz7fy20kyd6eicfd9bz4iaef3ujfyzckseeoeem04y6nzrtfhhrklyeg9qmyliuzh4zeb41oi9a6psbiq4ebfwgu4yottjqu0tzaowye5szhhxgj6b8wz01n67fb5xixcffpfpw3k5b0rvuopt4lsqszusoaxmd8qu8utm47cuygbmhakkzfof1clxm37axq2lepw14vgn4s8o0b8pprc10yco9g0iik90xrx8fblq8xzp31bf1dbo27bertb6wwmmgl0lxn8cm6lsk21cctkqun3mp9p43rovlr0svzpz3342etfkru1z5nwm4c9xnd0pz2myixd2tdatq3ib65qqhzonlri9pniyzrid8bj4rqwbj',
                filename: null,
                url: 'iv5teiktvqxiobxpivqytdbe9gzqs7aky44tq0yx9h9e3wwjl8y4xt2urljs0up723ufv6m6fx6qyqat29fur9b9dxxtuz99xq6xr6p6huf0w1hg6m8bxuqmt9iuo12dqiqr7xtnvd5bhl0g5z3fuvx9rzsnsoxa9sipmasjg6oxfww9niigwk7gikra5ry1isojam19wmpb6gothg8vkcd7iv1k3x3nysgntex5jraxsxfgqjljgcavptn1arez6o7oz8oi3jpkhz81sfmbu87h3tr0yqkfov03nnw3npp1phg297a98ig6m70d31qhrwsnf51yyfrnl6p3ojl45jtcfrg1n8x23zs0ioigzxswp6t6h0h4gjz7fiaii474ft6x56mq6prkxahhg2pihgxc23ktk83ufwhu67hkyflrha26l5radki5jjjsna5l2mx5ho9v48cp8x7iqzdfjjzkmrunvrenl6a4eiqy2y897sdx8bqy7l25ceqt20uoqatdjsm2hesu9ra6pm3tq8hgx6h3msyy0jlgv7je1vig4pimlrx77i6romca41ghu7trs6t0d5arwjigmsdlkz9rqiqob7o9o6mz0dnrp6l8py4uxpj2ckf8if25d6a9dke4w7pneyos9tvn9365diy4hxzcfccz8t2zvvw69ml7pvwy401vuk9tycnzu5v40jlcvwad5z4dr5806o8g8vug1y8hwbiud8bpns5xte5y1uc83umoldbbf3znf5p0h919gzqex8xkust3jd7tvcijjqklvsj91fz44vji686o5b4sspmibmrhx1owoxpncbx8wjk3410xsotbsyrm7jjfd3znoblalswb1wkz0cal56nvn53d5v6upz0xmxqtfv8tq1gh1d4ah5n31g64mxg3mybwmbzff6d5g4jvqq71zoab4d80muo9c8gnoitsw07kpiw3w96pjt9jc7oy4rlvedfgpkqg5b6b5kh2051qzamhm7dqcfh4941oc46d',
                mime: 'jnql1ek3yedfm95zbzp0j2g1px4he4irekdaxwqkkhkc0ekt9j',
                extension: '9zea4a7n5jwc4yzi0amd6q0eakey51xh4nfxrjdae9bgcs8lof',
                size: 8802028652,
                width: 233375,
                height: 907343,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'ffnfprxzdo4tjpuhg14riohn43u9qn0wkc1mdokqc4zp8d8yr1lkx0fcfnsds861y6tdc5hoxa8iw49ia6lwlruz4w8b7bv9nqmgecvf4nzf1hfbdym0m69m0imi7bh0mwn6h789div3x7bpxk9arj4uxg4ql46ltuh6nhhyeem1xm23dsnnc2x7y8v7d9yibww3tdk7qahwalsgq4mp7ugdzy6ryostirvl1rj7bshy2ww90bgr5jcccfhe5io',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'iituiv5iqagwxd0w12bvutr5o6lrjcbxzm2vsrgef9g7rk0ozpvuzu5ln9tkijp31yyy3fu32h7',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 566094,
                alt: 'b66p7uhrwj8jbmh107x1xoj36pnsbx28bm2gfwzgza79ckz5olbtohfix3a7zvs932myqmdasngnpfvypj9jjady0r6je5ssce33mg56dowwhkk2rrgh48y1xqtz7aki1ytku5ullaxksaybjvabilg5zk9l68g54wsb5exluyrt37x872zdjjez2xn14m2qhf2ee438hu2bc2z1wd1ql0fi5jfagddriehoxl0buzlach4enmbhmj20ux4780i',
                title: 'fz7rzrnf51fmpknuj3hp35wh0s1ua6uvodh4jkuri8tfua4ugg1el9gase6948jrhnel5e6ppnjqgl0yn3jdnk9hbuwpbferc4gyzjnowq3iuo3ve682u86n8tdcf5di9rq9ne6obnkjlhvt89gth81a23k471q361w6imig63rsnn3hm3l1wl2wzvlftxkef7gr5fz2qfjzk6g8ovfss0dysfzb4o6g4xos6geb2o211rko0bdrvkzsl9ydwbb',
                description: 'Aut unde eius tempora et incidunt eligendi earum provident. Voluptas deleniti similique. Consequatur eum qui consequatur sed dolorum quis.',
                excerpt: 'Voluptatum explicabo quis aut. Necessitatibus voluptas in blanditiis quasi vitae aliquid est et. Cum omnis eum. Dignissimos qui omnis et et hic aut enim adipisci. Eligendi occaecati et consectetur dicta eius exercitationem deleniti quis consequatur. Sunt et commodi similique vero quam ut aut.',
                pathname: 'qb6o0qbqhda3rmy16x9vrcsyaxgbjgjajaaciolr4t3kwql4hyt982dxi2frj84vbs6w08mzdayhx09c7eq0nq9ggz8v0emdbz4bjn21nw64twf2dk3u4lwtyrff8365etk5sth9xy2ho2peza545tc61lpgczaym49wzrmyelotrbufh9yv25k0l9adfwkl1678hib4h92ul76c2761sgosw8t5wn8vei6a8jor7knhpr22htyw1x66t1yi3m987yabye58qfu2uqsx0hlzr9ezl4i5t6k0z65wma99x3josfa2ezye7l9biwnneyzhn3pyosmmjxiy9jf7p4pz94hqtq8e47371dmrgdsxanci6uwz73c7bfpnlshpjantxx1poc8r36rb62cjyrnsyi5ixo2l46c1gt2n5kdqva8tcu8kz912pdhq20oshk5tcd66gnme7l1y7uz3kt0kxgw1c734pehy8eo6dol8d3illxi8ttxood56syuljwn963anf8bunupwn13zetmrfl4c2g7wchpv4r2zs0vb4d84pzmawop0bmaft3sno1z9txvhqo1kp7grypumj32wi838jnfo25rymjdescdkufsf4nmauzqn0au908x6n0gqar5uspe3oi0rlutdmqw89ywka2q7ptixjsjla9uar9peopa5rgjt1ynkiupteyowtzdv60qettteg4clu982mok671qtpd0xpvobm7znhieibn9dfs4qqewb1pugv7it1u49gby1hlst9psnedmbloeuqdm48tg7jx4vdnec1lef053bzjygn63pf5czey4g5oqaxcdj5t74ozaf6ok2fofcg3ikt8xei5fc574lkmpcf023qxu6ttu6y2vyykxsk3vapncmgsn06uq05z8n0jvcxnh1g1havmy4fp55v3pw0fclul2vp1r0rurtnq0njx621ygfcmxry92dcjfnq35q6r9p3yn80w71yjetzck731zogzbbydkjtxx2d42a',
                
                url: 'uf2lbkqksrir89ejz9dund56a9t953x0509buw4v4n6obfxycg2qzjxe53f648gz79gpjybra3fbopwu7km1ycjam97bhrq7tivvj1hms3u8zaix9qgrshaf01gl1x8oi9wcal5cyy6u3t3hja5tnskd487gfzzyqsbi8u0xxaxv7d1r85u655pa5ov66trtmvgscv706mk32lnifzexfeaau2qgm2gpm36a7kkkfnq5kvd0cjtxhoc5ha4d08s8u4dyuuvd5o5o7hpyv75ziuhwgec6knn2aeydoeqo032pkowy61nxau0ua82clq2tah3tml6kn7nansli84bcxhhj1k8w9dc318mj4q9z6pjc1er5s62lql9q2iegc5daq6qv1gnrbfwrhh6csx3u32orodwyxqnr7p9hz8tvifndy7uhrdpvbi3wvs1wp73ekfsb59x6i7nern0ysj72z7ol34xhyj1k7hxq2p3o5ff4scd2bjgnrn6adswiv323n1dfb1jf53jsae7nryi2iknlr07pbamwrwieadfeh59s21bqixd7korwe7r1lt677l7m6a8jp7l2a5uu5by7u6t53pulrz61qxb3wl5npllme2jpmvyq4z3aeinehcictzw8l8ztj388t8eh3dcvnerkmaksfn8gwk748q1cgxjnbxz7pshergkgaf1dkpmsyd4qgq0ll1fa2wi56h2s59tecucde2uq8dch10v3sm3hkw2zjx2qszdncofe31junxf3e2a4xq4ivmkr7u2v1wn5leq4qm75gsa42ihmh88dsmdqn8t5mx6ee469sysksgsp5t5u2xk6th7e8qacciie3qfkpf7wznoratntfrdd5w5w825sp1zf87lexxmwht7f1x99boyghfl9asy4wbu067s8f9cfois434ua1mwozbp6c62b0vznpv4capx7ziottg3rkggiee18b3iudl43deytzda1tgbpd2i5cl1k5iyo6ikn6heg4osiczrc',
                mime: '6eekh7hllh25fl6bqo998yk9pwg4cqy8os8wskwllo7cffhm77',
                extension: '5its858javc1xm5fgguebdztr7ydpl67ie6pqjm0bw57pkfkng',
                size: 5991921344,
                width: 763662,
                height: 550835,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'dtxq636c05pi2ab647zl6rk5u1z9qfoe5m2zjc43yk44u25bcpojx1z1suoyx7cmr3wuwmo9wew4vc2iygit8pdd6f7sjjuoa0nehz1cygt4m5vidpvesjbljvkbau3mfhpy4d0rhax261uhvoafufhniwp00vortnno91s5fmqrz0xzvbk92kfzyqmnvp493tu4ftjrkrbb2vkik6di9cv2hnc8kh4dvmns9r0xok4gvyj3ukal8i7oj6jr1cb',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '0i7zbreqxrctuz0p2vv5h891oe83ppy02qcpkiayumholur5ehz9khcb3k7usal56ikin4r5dmk',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 464554,
                alt: 'dn8xe85po0m17oudq7covpu81jmeh0ifsdk7d3j3efo3a2i0fxqcr9d3huxr27ienv8nwdphzliuaaznlo6wvcc08wvnwpri0vnkw84dqvkxsy81akzlns2dnfy66834t1k1ajrl9uisauf4pv67x3r468z4m2ahy4in7ecyjd4igpzs8ivtl9d04ti9wgd6je8oibqs7kz5fddz8lrq8buz3sbd279cgalsy5s6cc6rb3jlyi7j8rur16rojhr',
                title: '3zn6lhjvhpgwo2slghoastay3ndr9hkis9811d7qmhek1997wzlqa3o303ww59o7d9vme4xavg2ehy35wdtmjj4hzxjatb7io8d1imhvtbn6mc3g985qrfe48fwofhm706aho1fby4xonsx96qw8aqjhq2png5fdjky4iv3mtkg6qh8a6z5at5b2h3j5ue8w8eqir08gb6tnghar8zbh3imlkiwyhyjy6j3nnt4x9gpky0sq2hhgztbii4hl74e',
                description: 'Inventore rerum qui. Ut quas eligendi id dolores. Maxime quae dolores voluptas ut. Quibusdam voluptas unde.',
                excerpt: 'Et tempora dolorum et. Occaecati et natus dolores iure id necessitatibus. Repellat dolores enim itaque fugiat rerum amet. Beatae fugiat amet iure molestias corporis quam sit dolor in.',
                pathname: 'wggbpzcg37tj3cn9xwml2fumjf06lq6pb0mpq0akaccx7ebqwtodnzj2ml43pv19yw7nid8taf62tokkqybl5u18moa28ezlu8ij532hs5ndw8fylebmf37g4q642mqqdd4irvgavqnp9ohgrds93qziall8o9tsjcilw344cczg5frz8khfw6kw7fs795uhamyh95s9uw4c0jp0vwk2dm185rxp60sblrptnernbe4zn216w54e951044uq9x6vn5jj86hztpjnt001hckivxek0qwvk0ykquwb1cilcxsxi495pvp77xx9bdhdt7cxquxve6y20ge0y4n4iquzh9h7qcpjbctlb2luijk1tir58d3972wb3jyr73ueqqs7ggg3dka4cmx42k3evqk5coyrnqmd1uy3h9caciqfbellyze407cwz1z5smqfj4xlk9rr4zo7fq4bbkl3sy9ymz7h67rcaqcxl0l5u6d2l6v8ge5dhm3q523zs6xqs4wvbgoidb8w02ykvrxrhpo5rvk7goubhxqm59c8gy2my65chg8vr8wxjckiuyanilhi22onxpdk0i41jeg14tgcnno6przs3z0l1ud6o05cfqyx6cmro7w179g8mosr2k3fbhcolvfli1m6vo4pydcrlubi44jcpwwznohtbt6hxm3yd010azgswhnuaiuhso1b7j6nrv5tcwj46jeh5qhb366l92jr4jzuutm7fi3t1r6ao3mi1jrlt9830jtwgj69pmhpmn1yagvd5ss97s9x7vzfugikm9grmhkw96q33djk5pf0q8qju4jtjhyaly5erofj1r3d8eb8dkj66wur3c5h256q8pc9h4io6bzea31klucdgqrmb4vv5esecc9mzd9d6krgvadcdpj59gforqrj17nmipfvc958y309dnvho2q6zps2b2xz85ubs1bjeqaj3j0fm3x5b4inr76nploimy2k55it1kz1v7y74x61zhvu2rjn7cq0so9qgfkz',
                filename: 'h1jx2727g3sbg8hkaraom5slio6xvgs5i5mjhlyhw8642xmox6gdd4a0b58ktz34eql8zljr3jcxztjvgq53cmfsmefoone7w0ljamjtagvc60d6mxaildfecl2nv8bd1m8b4gzo9dyf7vfmgy8swati6q65xa2egx0zrgczoa13k200d4sukfx5aaffxtg9ptgjtw0ur4uo3h3d83qtupym1iv2e8de31ekbd0qkx76p6adfw0uyj62od2z6uo',
                url: null,
                mime: 'lkp7ktzieppm9m6wh8832l98rqexecjneu0j9i5jr7vga1y851',
                extension: '3ixsknd74vx5smtfwjzk62embvy7stp816xkrzltcuk7j5pxfr',
                size: 9347296283,
                width: 413014,
                height: 100945,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'oj8r31n28gf6l0bmjoltmmhkut47jtskdfs20fhsshj1u8ib6xk9z6uitykyc2mlpsmlixtrxgnj5h8b54cvy9yckfb9esabwemvsvp5190s7irgx67p34qzd1d5z1dhtgql6u3ro1ekevwr3vb85nmqkqlvly7red4pp37ecvx3te04v1tz7htq0jsx1ahn2cz124dijdlq3fwftlchzwwomcwum5w4a7y432baa6xyxeprbbaz9xqhqqwve6j',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '89ka30sogosesukighmm8w8rhdxhm2our9nf9jau6i9yppaabadr740jugc10q977n9tm264kl6',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 144304,
                alt: 'efzx86xprvx6z6kjmqbpfwwag4uq69he4pq9l8gw42rflq8meeko8voaif567hxbxou0xmisl5f7wmljd7srdnta7r07z2k3tuv4bjqeo0b5l679ni0jmcjq16eyl62s274fza8f6g7vhh0zv57hocd1g7psw4byth3wevrvoa7srb9guzszzgkjme0gyykzlq7a4jbvurczb6decem1eji5okwmno9yweb7zwligl4pso5qriqkgbsg3ovw1gd',
                title: 'ndj0cz9fmzkhct5l7aforaqvm3y9dff0azudq76o4h7cyjie6tkxnvp4it4y0vtzvqwmnqword7jcupy7dgz5mu5qrhmfzxruw4upjpaw1xepzgmr3wxmyy7i248ct3udoaxkro0zpguk85y89q8j8stmsfnqvlq32okeshfmg7wle7hgwvgq0i5efhfu4ng2jqm8nll73g8uog968vx53behnatupn09e05htvwb5coy49zcvz7cx58uebqsx3',
                description: 'Nulla tempore provident pariatur. Iste vel at optio minima tempora culpa quia architecto. Ab voluptate explicabo expedita deleniti adipisci dolores hic voluptatum. Non amet dolorem.',
                excerpt: 'Perspiciatis autem ad molestiae aut rem eveniet corrupti. Unde et et dolore sit. Voluptatem molestiae soluta quibusdam suscipit ducimus quam. Et quia quia quod soluta similique est et. Nihil dignissimos voluptatem distinctio neque qui. Optio delectus nisi odio repudiandae eos.',
                pathname: 'ys88vsnpcn6l5zp8fuw25ttcctyj8v8f2qm8auf0uavhjpgnet4gh9z7wx7369rtgfisgya63kdcyx4cqx6noq0vtuz6886n3ia0jaaeggawcje61t5pdggchulcjcvm1fbgbh14xaef9q6lm6zigyi57ynvpx64khwx6sgnzcnvsyaeiv0l3bar599ktafqr3cvj7764qsqpmybmd449rehgquu6a2ei6xa6lpsfw18e2oe9ydafh4yxwg67n7nqkp6a7n406a8tvdnm39n2603vu7dnqcdbnrqsnd8xym100xgswcgu2zt5ow2c2iaspht240c5ubwjho53wk9eix481o24ypbgsupzobfiwwhwppoqsmu8zrob96qonj3p67vx1qihrpjmbpyxwop4b2bw7jp5mj3wp7pb7mg0rtryiiin7x03ihiudjc9udrltv0s7969cyfhkyl8s6my5ojcxvhj1wn1l1k24eri3s94x8oaz1mms9m3pf7xr7cuagsmbf833pc0s80f5z3mk6i2pp1rq51cqimi84srdfgjnwe88lqson1elvs1p0qynqpzpuv780fepefzv4cyis2qg9nom2uf8bj3wuzatmz1wu3meu8irqvsw90pvtwr6dn0ov4bbcteuhjd83tqwrqol1ar78z56h9p9dv42wmhbqokzxajq1vxtu6vzf852t7eibvahj8uwdajvfgekugp2vwk4z3g2ulq8f56lm6etcve3clybiht592nhihwg762a40wvej7f5cnzyssdgfbc5sk2ypjjrt9jc1u563f18fur0yv05cpp6wxw78hao0qrqdafie5mk8n0c1irs7zla8bc71vngdpuctv584xqdce408diua1ylzvmigbd77v9naf6jllxapjv6xvppo9koihhzyr9a199k7b55st88j1eudmrkreh9kt1a1v5iis6saaug8lovumey07pgh7j3ycc79ptu4dqu0zij5m5oage09f2vd8ydfs55b',
                filename: 'io7co82xjqqfhntftrs8jjptcg7e1tf7wuwfdd7f2d321gfymvd1q6kv1piflw8zqedvkmldemx85fsfim1ii2vl6lo7qq9yddorgzrdoxswgb7s9lm13mrhi9fqufng8hvhkl3qynurxbs6d39pzjh0jwa139ecimtu6vdw3nn8yo8piyp8li6rwsll8uwj6z4xjxro2a33ew9c8w2duql196w9mygucmbkhjhpn94uvjovylev2wva6x4uvsl',
                
                mime: 's8gkxbnf24cqlr2v99yif7qmn3flu34b80mv3loxzebuyhieku',
                extension: 'sazjramk5lzjyp59eenydnb9d16nls6n8edgo008udzl34uui4',
                size: 2993900757,
                width: 913820,
                height: 414189,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '19e2hz7jfitgqjarrwqusbdd8lprvg0taqjijubyf1kc195cjsjaooiq90qxxrrzimijf8g1bqjgw33r7hblyvvbuvbmxnb2wu2gto277rxo7hx2gjjnfv7ktje7t9yd8evjzeaqfjyyc6sh2i0nmfxgkghktlwhome7ab4wzezibc07y8idqx6tnucnx18zzulsj41kxf83zx0ka969cqn7coiu4uwnesu13imn9qu0nuqyi3i2kybjb7xxsmf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'g2cfwgolz2z8muv5blzlfin64gepgbjhs9lzoxqykfwcl4kl5q4912uf4j1j9ax97j7awfnh8wq',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 856707,
                alt: 'pu13c0y4j7ogpeoh0r4om1ve0g6cptdeo3v9bjcivx0031fgztuoj2b9ibrq0uq7x815xcmqvby365gaytamotinc26v2k6crt9pd82v0j70a8nipvvcjd5xlz7kky6oye1u9r5b61oalmg87uevlprv60embv8lng0jazoq20f1u40mof34z63b35u70e12xdgp9t9jlfckhhwdsh3t3it1o61ttpzs8p8koazgi6qqiw74dow7q05wbz35dzv',
                title: 'lxr2ef0bwkkw04efvefxnkk93pe2mj5bf41mf2902gjaikjg6r7u4wn5554b4cnddewi96bie1jws23hlc021mm0ya0tfxfdmwvwxy58fhth67uzhuqtxy7g6upysqeq7cbkbxa9naxyq1e8jjzdlu9fnl08tdp793ny5ko3oi2c9ehpmlvtk9192dvro4hgtez7dwwsvgn2yun6wg7fw3j7l2uoz0azqop1cvrusbmhipxqrmwpfj8iqz8162f',
                description: 'Numquam eaque magnam a quis. Qui qui voluptatem excepturi dignissimos quaerat fuga. Dolor est veritatis. Animi quaerat officiis voluptatem quod sint iste veritatis.',
                excerpt: 'Neque est deleniti quo qui rerum ipsam quis. Quos quo minus rem. Deserunt culpa voluptates libero corporis culpa error et. Labore autem repudiandae dolor saepe qui laborum voluptas. Aspernatur similique cum aut qui non molestiae qui commodi voluptates. Ex accusamus alias aut quisquam.',
                pathname: '536q12gm58zeafwvduiyljb25miwulr883z602rwxdm12zcc0va8ggtx31vy4mmkbhtvpujs8usw7z4t3ijuctrefxhv0w6ojut9rfxi8mx3russ0m09fx7h4vc14bvel968p7hfjm9pfwe8l2wp9brwymfkennz1r1u1qe7luvehyznwg1djnmdrnw520kaaakcc61l976afn5s5hvuswpnjmoozpuximhvcx8mdid195zkfkfer2406bvzw8qbl2n64yyrjaguwrgxlwxp4g8yr1n7g6ywj6xr9xkc7jlhmfuavavuzx3ejrc01vapzff1ybswidlape63dlj62nmmlrdh943tf47tf40fin9vupe6cp477rq8o7y4wpipajb9fs96i0hal0z94gj1ttsglnojtst0tucigg1sfhykjefzhoy7at2eduo836z6tdu6vcu22wbc6osghy1x10ebuk64q6ieg3ey333b1c80z1p3ipeqgva5cfqpri85zew7b3n31zdilsmen43keu8os5w528s51k6rra5luyde3pld1k5yzm5jtlg3j21nrr9mnvwaijx0th5fxasnlo6iofq9gxfmdh4wp0n4gjp3h5zjl8ot15zlscm5kqxjlmda56qkq5g33f2u17wlykv8vv41a6nnedr3xoco6fj6s9biodb9wya7psm0r6jyw8bsajkiym0if44dsb45ixzscsfgg96livpatyh4zhvrtpvsylvta83hiewi9sgvnvuh5k5hh4ijbspvanv0x9gt3jm01emlwqeo0t90wfaxke31861ktau5exgpyy4yfbnoa6ch6811n4v9eqi9841jhvtc64oxbbm21k2fg69uhq75ifhdrvpij94qha8xc32dzb1xwcstp945e96e1gz1aoyttl93bo4wf3qc1nazi2gs0ojvzhgu4gopeifpiqg897z3tqnvhiy131jxg45gfzv6bt0i7gg30bxycvsvrp3by28k5toewd3mwcj3',
                filename: 'hwo6ap4ynq0pr3eha2tl60y66ywt3fxf267p47ee5sp38a38gyjxq52lyd6c30n1t9ua59bfj7e9zszs5xkomn6xwxz9iwq09fk60zr5rxbp0shp6dmbonri2ky78fy8y6hwzfxd7w5xtnrymljtv0tpkpngrvceytpqtw2bc0j1bimn2g78b76fz94xd973ry6z3lo00elfajcs4etnabz4sdgfs1adtjm1fmvmbv9krtjft39wu4pgi14l79q',
                url: '7aayabb38zxhhdl3n4ea4mkiwvx11b1upea71m5zmcuzhcz5tsi2wdu0hmobqo50fkyfcyv21lu6iz1iozc70ohkxt4k7s7sjugmbds3qwucxmtxnleioosyrnf1f5h38e4kl2wxd227ufzpgij90fk5kzdjtn7e068z6jrz2am1gxin0oapgjogl95iqcag6ye0vyomcilslq8e1z8x7itp89lt297xwnu9f8zb76rv6wv8jbd75to5nqwuenms7t1ea3vt4th31soga015z1sbk5lxs533ogxozqzj71tal88casjhdg3uee4tmwcerwnpr5fvvj3sbeuzyaj2g75d3nf99bbnlj27w3uagba4vuu9af4eb033k66yzsxqbxls8efk95aj2dwqxan9dv02g9zxd307vm5o4rqclsok0o5s0fa476rkwzuzu9032bim678cno7bzgblnosno2639ey7rkms5azbiruppjg1us6ixx9lmgx7dh94fs1fchcn1lhj77kfl8j9dm5c4uiu23anr4khcfef7r2ommanclv0ewujmo42976q40iehnczpertc7rlwdzfq5ib98umnr1h7jrjgmpsar3epl8n55q3gbkg9nd91de54wtic7voyi2bazkg69qgy0ikggxi4tjdkm5buk0ih5fkeiwig1pixeclce79xsmjykp2bn2rgrfxslk2mlkre8bl0klxcysmg3yr5kxq2xn9hjxdv5jwh9yl0xfis69qrujc785uvexyfmsgeij62hv5gs0iq76dmbj02qiad0xqrvef2gb16via4hhq6fr5143g2mpy56q8kdmbvbujkdia1txllfax4mhznkiidaup5gokajr623faewfrde2swdji1sckevrc2kdyxsqc0yrja57s30ezhqmdkaiorfim9asag26pa3w0b0djnifagde1kq4uvej9bu6sxianru8qqlns1n0ioxjmn1qwf018yvgapfmftzmcngb1zkzhhwzg',
                mime: null,
                extension: '0u1x741psfj0330lj4zggp9gv4bngpld4fy8vm3l62w51s2qax',
                size: 1691900080,
                width: 979087,
                height: 614888,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '8ej9vqmaixz2elindxfoory6nuuyhmuetpgym39xmyqbn6sm1kz6dkht39i6r712mkv1svje184rfw87tzpwvwcskhakakripmswhpu7g8u9d6imucmdce1i1g0iovuspua5tm0kukkvgvtjbugcd3okmue7sb5rjb88nanyjspo8ew6swf6jh8khgujkqatu94pqx5ue98h7nzixitasp9hddgb8bj5sfrxk0rgba0ee1skgr74h6rt136i8xg',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'm39td4rhgkvv8634nrz2rp0rukk08so3pqkub2fz2w34m8z1trkgkrxk6v2vbvzsqajrggcvut0',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 818796,
                alt: 'fcuz05nl7qwvwn09miy0exgqi85rvu1pa4doct6vl02kmwz2ga9kw4r4bc2uwzkyw4koqu0z2w5d85srt29jvf9754zoqh7fuxuc9egowtw2ojyc6defejm8fiodnbgot33bdnwlpa7umg5n5cul8hiex4u3c73qxdu1arz4imiii8ajsfz547f0izvj1m8i3uo8arbauys1q136goe6hizvxenjtkznvx8n6e5zarh3l9jw1ilkinikoyvnfy9',
                title: 'inc0qwzu4crlgsmxq3g8d0z2b4g59aa4m8azwvhx8m07d2g2p2pxt0uf07p3gja0csxwxu5emyrjein5ov1av4obzwzu2b0g9bqk2wc9n00y5q0s2odbzn9ceojp4o0zsk2mzk07r3wbzsz23zw5yb93adgz35el62uguib3160yviqiu48vcvwfz0hpwc07q2pae6tn6y78uyyaikytrzwf3zkwbeey6y4pe4wfhhiticf2vpv2wg1q877zjvp',
                description: 'Quam dicta error nostrum aut. Minima esse accusantium quibusdam ut accusantium neque maiores nemo eum. Assumenda consequatur ad quia distinctio omnis. Quibusdam eos aut ullam dicta qui illum et fuga. Quas quidem occaecati earum tenetur id odio ipsa ad.',
                excerpt: 'Inventore est et. Eius culpa iste culpa fugiat voluptatem sint sed dolore incidunt. Sunt qui error.',
                pathname: 'fllhfek47056pu7jk2w6r2heti4j53wtvxa3csr4feugyfoiyaopx9byy3mtxwwondhw3uivyjlvapc7pp92tfe6l1n2f98ythzapinmyuz3lfbo2efa7l58iou6q9tc8n2tb98brzvkh1zzqd7lwk9f3i1c3j4y0zqn6w06yp289b4g8k60198hka4htlm1qodtqpad9g6nu0bm9ohe9rain7uo0n4td62xoiiw17v5c4jek8tdyv8pumxgim60mzobeywdc4ptgu1dftbpnw3qnkikq46dh0y9fxhv86ll796mm6x65rjp5n3njmq27jsv3fh7cj4wvvlebnn4r94rygpbpf32motwr2tfvh64c1tanlhlv1wy4w5ewx4ggfsjwlk7tqukmmw48jitouer48n19a39mjk6l5qpocv3ya3880y395s07qjbfwkf01b2n7b54hi0gp7sac4vv0hb4oammzdmapex0ti64w6hdh0rnqif02442uj45vho2r6nbf0lakaf3fgv11wuvwwjpfboyupdxvcgktth5lvw3jyw3utwdugz3ptoc5qmmj6eym6v4g0pxrado0093qgxire5t2si773ypvmy3f0hb5aeotslm66bnre81ijtnytqnkkeims7hdubbwzdb28clhiqesi3tly8khf2i8n1xeyyskg68mcqp4qprgwb0b15lit5mm5w3l16a1c1eoivo4z3m1ysz3tihp3mbtxz92b6ln930wune4qqu0hgaxjanwu6cl4zg7xe5ia56kk49h3mlxvlufhphfbux9zp75b21p5svbluixj6a9ycoj5nuae4rpzgml8ysr1l5imdk0d9g403e9asax6n7cipj6clzztrjj98ge5usr7mdde6g109fk29o95rky4kom4c1rl9gfamnhek6p3fjg0t84sys77cn3p8qsp3j3osdqh1uz86q4w18hyxqn1xeg2g5jr3h4yopcc7zg298kiu0r0cc3xh8vtx71rigyce',
                filename: 'tf9rav3ns645wqwfgrp6y3plu4lhzf7q52dz63n37udbhjy95s0snlzkhj26pnvaq7jn2pib0f09e12q8b4nw1hgk0x5gsg6380ei47pvrramzffivxpvm1wuxzns3k3ckjsg09chiicvd4rprn0v2r4pu9l18olxqlrzznlyv1uofl93t85jaoxcrgpiwrhur08mq8pe60jfiq1ksp81a9va2m7n00qzwm409bhukxp8xantoug58hb4azfmhe',
                url: '3cwznge52679hq7ilvb95lxayad6qtjmusib88fkyoivtbiedgcqmjqpgfqeoj4otum57y4md829gfb20oe31cxbew081par4bqtw52bh2hvzscz5yoyg5rkp3s6q8gz2gafhi1in6tu40e024cd9boib4wls9wiuk792r14yw0u7u67v4o8jh3zh1fyvvk9gnqbhjovxm5td9jf1nmh8t9hcemcgaehwtea1ir2g9b6hcehmhfyngvtroyui3v8sal0eqkqqbh88hzy6id3ag98mdrp5xui3bz0hp659ubzw5jttk1i6ts5efoup25sfms4x71mqog6eg7cf1dngz05peuves3348vcofsk4b7e93kga241wrzlk7xl1qd6ujlpl7v2p1jn60zkrespe2jz5hj0d3sxa5knjns3ih2skky9sdqgxk1efv6rs8bfol2055o3bgd6jpv536b9xifkloaqqtxxz61kvkx2ervwujor4fmjynhas2eesd2anlysxcdx12gj640zsro70g3qjy9l5d4zbzglm53abhc1cyeu0avx2b74vx6tc745pz2u30xk2hjkjtqy1gjsh5iyxohbz5hn67phv7nmf8zezojb5m7vaclqab7m803muqmxqo3vhpj5qdzfi6r2h1zbnx3tt6q0bubp1mpppotou8hstrxbbuoanj9mgrpsxxgzg7an63sxbazrh8r38lv2e2nmvyc62z2j4bem3a35w0k2j1t0ng5w4rybrl4mgwnpkiatuq6swv2kqfz2i7v2w04sxbp5y99cgb6th3aeu3xt82jpg90h1261b4h8e9ealbddmhcs124ql3ol1esz5tuesnakwvv4uq3xomjptlokycedoday6yba6ejjj2ucf75ho2tfnt3qwlnlr94yad4qndtcoy7jkbgsnue42d1f4csfps0colr5bfrdry2icsa8jfurdrcck7g9cf9fokdcwvw23n2g0swkprjbke6svsj1ezmdbvkaau8x',
                
                extension: '1phkn34m11nwqohvf079ota54r8hk5etd02489znyhwxajjm9m',
                size: 6482335204,
                width: 156771,
                height: 785101,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '6h9jt9ggjg4jnpqmrdjq7jo8ydxoluo2sae22mfuj9gki7nk11dd01ru91b5fxnxvb7beg1zam36ma4km8j6z5klk28nbojk1x36hn73xh45f6bu0m1rvqgjtrfxoooyqfmjzmhksf4zzpvzd6x7mfbodojnjkhar54q0ph8k6e9vzvu0vb9oru55x9qsp072iepx6f6erb7y6ff7hldpmwqfire1ach1abxbp7affu4urcban10pv8nkww8ava',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'd1wek0bbjghvens90tdxiza8jb6ijdsgf8nb8czqx5rcpx6m92rndatsg7eqv5ovhr0dympki2p',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 747383,
                alt: 'w9qvtmwn8xqhp5meodr1ldnr59et9ird4zdcmgujn8l269l0zhgmufn1u1h8faovz85tuc8422vx8xhy1pmykmz46ge1ycxpot0pc1s98a6yi2q6jenvmi25emsjld17trpv5xadwhzj5rig7w0q3terrpyxt0jk1owfm9j13yfr29oz4yipvikzq8mpclxtghsqnac0hukbo0rr8l7h1g5vg5ujwgdytnl292b9mdvytdtjsl8bpgtdai9ol7v',
                title: '88idebeia2pji3h5smpyz4h9qdfgpsmj6pvwkz5j69o0y6g84uwzm8sczidez723ch74tqhlvdbi50nrjezxozlwn074zbcus986nfwngt3hcsfsckpo1ww6uh24oimbx2r33nexxn96d325mj22r0d7lotq92w6jro17oj80rjj824cw1jogicds3t2nka0at37nghtfdeaxsgw5vgoxot22xf8g6wt5hv198xrpuygtfq324a7behhfcd99l3',
                description: 'Iste est sed asperiores nostrum doloribus ea et. Debitis exercitationem corporis sed qui a est aliquam eaque. Nostrum qui consectetur ipsam sit maiores ullam. Nostrum placeat voluptatem fuga.',
                excerpt: 'Voluptatem quo earum non cumque modi deserunt. Fugit velit aliquid cupiditate occaecati illo. Eos odio fugit minus dolores nobis doloremque. Soluta eum ducimus.',
                pathname: 'c10zrt953hwfewshemaffv18x3gcgrxj8oh79qunlipdq8nruevawsq2j0z99o9r77srm88c7wht8yiclzdgby07rndhlxclvj6oa651rizvx2xqtxdeo8bzk5qkz3fxf7g2jqiyjc94ih7w6j4uqxxxm6qzzzexl64dscs4760fkt6ayzsdbp7bgf2dj9k5ziyfh3pg0hfmvqixk2gqk3wp97z90m1yc9n0jxper9v705xlaox0aiqfoi1btd8uii5mskqzpyc2lb6c8r3unszwybhsb9gs6yqpa3bj8h844u23xcqnvysr4ub9l0ijin0t5qxh9sy51ydxznrqr32riddx53y0v7d155wr001a9mkpy5iv8is4y81mrlacbi0zn5dcva4b3g6hx6rws30danqx3hve7kvj9nfzv4yza493766gfi9cr31e6juzx4d70h0bgfj1htoa9bxqtza7roddfg77wps148ck2v4azr57hdn7usxhjq77lq29qjxpnkc9zd5rcmeiannmd8otk1a7kzn4j7chnov9eb3vbicx0cf56sdfd5c7h8o595218kssxjjh3pq5a6xz1c4sdfugo2g31v8alvppgpimz7lncsnbp1t1cceo6hs0sm9r09byz231yjweoqxlx39pwncqe4nwqt8bbuaju2zuhtkt3f8xnd9ovoa39mbrw84i4p2xogyn83kcy19cz6i4mme3wj875vn0ubkef53pxhgr53kouulby0mbm5446rkuz01f0o7w3bozd15u8hix3oewtzd843nakgqr4u37wd0ox4w2hbrkcp4wlhaajyg92c5b0hwlo7jilu71pw0vpgd54tqqmzp8kasbdop5j0ud6chle3x4twy966gxkj00q2z8f8gyyibyqtq0u05eoip5i5jqpfp7yma0rwlomkaz283y9szd2k014zbp0byn1k2gvtobols1z1u2buh79vv8la4i8i07ln1fsq7l87elifp6jhketug2diap',
                filename: '3j74qkm5m4hgrldmtparinhmj9g2o8t93jpu2pa34xc71a8g3n3z0rtdtz1a9tfhqbrv07stctyvv1poqbtsnbldqru521qqbuq2qw1dsmgxca4ztfalzfuysxgxc0t9tehb8jgbc0gle4mdonfdtvzxbxx6ye92q5pk5v81apao36s2upww10sqosh0w08p12wji5xxv6xhc6alni2jc9ma99l8ulp9mxmz5qfzvnzg0p1oijxm6gaq4upx7zh',
                url: 'yu0ekma4u7pcnfcqw9092nh2i8v2cegczhbsuqh8q3hq1znns6jnjpfvxetuvpucnv1sq2szwnajxihjtaq3ywjeubruhghtkqydc3zhrauwsm4j67l96kt7z8x4x9zaaah7dpul93jsysz8xvbm4g4joq0nc58u2auu69ox8fhmfq6kybu1uh133sg5qhzfe5x2go2it3ootot35la5pn4yz55k0elqx3r9xua0vnazabnh47yfptpsnj5zti24qq7zzqwrygfz5lev0alqg6mdi4kewqnr9hb6yyrt35wp145yqq38wy8tu5wvggef7s2hhv6kos25fwjbqo260lljgcwaujayd5t26nx9i09zxyn0oltotkrwymv7thutero7b2en9m4zobymyzoqe3y9yv1pmdyu4huuk3qnhtp2icytm3efwqkd8kf99yung4b23cvz8046uf7jytp33u4sy6x7jnxbuopsi01etb2dv7qgqsyz890tunsr37p89c7a0hkcrelg1imy3pw62u1bzmygq2abgyaudjdghmt0u4o4kqj4ozmww867mrr4lai08u1xco2gs4iwb3gqci3hsw9ydz9j1x6n3drj31p72mtcsz7os3fgk5vu9uqelk14nhmr4cdauajayapajyjlexudaetr9f6p9vwdn8bghsfuc1brxosd3id51aif50xouch6g48fw8uoyyyzao7m2lbjex2euf05e6mf5x8qgolvugovhd4ga45o7vwvqciq9wz4v2fr880fa4utj23xjpppa3p8d7l7djzguymufuxn1bozs7zdgjsr77sc21rvmn1yj1izpwu4x5i4ahz3owi8ga2dfj8dfc6zytj1ctz17lmlrjbgj7084tcq66w4khlyabqh06zaxukwh7sf0ydfa70s9f4lcb9xa29i1qac23nvhzhdsdalq9ook9i22ekpxw349zmyakd5zhpbettfet06kjo0deaohktbkab6ora3u57rb4obvwui',
                mime: '619viv8z0481zlb7y4fnn0zvn5u2gxgx88zc6e1t5ol3e2el8s',
                extension: 'ho9wm9qk9l5ubogfcnrplqqimoc0a3r2j4djcfnmkip26v1qod',
                size: null,
                width: 879442,
                height: 670387,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '2louk5vz4i7g3vnt2kq660vf3jjbhh65y1lv7gy857pw70hraxvhqybmsllznkthur11qzqevi5out73r0dime2a38imq624ytuafsb7ufutp4a8j5o3hd6zay8lcv7x8ysg6puy8gpvrmjliu1kr6i15c6jkxy96clol773bug92uggfl851ageimso0ayer3acqg5f6gf8xwoe0uy9zkr0hs5irvzdwn1jtomliay0xljp4vtbkv6wafv65ii',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '7fwzwwei71twdlgjyzoowv9m8ke87s7wyk3yqptzky662ljd4x3ddmnl6tfxfums1g4y28g5t5x',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 166407,
                alt: 'g1qiinh3anveaitle4esjoymd81dvnmxvgy1i4o0wieg33ztn2hrbwmtl19h1pzrrycaeeqbm4iwye262l8peydu24oiit9xbaxahr9nkdzbiucsrjgvc2uinuee9q3gkdwl6jgwi2g76zqs0rziooy9i55du8jc1ytqyzbgtubvi1twofsogvg1vsto46btoytdm218ds7wep20t5ncorlfs4kndvclnzjv7y02vg6n62snubykxcr40hsmrpl',
                title: 'vjdev4ubssyngbpv7uikr6b0k9cubrjqyg6q9n5x9qtmfyuwfy9fhjhhnl5174xsepe2wniorhgn22uiz551u0kb3mo7zldgdo7cwibcbhgkfu7ymfwql95luuaz3o7i4omedi86afv3hny99jyunnn7wbttgguhu5el1q5l8ys3rung662gcq4s1gc24ns3cjva8vm5x928jrw6zjnpy33ob27n4nebkf3mon1e05qd9008xwprz7ezfltny4e',
                description: 'Reprehenderit explicabo sit recusandae voluptas nisi sed. Repellendus cupiditate illum hic voluptate iure. Id nobis vel dolores voluptatum sunt quasi molestiae eius fuga.',
                excerpt: 'Quidem voluptates consequatur nobis magni et quia soluta molestiae dolorem. Quas et aliquid est nesciunt iusto delectus ut harum recusandae. Fugit ut temporibus est dolore quo. Velit laboriosam quae recusandae corrupti officiis molestiae velit recusandae.',
                pathname: 'lk45fb1s5gdfu7xq09of9qudcynvmjqvdzatprty4ji78paf9n05xt0a036ag6gverhpduunrp0abqykorziyhp42vjmhwywlt0il2wulqr61r38j2xz9ixbzhjxubwtgj34sq3hetf82h707njvmlgrp2ps4f8s6kwiz7uxioi4qbbzgl40w4az8h7ha22r3zugs1r35wua6bxjvnm0fvq3bq3ekf5l7uzjux4biyuocqn9v4osyezmoahkntm8r63xjc1wtp48wvmiirlk9w57b29xu0kcl1qg6tmyar7buwxey8jqqvytkyagy66gbrvgdvx5fqt2bn4mrf8h84g7kcod21pokrstmtje12bbflw9gicqhzosq2u84d17x0ad85mjo9oz0h4u68k6ob08lr72s5a6kqjr4ti82djxifpzj434feb9yoopu0bk28xiplntadvzb7ye54it84dgst4cmuqs580b1qv56u1l7ksfqm1s38knem3zoe8axi1fn8d5dyiroqd1zkj452mdriiq49fdwdu3vv5e41jmkeu3fx9iyhatl2krgd0prwuksy3xt9lo97lbxrc5qyxhm5hf78apsr9m72wjk19o07cp5fd8n1vv3ro3ksmrphq4oi8mvtp4rtlhjqrwljb32faezrc0xg849chuvyg7by138833dursxp6zmewsgxv0j6iw2mp7b2p1yan0bas78d1yd13j64qje6u3ljlfk8udlajcjrlm0tk8onpqbvo87x1yks83sqnhljkq6gxu8kqmazhack3er2i5syv3y4vvpqlvsfgbqq3ffyjwpdvh2pdj3xrsxvkrqzj8ad7w29em573tlni3fy0i35w9vej2dlmh1zvv3a5ea63arc01ws3m8vcemtxr1x71yaj89zg5fs1qbm2ysyr14wjf5twu1zvn7b6g3y8svre7hazqyud2kb3mpe0wnbq2uova31wr4bca8dh2tgkfb7fa4v02fj85kifdlgmhfji7',
                filename: 'rc8ri2r1pr10htbgkl6qj8s079r0u8y8mw0n4q1b1v28jgn9ul0raum9466lhqtqqw3pkdownop4wcizlojh1i6df9m73v2n0md52olqjg7pnz1h18d04rrmxcdq0ncntdj84h2x068gxzefwjqby7hm76lzfdbi1gdemic7kqudsa3323t45thakjfbbfac73659ufb52u0jibiesaiskqpg19ggxfrwbyev31hghfzvtwrjhk7sg7rimcwqu3',
                url: 'xhy0tajyvm0jk2cv42aehc6q2n5r1ync7afr6gos4u0wti6ozt7aa39tlcu0r9ma387ssomc9pr27v7g1j089fpqpup124gvwbl6sgyrjo9ifn9ndaus0ls55p2ym7tmj1bh41g2pv8a7tcjrq5skq5nkn9umbczq12m7xwe5ob98lw5jglh4p3nvcx48b13875ex6k2kk504jq9uozhumh5o5xh1czzste1tlfaws0pmaqyfp3r8jsklnrfmx3c9rvwozbh1yzwovgnt95li9uolc4g2xa0uyji9rsxennf91y3ah2gsidg2oma8n75hbyh6fkrf5uf1dpckjrkjrv3004me7cvupvuj3nc07osxetbyqv9u7geb4u6w7256tu36wphx6lyur5uys6dt4440nvn9mr6t73d888vpxp85qgj6lc639cnhto92ub4ta2j5al7unhnhph6if11pmoke1g1szyhin60y0dpm6gayxxz29ano7fbmanwv8oyoxcb8s59qe3vifkel1rgd5bya73rd27so6d2lmyhfsx975pywz0gzofcck8sov0vnqergyasbgx816pqxa2q09z8tr043epp0r0thf0zwgz5onmdfgglf575eqfom8y7t3f5xx5utlydfjm51zojkipxdm6royv57beyo7mj0t3hi6vitaw084g5gemgd93hao8l50dox9hce8xbsvg7z6dc50vbx3fttcid7tq94jojise1uasmu4vhwfxqyc3sd30x5zf94ht5w8v988h55t22rkho8u53rufxekfmsh4oodcxmw3dork81dkb8bvm6xjx1nhyhetf99da2vj5yln8zke5qmpv8wv8qpkwu2na9qytueh842esjumh1xg5dlkwylwwdfqdk98rsvikdi12ep35xklgnfmjttp9jtz686fz46515f8r63i4jzp78ro2o6c0oljl388rs93byvuan5vj37h231843buzcrw2ey711tsivz9i8js6cr0d',
                mime: 'j2thura5bjgrnfg1txo7r1zzph8zqipa1b06bbuzv2xy6hcfk0',
                extension: '21zkllr1dk1asmsp3j4d8iu81lim7quprkbjtv69v1j6hz31g5',
                
                width: 381575,
                height: 816769,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'jkftpr6k76prffm61mmfykcg8a1000nxuthgffswldj9r3v2xqyz5y6qlsxoe7wkxuqgs7pv7kxkkem941b5vwticprx9cuhx4z2eernfmnz4z2dzk9evrmzifs2ud90oritnua6xn5f70dch7o80w5kx1itgzpsevrq0s2u2zkog6xinbgw3bj98d6y1rou8akfjga677maisnq3u9z4biu54m69mlny48k6p3ihzrv8igx518zt4jmabkd1ys',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'nizlqqblcb10v1pq31hx0f5sloyjoh4ouadwe',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'it51z6algb8fasl5hiogapy477bx80v1y2fpfz2xeksxsvtw78vudotiy5bbmzi2gziwlf1jaqj',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 339459,
                alt: 'q4lzmqbsoogktbsihy342t11qhyxp0xhfn1jp1rrj2mhzgjka12si3q76m24p76pi8rcdg175kvxijuncbkm0misbt4o9s443pts2p634wh9zxtbdj42l9q33nv1sarbur6p5uss9k2gm2kjs8q5mqsbznfsvzygbekapakm82q8nteqow28qthzjyk0mr8vj63hk2dltid1qr4rnr35xb0byaw9g7eoos142bsghbvzsq057wzm3oh4apusv73',
                title: 'i58p9v6yetoss9uqjayw2pt6xpy72fe9dqgdwxmgurb7n9hn4ffbovhohxazbhwtwz9pq83nf93w864f2fsqtmgl928um8jz0p7sf0qenteclcxj1t97zlu6fok5o01bvno6y7x8io7q4medfsm1hbyg94lz5z0pn0q10d1nzelgd644phr44bkwpuoa4gz9a64ta5fppxcepyy25cc1wxg767rizbk47tsyl6ax71mn9fdvxig2spanumt1a4o',
                description: 'Atque sit eveniet quaerat dolores. Nihil sed eum quaerat. Perferendis doloribus ea dolor perspiciatis debitis adipisci sequi velit laborum.',
                excerpt: 'Fugiat nisi doloribus beatae. Architecto inventore eos qui dolores tenetur unde sed nulla. Corporis consequuntur quam itaque quae iure adipisci molestias voluptate.',
                pathname: 'byjr0e76frzxfa12sorgsxu3nomka2jwnqabdy4565viz2btyeeowhhndz4f73456kkse2dyh7flx47alwf72l4fwqjwbl9bd6ba7wrbml4bfhm89oitvsxyg3welsb3j4yyu7u4izgaxyzdh5punoklfe86ssewciidisr2g2kwayjs9k7woaiisjip7zzf2nsh9fp7f176h8cf6i55sa08nqw9yq8z555b3rweypsvx72r2iafbpr7bd35aaiyh57vwyax1m41llypsaj52gjcet7jg0m62ynzy5nrhh6i86kcugazb3gew0rncd78vca7a343lmrinvgmo8xjy4d0se9nfz8vbfwhatvstzspkhr2tam64jxuidx9d8ucq96pnq2bn9jychxobotntx6g6zhga2n4a549uq2sl70x13us2fe6jcfmlgfat9fzsech3pmdpvox3som2lzohzt5d2uigx8agw9gtmff7j1i0n7g0bh4u5yp09uq98jf1d7lmvq85twm3dszkbgm5s9rc077p5etc7pv1srkoicitxrizxk9ctpn64x066hjpph10j2vgq6w9o17tqva4er0zze9absbjn4mr6ihn60gu5kcrl7jbdl4jtuh6q021ehd2y0qzzjy3cyekboysnmr2pznrneg3lheidss6b5kn7756iek14oaa58p846zn05py8mesw6gxzmtr4ed5p5big4hoaf8dsze6j1y6n8ili5obp07la10ce8oxnzw7gep9vukzmz2wl30js6hdn7acd519tpy8lpl9kbkknnmufqlyodeu8wpeyoh0pncussxiolxh7ktvisa9gclr06379uwlapc58w1mfq92n1wm6wg136baq605z5p3ccyfo5og5q7wsei786zahwlua6k9arakzyaokrsbw5ixtwdbojwhcs796t5eo60b6u8shtnotzt7lxe5wfz1ag75vtlu8x739cfdv36uggprace520ql46cm6z22vh4pg7f',
                filename: 'ohawx2l7ra8mpxc522bn5chynbwfceql65np7ntxi59q41awl1y1sk1qutb1atzmtn9pgbfwo3ydzslj287z7acdvjuvbefhxkeb7cy9xjb1ya76xcex5r5cf3e6wlx3wuttvvmt4lwd3rqk0a0qv2o1fsoswxa2hyxvcmsval74a62nwblwanvsrbwzggr2k1brznv3b0ztx5ir2fdphan30w2ph0zvq7s7t2o3oig4qyv0358htwxrq2vyk6f',
                url: 'evmm0cr96r830gdje21fby30fhoytjrcbjlo2gdoppjgttuaj5t9whvotcf47dgt5qj0dnfqcma5a0p05gzsvjgdn7ofvr4k10jqy9wa3j1b4ux3shxh5k56we6y2pq25e932tq25kintyh4tyfthsxyu60k38nly7zittsf1m54cqj0cfzpc5xljyf0vqyf7h2df7miwqq2p20ry8m8xx21oza8t4bsc6oltsb04la08cs09u04qgrv69l8vurbzw6taf98scxk32403ikcnvoo5arza1vy15flueh0fe4bckdoh9sl1y22biqmhzvcyadytwdfv3tgnttpn6il8pv25dxnyq8u95bmwblxm89sfcjjhitnn5qks29d94cuzfc4qs4ybkhrv5qlvdv3xlj07y2yvo7mxacwkxynupl67vz6ws9k81pnp5ubgj5cmev3h6j4scwpp6h5v27keysn3l02p02f73x62l2bot6zy92aabgnbx57xrhv6nmrdhmrb4dch3j5vr5q3aw580lpuda7k189372j3dbp6cvb6nsrhnshk3bxzx6s8vdg9g7xujj3hc6qqf0hbdy2pv6la30p2gj7n9kk4uim9i0gkb1jisq93nissg0raty33cd4z3p6etwuk2br50gibt8nv9gye756r69nclz7kytoiub9uenil5ich4qt9r5q8calh8szwz7y48d14n44er6bybkbjmloww72oq8kspk1ew791qqeujba50xj8efyfbhdw68qidai9aoao9220mm6adhmwvdvujg25ber0idvtqx3yy8ydsdt3vszyja6cl0te5bz6e3gv7z4yoh8b9g1exwq5x68zs2qyrwfo840tdifovtgyiswhl1ps09qpnm8b7mme0eo69alooeg6ssxrxsmlss7a6rmht4dvw88fszncplnjsxf92xjjt1ufdu50sxy7o6uhibm7b3hdememfz5u2je9f8syd4mumck48m350m69qgom2qlm3uk',
                mime: 'jffjgwt5gw092dr3uauuvfjwnvxz3q3sffn0hw6dl4xgygw9gx',
                extension: 'i21f6stm1ccto0b750tutca9esedlskbnna8zu2cc6e467pjvl',
                size: 1888044631,
                width: 931921,
                height: 250868,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '2h876fkuxpgfp5faebalwqij7uk5v1bpaxd80adpwk7uqx5rl8gsk1v7d983y68nx5hwf3ykrxydl2prbud5700sxwaqe1fxjhqpzbf66eg758ow4yowi9mp1pxjdonifk350uedeso8cpzrx2gaflv9ei5nf9v1n1lvswcorysdc0o9mf8340ida3snow25hmb1pfshwaalvcc0s7jy2sxbe0sgj2qg18ckmdmd9bwuqwe1qtbwa7cx27jihxn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: 'lrry4820qsso4ilk8dfvib5sqdrcx8gw8as8p',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '5a1s81hfzjksgj0g51fsq9brtttgsv3tag4lapcfc0k5hopx7wxfdlo463mcmslczqxouzihwo1',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 372759,
                alt: 'fvisaglqjizzep5bbzw3z8mktb4ue8ngda2mrfnrls2zp3hl7rhwakhj2yg3nrl3iypnp1snr9r41p5vlklecb4tfxdpgofkcqhxkv7olpz87r4156v07v0xu4i8lvbel2vr69zfcetn6u1rqpp44u8g0i0d7913tejwx0yu74fi9r66f7f1in3txvbsa5q9gb22ao63x2mtzxzdx0i24vaxyfjfbj0israd2fiqdbotx71qn7dgvpzfw49wxq4',
                title: 'bfrvmkbol7dujjzqyjo8zxhvtdu93dczkx1e1xcgowl32s4hz36sr8qd376r4smzyrg1p1irh0ykodc6ln89uswg5p3ax8arqv55v2onzh4sxa3gjq7n59f0t4hdv7swiri0f9ktoc268j83qzkq4jlntukkcn2kpi8iqz7gjm5bcssxkfidehzr4q11v7haav922rh46rh9hjfkdyktd4vlguwibgg98czbwului48ijvvusvaibmkzc1ktgwi',
                description: 'Quis ut commodi omnis impedit nihil quibusdam in quo. Labore sit aliquam et nam minima consequatur tenetur. Qui harum et officia. Omnis et odit qui aut sapiente quasi modi tempore est. Blanditiis sunt labore omnis voluptatem quos sequi ut veritatis odio.',
                excerpt: 'Est et est quaerat temporibus. Quia eos exercitationem sed voluptatem voluptatem debitis ipsum corporis quo. Sed reiciendis et corrupti ipsum aliquam. Sit omnis dolor.',
                pathname: '941ugd7o346d5l8kxu2ivrjgt5dvlgf8o2wl82hveiimgf38h5rytsoe8zgaf4lr9rgx63zhq74agdzscc5ow2tbrtnuessxyx3zjwbp5lokh1kzwj4uqjtitkr7ncoib6zx5f42j9i8317nly4h0nbgcik1ny0ztynzzp5b099hyc7g3kcqolxj2flm84n717dr0ucy1zojlosjtkgt0ub63p5k13ewv9ulizjz5puueq12n8g61v3pyc3l0jic7q24en5pbn1m59u04tzt4owyuxfdjgcyyr12pm7vubs4upzllwvjco6f9mrb4e9bmena40qkffwrgpx9mit6xkelhnl89vm6y1p1e1ovkxqw4uk08bfxgu1rasmhtup66x7e43tl6q36ql2rb4vxdgzqmx250tmlwpb7pe8st5tprcy7l4bbqa02dkhg8vb2zrj5wvcbng80ucgessjoy0paln4e8mboelsm4zuowq82bw1i6yah0gsd26ba1s0ufvsz9xtusuuppnk3nsobmuqt5zj3mm882qau0tr37mmxq5v08ihyhc9fsqnauakibyqlyuytz7jqywlsk5vc27n1gwyg69tzzblwci3cmt54zzf7wjqiqhgldh6hwuw95jb46wrk70q05pldnphy4x7gpv7wqjk1zj3borebc6wkl46jxu9bpzdzme49u6d21inmsme9grx1ck9gm00fbpsv3b3cphbi0l6mkxt4uo2d4x7npaob6zwpjkg37qteinifa6osed3wmhq2jsmpf6p1jtr5uw9uweh62oczywycxqrj9jgcdbl7f5wvcyb900glxc74izxtc3e3pq94l40uuhxhjpdji56elnsa6or7cce7wij614e9qu5eogm59mwthj5atekqnclc88ljztk4lwwrynwn2crz1u7eir9qry8cdbnx7z1gfwoi8159ebiullysmyw5p0zgainmw8c7f347q0h3672ft0q2krvb552tnxc5o3jiwiahdkal',
                filename: 'vrkqblrduc8svx3ohahzjdsisubpua59owl0gfjvuhg4kxe5tl9grcuv56ngwalvqu91n3gxk8zt3wczh8hjn6n6k2vqitf0z7dytrckn0t9z3hdg0s2ct7ktrwzhzq6w504gww1n4fh02zypfrec387xjcwufqwvery89pk9pdsrrynyulvnizwc2qi923z6h2k6w145trqp0vejgrlp147h4kcy83cxo7js18hk3u4ahg8pftr9sdkqf9m2be',
                url: 'r8zmwekwf8k1hwzbozjikfoy8ywrz50dghotdt0kdldjc6uuztlbsdqk07i9g83cyox611cq8zgtxhnp3jvx2z66vpto7cn27cdcel80kr9fvqj608taten3hnmxqgwbsc0onpwrizh3wv4unrw1y1t0kgblju9cyh7qhez9whxh7193wj9dqgky4jj7fxalcvhivz566dltyqcl85ngost5lhuxxamqc6w0jg43u2640dnbygtioj482jjhqdqip8zmm6j9unpm2s2p90cmrnkvcxwx1or91rvmmpwq0v8ukdwu9mjlz2osm7q78dxcsr1fnjjkygixm1fywthh8uf063thgod473x6dpr0azxkjs220it33l2x8yriwg1atu0ax8chwejh3plg0kme2rcxkae2qcxjgwgqbc2k8gvsmr01kodn2l5h4yrfhivd8kufohmdqcn0yv2ds7jg6846tazp760bnygszda4wop6c4aa0bj3najg76uvx4pcz7l8bw0sr197tog7mwdwp51l1sepf105nq6xorxk84hz016ia41va8v1ih10cy0cbyi74wj98ox4jtnkgkz0y8hs8tmlkjeiyncy5yltc7xnlzp90yqvwfybubb7gzwr25c1my6wekees7q4kf8daznth58qcto1sgkjzxbjkw9ietfvj006rdoslht1ax1gh47bmosv4555e5olbtb77qz938jqnaj70w70zeeabcs7wbk72881of3qpbuxiqjz3qm7z3cf0iyt1zljlvxc3nlxfalpvwyrzt9rv23232qwt9kgn2wa8lqs2nz8ktsllga1daj6omldp727tc87ycu74bl8hknflmzanz4gocxdt26i6f3wnjs4hc7e47h1l7eez5pcnly08nbnl943c29lgxzw1fnlzh3j5frmipeozvk5xzt933y2ezvy8oiyhnlyvxbxpdfuwk3jrh2l1nxz63bwne5k5j6g704af7g36xxor44nafhn9ikz8cbk',
                mime: '4dpqni1zkpxv7mjgg3ky2oo03udm3814ou2ltfmhimhxxim7bf',
                extension: 'd49p7fmvmt7rmgweukfiosz2bin1lchhiv48zud9o7p7x0w5aw',
                size: 7894396870,
                width: 195087,
                height: 811432,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'h8dbzdamhc61tvbbvr8o2nj6pt8ytcgxypjdedchd5nm75x303mhs40axvo94e12npsaw4yzt29mb19tgejzki7hur73p5owaiv2x1547m04oykm7ze4j62f7xviih0tn7aeet94cwj90oc36hlw3zecv8py95yw6q4gxpd4svasvjqvr6q1r03gg55ti9hy1bob7gsiivlq7nq2f1h712jox4h0zowfrkoas0ogn6cgfnk3mctik4k23uwgz9h',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'wlegg2hr41958a5mbnkjdty08zi2x66d6c5lm',
                attachableModel: 'wtv9m5t8qzcseio9io1lvjl5ou0es74zzzr9c6385xqy3v227xc1dabr7wvmnhcnyn2zz1di2id',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 844986,
                alt: '1o7486geu2j5n79dkcvf43i77l4h1anrsm9wlu67quoc4p9v8s2gzz2x7c1o7x4hxeoan6u89rywoqt21zxobl3tnmxwxm2beaifo3c5d689wq8ekf9075ec8a801wsz9camhcwe0fp6pseto2iwijkww98yop3zlhms5ivvjn9vu1l0irx25n0dy5ouikkenc4tjtltnixh91wb8xbiym1lgrca8nen3kiv6mbingghm6onzrzs5bgt4gomhxt',
                title: 'nymtsr1im3icegkg95dqd2sa2wyxucht0zjdvn1pvd57l73ejcra8uavorkk1esr20oq4hicb4iq6py58lrngw8uflz8uktyybrrbu72vq29u24znxl27rb4fjxqxyhyj2uegh5pi2id4tt71rctueazjoa56qigd3ysqkia3vi20okfw6wrv5u2byhsstqitv5a9xedi1vm3qsg85gtor2kxki4z5ndbtd74ccrwkgibjh7qeyr2a6uig6fh53',
                description: 'Minus sit minima magnam tenetur autem doloribus eaque dolore optio. Dolores aliquam quasi minus ut aut quam est. Deserunt animi ad quaerat occaecati dolorum. Eaque eaque enim enim minus vero optio. Aut ea voluptates et harum voluptatibus suscipit sunt numquam. Asperiores et explicabo dolorem aut et nobis sit et laudantium.',
                excerpt: 'Asperiores voluptas omnis iure quos. Veniam voluptas quaerat non. Distinctio velit est delectus delectus voluptatem aut magni delectus ipsa. Ex qui tempore non aut.',
                pathname: 'cmywzdw2cgi8wanu4mfq04wdwkq4r5cd8wc4l2javw88wi2rnhorhnuli0v4p0irrvh9jy71400li4e0c8uw7eb5yuvbiq6g7710c3id1zozsjlnchavj8kazdgshmil58tnrbw84azs584ab5xsglappie21ij6pzng93h565t0lbjdax0nlt2y3t2tx3gmfw6y3a4pr7eu52917knpb5mnh1455v90o814lsty3zzyge6u4wsfdjwq7yflnb9nyk1edrxbur4kyfwsdwm6zhwunhbwnk8u7ddjss4nl1zojgpate8shwsu87b9qhwegxi3u98t04qv6s5z3y88js8hv3366239rc4xdvtugoijxl3sy5lu6u4itfd5ffntbj1qsb2n0q1l8dsh8igxapizq37ua8cvlbcyc9cw2xzv58p4i83wkx3ftra0mmg2y1ukkse4vzyyd9mcoizgnn7isih1fifwddqgy3nyw2heivqys05rfxhxdasigoqblt0pwib1v26ebefeuu8qa4g5ck8zxmpaw418uupd07j1utkvynqkyh6a8y2xwe6g9yrjmnfosqd2mu0e3bzbnio4zcg57arf49ohhryurmjkfe7l1jrz3ljhotcmajcaeoh53eoekkv1se8bsaoh4nbt95w7oh1nm9eczm5o73ul5swfatzd148o6nz39twl247qe4w2qd0ajbme8itjx60ueho2h74r476txnxj54hum128uf6op90p95gico56sp3296l38jlarq7bat7i06v3jxsnxegv6t2hlj5alsmuq7d655ih1tdeyzeuf4h4alqwr3eyr9ub6tkwnq60t90wqru3puq252q3y1vgs9isdl8bzrl16zi62cmpi5aj5ef23bpvi375gnqymd5uxy3l6tgyi21lu40x7wf4nj1i44eg59wh7uwq1rv6thalxskeloik3222f75iwj17z45hk9ljqtguue6b8cact160d7xgkfio51ho562mbma3',
                filename: 'bca1znhk7d95xsuyuojsv6jbzy78fu3hzucli463uu08ue0eirnbjt9vkyno1u8klxujs018yj6wpx089rjpox35ov4z4cp98oewf5vbxgjkccz5cdbz8gokn8o91o5sp35sof87ak1mitvc09u4kozu9vcafucd62g4wss80mhyir42xk0j5c0xka0xxbjlpwdmg1r9ubx8jjz8041fph50kar9fc5b6ur1amgki7t4zoz7wybweynxfpw0uvi',
                url: 'vnv7qbv8odefi8org170ujon8hxxa855x37rrsanqvb99wo2vv5jwmj6v2a8kb4195cz5hmli3cbyjp9nd2nuljj8rg3pimw0vqeea7c9vunf8dkx3j1hsurpiwz40ui65irj5sjab7eiml2dwtmcl612yzjhye1i7u1u1verjlppkal0uagvnbudzecdmdhmta07579dwvz84acysrp6rctvzenncwqjy23umtzdh3wj0az9i8qhhpo2jrb2abyt33xhh3gdhs0tdrcp77qopvcef2tviofjy76imfkbixn2z88vs49bnoinlo3l9b2bt9tlisskwuuek94ubqnfe6l4490phbjobk9cigx7lbk5ogd55cpgdnl6c2fj9339ez2dwlj88ol22kjja6ksg82ph1u9jfb67fb7obbojxfuij9bk4efg8ghktmg6213c013gvb45ei3m7s7kmcq8453bg49oh8mz3il63m82bapva40b2h07gdsp99xka18aazk0t4txj2dilesrv1kc2v8lf0lym20dcw3iu6ki904gcy31xd3ndhugy45vkvh4bwa9sa8hpyxkfbsq0tu7le1l4twbb6mfg9wwrm8rqjdb98srb5gesreu7biyk8btoibj0swt4sl81x6xpj2soagwyuc7oo47qkhojdu5deio44yuq3smesc4w5ueqgtik6pva0s9pw3tlsu5p55wsq5zozqmx0zbr2crhhn49a7v8bry6a16q3rb3okq2blmvu24869c0yc439e9b9v770kll2nzn2a8g2uwbuzwrmopk4tur52x6pljfkkiufdkutlvupry0ecd7dnzftwh0l2u69hs6v3bu98rwwx2q1vwgelp523bj06arqduay7qm184r1ffohdqa5dp39sl9nmd9uhua2h85c6nwxo86nsj4lm4xr2n2oyljaod72bcu9nx6uikzehz1d6850a2fk7dplyvlo2q13enbu43hln96nwug3rit3dbhqn2k4',
                mime: 'x55bljduz43rjikvqcv8y6lyvoob7414tknn3l24w80ahqf7n7',
                extension: 'u5c6eyzhnp9pyygxnzv1jbm45kd7ggqd8oloncjgx9265oicv3',
                size: 8484448406,
                width: 871600,
                height: 788799,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'u2xqr66e51k7px6ntalb275phgkn66tb72hwt11u4vphztl4acols6fdimw8e7i9z6i1j5uxdxgm1piuhe23318prky0cvq5t8jecqeqmghoidah8c3qzb5gangng86y3gnf2npijzsn127mwn4bupz7a4c23drc3hwvhrs0fcab30lkhxkslp2uv8slz2wqkl1owsy0tias7o6pboyfz5v2abcsywy2su42i91ap440ua9yama6i77y9pp41ru',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'kb7coro7vsw8u8nmtbygkzjvofkddoe5ulldiztp11l3ktaq369k893yeydmyvpavd5bcepmw52',
                attachableId: '5j6ls1zul7x536ifidrd32kscuzag9toopelj',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 501276,
                alt: 'fcpcx6kf995trf9wlwncrho1aci3nwm47ccz9g1eo8zchno1bry4h5ku6p3gy1o7b9yubax8jqi6eqcij8tvzx1tnybida3bcpgx5fu9cmrn91v7otffcou7ylqx7yku7qp1t93bafz5hzzuvfxdx2fnshql5q82p2didl6gi64fpk3bt8pmvi9i1r1g2nr65vmq5qthrd046r2cwtv4dgi03knxnqby139aaft893zrvp1ghp6rsna5xdrflda',
                title: '2r11wqp6tuwjze6ahx6pbuu4ykrjxy0c5x0se1tbmz3u9ocz9k9qlquafu2z0y9vacwwy0881la7sbxg4c0tvgqtk9tq9rioxli4u68d8xifahxxwuqjow1s1m9gkat4x21u6z7rc0kbiyo6z8rmylwtpysgwiz3n5e8ahpq99mfwqzzrwcpls7d3cq49dxbyelxr0o7wrlqib1jjw9mky8uj3tb6tmvx6gbfjxk0mbgyigvmbaqysk5fh3zzi1',
                description: 'Inventore vel sed esse tempora sed ut ex illo. Voluptatem laborum et necessitatibus. Iure in minus veritatis non. Et in fuga dolore pariatur quia rerum impedit.',
                excerpt: 'Et quod hic velit. Similique aut fugit ea ratione omnis aut. Odit aut molestiae et voluptas voluptatibus doloremque. Sit dolorem et.',
                pathname: 's793m0uutddfw0k7c1o03k7zi8haei2hb45xg2k7ea7ia5mgtjdk3xiarbdq2axpyo5ve4e5xss3wbuvy02wn8ira7poru11jok72y5xjrzxyoz4ku00lxg29t3f8ufg3xqcmyf4t2gawx790h2hzl3kmhgpgqc0uxep46luhvhcbbr47nrokasvene6mtb9gnl6dk7zyd9b77bocf9he348s92ku04nl38ox6x2vaf580zosonilag8ehf6hf1fk6cjl8d4lfbsggg91auon8exxs48613kbhi5rfvd8if79ebifotwtqo7hz2bku91klzdxcli0k61acrz5n0fbd8poyludqetvb7kcd4hgmgsh6vv78w5id3knr1c4dmmvugysy6tgxmh5ercjfqb2l0gcuj0or9l8fa1wkq3jjxccpximx646eobfnml15kavvrogon79nngxr6qcjylw49z02gxkrvze60q9m4pzpsypm04bggsil9mgf8llc8yk50c4ih1k8gcwzble7dio7pdji0amxfhuycsr6ruavljlmqh7mmbc7q40sy7jqc0surhuzqsw7v5c2y3buv35zh06mmnbyt07fcomory9kuvygvzlhkt0zs3mes5m0hppvi53fppkz7kyw0j13no9hx7rpy41htla1sdxjc8ui3ni50ia9fw0l9pw09g2lx8wj8vz7dh2f2cvtei6z7g6lelhwvckxjugo0xtfufu3354j9uiu95tf6qdzre63mp7qpa4sbdfh6vrmglcnuhyijijnij9evmb95moxzxukls7jfepwpczr9nq6ederwlgh35xk8jsxylhaen69283q3n5lnmufsw50vd035a278nqsmt3y96t5gs2hh0o0a72ymo0s1bkmq1an4j8nw2h4w9i3hietx15ny5q6zkn7gohhrx7be4umz8yjr6tzk96drsuu0b34z1o5n5ynuhg2kx7zk3lc6iycpj4n4lhlfhrbckocg6tcph86qjtu0e',
                filename: '6vriezu45h7ovp3kgyl6ii50kk4z6pph5bha2367dmrh8enbl5tywymmbxnejzukw8okjv8gf1iyb59byyz3jiki7o4fhha87u9qske5fa8hsqqhodq0fvgioy3ry3s14vdru38w4ogwvd9wspyq0j2cb3wduy4464sm8zk5i5lzpnvb6ljt373fedckrz64z4tn8h6tppiv8jj0bu0lq0co5hmoe790tu781f7tnbo8af6pgxxbbzowwh0ndbg',
                url: '3yro7iptf0wcp4n4udki43ngzzjwy4bgp7i988qb0z6bc7m1bm0o30sorg0wc7x6y2gnq910gn37rfuqnsi4ndiveyn2cex7pvemob5we8u651whn826xlrckvps0mt3239cvtogp48tcp64v8281s24z8ycrgnmejtvd4y8ap6gcte0qnvqmib2jrudobxzmky8dh5sd2rib2wzjevoq3cqgs0bfuf34pnvu4n6v7bq3mvsxwy2m1y1ka3d73jlk9iuo4asjbzn6j1ezwhp0y4ci6b6is0j1ghvv2kyx31es73hisowpd9w1947zf303wny8zid45veil64a3putciwhvfn542rzf5xmk4c4zdnd9uz23315k4sedt2ynx115sicx0gxl54j97adhzj2knekfm0ddrb5dmwo9acw5f4u3xkmh7fvn43w2fdmqkefqp3f9r7x97i4vlkaet0g7qq3b87r7fntix26tslk4ejobx10707xsqnh7q4n1n5kyhwg984xrflyfyj0v0mbmbq5yvyye7tzeqkrllhip03w9l8bkykaapbht22fd5aenq36skbu90actfagde0pohceyo7zm0v2fdu75h4l01p0or7iegajzxxyng8i6pdc9jt46eczenu46qblxtkxz7178e1cwuynqa3nge9lnjbh5t70d5y9uk580p9ae3sfn4ljeyu1wtuerikcfo820znawkfc0ofyqx990ri6r594p5c7vgi4gvoz43tlclgo89c8jowm369tdj8yye4yumooe92c8polnhzma2jlct54628zhd3kl2dt9ijyqtytk7kab3oo6wy7g8cjwrz8ik0nw02a1pp9bw64sanwi3s6pfeoaqvdaucyl1k2pi6zsn6we0knlstfj28wsiz3c6c97ar92ie542m1ijb78h28hz9jv19dv39ucgsbg226ub3lwdruns08mz6n1kroivun7t9npg23bi5487a5g4jvhn6iko2w8re2x8p6px0',
                mime: 'jhyjkj2bn4be8qx4qm4n6llna88npgwwxhah2gpa4jds9pd93f',
                extension: 'ypdy6s66idd3f7d6f9f6xp0iz8eu3f7glh8zqk2zpj20l0igtj',
                size: 5556070172,
                width: 918935,
                height: 115427,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'edr19yupfr124995z3pdvjy4hbp8n14mdy6hk9lqxyl4a80j7kricqp9v5cuuh1kqv5meujsvhqzt87nrzu22hkbmv7q99wib2bh7w12mf3xh9130aaea0zj79azd97svkxk2qlqnilnr10enc8o1gipex67vhddoccxzuxkkhtmsi2y9cg6zdk1nk2701ul7yp1twj83opgqs4la40e17qvax10z2yjrv5udmf8gwllia5t2kldj6okmughex6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'ccpnuewx2t734dl7f3zvmr31ey90bag6lo89j4c7fwsa07tlinn95ykyzvfm702oyrq454y0yc0',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: 'nj25jmldaymyu3lhnoivynrai1y69cn1w9fld',
                sort: 321065,
                alt: 'aqquuh8t9fnncbq0jqfaa6etp4tsbvar0cs1kzv9n4sy6okgiskyg6ce88k9frsxyh3gwsylmelzbqwxaglivb7q9vqgs7u451w0ga3u6p3ia8ly3sblkta4bw20fnqkvxjiga988bns695n1f0in63vxuphxujo4u3lqbneskrlfoqjrg4hli4ky672zq0a8xh8pwy9t0rt0dpphabi0mxc5jrhgqakzniupnhpwne8myhw9z1eog5aw2zm2nh',
                title: 'ypui2kl1yt2nr1okji7hprk92r3bl6g1phlhef0ialzuwfoczur0nwcs5ps0yv32l3hcsf07lkpi0aihfpw3po33sj03kwob1p6cn1qkqi4t0oeze63f6hnbfzfx5071oei16eoe7ffgxg8g83b4d8nqc3o3uac2ef7nwggkkxxyx0bm5l6y99yjmvlxqm8pfsmfw4blmh85nica4kihn4tu8fjwmz85h6dowazvgi7cnw7ey3zgswukhohro2q',
                description: 'Quis adipisci cum omnis non expedita dolorem. Provident mollitia assumenda distinctio iste qui. Est non vel sequi est ut nisi et hic harum. Aut nesciunt eaque molestiae voluptatem sunt.',
                excerpt: 'Aliquam consequatur veniam rerum tenetur quis. Facere omnis dignissimos. Quasi quibusdam voluptates minima ratione nesciunt qui quia.',
                pathname: 'ol7ks0qlej0up0orclb3lqjayx52rx3vw5f0uc3k9571009zty79k5nxneosi6djtud20dsg13fbv5ffuh6gjhc3o442p0zbabaubkua6r04kqzl83mfzclh2hyw8yon2au58bob1a25dbjwnfvt5yccl6asbkb6ynm5s3xluonu3rrldwsk7r3seuuxadnaywrdmnmxrty4v5nm1c5g682kh1qwpjdr89nolalvw3h6m78bhybr7y66p13vmkqh621o6473d3jiub4p00bjaksdxkzkahkobi4zsfjzaxqegzw6dj6qy43n9u99holglv01xqfo2t8ugr6hmht4mh29dopc7lokdv99b5v5yitmqhlict4mtkxxjci4lwnrx4bsxwyhaa1amfbtw6go62e2091afulk2gor8qnwaalwd6ibzyjgmp0f7mb4sws3sjawhd9fa50rae17oz3ezieqmjpv37u0mc0ug7gr0lj36i5emrd613og9buqlir0f4vx4297riourrfge071syil54sh6v7j0v8nkw9ku2483u75fm74cn20rj3five07z0woncnzf4lvf8gkoizysq67t81uy1aa7b942711yauxzy1w5fakmyfzad5htmu55b2ro301heul1r0sjof51g37ux40gzddjzgnglagl5wh251gjwfycwhq9twnf9jd8ntvcca3oz5xkmuugjdn037m4jtrwpr9tfyht15w4399zrsgkf2bo9pwtncswua495435omo5usez9ahjxzt1eoicylsu7t9wnksws5cbgrqwtc9uis0h4e50o3wcwenr93ikjtizl9jwr17g2gprm7trkbw3kwxtyr5o733o02n8fm2cksm8d9hjljedclv4hibw8luuy2kjfzujxpwnt1criknn6llankk10hvqnyxyllfo4xqynr4q4mnlyezvexeuc25ghd8ffvdnpkk0f4k3i1wgngknheip3siybkel13m744b3n00zh7vvr0',
                filename: '9b3b6oigvp5zzb6mlbq9pmvwb7wvs8a3h9kvgubh7qvpc1524ryertw7psqykquhbbywf0beo27wkr82ngl7res8l0yng6gef8yjdutzdisg6z3cvfxn52js3bj7506rl0wug0wwcy0xjydjp6l0nou1rjp3hsz0imwmyaghxx6i80k70aakmbspfjsgbzz6t77mj93lbcc25az2kblyuzg7qvc7wcmsdq030unpw8yop0c3lo5h595yb8ljuvp',
                url: 'bd3eutnpx9d5yziblt72023913jq610prcrolk691qhi951rh5hze51glm6umgh1siuzj0r6h15dua82v85uclwb7oz7boh1iif58gucsqb9dp695synmcqbfu3m2pm6fmeob0jpt0ou7a6aufus21ofpr2tlu3fhv25hj08kpb7y3obuxd1gv3781by0zyecjq02qeqjs93kjbnmiqpj5xanp1i5hq1p7w6m2tnvwk1gzadbmrcvisb8k3tb6def3bqik6hjttk8pnctdyrcwdu1txauvpbw6gc7rewjtzds5fv6mthrozsqlvmxv8mc3nj9a2227bvl4ey047yjrccrdjlwcxvc23p0e6vk1p0edtoiqebh1z8dei29jzhs3s9fewea7gcrpd1wtyqmuqqqgrgg7a19585yd6cirqjkrtt9psr7wa5uc9lvrj2m4jkf6s6sodsig60sf1r4budfxvgs4h20k45ubl4nn1zsiho8gd7pqnwtg30pakyxirt0vhuqfh8676aslrd0qwt5jsfbi73fdagsbt5myiv3qhttjgif30ghiof0m0ytffijyim16t5mk2sfbtsyjy0fy62cc7uwqiym55cldjqtqjhej1dcib64f6x4vf3naluvc3e1fceebtb54w4tfv7sj6jfv1c9y6t2tygumerli4glg7pd6chgyg4qo3dimjgcspyfu0shrs3ur2o0mhttx9n9j3ozqadv68mml36i1mjalba5lraf1a8zu34d6iaooci8yddcz1garxqpsoe2zw3juff6xrl2zrphec81id6tkosmo8ytmagpe9tq6gvvgqi9tl110yqv05i7ogsglt7wc76hqhowkdtgn2520u44iedxky6xbutq2s3d64ovrd2u3vpzll8uqz6svd35iusnhpojjzoix6qizbj0apzndw7uneed0jb67lc9wu3k38q0ldybt7k8bcawd2qfktptoetnurldv0z5cwgswcbcwy7tv5otkshu7x6',
                mime: '65efuiroewr1lmrv0rcdm9chorxvicpv84bt79bpfaykx1xk3u',
                extension: 'vwegeqi8ygb4amwueobrgv948tcc13x2epz92hule58yzdtc68',
                size: 4953891829,
                width: 678280,
                height: 163523,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '7uz48wbn14n2kwoakdim6zli205z3sfgogw9v4km3t7p2fizubqx9fqf6cdae2dqxglqany3k3awmmnq171makr585qhz5sqkayvwwfin3zborussxud2wzszxhvhvunoxn0kbc6jlfhl61u0nmfcjeyiu33ogjr86xdz6olmgdztcksseuj79sqtumopf1b6peooxzf8wcg0tmit2bjxq1zsbj1n98pgmwt9peb156ycagt9lq9a7uz3eadoz6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'sby6mn5x7ze7i0f3588b7mxi3ca4b70oge1melxai1eqwzjl75s0gn3kif5ky6rabeelb0exu97',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 280506,
                alt: 'thokx0r69ghsbtie33hdbda9b5og9tuyjwwjj6zo9fjfbe8vwzj93ojx829uhogfkpke0bcxbri4k6jy9iu8ps4pwtpx210bib7iptz3e16ztuurb0qi014y6qhdaaq18txdlscifwz2uamv0hv4s9ok478cnh5rzagd89ivmg1p19o08z9wqejkjy9z1xily4erpyfn2mw7t31y4q0b4ncra6470k2cg3j9n1z7bm7hbwg72rpke1ehkrqkgjp',
                title: '17s6c4zzmomx5ubpzv4ru8ps5qtz0tsy5cz3ipwurp62dxcco0ij03muk51bhuiifc05mkgx61u6s4ykp5vrbsq2xh42g2xfovlasui1kfg0aga7w47v6qv8lwlj6l22rcmb71pfezkq44p1hs3h1l1iahpc7xao4rbnp2oto200q14jmzw210nu9yag7276vz5kcnpu0m03qfa31x2yj3depe9ynzcua8y5bidfvs3qjtv4dugec9to4ixgh0n',
                description: 'Maxime facilis ad enim tenetur. Aut temporibus vitae suscipit et qui maxime aperiam similique. Perspiciatis laboriosam ex nihil aut blanditiis consequuntur cum quos. Consequuntur nihil aut in mollitia enim non fugit. Occaecati qui soluta iusto est dolore harum magni et molestiae.',
                excerpt: 'Quia nobis est molestiae veniam. Alias nostrum nesciunt sed omnis nesciunt aut. Eaque a exercitationem alias odit. Eum et voluptate provident et nostrum suscipit.',
                pathname: 'jwrd8zojegay19ulsnl8cr527wef2b1kfzo28vqdjronornjuf0fkymqj9f1ke14o2ekvq6ky7g2ul3y5hcrls0hcersimdxbskju2jnxnvjb2gzezpn2r3lfy8vk62rcckjkcjakzim05z3xrh814zp1v0kis342hj1jwvajwf8cuo56l4ise8yl4eco8d4i4gfjdycu5hgqm3t79xnj99hqacfptf0ksogjmcps6nndno1lvmu1rqk77cxa40elvyz85adgl5db4f914cnhtx5vlvryzts0fxx0eoz0yguz2jtohpdndpcihneivb292cr733rvo75txsqyhie3be3gpgy00kbxvbtovhsx9e13zultrx8se3u3f8mxhkgze4cjsitomm68n1fd7g2a851bolpqvqi9kaywi3tk7jovoygolmytg90oqwebqthii48g9i0nzoq5kh4mjhevelc8wkjg2yza7ups6emh4z6wik0mrkzmheod3uk0tdboxmxn8z1oudniqaxc2jr94j3t5391tq628hda6na68mvtpetq5xu0zqpno62wovvu72osiwl80pfkckb00y7yqx8l54s0bytezgf5rdjeolq7n8p886q0fktjhpzucwetmzsv0h9iculd7s83eb8q6qzvdjp8kdnbffmwuex9atgzcprujg29x72hqqtgspm21dmyqjfnfbicv0xnrvr5yahsk3rmbflg6hxfg0366a9c1zu9o6dncdjzbcgnp9aoog07rmkaz7ttv31caluvwxenf9zlaxt5k9u4nzzho25cyivm3j96z1z5p4fxdrzga85ideshymp2rwotfsp06soy80nucggrb5viwgnncafcmagv5lwj20l9d438ea4qozv6al2e2krqdc2sd7yx8z9mwj5n1n0tk0t3wcbu19345g76jtf4z94ej68m9i979x6icwohoj4rumadg95huaunztdxs37htgie2utg80njyw1o72klh6r9lrsrruu',
                filename: 'ibjwjlbuhw8xzmd4crrilp6lo28wc1l4ducqi04z19sh1c5oi2iga7s4xvrmvda6au46b1o6e153z1au0jg6qo365jf4lghpilz6r7rragpoj6jlhuboc35ebzee1t5ochw7ydw1reoxomc33061ia5r5zxohrir52tteo9n0ntn7g84ttb3cmpvf00krp9f8qvtuz9qwfpqx113qyfr7d6a0m7ihg5ckv03o1glb2xub3otmovfewb8gv1z3ya',
                url: 'xzto3owwndos59rn7rp4fa9rfv46uz86g5edfkrakd5hmnsjqwb7zh43liu9bo2krnn1vn3vl304d1sqnocwlq1gtzczf8jenrtv8iej7g7scraoqw6r13v53xuthi1ahqqaqz9knisvlr4gg7tdqms4zcevzqq6wtcelhu3bvtevovmwftdl4dz0i0m5mwm9l5h9sg24qz058xfez2be41xkwuurpggjkb2x0ii6ft8mtgy46sf2dl3nldx339u47j0ozz7mtmsjlnvv4a25dumvatbp0ny13cih6lbgjraxfzl6ybzg5of2uachq45cut8p56giwcrey4cvkhgyginvcgei5yyarfdm2nk7dfnw6je36iykg2czroo4520dibfdeqbg3ng9jp03038p54g7dj5goutw24dim6aosm3t3dtbmyhapgs97wmjeovoqc862hq1p7ibvldhlqcmydkx1lg4atu2ofw1h9zra3w17fqw1hnlqif9yeqy13atf4ck82bqp9kjz50aomrahkk0ulc1gb9ihc1h6b6kg3e8ujnmkmn7i2btizdbnwyo61orparjjps3c2uktt6x3wodkxr9t4hd7729gbg1l1uv6atdxjco22qjedljrwiytu38189jpuy8rlwb0043keonbbvih3pemln553h4xv969hf6nmcw4hh5rfvmfxu6s28cmpxgc39jfhqkayyofmls8x0hrd27ezdifyp62q84s31sqxbdj8lmauvefjkroligu7clx5wg7vfomkoz0m6puueuigbe3fzynzn6jzoiwl2fhkft1238bnlnfr2wopsl4o1qhivv8zy3p7zhzxm3h6t4zsk5jmfnzcinuucb99fpu76ne8q5lvga2mdnsjs4zwfvigeq8392p1fvwyufhrziqaoix27jyworiup353bybgugcu8ph38n60zyvb7i3jufl8c2h1ntbgtmez8kj6gfhjxkr099fs56n6p31ppdl66eojdugr25ulr',
                mime: 'pewg8f34uew1nmqou29yinfihh6a23hip5ha9krcy3zi1w3gvx',
                extension: 'o9wt1w68m2e8b0bhodw1wr5nqgq47gtw2q07re5mc6yuyji6f3',
                size: 9393715416,
                width: 948396,
                height: 140240,
                libraryId: 'kk66jfb6656mznnhtttut0hbaasm9zjqlmqls',
                libraryFilename: '5jcudy9rctx3iva9y29jmjf6dcsiqh4yhnkoo4ihv4mgsfekq5vtejl1tazii6z4akt6o2p8iv3t78mupxi64cqm6xzo8hx8c1qwhandw27v2oglmu2hfpwtajfe7z9o39c5f4hvhui824317do74ixh9tjehkjcprinu9rsauulvqnozftg5qjlgh6gchppey2qs06blr143g4lns1fqixtt2ietvs2n4gzuez9rxp16s3z05mtapnm97rip80',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel is too large, has a maximum length of 75`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'goheqok130waj9vn2rqlv3idnwrcxl5fhevyvildc5c737bsga8314ylyhsfxhurd6nhc98lyqy5',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 261784,
                alt: '11ej5lzac8uwg24gtl5mqd6w54fyopru6cqgzuxv1zi9g20810zly3tsr79tlvjyz0n0hh2rmiu5sycuvl3vxc7dqhianl90auwcmlklv9d9mgslahi3j5mb66aokdvabiilrh7q16mtmfv99h1r9frkp1arr1sereb4hwihsqlpanq57x8bmldf9xj5q1e8ck71shfj0nrc3y9j6s7nujw8uu8nrbkx5d7rag1yq6r7799puspmdv4xmba0ck6',
                title: '3e3uff6q3g3lu1t3ik26lbs46j13ghdpej5stexe6pj982vy8vr1n5gdnzx340yjwwetsjbv5n349ktqjf6mnh1o27ejpub2xwfahha8y2rh0xev5n9og5s50aq56vma98rvaxv1hb10k1iqwei0hvb6dc08ffgv8b3pqqdod41mqa41n7qys222uoc6lzolew26gmbmld8onfgknto26alj225waebdhhfknkpyrjjlfqb7lq3v6eebjdkxfxq',
                description: 'Rerum hic sed. Numquam est sunt et optio doloribus ipsa. Recusandae aut dolor. Non ipsa deleniti accusamus ipsam earum porro accusamus quo sit. Sint quibusdam odit. Nemo voluptatem aut in nostrum.',
                excerpt: 'Aliquid magnam vel iste possimus molestias necessitatibus consequatur. Modi est deserunt et aliquam dolorem fuga eum tempore quia. Et et aut hic quo qui sint ut deleniti perferendis. Animi et possimus exercitationem.',
                pathname: 'r2nloh8z2l72sikf2ugp9guasnysij55pjom25777nv0zcni74nffjlcuc0rbzp5d3x9079gjpl19wx9zc95hme57bh324qbb5r6f1pj6kz3v9q5zusa41ivxiy34w0y20lig7mh0tkv0yfssd723pybsm916ifxal0txaz2g8alzl2tjlqhyio4erxok6b99l5yxul4n7347uld97rupszbfpistgzk5t4vylc299cgatvh9h1zzgqpw60iedqbz6ymry5cio6ib2syo9y0c75l98q7nrr25g1o4u2x04yjue7a0a3y2thrjlt5rnzjhbi68n3o3p0670tldkdqldmw7tq4rd9o70ildw2lub033a7y6h6bcp5mhbait2o44m40mtpzrvgsjo2l5d4etfux5yyk5aqo1uf7403ctkapkaa2o4hedixxzr0ekesqwdwwqp0fl078nsmcr9kg0sl1fwuy0vlsovmgo9dxxc24t26imm51x75cqypj8dzhidl4pag5joix5npbb2s96bj628pa2ln5kuvqgbccml15rk6tz5xed4llpiv9urddgzshf66n1niviqirrwu42qyt1h5il32iog1khq1rwx2fazhrmymde0xi0mbb3fjgnyq275xix7r9ulju95gfxhvrgvx1cb5pnr8e67jiv2vizx8pl2q78ia2olhoqy94t018a2fn292ym38zkqph7rakeeq2c7dvwblxc27pux047mtbwnjvb4zz3ilp5ky3o9pqe1jyqfnj0q3cv6hepyr86bl2jju40mdgnqhl0k1najx0jvvtw9add0gka3qumkq5qaaw8uib4x4elxohqzu8be8gdzwtv7voxgu751t20ix0voe7znwnwuqqw3vi1j337ixa34nxpgcjl5fbe7czf308piphy8yba71bsr56cq86aspu9dyxouhkwpm12p7j9wat0ihbdn6wjbikr3rhmw3w12okt9pgzugv1r5tgn0m1nty20qsbmduvqtw',
                filename: 'f5v2m0vxmmj3ffobqiuaqeeldkrboqzxn1xcfdqvcba82rksbyhy3o8hei029w3avkke3z60apc4uhv010oi99eh2hq5hlrko3c0mr7xt8lokl9ml4qwm0mkz6znsi3bodyrfpj0gkpu5lyz70ello4br5nw78au4mv4h7vm800civeo8yvdugzmfe3bz89s5fg9h37q4oj2nspd32xw5l8yko16sm0bo9d766k9vuzhnp3o83day4d1l33mx7v',
                url: 'yxgbi5atzewk40e69g5ddzjtr3hz33ym8zk1lcvck9dq8x92yvycakooz77q83ggijzulbtv8dm1wkxlt5jgrr5dwif9kss6fii1kdxj0fuqj9u0mfzdgywbrvp74d5jl6zu92h9wu1ubmuamvxe3zumbi9iejqkac7dj1orw61rfayviz1dy1owinjxttoeh2h6vbofh2it2lxwl5db9tt733awxd0vwz8rgtue1pmyc9y7m8p2efssaed29bl00u4fh2dsyj5m4pwrr6uvlz1w5vmtgeyz1jctjs951l8hpyg5yilcoh4kvsu3xgji9vuehqoycm7kox72wgasoii274545war6n2qgqcnvuaxau9ccb8memmo3hnzcgz1ni5fkfrioodogdmn9vo7rwj27epp8tucdu8cfh8p62mct2qgptffvro6c4xduybm2fg1mh8yhml0lvijr9jryi27hyfl53wsdoplrxnefa3qenwl5c7qhr0na1ytcscdi4ntupp865w76mprwzr21mix3t1u9w30btzdh50mjsoeq4mzxpnv7mse03a69iv84z8q0zoswy2v88dty4tgxg08387cc6xj7djoxx96f5rnpuhdklq9agoxiv8lb500vzjuzi73aymiwlztchqkzht447gfpjrw1n7k4qxtidpgyflmf5iuye4sv3jh8ib3nkevtvq4q86r2546hiq4xq0glce8sjmn4qmzeuqk5sos03eujgenham6xuk77yjlivcnrzheo983wk375r2jeb3wc7bri7fpr9we42yrsp0qbent2nm1s9e2ajft7l1w4q72fwxs4x0ka38qv4elvi1o74m561i46bnjszjq9d6qxmcmrkh0npojt9dg1ll47hmins337zn90o8ixktslzgqadgqu3055rzim6nanfsztx1i3ilcb04bk232rwf595uz52py7lhhc5q5hilaj6qvqr4ibu1nhz1um3prv03q8luru2r9pmemt3y7bmpe',
                mime: '46w9vsthe211u6dd8gtvui2j43eu88ut3ko6xv82thv6084nxl',
                extension: 'mk4vsrcsz00ojc3p0ts24kl064t004zzdd0ztdhqhdnrfz1nf6',
                size: 7998100991,
                width: 364137,
                height: 720080,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'zwux7e6vmgks9etfgi64o92kcwuwtzd01zzxz5uhs0nkd2rco9qee1taawp3s9n7hfp7gf15ssslw1dywl4mczacqkf30hjn13s1ywivn60wovlu3nta9b96zvf4a6sivt95w6e2ozi75joxhe5yza29ltgaxv9jynonpyh93zv327pu08z03x9k1i5q8wxmbigj3t3ywwf5r257lpx21rps47n0xnzq6sgm6bgt664cx0bu5pwzy3j9f5553t3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel is too large, has a maximum length of 75');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'necm739yj99u8crea9g6ogk9s4o4ox563i8iwr42y3mi0jl04297ttab7lbazxkrike5c5n1ol1',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 3034305,
                alt: 'xzjstvm1trivo4waztlmgz57kkbocuxm0hczcc9dwzhujwnujgc8uf5tgjogl65rzwoy1j6xguevc0vrjdfgkedcdv663c2jjz710i7rdf85ymnhhwdzwmo59pybesxzwabkbn60gel4whgfxgz38ty80dsyblg2nortx7gy837e0es499b2tar2rsxghwalt3c12cp0fgkosaxx3u3z7kwfvwju7e36jfpjbos8y4oqd8eiuv6p2aemlszulga',
                title: 'lpy7i5ju19qe94mk6wpo90dvuq4ie5fscueea9yegfx1eifhvgafl9vj9dyxdnb24ge51aygukgai4mpgbm0xpj9oq2dizx9pks704jpwa3tjl6iqj0l1n5nhp03bx38af19wo0zgxexo9k4ap40ps6jllye6lop77nb6mznjx5n0g3ss7s3vsnef1jnxeac5yjtcseq9laewax5xwg7xsn33of3bfx4ltsukulcpb3odnzhpejpjk325sju81a',
                description: 'Ab est repellat. Animi explicabo voluptas. Esse porro esse.',
                excerpt: 'Earum voluptatum corrupti ut quia ea. Vitae laborum suscipit id sit eligendi. Fuga autem dolorem deleniti consequatur sint quia dignissimos magni possimus. Non officiis repudiandae laborum est quibusdam et et ut.',
                pathname: '8efvbz1n7cppfnnpsx37ws7k07dsuh7yz264s3s5n47ftrppux1kxky5cznym3h93v4k2sh90dxkkhxteodr70071py3a86heqnwnkerqkwp0w284f10s122qsx8hw18l0uo402tnrws5tibg8b9cd8yh5s2k17qtimvzh7jn29pfbbojmn15sqi58bzba4f11v8e8br0ttazru121q3gg0cibgn0vwma82thgqhna8if1iymq4834i7qxto2eb7caxriadl2kmwmx8hc050xwavd1d4s845mfqc33sig4ptsg4ajtq8573ozryzitjka4rwu5usjrgj0qxb5jvvj98spy8esyudfqie2157za0qbov2rt14v8zjy5605hb8n9yogmrz6zv6lgt1rpw7toiedc7zpjbziysfbdjw69bx964b8tjerv1h266n4psr4suvr4qhdj44y2gkus0a7mtvtv7bizq3mct6faev3v19xdzo28ev5qho38ydlnj72gls705torztzhc4dm111hwqw7u4hs6349fvb0611f4sk07vlo2yyrkdmd2563lxewo5om41ejv4lxfn2qpkn02eomdk6wagnktdcevj3584hwvodgcwdiwvsijo4uc412ww11psceafgtcvh4sh3xevhzds2gumswtsh8w9sobz7599k6xpvf54ny61nqfi8ce6hdcvjxey8o6x90mc0aknd2g7xom1fvkqplnac7016gu9sz8929zodbk1t70mv9pmkknthcq9zwh5irs6tlxw60bmfi6cot5tmyxhy5mlhya3uhs9tse6qir23lls57maasrq1zgvizcm86kr701epx1buoey08oq8l69bfpxga44sj8t2kap635l9pnqvdu4zv9s9vh0ri9vpyn8tsghaq6nxozo06wjz5aw7360nal789fu1atyqqeqbf8zrs5hha7axqz15u5rj0bbvdssuox4keey572emala4ex1h5god41i291w9pd0vqcx',
                filename: '6i4lquieezivi1v5znhpb237pgsw9mgx0zu019qi2mpi49u0qpkane5s5iggwcfv3iarfv3to3t3yz829s42ilykmf8p1bx1cq8jhvt3c6oe30duq1r5fxa2lqu347mz6804wl5s6gyx24oj66rrc992zt4zrscz5d86w8l2rhxpkfswvhf7xnpuyhf97t156y5cbzuu8o0zs2dwpbamwacf9envhk3hplpr9ps6us6oedl5sx0y2anl748qz0v',
                url: 's2fdcccko3sakcvijhs99c0ncsc0cbcft8m6ivwa8kcisk07rxnxhz01nxva6txxj89xdbt855wpjwch53mqwkj2e273fqli9mtsggud7bny1g4bz51wq2etw7nxptnscseyr43rkcasroojyq5w5b83grfcdssx9dzkgrm4t1isqfeyvup2rh655tw5iijt5vln95uvukmu5d0qanohf85ajeaqabnjvfngvgtqox7aphea27sklcxsbzkoe2ax8drntnfyrxtfvlls4dxno0zo81d27x4rubq2p41x9dpsgf0vde3jocks3oscmwssgoa22b35yz59rx7iu7oljmn6p8zxq45pk5in2cgp50hzdtol0mdplbkkkhegcvamsq1nftatwuhk1id7yi8uajg6ykz9rucna8kazgirafqu2gw7pun67iu23p5ltj3r2rhxgza0750kw5sh1pa4rr5vlbht7nhvypuph3vs0dg01sgv1xizetf27va1ikq24ka07poh14sz3aehldcq0xd2zpzcndxxly1fcq8yb4k28n0ol4crqoyp8e1xcj8d5jhzf8hmaw4v1izuaxmticnsswhkki0rpdez6k1w08cukhdkzypnure6jji25qh98qfqlxj01tbwcvx91lzglftnhar03cv9jeorw0jfcjq68o1wbzoz0mpzfere1pq4fxwmsbhc4dmwvs9esvu359ijkw9tm65ivkpqkzm91eqgrp1php78uyav8u5cdd7tvuaaju544yyu648i2ij05hmuxmgzaif8ycp6o9c1k2oltrjrp4ibpb0cl6m9exzqcnf1lnppzlmo43sc1as81b6mbjymn1fv676j30ma074a1e1j0r967q8a6iu3jkcogkgxoo9wz7wssamb0vc7bggzcl3l7gxxxdnsrmn9ux5w2ywl2ccje27qdx3cnehj1zfkbaa6moujx84y1g7j8fwdkmlib8slaj50w1n6bx0nl0vx600ayivbmumzgtli',
                mime: 'qaefg2q583kuzrsbm0v1o4lnau7fpgg324xw6if4nmem459gbv',
                extension: 'umy9zevaaacvsfm5gh9fl4w8eoz0miadot0o03g4nkg197uopd',
                size: 9108339775,
                width: 478025,
                height: 422136,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '7dvfptne009z0zz13ay9t7goxx8y8avng8xsas8bja6frcfhqdhe373qfvwtl8vrbyo4bodx9f1tigtfgp5n2oflubsvfwkc41ts2rc9xawzmqfpu46lx23pwk7rt7rcr6xxsj5lk5wt3mmrxjn468yc1p5jab9sar9jy5vyyfc5y3wgls3tvcuiiqmskbq7oh3xwk7ohjee5h6dyycuiaac7kxr424din4h1ltoyln5gstdu2ogiucn77wxhyo',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSort is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'c78l8ym8bspdxvmy5t61akhcoqu482dlbqn0ovcwilkjuentsi2a9qs2gfm1bdhiuwc687kkv29',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 123301,
                alt: 'ehlg1h236enjd2i9hspfnvi31gtgkeldtpt7k8q3yblcm62ujefva52kaiec73gsvb60zuectp24qy361qcj76e7m77dtgqhw96s82erut8mj4c9mq83kn4x7wh3mrufygqzg1j2462c9lyn2mo6oweii3gpjd8iq9a2d1zucifoibcd3oyz9tniyg7m57p8cndh2hyyxzhl0ix15yhujhq1ybeclechnzkkb5t7iry147sels8z6owg7bszy49j',
                title: '1g6m2nd4sk59jeboluv91h2dv5kgapv5qky2auiq7zf7gcnlf4k1ivyspwyt7yq37x1typrgxg6jf0proqnjkfnc3oyej24o8lqqdt8lh0h0rl8u8wo0ho8ekedwyq1188duksg94mdsgsc7ijkbiik42y4taolm7tys3zw493859dsd63rql15a2999ctwxap8gmowrjxo0atnbfm7el8umiax1iwe5r2ynflw7afbvrc4agonx9t53utqgnh6',
                description: 'Itaque pariatur quaerat nulla sed voluptas. Voluptatem veritatis est ipsum exercitationem sit voluptate esse deserunt. Qui repellat eveniet enim ut. Et dolorem doloremque. Ut quia eum minus voluptatem voluptatem doloremque voluptas laudantium tenetur. Doloribus quaerat sed est qui temporibus assumenda aut alias reprehenderit.',
                excerpt: 'Incidunt consequuntur sit. Rerum ipsa tempore eius sit at. Sequi quo quisquam aliquam porro. Necessitatibus et enim est et provident.',
                pathname: 'jk0e4tdb78me3lhxryn406tb8ob0mrxrq9vp1qp7fzpai7w4qwvyvpt38ikhjn8eesivmnmtq81yjdije9285jx00c5aevlhkhmzrr3bt6c4z4bmx5nxvsrwhh11ejsustn1gp4ld42ufu3b76ics5hnckwccno9uznp5lrsva10fessggfgm48bkanlstgosjzdu6ffntrdz1vwolmyie4q0zatoqopj9tnzxskw07n9jakg6r3gpy5zm1w8ssqwtv2fkkpx94gf5mlwls5rf9yfzz97jw8t7wb3kwkc8il5rpazt1429yvljltaxvyucfqdn34jh173g30zv2q0a5mpdyfvf7fikgkl995n3alqv9upme4kliahrn238emgn84luwq3n3hj72pxe9s7z3oiyaa5zj4xdzsgh0blcpidugdw1pttwrjzjgwjhmxg52y73rz2ejj5rlpc172qptzciq6hzde2075ti5b79lexpcsj4iue77b5njecdmq291mcp3xatq28b7yrwlbf71o0x7hxyvq7y9w2k20g1y5khjy2ly7t1onwil2da42dleol4ix6o39fe891j6sjbgm8x4nh2ks26wbix5690q2pxpska1wi4z8deiohe8knw7z8i53gcp68bgv3pmsnu9pe3xcaah9dr0d0yha1rqvarzs3z11yuyhkjsqy4k3b64s5s3boty4aw3p58adnde4tz9s6z93bjisqgtl43bt4yo3scqmbyz13ffiuirx7y7h7u2rapulc18azw6irbh48nn8cv4qxgp6ltlo3plua89kt015vldd5t4k2v5is9g66cxi3o06v6xblfx5mu1bci0qarku3zbfbnkztgy6fo6ri0ddfgvt2jmbe3sm3v3tl2j60idsaulampwmeel3gq3apnmt3gfn01crk5pucdnv0c05on6p35hlm4uvacloootxwqlrzsrsfjq51ubgsek2nuhenqy9orli4ftosw5yi27xat5zrd6fc6kh',
                filename: 'fpxix2bs9hsqeqqx987s8w608h8rc4es70v30xhju19pup1b3xyxcjeqew2rxp5lvmspeycj9awgggf49tl9t6aag524zmblptv4fmp52x3nbs5da7qx34me0k7z393bwnkyfe4dx7sb85edwjuyxe2e9wozj69zkqnf4xt5tivhy5y0ngd15i49ybzgfixfrg293feo8wr8zlbsie8y1rqdsyqhcv7hi5xa6nnrohey9w0igga27f8a98ijeze',
                url: '72d1xjd3rba9hixc71n7rl7bkubq4jgqk12owe8gg53o8cjp2a2u8ourlqliaeq845iyre4rtxex8h8dv2bahzom98kvghb9j2fgpu1fz68vdior5g38935xhuskhu93cp39pefqrx2mw4p26syssnnoviigjkrpb67wqnwwfe1puc4fvvurd35un596xoarmt47yvqhdp2mxnnhxm57y85oeucydxgvublfe73vuhihd2lhiyglq4z75bwkughzfqtgsbq1pnecagpdqas5j4tzwo8pf5jxfowk8rgmxczy56i6kahjf9kkskj6iedwijnvejqmzihq7zdaj4counaia3n08kl8t2xlh24t68ohq26e6ta3hvkwcgajz7pl86s1zf791efjaggrhg633d7krjsqrtfcgrvu2dsq5n7atcrojub9hwu641hn5ao5kgvuhmlja05b950uglcc4lobu79gvp7eb5n290uaxdauv0w0238xbx433k48rr0dh34mg9mm3ye4332yjvbthyr2c200us83nvcm2smgauajmg5kcnmpp5po5s6auovua046cvhr8q7p9a1xrav029sjwcvw6s6b0ukts14fu01wp3a69gv84v5842tlb1i4913dc9e7sgnkdy7wya6m1is3igxya0w1a04dq868rrb68fcqy5qm7xrx5urhehze573kmhi48a5vtyo833e7qbntafeq4huv83e13o2vna6sa852ovr4pd04gr2l3spsmetl18tpnscmf8q4flck53qifcdwwwozraadarpgm62d2j96n60bsy4qhzcau15zri1i1azk7qe03d1i81r9df69ul12r6zzv0d1f6dxqn4dls7gxk2m2vvebsperfc90085c32wfjbausrw2iom478tvb03hg3l70v4gc6xj8qp70ff0vzk7qay204w23j0rupvcemp5owctd31md39zc08hptkyybhqt618jyp75pzfuhfpozwzgcpihkhfvs5',
                mime: 'idyydi9m0dckjtilu7ggbd0q0wf2rw3ogzxmfvtm7spkg2coxu',
                extension: 'ioev0luhox761xzu3xq07qnseyavdp7lkuca42ubprom6bc6z1',
                size: 5948538109,
                width: 228114,
                height: 453510,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'y975qynyq9dq3bkjnl807klmjatwn3sc1561yvute4p8ng7i4smx9tnujjlt6es5cu5ntltcu4vzm7melw6bwr6feq8igvzwkena5pshkam1s3ldnrhghypzj51cp0d6agdra9wvv5t4r8ginai4r8gl3s0g2g1c5j9e96tspcnz1ygcb2q404llkcaup0c8iya4lmcy8wtwrghaa3jvq9j3u5x0i3sh0ha2h5w6slsyixrffxqb67627fvpnqj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAlt is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '36fto4tq2bzsrbj0od1bqo448sjcvb351hay3mjke9wnlibq4g8t2fx113kf8sfhlox4h80rpff',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 145330,
                alt: 'ko5ytl8vb6inck4d6ysckfpd50keh7bxnrld2hvd53511l2gjkup80ysowfh8tpdvvdye3dcrgy3mluu3hihip0pzru0iy62vc88t7iza9jpugs3ozc4i147l7vvv88evxfq1x5vzidwof09jy6fjuj1aqe0uehf6inlpcqoivjo6x93ika24ig6k28d25ybpypsk9d4o2l51lb07ozecrkmpbo85dcayq7wv2usfdsu9t707l4904wti3xs4nn',
                title: 'q75lyixarn5ubsm77emhz18sm8eqzmisbp40oifctr4mcc4m89er3inhivnt9ud2yq2mvdwd5g07sbknny91pw7t7xsk6rxnptx1s0q43q8x26hzsx4jcqesqkpmymi6x2f8lgz40e1rniop90fmrgfp8006ym68ngl61k35z2qteuiwa4h89bj90y9az5v14shqcabzlwy6h2avu7qx67sa3saffedo4zltj9pp19w91kwd4bv8amakkll7zi43',
                description: 'Blanditiis impedit velit. Repellat minima deleniti eum temporibus quod cupiditate. Dolores aspernatur consequuntur sed consequatur sit doloremque nemo velit qui. Rerum voluptatem sunt. Magni alias sunt tempora qui autem voluptas explicabo id voluptates. Qui consequatur aut nulla porro commodi facere.',
                excerpt: 'Numquam in debitis sint sapiente sapiente. Nobis consequatur et est minus. Cupiditate et dolores dolorem excepturi. Molestiae consectetur minus. Magni rerum delectus iure voluptatem laborum ratione ullam magni.',
                pathname: 'hbb4sk1jsnu8o0c3bl4u48n4gtf4228zvocdglpt733rvpd8ywy8lt0258n2fs81y2qtuwllvpucfpzev0nydne15yeo32jgvk1ezjle4q9ke75wlf2epb8vlhhr2jjrwabvrg8y9l48yf0210x7nt50x4bi1gqcvlywxfgwsvichrqbjow23syrs9d7pl3eyf0yqn5qjyrokxmp05asm44z72jsausnlq5rhdc355ssgan55rldtheufsx262eei6i07ymebvqf6d6ot8vh3ufq7kpg3wu06vm64pgopheldpay3usnp18peevp5mbloo13esp29fchlj1rayli4pp8acxyrfnxibu10dxcjfossfwhuvn5spges5185tylozhr5o9443yd5p3a5h91zguwmrnjnc4llvov97s8irxx7kcaaumojvdsmpfjmoe7negm0ufi5hmy2esrgwafcgp35dxpdx3yvj0vk06zz3e3hyxruumn1ftica9ixebh4tc9fzpj4d7dx2lv0l43m9a48xv629877uwqjtjjry880c7voiiy1q091beyr2isrckxek80pnnsp8uvg77xydyabsmhl0yo1trnxllng4wbpt0cw5ons5qp4fy3rjpzgl7vnlkau4eaul3j4uucsn7e902te8n97wq2ytk6bh27518dmi888f1muclw57uyvjoeiyrbro36ecta496z4z7t0hvt4cjg3csshuvw3wux375hkirrukkmd0brmm80nk3grbipovzm4uj0rz2ecjcy7stg6b34z07osvtcx8nufo2iws9gq96wulm5hl6cnqh88khd9ssyfxmsgce9cm5fd3ks6zmq9xi26azusvp4gf15igge0zze9bsf4fq9wkxb4o2igmoda61s9svwe9jm55xek60u6901c6koravff1opjnr49pohxaatc2txvwjn8v5fiv2988hl7vgg5wamxtolmwzw606zswj34reran8rflhpjuyo4unru8gs',
                filename: 'j1svrn7gw07pcqedxfcgsvozo81mdxwtldxww1gel0er16ru72r8nzrnj0w1ax1rraetonlc3p1s9ffajqhqtjvjelsraa6viawuqimrwksekb6q4tb5yngpvaqzzzputfeopniozvxfc0g591jcqcnhs97clfalmk2uapagcgune7zzrnjyc6nrrmd1phr96lai9288yqnwifacq0pthh2d0g7isrkhktsycsvhiu8fzmzo6reug8qrzguqvny',
                url: 'edbd0ufygxayxvdy15iaojijhfr292a7o7b3mwrgf2a9b6am0u5yhzfjvf8kd7h7z24trc3pjkkx1szl4sz4osns0mm46ibo1kfc1gd8asvzj8pmox74klbq2x4nry6mgaqkb0y3ruietov664f6mvryh2t3epn0hdlaa75trnjziqesu7nlstsf5jcqqeywd58ppb2inde96ar447ky6aovw6luheyws2e6aktmtdan5ff4hi1z3nxqt04rhsqan3wshkepoiw33p83gfqcaz33jg5sbit4lwr6g5m0czn3solwzqy6t4b6u8zp7uh4ib2arbor6qhg51v7isv827x789qywe658f6nqit1dhz9prc3rf4bzgz9vrxd4npmiz071obh7jeas8y4vv48bg1u8e658cvun5v8h7ojdbknbxjqk4tfgik3kozwzoekhm2yqrggb4vsmvoq1zi1w5mr3zfbycaima2s4xrvd2v33le7znj5joie0uyayvs01zfp07o09c31pneh5tksi8ss255vnit83kbtccchgho4m0v67p9te49rmhstwu52vpfrzfxith0vwxceu9pcw7ydl0p19wkcu4a8dg9tp9zp0djxfh5syonk8yoiy3ldy3a1snijem6jn18qqe2qrmyuh025db86ivhjmebvsgd507l63935tm90b1xbt58j930b6y0p38olanumx6lylpo3nc3mv0unycux9x7rx8adzu7qv46ctm1p5opv8nsaj111whj9tzcfhxavao1jjvk09ivnetka7fyrfoicpzbiwgohipx1zx6zuh2tvnl4gkbouddjc9atcm6qty3fd8ezid9v9x88x3sd4282d682nwr0m6aae6cecraiaszt9x0416m7nicm2983zn5h4g0e517hhsvlqfu3mss8d7tans4g4nigrrikxsb74i6owit7y7jgcbxs3tbbfpqbm5cjcksf9i7ygg2oatfur67ski84alo7y2acoa7auscg',
                mime: 'baaunvpdy4pa15siaj8i047y5nn1mwha8ixn38miu2j3ufpdxg',
                extension: '7szs28t6iupw9nhsponsfub54jtlmbodo6cizdgnl1mhch9ukg',
                size: 2175143667,
                width: 528943,
                height: 963790,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'ly2awyfqs5d2goyl0mfh4fg807ggwnzkxtglui5xeceqxqptanmewenqv41z921lp3sg3d9vjm90vdsp8bpj9pj4zrtz6i6xqg2m1amu5adjbxoor0iaeu4l3jo1vth9xjjssbdd6uyd0o9c1e5lb7lxp7pg28i69fjgnc50puzzw25x0b6jppcgtldfmsr3p8vqbna8xpfoyfkkruhbyshnej74lf60wzxzhmp3tt7rmbpzyk1cqkt03ufpofo',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'cbeafumhj4cy4sdffj20y8om4ztrs750470wxymuf5eqi3hd6r6ihezmusdeq5fbywy6genspfv',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 894668,
                alt: 'elaz6qlbf67od8654eewkj683i0tmkvzrqwackq1cgiprksbmmycep9vi5obn8tpo74e1hwyut9edctf4vfvaqk1fmgtbrxurqvqyshm9z7e4hw1led0wc1zjcxf4crw8o41orlnk0ltvq3on2juauubebtcgm0mmjg88tiyqdps469qrzngouuwa3ldqa3zzmj6ymqi6c3groeclzxa872x4i5sny8olxjvtq50owdscupbvodhm1o48agzr29',
                title: 'lznmzb6x7pz764nubt6icp7yguzjc53nxc1a0e59acck5e7et4t4in7v3brasxnrygprbyqrnt5ycqqpnc5onn89ij1px7d5pehk1di65fnsxbjjc0x4s4qargx88zk0fus80pjey3dvdoayw99ehwul06uney12j396ackm4iiokf524sj80zy3b5y9nzb7i6esyj2wf1qx1sl0v3k9wtawr6tq7crctiflg5f12zs0qatxnyopu0wu86dogkv',
                description: 'Veritatis quia ut. Nisi mollitia quisquam qui nesciunt voluptatum at cupiditate enim. Itaque voluptas perferendis dolore occaecati ipsum corrupti ipsum. Et nihil veritatis asperiores in et voluptas quos enim.',
                excerpt: 'Similique at accusantium adipisci ex aliquam sed sed aut. Ut qui rerum non a nam iste. Et hic blanditiis quasi fugit omnis sit ut repellendus. Quas qui labore.',
                pathname: 'p4abjjs6ma7zze4clz3f0hki5er9d8bmx6j3ynarf8tp06nly0bhcc5i0w6rjpk4e7o1lk5tf1995r5qc2ys5jqrtjhyx6kfegqgiyi44yl7gph2i4kk5xfbekzs7edd2vfr5o1e2za7nq8u5z7hwphrdumri5c8lmhtx21p8rudu3bwu3h3h54yjk65c61lhrv9ch2i2asuh23043c5i7w1xsr3yopgv7deg3v6kc9gzulj1yuil80tw0tiqv7h4zoxlj3qijn4prus1tv9sw3wyvnpppxx8d0joq7qpy33wpdz5xzmaa381omrplqryype6lz7v5htzdms02f8r5tiopqszo2bxkj8uya4hkb1h2yflpbvcoe9kc0rjgt7s4tr1lm03m64zg94vuwpu6tsnaz60dq2shfke2mm2z2q6senn642977ne0bwawvs8ejaoq8cy6r9rh5cxpcxxviwod1qe8uh8xkakcsp1y96vc7f6skrwo50jngen43dyyyp11s6tnh99446t30lhaq9q29nm88hlzz0sdvvb59j7cu1s0kk0ov234zpr04vcsfv7zuu1d7ztj3afzdzt8l8mba71o2p3k1jgmwdc6vcqsghjp8kln268ybj32bf6u6pgkf1e1y1x2k402urwbc6e1waut00n49b1bzltrjfnikffkuk32brjp7751khka7d8ni91pm7jw060accu64eci0ovkxe8v31r19ji4nche7xar1spgzmp6tmjqj34qr8vhb1sis83fk08elfvn9ees7qodrdk7hei1l0ran264fnih2r04tv7hfw1vox0telqt564hknaj6cemcfdnrpq3yeh56xj57ntdcqgttqgp175bf4rqvsdb3atdans0zj6hy14n7rgsw90yonbpqloq7e9jq5o2lk006xz6mmn08td1q3sy9ztz5fo2xzd7ex355tcwc6frcgss1cjnpctpr7erblertazw6ivkjyelj5xurvlhmczojq60dty',
                filename: 'lkk5fi4t6ut665vhpjo7da9c4s3z4k4ee6i8v1woptg3mqmyy0w9c8n9sgy7trf5y01r453zdj2nfyusku102c0vd7og71uft6i5k4o0l19l7wl02tt6jgvzynq6zqh6p3z652rh8oge2wf8ruscwtks9rx2l4dp10n3pzkc8y15wtdp6t5ujf56p9698htp740zd3zna5g2eaqbi0jb14tboj7fydfx3dl1124ypanbdp78hmh83g138jjij5i',
                url: 'yqs6l9vtun625b4b2oj221tddvibob8c88osw39ftjkfu56unxoa20hipqrdcbe0l35hwbuc94x102n1m2zhf56nrfd05it9unqrttpc97m3irhgms53iqyu9xqiayg2bpvr3prf3fokibcxj72xzjpu96il37ryqjtao464aozqbk0fhv0wj75at42pfa9ptxbe21s2xapp08kk5i91squou0z4x0ce6rmuznibcluzewr9hx277yv2lywjuum8y0r9cebjc8fdr1o7f2cikjslpv1elkze3z2pkaumj92pur8kaniq7jsd8hiik5uahxs3xg0ihk4o9jcgqmiyficcu3x01us03snb5ywdn438q4nj00l6h804fkpwpjhokzu4lw1iaqk7ouct8gy96lzrqe20mpv48x4xmdbb1df99h3qwnk8khg0diojdqfxztd7ndn3wx4atliidi1a4615ki6bt3npi3uzfl168d78k99xatewcg5ysqyd7ret8h4gsr0vykwpomorw1zggjf8thws3op7mxodz6nwb8us82ye54vvfrxs28ak5qgb3zj4kjwcstuok2bo5vou5gy7qz8apqosyf2avydc3mazg9nlhptg1u0k2qpppkwm1wchimk6w0dkki645e35g40ocvh3mambihb0adc863kukrb3hzgm0090meh7d6xtuqb58xobqu7vjsuxnhrgo238y30yjvj05isuqm7unuo4ibfno6h6fk7zlnvoxhh5aevemlrmzmm8vuu8eus2lx9ht2sxh5xuecbwzteek1v8xkwff03ph25rqfuwo7sbr048t4dk3sp3azmjoxia5cj712fqrneyjl84rojl0o9zy343nvxfr5zoopsbylhlpz3nw6a08oaw928qmp376cohh5u5ntbcp4y6p5x0wityc8ghajcfw1r46itiy7do8gr1sx1j8nwup0e1f02wq57x4bl43gmspp2xal1unsryne2276vzuxitf2gtf3rn',
                mime: '3e93litvc7b8u45qkoxm5pg2itywmjr3deurxjqw68lgyqv660',
                extension: 'go76kpmip7rus53s6waz4aaqbj1i2qifj1ksg2oxmbtuzmvse8',
                size: 9293773278,
                width: 908255,
                height: 831408,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'c75heog4ykmwmcjk23hqauwojd2b915cww5hzkujy50qe26bz1lm4uq64t18azx5ivfat1r8b8ont5vjx39ve42bkgs70cxoeaaqa36k5j4v1f2kxq46ow4465n7iiu89l5dihhwb1sijrqjpynd1ga7fvivwvt2394b0i3yik7bl203jsldg3wnwqcw9ndm8uov6dkxpe2ii2du3v9z0c1bbblu2mgw3a6hrrjp3ap0yfrmoqwwdy9zks4lyrm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'i8l0x3lm5t8qjjndta8bzgawj6hs1tcwlvw0kqn7m1ddfz7ntyikn4na7rpvaks3xrbfzeo0mks',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 975001,
                alt: 'n9njauzdjt1r6kzrusi1hyrokg3qqti59rbein6gldptmw8m2pozpg8wd9enb6akimgb2l26s98zjyv29own36c9an0uutbn91gxg2zboshw9ybzh4nfqr0n9kqugkqlplzizln89zuee5092bha15gj1lzbuu6zk5txbsk474bg2qnn69r329zye437n7om603doxnva37rvi4j41qtub2cmgqutfih0h6zl725opesil0y23tchxc4m08wanc',
                title: '98k7qfb8es9zodnuwggzt6kq1rl0d0ggxh6covbbhqifrf9jdbc8ikuv531hkbh9f3kelqziv8g89vhhlqjp5asdkes06z8jwgfnqtyt0nlr24cqly88nlvp2womzuk7va4xkaa4j0he5khtsj8jy0a5798vj0qfs0qp84xwpoblw97rsscsjitnyboktjdxgh1hdhp2zbekz3u6nhmmdnshv68rmycuuqpw099qnjkolj7m3nwb48hok1aw79g',
                description: 'Et et tempora consectetur corrupti. Adipisci neque enim quia molestias totam at totam earum omnis. Suscipit et ab. Voluptate temporibus repudiandae iste laboriosam sit impedit.',
                excerpt: 'Et quibusdam in molestias nemo eum quibusdam ut. Cum voluptas nulla ut. Quae corrupti illo aut quis nobis. Sunt exercitationem fugiat perspiciatis eos optio assumenda beatae non fugit.',
                pathname: 'u0mnqu9uskrq4g42ghuynnn8zh0a3kmbg4qjvaz6fkefzwqi6sbmex9hllb32817p2rsev36k5v0otxsdjn2as75elz2y8l1yunzi96m99romr8n8e9rpszut0ka8k1vwpg3jnoakwjqfrpjzkdl6itdrebiirgjoxoi9m1q15b390zy6rwtyqpg5iprmptjjwnzxobmv9nbdgto5x4u2x2l1is1xc69wbv4fa4pb9bzoppj67tvnxfdi7jb8n4t1fn5kp56byiwyagdfnteulajdfjorqrw5s52t5qpba1yc316r1nxfygpd7ph9gx1o8wtqzmelgmw0yh4a47iyyorv0v1uavwyqbocv7v88angte3jnjatt7945yzrtiwxwfnqh6ayxq17i35vbwyjk67heuczjn3t28npvo50h1zudkl6c4h1jc104orhj2qhltdlacwhr3uy5prtsncs9wz1ov8e9vk7yiaakcphk6x9nfdzo97mntrfrk4l60es2lp0zx7s78fl8azydwxyknnbn7ush0ufvvy3ih40kz68sml3fsd11rodkfmabgqm9vqkoebp2enxp5lf9ec43hcmjq57wiqat99bi8zs1sl3p1lkwq9apiqe0ghgiu1qv94a369a8jebmgfu5df7rogrbm8deovqruetache50st1xd8x4sxe572w94yt788u364kdxvstskgtn35m8rttc3py1w0xqpd32swjm10bl6c474bm0b689iwhzp05uw2lcnre9d260ua9o60a6s6fupmhglfugbp6b71ageb318ara02ddpvsyrmoaif57lqiolfas9310c5pbb1b1mh6vfi1v7ohb1mxla74cyubxuaofb4t5ha00w4zx9u1x4iewqlnhz554u5d5wxf4mb1xb8ccw0coj4qmqoajssmxiofhrw009sat1x18eplhnnc2atdgrv3o8ddfuqo1lvlqp4le2h1vor47tvm6smw5xr7uofz799hwf43viwat',
                filename: 'u4rsruglebrmb6a8p3wmgqmt5l9hnvqxvd2cwehcpd2lzztol3g513p3qiaq2b0cd6oicj25g5306zjt5bsdtzrce04v0wa5fs4s2gudz1daeq4yfoaps0l4tdq6vgdn4qbxxh5vb1x1ss5f8lq6lh6fxounny1fodzuby13eu5kg7oh4se6k9xwym6trbxn078i8g5e7k1xqcam23372e6cgpqciwfu0eiqbhbpjlhp769fwuf1k6ygh5fdciy3',
                url: 'se0503nitq8crccnpan94yeckro0r3cag6vhd83expcxgar6zhl364yyxnbszaj2278a368772o2svtyanubcj0w011ifxt3ysgq8edh3y55jwnsa661vvs921kolqghv8rl00u8aknjfk6vju0uyfa0x7jegd4yo698dl6usl89lrottv45cesuu0rubwvir4tpq68iulxad74sywps7rh6nor81zzzo8nu7zekvwhyg00cyds3gc4xs89y9twrlled19nz0m82ogu6omm3yqai3h182ka36o1jb61ov3swbwai6dl8jo72c30nfe8kawdc69v69tdenmc0ppbz98wjkw2mopsqhg2eyy2o2gc4qhudhvzf6vejb09n34tp01s2hfip6avtfn2cwkxg9b4r3gostmrli3sm7u2l2jtpvao1ga4fjug23t8sy084k75e95dsbgekx6jjjy18okc2zyyt3j8k4zmsm3hczzq0nmgkzu8mzvnowhcd9ol9hwrqczj3ufbp3wl7jytxeo0kkqhpkfnt2bqamwj0sop3mpsbwkto98ixzdz522665519jcixanokshbc34y6wohq3fgj2xi3twick0x43uh4wqdhhe3c69rppkoufupfrfb23o46l1omw14k5166k44cizx2k1iabbjo7gkswjtzumm5i2g5djst8mqnhumxlmc1iyqtbla8xx9u1bt5wy3g6xyvyi21jessvw74g04ylcgint20s3fy3k201z6il53l43ebxesx04k4najf8u4ai6fqmr8b1tn1g42wlbaxbniy6ky7znwvxn3m42qcf7da3yzrtba17bhprj5k2c37k8d0j6jw11f79r2yzh7yhuztlu3aejhx42whlj5e044b1k37r14fd5su60d14e73jdvli0mm2xa55mxac3b13bibzkcpo379whxndaj33pf6ev5h4svjqmt7kz9dvjru1hyt3v6dfdggzdex518tkxqnbpt37jbc4l3ud9kl',
                mime: 'stiyfudvcsghex9pptjd2xbvjwtiybrlabsk963zdnb6l2j4fr',
                extension: '33lsz90b2wql8b8jderlx3th3zvw9ekh9hm3p9o9jer0ijig28',
                size: 7117298572,
                width: 843056,
                height: 364301,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'yjkj8r1f8peqhhoptpb8j3ylyapdnjppmq9q6i5h8ahbeh8od1ax792lyhbdkoou43lp8e4iq856wo9jmp92pjhwmmm97ep8kn3vice93tcca5331c62ik99wpnowxs8he0h7yy9xwpxnmvy9hbv0d2svkoyxxhjwi57d3x7jf7l3v2lpy4gahk3n43br3bnndrvfdckjhq9hropc656zb6vxvv1gf5qe4xf388oqkjce3nfz7lcdr5t92nxpxx',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '6w3nkivssj64ete6bmhyi1bcgn4zvpzzcpossem3v09kfvck2xwhlaxdquqaktvpjav5a1typvt',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 141427,
                alt: 'oa38v2sfjhfnlv4p7ndgku6l3suyjf9wy1a9ucjnngch053iok3nvln9ly5hmibclmfuo66iqf2mm1cgkh6o7sg30nbvdsfj3jgtsqmclwgzh8oc1bpbhoxk4lr8ptw3oru9mzvt0l4y7uickwnp2tcry15uctt4qb73wigwc631dj77wca5m25zp1wjayu1drbxqho8m90w7pj6jue6e768j0ck6z6lmb07zblkteu8c2cd4ed19lhi8j6tdgm',
                title: '3v8nbi21ctwrtfxkeyzm8pjuqm0vnc1yrzy1psa41h6n7mkuzik5nykp2fth4ke9cvxrb2p19uzgn578dd9bh3bf504wklgd0v8bbp3vxtl9cd7cvwo6tb82yinr0eyk77s92t3t4g2act6iuxslvipv7hjzdfiw5s6bxx1npbqdz8sxyhn1pyjovpfaw0xxsqg5341jzbpsieptsm1f6vewh9v123eyu54hiiy0ivscsa5btfq0dp6w6kz8o8x',
                description: 'Reiciendis sit aut aperiam. Velit ratione et est. Alias reiciendis eaque. Est dolorem voluptas. Sunt et rem non distinctio recusandae fugit eaque. Animi hic recusandae ipsa impedit.',
                excerpt: 'Voluptatibus pariatur voluptatem voluptatem reprehenderit earum minima. Ipsam quas dignissimos et. Veritatis ut soluta eveniet commodi molestiae.',
                pathname: 'zeurltuwx39t9bwa6muaf01qoe2a385q8s9we3q154jwsk9xwthtuylo415tvki8gbep2kddbhollzmfhklpvc7jfdhyhiqesfok4c2nmtc5fwgedptyv16n9go2prunu8uexxl67z5tiaifrvcfo4bc6jax3hhyz9ry9bdqv35yzri96rk23j1omdc4k51yfmw2cneuh3cvms63sexksxok9uf90dq4a92qy8z4j6rlzpigjr9xkl7p2en2ms8gh8u5w7vofgp9mg2ra07b5g4trmw2zrfz1v5zfeca2r0zkz6u9jl7tss96z98y179mwn6ngmolrq9spdgtd2a3q9qv5h2qgu2jvxf408k8wr8lgfl9ou1nyv72axzkpebe4jqzkpc1cs7db3aqn9vbcxrnx1uzvarmz9mk4pv177bt0li4ib8cvd28xm4jmfbz7dqbar4jepnq5bvkww8xfe1vf18wcj7q9arhee3q6otzzd6n6z3uesd6dkvkdctv92jva5clk253083dk8cpozz7h8a3njnm10o54u0qt750ibzbyfashs47yfi6t1kywciz5w4bd84cxoneximbwhfn337m1eyhq8jzm9kzmit59g6oamaz1mowq93bfdrgzw41z3ve6f4edkgmyz71wkmz58hvwhawnvgdhjihdfenvtezadzh04s8l4hzxljy4c47f0cuz3anv72adz4o3twakz6xwf373c62ovgzrixiahmgvus4ofab0t311nb2v3o8xbhmx6t0f44b8w1eo79pba9517ybqkl2gh7rgqb8epbbohomlgo9xex6vlir4jgow2b6z9wxueiv2bc23ejo1k748q1iek60m2wjjjlxdkktinqpx6owuu1ye53kg7zsgeyf9ofvsg9kbeajwk8rdpq5w7g60khs792irxr7dbtcbwd1898oioozrh6nij8fj94czctocmul13cvyoi0fwb8ysj3zuqath48wmbhd01zlisjc5brnlk6xby',
                filename: 'bh0mszhtu8s6czpycmudruiwaarjhqxijh1bszfdgblahjkyjoervpg89969tq43tjbl27qax2nredkr93zedv75cx48rtgup86hyi5qdhm9uvjbbuia5l6gyosqi2d224i0in2uvu3012mfpfgbxh47y20mal0pd6ch6j1v251jtdqzzf3w0zx5ivs53zh37ldpulbb9xvaab8uautlif7ppp4h3s0u5zjf2bypqolwjxho1o9zihpmdciz1r1',
                url: 'ttn1651uk2b4nd1oopoxyc4avg0qlmmapre7sm2vb48tog2uwjdhifuho43c3sh4knduskde9axwn7378uri2v8vnjg0v36yvlmbb0nnem68epqmo27ggidv0hfksld9x0yjnow81sctjgn1rkz91bvbfe0egrxhiqgf5a0r269rnkrqox30nixa2wop7t9ytcyl2m2xwbigw3rh2wdx6b8xrw8pqy4pi7ks78lwqzsoooznkevseuvpzrsgm7163a2jfy95n6opcvef69f6y43n1q759ris0xl2x4plmagnh5lyszq9d0twq3gmfz1pnbl8ayp6gxe7hi4cvfzfg28tikt4ferbsmkdrbdhl76lna6f4xi1irgoemhel7xe7rxu5wclrzckpzrg1kvh5x5n8n6aqz27p5jfordg9orhsi8617c5ntc3aashxjexxu1b99h0u53zwhbavpsfowr4lbyc7nzwnap4p3372lqhsbyyvkpets7gb8qmea0cuztrawu2kloz3bmi5bycp7rtvwecttavfh0em2mr2bgeur4y0iu09a4wqaoztr39ujjk1t9vpaqhlrikeia8gntgbytyrbkzxjfd9i007sheuocl9ndsyxu1wzu9qfsa9nwsnry4amwcglj6krxp8ruh6kqh75ns1khb1g4otqiq6slidupaasiqhyltw6zu34j16hd11ckvr53k2fevw5t03pirpkq3qcas9vf08mako4sca1dco8z8a7b2sclckzhtlbcu02s6n69yfll6sir5sm1n91r5u7d3d5rwmt4q8r7j8uro5d882iis8hp9p58tslenv9upm8vqm9rqgwzoh2co357jpko7p7m46f3stfp1j3n3jcdoed8f402jzxv8flxezshfo1wenx062lq5yhf7lpl6znhazb5v6a3zvo6ge01d4pcvvmjjad02zvp0f38z8wxurxvxuam9lx7noez426kjfgt8yqelqvu1kb4ngojg13l9vaj50vtyp',
                mime: 'rsnir1z87wlisc2v8tfpjuvpyl7qvjrbkw57p9ppdhj0vg3w8y',
                extension: '3ewsfhf9y096ev4ii0ui6mcyw8wptdmquyrv0c7z4zvgf9z5aa',
                size: 4213204975,
                width: 803934,
                height: 357152,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'uyqgnur9nhput286xoeqkbf9t5jyhdxsg2xrdd3zcglv95vhxjnqcy6g4vb3pslrh23kq3wf128g3vk6e096sukq99n4wsc9h3urdi83yd1oinq754j9v6wn7xz540gnn95m8m3ddjtotimliailcywyin0tfu72eujlsfdiqphotfz9cphr5gtvazsix8yoj2c4ucbjg0afghh4p31feg1fdecdkt9jalhg2m9x6a5ajm1ehfa2c07ndmo2kpe',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'do8qr1i5a6zpysp997r33n8hgd7gi9d5bws0orfppnrs4v0f6d6edu9kk2ufbh5gvyywppcgi0e',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 872323,
                alt: 'dfbcnmwjrb4j4h7frjl1gjt97ma5yqxbugzi8wdyz827bru8c9grfi34dx9xfbns9dsz6wg9m4l4vt9wx4bsg448gamje8lpq69awsbnb25wwv7x43rhkz638k8xhjwfwai98lv35ne2io5ytthvo4qmsiczssfvcnj6wco94zgo7xmhyfty06mx3qv0v91x82sdpsetq4iqf3q5e8rhgjp5p90nwjf7o3f4poykaw0j7emqho22fc1jdarn5y4',
                title: '4dd5742q0y827bga9qt9c2j2n8h4azw4wvalsvhui5nl81ycp8vco65ig89ltdfxnl357wa752ubqh34olh7j4ae2kumgastfllxvult96mfkgxlv012fez5ohdgq31qwdq7wkr6x35xgdtuu4xks1ho0iu53ghto3whaymfpph8ccsgok56easy0a1jn965cmrnprgfcpaowgrsdyl5y9hys3nai82v4gqyv184djmf4bhxig3waqsh7uwfdih',
                description: 'Sunt est sit est non quo magnam. Blanditiis illo ab. Delectus iusto fugiat est voluptatem. Voluptatum voluptas sint consectetur in quo labore ullam reiciendis. Ea molestiae vero. Temporibus et quaerat minus animi odit quibusdam esse amet.',
                excerpt: 'Quaerat assumenda reiciendis sed incidunt sed autem et. Quod iusto sit facilis. Doloremque quas reiciendis quis. Veritatis quis sequi nisi soluta neque aperiam alias explicabo. Ducimus qui unde cumque sint. Omnis aperiam voluptatem.',
                pathname: 'j7kg40ayk4k2drpmfn2r3rj0g3yh4lm8ce0m7vezfe124i35ghikqy5z0k84794moi5gspyoizoqu28cjbhek2n1eyjcwi45e7l4exgt1mziioro4hvyfvvowpgpv5nc9cj8myjhocgtwa4ym5ulyia9t8l4i50r57rmab02rzai7kgrwtnonyv07xc8prgi2q9zo6ce6l6i1nmkq9uti2zk2l9a1reo9vetbe9wiw74u66rov5owg5zv8943hmowybv0mxk7tw3cwpqrlxuhwqr9l5f3sr2gu3yaf0xe77gpvlg8fgztf7awy5sl802jcj2t9y4obyvzvq9im4j5dq0wh1gpy233pf2e06hadg4ode4u227h4vbdul7200lwvffm80e462yuuuy8ceeaz52bnx0p7pv2o8junoh05s5l6o0cr976jfvu46m4428bpl9egxtgomf7oh19vcqzxoy12onxty6h8uj6ftp3mvisx3uoguz1orsgow2bolllnbyd4kppds7c7cellcmn72i15lqxz5n9dyl73kgic6cpmzv4yiqtdsc7yhzx97g3ih5zt226db0jrsd65pb60i5yk0wjdhpdwbe9kf7g2z2s8gltvp9mluwt62q0y2gpm09w38vo2t2ikes4hgm4j7j6188ai2k2kk7twsgx19huq3ppqu2l4d41biixe8wv7vggbiwxp1rgvw7x70mmmjrcspf46uchsi540kpdthi8il6zfk0a5mcbnq5wivvyy4xc7nvjmsxz9qgifi3d1ploe018dlr021leura8abcd8v3sorpoj8ui89sg4biijr9qc2senkcc0u14bfzokhd0epscmat5f58r2bgted6hcg0a3g564zw4krwhsfhd17tgfzujsuktnamae0mnwifeiukri5rvaa5bvak790818i7xlc80p78d846rgmbx534vkfeuwy8wxduab8ejz2c1jszr6uubdkqrivvtqmvrqmvvgltksw7sj9p5fsy',
                filename: '9atnp3290p9t51bfksd9mz69t14dhs7qeud314o7get2gatsfe3geulngz4gidx287np1qxbuvona3a9zxh0c65n5oadawc4k3f7wziqpc44ur82g4tbz966d4uym20lyul0bpng0md1h5n27g68xc10pj0fwlqkfti7zmsh89jvg0241bq98rdr55h8z327ny0k6e8duellix5qff5rlmchae6fza07k8jheewtr59g4os87q0d7texcf3ydew',
                url: 'opcw7prl52te8rda532zfyu9n9bks27e7jfy8t7qgzcmo226mfakym42koxmscdt35kv0xrd62fhd0t1lnkh5kwj70tgqmrf4i2nz4nja2kygdlcejtulm9ohvo2ly5vokpt14u9vz3ohp1u7dgu79grq5xzf89le832h4wk5oe96da73x52ute8kcszjjkfl3eteedkzt266m4i85k1qljafu73k5stawhihe1fp9vhsdpc1gb838qcepooj080jh0bpih6k1ibyqhgsua42mjbuly25xquwudxs3rwyj2hxwnkw86lhfea6di5tubjm63usijeh9k1pet609dsnh979zpfvdx14qy5itxvxxn1h73k4n7rpjmu8c4tm0upzmnrit6gu6gklq29wxo8eo8cnkcoutl7wiafvfpkmw1dve8nlmeq2ft9mfzs5ipvt3xy98ubk23wpjwweyyredv0lvra28uejlzsqdxrq8rlx7n00g929e5azlf9ch0fdmx4v9fze4hcfuiekjao9qtomlwm02p15bx8xbt7c2hp27qvk3dp97bqktwb4b3va3zv6ph1skfqd5rejpq9qagneu19npp9y05zvseoufsr2ng9v17secemsfumu06zthh5qjf8ikl7rdwcrpspeyuu8rw0fyrt63zly3yojfgb7fbljrrxl06hxauezj5v9s7mi04uj70df7oytwdhg6sjtix7o72ldg142lh8odu98r74dph24o8uhx8ora3favfdei4csbnqke3p6ldq2zafq49oe1wwtnqpfjea4pn5kxj5sz1fjxlgvnvbk42ekbo15x1nhc1npzbb7cyv5asyz3m9nfxxyglw8rqql9ivhh2xo7haa5qbrlhexmr236s70ipv6w7yqzz6y7fschqwmzhwerwkrzip1nprqvngxegu5c71e6pprk5r5hjh3e4zaltq3jsmyk2ylsvptv3pzsa5ydwthp8m9x9jf427r9yyksv2ra44ssv4oq2j',
                mime: '8g4sl630cztxfc9i92ec4781ew3rir5cp18az5w2icyrxrxfg7i',
                extension: 'cat1gdahlz84t0gd9o2nehh3i5mcb6nzmapx74rwdumafgpfs5',
                size: 8473295505,
                width: 697946,
                height: 150662,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'ahzqr9y15j2jsywpvyodpzvk2q43z30s0gx3ls7e6d5zg69nd40gieoi5bytrz6z23joe246ujj3qi47747tcy56emg475xn0yva31shtoerf5xc2dv0rt32leg30totw6btu6pvcfd2xm3pj4po3dwt4iyb8lcvwo8nv4xus3fqakynakdz7vt7s66wusz6dr5eo0a6sls6kd4wlfrho4fqfv4g1euhhbml6vydqafyix60zd0ijixh1cnq567',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'plymyn0ni00ijwkcbz0j0cl5u1strewu9thjyaajw6472x49qpgbpowow4idefps39xt88gs9cu',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 599670,
                alt: '0v36e2kn6l6lyfkzh2z6v3zhz7uqccmkb2kkgzjxe7d8500joynrvqhczx00t5nc6o30wkkoi0cnij3nvzu4e1vec9s4mx9bafm8n9vklxy6m2n177eflfrpj9ualsf16mk9wvwp5j8dmcq2hdlzrfmddbvjijm1v98cwqli3e5q830dacw73nh4l0cwr1jzus5xmokzsikyt8z5dumsoxjmqj5d9kbht073e2t5l12yckvns2vhem6cvdq9xcv',
                title: 'pqxkmc49aou6pir065s5irlskz9g5456gvhy6cef79l61ack43ycleshb4cpnbezshlq421hunl509d071ek7a86wpg08kn64yis02stl8hvgyunm5jteyb9hdglg3j0uw6fgy8hhmkb5y8xuvlg8a68yov82heq4iwf7of5qhfnjkdnzw9s0fuwfe55mkob2ohui7isj0w5mh4eivg65n44g11x5168gb4sb6br8dtmkxqmdnkrbdppnry9eee',
                description: 'Aut voluptatum repellat. Dolore et mollitia ipsum dolorem. Consectetur doloremque rerum accusantium fugiat sit explicabo. Omnis qui rerum temporibus eum architecto mollitia officiis.',
                excerpt: 'Voluptas aperiam totam omnis enim iste porro. Voluptatem incidunt soluta consequatur ut itaque. Et nulla voluptatem tempora.',
                pathname: 'fnxnwmcuxdd2mirvcyqhf5g47634cb7uje1ey88s7c18y5zq7r18q8vi9hbkh79z0g2w20cpkfo13xzd4nah8hvwvioj1htekhlniko7obgyzqgg45qi5g9dhc2e287y17vn4792g6qdgw8aq5od2ltqg7im6ccru02une5tn8urwyvv46f4pzvx3lyanfjz9gx7fs48rp08fop0qjxjfjtaijx4grf0vxmn8n9ebp2hojcmmtb3y4fjpygcfp1heet1dfx566s9q7is18r1p7c2ngy4ktn798isybsa7h698pjhlpvrwxwu4g9fph0u6bgidfljsvndcz0ftj9z8la0nl7nwqyjjw890w31a0kb0qunfgd911ffxkqmpiq0gojk8pg9jvfjcjsh45jtkbyaynhtncar4ikmihika1io6awadfm1ynrl9pqqehvbi5ajpl2t50ha5as2f9zuv73e5jkxfp46p8g9wbf6urn7auov4svs3ab2ka7omuwpvbvd6ufqnfmh40n7rl826pbrf8paugyykjyieobtc1mpn28jzmfoh8pj734risvidj4pnnnszp4722m9enrqvn1dx92sp3qj3j6wtw0z5kcmy96z57zoguipmz2tny5442pmjii2c67ipdtpviq8f9eg7q5xdg76zoukpzueyo2iagkjt2trjrou729nfwmcfolzq2ymh7utpm4zht1879qjwdidbwl85wop6czdbuw49dvzz08y8ydw4nksqneofe80jyac6lkecy8us5zet0xywazi3jshofenc371txts8qpfp3i4lu43siueesi1pw7a0zkl77y0muvlomwkxsivsg8sjbmfp9rebmk6xuw9oboie3pezkvjscg3ok8nk2ov4uay70cf8yppme2jtvb8z8bzy4w2nc8lqx39wif1o3voahgwec7nqbdlxnk6xj3jy1ocfcr9pk3g6b7blth2mmq69icox3lb630yhvmrtrx0kikotrv168hcpcxq',
                filename: 'spgt8tkimlvbxm6t6ysft07n8hhunwbrlra4gotmx3bs5tuefhq1ha18rdodv0mv559zhwikmynpal46hw93pgpftuzsz667rugmhkyeh6fkn2izgszsrcd8rzwxoumvaiaaux25gyoxuwvunjzt8q9vu3eoe5ad54tx2fas9is1k0yufgmfhdg7n7qgm6lj16kjvfixmbe5x1s0vq6lbg3k7dmv84v1mizv39vg71memxs5gxre3pogefwfmj3',
                url: '6e8dbksxj1y69i2hpf9c5adz8e18yshu1h4s9axtw41iqbdkl0yc44q6a73felxez3n7f6xror3ngiauk27yfgc9alnpsjj99hjfngf9bux1fx6q9bwgp9fxuqwjzpot4bhgn5xp30outmdcviaqaz6li18q001xbws30sha592xq4mqjgsu141dpey2t8p5bpvwd7k8p7ryjqro36o01y4hunlyav620udp58et852x2f4aeqsavmkvae932bh2glu3aizp6fd0e5idma7b8brvtzobe3x4htav4x49pajmah1ll8lze97qm2f5cbb639giuurzoasj8wpf2vey2ri4ltgefwxoumwocwc440tct5qcojpam9qn2kd1xdtbbt70eeyo4isl1dps68ffmuv2iyp58qmtz8n91p9o7e2jmuc1o1h1q8en9h0ennhpm3a4e3scxxwc5c27giojpmy57lf4osa0bm2s1bu21aio1bm5t4po3expnng539sj7jwx2lvzl0lzmov9qn0kuuc3pof77pwgfps4y204f91c5bslgjex43qkjtk3pmm7k93ukqk7snjdlc7df3k5jez1hqmdsxk824yelxjrgjk1caumo5wo1iw1q66u0uovznfzqw9yng62kb2pt7kyevs4uw57efn5b3x0cyv2av588f3ggj0h556esirdn6j8dhwylcdfrt4vhepsefc4gvd0610mytqmiw8v87l084b90ik6oa487mmug4f0eel9d4q8hyx6qqp4ztx44f7dr84266h1817ejqtmqioppr12s298o78j0wixn4vv6tep0l9wqesu91d1geucuo9kes114kah0518gsn1f0vb0hp59k42b3yiiy3mm3wt7fe3moztnvs25lciwys8brp7wphpnlln27bmf7hl3jzgt5d27dzwlgk9iotfkbdp0vgnuqptzh2pe1h5l7uyeb21ui5zraefwtl8wgxl0rpvl1bdnegecc6ir1191q1iyoob',
                mime: 'tafcwgba2zbyo266shxpwgq0u1qk0x6lqtxnbsbqjz6qv0a6id',
                extension: '9fq5rpc7n6g6qr3y6fmoi241lbuqffmxup0fzbb7qxykiq481gg',
                size: 8848956148,
                width: 710525,
                height: 463994,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'r7nvz7ijfssgd7fx73k1u0srlik4tmv3tdaxccvzmby610jwnji0dzsfie2n1y0m3qmu99t7z9ca3iynl7cpv1n8iq2o8xhhr7f4lh8l1msnz1t4qnvmdww8efix9f91phiyk6913fg8h3xw4emtfri6y9go9zz8qg05tos4jvyxeq4o00vkyk8aen8fh73uagc8r3f9m5leta4990jaide7ciczk0gf30nym4nrbm6se7qsrw580p0pz1e3ei7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentExtension is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'mo635codvwlm69nus11pdhttgvgshcgaqqlkwfnc78w2c9f5ud2jqtvo8vmuhl5ext8i998lbmi',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 675815,
                alt: 'r0iw36y64qno25zenerf49j431dr69amzzdcwvw8k24zvl68r7xg23hckx6uf7m1r8snp86dffaaa47amu238g67m2be8d73gf9etk849ff3198tel22zx1un5gux1n7z0ia6qj3ceeh6uerk0zgu8r1wa3xuyu0exbuzldb3a5xl3tb9od3zeaam25sc7b8t96232e42ea5nd45es6b8etg01ntleg3tljzgvt2qjmulomeaey3haagk0r5kn8',
                title: 'xyshskofy2tlyslklb9wd1nar5d8ucsdx44mxsbk717l0l1vp67maf40n8yvdxvyitve4u46h4bo3xh9mu5c9a9ihzsuo8301ctm93vb2aecgdl98l7u4fdoegaw8lsuep76iklco4p8e5yoqzc3mcyy06l2bfe56itk76l2gja5sc7k4i9zz1cdxmqbdzkl6o5ncqbidjf9bxv26hg4e4dwaa3q8kpc6ni1ypt53ojji9nrdhtkcwtdt8wg2xi',
                description: 'Omnis laboriosam aspernatur. Et amet labore aut voluptas sapiente voluptas commodi. Molestiae odit corrupti quibusdam magni in et eius dolores quam. Sint ipsa est quia id sunt deleniti perspiciatis dolorum itaque.',
                excerpt: 'Ullam non saepe quia magnam porro. Fugiat vitae est voluptatem quae qui id sed. Autem perferendis earum odit non sed cumque reiciendis.',
                pathname: 'i8kdivo2q2tn97d3bg2yk95esz8ibeohaz1qrzinoewd977ucrjmvacqjmj460a2ewu2wki2gp0y22jss229qpp2e0y0he9kbh83xel01vim6aaif6vcqecn1r4f6kecmrgnl7w3ckqck0igk5dno6oj3bmhzh55xhmw2k5qm31m8z0b90k7i77ct4tdhkifz5z11qsv2adih5nmrt50rj7obaugc914ybot2y6359kj5sar13lkvmwlapae3b96tvjmo2ich88ffjexc4ximt321lgzuy6aqy1kwt3ofgv2tqxe0eb1hgm0bholw964jryrsq1wjqvnzkhhw6z165jdif2phw4oyrr7jdip3hktosz01l0fvbpzrcsyycd5ab6i7t6rq1jvq36s9e8zrq20d294nl9s563axzf8dm2il8r6fafa72s7gimhafausmhxuie40ebo1s2z8zmv7l8nwj4e1bb4dgclvler5s0v5eq08kuu2lr00ab1x9ub5c130rqx4vph5ru0wuk0d1w247phhb5ergb610ddupvq5l6fli6g5ksvuuo0h1nnm2kx3dxw2oxa88tu0trhns2n0gl3in4ofnn5ehjk4hzmf5iebobfv8qmhwn460rdj8ho159e57de2nu01lfs9m5xiskfvoercz9b936pryhc6dbl7mqzxo7tmxyiq4ju6tnqf0y3ug8q4ruizap5u5djv0xrhvyu8jd3w63zry7gqe83rvdi9jkl99cxp45j2najje0t2ispdor10dfpe1cq6qpmp6fm0tkuf4t81d4a3ptwjrvzxioho6i1bwncwjn4u1g45xbs98p80efxlad9vspg6x0x2vhdvzqk668spvnntsyz96ywl6nbyxhlmqbmz4hc3tjnfye9ly6lcefpk0y0fjo7yftt0131d51694nhparhob8tx83gqz7dbrjcw6nckbqftqjj6ymyutr0pn5xfmtjvp78vaxyc8raqtuqywyd2cic7x65cu2x',
                filename: 'aylkdegxipckbg26gqrh672q5y70gfq7te820py3e1twfun6qbli430hg641jx8kyu80z3wnphxvzi6lircvy83q7jz4pi4ihj0gfqefs5m5ghbghrs2p8edfjm69pyr21jchz5w1e70hmshd5ulpsuvrucoe23ekciow2hxaqyytyofaydfjvydn9tkias174u2iwrmfe49et8rp10iizb50p4zjitd1yfute53u1wa18ja6rmlexu2vyeqz09',
                url: 'munriyy9o13waqi1njxdbyi28lsnngezgcpohna2zfmsrah3nhjm4pdlb123kbkppjks74o4lq5ruupx80eosomx0w5pimwy5bm4g4mprwu0omc4g1qahw7ymg9ekib2jw0hnhs4xj61rdhj390773helw9e9wqov5ztd89an7hn8g4hhx8k6dajl3j2wzbe4q3e0um4nlkhtj4667lh55bkuu3hq1jvds1di5n8jumlxxv0ir7qfkejqsgbik9zq72nmj0lytag6wy0hl2ej5v0heujbmgrh0larpymppsewoodem5dy6ug2ex1afrjygs6co0wgrumuhne4i7djoolyyi5u9zjj01zw6yp8kmtcm8ysehm1h9wtjiho9bn7lgcho9w5b1eu08gyo58zzsz81re6o4ileqgh56ud2d14reic549a1o7ulumrb9eok5y4nwv70ecjuo3mzp6zz9pal1yu0asr1s2ld52vxtpwf483vrquqsf6cyrg7tw0zlz1vyn65ba159hfhdsyyiv25j1s8qkgpqbmne8bpuu3i8prnb2fnls0zz2r86uthdp88svoouylbm85igwof8gvdw8gkrjtg1654pw9434p1bphcrrz1jf97bjovxgc2zbp55i4pggz71zpipj89okwniky0y49lvbogjgc8j11ea5sudtv5tnh001qtex7q79n94qrlo3lnn5ioknpyvulj8z0x06hcf7pipbdcndnq61uobxnivw7fw6jcqbyj5oqroz9inb96w4rz3yj6zn6t48e5iyyoqig9s77lj1bezhfojeugl9ip59turt0xpd9xrwuuzt8wtqsjtx5h3hgt6rdbu0r7nv9p70qysxuz534bagjuqznt138mcqxye1e5xouq16ji5h9fl8ilnvjw2sb4ln36uqofta6rjcfo6qn7kj2d4wk6c9gyeb8kepae0dpl1c62g64yjt9lji66anwl3stx2g4k6zlvr6k9bbs70ichapcouomtaw',
                mime: 'h4h87voq6xcyyj2t1utzkihemzf3a0s81lidv6k1dk9ysmcdau',
                extension: 'fd4ptf8bwe5hjmynrw5qlm6nu7e15tinuabluxtfkdemdr8jol',
                size: 42017095805,
                width: 245220,
                height: 979526,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '2u4feuh941zl9bml68e34x8opvmhoehfqjq3pxq47ipeqyrnsfyqqy7lvu2amus28gh50o0eovypyh4q3ilxtriy35umw7j9pij0jaz36mf3irckpmzsj7ce9naufouk6vydk16hsdjl9v2i891xt4icw37npe78dswoi7nsnzqnx90pa1biub5ns80s95brxdpur4vn3oemcv8sfudcthpxtfhp5dzjqh7tx18gjucu6u5vdufmmw6y54vjbsn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'k1m1opcuuje8i7mdypvxyi7di3mjid6kj2m6oac20593oxrgrfr61pn3yi7fmfe86fgvlplzmpf',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 572837,
                alt: 'un3pj7m6k9ff674bnl88hoso809z03reahj52nv6kr3g3ervd49p9saxhoq4270s61k47wrip949jqcj46ept8b75apakhpcze7uynfadugd479naz4r1gllzwznokopzogcmqm9gioyjuwajkz7eorwux2nyr34epy5l3mhoq1wkum40m37ie2ut02s7z2j4frs9kyaeni8zsnaumb5xzqjlhxy2bjmjkp027x3o49qekxspp7t39goh9h05cp',
                title: '8vv4i2ydvtaazus33z704bjn96uewim93fjbsdp2cx62jxmzouliz7mxcta0v4rlpwi622iqa24u71ww4m8smw3f5ycejcw2zk6mawc2euf59e5gih1hi98t046aln06t0m9lk03c1hvh7lp8bq9kc05a4i7hpg8gq9lcnlcmzgb7tvgdtfh6j0416o6mbtf7dr4xleomwv30eb8jhsc34mpfn4u96pwdjfaphi10t235srgytt2pgv136qn4ke',
                description: 'Minima voluptatum consectetur asperiores officiis libero voluptates voluptatem. Aut consequatur accusamus. Adipisci vel tempora natus nesciunt. A eos consequatur vel est sed sunt velit reprehenderit vero. Vel est similique accusantium cupiditate ducimus et molestiae eius pariatur. Culpa consequatur sed nihil error.',
                excerpt: 'Et et repudiandae labore quos. Et et et adipisci odit est facere officiis ipsum et. Ut est qui hic. Qui itaque quibusdam dolor fugit incidunt. Aut iste placeat.',
                pathname: 're91tzoxbuoqcim1bv5ekkydpnnb1p7cpnvgrk2g69urhszfy0mjibahp3z5vijth8x4awvxtx2mbo0vtfbv9l90997y6dxrca33tmlnttjbc7wuqfnywnu1p4b452ugrcqxksd3cythi9izphyfeey33binimmhnb1cd44zm5skyi1phnkz48gm0yw18y2lo9ij053wlva4miy6e2sa0l3ukd99ruib7vuyxbbohh3wv3k6ocjrzjnke5oi2cyrr503e06m4eet5xz0fhk1n14s2uzikszbtpdm6ifialaa966ok6xlpzzyqw0y20y2pudlwsiikwmf0dnup8f2334zd6ijhqzm0vszh6b9og9pmqwgfgzzcl4byjv52euw510ukbfp0aznlp2awrk4i1rh3cuibllo2n34rycp5te2yna234bbz0aa6ecmrsas0de4519tbmb6om8l4w3l1oi3lf1buiauwl8d3n81vzp92b1oyzq20d0xv2jd5f18rypcw8ls1i40k31drfda86wen2gzgjwjqkhsdmo0ohlbbv2p1g14i9ghys6pfhas3mvxde50566erlz5y3w9mu5ktsgz3n2efnzd5n8earz6fufaobry8vsr8xsuvw66tggpg1z15dii98a2evrd6lvdg4keqwlfn8yxt7i4soi596gat68p5na47xv7go9cvc3okfao3423weklry146e62vbqp4g1epoqr0gv4ufckzfdpdc5eyin9gvclu3jwn5ispd9iuwakxxdkiv5kn8irvsast3113yt54f49nx905owok07arxt1qp3ws8uvlq90apbs5pylr3bilvy765gte1vc2z0pespjkwelsfhk2h333dnd4rexqv2jnsjwzlmgcfnwkp2s4ycjrm5n92wc7o3jj13uns9k0jju5eoo8mo3kr9p9kyl64sl42p4mzyibztjd68lnrcv5e2mjibgxo4v7xeysmal17vl8j8329vdx20iu3kj71nplm75',
                filename: 'oyf994h7edi4qp2a4d1b2lpy51o1fo1ra5kwi270pix0vfzttg6dnbzdvp4h1kc3r1stjztwtqdkqnevdz3lr8g13mgno6z4k2seksjrgz92hf055uu0wjhoyexttuilzzziq2lheb1bx9o026asuoxoifsg838ixbvlh9gyvdzsnrqwxfdztqrtrvm4bvujdzrvxaqgd7iav09ap0fkzg6f8lrp166fpluyzymr8cnypejyqim8wg324iekc5z',
                url: 'dzqmbqrc4ghevp29ixazqwgkvdzfb7f7kurbbg13ymqdoi4bz7rzsby9meyjosnuzfnog12l65w57ry5v36xyo3dm8da04l4qrnoxlj5r57z5jl1lup58dvndz4ajbqhr2dp73min62tf94nd6f34fzrbjsskpgcudkwe7xtkutv1x22qzd1k37mylihjzod9qej6gu6z7f11sgo17xffab25ypjvlq5ipj3qtrt0a703926ccwint6mgl85yh4d8tq0ycxghucvclowqrwua6ohdowzv8ejp85ur5jkoewqmsjeybnyb8avz4kglx9n3wisrhbm1l7wm138lkfn1zlmvwnbpaxrko7pxtmh6bubm62nnrs2f2dgkqm54jmy8z9sxfkvv6cp4aug7xbv1wkrhbjpstpfwmtrfq4bvq6kuh13ra5f10ire64zhywotg1a3dmhunm415q4xpnqcg7tufuyuhqyzdh0x5f06nw3h45kkmsacttisnnod5pobuyvdi2fo2q785rvmr9icwc5ge21rwgjc6ni7h4e7q61le6c40h4my3c243qardmga6aprsd07gf5ctszgjgut6ssmgdhmy2691cqa5g5pv638oml6h6fdvhpwrlzw5fgr6c6em88pe0hh4zu0fsjoc5e8n8126mrd5lsowe21yjcyftx2ux09i6ip98174kqowtjttwxly6w4coktfi1o42selr5b4zbtky9dzwfxhdxrd5utthy35w86nruj36glt3m0ex97rii9jiz19a6r3mtthr86vjcb8jxtfsxejrmvcc2ppeh1sit9oep3g5hrys2yb6bebk1mb5ryrj2338jwdeimcyvto3wu2zt8sfdbvhi2j9pjxwy9cl4p0fpmc6d3nc967q412ce2igdpwrrdiooip0wy7zhtu6h1wm2gxo1o3rwm1abgnlfc0svsh0zmfgq3ayiueq8yvz2sa7cc1tvd4sayokofel316m4udrf5g7zujhdjxru0br',
                mime: 'cenzcunpsfikjmusjxoll8t9f8tk7blccon37c5al8q904s85t',
                extension: '59c9ta5h9wyxj6c893tuacsn824k9mqu7wzjdebg83ahyhch1x',
                size: 5236010568,
                width: 6256258,
                height: 772523,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'sitxb9jk79pv4vywz5n2ncgrw7i7ss9wkfvo30u17u0b48xwdt69ytrm0twgozjjstd0m08w843n5e5tp5najab3afljj7xmku2d2r504tl3ycaq4rjaijufsrbz80wnvi61pqwqu37nki7h4jnkqqa8dczmhkhy3pnqnhrosil5xmf5yyse2ogv6ww140qcuyr2li2600asaea2n0envkcljo1odhnox815azhnihvcvqkbdsm6wb4mgws422c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'zrpkw8jv5kf9bnqy0vwa5t656rfbyi9bcs5ldtrrvnk6mjo6q0hztovytggxpzs36yu8r5c36zy',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 871653,
                alt: '9moonithgpqmdmliynzx7u5z3nspzlfshamd2ch5lhp2x3xa9yzxoe1i1ivmpvj2lbqb4sfdy28tls6cetf29wyq2xz1o9v4tsud5lrrzyabnq7zzh540za2fue73l6xzmpe7u5271aaekhkqbdw16cqsb5kwzd4az1dfpfnmksurr4iatcb7wrjn965vsmr3woegxo490oocpro36wzxdwwfyvw548yh1pc7j8titxhcn0hqhz4wnrtx1q7pc5',
                title: 'lx0bo8vnon0f8u1pgcuhtpey305579nktesnwav6uqnmauyu3m79bqmmelgupe2lm7xkacnrg8fxx0870ka62pz317cyawk9nkrp74v7l8d48o0oj5tztvl5iubtujuega7kgkgiex6a4tq86plii13gqppcyhib1v8p462nfqibmz3d5mpa2a459d0swhyo1ajraw8lri4921bm2mi9733m32a5cb1e6ycigtq0gz8venh3c9gqaww0pqp6xiz',
                description: 'Aut sed aut ut ex suscipit. Quia porro animi. Esse labore consectetur iusto consequatur ea cumque autem. Corporis quos dolor voluptatum.',
                excerpt: 'Fuga repellendus consequatur qui enim animi eum nam aperiam. Laudantium magnam voluptatem quia libero tempore numquam. Cum sunt officia in consequatur tempora qui in. Eaque velit eum. Dolores temporibus quia esse et impedit illum ex. Facilis impedit quis qui unde.',
                pathname: 't9ge6z5zj48wkr2p1cypse6fv6xmhr0cwndl4k5b2u57z1093z0ygce4sxkwst8rrhg4pxbmz3r3w9dkk8ilztoddgueod18lk75v3bh7a5dear4mvgrxcz9m7m3ibnqno5jjrjwkd54uaxyw7mykev9f8jji53mhiq1w47a8grkp992iig1s7tomd6wna1oslhz2pqtz6e8704j2u4m4fzn0egr0p3lvv17ivypy00ndw3zsh1n5o8deekuypjlx1oqnxmg7141x8sp3teilpv8uszjfub7tlays7k8zm3wevpoproxp8doa7u5a7yuhldsc1y247w8g6qik7wwjcc0mdm2q9vrwcscdplf95dbicqyva4qq6od2cxiolg3a3bhym0drap5ju3drtd9a6ncb26vdf9w4z7uxv9hxzvra9uzoec98qbmerwhsirk8ymmubip3cpzuzzqcxxl5aaitn82j416koc8xi76otnbi8vk2205mn5j9nn7hy4hwcdi7rehcvhnx84ny9njab7ufj4fsrgpb4edza8i4r0ligvy73f3reofc5xfib5pmxwiu311zgb09eixf1wuzewr7v01w8l9d0c7gtlcc88yphr6h6e0l4pii6fc39krcabkkpuavljqgl3orvedf6aiyci4o2y067hbqxf23ymgddhd30po0oyyxkf11avu7lp1vtbdyjmgg5ley2u5jwrogfvcn29ok0628i9t4jj9ge98ks303f5ehhlg7zzdm8f2d8rnzhqy0xm47f8u1t4bb4fnwo6rg0iqnid7qxre8vlag7vy0jr23k0ie16ajwfdwpm8vommnn7knj0tkvitgig00iads72s5t8cr235ki9ud3fsys1c2pwfkdeezkpemfa9i0blbiec96npt4dt9det0ocn8mxbxc5m7zwcf5qkctyty30lcoih6pq8cxjysdok199fj52yls86eysf7f1xx7wyv9f0xmacke8xlidba9wk150obacfi97v',
                filename: 'eg0ulu1ju1r8bi4bm5hiq08r7aj69kw5srkohxov6fdh2sofo1e6wxmfk3njliu74ya2ki10y8fpk61tk6o78ju9lgotl6h0mwckuam2wxdmtpn33vkcmb0j2uheq5gsq5l40czf54ev2vbc6t5s7j3kou651h5qu3uzyz2jyc1wrbjmoik9z041avriiwxh7j5dzlvl2i60gp2b4pbx5yptetrsh82yigpf7kblo3su4w3346nrurbfgasu59t',
                url: 'hhi7ebbwknu5szoqxqmoris6v2gpmwejhlfqk01yi19w4wrst1lgpxvridvjk6i8juderbvzdbefs4999wdazelgdr32usn9yolp3rdf2e4h5icrrvaxb0uj7kk4wahaq8i4u51npxdzh5s9fkk5youxbce0kskdpjeuek1gy2kdlxr07hnwcvqqsw5h8sal3himuze5k3kgbx6cwoxbwjf1vn6bloysyjy86ahye5bg6qy2w8xeqkwt8hs81ij1wfvv9y150wjkbgp7y634u2y4smy9ug0k93wahxg2c4v23hiqwwy4bljfmgowkfe8bmknhy7rh0t2nuj8h8zfp760j0nst34pbtlahipzlbrhhxihcdul3aex1x6om90blti8qsi4rujqrsvq5g61w414dc0aonnctx5umgivlv4zhafjuibcx9hdubtidiuspu2o9ompqztqgpzkkm9qg5c4mg6gyxyz23h1h6mdzyobz3r3ff9xp297qp9npi8y671hhu7rewf8kin50p6ra3vqsdytbr7avxuax8apiwwq481ky4j4092y10jnq8mxv8hm00ilr7kkqaluiozb4s3n073ewgclaws9pdn6uq51ro0fuvdyeykvhacioigz2b3uj5xroqvhz3ib0r3sme5ey8lcef6edvgknzmodtv90m73hp793td8wigazwy38ib784cerioy8fbo18evewvqrk07cf7xuh14kcecaosbpe2044jy24f3gz6h3i21j7i8qp8wen1x8dw26n54dui4dqstbqnpyebbjw0aub6phn4qzowuld3d0s19llj8cxfniqtzzrxg93crxk6pam4tuow8tq3854xtc0211rrg2eivf3ynx4rot7ni39v37y29yzp7iuieh2v44mqqk41rh5seojxjmbsn9kdfjtwrrlfjm9vag7svnf738aoghzj8jnc8t2r3argtrpubuwu3wt7adl50yucpqieo4zgvj7kcfspc60hctursu041',
                mime: 'etr4vy1omq7jdcz03umvn0vjf1e4638i10mj7zei3k1vxn0xnq',
                extension: 'revcmykll0obh59ekf47slub8qubk0w025zb41bnkfpixqozy9',
                size: 3817555645,
                width: 303811,
                height: 3241674,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'w0t16hgm6fe8eauiz5irb9tegmvz2q2sq4cmlsf33wktg95dal6ljupbht9ikrn1ucv5h6gq4zzysbzr4ohmzckg0uhorihlbqq5594atbb5rho9j88tcoykywkh3m40ycpgdmfe2ej6d8e0ld1ogtm6vm4p63j1uvzkxunxfzofuprazcfjhxna83pmaa5uakn6pw0xbia69jq4ez9n4dst7g7qa7d2fv4iz771swv346n7h6d05ga4qaey6h0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: '95g30dr5cswew186wliezvhl5lria6uw5qesec76d7fgeioo6snabsgc23cbhlxjzxcim1k97wn',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 199219,
                alt: 'ha19b7sw10yhioqrff084hxae1q6zixq0r2272k1ys3l3re6quspong4l59utby6tzen5xwor8npofq5u2ei4yyb3yof9tgtadsukv23glszmu7drey55m0ijow9k253n2zwwrjoq7a5ym4adhvk576sdvbe59ft7wdu111n9amve0goz3rr4mb95kjd4g8tzmqyk2sx9d3mqz3b8h1lzrzbif0a6sjbvijteqath51ccomtshziqibhaadyhw1',
                title: '7duqyb9f6r6m3prd8up6uy2kl5izqcmvfkoajewbvw9olo0jkvnb9droldax3shgllmsywdqi17qi4nh78veyppdn8omke1tqbjmmou0h8xtkq3dalhphq4gsympsyl5bnldtfjkractdfud2iex1z32r37hagmfaetpaj3hz11bemmk6pc8bltfcuikm6vaz0t5ffp7eca4qbohd65ujr38jk9bwnkm308l9trwyi277cbghwfjels7ztga4rz',
                description: 'Voluptates magni omnis ad fugiat modi est. Doloremque mollitia autem odit aperiam corrupti. Harum illo porro non.',
                excerpt: 'Incidunt labore magnam occaecati possimus. Est itaque vitae esse dignissimos libero quam rerum id est. Eius sint quod odit et eos. Explicabo deserunt sint harum esse. Dolorem doloremque vel amet.',
                pathname: 'mhmldxnrrgi7eoy20p22yhudxzkr1hfykck5czrxy6c6f2y5xjmcg77lzht7dyxbzcum3utumicvahnzvgisrt4ehe671km7f0wm6sq1psj4y7cr5ln30d77ken77am7zbf94jbdfnglmvnosukafuwptrvy1v66vnjzem8yb8x81piy31dl9t8eo5965wl8w6rzeikig7mqqnyvg4qgqatmg2tmapxhajakuharp85pq1pu0415uxa5a2lwdaqevw1rok4uutgepk98zhc9lumoy0h6cdogpz4neyil2led1fjzedm3vouumk0cjsdku5gxtjherb0auxynyd7cebtzh3csixs7nn4a04yh6fuf190kbbtcveadxth47u9zws2kxj0lyfjjuhst1lhbbz0i7djup0nx1q5yffd1xb2l2kqj9bhqwy0lzn4c14vhow6ksrj4uvt09rjuatp9fhg49n1mws7x9398likfihk1anltlpwkyru51oq7wtdp4ln2hviqnsdj6vwaop3a7cwy3b0989j5m6pdxa25nafzjuxqnbapo7vhy4k7azw6xa2xeg7qyg1b36zhk2trcau5m3g0asfmj196zxvfwy2lgxp3g9bzugk4ijsm8dgbcdppxf7ab1eqdaxe9cw6h7o3uif0v4cs1j98syf6clm5mb5run5sy9ahmd92pwe3ylyydy5wivxgkqzsmhacwwq20tz64io7d84g1fossx2y620jy7ukcb7s5cobmkkb6pixqivvdxs1e0cxr0oszi4492k5yncn550u5sr277ntcfllz95nd7yxj1o41qk2yr4d6517bqj3c7gwawjyulv2z7n4620qet5jqfdgaem6dnnhv9h2f5rwbmmobnfxjfdd5tc7ms9nbm65cyr5kglv3ptg4lcy87uhpc971ngcjmx2uz8neznf00dpo9mxfzupmkplq6w3nwhxb3uj1duuk71h4dqcsfapdfugiciqw9m7wnzuzhaaczzklx4n',
                filename: '016fqme6dw657tqdww3uc8397mwlsq16rjm42qtvkt2s1v0uoave15r3jjatn79chgqd1o5rbs0ubsedqwtdpv4a6kfnoqn63vb4nb4e43huw9xgfgv5der07buf7zbyln50gj57iqxg987kdb8afm8xlbdzxdo13cf870tplmyen8ogur7vmiuulk0hro5f9mylow627lunhj5ea6pypq5h7y7hl094rzlvi4rnshwwcl7nw34j9u1a647urqj',
                url: 'ebexsap9kevucdpflca7v8q2anmdfixjario1wklrp9d9i5qldm9pmtntp7xf2oges4z79vdk9dd45f13dcfrwp1j9maww0kcf9fhu6ivsd4qh9u7nswrdru0tlgimswrsj12jiqeo8bsnp01md6uqyrsp5nsk4hasxoirhy829ccjs8nylk1nu2pa6duyo24onziidt1sg7jwes16hva4zutao4guafl0gveq4fn2h066n2rzv9kzzg24ewj9jdfxq3717mzodldtyax4dhmvi9u1c5jtzmo5208mclbkwp5a9s2nwt68j04yxr7lkidmpzvwlbzllbmovsfyiaw0e3t0oheitk8jbrltprws3az5tkh8c5sv82us3vsu8rkcjsl550gzl19wbcjhe031sp9cmyhz4lghsd8nzgk22vbiilk0h4ryusrekhurdrf2w2ngrsyc4g1yr20lujsbe66st1jo9hdff19vrvkeeh4efehtfvblug5whnk6bxkb9jyggw7uiexcawtgfyzl9q5k5jfuk3iqrbpob7voup97kt3czmp4no0jzelbphw2vf4nye386n5j2y08bh7z4ta92pmgk81dv8l1ps6tbckas8hzowwlhs21mr8rifxafe8sgdstw70zlfolfuymrwctjjhw3vos2wgd37krb4gduy4t4dvgf0o1kc6pjpky0p5cotgw73dl9tml20zgp2rtn737gi91mf7k8la757r3hafm8wwf2ywgolsaapsfbrxzx2ahrydca8pr01leqoz8b8as4l8umtj9moca1xz81mq5r46g4r55ebp96kgcuqz6k0lk1k0v8wressey8cljfpo86zjx7h1spywksg7kz41fwy004lcffqspst9t4o8rdpkdgc4dtz7br2zs3bcudew5o6l0ha3h9345aped18447h4tafsn32jf981pd2nmuk92y9vknna7wpvtl0j66mv5dzyq9gc3scc9tc3o6opnfuwli1emmofgow',
                mime: 'uacvcnmwdvbr2i2sqii9yrwstv8xqjc0gl5a83ay52leuch1o0',
                extension: 'ue7eez9tggpned0s7u0o9ls00ck0vc8qq2vmtwyf4df8jx3syg',
                size: 8299027830,
                width: 912241,
                height: 257285,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'm9dr3xqd5t2duyz5fmbx7ef2lkhd9ywvkwbbr752vwu3qj48orkl64tk71gghv5z0ay0hd7nmx6do7vny5y8bmkbqbyflb2yo3ut62zkkp4fpylcl4bnk7mataf09v7lkhjs7ifdf773j293kld8ck5po3xh8fb6vuywcqvwghvqm00cuz3lxpgahtzje30of4aez8egujjuhxbkgseu1ujjglw5zesc59afj1a7by8t8fghxw0q72engmcswr64',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'zi2sbw62b2obok0h2emzlr2lnqpeo58pxfhz33xas49rehvo9jdz53etf7q51r0di2me7l4ymwy',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 756417,
                alt: 'pp7b1l14s9l12pfjl3t7x3lvk605t51gxh7c4lfl9b20tp74nslottrykw5igkgrtk9znaz3en9sn0ayutqebejg0aj2qsdbfwbj7ntx6sh59x20druvkoe947g62bpohhu8spmj0mz7tbiox7df6rxs695cd80gwtvteu1p3oklw20wo67wx7gsp6uj9v4gcnxrhl4z8o1f4xlvxmf902b826ty34ptz3isjalk3j5i07x8hxjfc0rhaq14tlh',
                title: '09ykotgrv9kd8hg9sudlzzcsjl0el2sdkrnwnwg6tk7l66ku31nf9mmkne4fi2x0hxzif429djlp8kwamnexytxz7u2s073diy5ya3q6yokjlo6v7p9f4fwo9ug7cwys7dg1mqnhisn50aj6dcpd5s5ox9kyk9q675koknui76cgbr5pshu6gz9xvg5riu2c3n6ue1mizv98jdvmbttsrs5yp2izkyeavzvocwmrzx0sqh5biau5072g7sbefwu',
                description: 'Qui adipisci soluta est excepturi quasi. Quidem et quo. Ducimus ratione et enim. Aspernatur et sunt incidunt ut quae eius esse. Aut aut aut placeat.',
                excerpt: 'Corporis laudantium ut aspernatur qui cumque. Nihil vitae odit. Est quaerat odit distinctio non dolores.',
                pathname: '1xpnbwse8dtutch2phy9ueanxyx36yz0w2lq6tigmqj722o3tfgnlggk3d4rzmymoa679yayjb2f1sumel8mehck127q7se8h6co3caggdr0fxe003dueeizhiwwnblrjda3bi65kv5ume45i3zyf7ao2ns6r2l7yw3hhygnhw55bza7fjtkna30rdsnae0t6ss4fhdi6h0ipuqdvr75aiuvukjlimimedo4ijapqgcg7anxff3otjx45ulwiajh9mw9cfhrkfr2xyo8kj9ydys98vz8wx7ht96yvb4kbhv676itpty2i8sefeb58ugaxf25dvh4a5u0wlmwna7v2e5nl808nbwvnmsa487lgxziaa50xmpp49tsmk0aa1d93ezxm4q1zytcjcmg4jsy4pi25y4hn85cas0nzx294o64es8keus39brnyroc8fe89httj92kzib51snta6uu5bk1qzym9thb6qadrbav53d54xev42039w3phqa2i2acmt9ejibi2kieh4q2cfhkebqhntc73vda8sdq8jak8n6cg9g433gpizgmnw4ik4hodhzr3k05sn6ss3sypvzqkbdsrk74z5mw7pka8bjnvw4spgqa6rr9xpsqierz8bs0eqwb0xtdqzwnmyvckchm7udmo71luakwqbmjalw6lpntctsk7oeb5njnqdutuq16c4jg6fvl4750pl8mvocnhiuocwtl91bh32l62bemz58furjbw59m9q9xx3sb8n6tv9qfd4u9qby2xo0n06s3gx3193yy6n49eg15weak8ynbdf3cxwiyqkq5gchyh8g3d4iha7i0cyijbtjw1r5hzi3htwlxhjyqxggvsqosfic4wydgbfu2rkw2d7y1ahe4ndc4rur42szffo0qe6285thx8oa5wbngmqjdknno65kzjqz8e75ed1y0muisssvqvg65zxo2y4d5shqe0id6ts8oaniqq6xpwhn527a4rp6zzzzwoqjzkea02eod2q8c',
                filename: 'o23da6yhr8eon35khnxioki6ha8mgh8zc7ojp7uphrfg9ynervvnmnz4nd8dhpllugbe4vjgc9436gaesnqpmrwvn79jiyuznlaldtobkwtk3crzsumvz3qyx2xav7clhtdzlf28u3y7227oau8rsiywwnjhfic4mey72v1a1sf5kem0j48t7gwr3kn5hoxrk8t6vhm9ebris4hmu9ky4whf793xxa6x92iy8m13lz1orw7d7e5pj1eea7xoofg',
                url: 'ssgctxaopackwp2vx06kttla0snwf4ve4skhiym7t3am008e86ymts0bqfbwf7qfjlnqmedpboib24s7k4oc0d2ld5zjmf8vdmf4jc0mdfnq5rwiq9bv3ing0q61c1e0qg3v0bh0w9pkunb51deywc9udt9qnwcks20116eu5ge1thboqjeglo8covhgm2dx1zg1id5itjet1xwq2pqorwqwp207r69l63dueyx8hkgqmtovy37auj96rg7il82vx5wn0urg3h0ymkohrvvoq9bij3z0m8639xpp217hg9tgiwo7arqpzhjgxtam0hbw2ok0uvyedwen7624zl89ywoeo2kuzv5qvcabjruknoi98sdluo9kl9xh2inycx5i8ocrajg6x661dx566c9ktydin75uv6obt7lxrrrg0ra7e6vx0739lhw94lfn4uyl09lmf17fdc5dq2vu32jyiafsxwt9zyjlyv57nk0wv1w9xr15lcfj3xkxvi0tegqc9krpu77ntngiq3d4s2xe2rp6xiuiol1jkrwb3jt4ljvl1zhvpmu8xofni3xix3j4mq7ciy87r9a5ts5zep3kel8yi5qsphmj83o2dodyd5rl3tmdpnsddqi3hg8036vyhb89lb4jnz92lzhosmwetm6lbovkz1xtcbji4j551idmqp4wz3r964hwwdjq1lsuzzkqnazd2muad6qarj6db158ypqo577opie2y0cqy1ootu85f5oqb7l9g0fbe315dx7jauol0e15f2b4mmf8i8jvva4uf5i0rvtfqa46udb4lbs6yrifobd7hb6clhfj7syh039ry9u3zfpwgieragw1bj4v2osjxzb4hh7i71ecnyp046xeycijo01ivnwhej8td9h234zd8qujvk1g66eljq75vqxc420cnaycwoom0hm6me0ankh0lymcb85a1h0pa3g8tpfmq6isajy9lex5uthljdl2a7mdai41xcgoyfvbrqwg01g27p58u1dh',
                mime: '94jcrp8x6hcxvkj5omgeoajwjluyltj7c58qajp5s9ocoetkpl',
                extension: 'u7jbhtoxywea3qzmn6l8oqpktzg87hl8t2lixa4o1b1b2w7fr4',
                size: -9,
                width: 532384,
                height: 584625,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'vyxe79obi8zuyh4o72o22fcq1irzyr9s3lk751fqydxcp4ewrkfbhe06c256kikcsdfpbhpvmo9rpnx22tmdoo4o8epeqc7a18a63qobvc5k33yzghbb6jt9z8aajib3g3disvn40w9q4fjwh6u155retifz7sxl2hdvzih2pl8l5dnia0vxoj6cki3jtjlbdex6utwvijo7b4mssx1f96dicpf2owwv4y2lcee48hf2oy7cs7sr8xhfi8b1hnw',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'f4ped30646bku4ar659jvbmn7lqlql4q7ygfts3k4wipz2jjdh2urk51w9d97ac77ay8cvs7kgf',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 270963,
                alt: 'x05hsugd3wqbxx6o8zd1r85ltxmwnkq3yyc1uslct7k4xj48arrd81s00rk0onqch44tqzso7gd38162croqp3p921som8jshs9ltfya1po537j7xin6io5kiwci4n34jttrxra6ynnsgnlbgb6mtm2rvoo32kx8qzfhmdc5r6md6k9xbb6crx067xrhi6ys5ew0ys1h5ngk1erz2clzjubrqkln9warailuka3xt7pwp8sdz3ral8pmbyvzasm',
                title: 'duzx9zkwpruiq0j64ei7dw9fkbjsd0x9sgf1r8fjvuns8c3vwsx52akahf3zkx9js88fa7pjjmizi0ber22i3bbf7hkvxuzriijzieetelzczryp4kpkdbmngg1jx28wio3jwjkzlobkljwootmql4y7eswlosom6qp74c5p5bnn2fr3veu3274okxaj1hcmy45md544aykji17z007zzsyz9tztboadq8dbyvbaj40r9gm73uddv1ux8f0ddcs',
                description: 'Ipsum qui in. Facere rerum et ea et sed dolor sit quasi. Reiciendis perferendis eveniet dolor non quas eum sint provident est.',
                excerpt: 'Est inventore qui. Quia itaque rerum officia distinctio aperiam laborum aspernatur. Est culpa repellendus amet quos hic adipisci omnis.',
                pathname: 'fx8piiv427193lsidcz2vvua5yfmbxvj2c02zmgl3a48x60p3z5spsf3hav62hdoah04ms5fhak5oc0kkb042klh4b4snmxg3nrta0ki237scl9v3brx844x2bhuqzt201ypmwbbhjyk2blo5j298xc8xkq7hmc2golhwycfzw8qe9glupqu9dcytcwgcqy2nl031u330wkz0gpl7p4up9bv6d1e2onwdio87pjioom2tn4iiceclr805msq1wn85nkw2rcoq27391tfy1dodx9w4cf1gloj3gzvfjlnr9q4u8mgg6hldr3540gslcrigir8y6kz4ksq6yy795yxq32ka1ktajl7fkg4mlg3xz2pj1idbx0voe68r7k60mi16b39o0sn8y2f29tlnwz97iexx2yke6jhec8yrealfju5uxhq4susnhx2he17pcu0hb2ph1f44qsb6mpd76tsjsuk9lrp3umvwj0uahw4rcx1zczdwd78rqk4kcan5v54wb3ubpa2c0xfu2fv43m0qj5hdwmg37xf5iy85jsuf1q4gdymhiyvdpcmxqup12mkj9pg7qw0k3glqq2tlsqvjqtal7vfb5qzgolg9dk0xu54c2lcfb69h7qjyx09wjwzn9jo65i4mb4fxu8ilscfg1tgr6f5jvyq44ni91f61uzm036slnjj16pltnlpanv1wxncaarp8llwpt3fkb6c9m2wwmvrjvc7okxn7jglltzofw82vujzkqgosa622of98wlv7fjylzmt0gadpkh87rbrviym4emacdzihbuec96ueq33ttmeetvmbw6qlw5pae0j5vc82tt31pp7dfgz6p7upq4rwpufy2xc0lz1v1garb4dypxtdov44cg6wcoh6l0cna6wu2i2j5z0elanb3h271nohzgdlcv64lhbfusraqha443q0f62oxtnaclanvn1uu2vfud7x88yd9zmikbfllm2hjcu5d1vhklwtaggcvbpd8vq57uqrgwi13wk',
                filename: 'v54mohov9qilv6i5exy977r4s0qg95x6fda24qy9vh3yt5le7jnvellm1fhat21q85mlvt37tzwtjtdphq8fturc8fejfp0ms0k3o4e32ctm272mocaq1twyplxfofzli9m98n2fwc122ksq0ehggujwbwaeretpu70x97qsk1n1wkc1u3jgtx1oecq5hsxuf5o3me6tp22ba7s7elnyuwxxkssaekdvghm6sa7kltjbgt3rif9pzrlj680ao7u',
                url: 'htfuz39z5if170nqoyyh7w9ac8xol0omxzbbjexnhto00z3p0nouzqlf10af2myhezjn27wwmro8erbbfsima7odla1zff5urrvndylyo0lbee5lelizacr2iyhyw00lf49ywng6rjvr7u075fwlv134ssyopduc0m8eb3f0f3bkxsh4f1faikht52airjis753smc9tam13wb31ltehwwprllrc65m5222uyhtpwxisvkibeit5hxx79nnldcld8pkoj7imy6w0gdfpjvdzv800drgt8jz664ah8yenhxf52n95jikn82381cph88ywsapuoiv3kl2y678527lhqvnahtrubz7uzm6w1xj6jib55sd1o3r9vuc3kdyonbadnblsz0zel3p5m078cecspw2ntaejdfb3fblg1diu233j1i8qrjdju1zo50qlwv0ig6wjxszzsip0gv1k2xson9vam6lizpmnhgh02vlu8hol4wl2h92ga5fkgp9v5q32f0oymkdrig1jc8mu087fw5bp1gnppdjv28i6qbkaptny9rcn0h44spq1baxqjxbo7rdq7p6tya38q2e7lxf8dtucv0htgy14kwaemq2qgzjggybn6ogo5gzmfwmdipez9golv0qn3iv76pzm4wwpwmj81cmp1bqwv5tsqqj9p060f1e6twmp571n82d28s3xzeao3aydjtatj89dqya6zj2hjm62n2a0gl7uypjqw1072qw13rv2hyxlctgbllmqj86pdc2gbhumo0itwmmxo9p7pst10jbcoqbb4hev04wm6eqht4bpkxnxdeh279von7lqqg1yu6298hfqcfex03vrbodad4gx610x23pw8e1fkhx2dt5s2epc4gk2frke5cyfrifcy6aa6qcfvwbrrwd5tqkruqllk7tm4c2439en5385rwj7vt7dbnwdy2x4fgr81onvea02xg0fyv9xw5bffef3t0vmrf22iq1j6n6g900rkmo2hg0x4nbywj1p',
                mime: 'x33qyc2raqz5qj8xdgjf8bp19wb3ck8wmht0ec6y8prhftf7fk',
                extension: 'blvt1cpiq64qm8dazp57nftivkl96hmhk2z52rtf7iu92rldvd',
                size: 9030517014,
                width: 135399,
                height: 721502,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: '0gady6esoxai5zvadec8rwd5k0h7hbwv9c41p71q9jcbbaxwoypbxck3mebamwt9fh3tgs3ipwe2c7ml699dmwmcceyj03pbuxxazubey0u3ih6ezbp5pjzke2u0t0itwiwqcqrhmoz33vsdkoql5fxluzlgyl8fv0k86ig2uqqzrkjyfx4y4nu06b89scf5oxw1gva7i15esdss3eytdnk4vvgwqfox45hjvyg2j6g6xqsyqaqfy56jb5wjypj',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8f23eefa-f5d0-4499-8812-f1fcd6b2698c'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cf3762aa-10b1-4d82-8aed-dffefee038d4'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/ec77a052-3fbf-458b-a1f9-71b7b2374e03')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/cf3762aa-10b1-4d82-8aed-dffefee038d4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cf3762aa-10b1-4d82-8aed-dffefee038d4'));
    });

    test(`/REST:GET admin/attachments`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: '456295ab-60a4-42bf-b19f-1e7bdda3b3ef',
                commonId: 'dc376965-3f06-4b09-b6b3-a9734578bf01',
                langId: '78a4bfa8-6b2c-4eea-85c7-03e32de42aa6',
                attachableModel: 'nkm2b9eyj6q809gauloydfmkak84wnwaq51oypxxvafcugb2xtsvex5pmceaa4urmphca5bbr5t',
                attachableId: '066634fd-a753-4c7b-87bc-cb0167c13722',
                familyId: '6f808b3b-d926-41a5-b7af-71cc8d569e26',
                sort: 297977,
                alt: 'hpgne0mbhx5s4e80641dardi6jmmvpb4vueym5bk4ezruli5kj3v91qsp8dippmp3huc0l5evx65q9yt4jyvhb0pom4azrnpcq5kqw2bac33ebpxf053f0642ysizt0cxylggc6ur8sb7e6xstog9vcna1juahky6ke7uj2427y7zddgeg878lrc9mdylao8xlph7qwyygm6q2lq4r7aqegc2t0i9amsu4m30afy7vc59np2wy8lam6m3eu9381',
                title: '2821een2okj386f42on383pdt3i8rrz4e2wzqff4wpb4p3uwfoz6k3hltzpgzf3q8i47nzzjnrtytcoydttsuljqzc1dte69n4gxi44546gea2xaw1skxza8ea9fdmg9arbq423sh8ygt1zgcrs1ozau3aanrlzzd3mfxjkkulh84r4nyyv5byivgf0cgfvz45cuprizfocxhfmagzvaxgat59evk7w1ceb09e2oae7rfzzjsdulwk4rk2avvm9',
                description: 'Eaque minus quia placeat. Provident est dignissimos quasi error enim ut. Consequatur velit modi voluptate. Quis dolores quis qui nemo velit voluptatem cupiditate facere nisi.',
                excerpt: 'Facere soluta est. Vitae voluptatum nesciunt quaerat hic illum enim et. Est in temporibus ducimus dolorem voluptate quae.',
                pathname: '4u6awi06kbxqo443z9skh0fraofpitrwr5es901n5o5no2b4v3i5dysnoysu6o7egih4pqbhvr6pxb4ebfd4ip3ily81da0tizicgn20uzwukzin1j6zf4vey2pi960ad715bqowi3tsi4x7z47j63261as0nbcg2xndh0dzdwko5n5wumvgmd0spb4478kutb4nm2foi47ynf0gn158h3dhlkaa4o9f9r3j9z2931gp7xb92pxgpnmz6h2i42rl3pitxrmijdxii1le4k2bcitu6qqoyld1d7yuco6kkag0ym81he48eczcyl30vnggupnogvzf22fmasy4r2th8e7htt7syotqza24wexq81opw5p7f2v9790nqihxc6y5szvefpj86hzuee8zebd6ikd20kk7dta9r7iq9cobzr32mh5s1p0zylg35e9vgt0uv0tggjf43d6l0z7240mz2tojy87x3rai918xncbv7jrphu7m4ajwmml0ui5i3uxvhj2v36o9e1xyytqrj38bayt0b0flr2817pp7j0za56w36kvyh0jjk2bzvvarcz814pynopckg4hjuhl45dfyygd9hv0om1ii15emkhq7xykkrhlttb206g4o4pnatj84xpu5xggyin6s2auqpi5vex2onse43kfwspvr2mmafo92kj0xn9bkb25v7wz9mwsmcbpo681dpkumivwnmkoyr7jvl5nqtmb90spynfa44yu9j0sb30bb68mxkh6glapm2xtghikl5kqhntvbh0mhggnz87tllewfcaxmhe4r4rbxwprex4peq3g4wtkcx1u340nb1n2ivbv5oyy98jmrbtsjfa1kfzbhpnwb5s7amx127pyt2yf1jucl3v684cnd1s3geoqx43mvtstq64r24xrukb6kf73ceel68pkr2vmvw0jgr0zxkn5we4lono4mcmie77axadmgzkfgonhdxmj4jg9sblj91pky33unewa05lt8qix5u20ixw38ux3i',
                filename: 'sk65u1cvijapcp0nb99b9fu1qv5vr9rgzhgnd1s9o7fb5scdxmdnp0spmdgn59ff62yet3isyybsykhyqaz9em3gxzc3wnqa7aneo4l7sup60yk8l9bffvwdm0kwhecwwj50zrm2zncxwttongdt88hnkyw7y7juhi1od7bbsrjyk9n83hpklhls9qwbfuxyrcdi227pcv16kr3wyzmeod5f90sx3xot0e16etxud2c2mo1xa4wywhx70qh81v2',
                url: '5odcoa7ehmoq5a8snd5f8hkda3kdr8x26xu0150vgpc1zhmeapkazfshwdltao0ngobeukybdlmfan2jue875p1vznvv02dkert3patmoso9yerf8zcz9axvbk2ci2l6gmjfiqs4ov2bpfyidk036fckqk8iwxnkophtrm44im8tka56pkymlrt933fjypwtlgghp4hrqu1p6t2cvbxc3dvev6lseh52yd3l5blqw5529fnpfmltrbt4qpo7x26cgdazjcoprkane4mvyphs9bqnj60hufi8ifui9pwwmm4zwfqnec83zj1wvcphr95xbn63ra8kckk0w2cu310d67vqlh1lsk0ws4vvrypahaqmmqx50yv5a1ir8v874l0demiuo2au28d87v3rk4qebl8alk9hhjz7uuk90zwpw079mtkx8foybhwsvcecmy66pst7rif1x49654wmjfic2vug7hdzai194yo1e21xe6klp3xtfhx8wvm1urul1v4875mvzb2aei14dvk9wfa324k22hm2iqp8vx29w7wup9e7muguf2abwbhcxydkyeoj9fkz6k5yftkq1ip8vpwi3ioachatyzq307uti0kmstw9ut8m76w9dyk7tuzbtrbhwxarxs8qjoxq4sknz0btbrk93sr5xovemr16bftausec7n2df6e9ve43c28q13g7xj01eqx76agi54l06a93092uwa5joystw3ajbuucuiz53ilyke99qvg7wjvns4pk2w0bm2oczij738sp6afon4ywbbl5en1u8mm2y3j9l1d48i17e0cblwoyopaeigrmt07e0ibo3sx713p7czv9b4t0aorzqva62puzetx27x42jfkabh4v1ijm6ah6c0ra4swukivovpmmqfoprdkcdl702xqqn11n2ajkhqs98l3ul8hyahf9py9i7wrfwmkn6v7h1klbce3xum1un4m19qsa3j65rt3a8pmcf3lel6398k9qipos3xjey1d1rdpj',
                mime: 'l3mr2koen2h17ada2lu6hzn4xhqa7d27i2lpqlemmlwfor9mc6',
                extension: 'gy0i8dpipjxf0101ca6y2tydzybwaydtcrt61zhspo54n61h0a',
                size: 7155262159,
                width: 913494,
                height: 163908,
                libraryId: '2d13928a-1a4c-42ec-ba13-7e7149309cca',
                libraryFilename: '37gb34bu0re86r0oealgw2pi32x1as00gkyn99ighm6yejqcn1x32ntt4pz88au5djwguq8oqljs59seabohpb7fka6cnru1p4ul5zugxbxyiwodliz28ke7p1us6jxn5n3twvf2fuxi5dmvhhdjoze5hp2wp7rcuns1atpdm6fn7cetej6kzxvvwwnqfyce7yl2s90udwcfhcqtqptu5jnbq2w63tn5lqn6fv2uzpft3hpcnakl1o5zpvwsm28',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                attachableModel: 'xycls0ycqs4xs7c4jweolr30efkr550xgp9fsjop5pcn4zrvpknaxru3ss2njbxm9ckbgl5lcfc',
                attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                sort: 340782,
                alt: '7tj2c5fsvfey7v4llzbdzbhsf7dtnusmtwq1xpmuyyddnnbb68byom4vk9lu2429oca92b4pdk2u3hkpyyaqvic622pfmlr0lpg2sg7tvj58yqpxflaxbuc1tatjrk9dc5af3csfyij6izz7okacce3rf4dixt3fvb6c0sk16whsh5b4750arkvj0779v3boa2g8v9jrutyl49uj4obb3zb94c8lhz3w9yu2ji5qh9g3yevnujm30cnc2va8jjx',
                title: 'buiee7hh7s3vrlmtvixiuh3eb4hxztm0720ndsi1psnu60t5ib2uitt79jmsxhl2fu6nut0b81w9fzgi53d2hfgy9bbhvz5e4y82sjfwqceunxrzavcl5juoke4ef9xzyrq4p35j3onnrcuyxibqzxznjriojwmmfvpd26yuggvjiu3ocwzfuyj2m80mzlkpeys84wfyxdo8j6xm91u7cy1owi0dnfv5dh566lioqd4hzfjycs2zr2ugd0nn1l2',
                description: 'Voluptatibus necessitatibus iure. Similique sed nobis dolore. Et dicta est voluptas unde velit odit rem rerum quidem. Hic provident quos expedita modi alias asperiores velit.',
                excerpt: 'Totam rerum officia. Odio voluptatem dolorum. Et ut officiis consectetur vel eius. Sapiente est illo ut minima eaque minima aliquid quia reprehenderit. Corporis nostrum qui. Voluptatem minus pariatur alias voluptatem quidem pariatur nam qui facere.',
                pathname: 'aj187f32ndjafpfv1kqypun2fbgsk62zmtt01qz8bsaxtvf4bjlmr34yi851uwkhf26favdciz09fja9kmrhnjexgjje8mtaezbr2bmvr9bhs7x6kll4k43zuc1rkihutpjbq51bjcco9dpmo8kiahh8r6r0aexsds4r5dcmgdfnpkxo2pkgr8gw6v54jrhmr89g5ciz69dqc1xrzc41u4taalkk7famqkqbi73lscm1uilhneprpw557rhmx8jj3kci459h3ejroqxrhetbxwt1r0vzsebmcksfuhcphiogef2fgdplqfjg19pdf9iy6i0sofhd3fj5auurn8fzn9p8ruqy79o2npo7r0owt6dq5cc4j0j74m1ixqffnorau1zm5f9zqssldn9zbg88l47ld4bwl3jeplgd6s0dbellldoca1ull90ufzfkhnqxl2aehu2ovlauuaewrow10t9eh4h7yto6bvw1s193d9ghqqqmgqx1g8bpopmlnhwxk94w3oxxtx12kx7spnltu3mh25epem2mtpsaolrgyyus712tx5xp5xu1sf6t203nfz909f941a2u9dv4kd5l6ql9yssgmda5ycphhjsx97vbku0gzk3ieyc5nbwat3hbr0quc8qz69m4d9ozhu411jwkozcli0x363zqy8njn7srnnmu2e1cvfntgo7f41brgrhoe2kcomc7wzw3248cgze6g60p50alyiskniez2pc7pyumvbcvw3ytusehjjg4mzmpow5wr8jfbohnxtwshhi4dgxyuplbuvlpnooys5guqh2skwbqwdxzv7boahlxw0v1uww76owkyru1tciqud3jgloufl54x4yvqvsnyyrl9zkk58a602ab4x7b3ga8xkpn1cwjo4nlewihujuipjz4r5bk9e558kazujtamvk9pm0vtjtlloug2bcoj4t3xb12ak85frhxxlfctpww5yc9g4b78i6uyqaaqmz8ojjjcscdwsz8ydzxyuiyyv43',
                filename: '4gj1j9i9kzsju6f9susf6e7tnl6ygcxipa531di9uev6t68cj436ie889zguvu0zj1n132rcaba15680tqf9l6x1kk6btctlueh1tu9qjijy7xb3vfocgzxjjz259z0ez5lhwu2iv2sqg7irjtuvbhbj5ilrmp4utvgx4pdjux7pt6d847pt1yduvw3z95mt1ztsqc9ny6b9gmi8p0s1ixl2emf8hiixr51o51upvglmfblb7orxbari9ydiwa4',
                url: '4l7dz7hj51zwd1ssr49z2n7xhptqdpzubqyg57kkuur9sdwxjpofcigu526c8voka3b5uylgmeltt9eswmxikhebkxxlcnwp9bymt6g4rncew04sg9680qc0z0o0l82s3b1xq73t7z7g8mbhael0xn6llm6gpgfabafl38uaeoya4g62rrx82eq79qnbhrdbah26qghjipbael8qorfzmilo1tc3q6i9mnioq6zpseoqo2nwxlviz7zjxw6vurl1m5py7mhxlviomog4uc8o6tz9prwrklpawdjojwvrpowaw8hueffq8qktasqqnx009dljlsekmsskmx04a2lzsjiq3khlr3j4cnxqma4rkh1ludgtn8z5814xgu72hhpx7blllkxzzddvtmxlbigo3pfslzani11mpu8qumdwcqknqpswtg361jt0bxpd8ik98w1p970gtudfxwuru5g3da9rwxn4w5tigb6u7woa32zwb5fsllo6xa3jyde20stdjry7jae45b4unccey1wts31b735l6e561c8dxz2mye1e4lczzbj0ilx5vi1z8b0056mywolydsv9g7uyle1263pqb8loxnqvlgggq3lq77rchpewiqov9r2u8rwu03io6xueltuljdv99d1zp77mrqujpj78wdmz8d99k3m8ui6i9kdqghp6tawnxdd28afnfzxf9emi90st3jlreo9z77513sdcdwqc4g5qhl9a7f99wu5dskrj2e7qhorpjrbz9ze27nhcoobtdbs0dmh1dbb7e453cx798so1vogpmbhg1d847ycf315tk31sm7tle9pp2a0rbydtslehkdqpa0lcntd6lswanj0fmkc7bqlvhgfelk8edeiqxyv0x8926gkggwvg77z4vbhfjlkle908e3vfl29mgpa41ttvbzzyn0cc7889emwx81p8b2ujhe83gkaffoneyibohsltzvnsagllsgmoyf59a5cqql9zw93rwyx88hxwe9j1i1u4',
                mime: 'pixbgvkvf0wma1n8dmdsnrsm9zbv0jhmjivwil0mx5r9yh177a',
                extension: 's9ynm31m079nir3b302s7hstdcs648bokplrnjxeok21t4de9h',
                size: 5572010691,
                width: 800976,
                height: 376992,
                libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                libraryFilename: 'jinjeuloij6shhhmt1vljg27q3z1mt0srpu3ik7rjoop366qz39riok9gd28cq9sbwbyg1nk9dllcj65bqhnjqdivt8wr1yx383y24fzut8ogm0tjbjk0tp7vptwy86dmw7uldg43vn2xx0jo6sr67j1ouxzzs1hm4a7vv1rgfio315hl4osmf3itin2zvkr7m0dsz6qxdhsxgtq4gpqe08l8rpt6i9snntz5fmajs52z9i5v7n1vatplsmnmnk',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cf3762aa-10b1-4d82-8aed-dffefee038d4'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/8981cc3d-713e-4a54-90ec-4352cba1ca1c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/cf3762aa-10b1-4d82-8aed-dffefee038d4')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL adminCreateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '00c18d9d-140f-42ff-a007-41e12c722df3',
                        commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                        langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                        attachableModel: 'm5ci8g1it456aegkjmux7ucjo5di5f1edm3oi0px9xcjagqloj9sotql5q55azizx03l76qlnzu',
                        attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                        familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                        sort: 372452,
                        alt: 'ahu3jhtdkkc0ode0021b1rglbndo598g3vcx1h4wiyz96zos7tx66my0ajj86cy2pii3o4uoook4u994go2aqbujp5qm9z5z14c0g8w97gtdmfswotme8o60a58j52dchno64nka5qa6patgsqk572vpxkyo32mzxw0neoyzjmgdadbs12x7vuopyhedbrva1gvxdyg4izjdso27y1wlo7j1ou0fjk5oybmm4p3fg3alppnyn0nadwkxz9gitz5',
                        title: 'h2vsvkiww6kzf8t558jjlar6d46ll8s61ltbak2h88gnrfkx0fqc96xkvyykykilxhur88mpw7gtwmxgkflb174zu53uy4zbdnknf60neehmj7g7sdy40404xcpa7itpxspi2fo4cgsrd3vzdghenolbhfdsh5p8ns6nxn3k10q7bw6zjosfvd67j7sjuywz5w4fo7tmqc3x3tt62vsqsut9qiv4p6kmpxsiuggekn2zvb8x4yezanwhum7qpse',
                        description: 'Facilis earum architecto et expedita. Aut debitis fuga laborum veniam velit beatae. Voluptatem harum non corporis dolorem temporibus. Voluptatum omnis dolores delectus non. Aut totam sunt voluptatem sed ut omnis aut vel.',
                        excerpt: 'Sunt perferendis quasi. Laborum blanditiis dolorem nulla. Est dignissimos quo sit qui. Error optio qui quisquam mollitia omnis id repellat tempore nisi.',
                        pathname: 'kaql1dqlbhog60re57z8ld4p7gj8xv86hjbbmwfiykxundbfdpn47jpel8pkyww4gpr4we7casi6aazikc7ciolh4f6om2nsl16p6oqapvhk4bxa1t2t9lecbq8j4u6ijioo93lftwgppe4npl0fdvvem9uv72goabx5xjvezkq0qmijdekuel7q38rks663n0lnqu69rdnwislekkr5ym98ge4n8bybq3orihpp675bn3gtojl3ysx5usm4y5wcfh5de6qv3esow4s1d328xsevdmv6yo7rgden1b19zrmxfsauw61cibnq2e4pead42o0bul66rf7sw0dlt22s4x5tx02zcdlwi8wi8l8gnmilnk4kr6i1394dgtl0gc3qoay6aw8koprke4mnxio4jl756pz0bzezaqr0o8r9090o0ohi8zs20991luxupp3cbkfvwvzsvnh5ti7axt872le9tull1h8kzk3geo5kouj1iegxkhb5n18pvrgxbv2v0qao54odpqdktewcflie6cjs2nn9unq85x7pw2tnhaayeqp5kauy6zwweotu5gy1pkhve031gjctbt0ic00zgr5070712fyqu56grbkjd3j55bxfo60n2eiupv8pgh82anrezcvhhukfr13ph8m5lns9ki4tpd2ffzbvwddfeidwx0zepduqjcx8wv1wzy0f1ow3asrm3knghgltlie1gh41jpvni4aam885w6hgvcwz02ebl9zyrgbu3fwlqio2pfm5ycb1wzp9tmydn4z3hy4vtnso8lat4jjdl857z0712sne6o5piisb5sg8ksgm39l8pf3yscxl75e813m1ei4dm5zlslqlx85afvunu0b5tlzu4gev0qag943o1u3er28ltlpgyssl1g92jjnwvv9ec7rk7gyo7goy4yw41xyy4iqa7a3pgsfhc8j6u83psmxpiuo0go3zxdveke2t9r73xtiis7nt1mv4hl7jni3axfx800az04wtvz2rcdmi',
                        filename: 's3dglmi07pze3ceqg4mt4s0vgpwh1nuae48qm63y3jj5o410knii3v0zr82x2z5yp55mu4ftu7bi8igk3s1u1ej6gun5lr2b05izki5658dbdmqsi57f1gfts55d1xvt88gzfuath2z7k4w7tmd8c5o8dv5gvt2ublpcdgrjptgadj0j2ets2drbhfmoq8cw35e5w6rouv8qu73g7r4x0bd65g9bbab447vqcdqwa0oj8v7a18d4vdi4xzv8zi3',
                        url: '96ub1215kltqzse33hb9y6kvcu0p4advz3ko1bbjrlrmm9vegwzngjiy0bodj8z96r8w54qcmvtm8cuk1u03yz023ef0smh0xle572qfhp3yv40sy25pjub7ixvbnw7qwwlkkzbdfzste8wckdefpv9oh5s9gvjmgwn9c4z7fn5oju3jp0oq581etvfllfvqlm8jaueoc1hevzhsbv0kf1wy76ujdr5za0fjddecg7a4ng2abel28wvnmm3z23huk7qv0av2p9vill14pr3t5ca3opn0cx1bpu3w2ao9n2be5zy0ps44ln0qdrgxdyjs5foo8ym7lxx4lagfttvwbbi2u8gy0o6us54ac1p1ml9koelk21q0jslgl74rxlx42vy0kkpepuq0cdt040tiwe04p4y552pb3laks9dbo9cxyamm0pzmdx4l6yp92rptkvxkbem62frlqozmdxs25copmywklvp5mzep85ketlppp48hpt4vl51zdh2afqy2fqhrr503hj2548ydgafkv1iae29fr1x5u253pkru2y5ijw74e4bsqsjw5q9g8tjbe7v23117yh8eqspvjmjwrdl9eq337wh99nqdr9o0kywedyz7iwqe3m75zo5y2pmp23pzny3ippgresfch7zmsyjo1nzmnp1nkrtawnwewhc3ovq3ofeve1nwkmfk61p7vhtgxr4rf9pihzch95zvhvy605wg7dxq6ryyl9o9e3koqosceftmucxjewhz8u3e1nniu9crdgsd8x8dahr2sozlnzjs3r80bgbhs35mor5lney4iy196r4pibs51g15csc8avxfj2uke42ngils32kqjp3nbtm8l4hcyqa5dsq0ve2aim9nwlt8iaez2ad3laomr4g6bluw6eo8yso3f3jor4pziz8kvwiv07hxuhgp3sogdwqq2773xgg2r4v49eyppkiy2yxq9dyefq11nqh1hvfh35qgxvta8jidfpkrjykbktkohsm4shrmvrwu',
                        mime: 'ehoms6ys575rd8bxbfvqoe009s0svk61sq4nq6l1qu031ws9h0',
                        extension: 'vuqpjk84yy3ti7ism7ohxdlmtr2cdmolki4t1i8cdzwts37f3g',
                        size: 9936619390,
                        width: 842478,
                        height: 654378,
                        libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                        libraryFilename: 'pt8oep1f625wk92dnzv5bf5hv8ume9ot1qajpqjnvlp6w2pq7w1bdd57egsh2rymsxaulhky1mz52yypcbtdmwk1isfm68tylj919tauwfax32xxpdib0v01z867k4y8tkaixtfx8qnnoxrn1jk4v4k3ckz4bxqgshncohwgv5a6p1bunytfqpqsgyci16wvi47jxo0fser7a6feeih4ey6aup6zskxcqbl9o24kbf0z9ylcu6zki0680282qk9',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '00c18d9d-140f-42ff-a007-41e12c722df3');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachments (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminPaginateAttachments.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '434c20f1-9348-4db2-9228-cd4c525e7493'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('cf3762aa-10b1-4d82-8aed-dffefee038d4');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fcc4aba6-7d97-4dde-b646-b1c6278715c4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('cf3762aa-10b1-4d82-8aed-dffefee038d4');
            });
    });

    test(`/GraphQL adminGetAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachments.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '68935f03-7469-4b46-85ef-1f4c02f8c61d',
                        commonId: '1f21bdef-e22c-490d-8476-a365dd43fe00',
                        langId: '12aa93bf-e70f-4037-960c-81aee370b44f',
                        attachableModel: 'deon5vihwz1awbz3lxqt8ixudmiiz13kt9gfcclz7bi5ak4zeut7udgdeww1q8cg8vwe1682ssl',
                        attachableId: '09018301-32bc-41f2-add8-9c16e9b1dd18',
                        familyId: 'bc8fa944-7ee8-4129-a8f0-337276a6c6f9',
                        sort: 852041,
                        alt: '8k69g0d8z3n9jim87fe1bww7bqtwgzid37t1omk4pvx1jq63tnq8l2s2tmc1s3feoi8ufudzmqbltoy2t928nyvnkad0o61xtymfynbttpjy7jtbptyo331ia4osa8c1rin4y78r867o335kip2wli6zyh2a6h5wjyiitnlr6llcso6132t6xo4ibkkt4b6yv5yc7ju2k41iut7gj459nk6sinabu14c03cmf54i1tx73k4smn24wb1ddw5xh6t',
                        title: 'csu3qiyi55q704hjro63rafg50c6p59atyb8d00p71vq240bwcn182w5wp51f85g5ezpbeu88tr883837ihckiu7yx57rkit47hl4xa9yrhvd1ic0q2hin6q3f2iyjdjw9awaxtdkju5xj104i6ulut6sdvvpjuk3inx7hpcymgqmn8dfmdwr7f03hg0k5vb2nzb7c6l32vyppc82r39h6hte63l1w4lnae5y8a1r4zb5vu66k6y8trkcst0gkc',
                        description: 'Vel aut labore a consequatur. Magni quia incidunt a alias quidem qui itaque. Qui et laudantium culpa mollitia. Et dolor veritatis aut quia error et molestias dolor corrupti.',
                        excerpt: 'Rem enim sed totam quaerat hic saepe. Harum nobis est asperiores voluptatem non occaecati molestiae nam eligendi. Numquam aut labore rerum fugiat impedit. Perferendis est molestiae mollitia ut voluptatem rem harum officia.',
                        pathname: '6lul3nr6xsu7j9t0zfm8oa69irxm4ohjcxzkb0orsj4we8x4tl5hpf6siqg7qpbqg501fve1yz9znev3g9jtpfdyeoa8luma13ugmht78g6a61f1gun9jx1u3ciw7a9o8c0l6amgncj5orj2mjd79eof9see1nldir9im3w89y3rgevhf8leqxlbg7w72f3bpwhze5820g8sxqx45ph26niqzu71eivxm8xcmzebq6mnsr56v40edejtzpym87abxxn20dl77nawaed6i7a1iy67b44z4f55yg3dhzwyfwqy4ztyc4yfj6foid0gr5t4d8pjt4xzs5ndg1x4lhq3vfrgganbrdce7kbokaa6d2ekigdsrlokiph0tzqd7g1knzvi8q06ztbgnz006y2qzpzk43h3v8thvl6j3n5xcywjvgt45yf5a209igxiuq7axx0at4mcnbo36dxj4grlzb97jsyov356z9rrj1zvtt41w04zwe2tbm7awk9pez9sbv6cgz12o8wzjlbafhva44gzhm3sey4slt1b6ix299mcpjog8e6dreclsk405rexm6da16ta2ri9jcp5414vpxdg9ngey9mj4lpq40meulx3eh5y0309xkw4c479h1nend9a0cr0ejxslyz6cl09sxx0a033uf9btl3eg3zcaxmhd6qwurue8l8nbnaynm35zyt54q7h3b2uqfs3isuezczzmokd35kkn8x78pmqhe90cyfbtxz6id0w4vpwqmdz16dtrbd3te4dgyxs9r3h49z9os737ed2onlp3t54daauiubnu383ywqmobn9991pullv0yvw8dlf55pxap43i4t9e8lxvwhs2av8bwgii7x8qjre9muua25s016j7n2anrv3ja31vhx4fz2e76o8pfv6h35ik1ec2qkrdso3pdc1to2i5vy6kuibpn38hlngbzvsl3cknlbyqbcnjdbvjyggri7je4dif21pc9p4f81wi7q54gtly7k7eqap2lea',
                        filename: 'zygwnbncucyz6pbf8vgs7ps9mu94yax2s7baz48rvdvagkvjrukixqtw9f36pln33lf940ljx4gi4nw8rxa1f0cmp3k4f131tmgrewcgft7j3onn17ruh7fv77hb77wgzoves6nnlcgyunq9xpbupycehj213ehlxjcq3ubrx8z1rk1yxf24kpyr8plhor01l7h7qkxcqpvpethfvz9pdi0hetu9lmxhvap63nm7bw0ohrgj0t8xt7wu5vj46b8',
                        url: '0jmjet5cgkwz03ygeffimgo25tgkx9r8joxeo8zikqg6gn6jljnc6effc2mblkxfx244rfiufmvdkacp5a5w2l4d5hn6z0h8qmljwolt8ysh70o6vmnvuwye9g7pdxznkdbz8id576z60y00isi5cwt8ivt7h7dc0nvzsgtuv1y8mfntycv8h8zm70nuis2y5pnasrcg7o8vqg8u0ziegzvmuo5t21udhyx4b1wtlwapq4pcvdmmv6zkedphbvhvdpctbl3r71sse2jzy7ea6rly6bpq8e7s1hx8w6pa5nrywowezaxtcr0059ipnede8i6jpzutoq6ibbemy8ckhlk6ezx0k1jdoxlqjvbf0cx5lkfdbwaa4i0ffevleb5bs1f5dq69hoaqrw2jlbfpehevw140919xkb5kr4iwy98nwhm7fdrh86zlsm41ucu9aai0rhdxmag8zpygx34awzqnvp33jvnkch843cwcp8agweime6lfj6f6pbue7ggbjx4jt76tryp9cjx23rjbb9r07xf9vaj8f6n34834819dap8mtfu5ut8ylqjndw32cay7wfhna6k69nup9j53i50yhf0plkd00zbd6k25pdf75q7ishuv0ablrqc553trqsg2628f03m2nyiom8ac2i3nkq6x0bq2ut40nrq1x0m0snwu5uu00vzyekcw1ou0y4l8kj8gbeoytwa0f2u26y8xveps4ll2p9pcbwm4i07sbydnwhpll0xwgansviijcwkwmobmyu67vtvt85j48k025pqmi7h3rr55bn4qdnjvmkacvc6vrdf03jwkt81hlfjcmodr4fkiyzkvcpbasxsjnwhaxhje7nou2s46frvdn0a45wfb80cp6sopz7ttk2vkc0npmkwneuc6mfjn6pkknoac9it4uaw34cnud30jnfwyyqmkadgirt3jwnsfnh9yda7hztxgsl1y4wn7jstxgu4221li98oj005zhcr7kfhckljzhe5u4nmipxxg',
                        mime: 'bzt8ulz35y3847dnje4h0yq7t4ukf82rr6edmowrd5hpjne5yf',
                        extension: '2jr1a5c2odt3h29ivmq7hrakfjc9gt2esx5orfgp5jddeyi5xv',
                        size: 4332786416,
                        width: 172693,
                        height: 968450,
                        libraryId: '6b15723a-b9ff-42e9-88ee-11fd9dba16c1',
                        libraryFilename: 'i8m6fnv6ief5he92p4mz7bljzmz93ae46inrtuf3w9v65qbjh1q0grv9135zxlshsuzbwmx2zixefg3j99luuroyk4i9h97tjppysf4r4enzbn7u5zsqq63ho7k683edz8qtm1jybb33msfxsyrumd5js4kreopz585vv60wc52dukckzpx3jka4yxu3rj4esmdkdys45uon2lyf18xks9wx3qptsqdzd3j5r0a72c70ipmk7twalottai3glxz',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminUpdateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4',
                        commonId: '98cd0af8-1ccf-4388-b39c-f068d81e6330',
                        langId: 'e2e65b12-b598-49a8-8926-8aa36eee4ab9',
                        attachableModel: 'xlbaj30j2tynvygya0au72qnch2jver872sgutmmnmlzix8f80z2w7k5erde1s4aqu6ptwwhy2n',
                        attachableId: '0bc1aac7-0a19-4964-82f2-901339fe5ca4',
                        familyId: '6b524bc8-901b-4d89-a612-d4965682b82e',
                        sort: 577143,
                        alt: 'mml4d2oqi0f1yqc7d7ldcfivhvw7kphoikboefki4qlxywv98pqcpofax85s6v826cmc1vj9r1j5ejc37z8w07pcfggqlf8252car3rjahiof5h2x4m5a2k0cxwcemvwrahnp9p6kchj0ycoxnfjoq3zei19uy0wnruknspusywfcpu9cwqlacurnfu07880c1k5duj6gm725z8lofizf3oog5otadmc1kep6iohwhxzif37fhfbctiyrjfsars',
                        title: 'hwwimki5q6icfp7u4il94821jrkjvrauycuixe8s6khbefs7sqr11454oad8rmvlyyjvwg3p4kofxfzqvpgz5xstr6cdpzawj172csdxwqbiaeksnd8dmdpu7uhbgjalq22f6t3m9kxssze6ytm8853myqmc8t1pmxigsqclrjorhosznw3kmq2y898ld24k0wj0v4tdau6bc2uu2h4or7y3yzbnpv7b05wzlfhrg93aws4ug3lt2r8xialbtsr',
                        description: 'Quia necessitatibus facilis aut quo repellendus. Doloremque qui iste sint laboriosam sed est et. Ratione sit omnis.',
                        excerpt: 'Sit est sint possimus. Iste impedit non iusto non qui. Est ratione veniam animi accusantium consequatur adipisci ipsam eum. Molestiae excepturi enim esse officiis eum et labore.',
                        pathname: 'ik4afvmc4rx9magtzkcq7w2ynerdrn3vspdpfk8i6f6wjecx4y94mck4ssdr8le6ukpqvjtm2x6ltr9mrdupgw0dfgxnsynn8z1l54kd210eysarsb3hinj8dtu9u2m9ow1ax0m8gux89jmoil5xt52ulbhvz2dnenl8eda9n6xaefke0n0rsxitxmyhl1cxkjoyzv8bknzuf9ztenvjwj7chj4nmon2aph8coq3d72tlgmv9nz50c8uthourl2oyg4qbc3u5ijyagotwslyq9l6wdvg7am1rbahgrclskc5nuhhn8zsx6boxufpwhibf8xj642ysfl3b1zlr9n4tgn0ob0jxik03jqrukey9w4squq1z9mk76479n9kmg38wff8cz28wgfljfv6l4dyj5bvo1faoqtgoxhwzjrgtf6phdw19puv82r7sbbjch27qe46ndqxtmigwrk3gh809caxrxr6ebxvfxioqgyf4avwhrhiwlf60776jn8ay21ualb6f1abk9yg1jpbqwz5ttubvk08xf5wmqjoqn3soej0glfhb6urgws2d1vb2dhko9bz0utl19r1c11kgiyjqtwbcvymdw2og3rcocitdm5axmsm0tln4v1a1bztq04v3t46rl7rus88vgixzeyvcjdjyen3mg9jryix70ufaaaldiucc9vlb0rp8wyk0o7ym26pc2m4yeo0ohqf3ckyq61q86gkundsoy7lkopwc88dc271svlaaj31gjot636rt8rfm8rsi6k23kziqjh5ugd884vtrbobcg2jno7jeyu2304oac4sil3zdjg7a1agi2h9sqwqvmntmjbjg3ykpoyjf3yk3bg0epr1irvyullk8njavqysqd6x8z281hssrd7bqhyrgyq2bsnni69xzrluaqm1xxvl6ym3y2r5glgds1h8qrqxlge9mxttxtx1v5fmbrbzox72fpbcb0033sgk94ssxc24575iqutwnf6fkqavyvufrkql0icf4c5i',
                        filename: '859iqi0v6pj46mdyay2idtxmmlcf7hgkrluddtklgwr10outc2f8l1t1711txummm5ifs2xha6rmu48x9gbhr5vq5v9h6crl29mrph5drhcvwf1hb3bbxw9wkce8blmy15dsk8e0oikd1jqmo4emulo7sn1mbqlxga24lhvzg42f8md50jt3kyzy52gifvn7tpnaxogjigyy6c0xru3jbqbasy6azg8x7eag1cr0mca0q6vumvyas4n8b1wfhxc',
                        url: 'cb9ngxx98rdtrw0uah5al35vcw34dpi4souwtiucj8ab0055wd4u7hc4c97ajwt1ue70p52rdfaikyaptipf22bb1mkaveac0ghwnuh7wyra03f7juv14qaoqlk38xlm6uhpyjqno1u91cp7vcthtg94vzun92uk4yrkwy47r3055ithkmc1lzgcyofbsmdo133btvrb1rj72kbfhbd4jfpr45rrms8yfow0tmkt0ahdhmyiu9jine62ciqufa9kl25b15f4jr1n475avskycoy3xbbysckubyd9q26hoyxjm7kl8l11q8jybiig2muyfxdkbpyddrhei41r6m0mpmzff6lq2pn4jx9pt87a29evz44kob4eg90jv52nsi1uiorggat4tgz0rk7jg2snx8os50w2260322mxb0oregimi00e6rowosf3krfabf0gknh0qqkqo61z5v4u7iqf04a11zoka1sg5ernpzwe1prhcsla1zar887s30sx3hhlhebghy7ud7kvqbvk1qf7pjmfh9q0j4t0d4f4oiwmbmzkg5he2obn7tdkm0vpeda7caqr32w1dqn894t2pkeomdr57ijcyvpfg4b8g3npv6c9jyem1vusg9aw1gd5q0lx9duy61tndr9we1yaod8f7q45urai2jyfc8oyzvu692jtogora1tmj7o3r9orcobjxe1r4ka4hhenul63u8oh2llysmfcwjnurlo6ofq7j6dotw38gfwn6gpaz7puupb0suzrg8q3xrg7un3mma1uucvlth27q9qvlamp1kwcbi1ig4ft8v0rv8vs5un4qv9k1qwfc1oymo9iwlydmpav1gkxmta66m7evs8nt3f7jivntfo659vef7kkzwdawint6uzwnamo1jcieplkrzdxqmphvphi6lvwwey7jd2c3mlpgnqeueu9r1b51to8gflpghntqvsouykgbhq16scnx4nmcoi0acpz4xv638tlsasv51y8wid2qbf13yd0qwc1',
                        mime: '0huadbprolzernkm5g7dj604a11rdqd5r8cutewjan7otwb9v8',
                        extension: 'y4d6pc3ep46ohp2qjl20auenrhla98vo4bwgujazb0v1jh36ys',
                        size: 2383515964,
                        width: 141741,
                        height: 347037,
                        libraryId: '8bd61ab4-0f7c-4040-a194-63200c3f7a8d',
                        libraryFilename: 'xpozparmv90z53v8fsvwml7qcds79h7huv2zjbtdlbx2x9146sw7i9p47qwrkfb2oaatbdqs5jubdk5qwai4chv7uz8blwlp82hj9vtpbz3wx92x37pdqjn3k4869ilxnoin93t2l98ik4qcmynlmrbp7am15pxwhpm81v4dao92hymwu9ha4nurk9cdd4gnozadlgtc8tbk5vh86ljyw5ixzjt8q67fjgb78dqfe07fpfpmertsae8v13zovyq',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('cf3762aa-10b1-4d82-8aed-dffefee038d4');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f644b53c-c46b-444a-84a7-efa4796ef3f6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryId
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cf3762aa-10b1-4d82-8aed-dffefee038d4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('cf3762aa-10b1-4d82-8aed-dffefee038d4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});