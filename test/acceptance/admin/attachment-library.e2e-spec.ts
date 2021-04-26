import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('attachment-library', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentLibraryRepository;
    let testJwt: string;

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
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAttachmentLibraryRepository)
            .useClass(MockAttachmentLibraryRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/attachment-library - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'o3ws1tmelu7nn7l6pjxm3w89k5pg9wla99sg4y1h3rfitru7kww33l6ccdmdaehnwqor4kgu3uy3orhwgm1dfufqk6mvu0650bsf71h77ck552z56bpm5paxtwl3xbut5m7qevbjo8o8h0179qrldhjob0azvqy14ij7iozz3sdf4mbe74ay2gddj4htrrz0t9kuwjfpfwkxwtn8luisgizmuzjh0do4t79mr5rzm8eiu884xnkrl9wwhr2l4dq',
                pathname: 'pm05zgccjd3rf075d6k4db4zk2ifov820fbzqz06s2y07ghd71fp9cv14y4xjralknadbotlajrjc5ddbfm8k9umxr9ukb1a0p1smnfbr0ptz1bgnlhwh6eur6upqdn6qozmlss5t8nkkp4gqx7vs26jny2qtkchfcdd7e0fedzyi0rs8ik1argb7ihw7onbmfbkpt4qfpb046cbmb6i4pjk2csie0wejw80xcegx0sy6b7mzqar65nntxvv6wa7qvuj6wnzjned9kegcg3t0l5x92an5swnolse4m5qlh3rv63utu1bo2exvhhversh8m9ro931vv9dq08f81gphlr9dflcn5mqvkw3klwpsk9hln7hcg33w4vp1omq74c6rtq8mm0qh585i461fegu5l92icohxbcjwjm73nvzcg5afqmoaq7m58wimgvn9j6dq7rwrjgxe2hybi5xvbv6lzh7ymuxvs8dj1wxzila1pk4mvl73lleibabyiv0n6e5lungwiajpvsnuvpaht412n3mf5015960ehvnx40izs8xzxftiskv57xzisxnshni0im711acqo0mbhr7xv72f37pqui62dd958wpn80div82vkpalgxxwmrb14bdz2sb2l6ewdhrlax7h5i7slzuypejausjfzqmppqosh03q2fas25q5gfwc1com0oon5mkiileijstrn9dxtpakc71gdcwxua0dlx4qm769arqb8sr5nvj6ofiafxvbo0e0eolnhjunkria396gkcjrbrhv7jpnelhgtbsey86odjx51gzqblyy9hz9uwwgh5x4augrnc9453l495m290l9f5usby9ws0caqcl1dvljniobwilz8wzrmyr1hgwdi6oejvfx1rlgystkqg265ob1x6xzmtu0xu5iuvzxsxqv42smhra0e0cx14cmf3sqx6wosyk5ct4ycbuxxqlrgx8guhd3t9wnawpkc9sf7n2x2oqblz4cnp5mzxzls7ozlpe2ycr',
                filename: 'lkstctdw6ohcs18zmkabq559whz1c2y63cdpulw3co8fxpby123gla6vpe649td81e4adl90u8kuj73dhzg1bn08gh8lcrwkas07bkfw7p67ossx77boypx5nfqds9dj0dsmbs0iaflyfg6s36i7sikpaynmg1oco59luvwn4ni1afavp547pqc7inuwabfmot3b5nmem9y8giuveiopjaoc5mfezj9t9nl4ptp7wg2a6qqmwl3lpcx2le0x71k',
                url: '5d3w7amltmz57oowjat31hhc1cypj1yrbqqjxp80rc9jgc8nlucui1d1d03a4wt7hadezhlasenp7frxvjyp5e55h55v2mz9ffwsauhqwz9zawzco825ds2l11pv51xkn5lkcsiw227ihah8pon75ssva93lu0iht57bnwwb14t6wtogyr0usrbi7lkp1n3pwrriwxkmfybyeti8fiiuymv1cr4tu6d9dnnxym2ew8ylm3puxiae45bqo9zz2zg4sbu5h1o7o4g5fwbrsadv2xh7m67z9cfdv7yifmgq8ekpi5i0i5tweuarbiiau7tu5xhw5iq0akk4s8wnld26s58hsl6aqekub07lsa5rgnbaxgzt2qurkcvkngrtrvstt4vmvz9pm0whphkx3cfefd8he6tzrj9rpg9ofrcddqhkpjopwpcrtg04f3fbui1xoanmyifte969ajll4dyfo6sayhxxe2zpscxt473dp5z849nvg7vdz201jffl7efg6aq66agnyb82t53q92k6clzauysx7smje5jojli3okdbe1a0v35v3e9w6i45qw75qgf15ibmlw0zdneuj4rg7vc939itsmelld27pavp3pfd148i03blzav6f2b33k5edafljhdz5n45yhf6r9u0z6ue5v4mtppr7hbzw98x77mfnon3j4rdif8x02hjb8tcogu9ix8xgi2zzk3docbeq04d8dhvno6rtbccdl1kj67y3f90md17be4maehkmzarwkr27370mzh7oki286kkkax444yc1vdekdru0jt0z09gg3u38p8j5m3z2gfixhkm6lbiw6jxds10spn2zgaybio7p5ljqo46836c9bb8nlme4d5ih12n1suxkl4l2tsyv7jd4y6me8v2k68rlgw1lnz53x3r9q4qfhvgkju2ggcieaxtds1lohxfl57hs86cd751zy2f9w3na9fp1zep8g9q3shn6680u8foe7dj87wyzhf2d4535klltrr3xhhc',
                mime: '8arctbvyl0b5lthiauzh48m9kbk922aguq1h0t8zxkknu6vefa',
                extension: 'qlhuh3fbygcmhhvysnd36ymn5lru3o09vinx4rh5do8kg1x9j9',
                size: 6692515222,
                width: 147089,
                height: 242468,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'jf98bvw9wp837eg8ut1jnaek4plnmjsrs2a20trqc3ed3dn1hrj02nnpz3aiaafs4i6kgamig8g7u0twio7sip3bvp8va72jyuuko2p8zybl4z2m2knjuesjuxxt9txkdtthr4oe43l2q92h7wa10tveqkcbfhdf21ot7y2pt0tdss8wzqvx9mchpywzqd7izog418kew0pqjy9sj6kvwe8783n31245pu81090wx8stzycnwzi4u4kkjh8hyhd',
                pathname: null,
                filename: 'qjmqz4395xpgo8ooerm0me3kq44hjj04gknv7t65djde4inbdrscm89vripslk7rp3ai20kfsbmlg1f45mr3fow0fsrfglt8mqera386ix9i4sgtt0isruw5w84xnkb802uwxxqdpqb80iaq2m6dnwcn6xdp5rwsx63q7eokwl1mwwjbmu881uf1aw3syu4tzm9k0372dbhwou1tnw2ngy38k0c98yk1pn2ev6iufneljbycq80wvgi9zyt7n0n',
                url: 'gg4tqzhgcrkskd9momtzzgrky042s2jsgsujeloe703fihs24pbknxsdmtdoqnbc1dbqewm8zmbsxwkcj744g9j51dnbyqqbkrmtb59uzaexbuuvs1sdqf3btwdjejo7f6by3f7usgfx1x8kqgdm2izo8s3k72hp9u3vj08edsebq8cey75vxcuu2n8ji1l6bbtd8021p6ug4cfeve1blvtcgoryld4qt7ct54n3qpmahln37ce73ydck0ueh502sfup5fiw8dbhph25p4fooz5c4nzpf3deib4ocnyab4wl37j87019s9wddqnbzzuf8pc5spvtkx95uto2164d90asfc5vw3ait3k5hghnu2rzyg0zex4nf08r72lf88h63cura2f65eanaed1hdbhp6ud9gi2gom8yvjdgv3yxpiqci4n04provfaq26n0r2o837j1jahbuxdm1yv9ediqjaj3axwj866uj1fgujkdgxo1ppvfsokj9izduhbm20rhvznjbvojetna080s9zu8mvnsiyk93dsi6ufepvmje0oq9cibmczeqncywm3sgpi02fd17irqpglt2pjrt5zy4xbd743atro00tykimx44hl1kgvhc1uz9xkp2sw1hpbxf4uptmss0jjg60rs8ihkvzziu7g84kia3e4ugnarsor8qav27frsdm87zd9e742s0knasf4d4ecx8krxxizi9lowe5tmjscipcw4nrelo6qjgk5ddo97n6tpvtg177zmr9o3bnv82csb6j5ywu1g7w7qyyrt7bzsebs1r2slbnv88oxu5dvc15m78hxsr0u0klkln0emds6rtly9itxoohpdo3ah77n96p5ehqem2llo50ghjcx591l4m1hodz5obhpqjv4dg8yjaxoukubxfdbesb4xojmf69mfvxoqsxwdc6ktoyzt1v7oja5lej1fplb8omo1vaivh01kf2c7yvcn0ploo2ahna3v2xk2yvv54hds7ge8urfiwvzfgb2',
                mime: '86bts074qlppldk6l9hrjikwttbksepub9iyoeztxkk9be6mof',
                extension: 'wff7vjclgmb7t8wu1fpg0jm9i2dpfo2a76hs5jv0pskidbeir0',
                size: 6231694487,
                width: 802649,
                height: 897726,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'juqkwvi2dd1bqu8tsug42rpx65p56hmud7jfxptuafjji5dti4m25friw9hn35jxejh13a9hmr8x3fgf4ol4qjb9cn2qppf5gr0u2tm52lgispbhw2znhutzevmz9qnhbmst8vu4xvqdil89c1ugujqtfkq5xmgokpvuoxemilejxszor71jizncrqhy1ji8mo7ex69qwunuyt0v4fx7u50ratx91hdxiq1yfb8j0xb1kiehhd0hl7oa27ueesk',
                pathname: 'thxdf4f04l6xyg57kp12voef5qk5f52jpki8faivo0vgjro5k2pthcrf7bji6fve8439iggcilano7d4lcx07ys9s2skke8idqa7zcpieomxds3t920qfknoti0e9r26achg1e76e9ana2046n91s1v5lrrsgw9t4r0sga6jash85e620qdidty953ls9yble07z6t9zy592j4gpsry1llgxuu8zk82f1vlnpkmqt0sc32lzeb92q8j16ir9g6e3rhrc7vn06povz2cs01zbqegwk0yhh13n4fte87fm2gz70fz3akx4oiq97rf84eil3ulgjt14s1khks8bq79m0sonft3so9kj3fg07hjyslu5cl5bcccbu661i49tslqfnkuy50cexps9oztc1uzvioi1u8wydy4cha915eq8ctgv3rz0hf00mxsno23ur7obxdwjs9b7kwmvvoibcqoxes9jezpjdewdtgc6tct7tf5m4axy9ki10ylv8kv6r7xp8a5az6cudr8ek2cjbdfnftwqh2a4wov0fqubevopqg35lk71k8qju54wwdoe84z5bhucb2ytskwib2ozi594e98xe92m348mu2rvdc9jkypspozuz5rngvwrg3awj8mtpgdxf7yq0ihfbvqws3w33v47carfotv15804jgz6q8tul4gcxel2oz4to4wmdll6ni38gqj7fkfbkdm65njycjcniduzs4az013tw5bo2j9jt99jym5701nqtdwjsojn52s7sx1lq1lhtvxpng4cdwfzywpuvbqdiwvyua27er730wudbobdnvpn39bbm7d18h3lspbcpdbedadkirn7p6wvamswtepdeq0wipobo4ichzrdsp55qnlezeyrf5fjgrjacrz5mserl5ythf6u72a8ohoo7o770has7p5750edk76nufxywi64l9u88a29fd330gg62rsfzfp4j53x93lxmnylbp3d8mx5ld1qg3w5lm17pn8znaifk1ltl1y5',
                filename: null,
                url: 'qgqdi051re0p4ug1x1tokce6n6ejc8f4lsj0hsokb7kbwptbi4uj5dmlm3hm1h3enk1b74knom8stjvaxg5dixcyuh7mke2s0ginv81tlpotzmdrr7xjkd7giaxs5mt7c512nz4rx9wofp5f1ie6s5vt7986q1buditpkuzpf7vmkqq4lxfnrphsld1kxivi1iarsm4akd16mhamsapvovycmi006qj319ko0tez10yl43dwrvqlso1g2j8l9ewld63emn4xigfov8b3zc1882p2vxuw93oir2fht9f3plbzimcmd3xi61a9aoke8mljfbx00j240x1t3nu7l5nfops4gnlylb01od1rifniq6ca9h2civfuierlmaspm7iv0r0jed82en87c0l9u5vq1kd8757hwnwf59vmxwf2c5ijk7wqe845gwllfxtpx0f31ylo972lrufl5joxmtu2x95yklaw7axef1qrzt0z7ixo0caw80480q2a6zwzcv5lxhizdsl25npv6qg4ihfau7jfn8epfvabl2jpmsk19268isms5wxeey9tl07dz92ebv3yh47pvjpj7kx8zoxe5eee873ehkauittf3yyrm223kpcskai26374ov767jcqw3y6qq9ov9lycrer2373dejf6k0puq2673jjen8ybka9ggneb41t0mpthbt8z0rg43rj9fbzqf81klbpjms4p87xk140aqlvp3nt48rd51yp9jivnxbj2op6mob422x0r9m4dh3omrsu9ywags03okg7m3dpmyqdi06bwa4m8n3nfr1c8bp1ok8v7pn4t7anii93t6346yyiebshuac9iflygpydvnyqfjgx323ksfn70mreu2a8no63ogitr68yor4odom0r9xhtla7ba1rexun9gcxc0aq7hifj4p395js4xl4cuwue0t2r5c1mo2y045bob5e56drapz2nhxppn2rkm135aidrwte9ebz2uaqop8kuqx0kdw06nr90c2n',
                mime: 'cg98fmyt28jqhtkoqwnazbo4oe03jhrr0z4cbkhajq1aucdits',
                extension: 'are4x4xyeybeuwzeg8btun16c68bafzuxsv2nvn0lo7w3nckes',
                size: 7262977994,
                width: 836037,
                height: 291391,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: '9vw1nfsbs7u1cocwp6hmo0zj8z6s3nnlbqfk88tcryndbi1ulkq8bi17q9fekkh1j5m1oxvhqjadcrlyalgo6erqtor9hoqhgxprcl6hc77m0nu7og3ivoxg74vfpoll3trffajxu6cunc2houh3caty172x23mgyacdips56gx6q6c2ij790wwlijno1hsj78i0w875stokkje4ylg6rxu9ankyxvb5sqjvs3d23r4kkal42o98agmpob9mi43',
                pathname: '095323iqkz68mzsft1k1wayxhwmr151lejd30hsqlmhm1ve7dw903ky20yslme359pamsqan0he24twvnih23w395nyw7bxu9pztp51vlvx1yiyeyckpkj0ktc2g1kxe8hu1bkb7s3z9a2cpratbyjopp0sqt6hw1nu8ebjir7w66e1zgfbgfgnepweuojnnjqs7ecsq8utcg88kew4xi38m20y2uojvf1mcr3eseozndnk0pu0rjsximmueg2efymitiqc59bd5lzns21l1hvwd25e4bj60xjlnn4vnibygoecgrult3miatluhsci7oi6w6dada0klepn5xhpvlvwqanqqpso0qduphv8qrxu3qyc9a6sxm2a21kn488l4rye0eraextue4yxkplnfgtcg635k1o3wag2zz65ejwtf1etz9d0vd1ogezd48nnsowyy8g42y8pf3fi8bgnnqbb533hu9az572iy10skzwixbkja6kqo8gg51weeloa3zm0iucc0pwzj5txexzz1c4wl3oq0gcq5sjdn9bykq3ron46ktz7c20blt21w42l62yhvb31enkdl8imxklp0xrpa7gwrds1tjlvvn8c82k0w0heiyo9ec88i7jilb3ytqvgwl3ooebfuua22m0vpjglrgm0oga0fagulm5jyymqiebpv9d2wruee388q7ww1rdv5rthclfb5crsouap7rcxjft0we4nrodv84ie46ambthe72uxudhyweiid9n8nz34d4r2aq0t6n34si075u96mey06i7w7xoy611wvi3qh1t5n0uniirbjyzevw07t6ijwikzw1w5snrsurar38jysxgths89dfw26khmzjf1c38kzuihx0ck4p4dgs4jqnus0l168i1gyako3xhr0d1mj96edzpl9q2lbtoz5ym1wbjiv4aonjufxbqubg1u8xzfiatejsu4qh62ta0x2ahd4jm92nsv38aw8grlcf4v2lrr9maf6ee38bh7c6yjm',
                filename: 'ee71irr31skn3e9c0q9sgohwvn9g6itidone75u2zr1ickmin7bkmd5mxkowzi0rayr6wykfbe99d6hl2h176v05xlnbfmng4uepcjsgb7hnbn1xcn69hj2bcm27fnk6h49u94jtyzs3fvar9zg8frmrp66y2n4g4d87z9j6149z7q6rfr1j1gtoel0kpyp7hhvie2oitk1k8cjmgn7re3vilfgx4hwo6yqnt5ehcosul4g1bu6cuz806f4fjm6',
                url: null,
                mime: '9ac73v87gpuisxrz91ufp0udzr8cbzv02tx9t30bj3nt4h47xg',
                extension: '32wgis8799l5twpgymys6pqzoomgwrvgzn644rd9vjpt2ymzik',
                size: 6669267472,
                width: 961575,
                height: 650865,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: '0nkb74rztkzmqfw0wbrxvhmlx0uyayqa65k2r4ztjoi7p2z50a12y76o1yk4yf1rsht5tjfw8c7cc8hu670o9bqxgtc9fagj4848xreqr1wl1jl7t6gglnmalocge5mn0grij7m4jvrvqhweayb1e0dve4anancj7m9jk78pg8tst3356f4df97p8dw6dpuc79bsf63updrok1e7j1q9k1ctd4v26erw4jnw1l7pwj4tpch5r768oodueg7er0l',
                pathname: 'dadb2jy0re4yvpchlcqx9n0fb2kntgrafcb1zc8zydlw585ap49zs8iun7hnxbrjawd6bl2axt19rfqnishf04nfcitntpzu397gx3fxpvu40yah11bme35zza64ehtwtwmuu4k49bv3aoojf6ukyt65fkqzm4mufgqp7o7pbshvc5t7vn8pne81tszo4y21lu9is5xbi3qlcubkwl7jyx87ezb0pjsnfs3xpu4za87aypejvaj6rf5w8hjuva3kn7f38uh7a3bph4bgcjpdpkt8eyepm0hxqhog3h45is3hck2i1fi2us77m9tvc0txcv578ria8thpa3a10dvgzo2oswplt2jx1z3wfp1cw5degyvi2maw3l2yc02lut3hnyyonpqz55ad9vwl4lb8fi7baq0tdvh96byea0n27txy6t5uias53o4og8drbg56bksvnp845c1773n9i690xz42xva3eodm6zvkxf4bnz55w7qbyvlbuhpqac47g6x74nlv8f4ue7qryc6qq0y2tlbvpjvfba6943c4bgewr3wvvz36wsrf0oxnxk0zcrd09xlkc5xsp13x49anmynoqto33qdoewb0v17s87fdf8rtjtayy1zmgxug2hkmg5tkhfbq35drmxq0r97wyzwuwzxqvb7e0s6154jdtd3ovfps6e6o795jd2dtrswxqdrc8svqk486qddn0wd58pdy5hbsz7gg6lhg28lszc4iw7y6ltn43xg0qu8ceu0yugpbqov13c1tmy1xs042mw9lmiv5259g52pah8kttdscotoumafcf31gw3q3dg6qn2bk7uufq5xv82h6rsei4h1d01nh2pkx9l734om2fmumbr0g4nq7t2rt4yb00lx0s6hervaqnr00l0u4ilw0f9z5i7yq57eotifcnv93ea58g28o3o8mgdemi9odombmwnx5lcuf23d2tv5jn3k24kmh83qn55goecwvrahebwvspk7zpl90lw6dxyvfxhvsl8na',
                filename: 'dl24ul58filr4wyousm1lmjig3elbtxi2enaf6nscgnk9wmw72cat3b7hxrlzc6dgw9m3bt91z2t8rec3xzw9wa4szndi57mipxrith6ia4bu9774ejnr8oxkz3rvjx4iubw8ly3jg5c249q4w9w64ugu6rsiasgmbu0dudrbku3oxfxys1m9jckzouei4hm29yrs60cw2n6x0b3iwhe7mxp9zpc75cze4x81jkrqghx5ysdkyecfrm8fn7zp0x',
                url: '6g7wjqf4j35oyzkkp9p8lec8x8u2o3469034z0wnptjz2z2kss4mfvx3rmefybo47qbov8y5j7s8d1s8uijnyvp1390a6ac2d1q44xz7ohof2p8sq7wxj8uby3g8geb2y7pqsgj68etwnbfwwzr5andw0p1585s8ho6rorvfkzwsnmatggg4e4jf0wrgyc1hqi0pt7zb5ovr1ew3vsfjj6uadb0upbaq8yj0zge0i7uke3ffvh9tv52infx6fhmj68kwscosv23biu76ou4i0897m2udtztu117xsydcupbm32rrr75r2oj26pt27sbu3u9kph7q0c6ysf93fv4g4lk6peb4mrc1jgv9lf9q60p9n9f64za06ghhb6x7ittlczhf9pzjos3blgqd14gt3krx4gbj9uqe2ggrufio81avz8oskmk38abjdal21e5gao6gj73x5xnzbxrb1fpp8n0tdq0akcg1mjquo7rys7slq7svkrxxh6lnefmalkn28no8d783x8eku88xsr7egdca1v7qkzbtowiq23f54e97zbtjj05xvdabd0ibx10pqz98p521vmnj2zbc74ol0fg93b3n096986vpzj7i0nu7jol9xaftghjy1qfuu2ea5g85wkchzuftzuq5v8be8o5ch6ua3lp2qwxxht2ukdjwliozpe3399tah0f68g1jiqnnue47kvzlti5t3k6jdlvr54zge0nnu4izpy32biqufq98v500qlunzg4e5t1ytfremri10oslwth697dqvk88hm88omeoz9aoju7xculbmatqyx9g1x0pod8q378qltjf2in4l3regpnajxl075r8pa42j00c37yisswfsb0xsgzg9eujow5sq1vqi7cyomeltd8r5hxa5kbdybxqh1otkog88j335y8l9qkmrrlx6k53ut6hq4oe3owvyb9fhbkyne6rtcvw62k974h2h7jc22ybli5r7jrz6je6ub1tptggza36nkhvjapbuayk',
                mime: null,
                extension: 'auzwfqd1s0opw1oppizqyzh9k68mihtucvd5w2r9rjvvmu1tg7',
                size: 9599393430,
                width: 102517,
                height: 269388,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'dmofjq5e98vevbq3lrowa53f7k7vycbupdrrqf54plbukewluxwvgujr025zij2zi6hydkd01yggnxwpen9smzw8nuc41ckrgqvxsht8tfkcke5dwtcvueaarnqc72f6afhuvzzf6egljomoro1lf3190ty7qjodyz0rxuztq6dzhhe99s9c9pjel67f80niga4uhnmis8bh2ke7agefp7i5z328r7lvseuynf6d69s7cgqcdvpl47e44ycoeba',
                pathname: 'nwcd7pe76n9olciumshg11g6qelbytg32cdvb59k8ptrdewsv7swfcns5jwaskwg57kgbb3b5qq32y4tbrci5bd1w069zgkeicoy7zdufwadqlf61ajdnui5ke85eotyxcyqoj0ka10n3x7pd5v7cn1zafq301mthq22rnphcyvh4vcjugx0tjfyys3f1zgx31ueuehulgzo19g1pucczzt6tr4kox24heibbw5k0muq5tm4d2yfehcnq1fa79vqx3682j1tvw532jbtwl08144ppab5jlijm7px0eqjvnirskxb7dmmjjpxqkfvfotooyyn68yb537er6xcd2b23uzaj5grbfqkcp54ztwgyt7xqilggxghmphnzpa2qlqyltfmyrn6lpfxkst58i4oe7ehvmgg5380lnf2fclmzg0fhjkuduh7hh36hji5k65tmq88m7yumxypcqlh5qdgkid54cxc5c2xwqnwbq34ak6zyi83c87b6xx1lxcf8vj289x1q5kc7foubuhgska1zszywoymvaxmjue5hwtt5h2temrnuaxaad3qckw46usyuat8f385kdfs9xb64hlstl77rmz6upns3c7fryvrecq6w8ulv6sooame292tbyvir9hlpuks8sxicbz3hl9a5hmoz8w0ly1gcw5e5mm3czgeyj4ksv1s00j64k6ud2ritnzmc3tzuy31rakwcxvzox97uod09614x4rgk6m53ab1zk98302n9tzxs9h4h163i34qrzsaoskl6oe30w6f075gq3tealj4f7q5jy73vd9o2rznouheuidvnz745x2zy15qezapiwqulsyacscfk6e4cx42cz3ar7d186hvezv87r2n0lymthdw7w4rb8qtdzey1omtqqclaxu78x5zl3ecsmfx6lnp5cebqa2elsjy9pip4p7t2tlzjp9ef85g6vsazjjo621az46ezoiv1e2kozzu9r4d6l7pypwrlr77tq3gu4g72jigag8q4zzk',
                filename: '571m51kziovd9xquw4aouuzpqahmfdwf3jdtnzov6gojmxkf7l7etwhn8jh7rfzw5hkgza6owaw55dp3jt3r1ruit6j80kl5jka62k2ltw4ol1t3hoog0umd1qyiqplknd8u9uilgai4pl537e1y9fbbtx9kg2vml1vljzg2vexbt6xlp5l0wsz8pt8fvqpk618ej57imelas45e9gdec6ppdt04xw7t9qr2krh30aafunl2upjiuy3qhvep0dp',
                url: '3ol4oc89j4hjx7acetzkkxoa1n2xddlzbzz2py72kv4pyfmddjfcwpsp66j2fl24bk5m691y3ovgr2k4zacx4tph3twyeoff8sewc8yyno3u02q1x1kah2you7hrg6nkt8h0dk8dmwehsfmkz06jiuglo0dvwtldlerdfp6c78qunjvjlmqeyl05ev73ynh3h7t4izcq51xt07w3goz9ngra3ad4iv0p0tesk7vwgu2o07eaq1a2rxs21lv88gpw401n9a1y7uf8uw1r8d2l04c0bnqqdup4xbi32psv7wojngmqtju8lxjot5p1n1a5n4vljoeluqmqi09pmmpxuoj4jgx9pmb9ptki5v3zov73s5wpaxakmhcoenixmrhtccm5l378oiyvnvcg4tkxwq9x21dioxu2oizp0et2ugvp6vpmf2n2p3xv7xnw32859e8w9acrkcpi5gaytwcmqvw15h9mmts096jfplhesahtkj1smawymntxtn0ewc03vhlsar9ifcaolznvu0m4y77i6rmx42k47unydbmyt497uxtv1d2qeach9yb2zkvm14twh68t7qvsqjzhbpf6uj5ot4lwmmyb8d43blamw0kxzegz0zjik3szy0pz41lg9z7r50rf4fq9en3je4oo2mye19044p49fmqe6hq496mucleykug2vqbpraaaw8rut9igcb1pje8dq98fgedk5lptcafifwbhvadonf5zx6ffhsp5bkuhb4a8d2f5z5wnn8349nehrctjjjn3jzv9fzyalzq3a415grjbxvb79hjyrb8tiv9xw02ymptals40l3cbyfk1redt16kskihmabsmc2go3fxlkz9zuf6gv9eboov6mgdx03n6ctu0g44mkqjak1mo0ewldv9vgrqsnhzcrervf1dyk31q28aocjbfeamy26lralou6t4ps8hl6e9bpnnpfli2ibqxnygs8oqawr9go0bfdnfkgi8tt07o0nt8n5r7inqjpu01nal2',
                mime: 'dpr6ae3wmvfpoiuwxkxgt13ugyc9kf9fk22xielq5dh8bdvn8o',
                extension: '5e55ccrc5o6u8tmestvvu0rknrql5hl7z383bjq6x2uv4keur3',
                size: null,
                width: 111873,
                height: 993231,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'fh6l17h5idk0wuxlx22j63w4gl7pxjyns9ti8qs2m00m7uqgrgwff1a0l80mawnlbzst0foja47fmi2ukb5xmbbf5tse2qeqo7xherhl4s4zco0q0pirc7q5t98rafyrj5zcf9omjqq3oa6ln9el2h8s5lio9a7b60sn7c8gdktpcj842jh1lsy3qpuc7fqvxuikb3e95wegerhaqvybdgqtsbk5ej67c3je4j1sr3ya4ma6zhql51ehh8eufan',
                pathname: 'eu2zr79zid2zt1xiyih6qd9ebodrsclmo88v5zr7tofq4qrb422cp6xg9efps41ky9yccdh8e2yz5d3sdc03h9asggxp2zqzjr76j07v96ct53w1scdzn8w6skbpelm5f1r1uq23fxn54nqbbu78lgaiifsbkwmnfqx8ud87i6w7hbxk3tr41dlwabqyudc1bndxgaswlnn7b039wzfx1p6hvyftfgtvc3a9uj12wb6jww1gj1pd0106rhgjehm0nfziq2ukkbhaqbgiio25k5iujgb9j78q1fxt03sikpsijana3t9p55kcreojfj7onxs8w9fkiix4p0xwbqhhbqk9zx04f3ef2sp8a8gvxr19amjqozvv37unxoj7wok1c0o7rbaa9vtlmyfjx1scv5hndg92m4c4b5w5d3aoeua7yd07xk5rzm6e4ej3aubk3imh47dphmd9yz2vi6jn0aok0obsnsu07yvt7ztrky83ydyr601qwenia0ihphif6fbe22qv77mh1g1tmj6xj1hk06w4bi0988k2niz8yxz7ek4eszdar412nfdwvqukdyjd2zcqmk9kk0sl3hp5x08cvomljxypdd22ia0j5kqh9xszuhexswk4valdxisp8w23l12kkpsdjhz60t0xhs1q7eunej9mh0tc4pkir4zgaerc94ew11yn3v8i519nrsfxq36jczudo25u6fl3r5fxkz0no0gj09dc1bhkqg9oczwuamdvx8ltfxubzj3i1slp21z9y0rnm1r50gjhmrjth9r0lpor6djbxi9zmdrd3vk3d9rm11zjm2kpnmx466omwq4b7e1zzvj0tw5s2adoi1padyijzq11s5bym1xybjvn1hhiotflji07ecakzz1nu4u79l81v25nvxshaftzd1mfgof8a8dtymsmq7tq47ghhurnnule5kelqb6bl2w8884oi6ux2km91egimlz1dkeh9hk89h5tl7mcjpyblv1q1vtz99234z56yw1j',
                filename: 'pwr0ffdijjzd412pgb5y3u4pbf1zuidr8n4kztkqd1waadw65o62rko4ebhb40x82ghwqz5i7xs45ne3mo29h7g1mj6p0owms9b3dqc8il9pj74l203mcvslrwz1dsfrwemdst6a4v4zflntcwlvefzmk2h22wxcj8jkckuxhyb8mp1yi65jlcqsq4pvbwzxora0buxss2s69qaw7pwcvpyh8e8lj39bicernh8rtg5j5fj2rt32dstwht5azhz',
                url: '2qye4hxkuuekcyhcjiamxkwza76z3yfopqv5qphks0g6n7zbymkqrrpnbk55pi53rrgreuvk4nqr6m5pmsfehyj4hs6oe6jpwejwklg76ur679fa1ncovsvh9o8vaj440ntuho7zw2194lypzdnqcnwcf8fw0ggayidncumchl11872zmizsqbdmtj7u7koobidtyengbzcs22moirv1p7716vsem8v85hn9ceoty6qjnzei5hx16iudpu6c7kigpp2futl4841v9sqzon1dqug7fmrfpy7stvuo3rq8ssge50ritlrbcz0mzu8mcxabww4odpautkczxgsoobe0hhvy40twzdq3c8sc21ok4b7xce9i3fis5xj6gvtmex0vpavcx5c6rcna9z3ofgy5qj05g8j37a2k9ndnzg4730zuyi22pshn0hqo00ofcfuw72w5fiq4z63lzs89xudkttedkjgtkktu5uxstzdlbeye4wilim6vclrum3aq852egd8s3zbxmv1l0p5in38xpp41b1evj4pweoj5g7oz6xqrqw57q6l3ncpd64uw9qnikfspdtmj52r8y6cjmnzcgwv1lnntn8xqq09mmq67octu5qq42byrk0b3cmv3zwylgbj3u0pkc2e1xg85q3yxvkvqxqkry1trxq48j4c30dxgg14yhevo8meh7wc3kzkihol1k9dzr5v1dzehckkk1qyvf8pc8q932yle4z0eb0pem5d5i1p3czqvqf5i9s4tdi2n0q0nmfwuj82v2vhzkuw9tc44vfdil2kkiu3z1aaa58bjwr3cb7zb2nm06siv0vhaf6gyhtfc6374r2ce8p81op9tnfnrsz2y3cotvdd8nmd9a8m97369wf9g6h5hfkfj275k5d9lgtcfovj6c2kziaunerfupeblqgiasjnblxx5bz6b4qefoy8vhe8afnrig0iwwhu3olukxk9i4nw8iaa23nlb098bdfxnh2wj3itmiuy7ve6uet7ety3r',
                mime: '72t1ehs0r4epxrmrf6vh9lp6uu64c1l1ewjblkth4cerqa6bst',
                extension: 'g94xajlidcuwyz0skt36m3g6l0185ik4bmv5asgywfkjjqklbh',
                size: 6968852040,
                width: 994529,
                height: 348256,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'qfptvwr5vpzm4xfx2rtipk32aead5uteu7ix3943remmvl6p8cgxepfng0ta2ybfxk434frigibdzrt9xn6obgxsrv6ij7gfnbfr3j77y7ehkupj5ko0e0sppph2o8nqxxiynwd3hb3uagwmj0pr2zlt7yqph3gw2n6b1n9dvjaifipjycj5t6xcv8n284v1on7qbxxy3irlzm1nqmdq0q9enaoagdkmgggvde8bclrrl9oz006v5pml8fycwbd',
                filename: '9pib6ra4qampqofojt8w447mhbm0zncp583hzys6ysetlqk9g9vf4afh953wngi6d3aqqqlt1ws1hdouu8lqrsunb0wcbxut64n9a56lq2cze9xb64q1pktowzslxzf8tudsywbysg231afzg6eariqzrm35t2aep4vrp59oxapn745ye68t4sf35ui9i15lqoo76mxki7vthdvibxklihfijy11dpz2rz7r3g0yfw5w6bu2itvdgtiexllmh65',
                url: 'f0zsyfd6r5qi36c2wlh5q5a925olopc67bzuppwkeqdd5d819a40n6ew62i852y9zjaht34txxxkdi2vh01mv2uz6mzpsdq8ljkv4yj8apdhngq2k5lb8m38utq6zj9t3mkq40p9dzbguc7ucjuitnze1h94ii66gnexqkc3ow5llrwhmtevps0x75kn04zkhcassmjn0pl8gt5rdneqml6rrvrwq7cl1w4sbkybs87tjnw0zyz96vavisdsru7ao6h9axiefabx1iye98dnd67uow0rwogr79li56hhlkqz1t28ydr7kb5y1ci1ve1h4a69vl5haqwdwju217iipz60yfjt8xgr6eikxbn3nlhbiyr9tyoqkjt2j6boiyjotho3aucupca7no9ro3mzd6xu0bd7r00ufk7ljsgsztbhc0xtind6z1hvekvl0fwu0pnufdii3lquzx0hhv42sy0xckmfqctw7rvpc7quu8yil779ndwqm93rh4tm1g5fm4jv4xzpa2gx08ec3gxrlv9pjctzsv7blnzk0vi8l3uwavifc7y8myal4553toakbh3kas9wxw4mlzu18fw9zoibnjfnr923rrmxsi886b8rvnm0jxju0xsyyzmv8g1tl9ejt2jpuu48mmm9v9yz3cqlwhf0tukz9zfxn8pm7f5xf377ztkgvyr40rqgsyaf9deyps0410j31t0f9pg0tc01xq2fc3aiik3vquecln6ul7kpr6yz536583mf440yt8hidq0j5226a810tnmrir1xf89rjn89gfe97myqza84owgh9zw00f450pfnfet4mspxju22hn24i6j7xj9b9775hia2ufntusuu4cepfocak41dqvezjp5xvojqr2b8yf1ujs6e8mruh202bgkdlbj03b1qu8snrw3pzw1af61fdvs146b0kgsqbb9b3jjlkmi5e76sdhbq4qwjbvmwxoenzyrcpbzp5xb6wjc9blyddt0kmxr0bnvw6z89niwv',
                mime: 'c5uzvvvimr3y4k7z8kx6d2vxt4i4nxyssghzd7qjylcpsjs20j',
                extension: 'dq5us0rcbrvuiaq3gmplscnng3x86wykssdvelhnorlnsqi9v8',
                size: 2682914056,
                width: 778067,
                height: 942159,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'dlwbwgggroxzejga3qtbx9vnqn5y5ivee6kv1356lvgfk093lgmnq9tlh4vxd44zexq9ef1ourdnaevdw4hb8lefvf81h3yiwitgdzhbx97jn56y412yetju58u2qcv3ne6p201ze22kgzkll8gk2m2m6x1biydxnmr8tfdxeond04mjj3ii8aj8eyvxraiyxru4qyn2dvcryo2y2og2hqlaio3mbmz6htevh76s7tiwcb676f1c9k8a8y7kjon',
                pathname: 'xmhb9pygsjonxeoo1el2gw4lq5pbjxcrc4u8iipn07ks2wkmwhuka0du6qkizr28gee7g8o4e4hzho5xpqwhe1a6w22whykxxocfd9x19usp9yep9xt08pkncxs8xzrdo93v6jhrazaug0fh2glgui48qvn5shscjz27gpnp9igh7jovnh9al2bs0l5gg6dxxr85a4gmoubrhsvd18k2k1diezkm3qeh9lpelmp6iodpjt32il9f9zeaui0vp6cpmjkbt8gxp4l5gp6crxd9ypivgm4r9h8lxt2mgldctz0ety2mwtkd2klf0a4knd4mphc21zakxczlhnl89wepkws4amehxq8vl2zin0tsgc83fvlf5je7vo6lll04cwbxmtad044j2dvnalr55ky4b8m6o73y0zf07mox31rn5j7993uf43pvz74128hgxz4wydlhrx5z1w0pf4ih4jqb7fftng3oa7e3rhasn6tob8y7baxea852epniprv0peyoipr2sb56dh1qfrf0cof57aolgs3kjsetbrltrngp4b6ji8qf9e39ls3p64zxgynt59zh6ihl4e95e54oatqelr0x9oo8b1xzg2nlbvarirjxzg2ix1pby5s47v0fgzuv4drettpublp0pczcp8yocw4texawy6g1pblcigfzigtexndx9z2vwn1987dxd1krgr505p9g1hqvgnuzkld895dd9n5v9svk47y5d6polkr7axnhsj1oi5j95ui8kp7dlvujgyu4viuhgo8xixytlxxg5b738q7n9z8bx0geiakwunej0yyum358j46x1gidzexgac923xl2yl6pqzxjps7xzzeoyj5wp33hqwl0aqrx6f5tsl98rd8hoa16hgq5sd5h6poxmqnwpuj5jzz4gzptp069r22i6ud2aphqn2hd3sjyx6aegv2rrvmy1ekgkp5hi73gdcu26itks1ysfm92mw4hqa3x5fdhaeb8uca1tiykfus74ilgedb5hxjq',
                url: 'f4mpnhs1dgscoh88m1jpcm9ne99nxdnh5p5o7g7jpzffioadxh32rc637zzs3ni8ts3pyco4agrlr5x8ec8wahw6lrhzput0o7yobvaqbuszln4d6pf9r9lbz8oiaix5l90azt37515ca1tnwaxlq2yo8fbytgg9pjz5tsipsgsqz85lzl2kjxo3jvagegsypva6435mhib37hl0ghrj1x5w1shys0ncmve2r41c7tgsb86o2qemov7gv0ke3w6kkwhs6rkm6afzv3k3j44k18pe7unwok97458ucz0lx9v00nn8w5lycb03whofj4nrspw9xc3hwir64wix3z7q7ugsm3ugfm7fwae58z6cn1rbs29sksqf3pypotbcv1wzxz3i2uzsa7rt52ny2juqdpdt7j2alhbhngpsjdx6vqxy6jbfsycitsrm7k7c1c3zispkbu0d0dedced2ibtmknk1s7gkhbvjp8tougxxb9bhrgrrweik8rj412hi88hc37trfew83wgtgwcp1qhu70tscacq42at832q8477jo7r8lprejll8kzun4399u5zkb3czjf3sgpmbabb2f4xnrw8r8kqbov6uz3i7263knzdynz30428y2tsyi8oz9aoq0lh577apzs0n16s39y401bac18psx7i3opce87ae2ru3bt7h66jz5qndnj3npu970wx319omc9qi0dwnciazxqgi8rrwluezm5ktzebcxpzb80mojtkcp4lkik5aa0fpuhcoqck74fpcle9f3uhtnp93vyshcpxt0blrjcvx42f5j1y8ixcodmnogf1nw4a0cp7suqbls6uvvxoe9uplkn54amje5vomt8msdnpopnf5zrv7kr6lpr4bv5b061di3dgct1u34e6k0u7j5gfwo0cvjz15s9fets2y15ybsp71rj4f8vyorhz60px9qtai6i7v6gtt4cymkcset6reuq3vpkc7nqdlwy2xz4sthdc3x67s12tnvzha1si9y8e',
                mime: 'ohbp2sqbhxcasdgs0cdd5to7h31gw69qbbhiy7d77hdfr419bc',
                extension: 'up1ttp9mfbtda9v9b1r6momz7ehepykloh7akvp57cqjw8g2jv',
                size: 6609139230,
                width: 166820,
                height: 756714,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'empno4go1lgvd3khlz4jhou017doe02gxv7j3e6cji96y6edx8wm17putwbp3h2hu8hadepvo1uhromn4cz4bosh0qa7by6zhr5to9sc86oycrjwgqv5wjm4dejkmxeq2oowhsgxhiimbnbwbl8uu14a1ufhy1fsxfj96b3rqwc86uqv09zktbr6jqfzay6ffumo3d0orhoemgvuzv4dfrhwkdt3r0wlf5hw3nkyx3z5at4ccoey2m8b6b4mlrt',
                pathname: 'qjdoueaxv6qunt909vny1b8l5upfohz5wq0ak54hrim2lzz9ijhcw0xzrc8sswyur39h70ds10ahw9j1bj3kpc0b92j60i8xfoxkxxuag7owf8b555kpocg0syicisvagy4apeimp2wq2j7unvkc7vzdlwa4stsosrmvagtyo4f87bohb6kenm14gcdkdqlmuwchawbc99ua3eejr6qcsfdbfc3sm81t3zg7grd4lixbu6avvdk76newh01gqe0wyjholxbifj4tdqaa9wipwp8c5imhdwkzq5jl9vwhyukb45rxs4axvp30oqiw9qvkfybto72fe6cynxnd862l4vx4vrt5yzdsekh51puk8phyn1z9zpa9t3ps0hw4tzv5gnq47gvurzay986fdwxa757tmafl1y2pcs1cu31q740dwqhiohp9xxcfjr6vcx9n5m18kqhaina8y7ihrxusj8a9zjminihg350k53epx41cy8kfad727pu0iekj2vwgx0tm8td26t9uf6paizmtaqdaba9mcszmiff8jzoi894oqnm617vb1dxc1ep8v0lw27w3ra4l3hsbio9wn2bw45mj5rtwqcypfh3woiulan8mtcqqo87tly8yesfoqrqjaq1pabxwlwrh6vucx8efvyezslj055dlh3t6npftwv3zygp9jej1f5cpaja5ttp19e7qn8yk039g01tsmtj5wbdd5tfk5ri9xes5qwv5zdigbc2v89ojw059rd9okdijokd9um08nc3cd7oouvdke0qz9odp0yohj5g6sv69k1877b5fo3o06791iki0eaj0mwtdxoud72qsyyuh8qossxdwkttxri3rdqwmgycc3o7reea6zv9zyjgiwfpvpt8yrrj6ek71vdw39yv7tq807qak77c940e8godgcgnwnisnpv8quljgluwxm5wpwr0y61wf35bjw75sg12b7l98hspnuvdxaya9bfkgs6kugp5ezewo1pcs0zz46exmu35u',
                filename: 'z2y4d7q2z14fzonaavchp970jl7blfndnna1yarw89ilr05xfjznw18d8l9pbti6u5nncg2l8iukg2dh8f034du14dvyb5oyufye0kovn1zgbx82w6ncsddrdo7upm8k9c341vp4w7qe2u15mrpm26xqdnzejsahvqyzxuif5u01pmexqrvj7hqsm3t9vmdds2rg6mf0fsq74immsvfsqxnvxuvntfqhuw6ffn2svv1ai146v4oo1d510bgh1vj',
                mime: 'yfn9df9ybqnim9btlo3vbv7hv7lzzd81e1ooihvjhlgn569e06',
                extension: 'ub68vt5c1llnpfmupa2xmtr4lak23blcwwuei1pz7uthgc2pf7',
                size: 5863493114,
                width: 337098,
                height: 811228,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'uj7uxs3snzohi7fxuy226k78t7dyl8d16xb3u3q0zckbon5gll7dz92iqc2bn7z867sjyzcqt8chh0qrndvnggatn5zvmfgojtz3u19y8x87gui3w05whoub1rwxf9gofn05wvgusnwl7zi7uuwbltq4277tegtrep7fdfk2iqg84oyrffgbx0sd0f7j35mucxo3ymkowr8glcjau7vgu1e5y44l1zqpsyjcayz3hh86el3wubfj7z6hirutak1',
                pathname: 'qx20yheu4bdwpi1ej8i9uh4ttwuvbmnj92lkkhj3kedns1foh02audksoub7f23rvu1l5zgfbg3t9k5hs8ezwazrnd066g17c5urhs798ai1ljiwgqnel2anv207bcbe7mu6nk7sgyfgir0mhmwz7gntjakvxtrv7fstruln2sy73wa4uly97qcag72ddp9yx4gcz3u90cnmxmsx46iijppj6rbeqvhierje1n9a1zn9pc69k2bmb1kag1uh72uk0ycm4sym3damk1jdbll9qkb845lk7v62uptjmeqbrage131i8j851ovy7dzqrri7oqpbpk4aifmjuqlka3fdowi4xzd5t6vu1v9zjpogpgf8kpjzjo6yvzti7hf37t83e8e8lalg2djfli242bed8ggkyafz0xy9qany0348h1vwq3yzifyrezlp9etvevrqvma8ws7rypwugsbh42arw0ba959qmyr1ymwrsevk2tw67nltnvobsmgd3t4x8ygbl8p4ctfnrticy4mc1i1wcfdxu154nrrxxdesx8kk9i0xh38h7jkteunsad8l93txd1fgqlp85b5okn2zyral6gjwjddodcqb5gcrikl1170udi61f7w7kspgqr0887jqf6bwqpcu6j72pnc1pnt43p2hvgomj0y1ke1f9sms3tles7vv9iyln6zo7jygup0zpwnrwqo56greftpznvwu1trr9ef1ak3a80v4efwiy8rtcrlp974cnz69vg0t572b9xozlxwdpbjbxnigbur3aflofn5xhl3g9bu5ha8gu2i89npsxxxva0ww6xb6ftnfeezwft4l6hmy6f91pxh99tkjj29nfvmp75rq39dwql4cwkcpq2a2n9b8ilzjxm7m5dn235ovq8awdskutfu1b9fbeqbpjunlv963a57ig1ubw8lcin3ercbmyrgmey8py2p7x73lmzuq3yu8hmqdh2u3cqdllw1jzxbzusec7bkxb6osjzfqz56f77vngpnp',
                filename: 'jm47hikyrw1jaf4222rju23fum822uw7qapmdy81kffn81uaoiihbgqija43btl2863w453et5h9jgg69x2xcitvws9subpfs3qs8dbdv1ojz3vwlv93wvcznjzwxoa0x4e69k1r5f56mwzamrf8vcl1kug1eczgi1szr24o8rcp2vrba2nr5l6mfsko0dbkkhl48rpza1aueqbr8qcpgae841ak6z08ct4mz5o83wssfilheb84rt7cteqfavk',
                url: 'dc8atr5ab9e7ppfe4r21gvi1djjvuauqbzntscnrc2z52jddjuf8inqqh0xz4ism3lv3vh30ytlv6h0ny3znig244ss8ixnc35hjzwt44126jgh3mqtjrysk5d2dizvoik3jrhbjusvh3kpiwpftelu07pfu8m059fxyv0ye8f0r3fbdh2d9gzlwby7feo316e3wvr0od8d1u2xt5kfm744wl2ey10ajx3rwejbikdacxuhu81z2efxejnrb7dg81uhrzo0uzfraj72eqezrswdvi33c1ck8s1wq983jlskclxd0qri5kcfiiyfntl5ch2b7eks33vz3k821yuai87u6f2d3oro7xqfy4h8h9ai5ob7ij1r698nv0y7lp1bjrvwry01x7koegnlimzzy9sl8zms6293oxda50yfb16pw2kkmjymg9ggugrdbkpk7cy7tq920dp3sbaa5wixp15ijduiosasl0sybbyi4i56ihcgwv1blz1w70cpcmxpzi6jtijcg52kruggh0pdemown6wwd0luvjuf4snbhvmedrfeflw8xnmby0uqc2cqwehcfj95pvf1cl79vkhev0qfx0kh8sh3bdrdxoiitenaxecnjqkrnjtkklvew8auc4rvi0l7p9th5b3zqa9wfx92thc5gtg1c4z6w09qzzzmg03bg2pephitehsb9qbmlhdswbgu83ipo79d8n17nvd2t9v1tzi3r2mr5bbaprt3jndlh8l6as8sx6owjw9eg8fvs1toig9z9z0g55riatcu6h2y5opiieyh3vjdvpqw9t6iavxcnf0xedxwqqyjerrfie8zbkkheifnzwdh51ozxk2vzu23qkwtsdeo25dzbnphueegnlysv73upe9krebwccsoi6ys69qii8oynjgrngbo6ae8wdwqzqmgenbyfozymomc34f2f00ri776awxt5tbt9c2k5ivgeme8mhn2g0gkrapy5rhe78r1u4e0leymruq5da612vfd92hs0',
                extension: 'wq4bl4wojn2f93c1tx2lozllwglyrw6akk8h8c0ne55o3kuyp7',
                size: 1419771623,
                width: 730345,
                height: 414933,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'uix9goelfvdfonwhe0ep7jx756cwmdeo65ac9ixvhgqoyo84qw8ybfb3gt1tsn3n9uuyy9mcu3yknqpnejka5ui5a9k6qei8015jqnu0fsg7nr6ayem7d418vxxff29gjox3r51ch9ao89gyxgwnq5g8gcmk7twwqf1yua2ehd658kpf4hjnmk1t00ikywu5xlcd0uy6ngio24e3hlhmj3v7sl2jxyti3pxn1zn5i0or117t1vynnpy47a61vcx',
                pathname: '6138m92dp1izh1zvw8yvkrmpyzy2akcyuuxbslv777p8imum5e0o0laj7jkt0z12hryh3l8djjkheqxgs6os36j6uww87w7r9ify9y179ktdpp4uehbcl9yaizhdew3r9g9hjox2hz977eoxb4nnaouhx3n64cg8z9dem8f6kwny9vusq5dbvx8pdle6vyrm7nxk7zfr6pfq5owdn35nchmz7r22ubygclldf83hr39epag68wbc6fntk7wen9tcd68oaw0feh5q9k2usd1632b7t0bbephnm5gvjepl64sq4wryyiv8hcqvw5hg9vxtqdb550k597yoq2ovkh24cw9wt9j60odku57pzaab3ughgs4yeyezo6wkpkot7g3eo50tzhmpvmrwwzmjs9ljgx18o5f5uvmuw0tw3z0pnlmvo41zi7jiepnm7wnlpf821yeevaretmgdkc2o47jafuaxpmx66z88z1199y61r1lhycfcjw6jcsert0gnw6knlon1n9vlo1dtibap2nzvc4gtdv9o4s2gcpe6nnbof40yyk09savhu89k9f35438fxyq6wf9i2xa7v0zgpzmcj2ejm7gjgxsec0me8mctjx1sdislk14ppfdim00a5f96k8wzv3sxk4eiocewosl4a2xldwyc7bnh2hvd4aj8u1fty7m46f8fqe0utlbd3wupyhh9e3utmlba4bhqsnh5gdljqjek7a31cm2jgbsfmzsaqvhr3qkei0dh0lf0thv1yk6rhqpx1mafnvhyv0sivpyqp3hlumu2fkqw5amhob9rge7rpn2piroutkp67899khpv4yq53426473bjaj98466od5p6ceql4he1a4wh2yeu4vzr9u4rcn07vq5ticzy1ge5nnny9dwkii1786q153tyfz402pauqfq38i3yf35mf6jtuime5tknimcfvt8g3fvo9usl110pgcjemmgvsb4p0505mouar66ctenk1j9f0q8bkm7vtzjfgqfmevo',
                filename: '1613c33kojndeak4b2dtyh6xr8q5vqor0hfye3stw27g4ti7pi2ixzp77h3p6n431huqqmnltoaa6a5jccdfk02afdka72frm57i7e7r5q8ryt4j9c75dbdcmkexho7orlbodpsjcr5rusmx88ygtwfti8g4d35zln9ryse00ohb0fa9j4r68qwojivs13ipmopivfnn2k15mxoih3ri4xdpmkdzinjp425madia1bm5jkqga1g7829j8q8dogh',
                url: 'jb3zj1viluvlso3cxkbsnev2rej6a0wa3btpf2qqaukl6e576pxvvgmf2g60gb9au7z98dce8qgvvejstb66a09byjul7172iol6cwrajcsgjfi347c9p3fmncuhgxhzt1m09qg0u0jvmki8fhhxyrpju07ywbll9f1tx7ax3ktrwbah6tfw5df7hght7yqzlnx1qj8nkv7710s0g6exmig7xy08muop0fbkihqkz4fh8ygwuvp6jb1bwpez5a61wy0bdoo1nv6qowtod06s5u8bvk8omexhww5k5fvsbvpsn36tlun050ncs0yha1uvtvclihd81qlt976p4b3ogtojy4668zt4b2yreir5m8elct6vqvzdo7a8se2oeftlkzmbsxh1sla9cpcnf7oyo9hjq8u6bz46ltc83jk2lywcnsccbme7jia4vrder32mhqun1ydlcw72ws3iopgwzujzxm6pgajlahuixhhzv6g8y175cf10jxofeu3s0velik6u85b9u6dvff0ksvae8ti9589rvybuk4p07bu4aam30b6dpvksqb8r9hworm66zng2mpdugv02vsz6q9o5sktbsf8y8n4krbt980wwg2l6kfywyq0kxmg5oy8vhv7m6ejk5dgbrsq2qlvghy6xqyc965htb6uj7sp2qhc2lwlfghpv1283rbl3i80bkkcwb0gbpw796wqmiscnw360ara76hezo6lbhn2vp0hps29wbt8sa1uxqpw9e5w1m0o0xhwdaqtk9yx9lf3qxr3soawkt6n0zki568ygntxg7b6lyck5it6vg5xmeclyl7fb55p2o6ciu766y9f2xp1gv7v325gpw5sa4a9kuuftnnn54rw7gs36pior67m1icn73i1tkost6v1rbpprn2qxslyu3rcm8b301n6sd82dqiyqkuom3btkqy7dtkj9218vaauk77cwl9ygcbbwgu37s66v7ch69nej10tmna5l88465d3pafj27irvu6kj28x9',
                mime: '1mmuqpak0bt5dm6fi6d036lbftrf6qh0jtk9vhac74pn6zx2sz',
                extension: '1lyn4srobxq0x0kovk1tn45d32aas7arbqh8g29087ib39hzvk',
                width: 544270,
                height: 722021,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'zm9u1wuetgq39eogyadivmziepttcsvlxs7p6',
                name: '5dz8zfpye2lgdxh98l3svzjtynyr841w71igpbiot2pwfivmd8cxt2tlcnqxgmbmexdwjn3pubovkmq21hpozp3psi05in079eto4vkpwejjzaf7khjizliapdovcak350wx30rdyfl61syjnabsnv5c91qoageit2z4ynwwnwtbh64jxdl04ec2959u0juaqfza7hfz5b5gdt3agsu0pa9rya5f4mbnv29411c9kj02hqoo571kqn6xyw0f6qr',
                pathname: 'lwkwq3lximmvcbrnn8qw7i0ut8xic10s4wj5bg0nvf8l9mm3rtdnnt6yex80rcucg746v44jzauzt0ekhbuzad2ek3ukjrt420jpwmpyaov4jksvhqmeze6b5pjlwpftjc79ov6chwuaw2u23dvwrbifi5gxry2pps9uwz0mw0zvfvuuafjrupi7q9h3y2bsh96qxn19fwpsib4utb32oxzbwymex7yp94pb9qpa2o3yhw4koztm722cztjtbebcnsnhup4wsa0rr2flrj3lnkdswye08ttm7bq17x67zk1l63vzngevnga7atag0qvitxmmm07w34km6w6n7olbz5yre16ej83lexsj43kjz2wpyd8mpm1n86jlugojz11j3wj6wcdebttim7qvl4i5of2xsmn9fx660a236js2svbd9zu9cxid5ujknfpibqim8loaiwqewmj74rpg5b2ggdivho6wvo9yndtcmttxuyixfx4l6pxn3941xpmyb56z4wcsrhrqf3qmgf531tzk8dkpnb03vz560311gertfck9tr7g27thsk267k826vy8n2ylk1vmp0dzxdpmjyiikuklrpk4a0v4fng8umcga4lq5xf4tw0xkt0fi161l8cgufvqszg6gu9y7g6dpwycy40p4f07fkr00whmkxvvp54meirl3mc3uifcqrfpje6x1yurbd417hqb5l3jdx1sg7mukl4x8oyif3yxhwxi5svcrksneiqp2nthkt7jqcno93qz90n73gr5n2weosnokpdhmqy7f35u3lw2hiapjnt7jdl8f4p0n2quheq4kpmw2x3mnccu3x2ktcpangvqspcdcg6odemrtplx7yypyh07wurs2tn39k7ltw076qmod61vjnjusv2tmksicgso43dqtscxpe2itboqybhhlcr10mabms69y2tq1tbkh5th3i8j2j5wxa7d8vp2m6we1t99csjds6a1r39if22mmliri62f1x3fu1yibz59vaug',
                filename: '0b5vhgij427e9hceduedtspdzjuqz3uu9r14e81g0shu6u0pq6s9uu299sbbc8b9lcoo0k4m6nkbq0cvdnzig252a492khagq5yqbs6helw071daymb4ajce1erxeoaip5hghgq8dmrn3y6i5n9kd4wlzbiur78784ioh2ude4bvwk5yio3mejy53ewbybpf0vhvbvjsgxuybq71cqrwgs4cp15cgentlsw3qehep4teftco8tquj3sgemy8fn5',
                url: '7r6omdjvt6dejgbajmp7cjg4qpfi75mm8wsvyebj13xaj9h4gj7d25bgdcs2ub22gwq60mhhrxj9i6jcpvvtwal3726ooxmujfnp1svbvudb7avsxftjd3xyib9acx6e7mpmvc0lcjnchkjuhrcdoflbkbg64o3re4qtufpu70jkzqoebi2k7qipu8vfy8znrnin4d9ht3evq6ion0zte3hlfyhe20ud5e8dc2f86fb8wkypahsmybriks1qrqgccyi8jel6kf6n1r98j143cn2jmj20dw2rl9yt3jc9vw3ods1g80211wf4wzdgpkia2dhz1wj9gwt07kqzryelb9b7ngb57gibk5qnhetbq9fz1wdl3xx88fq06d8kj1fmtajk6atlpirbno901q8d5h24u6o21fla6p3c3eefdvk4nf9zuo5n4ls4svtilo7pk8wr12uny6k1n8reck1cd6ul90w4fzq8hnkvmycyxte48yzok3yg1sjolfklyobnsa22yeeho27g7afvcauao9akg3txcjxm445qy4ok0up2dl8zto2rjyqym33fq1dbchyzcyz5vob49u2d3rtzrl4f9mytv2aipmxpqx1lqd6xnl27qb9u0jcl2ydz66qpc3f1l4cur4jotvozvrh3rukmvkhgscmyf6mqd0417x9olfh6e3f8uiif1aedps5qx62su08bqe1f37izi35f9ckiv5q6i20l2x5xt9f3w3nwb9spmasnhaqfds0s9uwxymefs2fo4d1jswo8pa7ucc7zqejghqzkjnyrw2q0cnsusv4gab0ewrd01ve5t1u7xtn7k2s2x27nqkhgjwj0bkn8ra1i6opc84muyr9hgb0jdmygz68zu1wyeej5aqdbjgb86r0zqx93p8i2l9u9mzbkfquk1xowikqwq2d9raxrwdis990zaxi0gi00ampvuf1gg3gklojg3koynai679kxv1t1b5tzrkd7uik1tnpz279saywex348fpsam50e',
                mime: '9rzslr4oq7m0nys9326rt8q2xzku1el4mg3naoujv6oinb8ku3',
                extension: 'nuzuj22tlrfhv3t1g6vlxfyqug185fzfaiijv81gvg43nbn99b',
                size: 5723436899,
                width: 439861,
                height: 618176,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: '0hbqjodszkl5jltywq7r2dv5sf0wlpr8eai4tsvp5ck2xxcpe5aof9i67i0x8ul4gfa65ycfut6348rdu59ie7yfkx81m1vcvqu8pw1buodsj587dkdbz06pdu2jlek5magmfl0uth1ragqc9bpknr8mtni4efphqwk1aj4gu985mdatpmhv0chrzmveogsmqvpqvoha8fm82ywqk6wgjbrgaj4aqyhm14doin6sptksnrle1g1s2z8rtdg5nm2f',
                pathname: 'shp1lix4w7hfcwe06sbyuqs8uiq0zkvwflmt4ua7c8zvceoqa2kqm8v5vx28x6fmkgtnqvy1h0n568qmh5pudhg5w8lxpbztie16nkck76wbj2t9fmjkzbz99e7lbeyjphob4bk5m3zkkxbphsd5p5jb91rlzk29ngemeiwn1ue4jouui6v5uicsa6i5iq86tpvalm753jkb8sotbjdh4t2mrgdp0243sistls4bg5hiwpwsoxh3da1xi7ckndtjvqiwqylmcdmqdbb9zlfc0v8g8c8fxy5b1z74dosigllgxvj2muw2ewnhle80de3vspv5re075wlzaft6v8sbc4x215qfo4v4d1o5jlj83v439dsom061sio0idyljh2pahtnb4ez7gkcvg1wfswuqe81j5xdy2pgrfqzjxj56bgh1nsahoiovnyrcv6h1eop63p8dff3omhycffmxf7m6x88uzv166hzuxkv2tc91uoxz2b4dhcygcih6q5scry3kg6j5vu9r6mrdbxes455yugw0hb9x86ptpli7pcmzbvl8d1ggp1cm9641cyzbrgw2sxlrvee488pcm5g6l9rn5k0vm7km4lbuuawwxzmgtugmcs4f3dmjhp9hfptbutx8nyv701k6ur1hkg24zkwp8xe6p66ej9wzzbgk19eh3ofga8dzar15x4bevlny7yvxincqn3vijq2y1pd953rdswej47j45lzeiccpuhlt78se9xu1cu682buvbkud075cn48crb8b95lkvb6byibsj8timucmxnqhg44nk8wvm49k0idw81zfsiuc1lhi065mu5fkvkd8bhd4y8a0twylm0xmotl0hrv7jthbsaos0et984hdwrxb0q54nio988hzaplnwwwwsd14582ah0ehu77dlw6bto96bgn36k9gxywu9ss333i8xmsbjbw50pmtsn7a0x8taiuvvmel5orh0kzmiepb1zxlxjj3d5wm3ovilyzmc5mu45dky4cuz3w',
                filename: 'qgxkps2xpxad4pge9lth8263d4c8ng5gccbs236p1ubs258oz22hx8cvcm80huxx0tohtp6zq9hzih4bzum44k86rhmrt9a22i79qonhhslqh2jky56qplgzerj3opb43dm05y502rvccasqd2tj3h8yjqkt6pm62yogypk7x0mj1vgey4jbdcw8can7damqrwvkb66n6wzf8ndz1ebbppyfvgl8rurjs35vbouf98h2hbihfqyn1sieli48uak',
                url: '01if9no69wzda8v9opg2cae5aepxxueo05r5fy8zukyf1chjcemecz1o9jjchbvbn9esf2sh15odlg9azre2x6so4rmrmx16flkcz46qf45wqmg9jnct1y55covz4rge0r3st9u3nk1e11xtaaxvpaf3z6vti3toku41jivgcsxqrkool2jljiis58t8yyt608g1n4zyobqh8j0ctz3n5enh21hhfcf1rxi73x28b0yzbpvbafw80xswmzvepyjsof93dnm0jxngnlyqrjidrpocgsmamw5fshbcvw9i0gtzn92h6e3i6fm05ziv4itpyaeoyfkki1sglpoqu9363yn7x1o6eevzdtazjx7elysbrmsrk6f9lqmwvyjlycpmb00xey03ghgqgp7l5huqq5up9yg8yokficb6c9g0hpxpxly45ubvqor0x7h63wv4klvm7xhro9ssaxzfshcddn6jw5y5w042ignwn2r4x7djcphon65qy7qqrohdm7xh492sygndc92hyb59z596hudpskovmk5or3pocl57wtrtu4nb7875vm3l8vmcse2wn0tj4k2pu4n8uqn2qzul6ugbt3nj8lhams084fqa3tnm124i1z6m7p7x0jhfa24wsw5pacdopvqv03ktwo4olonri6mx7uqi3jsoclufj96ov3ms1yk1ub682yvsfbdkyu26smuwlh3ootk8s20s5znwhu60abeu34iystwnn66qw76kbb9nfb057b2wnamni6s0t2rkac8nizz75eoz6mmga1akn3wiio9hza78scyf94ahwka5va1hyf9tgibaf3ho91rxd0bk2et0aurgy0tcnkfxdkxmk7i6ciaax9ijhnstk5q49ggma13g80rmru3d8byu5swli2f2t3nr0e4yzrsad2omd1extc0es3lm0ao37hg4byy8rt51yh7idx24mheg01kayowlgthgn8sdu28olsvhlizzz1z6ewzyqr151ekcc7e60mgisrxl',
                mime: 'clv3l19roy7gwqqs1ft5l3c0yp5u9kyskq2zb87fwis1nsui96',
                extension: '2f5aqd00f1dbzmhz220cqbr6xqw5omf592k0uz9cu80vrxbuoa',
                size: 6193611684,
                width: 518192,
                height: 217931,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: '8nd6a0gv3ourhtlz9nueeo6m3ebfrgblcwn5bt2c31rscnzrdlk4db6lgh2yo5ay9nw6j7lq28wpgau7agnooqd2vh0y1mr5xhel99nzqdyc9yfsaxdardmcn95ml80voqvb8tleucwr048y3zhwee9gb8ggr5thaaqidyzuu1y7olylzx16fz21j157tf9q90jxy24wsh0svoxc81fo8ir3cen77wm36wznjq78j6ofzxht41rmm0q57exa5d4',
                pathname: 'mekn4slv8footh3t89b68e5q2os4wdtcjiar6xj1lq8iied29efzjum83dd629o66iireu51hw5ul8dzk61b29z6o7o5k3h2thfiisi25ple7864eoyfb84lz9gj8k7jmgv0ye71z52rtwi9g1yrrm75f5rkokwo62a0xwczgceffdiaj9un4zm401kimwyyg1qamsbhmiwgbxi0cicxafj1hfefwkn3c7v9nql1ix1e6v36bpy6qagvx7ce9uni8c0rzyrshcmdy1wb3ligqou513ojl7ivqrcuhbom2xzwgjexp9topa3dmx3d8gy2mnxem7l8atmwk6spto1q9sjzyxrcwz6x64prb927xblzn6606rdyrp5tb639xy6sb57migqjiyusupktsgeyajtbwxky0hlxiq2rl01ry6tptkyk836abj5asmxrns4067zo24dtzx375a9yu60yv3ld747m6937si8n7qfsl9zx3y5sxdfxw67ulsxhihml518rwk2ik6fl89gmq1posvrvx60iv9x2ie4qrmp4zhbk9c01wo8g636v17fzwvuexe4u1db4cdkja6zk5hqkng0q2wjxkn8oc26ocqxc5az51frcbo32988jqstc2eofm45s9uqlpgi7yc05xpodhgqzrz8dxokcmwx8e56acrmuv02jyu3c0lw27njjx38obyxaqz6rmkwv139gvu0g4n2uifj0bqdclsd3eer1iu8t0fosd5ov1xb0gbwk3slb98ikmes1unt2vb7q5ri1x9iio0omi8p61fqcmqs6oqbhgrxo8qmqvsxa01qtgx28z6hhz76rs2wg1w2ccu96usj20o7vid6trr7mnsssimd2mih4qzhy1yaryigdw5ga87ldrxz4kgxtnag5efu3kddanc4k9flg18gxxphpmnb45k87qonvquyd09q1d193fthtwktfgiyx1tmp6z30tyboqww682ta82893f7dneqzuiuzsy7jsi1bfvrq4hzhw',
                filename: 'qv8xq6bkgcpayj7qny0korxu0uzfs1qh4ha8eo1kkxyjpokmxane0x81n0caf2vpqitxd3e0iuxbvt4l1iinq5t9vm9dcadqiam1ub32p0ypnrqzi38gf4jsute9r4sn5j5vwvxvpf927advyr5v94mxa0x3h30j8t3us0875xjy0pfjyhys1k3mmxkxy3yxo41m9s2schkl85181kok9cd7dttjo6axuq3eaf1f9q7xkiyn97y4wsaywqcjxzw',
                url: 'p1no3ghul3pqjmknkflcj760a1th4m3tf8si9or2snfpxy5myitdr3jghtwxfcd1nyypa3vg92mhteyv6u8v0dzqhczf5aigc74cuo66m8kffpy8l8h4vfdy5be7bd1cr4ol39iorz1n59ox0z47v2b856ohx62bkp857jxxynj1zonnldtd19yd4u8h3sp6y0kdcfj6dd40zbo4hixbfawy0bn2xfmwvqqwpjyzc7ezfuq38bdhl2moutguoldya7s1ncky0gulidixpha5anghp3itav173np21uwra9anzdnc4yts9v42z5w1a8bzyixf6wo6mg7kkogpl3zh90fcoliyrpdb36b5cd7qda02dq3i365xhha6jvp781abcwypqxlomz4l76umaqm1zgy49oi69pqb2som9ftdm5iy3hctwlw0lj20446c8vl2ld8l9cbpoyi2mvek0dq9c2dd5d3kj2c89y08logvt9k541zdps4zimmz4h0qk5putkhl5vr175nyhil29e6wukjllxyd26twpln4qpfmbdk3ayyxq8r95l7ct8ownpy70vvlsbju8k2tamabel0nfuylw8wwcpsbe04xazej9aw7xhp8l30a9137622fvq381a98vtcnjy65x9402wms7hhedeu54k0h69yo02zinl20f5wiqma37ypmw9jr77v8i6c0ekfbh8k40994882q2xwsqn73cfvs05v3lvf7w8vk88vmr7uhdph4jvq672eb7odmcinss8dm3m76z4h2juy8077c4ak7k6ztandku9ufvj8yzqvv6pbu8gie0806rx5aa1rkz95t50gjesucg4utff6088r56ij8c8qckhebsgd3p9a2sh37pvcrx37ydf2y4w6srepuibafh3ghojaaztftr56v1j4wgp3l353c0ggjyn7pf0f2bls7mib18vjkkviuiu3nd2awnx26vldtw7ihyp2ul4t56ppudpyzvw23fx39npir16abkvsc',
                mime: 'wweucmbtj681z7ph2cbbffcj0hix873z1lxwwb2uoivk5s71th',
                extension: 'nvp6i7vr5eyzb0am77grd13x7ay4vsf0cifbaqncgsf93vw7xr',
                size: 7887079742,
                width: 977660,
                height: 334195,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'oh39b0u4msntrcujmzz7qnwxtt6v1lbcasdipmu8npl6li4qoo5v130fd1ac7rahtlckoxoye0aaq9kv2iefekpryq3ahcub7gf9w3ondxzlepy9gjbycshfs2q9g33nz1ix6tfxcqnw6g5w0wfukpoocx0u1xmb55hf82hgjqoqotwn92865swvcccdqv687dk8wgawebun2w0wrx9gopao89kdsdj561ssu5py5byjv0uxno5b41y810cvltz',
                pathname: 'lnnzf5rxf1djne3iafjtzayx401o6l9bj1gjunk6c4ltiyefgqe5dhoq0afm5e8vqfa277i69ax4scajvtams3vh9d6ul2wlhxiw08gzxysbrah1v3pa45d6fgprli442qph59m7nwi5neqnt0yx0suid9rlwdsv0ok2cvlp69b5dzrpkj400bm172hntntjulz5aluw6chnh61d6nvxp6azm9fbjy0yr5swogbyoj8vaf407d326lm32gbq1hjvs0op5ukjrzi6tl3osn8n0qcgsqr5uxp0eb9yni3dvrjqsx9nt6umjfi40k2t986iy2mdpxrh40yl6pzuj4acr18cfnyg08ja4m40htnck4bu011wiuolx2h0ln7oyoaugahy7qmtpglj894uy8who82mphcm23834k415qyjm9xst2wf4efdxbkpp2c54knbsm4r0qc7wb9apbssgrekyvcejogr0khqu1a92fihsg8k4peo0r1wnyrsxqs2yl96l88ljggnx5fm1glvv62z6trlljt175cpr0t4dggsqxyn1nqjr2klizz0oo525q93ujtxvyfqjvwxur73nbb3mrsm78rhaklhjpywhe1zy37pt92uieynrvb8265qk1vfc51ew3rgzapcxwcyk1qow7g8juakyv0tcut2t02nwid5q7mquuvtfijszsy1uxn15vkgqc48o7u6l00oii0953apjr3sc4c35wh70afz9v4vnmfpx2rg654hp3kuh4te9htpejj9zyzq6gbewlbnc9qop2iq8hmaabi2itxa21btn1j59dimgz15z8eght7ep4jxxjw1oj6r56a1pi4i2u6q6kwholegujiffxtwyqqwcsaf6t7z0tz3dy2k6bgq9iu97g9ho6a7l6vhb1bdt60ieyecd5k0mxzt1dixkiwqijdlsr0xmf92lyhdj9cb112dg33i8vojvgp5cjfhekxxxdnts1qsna4y318n79nhkorztasw9y7w5khh16xc',
                filename: '1nexzd36dnvg2s9ucxeumwklkd3wnmfily5oivs3xkwa5n2y57jrydvns661h081ts501svuo8qivag9spvsnuhoeiujx7rm3bq7bcg3c5uoxp6ivju1kjrd9awyuj6y8jmieog8yaij1nk2k9wxx72kh0l3asavpcdxhkmovmd7832igqbnxka5s7esh4kpw3hamu22cvk8coudyg5ntepsswn3k6jr7ckjoicqk6jskb9du2vsbd1rq5b23q79',
                url: 'j7gxfzp0vqkcib2tmc73re6jkxw97rx56psbjwobhjmemei57lp1l0lxx8dbt7mhuu284rlagi8sgxvxm33a72kglv2gq8w5kb2r1t42id8np8lgzafje520va5nqw5wpsg4yp9v8rcl98hc27ko8llcdtidwad3vf4p4h1ydh71wpru5hd5anc7re8k5tauhhtcwkv5scuo06v11lf73i3pkxskwgnurb445tciq82ae80x9zt6rx900y76rw59rdgkcn1op7morq5461jf22anlehzwxu7oa8lr538d9dhih74wwshd5tz38ukrbt8c2d9ttqvnwuqr2j0igxwir26xukp4mw5mcvld2vcghw4gs5b7vt0hzt79ect2sjf47xtiofppbf8cpkxfsvdvfkcg5mej7s0l98k6czyfgi0nhvbjgyp51xii8ksgb29mjfp2l2y6lzn5f133s6982gd726wur5u1dugit476jgjq2qaijqpkiy7slr5sceaz5hx0ivqcsg3zmfvmhnalv6cy0hz1a0y61e82qvz7db5ebwjmej9nb4wkb3evpq16kvzccjleq6g87qs0fj1gwozsmhxp1xorrm1k5f2eoqkrxhefruhjpxmbdjxy3gvx2lwov7hzx339mwb1dluckmon6jxibtl9m3fnl5nwlu3urculso8zi8u4o07qfoomoiyebk3pr2vmd0zxtvx5pb62b632npv1qb7cxff81kaj6q55ciypbqd2bq2w7vftm14273z4mwyiii7836gt1ewv9guxsbgcu9izhtekj3wq7dympxds8nf5hdrmow9eiy82xnxjbll8uq3r8lphn7u4ozzko88nqn1b0cthprcougpluwdzp2aggrbus2c1tl4s4l03ri5m321ky4lnbwtalfsa3duoklf5evguwc0xh0upmx02hildgxjl1aem4d0offoag2vt2qhvvd85vflrdmxl6t5vwxf6rx25h0awbkxobvecpy0m0wwu3od',
                mime: 'gv2qiepnidse2tl879727s05p72voylww9yfs7b0qmvlkcxuya',
                extension: 'g35qa9tovgcow188c24adg80yzuczns83wcw5rcje9tn1ue9kn',
                size: 7477253688,
                width: 181859,
                height: 872742,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'pgtn5a14hd7ahcgs7jk4h9dxqqtr3qe5kn6utvyh50iapfsd3yibsllavjzm69zih3m0vw44mi75uv1caefo7c58elpfk7n2x836pdhqazxavt4fkapjo5dkomlhse5jb26nonvoolwq1x35nuym75f248bfzdecau3b8043zmnosoz65gufm27xcbs3rmcvp4g6ugoytx8ln9dpo1d43kzxj60ctaq994jc6cnkc3oe8f045l4o0lyh2oazhe6',
                pathname: '21b4ww5pv3v641avq9ea7lkscr4o9c512isf3y75a3tmjud66fhnyzdsotcw28ix0bix6facd1w7tu39fffyo6ug133q0r3xl2fmgb5tix8yrjxdcx0ashekdg3rcgfv2zoqvy49dbzp9mkm0j94vps6th5i39mmenlqdqlsftnfno4nwxk70dsq0bh684uluvh4f9jhp0r3qec6oe6ia9gr9dihkbag4urh93o8leeq8hrb4ey2nt8gmx0l1nheqwzmi0ldggror982ij0b6hbv5rtv06vzjnc1n7pgf8tranc9opwwgsrp3lz96jnroknlhq3dsgfztg2x7qo3jpueh7qfc3vq7dkvhc2h8b0g4dw5mau9b3ap7pbta4spjcmpdhtkay5guf296fhniw9iha7zygpxe3ahamgs7vvljv28d8lbvhaxt6ba4swrhao1n5p1afxf0xbmivfm9v2vrymkypptobm0k3jidgna3x3wfuyxhzyo132rtp1ym5qd3jjh11ndhggu10guq9xv8pkubn2j347ebd5wfpvxtgb8zflxcmbv6wqq4fhnh4ueounds8m5sdsjdua0ti11sjt4vox57piu0gkdigxtjows4msqqi2oi2ohxkaoy8ehvbglsx684su2ozo8qw92p92riamxydekq8qww2z7gokn163edr8apab63vrixo74g685lhk2lwyanpkvjwq4k8o83ra35tg26y70c1bjyjshlk6qhwug1qqnehrsesa4zpexv99v2gdaq4pm33u086u0o4s1wyc2j38l7czh93krrl1smlzthrbcrk0yunw9mcttk81t38yrt6la09w7fkzdysyv6qky5e2clrh0d6cs1jcgatbsdh48km7qvh6pwm2boywt42sngjcg16ndlf4pis1nvm71a22g2bidxbd4xfo2ra0do2s7dws9tdsmqukkk9dt291xndhqlnp5p3edabk2ocd002bsqdx1vutvexafygje7xb5q3ef',
                filename: '91oqhpdw968k3agsulrywmca7x1pnm88xpcot9ciz7mt66c0yeil8do60wb2rkpq8f0o0h7hju60yi9b6ldmx01jepf4v3dxq3cl45l7i8eibwno42lq4oak43a63dp93yr6t88ifrvxgz02s0o3v6hs4e89b0m76mnlcolc2ii7wkl4kphh3oipcbgndzh002scwalwajl5b1kkj2ed0pkl1p3cvqo156clhoq9yg8ami8g09wkmbuoouik2zj',
                url: 'oi663odgrevgbw6kry3vv1wxbyzlpoghzfamz90yip0htmxnwbgz0hxiegqvvkmlvhe61umpg64iywp8wjm5f15ctdxn0b5ocwi6j1vlmkj6bkndxpd0rjxvflxhkxjx2olqwhjxy7tqk480qn6gxjthgxwlkfniofowa2d9dp75hybl2sdtfgtokuyl6dwfjhewlqob2l7ca2sh100qs8u5otg1sgoe0t8snansvm6jpfdb47z1cutto6dnrwac3npjr2qlcegvxmwlzl2zpo6px31spjjckrlgflvfjwwf038q4mxxgac49w1esvgz7w6c0hsw5f6x6ngpzg7smcdramjjiokeifhkychgk9bz6b15ia3ul29noyvya2xjv60gipbhiz1wtvdud4lm8p29928kx2dalnicvom4o7qdqz9trxwo68pjfkqhqionm3wgpn9upskyh1sveathtr28pxzuhy6e72yyf4zl3kjtd5k9tmp95l5rtbtqauc3vvs7yhkew6rr97rk7gr228m0gt9hx9ddg39mf1uxiaqt5zo4d58m5bbgu8mvgk6nhjilyh5pullk8uar1gy3znyf9by3urfzz9t72rw49apo4kev9xcs0xrey35qvt0wgtldm7l55fmgazb2iwgzyjwch6efyezl4973fpprb0u9z7wc8sg7gj2jf7jst4ja1ml372xujkyp06xkjsh99m0d59y99rjaymx8p2914nl356nuqzc9az7vvwho66rp9lovrv90mgazsskpr2ajy0o22ohbx2ovy5tzijb08530wsle6ofo5lu34j2vvnssegarilzg69us0dskzgo46mf6jw4kfs67vntt0c3xkymiumtdhr4gkpt6ihlv2rf560ecxm788bm5e8l898doqhp9yzh4nm2jvnqm38970wqjv9yp2pdcee7ud2fp4b05pczq6zyvd1q3k1oy5zl061505nf79fapsjcl5u1ltl4q3sxsfhy86qjhvl9fgtyno',
                mime: 'spl3v3ya2o4kh2fivkgggtpwbg7f6klc1ipguhmoztzdhv3mbg',
                extension: 't85r7jbzybrzrsv9wzwnstqvyf8umx6dg8mv5kqeftztycdaym',
                size: 3033155158,
                width: 459900,
                height: 136302,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: '2hje8m7zjsp2nfo5gc6v3lik34cq3mdzbqi6l7k0tbbaneqa7odmxrv3ivrv9sdluy4836b3afldz1j8oyhntilth1rfyllu1hfazx1yvllu2yea3h29nrocybfz48m5u10m09a3scperaeljw62pokpkih3fk27ffre1n82093y0pbq2glm95lmy5ysnv3zxu6448vmb9g3a6oo76bx118faasm2dzikvwghbd0etk67ktjhr9npgz0mjtxqfb',
                pathname: 'nojb7wpmzqiegajjv4w5soaqu0yybj2p3qnfm8tlo8238eyi9pws1tn3vm43jcgu5km7lhl2cjxj67hr2rnoyy9vfeatl8kwh566vcmfn4wo5oj36hfup2l2dr3hnxulvo9ti53cm1rhh11rcui4d2gtbtje4f4mgtuauqnp5qmxn0uicgm8m3b9h4t9pxkahs320o9oniygm7nh0btekktgyk2z4iehbi5mize56yfkddwev8p1k33i4lhd27u3hfsoog6gekou590jz9s4792y8c87zpmwqyniukta47truyc10rvvbc98nyh3khsz4iujwbgu90359u1rm9647rpb8xzrv77xt5wi1ah5xcuxfgjrcds8uybsiiow02zbj294kpuva6tsn8w0kd7u46iny0axb50j26zt1ug2zvn7uovybfqwd1mriwgum3gsffxgrhz3th9bpk50qhdhqf1kuc62ktxj79zme05h8yx71am0jq1e1aahdnjmht6ny4w85761290vku1qg0cxc3jy2a5h4946ug8redvms614rv0ijtl3mbfqcb8jnnce32iiyvzgf8x23e3r8uhrxlbq4dxzdfbg2hjq6dkxodoejldpp87eaarxanm1xtuqab6ids3flv9itybejgg1i0cjf047khkk32lcmbj7mcpmqkv3s5ek4bmatqigbpd4fgwqzl59npntotifkv554tyd6aphhy21hz8d48s9nk8jzwq9saioojwnirh1tmk3equ99karhzdy2y4jjadi6ov3oq5z88c18f5ul20ov7kkhe38l025fzvm6pj2b84p0zt7tcvqmxrozgx9cn60custzv7w2ms731g9627xp0xlumbhnhkr4hc6mlh40d43k5eevsy2frlzsx2abb53q1ltf2p0swg51iqacud3wrw6j70lorp8hqw9oo2mo4x4j8jfmjxllystlbbbeudfdvyysit3rou8gwq7iyhy12567wz30u2fqiqv47y5n8eo',
                filename: 'm8dw87wj91dzv00dwlh9q4oiceg30c1j1bgkp1aal8oxxcnjnj1e548tz04sjw4t2emgagzfh0xancot8gz8n82qslmfwmec1nflt4ia855z4xxk6u8axkk3hxnkru071n6g7kby1zdwtxna8pxzfbl27su1853ixpx5fqgkro7lvwpmdncm41ek73wxl7mbzt29pwrkx0lpk90r9sy7nd2knwb2h0btvw8w6nlpg0osh9wb8eqxdydra57jkme',
                url: 'cm0jvtxuafjlkpqige2hawcwdnjc3iybiuy74tmlh5lbexyqog6hhy2biljuadgcxzu74rg36fnxt9nx9s8awet450tcfgtwxbunht00l4tc6oij1ne0xgx5d0jskxii2kb6k4586oaem9ncgyi099ghgx8q3r7e9pm9hakalyjutd8d8b38zpv0e7yjt249ujt1pd733i1i0n6ayuoeyqvoh3uz6w1u4god1gps3fwkt2quc594dcchg8htazlzrytgxr9py25b1qsxhw18z6ybpj7bkcu3cbpftyiu79i8jx601hl753df56a3kvjmvkdkk38r8auq3bruk1iyme19et73cf1oayay07bon7d1hkdbtcbzk9ld8jexrb73vdbw5d4yudsqkqu6mopqvkoyhjgiwgininp6bfonaydlsyt7cjgd1c35try7bfpnsffvapweqqr0fq3kya39jnviir0ivgqzliz2mukyzgfglus6f3htfemmfkd0retz83jmngbkpch80t6eiqy4zklemt0g5m2wka8s5pa7r8pleuk6lk9vko8fwluqbog3tf7040q8ciax0c1076gmpvi9i6ydyeh1qm7aayf87d2aaxxpb4yjbmbkjlaz7kef124i2zgy8c752mb0jtxgzotbo9i9gd5z404xcog4wzzj7qvrxbdlz329dtheje92ayuduh67as9lszafjf11vr6kul0yyvthy895t2ufesdgt44fowqeupjtsy9r5zmwz99xwso97ieqfofrimu3f4tkoasml7h8mh7xs2nrb37omp6h1jkkwosb6x7fjlhve6vsu4dvr87w6mm772appuq3q21egdj88coc3zisiqvvdt9dsvhlqxq0zpxnof5yydtqtr8lqigdmw0aagbkv65o5eazg2rpyjh30qvprxdte5cd5yb07f20vtb2ybdlujlmthw1uh352qq6une55qbgwyljb5nzyvd0sxxcn4i434awxdkwncsx0zlpz5cz',
                mime: '1ztkv2wl9gkqy9c2afsf7142usp2bg5flmrukg4fuwswlhv8yok',
                extension: 'gsdqpde8foqzke2dq904gvrw032mbsn4nu4z0hsj2pjv692umh',
                size: 1311855500,
                width: 993418,
                height: 103817,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryExtension is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'w5bcunorr9zl0uetmqnoqfjpcsiwbt7g9z85jkcolpyjmm4xkmvhgcu0gx9dtrkxixzxa9i8s6o6zwk4j9gz9h930818jlv4oc0gojguxy4vx3k3t4s6dl6utd2psscu9e9u228gqhj6p1fjczskzqd46ow19qs4gmqlaeq1w43urqzxow5i8ecymbtbs4sqv4pdfppupc1h5ram4gdbebdb053i79i56r45pkwjd937g3s6gx5r4bdo9mpmmyu',
                pathname: 'o00lw4o987wsbnxygnrtd0sa9grwf0pnqpqsx0kqirjbj8cya27mh3f5nhjug9u3bn8z2f6kh92k6se57lcajj79huzx1lhk9n900jji06v4myth66ibn1npqgh29vfukhzjoko1ea9ks5y50djywb79yarhuit4im9vs3fdx7hrlkyfmmtgtxfd0rpj3fz3vv83adxf0y7bxqy5sfgqeyyh02cex1tlvnzz5gqwggdnfvdjve9pxtr5fuha63xite8wq7tp10334ewbbl5zoiorszas8ki2f8oi5z4i8k16rs56edimrtpz56whoqpmrdjlutda52ij3si4g2sebodou4iedxs3gvmm7jw3jakxju318gbxg535nijw0rrk3mbix8s2yi2mhi86iqs9pt5wcfc22clroycupx3tigbhryfqzfxp1ux0wzyno270arzkydck5v57zuscc98pkbmuxz093jd8gd8of213ao18c5o2e3bzpwm7ofrocon7bfi1adlxp2l446v9kn63cqss37n7m2dgg98mokvzm76653xdgxclff9sx22drhy0rpzn3okmc0dd2jvezj7pg8vubbzbkvc6aojl3xutwqrtp73t2g1lekdv71x2997c3h5j89xm4xjtsjfhtgfoakzvfdfkiel2zc86zm7440lxucqivhmh9cm4hxr6vgkk45w95nzhuzxrh1tj6zqugxcb2clbjtqk39e4z7egrj4xox9rsacttp0kpsv62hxfs9h87epg9o5xlav46bh06vbgb9uytq6dzbbpvt2cas0qd35apmu59fqkccjnb1tawdv0cwglqlo4c4cayjq18n4zhv1e7vhmekxcncpqcgrk4qsmnuwynfml7yxhwjs9rf0g5z6wiwzb2ctl2kbgy3qlunxiwet6mxjr9dhgdc7bcn5timuc68b1labwqj243tx5zl1gsxgrsjyiw9la8s1qwalco6akjduimgvh58qz2orx59ioiuwoidwjdhnt',
                filename: 'gog9gs2atg80akuj9geoy3mboj8bi2ec5ipe6ft5hof1x2y0rs89br6qnx1x9uwcjm0lbyxdhk5szhpzlz2b5i9did7ttqfp74zpnn2c5zfq1xft652q5f0rdjcitzu6qjn4xcfrjjgze0we0pg2y14ec5uknvnqp8vrqi02g39t41r0c9rmbomnkrwoo4hix3uwksnxcxt2ouawdk5o3q2i1u6n9hv2gm5r5efjxjmyt9myysuzslbj8ie6k08',
                url: 'kdp6kw4pyfusglk0omb5f8i9vk55homv0c7z6lkl5al1mfnaykoxevw4qr07wl4mex4jljmfopw48pzt05o004r8rymbb6d51bg4ixs6cdh0g7i6er01kyk5oib5vz1tpj2p0tj3lzm6txt8gjovimfqek0wtt7hlphsw25ob1gf78mpr85yxz9hgneqy1d3mbkfrdqu9bpn90ils7xs9e2pgyfg6vw0xy5titacp2up3tb5ebbtk3d5ck1oznc3q1l9pzybpaj5br6a9angs4zfflor3phn1r3pmcscuw4vkx1zdw9yeqod07ehb69ul091je3h81ovhl7ovkztg7hfn2q32q51yfc86b0mq0gzym85bfm1idq98j7sni9yykxdb4w1sh7ghjf6tedulcfm019gubtjbpzufh8oxzmmzmumnywcarbtgl4upnmg03e5xuc6l9may6slwnc2mj2nmvam2q19znvs70149n5o3jhslas5aqhjytlpfeai6h2sr6ax6byma5wujjqcxg1zpcwcol6pbyrhxubpkh5g5eycs0jovyvfl4y82wysudj6uujbgvbzm32bqfe79lx98ylmk976ofjyazo5up4l7k8eld8a8ypvp44k24ecn2x2mdziim76h4d81fv5dw62arnwfi7tmirnv9o1kynmdiuzsrhv824xf9pfoqbx4zyyvojh87wtjm47lgsi3bt4xfzpce602efd9pide1047gq3n29932mr84g0d53vidp4ckju1hs858za41mve7cncjkg6ygozad1ra5zfsbulwfs8s7l3d2hf1nhbe18h5txiruiclzvzsjvni3qm7xubpkn8paot7y81x89p9lkh3lqakb0mb5ybfx7c7altdtgn3hmcfb0yzb7x0hd6op3ori97wm65topnq73yh19oc7prj4876xasyl2r3jzu3tujyvr7qoruk8uuwt6v7xewpbgi37nj2df26mhvjcumh9etj7gsx8soxraimza',
                mime: 'eye2avv3livrgp0ggbkburk4k9qzzaav520oihjlzidfo9xm22',
                extension: '281kv8szxr6iiecdh0oz492wi90ywbr5emgoemhajegerrls7ku',
                size: 5870295541,
                width: 162296,
                height: 748931,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryExtension is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: '0vke9dwic3lbwoioxf44x7p2ypy93jzs742cq0g3x0crgjz8mr8x22avyz0b2py6wy741wr3p9za55z7oprgeof1edvaqhizkkldt9lrw0qhss5gqd2m8sw6bljerbeqzt6auocnvuuaon4evsx9mnlq0th78hs1azbleso1h69q69438eaorx0g9trrq6zkmd4wycqdauh98u28avomr1marn0ti59szb69wn2tlw6e60sy48t0tb7v3k29371',
                pathname: 'wg7buw8qu76cyrb2daai4xq0bit9nl2u990kvoehv3phao1m433zkpgzkjztr6g3lovyv5h451zhz7fzum1ndg9kl9tbiufr6y14npjy26zo7hcr2uij9tzsdy67gy906c9b8i4nmxjgcd8v2cj598t309uo3chkrzn501w1ppjcta8n77smgfp878iw5hlaf7y0fsnaqbampi2glsypfn4q602ug10zkuhq1g66veu2wjcgczhyvsgl27xvaopxsjenkcsxfa8kmlgify1y9zwlw4ms73hdcdggqs4izbnx18xbgmhg91vgxf7fkz9lix18v9hnsrua3opdger4rm0tkreoayebrfn4tgl2ns9tx8l3zvyl0onfr6gc8un695lmgru3aqpag7ia5m5rnjyuovmeedtnv16lwrdycc69akjtfxvy4tthahh4sx0avygxgnrgqtht1zwnecrtwdbdzfr93b76x4g3dtx84llzp68jkku5r8lir8zp4w4c3vpvt9soh1uzgof4s94g6paevsquwmmeft7dvgvjfkf99sjulv9kdegi0bt1xg55xkjy2v698bqkk2cjejtglvon1vyzgoh72mtp9oglyw5t6i6mqg190lrnw33s7c6zslzrk8ojpjwiqukpupfl7j2civ86v2vir1d1b9jj3jbk714opyxei8gsukuf99pqpt4nwpvbl685ruha1e1phnvvr0e4prbc22nfsfnpfvfgqispdjd2lwboawee8lhlkc1xcmn0maku635p0oy31u37httio9a8y0e3urt1i3hfwyprysrs2e8dt2ukgurmx15lnubpqy8kqke3g2p3j2qsaly8hlp2o48emj4e63g5yyti3zq2gj9feialq7hkel5eswn0l3ht87ykry3prxp5j025iv5q17c4qkab16nhkiyhcnkij1du5rg3czg2qhhkgq18oar2j83k8pve3m49egrngwqszj5pfqm1bd65somg4jkmati3fmxndz52',
                filename: 'igh65badyje7tv1mx7imird3skoshbeyuylsoivpspo19tehh4peixrg1coi7rfx7xprtp27xrcxsj3e79j5wu2ungigchi9ftz1662bkpnlgqe0607i6zka0vl7qejqzmwexcd1i3cwdgz7402wgdvplakr76z900kcubs8a9ymkvol131jb37ghcebda8yfhe7tz8jxy454p3i9wzr6pa45yvgq9cwsucoqzbwz0ha5zvqa0do80av20rkveb',
                url: '381r2ufcdtnpleb19rgobo0ql51tvlkhd2dixcqdrpis9r9mn5o4wncvnrf6nxbuds368pgoq8nwf2poas1y9ya3h5dtgl9i28yupr08fjb84symusqi2tccz4ah40c4lb03bo7wnkdku6msc6oiiw6dl5khxhyds4715aa9fvxghltg5do3v9giyrh6bjnm1y65x7e07wa694t2bpn1f44nv9tugk7z58f8s3sgmwvvatgqxbkx3snow5ghzsf87s1pyy8g2plha49nyo5w2toa5zvp48cztn6kz2gz8am8ap3923uncohlyo6fahq3mhe1vqiruqk810xi0hpxa9g1vrp6b5rcsobj2tw0k8iu5m71ku014x19df9lbxh1o3fnrh06q61mtl28gshi5so4bni4hpi94aufkwjd1guu5ql8d1v8rbi1h4noz3won059gq853v5sjr5hq046aghsthn9jnu22bhzw1uf8259gx5h9xg8a1fn32bbln1m4jl3dna48p8oaw09zrd3otj5mejq2dn7ddojiq9jyu7xkxd88ukid59uxh2veknj8tg1w1x2bspiic6yjt1e4sqba4tns8u0nux9l83y8897m5u5bwavp2dniv9mwqxa7opgkdrcast2d4a8s0pyyzog78hrlag3x43xhjfwzojdqfy8vbgm6vdtvoukp5rtvoafj8lk391vniyda12a558wn24rmw9p4dglwgmu9dfyt42u9lrbffmh1qn9q0ty6f6mfk24ldmzpoi8qsyby3e15dp1pnvhhc8yaq30h8wsacb11bxrh6edqd96fgeffr3h4fy8pikk5r0wvujetuxyq18w8x9s27mhotbh6i239tf16pimmdpzr8zlymct6i8xydj4yt9ulzzv6i3pwo8qu9tyleybr9awnkwdbk6ghz0qhxzy98wmpxthnorbst3xslt8xln2zz87zlmd2a394aytmjp302yhsqblilf2nx6g41zauihzcuiuzsz3',
                mime: 'ps6cygnvr87at7ksiyqg29p3cyc30z24tmu13z9gzi17dlp9v2',
                extension: '1h2ybann27dodfiddykw4uqejopj3q8il63nr7byv8g2p3dgnu',
                size: 64981746522,
                width: 365120,
                height: 736357,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryWidth is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'ab5z9hleorj6mx2w8y8721x18226f8mgwfhd80q2ce7utxcdfxut84whbqhybxk12q9keqfddkxelfwtd1lhzf267zsnpnhktvpuo00behp7ugkjw2xc7gnb442uu9ekx973me90czyv6ryfvhvm98k7n06szes6nbbdpph9cbj5titrr0w1mbgi18ao52oayz90h9yy3dsjpkyyajklie28qe3r8c4mq6qymsxm26s4nssxilmxpt5ha5g7s53',
                pathname: 'sk2m9ujd47e3bsmcj1uhdv6ntctub7n3zcdf3h72gocx5dw5axoj7kptsvr48rb901vb06emyl44rsbflwle6hba97l0ejc0kw0bt40j30wkh7dzppsjspqc7j4wlo0vasa8j0x5eqo2jmdfa5uf7wr16df4bfjihud7x8howbq3kgtlxj15oh8nigg3oad8vz34b6cwehcljuchms002uug4fsslq8b6sgmfw4r0nvd2c1s5and87diiz7e1mgccnr41uvoprwhtx8b9v2e57hz4v1gd3320l3zbsq8v161ibi4uq5oeqddq9z2k4lrwgg6fzh48ybqv8pfrmh9twuzv6acpv0i9esc1t2jimz0l68kxhkem5pxqwrkv509o5a2gr4xuf8x2k019lu5x21zu6kz7sc7f6aij1e99a4kdc7ww5vqyiwadcdu3hsyjo1l04e47jr6j6osfgt97tigetvdv488w0a05yyyf1loe59lj41k0y00o2bd1qxbaqou9yh22ffq5tqvihlqaiqvzaaqfpf2x9kptli6nquieijwqtxcw7v91mpdaiuyoxzhwwsvtbsdh353ve67z7zf0s5ybseret7m47wpuatozm7c4vhqk6v4r2v9z211f8n7g8pyzdc9u45fl5tsm2d0df7k37a7jdx2jvkwhyt9wj8wi1fdew2shdqbutwiycygrg8ylk9sa72yjxbaxof5g719grpv9otftoi832e2n5iqbxyc6mny7s1awyiar4lqvar3q1ykxrligx0ok2kikdolyymfzgmhkus8vsfxw56brbcsqh1c3vx996uod6qiatq3t2pxtyhi5k7u6whenr3r6pkg4hclkzytba2lbt3sojmvmblsekh0g1mc3gylhk02y3jkoif9uayqi5bf1m20ingyh2u2ws55b3j3dfnz8fdcdbsskpfn2xp3fmd7l08590m1yl7atmsz8y45tngbk4wfw8ryjvxni4r0qmdibp0nisy8wbk1420n',
                filename: 'ixr2js3j1ipjmajx7r2o67qzuis1j0pr89eediz22axxhsazrb6mii93mfv206qy248m7w1sg7otp0zwsbjtti714u51aiiedio6gg5mxpdh78u1ja2uhsckbqy0hv04gexnejer9crinligysy9o0u4i8g6r2ocunyln6b89p3bmrmcg0kvudjc1tad0crdiijnu1ahko0joxdtysqrdxudpnl5er55s0ctcta3mtxvsvrppd7lhidg7b2d61a',
                url: 'c65uy94o6dquo56tkmgk5xve7hlguocvawodgjxmqg3fgr7vrukffyv1fytnlz4widfbrnbr2boqva97k3x11p2i9qcshkl815wwj1hks8tuxc85lyz679l0qst11aclduabkz33povfhtb3jpu14566m13a06wktwxbhequc8s983wqgzyqg0zids2da5dsypmi6ftcr3pjtew83j4cemal2y6lyz9cdvk6ml6ynk9xpg36dhsnatztlsqlnzqvuhuxyzhqblkexavy3l625c08xmir1ot9l0ajbirjbpzzo69ozxydxofp0xsdbfitdmu5eovz1hu8nnyqhuxoupckrczc3eaiub6scxhw22fkfve6mmkb91jmfj2o1wn4i6h14qyz9e9p45aebxipxi14odq77v1zrk36taqgnvhg5kz3adyb59yue8aah0qvkt0x9hxrtgp0k9wz3c8igppxq4irtcdzxqw9xw61zgf298wl5vvsnokxxqwvphukosp3oazqh38da3r6ewiaubw1kjbjn6x9kdr3b2f82ybdlzzb84rvsawlfo3fmckxgnsl8m05k7myf7or2as6i967fat2wlqa33tcp5abf7izrkl3qdwqgh6szjnsmefcv947f65vspyjsd7pcs9zmsjks7s6zozo0fxydv5ft630u43srx61okkblanx7aoevc47vscrkd2f9iibval5p2ceddxxrlwjl98wce0h0icck2av34llxhd4gid90w6ej6of1iacihd54v73h7jvmbiruntnlq3n89t5xjehacp1buguyjv91tdhloxkeggov8k051fe6xc592k2h9he3vpqdfxdieawjjkkme9jlzksrng19n8p71jwxmj8dlygah81vge38cbmstk28b61inb4a6yfni5mc93ldmfvaox9k97rc5gsu3odte9wuzczk1816f2kdbmgis2pwxstt3b8w8p0ueeb5gii0hq30269jffiwzb7tuaegfb6arfq',
                mime: 'wd8reb0mdl72dgwqx8z04zys329udekbhuhpxsjz4hupri0dpo',
                extension: '7jzhsvf7axy8cz6lbvbtiu654ltatksy43g935saq50hod4cf9',
                size: 9179416871,
                width: 7895322,
                height: 654855,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryWidth is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryHeight is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: '6gc386poylnonfwzs8zz5woviv4yybq4kltvk5g267yi6j9i481uncbbnoo0qdf673hrgwv2vrxti6wihquvpdeaki5pa1trnjh0fxxc8xe4yxxbzu1lhofrwrvtevt07jl8x64h5lqbm92k33e9tvewcah77f9we7o0o9tr6rqne3wg8y8y7pyi6be7lm7lhm1emogarcfjmxvs09x7jc03cat721ukmvin6ty89mtvqqblahfy4kct69ryrei',
                pathname: 'fqtj2685rl6gqinwgg82uvz0kchtoa8wkt44zjau2zv6110vtpv093a1ejytwnpl78c0h4yy54vdjeaezbghs8191ke6kndbvn91832wcdhf8apgwe22h4j25nusdj3190uaotzvihlmn7cbygb74te5v72relok9phhe60hhy2etfdb3h251wnmy42ijq04mq3dirkspqnpxusx0s34ozhuagldi64yy58p0wkhw9wvut95g0cwq14ot3jzbtpc9cs9uje3vuldrbugmfpnxc540edwak5xzj6jmy560dinu145lc79vqvlgtzrqldr08d8am7so4wd75jc27az9h0js91acd8kjewyosqjrd7ngyng643rgtlkj2z7djujfkthacd874r1cy1qkazb8n8bkhmkb60xuvvaqp4043n3307t7ifliumb1t6yv4lf1jtlyyjie9rnnzk8w12jmenyf3xnx7liczxcu6c32nqtt6be8tl3rjoswsmk5huv7qsi144tewovuq4hqocdd4u9o17zmxl47bbnh7s26rujqgaamuep993k5ov8yslv8agt53uknnci6jigwmzvozjr6qugaus6unb6rhi996zkdgk2hzhi7p3x3atxfys2jgn4sea37zslvd8cr0jfo4fiso8en6dda09tszy3kqyxu8chadgxh6jm0icw0xib2cymx5h3aem0okf8dflr5hmju0ca7rz9ri2yhdbd3stgnj2issstcngskymthcah1d9u5dro8xt4khzf884w1cefmm5p86f5owvhu6ifdzeh2yzvgynechadlt740848ihetj30el8y37y07ks2edz6lflop88h7si7pucmfu2vfdq197gaqec9t0y4hc8r3zl0p37wfpvkeflsmeopkalqtjkrzdnv11v6cp5yjh030npsssme3ymu6u414wklucj9hd807f0vs05gyf5duo7dmqf70r9qh43hd3lwadzwyh201t5gfpbavpmswo9aa',
                filename: 'v3oy1kcfrrr6h6a6ztns5pjbao4vodtlmtszlhzkjslfqk1wmsbcgb7tuuzs9wkpishezdkk1gr3cz9fadmqxazrfuxpson2b5cq86jpldwnerzmetgqz6pg1qyuvrc6osqi2pfwfn1thonkxxr30wozygbtlb5ns0lkfwzxqdjzhrodeodgdpcr5bp4jsfx6ckunggdaucqhtxlukqv4wmvhoa0cnq4p6etyj7wkd3t3d6jn0rbq0fm96bkt7d',
                url: '0dkujs5s6mu2suvquq4xszfsm0992ij297phf4diom1r421x0l5s1ev0vt6xfp8i5wwyz9kpi7dkto22puocc88ttvkinokbq00iqmslv4baif1ifbhhbp8f3n00xz0dgst1zoohllsilcuqe2dk43o8g1cujbxsn0zoww0am2lsd6ry4cl9w6i46w6nbl4k1mbrup4byeykwplj919cs6ilbafhormuxvdy3jbxezyximrueqe33zi9hlnd1nzsvz609oc9pbsk9aq05rbxwnsrbhwymbnc64f8h9n12zl820suvkcm5yyiszjlr0aunwjesoe71plcn2il91ivwvk9patd9iiekcq64cdzcyj3gci8h6jkr7qjzmex508wox9fjhuzr2h3lkfom3nfad02jhizgp0alce8in370n1rhr6xs87rnk27fu69vll18av91q046y3t4u1ytp26ttfg74jlji0q2dwvjkozx4ktzor1ohwonh9o4ahkb6igtpc73v2nmq690u4wg3j0wkskvejwz48dt7c99wst71kx37o2u48acexdcue4vy1ut8udtbtqm0s0kzm6g9mg15pnm8afue2smg97ig122k99pkewdux34wuwim118be95xja6goukrt4oeksf8wbu78fbohgpp34vzm7emjn6uyrt0r3f5kq9mctsotcyg1mzh5uoex1ju51exlt84e44vxkbxsnhm3an20juz1ta1zagn08uvxqfipbh17uzxjt2fk52ycm5zqbffg6qd7uiaafphihtlfeopsu0lzyel3cbzgnoghbmtcddtb86iwg2zwpxt1tp3l6tueuicamiw0jjuzowdsorlmllavvol7i6wmadt7f5yz9uq3k1e0aoy2s7qpgwpmc251b54o7t3irmsiqljt1y3h3ik8q6z37w149o28w225r135e0xoh82eejdic2umixmdjislqoujcyb2zxplxwcvq4xr5x42lk9dc4y0geounmhlkhl7o',
                mime: 'htlmbwh8aiuma07arqzsxlebajo26jo7rstxt8qyv5mb3qhnnr',
                extension: 'q2rpl4as43kf556ofbozxn1sq528xuv1cclgx94j7q4dy97nlb',
                size: 6367858505,
                width: 475265,
                height: 4372941,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryHeight is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 't6kpaho3b0hq6d2odfhv0xgbmbx6ics8tcetk9vzhemvif448eurx6fse3pote05xizauhby3t4yturfdwxzdpr2aeeir2n1id6vfprstfgpgsc4qoy7cd7sggxuwk1jqz98n30bfbhrwxp16p5l61ugdinmnjjae9loxq5ss26letwdi5uqojdw7wvxisxmgyech1dv2x30w2h2a0ytq7qhdiox34u78yjvh4jk6lzyxq4awq0vqjc1ck3wj37',
                pathname: 'yv9z3gpg3vvwizwupptyrl80avl9cwdm3rzfigjgksqf11caokrud36ber8snpfu974lzsm178jiliz177hbc7ulht7m7unrixkhyvscnomz7sjvfsm4undjx5y2iuc81jqajrxm6omejmgw248b390bsg2dw5cqn09jsoxoddfw3pow1i4xu4h6ynbbtrseboz10ogn52jpe2eittwaxnrbyjckz6cbm5vk0782weilpz5028sb3y4fhdduycqke3mh0vhhk6oqpm3oznuwiaalawhqmiqc5aemvs9avvjc8pa3c1fyolg5ad2cc6u0c16vktlvoypivzyvjt8dyxmnp8udxcg5bfg2q05gv0aspucetnxgh0f9t0q04wzzrrkpe9xx9u47bmi54erz1vr8pzrwj2av7cydi6cija2r5q30pdgvxsyvbg51f8kj01t4iyfs3qo95dru2egzehumv2exctte88lnufk16f8a6m0ua2dffxahoxhjnui9yjmgajsspbh8huf08z4kco5v9rnff7sdid26jyfg21i31o1gqzxh5zoiab4ux5vc5jwzqnscuq0d8mkeuevlgyepioepfxb7obziky9szlr03xjogsjcfj8rk2pehj299gbjffdpfn3nn4nzv97wooqodxhtvbkr47dy0uy3tgdkf5s82xmvpgsagno2ukf8xti5z0zbvd9ux1atexgpq9hxg497xs9je3kajn4zviliibjfrxsnrnjouhwxvy31t0jr3aauw3wo1g4cplc4012em2j51poik1g314t06ysfcc2xyon3umc0nfamrinvmte3uyj4zlaj51gobz7eycl45wn7bzcg6k1uob6dgv8vtpkbnugsgevedpu6ao099n7tt104rfh0glbnd995k7jcnm5208kpucypchxn4jkv9n10sokqrkl9xo9w8xepp8v5ok81esmixvcu9ztfctsoydches835b21b1cibfehxr7yev3p9uv4d5tw7i76',
                filename: 'mdauf4k8xi24vzumtrw97u4h9ml81f9k243qdsi0xrxuqytl8b0m033ojsn54b20d4srb9ffq6zh82itfj733pvgts6sloserq4wocr5rc6e7ukygvqk09q3a6v3lkoaageth0qn1tea08ysku6ja837s0olehgt5ib8ff0y5rxe0gfx0un05tb3pz092uv77b665t7wn4hmof6y1xiazvgw76nrssr83o177f4qtp4vd9iyfapwc2hjc6di4vi',
                url: 't9uqrxczrhuarfykhnngum8co7g95bqadnyvmf2dvnayoml1jpfgkzmyoi7ikdyov5rpf1ewoqk8fun5zxzisde0l0kwv5t6i6pwno1sxndn1re79sdjvb95q9cs06905j4o9hq0pyehy93mj4sg1dnnce2gbikel5f7cwnra2tlg5b0ze9olsw8ds39xia3u0yha5neec4sp54tidocqo405ml13hhd2mil40bw2ufu8glp1jljc223g45jk9m1p9m7bftg9fg8oz3hjxf3q0lhk7evm6835g8c0pbofj4pjsqmkcgeihr6s163wz7qptsk5sosyaqr8ybpk5s2u64n9941yurm3q5ck8v2ui94a19ius1wofvwg273vaeo3ibqbxqav27e6ulkr3a8b0qzqxxox59gctrbbo09o9p41cc2b0xj8pduina1yghut0ap7zo9vw1m0xnrl0rizbvfz3qdh3sm0e22n2yjnklctjqr7jg5vznkp8vg3z7dti6vy8pho2tbe6fg3z6otxx4kbg4kvk20n6e4970p8h6g2s9ryex8ocdk2xebo75ypst1h2fpl7ugqtyk3vlbdeqhajybzwjenv8qj3g00f061hrhkzsngni3j1cu2jjk4gpd9zjxhr0p3379mhdv698877o8z4rlz43hw6lipzj86r6zmqmp1qz228nl2z6pc78wuyecoyheptii778psh9x4to5rq2bk8w0ef4m3migsw5v3vpw5a3hsxv1od6jfhnesb4rvfwsh50ccilngidqx6541nms5tnj9oyedqlz5w6wos0stwpvp8l1p7rlxbq3bfm7i66ouslxpzwwjiex6xvtnat49m8lp7tej3xu4b0b0kcodirhg0u8g7suukh1hdoh9ikv8wkg16m8ld6035teo6ziurd9qcu656dszfkkscof3mcb5nb5z5yj0hykdo0g5yox04bdex2k7yp8bpdfrf1ee845a9adaahdrqzga55df02ene7kzwn',
                mime: 'f54pne3iyoxp2go32eza085e8gxpnt2v55nopp56735wrceqkc',
                extension: 'ezudg2p2zizbu00stprgw7djczy5chhfqcbo7hx0rf9utu4reh',
                size: -9,
                width: 979921,
                height: 159282,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentLibrarySize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: '4xl7fw180qbjpwj5edeu73t6k8h0k610spy8pbsju8bt1hsgfnav6qvrano573zztvlcxvqs1qdvq9k86cdfwz23q5v5dg4a1qtamrti34ycwjapemrkphze6b46lrbbbw1fa0sm11z2eytikil0hhchs1idqzojo2g6vvyzlh43d0sfc68y7wou1i0iwsfsyigsj0mb43in7he1efrjy6vof2kkkunjrwuobwc4iclayq93a9c0yfsljb1hoq6',
                pathname: 'pc9gi0kdnnmb660gr1i05xoyn8rnxr7vas2gex4pmdyv8fyz3tdg5tywovk848rdsgm6ofn9vkigj3mxhwns5d394doj58uwjfampt6cbh5tnw75p8nuymgpbp9wui2bemkbhp3wo56kdmekfd0eo3nse9np0lnkg7iyh1bmmsblh00u9yscybihuipa3u2qg3kfpgll9168yqy5r66p8rq8m0oooaeh73e3jqu8rzn2e4mgfflm1899ki4tuy4xtnob53hdpb5wkiioc2grpit0in6cfz9g7yjvvvh674pbdeu0v14z2yjzdmzcejtmh611db19bq55zkeow1yv61l5fpoh9f6svo6l990pad5hokthmpfzu94ymvnbue8usk5m0xgccqkfuy34vl3majcit5ukbysq1253q10xrvi68fstowhn23dpf6cu3uja50kb4uahvw9fugrfwczzmxc7xoxj6k473wyqwkw04w4jvq63bubaoptt7atp3llag3vvgvwoqfjrfxxcvon3ce2bw583iu3q5kkekc899rdl7abrnhyijob04d9532jdw4exr7qfqy4mh273zl8f5pz69ksbtf4otxa73wvhlpfnpnqj92h6xd3i0k19tb013kr0gxynd5e2hp9d26v6j47cwphjjdubi4ru2fgrb4xw0jinvtw5bzwbu89j10z5r93wgstzjkeva1etrueki5vw1oawhgj6uo8ko82pl9lup0ho541lmevxzkme7jv79uflmjt47enngadpze1zo7lju879ephlu08unlmxj7u3453hu68vx58uejjlhig16gw1xvpuot49pdilwfnjqoipbsl27ry1cufqqvkegx7hf2brehvbs3fqfbbgodulejp965g7jq2s014mdr5k5julsfq366ms02oaqyn8yhzm8ee9i1u4xnnf5rr9qfqzt1awlg82bm11ulumbhatcrmog7np2y1be7awrfe6l3zw87gf10mmqz8e0jw3131w',
                filename: 'i9t8c7cupfqj645cruopfzvloh6d84fxzyw844jscbe515h2joqp06pdjtpo2y6jb0vf0umpvcbimdiiml36q5qfs32lexclty8ax9shpe2ioj4k4xy7zzrwwsmfwbofgobqoyoula72j6ntaluk3tq3moau2hbqnzaxyztl8yl0gbdlnc7bga0od8keu29db6r0jo2mgfcj1nitr3ptkw6ds7cpi8gxx0mamz668mu2qidchdcbp3qvdb40ru6',
                url: 'hcxtjjcwh2grfwi6yftext66vxvxuy7fbe8jo0uyhhhij83l2khe3txi409022n3yr7vglsqzh44ohzeaz9ye7ode51jdg6465ey9soc1pdt3vzi6549v9kultwbn3o5h77h8e9f4wre51o5er1344ctesk8am61k7i6v3vit7z0xaaxtd2fuwnz9rkcszivkegeyxw7m9mbaggtb1we0rewttbn140q6o0xtgpm6tvb3g9zi8jygqb0j47gju2eikyzo0erusukha06vdnxekelyt4ykfmsj6ig59f51426m9pekc999re3k8vc4rqdu4582s6h77tit70sph5t584eh4sdkoi3uf3e9qpk4wky54rtn5fwxh5e6kxak122wvkbn94mbj3mxynw7gmskpp07mvpoldqathe3kg10gbb5enj427fs1scuqq7zewan0g0jtzy5zx6fnwlojwuof1yunxzbv2nv7gasfs1ovgc4dgsj72lok53g29olgog9kyypb06542gtdq7lwlam5drkv9qhn9ur4xoq65ubedwgefd5nrbb31xqnc5gk40fdzza92fgjs3mpvo65skh7gf23x6jmu5jr710j4g2pst3n2eiy3lrmmjq7mlrhlwg3kl2pzzgcynalsvlpnhfsu04x5zcz8nw3ofcblw2udpvzyv0azwnc7mhml470ow9jsgs3cro0eckbxtxxpkny19x7k4iw6vh3qxkjyyz8v3m9pnxi4csoii58nalq14vatrn2rgulyp2vxkptpel0z203ktqu2rx7nroue8emns3nz56he71abais7k3ey6iy50ih3qcfdapoo4asz9g5pr0xu2drpp671mtx82hi3vyqfh27jxuwcq1hnnk90v9gpvbedale8yccklpnb0y8rqpp48wbuwcwuwamiysrzjk27hqrbx2oqj9gxu2wchousujorwpl2s5f105msfjuvyvcmsbmrdnbmhu5qmddvn3wpit4cri2jpqhipvttr',
                mime: 'g6t4j6y4e7sx5lakyx3ptnjydvsknda91egxfb4isabp4qm5ke',
                extension: 'szy56lau4zh117vx1631xiqtn0bk5aw3cio2f8xwuqhavxzn0i',
                size: 3032725861,
                width: 603693,
                height: 627200,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-libraries/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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

    test(`/REST:GET admin/attachment-library - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '5b07a617-7698-4a63-a730-9adc1846c005'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fa49a562-9bc9-4c5e-a6eb-98d756365a30'));
    });

    test(`/REST:GET admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/5fa9a300-6010-4031-b11a-ec08f499e39f')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/fa49a562-9bc9-4c5e-a6eb-98d756365a30')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fa49a562-9bc9-4c5e-a6eb-98d756365a30'));
    });

    test(`/REST:GET admin/attachment-libraries`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-library - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '46300970-cae0-4c5e-ab73-b5e6a00df7b0',
                name: 'mfubzp707v9567kqzk4701vs92gl17a4rzphr6im8g0g7jau3375q5qkpk9m7vt0sq6xiecwnjx2904djxl0uk5gcu6njcqibbn6qfbqro3lnziu5zrrt1mqccsmcz2kw1mrxoezi2rxoj471kgcdglhex92putrvvthzfqpmx2b1ra4wosaqr9gpoeh82807ae9mrmvwi1p0e2enrig7lbrf3f5d0qt3k2nj2xe0eahxs37ex6jtrcbp1c7hg6',
                pathname: 'nnfb9kzmvn327xm3re1nijfk03sz7fxrmrl5q19vp1m0mzcpit4qk3dxgiqoqhy8godqj8virynlzd0b7mz0euiw3vluwl4p9wr1wk1shve1y1x8ru32xyhzfv6yetxvk48nddwsxp405ivcfkgvs1kher2bjedfinut0e5u8kmax08a0lxyof3e6llae8h8lvzw35jwrkb852oz356j1xv3n31h9wbbnddaf0l816c5rorpzbl07ejkygp9nao4cm80x8py0nf6rx2rplm8k6g3bzao6x16ki3d8qxos9okcrxk5lbd5p2bwzsr0oq0w9hcz5datfviso1d2fol1tfsyjhjego0rag1oroguycfz3t0he2ekp3oe4sqr6z0y4y4ifw19bwnf3jey46qx646qnnhvx6dfglhvbfe3y4z537rode4j9zz1hw27x0jodo1ztn676oepc3es6hiv1rvdwacsvkrzcn9fjr57um6hi53wrcoc3j119y0ne5dqdqppg9p9dkt3gwkiiqwlw89w0mp18hgha1p5eqg9rm0plv47lmlbeuaek0igaiho651ia8j448sg18p3zb6xhbs4y5wyzaau7ulfxeipmqsprqyg313g9o8qqb97ij0m9dz6tkca9n9ljfa2h5yu47msj15msvz9z60626z42jayro0lsnybrpj96g8m5zuaddu2p1e4feroxc2dd7axohgv2n5a349tvc0um9ctf7du8fytkzy9qanutyji34zvawdk3ge5w03sm9mbmyskksql4k0t3upt47zy1582iqqndvdqeq0pgocl4ogyjjz7iqmase6gexleb018dsuj3eqt46aranwsofljpf62m6kndr0qwnlyou4iezzy923tmlna7bcewi76zll264a2kf4ejr1axrenn2ffjzhxhd3fo38k0xtg4zbtz7f5ide5alxy665ie11x5ry4ig04sfeovncrplvujsfv48hv34e1xusjmgxhjvvm74bv78z',
                filename: 'nwqlimv0vde7qbzvs6y1k9mvw56yxrn5zks6n1e6zs0s3jupao3jxs3tqevkth3tkvgpk0mdrfj3hk1c6eedsckmkfuef5e0vbqhnf0gn4tzpums9owqy8vouncfh7krkieup3en7yfjjnrjb6ptj09oetezf6vwex6zj107irpybfy5mvqtiki2itntb042g7ah87ejqau6gd0cofnq7cjgwrpe6cmif86qmve5z7d5pa35z3lk5lw3hxntbfp',
                url: '1fbmwj8rwgnntls7x6i8wbfidf6u4cx9qi1nq048ipcz5nj9yh6hhvipdkz38mjvbcbrs4xhkr0xwr42489cdphsssmlea0e5yctn09mxfnzas5wfrscdts4j9h968nhxjpn10wtetakc2052w3smv07v9zrzs4iq5dcsdsr7jmc81f44amz577ujmqf8vpso0q8hy70uairdxswnm7e2nd1dztj7fxc17oxmqiukuc0ya8g2k3s0okph8uiah9zk20iq68vl4n12xmtly7t3h9j3ra3rfoj73b9f8sdopcdpu4vusanhdh96fb7g9bnozrbjz34s30d26sj2jv5hnuyfky1ur3elkwvkr28x9c87wojoh8b68w4ec3ecwutq3glyt9tw4avxdk98h28si3tvmjmdc42uk6vt9ddz4pykjmhr0aq6hx7xo52puzrvmcqykzpj0qzofhni2z2plz2ssjsjtc6wd4spx8la3dgvwvh9o1jc9cnce43glen53c2ot9332fttm0vpbndca2a42tsvlmr3dpw1hicmx9d92a3vq2i8fzg4bukeqorxfsvwkc26kjc01h8ni8yunzret6t1i0grpb7t0fa6207rcw0i37dedy5xgs75fpofprvbfrpgwe0bqpb85r9ap9z5g8e5lz24e09y2dh604jom3ppzp1fqg2t496csa9l580ufp4git86ggquyr78ckf7djynriziudjtpwp0y4vehrkwrwin658ex073eg53dha8r69oi2ybvqt7giq3b9stnr23ee9utx1kgghff5xpjdlwxvoe354wpnk2osvcko75fihg1pb13avfd5w2vo8pjm2ligsk9reui17whx8ixzmdkjqye1lqj1wo1a4o10kxcs6ho1vx3zz13f50s0irui88c1497hulb4gul7b6vgm2iju3cc31aar2mj87w9czfsbtpcgimyafc6pfq56zt8dau7he8extp9d5dbxpbii9z5i0c2go6coa5bx',
                mime: 'e30aei2w5x9nj5uxuvz8ij2akl4fok4ij4x8o305ajy1enm8vk',
                extension: 'gqpytdqatfno7pzux68ujgdc2bgtwfcmyhdbnrmvxjzxchuuny',
                size: 5599490208,
                width: 603746,
                height: 283954,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                name: 'lha3ecrjan2z1bpk0cd467evdprev8kqmctslswg9rdd81skv5fjh3c3xgv7o9rqqfhqggd6agpkp36h46lapwkmme44kgg33zeomeaz3xjckxpif1pben45oysjpwge6fjzlloyuhz9yopixvx2sezzuklps3c3kp8ljrgxezhoxcxr9mhjy9qjy0hx43xfbz8kk1pbejtghuz4qt6oref7w0b28ssby2emtpcwyssu6nq3tdo2g65r2y3a5lu',
                pathname: '5p67r6gq1wpmauzvg0tssu1almsemauupsbfklklg7x2mmny3ij6hvku2sb6fznt0yrjdzhzj88mumq4046jrs9djma41a7a9zkpem60125bl5pqimkicw9shc2rmpzluqkgyhqhlw7om7xifvahcpv7aa752kxfu6mrphpf6ai59lb32b54cqscjskuzd4ruq114xwkp88235f2ze8itm1pbl8zg411iopn61eabn39hyte5vo77whhacztk449vu8aw0ww9j4n79i8wk09nkvyamn6hihe0qlkve1dxaipe2vih6f88pkbjlzjsv9nj9itlphj40hg6zqiq2f3krzemb1wt18s7toq52ipmv1t43xnwgv17r29w4hxc3qhyx2ln5kwd291q4l8imzy3teobr1jwbnxby9a72ws12i3kwd4fiulm7qzasytgamp3ylbflvptz814jltgvx49jh4t1g9uqvabjhb1w7srl7zlx01tn17nmekhiwa3hjtw7hsojtfwre73srthdw3ietbwi2c27pfqi8o4ioodr9vupk22bvwf6y5ogilmlkwkk9kkh19xbe7u7em5q06ggdfq29okb7ir2fdvqlhz6b45yhj8b706rdx8fljovxt3u8j7pku3iyaint7227acybt9c41l7gkgbq21uhri24y52ty34uv4x9zqha7ufz1ahg2izadml9tmh4od990yv4qtcid4lmxnos9gpug5fkv725wjqiqyqgij5e2yqgntsbzm7bzyiove5mxegx1c28emt73e6rmzz8grje7yjn9kdbeynjpfxiz46g9g24y68tf3yb37impsn21uu7myop7piwcrrn55ea4cy7bsu461z8c50dnxw9zkaupmlwd1yrv93y6tmiglaxyrgphh090mhubb95iw14zf34hxixdg0pwtb9g23hjjxs6p6ckuc9pk0mv4nwvv5auhlobjlgpp47f7001v5kfotpx4yffs9yqz0owkxae8qqdnoos',
                filename: '6od3m357qrculwk47cgtcjbkzzpermwnmwfbpyrpc05h8dkdc40wvtn1pkvvkmwypqm2yaznhrk500gvrxrt3rflxr16ayasdpnoslys7ty9d6bhf8z09bjnbtsz36wfp81frpd3p9rlocacmhp310bf65u9i5lbvmfbbqub79z9t0h20odjyq3ttxdwqd2xjekeei3qi801ihpgztf34rkw9i0430kjg68p8hr73mwq9elln73ure38kqmolzj',
                url: 'ylp9fshye90zq3x07xiacv2b93dc67rpbuf9aqyi6of9re6agzk0n2o2e4o2mdmpjbfp2m4uswuhli6oxy9p1kkftaqn884s8j7pa9eukg2zrp9m689zfxc42nstxmhptj9b2ewq701bro7xmi5nluje7ui8nuxgmz1c0xp4pig2mu21ahksmpjmccdob0hgrp2547vlamf63l39xw1c93lyafmnqo56epjvya3uw22llhsz2mxw8b9i8704w0w9l14wma1z9ofte43gbes4umo64ortrk6cu0nzrw1alfqd5zwyyhwsb591yeh568bpsf56an8nbw3srsptb592te7otxd32k4q4rz447j0uuwujcfqxz8om0cthxwqcb0ghhw24gdzgz1i0mw0bpw8k21lzokuz0cd2v7zj3oytas7e062kfdhihoj91ckdov9a0huah68i6ysp01n0knmffk6ifwuzdeheejqjrgsgykqpt1mvu38w4d8j86n6lk4x6y25duwna28v4dfdnfy39zgn5qpk9xgo9nosw3ggy7xsa53mfu4yo78yw6s2rt68w0snpoa2572lf8pl569myubball85daa7zolp37i6n29760u773b1xd2s1ou17hi21ppqbq7z36hi37f1x0gj39m67kvbakxex7ib6nyda0m4p6j97313kiu1q9d6gqjjfreavkyjehih8po8tzphrco6q2qc0nf393cjvf2z1wp2sjotn41pta2l4jz0loxawjtogm49z8zx3fty5k831hh9cwwgq24y02oc2p6i0mxyda8bjnitrufzjdf89mjia7rfdxf4evrmi1nj9dg0wnldxpp3d3efquiv00cxdk2qc0af0zipaiaf88ku3ropm5c0oyxrss5a2zpcna2rockojz7d6iryyxsuv3801fpgyiggsi9amsi8h2rq5xc8fv8bqy1zmhrc3iagvv4mw50bnyzkr7f5epdoupiaprgp2c4mttgdgepnr3upva',
                mime: 'h3fippu0tqmw0qoq6g6mv3p3oeiq7hc89ye75ilct2296fler4',
                extension: 'a9kjmie81luhbs8gh8boujn11raub08j22dk1fpy3nuijvld9m',
                size: 6042928676,
                width: 555477,
                height: 623819,
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fa49a562-9bc9-4c5e-a6eb-98d756365a30'));
    });

    test(`/REST:DELETE admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/9af1fe85-f17a-4f70-a36f-8313384bdad9')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/fa49a562-9bc9-4c5e-a6eb-98d756365a30')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentLibrary - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
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

    test(`/GraphQL adminCreateAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '3995fb01-e4f9-4a31-a9db-8a89070ad7e4',
                        name: 'pyqqxmpqas8edhmoi2zz7f7uv6wf2074knyx2kvoqxkpdgdf65mcnwvx243njs9t9uas4d24m898oqhb55ug5s0de7yunfh8sh1sscdiihax3q9yf2wgq354fcdha4ttjo4vxpq8w0hvoen7npw5c3j1qjl52hl4j35zf5jzntnj5mbq51jbv55ls005mdm7z1i7ht1avzpfku583dtc4p3ed3lvvxhotfugzs8ozj9k993ils2tw36h4r4hh84',
                        pathname: 'b0zkzo9dhxz99p4p3a6bxwo14aqpxh1tk0tizzb94r5qp5pp5r644zoq0n37l45ktsjnsa07n2joij7qiwcw33uxc9p7jfgatos6fh2br0xehio6mpyi6cg7rdjxel59q9ot2u0nreeimktpldf6gigjlmp354y30e0akq6ge04sas1zgsiebk3tfxtt3fz0ufikoueqkhwlih5skb0iydwlumtr0hrj89ru9mwg5g93edcbqcdxfge92fq9l5e2cqe0l5dqx7lpu45nkb002jhcehyrgz642lbfn610z7f66bf28yhsi9cu7m783c6idxq3d8mgljz94gx8dg0tnc8kx7hs08lryw4sl5fy6bdtkxdzeahppf5qcfyrahg5v8jtz42cndkdq0dpj72mv3mcz48m77daymub4gvkcqpcgh240of32pa51xgnjdrswurw5xr2z7v7v832gcd1g5037iq75uqzprekkzwdfovhmicunwbzx4w32wud21fsklf72gh1g4hp9qqh3hw0bbabesjmzp13c72p1mcdls0nk8n9zxeeonc5t599xr4rj3rbu6ak100x1mqnq4mwju0obrwylgsbatx42e7yj79wwlofmjvejh1l9j5gapdutkv66ihzw01ab8hb3kt087knuq3wdm7958gry02s90ia2u0uv77453f9178e8e7vmmnm9uhkt90dkc48dz5vsozopqntqllnq91fkea0vql4vj8svjojxebfc84ldofajq0ns4izuxt75h24sdgle8l7hhxto7t1wv8ncmf43we7vxphgcgb63aqkyy3vwzim82k2baui69r73ret7xoxowm4bjnt9tfx3zxgohu3w5zy4fll6syy9cs4yfgf6lsdlxi21f9tdgbwipw6yeuozt52cenpdl9i9grmjccess63zh0lttqxl0lhwgvdb0jbnhddom123b9ddvp5r0p31ihkt3hyj6ffexoiuv6d5jg29saqz5mto696b6gz4a2',
                        filename: 'b93zhyv82p6zp2wc2h5f72zwutgueqagmetw5apnxskcqud56bx3wczwgwz1qdflq8wwlfq7bhrqrg2cuwrhvwnvmgunm9sumgar5ezt31gp9vql8in8ld9x3yxx0jchkp23bqsc50pqvbf85xfphfywamm266tumi411dci5zczt1xvsvxnajwx96y5gocagtvrawadn1j162rucdzu31m9qtjvb8ecld8fzmvz5opex2z4q9ux1hckejsdn9f',
                        url: 'z6lycrpfb3u2f57mza856dyk13emwvqbz8mldl2admakn26aj0qvknapintutvtc3dl2jl01ytfe5cls08tnu0lswtdu7nae8cnrbasjc9zwbpkn9pmldnwmbwvd8xkyvub1qgkiu9g0y3ydp52evqnc095srjx6o9jr6he1ts6j4wjf314m75fq2ku0y0jjn125bmc6y6txaki9et4o4aereedzmqhev51ffem2bib4qzhryqg6s5dgxcaoa54jgk40cal7jehsl3jjkxzxh0z4tk9ih8vzvjsb7c0who5d3pz2e57a360hb6its5vu94qtb4nek9y477c1px274n8o8gi40jgjmzwpjil7rcrtr4zhqk93o490tiwbcqym9aalctxcsjo06ksmcxi352uujxpwcq8v86htey86rne8av868koxz7ou5emg8dgga9ygnknenwa1xrmddqehjsg82exu7h932zo9wo42pdivwll2btdfcekygjrmb9t40bkqxlg5iea2tqpxtn9uwfoco84352qdi825fu48yakes1p2crnrmdhdc47nlvjy9afmyts2t39xf7auarof5xee8efukh9xouegzo7gabmf1nwene9okvanngxxfegklqljbojq09mv5c9scv8hmxhhwxpokl21x9prldkmcrwp87f8e5qj7yha4myidaraqqasolcurrn0tudxxzj0l7z88e5fy6w70v1l9sc71g0h3j4jcunbvalgpgxe1116091y8n5q18o8s5owtgj98hq791svuk36p3kpeez62txo87a8xpdw6qliw99pv08deu8ht1x0fttm5tx64hush9rcmcedo8l6470f2vauei99v48nzthsqg3985juxtvz1ywi1qassv3hx15ydi6h9lhbjewsirk51f53entrfam9dc0nd86y4rov7jcqroi00bh30r2k2oth3f9zlpgv59bixgw14gb4oq6o5t1su3u08e2x0uzuwb1m29v7ykq7',
                        mime: 'ftymv24kh4x4yixc5pab2k4fdxj78ccgemdhpu4ecnmrvc1pee',
                        extension: 't2sl25po37o3336hihh93zcetlsmzqy3r5dyalz1o25ajb66aq',
                        size: 1323852180,
                        width: 468681,
                        height: 131322,
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentLibrary).toHaveProperty('id', '3995fb01-e4f9-4a31-a9db-8a89070ad7e4');
            });
    });

    test(`/GraphQL adminPaginateAttachmentLibraries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentLibraries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentLibraries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentLibrary - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: '21f86aac-4e53-4c00-af60-6d4cebe34770'
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

    test(`/GraphQL adminFindAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibrary.id).toStrictEqual('fa49a562-9bc9-4c5e-a6eb-98d756365a30');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '07814068-ab7d-4023-b088-d2a37ae1263f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibraryById.id).toStrictEqual('fa49a562-9bc9-4c5e-a6eb-98d756365a30');
            });
    });

    test(`/GraphQL adminGetAttachmentLibraries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentLibraries (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                for (const [index, value] of res.body.data.adminGetAttachmentLibraries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentLibrary - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '652f20cc-7c4f-49c4-9f35-ca6356e39433',
                        name: '76iszsyudycshrtqyd3tn43atto10r88ob8zpcgiauw4fk8qir8ym2xmw4txnicsbgw457i2786o8820wfeltgpboxxrvdkxzim26ohgyaegmxihi0hf50pv0trlsra6uq8y3c3tc3p21cksn45exp3iburh9qyhzjd02ojfe3tf6yz862y8znf5spm1cegdztm0jlsti8n9xj8k3ge5hg2pq2ele3418w07qstqhe4v25gkoyx0jnigq9sibme',
                        pathname: 'q2xwzcuo3hz0iwewawiqrsnm1gg3b5ishfhgo0ncv06ghtvoezylr3x6cdohiwq3c6m84fp3mafyac0jyua7g4rt4spfmti8hmr91vosw1tvao65472qdn6hkzrexsu8htsfzz6an8de1wnx0xfiwxflorp7u79q9lf1iodet45lyylf4x1rv0utzo256z4ugrph40ekoye7o3bl6sfbujz0abtemyrwkf6nba0eaii90w4aymbxj9hgryfrfcckk2yfgduqas94y5tayl5osnm1901vss230fkojeahiz6wkz6og0xneqqmbu4npipmkjk7ikbtamn4y8lcr4cc46gc551rzpn2ckuyxydtlh43ziyxcvr8r5fwmcv6tt28dvecntaapgy28ek3tqhehx9ilqpgi8vifj10vwos5gx52uh89k48jdy2jwio04ylorvag0q5mkhumszvup0pzsrn9xr4ouhfqadz0x62ybxo2rrp094o1bqbtqn0zebmy6fkdr5ynaq2gorpyhqowd3r79876r947cwrcij11xwyvtjx0v1eaj0t6gwv5eycqgfio8yo8czl3df91pcangnfrd59j25gk1n3fcxzp3jtg9ep4xo0yur28mnp15q332fspzf9sv7g06b4nj4un2s1xnjn99bhtrplt7qnx7ttki1q91ywyurxe2rjkdc3yk3xbvssm1sdlcw22o3u9459gxan54mhyulnke4htuyspf73o7otyrxqfkaoq0glzu393fc9avta0q7pbbmtcvg9cnezckqgcc2wi84qewcoi2lg0scdxvzqwlj1qgo5j49u7x9epj8hfkfn82rdi3llhjuiold0u2rutow8j6ik9q6sjyfnw1pq0cz4im63i1sdvvpkkni1lozqijz2e4zzwzh58tn7jkkajxoek51yf5f8p8au26sh7kgw1cxhb5s848vt0s21pylsa43xcme47iikvzvb7rjfcb3385or7ipvlh4ocwnxfdgi51i9',
                        filename: 'oatr61w17haad9iphtq7acsrxdi1u5vjwjhziqqkxgs9ood9phynoxfa8uwkn75p2vz7d7fm65eidiz54snqrbzhwimgih4tcx58pn4iugqsn4tjscokxe5cncj8fmyetfyva956rak8jeivicg4ye14z87d368z7xqx7pyc9jchsyt1vxu4u6w1wvyc57k6bmmhwlc5fds1m2sdil7tu2ar47r1pl2w7t6shdm3jqfs9ftmp14xlpfksdegqus',
                        url: 'vx10smx95wqjqb2gxzm051bdekbei8gneljerwknb3u70nl3lyzj2suk8xie3u6bz62rwyuw449mmoss9u916b7xjt2jthnnkdb3l0m7rl6m0mnlm2sxus7sa4ijmsinp1tqhc120pwde9qxj52498w12kb7wqv04tgbvzb36fksle7jgjoedjaxqipnpwtynrcqgwjghjwbr9qr9zwvk5rbbc261c17dv2wac9rbrkcv9p9ikepde0gtpq80999du914jzp0zeah1kkwgiev7udduqftyicc38yi8f4mpiy5x37pkxtwvnpbutjaplixsgs5zq9be32mp02atx4zdmaz3n2epdh5ql2ywdgz4ow3viol07qydnhddh2tjucqb94xezve0fj4zpoeqedjeqazn5qhdwdpbxcivkwx2v98sk08pnhbdktaq68oh81gqq78h8tzmrrffvfy64th8zv76kal94vmm1j524kknq0dggts5td4318abuhfj9oenxs2pm6ceduiyvky0phn78ym2m6ty0534ssl0612guksunwv7krqz01pm1056te0q1fdsdwfol15gfxfmdi58cfls6qn0gi8kxaetfu80xz5w1afqopexopz53q9du4xoxk4wixtj3gmc1482nv1jua7bzoq1nomd6f4g7u53fvnb5q83r3w29aj4cqlti8d08qjy89iz8pvu8iope66rueb8ow3gosvsq77vn5ci6trbllf6hbfxn94etpvuje4471ctdzaj5ksvhkbnp7nhexkik21yai7yjlcbavlioapdaw8t9e57zim0o2aeuy8s5jmj3otwolhnlyvbnyah1rblp837ggemnxdmqgjhzdwpaa5gr7kqqa3ovzrlgxz0hdcl8uhdos8k8i3cmcqskypjcu54z1rerlfbr1eehjq4ueq05enckh7grvlebmjkgyf97x1e6fc5bhrl7k2ih0h7li92mabe1a732mjp3k1vvrfpx80kocv3s80xj0',
                        mime: 'pv36pe5nmue2bdrcp939o5q6ixrmqvwh4uw433mixkbtogw08k',
                        extension: 'b4lwt7e7tsuriv66hws9flu7g7ivh266ehrv52mf15ckioasvb',
                        size: 9375065206,
                        width: 312390,
                        height: 908218,
                        data: { &quot;foo&quot; : &quot;bar&quot; },
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

    test(`/GraphQL adminUpdateAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30',
                        name: '0woyfsyyr5v0fzufszj4jjfneno4uc4xw918cc9ifeutr23kkoa5cdjb8pngmpdajn381e50vqsqlklvbcgd23bpikeh4telwbodbfypb2n98qawu2la388rigfihj9bv6ur50ztzo2crjo2zfpojwms66qobow9t9n9lamla1ehpn8bbseyik4n5ihdqdfp217udniliynxv5z41cdojdpqkzlae7v48kd3e9w0dvmxn8bbpih8skksoy9u90f',
                        pathname: 'gc1ob6ox9g7oak13adbm2ny5ra5a0aygn7vzt8jgc406xnmyvlq4avyo1atif5eqnhnrczraus36iecaz3w5nkq2ohsxc6qim22qbv4m1bztkavfcuvelzvtlqncm9p4i9i4z8m1jfmzqu97t7t5ocknxf2v4trwaqcnoihsdsaboyoej3mpi6i8o1mofe4jsas63hi4nwqd9fq7nxtpo9s5kq5f97lcwhvbfu0frop41xml4uslebuq4hglikljhf65fkkf0o9hhe858zqaugkkiu21offaka8hfz86ewzkjvzeo5j067277bnbzklafjkdzfj8x96rq82yw9eeugzpdynddayx5l9xbzfjk0x6mfokfwckek5gi8lydccg8w3jz0k6ol8d65by2wdk36z0nbqbafbpgnnaj6ur5abigbajuzjmsuct6rnayayey1z1yb2f62isj8yjw0eux9qqpi7y8f1ewce5d2kawbbxjws94qs4bhpgsqrfssfgqdr1hobmar7u5cvyxo2q6bpsgqm9ex1cpurabq8nvoq76xgh6r4tnjcrtiqyepnv6lkgzm7tqpdqyesk3rlousxorfhh2kr6d3dqiho6mut3s96elu46s7bfux8pqjhm6hliti4mccwy5brv8jmhbin8hruu653tlm24rk6p97mt4ped39qai2zgyz7ts57tqs655tf3c8vv498euvar6vabr3s2hedkofwd1a7l22bc1b2gg91bcb4w9kzsbut8ugey2l44n7xw1wjhfevku63zzxwih5ju7k6uvyztenisirl03ment0zb2pvvi55pjxnnza566d0pme8bme1ygag7e0c9qd5adifmf1iumwb2fn5jjjr84ropmkjg9e3t3m35rs4yb0oh6l6eys3kxn1suwu4du7lvanbne6tmm6aqckkv5p57aes8fhyq20zketgu2o5onktnoeuflspc0zufd80lqciwiov33sj9agbt88olpfi421e9dmwlpfp',
                        filename: '1dlk9bah7255k7nih9iqrinc43s7t6gop9nuzo14mfcsi0rnpuhugmt3clm1om2rrt1qxqt15rtuxnigvlbg2my0itd33measnw3139grshe8zl2hs8g650fe3o3yf6huie9rh1qdizdo5gj53fdw52kewvzq42k68ym2qulpzh6qw4ek6gd79cqqmle2pn0gqb8rpcd8bvwtl4e91l9yc6jyx3sfikcczqsmqyq95fvnn3q3iiahtjo5og1lwp',
                        url: '3ycldmgmolfsnc7y76kbhequv9dndc2fqqfzxsowszpi3vomcnvmkwi8c92t1ttk5w1a01ttfwghjjwxx2wh3b0epnhup48aq12vfkckxsx9khqoxw4ftjgrnp3nv7xh1iao6fs05646n86ym8pzmjjhcx3sjlo1nhk2msb4say73dfger8aqers7i10063a7luifoaamom2c2nqxhp2teht1wyffo3y30scz040lqv1uvnu6ac6u3be2xixfle2srth6gx4ptx03047x3i0wjtrs64qyzo2ton8irbq4ogznch4olcilzqx218vtx1kzaa1vsi5uy9ehcbdjx98pqiak868lxo03dt7uwkdmuv34hd0cyo50gzksvzxbsvhv0hg81vd21mvhzkssnsace859fgkju5gyku08u6v0l6g9tuxcbsetxz67cfrpkf5sr59h0zsvinl43v8m7t1tm6ki1u0lv5znpl0ftbeimlm3e0yfthpy7q8i7n4t7tjnofc8eqbie47950c4prak3hijrmveznxms4uo13jx6zx6ob1myygg7sbqvqejxwirtao7xkibzoimn1h9yqy4k5ewwtity6o7hc4qy51jq1r9tlfc5mxs5ubnowv3jh7yar4jwd3ptr9twmznk2mdwxu2ksom3drev68sml91o0asflvjqmekmoyr95qiuui131l0jq1x1jhrev990f6ngfo34kudyii4iaalqg1064yvkb33khpcwe7auy7csu74p7326bhjwo44jdlxabucbqw0tng4cuvenqn9j3xpnucj59t8c9hxh495qny9locezq86bgxlvj097m089f96hu2ldsp3pgdmb5mc5n2elerqcr1y8lo0q7af25vtfif0zk0yp1nw9gq8ry9thsjsnaumke2jw9re64tj3eargw0fudlba1299it2gc5apu8cbc82q9q3i6vysib1gssywfuyuym5v1tae4mw4bl3912qoeefme958p4pl5xm7i7',
                        mime: '4xrcnpkqganlr8c2pf0qtx712uzuqfza45r6t76fzhqd62zc44',
                        extension: 'ks1lu6dndrd7323t5q7y4cdq5ihdu84p52vct1iac7usl4zbdy',
                        size: 8461046157,
                        width: 189757,
                        height: 622913,
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentLibrary.id).toStrictEqual('fa49a562-9bc9-4c5e-a6eb-98d756365a30');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9ac145cf-7159-43c0-9004-77eb750d39a9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fa49a562-9bc9-4c5e-a6eb-98d756365a30'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentLibraryById.id).toStrictEqual('fa49a562-9bc9-4c5e-a6eb-98d756365a30');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});