import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
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

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;
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
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'nh1axvj64bj5i43n9zggm6fday458onruahsxfh8tawjcje5ellqdzaukbffco3itimhp06a7ue',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 192730,
                alt: 'q8jad2wx27vzjxwma0ci8llecgrh5te9e96b9zkl8i8e3qwc7c78tky5r0rswo0ff3vmq61p15z788luw4hrddxlefn8obycgj2ydsvmcmc98604jvqe6iv3ouqlosiivm0cgti36xwhzfn5bm9fdlsgcg1np2wn9c1iojuv33wbup2vv6227n9aq27pmpa6x9qnk8von1cu3c6l75xw6oyrd3s7xphifi0fr7vbtpwl7t5gyrjq3mtwz7i2um8',
                title: 'xw5pat87j45npfwg18faaqq42vllh90qvfa6ma4sajuwwqapwunl3rz6feqnibztw23ezv3bdrkxjdl37w8l43vhdd5shujqhs4jc7ghdlzq5j7pbi4dujtvi78gkdf111s4u5shsay0wv8vv8olowkxi8jwgn4p2udnqh4anor09gm6g6whbhhvsckap3kbwqptwtge5kv8ce9s5cp3mcnx687msigtmr79e533rbkspkwnz27sd1391rzukvz',
                description: 'Incidunt voluptatem nihil. Dolores perferendis laboriosam est ab. Debitis doloribus non aut est sequi. Tempora nihil aut alias magni voluptatem modi maxime.',
                excerpt: 'Enim cupiditate quia. Enim saepe aut incidunt quisquam minus eius incidunt sit minus. Culpa illum hic omnis eligendi quibusdam laudantium enim vel.',
                name: '8jhxu3t5bkwx30xhhfkkrsifcjfn1gzim8c5gol1uawy67dhmfava6nnx6xoysm1hqngd68r42h6163ws655ujs7nflljwe78m7dyhua7ajo70x4o9w3t72ue56usdo34xviuanhp53gk6uq1plhr0t0p2pdr831mkx7g74gtge3xt1wyjngak2crwp5z5a348zypikx0bo51lu1lndj17b5dnjqxqhw4bfxx7weu5l7ymsa179l8e0qr49hy7i',
                pathname: '7b0fzik7hf3j3avf0v6yluvmd1mj8e5blcorplv3w4mver1nhi05ue2bq4wtpkq1mb4mwq8tcj1kwc703klc68pqak4n26jhcl55dyd06onzsi7yqs2um3hadaopsrurgz6taxxe2e9ha2r7xxkvhwy2sa6qhg1mn22ww9k4f9ohkvjc8oksqyf9x7c0u4d0z4pgrdfujfpbhfeau8g9urp4tzoqmodwtkoixu5zc43j7phtls2zv1rbg3ce596iid1yhi8ewb2zxp65gai7jr2nhhekjskg7q56e94eedn3ovn8nw6a5rqllp7o3yb1ymxalwbmukm7aho3stybvnqrmq26k0h1p0egocnhldx423yt1lg2z0n3cw8mc273vcwuuwejcgl0m6njs9irwarwhmnn9nguq8pbee20d7h8law5tnzbfrqvn94hn95ex580eu83oaqixuf4v7sc85si3l7m5csmxldffz9ete5qkr23i0ne320geubky7flkszvfcpp0ca0wkcqin7rdpholnqhaj0zyxoh96c0mofjrc67xf3s26g5wulw57bnef528e0gprtx4gnqv9f5jhgnyb4xuaqp8ktg5c4fzx19biaivqc7660502akatijzci2qfedahmue8ku7diz13lt9jf7vje59qzbidm26p584aktzjqhdt634ta6cfcwa47kleiu2k7jxl3hr0uq8k8h7udmwyt76m755x2ilcnit8by0nzduq64uyfw2mkoavqjtcziuousddwxdp07gdkyv2ezsreyt3oxam9folerbw2mc9d72lvdj9jl3qb0bbnu2l0fygvp92bdx666nrnapmr5i8u4h19vh0yefssvhq6xm0xk3liedcmwon1a5crft7eo65jvyrvqvptibmn7ez64vmns5i2rx6xmw61zfnf9sipzd0beqmwfhrvz0m8sunkksbk2yt3p2w4cfxw61bs2bnxtncaidyge57bkeqrlftvg0hj3agntjaic',
                filename: 'n3b1dwtgzvlw5k3kx0qd5h4jogcm1adjgw7wxqjiuxxv1pv5vaen9ag4im8iy7smzwy74rgeb79j89wow2pbwz0b431qjdt0lp4virw659l77bk92nj1ik6uzx1b5x20z5udte6l6yfcrhvtpfozywsgfylwal0k7pkwa1zcn8ym9x8ehctvy9tu3f8m76oepqd58ywz2tbq8w3rolntg87og2j9ahhb2m517s5g0er5nvhr1xl07v6liqr1gzj',
                url: '8dwv33xd4frnhd52nnrft3e3am9uxwuy03cj71taf5ssvgctq52x0c1rj7ato53nptp4jfmwbvixqrjc5metseok06bol1acbcau51jypklc0mw9u24udu2spjrord4v7y1c8xigpew5wkp8egae3ujpgme3dc16ao629tz25kn2ihymoexvr1e2wv70ck25g5fr3w7efdnn2mhkfkzwbu0hnjwcx9lanntpqwya0u2zgfdo4mcgxs4ofc16pfxlcz7up1h9g0grg8w8ttizfbpfx53py7sqfketcy86y35tu75jmfhoilvdtlqg7a35pn4vkbgb2ae7schl8acoxdjl28impml0mvc6ib18orvv3l94z4021tccyo4rztlqi8c9479tut2kfzxfnij0kmcivubf0vmgv9rio4u3pj8v2uwyfl2iay0fw784hespn97o3hjr15pum4lxwpbgi538m6chvswg82gemsr4o4i7bserxr76zadaunypb5tawfipdoyfukqts4xzu1lpgmlurjoej6txizky8mzx42cinslzyz50z0iekvedpls2100i8m0yskyigoz53ipl7i9a9e3fe0sc7d67khczgnkmyabzvc41wsgrlwnc0oifpo65g7m4zfndj326j967sfew3xua1uk2nzad7rfc8q4u26vmhwsxmufd8vd8r4lu3yiivg8frn91oybvngdxyffmtfwfxltdhi80otoz9gsdv5ny8k8sns68afef34kgpm1zn9w42lf6uv6kfy4ksjlrjobzc19bieukj42h6fr53a2rnbll8auac6tgcbdncz7bp4tr2s1eq6ydpaed2pqruuwplkp9l98lgizp42ajtf6tky32h6hhd2cart9alnokb0c685cndwbup7vy40235ppl202q2x9bsg3znhw7bmt0g5dvwnx6yed7ja2yz3uaywfk94rt7vjm24bl5docpm4g2u2bc12knluj3zsuky2zpyjsmwqwos2m0rpg',
                mime: 'jx49hpd75zw29f3vyr2didv976kfo0z7q3m6r34h9avnryp7md',
                extension: '38rb8ejjhlqcqi7fbnl0umnml8mduubv0k9vzr137cnksbywpx',
                size: 8864196777,
                width: 199627,
                height: 457222,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'rms1k6mqvk0qubcbd83oisaixz4qva6vxkzkw48xdnxnmphay6bdf1b617s33fpp8einzzhcd69gqaiaqbyvke5xio5zozlyp9hjs5grq176dkhpkfu989mgfgkfae987zknva94p9jx7nxqmpwkb828og4g5n5fsw39pyixa3ms81nxxl8iwdezkhgpx8lv9xcjakzk750wtvi813wcp3p5svl032p1a9diavx2q8c0ni2leixm3dlz6yy9u4p',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: null,
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'hikcqronqarg3d0umayztp2q7lauyejgrv2jfmnnwpnk3uryz8xyy0z6iq2r6ko8kph6w4szxr8',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 159610,
                alt: 'xoo1q1gy83iel3f6v59crsqtcmb8sw31jgv5v16fatk8gp8wir1kd25h8qytzdpn8vhwugbrzapu5lwomp7ivq3n1298nc81fp4xamd2tgdfvjlzvavzff3m2rxejwltcq67p45tt701ypsncxdlf0voohluyqdcg7kc622waqbzvfmd638fj5n7wjskrpahtiwwfacig1z81spl16kshjyf7ef9eutbtn4jxtiphc0cvaj0rdmxpg7ho60puon',
                title: 'npvd5hd6c04b9dr9qy3yo4c8eyht0e3dl3ces5coakn2794hv5pemfzzbpxkx7er3ldm7i4a6z6iu65l6fez9pca1i8cafv718096h0uc8x2x2njlxmlqnfjthn3wrpitw15x5ujnzr5twro33tism97ja6x78sh0unse4d1umk6zb6lhci7vki7j7pi5knj5bkzsoay7xny8nkb9jfh4hsgl6yvts86vc12euxq8d9mwlc6vagqx33vtdwua12',
                description: 'Autem modi rem alias laborum eveniet veritatis impedit aspernatur. Suscipit magni aut sit ex odio aperiam ad. Aliquam magnam eaque.',
                excerpt: 'Dignissimos nostrum laudantium. Quas minus porro accusamus ut error dolorem asperiores. Ut consequatur veniam aliquid voluptates omnis.',
                name: 'wo9ki9lizeffpqm9ivxcs838dm9dh4kt25h60f8swohmpqsqnsnpkchkwkxl2a3gs9ikhshk4u18z9duutis2546rtnwbspiun5qidi1w4qtlqmvpr579qiftk3zkcnpmico8irmqnkcxlrk8x46jm27yq5erwxzlfbruuqs4ztvgqb24l3652hs9fjufbn7uko4dmf6d96b4e8rra6d411iqqynjuu4kolvcxpz3ps4ycagto3fumhbi11yq6j',
                pathname: 'evqa9hsd6ks0u56xmddpzmluy5cr38d4q53m9mmf64sktdede4jon3g4auyccuv7hmz4cnxsk31edz8d32q1shcxv6s9ewuxmpk98mtni22wuskplfkdhbcrnm0f123bsivbmysz8p09al43k52g67cdevlx5rz16zv0iwonjeecv9r2jj8bnbm5kis79sf00ahp0c6nbuwqnx2jmpqzemgl32urkn62nj8zuo02m6dffs4qxxz1ub4t4dw8fak50k9enw0d56tm3tmfkkw6uwqy3escnlq836fvf6jen0sqnj7e1bn4wqe3tjk9ijt2t6p9w5a44p0n7sl0s8urzwtp15od1dyni0ii19xi9mdjoo8ibicse4cvpag3qqltewex5vrrs1xcu67rjp1iij545h9w6n9f1y4bbren987amv3hasvryctwp0bu9l0f6lnvhrk3snxgt32ur9s071arn3pxw7y916r1sbdeanrg4f3dnc52lt8yyuk4bfx0m6z8zssgqm0ricn8kqtt13exul0ydlgev98ujgde71gwe611ywxvceycg6oeoj0ahbjq865t0zlo3zq86ccvfl4jz79j2ozn84j3x5fs5flu0zmrg7btrmaqrnlaghek5hbh2wub5i082cgn9o14c457xhdj0j155qewx8p2r7a3liptcpnx0lc60xqejcxaorepcntq4i1cqi7fd0b4sz1l7u51ggt8j7bgabr9uqg6cmptmpjdioz7m7nemvlgmek86ikj9pgcglxjdu3v3h40v0v1gln609blu0ln9qcoays59xzdh2e68l1nuxy6b54xq3uza38nieldvwtqbt2003u6wyrc2bojwg4kc0ky6hjaqbwn3h0zuzvqxm8zeppssddmlp9x3u9c6n8msxcqh7o70y229h4hwvl8t44054tkvkcel8kwujhbtpc6qd7p8lq07xw7rg0ahwzzmfi7wah9a55ojvqvl6g4zp7lyl5jbfi0fg7vnfifmupg',
                filename: '34xkitli14w7q6pgo26qbff77nvk8cjrhuiveysq3kw9jwibgxmna6z9ieyumeny57cgprtoxeb25mmbfpg2muifgtbsqhoiha8hckbb0trpp1xwne2cihzlac2fyhp3dy43x1wt06fbffobc2kkr87v9t267sw55w5g6q152l4pt5ipt94kb8nf3aeyvt4ue9196hoa1ptnhrc2cn4hguotwgrx0ye0bwdo1f13rcu0g4fzl4da7ub0lqgqy2r',
                url: '5236uoivinay4bgcvicnhub927g4d0mw8knjqvb9l7ktkdjdh1y5yj3orjwwuefxp4cfoiflqi2k0feaz4qao8v9v1hhwaho60vdl3oga2xi6c9qpdngkmr9zj8i12sbcy4o60iacmc61yuevz4t7va1nxo29auztdqbuzh4yegavrolelekjz67javd47mwhy3nol4qjpqel4ptt6kbyrhapt7lf4a9wvhv3cw5o1wwerzwqgbzvncggtmeop4h6chkigwtlwfl5insie4wss6logbzik5jv12a0i5a2jkxj1p0vcdls0td2cld3suk700wnd3yasma8u2xu38dnyqns73occrguht7avey7g4oexq0v2h2stebitz1rbvs0xt9pjqtauhky3dzcrilmpfal0bzu07psudi949isu349yoas230d8ex3hgs2far4ayrx9qgmo6wd21imqipajzok6b58kl1zzq096oprylv1e6xhjhx4t82pqscmlloslc4jd7oo5jk31fd0wl35hnumsczajchkxaahexdo0ha920c3jsqcza32oj3b6h2vm0iv1fi0jhzdyxh6dqxja12fx1x4prhqdm46fllbhiteykj3k6u4i0383oa8scyuzdxya3ozaoyo42evpj16pf8egsa4ztipt6lm6stdl4qr36euxmbdc5imll0uzzsbzvmle989junc4gu95ab34tuxoee8u0r088mgbycwgr0jd9bol892xn40u6ognbnr2fcfkpvq0hxrtlh4ar5i5sk0jeq0ewhvuni3vjj1j6ur9cpgql89vdilvp5fjoczthwmc2y61twoizpaqeehw2y8hj5yd8y4he46crajwfm1pq4va5unzj2ydwjcg2b5m0gpmavptbft6ye1vjm1enbqbuejwqu2irbiutsge5nzcwv0z9vrjnypm9mac43bp5vuqgx1dtibsly7bd6mgwilgdn5sn0nthv0c6xbzj6f4g5c3e86hfy94yddayc',
                mime: '4j3cuh0glwox35pialza0yrebi3y9iv0j4jhmjuo7js2pxe81f',
                extension: 'xtcoz4vrcvcggf18we7mfkex7y91fdu51r1rcxu2f1s7libskp',
                size: 5111192352,
                width: 633434,
                height: 924177,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'lerk47rc0q977vvu0aey2gyk4jzo0z97pds0mc0w1xe1g9tnfxzo50xt8axfbi2j2yu21yrbkeqp8t5jvmn5jp03h771xd8fiuy6exsn9svpxvzi2a34k71c1kvnge6blu0k9rxxckm3ph5j1ssdrfwk6wxq9rhppmst2dlz97o35ga68n2ocg52brkwc2c0j0i4ohiq73hh9l8ku1gkoe0i8z4cwhrsapf3jei9sx01hbrswqxaaml5dsnywlm',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: null,
                attachableModel: 'rcd22sbzpx0uxylz2on6ubahajmh7lzqc152fzz1fa85peijvm5smwathoacip23d0qh4delld5',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 116216,
                alt: '448lbhd5gxpord7eg1tvra3hkbv10tz5spf006gw56l5bddoeou5wfgwjz6mz9jzxdptlz40phqc4iflhfhxq8u4ggvakqex02dfvnbtrcxq47fi019ml3hpm4edx32ipk4s1776adij8boynb6caaq0brizgir0n3acj55ci0fi3ixan86ixblpe5glam2dri1u8e2qk4dv0imnbhq201wwo5hkdd8j4mki8lkr6u10kkzsioh2y9d1pb5hb2i',
                title: 'blgbtz9rbahmb2gxb2fyherfdrz954o9ae48xcf4kyaad14at5iiav30qhmkdew1n5739ex0n0d1swifmrg72swvuoe5w31csqgbhj1xhaxctni0z7xsijpd99gfy6d1ep1ycqqmds9eyxwpuxibxayahb84x2kv3xbrrds7r7s2ok75gh5n75g4mn747mhu0adelsd5399bnwfr1pndn1yvud2y99vky08py5sqxuqd6f54d9wm0u9vecbp80h',
                description: 'Voluptatem quos ipsum temporibus dolor ratione rerum illum. Cumque qui sed et est numquam quisquam. Consequatur accusamus et et eligendi.',
                excerpt: 'Quas illo voluptas sint qui doloribus cum. Laboriosam possimus sapiente voluptatem qui ea. Est harum neque sed voluptas dolor perferendis ea cupiditate. Libero fuga ipsum voluptatum id voluptas quae blanditiis.',
                name: '1uek7oas9g2wo9wnt63dn0m574199s07g0t3hsqogteczg3qnai8858yuddocqbadogn1z1frutjw8u1wmubt9v0u67ci8ug5w8cs599asuoj0pwxx2mbz5d5c52wtmyh8eqiig1ik9wdxxnfqx561mhjucg9bmp3u7rjb7me1sj1eje52b0ohq9cfj43fniyc520kangct41zxt14paidx9if0t908fir1a4q1ea6x1h354mbn11ev853i3i5f',
                pathname: 'hnpvwsrsjfq92fkczwobwm87xy3jn2tcp046jl72ntgcp7bloa1eqf9wzom816ihz8qw2tzs0bai77nmh23zo9h1dz110qem0a5b7d845j07d80l80en87kqfpyy836jeeljjbdv6mm1wv5qyu202k1nt369bn5qg2oaysu5eld1yhcpxk6chgjpvwrgfmkhbv1q0scq3c9vu737sabazjocfxawuc5ztmpai28rlzx7f2qt953uilw9ab2ijpu6rft552gem4huteuk5nsundqm8d0sm7s3yzwttup2cyy8es04ruclwp6ud7wefwyeone3lp7egnfkk4u6he0cmwo655ft5dl4w8yqs6weiqmpdkvmp49nq77klwbi7qc2jiqn7fgotp3k05jw8ggdwy9kz70wnxmi921axg2x76yso69qpbylalm0quwmhqq3u7scrae93brlnvegex3j6fwwsssjy6pbppdkyhahnb02vi7ces8lrnroc4invhdnpego9itqui7bg58a7s6ir8twxsvimywt83p1yc6m9oimw5ybev9ob3jgemo8k543pza0znju0t938yx4t2i8grq5ailjmhtbwft47hc1fql66j473sgf1nbt6kdyatkcqd88g31vgn0kavuend8zmlb5nwiqekkti7m9emzat2hsavjlmmqa8gsgviy1nboa5nd8icrmn4iqxknfff6hq878q9tss3yaufa2hnbvyz2q8bfvh38ur5o6zbr743txcg8pprnl9bwk5ekg2o10k665klgeoxjysxfyk20unxqkrsfg8n8harkvfgqac1kgcfqzwkfo61bigoxhw22yjla0q7xlgshk1phkcvsqlalys1fl3vjwr04cx92om76sfj9lij54l20dkq10no3adoucvh22jxt9db2sut19bgzcsc76mgb0ro7dp9uz187ctncwn0zkitpk7ynuqikeovzmsa784fmgzmx0wbls3f41jwb2uqc8k1kond2lghhd',
                filename: 'hgyf68e1mvdr9b35a3mq1e57temle5e1v01i26sldk8k2h0j7j610434r71sqq0qavogmqfxfcpgyrvghh3r57z6im3utpk6fcss3q7tr48cp8s806e8ix77uwzz7g7tvjuu38zvlxegnfrfo7ymclj6llt6irp15vuacfcamddbdp9io9402ycrlgfmn6y2i8ro4n2mgzh48x8rxmo0sn1m5revd3x9e1czf1zeum9hzlqa16enjy7ippmgh5h',
                url: 'uoylx20gd93hf58s37yq2spsxo617zj2zbahapdpl1zi852mgdpjx6o894ku9l5s7c4fg8uj96w6emppvwtk32bu4h0df92eerxzp7b3cwja82wzlucp1fsxothdhkleeqzbmpqem3hu274qwvxez3qclcvl06jcbf7f77illu31u7e5luutyjhcf0cz3zl06fk6ehxzamapndtp2ghf2buw45iswgncmcv26yukmmg67131f3xb0mnc0c76uooixlka9es3kl3fbnn7w2pry11cjg1gbeqo7t5vwosgnotbd7hpvzfrsgdys507lyachi6hn6n4qy1yhht0k2q425k7kx815awuggotbh8zrtkxwarfqnvmnt7v5jygcnd1co603cwojdmhnuthdql5vtwumj9sej2vc0zqxrf5guib14rv9ynsxzvu7clljsr5y04pk4fprkzofpn9yepg8lmffbwan3oan5g0m4n3cvee9ksz18ntta0e6abecon4pvjxfm5d9goig7e7gdrd1ji90vv1qf9f4rw027w30gh816xvrp93cv025f2b0rfdjmitat8nfs6ix5nwpfvsji1kai5r94z8t96lyauzkav63bcijfrpuyh3nsiezy7u0e127irvgl5496srtiywegm10jsuzhfixfni6ux6l8236f9kzwrvza5p943smskcedtzhnhliqnvep1nrws5pdzupl0i6vf21rvvgimhuudqbowcdxe6ufmcyn599py10md34kf2pzba7in7mdph24szqpf7vq5lk9kau75kj4kntw9cdrtyhs4k0q48g96x662xic89db0hyswv30uxhijqawgirro8fl8r4pj4hrgaf4bxed406lgsnsczly357bxalsezf3012ykdr56yg3776n4iw87i9hwbxc2t92lro36hdnz8yggh28399xhvwkrrrzbqx21da5h08059wkrkzhuylr154nzs5ljbx58y5h6h8658mem10b3fgpye',
                mime: '0o5e27ghcwnp6gw81bdn47q6c467707ni2do3x0qxxp4ikhgt9',
                extension: 'r5ob5biaz03f1x3te99xyt1ii8kk2ieoj812i19y9pf20fx2my',
                size: 4504287358,
                width: 919228,
                height: 270131,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'y0dar2hsjskdsitlvf1lentmida1aaca1gudl6oqog2sbrp4jkkw8wofw26mjep2ddro00neh7rri61rrtgsdlubvg6pkyjl2jsepgaftrjb0q5r83v132if7kmovx7mm8huyi7bsw5doicthb830hjmumyyh3zpbixes2c2mdx686rdc6hlm6q4dvpcp4c1n2veo567i7vvu25c4q4sap4k1jfs9dxv0n2w2h7exn0h98jeatk03xp8l5j7s0y',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: null,
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 464941,
                alt: 'xewlb82m3uywmbuxqp7bkmzn6g5sqzblpmxc1cwj81dm3xvm3k9q2d2zc4ovconudfaotfz9zl0nn1in5l13awjnldfu7r599wniz7hqihrc8ee2wb4qm9xlxwit34fqj5hiu9viik5md4xa6hezyjjj7gq377630ju16r4dkny5krb0o3usqf9kfrpfqmfg93s93yjtyy8n7gtnidznwxzupiapwfyyl6ue7a4spja841brq4c62fk4imboqsk',
                title: '5r1empdeuk4hwbuoje2ba8v8xxcy286pc88h6a54reqhrwwu0fhaqhj8fvro9aiyxxnjgfx8uhbba1znhyo2bd5coxyft2w862cjzqmqs90bgzsddki0l1afl2jhrr3w2974ahlgxxzlqwm76o2hov0bzzjkoumcvd7c5nxjpx6qjs0bk8btqazebbu4o974h3udmcpupa1wo5urt5cf4z1gth2833s4t6jgnwzxworwimckqnimwepbsck9twe',
                description: 'Repudiandae maiores eaque. Rerum possimus quisquam enim quas odio. Fuga sapiente dolores. Dignissimos est similique incidunt. Unde voluptatem vel qui ea.',
                excerpt: 'Ratione odio voluptas sit incidunt velit impedit delectus vel. Fugit magnam aut animi alias dolor rerum provident. Voluptas nemo officiis ea ea minima temporibus ipsum in.',
                name: '7cz71r6e2rfz79lco40qt2b20eiqgwg01c60tmojpb4gfaps1gzyrcumqai2e75jvjdf16xg570f36ub3bijysyj4k2zf80v15haqssnxyx6rehqnzkidvcgpgesuxy7smhgmpzdi4j5lnbv4ryhj1dqup5if71y60jqptcs8r01ryyeayasbycizb4ix9xfpx72q1xa233iukv7wbz3ef7o138ub1pucie7xtuh29fl0i4psevxd16qjjohkpo',
                pathname: 'sp0zviu95nb5cmwd1hrztqp66zvrjwdhsqs3fkdhy6wojlsxkzenqnk3r7fldra3gqee9zw1umpw50ya1o1ifvu0d9fd53wg6lw4rziw8p4j9q8a6mxobhok2x98xf2pmv4tqpwv1mnfsra356k7080eowcm5tzvgwy8qu8nfabfxu8s2lykcdvhi0c80o0vj6hbzjjbixw6ybixrxc0mylbxhotibt8y4rcn2zwccvmscwlsdp8byj5d6gu6t326aotc02642dap1q3fmn6oyu6w94yt8x1b186eejwy1hvt04wqchtala80xiiiswwsecuyamcfano8l6qp8cwn1vpnj2pxfp2h7rx8s01v2o4vlhsvc3uaq5potemlohu8s4flpj0zfw5ki4979i1iyxspoju3q94t9txra8q5eo28siyoq1mp9wf09jabk74p7cy9ajifgcusy30095jun4n68g5y8dy6msv3s7vv1onud2r3x22pgpmw73bed86ki47xl0nbpl2yr56qyqmu30uils4jliy89dnzztdoqfkw794re9s3yre7180lrgxptj1lhueb88wrdcqsnr2zqk4n4lt6lr4z32xehfjatr79o1ejmgp1090d7gxqkcb9lp75axfvr4zahawlp8uf8d39c6p0114yxmab8d9yz01gsw45s5odbqorj4jfnh2pkj4se1hio1f7odibj3bpiansffvju91619u0oh3cxtoy6x6xpemp9xf8aa85ub1w0m95to181n8xd8fzgr92pnf2x85bnls4nmfuevztv96qksugk0wvyerf84t2lhyzfzyved0liehlzia2anhfdyka6ehqcbcll4rbmd6rkr7rq57txqdhi2l3pygp71bicx1crn5zdxkzhoa98hnu22kj63szkmh61mqicidbloul8wichvilwysec4mam1obioslspn1ycigugxqgvf7zsk7hd5b5h5d9anq4ca9k6rbsifmwjnr9v648yj861u',
                filename: 'aaf86qoua4vhx5k1hgn5u3lser2xl53gckhqeuu8ukg7c2l8y3d8667umyki7qq0jpx7lgdptxtrdxmr3nqx7ulni6pban8ccavhz39vy79l0xids7yphnenkt7fen0yzvd5rb2ym3p0b7d21z1ni1gklqul9ui1krp39qwfu9b6tde7okpzl2unli257ljalgn4lpga8t3ajycx9fn6oypwg12m37czdwn1m6acqyei1m635b0sc4a49tllvia',
                url: 'b3lzdiziyzexgsiga962c7nk2q7cp516fs2n4zdxhqfatcwopxhkjw0bpo898ogk3q2xd0xdg1dirfm8r2qd0ql71aq6se6cajrza8qt539m1ghevrsihrh7k9fw82dgtg1j91n94qqrhajkl6dgz7qajgbtzspk0u95vapdle29lk0fri8ginsmk9ydoamvnfxlt27n8adi2dqc3guylxdaopbqi3dlnhwn8j6s2gie6irvj9lu1pnye6tria3up0ipf5elba6ntpxyayx9rz0phkklpb7tar2rgwyr5t18lol8u9x1yqcpng8js89vuq5f5qpj3r01oqqz0l33m2ivjktm0gt4g2qy5j4jgn1j9oahllant0h20lt50hnxowm8tk5fgznggydevlnmr5t5ysccd9lsdw81wkg37vgp3143t8qlnhk5u1x5ew8o117breujzpkhj2jf72dskpuu9akfht83l63guop42qnh0b2297rak3x1myp63zzru9ekb2of9cvshkdyj608rd1nifebavh203dyyex4sffsoo34a75v6l7fuptdkvogljnynhr5nbq614q3hscm60udv5mdyclsnatx2zj3ltmqez762476xwojy7b3nrqqyg05ohyzoda82x0h23lirjtujfvy9so1h7wpwqry3aq3zew9rs5zso19ocu40kqfne30n8jehhodg8l3e5rwba0i7rumgqf5fonqqzgpkhg257by0rl937f5qd15ovpzj3fmk8l5d4wjk8usrcxy7hkaydgxokqbnnwx5zhkrlm4q0qsg2bka4jbi17zrw1qei3f2f4q6xls951x7z7vp44orsmg715e5hc5ek1rh8ttg3xqjl96ppyocp4i5xvdmom4mgrtccsck0ev39oks3fxeb7x0slyapecgy3cxpsrxxx9nfe9q976vimqx54opi4p5zmftbwwndrsp1n7apshlyu6i3reigqsvnotaujz57aoogo6jsfhwg3kq7od',
                mime: 'bozq8ct8argc8o80r3qze5ertkj7c5rzln2o8oao1wh51fochz',
                extension: 'x5hw3zuz6zbbczc8crkonjeadc5db7wz2peow776iaf0xy35p0',
                size: 5170046587,
                width: 112639,
                height: 557455,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'mnu7g3i5t8qljvowgf0blckauav5suaacunhob2z43ay012bsbidve4m41s3h6r31tpqkcm23efnekznmx17yuh38q2nkkek9atfcj7dp1i08uob4illf6h5fqg0njnq80y8uxc03dy7yjcr24bgoc1sfdk8ro1wg3y7jpajl93clt8x08p7idtujykfuauzrdmcl62gkltpq2c5uhb1hzaf7878ywdaww91m0snoyz2jgsb0rd163fbh9i3tfy',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'jvqu5gh4o1786wum7nw5a1noie2z6xsfrmzxq0bfr8uamq5bt05nsfp1mkbep4uwaici85wgt49',
                attachableId: null,
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 837247,
                alt: 'f37ue67eb3kvp7odyimnhoywauo2lqzuk789ofylpmhfvdakp3nc0v6bph5vvddo26dqdl809gtyszliwu85q96bz9eq2rconuqshc5xyudf907wr6fqvt4ot4fpahpdvtr58sdngscbie1p6rjep3dav24dffvh6abircjl4bqlgw78yam008pltkuk839j1uk2yuvvmjynkgmmtdocsn47mwibd8bbit6u7ohkr7ovrk2kns8btjyykjj5hnu',
                title: '8ye5qjug7ahpuc1p3ruwjbxrroswgp9qrfqloyinydaco24qhbqqeu55x23v6kmi8gwvyvp6wkqlsh2s7h0x1kibyudteam38ysofv7q9t7ov5a3e50njg6en6w0mowwq7arsrqjoacubcgl4cqhs1gupm0qv6uxwsmnb1ldi7apo7kfdzfvkgb85bbq68pq5p58276kbjs3suz36alrn72ny5uw5375jsztx8mrwg83taexc19m17v5x2ruv2c',
                description: 'Neque quasi et omnis magnam inventore saepe qui vel. Ut perspiciatis quae ea consectetur voluptatum voluptas dolores molestias. Est ut adipisci nihil voluptatem consequatur dolorum magnam. Atque amet id suscipit eveniet veniam. In et qui voluptatibus beatae. Ipsum in repudiandae pariatur.',
                excerpt: 'Excepturi corporis accusamus quo fugit ea perferendis atque consequatur. Ut eligendi unde iusto nihil. Sed sit expedita hic est. Labore assumenda voluptas in eaque suscipit inventore magni. Et numquam est.',
                name: 'qnvsp0eiyicsyyb785zs9ianaan85x8n038a1499jzhddj72on5xxjicac0judk63gym9lo07newbwd0h2wxl9i6xmmzf63rm42cxw9jpn6dz0urm63jyd3giqf5gkfoh1bsz1iuubdlnj275stzeinma5yzar2wmtzl80kac0ubx8rf2pxqem9bbxjvg2osm6h5my90y1ksfc2manp662a3pf87mbx0cpp6dpgcyffyesal920gcdmal8xmq7h',
                pathname: '66qhgt42iwhclkytdce62e0dl7m48sp4cwibq750iug406bij9bu2p657y591h9y8jqermf38ya36ipxhw4qbqe8uk89bwawh971v6cvctvs902x5x62vfs1m6jj0sazccmnc8qp7fyhg7b7ieg6ie3in67ihjyi95bnms1i6xc5m6bpf1q2wrze2bx7j4ovi0fqc3vskcry1z6ivysev6c5l6vrvbhs4k4nenys6ibk72fyd67h4rmrvjwnqhm9jj74tqx3359a9ay2hgy3f7fggths76ywgz7buc803o73odqer2mtbjuocl2r8np0xmpnlfwwdla1lwwywnb32apf3iy09z4szm8ewhl8rrs8c06nhtb981orvmoij2w5hlkv4u2a7a4xp1kmr8qoeb933es7hy4r6v97mos2cmy1ge4p49keh99f7hwow5quftweug8bcb7jdz442rxis3k2clnm0tr9ceur9rl5a3j5bbd9j5bpxj2u5kwuue9q6jywlps2m8k0p93fxu2u2mogmwm7tyyg480ahpa2qksmxd7021h5ikd6xcjtt4yv7s6dij8iqo5k5josn9klswgy1oolu74mh0lxbnqep88mzjr1vtoif5l7wo9wh76f5812fui11sy4td4bqgwn9c8sz9q3tarjj6pish0x8069bhc4yyeu0rqrexvnj1c2cs0ksosrlrsx8thybnuo50a7ru9ffemtods8nius3jxjkia46jscxibphwem0t4uqguscrup4nmllbrcjayb2bg3dohb9g8guqh2sf38ugr6pq6aku6qa5d2aikd5o4kn5wfc0jlm6hvrwpsm2qxtg8l0djofqr94rdorqd5cae2eq6lyfs3k5af6dckzq2jw43q9s0mitizl8kon31b8810c5mo8yijxm8kbidzabx5wb10l4cbtkzhz4iwgjcd1stztuz3142i47v12g00f1q6ft6bxtpau4zsylppfzcaxblqllss74op4aofkxlk',
                filename: 'ngj7ksj7dnctq5d1i5qmzdvknzg3pibv1gaoyhm9w9pdfdqzvq0w9d9gzdzx7knfn2niquxrwc3ct5aj4nntgjigzdry3ixh0vfac85qhgvmp1s6wmda29vdcyljchtejx289zc7zx61kx6t9ubgqtp8mbm7w0hyzeunrwc5sr4ths4jlmd79i3ivecx912xn2g0h2ubfko76l7noe6wrpjcekrj4neebo9c2n6r7axlqo5wrw5w3t7hcuudxul',
                url: '6umdwuajgq39p1izyd63xo41wuyafqqxsq2sag4uq0ehpuxsl0y0kk04u71v3sre3q3k2akqpl4pan80y7o3jdpje95pbtaxc2ws9dtxxllz2k2v0icjsvir607pfk493n5cycs36npgczjlqmhv9njhxj0hbqponq4uczrq4j54rrusr6v7bh46mh0i38bfjlatxa0yzbwfrwhfm6cp5n897uxak50r95g8g51i2uttz8ls9bah1q8xzq40zwxytrm5yr6anmvawmsovoxavgq4kh6wybx77jjcafydormt0jdqgl41jldkgidyilues3jgx4s49ui5u5wmrbfdzrkl955y5nx3jrjilgudba9nvcboivn9lhv2jn7ue4s2ha14cv6a53kmjn36sbx7ysciys9n1zgjtgs4dsjmjqyc7wh7s6scrdckvifitnrtokyf0jg1xxe25fjkixhkl0yfubvdj6uotdnybg4azuyt621asly7m0x71pboc5wfcedsk1e164eob231dm9ddhcp6jc8gackiuerlmsvah1sdsvlxpm3i0bc0e2k3v842q1fbfbv3l67aug4a6csz7u1bdev913su5owadl36t4ozl0cat1lbaaruwi6tls4rrinyfwubxwccotchlpokv8kscnlfbiieanxzr0ete7uoimckmlyo36iv0bdav0qkv2harr3jwui3werrh63m1gtpd8bwp09s6c5tc8umi18f5r7w3ha8nsgs3i7no05anxm4qoyns5hyzs4k97tmmkruaqgo9b3ved2bntlm3mpbe6at0bulty2n0mvugck501apneic1fkdzjvg62o835erb3gchp79piugd11zc7xxzat465ycwpvalsmxmd4qpim4s56cetwppwvjmcyv4316qxkajnhrdouhmbdbql8ldt5zuje7fv9e9m5on99tbtq2ultnjufe1r212z5is7i57ilq6skuckfh159k9g4ffsgzgbp4ofng1lp3rxr',
                mime: 'u1jxhn8suuns4g1r837yo8dgrh620bzf5njcjb4vrvosoi8417',
                extension: '2brv6z7fb36lnzvpneoak6jfbva5y5hruaphvwqw4rrhy4dnz8',
                size: 3804138064,
                width: 199738,
                height: 782464,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'ukt75zr6k2kov5t8cvnzpgcpyvfj50zone0hnfpyb2eco08no40uoehvghkl9ta6s02y7qaprw01sc33omfxyqk7yehftv3wh0l8f0cv79kicp03ilc55yp30yktjljglf4qhi5ugdd0hyqf3edd0cp6xpfs5zp1wrxqa0w7ctlr9c8ie5g2ylupucf4moth6pjpzz9tgbtvn043p1jeu7709jkyzh4zfil54d69ws2avo4sd3pr8h4bomf00lx',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'f4a5zi7gni23zbf4vge20np8lmy7gg6a5waxosnldmax8p2qvd6bwk8y57vhjrbyrkwkj07vo2p',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 128324,
                alt: 'xbguqvnknd6ev6b661pyejsm3r04w39g1csbtejq7atk96u7zjlp4vv1gd4zbztkbsr0ccqfb6lx512o2x1j2l3rkeomnj4w4ymoq26a1i2hzo2kzpl1sywomzz4iioq9hpmgukdelgq4srm8aph1v50x81bhg7cvccib01qp040ygwc7rnenvz5n92me7kpfvnp8yhm2h0reexmmpnyo0ue35ev8mlk3w4qy5pdjj37fjnlzh6fqs3vxhtqgrj',
                title: 'd9vmjr5eqiadkysx7d983qv3kawq8b85lvhqtinb0233rxwallh2vvy66fkx94q3ck9y96p2r9g0ad7aggq3su2cfdk79jx8b2cre89ksgvi6myhvd4gmotixe1abkvxjzz9yigw1cbsxq9xichlzqush5busnbxl012np0hceui4p88jb8ym5dka0p0to5c2imj8w85uzv94aef12wf34s9mb4hbkh7paiioiao24710h5fwwjw4q53ynu4n55',
                description: 'Assumenda nihil dicta enim earum repellendus recusandae. Exercitationem hic sint vitae ab harum aut repudiandae exercitationem. Dignissimos numquam rerum omnis ex eaque. Dolor impedit soluta omnis. Veritatis sequi quasi quisquam molestiae aut.',
                excerpt: 'Hic est debitis expedita consequatur voluptates. Odio earum nesciunt sit architecto quos consectetur consequatur. Nemo est hic blanditiis quia placeat quis.',
                name: null,
                pathname: 'p4407dkqjlhzurk95agvqszwzg66mz2wkap41ldjo3m0f07wou2cubanzkxg35kfqgvjr56udcbrm0emxi6kxaarlrrwv7fvsb3v0kq01xtvbvvpws5lkp3aprco6edi74ok4ufift1yke83q4x2p2kywann8ep3gf5gfuizzm4wco65cw6khp63r2ebgys15se4jo4tbaqrgvb4husyp94yaf5dhes6uqmjdmk2el3nkfkqf54iawau7eaj7hyovuisuh12p18xmg14rhns0ar61f7i90dc2kf6isyucpr6acqn9jsoyczgixl5uj7z64x17ice8vau08cs004zz4lhbqzr57iu8ipg8momuxj9x8kvgt94z15cven4dll4j5t0x5zumzyogicmvu4t8ogf5s86z124e2vrq0p2y5bwewu1kubkkqm9t2owv029k4fonh8kjeab6v0eniyy8pw53k5g413exbrr7cfpbabpyq1m5sqvlqjlvfo80unhccww36h0qr4qfums4o7pozaif5w5fy8btez0m6i9j9f3s56601qcb9aoiivhzrx3tozbbtu3nazxakaymmgax4w43bwkg3p6odd7lv9dwuoj9vzrhy3r1if4t6t3907tecv6f1fnnu7f2ij3oigrpckccwoqvv1vtdgkc15jcmdur4mvph3pggcaeyt0267vss4bwn4rxlom1w3ngwhnv79gppc35899qomskjt1d1d323zgk9cii5ylpu6hmj8js3tlxxyjk8qfna1lqp45dqbokvddywa0b55j7vyuvnwtodblgcvq8k9tjl5sd8mtc7ll1ye2wf9um6biy1edjcpcx5qr8zozjj0e34et4szlinhunq481xm2f2dflgl77m3zet5pegfzfso9nll2cuo6tmivm8a6f1em2hi2omfmiq0yxsd5wza7paa450urhjiaqpq49cyz5roigynwehkn9brp0csiw0qz9wrxk373w2ze4jb8su1uw1wi5e7u',
                filename: 'fs1tyod4yy12zn4ts6ei4qy10mvaze0e3onfsqvufr0vk930im8jwwr3ve87xwv65a8c92ybw0fr1zw7vxh5fhnzsdd168t6a5tsnsqlt3lrqrc8pshvfr6fny3vbf7cwdi3fu8w45ipo6p0dyph0yxwsrxfywysu93j4bc62ykgdvkn7v5s7e2wi4jd4v4k3apdx9bqnja93fmgdeng0l80x5xbnysbagmtq8wp444d73pyb2x5kor4jzgb5ye',
                url: '30pwzinbzqaw08bwgft5qyh67mn49kiyr7tddir3dauw2ko5s26kywh80uh8jggbhoa785g82fyuequeeq9baum8g9trvuxhw5vxe7cwey5uz7nx1meppkjir6qf9ljped89g1iwe3roexn83edh2qqbx0vzwycpo21j3nrnthtsoext4azx0i9xzu5pvyjp9ocjst03hbvo48urqk8grds0huxemvi4jpk6lsnnijkr56xzzl71x0o4tcrijbpx4ycde8djax753q34z4spuaxikvd17ttarws0ynlbm598sy7krqd1fqr63qhrfvoeuti9g0sm3w3mrfl6hmmmiaaqw7d7afj9luoknpft1xl9i1q53rt647ocby62immdtlqiicsb9kt5bp5ozqim7ybqbr734pndv6m1wruawtapfsxb3dz331sj1qdg4xiowpwfb17j5x647x7r6d4mgu5gg1erzy7qmx0cbwzermljglzi7mcoi97u9e0mu712wnosd3z2eyhf428oani8rpounk3wl6uokccgeyheyv4y6diu2sxeyzwrvc77dtn70zedtpiln2edpq5chfbeczi5yc7f9pd7ai5ll6mer6gsf8u4h2ooo2j4w9qttkm5qiebayex0g6wdkp4zondizle05xgvxyz4uujja1let1lo864ub5jof87vfyvaj65vx6cj0zxkmj3x2gjq3s9ridybb0d5xxll26u5q6ylsvxu5ed817zt4h6yksnephw1u33uzcmqywb7t1x25p1nl82zyxitxc3rcpajjpdjybyxp2zzt9t0ztthnyost054bgw883tyeifvxaggx6diboywov19fvujyn2ffot57vs71qvhmagruxdltuhkhkr9n31jyixo2ccsywp3vw0gkel9dfg1kz289f8ac637cxjs84cmrjsbszx11umgvraiuvqone0k00vzor62rtb55azmjekeviuxkbrrt1m9134jjycce66enrgirv7b3je',
                mime: 'lu2kbw3o9g93m03qvel780m3vtq1cpfbdty88w6tua2aogxnls',
                extension: 'j4xi621puckospvpu60tff2nl8rc4lvuw9rzz6cjyj67gtve41',
                size: 8840942471,
                width: 192637,
                height: 829245,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '0kj90o23hjygq7w3aro0wpizntv0y8ma10h0x3tw1ztltymv0hzqkv67g3rjm1gatz3ayzcr9j2pk25h68100f43f713z0e0rux50z23so42rv85h779mzwdz1gjhrkifunt4n52ebuvmz8080whqihniy0x1qv3encz7wstoddx3xnwjgelyyu6etpg16bspvhvgt25sdws69448zmbv53a23f8hlb0pptjg8qmeuepgmkk2fnqh2kt9etbqpu',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'sk3vtiuaraj8zlvme1h1coixg3yv54jowum8p6xnapup6hmsk5urqkkbk1t21xeszfrlhand1fj',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 245458,
                alt: 'h65ogeeau8mo3pvsuma7hvztijoh46g0z28gjea14gxys3iw48wjisszqoosato8dx3cepwa51qgcw80cx39ffcqdahmpcldr73csnrsrid5nd6obz2xknglrfo757st9iq51qhtzxkfvjy4wui4vtzqu6rgy6g4mzzskh5g0z3qdq9ti962st5i03o35h4jurmdkcbwsd9pu9fogmycff199964f0w8rxv229zihxkzw3q6uo4zlpsmx57co0f',
                title: 'xglmd6v3oqer2e47sodmy15vr4jqr7tlb3ekfflaqhcxyff271rcy28q2ydszh8hj9cdl7lqowtbpduu1dv7dohbahuvxpcjvd4vb689cokizx6phtbppu406knqm8unzy02vtnniabyo5i5daxwwpujpz2zz709nr7eq57xj5vwxq7vndr7o42dplqwknsdto9yd0rlsay2h3rynobua6b2y16fb9hj1gbni41hu1m1nxuh9vribs1maj3mufx',
                description: 'Voluptates ut veritatis. Rerum aut itaque. Ipsum vero odio doloremque modi saepe quae nihil reiciendis voluptatum.',
                excerpt: 'Alias qui labore eveniet voluptas veniam quae corrupti magnam. Accusamus laudantium officiis. Aut quasi itaque voluptas quis nihil enim ipsum sequi. Reiciendis mollitia nobis ipsa qui ipsam. Sapiente debitis libero reprehenderit et at at itaque. Nihil corporis sapiente ipsa molestiae accusamus dolor.',
                name: 'lprj3donp9i4zdzkfhpqfqhdbnfd06bgnl1121rt3qlj32rab621k4u71ccbv6fymq98224lcqpeeahb3oig5zvrtwu5qp4ryf2jtiva54p1vhkrx5opt1nstxzr5kc21zajzvz6pg7yvddpnlqonoyxtsxqork8swro7d7t2xuy03yxctxkg97589xi88hwwl6w4rg6u2oyybyntsa40opznklygrmp5l229vzim6x7x6m0k6t1sngy1m8ea8f',
                pathname: null,
                filename: '77y0ctiftyvi1cxf6xy0ojvb4rr4f62ton0w8l2setf8517c1p0j4gueall3yc18mob6zkqrxdt83j25dm4s3s6cfpqfryaffy22y1wa4rltc7jf1yrsxsm8arrpe11bktzwiuwnfir1133pm0w5ghrmhb3o9sr8a0m0uys5a12qkemzd45aajjz9o4qlm6rhx3qhl4q3mvmydlmi974odon9qp9tra19euz34sfz2g940bxm1uk6vqbg5u2y65',
                url: 'igf2051amhbkti446j421a4sx1zidx0atb42u8dp5ia5rsl78t3imdlkjj2w9tw1ntnfv1avjiyuyenz0vy5iwuum6pe08qwf4osi5w0cn2txrqzmduzucg7cyxs1679r5eimz1o5dk3lxm8ain0bqj4ta9i7y11cekloicm1vvzj4w7noqwk4w3q3sx5ml56qvm1fuxn6s76s94wyp3oscr1o8svtye48u9xej8dvo6f9wm6g8ht2gmztgzsvbejw10elg2dvt6021el68vebodebuxn6etfhwz4ta5joox91ojtskzomcg8ers3dc7q6tc2wjul0624p280kqm5xqzr619mnx466fdlu1ckirxxpictd8aos7mlv9tdnqik95yjkpdz1u4h7lr2xt1710p5fjoy7pnmzw4mt6l071qpz67vfciu25qqw5a7y87szas9r2zrd8tfd4mhcliz82c0q7x5k26d1tgjewhfeyujf9ba40ijfkm3moxay4wcf0fhe3b6v8ge0e19b2geu5cksw4fqaphxkguon0m7oqdvzmteg8v4oyyfxwad8klemlmotfoat31oogp2ecb9cqndsq95v9z51b8qebqxtywet197doqyxb32yegl926ymd070s4eqr34i66au07tvclvhsdzxxxa9d8w3v7u2fu4ks5y3ad6fq6i5m7peyz97jp8tmdex275hvyu84ob0qh724dvlncue79k9ufpytlsw2nodguyd3fhbtodykvd2dz83iqqo9d9mgctc2fzqbsxmbieu1lo4hnedp1ypik05e3y721t3562y2rm7ir8qrm0fc9a11mkb02kyhhpw1onoo6kfyh8teeqo6unzwcl0bf7ezbysvws83xvwr8ps2cqa9gioqj9hwpl0fylo31z5q2mucv6u8c4gy8mqfh9zvgq3qfs0qh373roxb068wl0rin45foinl2j8q4pwwbglw2zdlde638mzaxt2v6lptagtfq7r8p2m0o03f',
                mime: 'n7y6hkn5bsgpjr2f9x7bjlg0gytuewvzci7d79vrudrkoykxs2',
                extension: '5xw6ojzj45meaxl4vhuo6mv05v7cjh04rsr5ynhdx2ja5l1uiz',
                size: 5890489320,
                width: 799152,
                height: 783797,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'ct9qvn4j05ghco0t27ddr7cpncj4uwhvgq43wc6cxd5x7bc1ccwq3gtcj6buo811dqv5fnm4704dxnwtjfacezzeryuellun44ouzga35t8ax33a4g1r0j8q9j1yfnsd8y88eo7eoz3o4xr49uv3h0ttdsg8t6n07oeyyhzqmgtokkad22lxfgtavaecsiy8c3xyx7xbpr9k5kzbseuszlo5ogsf2dne04t87zmgk3f0bnpn12qehjydg7dxbt3',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: '5ls2dpxrjb4uxtudhmzw6oa7mj3v0zlmfiw7bcpnb601804g251rl9wstje85q9ol1w5f1dqnbb',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 924697,
                alt: '14mkp3wze55y8jr8ndx2bw268l3kua227qa56cfv5m8xg9txz5ldxwysejyv7e4141irp8gm4ajc2x4ir6s7zcfrkqsulou4lljq3bf29ftv7b2mity1ix4z23gknnhclort5mb53fx0cgefsepdd4dmtmyz19jzri70i3211bclj053rryotzl3f9po1hzgsv0x4g1f2aw923twasixfajr0122ptodg49xfnse8zo03eyvzuucxvuqs6755mp',
                title: 'lvvau3i8xcnl8xbn4x9jd44a7ason1s99t9fweiofazxlskqtlfv8vecrdajexibotc2zyuedtws991w57eq05t9clb3azbyw7oaoh5a7z45e5nnd0mlj19w7tflqp6wllvn4afemegsecrim0hjhxstnxh4hrnqwu07g0aq44ocskx6chgkynehizgv7ol14o5nbnx9xnbie84b3afgg2lo1bku1wjro7qg9cvs8kx9e7xghsmfscuegljm9ck',
                description: 'Non sit sed iste reiciendis ullam ullam expedita ut temporibus. Quis id ut assumenda reprehenderit est facilis quia earum et. Voluptatem laboriosam dolore esse culpa sunt amet et. Voluptatem eos velit ut.',
                excerpt: 'Aut molestiae molestiae. Necessitatibus eos iste quos similique nulla dolor similique. Incidunt dignissimos sint rerum dolores rerum consequatur provident deserunt quo. Incidunt et qui voluptate accusamus. Voluptatem sit aut est magni est. Aut fugit harum voluptatibus quibusdam.',
                name: 'vtevw911brcjkx1n8fsbmvs6o3y4mgq263r0ph4uanmbntj23zmyqcv7duiicvh518ijtg459s5wts0381afkesyci046dce7kwhnbhqu5kq8xnnkh8vneybv6vcos1xgm14dhasp97pihk2qledalbgz5y4cn59n3pqpin688d5atvfsghn7axn1mywkk1z4ptroptpbgsv33oo550w92jdwtph4tyia0t224hkvgr1toaspjt36o4lqx3179h',
                pathname: '09qw4kyoss0i10dwtg073qzjfmb2i55do0bra0i2tszw6xsz57wdpw3yt5q202tdpxffbngix9borbuv6hc9ajxjv7liho3gt6h8fp7araj0e2fq7ac4ed7uf2qf89fl5i64b1gktf4b7pefhvywgf7jgeekgzg3e92i5e9vrttjbqnwadkjo2317r9wi27g3r25qn1yuhv0epwv0zbidy3kcndv5p78v75wj6r68s73hac8n2iqj9aud4vd5ldodqos3ku626l6eef5ahpqliy2x81p0ibr47cfy4rz5rl0cfgbh8cagtoerku1dbjtj81598k7qdy6b8p8rgeurwvvy5249ugazziksdw3rysjru8hc2y1oh1fk4hedmxbawkjdnyzky1ao3c89pgcheg1n6w3teh02ccjjt1fg8mekbj354xsmldj4dbyrj80bhzk9raero12lzqss12j6g2maanv1631esqk1uezyhdrus1l23hkoga9vg0w1xxigzo6b6muptadsb2e2zrqd6dvxmqmwx1vgtc82nybjii36v42b3yhq2w4r6cpovjkf254xm918g5wa2c65ujzp1fbqmstl5768wun5vgv1th2zufao40w8a2ll70688o99mvz4nxwor7j6100zpg10afz0oz1lf99d3cih2tz1d03pnhsjy867z1a3hq6dwopdf8lj0ftrbimudcpvtn7ovg7g7u7w4xwlr946f2t7ugyrz2g4r6klcfalphxwlewn8cq1enh2symhigj0s6t6t4lisydu9bvl41cefgnl9rl9bmncrnbiw25tt67ic8k7zvytce3y06ozt3f1hs1jvshlabybpw4qybt0z4xlsflt4tw176byo967bfkydnzlag7nb0qh54nmpobzoui2cqtoeinkw4tkr7ggu91hqrgt3jtnomew176wsei1te9t4f0vg0vagk59g5qh4ttq59e2chrykzzx8tumih6904tj3504sr8dh5tb85i30hp',
                filename: null,
                url: 'jlj47iww3ley8vyiwi1i8bf4x7ah7mwaf3mjrws7wosn09kklgmau4wftoj4zhsy653sd5881ksq4174pw4v7s2by5yn00fhrdvuovncbniyo3jlvyretm5m1lpbylz5t4iogtt13ip3usvxaro97stg6wycy2ujy5umwhaw8la9fl5v4e71luztan2fqgjp4iv1h7nj5rl32u3nnm2wn6d9i1xzrigs6lnfwngsou3a6xmbgfytd1r3bavhdz8cgz33bhqeqj0lqhif5tp44gun54gglah801nzepzbg9oz2szx3wuy0smiu14rv2wnvvoz5qj6s6uphjhvxt8rcdm44gg85ma1rwb4o1zwyemr7xkr7vtyej2iptlp4rnbh19nw6agk173cr22n4k3adbn87m2b4v5qrugh0aehx6ophw9k3lmjjzknt4mg30zelj312k59ff41ox244c8wp2mkyvpsmwmvag7galgbvr8yy3x1vsveafnax1tvw9gojjtk0bpzjftjca0vm9bqhcrn07puvszn6ptlvw92pu7a7imovm54ojtnjnquy913x0xz4fgff9pwo7gf3mlpw96zef8zqoseqfq8pmcyuiytbbr59akcjaj2qd1gkvtzia9spkx52l3dtgx4csojdo1xizt7pxyepddq84eiwtmhux7y0cc3bi7irupo247cnnufsi0xi0x139u65t2h04k4gl95d8sw92td7s87b1c42nhwftaaby8yh1esq7zs52mhfkzi6ivmak65zycbh6yq2ug0cdigci0b6qg0w8pzzya2e5sy6pgadanmhpzn8w8e6wuemvbdrahwiioi2if65o1oz60ne9pgiouc4z2sxl1vy4xgw08l703cm5f797ir5ycw3skvwo0c0hw54apg20aq4p72ugbwx06vna9edogjdkpvm6ua653umqzjv3xv0wafoee2hv5dj1q1azldz565rhxnuelhkxygkmblbozp5afxidmwz8kajis',
                mime: 'fa4zfohjqjuhhe22pndo26dr3sksceayt4iooi7auicpwacacq',
                extension: 'cgh8pnlyxtibaief0ayhhdw7ssmffi23pmufsph6kjysy9ca7d',
                size: 3248550634,
                width: 637734,
                height: 551391,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'pmxxwii0mgl4iy0mgtwwz3e03f7cbid15pom5xo5a9j8c5upkf4zh436mezu6bscvdk4tzbt414ou249sz7dnvaxlhwn5r0bbvrjn1prmcdijocf38mf9e3pjbbm8kjdr3nxfbxadg9syhmtxvuox8wlvftewvbhdle82a9dgk15tpheg0pfe2p59x4u7awdcxgkkgbnyhx03lqkmpnehk6hpvftht8ims3a3zjxhxwc4q10n2yek0e0jcys2up',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'dhlohwua8h0g7czevfuotpyy2yckay07mjotl819xa8h6w2mym274smbyymqz940qireo7d8p3c',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 800214,
                alt: '2z04ngpyca33c47qjjzzmv4ugxjyeb8i8yjqone08xz07qo9chpx4tyn9e8l0knmw8821pi5tkcxusg4dff4y57rygc2ulb6yf4q7ol042e579xdv54demx3ghtf4zty0x8w0g58zvy6gl8glumdejwuektwrobu5s33eb7xqipzklapc4sokmcooaa0yup3zqe3gh2v9dgsuyzc9182bh3tqtdiuelo5l85bgk1i5le1a5nu34qrz319us9r2d',
                title: 'g9gy557f7ezoonz2tlalx7rdms00eokd22x6d8oi7m5p5atlbz7kio3if2a4ul97lh5cwy8pq2yfaip8v21o4918c7yxcand9u0tllc710qcys8n6zfafhbgectcxxy7chmkc7p5vpawiitw6rk1lr5jf8h7w1djzkjs9v3zvres6fcd6rusg4yvux6d30lr7gtlhw9funkmfp2xbgvpk2xq6x0r5tyxyisbk967r2kwehf53opt5ylf2qzl1ii',
                description: 'Distinctio a sapiente magni et natus. Rem et neque quo rem consectetur consequatur sapiente tenetur. Dolor neque dignissimos. Doloribus quam aut at molestiae nemo. Consectetur praesentium et excepturi eligendi distinctio sunt.',
                excerpt: 'Quas perspiciatis tempore nihil ab. Et nulla molestias omnis consectetur ipsam neque laborum dolores et. Corporis dolores harum ut veniam sint.',
                name: 'vfd5397ixfc773r7e2zecd6x3dguaqqln5livjq5tnqmjaucycfu47anenncwcj89jpnsz44odzgdlaxzjhjyu3abks017ufi89qu7lug9tgz5a09hqh073qtp71x6yc221yabevv0og4qptr6vg5d9ff02avc250v9bnn507ibez8jxvsq6th3u8kt8aqzh7up526995y66r02e1n4a8hk4h7n38dh6l0rn8uqisfxbc10exksgo56tk5o63wz',
                pathname: 'ygdj03v5ei09fdma7b5iyn2iesyvts4dl011a2mfidjhv4at2sg0pf1msoxw6jsisnvsq8je01hasuuzbm2afvvxrn73txnupm0ovejrg0z9497s5fcqn5lyalxx0ya0j04n67xaan3ndr6d0047n8tv8709eprz69qfc2axg9nyipcrwi2x260xtommzpf2m66q0kfyfognsb2zsyxov4fboqui31if35py4fonhnepmwm36pjtbw5ms8akd7epeqnnb8v2s2lj4shhvbxaospj98ndbob0zuebz5loq3jtp50ya9tbxmu7z7tu6omk9sittd4q1i5wnwq3op2ym9i3we35havsaadylevh9ox91jm0fuhqtnwbdbhbqvqh2ts4d8idtsib5ij5u2qwqrhtnd0rcz61xpa8b0xrcw342rwn2omhy5vh2q96flkl9zjogeyd3yqazaytqtdnysa1mc43r1szxjbq22onu7qov7op7pntzqsomc27rg5941s7kfd4scvct4i8q640im40olxecwj33m5mdurjor9wohtfp1xlnntg7moemd4aiz8wjfcnevx37iikwt1g5rhi4jrycvhlzrr10fcfy1ggr72ndpmz14ndk7g83kixqeyo9es22yr24vpwj9owcuhm4ebwvit6govrdg6ad6a4xodz976yoy2v62ol89882ua4o3my6jsa81ei7mgftliulufo1z6spurnutshvfxzyeffxme6y6q9g0hlzq0m75jxonfkzkh9ztqvmqkv5468n8e761ig1s9zl3vzbedwf99mjz8rqioo8ead9r5j92upv5r7dv9bl62w0qo1ljrowg782chzcj53mqiagpzz1l9qv3oyb5pcjttocvgc2af2lb7qpq2xzz2nya2q5fn0slxg7ryefy2zrou3414tehzj5a1qgbiii128po69vrtp22q9cgelegvaidgmqfqcdtbovqj4a6oyu8xnbbo8xh0vlromenna89mz1pjd',
                filename: 'dyd4oodv387pzzcy6buv3hqeklrsk2rpzrn7f0pc5xaybrlzn22m13pwdejqlmgf8n45kvxx6q3tfeo8pa0ksyn9i09fjzpo39s9lnbw4j780fy9thqjrzyvm3b9mnthajwcojhdo0s8q7m5vhd893bdkjwrbeccjj0tpkrfeh3p4j2kd3mus18to2tf01pkg2p1x3xp4166ks7cwuw5gqpmjfadkbh6mprmneol6msw10awjamgvh1mtlsjavl',
                url: null,
                mime: 'xiemtczeq9s8tfinxv8tvhc9jhiud758ayl8y2hs7dpfp08hry',
                extension: '9634u2o20myqs8xegxz70x3lgm8hxs3d3ldf9f51qmhj7uaqsb',
                size: 4142364628,
                width: 223244,
                height: 770496,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 't1yx9cgxh4wr8xbkyn2azti58qy5hrfvqt322gpvqvywhqliro3c6iqxtixwfdmqacay9rjseofvg8zm4srut9k03jjznnc570a032ajecxup13lfhnb2mvvcvrjf5qn904v1p64969vcdjsp2wyvxtnzm38n30jc0re0jsyfwiflzopcwrwnozkgiq1jy7f24ykqhy658qpbr2t3w0wfcj07yly8xwo4el7b5ss0z1j84i7mh8czpywhcx31yb',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'w0q8kkhmbghighcoag1u4dxojwyk9xocrsoho3j9dm9ysvc1fq0y8mwfgzlq94iq8j8xq5gxi3p',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 244478,
                alt: 'd6m9smhi3dv5de8o9cbc7410qvrud7aoceav6ejcg6tmy5x7zgq0w7rwmgipyqkhijj8dv2kqaz09ygp08eentcg4m4m50b7bjes1468xu7tejamfa9i25ebzyfj2d46gyv4zloiob9ngjswdu3wgezi60ptrgaq9m43s4ji7mqbv54ou4vatn75iv1ltr3wgpz12d65g1n6wusy36q4kpgqx6a23lmsgqtsfep48g3ozkzx1569fe40hyyza5k',
                title: 'gosmt3p2ttfvy6twsyory8kj05zl4035u5k2an9jkcv0qokmladgie3s89565eco2db5qsbc6qakedrdan91pcqn0v2hzm5io5k32rvq7y5xkstiajyodsed3jfpu5ls8263dl5ufhaxxhsg72wnb5c3x513vcu9tw8b67favs7v9z8psa8x31v37iwmrow0ipjp0x3mws4i266c0wlf51bhcnlhf4ep8ohcscgoejkdlircpszje04psw8jwki',
                description: 'Qui enim quis perspiciatis. Et ex omnis minus aliquam eum atque consequuntur atque. Earum est nihil. Quisquam molestiae et. Et similique eum qui molestiae.',
                excerpt: 'Vitae soluta rerum aut quae tenetur. Earum dolorem numquam vitae velit. Voluptatem aut est quos. Et atque aut repellat commodi ut nam incidunt id est.',
                name: 'xj8wp6gd2lgqcpoqrser1mri5e2u6y7n5ij60vco6hk0uouvbsstkq3unqeb2lt5b6pf8va6yc84nrby15o7lsbo59iuk7mc8jynyppscp7xxmk0xcvlu1d07crudox492me3z8lyxcxax3cwi6f7wi9ss82et0q0ozavuyaid5rx26xu5n0lvipca1mmgqj5qxjwogn1eekphz4jm3xjt54fptm0lkpjuos3pmlf2zd495mqc2659s8te3o93y',
                pathname: 'josc6g56ejrrdcwo45pswjtqycqjxbleygaranc6gbvp2ju1aj33fj3vi7m0ke2l0wqq8vk8zlhh4fk3k2u6djcte1gb8e3b03bdrmmemo9gwy4yxcrqmtx6zj4j9zyo9lb75mml8d1retervnunl39xwurhu2m2i57ay2kfa2a0b916v9eakrot4mz97bg66l14fnmgg2zy43z6h3ca5xvkybtt8ss8hza2b2hy86uzp7evmjnrdtzujymojd794n5zxuagjgnlnrzwhv7s1n1vnrmfxvkrwn2rpuy27qtsyix69umkal8a5bidjpr2q6gdaj2p7wbxt5srhnsb2zsjhxy7dlis5t48up3q9vnayl6ww261pyxfjoqhcwl77peb3kju0ofjky6czm3fhgmgx9qf348nkypdpdyx1t49rff2ks9d0b18hry579g7fqinmg9m6l023wsd9tyykq26vnvo8kda1h0mr0ogx7ksqx33g6gw9ztzsshd88insxff5juvbt6jqet34k12fy8amx5aws2c4ms6lf1ejvoqtw0er7i7yiwbrbabbx8w5am25ir1g61kmfllj0linwfsosm10grgif1lrh2ez3ga93ojkcsx8mpqvyagi3rxs2rgpr9v6uuw0bj4azxeivcztk9s77r8mztfacfyzbn8mdslmul74oye6878zv2m2hro0odw0oynuux7ilqf0ppa5ngbp4smbw136wxocx38ewq0qys856rsqe8060527hji6qds0x9jftf8crncwallc55efwvsjwl0oc01kknn32f1jpul5anhgkylukkhmfblvggzvu2gz77gth9772rpo50dxh74mtu7oefgox0ibp3k3j9a0w922fkxs6rwxjojvxmycsdl2hjutgeuonh0xgey871evdynlifnnl65o9pbksatv97s88yjdijj5ftbjkxhhpl46kp37zdchegn4ndva20eqfjmu1druhf2nab5hzkzy9v4tp6n2c95',
                filename: 'irjknbzat7x92dpsmmhee5xm0rfal9dv2lnnwbnhsyhzfuff9auhixi99qe7hxzwlseuuiab0o4iqhx7n1ybaavacgry2alxra5uyc19umpu0inqseifbnflao94y5twg472f3p9qdmeuhlq6et33o68puxitnail1bh4sqedbcyiczw6v8i0ifoagcgyibc9hei417cmu4xl6sicc52ifq9jhke1elpo933ml83mma6cd449ikv1ivjvooisqc',
                url: 'gbe3n6cd3ibs037pjckkdq1mmym67byzi9swo80g6ejrofx5i4fdi74bhveewn9t12pv7wrl13g5vmqmq45uh7i5fhuihzzi5rx7jpzsw2cdxjl8ja6bdi9zcdpkwaayj459tka7hu6vggsstg14mlgmvijgvnmydhwm5j1nb03hx90tootseholpn5yn5ggqmvprwoxtggiqxde0sep64nhr74ashnbchkfjf7bc78rw959hx012pi3vxalr3fl58v8v0gdo4gurj7p6z08v7ndpmufz692ygn01jpbvlcgjup2q9t0p105ccc8qpwzvn1dexnti2mvl3kxygo8h42qtuh6ttbtj0n06ctalm12ufbvdpevliswanekwg9svfro42a7skxncy3jhhcx3ulmx0l09cj9ja6ac4ldd7yj50u4xo6gh5yo3f7pm2yahtgruea9lm6p7f6b7bf5obmgk7v1nk53yiquz2e9daymxibdijihnolvh84wg0emdj9ck224q7qmgs1yb0telghzmq2s303wfv3akym6x7uljb8q94enrcz6qxpxdbm7tyy2m0qynxcu3gdwxzef67go75gq0auds6zwleesg8szdjr9tipeqjg4befop977xlc83po7m2blqhcnrb36hn3ef1c715qhnbtoj211zz0ssuy2uc5vcvixsbfbfbf7ohsnhm5ata5z42lxgtcyv3uc5xbyy3oqkwxkjxm6r9bzwsqsjc752odmodjtz2kefc9yofxnhm4umbzgzdc5orp8szf0jlper6qt23vra61qsucednb1ybe7kmlsq52ioky0dvwyvj6fg0u138tliphopmtjeffecvdqbamvw0p0dzf1n7f6qa41uhnkyjrvsgxc0hba040dqn1oygb2jcf9r3j8zbtxfurzim3t0xbzknq7c3kt761whfiqotv7zdj4uj6pg4087qn07hi5rywod45go68oewczytmiv1cuf6d0bmbsziho17lbbhoj',
                mime: null,
                extension: 'h957uiglmkzyb8ridtgpzb3635d7vwsx25argyc4p5l9lvrtis',
                size: 3574398020,
                width: 132916,
                height: 545855,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'vl9hkosaq7wlav9maffqnw1f6he9mvo6w58iomclrkh8ftnsrzgvng1nabotcjk6mgkrjzg4y30v70sk762hvz0yliy7vzw99xpb5mkhzo11uw74c93xgcuxk5cdvf1o70mis0yeq2cktnmk8a023naz5z3thakotfos1cj6spc1uo5m8v1yy5ouip6r12toxya77r91bmh7sjlr1dfsziut70p45tl9a33xwird6o7vyqf9jo932aqa68d3zuu',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'bcz9ilnkoxmumygnrfcij9w9qvklxetd08h9xuu02a6ta5uyxaj9h7uvy5ohm70dx09ssotce24',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 770410,
                alt: 'yy5sftts247movyhr5m1qznai2dcvy1966fa3e8jsczzrsy43t1qdfi4q9j2j13ztvnidxevz0d3sibmxeeh9t77gvjofipq9b1n9k06rh15l3a724bb2fvicw85iz03m3atwyf8vvuxtxd8tol2jade7zvk11az7k37kd7ym1bj8oo0bhl1wawbi4g1pv59ojtjrgbixt37yj5eewm45yaq3a0r1dmcy406g3hdnas1mr99k86s3u5nifxxane',
                title: '46yg06noyp5buh15bqfqruh37ynhncaaobm21nt66ie1n317w93zm2uo3v8f3wp229gaewpbsvelgr2e23gqm7mgccw1q5mmtyqtxemm8er3t87d5iywgt0scu1i4q6gea5h1wxwb3kzxjzg07f0c60pvny4o056ecutqbzum5ll6r4ykzwmsz0mh5amn11i9o9p9ntnnqyaru1xsxxcpsfv17utsp5kc11m1rhf0dp0l6e8ttw1uxc5zcvu2ze',
                description: 'Ab aut ut atque aperiam praesentium est cupiditate porro est. Sunt asperiores voluptatibus. Et ullam doloribus architecto quia exercitationem. Itaque voluptatem quo. Mollitia natus omnis a rerum perspiciatis porro excepturi. Itaque voluptatem perferendis ducimus quaerat qui.',
                excerpt: 'Quasi non saepe omnis laboriosam eos. Repellat atque praesentium dolores. Qui possimus sed. Quo incidunt quidem voluptas cum quos ipsam et. Et aut voluptatibus voluptatum in explicabo adipisci numquam.',
                name: '7gpyyz9041kl8uihj7vzjt2m90vfk6dmc687u6vaygw7adhu7whmtkjg2rzn6nz97asjf4wwwfrau2ouasc125hjqurw2sc4sxvy0ykqvboplburqmlfu33iu67z50zrbhc7kpjv5dhagwpzgmd7ymg0c08kr5qxc7ww0z1t7o9ox94qmst5nvj708vlarjfpux3q81ddd17gj95tl67hnp6r9yj5w16g1dkgch9zj15mle9unf67f7qqgwqcdv',
                pathname: 'ddsvkcxeebwats0n9yi42cxnzr05yusxhc3x8tkppf25rmqnqyrzg7v8gd6lrbmpvyb3p9f3u7caeh0fxp6ig78uh009i5nis4x4wu108cp0h9q5npcv9tq3dsjgq2c5gudsm1ixq5q909ulon4oljjv9cgtk5k18lwc4dvdd0ri8vrqwurbzzl88r5k7aldorhiba6dqpl5gb6f4yxabirdjkglf5do0gkg2uethd51bxkbjf38cyf49raxsol0mhcckl4ht0mdhpre3q1y1eu9i16mbzc6h81sq9qr58fdyfija7skm1tdku4er830bvd836e1hdx3y64ee0nfvrllb8sbsn006zyz77qm5wxro8i4sje0lvhaco2uy5wdt6s4m14ohvllfkguc681nuvm0rgivyi9worcyat160olgi6hr7068111uf76i27024uodz85sqa56hvk40imczmj81zody1h9yjx5t0dlc01vyj3ri0h6o7mh7lv6ghu6gt3s4xkgv1smxrze1prtrl34le0woi4c50y4pyuud0qit73hh2py33gg1nd1c2m01257c44yz6unf2odi1d5dj1ntbcluajrzys75taairx86y6o5d0hligsm1v27wxz8gtl96jk2hqtku0q39qqvilk5b5u01o10wsa70pwct8kgqi0cpwm8wh7iz5wpu4xq9wq38m74vwdf8wnxyx8lwman0vjstzixj3xwvv18y9um6omx5k0ca6ia1xnp1phu5by6j5sohy8q36qox8bnd8lau33hzqqg3h84k0tbtdyhrescq4jnlalh62qz8cvviyk2u10j7pd95qnq2htqmusvi7yz31zoyjxd876v5dog2lt6ygw37rifnj23oryf348vg2y89wf1224ozhkw01d32in85wpdyky2ivvs16zh441ecabh7jdo1bukaxpuhexu197jujjkeo81ihnv0gf8j5xo9nbtd3iblb72o8k6wrgexdq1ck6i3zuv4p',
                filename: 'exw2zi7m0ii5kj4guzx7e104oxynna3xvuzqmirhez8zmnk1w0vwrretgjsvi8v6jxqxu8vfmpsv50xm1k71qfyx9d06fx3xvqkslqinpd9y98hyhrpepln7hy5hbtt4cg9q9ujtcx7b2yo8oiwy5bmpz5ywrt4lsd13vtbkuz29d28u06ug9up2m45p7xqg54nodet5glzqsabq0xi8naoq4fw08vxw4b2igq2s90z0ky9zq0fhf9z77pwxuxv',
                url: '0qj7b5uci7hrngf4d157jfuuo8py6u8amo6578j4u94rmc24s6aiom33jt8v0pydsc3h3jylpgui6he5qgfe3thc1goutkhq7lo9cltkygcnps4zh40jmcacajf93o3w5evnx7wvijiyvr2s5droxnkkyhvw5yjgiaq0i7bb7xbowpgozewtxf9n5v7mxl8juinka5gcoxqytpjywi0aa9903xp4bbogf4cxf1d81v40tpbkak6cgv4d8yu4vugdhhan0kmy1o2wsrcav8s48smlvxhno7ou658q2m7ui0av0qm5dz85ak6oadl6ju4d8gqo8p3sjkavzslk1y7itswn38uuyv4pklsxpqs524vudylo90gimkuvypg3e4yxffuzzez3i3f4vf2uh98j506nl2v3ocb2mms25lv2odh7vv2o1evd8rh7z6s6pezaxux67tz9t7wlis0i0vdc7h53vxli2nl70psldtgnc83j5xoyx0z094uglw3cwlr9b8k1zsfrz5nfpls4lesrpuo8v11ujua04xvsvw6zvlgpfk4ovn1dqcvneoep11b5hmga7uzkw38uzif3ja1f761d0uuppkf8c742bp53sktgg2vql8s4lhy0jdkv2wsynfmtx6tx5vtncxa82muzc5374qg7lhc3dsz4y2x7q1h58hyfj0s9r0j3q5lx8bu7ou7io1a9ww2v1rmii2zbeplnpjgiycmk8kiolrk0wpf8duhrgu6xtuw5vbdn22ghth9yp4pb2ptgge5l4zni8rkv2k3pcxsi5etyf42amfx3nyx1hf21cao84tu2cpzx50tu6hy4rxdsgxgz932vno56mkref65ev7zow9cdh1slhrjr8wc0pyxfysm2ied9sqnned46vt8npre7jrtvdfg5naf2l3mcpivw0fo2qiyqrtgcysjk3isq8jc1mwsavvgdl5e757gauxqfvwfthq87k6wkgqfjo79xjqf493bzylfs0xzudq3jjkk1wuz3',
                mime: 'g72fmiikj61erwskazcy78bkqk4oqf05spduky91lll3t9ysj5',
                extension: 'iq0r822nqppetlvcbnso45ft5zu4ttdc9z481j80xevgcnp8yn',
                size: null,
                width: 232257,
                height: 997381,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'qj8yzurmoonhoj5az5iiot17eg5u46iz2ukzztn2fc46ypt54lnfyy7a7lilw83lftt6upu70hlqmuc33abr1bokl6i0ob4p87r0gwiuli5q0b6g7adn151xv9ef37zvwqpxknk8xll4nh5xxdxne36vee87bavyg6qfcvu5na25z8tk17mmjv9cyeb4iycwen4ip0bwt2yglsb4rs2if62vhuy6p9w4xzgottj6c20qisd5t4kzsi94gefviqj',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: '5nyc2f88ahsxtp58okt40dveo8zd8bx6djk1rk9958rs0mn0f30vcqyiummls8ov3jq4aw3rnd1',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 890017,
                alt: 'ike8xqz1p04dyox3hefx5ki376fuckllekkzqax95l7g5ru0x466ckotm1heakjxsaz3enoqgl98uciqon4jvt1z240bvw08vv8pdn7gb00wuy05pp7bpb1e050iwkrtnxe0zcubbfgndmflqz9qawlje3lx8l2q2q8fkpei9l2znohop2dqcnfdyuos0pe65txssaa1uiu945xgnc777qyc6v89gxkwfqe6mqaxcxzkoqcz96j3tus5yz5fout',
                title: 'a6qk3g3mug751ifce8z3y7ilopstzqbp0pbs2fb9uf3byggcxl2ygbopbq51y2ku23s8dczglcs7950ss1bckmwkmjkeaglhlp6ychyqdnafwztscrzsz5yaj25rzimqmrxrcnfdn8ops8a7t6b2r7plub1n52kcc7uvsibf8q84c7c5inmytqh1949zhfcgxyatzemy2a6333w5jlmk6of7c65lqb1txqm22miz7lsinac630y1vv79jzcsksx',
                description: 'Molestiae numquam qui voluptates et debitis nesciunt ut. Laudantium vel rerum id consequuntur assumenda aut. Inventore eius qui. Magnam fugiat velit eligendi voluptate doloremque nihil quo.',
                excerpt: 'Itaque incidunt nostrum nisi. Velit quasi enim magnam eius. Modi corrupti porro qui sapiente quo. Dolorem consequatur omnis facere modi dolor consectetur illo accusantium. Ut modi in cumque culpa laboriosam molestiae. Quae molestiae possimus tenetur dolor et placeat praesentium reiciendis occaecati.',
                name: 'oyi0ukgdsk7usbcgav0f5k2503o36gf9x7bd5ldxza0aqh39d6oh4na128pe9ls2v7gjg4yyd89vblbv6kvce7ich2k4lib3agv2vzjsc9bx29539w3o053ehe9kduvndlzkybbhh0s3unc6bg7m5nljjvog9g18h0nslfcdxelfl5k3gnl2pxb9t5zb1o7gufztzx57agctdtjc3bffxn56p6rlupm2e9zlbdesqk8d8sghazc9h1klb6lu6qx',
                pathname: 'pjuynlbf9hi40eoybqpunnhz0i7e7njh2au69ovixjb41ur5g7k4ojuh2p0ecvxw06m9kvso0gmkjg2n7pzok7oy1evjpdofvv38piht4rrfjimb4fqztg8eussh9xo4q791b34n05yzvogmlc6r35idiey076wq7sz6dsk8r6af8bbc28jnqjrycqwq57899cpydka1hgm5h8mk2xx3xaipdgossp2bqktd1zu37adqptfwtn5ndij9udk9gz6hdlx984zz0k4werev3uyw0gfgvhtg4q5j3oj4zreieza3zbod3viygogq1fzpa5poogwl7z7gdoyfksvexhgmhn4ppgioh3syiye0beyneoq8owm32t9zyqqxj6i2jsb0udsrlhfznp8si2gx31o5ynztqabe9q5v51nh0spqxrjfgzvwf27w3lr7sqq17su9xge1da40uxm3iy705dp39bx1wff30nzbljb3c5hi8ia8hpys4bzudcccv33va0j7fi6h4vrmxiui8yyhvj1ut72w6g6l0b1ludau0pyhi3ys9msg9yuhgynkc9crqtnxhjqkjvrbrmrrrnp6r6bbbwwprpws9t8twriv45zn9h872gkcayqc2eumvvs04zp22p3f8yays13trr6rz83rdtzhd6s0xjsm1ysecykztfes5lcdek7zccykakmnmmuosrb07wk1f7j0yjfp3ip56fsykxxxuhjd5nir5ymzohmq2uex5hkqay8q4l7fxmdzfcgl0obwv5goiswfxtgjn3fwkm1u4q0u1f4tuoerp1t89gof90rb584jb2fk0l9xa3wxjoofsxzgn4ih28ljxwj9rssrrz7vga3rh47c8369lhcdnzkc2ynpcqkvfw0gllk4psv8dtjfrdstk18cvq5x5znl75p4usxu7nivrfcdq5nwpofa17yarkuzlgr78z9621utujotrc1k63dy292zdum2w4vwi53ux4nebpjzx5dof1gqi70d9avvlfk9',
                filename: 'wxvgnvnjuypr640ijcb8krgl5973zhdi1lardt14hwexsl4k8ed3qzl0ahc77ehuzpkcixsla3tmmm59keniyak4t1qv1ntb7tnowb25gt40l4yzt7qg7qn9sg35t1yovnuqq4tcttm90a8949ee4nsaqnb7mx3ptlz5v9qplmocduvbkumfccditc6jaygouvt6zm6pte47gk8up2opxeaxtlclye6sim81qympnoay578xbdevq02btincquv',
                url: 'lez2bk9n6fn7su158c1zjhg0lusiyokni0k017mwc3nqt7q5ryexk3kz0gspb69ujkp3o2637ufg15c2eg1cbrlqvlr4rhrx0b84t51inq1nkktrwcfd8lmzv9bo7a5mpw5yde26uazc348k2aa0ytrplszzh4rqd3zgzdo6mlaz9zm03c1iguwb34acnxwcy92sq7fbitimoxqkrkti7aaor31a7zml0odson04ywkhz9bzgdv5mltzvma8c5rllkkazrxohvr45w91onl6z9cl07hfdx0mf23vqx11wz9ubb2clgelbbgq5bfxjxaw8hilegirrkc3k84yvz8x1tbi6sfdd6ykq8ki2vh3rd0hy1nc56a3wi2x0lacnt3gu3l3t5b64txd2xm4r6jt9c14mb35yse1qmmiak1m7r5q7dibnv95566d8kh9m5uf5molauljrtmr892691wzatj3yxp5tsmzayiym3pah1rg6alawoax2ppvkl10m7i09re9s18opy80iacfjxwfgus4oee1xe3kanxx4lb75bdp5xhvgkws1k2m5o9lfqepzgwjg32vrns4a1d69hxzhmhqkt0dkelvkkh4vtfbpdw5lrn6kgxuri68yyzkia3d18t02wm93etj5jswpgan3b51me7n452k90jf8v7pbgcfjjvmhs09hry9nhp36asphi45drr3zm6n8id4wh2nufittuiirw1zkkrszvhq3flb43o0ysk801eracdekdis4vpv1sc4qv9g3p8xh00on5fayg7rgpxqcqlt9fxzig0kbq448zwu8rm72jzj2fyl6ph3r1a8ejcn7nogcgmduesa18nwwai8yd1vbauvkhb4uh1z48qfw4eqcpegsgcetv0z2actaxrxc8qdrycmo6rigsi4yajszcr4ko2m34r8ypfwffeehywrgmeq17suetvd9z5fvkay15z4almfwjztgqe1von7qg1ljuu4tjf4qrphdye3qzgbfsvki4th',
                mime: 't020fn3qmmk9x8f7t3iro70ul9mpwvy787tb3ttf5ovo5wo0rl',
                extension: 'u3otxrdaej6h197rx99th5ahw74kr6p1ct5v3ed5c85lau4yjj',
                size: 4621029884,
                width: 937235,
                height: 555372,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'muawtgkzz0n2ds9gvwf0jq7nltbcq2i4z0a6h80v6yvbyhczuvam32sqm2x9rbn6edam4k26935zpu6myc5vavv1xp8yba7ftjqo23845y6bc619b40zl6x79hz523w6f0x9jnaecmckf0s3zq48423wy5uyudf2hufayg78oswmv2whd9ebrcl6fz6hxdpx9bk2pw1x5pb9kdfe8qs9ee242kp6im6j45ol606h7mdhh2jpoaw7km2k0mp95uc',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: '6xolpjftmgt1j11w8pbjxpewz2fu4g4x894a5yxn6f8lrfhstnj1hedqsp78s4jz5vrh2q05bry',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 748637,
                alt: 'uljlpagmhra2en9nr0s290akrgvbnotzcvstnwp6qwxyvvghfauwt5g4whdd4kucwaujziv5rtfh9b9m2hctqu1tdq5zrfvn9767nyzyvh75sb8ypcm4cudzpnx99urqzo01td2xj2g8y7ptcmttt5l1tvkb3at0j2q7d718qjwtxwcv5w1wbcwpfqlyf9gt8737h9ar19geyvm6cqhqnhjvcpd0425ubklbdzc3ea31j3g0w6t22vy9qud5if8',
                title: 'k1scslx6b4chnvt3bywaqowu3iuxbmfocnhrsicy9uhvtuma91afc76iy47uggxncemlvmbf9ahodz2zmnjkm2re3ml4y9s70y5lg2dtqkd3touj4reacoa4l8xwdefdfxo6wsht6ji77lou11bxrq274ec94cqwdhdhmmkt3pwouafrmv365gfx02tyqqn1ftm10uw8wxf13sr21wl71ix4l82017n7lgcvlxq2rw06xn3wjyb87ui9h8cs5mz',
                description: 'Optio possimus esse eligendi praesentium est alias ratione. Est ea eos maxime eveniet consectetur accusantium quaerat eum. Et qui eveniet id quis sed. Consequatur natus sapiente culpa quis ab similique. Quia facilis architecto fugit.',
                excerpt: 'Sint non atque nobis. Voluptatem nihil rem in. Animi ea et est quia et ab consectetur vel. Voluptatem quae sit temporibus.',
                name: 'n85ecoao5eche1shzejn0y8dgrzhfeflm0a4cmgdtdci78al5n2d8noqt4a4ubffvm4egowifgcv9t1har8rr92jon2p56qnmjajvetmzdqigasvdatqjtedp69ldg55q47br0nahsl4z19qe7g53gvia2do2wais1gbgmceei0sufjha2glu8m1fged6bvlmt01dp06p25ubz4gfyqbb6qjeyob27u5y4j8r97z2698z6wpqvqc6ro76h0w26a',
                pathname: 'cdin7xfrtfv9nc4w0uj4jtb7qshan2tjxjujv7qqt1usi1twosyxcgaaklwqniades7w57ij9tgu4gvz1in7jizt41gvjgj9jz75nig5brwfdqe32dds0h2y97cyuk4jx8mkjbl33q1netj3ee3qfu5lsh4znmomyi7vy0gzog0fxbbjd3lezksga7rwogkbmlac9ga0dtszzfgtsctpiulrvitnyt2vpcbixpoqejzlfp94bfspskfjx4jcc7b4myoy1y6qey0yt9v4qhrxiutagtw2ner3od1domu6ysprnud9ogoszjv86oo33p0odr9ybqx5p6ioz9iv2kwy57t67m5hke0jg1et8pnwuns72ab9110janhk07zpip8ayh5wn95ocjl6c9makmeydb1fui0bffh6zzlsdcqdtsyi7ua0rzbojdq2qljpm51xpkxuql8a5mkl8b535cuszlyradonuxpjhb5w9xjnypisqsvs1b8l3i45occ28xq7yns85x3yy8lxq9mblhl6gnn0ojnqi7r8uoxwusac9qmsyxbf4iyzkmbwararv7tr2ylb8qwgr781m1rg8i67jom3zsfj875e0a6o37hxua7me2r298hqaywabp5d86krl2jek1589a787hb9c2jpinrj9au8aa3e1e8pjsmovsblqspba7vop9lqqcvbt1re8jl0i15637z4lspifphbkc5caqye4zd388c55atefn12vlcs8lk7u5tkjhkhfzqkxaq416iaqzl5x8etqhq3c53l59o7ci5asq6se93pg8mh0y3y0igpxo9nqwxsncry8qifte0gywojcibguuofhb6zfuq3gz92yi8um43tn0w7jlx6iwkgj9xfw1fco305rx6afwbbw56zp7nd8lrtwqhgpm18zrzmrepei2kvyc345pgw2akhnmv228ul5aqdxtb56mnh4efgmbog0kbnzwjtnkerhxn8ytpcwmtleg9f29hmkwwr310ej8umo04w',
                filename: '8zjncpzufq3leiqw0gphegzt6s4ti4a57loms7imallbn60m01lfaa1xidf81qy9yic538b42x4n1y5672mwfali3d6rxi9pa83l0t23zlfunkiq8j19zg8hvh5kibfgvt1ueg1mj92g4pdoxca3e11hgommim9878gv9hseuvz9o3debpdurn5v8zcg5swqc071qbscx5iv52nl35sudliywppjkvl070nz9dqiy95s7ok7tkeoi3mcyh6hp1q',
                url: 'gt7sjpb4ysl0km635j9e24jrlzoqq7scy031goh3faz41tt5ko1rjdyo0rqxc008w44tx46176mceyxj7mpa1kfwbhmzxrqmuib891fprlx0l9wt5qnu8x3qlab9hipjx5xzy0hx5r7s1teimculrnh4gxjvajiv8b1r0km9fwuvzqp4n2io7l8ugrj6bioxkpnoetx61jg7c14e6725mlab4i6g9ri1471e67br029ueovclc6slm0dnwg6vgchr2sopqftz6t186g4674mwfskwax8jn5ytjsq871djzzkknzdbfvmxkauep8m3j79dtmwjbvxzwup24kxsn4svh0zq5zznl5ym8erqj6olpu5acr5yagrkj0p89bp8o1qkoflel03k0lew9yln7bt92cmjeehina1biii9rtab77u2kpn5rd1ifxo5t4y07ku0pymfhhcn6awzanudvez05luhi87k1axn72ss2v44d9nmag1ucplor1glx87qo8jh2lljpqs3naocwo1pekhdoq583lazy0zgq7h2a3q0du0lgudxw73ro5akf9ffubza6ykvx1xmazp6j9ihinkfkivmrrqvy8z7n3cb36l69yepynrxalpv6bj0wvc2mvc6w1m6arj8vb46491ktfrrk0d54czjf82ft2m6moe9tbeijjmjqokkhf2c4zvf28x7u5fe61zppxvc1542bai6f93h6vcdpqkw5793lxyf9bmyhn7er5s53l6p6i1mz7t6km04sa4gwm00c71kj6sw9nhfrzrojyygvmy7poxuxyrtm1po5m1sqnplmcchrgazrtzrjg727zey4yh41jdmkwoibk0zrqfganc23hymt2wsc61t3y43qyz3fvq2sc9bg7mt6gx9t0vadb3lxd6qgnvuufbvpwgzeveotq9eobckegex3jialj4soc0s3aedj6z92l6ywqdpf91257948n19gi79ryiqjek7ror1gmvwn1hjgmfqn7alflvq1a6',
                mime: 'vd7p8q7da9ja48ws2uev7qa928xhq40s5pq960x1bo90y5z87o',
                extension: '9cckd572q0f6amuvtd316p7pt66hv4gzi630p0xysbrdv25vzr',
                size: 6423823206,
                width: 194684,
                height: 899467,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'lq6uu5j03fiya9uftta8mjrkq7og90uxhds7y6sk1f7pmubgjkdnfd4yjnvgmnu1aty3zrqukt1o92yg1b5x2so4aeocqhi3doh89o1d35frae23aki245tx07vak0oqwowy0we8bjim2usvo9sczdtlcc7ulzmctwao0vapi7o8v4tnzdbhfl511dokuhgvoixessta5f711z7uulrazuj3ibsvk76x9zfxlnavci4ewbek80je2ke7szbh9ly',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                attachableModel: '9mdqvyjgsthxtb0mtnml7cqxb2n9epm513a43zcmxhqpdp9fli8smecupmoumlxs598kvq80wgb',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 294272,
                alt: '7o0fbnln6wq3sh73zb5na6vfh5t0zc2er4y9grk1ykpr1lp3rup95iuizgxfsbf1wvo6398jlfbk5zu3dhudkufe4ffvo5xpm2491tggypdn9si7ftqunaf6zdino7a1uhirlaita2uflagink39sczhr65x5ajsfo9gduzp6f537vkc14fs3bil12e1s40fu0226oi5iy8b02fkjfju7j1xjs2ycbveo2b8qsr6ji0zzbqi10fmm8xdk2xdvbq',
                title: 'gtteygypwfj7odsr4dyxhj8o2kdoc6150eil4husvlbbue8xy5at3t681ptb1uzvv21bxf2pxi6ylqf6er23x8g8vg62s60dekawu69n4wfihz8ihl6q7zwsw3wcpqijafq1txtsu18bo6dcu5lmk3ajqldzvf4rzqhwxim8igrkc7ue8imog16fyh4ry8dnmb01ug4huq6crob7nzlow6jh1sazwcavphc9054j60c1sv8gyl7n7mkupmrni2f',
                description: 'Aut voluptatem quo sapiente iste autem doloremque similique officia. Excepturi omnis voluptate. Qui facere dolorum sint dolor neque.',
                excerpt: 'Maxime id tempora. Incidunt aspernatur earum quos adipisci veniam et praesentium et. Excepturi sint fugiat occaecati dolores. Eaque nam ut nemo ut qui ducimus sint aliquam. Ut aut explicabo temporibus voluptas voluptatem et voluptatum.',
                name: 'et19p7ics6k60h5o0xqk24noh7il7yghlwqqjyjqelh40vyt0yk2hfhyhqj9dvsndtbc4dot03vify7y4cbla6w2eofwz5vjvpxpzfrwrmwxg1pr9cb5lfi0n5lnbk1av8uv672wre23i14xxanivtjlhrjbzdn8zgn0zqjwzspyhr534nqivkv10ltpf6b1ewada5vjynjn840jrw6ylhl5g4v3d52tmbujjixch0lkvhnht6cjdi7jmaxgdfa',
                pathname: 'h1vw74x4p5iq7ed2breenqmfsewypotuwx5qa425jb8v1yrz8g8k95bn93jokjql8s3br9qwlw58x9pig1rjlqf92gw8pl73k97iygvnn4qhqgm0awtplfh8uga26yhibnc9qaq38pop3hlaepa4h0mpv253tgabl53i5e7s9jvdogz0o0pmnvugn72mh7pkj8fd76skig3uoa9r6u3w8hzt3cex8x6io511lzlpcw6yvumq6lqd869wnbsumgk4c5hl65yy49mqwy9mjhh5tno9k969ckv4bnm6cg6a660s3j1xs5zajkuo1d90s39jxxycfy2euzqk8mn14iwccvp3juvg8ah2659jr6ibkkli10r7pt6304iaau4wopc4wgmoi2p51s5jbeybg2wphovldzm0eu7duzfazy8030wq4xmy30r65rqbcnv35099blbtaqreslfekl8vup8qdpjtgxdpw3abbee1sqcxp4t4vq8bu68v0ahkgu4cv6sxbfgsirqhvwa6hh74md0hp3sknik5no2h0f63qvfkava51cj9fi4aq0alj6mzfx2uyi6ziqbs19iplguqx7dv0brodlxmxaxtmbr8tzoxjs595eynnmz93d10jx9zvjfmwcpqdwnmx8k0wi5wssoeh8buw1dprx5jic1efjumiclb82u96i1pxfidax0q7thvy4xmdyc4r7q91qc8bslvk8ui56cpatoal9meaz3a3jhu3cv6rppscpffxuditmiz26znrkpqf8m75aqxtoh0bl5o7zsmn9gwoadgiolcmxmn3ofbck5y9oz7bpysud89a7olwtldaftshr7utmp9nxhzi434f6pp3vx88xfda8rus8vws81xwjjrikidsvfh0kddr2pkvdiu9av602e44jracm3ouyde5u7ii62n783s4ltvjnbr0gl074rt8yfzf64d76vlts6n2uo8zjnbinao3gwocl6xsekinpwzv2cqsqc4gah78fwskh75rj8l',
                filename: 'n7x8ze0qel8csn3k0fdlfx2yjy5qn12uz7pkohllr8ed8nrqftl3s5bp9vcm5kqzcvj56jl0317i42oiivd3gwlazikeev650oys5fcxogtswfhl3msk8qwib4oxm2d9asg48yi1o6xs7hd3k8ubxj38h56b7gwjjxz74s1g7qjgpbj88seplh7prp3ug9m2km4tn6bnt8rfh0yxy1c31zlw04nlwid7budg9j7iwugfojx7rzypeiims0b7yf9',
                url: 'kfdigxfhdj3vxz9nj563qpd6d75ua0thxa1e0cewsi0h4fkvr2hkc0yu78x8nv63m9iooda57fzoi033dglddm6gudqieiadt5lpr3eapv0dqc5w7subd3cd5ecrdgjflds26i4zchkp35zs7eandu89djgddsko1gdmbkr4mq9xmoyas331ty0jruoz4n2f2ja1tlw4bz44dxm7752bg7etahti1ezb9rvnlhjxo7cte9wowrgd0sxdkhll2j6gv52j9qr1mmzw2tqu2tmh48064jujfow04ubpdo6sy1lgzs9g5t27ucs1rvpvew22an50roxy9j68zo82ckc9y3lbzxw4n61q90orfd9pjmq7ce6rzj46n79gtgfta5lri23cugufisacve5tnaf5fc8yr7q98bhilxdv6bxb6d98x2zcjvf1v0iz6x35rm1cb92vt6o254ab59off7n9eulsaxi2pek02fxu3tot95fqx7cmzi5k0v61xuttite3dhkwreb6qcitmq4ljh2dld69zi926iodu3t6w8ne6b5uwf7y4c0werbc0gc01fxud2v50mm2da7bp04b33bfkq9ju1aihxkn6yrryy9gxvhkg36dhchmsocay18yrp9c4kr5cord1cm9de3uv0y54yeuw0f6s5hb9vujzp7x30z60s1sxzfv2t8pr5px0vmhzfdpi6tkto398wfa74k5zm5xjrinr24562csnmogdw8o93dlnsng1cnbnswrcchvtyo2ik701d0qlsnd94qwcpiuklfa6awuz9apra7fr3skt00qhw7vll5b4vg973ufs0i1r5ma2v01qdd1htrmkgovb5w7nbvovog6tqmdm3hik5kf6n1fh732bdxn45iek415ampw6y47r4mxyrmlymwjy3cr7g5baara5p88rt3d1yl1c0w4kw93jgbekwrf85vuid30lpq06vjcqq3hov2ctpbxy6gsnsav6l33ri32k7yv4skos4gp24woa13v',
                mime: 'a4w6sfv1odyjjgus6hhy9gwg7n8v0n97mtv5c85uik691xhm3e',
                extension: 'acb27ukewj4zm2cbek483xu7fbray1xcbwmhaizxe5przot5k6',
                size: 3020206492,
                width: 549445,
                height: 348943,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '25db0pn5ibakunun7w2j0azgxu9op4skeu8zqepu3nlwdlfxomiqp1i8wh4jpj1xxyrs8wlmur3krkk7uzz10fd98cakitzt6s1d8kb93g8y1x6hhdloc8qhzbqplvb7xjjauohx5mbqo9r1k5mnimc14ayxs6m4j7665yasx8lmelm2eym92vtz89apxcrhl57jwhl9v0g30e93j6uoy9uz4x5uq13s9p51q76mleo3b56zruu4empxvuucm72',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 660019,
                alt: 'wzzkkcg247lhvh18ja1v18sym6vdxid463w52vy1ivnx8j3alu4kyah2jv23e4jfakqgtogkj9ha2dkrqlxivdr98yyakxdbhbh4b0r874anhsrt8cueoto6bpsbo7yit6964frp5chzy01ywqfw7obkggtyofzg4rqbmt3wzv4cqtjmq3os7yom2pondo9r2fff8lacb4r4u87woxs1n51vh9f14noj4h3csoa2xa7zjlginrtdrq5bru8kfyy',
                title: 'p9vee78x0cqclov11p5b0h7mldhtieadwjbelf52f6lgpnbo9xqisssx9ub1bg1eqomwiza4gnerh15y1gdqa73p7yj32cvpjmxiypit9utcsjnglzdxayyszhrfbgf0z09uufn0b0zo384qrbqj86fs55dx7137lfewcjeek2gk6lem4nneq2ick2zs7gw69cfgyibtjhibpnacdcwc2szzo7sphfbrfh649cc2akzbq921by4j3o2g8mbjlzv',
                description: 'Et praesentium maxime earum. Molestiae molestias possimus dolorum. Illum nostrum sapiente et ut fuga ex quibusdam voluptatem praesentium. Earum atque sint in. Ea repellat in dolorem doloremque sapiente aut autem illo perferendis. Neque enim dicta.',
                excerpt: 'Qui minima occaecati quia ipsum et omnis fuga. A et alias sunt qui quaerat nam. Animi dolorem tempore.',
                name: 'oo59z5xekf6k7o6hzkd8zv2bqqhhyrzv9x18nwsissri0s2a1szhrgbvakr0tz0azdp2ohtsq9wo00c0savseah60bdpugd03x89weuz878b431bc2l9dpj2lz2s0wdmpxaesm026nfk0xicdc2zwl93j3galk3jq1yc35vnp2ukgz9s38eiray7on8k25f9jypavv3h4im9tjg0w6ub3b9irq6rsbf9zneqrohxl67uswjifvglvd2sq1bxhik',
                pathname: 'zxoj47yayehqdriwhr9fe254iqrv01zx1zxcqzh0ro9dqgiwh3tfu175k4wtmayswwsvucvnz90bb2wgsid84yn5hhs497shquw8rg8qx4lyniphbr4dqssa7s0mr73m9mu8oh5pdu024m3ahntresdfrresawotw95iz6ev5uakfrx9myc939fgkbyjgda58cy6zl0n5h0wmiad7bpp6yv63hr7g7o948x9bb5or2og34fqsyiicqqmbyzf5dz7n28yjvlq8o3dx7ygqif5hdahlpy19xohgft4vnp530w7j7qcknh6zrygl8q0byhrbt1x7lp1c3s7vo25enr0cnz2p1ec8t11efi8y6t48wxupetxknovstmo9akdf3vecimokv5nwv8i1hgn91y9pjijc2vl41cwlhevh9fyjojkbktb0wu3bkg8qq656obsu32gzg0vfgwcy4w10ejq8pu7fw298m9zm5yhmpnvfsu9a5yzvvnfuw21dybceleou129rssaq1eu7c39njgj47fm9hakw2pfmy4ru8kb7aa5awp0hy090tq8y0lpto9n59jw31jumkdcmju7ktnen9smb76539o7r3o50jv2mss3qw15277bx2698tyyfv9j5bhqxfsg1wkao5expjtymheepaqm0acao6jikwucvtym0vfa78ychh9uxawbsv9yx0yh94uukdoz8y5f4iuttdlccr9rcuqbuwfy07ejxasvgkwwsqu5yqs2u5fnj3h1kyax4pqw2mzyi61ofpi1zctu3r7zx2pw81aa7qubovtl06a9dqdqakclffpspz522eidq0d26r06v4yefhku1xijwiox6lk5icsck0vpsgyh36svzmxof7keopyez9buzd1e9n40znt1mdu3e32qf1xatj73e37vj5hgfgvmjauba1pxr97p7q3mebikya2h9p3ckhikwl6ri38oe80lefxy1mcfpv8z24rlr74tkmaupb7y3h38m1i857gmy1sr',
                filename: '0cgodfdcolucfhsgjv7af7uvw9lib301noosns4d2tqvro1e7f6k4xm1icwr5f1l18ylzyzcmv8pctofhhco1z06ex12nbrlx1ml09i0i0rc2g7x5dtelckbe5gbxys1cgy2klx49abchzarbixwve7ma3q3xgs93f2yog2k5az1hmlew7inx8pgts9wyglud6nutsu45nhi0a707xc39jynx9msipplijm90sq119zpkqqqpikvmp132pbn7hu',
                url: 'dkym3owcxbetlp8wyg8dxs8lroo8q6b4g8a3pdtkyhswkojznkhhv3jfgfcfkessk9gvpk7q7d41nu8yxf7xp3mb9bu2wgd2mom5zwasv1ffygsd0qp0rldsdjb6xetatym7qjpvj4bpyljbndocwneosfpzk8yg9f4kuxwsyo5yvdu121r9c6txgrd3l4r0uxaq0aszf222xyw5ls7meom0ctsddlooxv9dh233td7u3nc13zn9qssd751ffvbct3dylg50v6w61u6hembut0sutqkn2sv9vw6r8x9e2tk41f0lvjz21vk5ezl26xzfb9bux8z6v3yx80owo6aj9ttu42ngd8tr3lcriq8r3l0l1lxz03fowdpaayyvqsp4zwx5t4ppa3hj938bhbtohqqfosvki5tr9u7dk46afwl0gkbtuoep68xq48b0pu1o6fkcgwzp94nb7j554krp0g5z1dwgi8v20o1ok3605ml15m3sjmlveps8wpkht9vncw2ox5lmf8dzsv8iuycbg26zhs9czlnxu1jnkwu0glg6msxsetn68eo6w9f5hvuz16cic983rl57xrbt5l4e0hvnn1ahd05qabupgngiijhvii7z6kynt5sttruq21fiipglkt8qpxdthvawtbx7pshv0o7o4tb16z4g7me740camhv7sj6e4tt30p4iw1zlggjdaalyrbto427fnyu3kp9z0tjvha4ciwfpr81vm92rnrzpip1j0mrrbcc2t91oywdt865gxd9kzduvegby3n4l6o6yqw0x56s3y8lfw21mkwxm6mpietovtniwgox923styoa67enz6tsga561xoqt1wmpzhidxo3jryj1w611xq5tnbxp0b9jbisus6xi5a2mcrv8kuy3286ol8nz75t6840ojmociqrpbmdaxp9dpz9y86g02uu2zreq0fmcr5eqc581ouwehco9hzsn7puyqzlznvoyq11qz88dvomr40371ue3d4bp26ohaxos',
                mime: 'n70ld353p3a3mc8i0qlsknzd2i6yth3b1zdl1rktyiq2o6tknl',
                extension: 'uzmacqugob1zqfzv3x8ubfudpwhbyave11traxbck9wcu3roxf',
                size: 6963841789,
                width: 824820,
                height: 482724,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '938ajlj48flsr7uxvoxl0ofb2etl6qzgytcdtuhetz2k3ksqrkqt36240i4yvy3zibehbfy5jzfk7nh63487p91ey4s61tw2awtdz8do69hqqst1258ciux9p1wxefwjwcbu0fcmp0rdklmlp3x4ulfnlmn3olybpspzc7fqdnb42hxs2ns89jsh4eypppdyzr4ny2ibrk36mxzwns5vs5c213exzasnkc3n2wqouzvenlkz368naq93grwg0id',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: '1z3dj8u1bee4sup8kyf6nflbz65yhb13yvhxx7me9yim36qss3yc2zkfk1yezvql3d9zqveuo85',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 947538,
                alt: 'z652td7m7cnftzrzf9yxnnphk1ldyvs4p2399wi4895lgxw3lbqcgzknxkv2nsbqx4jhb0b8lol7ipvjdl0hrb5xfnebt2s6zd7ixnu56scewyy1ahjqkydoysk1s8opsf26bor212h58qkhepc78jmgwu8ndva7vabckpeo71fg6nnvluxlq8aubkfq9brbtn1ws9p3f0cbnui7ocuklmfn0gtzrctucghoujsg69ojgnstlfympmjz9oxmsz8',
                title: 'zlupq9fxox073c8g0ip5172kld2krvuenzvj40lp6o6wxxayhz2de5z2suuzi7m7271o68ajl8080b0v3jweuwnipkbrc7oacapcmclkqc2urfny722dgo7cx0xfctco4u61pco290hvkixk292ipp9lraq43o1vq99an8fxb6kc20n81nni90t7m18esjqp6u74tschi7u6b1fwjekfhv1yya2ux97zjibsv1ugvkteva3tw30kxl2kpqlagr7',
                description: 'Tempora ab reiciendis debitis eos ut aut similique sed. Reprehenderit occaecati perferendis. Adipisci vel voluptatem aliquam est est. Eaque animi repellendus incidunt repellendus occaecati aut dolorem officiis. Quia a at aliquid eum. Quia nam distinctio quia accusantium distinctio.',
                excerpt: 'Dolor quo eos et. Nemo vel in unde culpa quis. Quas architecto esse. Nostrum nobis eligendi nulla dolores. In eligendi minima.',
                name: 'bqeei7nk0qzegbf3syfnwkeoxvqzs2xsfpl6i84u66jr2no82mnax0jtd30ckhj6er4fc71w9d7x53tehz8goh7ojgp5djt6n565cqe0lwd889vy1r2dvnzjoedy3bky0adg4rk6inmpqf881nudsj0lmcv9l2pc3cb5wjc08y7o1ll8xus39bn7oezn8l48u3jjlhg85d6mr6dgievkuug0amm9pefkikfwximyuvs1uerh007eurll6ni29zh',
                pathname: '1pkb1zw993ixodvvnybj31vbv35vk4cg12wln4klbe38808g2ccamgs4o1q9u9tz4poh8dt55q4ofsz8e5vsks6rosg4qf1emvrl6jswg59esd6ipfcyznmc6lu3jjkupwuglk0zmk5jehnbaygsblmsod6yj8qx2hl2rd8po689tqrhv6gizza0yk63zlmdjf9b1vhdbt70pqqt9mmsgsxvcu6lumw4taj9m6lj9ti49hemqli48kuuidc04yaubxpj93teeycpz8xleuc97fq4f380odjmpxeu9sxj9ft3icfnwj9dzuuiymy2dm7wc92z3wu8h30ztc2wsnlkk1atwm3tikvsy4g6hm15fezr2y2lbxxpf36yhkl3pg47vxmogal6mfbhy9hngdm35gqr0rl3pzf4dmm8k9z5bvxdsr3vm8eu5495eahdh4zbsv0kae6zg90u1b7d1jdnyuy8qart0aancgckwgrjo4kegm6hr5mt0126ydal7ogki4wmni8gytci1jhew43vtug3n3735kr02f1obq5zixbw1ix2t4b8tugv12vzawpz9hkwq7uw8jfptrgk9edchwrcgetq1xktof0z0jmh6bepu45et3648ru1p7j5yhrm2q9u2vt7v7v8l4nzw2zh72qej4z0jl5mz1yuxckl9blacn77wyt4x8drhgeodhto5mfqhru5b2hgdyojlkdhqml5ld28p41eurhy4ge6zo5q3iuxc8wo2mqojazejz9zy4nslqm9dgficfh0r0m4zaxnl1ngb7lk7lip9u2vkw03ziw5e38ua17ai7eybqxh5xpagf3k78lvizgkpjw4e71avzc90zljyo7j2gbt4x6wwsqek51pmbje93oh5lk2usbpy0olvi53d6bz6v73o8q38dmg2pzuhiugs8ewpw0nn4pcfivyjo98004ril6afau6nvbpdysszr9fxgi2cha7rxaevhejv77p5cwkkjg0dvc4gvdsqmdi1esxxjgb',
                filename: 'egzwkdtl79vcp15x6hajyhikk0btbnu13yorv7bfh7r72soffqs5y69plws2bcm4v1lsi8rn0uu3o34vm06990tf5bpt3xa4fz34f49sspnezcjx358p91hqhqtf35n0c59fr9zb8de70b79nkjvm4cgk71a1ycsugs0gkaywu8ly1ks0twba9e9basw4nu3bsplj64syv1uxdc975ihknl2drygmu58cenzsnxlkj9rmp6760pcrr42bydeso1',
                url: 'lh9yo2t6r69dygjkdkw7nwftxh754ngxt8plg14h4b2rc8gq3izignwdwkv79x9ye5buywoi33nws6040eqbgwvn5sj9q8wjgygx4cflzs4b6rqe8znj6n4zrinh2gpr82jjpachpo0os97ine0so6nvr6rlvix85iggf6reasu7uig0tzz6fskjzs20f4gud951c062h4988siaacijman65u10r4jq637pashi36x00yuksu07ow0q6dseatafgz0jy8sj2r7btgyu381tt5sz2bnwgxwzn0w10r26m0dlof1z0jf9w1haxvteufj14v42l1a6t6okm914m4h8ohaxghe2zhmux7h014dpvdv0cdh82561zahntk6k2ln4juuhmwt6o6tyt3gn3o0ip53xfcua4dkki2q71e5vllqqhi7zp2g4leslolrk5yoadednqxe4afwl61rupcf9dlzg1rtzl256p1zc5tlm8fw8e0njr2djd4tzyj5m5j7tqn7jky7jqyii4tcix3gr8gbv5njk60wtlzfr9hdg7qunno6g6cbfqg18bz5h3f08jx2v3v0rnh29kmep74e9eq5gbu8p524ixw65ud83sipopqou52aixkodfqhbzpb4ehikkbcfdhx0n1ms6apxd32xtyk70iuyemydiednl9swaailkmurnhuzcojajl90lb2zojsenxae6vhr95e1mhc6z563uuu97kd3xur1rx3p8c8jvvsu9a7oubej54oueui2ym274v3yjbenwdr9z3p3pev4uzbzwauhueqjoulmoqvda5rf4a361fc3wt1gfrggsetae7ya6o2t1z7otjixl4fc4hpq44pm1d7fdqwbjcsdbkxg5jau6iugozrlzzsl9rzsbon0pp3b915pi7erb3n62ih32yvls8al3uabtmd7samgakym82c43tvnjwxylciscfbrqad0nm35ga2cjgbhnhg4rom85ydhofttty9u8su2aj7depm0su6t',
                mime: '3frb47z6pwv7jl0m66bayyb0xd9f1gohvpdyycc9efc39357qd',
                extension: 'dx5y2xk6g44q16ra9mdu59y0x1110dsunpezcyi0275b7qqhd9',
                size: 9076008467,
                width: 960863,
                height: 536558,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'i1s9ndt56twh2vk0diehqz08n5yv20fw1si65fwo9eutz6rnemsthggwxckkbbm281utpkdtlwde7q9zc2lu3g3t2omv97zk0wje23k66j22r641vv6yykd2xok5negu7rf7hh0jqq54y62afrs3vbovsa2xirhvb7vdji7329c75fzsdax8e1npj6ik7kiszr8e1icodl32oxood03t1880d4edz6dgo7q1ra9g1uhjaln23d30x6if0unr4b5',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'uluir4dwz7urmn4lnyv7htro19pqyr852myxmnhhx6ijz6m0z1i2gx7rwa1evdmh3am7nvak5tg',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 599261,
                alt: 'l256p45qnxoo8qze6odqqmlf56rb1jws7a5y3tiv51u3zctozr2aj9alvo3matr41g5ildwj6tyhk524fdplxd5ajknoqlzom0hdmvwqf2r6tppw59vu0zd8xx3s204t5iekx3aabn7wnfk8n5zf4pml35je07dpyu2s7l4tzv91wtrroiqy21xhpth8bu34ma81lm7rit2hyvwmi0n1xdmqomb03fuzu8rvlvuv52w7nr2prl8op2u59ycmyxr',
                title: 'ibewfgitlnfe9dtu7l880fgc1kzpg0okn27gcmg8fsy7po4ihxih671do0758n0lhbdknfs6hjxz73h7kjnkozeula2wdfgtwz6ipalfkjp9wtwf8tsh4st4js4xvd1fx1n9k8qrd7cxlvxxpkryeu18vxdsnzvbbvnuhe6txlz9s66wkvlj0o9e9u1mnizvco4e6azn4x9g6cq5rga5uoulshgxaqlniy2x99jtclr1cc0mxf2jj5qei68qt72',
                description: 'Quo aperiam incidunt sed eligendi nulla expedita rerum doloribus. Consequatur totam ullam eius facere quia sequi. Sit et aut velit quos laudantium eos. Sed laboriosam beatae corporis optio porro aspernatur autem. Commodi consequuntur nemo saepe ducimus veniam. Ea in a vel itaque dolorem.',
                excerpt: 'Aut et repudiandae tenetur aut. Sint modi rem ea nobis. Et assumenda est unde qui. Iusto hic quasi porro in. Illum a ut ut voluptatibus est est sequi quis.',
                pathname: 'hvqzgqqwsyibhtz1mpdp0pvieu71xvk9zr3kjzmsyo7qasm80esfvrwj8o8h06a3by7q6c8zu3fjohdqwbydh5f143f3cd9mgi5gh7jez8h8cqw0ab6lowa7p8z6wtobuahwxle4g2njhq3ttf6gtrzqdhkguw08fza1xdtl4r1ve3mlnrv9yg48zog5mz9e70f6o19fzaaw8hua425synkeda56lv3hemtqu70wj1atlhs1pewgp5p0atac83tof0y9xfbly64j2tr6e6rruzxdw6ab39dv0b3rt0hggksevx9g50a7a4cf7bkycmvpeppiajijwdgepaarphjswcj8ag1npcu09oztnksb0ih5jh8gfmg13jqslbr023pcxpg8h4jbuxhjz9czugwv89qeq4mcoq7ssp18z1jurs1oagcucj8hsvdzivxwjvxfhccn1axckg47cwzrwr00ow4kw3yvz9nwknkvduylep2j0melsaba0ajbi9m90ngowk3w0lws837b264cdzc8zjwcpmux98qurci4py17fq27adi7m5x30rd30j7nxxug5s4eom3mx7vs8veog9jzqw4ctp1v2s9ndob2e4vua42ixucw3jc0x2f7cimwzlxaj7lehhznfch45p7o3i5xvfyn3zyb0aqj6bp6khzv2bvv7e77oleq6ibwif86grv93y32ge1e1mgce26x5h1tt0453zetnj09xrizbuzs9daabfk3kc9xx95cyhi7pc21fzqga8e20yt1218nrkwsadmbwxa4za6lmgv95b42zrmrnwk7jepzf0invhae6u0nronhnn37iuo434dhn73nyxb6aqc5j0fuh4dzwbp0wqdl7fvh74fjm1em6wt53u1v57wzv7wut4ug362irsoy454jts112t14ioc7c6wtbxxj734sutkaqbypucnotmlfx2j3acemrqgqm0pkulbfhr549ft3c8m58eev5gvujr0c085hnepq944t7prh4zuj',
                filename: '2p6kavtfivwp2ofsehzhxq1uqj3ae1tzz7f7khyp6tn8mwpz0wmnpm11vpwsjgklvi5iq157w5d00lps0jbponky4gusl5vy555v8tqp10jowccvzcvb97xj25ytexmoblo2vicauj9kh06yhioms3jrv3m9vqxnqn2f268m841heayugbavfyxqni6xh8ukitl1759zi0neungp3jp9ke9ml35ph7gb0koocqokldlprugrabe7wxwlrzw7ofq',
                url: 'ffyir4psfyl0tqbla4xg4e2rqy3as2cotwbxd6vn9z0hjkh6nth55sslvau6mic36v8vahuqspilvgrzwkfviby3olr7zs1bk3vmav0g8uh37aqwjtd0e7xihgpodekfmc3hgurc5gxng6ybubmjyv1arid1wc1ouv35t4ifgrb2u5pwiswwqgm2ui853udb7hgjtlv3gfdybk5c0bwyinrb2jofp3jyhuz1v0obou4ebkwusgifqaegnxenzd7nqcv2580jnhq2qx9e214sk5p59psvwz28ibanbfjaoln6ts9vywrqsm525b6q8vaq9ej0y1tc9ec4ks6cz5gzmi1wd6l7h5ic0ql7rij7809f00p2wo2z56d58hrs5ivq9kgs077vvtvs0mmor79hedskdzexepxsxjdat20l8zpcozehsoqk5pdpn0q50w78w09sysphde439zlrpjc172tfl8rt24zqjxv8yg2egf3sxpnrxhbfj2769k2rgusdbqqjwnbm1jdbf5fbnsdpi3omnb0c3mdfpdn8lbz53jy64ia9msxx1sjud03p9zgmglqjcl6lpkfxeyb103nuwn643qf1h716x2h64ym5q0e385zr9pd0xskiqlfuqmuajo34mw8vplx9s2ovhq78jit8t8mteaz2ojngx3hz0d64rgfbrlyvnkkpon1nvhgx1t0xv1j3h41wks62yhovj65gx3jlkt01cj1fqec5keey09rpa2olgnqr6g5mvtynxwdj2gqq3wp0d679mzc0i8lnaaqx60rh2jrgc6wva2j2jmsr1793oh8s1jael1o52t3ibigtwxq02soa6wwbwnsmtu6g7yx7f332mqg1it9ud0fubgt2j7igo3m3kg6sm2yqdoqpigixv40ixmnkkhi9bs435j731rsu0f6y3qqvtimh6onxhq6ax4g9tid72cgaay6aq1r2qqkmpbp3ad35p6rzu2uo2yhdbhg1og6qivjpjzx56vfiewsx0wlp',
                mime: 'xh5tm27m2fx8x608jrfkh1cv7tx9o3rl6o6iz1o4y9gylqvtm5',
                extension: '4jg7o4aca2wu9h0custtatihurevgv71gw63afe4xf6m6hrbze',
                size: 8393169181,
                width: 147340,
                height: 317691,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'sc81evjw9y4xwfsm5g7w63rgqz3id5c6e0y9tvkq1g5bckhf19zfipshul49a7j659fns4mg0pgnhh0dk9qbcmex65yc1f3m7owtu7aswcnyxz73yzdcdljwhizwfiba52fakugchhotmzmt2ret40c08pkkxqyyrm4ohx9ihz2sishm3woqddnz1ary53ji0fdih512qmqaaod057h3wc0jkyjppcyet8emn7r5jbc32kb75gnifpdai6gn5ph',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'flkmkhxkkzkix0bk8wtwtk7crhxrgrla63gnq6zfcwtz8l5v020i8zzucwhadt3v9xihvve48rz',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 440043,
                alt: 'k4oao2ju6l05bjd0dijysqp5bqb9sxcq0r1bxnoszitjfn6ophd9fqv2a536nl4mqzgtu7r48nmwkp44lxvauannhcgu711ku36svs167t5ck7m2q3d0gqnapcors0u2legixabyvoj8ixspla5fenl0gh0pwkymeltnuos8ctoncyax7gc7nh167o5pcdrw89ycv0myjnnarsrw9p05tfcp6ma5wmdlya5ym7d91kjm1x675ggeochdnxzyxlj',
                title: 'rtyh87eog1hnh6tu42xupia53l8jhryicsfqdzobocjrqtr8ne6s7w5bml9g0f9fneibr3qbjgx220ljc3uzoy7hwrf42hmz8h6he8q24xz0a2lpv8c6u47yf2qavj9i99kjmk1sqyzg59feacv4a0ql7rrd4iojao8ehb7wvukute46t9qu6bjow34f6xk58ls4j2w4sksm1a1gb74jy7fa31hi035k74vexj2p44gxmteddbcycgxkern74bq',
                description: 'Ea ipsum eos ipsa vitae quos non. Ut voluptatum assumenda commodi repellat. Ab veritatis sed soluta. Praesentium iusto maiores fugiat et doloremque quasi. Magnam voluptas eaque consequatur nihil voluptatum aspernatur repellendus. Velit omnis omnis similique.',
                excerpt: 'Sit consectetur non id. Soluta voluptatem minima iste voluptatem aliquam. Veritatis consequatur nesciunt sunt omnis.',
                name: 'kkmb6pwzdtfmcu4etnjzdcpvs25md0g01h9w9tcfut07mhtj1225wumjvju91v00e7yu43uipj0wyucry4108u2oecu2a66s3hi87cwn84ethhdj1ig4dnpnk3i520jlt9wke0kyipa6dqfjed5lir66velmsgsul8tjj73v4goq4e2tptdfkwwgy98o331aivmbwhs17a6828vavcphcnz9vk38fqf5nk8bkunazzg3lu3q7cbutmctp5rb40v',
                filename: 'qmmznwu8fl8sf6c9ul4psbse7szodrhimayv96rbb5ih6cmlzei32kseb6he25b0lchzj08q52x984pqrdjt4hxw5zqufrallr0xhjb0xvcc0wez7ud98pwgj5ytx8jfh729v3ztapqf975go23iabt3gy61k7wdk62gdz8yidkxag8ed6fozv0obt7axc1tjqf8jleacjux70bgeqn24tsbritve22urfha0kujd1oa6dd00mdxlivwsy7ftkb',
                url: 'ztp59vgzre9ls2687mnpiyd4qrftf3yr9s1msenwfokmdhr9mj3dnsezd5mb0452z78igmggon75xcios5mapfvtmc36h2tdpsmhg5phbdjotcrmu8qgygustmovqlg2uns77n1enxtx4g6zh6wy1bpvqx1shns67m5t27tllpntpmdlco0dqm8rbo2pb0fpans6u63vxq6ree0964r242mnbqriwbarpta1geluob0gv4gxinr8gg6wwk0rv2nldd0c78neb1x43b44zhsun63nyek5wiqr1gteei7lgef3xoa2fcca21mgc17oio3zqisd1yx3ea7tmfall6bhfsm884ywk556zbsg862lcv5wfisrsm1788vxyvryxnqlhu90q38e5pp9hv1azt04wwqyvxedq4oeihm4ho4hwcyo1m30uvqkib4o2smddwzhvvs91yhabpuzc6mcldijbgbz2ld10b8e5fq9mvf2ci926eyoonnkr6zg5rcb8guia2jhu6z45bfkglb7z4d39gwraeiigtdcl7wamb17oplah66qvzep6z7qyx8fdu6cbtlllldja0szlypsx1v4jfqd9n7scv94za0ewrv3do62plntmncma1huml6sq51y4zo0qqhycluzlvmui1pvgjq52dvx3t18vw0m7x807s8dvldu3o4pqljrwfmfl6wn1aqx73h4ybi33i1w5xqhv2zsfg0iks8105hr3jjla59egfujbm33u1y0mu4tcqnfmit5mv4u74qguzsfxwbc2ows74idhugsgx3q84ujzjao1ch8bmz11tn7riq8rc382hip5kybgj5rersyjwx286dudkbtwmrszf4k93gkffg3syzbehwdmi20vle4i7tnqnqwy2f3penw7xe6yad2qx9ejw2ao377eb5kg6zlap12211azp8nadkbr6lfh1xo4e2jhsxm7a1fz84yyksl5aqqvnhdgcln2zfsq93afcox0prsu4y17lohu9fm86wr',
                mime: '8k8rg0tnicb4lgzh91yp7fml9n6yzdmeekvitv956er1sg5x4w',
                extension: 'q6yy3ovnjtcbl8m3id9jijr99lnklgwy5qabf9szef197rhkxu',
                size: 7433484230,
                width: 234363,
                height: 657370,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '54x0zqk0z7rk59za7h8y5ay0d3m6lmhxkr2i80jt1qwyae90ahc4tybjcpcplwlmquxl3xja0k4sugk6uz6vy6iop3z9pcys9jq047rrjm3ktsezugo8erq5mktdxleywg0jfv4i5azyn0k6ct9gtmketnhkstb2rbo417xkgjr4xjjkmwwyota5kuybfhtcok9n7iil5otmb0k8k6ib7mh8frwb8hjvspn3asm3osdin458md6aqjqqg33v6jv',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'eundl6vun92miseg1oqtnmss0v7b2mqspljjc3rrl476dybg6lmdr5rek9yobtikibswkp89kgt',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 380222,
                alt: 'w93ct6pft1zstcf0wohy2dymy7njql066sqivzmv667bpa9dhnuiomfme7kemtx6bmal486ims3htsm7o2dy0axkqr7nhsfaw6aglmalmopxqtzvl2wqlcu8mb8t6459uxyea5zrimk9plov4a7mognayculex4xob8s4fhrweemiaic9ku9u9o4yu5k0nn1aybm98o6z3ic59hz0wxut3gmx9rsbx5in13rs658m9kh9yja355i6yyxo5cibbf',
                title: '3pwy9gjv4vqsl17rpvsrzqk14eywcqpl0zgt4g4xixhrv0qizw7r71euy7l2yasngo30910zi705ss6lscw5bsu4ft6pvkcgv28c7fo72p7w5x3bpa7dzeyqbc6yubv5j8nib8fyb1296jets0epo2lkcnahzau1drih9y4iuenyr03a6b1bsy1ddy7o8dkhhi2sijuldoyiop98mmv0qd9arzgit9y4s23id1cynfbxhkbt8jjqz16je8l3cz8',
                description: 'Sunt praesentium ut consequatur reprehenderit accusamus enim voluptatem dicta. Consectetur ad perferendis provident iste occaecati tempora eaque quidem. Culpa in quaerat magnam modi. Debitis aut voluptatem quam doloribus tempora voluptatem.',
                excerpt: 'Porro quia consequatur sed veniam et aliquam. Delectus expedita tenetur voluptas quo corporis qui animi omnis. Autem quis voluptas sunt modi eius velit culpa sit id. Reiciendis a pariatur delectus quis eos magnam vel. Asperiores vitae accusamus et quia vitae. Dolorem repudiandae rem sit quia inventore numquam.',
                name: 'y0b9hlwmtviv34kzlf4zakwslg92pn0bv02tfw52bt4ylla6gtxpxb80ppk3o24p6an31eiqnrd4tdjwu3rgm9wl57ndr1y6uv371g0le0icwuv4w6moxzly9612vc1gl36i0xkvpuhh14tfbznkkuxbkl7lxgynigzokbf4tlxhtj4c2sz0w0vjss6hk0zvuv5vtr4klu6nysjbi3c1nsdx468rhl9stg7beczjkh4tr4ws50nanz4493ha4ng',
                pathname: 'd0ypw8qvtllvyx6f7stg0gz2ki8ox2xhjyp0p13568s031yp2uig70qndpk1xttydhv58swwemfzywcmyewe4oas77j769hkbe3xmocsqlavwsdeu9mev4ggxhw2kpeig1x0y4a3e8msa2n27e6lqah8j9hzm945mxxk4x0jazwf3tndonmjtqu0kfppj531bsxwtra7hsl7b4nbsy03v1s5e9vloib7i6hilh1v1zoqmmkx1dc6pdqe0gowib9vzx6zd44b8y2cl58z7wcn1su0zrvcuahym2lcm7g2suhiqwe61uamgsvxq7g5j67a0bnhr5oxm51cmd0z58z7ai3jtsz98et4c55deyebdpwhgxeedvov7nlb4o163ysonw8ht76a61x3r6bbicvw1qcq5f42f5csztcb6f2o48q25bvpl2quguzhji6dlypiullv8ooqeckdnga0p9fre3rxo7d9k24kk8qtzn27zig1w7jti3pailzhj0uhwjt04wyvwucz7hm8bsa20dwljorjvhh6cnp15a5exvdc2tnau79kcl7gxvj6xkyppyaq9wdn2i2ns5mjhstagdr09fubjls9tr5x63zi99hxsyqrndh2thww6z8r1zon9asnje4266xgbt4444zvxyu23w9ifahx42mf1c6kgqhbpnthqpklb9rx5bm6v853ef0xftzhfiz5oayh3pg928jqvgm1001wkggn9ld00mchyor7opn4hhv575ryaavjoypucsd5yaww1n9xzhuqs40pljvttxq624lybsst0h2pqoeah4gw7twjg2ud1gms8qgtwfjkves78z87tyox4o9m6lmrxsz2reovxi4i73wu12tjs9zsuu62f7wmzgeg6fob2m5j6oynepn2149a4pgg8o20k0qicw27pn5oqfdhy0p9m70heeno65ydf0vegbnwvswzdxmwupwkbqjjy38v9onfqno0xcicu2otkdynwhtpiaxl4cws8kmwcppwwxrq',
                url: 'zv7rliz8ku5d5x1j6rz10os5f5nq3kmlj31uzy7xx37ibxulujvam8x0th8j1a8r3dib0chtz2av4uxyh8ajgweabe86yawo0uu4mvia37akqgy6ak9de7msa1nhk8ezcs2pe7ng2i3p3uyyp4clfedk6y6u6711561xi2u48geeuo0iy4ockugporole0llzm3poheipe1pym9lpeal3fyv9o7gq98p8hmwy942tchghv236u34xb55z3ybiaq8jj07j5k2q9tqm4ih6coiw461pwdov6vw5g9qjqv5he3ujjvhsq5jrzlrz06kzfeuxcngisgeolzw8jcrvx9gdd8v460dob30wrq5vwa5r96fsrb1zka1k0tjpjl77k740v54wkztju8pez6eudx6cbk70ni5rs3pt0z2o1jk2agkt0jrcaeizaf7vajt5ob8c0tyhhlq7r8skmx3xp6s2us356toi5y1mrtsif37l1qwkbqywkauotr3zak9nf8gpa5vag67ady0oqrfr8vosgkv6w0rvt1s0qfpda4kzo2xqmu2yeq7tbb451dzglu895w3fqrjc7rzust05mf55g2q51ijit2ronyjbh3m9pmhl4ol2vy6cm28eq8qsh0hfr57yixgje2qe6bi874s0e6wtroiv22ozf0bwgepfhcfs48yeujxjed5opmmbiuglbacmth2k3by3p9s7w5t4cigw4odvb0df52o66to2ldg3cgnf5pbk1fm3c9ls99ah6g8pym6h02tv5vgx8x9wvlfn8yo244aicyuh2qzal245g0838ifqb5wyar16amvi661dcbfoghelonoq2kd4ww7fjhl99gsowg0w5o1pcsm7paudqdyjgl6fb6uz4y3g2t3w7tl4dlk0lqbwrpmyijufxvrr31a2clao59nj5dqn7zchzqjvem9vr5k84othr79bdarwbxj3z1me9cfpg5sc7k1kigy5r6mom8ryabt3j0vwtm0uhybv24464kl',
                mime: '3sa9vmbkixig8b3h5kro2hhwzsezepdg5e428hejffw0x6rd8g',
                extension: 'igxsip1o6d0qzw9m8tu0qtcwci98vo7qf5k3rnlvm6n7gn6xrq',
                size: 9832397517,
                width: 452019,
                height: 840653,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'ny4hxd7yhx06guawwuzk1d0ivb28h25rlds8awpnl5jhqyskuyy6tipknp6019dr6d6qguj6a7j1taq0yls4nfmpdzdv0ckz4jcmo4fmzbg4zuki1b4vb6u1ew6wh5cjiayjsr7uaddnm4way406py0luty5izpebfymemmo2q9ocymmgjpa2ew051kvxz5lcueov9a7nfp7hdrkbd47gkecrn1yoellmq2otf1c2mptpee4fm7xs75lz7tw427',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: '1x6efusn0m3ufl7t8zmcmdh4vl9rxvj7yjbdgx541ydmdx9l8a45wzgl8t0yybf60js642706tt',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 545422,
                alt: 'ofr3k70uku3ths8415hezuar9l6s8u1c6a18kivvoctqxxf1lq9j97x6xt32mcohobf7hqiq5bglv9laemxwczg9sg8rmft605xuxjih6bgehjw3e8a2m1jcjzozp453b7j9500qicpuf1iz0pxkhgnd2bn0mnemp3pbodj1vco29js57r39e2640w7jfofv9p8pzdfgnnww9kdrymppfh66znpk36k6kjqz9x9va3wb7sebpcifp09jx4plspp',
                title: '05qzkpxxdvys959s9c2xylbueksvt08xcj9fgq2x5h6d84c6xcc0lnjew1lu0bwekqjvxwbs5xyncrkdcsl9wsffc8ldtrsl0ku19uhn7l42uh50ey0ryeax0799wxrty192pc57l1cqo4acvtjmstxtu3cphic8twcz9gzaujs2fiakryx0y4e8viv46gz15xgkjkoh52ruat6uwczmuf6nl8prejjc71psbid89mhckbq2ffb1dchxz6kifpo',
                description: 'Aliquam odit aut asperiores aut. Voluptatem aut error. Temporibus ut illo sed odio. Dolor facere mollitia officiis earum tenetur beatae a. Quaerat voluptatem quos blanditiis veniam necessitatibus pariatur veritatis voluptatum animi.',
                excerpt: 'Non iure assumenda incidunt cum aut commodi. Sapiente aperiam cum est rem delectus. Assumenda ea quisquam qui in soluta eum tempore quae.',
                name: '25t1ib5z74le16dyflcog1s4unf0d6vg8hh6kpmeg5w4wi57oghrrvu598d52nab1jrry3g8nmc0oiaox5a8dcosjj17cvpylesz98fux2z9h7f8qrhmu5wkx4n2ffnac3t2hidmixqbe0of0wo2x4bz1nz1lbnuef6ij75ch1eplsgirxhsgaxue7jw68bwxxxnwofegqsvgtp3q0nckd1pq60hqo3sbn1a4iz8m71yvojqh5cs03aojl22nwm',
                pathname: 'jcapnsr4z53m03xvsnh6dfrabyv8q1zj1e0gttj27tnq62ts2c7e9qlem1mkj0vkmtow74tguyai7upjkzbfjjlrbe04lwxo9me98zf23gk0xwm7s0kj4r0vabo6wos65sxy6xiqfp04b9a0vj5wyjzk7569tizdvwn2h2gvwqu9vc5e49dv0xb0st9ga3ip414ovc7knzbwa97zckq8qolx8s8o9o2c3okhidza0ddfboxwwnecd51kpuq8x0weaoumrfp5jla2vcvtinyo6wf35y8z9ply5506t6neimi7qfbwz8ebowo08b4gp4ooc874bsha443rwd7br0xnd9sf69cu7sje5p9zca6xuvilkz5eckpbcr761v4nnod6rf5kaf3574co2x6ldlm04b647foevcvcv56nr6tvuj2r766m4r34na643jaowut6cht0rffh9ppor326gsg8gyp2dg77wu6uab1946i9x7gt3tbtc6nbqcm0hzli2envzh1on9qv15fjrah6ru210a6ihhbcsupxly648cwe1q9sgvolrqforg1rmwm2rl4dss5myvpytrrwl5d38dzclc75m69mb58ovmpc6dvsy1t0lq4n3bz63sn6qje5m6cgbvfgtt4tmedw3qukqbc7sdzk8fkvg2bxgca3a6xnryfzguu3zqcr55ishncm9mjrbdxt13wjy5rl6xve2pr5kk0el826esb2i0lb8yrm1h8yuesvg1hlkot03zl7e0l54szafig1kjt4whbgyftojx9pee7gwu7zkzpijh6z5qd6x12gm1v1b8ee84ujzd634dwcy9c8ziixou3ods29i4patm16tvi7gi9b526dse6v5qij8qey0xrq389vxjwv3s6xnx1e1hl31ialfje7makjzhxm2ggxfpo7xxov9yphvwvekvr7jiqf4cfdgvrf1v4hlgtkd07gohrysy4qrj6juu7a5u6qv8bpeccsi57wxlirg2bi2cekpznjq1tq',
                filename: 'ngrphwlafd1cr789o73wbbk2pbx2kmivr3g8wpthlsuj0wh1zeseprtrfu77tfjp1zlu32zinzvxq1jfaajip340jzkrpa4ku0btsy03xk8ixtqa7wggj6masim5y137v8ve84svlekuar9vkvl5es5jygno2zy3olvf79va6hnojbnmau2trry5er1ptptersdf0uetfz1ie4iky9ggwzg5q9r1siqc9iet3ykqoyd24omjklm7govsvjq9aur',
                mime: 'xq360luqinqjrlmj5mzmxceqwf9pska4olvojpvrhx23y19jbf',
                extension: '1os7lsmeciecmvv2cca8pybn5hqbqr50kr9amrof2brev3pvh5',
                size: 8734018232,
                width: 980642,
                height: 634971,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '7w00dqi5qgx12q4ml5ywesbzmrfpcor533cwxnxbgi2whs2b6gg6ic0y8r24o8l1zohn35mmetvvgszvo715pnck8vz0a7pfbzps43v861piskox6xp1cabk3pnacs6zqagjdenhdiincpywkkgxp7o6v02gmbgdmxscn48ldrxx5umaxgfra23oh61y1wzgf44v9l1zb3rkl3pcrhiljo3a75bm3z9300tg1ba0chws9a094dgnsq5kh3ceokz',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'dchmkpbyhfs89rcn4zrm6a64y6axn409skx98eapdo9rhzvb4aly5ir74oa8e0c4hugeelkvy1k',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 685803,
                alt: 'uj5fowyvixo8pz35lgud3dy6n2x7aws8fcr825aboip6vctm7yq0adaty5bnza9ja4tft9tipnzvu6z28fxweet9qv72k35v35u6cf6pb4220wnv5wb9gkseep9lk1n6oyfa0kqb7wxhu07os8553o9abaa3jhkqxg9toebbcx7atynqkmpfrx97zf7i1yx2167ep052mio433v89xje7ncw7zsi0ocrdg39ljrh5o6i157z9iuv6uyhf8etl57',
                title: 'tmdjaoz5k3kgcy1qqspel65fmzf0yy3mvpn7zjoo3a7r1rwm4fza5mb7c0cl3s140sgx84ogbup8y1c9tlgcjn2nqbrwvag91u0ri9ya0lv6ech1kxr6m3ixj6k1e8j7fy4g9d9x8y5x5m7orwx5isxphw0fhkchzkx7amh8cft3ot8klhvoo4a7umzjd1d3sfq21ocmwctneuck042qhh9487zudgaf0u3mapgbz60gafi3joke62vqx54w7wn',
                description: 'Delectus libero hic harum ea architecto enim voluptas ducimus. Mollitia asperiores atque qui accusamus aut nihil quibusdam facere. Totam fugit provident fuga ut nihil. Dolorem neque inventore rerum fuga esse amet tempore. Ut commodi sed labore. Sit fugit eum vel facere saepe sed vel.',
                excerpt: 'Quia dolor omnis eveniet id mollitia quia possimus voluptate. Perferendis culpa beatae molestiae est. Cum veniam perferendis qui aliquam corporis. Necessitatibus voluptatem accusamus voluptatem occaecati cumque sed voluptatem. Aut voluptatem nihil.',
                name: 'piazhbyrljraq6q0wfhpn5frq4xon6ri99cw65sjukdf92a006z528p5dr3dgc60twvdne0vvimvfs4d1pdbeb7fvud5evfpzcknsgtoquvbvfl32fdbg9lycbptue574xp95z3pmrw6myf2v6reusjxi5nsrc12o767slv23bo0nq5dl650y7t4dqd64c28pt6zb273e1h678ptj7zk17hlxgcdkit0pzzwey04pcwhxyy6362y8xr9vv5mgdx',
                pathname: 'vljejl7b2uf2cluyz02mehnfaxtykzq7re63fq0r7qit82imzkgo89ky32eisa6sr5abeni3lbk4luab49pxrhbm641vhpc1zf41dfobjtr79d9mm0ch1oqosdwefn3dahzpwnm2hv00z0jcut1xw4v60a0lw0q4mapqczc1kyxdtmxh67yswbgthgn5pe3asr4zqhnfvhnrx5o9i6evbu0p3aphxldt16tonnvd38b8domxubkq5t1d9dh93melnbbkc7bkcx91c9ply8qops9yi4xb6al2qg1ur8n4sgl9u4gw5p4m9e7j19iexpwkik5aqr8t3rnmugg7jh7gyff0v7twz2okxnlfmo2ali6hqt3k8omtbptgqb592gign10fnbnfph8jr8ljcyi1ifdx1r9nkr1kpmx5vqlxwnshl19891urkup891lgflvfwajgnnzdvlxl92c02aaz63qs3oxaodaqf8xhj2ac7ge8s5xgj4ltdmg0vvpet7hqiraj5y3e77xw3tgk6gsmown6orpjo78wxkewdoevu0p0uk6jh8jky343ddi6czpc7odxagl0vshb0qy2wonek0ixdmf26e2dxactooka1lnkz8esew0hycj4a97oimythumq9vetayi4v4gc89cx7jyzyj3rm068nts6ea3wxvvdnytpirccm739z3lepra878zmadhicy62zeu6bqy9zmonbc98lbw4zm0xnf95gbim3ovtg0vbqbwh11n7ays3mmcznmo6ac5lxjqlwqudb6x9agn5g4y0707zu4xca93on8v2e0ipcpgmcml0tznjrxxlbq4uywjaftkkm82mj5o25pylq51vhtlcs1cx45n3jbk95s4zj1cj2caf89tzv4u1orn0a1ktcomw9jbliq4iavwmism3sd0hlll7asl4tmah8x933fj1tp68v7kugrl2yk2h3mzxcp7htxp9u12xe1iw2e2rxv2l9km5ru7ak9n76ler0k14x9bo04u9',
                filename: 'eyzj22mwnd3ev00flb2wntof4thiswgukocgg35jsz5y2290r761e1wbtxindkbo6723xu5l0mjcif4p8l75nus2k99ulffjzd9b7gnyhyrqot2acc1p256158dw2dkqgv5y0oqrhyxi9q4mnlfkdbo9oluatutncb8rwyaupwuiac79c5wksv1xo5okxwr9dmobca1xazkrv14cnmfqz9peumk7zh6st2qk7dris9r31p6ktglxql3uzwq9q7l',
                url: 'ainozjg1psx37se05xiqs1gc3hskwcxphpsvafpwjfgjok8iwyg7txf7iiw2wuizrwo9x0hyv8fonncckm245o7xauzukyl9xbp8yk6xm8dl566i2yp9rwzn03l1eknbwpezgufatutatd4zpy6ij5u0jigqm8qxhmec5uqebtm27sv9rh9e47jvpc64lhmi30lv82dxqkhokg1rdgdvx5qcfcz5r4f33bijahe2bygmbcp4ifp82414bah8kzzic75em20bznq3z7cdj2w6i0un848m707hk9vfvvxp13ld25wpsa5bfma11yoybqf4d8t2cgpg0jl17hqxcjbrcrpqj884vtglxyxpi819mh9eaa0y89kbmhzc47efdd4wxw6xe9x6xsg4vpk2j7hn1mkyy2lfeh8vu8abxx53bztws0myrcdfq9w5y939ixadlt3xuj7gk5vg2vfxr9upppiy7x6see9fxi32k8w1wqpeuqjrs7ybper7ehvesvhwweb5w1e5qavxxebcks2c17a8989v4ptej3vflgewdwr1u9pt324bl1mfybtmyafi962ko4xdd60v6gsr6knx6qufw0ud2v9uekpzs6g1lhmj065bif29jl0ub9cvwrltcbvcrx9a0xufiiuteer2ysn1o766xtl7c23h0e303akxuv07658wv23vkrsu2bzau6z7rvcoshms0hhmzoy0wy13cgyoqpcww0vuvjwksvc63866vnebggkcuj08rptgv6h7nafdq1or1zbwgr6tbor4ucc9l285xw6sfyusymhd8l42ek2a7t0cpfvxofwk18zfr9nc1slnk84vel2izmp1mo1zq3amf1mwfid52o6qz3ioafaf51zq6bknxh6a987gb11na865lyagu48osk137ajq9lku00wk9sh7tzz8xxp8dkgiw50bd1st54l5j4yd3kma6od71efptg6r6zaowhs1wuvn72ssldclrv3pgxncvq038320oyf5gmpi',
                extension: '7cp6q87sm582h998l2gx2dlrc8nfrtotczsylxxln7aldypc5m',
                size: 9875999075,
                width: 544000,
                height: 596760,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'mtsawauhnfk7w2j3p3g0xyibke91pwdxpw69r14oc465vwtsdj08dhsuoj9dbnugt41e9nzpeh5z96n25eghleh7rod66ha9oazzyf30xlmrk36sggtvt3bddp0570jgjkjns5x40xmeyc74kgj4zmp64iha5zkzf3x7unguc8hr0ep0j0gq2duh3fhlu5gq5wgpnjfosaa7fudk2jzdq80ausxa3o9rzawwebdnfolqbkvm7scgicdi7llt6a6',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 's1aoqhafp4fslkbv93mw39sufedftllqjbsjdmtmgg6six3xa8a9byexrjmzmoarf81o3zrcahq',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 424869,
                alt: 'bu6riynt0s012v2zukhs9enivolasgjif8b3dnajuolog8mpif4h89s1o9amm3lbyx8uavk33b2btcybmp7a6fve33so1kkksxuskbau29jldc1p0glgnsq237zpqqe7qn25jcu9s14kuumzqz1c44m75dlqdlhcx9i0qnokj7utdfmtuegjgn3c6lcviw88qr3055wd4i3nlabd4x92yorhln0bz2qm3tp7mzownjwvg3j4w7bjh43o2f39kwn',
                title: 'ki108dszkvw9aiovtqkqq7ju2czm4rq3gzpqe7eyxi8burf6e5k4wjwlzuo13ysyame12xts4g3h420y4woetyb1fwid5xpbfbb7fc2xql8b3bkvubkyebila72ickf3ait7m82ijbmzl7hqvp1c5zee0qjf8xb0yk8a1l86k0qpvavillda6qx70t6k2too2384sykl3sd8chijxvf7rcvlb40y5erjrzkn3tq8dey26y2s3i3shz6b5p8ufw3',
                description: 'Qui eius consectetur. In nisi et. Eaque blanditiis sint est officiis voluptatibus. Iure harum sequi consequatur fugit incidunt nemo qui ipsam. Perferendis et voluptates quaerat. Eius quaerat quis officiis molestiae cum at et.',
                excerpt: 'Recusandae rem voluptatibus voluptas optio accusamus exercitationem ea quam et. Corrupti a adipisci. Excepturi qui in adipisci maiores ut accusamus facere. Sed natus et et distinctio earum deleniti tempora in.',
                name: '3cn0x81e70jecgjgon9xqg5k3b1xrwgydetaosbkm1eg0dm3i0krfi7d0hhf435wqdgcipaqu3v5vg45khp0mhpjq2axqfah24dsqk9c1v7wkufrx6sgdriewsdv1az0hz6r18be6ko430ajoh1wxiezm8wjt0crc39xt6w0catbui5am9g9bdjqpne86e4366kwzp1deywf5t8coz0okn0impms8pehz6uurfj5510st023wdug2kzs8waj58h',
                pathname: 'zokl9e9vs8i4b42mihr6zr57ogmc0q4sjv0bgqr1ymxnv4qx2rgiiqzx9utmufskpvzjn08gt38nm3jmgad6sgb3uwg9y8aaiorqatxdvakqhz5aj4ylz2zy9sfb86l1spr6e73qcyy8j9lc6e98t58g08yewbfmc8e58yfa417j6vnz5771nb13h79ujnj60shi5a37irm8aeuujdvy8z3h807jswqle11l4nz6v8qqwz7jybxftec1pl2alj26si9hx9aloqg8p5ysg8jqe5h1dk8fw8dg3myyrfl4c14h97zf5mbjs0fprkxg393krbr0f6mocf2pid0mlfudq6oolo0fv122gud4g5llpjie7yalo6s7j2fq4j76ysq4sv8yksdu8bmv4qr073oas3w7srlx2jnzz8y2ojuceq74z4b3c4j9hqwl4udwwcc7h9et66ogt13lbugoxfebbk78bq5mir23hgsw0y2qiylzyt692sjmzmhlomr2xansc5xbbxvkq2edkhlx867hwfku70q8axbb41aoaggdzu5dlxg6azrcnjwj60953ryxnm0btr0hgktifjlqyz7p6zikhwh1rcvcg535z9l7wr4jkv8sb4h6zm609uxuzaucd9bwfkxrrwx5s5zprd33o254cdo551ljm07x0rt3a75ayt3yztdcgpb422oldwzruwitz6rh0ec2ekernw7n9uo3c22j6hjar9y7w20uxpqb0b2ia5lui0vsignzgd3sycy9inm7qufbh16f166im3ci2ts6yhh27jcct76dq2flms2p4rpceq40p349rbrfg169y8wdndnti8ml2a9oa6cmzifbmv1fup63yh0i1ochiv17655d1t9l897vbmn5b8hbhyfx4rsd74zs61sqi94k175b0scmnwflp6defjt7rbvemghqhhm71dp453gj1ga66xgy23nbuffyo7gjhdu5ksp50sk13rjal568af90xcwoe3ixl6i3q0mdmnhf',
                filename: 'ffmmr6b1xi2k567zo0l8jy8uxewl9jxq9nl0iy4ibnieckvwwffe8zok27ozekv1b0c5xvsed2hha53pcg6s24o2xotg8skr45dy0xvoesuegzis02qk5kwn5gtbpydjcomgxorvqx4xjjr03br8kfm5dfly53d6kczytku2of9h0d01dghjev4xa1dst92qvbdae86t9yk4r4201tf7xsih4sqafw13parzyhfjbj8vf345f8nqn05pwgy80y0',
                url: 'ioa29mlri9tkhm65433fqyvnts9wn7o3xnw8st9xioy00ncnb2eu12eixqfvq9ae2oipqhwtj6342yh1tj75df01ca1vpsszs1yl83n1rfcep35ej74i02xz67csulkzd7khu6nrty2xctibyx9hzx3w6iseqjdjiw60g8fr8lu7evo0fmmiv8gosqosxof8dmyf91s6nascaxkuqt543td6g0m7ycumfttqqjarfoqqvn3e0bztfer1o4vfxpgpqmpcmop1ph40f86fzqqzp6tvlojgyjevr35ur4tirw1dp8mxm9p1ykh601yqolnw7k60de1pmiid5n7to74szm8hqrfirz719x1gxjp60nm6rky4dybm1cw4qx5g7zqic3mvlw44gurjba3a8kpl105bvkt3f0hy30ah2pdf9k1mk2031j98bm6dhfcrfbrjyj9ieybvb0conrses0dg7kchwexpq1f2czzoqypel4pkz4ndr46hfky6949s3cw6wb7kzskq4n414n34z2ml6at2zsgde83r8ar0bm58hm6txq1ow6fng906a0abjs5kod30mxltuqjq0i9urjv0p98llid87gzsn1wmpn696hzpihcaudrhlbj89n428ttsfrhihdsna2mkl9pnkwgff0pte9e4k0sumr13ipo59026nrkvwm7xascvozrqeyhz6mpgtnhzxfjr1xmir7p7hnstt10nyo5ormva5u4pm6mknu1ntwjfxxgb6eca31zyx3ptbc6edgz3qc9r71bjz5zgkch0pteilttyn7k1w1z894czxkdl0lixevxo6rqles0l5xij10ojtwmfyel4jnf1gbkm7wrt7lojhxss7ekzqm9rcmcslct6aaxm0ry2mf8sh9d4hl7gkik3n68cm3aoly3vaw2bvmm6zn0jc62pzn0bmel4eenrjzem80vi4duzktmi39zgwo86qyjti3uqg3xwcwklmq4lvbvof3daynxzotcjl9oxp45s40hn',
                mime: 'x6y6wu9xafw2f3lg85nuif63wlebiouxlk2un3jom6lkqvgk8m',
                extension: 't3r70xagmd7qvdcwhsac73rmjdgzoa80kbf3n7sg39j1s29dwd',
                width: 147637,
                height: 994122,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '6s24q3t7kqr7z02rrfyunzptxozom238k7bnbl1pz93iv6engjfipfkn97fiyoxiq2sgl95e57234e8ml4mk8kl1e7dtd7hbqdd0q1hn8gtx7bhfe6o2v4cpku6zyub6v23osmxfa27fvmshv8cqxqfb7jh1673z40c8d515tp0bmzd4et16fqt9htbyt8w6jlnvtik1716odt6qbu0tees8zyz9kztlqd4dn27ifpl90erpkobeuqi2tdgz6pg',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7xyv72wlv3yvkvvzh54wl87wjb9yts1dxajt4',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'tt4h1igd61x3p31xbrg1e89bthp7vl8plo4ck5mkl1oypzo3jenstje1b4fq097e1n5jl0d5r2o',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 420403,
                alt: 'x289ng6nwf4d3tppwtp0dx2znlr2b91vml0m7qn3050su9mms3oaxqnyhjucpjuzplkfai39ud269svg6ac06l0tn7nmpffb3rgoj7w4obvexg9zcdsziylt4jpp6flrstehkhezhslctcv19jc2qnp88phsxx8m5jok6lbv8u8gou0ssfnfa9bn176h4s4l4pf1fdhetbk4g3amju6fc15aynszxdb6apskopfcd2vkv0557l5la8i3rbasp3d',
                title: 'ygw0314qju6727qay5p2iqmgdsi4p8mxotyv05udp3vbcg4515cjnt6n1sc7l63letbiitfvbh6z3r0dzqqmik4oj7kdg1uqu7nui9ypslkqq9fmv9zlkcz2esyqn3einoaakk34jqmqc1iuhgnp5rauavamidwogf3mmiqk18d94kcisyu6wz774wzvy5xpcjfb1qqeu378ls4xk5ivuppwn6xgzxd8pyh0ndtev1st5dk9so00cq9y5d76309',
                description: 'Sed et voluptatem corrupti omnis voluptatem aspernatur cum dolorem dignissimos. Enim commodi explicabo eum et quod ut. Debitis ab est reiciendis et. Quaerat eaque quo. Sit alias similique voluptas doloremque aut.',
                excerpt: 'Voluptatem sunt laudantium aut. Quia consectetur iste consequatur sed. Doloribus dolores repudiandae eos ullam quas voluptatem qui veritatis. Atque et natus nemo.',
                name: 'plnyv09m7pd1j5asg2atgww1hkj5w0hx6g7t9vcz1xmof806125f4eachyxhrkwvjt7n4phepiziy53ge8etiiv4ihw9nxcy6gwfcqzzkn6wzaytj6vhktn7zdzgk8nsald54d5txp0123pkkz8kk8mxtveg9qrblpbsy8xx5ujl1l389ava93h6cqt17wuv8i8e1pg0n6n93b4odty7gv7mhw0kpz1k8f1mf4j76k5hag2ciaz50kg246bhpe6',
                pathname: 'zdj6qe6ukz7fvlyiyw29xgws71wg771319jxxh4yi1jgt1x5acuknkdq7tvi6c4qt15qxiflkeme0eayv0yqevd2fqwidul6c4gcsdaup2ui5el7be97f3qluhrxdb9sj7d9o58uk0a9fke1qg3m53lx1h0mr4vwh2fnqknad1zno2iaou52sbky3vpzqsgewd1qgzan3mf0jjng4a0m0yp8rtjuewsn7d4zg5zm03m4h0380rusntnjfg76w7p6uxdbi3pgr6sw48qw2ucsttcf9m3nua9lrphkzf4l6g11tyzkpezffwyblmqjlxhcx3u0h1g5tju7oe2wtciquzrqudvsbky42m4by1fgzt34vffplj2m5tgxy7ow3zgchsw786m7l0b2ih13x93h4h0l3xjcu7rr9kb8b6m8190ryorw93fyf2cvbncmrvi0ft19mhd2jya82ijhq2xcubd9sygn0hbnhornrwyjgzn8qvz4973vl8qi1qnpwk648j2jsiohjxcyruizuos7qb0npr7ybzjlvhfnnayaoesbjg620y2kqp3b2nwfss5jtlb0piu8nmhbl4d1pf5y2tk95q3itptd7nr79nz9pyxgm7nhksnspqnm1su73y61nkcrh99xfzzl9cg9lkexle3yg6km9nviox7m5qftvtbvgh6fai9l2k5c3fp0lsw6t25rmmkq9czopg93kqbcgdfheegm6bguzer3ckpkez7se8kew8tjnrxoyn2un0ctpcrwsu6qrnihsakhgj5o732en77q0runtjj47u2xe8pxa34yxdq8evkiqq6rv2qu02fft6cemvomp9suzr8qb93690sa5zjmv75ocgiejbv1fd2qxt3xlujksjtng72ba618o4g4y3e152rhyouxahsrvjixkpb4ns1g0yxly3nuv4jligh0nt5mwf1y4x4g8k5fhomf6idsluja8lvqvyx286u0088nr4cl991f2xhasavvjx42ngyrsmoxkyxd',
                filename: 'x5p0ud8z3cc20eaxu5nq097u4f7anqubkw2w93dy3jek1o8sds2cwosyspwuiklapec871c8w6h7r8akg6yum7pp5egtcsyl9hno35mwz0mlwps4qbxurcd3098kf7yt2fta0cx6ss4zu7lh4py2kffuygrb4p6lmtfv05cb16nl5algdztzmov43svk8rrctzv9e456lkonwgrtanc6l3q6rhnhlloba0p33cxj3ecsk96mt6iegeg3kpkt3vx',
                url: 'mtrroa5ixpzrr3ik6ggye3hfmatlvy5720x2fqhpg6ot5cy4rhkgtguayvvrota63pxwtxszy5uff0jm4v2jmxrox73bg5cft2jdiwjuha8rgqpez10f5l36ml2kn8jp629272ttqgl599lrkgsbx9coa2yishja37edw4zc3ahj49s0rqmpcr9iowq6mb15bl4ghy4mlamdwsgo3qz9v3b2wizbcnym6esx2hficey3zqm4o2grxhv8i3ggorowizkzuuw92amh0tm1anpbcmpirudxp63mixyleg1iowkvhat9q0syoe1gsudzib7h7wghdf9tityhyjsvadibua0ywn4irsjjh48z2qdto03l2eky516hcq8kw6c04xwdxqmfv7388fo1gjv11mphupe3hobw7tzd0wn8i7mr0slhqux5hahpactjv9ruxm4uo03qn3e6m9a6cpr2k15eliusbid6mzhrgn86lzmconm0le7vkx5ddsk2svm3cu2zp5npw4z6tr0f23qtpcddblpyjqrx7aotijtq0b5iion9conn7nolpmluys7xts3h0bxpfh86jzkg8jd537ilbtlb62e2mm7m173ignee2khcxlj21jb8mxivffaeudwmrbw8ljeuinft8gyx5ttgujbr6ru2yold1d23tnms6kwuzkuhayq3rjupq6j5l1p6jmby24jp8qhz9mn82rtoofkjbe0kg8ni2b1g5eg4awz8loc87g3ll8ugskbr50fgwk0pv6un5z5tbd4eu8by9eejmlkuogubj252vvcpay7wf87n2i6qipo89s664joxjxnm23sr63c0jru42m2ppytfc6ik3a1se2rkuz72ukvus4syevdn9k9wivu3vizelcwkqfwha1fayihktykuxzvqzu62i4btowao8qdjcxp3o3w5z8yd7doz5loragcks4w3szdb9hcu0785eupovf9funs10ejk5csfkywgyoxewka3jmku92qf17gcsp4p',
                mime: '96jhodnpay6jxd9a36qzzswnc1i2adfgl11e56aw0ft5xi1isa',
                extension: 'zb4m8tt0u3oxwc6mvdcjcswm5ogrrgbioocbs11xrrnjz12b3r',
                size: 1300992860,
                width: 592946,
                height: 706671,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '8eo11dq8qynwltp2ctv069dh1cqv9egp7jp5emqzhu0gw602p9j1kcxvk45vvpkml2ot6yeu4q84x1hbhz2oxkw4b0d5o7bnuwqs9m9rfi56yhzjz3ka3cjp4limsd08fr37a7lp1r40pb2h31z1qkdzcikbo4spv2cliycvfddekhak8665kld63a9buu6bir4cnhxgl3mi39r3nbgdllunvrl704v83u5v16rvet4tbb9vk07muvx7cexi8s7',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: 'gnes455ct0wjc5gihhnsxrwdu4q0w430bhq4t',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'pmexzxaupbxf9n1cjxm59jk0n8ff7m4l5e2wtg9cznhk73ml1atp7nqeqsa7hwadxdgcf70j3lj',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 909386,
                alt: '0xswdk46su5cyg34aig34rjafv0sxr06404xkv3pcxaa12266xp20emk2nglwd1ekkhwtqa3qbmwlpdspky6837sr6y7nn77vd58eccv10hkqrzkbn9zkr6ta7uwf2u1awdi92icyaw0gxare29hqvchdt9hecolysqov5y6uttokgi0bvfm1csnernxyy4gxy2nw364b8ywc1oe2izedwaps00t1wfzs0k364aapqcq3u2ipmpk4smd44y8eqa',
                title: '9fwodhv1xeo5mh56b313plm3h72p6kig8fohy5p14c2npn0thvh859mm9b9m27wpi6gppmoj7qwwsarwaq2ldtvc0hn0061h55sgaas53wk4j4kp9ag9gvpp5pumglzvmjk143hu8l2rg6mu5snlqf3poupka9l3680343t89roh986vxrenu24jlg0qnuol51aqhxckxapp1j1kstvyi4rot3v5gvujani6girshw39pw4l4ke03m0rlfxdqir',
                description: 'Ullam odit tempore sunt quibusdam explicabo totam quae. Cum nisi illum nisi architecto aut debitis cum error. Aut in deserunt quo. Sint possimus necessitatibus nisi aut non aspernatur aspernatur. Sint nisi ut.',
                excerpt: 'Excepturi asperiores dolorem. Asperiores deserunt commodi. Et consequatur voluptas ipsam maxime odit et. Rem unde qui tenetur assumenda eligendi. Rem vitae adipisci maxime.',
                name: 'hyu2jk94cyv1vhar9vozwe1q24e7huc60hp90gf98erci9039r028ok173t3111769fq1cv114sx8a6i8xi7vefe1r799x02bcz0dv6kwe693rtdxge8hn3n80oymxfvi39sg0y05lfbuf1s5t33i1dmfgu05fxgrtq08wk554acmovfb116g6aywd0sj90znak6yh0wu53wv9434bh7gp3c56939zdtyk5lms5ga744ygzol3fqz7f6jckt62w',
                pathname: 'q4bxrxocc2lglzvvebisjtfg56i13eckrlcn3otqsfjcrb2czwuvziwmhcsn5s9dmsr3ay6pog67yvcbvhdn8etkqm3zzn7um4ynot7g314fq8htujj6io4gxij14r3dzlukazll8she30n69i9kx2kxs6w1fabqcs2csxcwi01nhp09wvoqfwevqq6xwfbmutp0o5nhacsci9upiykwsqvxvstw8p9j6uj168nsmh6bjw182rvw5gikm2u6q6juszrr2fym4xak41x3nompyml1k4h4ukayou8g1ozmrs8ostm43wqbvvdl5nhknt33wizy14cahs4fl2iqfswed6rpqoownbgilaopbqgyq9614dceeva2xcu6vztbyfacr142bnybwhui56wzeg9zejk0rfw5y74p5mvalysrxsb7h2b0ely96f1fczlbzl85b6kpj9nofpfdzsukz67qgt9oabcxqkcl3ymem5efz6gwifn09gbzn9s0fne7r3ewbhi8xo2yb2uuyw23fi85atbdlubqbtd8ai558zt3jph08qnr2dio2puavophyzxeazjhp9y9pq5vjva42fj17mbjm4i0fmrd7nl2rvva79s5gu7ajkg0z4tc32ao2p705e2jahdc4af2pgr6wcc4fhm7zvp88u0ti0xdxdhumscasme7d8q8y0e18qq3xhz3fcta4hc6ok7tosf1pmqfokoj2x7slmpmeplmcrl3l6le3cicqbd9hctnepumf23gcv6ijl6ogi1ed2z4cmxadq46riqoko5tg9gibslh98arxph5ybbcdin7n1fcfoabdixt8y5ha3ge1qon8f35hpfh0q862ra27ci5zhf2muyek1y2w3vc1s6qgakwoyrt8tmm4r82cnefhfrnwooxonsucls2upnplbcyvkbyl5qqz7rwjcqwm98yei3a9i92j2i3vkcwfho2cv2919hgn05cm3xjlar4246tknga2a8vzrwfo6c5hvbi6po62vqn',
                filename: 'uldz7wd5xer7iuzq1wpt74ugxrofsq6wutblpep6uta527lp9up46urkco7chmxhkiqtskixo0h4vn4uowh887rj3zrds0ojdjrmvyvorlyk0xz3opyspbt918cyqqjf789ij5cnnse14irtqmc9rp3tsk0kan5pjmxrhi5i01h02phdz42vu5tx8nylgqxvqlboe39et3haywfz2ai1lfv16o31de3yqj4tmp3c3xfb9vka0kmttk07ph41b2f',
                url: '3m99ksm7ofu4uk40mvpcv7dma8oma03q7oju4qbvn2e9a66imyurjjshi5ks094joc8bppvrap7iui04wu8bc133dqjvznpqyoukhd8qmpyik8j57djkglimxfonmcy6w2n1i3r1qek1buv647h5etjkk3p5olsbxrw7jvqyi735vupu1jt7g0logdesc6u72lj01cat3wgy9n3d8z2qv48mza7riusm2f1ywx1mnabvo0cg88lehgxiwk272txd3seg6mfpprmmx1h3o3g72odhsdqoa4mfpgdf7pxaa2k8i5t84rcrzx57argljb0xm32txblhjb8l2bxbw5xi9fv0j1ajptxf6cvdp2nl04gok85wj17tjdlvetb676ybidmaw2ityg0942cnyxuncuoiko9l24rl723yj1k5fvt6y4e7648xje7gr0y9bi4u31plu01mwchmrjszrzxvm5wx7ao2wfra255vwvn686nelzzv5shd5gxdceebw9o2m0p3pein0uxwpai0ls6tbbzvi0mytrda0k45g4ps6idt0q1amz3yhb15llnz8gzt3nvfag23q036hbp1fbyf7i6usmzff23ox2o9v01ozh0nmmoawv87nm8a8g10sr512ckqiibyb2r35errim5jw5h2ic04xlz8uli56jwqlh8knhxwe7iwve332zwo0eduzeq11qvft052n1f63o3gevod76uqk4v68jsqhkm6sc4fiziczpo88nit5d1w3css64xmtlwfttichg4ls22td19cncn0hewjm0kjayaggtkf6j1rijsg35vvql3bzr0xhdtv0cgvl59125gadr3e8bjj82vhkpzokioo5t7860ojis0gplzkvgbh42drixj04z21n2r0ctvyld6mm9nwhm54yn0k49voohymv0bxnwo48f58koppz9q4lifhuoyh0m4yoxwckrjp5thk2rwu78x4mpymtwmrbq90kro0rzlybeskcg3nam8nzjh90dlq',
                mime: 'dj01s2ia87byyzr9usiis2744cp15j6k7d50qldo81jwtyyl1r',
                extension: 'lagcgodko6ivu95vuzdyn7r5uyqafzda0litjt7xyv00herwcg',
                size: 6645611075,
                width: 900252,
                height: 292464,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'dxz9fx95jyuh0mkxldolfix1h4lxvrct3kuepml7f8aesm2u2pldcfor4okjfcmtj0zpk2qxf0eqmw17guub4rj7wo01urfk4tg2r2nnccavhef8vdslsnzz679l51agjzqn3lnb1qoygxe65lle5vkpon46kl5dfaeteln0dphk0gri6mr9y6i3gwpnwkc8tap5ncwxyerv1v6a7vytv7zl9nui6u40dxv1dzddtw67bkn2i7nmbsi4268szxu',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '1svspzajitv6rt8n7njvah7w53geasu5ct5yv',
                attachableModel: '13ngpz61xigbjafiev86x7tudrctq4yrpe4nw1z27dzb49fvtn0tll269wrzal2taka8w99leoz',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 667139,
                alt: '9r1z47qg47aldoeqv76bbj555x8aijt4xzvolmeg086bcgtw2cdx78slby4grzafhxqepce7f333mr9feiguz7xq5f8w7gaqi39ml89o375z0ysib92jbvya7rk1iky34wxlen1qppbywyn744pqc5iiq49g1vbbb0kmdg0lwiqoye1pq8qwaib8dxdd2hwwzsdwhx0wksio7srhrgmpffecju2tyr3x1uejal1dk1gl38r4nmx0y5o1uzbso5p',
                title: 'hbgryurmy18kqjlba5zdihmggv59pbkka7m29w5dwwjr7ugqb39hygo37bnmvs1addbj81whkb5r20zhoigrvdp0qt1n5z3ho72anf3ysmezq3f97vzci2q292gasqseio78z7ub62u5e9e03nu2u95akef0655pf9x7xjrtxpvrnzrpsfq7ha8kyrbyhstt12vljsjpqp32kxxayu6st4qqlomxorid3ggvpre27xi24c5kwa0d9o87fpfpxp5',
                description: 'A assumenda et deleniti rerum. Amet voluptas pariatur voluptatem. Distinctio sequi enim. Eum accusantium et autem et blanditiis.',
                excerpt: 'Amet incidunt consequuntur sunt mollitia repudiandae nihil dolorem culpa similique. Corporis quasi pariatur rerum. Id est nihil ullam porro laboriosam odit.',
                name: 'pjno3evw26untqvoovbso6bn75k6dqt0tptmqn2jlkbh2kclgl14uovr1gowzt843n09dbx3p3zmedpy0x9uu8hoepqsbhvaqqkkxuu5enqygfqb2g629yz8ojl640vrtk5j7c7z51owyj4pzokkvhn9btx3asqgxyltc3p2znlmug7bu1sd2o4khjf374f3lgmzsd25mox8bag0uuupckdbtdx2ftlesakxhjsmg00dpkwm854w9vwxdg7krjv',
                pathname: 'g05gdkq0eked0cyvg4nsy70dworf7biawnozfmntezbssmwnk1zzjfhg21b3ik6ss7j30mukid54hj8iaf8je4yx2yvlq7r45awqdhhhsdvqjy8hvpo0d9wp03gdmhn8cl5ngsry6yqiv3lpv8ku98tku9fhcbs7ikjvdceskj5oby4kj5vzk2qdtajasxj0uee2potbo8maf5evtrpqh2bbxzuxuzjpmcyzye8642nyndjb2rqmhwcgzby7zji8kege2xx3h48n4zf4as45tv75ypgdg2kgnslh055lp86vzqd2i74glykpbnkopukd8rn61qk196pexj15drdxclevnsuopjtg6a7xkrm1jhzj94woienuy7hwaxg71y30af46qnjsu6wjjt5i3obug7osrd5867t6wbgvl97wbrqhhm4gzo4r1kz3f0ztjhwbusnleljoywyc928ig124ybwbsutca2fcgnnl86gwk2z486rp21di1c0cwul9ytu79aegtin02rmg2qz83dmk1bl69ruqz82iwen86svcpgvwutagbxxe8vdpcaamxv5hs80n5jwh1tnziamonmd0z43aewynoz1xbkkqeurvmjnf762h8pxa1ggfdxepru1h2wa9meh97odhxi3wv7nvqk7snzcatqg7magk5ae08zkrnthvfacswsh9jw1rxxniea9x70h0e04c6zuxu8gf93z459qjbazh11r2pfixzqlk56cs40jk3al6jwqwj2udjp5071rl22b51mpjxcaq294b9tzsfx76bfssff1zko53en2emh5a76zknf00n23awrlnvxmprw4wfjdonw3fomnyxl1i4a1q1o1qre7s94ar8w3rj0b0d897tuwy7gu945d42iipx5ykry2uyb5p6xbnydq26mpn1km08ydelni2tpg49kerwevyayhuif0lysblvd7dtkmij2xd2e0g9bkfrfdd1hg8cbkpy5ydvijqbm7co9mg4bnbjdrzmlwf',
                filename: 'lcn9gre66c63o1rzbvnizvl809atqqg3a634084tmkpa161g9xhnys294bh6odtkybd0c3xz6czzn0wyq831x0oibihkh947yb891yzr9haabk38gnzy13bznyhednq03m53ta2uvbh54hpe18d5yft2u4oqcx4sggj0diabs7b41uxex6r0f5br3rooqofpcp8047fa13yd4xjaq4fs8gmgsbziiikdf432l1xbqrxlp9q3vdduav47xbqxdan',
                url: 'dfr9ta7ylmn5v9dero5f7dsmoxlypqztvn5h5u9k9exgyne0q5on8aj4nhxgait4mvbhhny7gzx9fkyk3bead43iw6kcdzm3mmgunvlo2dxrkrwlc9kih0bcf78kvj13q7j4jlv1j1lcsnt2lzks3rip5h05pt2ae3ezcn4nnoe3pg789yrt8lwijdtnfu0rdpg6ek9ny0shn6uznar8o1emmu75y22bo3vo7g8atn84mgbzx0lkrr8zn28rnto41ni6znl61gttv8btpwp2b9acnn4jjynynit8nynucx4vh8pcyvqcghfvcg1n1kebptfdahzjr7jnbkgendbt4omjl4416dwp7b5qa8tif90n2gpq4uadhczgluc8dj0r8bt7gxnugv5ren44yv8ijtxzkckvnf8w0rq79r943ej6dnr8jnunadt5u03m7oyy2s91yk428oro4m97z2mxxkrvqu89z11zr7oq1x2qpmm6zzxhpiaz7bilpupuawhhngdv0ondh9df5q2mnsoljumo7yvrsviqjkeng7xfj2h04mu45iye5gw0uuvraee2m9an1rzuguhqtxwlsg8pr6tzhwh3efz0x0o0gsvtcme4l4bkgrupe5j6wfcnf3u0k5k5zvrtjnf2id28mz8rym3gaf8y901gn4srfrvnqupczwu1vxrcecz52ac00hkmqzfb6etyp7ez8ymjozzf9g90mgh5t06rqe64t443tvaerpj92758w3xd11t7ldl8jxtv0cjzag35jfudh1giqkahieikv5grblh3ek03wavgf5r7w5b5ce5xauh131pigkopkwnpob287d1vcwf2v4rn7niy31vqwn3kwr2ecoj7yn45uvyzgwxc5gmf77e2q6vlm30uvnzrc4sr411hiywm6w281qzmrz18p6q86vxs5ljkzneewd6t62ce9zsiejn00d6u4wyd8v7rvyt5c9in3gt4vdd5q0p8inijt4nqicdrkcwiixa9pulf8rp7',
                mime: '11pxnjdyyueg91a1xou6rndks1fqupm3lwq8je8sod2ag0f7g9',
                extension: '72xw4luf63rue7x9kwk5omou9n2cd0g8dl1s1yrr058040v97h',
                size: 4044456100,
                width: 861453,
                height: 772665,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'ndhd0ctsoht8i3q16k1t7357cif2jbi5qbguvz3itzq3k1ofxcudiuxeppdaagc3lo9nd8f6b92xnrxid18co8mcnbub3n7qiqghv336djycwwhbgpkg0k94ygrpolbq55q4y56oaragoe7kj9ibjjyhzu0a3b6es90ewaqmm0grj1ghfowao9grt23697mpp6amd3kgccff6up7c5jhw9auv61887mz58ow7btwhptje9lch7e07h2r5biuqeb',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'iwqglqzt7v4lln847iwrutocoft9gyk9w4jt7u8t4gaw3wl4zn0n5bu3zxu36uig9vi9kt34eyy',
                attachableId: 'o7rqu5truq55matihd5teli4oxrx0w9x07jea',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 152934,
                alt: 'viaw5ov37g3p4c8nkxj8n1510w72vup0ekwrtspsompeiiii1mzz4gaacdwglperrg40lu3ok8ekgfu1fqs601bziv17symm9v4xxj74ysew05g8fhlogvpgdpuxqz2dmiknfx8pfsp8kwx3ta1kc8jdgaqh04rco1fmfh60k63rqo6n1s9a0s89o7xhlcitcw4ryn283z1jl1cxtdmge0ktu6hcp1czmeri5ouauiqd8c6qwt4efjgzprsh19v',
                title: 'd99mhubzfjxi2sx4au7osk6z3v5yi6j7owawmw7mxv8in6mphkenf3t0u09sfg162odxxzmghd2q5o5chukl0qvpuud3b1zxbc50u2qm7oe8f87vv9uums5zqzof11p9dgx4zdhz6uql97z0gbtizzsakcbg6cq2udpqxb2f7xbknyfj8m2qb8ukyasn9w74ibs2nf72awovhd2dh1qfqtupv86ymbyl39r4q5ytem5m6jtevmj9ojkjhmt2j64',
                description: 'Cumque eligendi earum suscipit. Sit vero in aliquam sit facere aliquam eos sit quia. Aut sed occaecati corporis vel cupiditate maiores veritatis dolores.',
                excerpt: 'Pariatur aliquam vel fugiat dolore sunt minus autem quasi. Eaque sunt quas reprehenderit a animi quis mollitia. Doloribus consequatur illum eaque. Accusantium officia nobis quos cupiditate odit similique adipisci. Et eum est illum placeat sed ipsa enim ducimus eos.',
                name: '7cbldgv0mnpo13murrcpdaxlp1tbil7i6wn9wo36dshxaei9ct6dnq4quxlfjlg2942k0qpigay46kr8i2tqrylgojchwrebk3r0np97yv8hplm8ehxjwlmpmz9315i9c6z3an84hqvvc2vd6v0uv1xyb84j5mnse7en1k42rx9owq5py40h0bcl6pewe8cped79le6cuszifyxodqmlgov98gtgavbjb6bw6n5krfgcwk5l8n32zhjcucwmatg',
                pathname: '4l28fswc9eh3wwcee9eq6bqj75dmwes2fc5hch330u9ayod4hz3ut6s92pcuqwekyi5xs9cjs2ut4h75fuar9lmo5wlcnbjvkdbuem6n6ffe0qursrhdl6qozp5eqhgemc5g6qhyhbqxbcumhgjg1v4t27ik9doxfid2jhiszaq4qy4n56aqljj4ti2j9wtcleoxkqd1eea4orb4di9c6ghmpk0qdnxfzzoozs8vpg2wufs4wvv3a97ykjvmhrrgjcui3svpdglffi77zrjsugcyooj3yy8ohw640sth2y7a4pirl9yetcmqynl0zoy1pw02kzg3a8djcjg2xn3qu3wcv5tmndg65c45crwsl3yu6oh7unvthewmm8gcuhdpyy2n3ecy04mayvby0ni5ne9aasonx2gwocn0rxinpt3fhf6rn6i4slp5oleas64cykjmqo3pnym7ncuraqf9w2s8v4a7391rpzyhnp8zcijntl693yop8x91s0bvgy0p3bun3hrsrxtfjdw8r2rtuum9htb3fbsu09xv1hx90ocml20bsivwu77jpta8v199fb098opn33wvaql0e7fb9gxhtfxahir15qazivo2v6qwj3nwthqclaqs3qxi26rkpxgs55j11h7731tsxf8m8fw7ljk8eiswqexe1c4t24lm6dhectbfr216cawrhalgwe1c572dv82i7iq8100mcpka9stqsce8tdf2gzft2a3kf3ayemgumrw82asmx6agatiu52tv716g5l9lmhqzsyy8j9j86x7kfhjgkzaozmijaao5obnilyqy6k29xz88991dghaao3gfbujehbnl26bdmxuluvcylp8wrwpjbtijiqdoq27h0mifsm9jwascgfd7ado7i53qzwfv29pcciwo6om4m95l7tzg0xj5kuczswevv1ysgzw9bncgu843x05rt0siep5zznfoiprj2ivpx0aih9p102k4cno2on2viu3qwsi3jsts6kyvxgpo',
                filename: 'x2826q1pq8gj3upvpa1w9ztcpg96cm5habgivdimkd7gy6c5x7w7ai2oofa8o6umq8n0o3zjnhs1nk3127ynawywn35hc3iivajpqtf1hqmoa38s2ieqi1t51v9iwkgdjfv5kim85xnqwzbc3p03ehdu01xtpbmmvlegunj1t7ofimgckk9n6srmz1dcbirlybnjt7jfbnanzhqegtkspqq0s62c4rj6tnhpkv7qve9pfjqd77lp4etrd2ob35b',
                url: '8v7lplvpoq722p229skarz7bceurx6tuv46lgaxebffv9g2rayylz456utvzawc5x8wfjfyb4byt8ub8rq8l7orvfphw7qvd4kr15o1d3rj9n7efkkuidxuqi1rnmeytivcxcwfxkule0ms4kh64wxdypifzjyaer2qr4yaxvbblzqkddtl7f2xtc2lgt0fpk5pn9m9xhrdqbncbrofpv1625fwh9i8cnh8urtsyi32h51pvui97rl7fxr7rash478gcwso4doado65klt5mnhqd0jrtreukwb0npmatwlnr4sa2cynecj3xmqww2gys1lpguu9r5gvh24xetfxwmarhqk9z83i72xayy4h6ccp3uaazc4enhx6g9qqzux4l60qxwifwkf3onitphjsxp32nlgv45xgttygoho4p0yg2faowc9jp20vweerhdd7vtmxr2ruffenxguvs2okm6abolqsu0yxhbj5k34p00l4ecfdcglnls9c0n19hmn7ahsdas62d6iuyqyhm893lk000mpr5xadgifo146k09pbjx4auetgley3ok5bptjamvzxn0e5unsedhzunm5ptwq0mbbwpp4pitftmwbpxupe9adiwmgbw7n513q190dpy51mcljmskscrj68ea5x6cu9mpyc9ey1xo5hio1uu4jwa9vkfwzsbgt2m5rjbhynmrloszijgjum0znvmd4xkk32xen0m2qqsojirttka7s7fs60xm0ekklilp7mgrjip5a54taxbrwctxf8qascq4vvb1ch7fg5zrohwnyxjzly1rb7btnybjrkykdz27xr0stzfdsgrrghigexjupoqcqqhscz0ifcaoif6cd7dkz6498yn1dgiogtz9joygcllabtxve52zfrz7nb8qfhtbbo9bs3df0qhwkud6vu4toeb5s5584sg26ynuqhtwtj0zowh9tw6h5u9jr112uoin8mj0598ii95c16foi0wmh74e4kvbyliiz1qln7vapep',
                mime: 'g8ly0cv2yozu0ux0o4l5hputts4dr1mouaxcz7ao32gha9ik20',
                extension: 'q3ox1o1s4l90zspy4hbzw18jymig76lhnu6in6piyikkqpp9hm',
                size: 3627540209,
                width: 942860,
                height: 272057,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '6pwc08xml8mkwhz2b6stcwu9yeeq2a89ey8a7zatitrlv3x05er9ldi7hdu73ni3uyuz9p5mnhari1kabvxk8znpehul5bj4wb66jkqew32c5ya3t5qjoym6ebmxpjjo0kesck9u2kbt0qb1riqbbzkood3848vpl1ozdquaja28kpqgtfw3mlcpk7m2xgp5hdruewdcesrbstlu1cer81ut5wcoepwlui4gocidx8bd7nfhxlp98vonsohmp72',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: '0rg7hk2it8k08at0449eo46hxe365460l9j8i4nr31fydta44n6obdt7l6k7fwrllfgv41kr45h',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'diw4564oj205w4y09gnyu96cbvg1m4adiok4h',
                sort: 458363,
                alt: 'gh1gmjqa8wsrcl78njzukbuyirbtkrxmuew2umm3gx0lpuvft0j3gwohjnh8x1z80dwkfexwnxkvosufu4dhfl8985nyhwn49bylkq90m2cg7kiyw3ra65fymoprf12r4jh5o88h0ehdaqknf0gkzvv8ynkvjhd6ynq5aukbymeuwio32pjwr1stdy4dlc72rca8xmn61j1ioevenc9baijg3hxgw9hz3mtigoh5w8n13ctw898a2ldhftodc1u',
                title: 't90c1y5s8or79wx9zdpmjvjw90wkj874g98hhyttw1gn3soaanloq6marndj52g2pqz27c7d9l6xpu3d9mfhzt0qloz2mvfqkr1a8wemrf0ruxn434nmpv37algnoq08zfclro0g1i38eqmumi0trzq84xuuz7j1g286zj6ed93tcy4ycyuqlr03s8npew6pznslrqhvfisff8t2xj321i6w4d46sxxq3op47mrz37tkiic4p7ozqfze4w8m6di',
                description: 'Eos unde cupiditate deserunt deleniti dolorem doloribus. Rerum quibusdam ut rem voluptates. Sunt molestiae odio laudantium culpa ullam reiciendis voluptas aperiam molestiae.',
                excerpt: 'Accusamus voluptas impedit est rem provident consequatur. Consectetur deserunt in. Repellat molestiae quia sit sint repellendus totam voluptas asperiores. Molestiae quas est necessitatibus dolores.',
                name: '1178d96qpyfkel5thr2bsia61yfmppfhdik9v9fcwb8xugj0q1ho4v8u3lguh2kwj8zjrael1usk675qsstjq3xh40xko7xzimjgc9amukx1ksk19slxqachqzz5mhoxmctlwtx486pmgqt75kdhjlqe93wr25f5u9ew6mx5ckf7acam125blph5wfp7k6qfqvqn2bb90ta2fazrgjaxl4nyi79fk3ebg39ub10smwibxbz8b6xfcwci8aby5gq',
                pathname: 'kmbm6h2j9891hsg94d025mfvjvloddrcamdgehpvt6pjx6xzkvi0q1aepv5hdggnwvxpzwz3q8i638tjzgr5s1q03wsjmy4sc6tk0rexzhidgf5rv0m17n3s0r5vchxgg7lr3ui35ddl2u0oekaj4hydtnrlfrzi6lec0sdybt44jv0jjjobr2xxspcl55cffyo39ov70jzyc49f81dh5tqxzkw7p7mgfu4ozlhu0350kddrt1al1zpjfmsff595pap2ithr9sfes3bw0z86o2g1m7kzcypuc1lo453n9cgxutkp4768s9d7vgy9ry9kxv7m7maobcazpaf5d4wfr01m34lzo9llnc1qta2a9ssnp52652402dg9tr09e2wtd59mqlxtvqwnsriq5eatcuiome9yp45yvx582sybvbm9odkdcwaq4nl3b6xbwec63km3lhvyw90slid0r4ajqbbl16tybf12byrc51rzece2ghm16boktwd8fx3nwkb1gcrafx6oazvy7015xfwgcde4ks1duvrp2rrqv9hj273ihfkrch3hvelw82hej6xzjeee1wfxt8mh73nz5eaf6x8ozfgis7yrvwx9ccjyuy6vfaffh84ci39065ifun0h6gf42pzzfom39ttht0x9akr3thtpw6aldj81935dg3p4yb6vi6c7jr79xer9nr3zl4dob1gm3lwjdlplac456xg9i7h2h346xgutlwrxqb3wo4xkorlhujh4zv44ckq3r5gbwo4qihbhk8nmvy4uj238pttdvq2x5bwb6ryfvtxpcr7yunu8re8ik2diojsm0app2n6hhgundb8hhygcfy1mofocpf3ttu5ul6gloabaflhqe6j6mhp7lrljfgjqz4x3ekev6hq6cbhvjn20ap6k36d8mhvnqwbn02qfxb0s3jniblfk5wnejkx3x2hulfpw1bfd380ddt0flj577ac5uqmb5579y7yutkfhhejcuvy3cwi7nvjwpspd25g3',
                filename: 'wbv5ec1cehnffvmcv3pe2xysm7bxhnllnp9xmp4fcti7nswzbps0vwqefg93vec26yddauy9soce0d6jfh0h31ra3v5xld64sgi5plifi7aoezns3cwhmemzod9bk2c6htm7pdwv79dbtml1uio51o247z1gaxqxn0176xmi0qna3sgwb7hdjbcklfxsnsfmu922eb5p7e5rgyitfg4imlurh9e8kdj66349b3d901z5gdrtadmeubk5m7vba1l',
                url: 'jmkklzfvsjd7yfrmluafukq2rk98ozb9pmv58exnwjlv2m2um3g55m4554ae12oqu3cah81e3o883ckmpjeswpc0z6bnyfhhpmu6wbg3qswgpzkh0k3aa2jrx559rful941bjvwl4xjhhsva3re3n6za5f4oc64np7y3aiaoo3kanec4uufhwwpjtu70vcahsksp7lxnzxtrkei7kxh539fp5xi490pysdx2csdkn1xh3ro5oxnw9z6mtj0msu25wxxqlnb4d4if5xoxmc3sxlkrfjpemfqphdk75f7lb1bjnylowhkr1apg9qwczf6l15upoeykmlwx8kzvfodlpxef238pp32g6vqoi935sh6c3ctyzgjo7vmwr6rlvxih2748aqwxhv8wok4u5aqv7jsxdc6k37u1rlu42u12x42lovvf7k8liigc2rs7z2x8tbhtzsjqarlogrxv3cwiychha5pkrorpw0bgna1qor2dpoomks1cpk6xjnngmacxaxoo2ck8amflmv84fm93pkx3fbwvpbqzpwot6qdgyl686wcpashqftunw4shv4uqi95o5q2gvswlo8cp4f6xaru8rdv6dfbrx5ecvp3l43iinhxt0umlqwr908ved2qes77u7yhl05wypvvfzjebnm66rm8rd8a6umzpz15cpomyxdivvkg7ex5zzx9ugdm5eotr8jwnfsrodh8zu8d9cgd3zz7t6mf52ex98vh5u2qzf2kakcdvv8amurh2mqjme9vc95cfjvz0eum3z57ncvata7qnofjjk4vbmr2fx1bx5wfvhu76tc7utv12vzzu2vp63qneojbuszl1djvmtz1dycoqe40bk5revsqd8145pqk8s9g2dooiofkc2c4qrugga8539cwhokcnistu1qg8pdd0f3v44cu0wlyev4nshbu9qyltpowrzn121zg8ol2hlvwwhp6vhu3y02v6yoebnj7vvc2c5nkffypq6856y5xor7cqdh3s017mgq64',
                mime: 'q1i19f6u0hzbnjuysbk8eoh4y1yac7ifyav2mn65dyf1rfy1tr',
                extension: 'ut24f2x2j01ticfd8qefycgr1sciwx9bbkx6xkt6u73x136uhk',
                size: 2444287462,
                width: 395954,
                height: 690616,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'rp5eelz1rsd66ot3k8w82dicz8105cu1v52x6dwba3j6fzji81nrf5wcllecnjuw05x8co06jeuu5tf9x0hlsnfml5aqe3lup238uhhmp572ybbk449ynzlybouv9mixqw3rubqzz5phg665o0kwj11czz0pcl94hpyiclgjvietofdivt880s2avdva6a602kh8vgkpna36vcpy5l9d085yftubwoosyui71ganovmw22zx8nyjytpukbbwwoj',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'idl9bxf9gd4rxanzsspa0g0mogihsox0dzw3qosvcntndmabkmdgy3f2lw63c2urdvtrzdx2128',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 275035,
                alt: '437pl1noemflfalfgc24coj1hbmtg3zz1ms3mjfm3qlhcolvx71j4nvmfx8m06fhd13hhopwnnj4uvi1b2p0m3kogeip31bft4a1aommrf1d0qqutbpi0l2q1un4d0jtdckqsv3tdfge9qkr6s87g6eixocxi054uyzpiefc5wqomovzhxcbmb6gcnqg68si3rpnw32s9hugj4xc7gtmseb3p8fuilrm23eod79w5vbeimyuxz0vxgabvek9zhg',
                title: '8ebn9jymuctv3cns6y8utgwko4odfhgk1jr3dqpjwmatd8ttgxvvzw3ssjhzlrp1mszm7jhb6dixlbenszdord5n7m62f2rrhga8e4jquh64kd9rvqn3hd6ceyz3hs45xm8oolgw8qsy8lsddoz4pezmiofsoc3txzakkvio50u7cmejkgbclilcaf094nkujto8wsar7yg188oj9jowi48dumtertds6n0l1co4q7n3nsrdpia4jjbe1l5e7u2',
                description: 'Expedita sunt labore accusantium nemo atque. Iusto exercitationem dolores possimus quos mollitia perferendis illo fugiat. Ex ducimus voluptatum ipsa reprehenderit porro fugiat nisi natus. Quis sunt aut aperiam magni nihil velit sunt ut.',
                excerpt: 'Qui labore labore rerum quasi. Velit voluptatem dolores error quasi cum ut rem illum architecto. Magni et quo dolor ut repellat voluptate harum. Fugit quidem excepturi voluptatem. Totam eum velit et.',
                name: '1b5vlh2ql5pg1b1tu01a25ufbrpz7u0w9zxms5uzkxzozqgestwhg9mkw9hzrgvprizwvgirif23psjux2k6i5z3r8p8ey317wzbwxtvm3eies7rnhnmjh1ch8yqyztfhnkzmbvawvzwnft03fwhtnjkpr30fl0j8rdmwy7xodqh0z90shldhf6880kezmna654fao370lnxmz9ix52z09cs2xfyq2wy0acwg2lntpybkryrl4f93b8bs7toili',
                pathname: 'p3u5dxzwckpakehh9xgbu61xnrmm8zzojbcz2zfnhcitsjwlx7opo016a1lmpe0msdd8xadryrsi10y9v7w9oxlmvvtlc34wrlfw3y6eclx57xoolmuvbi0436dg4wnch6x9n4rfis9sr1ncqkpjzavxerl3zzfwzgm1wmail5g4dihk5q2f0zi917jtai6t7r8w8ucyahf3bsjn7nft16q0yen0131qkb7fmdrkhilh800hgwa9db8u0pftn3gu1jsgbwqi2mc7ouqoglpr8wadtoc8uuyb87ormikctq9agob1m15y7bxf398pwx9dps6n73h18imovmhyu5wbzcn8clytp6bzwcl1m4q27qdfonznppongh6n65s6g501mmaafwrrch6yyx818ypyxsb1o4zvdain4rhpr7cp3rssfykoeko6jn0oms7ly1g0x9sekluicf01ke4j8ns26c4fzqa1cyh1c7pt40wyezi5or5bd3qwrf84bbuhu5w4vktrxg20jbiwdk64oi9sj2z3stqil89oveppbbc02njxoa2wgeem6jvuaeeib4tm2bn8urdfish9c5duzu825ck1eogd2qo99345zij6yz0nxjdvc8740ee70h8ghmwlpf4zrls6clgi99ffdt6epv2id8uo73ff2xnr559s5ktivfnmx8xz5hfzc6tkr8s6smowryurxx7aqhn58yjqf74skuqb1hzrqc3gmdgf8gwt659z1mof65evrhnlp5t2xg2ivj1rww3imqyky8ixgjcwgws9o37zj2i9nv6bw63a88nqdviw11x2d2vrc77d1r0wa5e89ph8jmztjckbhdf17f04ub95euq6leoljwnwrydfa0w364622vhlqxcsrl75n4fu7efeu8tesqr54jrqavb2orjgl3mc3opz5bu9k6kazrtn327kzxusj3ccm8a57fgh1vzkexp6hp5rtveepzbdoima9ztcg43nb17kssjspghaqghfpzf2z65t',
                filename: 'wtj8axho740hyd3hxxnn4wtflxknt0o3s90realpvnsvlfqxrau2e21nohuqgaoegfwdnzxe7yfcq2htr2o7x2f2no5akit6k73gjsp9h5xnzpay9kyv8e99j7gzlocawfjvzgvdq3wgpxh2cjgvg1wrtfacvic309lxn9n5pi7iuo9x4zrlvnobuchzpgfh65iedya6cwwa8s5bbrq0ggy69chh3mxfs7cs5lpzqx02lzqr95lw26ny6f5tygt',
                url: 'nxu0wt2w2t6depwlayca0z21jyzz8tgrc7tkzrmuq93tteap964ao9vfixa0xv869hka3l8tpf6k8x9ok99n7qlml05pyg8n6vf6o0ulm1zewgmlnimgvgvkqhg6mrwsnq56tmeptomadrvnxmvtzg0k6b6f2nd1jev5y5kwtqcyi1ac3b4gpxl5vnj6toe9wm5sd826gyqwbm19f4k0jjp4h2t0cqpu7fw8mm0gqnmpiyak4rp2ujay6gyc0lf1qr2ecmu2ado69evecuexc5r9sf6yifs5xfqmmczldvlzhf397wocsqm1mm17u0k5w123h5imfnqj5svqcfmt4i1krsux21g83p944tjne4ibt73mdlxlzlo5p0vutnajmfwtvx5b9nysa202s6bebf83uzqcx4e4n9kwmfcuw3rfrgcqinn6sjopiedraqonyi8nqq824t90714uuchxuzmdb986pxqp2611lp4itkgqk36qxxm52mx3qv32za5cveshm51v62khb49rnz9vac0yr2bjmuta1j3zo0cw3agq9xs2zs9p5zg0vjeeqpbotgb58z7pmloey6gqi533wh6ybps6pjfj6oi8065mceq9uskesiia2a8c05pknklvhz6uwd5bbevh71foxboni83udk9349b769ki6mv8q5kmbrp076qf7odctu29ta2by7ccida5o2n4sdbp98yfhjaqp3ohwbx7atb82s6qo3rusdvthis6o3e79d9udg61xd6ugtk60id0al2em76kg2cz7xqe9nmhhknkzoc6tsxjxhngov5hpi2vml975tofihi3ika54m3n16mve3mg228cf58ufqfrsujx7jf1q75q6d1lqa0w46z1a9se3h6nkxiax0qdcx4dx335efmfq68s1qmxamj7i1sbup3wlrp0z5w8pj9t3ntbvcqxz347mjzb0fkbot1d391lshn1otiha8bcuti482630vehy6ekdvjbepi3e7tqqkygxr74',
                mime: 'uzqccbafp9e2th19kp4b5aht2hanm8ep9avz9aa2r5fs84qpak',
                extension: 'bpzu411fqmvchlsb0sw3f0rn6wy4a7rz9m1q9anix29nhbtnfp',
                size: 1221330056,
                width: 465547,
                height: 100078,
                libraryId: 'iac3w2n0pic60yit2w1bgiiubaw8dlwy5alzl',
                libraryFilename: 'smrlsx38m3g1uximfwqgoudtqe1wm12mhwh704jsex0slajtlgp6bstawxbmkzfkc07r4fvzkzhyk8n45ws2vrjof9z0ksnflzbakr28mcb7sghl09oqspbsgqp3v086kd90q0p544usp0dema1qrt06q5t4tza8jcqwpxhl3fxeed8mu3elhri0s2hwfw6ptukmvsth13sm2eyx4h87p47n7ovdskwfxson5pkmv3avlf53anzauzkaclkejjp',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'j1t7jsqiqiyz4mltm68ic1wq4za943cseepu9z6sjhqpwpkj1zzy91e8axjrrsb1u0qs65dw9dty',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 131300,
                alt: 'fro6rmpmwiyfzz4sajzin9v6qobqeuigk5x9pp3ne6s5rewmd2p4icb0d4jiqce7kpjm2rj6arawzmh9vzllco5m4de7zsih9c9r49r8rozd7qp49enu0wqoqzxmy8ri8yd4a83wkq0h5x95kgwd48bibc3qnmm09fn8ngqlu5y0pcglxjvfi3obypalpnf8jg265ehsv1njsk427wui2qcigzlvgsbos7mts61v2qj7m852qbrnb29s37u2lid',
                title: '5ri31m6b94u00ml80yuldrj5nzlrzr1yh0numlt9y84p27ggllq3cufrmq1y4l2g3317mjdphgwekwd18b8awxpl3jjrbg1pfpq7nru70rpr7hwgnm0z3l9yedoob4wwgbysjsplc9w0eavuu0e4y78cmbpk6yghh4v4nzaihkf399wundp9gf5wurozspp0h4ui3ool3vxzzv2f6hm5qurl30p6m3v59m976z10e64jlqvhuyat9lt42jjdyvk',
                description: 'Et placeat consequatur explicabo doloribus et similique sunt sequi. Pariatur sit enim ut distinctio a mollitia omnis nesciunt. Vel suscipit vel maxime libero.',
                excerpt: 'Fugit nihil omnis architecto dolor et aut eaque. Sint est est quod magni corrupti. Error expedita harum blanditiis quia distinctio nemo et. Repellat et sunt saepe.',
                name: 'pxncsamf1olet1a0p7tqrqjif2pr7wlut386elgjixgu7uw85i2pxopybvbi4ez9kqto6db1en7ju46kt2oyjf20t0rthi3044soqllbhqvsgoun9aqrf5pef119e38ufsvqxck4zr8atcx6zyepehtwgt8rrl2kpcukiauby724pirahz133wr7ejf9gfp0yyog4nrdhnda6xdt32ffhqo4ewpdy3zhgbqqdb3rusxot2pl5kc5fcmpi37i541',
                pathname: '08wcqosylsx3i0fmrq9d2hhhdrxoexhgzw1tzjkp2r4rg37no5d2lw726ye62amftsb94qz7u5exlt7zhallw1qfepr3axmdqnefhwktj7d5qtlg9oqvpzq7t3d8r0wdpchyedd6ewkpw1iu0s18xnj8yw1uz5io88ny86bxohyw1gfe112d60n7dbddgih2x95ffk0wp9czv4pojmz7pva0vwvk1uydirumn48t7obfljpx2ii7m7zokqawwjtod7hvag0kic24qk4cdberer5zmvhksdl1ljjg5mfisypb5skrwx3ulit5ea4utfi75i7jic2rtju18nbvswz4buh6muout7ef0c2sspyenm23eul72df7q2fh47ruq6vjvqv7n4flo7sgbkpnxi1xezoykb2lj9v7c2oc7mviefg6dr2he0s6a92m6qjp5qxeex8v5kp7cdlvod7t88o09y0gpyimxywz1iy0zlfw0dlnyrrxc0701szofta8gb8orr1qwf0gavaa60kxf0ti8a686y9hpy7jpm68711qg60spswgjhidyf1z54v2zxqw9l47ow6vb1h3bksjokxnwsae5l4afyrzjjjn5wbmfpd496o5nk4y3cvmxp9efuz5e4tjludz9m8ls08bc4dyj7aoqznyoz2zjhnuhpicytj6nti9dwj1l9qm90od1bscyajszw2xdhzbhfkee0sxqkmorkaljgd4d7zcjm1jwvdd6a86i6sfimzczk1s5zy21u72qkrp9uthbh4upz8tamagxjyekem759j513gttdt2up5rq4pn03ejdd3ujfncp5jt8h6ttgtvn7ke7jib9zr8bu58gfevkk8fkb2fwu1h7sn2w0rgmztn5umvr3rem8rd88b2fvq633pt606r0haoebfrntqsov8nahjjbwtxxhfzyrmqtjwkshe86lx9bjv0imdihvldtpekx4agushnz39387ck50rufeudcj2ktqfft1ma9x2rshi9tzwo',
                filename: '6gawp00a3a8cobyoqq48r1l7ert6mbgk2ne6mn4f9r4hwcbtvedxzdah65hg0qu8g9od6b4lq1zltltxm0wfk9gb0wiyst4fgo7o61fdw0iyiujj6w22sagkyn9afdndetx7pr7ltoh09k4ov3gzjplykgw88nsqw1kcl8ctj0n341oxz5u7n4vnx7koon3q21467us38r78hqbhu69eg4fzs4nvz785vpo3scn3k1oxa34wmcpusue6sqc1kpy',
                url: 'o8yiag6er6puauszpiqbl8elx3yfxk75eazf0ymcldx6vilehs4x7zy4xc2ln3lxzfug8omomae5gn2vuter8bmrglel30gl1syvzanztgwqi3qb69st684jy02k3picsfdig6pczoin85e6239rwuj05au73p9c9gevel6wkq2h5ibj9shprcvwml5zfmt7ckqvs514q67obriwvpd8g3iwlrztp0xszb1ztit10rv5l05wimonp7gq3rlc7lkitg3wvpgoe5fkukai53xa7bu6w2avwdovjexzeq7x0v48vdfrfw0vowjddr4bhk5bi2nkzrnr2g36htbvoacri8mofh2paheli5hgo1kriyi4vjtx71vrjfa51viivozyxih8142z4lj0mbgvc0wavxa7e8k5dt25wie1v1t5ocwpyzwmaccicb4lq2e9boa4sbutlx0mfht2a584jk1hkmfu626orwiown2zult7c8gtz3q02lp6ram6gvn9zpvm663q01ppxdj8yiitvmzwstwh76522cnxnsab9hpxeakf6f8aetiawhd2qknjtcv21p9r7s8ftqcpdz54159xi3p1iyhp55cnqdffg4gy94u5x85qprb1t5o2oz0mmbbep73hceqnky5lar8ldqwdx8fd6hru2es2755x94t5wcdj5d720rvzblny3hpneo9iut84yv16sbrv1uta8kili5x2b7ouhocycj5p879joth0spr509113rgw56zxn3gz6kdrgaf8lzna2lg108tzijxocud5ta2hsv7n2vnua9cs9zz0n29jo47sq2mx1i3m2kin2hzdfqziayrlqk5hpjb2w4oriwl56au8d2u8mlqw5k4l6qn3q8kw8wgcfevue48149nqx3zjal056dlb6i78r09822y761upqh2n0vy2f93i84y9rl9wo8ilkq7zvatdj31vow6by4khz1nj5pztq6sk5gcdsr8v3k0c9l3xtzzld1x5obpjrhlih8qw',
                mime: 'i8h49mxk9fx9ldc0dpozwq3f6n8xh4a4yak9h9ogswpk4wsa86',
                extension: '3353k23d36cz8kn9vsuromuc1vwhi75ba64jex350gstkifqrf',
                size: 9655806059,
                width: 321151,
                height: 552526,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'pweq3pgcp2ggcfldh6zvfo8tvsxb60ipmefgdfgtnqai3wo8olf2tqsw405osoesil6afl2u92bqhwp8g4o4snu3ew8vcz0tu542s800eml3eh4vevu1396thhiscrmp8fxism1mcqzfqvzvzyz21mdqh1dgox8saua32ccsr82r0bcfap7b6cof2zg8skmli3a8fpx1fav1ydesl9zp460blm6onf3u9412itqcfx7yqzklx37zyqjs3m7fm4v',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'k89rlcghw2rrogzolzmcbn83bfasxtai8vd3tvpqyv3m14qi4skrhm4n9pa67d5o2w9s4mkibh1',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 5019388,
                alt: 'og7fw2wuo2teykei730ueigc5dwaplzb14fsvan6xd705ggb9q44tm0netkfbq4gt13bp9wt096jdi2ipvhkxcinp725zyuq6a4pvzfkm3yl1a99qzdrvzalhrtljnco82tcrsc14nvqj6br26cht0obhrwqrq1sx5lqfbfwlt0xic95ja00oyojkocghedaka1dhmk54xla3nn1ibsx8ztw4gk5d8g21px7jvihmqrzfakkpve2x72emignhq0',
                title: 'eusknanb4ziweib5qzywwiiyfl8eorq8ayq0wqlk2us7y3wscmsaveat7w36shnif4lqsfxtxe6ei8son19uuifyj9lgbo2rtlz8l8hxocccrreev2mfwq8bgf57xgji4vx9u1hq5tp7u6tj8qd9jhhsl7g2t4n3nh7z1ddgdmk8z47uiccc6ubgxaw1y993ivsv3da2wlhqae3p3thpcfbq7kc5b6k9l06tesqamkcpyi5aoqil12y5ptygfc0',
                description: 'Eligendi ea itaque et repellat vel et maxime alias. Dolorem modi repellendus nihil autem. Enim rerum vero itaque ipsam molestiae nemo. Quia ab magnam veniam eligendi unde.',
                excerpt: 'Pariatur et cum neque ab impedit et dolorem voluptate perferendis. Occaecati est rerum. Sunt et rem beatae ipsa recusandae harum.',
                name: 'y7gfmuh06x1yw3e8zrhn5dm9gdf5uqtedorper8xcvzo6npwsjhi0ku80gxmrsm1h0y4um9wzenwrkz3hwmcamhtapal6ob1b9vw1gp4xgo83n0ngl32t372ue6pqwe5adwq9wqcssy1lv9aobwjsrap88shx21rjgl5ptaac19ygj8f20jstvtmw00ljn7xp0qdyblythilxkgan67i8ml10eki1o6dydwoiakwwgbwgvqfbs6tiz6zrkgxb3k',
                pathname: 'mbf6qy2u5ugzyusswettb2hn3mso4uw9t792zv0ooot556a27uhh19a19jrkeezrn5foa5q1pykytznur22l50y71sl4ypmpsysfqboc6d8yetsi67idblhd0n1ma48aq1lrreguaie3wxxdoz82dochiacgzlfasvwmjmewqbms6kz524u8g93uzv80152eaidyzgkyiiko0xafx9ah4o8yfz9ops2w9l7qtumwduwk326fhj4ofd13h0t1hak1myurhkts5qae5nb7dv2zctf4h59ig4tylz8aa2ivhtuwaa6fiot2qtamujhdc49sn9dchb28m74h1h2bkmrig6goh9r04t63n5djty9or33hwj54ajm7rhag7ne9rpqotos1g49lqbvokok3110koy091vj9p3hn3c8cw2s50gwdejsqrody5nukxtccdhaftqu6f41gziqqnxtyptos14q2a76cyhetwzpq1uho6w7h0lgbdndvvq6qgm38k77z31rhk89k2gpiaktnk68qpwoah5xl2iiw2iqt3nm4rzodoim42oqm9n5tgjc1h8iq182kh62dz5jjy2plu7dq3mtlokh3lr87ag4hv5zmu3oddd3ahzpyq7v7t5m6da8g61gdsgo0xhitv0vrxeqjs7n4hc8wl7cfjdyo3y65bcse31p2slesfpcyh0hdgahbk0y3wzz7h80roc8i58ok8jrsnrm21tlotuf680vtaavt3w78ht4d4fdhroazrcwudsawva8ses7e99nrj2n9wxm5q79rlpyafb7w0sngpd9xqs0r6ggkukue8coi22g05wb117lmwre560d0zkvjdsox7jxzvexgxemqqdmtu5k7x1z6821747pxmalj3fndhfksxkjhp1zjbojy0mumypzlvvt5t3qr6lzc1dk6gf679xo81gtvm3krm9tr4z4fdrxw3fg2obhxv8965kx6nmf5dbis415s9awkt7zexhofav60jdcacxhqp916c76v',
                filename: 'iwf1o2urr9bjf48bz1w4u0uv3msa1w3ask0ds8ps6ztlcyamahjhflq1x53662y7yl4z1cwokp2xg40l609n0qi1xo0e0cqte4ilc035cqqoyw8fq7gryru1vpskh4lqha8161nhoahgnb7aaa61aedlntpv8q4tlf0yyw3lgjwwhd6wz26szl3cmjgqyqywspqfnkm4llpxanypmcecw66sy8fgp45uyou4tqwtgd8zkh3v3yw71w2p5o483a4',
                url: 'c6vmqxm5t4kh5d1a96s7aqwlc3iwx56juiso7gzxx3pdp4arbdw83l2yscd2rd7h2lo273vjowzq9gebbpul7ltjer599zrmwtfqlmyu8n46btjbsy7y5p75xvikyml0hi36nau0x74j7bs3247ujjy13vsaaslids1fv891c82n6pzrl6jssbx5548u9zv4dtuqtiq1hy26ljcl7wult30ltb2913bg0pja2td0cilwvfm0bdv78z9fnz6j43u8c16flbd2usl7ifved0g9dn55ndmkpqet3nycqu6mzim7mldejvut7hsq8ia5iq1548994yr2lk9om5cc3br74e3f7q9vztgd41orslsduajcp9vxun9qdfklu3y3q8ziveev4evyyajycf4o3yzhkuifjlviqasc3kqal3rb9a2jhk2jk8w6rvzdx2gfknalcvgzd6uxx6dbe99p18a5aln5id27shh82fextfm14omhrj85n9q7i4y26z4ouu4ebt5xsqc52qdjfhyb6hhrwgd97f226g98gotvv4rhd88i3qcstl195rh3ugvr4kcvk1r9mt5jxlxyb6jyjzfg9u6ei7d7y87bv59oc4l31tiv56bx18axzlmd9hntgaf1somuqr89c6t96yzlhsbormu13sn41zkz2351sfa3w67xp0z0d2vmd3ystir7mshp9rwl0lyllgmbstrom9a4p14ii7n14f1ri86harrrrclu85ngls6pz13443at1bu09k9qc7oyjjh9tmjg28602nfzlxmvzfppjdn9bdg46lk9owzuc4siiph5frcts2piggg92l6e1dkp0oj38o9p6ufqtajlcutr91uchoekwq20ra75ofia7wrfcfin79hetg78p2yn9jxl6acej45gwj7qu9t3tmodhzsxym0io0kqfye1bxs1ow8w6tlopogmsgism7bc2jl93lwsuirggzmu796dg9w7lw5w0ciw55t81gt4wwnx77f7ls58ppm3',
                mime: 'du0zchvlwakf6gw79ggigniqwqxbcdo1hknf3mfvz3mfs69qll',
                extension: 'lvq7fl8re0ofdh9en6um6eo3ctrypj38binl8bmnowcvm0qfjl',
                size: 3625081953,
                width: 721764,
                height: 131405,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'ndtgmf8qvexekpcjutv04q8a0okn52os759k9m1uvwgoxopqy864rgnsh5e3c79p2ikv5z6y36h4oan0xwu818ko1onzx77uubmgszk6z8wualufe7ue5xgq40096uu9n51fcqwxbdjyqmbhpjw122qolsmlbln3sg7bnix8ukl9u6a1rgov9ltkdyma1nkjmpkoshgi2d8yzzkocuuzgx0je03cusp1zktpkj0svyn8m14immh7ym2f1xo07s5',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'vuzdk9boqsus099lhzdb8tc7ue0ox3e3r90nlekcnw24kuka7n8drfhguwkpq066cb9qujm4al0',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 117065,
                alt: 'mpzji4fpossvsvztnhuylyr5jka0pxbomxgto2r4f1xg8odkmki20lsi5fa8n08jpe5w1fsgbprhdcx9ipwk22jr4eerk30vocjd1ik1p5qzvxpvpka7tob6myia9gkh7z5e0zxy7x02157w9ipfh7wm580jrwutzfd00aj2cf2vzgtddqy9la9vj9y8ks2g7rsl99mx07cvn6awgyuu0rscslrqqkfekapi19vvqo9r7141sxfm6tjxfl4b0e4n',
                title: 'mjt50oe471wsxtlhb3lkn4elczj68df19yfgb0flbn7ld96fa9mvs1t6lfk0nfkyub33lv8nlux0bvbh6c8ge9qcpgjmfn0dqtuivgfrhrg0tthbghpdvzsad7gt0g4bqvp3ppt0m2xdlo53ywns0oij9k1x0bp0s3znjxtqse14iebr3qy3odns2s4lspyt7bpe7wn2icmyd2o6rhcjae6q4jp3zftw60o2cpousoezqqm2gcipizrbhtfyrdw',
                description: 'Natus qui ut debitis qui ad. Repudiandae aspernatur saepe corrupti eaque nobis autem praesentium autem. Velit quia et perspiciatis tenetur et repudiandae qui. Omnis nostrum ut dolor impedit reprehenderit est eaque ut. Et harum commodi sed nisi.',
                excerpt: 'Qui corporis ut culpa alias et. Quaerat unde illum voluptas perferendis impedit. Rerum odit reprehenderit excepturi molestias et. Consequatur quasi facere facere consequatur.',
                name: 'mttp3zor6sqqfj1zi9f3avfyk2kgk8kngl8g3mfvzlhdr4d7j2c45nxvcvyplnsgljhu0m2cnran2ntisjp13x7u2e89xkzltni670aj8n9wqsbfbzap9zfpeu7o8oaj1htx1uayifqjfvd4hdcnxyt0l669711vvkhh8rzyycmat5x2s8d3k0owdh3f76g6zf0b6rutq9t5ram6u0udfgd4uc2211r6d3g21azd1eebcsb0sy7yfpy35arvruj',
                pathname: 'e7h2uk0mkuvjcu28usxag77ftxpw4sr2wvoerfma932ut2k9wwenqqypjvds3n46wy05llglioxagaw1ejm97tq2oksp3czmqcgg5xbynmt1v6xdpy2g95uvpkav97b8ua4kzt3tzrnohz4gfee2evewhmd1qe5a0qs0p4bwvvl1v15q1ho3hh0d4upolc5gimn8r1lguxubsf7sjm3y3cll2md8wdw6pdg4kyn3k3x4o2mfzmyqg6qkcc6f5fy05sjv5v7s914psf1rienk6r8q80ogtysqh3hpqo8s1o1001qy4vqpytgsc22vlmetvmjko47bw2evy9ti9r4x7oecqmn4h91qocba5nf8snn16ejc7fita0j8mbsa3rtsmgdiyhcxjazmso9vkhxmcw6m428qnqt45pkltxpz2mm9c7ezotqeake4wrw5fgoj2ohm6ew1s4ijhjcv1rzelfbvx8enp2d5sm11xj65vbqpzhife87z164zdrb3nc3pbjm2x3kma2hl1hnrxuhnh3364aqrylru9qpc8orcjyelz9b4noxe9vtymxva5522sb9oj91h3xuj3fyqh8rd3jgv7h54o809c4bg0lxa7ccy9yeia2cu9xv8x9uhln3eklyy1anlkyp18g8xg3tneh5ql3yqech2svxxk071mvrtiaepnh50pzonvpy1d6v3dwyes12lks1956oocobej1r1zxwh2f3i4zf9p99x4laf4z359rnv7ge9aa8lo8wm6vyt777umw42gl2w0vd6ufh78cqja08svifmxly834lzhw36uic40fz1pxlymxbpcaszo7zd1phjwpyo3139b2sd3fqx418x4vf8atmuc9gussaevjuoflqvo4dntu4n1p2f2iszd5dzcxusdn4opxtal62l2rpj1zlfljlcvf421lvlkf4v2jcpk89gfr70f6w9g77coxy4z77d9x8gqieoq22rvhwb6jr6ov87av23rj5fskpg6y33igjfkitb',
                filename: 'meubofssqfn70gk69f5sq4pqa89dj3ffyjqsf1q74ghznlg7viaph2lj7bnrg6g6j0h3ob1f3j7jx87j8yrsocredw11xqt8917ama8udms5jt5jk4dg9fd5binw95qrwumo6no2jbvcqkgqvfvs3oqwkl9nloz4mmbyn3zjg8hi2vjntmq4p0shb9fcogge9e7xym4u30vqf9r4b4oib963tkhdi4wxxfvz567up8pdbpidlqpn3desuui01wj',
                url: 'i0gxb0tt2j2dk9ki4pjb1rcq6oqjgsy0zg0a5pdfknjaiie0p3bh8atgihjj7nowy6b4wjyz86zrxxpupj0gskq4adkhwasr6up4l7n6zpv3horaz981ca05ufd1x8tg7k6altjuoiclhjq3b65xh0cec91o7jrd17ryofqioxfd4ix3u81uxqfifsx94msny9p4i1036nbzyewe46b6dyk2mkfuy6bq9ofdibl76jvbp2tsv9yym1lt8np6clhrecz7e7uoa1ew9u0nvcvlrwhyupynuriefwsfm8ftfh179jqcu323asgf7g2mbhnjp5zsnxntxuwlug17mro0nvaq3x6dgl0759te7twm8j1d5f9qw5vn05qzuycoumdywlmebl2ujwyysozruqjfqlnan7h3fvc49es06qor9jbf6beg8mv7uhvksttvsmzww2ntg8in5umko4zguleg48lftps81ui2ltoagm12keos9hnmycs97t88qoah3w84cir4swtrtc4r1oii1o1j85w7pwd79yfgq3bh411n5gk4rbzuuo70vg9w4ivfakwztu6ehwnezjd7ty4g5jac8d1o0ep0v795z2xxx4q83weltcq5hyjigpoyi4dkrhu17y94hvzu21wbfkbobfpi0tk1xssgvlwmp0ur49wcbcqeuj0hepnf3bp1flotlnxfxjxfsy12yrhhjd9zfxqxil52pkp7r1wmbin1fwremcvdggmuza3f21smq4g1r3oli12r5pvs0rvv7brs9qb9zx9rs1xubes9lcyvqgx836yg3h89c870u5dmfh6aouy0w2b0kyds0y9axo6u7mq16vz5m88ru4b9z5mh389b4diq4axkdpmou3rismkjlstyumod59yzzt1liqw8ca4o9rz7umqnxliwz8nnzyqabqvsdag486lcr8x4k9tal1tqse685i1jt4kjs6w0vy5cpm79vwfppl0wmga3181y5yekburlct65ydsf8tsfton0',
                mime: '94jha21ljqxyyq80pr9ifhjn9z6281jutya0utp0b7lo23kqcy',
                extension: 'g5zoom7szie0f0z344g0kvqv19datpuugpe23t3zq0tbkq4lok',
                size: 8009114045,
                width: 485633,
                height: 297133,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '0010lb2a7idbcqeeixm8j89911qi956m69p26dhiowcg268ubv1tgr1flfwd5i1nc7thg98tyt9b4fb1ofuzsmfslduiub5m140vxxgdip7pt8x2af2a5maj1z13wo29dfgt8tth0szsrzrw5j579463t3f8j00ux2gp0a73mzu1t575crduhdebtkh2x15vx4zmlmp6sgg89ihuj69vvdcwjbmmav0kos19foljhtao6klno3hng9qnziia6oj',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'dh0vky3t3walfj500k7c54u4l1g5qyy2tj9zlfrnq1mequ3nscit14gkkhiwwele8ohezhzrbme',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 912767,
                alt: 'pvfq9kiyo94bf2vu4pvxesr1j2pe91j4526myxsnnoqg9txf44i7j0m6381ywnnfzfn5q5ihzvj6ob3x9yzhmsc9udrx578rdqmck15mri2g24rp7fs4vr8dov3b5tux43zlqi3l9wvhgtctqum8fg2qlftygi43opmma0bf8s0lfy7cgksn6yn41ip84fo8qbyyyzqi0mcoqhrg7917rj0b39zc2zkgfj1rstnw49tqkmvge5owuq5n7ua3z00',
                title: 'j11c78kj1g9rtywqffwg70h4te9i0lx4jkax3fp61lx4rdcjvkg9dl4ws1gydpi98b74ebdop0joih3qbxwvigmpwl9sxa5gu34gutejymogpcz6psavv1c9k5gu9hr25nsp0rg697p39rqghsdkjygy22t7xykq07ipvvdtxlcg3ukw44giiccud7cwwdjoh26ifkgoi01ubj45yakycrinz7hf690r0gu4e9yja039tht2all1m05uatbn2orf',
                description: 'Magni nobis nobis in repellat ut perferendis. Ipsum saepe voluptatum autem. Non voluptatem vitae id sit.',
                excerpt: 'Veniam dolore et nesciunt dicta. Suscipit deserunt consequatur praesentium velit. Pariatur qui sit quisquam itaque voluptate voluptatum aut ad tempore. Eos nostrum illum ut magni molestiae quae quia.',
                name: 'xr8ssgreimemji4h9m1vwk8lpnaxncg145unt8n1c7kgoogbwk9kkxx7f77z5il18hqeeu5vcdzkwv103k591ge3e5b04w8atynraqke1t1oijqydx5d6k9r4m2nzqgmx8wxkw624vcqoyxp3r3bnywqph3wd9kq732vpk3fg506mmuxma9bwvy2k49jd2ldlpr7riwb465g8ni8dks8eltpttpnpu92mzih7qus9koiqxil1vd8riek3o6sizx',
                pathname: 'mn7d86d0ksfxhy3vrxk28pi2hjvdar8bdlsk4zserlkkvczvhjc1y3ba6kp5wjm0q9cp8q7rwvhjnibhrkmlms8wsoac8h3w4h6ap51vorievcwvq2shisju0k1jtckyxcvgd1igvcsnax77utu8iz6mfa4lmy6dlhjah55fk8ksnvxw9ftli8kt1u36y1b817qihx1uovikdonicktolh6dq2nb8dcwcqqfuea9neywg5fxixcwe660ao2pdxuh4wtpc61tsrszzdonr4clh7lquli7o6a1f1g9qou98igt0rl66qk10ukdluzkyf2xdieupxcn7qfkws4z5o1dkyps6helqd1o5dm8ca81bojf7xwdl0yplulegbn1qxvuj34hhanzkmc7cqkcyr2ozxzje76wqcla8jsb2kl4r7irfksfaqujtg8iupwzrzxylr7b8940uy6365egfqasm8xjlmtd2q6wxptkppv0wje5jt27g7t9vz9qce5y8tjek5x43iffyj9glwd03gl5v3ep2wc3bxqy9uvc2kjd629g5f2fh5b9smvxzhjb764axq4xl0p35hv5w1d9v8pr4555svwesdejh4n8bnf4ntson2ohta20oseeyfyd2gvq736nwyl6o37lfve4pg45tar2j3sozbwwug1a9ytrrj2wtiya8gp6z097uofwpnaph55xiqbw1ud7rkqyx8zvnlfvumwr92m1g9qmy5brmwmeau3t0qxk8zmqunso4ulq8f75iuongh7fj3kq5rh26i4kai12p9c107qro97zlar34k0df5ydppcpf0o934y7ygdgdcp66xkbv913jfx0bw20lgw1apd8lqr5phmnkmsl7xe8caz9z7s8pabkzzyvj6xqf9ivnlsnk1zeax4mjwnl7c5306hji199lkp26o73k0zr7gpo6k2vgyk9r9d4nyiobtgi8e99cxl0tf7y0q5mcmc5v7fxv0c6v5m7nskdwjh9ljk6by7i4cw16fbh',
                filename: 'gkm0muypatngstxc2848n176jcfrhk3n61d5pevzbffkc55adc0mlvv004rdzrv6rsi7jg0ssb63rjsv2h8b0xbu65irpwo328uc6tnerkidqenv93s3q14ug27i9lt5pgo206ubu66yiyoz888ooy1rqdh8e24100wekjgakxunwebyzyfuf8gyrnlaq00esu2mdmw5j2uumao6ftv7egcb6iare1k1au2adqcmzuofyg5ufzk2k9hhu1802r9',
                url: 'ffqbaub2hv7hffruv274pyqrnltkjewmiclpuumngxephkm1htbqw2v26cez0wka0m5ah8t0uj7j8gb59ac8ttcemc6g1ud4jee50wg8w2yxdx7zpsos2m8mv4g7secja8hlwb62vtklaguekwprdht1nj5u1n6rpd9a1rd03qug5mgxvu341a997atkdr7d32ka01nxdlzuyisql5nk0fuagvvuzy4rx93rnkola9kfj6v7k8gnjd49cfchl5b5npr0gyy6t0yiylozj0n99mhv5yquch5oyrvxbjtusji52m1bn0gk38aaoxx7m03gudi7arrpwv9x7dd8ki0zied4c90rwxpp1b6tws5w9paanb84rcslaquk730p2dzaihyb633qio7fab8k2x4sofdqr84dj7c3nhf2rtrbpgdk8cew83cyxz54g900c0473y4i7f36khglq27kiitycdbq0t7kz10r0tn3kcfrrzg64seasnmq3dpknj0pfrywdybwtr0dirjy9bu0hasw3hjlla7xwysdizu9z8appu7fkn8o1t86a97njjkz7t0ai5672yrq6ote9he1sfed42tzhh9qwuxny4ygzmj9otp5rxn9dqk81is46f3x5b503h8fqvu9p944s0iiwhlgr60entu51tbddecr25kbyyg9lnzk3ey2s2ya6pkuv8hsexi6cyvcdi22jjdsw26pwxz39i4t6vpvl4fwe8045g60en255pnp8trz5t0t0smcw9k3eypjdwiooc2qdhjgt22trvag9ozx389i7bwphrshf1ol7gnws00q14se9bz3a25t5kjayq2pj3djbkhh3490gbsaj8kbt7wz1s632ic9d962445ekpv48dl0zi6889n35f20j7x8tw2padxli24z6pm923s2dwsdshmi8coskiz6jxeryf535vac7keus3plii4vyikiyelnl0ms4hc0d26mbddz255mvby6m1ksym80ok17zv9t0ph1y7w1',
                mime: '9aff7jcrw8jgqgnaafrws5aqzdwdoeooztl61kmns0iqdl25f7',
                extension: 'fwjnob1u2sjwtp1t5o4z6dwhsuspl6n2bpn46kq7d0zl25a30f',
                size: 4777278463,
                width: 904633,
                height: 118341,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '63kiltl1zc0xfy9ozalb5qi397zo1prwmp2afxn7nwbsc09y4izt4ldyvjzx3js8hiwl9uyg5db5o97oz11k2ox0a9948yndt2hrsesqs01sopwit4vdf1c8w9h4b7ukhk98f82834m2s734dkkhrle9chntx2o2lqwsmr51zz8fl6o0s5q2xo5g5oo5g6u7xy949i03kq9avoo5689egzklc7uqc4qialnv75jvwlebnxvcety0oncbsmn1rzk',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'zbuxxjjca34ten0vr8gewvyur75qgb4k064a49g8ad85tlk816rz85l19g7w6mvwwtt8tyduebq',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 966043,
                alt: 'bk1usmt1ftbebws0pi5g3vsyidyjcbkk473y53pq3f952dmxo96ko6vqihtnvlvyyuok77b9cjkpseyhsq901l19w6w2z744aziamyv6bdv3lq17z7if45s88ucbtnazrpn74nwqv3fqd34lr18cx2u39r35e3racfarddokvpuasuormheif9axadrj0xfwjjn2o8gns74eo3s60u26i881q4et9pof2vbmd0vvu8r17fk7iltna1abk0iuh4k',
                title: 'zfggrimpxx58hwcfx5itpynpz1qxyky25cjtqeh0hhd4l1fxody3rhachr2hspw7ztsnzuuwrkqu6p8mj0lzv2fwlcq8uul7mpsdevolbchea7gies88cphx6ryw5pzyzggweul58lgo97s2cq8e7y4a263h7jlsqu2cg8rm3z9e5034ffs3q84pvy0fco9xqrzj0i288qw61mz92790u05hmyjvl9v8rgxnqbzr0vpbrqwmxi6uxuozg0z0yyd',
                description: 'Est illum ut sed earum. Nostrum illum est a ducimus quasi est et. Sed autem dolorem vel fugiat cupiditate.',
                excerpt: 'Consequatur alias est similique est recusandae non deserunt. Quidem mollitia sint nam fuga quisquam ullam quam odio. Totam iste exercitationem quaerat magni facilis ex. Corrupti rerum non nobis.',
                name: 'c5dug1h2aaszfequ2aq551jw060yt963nderyud6nftklio075hdkx31dheoipzpfeakvs2os66tsg7dhme33uk3q3tag7kd2yh5bpivlhv4bcrr19ihg4gpu6lr95u2lnhhb21zxjfrw4feulq04wzmlk0vn64fbczslh4sgvd4geg1o8u9ar6smk9sir0vlhm6x2yfhjhjb2mwpmbzop70kquuttlzzf7vp9bv23wj326bstvmrtkwjixb3jkr',
                pathname: 'smab9rav2jjyur2ipcumxm73zh8dcolape3ob95ipvc8int4vzfu3g2vejcdbf4n4sfgyphhg61ckhx3skuuaqu5enz3m4gdbxi4qw700fp1dngkeqwgs8us1gfnoo89cnfdgzukuuv33fontvrp0j7viey7uueail9eqa255bn5n7whj1wy371poe1ldlfw2v1kb0o5ch7ndjqtwmdit6bmv4zm3dz134xb5b9j9vi07v0gzybstbt94bl80ugw4wcn2qdddz2sdbpq4qo5zljof68m1ikuhc76op158gwfpwmpz28ryvo9sy16d3k29b3ihpsapojk3920nrr9y2bdymed1hgmxntfczpssnjd4qethreky8h5kcv09y7ejker85qr2q9282fygakzyyl0zku3smnnwt4tjy4dc3e62onxfr2b6a2cv40g9e9jhxcckkbwk4vxo91iw7v67pj1nafcsm83toorgja6yci9bcssytxpb2pfltj7kn7bkv29xmiqt5t4zw44uqrmd99l8hmbs9x893j5604v2hqf7y271r73c3dhcx7vjgoxjbxijh1gc9zolwd6d5ppkd6rwg05o1mc2mwmvodminnb2o2h3xi4jodbhs5npg9ob9kmjhp9yx55h8xq92us1otrgrrnex1ca2st0xw30n8d0e89rduz1kixw503f1h0tnmkp1mknqzffrfu57n5481rw27abcc0g0qfbc011jrkuxjs7zu8rogwctly9jjln9jusd9ftdoc9edmrbct0xok4e4s0vijopx5vg94zkqzk6i7aycgxlwhitmhjuzq53apzxuwj0j2eaj2pihyj0x7jrag8riqcz258bj4s9jzjl6eaye3c8u63mcep0zf681ba4bq0ncst5ubxgxlxs14qr3s41852eyyd32hq8bq4m87ctdio3m8fklmit2ert48zj1g0chsdxhbg2lgbdafmmrkte11ypuh3eaz8618jy26au6ipforz1ph51ww',
                filename: 'tafhpcsksrb7zehs59youcgvdtgz6tk5z9owjyjgrqdms884834osswnk49p6hckxdwlr2d1k3zkslv1iglvekw83ffvbuk3f1p2p09i2bnl04cmu05z0ug9hk5pl1e1ozusvu3iceop7j2d4cp28p5pg2lobvy5e4br51meeikd7qsy51syg5recxq0blhui6aaaq45h15mm2g1mtlcj346zs2wor3t1i8ngu45hfw7o7tuhqce8cum90dzhia',
                url: 'slzbksnmz30bk5cqia4m5liolv8e6byljzgntcezcod7vzum4vbd3wbrrveipgg0rj7jw53lqipntuhshigkf29n4cvj3wqimzluu9vo3it0xkjqfb6u8epvoyoey6t491dqjhvihv8dadggyokjyu56zklf6t7ax0q3gw735b1m4ikw5kk9ftjm3xgess37htzktwu99pdv3fyfp4zgb3xv7ps7m9pnmghbqw9mv16rm12wws44bc1g6ppqf76idicksn5razkxpbm46mcds2bi8la7sgr9wcij95gln0ux0y3q5o4036z1zye470bwhnxq0a7cxwt9xn5eder6rwu0rvon38lvh424g5zvsnd73hnfrmk4ekpwfu50e5ak2b07p2apfwyv6ytczcffnk0anfwchz8o1c37s44oexmgq8eczomjtu6b1pavk8r2oesrbwltms0e7t4qlzx42241qhns2ic7nwuaku562qnmny8x4hj3q7lqnrdk066q2nwum2oragivoddav3sdile3mndid7r2ex23b6rymz3wqa655ti1e1iqfw9zqxeflaba588q9fb8dmji42ats87ocuvwu665ux9h9l304pt7wusdmi7idi4yk27vbcxih67931kb7ml6yb9q008hsh5y0xl1c72ps2wy5611zzsrzdo07plyzcae8hpbed5wk3gk6zdhb0t814maradpechjwqi4p2qyf92p889rof56d5v549eiim2vg3k4thfb4cel91pvzthqyc6n3ipeuiaq0fonyobd5l8tsj6l8etfc212cz1i535twcgbcw80b1s7tlu4aifyiozu23yn0hbve3g9i0evmlsgsubt2192xy47xb6u4hkm9wv3ap2qd0kic0eup87s91gusk0ya1dvbkqx0l4pvxpfo1ms64tp1ne6foln4zc81ryl60ijhewuxiwukdyaczeuuccd0k9qzh63bc8zc3pnqayr3n9sqnomg7whimcdlhle02vq',
                mime: '4oh0clcm9jga8pwvri89dfsk4aore2x9mfmm2c3tk3ulmn9oml',
                extension: 'qruf8mr9erj9r8jixn52y0v9mblwma6zuvtvsxife73mau03kg',
                size: 9594923168,
                width: 263273,
                height: 508030,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '80dzt4l4o41nxyqweibxvs8slsqt3tx7qcg4vl5wi2uppzqbzsjvpbp446woauq2iz9r3jdrqzv99spjq1arnlx5y2m69syfx7uilcm7xjnvpwza5w8vr7qigi2os29q514k7hvlfp4e6anrrzs57l3efifcsn0b28kfgeqp7i8pceqxe6byoeda8t1d1d2rqarzqfeqhedj0jmvml3hg6ekdwkwhlgwq82fyzcl23jn9qcvn2vaxuz2fk1g0uk',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'j0vi90kzbohzubh1u0mrfcgvalods3lwjr8am36o2aops1cjwn7kh5xc5nr4acgjdcvvfrzzcav',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 264517,
                alt: 'rx1tllfeyn1n70p0vz6s8rfx6m0jvhtui6d6dobq6yxauas798tn3i0g6kvami20vm9c26b62d60xzz5trqkrgdcl63spcwv6hirqnj29hqidw6ncla2uccbk959iyutu8u3u3n7eze43s5e1jrul3lo88qh3wvmg0wwd7m9t8cocwfctn52dt6zu52ophyezphiaokbb5ezufnsd4164ibe01yk8x3kpolvwdqiyf0ugu8goepcn1lq34h177r',
                title: 'y5wsn5113lvkotonlqrf45cr92t3imukr1ug9icalgx2fsb5zdu1i5tiwkfaj7eo3alu00z4n2tu578pnsc8utl8ygf0k1huzou7ivxczwvhxc5qjrcuev26xnyz23cnl9wry9etezmbfxz28gk6hxp7t28kv2qia6em18cin3btb6c8sh3tv5z4gtdupqxm32rttzo986vi0dccl94jy3n0ppi8h4a9np3pgpr9jcq6rzmvuplbks0aooptxh3',
                description: 'Aliquam unde quas et asperiores dolores sequi earum itaque laudantium. Molestiae hic vel explicabo non dignissimos rem officiis. Sequi sint nobis molestias harum molestias eius. Qui et laboriosam et incidunt. Deserunt dolores sint perspiciatis repellendus non qui minus.',
                excerpt: 'Illo nobis occaecati voluptatem alias quaerat voluptate dolores itaque. Error error voluptatem provident. Eos sunt voluptatem placeat animi illum ipsa nulla nam.',
                name: 'at817p6xs81923d5gn20rp50f7qn3s68trcirsokhacij7myhzh3muttlrgmume9zyuigp2qyw93hhav4mlbswd8tblklaprixp65gmoh4rcpxyv01p5dx1kfxotp7im9epepfwra7abk09cqbvpy1i9rucjmy96s8dls30608n5awrowujmo3av9cu55vjlz1agt5s8bdzkcc31ttam1q74z18qdh60pi8gnxw4vjfdkw4res1y63j1wbybed1',
                pathname: 'ehj3ugiihw6sb2snzihmv2tpmufocxzothzf6ujf5h4ow16ohh73ymx7g6qdk0swqgqwanh3t40hhd4bfjjhpsumweq8sw3ziqu93c18rslz5q005aitz48qg86vosewozwnipwnktrbvc8to8w4e0uw4jnlvmcbsai694mlm0kzw51gvsuldnu3oub9abyllip96d567y0kw7l5yiq2m3vibstma1u0s7gqp5nj1vdvhygmjhrhxcbgjoadzwhvn06466l4xd3tve9dmtzxiz7udt13gfcxo98b6m7ummxyvp813059bzyjp8jytdy5uslqa2lvflyivlcssmt3t7yvyn4hv5p4qwt6qg4ms83fulxfmaqh4rdn47ac1d9m7uwumc5a7vd9qm0k633ntj3rbiwb2c12q3qg12n51bb23focb6yaq4adlrvsgdd0vsnqll7xlfdbdu5m7o1i6fgv2wr8q7epdxlo24lqop3xs93bcq0262zidpkhs4iieu9fqdzmq8hfpkxw3dv6ja4rjc71qr6j2tssomv9y9ihrjfceoiaa2t6mlv8k5ktxgylhqol7iqzwfp7xk6j071ptgpcjkyjk8renjezmresa56cpnes8yy0107kqn9ojamfwdnw7u752gfrjhg1oqjzaqdx7t74chqmp8qxsu44fmmzu8yqh1v1jdg7yfn6micleuvzan637329zxm7h4f1dmzugf18jhuiwhb3xj9ujo8vjssg6m0l9goms4kwfwjnn1fm02vos4vk96is3keffnrdnz70zbs3iei79x0yhkenggle4h38u0597zkjmlut0v36bdghxfzssa9r84nai2ilu14my0o9lija2d8zq8zpeqfsbre0h5z0la4uzdx9bg9dbq0xuux5cwz6k40a3nxe2blfmrvfpopoj8pj3jjgj5soa9y2nzj6l60foe3fcbjvu280kckqd6fggyqhvyrmzoexiy2k7zsvd53sjlpxtjtl2m246qsp3qlgm',
                filename: 'tta2vx8ix4bm24w32sklhcr3qqopht4kfm8vs28gri896c5zhgr97igij48ojw5usxu1yik0iel2o0cs9flqgrk8g3rm0fr10gg16ia91urspjnj8cye4vrlvu1xy5g2rel8yabtw2mi49d2nz0vem7bevvzkzb19j86sddxb6i8y4mcn12fxhp5u2x53ce8y8g94elvaqxkpwlgss1mskat935gmyf2r9a7ebf4fb1ge98a2o59zn3ftf4uphy',
                url: 'w5gkj9cijggup1u802q6sn9ylgd8g8l77ubaezlc92xepb4eilgzngwgpeqdsaqvdix9sngt1ap1923h62iqho0j9wzdmrjrz0820sgehc65pnw5mdnbpkmu34w5rrk9x3ksc2s7o3wjty6fbqd7ftdn6scsi66tmdjysuumnohy4r1d0wf1ypb2hu4oqts948s2c3fi4fbg7eg1jcjp1kskqvv90nee0m6blwfwxg8g6hllkj1f7s46aip50omat7hvfjdlauc3minxmyitmca7cw6lp11gzoiz2au2n54277fak81gaupabxhf5cvern11hdkrney0ut5ackr4rdva3xd4cpzva0qbf0k6os45ouo5k3gt4er8bh720hvqlai0zid1pm6bf8suywf76n7svwddbm58rhkmzxnad6apldxux15prn9smyjearpy6m07iw2dkfrbitn6m8eyh7ehb11khdvoqlnbb9r2xc6k7galjiw1mve1miwct871702wz587rgnszsneg2dnec32guwkghvssyienad49m6veychpjlozvh6nxshocw8mjq1lthtm6mcygilt0xrjgqx3ew2ja0arbvk73l3e9z0gcl0n78dh98s8atu79ofknb50l701z4voyvz79bmv7zt8cnwa2m1p60j1ormy3uop106bgfekem3mg6i18s6rvbfvv7y17884jt3z01e7mjywqvmdz99q12cwxz2j02limikglpfl2q0bk54y6rsg84t5d08mtp08jnjnr2ct0dva54oibhjsyfa5nmtnhd3tdpufpsv3ykg2f7emf5pzksm8685j3vrkclc8rif1h8fw8og00he9kffbfbg4we8s10yiozvzran8kebyt4epsdfh6gdftm4x10odyg4to0gqatvp874rkfo3c0107e4n453f6i6d61gu6wco5n82s53oiuyre1o0qawcxd6164q3vte155bb76e327dratffpo0ucdtwj1xwoz6anlj',
                mime: '86z6sc4hizqip0hf99o2f8qiszbtn13hfg9evdeunjo7qul0q0',
                extension: 'hrknsxffzp7iffms1vz7yhdc31pv0hx9e8qko410r24lrond3n',
                size: 9029093706,
                width: 138767,
                height: 715134,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '3sjwo1xf5wveke49ubkobidiy69s2tbn0x8dbx8qkun0ay6cjcai9aqj8wm6qu5vc8mqv78kz8pgj6pqkvbjhxo17rvbh8zwjg4bwrv7icy2i2eiyna8xtnrtt00k4j0s29dqgr7r0kbzwphff3omvyunmwgfbw8q6u7m2b0rvw3e7s01nu6kb97amxq3991b4zlkfhayh9q652sfx0vkdupvbpxr7t9q171xlgss0xw3hvwo7b0nqtbv2en5xj',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'q0j514vax7d8ysjhni52tmtmsyucn7fbm78nqbs5904lfzsamkvuuec9buso25smcswhk8kpj03',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 554556,
                alt: 'ram0j6w0ft82rdzj2idcir215gi77az1z8qw40du3182vce9dnrq2467bicz5rsn11g7l1g49i3y5e9d2dl85rged27evo627ghe25oubwn4dqxa5qtmnewhyszrmlk1slt7cy72ztl81k2iix2jwnk0zrphz6k0cighglzmsv7oqa01rwe8sezmn6p29jcxdskyutk14wbi2qz3qwbthl3bb9yfz7g8ffg638h8zhpwrh75i7gsc0nsm1ljqey',
                title: '6l06gqgaz11jtyjhqp61yvoiclosqzophdv5vysc567xsiv0my7dpdh1lzswazblne10xc0myg8vcrxabsz1u7jtrv15eo7u582ifr048sff3509abwam10m9lnshvwrmh0oxpfbwvnlathxjsst8ndzprjnsnk77f3ybjpqo3cn19395itw6mp0c74s6mt6zaos9yrs7y95oevt8sp9n70nu8cber7rjku7r39xe2jb0p7j4sj76hgb7ylda9y',
                description: 'Nihil est ullam officiis. Distinctio vero delectus sed sint eligendi. Deserunt aut et et corrupti eveniet nemo et sunt sed. Eaque esse reprehenderit ut corporis aut quis sint corporis. Et corrupti voluptatum blanditiis.',
                excerpt: 'Et fuga atque sit qui voluptas. Architecto rerum voluptatem eos animi sed pariatur. Dolor in ipsa cupiditate officia quas aut. Quos distinctio esse. Non dolorem rerum.',
                name: '6q22vx5n5k7xs9yymmlkikqkn6aj0mmtqvaoozcdzic05b855u05nt8f1whze0cymvj2bztsk4cdej4aiaizpa33v3s5v2x65kmvnxdxix60coynfl1sbq2cun7tss2fsilpdev1afvkay7evjl4hk6cddsdg9jkut0uq7x94xqy1o6a4ju2bxm5kbeyie599r316t2uqkxnqxeukuuhye3gwr0wsxz9usmcx9ocf8mdmlxekhi3iififrafa6p',
                pathname: 'vk3n6hnlwz753y0llcxqaoigj15vlokwvvznulogejnljvplm3h3sbxpit8le46dkvri8r4h9ss0j1oa0zfnefoq6ypug1a561265yb7v6h17hk9mv39c4lbhl2c4cok4ctdmn2082vg9itk2dcevstw5t9lvzzps18p0tlkjb2l0uj93pgpiz35q6u9t7u22nmad8pjbdto2wzv7hhu0tnzkq2jmzpw8ivl4npg95f0lq1yjpijwsy637fh3bapfqvizva4ivn8hnfpyolnz5xtqej8tolrj1qg2pl73bgbgklgti5p51gd5tjqf8wlhlpf9he1om3x2r4dbv41ccqp8lehtefhun7n7eb2zzi3djc9aimwqyv14fzphrhojfuijc2fbq99gqut5espd2lur8wqdwo1ipn67k5xghwkn65zgyt9dp2tzllxghnwxx2iwkx2b7trti0aenjbak6lra06kar34bq500cyegvz41hy07d0bds26fq4ewzlacl5z586xnc3ej65vn6evw5nz5zxk4bbeq1p27bryixj8pxsl2xfvjlcs5bky1w1egfzsutlj52c2onx1070y2tjzzsv8nsmb7nwv67gbqw9rae1nxn7uu3htdjnv03sd0sd7w0uhbju4so10cu4gzgla7o3c0wqksy2uhuujq43o54bl0ntif6siy1jieqzxndtpverografk8z8vb1hg9rvkc2koxgr2cghkmullwdh85ap54abeoq2shyevkwbff508i839nci6q1l8155jjjrkc9fagqvryqtgxqllzf3anb4egtg25iuntrh34wmuw5guv2a9hq25ew4t7u6ykeyai6hem9cwrgudqku4rgy5yr0szeety7sq27rl8zrhopc1emv4ezght0a93d1dik8psj36d67nw3lnakqanw64st9zh1june6yq26n6085e5kq5mmxtw24w6mnrfih1699jxzkaf9a088jy8d6bpbuux7f795p1tl69mxpfn',
                filename: '9surawnnro2lpfkorrm2p9pbxnechq57j25pboaoty7t35gazmzjclufrb9qbayxeux3ngsfh7iu3ul1x4inq5qkdebxlg3icvzfh4g5ssddw33pnw90dj36wwjhvqkkk7bd5l55amebmmhjq2vfa0aqbryks22eblx0rpj378oeu9ecehp9hwydc9aimjn6ymr64nt9a4vbcgq0gnc2uyawxw9rgrh7s0vjx1kmu4tyxtdizrusqm3krcahrndm',
                url: '2hjl20xa9dvmwt4375i05u5mgigs4d5ttas4z2gy0z8yykdfjjreyt8jhhp4ntcoq65g60w68klpqeldogkoab25s5wd9pzaavrwraycl6ahm6kjf572zspe4g69wjg7drbx6xlzr117ffn4a4vju3sh1x1gs04e3xtnypgecafx9k8zckqabymaf8ktyterta6weoug28od9lo5dbu0o52y0jlxfujt1aigry1qnj3o9us3d4kjsfkmqpnbjdwgxsoucenwmwnc7vuksfs3emrfv9u5i50io7sjvz8bc4gapc480m0u4ke0ap3ks16hs5pmb8gyl0yrck9rqhk7zls2jcyas9gjtly27s0yxeeojv55q85uei510o8ufqwo5ovik6rq863kjlwb2k6ajvtuz7ij7oajpdgryrjzjc3lfapu2vxmbpcndlvlo7igbytf8o19t3grrivd11rxmhotu3z2tare7o21qbmle133swn3yj8uzs2y6epnhh5j0ej9k4isyqdz3g4393uns2qyd42fqcxzir3tg2baw2oj87t2d6b8fuhlen35zxivwc1ionu7ag2nm3ust8kwls3xmrc3o4dkc8mxgs6sl6iqm76c7sitv06ncc6blnk53oylvrhqff5yqxwik81ztktsicruhenueqg5brjjyo6r56jiju2h5tyhcachyns33hxhabl7cgk0l24jjzjyls4vim1oazr4a6ypyygkq7phbqy96r26esqns3vr0i3pts34juijak0qdy8zb93xw7ru5mdek4ewsm5qagh72qyq5jzrzsj7o2o32kf2cimyob2hzkjqddnc8bbyjg1f461jbqkkvj0o7fvrakl74u16imhh741bdkj7epzst3yby5gp9arih3hb7842en1ecpejb2t5n59t9mk7ilw8pz975j2vfyo65lhjetrj42bzf5qgkf61ycc97ph8t1954d608117fwqc1j47blkf5fd0kwb5de5g1x668cewap80',
                mime: 'ussn9jllre73h5amjjswm5ys3omjey3avbu6avwdi8fgtaepno',
                extension: 'ubf16lszovrvy2hueqr30mmh6tlvn39t6jh2ovk705vym20wc6',
                size: 3636970226,
                width: 609711,
                height: 220223,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '4o3aq9ooy34e5fcvwmghzkimip7dtx9i6lpn16go4o30xyikui7n6zzmselud6kq2fgueropxt1gxmj582o7g0caplrmskwrh3vaqd2rxxikmeb7re138bs2o25spnr51n7vgh7waff1f21xku3yqzikijyh1sjxtmzzkul7s909uunk3lt0n9wj7pfffhb0q2knurtnsfohvgfuhv7077pmorqautay8zhmuojivxezbvr6wowszzogpj78zxd',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'ex3iuz3z7hz7x82yqjtu560reu50l11dj3fh2aknpeclhsk5iot1z7fcnu2j06czypktlly0co9',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 206925,
                alt: '3m7t0330pdil38uh7r5040pqklyylk3ftnhbbv11eyq5kgmovk4m9li4lmhz4gz2rb1kwggnv651h8w1rddzo5sh9kmfa5686t5urzhsmkdrd1vnkddw6zaarj5k41liu7j5n4y1nkn900ukm31nf98ee0ii0vlukm151pwtxzu0bx069yitfbn9761dblt17zq9kt7sznbgk4ykwtkwhmqmmhq0r4fygdf05en0c8kn4cjb677m7s8srast42b',
                title: 'x53qgddpn2n7ej2iabxxhfd3uzghfgo9x8wir9io1doig6rrkesktoqm4hm236odrpkp1cmp8czdc8p95kglhxyn00jquq8t2qgxifaim3na48imoqpy3o87kgowl58r9hjitxgxyf1di0htz94b3h89i2oz8oytlctdaorylrjb0gbwlkb5sy8bfwm8005va49sa9m4xcjzqz19bebsoh7n9cdsfri2f32x0gxkmyegzlbj770cb4cvx70jxpl',
                description: 'Est autem hic ipsa ut ipsam voluptatem qui ea. Qui occaecati autem quo vel. Quidem dolor cumque veniam sit assumenda et et. Reiciendis eaque aspernatur animi accusantium optio facere. Tenetur ullam placeat. Esse aperiam blanditiis eveniet.',
                excerpt: 'Et mollitia aut et praesentium laudantium totam. Et ab qui enim impedit qui corporis expedita. Necessitatibus consectetur a aliquam nobis fugit dolore earum. Quia quia tenetur repudiandae nemo modi. Molestiae dicta accusantium sapiente et occaecati ut non saepe.',
                name: 'ywyvsvefje1oy3r864pzu7gpv45wgfscye5xioqrc9hogax13qde56lm5mwi3kfpfw49u6lkp7tbwhs9ui2bdj9dvocjh84wv69kkigcbb1o6tbg4nljfbn8idup48q4fu65kim1lhz5epmk5w8gr78051e83jxnhjgyy2pyg7lz7kx1rab38w031jmv0pn5hzkr9dpaby6s0vk45q2jtk83aqmp1ptmtlo2op99wg8pwvjj0kmeyuq2px1xts1',
                pathname: 'pdvd4f97oxr6xs3b66dboaphhcvgbx23e3nzitickr3hor7f3j4etsgj2fyb6g7pg954vcsfv7kw4q18pmfcbqe6y0oqa4u7mvt98e11bxomis6u3dk9vbbo2u7ce2tdjhuxxs380riuy0rohlcoenp109o9eu2uh8i2o7zjfxugh008bi8yyjo63umaru3le0org0v65soqesu5g8it7xhrds6zjsme0l3ihu5ychc952kbku2zrn5q1phvd2vi843ceeymw07paqh2m4xpz5gh5wkm22mlbkbxq8pnrqfbe621moj3kenskwm9947n1x3pqvtnsyizhm6y0nskedbd2yyq9hd6hgf3ypfcfky4eq622awclbczdcq43ujqhprp1pjd3skrh1absqap51ab1wm5365ga678eykwibjptk9v5j1z7857ebo5232rdzh8vfdxltdburcfitkhv0jg1xh52qwgq4gtwipqbguapuvw2cz1i305n71jmvk3aamlnr78m5zk03jxz2hoiqvv9o86fdvbzb0tamsjy18y1jdk0go0vih0we7zvbojygkihzg5fhin33huaoaw19gj8bei0g8n8l4ciwwqmjuzuapht83zeemzovcs3n0ko4gycd69wl8lecw1z8w84joxwsspxbcfpcmvh6l9dhgb6fi67hdxhbk1datxrtlhj0f297gfxp8654cchmqo28cmwi8v3gosv2nge22u8sck87t7poxrghk1ilj4n1aaf1r3sut0x4bieyumas5hdvd4cwf2cgpn2gyhb18x9hr3m9qji5gp36y7qki5q3d3hj9pp5ggich3lbjat4wsswm4qhopddtefsdovs54piyils2bje0mamgtnt8qs0wua0rk6is21k6no30sfp57sb3g5zr8850tldgq5b2inkwxay5kvamlq9l0opl42wzstr9v49n7nqm05ws4853p20gi34eqko1fce7x812ipu5xluttdyzy4n08ncb45xfu',
                filename: '08rfsxwceydithcrcqrjrks9ret0o30pqw9lunjkg7aw3ofkoeelhebsapj25100pmcrxrc2l1fwcewmwbwzkekiey85u8so1rekcdkkownvlma21vsa6r3qw0o4dledndu14f413mb35atxy9q5widgo438ldf851q56ikegqqw78lv107f102vwjav7oiawhckcqv4qi85593k6sdqlabghwi4jp722h7w614nf0dvc32c2rzpblk0bmpjlsc',
                url: 'ojthu6ntdjhia76en6z0ahuuuzf838znc0wecqrbl7ienrt0t9q0in6o2r6vl5av6linzu6zasoc81ss9qmuh0o84lhmqcqw7igg5962ggrc3fjn3uoq94e2fwst669f2pfno04jowmt57bwk7qf3273ibuxdjtylds9fvyw9zwbsai6573u89u0gqerzbddiioyb5yu0cuujsc5ade1j38snlrf9z5rb575p8k4lj7fza4ngukwllfab2osk2jqgchaoq3g0ktenupjzsqi8089doq91ox8x8msm2qxacmmlftlmss8wi5146x0w5usttyscnzix6193q5y5k0tpj247h9k70a2ykvnbe9el9s5pf2iikjcqm6jkrv216rzjtwijc76w52t5kubh95i0ppzpdlzw6fjrq7oz70024luws8m4rjvqtu5klqele57h8yaaqmcgsc2leippz5ty2bl2kjefos0kij3aj18ojt3rntpgnosr0shfe19rvcnekn16svjifq59wjklydydo9zip3soa1wmh6pg7cu7hs6vuo30r89kykmx635wvjr0bckgl0o7g6oozqnor12aph09jfotsffn9vsmop0drzkrast4x6dw16cu6zl43c0bee6n290v9z70t0qyoeizmp1igvstem7729jr3exkhzrartzhsfu7xe7jhcv57ctis0lfeg5rnae941kpttxobhrcku9mx25gb0d7deaocc2i1npmylmly49k4e1w5h25c1z7ezsnn7i84qaiqzkdb98fgvacq9a2vf98gp3s4w1cx2hrj3pis8geuisd197c4fm302shff8x88mujczi9mw9cbh9ynejt45bn4eh0pn2ab3pmmykrtiaj5bbrhg0mkiljgxp5816y7nve67h2y27yg0rc1m4rssmnmcsdu3elqmjd3e4984szr7juuxhk7vi5u46szc7d2145okuuvxrirmlpioe5e627twdyj51p7kvoitwht66tr5pgbwo',
                mime: 'hfb1gpv81drq1dzjrkq2dg9q10sdsx9t6f4yqtwrianmpbw7v1',
                extension: 'p5uo49ulhb05dw7qlm4nau218hfkg17u6hinwi83tmcm4qwp36',
                size: 6237525573,
                width: 302897,
                height: 534308,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'udhy50gvkkt5x4k05akktoi0v1rffda2u3jmglwrzauwrojqa5ih75xncs72heb14mixyjg9hyzf2ysn4yg2pp5b8rp0divyal0l0q1kp564mlgfk2f9haw0u4sclwaxvk10f69ur0rhi4gh7w925yaxpnkquij0zgcc2i3dgc6sneg9i09o8qmh5exmokx77bsxc3mhxenp5tsmijsydb338wu98fj64cvnbyr8yxw6fdnp9vgnn7zq7jo81od',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'ux7l2m53xa7nlm7osvu3oy9u6dibn6i55f5tmeyrusari9m3d4dfspzmv5q3aq8tz187rz6esu0',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 201990,
                alt: 'v36fg3vdqw0fm9wa86m7lthkem6jof6sp6tueo38f8xwx4ocy6b84iietl3wrnm45nwg68ibqq7g0wjeezkhktvzjnl0aj4g2acv7pttsgewmp7k4u2o8snklogo9doav34hjxi4zi3p2e6aatrbr57wghjvhx6xxmyrsbugns4yiertf09ahfl9hth4iayghq13bnerutzb6bvqstkv024xh9egi759z5800h44azl1qg6u3fvhsncyutjbbk5',
                title: 'guccns05phgp6qsbinp4ejmlioldxui57swfahciarasool0c97nkm6gs62ghaa2oq2itq5nb9zqn579bokgregay4n9lmkkhgss9nmdjhoqobjkcliuddbxstoo4oim292s1idxcgg0xd6ct3fdczphczszmvucfvcedc0l7425g8ytv3v5uugwexro85jeoup8jg23bxdmbdvsxb2ytep9y3sstlx1n0d6m87hl1mhqebnclj32z8wdlmcnne',
                description: 'Iste et minima commodi est quisquam incidunt. Unde dolores qui ratione porro. Nihil temporibus rem officiis rerum officiis dolores.',
                excerpt: 'Voluptatem quo error dolorum voluptatem. Delectus eum omnis sapiente nemo. Quos dignissimos necessitatibus accusamus quaerat porro rerum fuga non. Enim sunt sequi dolore aperiam laborum rerum veritatis nobis qui.',
                name: '1y9nkkgntolzge6p39q3mr99jp25xvbticmzimqdy9an7ukpqflwkl7ylz0e90lln5t934o49ph5oj3tgbkkirlfqti22yenyu6d8f29zoqwzjr2rlys7zp484wvk55muik4bkncdg5bkjbxy2vz1i26l23l9l2ygcxee6pjeqy843jrununqojjxbx7hif34c3b8fu59j8bm29xnz4cxl4bxzmabskpfc4tcvkdzblkcak6mvis1jkgp2edqnj',
                pathname: '1chybewqqntx2w4piz0bk4bwhwjbeqc1vfi5jj0qryj592soqrdlcbfd6o4bjxwqtya92au2aplf66k12mjgwiiac9yglwqqq0ecm8s791g4uafd5q9w8fonksr7e907w8z8zyyuyjoutd292pb3o1rwnl1wq9yhcf5h0w8sqaveanr4y9l5fdf2vjqibu8nv80heh4fnjtuf7bm8v6zcw6dsqho5a497mxzz5qljzsi3zm2sa0k6g7olj7aps539l143z8dgpdfoyacy6evx8leklxqtk4jd52p9ln4pa4rzjxn2pyh4cwru0kvwb2jtf1m2mj62jcgyf2xrmtgzpfpefxq16i5j5fxab2deba27g1b5yo4m4cicxvuc0m0ot2gaqv4wvgzeq26n2oo0bsc8ghl60qf5gjwvtttk30rgx6srh64o1ndfpes8uu5dsypcu5y0fgv9yiv076ruityfojxhnu7kyfw0vp5zgh45em7gevzty62rb8nltg8qtjtnybsy6hqi7m0d4hn1c15nx4x27anz128liautbztj0y7ko2ndfaa65m8le7aw5dwgkwy2rwkxirz49p7q7nmq03aqccx2kpnompsqxmw3bgqdbxxjsig4kw4du6ujwjl5oc6fr8onb0fnyh69ou9dc30bwc8ghdzh9kdksihd2rlzb37uq96x17j3e5ge4l8plxs1kkln4owjwrxhjkdzsomiwvre2hcryvnbehrv25e5720u6gwex0ym403rg1o94p2yj27ac3hvw6ac6zdanlird48b3gktep658iantbdcmm0g3vxl2udj5gjkfiv5lrc653gdddbun7eral7mwc8gtrs2bynkfuh9bjpes2rajoycnki1pn50px8pxml1zpuzmxqll4u6p8x3u481lzn9s49812kinvp6gp145csyvqqetk900ubmtuz4a46ibhj82balzynedfngn5pjqlcubp549f077dxmc6bwtg3cuumm2ik6wzwwxte',
                filename: 'qgfcitnv2au20bw0qn7r191aog95s1nqnx6l3bh3yqo881zq2errau3dckz498pjbp4x15wgr4gmga32jlf2moy262v53b0rcgzx6dnx1bb32cyjffkcid0344tec21wv6eq0bg3zzcbga802c9blhgxfy4d5n7sf1v58xmz40pj1dizhhtx41kf16ykagidkblrrvdi92ul5z1tuf5cb6wlvgt5ihndtq2voscatc3e48y8qe0x4m7s0wlmoy9',
                url: 'xd6xp3dtzva0jilgzsgiq90n4ez8z9vzkf5hwbtzsafauvhe13c79yxqafv9yxzzd39663afv7fvnqe21p9z56tmuw9oqkfvcg09h08smo2db4q8eh2cxa9ey147age3aqx6ce6c3kj4qrqhvc97pu1n2pkh90b181opzhw2ge0kowndxd7zpco6tbg4v8gshlmfazjahl643irkgmwkcwxmrm8sa6w8rajjb2fd53ziu0lpvsj8tiq80jv937xz3djiyrfa23pnpiqwq4p75yu1z2a34buxr3vhp9xb0nd1ktkfw1ip027bsj4e4b6eiycy9g13llrzv6d2uulsf9fmuxat28endoejh0j77ohkzfe43ks8s6n4x98vwbzrusquvlit2umbcecf5p3mv5xom1ohcg6jlab1ivjsj00aed37ptider631x3edyr32tvkxjvfucqu7rzl6wkvylllmglylkrj24q5nk1an7jos5b2rtzjm8l771uxy6wu7u2e0wa0zm3b83ign1giaedt1lg5yok2n88oc38st80ipva2ayofov71qr8ilvm3b7aer186anmu2f0acghfu2h8l6ytm08h7lvkz352bkleiaq6chfs7dnn4rf2dajhingy13uiem84vhizl5k6qjpek4f8wqbnst0y5l2mp0hrnwdisisl1zc054k7pz66wbb45g685c050nb1rbhpgcvbrlm6s4lg3giagg8t7xdrxfgzh1wnj6liyekurgjpc5o2g9z6n0f6363xx9ib6jnbux6vknwgeyqs4khvnnb6lvho5ncnlpbcz92qmzwgpz9pf9o8px4day6j4iwewctgij38clzsa5jpi5af0mpncqwbh6k1f4ki8k2ggut3i93rew7suqojbv9dx1b23ta7q80z3fqgji8hcj6bk08gaxiztx6yg0usu51y8bbn850j1jo5diuhjzr5r4wwv17y188z2b9omtq5gfdb6yz1luyt3rtw82ri2pngxkjq',
                mime: 'bd1kjhcjamjgqerrrgbdmpulxll3d8llv6st0si4j0kdvb9bq2h',
                extension: 'tko80v8w0s6lto0vjbuq7t5l1wgdeo9j4y1ygu5d729rlrcyuk',
                size: 3766408016,
                width: 122243,
                height: 771956,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'azjg2f0v3qrinibkzvmbwmp9q9sj0hzb4jysv37mxu3fgz7gxo4whs446ww6oekm2acu71u6evkirme6roco03d25uz7qc3atp11zpjrq21hvdovp0jnww6uzyu8xxwltweods7ulmqlr27ji48z46hba01wdmson91rz3pizfpt93mqdupu01zdqy5nrzvvbljr0m723l8mle8g4z4a1tazi4wqujm1ytbbitne3tfhbwxmg5eu0m9l2ktz9ic',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'ctrs92ozxjnig0srrfqip1lv3jkza78szk61z2xnnf4ptuq036k4678qzxrjy15f825idlisvk2',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 629834,
                alt: 'pagjmkveu84f10ltn1zvi1w8007kc80g27gmtreq394i78ek09accnlrxizcncz1i1cbq3xg9jahz9qwkb3u2ykpjdosvgdcbdnipusukd8zrybbk6d2dkqwoz35y117a43avx41n8c68v48a8f7zivf0u37j18uoypup0ul8yu30bbhp4u7qbzgvuvgxo7iquwkjjky30vh16f5vc5mfve61235b4rfluir2vcsoei65exnauyf67vcba4z6tm',
                title: '04vw4rhkqrq4keqlnkku8wr2p0tbdsjqa93902ebg9bj7rztwyinilqmw9fovkh5bdjg9bgodx3xx2e8fntn08uinwq6e90py7yo9znn4za8g5wu06l7ikfweqowdrilei0cfr9j693cmhj9gh01v5doubekr2seqxeuttaw2yl84932k972dukc7y3m9905okc9z3yk3x39bv7ej5owxl8stwuqcezxhlgm5r7ev4v2hby59lx107o7c34d1jd',
                description: 'Animi et consequatur sint placeat animi vel. Rerum quis eaque nemo beatae. Et quis explicabo. Impedit eos dolores qui et est mollitia at. Cum autem sequi voluptatibus ab placeat.',
                excerpt: 'Debitis cupiditate aspernatur laudantium rerum voluptas ut. Sed rerum necessitatibus possimus voluptatibus sit voluptatum. Voluptatem hic et dolor aliquam fuga accusantium et id libero. Assumenda quod consectetur incidunt provident sunt necessitatibus vero neque vitae.',
                name: 'i6xxpk319jnibq92zc1msiyywfraqdhciffefruht22gf2r4meg6h5pw97xe4vkj1lo9jswavjo48r2cwi3ohbl83z7gm90mpd8qgn1tptzjyv2r2mx80tcnndrx661za6t3ruwmoayeync7bm8s51mwte4qk6nw1fzj4supsy04b36exy0lrjxa9e2pm9crhr9n6id5oyt48gmonh4zi68qmj0azvy1o66tzosfddxvr482cmgq4he7q0ubic1',
                pathname: 'zq1jvx06mtjzi2ylkrbkks2ie5551x36cxp5mlblnp0kzt79cdibwf9j1oyrcclabxomn2equlj55zzcpk0bowwcgrgdjr62mfnxfzmhknh32m5gjlg2yi06hfov4ey4dye7y58927olfp8jbk9j87yo5dmfhucumxobd0xgwq8mfqz277il6ufzwpkc65il1pw48i5av9l74rawzno2viyx1deeu676qeptgbgbioljczrddg1vf0gsx6fxw4azt2lea1k2m4szhxenma3zz5x2cwum1fodotedl4zinzmks6114ywot3a4aqjk3vppgm4w0fvwteaca8u9d5yelgf8yy3dycuczb23aoqgbon0yaggy0vvk3zkjkl4l16n2g6u2hefxdupeig842dzje5xguccq8z1jlv1wq3e9x6lejsq4xjlbwzdkql05zuie8n2p69kgzoc9vjw3jkdpiltm02sdarye9rne3k37zw37815sr27xivbtao946cprcv21wq9f8v63h8uyg1pljswihjle5rd0a42xojgiv9xon4kh0bon0xw39apnmo4a41axxchwpwea3hkll3xv4ehx6i9l6i752t79j6g8hr1v35p13dch0ftjmosyz76hvwn49epjiuoytaj8m92c8lq6vhdspasxdbppjn4day3hern7omit1h5f738l5qgnk97ddjao7u4v572wy2xu7ahuyk1p8niqbkmtwfd7dducvb49e8zg9w2u9cfmq4p6esi26ehw5fqhjrmi8llvu5ny3azenlwfliha55ri2udvtreihx7rdyy3ojc5e4tob1nkg9t3wphmzmixqrl00nwi1ayfrj9835lrgnwxi4l91hliawv63te15nf7qwsu4ir1vbpshhijfm4fh5mn2j1sp4afj39lxwv6llqvu5oqkigavhk2yk6zfuflr8ka4ymhf3j2oz5km2l2r6zp6whjzvljy8d8udnqx35g1q0catvh4n9dqht1ox4gx56',
                filename: 'mosqdpsak9b9aefhs9h9sp84oqnielip333n6vfdhtq4o7ix9jv4gwwy6g62nhgopft68ajs07jka3qrh0lbq7yuzm2920kap4xyb21wsaq6g9o6yjfw08aci78eeldsmrpu0ibnaiexyuetemwzyjg7kxwdet83i9iqq9pomqa53yyhuyt0hkntfsigejgyt9fw2d7it5sle4sp8zmp7hm1sbgn7xs2ehjpg62bh85j6g1xpesccg22l8f4dch',
                url: 'n9so8w7eyku36u9ps9o6vcaz0v2n9tr6poy8wl24n9002s2afmb7k7tbqa2dm65etvulasmt7ig4djw2butohi239iax4354x4fga16gxmb3cfthpel6ta6p86nigaw31kla0dykqri7w15a9p07vipsiil5glmz4j31lqt9xjnfd3inis0u43taiv9ehh7hykir5njp6lv0vc5mycauzs8flv8k5keybt0i1gnfwi4s3pbgou3faagd5bu1vz0kp1hpf18hex5tvueudl2fon9empus56n96d8pj59n4wh88fxo5dkkhmgnyvvz4z83mhhwgyqkqc9cfpvmv9pebs2w8qk4k5rn6g13e8ryllhfitywslhp1s26p0qur4wissvvvxe6rdi9a9513owqm40rt473vyw4kgiid4nyvtal2j8yfeipq8cqbh2iqy015lqarx37gkvzmv9hz3a5fnd0jbqdknbslq4ia86nbfqs9i1x29jizr7sdoomi9u0a7cyzs5zs5ndtyrm5mhqgrqisc0xgx6i2eluueuttnz3kg0lzdghqkjwvf1dto6lmbi5xgq2kok0lzs3h6l97ibzw3m95n74vhzp79pr1ri36n1ppi4q4ggstht6cg212m6cvub3dj9q7hhleamho5ks2ku4kkkqd3d2ktwf87qeuky6m08q7o0d1c2wyjvp2smui25kv7j5r6esl694nxxiyqmr4m74sa9i3n9owvbyw8nayzr90q5bs8a4ctncbk0t6zukvqp0dc0i35c13c75esq3lwyo9vwayq54chc8e4qepazikj7k0krnjcjh8itp7jz31l6nshacwu048o3dgcfu8d3hogdhy3cqckjsoua1ir2thlwl3q43e7ltnyyy99q57pp4agobwfrdexcvjcbjgkmywe6eji18zc9m7wk44trhdwvwm12d9f5ofunhmnm1jvj6kw5mlnw1zvnocurume9ap4if8z2cyyuj2c420y0lta1fp18u36rd',
                mime: 'on2trge60evkkad3xmyxbthiwetyi68f50rsv527p0tuw2ugeo',
                extension: 'uqfotqzqvuqgp8a4141ep0kggbezxhnwk1v6jbmnhy1lvmxxxk0',
                size: 8407988766,
                width: 695630,
                height: 146261,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'a5i1t3z3zp84rci4m5l8exric8nk5perecxsmh6nbtmjc0dcuad03s9oshtwoags58dotrnrk0jh0sb5gzm6wnie9ua8kh25an3u38vn296agsdzqjs26cgcbeknootmou1i5qknmm8of1ugkpit0gr34zp7vyefwndns6pzfds3aig0oxdsj90a7o9hktop8q00q5h8wc8mrglfhpb4jtzgk4kj6ia3dxq9q68pgiv85qib8u2qwp6xpacxg4b',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'pxcn6vvrhm25hikkqwy9hkfx4dtp9272p45iajd2n415vyzkl3qq8lraj3erjtgaaanc208chni',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 346289,
                alt: 'servj5gfgzumt0j8a50lrixkqrl8tn2s5e823h48rswiig1qseukorzkndscx8min5vz9po4nprfjs5h5fzkc0fq1d2w65x982dj4ndj0tqkwzi2jkeyubwe8w9292z1haoa1d6g343bfn3u90496k6uth7au0jmp7rzsaj3hfp4bba8rtoarmla4fnuwmx6scjxvq9lnui2z0swpcet36wxcz8wqyqh5mtppwhw92pfx1rk6jfrrk3535uan8t',
                title: '0vhbx7wt20r6e7105q1kbkfhf76nl8wxv0gzwdvc891yg8rpqc8h9kv798a2ioos7t0rh6mkep78jsn62j4o0ulihalrtpqi9n9eupepfnlk8midpu8ocbifojzwea4jne1vckpnwrej3hv21urxhobketpcyy7lucggg96eizzpkqowmei35xzqvds2s8a4hc28nwibxfgn93lw25dy7ckqd9n73hed7lvrk270wh4l80mzafs4w4wqupqjpac',
                description: 'Odio sit voluptatem sed accusamus. Non qui necessitatibus ducimus nam quo repellat odit. Eius nihil ipsa illum animi et veniam quaerat quo voluptatum.',
                excerpt: 'Vitae qui quos. Dolores aut et delectus aut. Harum porro omnis veniam debitis. Reiciendis laborum nihil eligendi quo quis optio aspernatur. Neque molestiae hic quasi.',
                name: 'ds1m5lznkcq4rwxckbyseu7a7esmkfpvy2aml5d2waruswec2v9appgtbmvk42iva4paotkq8yt73i34rkn1vktwa24z97c9bf8r1qf7c0k5kh5l988ho6xrqlxjj03zgrr7dghqz01yc388uj901dh3tpta7b3fyk1fok6lbgg8hwdk8w48gxtamh7yu69fpey7cdd027rtke9drk7108fsq30ix1776f6i2rqg7yrms08ob3h2vw9hwijt33f',
                pathname: '7sdqcjacivipo104gp3rshtat362ztctp39oidh0szfkhj5s78a34y6vwmfm9gqx873m9yb7m6g8l5i3jzf2aukw1r5wiaahdag5deqnlkv1dvl3jiiza3gudu24tzhkfqcs6fz5oaauib3rkxka385gt42yzc30edxl13ahi842lnrtgns39fvnh00x3s2r9xhmv9rg41ccf90ow9ildsdo3dijkg68f6y7c6pxoqaqg6wrwmjugplsfl94bm3jrhmz4pfqj3u1gvfu8f9ocnfnkxudufwe10qft0sx6h6vv9jyg5y6ab5tqdkmpn9v2alkkzvxir25nsjzf7u0fh1fanmy8f9ll6m3pdwef710mrgj7g51h451f0dkimzyvtzf2379gxt8mxrtv6nzdimgu0profmzou02a7hk5tns1niuixnlzyqzrhzgdhdgd7qqf5pdb5leml9stc7lv6sva22ctck5zfmsgm3uez3qadm4soe2w7fak9zogln2so0v7ogenmx1llx4kg6fym1peibwnzkkidbe4me8fvctyxpryox8h6pbvif155bb36jxh9tr8b25r5ecodn3heqeph0hee3fqfczlef63vktjn7sjymwlb8yppvh2hto0t6nzzzq1du3k6he6wrehj5wm2h38wtekcezhpz95flo7di299yxyuewjw4fipymwkotoszfb7x9lxg3kfbps4rbglrg3jl9k62e7t9cmr4jj4yecslujqifyxmevcedyfxt2p4hnr2taoz94afb8838vjrwt5j6ut27ayb3ibtomdswsb705t17hftkrdzjm63n7roek85rgo3kqeqgbktgib2kpgny861h20d55k59tck044tbpeble7rj52jmhdiqrvw4jlgev1efuaejao2r4paow6sk7zg1u9wuveac0zil45dxaknesmpd35iirbs8te1dif08hqz3s82xpj5091xf6vxm73no8hljem8tlpa14pdvk95fvmp9w65i',
                filename: 'ij03oxb321rzxyjayfmgnch6szy4yujpuorvgslfkoobzq5ptv4heaacwk2tj2kxxqejda2x3kkvxu1g25om5zo6aj3w9rm5y09atri5o7143nc3qn97mksy0ogoe4rqetqp6ij9d7ocmo2ikn3s8qhmbap4pv1zinvdfimsp8tv04re17e9e5i9kii7om031snxr01hwq8ep3f4rq6assnh7yhfa94en5qsbavme5ons8o25tkmddkrcjzlztk',
                url: 'jblcr3x3rskabhe51h7xqub17rbs7i7fax542lveh2i82xnr9jiwekv38bia6gj7vn5rw9ne4dt033nnji1tama8244f5vxxlehuxos1nc7nv82ej60mjv7vap2kdughynuvh9qf3c7vkadwlh5snjih5z88408s4wgkcf2tm53hlqs6wqfxqg3nb1f46u9pvumy9s8vj53j5ji51hm1h0jmxqi9aps5ym140vr9dzivk4aws7e4enw8ok777jndiyvl62ldwusmcf623ithqzwqpu264o0c2zdgd90zj2b3jqseupjln436j3ippiy2us7am5b6sluey8rwem2a4t5mnp32vks4ezb5hxk2qf6evizx18vsribnih1pz4hifqlrjwv326py4phsin6k55kqcgs690iydkvavmc3izw1q6ptqke3b3p8fav8nkfiga77o35qdj5rjbvposcpqz20ph9ch1avxws4x90t11ahhmp9f7drr0xekxksw49uor1gunvc5hvhuoxph59hf2mx5zaxeslrinycy8y89j10zdfwwqb31f3sna7ebw7r1y2j1v5cl464bxusuq00f1du0lrhrvdkdphr1rqjwumh267dda7x2pb8tf42t23n8ui3dy8xl46b2or54l508x3s0qavpgnzp23g4hv7d8pzxd0exmq2fiq2gw6dlwg0x5unydxbvndkzag2erdfeltn0lpsokxh19gnkjssqbl3pzs80n6do1t4hlonsx3mm01evxqdoctfr350w8mqwooffi05eixl6q644ywjxcn3xyco6v8uyayoc7nqt2uag84nwx0rxusm0nq99dqnvz18ay3hq3ssr2xc7g6yp07f2rt59cfs1ggbgfgamdrodp14e2jjf01l5i09qp6kfp4qak3vfsbpp7b6u78iyjrbzvenv8my1p9qen60u88lb8uk23bsckfob5x1xnlzkgljm010jzc3m6mr370rk0is5joyd0aaz3v455t4zw4t',
                mime: '241xnn7uuofg71sqat1nlcvntugcv8l2obrjob741sjxczjzcb',
                extension: '51odqy0xpth8bkqgwf0pwaa93p04730o4lmwp6elzk08m5ofn4',
                size: 19941622104,
                width: 445744,
                height: 764415,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'plpbq64x1srnl7azyxsuq3buem9sggvqicyuvun97xk08tjgttfpq5crkcergribb5xemctm0ci39wkg0qo1qnvv4zfmh8eak0vg7pf1gi6jbc6f5ys3m1etsgldm3xya7ycb6r3bdof4khxhlqj6n12ac8d7ljvgq0t5dev8v03o0wz0k3dp6d4supkqgjkpv1k3vpi6zzo1m5tt4pw0kfmm0xwi2l2nkqbcxl49h5r9mscs0cp4jsz25by2o0',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'pk51f0pvu50slkgh0zwxyjupvvzg59gdm6mx5hn9tt7jdu1bbfkf65727hyff70gy3taxfdgi7u',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 494246,
                alt: 'eh8rn9q8p7rnlilwvsb8e2pvosewuuyndlieldb4baug9wsn231n0fu3z8337jpzs126mbc48fwwawuaq9sxkoj9ys6fulb3pqzcxjf53kl8qg5jsgbt1wotmu0niujmkkj61h1h60qgppb2yon1m3i9co7qx2cul5f115efigya1keoh44em4et8wgko79vm4vb5tp0i9i78yh6r75cy9qdjdhho2b1xchdgk0wz8jk48r6etap4fnhz8pu7pn',
                title: '9r1o1xwms31msxyt3316pstxzdger0tom6bq4jlcscq2zurffe4eci7b1k1dodjp8h7r5blogdyqvl3lo8x2wou20luxy7r5mbu1l70wunqckuddp6m3arnfx5wraujdn65dumwdzt05c0wkro3ddbz46cusbmqapp7lrtaa9rub4tqpto0jz0f314zd2it0ziow2b9aq83ssc3d6nmk5p8ku2c8tqhhekgo1dgcbvft6dbqsfg1m2touqmmr34',
                description: 'Dolores reprehenderit numquam. Ducimus nisi officiis. Odit doloribus sit corrupti.',
                excerpt: 'Vel aperiam nostrum ut consequatur qui. Iusto voluptatem facere totam. Fugit quis consequuntur eos qui est dolores voluptatem. Architecto maiores unde amet rem necessitatibus.',
                name: 'jslcmyaxsv1wn08fcm2gq26cf6ksfy7usg3eun3194hxfzhhxe1xp25gznjz4bmq5ekl9mb91acqremq949rveiwhenc8418p1cf87ig8cf0c7m7u6cwvh1vbjyvjioc2t8oir5bv5p2n895bdim3fyckdpmohuwasno5jvlbjvo6at2ljm9l79b6111pjh8rqhdp7cq3kah8zz9gtlhgmvvidx0ydpcaayi8cd5203pb029yh54aaopo766ute',
                pathname: 'd5x1rgpdmed82dvqp89avptbv1ftoua62ljmtiekgt6xm46gmxm892qfbjvzd30oii87rvwsqdcde7xsw5kihdxcxvym86i719dwp69a1peaedr0qk6wfgcq7s0zdym4pbcvg1bnlcyt5vhj0kbj9syr7dlxl23knvzx9yvcxje3antf04bgff7rn2g3f5vigkrjdxlaq8zfipulpnq6o33thn7o3o6ctcr14wkgux5wd1gosqrkiommokuq4bv2ug3zeauy56k2mqx4ytr8fplgds1co2blhoszufaj5r9fct53bng9jkt8tcqlzofugp9rlh5cc3dbqc8wnacfe1hadd4kdnxzuz2bjrnxni3yafg8cy93ovnrbjbkoehzmzryjjzh30mvwxp18adbkprgexd2vwd8s70watl8biutadltntwzn7ysdfuewdzazij305uwza8pbwuokwjjcz0uny8eqz09o6btv0gas3234rt2z7ip5ee2mmv97iwtlhhbimaghnko80oekza37zv0yfj2dms9uqge5oofmpnja5iz7fhlkymy0tq2loygi7g989l7tiym9x6qpcq5nmbhk3r58r0azci1vbhglihicwgjscqowkpu55mpm94fbkynr38594c3xyk3yj9uzpbnm0udsz6qto11grbf8hov7mg8lfl82xy409kzep2quqrt2mizly970s12bbvomzt75mp95hhxpoe9oyh0j65yqmm7otphz995athiw58bhrn7mzsc8tdwtftt40symgkhj2pdnm94ki1ujnl2arada8uxacbvor36g4av3w93quxvp6ebz5qfpouf5rwk9n5mkz31j78ht2lo9ieykd2zj1zxylw6n7s0oxs3jxi1vh84txronr9jwwzr1cuuwcw82crg999yl63v2eb89kap3jpr5zdo1qi1x1voro1rl3j0coej8qnnb09ghz25kulolw81f6dlhorz642uhharh1h868yihbu24biuw5xf',
                filename: 'fkyjvmrn2v7gft5hsw8syiscknvo2vwsvi8kt3q3ay6sb6amwf4pr3d4hs0d9nb47kcuoy9zhwrfbzubqy25hf4psl0y09vfkxx1swv6tyut163pe06wavtxyx1o008k49nfz1ow4u60jtp0592zusjp2ggwir535yreku3qemancpqg67enje4tvrl4po56x0q28199tfj8pddobk68fu9qezvu625z0qy5l429p5ouhrxqdcv2jyit2xf43dx',
                url: 'p423ihvbhk77szg2cdoyfe76o03mbuk8p8zge5uwyivgt4dho6txowp80xjwxbzpu5gcfnar5e387e59cyix6jd1j0kdjgbh4ox7h7zcox5p1sfge28t54ms4h2b3rcns3h6y0sef74nm65q9ocxsfp70h5gx340c7rrfpngw8xrrnhboo5jan4tdpv0j5rkdmk76warhefs98r0erw8sm1dhdwvhxw2nuf3x804tbvjy89rxo9cw442088vp9qxzxiw3xyvzxio0yt2rfuf71438o178kjond7f224k7md7xkdlk3zxbhame3avfa1atj451nbxuxx3d6zti9oqvhyoydwwn1ozxuzwoqpx9ngd48lxiyzpe90q0swkv2vnd1vrbv1fbe1qg8rzdjjlvxof296ldhwc29v9x8xl2tl6tbs2lo8za0r0vlzsvovueufmncgbk3sbf4pscw1648q8h5al7pkpyq3ojxcnvv6dqdo4q1h692edqm2ib1pl6lb1uac1zo81xlpzntt5pyihmps257z1l3mlufmt3lxu39z8y1s4jdfmzwzby3xlhffjkcykrb3jnridsz5485aiakmuxlflwxbatiyeaqang0d4ay3vemj16nwb2720zk4cpv8s377umsz3xv05t2irn58vqi9ck4a9wprbjbmgvdx2l7ivxowqq2cj5fxznlc7p4jaf0lj6q0m04003lgbhsc0512ihut7fl8k3ozwapfo3xewpo5qwu4pblfa8biecibt25rrjpwmr7w3tpwog6hj951gg81xsesipztar3b0ws01u4emsgxnoe8vnkb2a0no3bu5xpo3ht5qfrd7t39gsvitfh7so5j3qr2jkweln17z4f2jmbrfsrqgtyvwbdoqw7ezxt93kglm3pqjctenl4amx371jatyvkfeuci45ec2171g513nttusm12owy7chu53cyxplcsmdda49362bde434gy2xrdf5stoxrm3eprflyc6injvaht',
                mime: 'ihd67bqous9orkxby7wxqjqbditsykks4g6wu96k8z8tisabga',
                extension: '0lmtujd9bdzxh3c3ovmmztepdyqh34p353bk1c1qf3tutu7nl0',
                size: 3804895950,
                width: 2081833,
                height: 959649,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'oyo31j4qc6s784juh34himvodln9zx4k959u69clkrg30b790jibhz0cq7sjdy0u8vdyknqq939npky0v6qkmpobtra4fvjbvn2ciz7ym375a6q7uppvucddswrvx1m6dqamlvhaz6zr84cuiwh2rwh4iqyfjtw7kj8aupwh40td6zuloii2alsojbk1hg5ai3cqccqrrodeklvu1ejc680bi1bhxo3v2nhr328kju1jn8tmanxkh8mytfklptg',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'lz9x3kno5jskjy4hiiitl5lof5p87t4dw3x45iolyp1noqs2c8hgvrg53syv0h4u2qrfzgj33px',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 327999,
                alt: 'kkn6y8xuoyxah2nas829jblv1jwdvdax9g2lduftkenwm3azkeyg1iump8r9jwg3x8i5y30s03ld7r6j7mnfal1oxz0f1kp13p3j7zlyj7iarptxawxhi0kcmjezczt2gkwy01hh3pelbxd50r6bps52d2xr2tw3ku6spovsqesijl1bm68gw22h6mz3zr51ct1rafw9hoqeqrguc4mis2qzyndq1xhs0ob3rwr1iitibkayohiyg0vfs18lzh9',
                title: 'cntgin8cyxpe8lqcv4gv05kf3hr3t92f3jimb9z0ilxz1gnjppxhrbkzqxh3b4rmfgzkkqkbqrkf68s07ug918fy9m7x6pku7nmwahwym1w5yk1lj40aptdn6ixw2kxc5s19vdqm6nvj1tflt3kkchf6d06t5im0kyfwdeywxre4y1s94oynvvtqtrngy5uqckhzdnlr1u5jtkg9zfpiwgmvrg37uooj0k40e96i8xvwfel0vzhmjnyx3db32p7',
                description: 'Illo eos pariatur expedita doloribus eius reiciendis ratione. Deserunt provident ad qui voluptates non reprehenderit ut est. Sint voluptas at exercitationem quae aut. Reiciendis a non ut quis fugit.',
                excerpt: 'Et deleniti eaque voluptatem amet aspernatur mollitia architecto dignissimos nemo. Alias voluptatem voluptatibus qui qui aut laborum. Similique nulla ut asperiores.',
                name: 'xpis0f32f8uoeczifvj9an9zoj4qmmecq9xhglf6hzarfo7acad0a4u6aabyoqbgw59htykwct6kz7wb78tu0flzp2vqbe1cf00c6unmnb5kkxvev8bx85ienzb62yd3wvq8muj8y0iiz5cvh5pjdmvae9oh19mbtdtbrqff6a0wswkmbkdsmjstoqh4k53nrnhf7hezo07m61ba0rxi41f2xfng9t3o5jsnl691n6mr3b58iyfs7tt5qoi0qrl',
                pathname: '8zt4ayypf1d3l5h9l3w2ed0et7yth46gzbj1grxnfn0uzgiadop3o7d4t6prdifiycli2zevsaimnx9fdrp3kg58uh0wyu9f6b6rce57gnqmog2pufakd87byf42oxngqehj594dawhgk2axkju9llpivuw2f97vhv8reygubv6vzhtftneemx7s5afqjq7bol8di5bwfihlzsryw0x3uea4n8q5j0map52n85861ostfcw310tjz3tb3h59fil2q9ibxsd3gdkqo3pj5hg1ce5i1xlq2hgb6okuw4fb0bs7ium8n0wpet69f6eiw1873riqyhb02fulrde30uusci1bvaczrani7aaape7mxwn8l3x7zfck9jc76iyhi7rvtlbb5xkzouhq7toz5lewt5d2flczfk864iqdngx4ngbtpv0vqd73fmwvj2814qgh6btu3ur5lxgsjg9soe5rmqfdg1t2wzxv4w5yb6ijprgibza71yjrmf6tj4g19sdb3sfxntzegbvqrwwfch2wthgyviizx0fgccjdr2o9pxrn6e9xzjamopo8zzv42kke2j2jrodqs2wv631k1eucz568m1g7y5zrqm9merpy1bg5lphys10974s1wlemxltyz9weh4y0sypn0gn2sd4pz80qhyp9416mz4n3psg8aodf2ltvix263ub07yq36j5lnnupaf1quczm6qwqo6l73bgger1boalt4snu5cop641jzu0s7d527mlizdfmxg04zsnmpcp9ozl2mvyyg2cc5ybqeq8bq3xhn0itecpp7hcwzgveqzl6fcps3fre2u81qu5um3gdnh639o172uxd8tz0w8aify3w46rcbs1kaaq6ik1lqtol21s5ga9eouw5d4uaglp490z54gfehpslq7e7t1f8voahhy6asm2cy78n9zggns4rrrwar1npc0i3o5uyw08gxoyd76xyoax1utrv7oh1re60n2lfyedgxkk5qe5qf3v7zfloelov9czv',
                filename: '7x8boxalc2rpgojofazielp7on4v4qz9or03bb8gt0l0lj75fim3defvsswb69q3a7isnvlfad3l2itgkjbu251na72i0rojfiobws879r930x4czzigfpm9ubdrjuq4k968c13w8fwj1fnnt2yxtwii14xzb2drd2xpycmbbgzbggb0yl3wud4l9z02fmzw47fzzxbvm9wm1waaluh3wfrvdhpvhvp2xcyfd10tavs6hhe1e8ds1jgrj9ql88x',
                url: 'abuoteo8tinhth1kcqwp8f54rdboe0q5ycwejljuuzudie34zsc9li7em7cmfhq26xbn7r9tqscrq4nw0ajcq7957ofyb046kd8flzfsrk9xtnmwc3pzlfjm2cvtlcw5ivzeks9g8kdcj379nzi4jf97yt9dq8afz93dpehf2vnmev3sxzf1snf1g1orthpja0yikq8a7xoudhekrxqdk4533comptjvrroxccf3sb7coz63y0b4oh4no8uk7ki4ave4mu1f0sz5joqkno0crxo8vkcm565e81yoztllfadpndvpepilimw7oljbl2ubb30dg2bsevg2hq2qem4imhi1jx7vu0822tmnbqox4bu3maup52h75vcq1yki10i5b3bryzgabbj3gda6lv9tjypnd5tqjw5gn9cufvgov3ozf9wxa2knlebj156ax9enm0os9o5bex05m762ntu3sg9iqtzgjrpn6hh5fk7fldwqbhv08n9lxp3qcqg7s8x2yleuv08bj14iijgx4fdisazr7ayxqajw1bxuyfy1aqh8ftyzwt4yzt9c0ewv7jnlyeehb01rwynrxj6brjftzy83hhdfphnvez7y6m44qt4hn57px6uc7cueib6qlu1skiv14rnx7yszt1c7p7rmg5cr7gxdykebhh6r1l4fab05x3gnv50xe0fl4swno8o6jzs45b2ybrm49x11l0ztqpsjv86lqgwal4t1s64cw0veutmqmpuosus2l11p8cr579y94pqwxgf9stpfzn6ga7rsktb6vqcvkkdkq12td8d6rjg9z1k1msxkqjhqucn9x82lexg9y9ky0098vav4jzz5w6eg2r5qnyp03l6fai2ofqjdc1wldndu2anh3627vscfxz0da9zdm0bnwjn6g2my04zu0uzmgp3oepdfxfabcb8nwuoijkd2flv6e2vlrtfc4q5ue63t6qym462thshtn5i14ued3s3dxk8ifknnlafe7nukglo9jq4xykl9',
                mime: 'sdzg302tt8b3i27vfy8lvsm0gjdjg87og3qmka11uup5r0ri1h',
                extension: 'hesh9kicxsww9odnngyod1ygmzg659xj3ww4js8ebwvtixpb4h',
                size: 3601825349,
                width: 917763,
                height: 8798307,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'c5x6vxwr774g0z9aj7jorwp8do2ufe8bxm10eoek0m3mf05wdksfwhx2uyd5rcz3nhn24dspwpoef4x3e001jibhmi6lv422dfimfmgz6jzgyrsa7z46nt8pvbrcs5ua0yy8c573pm5p0p49yd3sgv2q0a606p6pf2qxvrw13fgxlbdnvwdstq4v654fub457ph01xsfrpo1zrwhcs0hu5lp044uoxu86cvtt081vzqjh8nuvwl2rzo9c9dqpy1',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'vsc8zwjbmwvkef9ufjgav4a5rc8sr3z94ru3irz7gonccm17kni4ndzmn2517u5hy1graba67lj',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 612403,
                alt: 'visi69szvxhuum6gc7f1dkpamnrkneqnlas6yhqqqgz2878aoqdwztez4iiqlcrd2f2fg7j3gdflgegu7sag0e39l5an1m3zgdphaw1axuqknjr702dyimaa01v98c8p9lr102hezx4ge114g81e5hg3j7i4vfxzpggpcx5dna24pcrumpqbdz700tetnmlsd1qi25w1nqh9t8lhr60htq2lmibgl4z8goy08pstrfdnn0vnz366zs48hmxbsid',
                title: 'zqv98hcpiflzspcssn4lxvbd7ywvtl32wm4chdmotk5vd03hifc8kiziy6r864z71z150wq6bc6xmxao3g98mmqwv2f2vv2a14zqazbjcfyoz80ma4mc9w78rduaqcljo8hlgznuun6349zsvogso4oq7xw0ycaxaae81ewqwmq387mmwtywcol1mxodm02wdstzvxzortl3m81b7t9ka9epgt6vsvpkgo11drrsfrb27ei3nnjpc4sw6zvj5j4',
                description: 'Debitis magni pariatur id. Est incidunt perspiciatis consequatur illo accusamus necessitatibus et voluptatem tempora. Quia aut eligendi sit. Laborum vero odit cum illum dolor. Aliquid sunt molestias et praesentium voluptas explicabo. Et alias incidunt eligendi pariatur.',
                excerpt: 'Vitae iure consequatur cum quis voluptatem. Ea sit velit maxime quos. In vitae nostrum amet minima. Sunt et aut facilis asperiores eius delectus adipisci.',
                name: 'rm3wamc5vq7h6r94y9b0gh77ywodksn74ql6101v3ge6z2nho7h90fcegujrx2mkedh5e1j6jsaewkwjwofc58lprtg1dj1loqvcgy8s1hfet2lj3yk703chlgxd2tojt9h2ny7syqrhm9vvr09m1b9spogqr5atm4s2ma2dysymhoxeic5v4sq9o38b1zcdzfcz1bpe6dkr61qu1kdoqii8vppyfyayqtda76g4evvzekt0bw4mv0z8w97sx01',
                pathname: '7rbxavl01635uvydx4xlamvp60jxuvgw4tjgr7mpvfa2va915krbf1o7scplqblospwdi7hd04smxc1aan7qopjszu3hbwnf5iq4al0juoiafwceort7g71pc00tvp1m8k6ccvilpuyxd5xg7s664g1fgj456uvsohsve2bpsryplmmqx4a4mbq07xsb5nrq87y930x0bxvmqwyjoyeilcxqt97wcg612dnsvhgeim7qu8x6f5kvvxi5q2gho8ls9kb912zlamucxi77kl56snsrm2u5ihvyfdd7zfx15gifodygrx1opwu96kgxtsy1menqzndxl0pi9i4mo3obw1dwr493e76fxtfsk9pbmk96y8cxn1qz2wzubekcoc8gnhwdwabkl87c174v9yhm79ufu3qpefgntfvg0rz240mrxqb7yn20nyvh7lxxcp373umtfq2pqian4auni5h0m5ks6ztour8p8no2q9yrb7t7gkeenl7a9z2w83v60dcu7hlxm1tuftas6fn1206bjmp063vhvequ0leqnm7t1z5uu43wiz2k1czf02f3zvanltvfaw1oe917zq1tysyjunceatews8wxfeaiz54118hngd69zl5hnt5tf59krfzh4rcustdyitt9mjka99h3lahnx8sesg194s44xfqxkg0v12ubcexzsymwk3wsjx523314eleb6i903gktvzmczvw5bjmgpzdtv0t6q83i4lh3al5hujwy3p68gb4whnt1v3np6yxqmpqsl4av7vcsm0u6kkl7edg2vompksuthkq8yz6er7f6u511sfqbzxivu2i7d859l5aily6yxiw8azsg4nh1ks2i707ewrtz1dzh60ajq8xor4hiyxz2f0ra0rll0e4wqjdp5yqzfu04cuuvpr4yj1aep8t4kigafobk4muz1527l6c2l0utj8dam2496e35mgll532tsvzrfc6er6noil2af0vgjqd2ykinpmvdirlqgmu6kuxun6ud',
                filename: '2ygcy70stoqxm3oqljd7glxocaxo15o9jd1pgyxwmqgzw159cinfw5yqkxfxiolv5cc7s8bm1vuywcmvaukm5uijlcvvyhbqqt1vzpwogtg7t2m73o9fw9p6emoq2z4pzoigm413aiy7ay5twpjc9w0k5euoxrd16xingjg5u3fps0p3z1armoiszlpa0pd7u235loul6sbg58v3z025til1ueadu0dpvkpdr50p3wv1nj3x1ol3lm4kdcfk642',
                url: 'mzjpb595mclgzm6w92fsqqvbqvso7zijyc6rtk996oa9rot3tl7qneou6zqdr215tico4ixcq52rirhgrgucidu8ot4y9apaqxvxxn5umxi8yp72o3c0ff6i7bvzv6yup9glrlmnpnfeogwcq1ybuva1g42niwgu33og2131reynv21rm1000bf84g75ip1hivv9w7f76k68o927qea6tr2xxbri52mtnwgk9goe1m6n127paabffouen0iezzx4pcdl7eu6a8t3asq5hgex5uh4pklj4zld9lt0kwq285vzyx7vnx28yefta2jjxgphqnzmvfoynjr1qq058krzboapuqzapw4nr8d9admvhoad36xzn4nu2hg1vj5gk0vi0tgzohav2cp908a1j6l8ko76n8yb2cf98qkunv2h3jw05e20xchlzkq61i48b5s5cddwmlb48h2i42hg8n6v4r91nkci8aqy4se7z8c6aq9yftfgpnzp21kykvzzn6xi1ep4ul2b6607pl9m9znkex67ftockjo1wqgab9fha41g94c6zhmw70phzsa2at8xo9fhv29fpflhey480z3vejkz13p8idpuufweep22fibxr91ldlyx0rvem399bs1fkhu5ypb9bb6px6xpg2q99fd41hifx6eux2hmzkhxs6ukvf740t2je7y7ymozwnh0g98t0xm09zlrzd0il8vnksi9fol2ziwbxshl9ad4p747p217f18au991yz1n04mhpo8ydntczlkcft49xmia8zx3i2rb2nkhxs0riar24t9ndza3qat36r1zj1fazg2qsw1plaawvsg103yxzguse008j3pcd4grjtj0136exwvc56e8vz890f0vg73cc97gh5amycl63wwscy6wjt6j2rf8sl5yxt32lf8l15pg12zbc5ksnihwdcp8o9stmxcqnw9iinw0k5988dim6csbb50zmf17ebtf35pgpbslgkgsaofeuelsw7avz4vy4vtu',
                mime: 'kvw95gpjaiuatvozqiut2pc776bm1nfbuqyxnqlgtwc2lh8sst',
                extension: '6qquala21q4ijg1a7ts61twczry0316dw0e6z8ju31h3oul433',
                size: 9734806459,
                width: 102097,
                height: 839261,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'qx1y8quxltivsku2mqubt6r4nyp9dl828yqwr2pmft39sxnymlrppjkhfbknphnvruevvyjkkv0l7ez6a0vt1f6kaxw3nhtzr9xzapvwoesjedbud6t3fesmlxdr0iy9uq4t935fzbyju7njk8yi208v7kq3bo5n9jkyrllprfq4eeqc25rawefbw5rb1pgphxhiylmqbkrt3reu8qdp4erth7xpx97bw18rt5m5ohb53pbi7wv8ob58dqonvls2',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'jq0demtyk5cnog6ilxtwuxg1kixai2bo86twncdsruc7n4s9ybjrnlmc341jzhbepjyn8jwgrwo',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 274536,
                alt: 'rh2cv8ache6kv19jg8om86qee23uhaj7puw0qaa0qff3indlibhho6jp53zpxbn3a0l06pel95snkxwa854y5xx9qwf32h3x34nmap0w96d1upa2h6kohi175zrobi5psqsdmbzi0q89xfpx6xj2dwkshl43z1wko7cb8tf7vwuwkc2q9t9k0hmme9hwye6i3qmv43r0ym3daa27p17bsjoiyhbpb12yb4ncfiftu9s561t2461zv18ogyyayha',
                title: 'spsn25oceyt18eo7la3n0413aqw4uhobbc79b1cpstvpj1dpwiuglhca0qmpz4t6v5a4ssj53fjafr11ldjynwxh96q3ip22fpx1vfczv6te1sg11s58zegx5jp5t7ge91cx44edb9ld3v4v1izzgrg5drlm9r0cab0wvl5ojygbdzwzrppd27998cljdqv83ad6vmycv4e6q2wjt2mcj3xnhn5wmqmsffzw4hiwkj6atyhquodzx8dw8v9ox74',
                description: 'Et et tenetur veniam quae vero voluptate eum consequatur. Sed asperiores quo velit. Eaque vitae ex eveniet ea ipsam suscipit qui. Autem qui non ex ut placeat qui error libero.',
                excerpt: 'Exercitationem tenetur quia nisi. Ut voluptas enim quod voluptas in. Expedita non vel nemo est et ipsa molestias. Reiciendis ea suscipit voluptas voluptas. Ipsum nulla impedit inventore. Laboriosam repellendus quidem libero quia ipsam provident a qui.',
                name: '5z96ts77lvvtah84wetcwj1ft77zi9v9e557rjfpq40yzimaf77fkd0kdkq8gpa8h96loup96esaldp668kkkdfodcnedtgv005f09woe2vk2cb9aylvuc7smbffcforxj9ygwn0v99z615zwvgr8obf2c5y110su37ze33gjwoi4xemyqyx1h5tx1rzwdvygyf72wepdd8m1omhv42igjfvnjb0ov0q9setq32abiyhvnns9dajas2nx5gjt9v',
                pathname: 'iu4echm9815fn8f8kuxnwfcmmgo91g8rb3b5jg1sitxlkf87i77cynadojm1ppm265vj3bxupn955pje7rp2ru00bc1j91toavgx9vppm6x4oztxe6g41g3d9sfwr0mkq7ujkzmpx40mus6mjmgmasfv2rc8vtgeupcga3qwlcqq3a2jtj42hjkpa7avs1azgsbne9coabla1md32kfzh1b8gjqf2u37i7om1m8x79nma1vls1h2do2q3f0atuadp7imcf1scfcim0ook8r1rjpqshhy107wcaoyw59qgsefiobdr2hd3553fxzw4qwq4w160mzincl59qwaaqsuutgmn38r7kdiqry7e7x8sspuoliep01mp90ctiy1b2sh349bscp7958fk4sn5dypb3pa6wums1xwrtv0mwzjwea9okar6ftx25x1yevuhp6vjdf4h925i2axqfbkdoi0uw6f951kgpu3nq5fetslrw1vzhibnp8aube6001ekk186oqt6xfasse7aw9ycw1l43iziiuhouby5r1g0a8jmr8zslu87cjlvo64yyvvjxlqmqd3y0sktui2k3vbniwipp54s7xftwkkk478do0xjx6sddui4tal51je97ultc0dpej6wjr1isedur5fym05axvhqe4tvywlrqup11toq70gnhpks3xs5ekfxcu7ibjsdidg3g537krbk5ul4fgxyvgrqzxa1eywsotxah2i0645caxx5le9ofwih5d8lfwwxefan0jg10meidj75a6cld4ef3u71ptzssjd3c0pvh8nzi5l7t14bd0r7q5sk9xvrwb44kwlk3elf2apf40tkbi3zztm0w5ib233crfzwsq9gau48ccl9tofs70gp9qpo9xx04l2yb6v2xut64xgyv7zcyot15ikj5bdeb3o3wht9h9w0t2rmfjh02ji075cwdhd5f5d63e899r2njlfpegv0tsnzsvl9j10sy8jyfrhvdcpk3uw2r1a84x56jui',
                filename: 'mypd4l4zhnw3ijw3vf40lvntdnunot9mhs61z997q8ccqyzr716pmyftb6bu8x3hp0r0tu6evbujrc6d9i6arpo20keb4og9ydv2e1nd0tvy7s4vkvzgwdvaqhkkpn16dacwkzluemp4pnxeyks93ac26hxnpmn572iok10xmxitolzqsp4eaud666a6rrx6pjr2wvzii2o4ng43lwnz3x7rzulkyozz2ojcz7x2cusvixbyx05flcdbbpim2dp',
                url: 'xug7j5rgnary0k0ziw5sd5gzt9gnxdqntvij5amg1yrjl9z4ma67lmlrl8yaluklt3t6zilmb0wodprj2xhanufez2vzew15hws8u8rz4uiw0a71v96sio1qgqhzbnnkmgayh0qx6fdlal37ubwf44pzc0q0flctls1ewk47nkqtvtjziynbcg6csjahmaiyaf1fe85ah3kjcu7x21irabsu3msephluwlozph4h0hnp2w0bl959p216kyaupjuqwjtvwzn1c7bdpjj7v0g6hf8q7i50mrok2r7ho66ps55rwoisrkb9ulsliamfnz915mm85ll6fklc0ofca3ibl0qxcabrbyk08q6tlkl8wfnw91cce9x01s7pp7h77gpl0z3ud5pnh6k1tvme2fodstooqkfpk3x08q1ncqhmdqmrsu4hspc9bwd139jpony2otkbbthowtxun9srjkcf40wbe4j5rb1r81pgsmiymnhrh9dq6ojtvc8ltab396w8zkkg0jzp9jqqy68iacje2f8a29i2zbnhiwuf0oo6ruzistgb21omtlqax1s0r92bha5rgkukkn3zrjq2f7tn0syiyptdvtcjrzy36nc0ixw19dzmbnelbel7i01pj34k2k44m9fb4vinopscge4wnc31da5wb10vaftq5wkf3z7ay4z5iz5tx9xo9oayr3fxcumh7yc72gjflulix9o3oxcohquvgbcmwb6sciibhou8uzgbqdkntszf2jeetgwu4jpttl6xhh9o9u5ji5ka35yc3f9jdmvyrab3gtzi07id1agp1sdn3munezmp8ewv2z7tnry7kgl4x3h1qsy2fq8msy5zx2u2qvfakrxgnvmtc9glvp72pjn593gr155g63ykhflkjzogpnw335axt9iu4ymllp75lhoy3x64cre3giv1726dl2ht07eyj9vnz16r618r9gr94tvql9w7owm8cgofz929za2c8k6rno4kpnx3s2uyhsj4v0lgguv5',
                mime: 'bvvkb8nq5smwufmqcwyrsag4tetfdia6ohubdrle63nq2ppuxr',
                extension: '1omqwqfyobin15lo77g195l4i728q85eoegrvo1ktqlivcv1n2',
                size: -9,
                width: 970084,
                height: 267639,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'yyv1s67afpn6wmaes62x4un5iqkv43yqr2ajflau1m2kihay472bo4qpi8k0rcv8rht1cgwb0o7l7brw25zylfak9jqd2mnaoqb9q5rle8p22977fyd01ozn659hez21zp5x1tjna7a8a1rz3kj5rkm86b5z6u0lthixdznrvgyv5uzua3tkyvvsq1r3eccexkmo796d5yaustgayldevbp4tdbrama77jpkkkwdhjb8kbso5q6zcncpek1sr1v',
                data: { &quot;foo&quot; : &quot;bar&quot; },
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: 'q292sjzg3otahiaowbri0fvcbjt76cx4dzghj2wgq7g26s2fbrs7btqzc4j8itbqs7gbuxgxnbq',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 995462,
                alt: 'tvzs4utyb3pkuqi00higiq5y5zv6exgr5qqp3oemd5v8dl6qzpwlniklnim2y87tli4u6b0plfblrw7grsmi1dgewgpacgs5ywsj3uqlfiv6even6dyewbwr5h31ta7juixlzxl2wo7w99t97sulslnbfjcecvd282835t5ev9avu3761kkfwqzgrtz4zea5hxo7y2v4v6a88qr0jk1kv1z43m7gx63cl29pjq7f8ab8e2amopenxaf58l7bpqg',
                title: '1nxw1uirlzr56af4av953lc6g730b6dmh0iac7akz9ru5wizbaxybdnaxitrpyjw8xqt82xrwpc8oc3lhxpkdv51h862u0qomuqe5ua36j6wbyhzlzawl7ebvjt9hqk8c2ln18k1t8z4eshfze94i7gaswvobg1cnkhe575sy688jx79ly435hoa5ti10f4f24f4pc4md3o75fnxbni1exa9m2wqnb3tu9hj4n8uz489c64to5bf17fiw7mgm85',
                description: 'Blanditiis quia et. Enim porro temporibus eaque libero voluptate inventore. Iste reiciendis natus inventore aliquam eligendi et odit consequuntur est.',
                excerpt: 'Autem nam atque et voluptas illo qui quia corporis. Dolores ipsum sed modi quasi sed vel omnis. Neque et natus odit. Ratione nostrum facilis autem suscipit non voluptates quibusdam.',
                name: 's1gneymxovme4xjb52vtofx7r1bbt5j591mi8utzoyeq560kv6go10twzoklmwe7lgf8yxfd1bbdmb60mp9ej4mm4tvsi9o1kca19hihd3cy0m7w5kyj8fo5o8hhqwno3h8m8ifa0dfs1gw34iz8kfnbq5v0sz0dmwao7jjwgr1l9bwunigm62cj4tx9kzky86uyy5u9d5chddl407ewkhxj3bitioo8gu16r97sukx6py98w3z1nu4lb5c2twz',
                pathname: '3ggioqqslc104jj1e8gxhlgodyvvyh8vzedxtiurg7hxg4c5d1izd7l7e8av3bq4ldk1ct9njbz7idhwef160hx11ka6yg1hebmh4018w0k9x2lrwaipgp3hs3e96slsfvwsv8r4glxqlkfwhffs8szzanwz2f75zhin5wjuflps0s31lkhn5smtaburnlziz600ibhcpbvf1yketwxt14h5kp97okhihozre5h3f2c83fepdqgx99do8jx86ufoc92ooowannanxax3r2nd6ysvwe2lyzokjce1jo7cuzvmvw0stzt5q7szrqdgc1m7nmbcuw2dv3lykyekp4a5czaiq5ndifo6en819j50ez66yq2vnnyj82gxw583zye7ugo4el6gdr7ttipqhvg8106hjuo2schalva87wwie1p70rq46cgowqt6younfhwzq6svx7k9scrsp9tf9x25xfl30ogiuklqrgh82wmiaw5dyp3a6w2tobb5pcxg64suhcet0enaf25os97syfl5emqkudce1irpmwoz0cubmdqcexo5ohtcsdqw80689p7o3iepojovruh7fezd04r8acubtlz1ndku8kyzulr843t9d18ts7j89hdlvfzghd7wpzwbmctcmxi08gy5oz3w1hcjoj22de1v0cgwa5r740mmlyidinekvuq1ozfdabrztp2ad27mpdbx8cve3vmc1nydziub71nb722ecoksghmycuvq29alnwj8g4gxi7pqlyufxenkf8eejndp9hg8dezevpc1v9pkat4kbdoonue5vyhmvo6dvu17ygzi2a3sigt3k12vetkhzrkxevypc9gad8bvgskmeoypb0v6gs6ekarjxt9nwvihtat6sc64nfypivwn1y4wpn6ne2o8s32btamoj583aauf6effrg48f6i4lr0x0p6e1q4lr0vcmj9fcd31op5q6bp191z6003s0diktlfhm7wylks5083ub3uxbs5lnrhfmespmbux',
                filename: '20czvta26kujkv6n2blretnmxzydyisyhofoo505kbx05hufmp686xyn2o3sem7fugqsz980ml45exgayyrv834sz0h0wrki7u0obotzby07ondtut8un86vsdrhl2u3n5vxlkoim7ww1apn1rpikjsfajo5d5vue85t624xbgir19kfob5kqqgg611evcmjtqw6t7eq28t3x0w6571avn9p393ufrpzbgo69wc1rbsh30sudyz70y60hi6691t',
                url: 'fvpq04ntbjfhzrwvzb4u0o59dou3dz2eat31pz8245wunti3iaba1a4so5mnivuqovf5m0g1xawplgcyh5wdgnm4zhy2u5rk620l965dja664hqmf5rhz028goq4n5wb33i55p9kfoem4mnbuf54ai6odp8ukrdqhe071zw328fqbjk9c1ua9eh5qu4dv33vyq6ozbe7qz9gorq8v2otzwk5irdv566qmm946idl2w6a1cfn8yfn861yye7a8xe08xlvm0zypwpwm6rpqrtzuczpj0u06mq7ccy5qveepng6kyuok4sekkxid04mo1vbjhq6era9j7bo2b5kvv3z3oh0848zh0kx5mycd68g1iopo73hnf4i4chwbw24xl6tstg1d243ykmt02x1hg68k7hfkkygtg7ygv5bx85g7j8gz29bzq1pefd07grxh3skdeswg6dy02jux3dxonwmaczknyv695q3weswlvyhpnpz8eb2kicrf9v082vufuzpx7z1j34tkzhr3wirnymlr2ug3qiiyqow5ui7f3rln86id9evekkcwou6wgxjrmtsrvk9465ye5wwfjkms55zfjzjeqkmhiwzwn0gbadf8ju8e6b65r1yzh3vjo5h7b7uo23c6xo9s24hfl37pm5bflb4utdw1pgzevbdqc2zl0b0p6egc45thqtk87v1xjeesthtsiiel9hxrqwqwp8o0ua01c7rd0mn5wq78e9c41fp95dcg20ndc24c6m466vhgpvjqugrxjre99adev1f34y6r3im9sqbths2jxxxk3xiepj9f16046iulyevo78vjvlcm1l20pl4durowtrn42zsl1nvfrnghicb63azlw9nkwtfxjugnhw8lgopz5l6moudppe7qbnxjklhhhhvxhal5pmmm53qjenhs6tt9tq0cld7sgfg4j5mhtw81hj0bg0bn9isa5bcmluh5l65a4z5h0l2f2wbfhr6y4jrn62bgsvwvs5ulcwi4899jjds',
                mime: 'louln5m9hcee5m6tyo9r2fz3jdlln05ayk43jmsb5ha7kglu2y',
                extension: '3727l7fv3crng9558i50nkisjfahflq4paahhht3cf8vkm8anp',
                size: 4025402515,
                width: 499674,
                height: 595594,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: 'z6ags09nm7i8se1kakic1n10wyg0l3qga9u9kmffb4j0na853itqbspgy9fz8lrmv947c8ocfhsxwhqecqui8jnnkn3mhuzyypztn4fvl7uyntfc8syngq5dyx3cr74fcjbrs1bqkddk4o0n0hugjzo4fr2npiuh4hsdsojnwa74wrkxzfa522w08iuy2qhxd0jokg229z6akcbraz9rfqtcpnz24m5rujp8vx2e74k4arsbkaypx13yboy9iig',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
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

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'c09a328b-64b6-4066-96ac-3eeaf28f47b0'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '27fa5202-7223-4cf1-8305-f7e0d711073c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '27fa5202-7223-4cf1-8305-f7e0d711073c'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/e26ac445-4c57-40b7-a89e-02a1d1772f32')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/27fa5202-7223-4cf1-8305-f7e0d711073c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '27fa5202-7223-4cf1-8305-f7e0d711073c'));
    });

    test(`/REST:GET admin/attachments`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4c1fa62e-3069-49ca-8ca1-61c1aaddcc3d',
                commonId: '1defb13b-e4d4-4a32-8df9-2ef07bbc480a',
                langId: 'a4433e1b-1ab5-4f3c-950d-8838251ed3a6',
                attachableModel: 'd7tb9z12ztjnj0niqgq2d738xuxynyqih50f2mt6v13d32kjm0bjl9afyztuzm1wrr9s7kkerdw',
                attachableId: 'dd134a02-7623-440c-9d3a-5eeaa383bbb9',
                familyId: 'd55bdacd-146b-41f3-a1ae-d74484878f72',
                sort: 351471,
                alt: 't5fld3hlpz5akr696udisndv96vjoygm4dzm3chjom6h7nr8sy0cdn1vk79ymgjmkxdf9h9bdsu3y1uop4bilh3n9t750wexr16tnumpgn8hy85bv2wx0ob0jmq9aulu464jc49wixvfucvwpia76i2nw6mqngmguss4d37kd0dlw6mqarcrpqveh7053h2d8n04niisscrm665atcwbpm7ghubk7morqqhrq7s0bqzcg4kla75de9uqmdpfv7h',
                title: 'sk2oppraw4qccyfkz85ppndb7l3k8d9sj03i60m2o0fqd8d8ln7qwbyf09mrstf9vrb5nf9ycs2falrse3t8gttwvyripidau17lkvbzut8vtzb18s5kh2k8jhh4yik641cxx84l43mrrqswsx71syjlrew35r0zzx66laelxms11gh4zuhsksiigjqzjbh6bgryzxchr5he0jrah19copmkjafsmmvanhwlto82vh119lg1xzvdbxpuqifvgdk',
                description: 'Culpa sit molestiae itaque ipsam aperiam quos est voluptatibus. Id commodi maxime voluptas. Fuga minus sequi reprehenderit voluptatem voluptas non quia magni maxime. Quia nesciunt quis cupiditate molestias facilis quia eveniet.',
                excerpt: 'Maiores eius culpa et molestiae dolor eos quasi molestiae expedita. Aliquam minima illum deleniti sint dolores enim exercitationem. Architecto fuga aut eum occaecati soluta sed. Facilis et est et laudantium atque quos voluptatibus aperiam. Distinctio modi vel amet et eveniet voluptate. Aut sapiente dolorum et maxime occaecati qui odio.',
                name: 'kuco5wlj65oyb0x5x8x8z0k28ini09k1mhfgbmdb0wsqdrpi1q95srsyjn8f8x2wlhnr7piq59fhm1499109m5xnqg3xwy6bxedlkrsiz5e2iadxn2epjjbb0d1irdbsx7zq0rqdy93tlwne2hfl5qnqnfqlc7iib7t6ogli9idgn2ph3p655sd2z7vav0hafljh8zm1wegs18c13nuthoza2067qmzv8fff5r4uqy7ipp60dadwerv3h3dlfe8',
                pathname: 'b22ev8k5q4ms889oanvpq6vygheyqn4cnrnwnncb9ak6x1tyv8yg61f43qpio6b8jtmsioo7enikow4meak7trjenu3uwl4jzlx8nsz71kzduxmwnszmxprg87f4aj4ssj8c2s6smp91cqy38ksejz3mct8gsaze6w7aa4c35vy9e4odize991zc5b2eqn0uaif7ia5k2ppghb785ymju9obceoi3tgxf6sr9ouhiwmuntqup8l3ysvvk9phffzf3gnqxa9v2byrv1tzglmf7kved3f7m9n06nzwmmwijw71hhjj56va40rjlqhqgiztxhwkhb5iy7hxl4h2x3jnshcaprf1d0y8jail2ag8j5s4vurgw1cl9ksa43gtyrmai0nbc4ooo463ydorfjuwowgi46l1gcpcbcosehy9qbl2h0ty9uiymgy2ou238b0zn2xr9hvxh7h1agn6s1yov8ejkidlwipwaai44ovvg81jvzvheql0k90pounzm489xd2wje4e15mcw6b0d93s50atlwph1mtevgtjcsji3vh401hcghri06sf1n45j9wpv6reu3g440ilqwfcco3r4tnl3c0z8xwhzb0scqh4sju43ccdy3wd8l1vx7yvtxd32d46ytg4kfl5fyqhgety759watrjgjzfvkvdue73ym29s4ch8zc13oprng8gy5iaro91nw3c414976dbomf8eexc0j1ny8hwqsylfdtai9emgu0sotrgp5zypuyt1kdmu89uocoa0dvpvwtgs76vwf8jj0zkdi712w079o33dik8sbxq3ixzediwcbr5xm7aro9hab1hm75a4kkj1myjbj1wh0nt6fd0no92lte6h7fcnsjb86l9138kx5nuplsqjiri49ju3udjcvl2wpz2up0255wyasm6haa1kf9bkm9vplknmusaayg1702eocn7pudg7xw6vt9yrwpdfl1yuhla7b8r0p5l6j4wxkgfmqt2gw7fmkzsyae3gxgpyd95',
                filename: 'jsbzz5tra8z91t1vr9i3c229kycfmjcs2pg2bnpy7dtp048h7ghjx4sj8dgvyk22b49onyhpt13odujbkj0yfjlsmmwhmjmywcah58wz0jb3f4ytidikgis2hwdq3iuk21q5wbjx49ppyljhsopbllgpeb75xjpd9u2ej2wd6u4b3mw7evi7xz4yogj5hyhkuzy25daiyeftzu930juvvq33cv6k37qruws4uhrqmlt38nnje39i4n9vrarwvax',
                url: 'lqodbsvjjfa8gibwjs5jvfhn6nyl6zbifv6hksrnj6clfob0656az6yz3md4lsnvjwpeqtaslcns1xn0jc0uf5w1xhfsjfypsiytcrklf67iikpafkd75sico7wxbetx31nx5tfl0zuawo9v0163fvl21l47qskzd1fmgfkz0k6t6ed59vb21j0uduiv916k9md4mpa6eg516eiso3vttb7qiydhdxsc6m7mdr3mdugj6xhubav3w913w1rk5lc3fjgd642qijpni30kc87onunsex4brum1ivgdfnoodsrd3cfw13psa6xzg4v7pla88zhbwj8u3967b3n6h6g53t9zaatt66aocz48w8svumban7l5v7tuq0qp5b6615phic5hvplua2yyo5mzsj4gn7r3u0giajubxdyumkci8qms3rdt1jkt0yhbxruq22vql9z72c12et41gzfvyxg2ovtpds9e3ngob9tn15pvle3jywp9kkp7npa7hlq0c1ogqbsfhynx3ydokr8521e4h9yye31j0jyn8yw4n4naqgciskullpn2d0q992lyuqqmjfyvqymm2ak9pwg1815wsa91sxc84q8nogy0o5a8pberxr77o6j9hrd8gwgp5a3p7j7jymmhpxpi6c847kjeal2gmaps0118qya2g918pqixsra2nti6bae75i093h9n43ie7ntujn6uiifwfmjwju3snrplj5090ngg11mvmpxt98m7aa9sxowmzcb8jud2kxuosg80f6200tf9xef982acl0zhnftiiz7rwrsl5cqrgn3rpp7o5lga9wu43wb6lctzcj775q8nhnodjhe66rbv0ueqzpvrvm87mhp1t0k5ghun36klakrba1ps758pfqeed2hd1d0qzdb5hb8035gpvcrronjxwi9rpqzfa903hpryl0u38a4zeblt9qcxylr9lu3yzixr7ys5wrbnhfvzrmv34nx48divmh116i1t41nk59vsy975pbnyyclj',
                mime: 'm8mb59lf5uhapm7b2kgllghnu3j1fhazgd3q5jw0i938mqodmg',
                extension: '3cxhpjadycbfhejlhrcuhn61jdgscoscegi8jm913l58nka07h',
                size: 5642698144,
                width: 599395,
                height: 782003,
                libraryId: '57541db8-e721-4dfc-b49e-2609cd8f0ad6',
                libraryFilename: 'lf378avwgg9oni6qjwwxzchc9w3tclhpf9hclof4wiz9o9ufftk327zgspb4q07ccbreqrmprn2it10c1udpkoyrvnoayxrxoo5dhhn7xc37jr8sfoluubeu8petohtxn05apl9413d81m3qr2eubfq7ctcnhe1oi1hlsqhwxuu3d42lac4fczblm9hlivgaoyl3ulpmd4a712yaphd47qi2ia7j3myopl46of5hwgxizqgzxose8svanp9qdop',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                attachableModel: '4bvef3gqri69d8gfz2214fyuw8c4pd6sg7ie5c355f6repscbt1uhw6sf5dendp1i4yyicq7s3g',
                attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                sort: 759012,
                alt: '9tod9oqpf6z6haf31vmif7tpfbfoy5x9ge9d56p2wg4wmcsqrrnst89sfhs0ptt3r7yi40810jptfl6grvq78sz4d9xwwh33dswfvp1ys68qtr7frytgg55ucluycpu7ug6wc70yw1qve1ba5e4js1nof21quxyp4f7zz3epjbxn5o94xvli1z8p2d0gm9d6rabaz3pshllnwx8mimo9j5lvkep6t9d9okw40b34hyyu3d7h6gqh6pm7hj37zsj',
                title: 'ck005gc8rm173aq0z7l57odyl9xhw4ngzix5jk5kh0ipr6lnqg1pufnxux8d1sucjxaq29vwfjzkxg7ukr2f2lsoowkupgcz6eifb6vbj34ssgf8fy3bfb7uuoyz3s1w8dlvmseyoxme838hhk77ori7fvwltmt0k4ehp0s0pjj6z5pc93oa29zwjapy4prrt178ywoda1xo7ervodwqrwm51e3v5b6zq2ozozg1nz46byc68492qex6desq9am',
                description: 'Quis reprehenderit rem molestiae sunt autem architecto. Eum et vero voluptates id voluptatem qui. Dolores nostrum et quidem quia laborum quia. Tenetur quisquam iure et ducimus.',
                excerpt: 'Voluptates earum perferendis consectetur ut facere consequatur autem. Ipsa mollitia aperiam dicta aliquid cupiditate hic tenetur necessitatibus sed. Quis aut voluptatem quibusdam expedita velit porro excepturi recusandae est. Asperiores animi maiores voluptatem. Consequuntur deserunt labore libero earum quibusdam. Earum et harum culpa.',
                name: 'r90zs7or38wq8eiqz05qyr8dhla0phe6iy7odx0gzscrnbw889s620n1u9ft9xbqzejzz943m13n02nzc61x33putna298ewsyrby0ngksnkkb3le0pyktx1jsjqwg0vuel535ha9p6vuq469m5yw9ohipjiijq27l2x4a7sivozo9gr3gbmjrievwcug2srqxysh9p5fu8pc7hk5hjqb0ddwh7zhautxb4f1dkxcpysic1t3lcqjjmac2s58o7',
                pathname: 'mrli765wbcvm3j1lqbupn1jdbhfv8xpyrnq22qfywvzwh5dd90nakjebm0var46ahz16r044n3pcir77qny0e7dygkoc6yv9ivzj2evsi4lq6id5cfwgvbry7kiokghiap3fl52m1huvuo27s9slqy94f6nlg3rw58h00slsdafeakh3c0dvsibkxja8wmz9pj12rr2p0fzjp1zs1wlwu88syim87rmdt3ytkpotuu34x5swsvve0g5qqha8ge267fsiocfgzbv9ygq501s0adsdh9z0j1rn7wdz2nadtevmljzlwwcnt98qkdgiy4jbapxspgwolbsilqpsi5q6tqda3vnx06iz8ti5tmla888lzv3wfygnob62gium7rgclw5ou7mu6xf9it9ryl79ft5n3ecx6cs7geyvgnwiemb8tkap7vhmugf0uoq60dttk9q9fvzuy12cnqg6pla3ggzq6y1er0pv2fyue5ao85hg4k960ibu9vo7y80um2yuzivo1um3nbn2hdvskw22okkuvefl45tmfkz5q2y8oc2u86shuus47fcmjmsltx7qfrp97gmzbwr3cmen2fpkhh9z6bfjv55xkzw4st2z3171dxdkuydd06nsl4fzcma1s9oxesfwgyiegsm5dilo1sb8hoiyj0idk62szp0vdlxqv345iiipsta3am0ikfhh17arsad0o4qhin2i6f01gvvzfj272tfjfpus79cku44hw97aoneqpa7jws09hvvbeo5t2rx57z9r1td0cn0tsjsjzjmeg7xrca59wcwbk40jhku0ivzks8zmpkremgclhqmbi60fdv2tzhb268oe2fa3a65pj1n9j9hrbvlcwq7xhtbzbzcblz751ed3sbu5a0ysv25uufg45hgrrwe5vew44bk1v6s31xxf5hbdlb3vxkbjfu3niryw7n34fpkvsmob5dcbux6iqzrd143l6cw9py3wd1pam9mz6u1xr9nqog9lvud3di7dsi93ipub',
                filename: 'mg29lhzqx9lgtc2531bm7nng5zt9gdmiqbts58d4cshu95w6waz1pztojvshwqjoq3cmp6sl56rcrrp58rstrtkqqblm8szifo9pgdjf58ucgh5vnryfg2sl3kq5e3xu2uamxkprvupf57c71eurb31cytqwbf52zh8w7t495mkomqgnz49s2zmtmecqakhyef5sbf7ccjas7214w5fr7vdg7r30ecb4rbdpaewyz368u65vbuzfj14zqse8f6e',
                url: 'gk7x9pmv4veentvxgpa0ykocp7krw6r3324slefmoy4ye0yhnlpvzf9ej7e2wcs4ohv7junic67ugzikdgys8h8jww5940wbv0ap3sdy69kdu15u6qb2gh40cw4pncatw48gwcedbj07j1xmdfdbcdj9r0mzta9zv02yxuh978rp45piealfop53uv1gulvj60n8p84p4x837gar7j7f64ognal6l2gno4ud9nogcg9t8tlal9i0qaxgkpcesgr3cki77466qp3ki0qak22vv1r1xjoqa1oximrlubm9eju1hvqusgjph0fpte0mqvxpowfgdrzea9x28yhrctyb5q6iu3xzbpqnqtyzd5tffcku4sv8j3eje3qexviqiau7xru6tfarq1vzjynhft2spi0od0awbbnrtzj8m9t4xbpjf2sdcgcjs2bdfrfmyn8tav1oxcu7xcuk8m6fkavjw6mcgj1gmsqifw1pgg5b4dutfz6damej704ablkqq41n018y8nht5agiu42tw14gsjw32znewoxy1vcssf5rc8ol6qdjgzkcd44ye4mui7d4bkr31tr70eafse6eml1ktlnhuonfh2jlvi0xgxwce85yskzqdc1zts10gxzsvr13aqwyfwgd5wiynqwyh651vjqcol4rx9qupza3vipckkv0gde33ah9jprwzozcahue05w4wq30aehbdu26ebp10xysah39pb9jzch8uwn4nr80fqlx1ofllyp1dbc250dorzg6xtry3jmnlroxzgka8rbjvn04xu4q697b4hncano4hwoucwuw0r29mfa3wnwxtqi1wdpxeu7sbpwuxh5mjqkar67wj65x10d3ss5f2x5jz8du9unzsdsfracung853kkn2bn5pan8jjudpxopkhgvcafqig5k2gp5x839e5q9jpdx9q4s79w5pmm58j1e2v7q0tauogeuqtzp134b0j8h9vf7ib9sjgho1o4dxyr5bb579hyp0mneybe1q1ip',
                mime: 'dmssxmvegswdmwz0dt97dy76a8l87deb2x4u1wfzpcxhpk89j9',
                extension: 'j39xsgech2zlnn9qf4ffdbe8zfqok4tlxhf4ngc5pi1a7pkrm1',
                size: 1931739732,
                width: 545090,
                height: 646747,
                libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                libraryFilename: '6wyt0m1eldy8ccw7pekdqbbbfcesvlgw6wtbjpj0gj6f97ms77e1f3gbma9iy6pxea769icviffxh745avv9gvh1j9xkliltju0m2wns69houfmkivtuhf36okprm6vlabruye1ssvkb039kcb65x3gpzyj28n413pogl37mar150qbiruosgbfepyxygqkyn6i24npeb4q7q2v6kimab7jna8ck88vetjt8ate8cmkiz1xm3lojt5fbjq3qy1z',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '27fa5202-7223-4cf1-8305-f7e0d711073c'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/c8854e5d-22ed-4504-bd6b-66d64b481887')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/27fa5202-7223-4cf1-8305-f7e0d711073c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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

    test(`/GraphQL adminCreateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c4d48d2b-9a71-45f7-ace1-f4b97c36befd',
                        commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                        langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                        attachableModel: 's4tp3r60qzhtj5c0swgkmdqhrvys48a4kdgndf7s9t1mhrg2i0lxfbgp6twtqzjr2gkff32d8zm',
                        attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                        sort: 166851,
                        alt: '10ukdf2gggslm6ueeu24c0h9s9zw1xggo2bth4s7s0ibwlh1xng6q8hroes4ubg1h2idv91tl6uyq7cik8lqxmgfknhtzbetxuv77ju81xrxg1t3onajsiqtfgmcdh1f8jnbx44sbmy7ltcy8hcdwtx472xb2u3tdx07zgeqhlc20u6h4l6u3i95mztg48wlpsmob4jzahpfn2q2sdwgz7fucq27ryot20gczu42zafnemdoa7v9lydo8hpt4ro',
                        title: '2d9cfa4kvildngznckiotlv0nwh4lt1nlyvfbpep4q1k4p2elxjh8h2yf2irdv3xw2u4ofozysmks8nd0dpqbq9a78s6i8an7mhds1h8ihcmp6w1kl06griqywi38ayat3nu1c6i94g0eavpttmfc2v70j6d88h4q7dsjln1iasfmn2f8eqnr7roekgsoct4r7zhdt3n7ik2bmny62vmftvs6hfq5pw731gq55cpw8sr34quhtl3ijwgvst3y0y',
                        description: 'Aliquid et tempore quia eos ratione sit dolor. At aspernatur facere dolores repellendus eligendi. Natus quidem nesciunt est dolor eum consectetur sit molestiae. Et dolor eaque et rerum assumenda sit nulla non. Consequatur tempora ut animi porro necessitatibus ut et. Velit neque maiores consequatur hic excepturi quam aliquid magni nemo.',
                        excerpt: 'Rerum ipsam sint dolores. Sed ipsum deleniti voluptate. Magnam exercitationem excepturi. Eos nobis odit magni numquam consequatur molestiae voluptatem.',
                        name: 'fa10z4o4nd2cc3kjy9kmxcadd2gifijderho7054chs92690wq7um2uwxr0jwh1oyxz6zp6ttnu8p8263vgmj2fq5wm0iazppmu0mnu9gyo7a34491nu27q8ml90rlz8wep5w7oixgnm3k4j5a59k45asvpypsvr6r8ss8iairdq3xl6fwe1kjveewlgbyvga0oml7k7sk3hwupfh17kvyxndd45rwbgqofl2wivakpk539zlkhc4scp7i0uvni',
                        pathname: 'mhmc1srbmgigoeibflzl1jybe2ye5rzbaiy36csbgyghsh2zv7cuisyl1bccooeyau9x19sgnvpcvb5saqevprsgkapl3h1dsmekzwgowv2nyqnr8ei1zeai23kwddcyskk6v263ln2uomwp184xuw544i6w4xe2tgn20fr9ha9o8zzmmhhlv4ct4suonrts20gnnh7nl0k9sxmw74j79qmyxlce51yd3wz4lcqxkppx9zg9pnxtou8l1pb0bny7ohaqtr1ms02g2hattn2rkj30wwozaixmpe88hid0ku9i7tjhcqmgkn5ft6x845xntxr04wrwxhrflarxosjwh68utny7qx1hqonz4905o1ufzv0lsun8ar37tg0typslzlj4illazbw464b1xoim9tbta2z4q3fqluqlthoebeld41ta1r9jsktf4r6g2e0j7p8m4gvwa1rd5v0t0e8krei0na9n9ij9p67yo9wgqleo3jzn890el0664bo7u3o159qzszqvt3zxfeugk8bmnn6mpvgzvqearkwdczaz54q8qqr0nf21ubw2nng40l81p9cd7d5n8zwqja9u7seqm1qt8oc7lq9otic5hp88kagu8qf0yh1j77tl9a5r2boudxav2nwjda56jrnkou0kf9onx7bg7udhf3f3xx8l4tbfejfhicpy9m443z4m0u8a26ymvtsfb1j2geg09ty5hvz4q0smuj2ktg166rvnwftaxmid1px4u7ozct5scorjf5wcwabl1magf4t8ms90j0pmvpx53ntlj4iljggf6miodf8yu0y1s9b5m54kuty57cuzb97j5itnk3y7fmxh58ewmuost2x6vmeocgy118kg262mjpid0bpzho7o2fyjva0smm02isnuidgt3vdjf944wz7vjaltgw7eriq83k3voq8li0c6w8whqajajmg2i76j5rxd59rcmic9753547boimhrra2fsg9hiw4e12r3y317c61thr333rkxh5vp',
                        filename: 'zfbp4me4nd26vi207a3l02i00fnrjgh29hzyzdvzpo89uu5a3ab6q33r7nt29mikkrdao4tqyo2bh0wi8hqrhjz9b4q1rfn3phfwaxcfgjkpvh4bs01fj8v07wzyf1i6uead8cn4fkr70o02c6a5kjkgvjf03deqg44kclme5svd98g7rd74wyxhizevvxscp9pq1msutexl7ztp1ug55vhjiol1ew9tebuaeutwlugaleeqcyanjvzvot6v5hi',
                        url: 'y019ybzdsdxqwflluk4fgcjdfsf0hkx1y4ql7o270cbm6ecynundwpp3lsxv6g78qo6haub30uprsoof0r49jej2gmdc7tudroj4xzdfj1rvo5wv2s6ufr92068i42ifrpb7ug61gmrvn37okctbkqrtng34v4wxe2f9bsv6u49pwyurxbxlykjscadue9z6xxlmhcytwexmcd3bk7i7abawb8xo6148s7r9n5l3d6m4vrf9dwmeem590gkj96s5rq60w65f5k9u9fpbjsd9edeyzaezzkpy5ppsc3o3scmok5hxxaa4vzuseplmhlhxozawguec0piplt11skuvdxtiom2d2ced6ncm9ohk5walbyi3c1c4svuyg57db0dit67dbr9g3uvz2spgq3nnmwci1uaotidqebyaqbgckroxjqxhjhffh1dwt49knzopr6mhqxcn2vkjjoemkl1v8yixr2o7c2rhm05nrjqi7fold2kr99y2bytu7sjy4ia0qahho6qezv3e6qteew1mmwxgz8ljzzay5elxb1xt9oy78m373b67sqjzfmvs1yfsygnthlg5mn4pxib1clackd6y3acnggj9xyb2jcdd99cq0geewcnvauvwx1iwaw10unjk1zwr95me2aqfkpz0aqkq4lwzhkbga8o5be81tljpdvgrc9n2v1c0mkxka95qckywezrspdupz6me43qqgyar947rrsqpc1qpl6z2a9a5jrroqq37bae6wn6hbyqnify1ih9n5v8sjm374ot235suhan3xj72okl6rkq8zz7looscqe4twds2axoa62spcf6keqj04w10lol451fyzdip6gcof0qzfbjpnia93l0uonkk7d763hw9neifcdl0brfzvc7zr7mazo9yqn9l7m0z72g6iafpkl2b019i4m9bo52360d0ix7s9ba83arr10xzncov0tvmdkfpicx975dbpqbbfw5sdlak0ucsdrjah1niajiejt4a0aculvu6',
                        mime: 'vevz1pqh9lb4nvsxcqk8s6gx5ajhm0qh55rhm01q6og6ipv7kw',
                        extension: '70dvrb6ltpgloxgb4u3bjb7swvqn89f0s020j5sy39xvr5od9h',
                        size: 5297779623,
                        width: 869794,
                        height: 562796,
                        libraryFilename: 'mybl9ltqhmhbife11lpb6dp7hgarvgvx8dcpswaung269myts5648k3rumdy1wh4q6hl1z9gosf9c0q5mxslo7u8s2itst2z1cp5xt8gqjgd6yiaeaj8kyn5j6m6kkud5qnbevmjfqssaki5u6708ftkwemux7iowrbthp1bpiwua07uohmlodpqr48ueberqt1q5d7cfdvg2dq4bqefm93zqmvz49guuxidklwh2jln1i1qn8zwx9g7lqqxzhy',
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', 'c4d48d2b-9a71-45f7-ace1-f4b97c36befd');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: '1a48a093-43aa-4c28-bf0b-14bc02c1e1dc'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: '27fa5202-7223-4cf1-8305-f7e0d711073c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('27fa5202-7223-4cf1-8305-f7e0d711073c');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '778f58ef-0447-4351-ad85-1b4b3a010523'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '27fa5202-7223-4cf1-8305-f7e0d711073c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('27fa5202-7223-4cf1-8305-f7e0d711073c');
            });
    });

    test(`/GraphQL adminGetAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'bb554c72-2509-4865-b521-293114002f77',
                        commonId: '9488258f-c46d-40f7-9933-3ad6c0479691',
                        langId: 'ae68a6b6-929e-4211-8a4a-9a9470c825df',
                        attachableModel: 'w166t93ouiqq9bto6w50ts1o2wbtwur5jwc88nqusr94rb93pltxsvlcl8cqjfmxporr9mt7brf',
                        attachableId: '9e6711fe-cf2c-41be-add2-7087fa3ea65c',
                        familyId: '39ddc356-66ff-426a-9bbf-3981b875ee30',
                        sort: 175333,
                        alt: 'ei8p2t3qv7r2xdj7de8uv3w2l9wpcxtlvi03m9jp76puir31s3m1mta0wvlqf2ebjvbkb44cr8i5iuakiu9zeg6tr5cceb2d9m88t9iqlnp0v9pktzdmbmkeag2rfw25l3ierlg95jd9j33de0i5iyferlnozhlhd9qtlqrdqmskmjjmpkw7yqtdazwl3yrq2ft7upqqlaoer3s7gv3kuwulb3biq3hq6ttdkpe0pa3mx73s23jdtxgbrj24hc6',
                        title: 'voqpl9x75y7a397v9xduvxxu4zie16byhjonuwfnk0vwiud4hifutkc9pgklz873moznzg8tgabjnbe2ar70ppfhhyj4pmlnn2d4i2zg2nw7i0gggmdqhck3sq26l6xdxmygyu5dmhsg2k2mphizta54hznccphf9gvcs03f8r11jx6i8vc0ymmg0xlzr9vqa73f6omb0iytp7dwfavxbaa3sa597m92hknjmrcxksjcwoeqv581sipecigyml5',
                        description: 'Provident et quia culpa corporis harum. Occaecati eos laudantium. Voluptas qui fugiat odio.',
                        excerpt: 'Eum exercitationem qui sapiente quis adipisci. Id et ea reiciendis et. Nesciunt non inventore facere.',
                        name: 'csxcs0i4gn3vwuicp3hoz0gao4txch2tdb5u7t6lyggjey8zrdc3m0pkiv5lleso6mh6vre95wieafod4helwy9jg992oevxuwmjxf2w9dxymqpy8p4ueqfrvm3c1sqeyyddutarxiivzktqect5snxo4ycqy550ejjeubc2r0gmrts6gmuljwdlyfjdouneogaq2kky0k6r2ux7ls6abb05xutt9c0qgmbk0wdnm1c3jb54n1hbvz47wtbr5dl',
                        pathname: 'fw47pbyfajy6phts8sypwojqx784ahkv92iauqjx6c5y4t704h1e1uvge9fi71hb1w2yu4oxpa4ciwbhxk9wexvk67ca8fnvr8s3jnb1enmdgp8rcwcuf7sz3f90f2m9mhpc4ve4jergkb8gkcwex8p6ddhnc66zcglv4gquj7j14z1z3uc7jhnytenwg71q7r8na42x8pwaiom5a3ogoiis55edcl5ca7kg883scig09in7elkrj3c2dgw2tui4h3uxapkfgdhj9mdkgguqvb3t0q9qvishwnyf7og45wi7st7eerpol2c3rmgddlb2urm8u8o1cadkbljpq88hqb991a8sd0389nzbvfqevcyyv6otwwmv3ioy0q9zvyl29q3vu6d1zkp2xhbrsx3t1hbojdae9sownopmppk0dbmln5xun2babj713sl9fwv12cumzv8qv69r37s4q15950ps1eza0413l3nbxzddm8ma62ic5oxea8k26qaiyfs95i5xfmczi8xgd1h8yd34c0n6a1awm9hzzgzi3zxlvmjr54m1up881mdarf0yyje9xeu5a1opbu76hylbumkrqicv3jupzwajus6zkeud780i0r6ykk7ycqv830u7pw8n4ykvbo5lmmmdut4yxjdvuen8wi9iz2slqf3di14q67ayfklzsvtfip79spum8z6pgbovekg4zsz87fpomxq8gi4iezydt6ienvpp95607z65xne5umzeawsbey0qcad0lpexsdw119b8k4ryd2gjre8x0k8br7du5rjcgr35g5zg6bnvn5dnx72tmv2o2u5lsaktjwzqi8alfot1sybppby1mtw4flp56un5rdpwz1ry455f7a62pxjsm6kzlxa6pql4c7ix07qj9z0otm4o80h6pv61hxlbmi86t69z3f4cxwg845mp61jrlbk9cawku61qs1zlj54crdtgs61j1gkrq2wlrdz4mezz96h8gjbg9wcf7jvunxlnvidnv806',
                        filename: 'ycl6zuh93sxj5wzt9n4887dy6wtzyncfbn5sfmrlnurokp2hdfcbm7wt27e82tum5yt3olvju9ew2rtnimuy2nwrp9mwg35t1w80v4uvi082mts0737uxwcbowt7lvtq69sf79oda1nz2s9yz09o64tgo3ze6ab6pdubqizxely0w7bopu1lgsxj7rc0qsg5352s1ocb0aoro83tjew8qcd10qlfgm1x18lu1ckhnbwn8ltigwq07e5a5lmxycy',
                        url: 'xb7ta8ic8354q5qf38a2tkubzyfrxjsyq7n3sc7l41dx8mjyvn1hwdwxpu9qi59le2nvymgcof7pwoafu7dz15cb5xqfw1rog7sbbv5qcvqs72ppus6wagzlyu391t2f3x46v4glqh0hzt8aiuw3gxj3h5bhxgtky0g89c9nwatqdfpef3x4vmf1yby0tiwczwe1w5usmp6yehzjs3dimqzbye56d8shd2e8vk4uavztxtbmirvcmw2umomfe27tcdmmmhskubukknert084tzaovzla99oc8m6n5l0qkax4yf6xo5bxlprg5x3gup84y54ph37n69den9ni9jznsg4rej8nru30a0g5h727tejuerqhv3fgowhzdhqynwlo0a3m8iz9y2wwjzyohvbi6z246c97sgxetw0prive4cny0uekmu5eexki6hvihbj9ato1qehh739slf877eb8v512wjl76swvyui5m594xsy79cejbe94shsmkjl9p57s02ymjuo386m7cnzlu2rp45687p4yp627em5ky6b4ot4vplgj6sq75n3webfw0s3gw2niatxq8ob70qwbz2bcyo66kikgnk1wt0tojkxf4mci0lt49wob91g4w3c69789dzaduna7488vfyw6d1nchqqk8svpjou53kmzzd03e380p8qzvedsue20e7p5w8eso6yjr0ix3cjimub2amdjpf00w2248leasumnsmlf0xo0zhsu147ytzff50kkkbaat1wzzeytrx0phpsz4qe3sgu0e5srlpc3rkieit7holzru1nemfiaptxoxx9cs48n8v1a7be0yc4l9snd3a2leflamiqlizseegi77camug07uyiqfkuz766a6zl2lvpxsft5kxpbhb4z6ofi9kzsut3ij36amdgnrke3k8kq7j6duzt0h9umbq7d4vzikyf92dr8g0lpkk9jvaawqidfdf6i4bhk3jpgw90xgif5xbp6sbroe4b0k79a07jxmkd0',
                        mime: 'vp5ygyiftrdcwdgcjw2bgrn5xp5kd3lw0p0gkfq88h35zxec8e',
                        extension: '7h0lb8wi55hafpv921rrss02vrm60i4ijlrw05edsguj4he6es',
                        size: 4831177210,
                        width: 801318,
                        height: 855335,
                        libraryId: '1bcd0f0a-8bc7-4a17-9307-186dd6b06581',
                        libraryFilename: '8bfao0hlzu0wpm268ah0kvpdt6sirgx3tthf2yfe5hmn4jsnbkx1odcd7gg931384es5evntc7em8svq0dk0a0a5yzgmtf5o5xk4shxe7yuo9l5wvdzd341knfxb8bq7z3jmb4igaw7cqbyzjnalcgcvjw7ucpjdznbwgzkupgnc0lfzgj3qrfem1i9x9sxehuo3ry2mi0l58bli2edju4nox5itgj8ahengkoeq1gsjujupr6dr3szwkkzkljq',
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

    test(`/GraphQL adminUpdateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '27fa5202-7223-4cf1-8305-f7e0d711073c',
                        commonId: '9b61caba-fe6f-4200-a5da-60ec17edabfa',
                        langId: '771897ef-bc0a-475b-92a1-c3ad84c49df0',
                        attachableModel: 'p49eaauhhvuumqug6cawygunxafgouxgsvk0tyn8c246qdt2ja83o7ynua6w01hb0rrpx0hrmww',
                        attachableId: '212476d9-afac-4be6-b7ba-393d5e40ac63',
                        familyId: 'f63d7615-ef50-43f4-84dc-c64eedf07a8c',
                        sort: 261038,
                        alt: 'ysdhsh2p9ki8fw8ey9jbtm88xb4527ybjdiv57pwzh2kva5lkcdu1vpkirye455cabbdn07d6w8pe8itlc2tdn767mh9w7lelyrdnhmsqdbg10ywd5l4l1qcqpisaz1jyp51cuo9aflerx4ub9g8ce0b0dgs6rgwp9pbv31axyrf4c0kiopxav3o4u6ozh4wnqgq2p6w9aq7za7slvr1r255fm38x4tmy4a0xmubs2z4gskijajsquk9gmuh4am',
                        title: 'wtai079cobm83q7is3m92iq6invcbimpzo06gdwzcsehi16vrnmpng8d85swf68duqgmonz99dnwabh7q8gtsrgob1qrno01dslp3nfoupoajuwk5npul0cze081on8kwiiw3x3uu06a8cquzcjks1si2o29x2hjqra9jv4yjeltx5ptf0eyeu1chiebwf8lqmud637ha7uyyiv8hxp4ng8a5huds2yj8nos0x8d0cy8wtn32ck79yjdzgg3618',
                        description: 'Voluptatum et repellendus esse voluptatum. Iusto qui nihil et ab saepe hic tempore. Quia et corrupti.',
                        excerpt: 'Quo iure animi repellat recusandae qui qui deleniti. Aspernatur enim et. Quae voluptatum est dignissimos. Dolores sunt soluta non ex vel doloribus qui porro laborum. Nostrum reprehenderit quia fuga commodi deleniti.',
                        name: 'j5ofxvtvtfqqss0nwumns39yohq7yoy5hdu5tsdyw1xvy9n6eevc4sbamvqjwstd5t992b77gzs8h8skk6p5mmbzu1xb38nlxmmu1wruhr4eadiwspvpx2pgs7banf0uhee6u2ydd2iof9z0nsh3smrhlcy5798yzp6cc7g9436ar6f2k067hsmlx97q5cg873bty9i0w0hmpkzhu9ppbfp69oxsk3cqhl9yyxf2i4cg89336e7yg7deb7yw4vx',
                        pathname: 'a5dwcscqxgqbr5g66gtnzgm5jr2rk1sgbro5iy6zez4ma0j6pl7idk5apph1lquyy9o6aj4ociki3nefnxpib1h69goh768p1nznwnep1ecbwyjcdnuiiur9ucpckrtgj2ux1a1myefyvtr7t27qidndhdilakxxnsu83gu2m0sqe9ipu4szddtltw2omzl041u7r5d25i3u0aoaly9707v5jlnw0kq2ptqt9fmep3kg09btcd8vibxzwn6h6f68wxyet35az90rxxei2vixwnih6owadwjgfrobl57d2va6aew45wr4nyv4bogtra7qsju7kqv9o573jbrltnco7xch1nsukrdlhhhwd56zmsd5oc851auzwbgn68hm8k8xk731mtk0m409t3o4uua5kfh96wrdvwhsm2ks7ty13ahwds9d7eurui2d57snus58pxy2a075d89ivvupw84e2aj3cog35y5e0g8ax4s5682otz5pdb71prmqfsupyn4b3ukjc5679lkj9sqtihq18aahwvogwjblrevx811yl7cpkvuh27hboojohgk2sp8tbqmd6kvup5vyyz4wt3fn57c5mwpukv30d4h5l3emhwxfh7fyenub1uyunwx7x4siyamgpcjzckgozdu5ohs3ei8eaiox6sgh7jp9de19iimb4kozhwemr5pylwavu996nromct96emj1h7bxr69i4jfq2wdbeuos9clycyz7804fki1llk3inkinpnfegdga33bwnzcp6zf3apdh9gjb2hffea5btf4oslulzhnv15e4ihh8hsy1atjju4gd3qk9f939zj901sjupcnk013er6i3j1hifiy2pt43ghgx66trrugxo9x7lek4iz22g9wyt5143ul6nk5y45rhpmnrkgv6zdkp2zckxzgwwod2rsgrri2fwanga0thquuuh0k3p0f106htsca9q2yq05mcdzhhxd6e8akznbz9gmg3qrsvvetn2w5z5sygyjjzsaqr',
                        filename: 'u0ilo4wskhk9idps6nbjdoo4bywbgacgyhne8sy1qfewwq5dm1e4m3bque0185rltdng2i3wcd5biosaqpxemjg7ey4mpwc7t2x62yxna36bax0gmmm5gafipr2efftfo2xy0rsybdkf4dpdcm8em1y00c550yfl13a75ndprt34j0m090h0g4pudahqy70pwbwrcf1qs24azklrm4gldbegcvh65ckvvnasgbhwhovgmmlcwg6iagdt4dd4tcs',
                        url: 'w2uosg0qt9d19onljgdzs8uwi9d1bwxkc7dtlr27yjrcmbux7fx4xa5yt4x9rp1c8ks8shquvx47o0gc8u6xhg03znyxtae5hxnvutzfdsxihjvvno6az0l1um154mjrklvzl1sjx5qpevp8hy3woypzn64x4ch9kobx5mcsxwtv69t134agn5lhexpvq0rf4f7pa7zxo1jifzalc12lc1i48fmw8jd5ydipa0sqswv78z2wndvzoyjd7av1nlntjaac5hnu0ybbzgricfpciezlujo2jqoe37h3oj1q6s2p2eidvq70p3y0p3z72w8rv934gghq8hntwdaufe8ns4bjpvw5zqwlya3wyhvlur3djy3rjr362yx3s0v9nvexb646sqnd02ojivgpwesbpcgcdpzio3n1r1d0ciawyexuxpdwh853lf7ty2ndndn1irn5kw7mkdyrzg04ay2c9vk0qx3hva2dnre29i6qbz5n3utqbjuohgha42ducrwdwh469127pmh91dl6ovufeobhgwvy3y4s292rc6s0unhai8nh04jrs1g1bls6gd9a4hfy0jr32lb21ki64omlum2i0auhv5ay1t2z1np612q1djw22ltt7epaewq1oq5e4stkbk041ug4gvr6j3zmdzghw55skpux8ckhu6i0ys2w509saok9eyt02w2xrelp8gto18lp4kvuc4o0xztmhd06znour1tk9jouusmf4phr9hgoot2sbtf1oxdexf8s0x89myx6cpb285p0bjdyilmxcrrbmlp49xzwdlnvvy8r7dewse0wu41ee3ptlpt8jci8hxyym8b8ecxzchroo3yw39p0am9yr6tajnwxkulnkjeoqhq6pnu7rmdkjeeiyoma2u48vo7pmw7gjd36u414mi8paydrjqxhou1daj2mzxi3tmxpujtun0xk41hphrza7gkcz9akng2113qwqwnnrhva5njjj33ecnomiz5bdp8l99k7c4gk76xmafof',
                        mime: 'rvm0zvnvdv3bce3tljqcx915ixa4du4tizo3hsqw0ej3uekucz',
                        extension: '79ry25pz7u4bmfge5lnd502upr5ycwxql94nl7gjrg5ewizkzi',
                        size: 5921949528,
                        width: 131972,
                        height: 466305,
                        libraryId: '2d93f372-ee7f-4552-aba9-49269d7bc63e',
                        libraryFilename: 'qzfd61uetr5zk5ij6dgxjyirv18mjffr12exsdz8jp61o9h2xmgtmh4kb4jc3fhdi8at8ykb1oma9dccg4zf9wkecxhvao4440we2pf21esfvq5gmhen3pd0qa9femhpo1wy2umgn7snj321t5jzjuvyz5p0r4qaijn9e3upapo34k65tgmq2ob076x4t3sw6zopvjbsohdvbujvbrsi9k7togang2ukte7n9l6ipzx1vtgr5uyqps2p79f7ctw',
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('27fa5202-7223-4cf1-8305-f7e0d711073c');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '47436662-0d7d-40a5-8694-22fc23039d10'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '27fa5202-7223-4cf1-8305-f7e0d711073c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('27fa5202-7223-4cf1-8305-f7e0d711073c');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});