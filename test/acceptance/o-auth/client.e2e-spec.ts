import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('client', () => 
{
    let app: INestApplication;
    let repository: MockClientRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'PASSWORD_GRANT',
                name: 'vbd4wn8yrlwx35n7s5bcklvf6rsamvlca7hi2rpa5msyngj0q3drgzi3c72lplebddu26nql54ndgei631n9argib61amhdprlyjltmwhkv6uetn79dfjim1u2hpbsytqbe63at7mtgwuplr6psggevzkg98s3nh8qzk65dkth4s97zfhi1phzpioacm2n8jb7ktbmv7ri7tall66zg4as9126rqy4yrvceivdsy3ijs7doi5bklq956rmh3zs7',
                secret: '6q40xh55hor6cu0wi54xo52ji9jkh6395ks0ad50pkmf5cqg9jmre1u8l5b3y5z6dlt107tdst0mchklgnmg8xcyug',
                authUrl: 'q1lkk3tdd3ndbz6epiiona7snfbte8ldcq0hdc26it7yscmxrw1wtw4f1jglpboi1i53qxsia9s7xkmqhygrz3fbn7zrhmw0zz4bz9kw22z4sl8ovb8rlw87iejwak875lax1uhawfyj25uu1gydatonbisn0k3grbjxk3pgbpfelv583k3jitudirbk53dmxkys12wibdx5c66qupomf1ecmfo1doqb1x4xc2c1sdq7r4ezbuwol6z7obukpta9k6jylff6dhrnmby8ln72xjvn4d4t7qahbhzky3podxkwpo89vj395urd28i5fl7ajkcni047abkolfiroti7yo5144yzn3kpw8xb8b3r29j4skne2rv67knrrl8bft0ccv7cte2ceyi4pnm32dypsjsc6fmi0ea80j2sqqwen7q0aagava269zardoktsfvzxmi3j6gbf1aisdfnvsk2g8lpcxnl4xf0c6rvh4caylcqdnl5gbrved0yir0ww3sc2ckke2prmuvoaezxu1f4k06bhm7ix3ojozmal3ag5cy4ezmf35p76kw0nfg9vfiq69vaw7yaz0qec0u0nl1y3dyaaxozqfq7iu7pvvodilbrejyzr2faca92m1hymyr75r4wt88dnw9oxt5clhx899fmx81wb2hklw3cul6gbm98hn1sw42n3ztw875nqpknkbkg29sqtjfpxo5hpwxg2jzw7xc860pguui01egj2qkfl8nbxi1h1nlxjwenwij917al01rd3ebe72dprlvwtgd992fodjna7jtpefbybfy0kxhmoxg9np06o1yj7ha5tlsq1dusmoxzonmkxg53liusu6j4n6uj894klne2nklll0m79wpsklxusfxzbcl246zvud3esdjcdgssntcuus9wb6hg1cx3jm18j8k0v05nk203iildbhae98qnwqifgrx0h9djrb2jjg2zzda346vo87dwblx0anukrrnemcp6w3xtzqfpm2mpx3o8ftsr8j3mjjwihrkgll8af90t733jukpyrkb3cgty2w0s18aqlbsfprh105ne7eq0embg114fr951rzh7t9sdml0tpejnah1blnv7801aqxqa6p1vqnu2xrswsgsqoxl3x0m9owgu9tq5ylmqncv1gv2gq3lt27jrb2rhhvoxfldsjitu5mzqfd7zefpy5vtiaxsdm0lx5rn0l3mqlrmyvkayhs2qezahp880x7cqsnwf2achce7iewiv5a7ari8d9dckpaj6xl9zb105lit3jev5efjr24klulsxpbsxyqrlflf7r9nllpye9xm8dudax9fm4410yq0j7inui525vsx01hbjutodu5dxqye042owm4xlwwsxxsqq3yjimab8yismt8r5p3atqzkpmh8d72vet3kfrgbuzi1ezeinqyin0cy5f9994px1lyieo3wl8fqk90nuqr4pwnh65ngghngmuooeisuntqf12gpl5pr3ea3n24loirqgmsohtvl73qp640qyem08s9f72oo4b98wfz6spwh9gilfnuvvhk2s12qa34x5kfhbbzj1h98qu0rj4sla77o9b6nksb356suial1c6np04u66awlnrl6xlbpqur07f6tprs98dcrk01d7b9s2xhbourb74i5i6pp3orp6lq20po5ffsu5e9ydpfvfuf9wxg5f4osbrui3qq2gbakx257b2nx9xa67r47rkhqx5r8he4gu4p4b0k4z30mgo2wf6tvpyhwgy1xjx1nl9hrcn4joc3ifwnfg1l38nto6x8n93y0x9lcq7ms730uh9fnssqtzi26kzq71u5xl2rz4ph7ynbse45kison6b0o801zt81y2kcz8dk502bjb21valajmcqseylw0littvc9coq9kczym7pejyge00ulkye92wmbrkc70iepmj68ndoblp0y3wu2qw1drvaz6luigae8ozm0nhkhb8kmh2gbzr423zj22pugykatc3selvpawt7xhm9ov0nqomboh',
                redirect: 'z8yx33n3lrxaz3b8841vh9bkz0t3afjmgh5jnikhr3t4h6n9v34j2ely3evd9adukw384gsxu52s937cjyvm3ozibtg65v05j5urwnnag36232047cyabsdr29q3ecec341jl0d7ho48m6xiev8rgbyzfv0bhttlzrt2lnk3foq0st8otlb1lx9gcsuy3n5diootj3lvqf39ug5ufm9gqabuaed1njelxkkt1w7rsncxvjzo0m1ovbw4mrmugxlmrxs345sg689pza0nxhm3kl220eejt5qrqfovyct33unjqioprfnm4pkbyqu5uvcqzxqvle3yq5hylyuiulcvlqji15dkjns86j1dia5fdyfi3kkb1d2ll7lfv40tpt98xr3n54z0252doekb8oh2a3qdv2r86o6tp65zqrxpv7br5wgzw84flvayeegvzgv17aq8v05yuk00au3s6b7iraq6rod23o744l33qyuj9ko4lykh64nnqhovwfz7lrfyo0zp3pow65drfwdiuxpd0ljkv0314oqyakk1hb2n7g41chy3owqrg0l5ta5x5i5d4ae9ig1go16oqjl64jvndzwu6ywq0wripvtwjo7y75xcq8y8m3eehwiho74tpenj5qmkah6ln4lfvjarlj1qwoppa15w8qvbv8qu9cva7d09rr9wg1ew9ne63331otjlq0yp8v744jiwy46o7sdbqomw4bqgtrq9315qc2dt2vdbk3jr345vfrdaeok8lmoxrcrtdrjvy1gvvb6xkpax7ltmn21pxpswsxfcgp0gs0y8xv3mcx7o4nef9quek9y2439wj7d8maem6y2v8l62jc25pzsvkbfe57jwzc9rjmnq1anr6hd7vd0zay0h48juf78bcqejskr3navtmk1377zrecxe1hbjmoqzklfuj472ja6mcliczubhrvdg37zi24ai7qy0egcvkth13g0pd4ou6zb5pr5skorof9ncyn5kqab8654efqnk3662uquzkukq6qwi91eiew9smkqvj2u9gj6rb9xbhq1jxbp7je6ts8l0cnmyy11ks6f35l8gb0bckad6oes5mrruqa1d8ysj1c0zsrcz24awt6raszumnl9xx4vhl2wac4ly1ql13zooikeyaa7qorv4j2s9vj04h104bhji68p7ot05cvh7csods4lnkwbxrwdwdbvlyevheznfb9vro1jsffwlk2mopj0axe7ws200fwelmlj5ti6ufug41kkuzgc7kihioywn0p2w8rpmddgy44k4nagzjsfhsqu61a3zmmb79k5t031rnzmtezibnt0o9gnpomdr79sb43mxdm6n4ppu7l7orffpw6pl9vxtd63matc2dx6hniwqys1pamo2fw9eh902trmj9sr2urfz1xpfworf4n31jykh9cg1mv2ds5janohtmzxd32znp88hirfpvux5bqdredh6sq2sbjf55w1alafwz6a294kqqlwu0d6ojef6w63g9zcnmveec7mdemjc53ilqs4dbgm2l5w2fc1kz84iieigor8wdy0aa6rvp1pldq04oevq0w0g4op4kqgr77z2gc4trgxzvewilmgqgyte53lvvf7ptqwxhxmzh35awxengzoeba2ft9vivqixykm0kdajd2kl1z6lxceidvnwoknmu7ujnfoxqatcjo68vpr3cwtqxwp7uli1aljjcspzks5qohokbsu7oovbdt2417k8vkb7tcp66tj8rqgqejk8id5frprp2jb9lbbxjzgl5q3eclcb08bieefwgyu8zlaue0wlo10ucee7imr2mckris7gnqhoj09vrdzo23020yjz7fgc1op7qt33j8bpysh16tvw1q0c1olqsy7662o5n15zeh8ztzujsdx73o3fsxwg80o4u19llmwuuibydz9svj64ytdmyxylv7ifmha7vaqmxt12xp902dur1br6wdfvks0lk5yvud3bjfqpiqraywaeyw2056c16oohxgoxtb0rbntxuqqz',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8151449308,
                expiredRefreshToken: 4237151706,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'PASSWORD_GRANT',
                name: 'x2fm9sdlrkes393ctla00n3g9m2m5zbk8i8g9hk8hppvyu5seoc76bjccawh6llj6u9hzyko47uiknjpgdljawlqyslirxyyq8wj0p1hywr642yfzh2kutk0gr37lvqgjemn1bp5fcsue9j16xr9371vrjm3h5ghtoxcasdho4ppjz0oh8y4lgpndglsa6jg7hw13vs258nqbejwbflm5ds1cgktfruebi2g9x87rv1feu2d1tws8k0qw16l8jk',
                secret: 'vefet5qe7uq1vnzz2xszgdwgi8adh5zbi3p9yc9qot7yt4g8i0xcue7a8wpo7holmpw9oztcatmveli0bwjnvct4zt',
                authUrl: 'h71v4a5ue1jnp9iw0vwbihddfr579mrtqmw8741wilgcznxv5hlzsyxnoj3v8mfiqqpcbf3yw5mmhsmjfmphrnovuwu4256ruyvsw43796s2o5yt1szolu74yssv0nj4ctb0cp5759d7kx4j18iglmgxmdtpmgb92rtknft1r6zxunkaui0by8cymzfvlb2x3t86ginyjlrwib9sm2lpjjpyp1rar6yo98btc830qtfbwhlfmz05keig3m7nh1cba5cwlkk8t7ejnodcs6uz5qnja5dgvwbf7nda1dw4bvyrczdi9bfvgbjdbrrjlz2qtlnocppx74r7zw4m1c8i5x1awwmlcc76wg732rctdb1hr8c8zyhtowgi552iqukdcjvfcg9zqzcke3fpr7hoayfqxi8yg6tfc9q5tv572wzjyy8mzfmzjdgpcht0byx21cwebyjz6kidzkrt4pqiimxe7vmkn5mwjt490afhem7cmw1xhelxabryykh6g4urtvbvwaeno057xkr8uy9q8jeyhyqn75arnke3ayisdtpsgzq208yf5l0r4d27wowx36iiikc89ybmn7zpxbyyanscwmt9e4ziuqfxj2w97quk2gqy8ksz24pfjze4xsef9z5zife378mn5gba4uqzpnv16lt9550khkjxzbwy0wdbxk74qye5why05g4gfcg88106hpea4vx5u90ap41b6xqvs1e7i5zcfa228rhvygqi5jt5s6us4javuq2yz8dzy1w6irvqunpfsoiscd1fqtxgtzl39ena17vi2j5cwh05e1ye7ekz8v2hojazqz82f7o94dsqr1mrqfgjxkh4eqeb7b8mpya67u19gk5r5p639vszsksp6xk0wdkkysronr4m7t6ctqerx8mwbi76jqkb7bxkz6dr7s6gn9u1ylocxq70aikv8cqwoydfzn3p60zwa16b8tucj78o7246hyqxxrcu7srlu5w60try7os61t9to5bgrsrk74wykccjgeqw8j8z0cu8igyk81etumjrywo7yv6xoh524b15xcv5k6107gvodzg62tj8b2j0hyg594pkpi5dxkk0u9ougjfmkkfm0ssmsmfkef105053appu97m7p2k0yzhanq3d1mrod4ehqypq0dcbpanc3nw23bbbqxksfearbwnat6ql9ea2gah96vb5ft21v8w391uzgxy6iy2sql9cuholdp01wujo9e1cdus9uq1loos02dg7temnitmxmylu52ctc5fowxt239mqs2cg2vu7k37nlreneg8kitgt4kbnhdwfok11hekjutsgdta42zfb1zb8g0ijvr19t7iv02tifd0mz7aqffsred5ti2azjs4oqbnj060f0ri9fluhuhsvwrxeg59nak3evk3wu6k9hjvs31ikm8lbjodrrr8w6imvcwr157u5trqdo2tmbkbix1tnewfouzuv2uq4zl879lzpkbwleiim7gl4h4xg7jmrdldnacrybqse0ys8dfeo1yr1wnbt8153lz8v4ii5gkmqbe17udw7mijzphbre6ww384c38hi10zti72pzq46s6trli6gb3voh4b0ylp74oz5wzmcy1y4tbcst0hsg8mc8kp636g2s2rgyx06a2lztu90dxmxcyp44sv3f40ck2uifdn59wrxlwitmzgk61gedayjyb3yknrrov1mvsebfq8qabmpymaqw4tv0xyoyzmqlyl32fm0nbozhya9dt4o2yxntorn5jknjicy9bz529mx7moc8876lsnjen6a39ql7zuj6ul7rpiqog5vbinunni00ftjdnngock3ro4o88eb188339ssq4v4volox91ivw4zh4xsptdgmq65c1wig3xdbrx6n5qaauji893on4kqbkk7212gf726g9ogzr5qvfjggx45zdrlb3se2p4ylxqdts4ngbk28fkv9g43yjv2d5djbad0dkbbvhvny8wg2lwl14eenq1fgzhha55a8fijd1zh8x8j58qmdi60',
                redirect: '7e861y5ko9p9jaxvv3o5npl1h16nyfx9imhtx3xg9u13ifdnvf2hr3y6229p0t5hjqmz1ryp5yang5btqsj9sxthejd330owo5tg1495tbhvb8s4cdrp5l6y62p2pgbyh5akvg8cqiz6ekdqzww8gadcw5nh652l795namzz2bnpjooo7tz7dyytunwzml51s2rtxc0c8mt5dpmwn5ame09h9xw5dzkjlazrv08birab5mtgy9501t6mp5dhggd7m4h92w9gra035ki8rt3kbpu6m2jmcmhjhyxhi8lowe9zluwrn5dalncniwefnwo8zuhartc2wuxhw77jmj6ur5t8j5od41o3dywdqp58hg54v68jpyw5cftkqbcs2581rxcyomnm9uix4jv8adqt454cq82l6qhiu7dxr26q8d4gxbwytm1f9r6dzpguvxowc7h2eav6bkzzl44drfbffa4gshxy2unkndfngl78y3nx11b9ljbqn1gshos36lkzgdu8fvu1m3h5dfcadn8itxo3mj8mm1protha6vb9mnr0dffgiy688n5wvpg5z5ofcu49o16xcjxdhfaenliad7btxa7raui83jnexplgw7tnnmmcb5stedto15tv9aewabg3m4972f9rl0pqb6o9zieko85iu3wa8kae9fgam2kwme06jkyavnlpw143y25g5ypp5siafg8ts4325hxt0qt2yrl4hu79z5vpuw18cr1e4mgkdv4e8w5917ypgpxuypgguwg65r3fuj10q5roaybtklu07zynhkvjfbwmrbgatwyoc4bxj4pxkzvjtknhjt0vxiy37ndlfrutz5493suvko1g71k3w5unudd2ok4pcczvap45lp366ywljadnjgp3ml0ks5jvlffypc5macj5p65x25pfxg8hovypxayme4sq0f6magg38w23omtmt6win0vc2vegd2k21xhfzxxq31wiokqmg5ytxn6r1kolx69jm7y6krpzwcd3dbzm9jt88nst0ipuwy5wth6qcqw4kqwbmhloiklkh431f1d58sxljfmzm5v4uwtzvuwc3i0muao5zht8szba42qy8hr1wm6k264g7igp7pdwfav67yacelmprzkhiz6ldfq3w9np6tg79fabqcmo962c99yn1o0fqlzwi0nhrdohsrwp93noi31rbp7ctkchrqz44s61njrb6cnqy0qzjdefr4ldb9dsxdlyuv68wnioh48vnv3zc86bfi871507rcvw80rbrfaweimlys967kux6vv0ghh0wuul8nzrnw6pnwt13bpw185mnh1or44cppimq9l83kqf51vrexjft86vfoeycom5918q62tkj9ew13lizh80zsmzr200828kc078rna0l64etkzaq5nt2ijcrnf8lrz8gfnpmdc8d5du3ryxs0bxsjz82rbpx6s57c868wwttls3phwnt10swsxbobgcgfu07b8awwd31y2ofi098qa0ckzpsuttror2t5mv2e9z4yxgxoq8pz5a0mrsg7izxj5xde4sgben0wfn6w8r0c1of51zf9dbrkddf4jkbq0jlqzsgyhg0ezpb6jg21mgkara17rtcoot3ph6yexf1xhujy8a7224sflinzv8uh7ok6f23nnoh93zpqzdtlnv3ppaaalw8diklulqnysgs9giz1z1ozudz1zwsg5aa1r2ns9tdxwl9j9oru00vzet5dkwcgbqtuzzltkkggfgi9o3xm8ex7js3wkwzp7pa9ejdb5f9fhceilv2cgk791gyb7158q33c7h0c2o0x9y7xzpdcqpph03zh3wq6mpgw020upt5ggtl6a7f0s4zauydxti0ji1msrzhzyz35fb147tpfs77nuy19ho9gl4rosfsmf1xlfcvoh1a9hzktfj5cld9gcrzb67eeegrjscodp6wph3hry2d3h5xvv7iwjlxsk527ye7o5tb96ozplr2ifzdehujwfy59vg4k4vkdcgteo4zh66sguqt67r',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9894814519,
                expiredRefreshToken: 4053894738,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: null,
                name: 'z5pkvp3e4v8mmpko7cechs7qai44b8vjfpqvwisykk9vk3rpktq1wb66xy1po477hua8kra7zzb910pqd7uyerbsa89amrtgcl44vbig0jo2j0xjdb0eugu3kcczhttkh2mrmf5cmvldiz6g6y4mrbkbsjskjc1xglxy0cyug2t5zgq9ms66v5dd0bgo6ie991zmqe1wwcz8vl9hqhpzgis03wailml3wpnoo3mh6uj8ge11k10i2f54q959h5v',
                secret: 'zt6t9ixcgi7hpz0s30mmmlaq4uuplgkn420czd3nt5z967k9i11b6sv26crhp7f3gxrdzbq08nk5wx262gp730bmpo',
                authUrl: '3ncwk7asv0r582w44i25ubullef4wm3stkt20oxehrhf0oyvwwn1v1va7a3b6kmg20d22enedg5wli3ihq5juyqvlxdgnha7byabmfkmgx2imyg262vdoo66kjn85hrax2rvy6ycljene6lkrmdz0jkpj2m5c7sam0bx6xxx7opwxfa613n7h9sq8m2gjgze4j2gjg2pfvoy4dlrb1j8ydsk0xqodg0dn5ryjzulc3rp453n9h2cx80u0hrylgp0wuim4nj6hk3gd74ip71omi0alrjsk23125md1pzme7lomjh13c78mccarqhf6gs2n62accvsesik4wgzp5a9lob3iu3ia1ltznf01f1p0nb41xl6bu6x73yrd8zpl5v8b4atti3nkysbifn78g7xj5rws10d336jy17b4ox6ogsol3m7vq4vkhj3ja4nxg3tiahn4zpvsk1rlxclz48vxapzezjgcyz5nwejicpaq9uwg67yi2pv2dg6nr7ngkuuifo48qqfz7kzy31dy447d3xgjfvl0ba4t4omdfygzc0x02zvdj7f4w2kocj2yng5y8ougcwsdppc5w65syp1atgd6si4j8qna3emehp1lfaxhtq7dy5tj064skank3cago9mb61vrvrsq8receh6k78dm4wxptgnwe8qrwlsbvx1axah71g84ucp7h5d4njk9l43476avadlms1i653lq90aweidbfns9z0cesc6zfcgdubfy92lq7m758vl3sllvuwxfmc418vnwjsqbmgtr1mbmtje8vrfd4lsmzn2olxbx2ql1ah3wsllkiyrw7tzytwllvj0ekx96cfidod8o44mtsq1t418z56i8axkwalww1qcd9bcwlcdqljcwa5p8an14op62lt5103lueic2ulwhk4uv5x9rzdvcgt47j948w4iyzotf2m8fd583qp4mgyoz830h0mc3x55qrx4ltbw5bho4wneqo4k2r4udphwvp35lu8lgqjgjggnc2wzt39ht8d5x68woltkloqomb8zueo137z6v2mvvpmtu2oiqqcmgp8tjqz840t252bnteny1s1nq8h9axzwtilg1s810r48awt7uf8atvbd00d0w3vhy62l0t70854qbuxnt5gjzlcsjys3dlsdmbu5awr4t1mtd9q2d1bp6f1gjhxncja8xfgeq137wgsvd8tg2tg39wsu898g1bv0s5ypwqjqht756i4gomfhkewi4fx0661yweiumo0xpm5838gsy29l3rfdd6swfqrgvvyk118enjjz819n43gdfjdk01nwrdspikj73d2nlshidh3u133i69oru5dntw61xnuuv088p2mhhk0k83x6fgnaxmecsfqpuva9vjixhg8nxgk6cj3xrrsfap2gz9229zgii9251el09idj3kjpdzvwcsagonbco6qlut5pa8e17nlcm4rc3lla4iuip8guni6oshbk6n156ncri1cfmae7hxzb38cb33wc2lstrg7t1vi6jlidw9mey7sdofwx5xz0o6oyirigmdvcrz4b1p1tvnpccl4ydxyz14nszqcrr4w89jo38mu9gj75xsd1vk3zlsxfn9xu536vwjnosu390efzrztyepw2ai5tguyyo4dvddb73c9gqpmk9qyp29bm63rp3b372j90n7tw3tru6sk50e4a3gi8jd1kmf1nz96ta0mahdkqrkjz2w4tsymkzs43ror41bamtliihpaixzbc4at4ehxgsk4rpka2ssrhcj161kacq8sqhiuqb5yf2eq7xoo8bels7kn1zrwwcg2rvbfgmarcvu5w8256bd41zeaf7v11t20934usq8yjmuqgbmm04slulw9xv0mjy4z9gsi9857ld691wsv3znp1flzlsozcf5b5htmpktcbgyz9wfzhhoy13oc0ffvgogkebvb6dkdcn4o3lku5bfc4l1b2c0ogi2htk0u9jg2z875qb3huowv0s615s0g5yqxi7czf72eiag3debzolzkq',
                redirect: '61djwh2o3yosrye9zas5b0lmcf914vao7bpojbuk1ez2txkm3f7k9v3ejxex771vjniklr8a5oh0yf4isykskctp6pw8ga4v43dcol8fu6nhvtf90pkgoni264stw4ivo2f1ndjrzvr1txrnepqdu0au8wn2o4a71iou6fw4hbdtddjb1p634gb6kbbg6810ykne51jh60evhgpyfcyv9pyd7fuj40nwyx37gjq5camhocf813zubtnawkytzhdf6k2ecl38kgnlz4m8qcvhiowihlh4t1m5uy7p4lpajepcp68r2o24xlxcbn4y3pm0fmidl29218k0frlzffe9mwxjgpecwtm3d4smhm4d7lgkvq7sc8tljll3h7tpwt7wycw07i5h00zkv0dcpj0v2y48kkkemdv5qn38ot9b5ynpv1g9pyz23nv9p3gpk73kug7emk1rk5sjml3ztgjm04lpaxm7a0gcr8r0h4migu4n0w6aprwrurfsra79mk3f6bp1bs80kjpqh9fostiacx7ulrlk42fu0b0j7e8ckc5juk67klg3xlmyr22wjtafpp963ekhl5yaq5kctf36d4fq487v58jypcvdrc0ltdrgrmll7rdvy63vioyamwb3padrq5jw8viox5j299athj48eiov01myyu2rwv9o16xxvga4pjlkk5vcu3ekitq49f9hve7ekwzltgxxla15sahtfmdkue27njodkr3u6uzooz83hy6ckfcdho44md719nrdffxzjjysgxazjwv26nhtgwklcoi0msq0mzkcoeygr009cezmh7afa06nq4vuv6p3kv17dez53kgtrx7p9afnffw7riz59gxulmioagm5myobjixowlz0iag1bc7mnfeo1d1jrwjfnjfs7nl1hwg8d1yawod1pzz19cgbryphc14y74i18bl3sei7o47cw5lvtwmzb7u89pxcrk4uw9xhhatujmybz9kqjbsoqhafbei9bqfhs06k9dlkbzeidj8xm37axzsmha0c7cqo93o67uwmi9yvr1t4s5kbxpdy8hf1mdkdgq3zg4g29twqekrpmmxovx9guf91ajfb9xd749w78xej2gl1t1ejuze7bb103b07p827bwf9fux5nynypdmhocjhntqm6ivd4jsw8ju8ykgwvuh42y5khxceyvjvmoi1j733v3zyqzkkk03mv8v846x7iai27lg5c11rn8w3eyuw8vhiu4kufjcnsa79rtcig8xqjp2vzlxtthjc5blqrxoey2gdta1n7wrq5pt52slk9nmpfkh9u64oxqtnqla2g7eh9511wjmsayqibdsz4386koh8kjhw6izgr24mki6mzkbn82eu1i5d4lkp0lf1q8sni81vqx853fjzyf49du8eifmkamgmsu56bo0h5a94rowxo2ympfownzr380qmgl3tcdf7bn572kijgvxhtskb1674cdoxr6pymhs56vnjsc3zwuce6q8i329nbdddhbhh92wjjddtvlm2jufybrktnb3if7bh8vid667wkvc1dna4z7piwk6fxitx3q31sybb21a66w2nw97h36tnbuzqq2zdqe2gwruhenxt3hiibvleapy5p1scjmpm34z5szfn7pri6lm4hkau92ed7wwdt4cfa0cs9cquj53revwbpnzxmsfxjj7bwfmmlhy3x56c5niyxwsy1rpbwgm4bs4egk5hvh8nylot3ogmx6w23u725ic2mjp3t9iwanxvzmi1wfyyw8h5f7svnecye6k6tbqfht53nt2u77tbp0l1vxzl9cz9fsn26l9upmnbfrpocmotkqzcv02mczr62p4qfklpjdti8yk46bql1tvnwmhohtb2hbdn95jtpkpj6ecxxpln505jw9m0dvkqi1pfaq982v0aoo5dmzxeogwp1apfnyownwt2ff63oaqiqi56u8l8c29e7gesl9sd1z0wi3d88cp4szel5l0sh7p0p2uiukamr29odatok3go0qz5pn8l9km7',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9177385016,
                expiredRefreshToken: 6678676499,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                
                name: '34hpzm3hwargdqup0a3hu7pb5mbs2pl3yj5fo7nya799wakky57u7puq9v4251uc8g3ih0wpj7hh9jmk70y8233knu3z048jyrljfymlivouqqops3wgk7dkwgugoju8270qissif1z0mgb294dj6zf209p5xkmgbe1ectlocdo5x85uhxixy2u2114b7e7gbkqjuht83jjw4am4pr05drlw66gypuprl9k7u9f9mpvo8l0vsp6kyhc6raa0r1x',
                secret: 'noa32d0flupb3zwf2evcdpxrm476gjk9oe1redwomowlpc6ufq7mcbf63kir5f0dpretg5no98y4m1vickladzc0ok',
                authUrl: 'nycrxvik3svx8xbsak4y02mf60d0tdjr3u28u7td8njuv81lggl7ejx8d5fue61wobdbjstp7g8b4w91tfzbdnjokrdiu0wcvuncvdnh0nie6dz30m2f00n3nyrtwqrlzu1n2dgh60t2w252fx2mz87f5rcd49jjzwm7hjzwhrp27zhc9n6cmfnuqv3xb0rd3344n58sz8zzm3i6rbsakzkwn8uj7wzbbus9wehfpjig8q53gizki8wwhxvajpxsxqcceyz8b999lh84l3sc7r5h8100n64hqduvmcwa7agspbkf7s4zv38c9rorv8spffulr23z0jqq0p4kiwz7poi5a1e20mk3wl13vzszwuikckwx0ezobzwu8vo9q41f3jriwhwvmkvbq3awd1208phyfbphri3phk9v3p3hx9kenc8v8kd974m6avtzwod3p0j59jw6guu4khs1yfa1w3ihop13z8imcliea7kdehib37dyx57q0dhq4obdaj1ukq6t0jehm0qvfqmhe5y4yjdl41k8cuari1b7sj1o6eotsiaot2g9p5t2l3ddd2em40dxqaltv66frbi9yq0isvsappp4veknmyum15ni8kq8szbcnlzguv96s0jnir706c0gpuz5ko13p3k2ha1cc1idlaguml3jcnrrkl9x1u69gyzc6tn4z19gu3xug24xk5prrbi4nmc9brpjie65k0m9a9438v2xnom94fz0q4czw8bmu4zbix2l6igo0lrv7iixpri96t24vrpdgduxrj4p7wrzunx8yhehjumd6rx7u4pmuo3qsym406aj491scek2fuud6ams1ysd1v160pvkc6jvkz6vqsqai5084recme8hnzn99x9st65a2grne872gzmu47b99yp3sug6yvdrj6439lb6vuqfzyqo7pcnsiunjgblhfx0awl5tevsq4akz76kolp0qlwcld29x1wh60ietbao71fhj1cgb6ln1osvwpwyto2hcdw4gljvzwrikn17iust5prkxlmn4myk4uw4jnyda8coklas178f04rivi5eqmbrmtlka9lq8bn2ybhrt7zgs8u6r0b99ybjoz5twg2rhyo6xaz1k5ig7pjmqbae0lzlwwd9k2x9nwz4m6r1hh7jdb14lpgrzfupsvrk5dd35w8fhplg786muahshima7yj27gvdh3vffagl1nj0lff5gk768xmvr04kdn7u649w8g4afp5m3398bj37m0woshkpfi23hx8bv67y3s9pbtd9m4frokns0db9yr9mjd9667zv96pw0rqti24jas1w7y64z6sr1o0sdfelhuoe6cq838nnukmf024pmu9m46dbkl2scrir6oesl0uutx3c3mlj2e2rtk7m3dkhhee1rj6qo1cowmedgzmepeeqvleibq5wnrsoh76k8pbkx6wltrknfymc6ussxs20we9knu815ezsrp5jt3nmfexbqkzklxzklrw9szz0iyf18dev6jzfba5wxkcm2qgqr5hfnmmq7edokxp71pbfgjxqy4xvd0smbwjli8yp40lkvn8dc8u6c777uuxor490mb39szcug9inewwei2pznv45bmsrb412hsr1nsfupts6r7n1xjcfon48q9gc56mv3gk053zghm9htn0s9s9tdntrz26u15o2uat2jd5oijg32s8mq3ve1edjccld1emulz16gz37l1n2n1e77mqfoap0wif27i0jnt4ezq2hmikfyvwkxtmj17u9xenic9hb8z164e9go90g3o4vvqk3j7qpzc72psz3ey7tw2mys8cu6wddmy36xm0pfllb3s7w6h6y7cobam6bdjlkg474f4alxq7w2pifbikw9oh56ibcz8m5ol0wmp52i51hzwaefb4k00k3z7jh1sva2971qdqkblabed1sldd24h48l5ynnncpvnuduw9vagpa46xngxnccen0sfhdppfj8z2dd2yd1597z59qptkx2psk7ofpor5ic7vktc5nlimx',
                redirect: '7wurb4bi75pjk3w3hfkf0fnfvwldnrpvp6uorbove7malre5wjlojjv2hgcmdgsd6g0tqbt1bus9f2iohxp8tjrv3fzwv6x72szzjimdpp875j8gvjtpa08ppzovsa38hczm7eqg7h39vex1in3ah3azb09z4rrsytwcukqcr0fluq9k8dijrrwytxb43z84me86pm5u2o6tatgp0n0wn651jwnltj8slcxfl6jd1kny6euj3hh1w52hh38rq872lg7mqlyumbk9op43ggqet1jz6v470h08v4qrc75h0czy9hrafgfi8yk3kucj7cdomzi2zgqpqwiediecfdwlyocf3m8ox5e3cijtzwwpttpunxui8cmabwfpht3ejoc8awpgs7zhipi5acshi4lx8xft346obtgt19yktlqrqr39fkfu0eoahd5neljh87taezq1eji7j3j6oh491ubcy8l2om1s935j0xrfe6ngjguppj3biwo0svpmdpwsjb7e65g4wzxvoe5m8c0h2tipclotscslqxmgokymg87z149b2tctmp2qgflr1nw6gofjqvk3pmdvgy1s7pdq4o1zcr6lxtruuac902625j0q5gzc4od6mdjww896xx6s43oywbhy94i6ni5d79duyuurtjtbxoy4gc67u2gmsd9xizv9ijz2twk9n1m95k13tpr4gqe9tnysqezx1kukp64kcagm3m6bks89qrlnqsqy05xjr79v8t0p0d3w6nx15wst8z8l2bh0m1o6n9q9f0p7db96vm0pcw9imobq9rux19a68j9jt02o7xzud9jq52vulvn60wri6ld518kcjwev41f3vtbew1rmhgkdymejcgzpfhfhxna1jrwyqpyse5wdo57os5mnxrt56cdkblfneks9a7b4et27iwv48x8hjv65cc2fy7omh0yr4ylkns2arj0m7gelv63fzqw6ki2kx2u79h841y4qs05rnqrl4agdsuk8ojyzr1m01a35fw5bo6ptqmjblxofyoct09hezt9o6kox0keg4tm4thasjg745x73c6febwzgiikxbowpw8cv1nff1ioba9q0lvnnt5zsrekidj09n2hb7jl9ix6it0eq9kj7au9k1si8nqmd0i6npq8pweojssyl5p6xl1lwnle7pwk8kedri32cd5q4ohxdubzjp8dtax6gjde9wp6ho3vu461docxlbt22uguppgjixdf87lj52wqw8b16wg3a0u6us4xw8tsw38wwi6c2h0wr44r8djbp8vy7ryvj50suzinitgfrbzzk3n2dvye4s2bjphtwi7cqlqwfdjpwjdo5h70riwko9xdt74nw08vb0ytgfoy00j3fl5ut85myqzk14m8mhlvjt7qz9itzivdenoz4a28i77oh3sf38vfb4rqj6br5ke7lwx1txojw0ttdk2g3s4b2oydpf804ctwj94gijsv8j1fci3rf1jw3y70cnn2zrq1g9q6omdb8uecl9dzr7yc9ni09j7po6vfl5qt87f0o4uko4souf5fa6w5bltb28ilh2ht0hsshl4cpo8trx6b80becas93g49b5ec5057zn41zlc5cicm0lzw0up62twyumjfwhe3b90bc3ftagkndeow8xjtlizuqxvoafxo8x6jlybdlihb1i8zkfgsvkenv8pjmz2jmgti7zv0gjwhun9eth4ojnv7lio3t43nnh4bxoh92m7pak7mnc2tu5zczy7p9ft3n9umb5da5zhwm7w3dznn7jyql9wjwbwr6qpozwll6edqx2twdiadt743x7cpphw32yby5tjnjf6h8rkaxkiivbazepoa3gmuokf3733ix3kohrez7u18krso7m0fud32x6hphxva9sf988zruuiut3r87nmsx8voveqtjkgs3dsbxwyk2kj3o006530rv30jxmzf0dq4gu36s8tk2j5oh083rksql3vtp4tpyltnuh7vdhbw92poez4f7w1y0ygkivy8h7234uqufdusb',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2728838709,
                expiredRefreshToken: 8142848517,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'CLIENT_CREDENTIALS',
                name: null,
                secret: 'u2ikkjse2388ij5sq2sv5do2fiwmyzeknghb6pnn6r5ubchvqhfbtu3pfhkb24wjhny34swcpq3dta3ywbw3wgydaa',
                authUrl: 'qy3tt6k4mh3gsa5xde58fg88gffyd5hdeg6lzyf0erhvhwwoup2t8szcvu8dbea2mb447l668r2cvj17odv5rcl4fpd461cvk76ml4t8ia34gsvzusd9g1k8dxhkmexbm6j0tjn8sh1m4yiwi6rhms9ex97e9bttonxsau1aadmwgcmfhc7zp7gonzv3qrkq79if2y0lqaos861ict5y9wibhtyaz1em07gsrzxmy6h457v6nlr0tbwbpet6kloevgn525worrtbsy4qhx5pdaqvx6rekasdooveyxp65pzi9kx63g7azvjf2s2jkbiwb9zqmem89g6lcv1sywfxjia3ictznil2mvuiw25lf6qct2e2ozi5w37snyqy7prhd3n3xuzoxwiag2ynh0p2arxwvd4a3s0u13j9ln2b98c2z4axake1mrtg00pabw8x2g7neyz0af7u53qsb7nqsropvrvqbovalduhpsfjlpr03p7u2l3dpp916635gq8y00l7bh2r13teom6rpu74m9p1ery4r5dcjgakdqtqyh3snrjyj10io3hfn0gmhl6g3oqpal8cqbz94yoisuz0g9xqfwiz2lqqf73hkbsns2b5b46ymeo4v6974oa2d2wi7lj75f9186xlrvat0kymeemm82agu8xvaok50za7cqe71xmjdbi0s51s1qu2dsfr354qxbi0amm17u0x9yo64xx6lmsxpq7txvaj0hc2fycelv62t492j8m9q5khjc54onto77v5f0i9ptykk72sdrxe7kg56lypdwtw1gptk1uf8vzevlle3ydeg4tz2gvl3y9lim0vh1822ygx062abau8kyyskxbcw7erd571s32oqq2a75jym576rdbxpoive9jpr5dishnz73z0urp2ujfmouxmhm8oq77j73fyrhokvf9m6zppnbj78fvjr080cfw005pf0yyano7wfdl45otzxu4s9dx7gfh6474btmo2orevuwfwia87zwcuq7j1y8hbatw5itcv66aza3b3rond38bxt08xhwrddfekzngyr4e0o81twx77m4vnkv5dwl9p5r14kqc29qs7x5pryxkc8g4i62lnddtwqve2xsvs0jj1tcjb8delvboglk5ea4uz56vfpwim3utoywj7rehxyylevwdiajj4xpx182pa8xurdt1ynza54aad2cyq83wxfarhbxq8s5fx78trj1q33v41mcvc9tkznr3kh7c1t8db3rufkw56ov0d3vdotrd62ghb1wcgjr927f23le62bccjbjx427h3e2a61w9516kjpnw0wfnymsep91lfeyjyote3l7lrrgclkfmp5can6eekktfzg8jetdlwxv2e5kr1dt1vtvgi79d1fzgle49wi6diz1oyvxvbzdyd6pkwdhf468cop9o7q1z94wzr2eg6g28laim2935miu3wqpzwlches2ms2naoqpfqgxc5hxgyr5fu4rmkcsj4t4sb4ak9580grwjxb1xjlvzyybyb4vwo8lp0gcvk95eocxvazklhco9vy2ew4rwrcg6bpnd0uyq0goiueargcc580n4zexf10m45uuha04fskr0rpj5k52ba15qudkdynifh1dqt3b1qd05vqugmxkcdqvl9qpctr9olxd7esihgrc3l2384pkcygf59u5keg5qbthfrxzavwli1h6ipvrwsrzmyfkcth13f22fc2aeszgqu3xlbcvt3w38ooz7c8u8xnxwrvghgr9dchqx1gw3vu8ve5vyjg9lzk6e2rtbi2yptlmf4wmrqqdtxelv6sossatidax52cmjmitun55cbgopiaasfzwa800l55ivy41l21t8pu8wici871zsqln3l9ybmghdcu0j4kgy48m9s5pn0qf4txb5lbtrduj8a0k0a1a54qeokvcw05ep543rzp6e2ve9tdsq9fycm6n6fs1olzt880d4rbq9xme7z8m4x182t6p8k5eyluxbmqg9sqrv9tjbvtuy14rc2ex1z',
                redirect: 'x1oookc76pvcs4s3xuvcdudbkq32232yrc0h3tgi8kckj3viagv66jaxwclkdyqytjx3oyfny7daizh253s39uyoeypy8kqf3ocxmfi25wincjbn17mcrft47c0k1ro2u413zzfamoxus1ecklwj4210k5iqab33thf9ws3pnih33c0hajufmxfiofyd70ioam9n11ujfefycqp7o2g87ji9zf30gc82ub7ak61ub5sy810n9a2vxwx2irx23enx39izt74xoj6nq1o62apvhxj7vzs1yquetnpe58pnom9bp1ltrid060b8w32m0ukrpcjnd121h27bh5edqe0d5eftu2fdtke33zq6iino0wn7qgkrg8hug0ioft3ln6brj9hkbrqj7fhc081q8imtx6q0ngfy7rgzphyals71rhpgauq9f2nkvounypjvpxzbcidkxmdl8nd9c21x2xzhiudjt0d2ulidzl303moqa4l1mgppdwcpoovod59dah28lch051hpiqagumbsqt2ec2krdo8aj7jg97okelzid1m9zgonmdpf7jiry8lfydpziy5qr2fbwtq91k5bb23v1l422pc03dzf74bxslv6jklg3ch9y49odbetpmgl3pac749p4olt4hp52yn3q623x7e1mumi367vwalg3xdgcsk1db5fzlzkoc7mssauk20rssfni82775j1k22c4qqh1eqnbuvnwicabajneciyjlw3yfsg2nt0ucub5xpat430hat0pjwiquooerj1akxifyrz3fyz2xp1h177qeqtnm4qnjzb448awbvsji3ufkmx2z759gylrqug4cvhfec5y1tx8w9wgth2peka7a60hgsikdt4y3jtefams88bpz8loe96zet5ize842z440d7wat3wzlisymosw1k6ct4fhus15tb5r6oqrq827rai1mueyygosj4hf85uj3f955uiohptozqo2pyooyba2mr3h938gnu68x38pju0w53d6jxp9dkjqhcbbtbo3gvf7blw18u2zijtmvblvog2vnzuuch0trgijppzx9hx0inb0c7n5mhoi82p6f15s5hhb8ylcmktyav5ae8ebbndm97y7y7b536jmsj8v48lxlil9yh0jdrzb507e5jnzya4v4v1lfhdhb5q6mv5bhukgxpedwb70apnihrbuheh2674qxnqubky8d0k3f8gfwuydflxgnwqmlwufe0huo4lfer88um9ibstlh768ioyfkyhej7nek5yvo4wviwqvmh87744dtwk0oall80n4k1f6l31erf9rspx3intqa4ig7p11phs3jtrwuvyn6y5o9mf9wtxzc80deln7zpf7snjcq1irn2e59yl15lgvl693sktmush7vmpe24ncdazxcwz262dhjjetok8zgggvkin3hv7clofhy912gspoj4t9uixt4r45u7vhinl56mao72mxkuhthhymme4gwk5xe6ualfar6k1qxkv8mh3ameon1pdgybx5nwr9gj6onsr0lt599s761rt1y2b7z50amroinpiurw4bu1xmo01opp82a9ara108lzlvqx1v0jiwwl3m74j55aa43cv1dbb0nr4b2jhrw5e87aqpmnmc4f5g9ga5gtvlsaqhvyxbm8s7a6c7tfj82gz1pe0avn95s54qn66doa2tjrm7161llnmtgntyvbqz2r6en9krknj5bad2mw27hr8p1cusrp2ngls69p5ss03oe470aerfqj7itoqv36oxbf5di916omm0iu7fvxktx3w7zaquzdrzmuoo4q9dqb0pamtgmpmoq3j5oi7ryeigvgz5r1u8ciepg3jn9mntgrc03lh8kbj2pf2dn96sdngy3zh2q78178y7j42bkj39lehj7q6btfnavt0eizov388w56w2x5nkyirm24zadvptc9oemd08yw8niu1emkp7at68l5wgrqazrvhwloorivxs7hzey9ei7f19c4pgibe0n2yby4wu0kcc4olqi8',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8305043560,
                expiredRefreshToken: 2092817660,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'AUTHORIZATION_CODE',
                
                secret: 'v4k6iicu348laj88p3w1jng29fj4k9jq6rba7nygftwpqfv4p9doli0zhsdyguqor7ta79n2hjsc7wtgmg8tqmsvqr',
                authUrl: 'kngvv58fxu1m2ypc1t6lvyyi9l5ok5zpagsmycyqi3qvxoz2hz6at3wjjtax2rh8ir988by18k4akplwywaaxocszx5ewrwy4ymtq28dwbw6dd6ngbs92649y1hc7cp223fuedinrju7gnw28ekad90ifxtvpm0dwz7g009xgee0e0c29htzdbam988tp9fpfsysqhogx8bdsj9eqzai1euaie0dfpwbiohtvcp5qn5swiax3ma3vlidn3edvjtnfhswgi45b948ocktb78kwu78dtq12bds4153j9vhqdadluup31dua96cgkoqb2asn3hci5docpg5yb6osclvcjlejvvtss17g41ci894gbic1zcc3aw2yaep826dab5x8au4flko6cc1uvzyc4ogi8gvb1gk47qhd3mg04748ebkfcj2gga9xarnpsw5bbehzizeqlc4j41sbp7tztwf6u9dm090954e1o5ohty044rkh5z5b1gvriccjflxe8qp5f1e72uygijvc5f286pircy6ahrn86idi0fgvatvm0bkglcylky0tg5p99vm3ryvxot56xc54i6flk5xu8j650x8sy0byu2zcauwil4m0gcc1bdnpnts010frxnhdm9xg3hovz7grc4n7ym9jh39t191kf3iij30rwes6nzpqnkx4hg6cfziso2b5glyt4z4fhcojh4hp5dbmua7lmsw3svlbfvevdv4yd06w59unziqnzt9s3sjg5wo4a3drom9gbe7qko43sw08bjklkp37218t3a67t7m0tx7oow2x1wk001pg6gq2brmhodlz094kmmkmor9fdyyuo92wrvq7pj0hu14rup5b915l52o0vb5rl0moiw1tc55z9qzcj7kxk3hpf1445bnj34xe2rttjdd4pk804p5xoo47uznyovbyrjwwv13juhs5dbx5n67ngay2c8ohd14flpqx6f7hf9w5lr9pswx16w2ym6306uqlx7ql7rgyo5x9vjes6kdf2qi3l3r7qkpxpx68vuwdjashrau1emel9sn9xgnnqev7z37zam8ytefvfij4sl38j7nbnamxn08743ddlt32bwe3y4v67xr9s1txfdw7z75z3zenly41zo7cpar8mc5olabjwfhrljg7r9oetls2fzc22zhy4ocwwk9q6d6838ktf0fto5l9uuiqufw8a17moz0lwy2eyftwapfdxmglovmc62l8mhtnqo01hc4v83pyqztgjius1etjzqompmodjem65fuhaslkb2x31ocyx4zrg5jsbjr61jl96unvf1hq66fos3nyto7lp4j5b9vfgs2u08s9jmosza6p3qdx6sq1muust50cym2hbmitxs8v7bburh80uaevd3s7cj90qbja6wzxveowcblk7kjmj7z3yhvbmf3vuoeslkzy5uo8jgvopnkx8yxj1zjmmkzihsk744n6lg2g1epy52fvrlof5o7jdp3fxlru9b9loxd768wlwau5061oxvgchq7lphgbmpcaw6y9azzzaj4c49f5kkttycrjnt3zb9vyo30btstykpl2c8upwtrwg67afgskaa5xdcxy220kvgteyzmkd4mb2kwqjvi3mauu8uqpnpktcfvokrboetgb8m00lgo0d3ipa3a6n6hfdent5bn07x32jlsnm0qfrl9amr6j7z6lanw8qw8zqaoq43k5o1tufj8mo9wkefefuesepzrs4cblqut3xyglss1dewffvubp8xztmgx4jvzi1zwo69kyuncg4mjp4bc0yhte214whpg352pfsj9a4dyvfurlojyzzp6yemkarphxml0nhmhnz8rq91dhckayw1cwhyrl3d7d7nkmvb433yvkcbdrxsev445ff6nq0s6s71n8ne435wucvl2s7j6w95kwldcrddnz9oh3hdvhfh2e39jj5zvy4phy3lcdqwus96dt24qb25qvmzd208fsahzsfwgddgpq7v2kq7bxa8cv3maglmw5c8d74s0my83f65t',
                redirect: 'attflom8d5moa4ju6sw6sb6uzda3qs7b0tmm4c7g541g5y5ifbjw5aavi9l22m9hevutni6dy0j2zb52soed619ggnyl4jbes9xu2evmb716h4vjkaz30v27u7go62zrf1ney0sq7ik3dp7jji4remxfglmxattvi2ou41hznzhdt15rdhd7hdcezuihtqlxbqvaa37v3tjgwqyaak0svkjb0y9ur2fbplsnucmlbro7sid2xflsppg7yv1gztjdxt6rahza81xvp65ed1giac1rzco7o47qmlznhcsznhf6lecy9z2ab9ahotj4li31019b3t8d0hyfwewqrhyg8v2a6rvztlodxa88ar7yntsswjhhlgdpsh6jwdzkly0wyosg6tckfcj4ll3q3i5kr5rvl1uub2ec3cv5907m77rxc7m9xfdtyqjqulazlo5rrlus6do8x1p9go8slscrwr6j2h7z53t8z068trok43a5p83qsrwfrz5mfnxmp5lepn3rcmefjrddip7g8t1jimmu2fr8xlfkay9bzuy8s3ggqaxrfhlpadt7q9p7xsjnveduf3p7t6dkytanh9wwhaj5jrc0j51se29wzhjtlap297omjidpz65m9vj2eje3raotw8d38k2usy93k811rnntq9m8rg07w7p3vynit2ybuqpkfonxf5vkq10le3q1pmaaugsu1uwvuf9xo2slcodiphp80fxp0x7vq8bytbz5wd37ohlrvbzd7hd2qfnj1bmhvt0nz5ufo4bndez0si9wt156hll35bw2w80yy36rikwmru0r1m72zkp3zlqxn5mowosiw4ntc4puuzatlnyrhqp3xgx2t4hewqtwdrq3uvutx4ozys4wtq5reavrjrpcpn8jpro7ge4or68lk0ylwc2l8uy83iw4udyab3oufkv75ec40o183x7yl0ncjnes4389mbvhf6l2x3y1vy8tjeirofkcvd2n66c5vkc7qkbsrev25fdomtjrn185b6wlnicqsk63m4f3xktepukxuykr4absfxhu3yx59a59jne0tnelrddoyuyvy3mg4dy02f9wm0yb2x5q1efbqw9k2eb8zwnxfxt8f5dz2m011wq50votuuv7km6cq55im44qk846xvrnrlqrlkt40m8q8qa87ehv8yl80vwd85eiwg9z5havp8hx6j90y7mucxui0h2ngobd883kgvxejt28fccaeaw9znbk4auy0rmw1x8med991uutwwfck6kmmvuxj7ojjpcqljz8fr2o6kssg52s27yc8wclg846t4zhm8caic25an4arne3dkherowaw898hkak8nr725qwywvgviucre6huv162b4e7l0lymnq4phhdt2paqs33zgt5zsmnohs6eltofni5d0kor9xvj78nem4i6kp5a6kwy9qnxuvyboofoy6xchc5oaxn0piiqt3g6j4d9wwaolaepw79tii6em6saim4f7cgy3diebixisvt9dw6j1bfktmlypgj5y4yeevtiuxxv5vru7yargqtcs3l1khaaowep1ausg470uh73yvlvc8jl9fprcwp9brd1ejq2dmgo4oncil61lcuggnvmcpj2bz1602khusrm2kfl1xixr6lzwxxszyigggw47ax7yo7tapird2xeyjfxuvyy7tyuqv2tgte0b9hhp3b26caoi4a6kp5o9dellxmjkyi8efqv2xsa2yczppb8stxjbnelykvfaqm0gvt6lso7n7sw7j1s5tbtxykdw8zhvbcvcwavtbtwlmqk34g7iqh6nvo4ll415riyix9blpx6vqcqundpr0jav6mkouqamobo63csodmfjv8p4q90g8wgdnl8o6q7uikzj95hnwcugs0wnx4x7ctpjrnmbrq10mg5adweqk6xqwpjdic1y9t16l8dzlhs2vv9860sp34xts8cwu5z6x0038gwdvz79utyxormmw3spd7xn22xkw0cert6yd4zf0dw2vwr2pzhwj6dbefjjg',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1089287770,
                expiredRefreshToken: 7686997671,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'AUTHORIZATION_CODE',
                name: '2m30q15duwztimpuazafrfnyey7i83wfcnk4n99vz1oy9w350op7qr2rwyzz0uofg00bxot4irnjiklbk46bcberdkv1ymnytimymmgpta6s2jp6bf6og5orvuxc94dndxkwt0zsbi2vqp2zxnjv52n0xxdg1me9nhv3ld3m0pfij7phevl56hb50ifluxboli7uyt31vvacdgl29bgxikhgklkk589rw6wk6np08c5fxozyv2s75u9zo1dhb6m',
                secret: null,
                authUrl: 'hohgm01lgzf55t4l7q359tl5xsezpqu5eeuso5w2rbnah7qdj7ppqhw792nktrc6ha09grokxd2ru0apgoip5a7zr6l97ck1p739rdhew2q5bebuktzq4az5gabbhw1461aeiusabn85yv9vju70c2q8jywl4h70ol30etzvsqdkk842k39n19geaa6mzc0f7zp5w0m2hvi73nytgxlg3oqoe3rkhkcv40qqms1qhufxc5vrgvr0jp21sasftqsfkxqqm205kavr9dvm2bui5cxlpqxs8j7lj2sv3cienyq1y0pd8236ud7t3z3miho8lowj1muny57e22c61j7mbapdstzyqksh74yb388jyuis89e7l0t6jcfkue17z867l6kknjsbdoqtokf8vokgx4btg4lg6uxqef6i64xhs16c302h3myyo6e5cpraa51d9ecat0pr4lkma58zcdazrgedo07d6j9cin6sw3yvrssa7arv43dpcytsvbogh3oek2hou8282n76lpfz8v34dtnhdisbu4labccaz5v9kjtnachy86tizv0in5lleryev5xt53hul1labczqfrl3etyml3n5s8s4cj2fowe7pnksr1xrz9icocydiubim6s6pczwgs4nuck6eb9kl7t7oa0yz2utpvv24ycxfvqlinwhn3q25cj00zsycaam3exlu6r2zpp3q30ja32mkk2i8uqcshjb244wrq5jx0mgracsl6pu4vxaxdbua8k8dwlo3t1dtnvdynmyoouqxtye2qza8frd6rjnwa8fkb3r56is968jzwcrwdr93obzztxn4q49pkb703j8mqv2dsaa9jwtzbam79jkj2p9itgslkd46n02oktvlioqika5l9i75v71ufe26wupgabggl26zf0y4huns95mi1mzi5i1oqq7c2he82muibf531rgf8twahm0f3tyr4ft2vrwx3uf722dosrzmg4cv3c1wli21jnl24f8qbb1iedx71zmpm5jm800npldqati2fy8tzz4431wynmyhso8br2cpvkfv56h9gv1jzrvhog6j536rbbtur7sx4vxc70967ok7naimlhxqmslhyiqwe4gnwtxhahr3k6s7uy9b059cm9z6y5vygxx3o3fd3zfb1dkwu8dbu56um7v6nvh8uyv1rhmdu81vzc73cgxkf42xg6c31hyl07abltswmi3wwsajq1b07kfvca5tgjk86vfnekn3pi7jlhe4q8wd0bzwagb9jt2apfzr72ckqz5fwncg17wlwa7h54y1qodojhvb3fke23zx40w0amvj2ui2ddpw2kfu7uyydtr1w9agmpieia64t6wuwxptxu4wb7v1a074zhqsk1rt3dxdz2ecsi4pfdn7hk3e5b154ul974waiiz3qrtsd07r25t6oc1j7zu25lw7htr155sc3nbvv4vqa8abm4kdkldo4rm9wljgvoaxe2nng4zr3dmv53xpnmzc87zujxwssjyfjshnp7nwvem5sf2qiiboeci9tpo2j9bv6ecg7a7zjhk1omsovn0moefeyyvzhl5x9wqlge66ls933aqenqg63cmzg3a6t8ndyrlh6ib1gm3ny282u87m9pm9irxyxdiof8bwlvrjnlc5pl5kclyc5azhhvbst4ay85hz12som6htfx9r3euoy4575r6k5ekw089i1e2blc6cocs2ff9ari1kwje8w3atgwzan2yy10u7ozzhxhetzkz56nxprmrzmht48f6dh52euwxju8yc27t2e1w0qufe7c7331mztqjkyl9cp9r5grys4p38qv7145tablfrz3757cilaii1vk3drjlvhioayt7pf1pvwcpgr00axkze8n2ryau45q9he3j7blgdt647c2qgndh9x060uf33er68t7dosrlg8rshoiacposfeqbri4lyr9zmbeqq2t5422bga3pux06st65yohgwxe1qejt0nv1xmc9rhtu0rfyry0o1wtt7isdnhycv6z3ta6u',
                redirect: 'jgmal7myvxwug5j20pqidhi8b81ybcswcj1znxyc568a1rl7kdel7ivnhu45ps2w7g6185ievh6cbr8u4io4wu6hixjez9kr0uhswo9n1f0bscpfunoldhjoh7y5xlgl7x253m8yqs38vmvbb9l3a92q10htad8gxatwhh3r6lnezh9o6xcl3ykyf8qq8bzw2an9vgec1ny19wvh6igl0lgcbrq06ustn6izpvedgkohskx7xzwrbewwpy1h0cxe69iy1dl74av68nqgoodldbqv050s3gd7wqghoe9hdkdf6fbzowkmdsn8ubn4vdytx228tknq4kme1wh7wj7nkno6a3wqfjcu1iil753yha8fztoskqlac2rdcvkgce5jo0qliluqeh1480sb1dboupgz4c8xbq5sqe8rml9kls0r8ciia3mgdp8arvu57ylsqs0qmkm4so9oo2qttifu4po8obaicpnpk2p2ynj97kc24eu94rs1ngz9tvn1zpoqytwszyh8hg6c2lticgx2b5g0xxlqegxg7vescs6qt4vhkjomcz0ol9vbk36you69rlh5i80m7zphp64kavm377zobw0c6gxiqkrfl48emyy215d3kcet8u87utzk5v75ozwkplorydqq50ifd2pf1kesyumdr8egdsinww1p600xpc3orxyigkuwy8nkvwhiz5cuud3lufsgko0wxgwovs0ht34zp309o1s3bymltyvnbas9jj0ptwlvxtb4lbe6tqj9xy4kar0h7354py7etau14r4qeawisrap3aag8kw5d012kygx5tislelmhvvx9f0y51iqqtyj58y8ojt0k9na2hyrhhtwlps8hl7mzk8kk89u45diuctumt1ovztqrr88ipwj2ttyweqs8sii7qv47m5bn0ccocvoerhl0fg4eg1bsf0jgayqx27ezwwdhafhcuj5omao0j194zdfqv5s65ivt9glg403bnueijv1quomeecsjro4lc1bkcr0ekegiee022u4ln1pv1vebfyi869cf83y46dhw5waok0ocznyjzwz5fys8v5yh1vkswzca44auug5odgn36fl7p55izujphto6cmq7qkeifiu5hrqtmsid8zzxgi1o3qdzwxuiku4gwrivn8arnlpbtf8xgbornkcv98acrwimna46g83nkpx5ltzj0f51qfblv62auo06fb1xn64qs757onkjk5q8pvex3sj7yk83gio5o1ygyegaxn7mjk5lnwqopakpjyty9h2z16yb3g7ai7iiwh6lss7b0uwm6bwvxe4x5ixuy52ikddnefrtnlbmsf8s5wr3n6u1gyi5e2qdthnjkcn21iihia6w5fi26cqnpaim36gyvfcpyoihv5b8q4dqs911tnpzryj6l5o5a2pt9pkgr6w0w0gqyhjntqcekovt82qmu8g7ul6vri4zzctul9nzb4z62la8dv8hk13qgnav36b8xumxi490nod1jobwttdmnoc86jk8nt15kf80dsedr53nyo30w0uftua85po0vpwd32zjxl6rxiznpf0e64ieeqfzivlbc5bz4ucc5u9kin1uhrqwcm8uf0la4a0l0vhe3pt3qdey6pvismaucbwgf016aweojvqwikjfc5fp197jd27vmtz1nraex3gcb5i4npyrd99qt4lqhaperkm4gvrukmrli22566uq2rny6hsawle9kafblevatbputz7334hrxwpfctcyh5qfaxs4cyoqysi9qnu1mejc86gn3zyyn7ipymg1uqarsf3vtrk5jl0q2bic9a38oql4cw7rcxojr2q8ab5ezk9f3m7evp4ma22okukk998gfrmf7whlx5d8glay8rkr7h0gn5lrrfigz3ze56m8snpnxzapc2e9qg0zmisuhoncsftguyydggzliufbj8hy64fg9stcmowvx2w5z2qia0ud5u6xvb4wwmvhsv97n2l644fftnef3lfwn646yd5z41qt3vwwkhujbvzt2p6',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8173075239,
                expiredRefreshToken: 1614884229,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'AUTHORIZATION_CODE',
                name: 'qephlhqwhyybpmvopjutmc0qs9bolkkhrqlkgnjsl83lgjrl3fwzjqg6kaw8ym8orq1gdfy0xgy436aajsuoltr3k3g1l3hknr6nlsvrd1n44pm7i7belsjknyuafh9hw9f6a11y9x2yo4dwwaakmkdj8bvg80axzya487y7jdn0a864zmnb3nxfoxdkwsdski5km3lu5pkogioakvs40glhgsywoog9gwo7rqj8pt5pyraqrixc4sx3wx3be9f',
                
                authUrl: '9q0thbdnam19u41ixtz9jlkji7vze2qej3311c3vii4ugudux1jy8wizmibzzycc4rkj85t6zwr31p4b7fayyrb9o35xiowmmq24851rm1674umww3ojwhmxvuj2zub4zv91grs6xpjcnl6c7ng2l2d9scpxenqfkd802n6mh3445qnj84jv5kjuwmgbyxtnh8cux3bsujrothbazajtvxloh15sir74woyrj0q0avo77cyycvg5qm8wswmpq0ckno7gjp89chtlz1z7edo1gjn4onsslkr23vesmr580mezeie57nyesoa6t8m2iboxdcvzyjq1hyobe4y91103jivqk2jkf9xej3s0qyvivlmox317hqd974cmqdw3zhs8hzwhb3vkci3uypnyp1i5tfggm4ay8k0wqco5zz44pst296gzv21xhvrbkr8odnf2al60y6i2aplgjgln4tywczahr9u6nvo8tujpibi3brycbb71glkvpwti57xb1nn8yf3n5poqldxvfemnwb86dvi2zzr8ip6awtkrkkogx07w0lq8aifi37f2vjlzv7wari5q6g37eqbhq57f0zqypeqyjemkqqbfsn0p9cu9ts65o849oyhfj309zq9by0dfu3nqj2salzos0od098l238h3tp0chnh4o0232mu93m1eps7n1bg9sji4p9n1bh3wbg78azjjguck0l0syn7tmruout3t8zvai4oheqhyc1t3rmhdo2kzx1mwiuxper74hobaqggxy5ja50yn7ryxiohqqq15m4v2u7np8jft8vejwr50zg5k70o6acygec9bve3rxiy47p1tuqxfv5eplfkdg1p5wpqnaag5ia7kciaq7t2az4w1syouu7jdqr636dp21scpk0zx947l63qufx0p38kl2n9n131hclcdiibheffc4qdj0auw8fej1w880q82gmk4vasa7umlcn05i17rts6vwhbice756083b99iq3n020wvqxivt2o6n5023vhvql134lsvgwhc9k8dk7ysusz2u6hn7ni3wc4dw3mj6ad7h07b9c0gwpzjxlsyy1ubw8et000jkrlcarkfy57yqqgs0kfp6i2kna4liwkgcbojktbsn0x8vegq8kuxo40x5vtgmvxp9rmq4qm473tiiddjbkhv3954f3x86m87t8pe3q33dppphc4qqre6wrojphao9y8nvggsp8fx2rbv88xnwhxymtvw225gcf0w7r5r5ugvgu8ykqmpwmkntsxbdfb7c2skzgl83znd6izunfthef05r36bpwnl7bkv5ro68uhl0ahbyaum4pow2b7knwohwbqhowrvzwc8ohgchu5ol53ubf48docbokkcx4fycdpwk18ti726b6c9k9mqf7qv088ioxyggpa5k8rwo7ruy0i1aamgoumjekmdhcyrcvedyhl37wphj1e0qslxj3yfv7fn268q81vdbyj0yifjngnlnw2423txcw1wcmqtmcz2u8osjfsxu9obrzjwq4slbbn1uaah23pynvyd5k4sawxhdo3vfbjcqlh4uc2gc0juhyw1ujrg7fystr54gmbmyownmeoc3qq09l1sw28745asdsg6xcen48md1g04dyb247kxdw2cbtqllvk72p6unpnqc9zuebm0ny48d0wr2gmsx252i3b847hyqkr1hmiw1ihfzzr11mb8w1aeo4i3ykn5hztqkj5njs1yz9qe1055tbfrc1al38qx3jhfb10naxv31lpcyk47smyh78ggunkfpdjfxw0i2ylbukt0ahlt5dvbd2ohsyvlg2w757qsdu5roord05u9sqqdfq6jq27a0nnv38h7j6ov20xi4m5nj3cqbxzenghc6m4d5t4hgl8q8w4a1lptzwj8ois4xf2hk2eb82g487x6cbyni5jtisagcfbr0116yr4xjcwljy2ubszj6o60112c6m054hbc4yyhmycqhklr9dwnjz3l2fonbyasb1brmexwclr5ci2db65crn40',
                redirect: 'uogrhg3poxskis17vx5qdmimtg3rt4bivkl7ioq2ie0szv9p0l68e9xq9m644txhfspi1a48vq6sx0w6bgjiypdladlhnqj9ln8nbf6a4nd52zhx34kcprcb192sikg33hhv94ps7i7bi3h94169mtjhmkoodq64rdaqz820i71xiipbt9bjnqjhns4xymwq17u4nak0m60kbs05i7l97f0115dkzbfomssp4mov8xubgzbmet8y9vxy0hp7fonn17bauizo608rbv5h11f1bg3axlre8mspjgsdkr1ko8ztbotn1hwgt2cnpuott73zseqlzxkvxj373pn6ea8vlm6d2mmczoy5i63dgd6ionul4muey64fcwd0veoeqkfw88148jvcq42ouy644pxb3mkh2heq9u266xr9me4j9qehu7nwpj95w2wv64g6bv6x1edhqqvyslqic5adn2zxildvehq11suhdy9zkl5plnuk881avqbvpdp19ideiddwl19nk22xjvpejutpazjm1ji2k4hbg4zptyh9knh4hhiv8h17ewlq1c8t85dh6lmn1pfd8o43exb1izzfuy71w3hrspopzg8xyrtbz6a9a2da8p9yxky0y5ngjyxbf7siiobdpm1q2dgbhp8cr0sdtledty4n2lib02r7zof8zktqxto5frlv4220b7nl2n0i1bwzmlnduf5153vv64bs5ab8hudxplqj2thdc9st2u7wji1wqyyo6rr98gg6n77jghhtm97fz9dz7xvssfxrywg0lomfo9ss4f4hquma3px4q4t9p3vaym1u9gj8l4ub7u3hegk366lr43yl5wtckamv5wecwtxkmohqly501mynsrze0nsle1cmcxcd6j9gbrankte63fewocasujxxzbsijes1a2c3od4t8qnj63jbrodhk9ro5yssheq37x2jg81qxrv54zsecxda34q7dxzm5fgib3eod64oe079np8xrqrsrn7xuegh94jd6shqk89mfim3xa7adu1bqy5jbwhigc8v1onkoesl88y5u9h6wue89gadb6glbxpf44pcox2hvgj4od781bg2fsai2czd63z2gi7etl49909h01ali2pdn8m8m3al7x80x4jshiwpw69kh916m4k6oibtdg6h9r727axuakpp60dc7vbvcr32upss6nykigbb3fmoddy008tyt4umas5xlfb3oar0j2anbxcm9awjbmf3lyv8sx6drfr64pgm23vzne3yzm77pv4mc5hs2506zupvy33wad6og8pfr7n595x59cnpq0vudwnub2rtm5dtwbzsu2kx2i2wqm8n4z9eq635u7ia4iue40t7kfv8v054y8skqdlkzi5w23spatfishl8elw9lkjua532x1baht9uwfhu22e7wajcu9r5xdqqmd2ei4xc56sdcu83fnychos1g25lawo2sqbkr86txf5kzg6gk6i47m1tv82in8mojtemv10i6p8oa81u36ahsujrawkx8vqggvtka60dk8uokuyv3k3w45macta3rfjyen7l48cjllnrdgz3pwwi1tdpwcpe08nvh6cdh6n00gm7qj0wimjrwfk1yy1qniykflx9h0l6b7qwyin34d0zvrsgnx4t359ufwxc9ikk071ynpiw9j8f1x6kg5ysbdlqxz9nu2venwrrtvnlpnr9v431cv2zkfxfer62izdwv93xk93hwshltpsdkgvee9tjsav2023uamzi1dnvgk41isyoppujqawof2icf9pjlysg20zhiygxe97tkiz6nust9akbwp9731gavfmdmv4t8fbqbxyn5b5357xdebatv18t2qx5a66mryqp7vrrsfgey6wufkq7xm9x2qvci50w5it24aka068l09ii8dy5t95bjftlu82lmk8ur97qjkjpsuu8w5nyuczzgovghe1sw5n3wuqhbyun70wvstmxclnucywstuiit2drn99lw25fi0q0icsbfzomy90924k81qgm',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6358231332,
                expiredRefreshToken: 1368254022,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientResourceCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'PASSWORD_GRANT',
                name: 'c5z2wp9fapkxjr556ehk16h4j88zyqy2468xmwe3qtrk1zjjenk8vl76k31zs3krj81vjjn620zz0q1m81iggwlqyi5sj1vapltz83zptgpqu2oyrblteyzkvzwbb8aazse5fu60gcz9md4nrilb5qgd8ikkq0g7zo6hf6lfkk647rsmed7959nldnoawe2851055l82yw2r0doy6pydr0ka14kvc995k9s93xmle9fsweuq2a32aplfvbogixz',
                secret: '6q3lajfxspavvnmvl7pims6v7pqalqd55asvhl87a6ysmfudr4hdvn1g15pk1hote7dwrmmgb1p9f7jfysbsnmhpek',
                authUrl: 'dl0ireor5f9cvz632l2dx4yy59w0ov0l1xjqpwkdldsuq2a4b40bauaebnufpswnpr9o27iaot61zuakc3jzj6b8kmhli5ov57w8l0tl439sbyzw8lvly49pgfgr86hjmn24qpwbh5hm0c00jd6oioz0sabyo1a2vnazncryt6cr80vznc5saotmg0ubnsgh6bwgshot46yz6lvfzdclji8s3l8arfrfhu6753on11q7jmr884c73azuxnfx9mq9szya3wl1r97fzayy07pepvjd03omts8h2vlhmwtj2cjlt20wu8r9lwmn9ld07m0b6afsjabulmd7jh6gqjvwi2wgikjlz8shujp8fzhp9674klbp40wlo8puhnu68pqtgi1hdmst1nrzkozcmfcsiqxkvgmeqhakbu38vw3sjonnd3t29rpqf8zxch1b7fbgrezcfvb7w2yj63l9g0f21ydfpkjnvmbnijlcb9kjr4koqgssu69danxz94hu7yrj3yt55pl801cvqm1usn8ulntsdaq4x6z4ch4zhxh3nt237lcobxj6nq94e8t6hszs0nkhgh8hvtcs7om5cm7l3oz6mvilt9s92l8oaxgd2gl8jlew4ka1nzbq63d9p08iuoaugda25gm22euygke781e61k658iatxavpojmdg2fyccewbyinz689v33v73kirurrlftqb2c7u5xb51k7wchhvldj97a98z5foih2j46o4u2l7x2wg0c3xu7nj27aigwrc1f5yfbzhzrc9wed0wg12xtv2es40lnrea287xwjpz96j1r01etra7ova8whlfapfyy6jv1n6sn8k88wavmunewyex5tfftll55p8i49e7df59kpu3cu8bxkkudehczdjij37nlryhtd6ue7h5xhu4iu07vcbexm5cyd7vu781ajoqoulpffh0p9rbfa3oowdu4yuwy72fexr6w4speh4kmy9yb9vi8sc6hhyt9p55fm3loaunt5wtsh3l7j25h8ugpjnu5p73slox0g118gu8os2gw1zfzjbfmq0v88wb8f5jaw9i4swhiuyd7naj0o15wq8sqdqi0mg422m62k3k7dxgq1o1zi99pxvyanv82uy65v30og7cwutvctoe67f4irv5cclhr5udhmmyka9nk7z3mc4inav8tnxo2bgaessuznei6h162mkgg9r8mwi2bj9smmi33xw4eucqpx2yyf7nyvy4ntcnud4r3gd31ftc0g9bys4qpedn2lnxo3fvis5xvkrl8ls10t1h2v2t763loma5846nfrtbqqg2xhlkg9lrakelpnwghoyi3z9tfymn6zbqasqc1vgznwj5x99ijl40kqnkbk3897y7seupn8joybt0282b959ennph1i205tx0vzxk2fu7ht4rz7w75ver37awl0w81k8rjig5d9ahopic31qm2y81z6gpmf01o4exza6q7tvbshrwtws0fke57u995ybaw97exlzi6iwazyakbfc4mgikujdpgwm59tu0t4ykbertrvoczpvlplaz6rvthjh21vurwzj4hfkhrp7lkp5o39tvsu3idq2pmy0270fd2tm9916jx2uyk1h6df9njgkqq881sn9dbjrwqp3ncth900dpft79sa3gkg2i9nl3gm5mridbv700o2pprlxkmizt31rhkd1py3d16ztvht15zsmcm0g3kqrg0up0tsdqlkb7dxzpx1aoqtwm7b61m8gczav49ucoaah6iykhh16am7cv0yuwjt47hjydckuq4vnve9o36p19rca6yy64p3xz5i0nvh70t06qjeb5h89qox8ifykzkojcjpywg3szzmi5xcjsze5jvpdk207gn8jqmv59io560oa9yxd19wwmfc13l4hvicwag9esa3q27i83lyyctxampwsnlma3g755472hny8u8p9sgpvcdo50p4j04a2z0zterq3vfl1uen4s1jbh7o8jeoisbni55w9whcp1co6g717ylgjh0xiqly',
                redirect: '860d1kj5zv0gmv6590rbbbjyuj5xu2i21fax0n918y5pdkeph4e4wgc952eed49zbmltp54q9tuy8ahhllr93neqri92n0su0ifcjqlfl9ak8uw7o1f6g4kmoenp5295yuxn5x3eni5frqdxveplo404hrquiq9wg6jmj5taija2xjqg9gisvz7ag4ij7mkodydirxo217t5k7zy0t5cvt6c5ef90q40llms9svjq11fykbsdiyr1j7iaiql678y3nqs5719k0sk8pccyd23a2reg77dr5c9lf75wlj4tsgzkkmiqfueiw16illwqsnp510tjuwc7e8aq12qkcgz4luzst509u7p6qonvaf2y8fcyonna8xxr2mcxetmihcgb61i7gqgginjc73hxf20n77kfioxqmvt5hgt8b4f57j5lliwfl0vtjd2ry66bgmnkt8c0mybtbovn64snry1h5ot1mf5ld0kkem47h082e1rmwa0x10w7auce47jhlnlc9lqscpw3u7dtu9ddw48sf6ejwuo8pkvw9f7hvlyresp7tzoafwgyuwr8j5hiso5j67qqd7nmnrz3dbz9qw5g3gxngg77rojn33a4laplb5to6z71k6nutgwqdz7nz1mz9mbh04ibbqb77ttmentlexnkxe2mpcx95wer8xjyrnjoqfidmnsjx0194dl18zshoc9la9peondzzxo7oqwkkqz8cxlsahzftfwt03oikyq07jaeo76ybqe8qu48ud9pvw6a4qhds3a4fh7058tirqyls9io1i3i2br3d75bbmr4cpkehut0asawajd2wfa8li4lzzfbu190y9dh6hdmkd4hpeb5z0g2hb6i87cwjetb79j0f6sou8vp2ugauibh5b38oxtv2d6x5sxnovzmux98hdzf0dmhksarlh7bdbrw13lxwbto4yuvq83qpxa7eliy56m5e0mij6p34npb8s3mjp9b3i79vyp6p68008buruu9fi8v6uadtunic5onuokndksmpsa92fwrgpjwvxccn44dgp3jwo7b5ov1lcqzj7z0h2w974mhygsxtr8o9rh3ni5z8n4s8wxevt3w0dxbbemv1mf12fcjyki4cjyxikp3rq3c6gsmtzwq65070psdx1aib9jiutcig90ypil6szsyup14aiwy7eax5kvctsxybv3ocfixjoz6ran9bl9p7hw3c3v4mc7tl30gbbv58cc8wiznsy0lfix3b0fzewekbyfn7wvp48usr11qtmcurkywauue4ta76tdzrtnsa89yplqc192xd493ol8zpgng8r2z9k6ue8omb6jp1g6gbssi9imifxwvysk9ef2q35wnmfht5bh5fr9f968mh6xhg7n2j0rfvf6y9ckvofh1ckxykxsomt85mk0tjddur3fl2m6scg662nookcjyugrjudsxcihlgq0j5xrdwdsf12yppsou614qfvw596rcl1r9xhw9tbhadm1751ua1p838mt5x1h0mwn4bxyyz42l95m8xwe8ekucsjasbovikidx3v09jnze0wkattk7qqss4cxdqy62uk7hnnia09ihzbk1jjstl1ip0v23hjurshlirhu2q8h2g77z0l4wk52g5orr6k8rgoh0mi2wwjhwuubwd11pbfm7b9km9xutg9jpvogcph3xmcyjqtka55w3rx5zo8yidpomn22z362vnv8ifm6x187xjhq62mf0domg7gtktltqs4xteyj667hj4zu6li0c4yd3d0vgdvd6df34ld2tfhtie2vpdz3q9sjuxi0ym6v1dzri2x1eu61xdyrfgat2m6wskxlfeut4geqgc48uvvyfyfjd9t92bi6ud458fg21bi2ibyb0eydt88ks4q09dfnu3dwb6bh5dngx9iu4xg6mcqixyzsulyijxsd672mp7uv1lytxv7hngipx67owlplk5o1wafuspypujs25m67iecr03nycf9u4231udujs6zxliasbsm29sx7bq6ltqc0wywh',
                resourceCodes: null,
                expiredAccessToken: 5116387234,
                expiredRefreshToken: 6342268647,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientResourceCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientResourceCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'AUTHORIZATION_CODE',
                name: 'rzv1vuinkyrdn4wibpp1ihpnkpxzbyz8jvxuf3hx1b0vqzm1ts6ilt0qujotq4bxtzn2z18j4sc473gnln48w5monoxz03bhtsvvp3ss6a5kf5otsbb8gm1deqm26je4iakzun0zjt24uhid8rvkviscsftu3oh8r5232wciklgoey12ciaw86gsu6ud32r3s81r62qqmy3h6mwqdqj00kriojfq7ijpf2ub181leeoyuajubb5kbhmayqjcu5e',
                secret: '0d09pw52btw7uachkizzfoku071559w591v0f1sp5u4oi2atk3aqz21gjgvnrzzys7hrw9x5bhnu3p2qnqr1d542gb',
                authUrl: 'fo7j9utxv5inlf9rdc0x1jmoyrm3a89s7ms225jzd75y2vpbrequ3vb2isv6sooxwy5sm1qn8s71v39me5zuxm6yjmmiro7747wv9nwsdomuaviwpd7qcv7ixoz1i1zbzpxrqyu51skmouapuuwihycvc6ni38ndjuxogathovjlo1e83e28j4tmssh13ptsok82twlqin1qy1j6l39vlgj6dq28zop1c25kuc4jowuso53509ieer8opsmgp0wbqzbi3zbx425dzo1vptywgfdjnudg6qe49b6ghcxiffyzpxna9a4mydlaz8es738g3c0wsno4mn380fv226wjjwmjahr37egxqi6l4oqbjf1m4noq7u85f5rjctnbbhcg3tn6m30g849nd09fpae5mc2a9wj76751lptw11mf8miq29ou6kbhuy24r9mjux77iwk953kb5uxvvdstw1kyedpglnyiiexfxtk49bf8sd9xj16qak6qfb5t0efvg1v2oh7qdkgjnohp1aknm95cp9ikeflx3acsy3z9nm82f4oagvmr8yv0ti22bwdzq7eak3b70eqlqy8net1f3l5mfk58l9qph8sfkgizpl90663f0w5dnwx41llbxhz7slrj0ku6ma5n8e998g8jngq43zizdvinxumx1wt1h62m5bqygyl9uwrj7b3xjm0jiabk3364o1kwuilck9gmcahl1ilj1sse5x9jzntu1w4qlisej6vhkrqfj12xxm9v0pp5qyztixkobecy3ryrn7163mn2611kabjmhdnvcdihpdxl2abuatu1gp191onaizxz3u8jrnqgsd8nuayc54yeo36u7zl8o1h29lzmr64mpqz461be8itswkuytga6powgiv379lgazgab74a6q5b8vzpkiq0v8e7ruztnpgtamtiz5143z2ianek2egx906bafj8mp9d6uott8ifxkg1fhz1tl4x7vmt2f1c3665k7pvtvteeqdj5pxti1hzw6iasg50o43bqfbjivviqa6xdqy8n0ik4uivgup09l8pyeb7r2a94dvvdae3fdm1f33fkx00i7gg3d5vlkv0fjozdzxcgnpw5e2v609e9wraetuydsn4xpayzllhm6zytsduqh07our75jz6gqo92pb0njpn9vjt10wns5rlko18rbhgcixz6agziye3gt2qpnxu246yk546a000jr8ccsspy8vqg8f58c5mstydj6bk7z60ah4edm6suj5y7n9c8lq3bw41reonvjd1tqf235u1jnhdh2exva6reejgflmo21ktgawg8yrdx5y14cv9qi9hipt28gjvx5l7qrrt0uljbv8gxttvweygrq8tjvvz2jdq03vyd6mrwatgkpil9tnzj3tvtbzr7k57hs1u9mauh9yaa8d7fhv8lha5syflvvc9svco1nwvxy5l4p7jtdwxgbmw6xtoxoofu4ee9uez11epgi4wxozfe40l3jpfjrkbahchrz4782l1d7dlyhmb4ta7ihf4j3c590wtt9zim03ikyh46at28814plgswq190dkjkp3oanpnhj98hzohdv6kdrr4vgm26byow6dqtle7x1gnq7e639wkr41uabhxa0t389306g9jpnydo4j09ez6befm3hj3r2tppjs70q1f1yv2iqy55eujn7tc7gx5823pfy1jlzpljffc1jgqqbs10h9xtdd4llgq2ggy951j09hvd21jr3x6go2rr8yer6ptu8altzixftododx0syon2gr2s7imkwhrfoiy1q5ywr9v0fwvag8qrec0htghgfzzbimayzrbm6t8yzo65r4ioj2zuhz4o16w7oehur64iyr4opixawv5hmke75vu3okegm6jlbrxbr4hyg99q9tt5pwj5k7he2i7kfawbcpvku2522n7v2c8r43yza5nmg2p0rzuhmm4q5honuossc6v96mgpavoc2xhngnkk1v4j2tdy7g8yl8wlc6v0f5rfwvzek3jhf8wic93e4my1',
                redirect: 'cthybc1w6a5a6m0744zd2x3eie7z2rbi469lls6tpt009lja4tc9soir5vgtzd2a88c2yzz2zfq2l4k3uih7ijom854p8mv0msey18rgdql3q32jju4iqh383ucyuidmyx7epl4qd3lxzfr5cw7pdk88kmkdnq6zn9w4ae0sjzqg4fvfuhd2qgklddxo4kct131dfz52j7cxueo1ic8wu7g1hwajkwu6vl51ghfkw8mcie8n6c1m9eu1dfnkap9jqog68owgngor8q1mpsvohemelc6h6a97hhxalpwvmnymr66fjahwjsco3dqf5n8c003jct6nlgnbbbptcabk3famrdyxngcgnvv2cfportxax37hpt0llt5xjpx0m97ghwmth0vmdi4etf7wa9xxwybr6hkfl7ka92ynkqee30y6974zlml06z5ng0lrby13v2a7pv6528r48wcn0idesc7f7ophrvnl8a4c2uj05bdhy49vc3r3ujx1m881hv1fdus7j480f2nvob49trswdydbqwa000r88f94z9slgx78266g1npip6wgwmf09qrbpog886s1kctyt78xs8usjb45cx2e16wxscxx5m2touq6gx0s4pxkhtusqg0s9npc1623biia3yrpxdobgirgxd2ymj2gtvdbjc6jqdzwg73v7vpyyly51ll3zz8986giq62fmodkeis6zzl08tnsroubtgffbrrx52jb32yc80qrkigk6f9nmfl751ge1guphcpvtljtr6um2ux8rdetuuymy9hxm7kmp2gict8qplgzo01a80yele5f5202gpo9elfl9ijxkr8nrlr95ox9e5dq17unkhvk5ta1a3xhwbhhh0ulphy85zen6hp9e5jv9ix4sashwok6xd5i4p4t1dab7ae4n8et4zf2tpgt7v42qm1shc5ocwatasttmql1skzpl0iz9umtjoqvzlqn8h9qhulrl1vkmv2g25he1ix72qnfweuxme2tbcuo7k66rwrnophqjbn9deatr0wvf9e9ho3sjf3oz0w0xx5u2h8o7n1flaqscvlaih4qsme8mhc2pw6nyvyqhh1iq6kz6sx3wgnno9osehos4evrnmp5mrryj97l97mvxast64qj3kewke1szt56vbp24l0zck51w7nntpiymw6qfplnv3osuv0p40bb0t9mhlxnri79m6glqy06r3sfbkgurl28t90qxxpi35wycuu97pnn7rbmthba4njutimb0tmks551pns8sliiowbq52k0op5axr9u041kasgbwr6yfoqwcrdirmwl3t3cawuawjuvhcp4etqxwn5rdpthc272sh65epdcpngt8e9pq9na6m10670h0t0b1x3kuto6jlmyv27iupbfispsz4dp809d21ygipkzrcejfifc4v2phzcyq201jj5pg5tdgydftvhporblpxgkytg9yfhassnq8ix7zo2dl19nxl3gv3eoe37o2j5bfze0lgfnx0q1sggmwe4x6u1r5irqvbruvq9r2627imk6f9c5hpwww1rt5cny1op8xwrhy4cfsp4kkhr6fnkzhy1gaaqrunn4nelx2gp2v2qfcbe5v6jhss615iki64a7xjikk9tcbodo9mdd6wejngwd8echp4whreruzzxbvlyw484hbwobkmxrjd1mc9y77zc3nia55h1v1ss7thvhno9dy1puewdits3g4q27qwy35v8r3cnpl4f9ey3c2wbjpco4wrgiio14eodni8aadsre2b4eq6nlx9g3px2j3c1ude2wbvjyoc3ot330plbf1hlb8mcyb0g4jc0fo5eu12dw7lqz7948z48p6gplxuu8y7cfn6ku2xnrevu32n88jy9pre6w7objj37uqe315nhmk9wlht7pkrn5vg2iv18m4e3dqkbyr3gz9zdlcv69a7d8w6u8zbd5uzflmwqqpfzeasg6ln94541jtyey0tldrd9nr7xem37820xn9u6to9h1zp11o5g1rvtlezr7',
                
                expiredAccessToken: 5974625030,
                expiredRefreshToken: 6766079071,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientResourceCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'PASSWORD_GRANT',
                name: 'w0j4hdyci4jui8ad97ode36rvbjimk3k1myp13mr9w786nf97mvx4otbumavglwwu8symsbbawnbjg3lk0nuptxfpy3s4ud3oshdw7wlq09xkkqmg9khkeppsn0wu5nfafhhe50dygujjqwz49sl2ad04b7vnxxa77eimnsdvw8wv7tpnnjygkkfwfe4ztphe6h263cya2h7g045ztg0ir3smgkmy6y8wavntsb24o1aabrr3le3uzjisu2d9er',
                secret: 'yx05riuo5rcemdeybyatao0c90u6prxbyauf4ussqbfvo8g31ewm46p5inj8ubrr5fhl4i28kk9sgbxzaevmlrl5qv',
                authUrl: '09t86xsk5xwk8uxoyas7zvz64jz4wnl7to9bks49zyf6ioklhaexw0kolb4qq2nfz7c9qcjhz50t4mpho6odexaygifyzlp6z0wv3d1l3k141jospu05i9m06x1pzui8kq02407x9umz4r000r7xq91s07awzg8unvmmc6aggpytk7opffurgl05uvyntkygbiavunv647za7cag4ltxvea253xdebyuxeo9d169xpsnty28fksimh7pbvkj308zkh1zgqhcsi6dirzub2iz6s4hghv6uo890oh2viemksuvsvu6lo3lmlk0emgwe4x73586wm1d9lhf5q5lsasn6lmkozdt4p16pl5rs69vf7w7sdxexs5u7s14zcw9b8jp495unim6kh8m7hsduss04chh4oijo1w3hjlh1jm4xa13j72q71mvbtljrhhhekbw7wdwt5vfd5qhuzzf014cs00z6doahtdkzhrqylb2ju9qpcui29g4bnnrbwa0ta0tywommpv73p4xfwtzti5edorx2rpa5r2th7s55xdk4o3q26ndlsxu5vyoyzfdcpziowjnnibfffgazw0iiduc1a9sd3l95w4vf2kxmh7skhszxn8f2xlwm7beqgj1n987ob0yhu0zeu2b67x7m01aqcxebvcw5tfnuguc24fx5huq9il9at52iy6q3xf75kh5y0d1xagf8b3bifx2igtd32ad8gfub9yzlrdsebkhu67g4gmxx8y1k9k545moha38wmzvv6lt8bwzzcc30g2nu9pmagvwgm7cwzn5m5i5l4hds2dl0tk3bs2jjbxjz7qim6r0lburrliuc7s0n1tzlo4h4ob5n9neyw12blthfrv2sst01jb569r5g8c9jcqxu9amu6jv6bmuvn9p1sj645x132rueuptn7n52q90ux9cenkot0m0sapelqqw69e18l19xcctcbin6a91eeitxilaug75oc8ab9qju745whh4bcpvvkpgqiiuk9ygmwcgh5mgt0d48krv80yec1p3bp1wgqtl5hwt6k0o295z0t8mredsg4x9dc5b7w5tndi1fx54y4wljv4xbdj0v7vjk6zg6jtkponyqsa9pazwikcdep5bcvvxza66o7n6db3nvhd4gawnxgq0ajg0kqxahpceo2ny2kbh23w37l9j2hu8d7x08v5lxq0xm36bqs124jo94y0v79v9cgw77ob4q6596rtwclj1g3395pw3ehegr82jwhvkwv6750vegwlqlvoe8ndvpv73s7a71sxbbp814qsr1zy9kd7ludvmiwteccxxlxtolgha03oxqrppbiiq35gp7fuw4utsz9f516fs2la71q204d3dur7gpeo6mtaoqwysj568bqsphqfv0qeyqvlczow4xi5wzdyrzuvv24fhk4lt6iivjdltuoabbwfh8rrk1dlr7dmsshvp8woaje4emqdeajadgdfgro8fck9ubxhhibpv38na6ku5mbvjlpf7dx2x1aisz7esejkpxnas10krmowqor70eo87d10p3w85sxes78xninwv8xqimqgpgv74vxqm1ozlt14gxjvhjpzz05isb70lmczh1zgn8o175ue05g2lr5epa34rbgb6uugs1xqjcdj4ci3atnbnetf8y7k2xvm2pxa662zbsniq2821gcforh84g4zg9i2gwmv14mtsaopb6x560w4m3xpw2xe7qlhi79s06h2othp8zcxvnxo1p3lrnr0dg0jylo0htanfmvjcldi3ywf97wc15wi4v3fzr3v3xz2qf19hwz6o5almvq6tsndhn7svz1yt8iqckf6yj1z08vsy7bapzxfmfw01qwl0sqea767vzlmxm0u1fue1ma9a27z0vkgo9yph0b2g7yow79owe494kuqwh1qpgvx3w0mo081yp6fmujyzal1329ullls4lmyhzv5ccy4m4herhir3dug222heuc25g0afuyfgc9ou2pt17vnm83zg1xndbm9u8z72xoni18lk',
                redirect: 'pkyob421eo8k7d7g0anoxqgis4dyqa771ddnl4r4t0a2b6xuun1ikwrd2agp8qwvf6cdu1esirx7a5bxgp3wfr43jpjz4okzihy2ythom72lyq7tdbx2ij1es8zjlpnpas8mrhuae1xfjux79p9ej4rko9353qelzy1l91nypljxljjrkj2nk72btf3u7ra4bcg4ovptzh5q9czd6qvixbemlrzccslv162ayrljr5km16di3t58rg9f4xy0tbi7hxo2whmkr0g3s29ypzpahdazhplmyoubonsxjdwbuvzk7fbz63ygjtlfan21e21eux001s1gvf9axyr8qpiy60dm2g4efsxt336l4tqqwyo1669lp26hxwv17yoxqedmux6cey6lzhhpibfbjynfy26syygs6fyskpsc6tw1mqyhknyn3dv4irikgb1767400wh6tdyi5c7wvvi15eakpwa9og478gu4b7gpcwql3u4g17rais9q6zo1d4vdtlci6pkpvfxr6yesl7db52hwmi6iskqblxx9mf56fmwqkrphud6idue4iyx1u9nf9xnf28ft57wmy4jzhioyjaclka27m2o4ny5bi2058c0vv58lpf4g1wth625a0yunqqz92dmsv6ayupfudwrv65ldqx7p9bo1srhrpwq1m3u0qdwbi3jhylhnv39q8743s3z7un73qwegtfggajevncpjkpe0sxqknhvwut3u236jdkk61w0s8unlenoitlcq8ngpn4hdjql1h6hnag1z354zjmq7glwdc8n3wtty999l2ef7zkgyuia8is819cjgwatbopnk7qmzovn8pcup6jf6tqk0mmb9lj7ay6edubrm03xe2ovmmuwjplyyjzxhthi6ll4odhd84aw6gkb6ghpeekis957z2igcfjdpzqm3lir9gg50g9qkuoxkytrusdfx136k0fkre6pdttwhbvcly6d92m3n3vzmy4jeuru2qkcuyu2m2pm60eqqu1676ihm9si3i8q51tg8j92obgmn19dpx4w02d3t5e4ryd8097o4ax3olu2yuap3g721q08q5xs2fedm5dsuqv6db1so7gv9g9fp1wgfhty0izpdeb2ldnpnfu0qqijd3waeae4p2ql0so7v6i3wme4jjaz033gzy0v44jeup2cliagtcx89gll8b7zizx6epin2s7ibttyvtznc7ql4mpteyy2yrw24mhuxp41cbtt3a37pfxz74bnkdg5y02b8tgufwekqnos4zogo7qmy0emqbou6ya2bap7puou6l45dhqmj19bp4c9au3sqgc82mvdvnxjm9vxmpesig46ajz5y1bzjtfgzq1zlswy4kbkrhx4yc6815v4o8d8w7hy2l7lj8efm0s1f86glhs8m2fhf0xhwzkhniwkplpogg8p9crek0nryrubfx62jowj4e8ww5xpaef84h654zqiytppe0jncbble1a7vv9k1jllgunw70kpck0zf9k9pam9ib7azx3npxv3bpdudpi5g2zhh74v6rvflnzof7974ytnvn4yrif4nv3ryaaw4r7uegg908gemgt6meuw3g4cpw2z5tnslqinbmvrjmqryd3a3gvrzrvv2nedcqnfbf69iwopp3mlv8vrpg5w14t2k9kpo42hetrg1ozqd5qh6rfcmyba7tx0dgwsb3bterw55a61bi79nip0gdlvck9pzio2lxf45b9gyyozyvgpj7d5soq13gwbcrd7xtjphx41x9fdcpq0kvt4upi8sspyc788p33ac2rffu9bjt5ig5wsrc70qexfr4ub6dzrdc8ge7jk9gylz8w6j51nx9mca2yknwlcr1dall2i98cvevss5m3yc3t5d0cs85twkwfnk5qt1cmb3aprsoewyd2ssaheakhz7u3vj29i2hmaammmir6xh49s3h95tuh5uxod7ipe88hpppuzyvxx47hl1odu81yy5q82aovny2zlmws2hzrtosxi8pum3pmve6mhd6a05m1hm',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1544138840,
                expiredRefreshToken: 2726045551,
                isRevoked: null,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'AUTHORIZATION_CODE',
                name: 'm7glsvcyy0fzyxi3su02iaq5czax52y9pekwbelxj0qbsshoq5h2on0c2tye8q67b022e5f7joz2em3erm81fnsmip5vsrtsa70s2ip47qypg0uhpliy4uu42qc03d1razjae0n6kzm7imzco971o0gkc640t7fmp5qdoyf6k2xgcdr0cn61ezd0g3sgcn6oi5s6xbodkoerk0pafkt526ua90j9ijzaqz29kgiydd0jgx8mwdid5sv60yu4hlo',
                secret: 'i1k5yzwg0ehe24jcnf77zfz064hbp901gmvjg1zexej0skorpkx9roevajnrxz2tgqxrw13e6un41tm64u57r500e7',
                authUrl: 'b0ij55x6bcwyhg489p4wk71ga9g9j6we9yjvbr8870n1jerui1dqsnbpcsejsqhl54rprgk5tf8wp1vx6arxmzaez0vprv481joby7iinc8htrg3f9ig2k2hwcxbt5bo0f94vgikr5ptfoqss9xjiuzddlqi1k2ad93lxa24cxwqhn6zdc5gsny6hferfv5gxsd77sltzh56lq9di1orpsatquxaokfeammpyi1luazyy0uil9fjw19gyrdrky2adnd1t2t6jyu2eprc63iju2mf4e20hh0tcuivquhrgof6sy8mw4ggydzlvr4l1e7xz5pm9i4h1jvm7gaa159sd6iepuph045xt85860ikgej45o8zyhe5qmysfivzr76rnu2fn961uqqdcuu0e8dpowd7h45422rnnsluqvv8igpgk4ttdd5xw2zlac08x9f1ihx53y8rf0lt3lb6xykvnqv3id7nejviars55060p9hj7yvuovo4jvj32xp8gij0cc7cgwaxw4hu7q07be2zdh802paz0pr9o8tf2tn5few89srry183kqthtytbpxuko6t9k1izfp8a9wrl59exlqs84rlksbx67nugumsexb0gm64wnxbk6sakgiwywfp3owi4s7u0tfiknwyvt92cx1gnoxnubo7ydx8va6te8j0calh9711ponsmk11k9i6ev2mtiqls4igwgv14td6m7064thqpfkfxamcl0lyx0ys9h871myi5e43ys0poktnwkgpvgfvl4jkkf81ku0uhk2yczxw3ut40xdjwsbutz06wmhpsz96b3mvtai4zif43xg4i4y19evx1bh6x5rihnip4wl28s8n3mk5yl445tjac60yul1w87k2wqdo26zq7eqya1ql0erszulvt50ua6objk8es9e7y20x6bzpyp133dciddi55y0zxrc4d2szl2m2ed6imnlkh4cu5n4vs6bsuvtz548t1etuhmj9fo19uxmz3fohsvicgas36f8gbcgcr2fgsv8ghfovpjh009363uxccywupw73s8ojc94rsxrbq3uxleym5umhlgtkqki7cbaz7qrfxfsgl8fg3lnbdniv9llx75y19p5jkudz8967ywi5av69oc6rawyiaecbglffdb2fkzzsfisic8fj2kd9im0bj2vb5r5m9lvrds97ci721eklgd1x6fsqhi6ubr26mwlwrkz3ogfp2z2v48gs2gpd560cw1yy8uozrypoj02ofde5j948ntqcb6ex30lew6zcv3oda0qnku9wldxw4qfpyel4fhdvpnap1yzcsdq2t3ix6gjbmadvrth6022jotb04drpjhezzz013yq22372lsnfrdodgyoruiekt3v97j06ruguqbqdbyxevybxid9z5dob5or12fty0z13lw3727wxvgar3orizaqbwghz9d8758669w20kr6xzcldk97pfcblq6lka5tkk8c9oxw9zp3jhr034moi03n6wn9tzy63b6fheleoy8mhsn9viuzara57gb57jh9t611yw1l39hv1swei72za683zm7wzdqaf1c0iem2e7uvy10mxw9tsblz2nz6fqgcppudckkzso58pt4hgp38evjw02ck4gd3u8ucpfet1c03cbcfzv81m5eh9jc4qyuajbl4hr7zqtl2eqv3vslmp04ufgmwu4nu4z03gadoihna9orprh68ji5146rxufu5mp7aybf6x1szh6u87qcbqm3db9e00m3vykn5zlp0w7zo6x1b80cfl8je9eke8rh96kgsfredgzv50p1ienz4iuxt2gbnrfnp8otiwmx89o29008w63hfy1snt4m30o7s4m4nhgjr40gxa0y6ixbt214ke6ear2q563bfkozv0r0q3sz52ifj6xnqtcufp6zt8ovpx8yuu4m8kclfhk50ypp0o6a714zq9c9av658bcp39w25w7u8tur41shq94yrykwcpjptw6vvsjycb1fp54g067915q123dhmrzbm0o',
                redirect: 'mdqxeeo4pnv3ddip6yiwb570cph2ccd85tc4s2gqeh6m4a1jhss4fua0nnrhgktv4fa2vhtffr3x0gke1bgwvw657w8ywlatdzxiewn626acvsb27bffl69elfihsnicutm09hyj007b1x75ypo5y3a4hyn7n3gwlxlifzy6e047lhn4hznnpwhzz98zn4jw5ku9kxdm0hms5vjiampvi8n2r39xxdzb32yv451ayk954nsjhdzqky0ke6bsqfa52rfunhg831iqsuz680axb5shj30eqzhg0olo1bjzgx48z7c7i9efba2ih3l235q1iq3a8dp1a85d5tgi63mq7n58fylnr28f93ircdn59dvzy3b535ph9no10ku0jjtpbsas4hr2ujy6zka7l01v04p2vx6gpn29jqati3dhlm0vzudicbhbc764h06vszl5pk9rzy9halq2xrgglwzvf6ta4cuuciqnnv2lejt4t9ezz6w4x1x8wgv1a6pz10ms7ec52kumh8yvo87j4v4345hyws2907rz93qjssn2k0g4rghaay6y92c22bx0geozasshylzebkin5vu8wzk5kyf8wls0wn6ltd6rjdq83jge6vowzw99opun5x6prhkgz4ew21he8473hxauvxxdj3ixv5sssjy08ixfh4vc5hq7bq99e22ogcb1w45ftld0wpv909njthqaisus2vdgijczu1t5z4ezynzg6gj6nvt0erw7o4e7q5opwysrg6ajre92pgspci7yo17d7bx54ert8zr1mgc9ch3rdjy7om0u4zdjx3w9cdu8aybcqvb74gq1p2mswdt28e5dskjjeqpnq5060gv78rmle8yvrmpx3n0sd0tkjd0ewtu19cf4atk16tb8lpfq5crl5xnpywb7jw0myb71yz3o4xm5lg496y3vkzd50dbt5vvhy7k9t4eq3bnazp15qa85c96qhwsmum70s32hijm4h0ql4kwt60a2ae0i0plumqh6gyeu81j5cutbw38s69nz884a2bs9telfix5ptju9rqvex48iyefmjbetulunqdyc7mo1zpcs3ttji8n8dcvvpxhn4f50ork85s6tjr3xvwig6c7nu4o6q85tws8yygi5de01wn56q2j36qt90atqtuhfv6lyfkle3n045m8uv2rjjhe6bowft3nh1jh83yh21qlhzrayze8tlxxlge1nd1xqzqq12lk5tadbxa8t89vzbvwkp4vs4a91rbm2vtuya9cwvn3z8i76n3rvx9kdk7uq8n7fzth2fvluol5tw3ryksp5nt7ka686qky9t9w8psyqhynnt7ptq858tya3q68gb3n8eh3zm7cxnu7k18q3p643yj07fcuz4xieql6x7xiomlrzmu0fnggmr4qs7mex833c68pl19m06yt6560wed8h81w4hazow3mp3a4oc4qiugarwacnd4its6aqzlm15yiqj66q80frf197dnblseavyx8ctonzsowl9yqkcfg4dusisizrdmuup4y5unwqyk2jejx8z6lgbcbegvq4zpgysmxubvhlqpjso4k41tnuq43r32mzpttg5hfwydmi2jo21nqo0y6ixk3y5p6o3imyura0jnodm9rbqkjxbzzmtqwon2peuaigqraz3sb21nrb4igamw8ghgmcmx06pnrsdqbibii4so1ygpsqqgipbyrjuz58f2sgv725jddgnpbtuv645fu73ib7f4s21pu0gaqn2htxise0k473st3nyuo4cxnq5t854lor5cdy157ewrhs2yiuuuat7ibl3vs9euvpvwtr1055p71lb79gk7mvvpc0vpeap0up1726ync06reonll5ii3i03eegledhzwkk86c1lc0bix9uzxp6c3d3813lrwkg71mvc49784ud7nsl594sd1n76er26jy67fq5jn1allvzaiohb16vm6myqmrd3lu691i5vcayf92ias0cmjhs2jajk3kp255jd8nui6bbh44d0sd96wl',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9843454763,
                expiredRefreshToken: 5560346568,
                
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'PASSWORD_GRANT',
                name: 'zmw1vsqxgquzciyfy2j3elfupoktp9rc8gol4hpmb8g6wj1it23fdfsatnwr6ggkzwkwqqpc6zjw9glbp6yioqsmu0ca0ex7o1u7lmxznhh5i31i56qtcpr4ogtn5f4vc6zliqie0x4ploqmrzzjurutd0oqrbrghltjfcrvagn1oycrh9l1gjpak3w91tmq9uwvn2sgfv78i67czzngjxqop9aknq5d474dkz79ozxxu3qdh5op51l3q3odadp',
                secret: 'pgi0u766f07u0xkp989ff26w9u8mfqvnd5iw26affsngdr6z9kvd7pxcl1g3amfq233ffnvg09ewhtjqxcyvjd5wpq',
                authUrl: '9f9vhbepti56uc48tdk7vh0dv6y59cjywrrx7jdsg6lts4oeggj6ywq0i42xbq3t6tge5nh18mq9r49zjef0a9t7io1d9n98vuc7wbeyf5ajoxtljjllbx5btj5bsvww8b8ut69m04zzxipf86as7offkhli29s2j3kvqpkr6yige34ut1ykn1hu2p2wod9llt5m1wmrd9jpj1xfss5hz9py9543em6vhx291boguqlkfwypfsdf4rsfnlv69i3djki2guaj84fhei8efk9eiisrdaf7sdm67pmdi7ebosu41cohbt3xp3f67lbamvx0pphtb0as2sqal8wrj9y17uey2u3l0x6o0s8xa1h9834el2a2k6j8c8v4fr0enob2xboza4pcejy0hck9fkloeryrdie4d5gohzluykaj1qyjv049d37jgz63zcyqxq3qb27ss6uewclo2rkoebkd7ex6ciwjyjukw1r6o6n382awottiyfwgk75cjqkskf50j1f52114jxc3l5kwyge7c3yo5nw9sg4gncwfuoti5vdkphn5dicbd7qnpzk6ziu82f9v60m55spt6iob0wz85po2xi6ro3w5vp2d9lom43bf168kveiatzbjdgvqju4oeqi0nacvng4rv6c0oxoegpoytasjhuwl6n8zdpnwybhhxk7tfk2pv5xtkplb249ykr75ckc9tb60yzercdg0m3iavpk97sc0mcq0tx96ztf6iryv1k3vzarh29midfjxnoqre9gitvghbaknpo27is5274l8jk1ge97fzpu64c9j2a0u1h7rkbpse1u1pceq5bpcl8kky8id7yi4jzk796pj4l87ngp6its5pg43em80b9bw0x68iwjo1ehe01sn789aqrezd0xkrtci2t9bd1g9tc9agupem3jmf300m7ioyyjnzgigadhi3gdravm2zjp68mvnxzaiig1k5e65tpeqvglywjli3a98igg9pgtvdtrgtn5tbwfpovu7sdmsdnwy50719dqgbyjdv1r28geoecvw645z2x62hq0metyjnb6d9zyvckhrccc3lpr00n9pghikhn5ej2s29z9yatsyq4q311z8t0z3rozlg1ecwk3wi6fqccui89mbbi7w0oo5gjzo8kgv50sk5lp1e3oy991o6m0ssmiurnnximycwgxgptgbp64aycdlh2e8826v0ciqd3lef9zfr0pwbjbt7fkumdta3ckib2a216pe8ywaxf76uqi9m4tqjsn5ocesn3t9o0bcdh0cftiagcb4fy9ijwohcfhze09m46n1rctnn2bm4brfbnidf4g1hg0ge5pakgdvpclj8uduh5ojerdx10tch5mp4ggcqbq9txoxw0kk1gumzgp50p5k2jwrypt5rpooej18zkk6919s5jj2dlccvf9h3mt7yo75twc9ih5cemhycw9wyo8dksacsne56tzx8yl9vs1irgk0fqrp4lp99m97marb4cnm320e0mw6evcey32zflu9yyv8113zvy4kwex3uw3w9l4hwf1zru9ituzofcqmalynp08eoggwm4hcjy9s0y82umnjldgbpp9gfpc1p4nk9kowfea2f0tc3qh1kba93r6zun95zeartyqmq2odk9ad59be2ptbb2ege3qxcvmzbi8f63sk288rdpnoltvkrlgs2iif59np6knlplsm2mgi8uter4ytm17pnt97ohsjri4hr6n1dq90gz6932jeu24650bnzy7rv9mtrqhkmv0ao516v48fmfm56ibsegfonwbt5e486y74tarwgil5l30s363nxs7ex7w2a4c0vp84k19n9kmelmkl9iqr502fv1514reeni8vuc0iyl60i62xgja99uc22d693pwvr9n9071tn0pft8504mc7q5da6x9yd8zet06duqiveuzhp1l2g7q281wevztczxow81hiaen9pppnf9vwgi3uwetg5m1ohdn9ar5c9aekyc1h31bfeyrw1k95gn1xukclgnny',
                redirect: 't04gvs6802noi20vrdjd7umeysgujwlhwh7ct5mkw2cxfsawill9rqk604404f4ub2e8f6mrytdsuexlry8rlfb2zno0bfdemxx40mz5y84fa0ky1k19ve2dfi0zhfo729nyix5obkoouuvmfjbsn6pl4wrbo0koks1nd0z6imn6ya2b2qlnn1qendorhf6f1zaqdz848he2sd2s7c7v7ftlj4d758vugqv5fbu7a1zpyb2zyz6kp3m4xuxyjn7qrqgtzc7rtyqbxiphoi0i9oeq92x2rs1y1xw9di301hbzi0kun7rb1gyqy7ebqpgu4edm8s7cpnfljcn0oubdu37wp96bvxmv14caco0hsbsmm18p9v4ndi7ea1pso3phmljvt3q7wt1gdz7usxqvdd7rpyfcbunkfebbiiqmjgccl85vpt18uv2be1bfbw6t7x9ivw17dojb510w99sa604y1w80n99y1dx2qr1va0kq464bcvygoob5r5qa7w21h88nlfifl5zwkce7ft7golagpsic072rid3uidjrljmcifd1wf5u32n3i4g5e4ug1cx5j4bymitthhn4gux2g0g13vcwnhgy25vadwfg6b88hz1yy2k1p3ep20m08gpa6mz5gt7i54fpaoz31o13vh6il1jd568yb4ize7iyt7ibe3zyxil8iccogvlssq6r2uhegqgcpgpf2nsdz2zqm8i9kg4pdw50xdhme4i19b1qh8b8vxghje6bs8m0cy0z18uuv9ox2om8zzzyxj6nkew7sj2ove8czq7c82xrgku7zizeuak7f7dw1tujj193ijjtfz9w84cu7slf0bmdx4tc5nwavux2cvgypcbzxxoncfzf9k6nr7yttgkwo4jdjwd99kkoryxw5v3me71e8liafrmd5g477j9ivnm4urw86ee866kxhbiaxgdftjxmh8q95ce373xhkpcyb7s869zj2snuqaaiepmbqbj8heeiob1qndhq582urcfmlrk34sa7p5azn7kyuglyr56fhvfxaf7bn81b3wz6njueipeehnh0131ef0om35abafi114k1cabn7wl2569we93knodlr8ng0p44ak9txedztqw2lugcrqhf8eyq545nh7p13o0xhqh2odsvfvcx1h3pxdxmwucbx1jeab5tdfyg979bgshbqdvtzo7ie5qifuy83yrbwwdqb59fqjfyf7lgtbyd23e4i1ppr3ieidtqhas6m52o5fcz4046vurnvpyhjim4zpb7az18e2ahpw0dcmu2e9jpkye0idou6zh2g4mxtuoaqdd7q5y4hpqz4auh21sg7dfnkoh8mb2ssc1x9xkl52inq6402hyvsgj6cvqan3xtxntjoi4ss98qpbybdypqfgrn895o6jt1v30lmplp74k3zyd5mr0qqh2zkusgvwkjtbqm59ebnukp4b5g0ee40j1p1smuux76in0lgwtwdscfh0du505yh9fbjcj1tjg4yxtjs732dbmna52p78702lsx380cmwczjbpq0mwsik8fs7moj6wqg0wu56kohix4rzwukerxdlw7pt437j8w5sz6sbero4xqxu6p4w2srpog33z6b9dcxbxp0un9m7mjlxhraom9n8090jlazyue3dnj8yn33x1l8tdsihjleldhjmcdv65w2mtfiqpbep6sdhxtdetn43kxvn01re5wwpr02y1osv8onao4566vfudvimn1w4pgj7i6cenynrhptexs27gqn5ixlbiuiul4xsu5lgbefii5r7o83n1zoyk9tb0rkahzkfyk10mb7hr0gi802pskg5p05tmlxb73jk9ymazozczi0arelqsuk9vx0oxjmhdyyb9p9bgdujh0n7zylekbv0j0algkkc2slhwwld95ovhls28brv352fileikhj683fpk5sfxq1bwv1tmob98pxsa9zxjuhyrnhifqpmmk41lh8l8qw8ewhyl7lmmdo4naofropoe7hkg7spm1lxvz12hk6es2',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4527463947,
                expiredRefreshToken: 7060537623,
                isRevoked: true,
                isMaster: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'PASSWORD_GRANT',
                name: 'w6v6zbhranfbz1ciqrpu7qczjjqhgy57s1rbzrq4ucchg7fx4hqucivvhgid1fu6b64cdsjbcq39nwvz13bc2xpavr5lauqn6ewoybfjttuzorjcwtm5w3pc75mxxh6tnr1vmf6y3zlnk8mmrevr9q20flenog9hj2oaosxi466bo5vc8as2csgtsnq5xhcjlu6dfhek0jpqf1puashgzd1not66ixrk5hh0d76av3n8ee18j6n1lf465qkg04g',
                secret: '73rxswp4o6kll65cnbtb8re0i23qmphg7uwba93vtqcuxt2q5javn3gdrg890xh1z1sdoru43lro8i7uapy8952aah',
                authUrl: 'd3x5cuoklgtja422ihz0ow3t48kq417fwhwpn8tnc72cbn8viafnoyoovzzaufy53uw37vc2tomap9ri1dtcl6nykjptfbbatlhlfhjd48loa32evzcsuvr046ohdq6dv6nvwjy0ls8qbqya3xalx0bcd7ncnc9kpuosybrri76ar91yi973kbuf2g4dk6w28jtipyzd8mvbyws84nl2s943q9on5a6jofbybddrz5fytasc7uejn8ay2ew8m3kbu9vqf5m3tka3tv9jwd5b3rkamnnu8jz9ivq5a54t9a8c554i5r4bgxbu0jdndmaz0tauayzb0x17kh0gu1komyg1xdttio11xt1cst5omvdb54clz6phdfjlta57f8b9nzn6sl2iua9w99j4op6pqf4n70kdep2y1i3i51xikw23d8zza8hk2jmjje5p1aasvp3aekf57moyob74t2ydy7z9zviqycpm92v3g29rsdkzs6o8yr2c666bde8h4hyw7ysbuqx4wrlr2wvj3txk1jrtxp0e9qz43uml8aoi0dbo2awstc0mr59zot8pesmhifrjf2nyu4auopc2vi10ci29kpcr7fvr1kczsyr5s65f41s4ek07z3uqym7xlg6fmku7h6hx6wexyz2dbbx2w6s2etjui57gg4iu5rm7x86hyzub48d64tcqnz9rcbfcrwzbycb4omrrxvq4bxr7iqlz7asqyg2kqovu9cw9ler7gasp06jc5pvfqj3bxmsw8wov2fm8u67pia79696n0d971mbb7ehw2bg7mkutkta0vrlcswzmcggwplalmpmio4n2lu1aoykzl1dchn665fj9d71slu9rafv889kc77o68kw5nzcmrd34feaqie7ecblf0n4n773hg3y8o9sbsa1qb5mw3uh3gq4bwwlxt73kgdexlxguzv45m6xmmf9en22sg7uakdbxsfaf03aftqoawe53lm5nj12a7b81jmb0dz0b36z0c25jnyxssnbldcj84jrmcop5p8uchb0isd9ewv24xjwgu79bgybzc4h0eqtix003tl7roimcg0cg2m0p5n0vsukk0lx95l9zf0b8z1e39hdyzhtwl4epr6kw5eyub2z3iqnpzfgnxqsq3sbzkk9ff9hlscialyzmtwbar7z0i5ujl9ph8mrgcak3ayfz7bdw80jpsbhf5bq8j8tnrub4k8972lqcrbosargr85or5nieouas4orapf05ovc2y54thtkcp2nifwar048zvctoin5l089yimzy1edck3kblho1rmpvc4w4p41sgn5w0wqx5lmozw4mqr32keeh2n6gn9fscdg8d3gsbxu14zljgrk9jsck1ilgtwowt1dwanxiixjl04jhwo8runqsp5cuochlewmgun1c5r5vroxvzu513y3rd6tjmmzxvu48vf3hlx1jlfbshpcvrorz0w8ux43iot1e3whuzbivlbbuee7fe7xgw9bjjf7ps56keoaewnfsfgci97qlz14m8qos84irr8pyg7n69v6dqnrrwaj10apsthxmwq4peh9w3c4y8ag7fdqd8hsoywy4ed98s028v5bd9ri2wlb4u1sbfynxx0g3nfr2flsdaceef0y2t6r0f9vnvpye0c6a1savpkyq4godct4d6sajpv0uccxqa3dhl1roo9nf1ewhw2gsiufoam9zadm2ck0bcxh0gt34h9aekap8tlz3vr3n3hb1c3ogp70hpdluduum7ce6he6h2qpfc8g9cx15bb4osoqvv86xu5nm49wnh22tsioyj154e15dt1ndyr436q34csc15dbrya40hz8ltbce9zze1zej82u5kp80mhsuq01ub5vgiwzgmhcwwg2uzvncv7heauv3ztfqid05opvisfxf478nwz4uyipb2o8zkicghkqki0p80oh6x1noiox2xr4k44eymny95bvmibqpbx0ap2bomotvjhqr4ymxisvwi4fkk7v3bly54iunawzlvc164mk1hkl1',
                redirect: 'kqfifnfsskwm57qgf5wpo3gdtu5q9vcgn92x12qu3ury3nx4vta4ie0uuhdqnglpn4sqgxu21qf64hjqza2z8de94kdr64eck12o5ektkv3qfr0uvue6zwi04a0kxj2k5jljb9raf55a2suq0xzij2k3ugn6xrgbla0dhzdow7dzggpcjkm9j2eumiy0i00nkllua209tlrb6xm2c4c2owtronkmhsjibhbq9jo9ozb2yhbchucw20shj3kf3l2g6m9benp55o0mpkntn4a16hfsjiv5in9mtsibpzyhqco31i517xpz34qxiyrfrpe28fvbpojw5wbdgrixvpijjy8m2n96zlo1w00d81af8669ui107dd24fr90dsncyngioqtwpg6hqg67fol5l3ltrxp8fw4iljcbg1a80ji0tk3qhymnk7ccbbomm103q9p8kr83xks2aufkjln2xrz302amdr5skukjumdv58pk3cqx50kl5h6e2ujeghqpsgl91c44a0yn08moy2qrh92b9tmi4uv2cyjf0dnl4lbmnfw1fy2945ts14u0tzs4r5am61hbuy449ce64mvc1ivff5dotb2f4fxjjz650yrlqn4ptrv5wo1120x1xj7ptoupdnn5lhlw156hku6lmldb89bzebfbpph7wimza2vqi51q55ulm0nub7tx65v65pxu6yk5m258p1ulc2vgcagcga2giw0m5brub6xjy2ap1raxouh99cfq87a51ezoh95oies8lzku9scizvzc29patc6j1swidb2i35gah81v8n9lg8kzy8zv0pxe3t0gng8hpadnceubtxyrhnowg9dn051zzi1i17iw042l5mntfv9yz0d3a5m8tqrkkvys7tfyv7q88qx33umtytldala3e8issvwe34x6zrs8j4tabcyex8t5h4azxl9kk0xa6xhy1l2oce4r0dzj88w7gu9vf8lktj8ci9b2nfb7341g4q4wi0y0tqt9lwh0ylwvh1far3yal66yr4hydgxmz23xgj2m1ef0zevfzecy0cx5uwgskbgxtzs4fl40u1805090xvb50j5x68fxzxhrfawdu5p0dm1zbkgqg9aagym8u9mygfbmobx8vrtaww750q2avsnnafmkefwsafqksyv26l6gezqmuvawjvey5jiehrwipvpx63w5cpqlqpiqlmfdokv6z56egvnc388icj68wz1i0zmy3jy983rc7lirdzmg2pepn024xdkvj6tbkdumbqih0y0g0w17tc282l3gd0dylynx2yj5fzzfxqh1xu0aktm88vtvgd87sbrlwptmt635f245muj2n32n6vmxp5denfoy0bqcelse2zbo5etqe7xkgx92ck94qlz43argycgbjbu50rt235ivfde2ntnft5nv18qkopp10fjnqfp2a9unv3eczrjl327z78fx82facsskp2qdkwvje7e4wg0hwl5rz21w820v0wjji2j88cynsfvl5memvjbo33z1uuw6wn910zwcloaklrqi4ddm5nyiu5k5s5mlxfmrh8byuaruijmk4z7tkwvd2k4ng94w8rr43jv5yi0pbh7x39jf51brb7aok9esd2biwrb5iulech8g2nopkrcu97dtm0jswgq0mxaoug876utiku1u4wmuwk0zxi2a451j27bgz6ovf9i77zwcw58x1g0tet5swj1yrxiret6yhjrt6wq2qlukj8cxr1qfa1ahizj3af8d1s9aiwg5sqzizy8nji73pcydggrpq0kiymjibbwfs2yymxfr1itkf7v1ni94baad8ys2yqr1oj1vqed9kz23s1msnfymeled40cn48j6drzj1qhmwp34g401syt0nfvg5rtk72z8oslfiv07p299cwhdl29euw1t9am9ohh4i77j9srnb9ngyhdz5qvwg4otvs8hz09e9teunkad535fbxnmq093n0hocvm9yzl1owmscansmfshmj4enzx44wqms512t6r1j84ca9z',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6883583567,
                expiredRefreshToken: 9351979791,
                isRevoked: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'maqnz3ah60572yqt15m9horjfpl9a193438ms',
                grantType: 'AUTHORIZATION_CODE',
                name: '7wgrhoikghrdd2ljs87jbv1c3qf9m7f0l61l1zr9p9ymrss9hqs83he3fbhlyyz2t9r1a3grononqexg0p3z2z0p0rwd7t0yhavluxchoesvy3ysfk60pa7yoge050m2hh7pbo940sd89npm3f7ahs7pwuzit2wu9eo9zbqbkbq0rcsgjdykwiosxa9qky9dascv8lbncuye49xkjo7hiugs4ttkwyyhgev4rik3elpjgd4lsxomdarwmtnqooq',
                secret: 'h59q0keo88632y1tqmn2a2ixmm779va3jzdmqwot2i0a6hy68rgwffvdgaqz5r6iyghp2t7s2qwq2jh32pgo0wc7kr',
                authUrl: '4gxjxokfhmqgmszaje8kiikef20obqiixacvgspi50esdruobef73hj6p5ibd933ztbjlyfotsolbw430cet2wd26wfwqhmzaccxvzxihzjudlm7f77cuqz9j44e3e9wgmyenqakc1f373l39nu2dmzm6ukr8fggan40uwqiockmhng9y2b31sweqwc825xdgx1ziifuqr9e2liftokpzw8ppp1527g2f6imp2bfqua4wjt9t0lng3ixq1ydy67adbj2uhjvne556ab7fasjgli5a2wfgotnde7u27gylw80vh9dnyo78eieoebmfv8t8p4vqsor9d83328fwxacflr1odks8z99sof68qzu6li9qkhqzz3ojabkkk9wgrgfbayqxi03gaqqbyzewvvfl2ogpu8vja0ukx6yhca1u53oxo5zo3zc1zp40m60m1ey65q9jgyf30ratmmwsekaeofd8j5zv005u18fvbmirvwap6gpi96zmgptm4evd6z4xn6kcyr3n2kunywx4c3im4u1xsrj43tn14qzzhuybdjaxrmx51plrhh90xwo40bxpi8y2rd4a5iokrcrf587vc1orba2301fd7bkcrvcy3xqfqm5s0no73pbsig1k7oh3lw5h0mqav5ztf5ymxkatrjsc33g3beee9rzc1xxsynahgdqp1kw0kjz0hcleyx4stdeirkgy9pzl7uzhr54iqvgha3c3yegj55i11jbxuteu9xhnu9xpniz7hd8b8zyrtnv2g0zw6eqc3kn6rkmrbbihqldrumgg748zfpq4c2ugnlytdb50y6nq1lk5cvo4zu9tvqxh7mm0rm4ykqhw9f2q68pvuoqtn1k7zb69l1vbxs3smmuzuh2yt4nldgmz7yi8z3111dl17m5c31ghmd82bvynlxyumaa2biw6beh9614zh7b5hx5dkzplw08ufutcqfawa09gqthoed5fqzo50dajthmvkfu08yu7ofo1y8c6m4a2on0iettyacixm4esyebra5fad81ojfg9ffz82is1k004fqymdbis0nvcaf8r70d1taycxo0c4p3eympohbw2n7vcqdp6n7tnzwvolycq5el0pm7rwiwr8382oagu3o0nfhpp8awpyebyma6vm3n68g1ktwhrh03a3wuk1ms5x7b5vqx88ml4ybojbw5cfjea0jj0e28bcmsyc11vmewptu2e2veljkshvn7j2fmwoqvpjhn52zsnokqb1fjk9fq2p3dzmwmz0kfcit68d1m09kve44yimkfs6mioihouazf8f53jx7v0forfwscx5kfhcseqkbvc7cpqejdp9sj3bs452nlf9xw3fihpd3p07svgmo1sk9bvpi96gygcf44spma29npdbz9fepzoeflwx7cio4jvuqrgtr9hev85hjen48fwf7wu44i1zycxl18s97j9slkjzew43sn9ae0tqdz450h50mc5cstztfdp9jzrzsitzgv2jws7th1ccg87xsqtk2gornar5cfcaayp8nkp6hc9mzldnsn98t00q8vpo57we0gjztwkrn71x7o91w19adwqtu5pkpi512qkmx1g1g2xtm0syhi5v2llc3td98dgj00zszryvpfx7ao7evmlvyv7n8mbkqnnllc9mu42acw72he5hbs7ko2xpr8u3qkye7wel3bvzl8hhpgn7qp7mf3vgwvi503bv4kokp07vujz7hv60mkhdpneqiz867yjb5pwnv40333me984tcjv34aucmpbwz8blfof3tw99t1ozpl0jkynwazktpzh0881kbj9vt2u13cpvpg6aj9x8cpejhq7py14kijy1qwixskzvfbf7oc5ubf2ivitc1kiqqeu79074dx3qwpka3g7dmwxz1rm7hsk3i0lm4sjkelq26jh00opk4td7cy334rnkyfje6fvfqa64kvonf5nzcti22easmr025nd9f7dcoii5y20hfdt53rkvh612gwps8bdh1sqeyipwuljx79uvrfh0al',
                redirect: '94gdhpidjq48iylo5uvijqfqrt0c35cx3hm3r9k69fuyv6vo3w4zz8ei9yapoxd249qyncvuix22669mhck2j6uu72z4cg3ig7hfl7omc96hlk9tosboiradk3yf2bst78elz3un4lcb4moxullaxavjw6pp1w73trs83i28ra7t8z3sybdfy3p2z37vjyfpkmg034q260t25irz06q7phin3onqmgvj2ubt6cibz37t4aq3hyzqtie054n1fyrkie4c0klccuzprkn8skeitm4fikk48gw163u8h9a48aduxjzr6ui59zgk5o02smmdklmu8bymju8piw7af9jya4fqac79sh0jjgfpg4qs3as0b9jorzeslhpgnqprhripkueoa25695ilkbvkwbulmya6rql11vl9dlh4yapnzbhbr0h7pf0tq5sx1ax1o1f5a77omrwu72wcyj9wq6qz28didbl5zcq00ebckxujy6s48cd8hxemwo1zbbpifkdvh2dox4ux07asr0141xgxpuvnbdu3h3nskn0sy5lr54ty3jc6swcfu83r019xrbiqnyqxqjz2cw1isetn99l703oqcl29xa211pgwn4yhaemoeig6zuk0xxiva9corimagu2mi9o8i77qpjs18jlfll3qezatkn9na854m697qu5fufuwplxec4q3x6yd5h6wz1piznzbf5qb2jj635nqoayvgc7spnm6hnvvayh4ely7qqehr5gqku8y735wh7jspof2lskgkrscefoifhmp79dyb82idpxlmemgi8dso4c47bl2jx2fujad3mzi86tx9zq1ydzndm9jkqqlct8f9qbhkivscljl21hjd4v9nx6lj8vx78nxiopr6xuu44t2oqxoygt86iyw1xw7nf23dapidaj29vaw2k3064po3470nmu98lt7yxp4ug8ybkv379uoy0kvg8v5vrwjo2x82mw5zdavj0gopaswoqkliu6ubxkyucv479jrhlc45bm0gq00k5npigub4u02y1i8xeyzd8sek7bs4cbb2wo4w9i6iyvbiyajbv3pmecue0tw15vcw2h89gpqlz6ejsj5qoj1giw3aop4uoejogcqkwyqfalorfdkfstzgtsgewuwp58d872u6nl44dmzsuewkb51tq68mmx707l1ty80t7nfrt7m7iwoi4o90t76n2i7qeb65zcx6vs21l7lmw12wdd44t0p2fhemvzza00azybv8wmtebj5rlvh2hsxwlqjqqvo1ps5mq8kifa5ytf1yhle6gjdk2h2lgfbx8u8fpf7zugicyp8dgcwx6rvalyezxi7zficlj6vmbeyyhigyin7jldyqlxew3qksi0a1p6ujaffpy8qa7xrkyhu3vpxi1346u5rc1u84itve1ncz4rcwpf9tp988g966y2qkkorgdhlapw03taaybxi21yeear0rpypcytlom9sxt4bzoxpl32712aqu1xd4req02q6t5oijsowagg2evriavjsk3zzb05dw0tpoekti2h7deegyjcla158g5jttzwvb9zxmx1ho3ymo2mo06sgs6vvy8zegkwx7ig88j6extml2wn70add7quxzf1erm1okgcctragk9h0xgjisz1bxjibtsn00642jluemdpv4so4c0dio57ix4cr6hf4lf4umttwzl38h2g0hyn55o5v98sptc2m6yygkuynnuvgxdh99i3ouad5ep822kstknqcp5mwnx7ix7xpp2ulaycuntvhacaelftxxfkqmr31flloqgercch8j8n09csamboyyzjidet8dsie9yn2aqwuio4i57d05dzbw7zsw16s3qk4jskd8kb7seed04obfdwozoqjzt8iv6r0aqaxzx150w3td22kf5oc65lbzzh3ib9uhgv2967acq7p2hhv8ti5i4qj04hc13i3bqov1o4l990jm97wq625gfbpv3pqyalzt6gezd1rf2iod4yzojfqyefz6onea6yj7ny7xensnqfy',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1846405285,
                expiredRefreshToken: 2683454608,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'AUTHORIZATION_CODE',
                name: 'h9c4v7mm0sfdn74eshuljq1q3fxfdhe6i3no6pc43iy4tsz1ajrlghe65115uwkv2ddw3buoivcu1l4iyefmj2g7watgufa65fjvl4ahuc0qyy20nlg8kta13rlw7db87y5d2sknvspcf2p3stopzihpnvuen150qcqmj76a1gcfwf5c06tax2izsb3fgmmw2tovxpbv730e0tmz20p3ljje4vmraufuwfrdgox7ekmjy7akw61ux1hkmc3erzqn',
                secret: '52qr0b4bg4nhsaujj6a0q5wrg2hlwwjj5qwoyg6houjueptdd4bt0lnngux5ft49ahwv8a8k0h6dfxs9p3j5hk1ifn',
                authUrl: 'dw5f77pc61nge20ykw39666rk6nohx2truh0fcar09huucw211750ebtl93j50lo7u5p0w4767ixck5g32qe0d3cu1h657osyvg2tb7qz35fpxzc928ih49q5zvxiqabaupw3pt1t9qv2mqsd5ej67be4fz5aj18wfdqfn308g25oolqnxoqbcmv83rryj6gjlq2xu8r4kdtrya99ox0o7k4mgfq0tovummx6rw37qi2rtc5mu47dbe2zes5fud3uqsc5k7db7pa80zdmfty27tgooah5wzy063gerkrcgnq6b3xjelaa5kpmg3oqyblmmzfdrdh6jt9ct7jm1tfwyhbuskmei5bs4y4wvjfggzt43ybat8y98ggxn4tqzjvs49412hi6ljsnam9ad3hy5iza0t2z4sj3evpa5tmss4vouk61gba978ghykmq4s5thnubknqio9qcswrb2il25pjiaxbjcs2iia89g2n4e8jvp7pccglapg3s84gg7y5u2j86hzx6opwo0bp5a8387zdsahfn93vsx7j89pn5wco4yw85cfqu95g39hhxqua21kxwj3hxsizqfe495zicekzxyjgdbana5cdpbob3cz0qszozasmidb4uz6x3egu74cmpg1ufcdblty8v0yc7nh1zkzai88l8wwov7zg8ob8ynnbtjcyye8fo1ndzfdj14xis01wp08ujw1vmt86o0dx3sn7r9f8eh6bmgdci50ihosroqy69exari2vjirdk6miu0qdyawlahrlnng9un3aibb1cg447ih7ybpq9zljzh9ahm12flm1y8fpwch8bdecz0kuziql5zitdj5q4xxdfbilo7pivbphomgofu18z3dbna78iry0te37d45arzo00jbhupdeol2332u3f02srblje5cykjccw9a1r3xa94tnby1vt0ihb14obk30vmgo2hoc3ws9pjjbtvz9ob2havhg7ik64b5k9s1hyuc4i2nkdtuijr3bvolcsqr9ut5p34ea8l52uhfd9pvob6y7t8g7r9ndn2ju5nkpjwha7jdkbiimkd3ylasxzzpum8wrbv77jnpg80rxy7pnbtx88p3utprdrpc4pptevpnvmbsvlowm3ei0hl6c8bnjmbd5liaeas26uw0z1h5lucpwk2t9fgfvy058krpfkq3zawb9bccb2xpj9ejm1msecuyho3ulz37yeq01uvouxzpzfr60ft3d76uadc1nrzy7kzwrasy1rmyuxovdzbgssi8zpm2jnabilwfy5n48irmjf1fj3f2xec4hzvifzpgw08x22r6rshn6ovveiayr6g8pb43bvnbeblj2s5das4526eqg52ncfttga7wk706uqpb9x1gvck6qh7ff0jr12crj1iztm650sbngx9h99dbhz7a3tkf911lpeb03ys6mc2ys74sorxucgor1mrr4ss0vl8bkt6m20f5yo1ra0hwj7n5dsl9m1db9asdt6lxyu13lxqdifo9ltlmf2khsakj76fvek85gwjj1d2m7x9wavkxczi5l0z63s6kxhiu8psc9djbhqg5or59w5scu05q1c55y4dxrlmdxa8yep7yaoee1tymbchpmfarsmjdja8kfc9js3y9sbkxckycts0i84cxyuno2cwhmqej4zds1uq12c7sdmculqtqoq1bm96agjvt0jdmcwge2x20a0wrkdvr030wux8a8ii97zbwm085g7s8qoqz4houev6tup7l5wi1bggz2ehfq1yd2sb5jvmc5gceybi6d67ozljk3o4ss5e18p44des0gaujaiau6sxn7xllt8oxud5xucyfw0360xjlk8epp7izbi8y9zcmoq81zvnqz9qcpw31spxfcv0l8bg07ha46zppcj816wc2imsu633efy89yxklzj734ispqsezxrru3zglslndld1057lfjppu29lh7ho1fgtse7ox54lgafa8kqpc5h0t8ks42shl9ns23og82hs9hl5ol99vzleyt5lvo',
                redirect: 'y9g1y6o872oyagq5l9wp0lv1p47sthzud1t64eer29fio2u5fcqotq6e1qeygj8r4gujz345uor4qfz5wcuhv0oytl1cfhh9als7hj14jtjm6xqe1ilhwx0qq8mn0qx0fu5rk2f67gh3ccibhkha0dm72jcfzc7zhvs143shajcix19mazxbrv8xjufk9zya89o8cbu8l81iw0q0g69mr3f8ugau4w8wgjcxwtxkkb2f92jus7tcf5kkj8ubnl8xwlp09juf1a1licxanonmlufvc23fd1h36eiuy5t3ctkblej78xnm1pwqb543putmscub2nv3p4oi3ycd1cqfs187pfkuhylxo85n2sfznvye7bhe1n7sapyx39o46iurvgpqp5b0g8gyjyl9p0cuw9khrosag41l8943bju4zrewykja4rvsvrgz5j4hutyt0veiip0fwmma97f1e4serz9inr2bkrtp9m6ugo6iu503gdtj8e4hj7q8m7h1flotcae884rnjqlnqddlfujokr0osyjmb6mks2x07qsphsy1otyiljuelqplb8y9pab0ygh17p6ubxhblxkd9cazda9lix4zj7wkl721ha9evygdzs2hf5k6p5wehl46mwpsgun5j1ij1guotd24l3nalulogdgiti2o1krtoto7wtennpy53iqvhi0ur3l8djx8jog76yhae5l29gx03a64nbijzg8dmv9ftnaif9282oiw4l6pnbhkud15s4u44ejsis9u6f9c4yj63e8k98dkaigx64gw13cod7cr2fqk3pofv9fmnrhgbu25pcnw31u4s1nqx49q4hhgeu1ulxtuinokaqutzeo7i0xdy7owfe8qwt3us3j8ua07wojkfqxh0nzhpwwe61jt3rtnj199qgpcigp4bwsclyugaabk8tdppkk36xxwj2q8k68hlcw1x4xw7yvdto0jhfupflcsveugy4xlprlq22vcyims5geedmal4aap2fu6raj8hig745kaxfwzrnffjgxazl2ygp71lpae0m3dxgbbyuqgcb7o8ou0ywsa7n5r1lrx3myc2glmr3npqpy5yui1bxpggh4tc06v8t0kbu6k3tbh9e212mqutag8at9qxxd359pjrauhca2p1vbp2hsbp08m6zcgws09j6nc141wi1sd9yw1eqv9h2f5l42gn79834ium7p269llwz1gf5tp2vhd3iv8flun3g2queioau8wfc9m1or1gniazqeb4z3wfmc1vdw2e9fi50i59rm46cbqis6fqf9yu9pdslwmioacxj111qqw0jptjvwnwh3vs7o2wd7gpohiihhyfzfo9ri0ohhv56pm1xfl6uj7j6uvcocp7zq16nkpmn4juj7pfss6caukb3tiuq5m5fijna6yk73twys6i0meikpz60g6retj9pbj1i07odgu4cit9z8615sve5wkzjs3yjz396mkqv1odpo9n6hqwcnrcu18hkczynv6hcur3flmrhjdehbxyaws44jr2y1h6a4lasy9gac9gor31wdgzavbyovz2eoyt9vwrp5szkcctdh9mnozuykyd7zgnryka75xgoa3k1tnjz0hsg914638o9x3p81t656zz5ym0ozw7fs21py65xqwfvrmmj3seuvylprj57vn26m8b1aci8eaxumc1ap0uv569ul2j9s60opqlcuzksm5qqain5nljt7nnjvbnnl7evlqmtuu5r44dngef2zksd0utalczg971n8pzhja98y649mdq2zi25fq012ngnvir5orsxf1mdkyf5fsd507i5isi89gxf4fkllkp6ibb1az4hxfhmerfl3mz3g53xxdr7p3899v3wqyi2f2u1k2xawhuhks65vq8y6xl3dvv9eyduieevao6p7jeunhiow24zv72pbtbq7uuvfb47n093tnt2wtz5u7x64al9w05rwbfnzsmnscaqkd62bh6ho2lg5phlypvs3yuwfziyaz3vsedb0o9f8d3w2ojvyr',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7031344590,
                expiredRefreshToken: 5775648750,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'AUTHORIZATION_CODE',
                name: 'kc9gbri9ysfncwlnqbyhr7aw05jskb4hyb7f0k5cxk6lrgqxgg2e1dlmknlivs48v8eep8d7mr6x1njee4n4522ogpuk71tqjrkc8b1woccrnld8v4as7bn1k4n4b0j6h2q7zmavuinhsvto27dian6dm9x6fkiie28q9s2a27ed7657dcqsu5vavf89rzc0p88cawj3cmdn7syqwu6jv804kweybl5t8xuxcrthwuqfxpshijee0x30zk7akis',
                secret: 'v2pfzqljmipr9iy63rd0psuw9bacjwjpc387aadae1plmegegrnvfs0hqdkpu6fvjrzufdn6erv1alhtpy4obphg900',
                authUrl: 'u6ibumoky0ipb528lq59j9fds9arlcwrkwgdjrqgioh3zikz7abzcc9d3xxw3ih7heli201dqvbn00gy1pgcarhp2ntfh48zfei9v06p39hs5ibr71tuacway6fxg8qdmgvq4uiktw6ly4eavgpt3z311t9pa1rrfbslsis17pnjch5zj7z963eojxhb5b5jhx7vfdnh9g8siz7ui97rkchsobzlftbls8tl36cnd4fl8gipyv2qdr4df634cld4xuqkhj6liyyp0mbyqb29kzw1pwm9j8ueydy7qy51qcpgvqmh97l48996u7npk5k9vvbtuxwdy6zpumhrc1w1lo0okklmzifz4qvr4x3ezuss5itbo1ou92omsh4dwr1p95iu0s0lclafukuzaq46hzjwxxpopfh5tbj2piwgex60b7541vcmp7it5i2p8upwnodkeli5igczicxp9ypnxf7frcckjokcexa3q769e4em4o2jef1vd3s5bvbhx6rrfporexccydqy6mz7cbuz5th4wq98rf0rlp34qkt79fap2t5b5ois4di1r4fw3ceuhf0lepsyu66sz5b13cbslrakduqi99qzi6jskd5d6kjb3w33tsxm73jms436mw28qwhkiemzlcej6mlt49cxa4jn4ceobna2b7oufgf6pjubw58lq3amgx65a7mk5ft81m8dkzsqez8wt1c7911t01vdmg4gcihe0furtc6y7saadszz6eb9f95e7z2u7wxne8c8yfjeb3k60hpsfj6zpyj52uhb0639crnjgutpfcob6kkimwn3lmn3kybdc0qi9luh2f0g1uj0n688ydnusaxzzk3kd1zz4no0wn3bzqsvftj5zh72dmtpq6cd21g6mwcgjb6447jb0vx73k3lz017clgucjnbh0klg2stzmodywkndoiitdu0f0jeuktn90ovcfvv5idi34v8ekcaunjbtt0dl5weapywqcejvs76icyo685q3629dt0518zzecepaochkn7c28csgd0pbyw646awkq067cri0k5i05hckbpflh14yo7n1agcy9bgw6suyte4864dwt4vt14rpe2t3e90yi6681vf4cm6nmb9gw16bpyzorg5s4szjsxestrmm8d48puk9ydpn77pk937wx28lql3zg15kj8xu47dyzs09i39kihn6jzujoj5im98zg3zth8061jvwryg5wgn2v220mw3ri6t29a382btvc0q1tymelyh1r8dzndup7u1o8pcsbzfxnp76to2e71xx63oewkji48rgl34ffc78sbsneqjmfpumg9qyu79v6ewf8qgkpnyq2zhiibue8r4aplvplpkqqbtua3ovjephs8a7p4te0a4h1yb9a9670q9npov6veai5dgs4rf87j1hz6p9ggemn61ckudop7lj4143oaus1fn5t94n99hqqnphfrkkbr9e1lgvg5zve68y7pvolxjxsokhyv8lq1eg93090r99el8bc1ouz3w86mx1eos8w00q7qd6hlm1xk0jawaf30pkat0umuvdx62y3tplrnkyl1hfghsrj2xwleew23f63uova4pgy65j6kj3cef0pdtfczerijpiqspobqpi8xl6ofh73dz5qfk1tyb9wa9eapkwkgvz51gbv1ox1t9svi5e2au1c7tfx6kfcxuz2hjrbb9e86wbjt9syl0g0b1ksh04xi9otuhitas7g3jh9ul7yxzuf081bxl9i4k4tuz7oeakap906az7kj59z7taw68l56m8p2q50zz66zsxj9objv5pmm98mh7vvxmequ9ar4szdffjs13l5tkv5zhby1xozqmdm20erq6wpjey0jw9qwqwya3wdrarizwc1ycw1fs8fuc2529uroxehbdvb63tr9hcdwo4nznez1wppkw26kusslegcnouvisazpnu7bm3le8gj3h0zd7jd1fb517svwv0m622jyv3074h31damvxlq2h9dls7elz9hxyoosmrc6vt4dx',
                redirect: 'tl9avk19rtuwsnszn6uiinps0fayte2llcykp26b8h39gi9mkf7cqddoqgrt94e3z6t6b69j935ifqlle3oxkt36ejd29ju4pmj6g3pm18vgbn8tu29g8g9x62h35z8wetfzic44trj8dfj2qa11rjw77w41eup0weuu4lu1oqx5bix3a1meljxw9bn2h02vl01eycz4ln1ay1y14qpmncw5iw2urgn5p4v4ya51w7a1zlyxv7l46y0tbnk1fsrfezhvpuzz24xbsa3h1glkkwugcghmllyja26ubj6ze341xl9tebj2ly0nn3irc9l9tvsbc6oaypb494mowpqy1wxjgy00ypygwv4tltotw9pl61lmzmlsdbrovs41g8oijd78o5j7zy1xro5qea1iq3v45jevk1jfs7774nu15olps2vri15hmjvt9k5aq5ghjrva9eb65ddwef0qpi7wc01v9fyfbsd0i79p7mytwelhjqwyfi55k1n5tee9xo4yv3wu7huk1msvu09los5eiqf9jg2bapj8akayqdiw9zjbhektejemmd80uza6gk8z8bp0jjzomx276ypb3a02rgp99lut7pjsra7wusu1bf10yvm0anhp6cimnn0lm071paqagnubqj3nkzsjougnymsq4ax84qqnyf7zv6bv9aa3sp6e27jlvrfzjfixv7s5gyns1xgw1l9td7mqlr3cs77g9he4309unr7s1no5rodt0hndvmdorn51pus7w87i331ev2k1og25lhvrus042044ybol40egzyhenegy2rnqidcrsr4gerg05lieu1wq9gjw1z75ul3ua8fszquplaakipb52ais4zlc3aph1b0ay7wcktivc978nswww0voxioyl1vbm14gxe36i7rwnsnjduor2if7ziffcz4v9191tnty7k5qqnhx7kl172f8t9u1aqftft6fv4lpaj9bsliiez2anz8tdguchxv3w7ifw80b0rbm2zxeptznim4fqtfhj2f8bt7n7ruh55d4he9fma32t2s926cjxibbz9x6s8absb18yyly36pv39pv11ih4sybg5lckuza8wt4e685611ggftrotgvbor2h9np5r69cip2gfyxob9cu62lu1xpsczi8zdpfnn2wg1drn4duy8xqw7hoyaw4hmfx8p44mqbq6jdjt5jcapg5ed87diwcxm3h2ay9lddnlolausb52v07lahg5n5e6t0ol0z4cpqfw5hloqwrvcv6wkmaq4wjyc6n2zbbl6dyno96b7nahgzmfqn6yg9mk4z9y7df5sqo0ziep60clrqrms4bqrkuhvkbu9uo41ora7hzjuk6os2u4jc7mke2co1p9ffw5pryjo79qycmrugn1w0h9u74s3z3klzbeafqd1nv6ghbemj1uruqpkdlpimg4nmrobbcwisgh7mfbd1d8u9lpxb1n5j7hor25ek3z4cp587gc8eh0yfn0cbhf8xwms7xgjaqjsbtpc3n4rmmk398tz3hnnymki908r1cquccdzavnxd9ihec7zl0auziwtzja3vilkkpomzsqg1htqqeoj14ojggcerfndvzan3bej4tg7ml8xnu2s5nhf77sd0pg132cic1woo9vopmaty6cvo4mf06s0ezs0qh6v5s4cdfkwpfl2g8tyrsbx0cx8nxdgr3zuato4ungj1p3i9ey1mqb88mrwafdzqqqj4hyz7z0yl8bawkiur93rttspubmj4y4e3y53ln89vhelzr4xcpbm86khuze7q3bekcak9umf0dzmuzsjpz09ry1w7pm5c30az38l8yot3ro1u6xpr8495ni04slhqz49l8ekjbb74jbgjofk3in2aqmt7rhx7gewf8pb67a756tsb6btq75r3crw3m09dj5cdhjhwav82gpb5z1uifqxwa6bjl94lf18et23knzo0erh069ia8l5ia8p6nxhiwupcfygzosfcfh0tg0zgwnx55o3r2xiaed0lf68w8mzq66tf',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6343401142,
                expiredRefreshToken: 2828163070,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'cqgsqexdpqreudxszw0es7nvut71go1w80swq5ls86w7zk8ifuack57at79ymf1owllviv2jsqf6qszq9b0ovtnprz2z0s8ozpkink3ft0mglldczvx45olf36so3wyapbtdu0vj5ooj8nym1e59z3aesg62ckmmnse5oq340e7q7nlfmxmy0ttsq7qrzssdqd22ewe81ya54iyn5liolb5ror4sdsigqdtmit5ekedmxip0brfz5jc030eyugb',
                secret: 'glbnbhipqhmli8sek62r6ozelvenvfea33m2qptrwwh8vobrjmnswssculmmkn12emfv6amnm1mxuxcv5v1fefgzy7',
                authUrl: 'at8lidq947czpyr2hu7w3spxoqutvq9z94eefysn7v9q9a62tbys3smxr1e5ev5ue18hpxr5tytfgqpfx33ofr3t234jkox41socik3r7q3sn4wq916lf5wm7kkiizwc0bijnyvo5feb42pt3935th1v5wbw6j2kv6glgbc71y3r3we2e4oqp7209x1lvidqf8kg60urkniu5hoywpjq4trvdw5s7rp556f35gxyc3947wsri3rjv4y5yfw5nda41ap8k9kjvrve85v8i26svpvlyji1luhj6frd5gwph5thopz3fmxq7m6jgz1xuftspduj0tpzk0zlm1f7r6thlobpdvf9ifh7rfacayrkas2rd7r6ed4791m36ly6sykousz6dfru3p5hxo30tpds91axagvecg4clmgcw3s6gt9rglos95u7ovba8dkh0mhaz3v1t0mcxvd49i9lsl53dq9p05h8mf9yb6xcr4n5tz1duwpln4zs1adz23si783mwcyc2ovny6wl09w9zqlmzm0gokmooc63l199nx5qcr0d1wy73zgkt1ujktrevck7a5m1scyxip835kya5km7f411fwzua55q1frqm2u5uqr6h7030b4simr3vhtkdra0uleisk1g16ir3w5ryrnhlywaczo3tok4qbysi5n6q8b24f6wcb1azzmdisk9xnpmqtpwbaileuxw2cpzrezmqfcwr5vbdoraahf06btz4jyfqgynxxvr7gokmqwu28hoi0tslgofwhp7tlfs5qj1dvr73297rh2hrplxupacuiotlcl2ouwb12ygkxbs6ko2tcrsxhja27x1d51nf4r4lgmk02p4zrn6lgkni6oa3mzfyvle0zt1iv1wao0gxhp7c4tjhvnoydx03hlehnfbr35v0wyou6thezxpa447p3ve6g0potzkeyeza9u6kw6wa12k3qeddnbwsgy9pg3w2r22uo1u78bswp5lod1ko4rhxnot12bj74q51mou6h4fka2atgref8a3168wnh0oitvenyg63blpdrzdjzelwgrhjsjaawjori0ftqmvbrrj23aeya3oa6fzwvalmajkya7mw9l9j7vco5thlbr8hmhzqlomksk7a4ajqv8rrtwnk9shlkmn0qn2vwjwjt8zd1v6p5bcs8e2miges3wiibfe7sy498u712lpro3zh5wmhr1kmmcn1rkduytjaggrwipn95d6h5wd56pyzn051ifgzkfm95qr21i8ptfkjypokhu9ov94l2ujwkt7qn0xcjsmkfdhb3kxvf3mfs3oq39odns6zucz32f0zdvamv1ghima5ldu1cxxgtgboyvhrnuj7nnghojizx11znzgx6irjduaymyodnm8yomqeqc4bmmtzg9x0gv15327s4xle2zctqmrua2rpi6ufj6ev89mhup9alwjc32tzneig7yif79oupbi3hftvgqln0lptlhztw625f5p39tznz5iazuebmbz554nfcl645ui97k6iqyoaosnw0cot00d96bqb48dvvve7cp4ffpy6toauxku0q06oh6de0rq5u4sz07r5qxfvwvgg3udvzky97yyev137kevk48ar5pq4qmupsm9jouc42vgabt66k0oai8huiy5xn1f9l04dh3cs4wc053y8br2m6igmlh1hblyf9wje6b3s273w8ww7ndb2qyz7y1tm2bdwt4o9iaujd53ntd63suswri8kx309o6tsxy33evbjygfcsdqdycxprnbvd7x23fs46kkfcl705w4g51is8miie2l7gkulgrppkol9ls0vzt839u2dwkk7c31f9mmo5zedsgh1u14uyt17gib5e3ua46xvusm6f9penwgjox0ha07mgjzfoq54u5jwxjjdihdw6nc9c6xo2wugprjnezorfvnio20n1ilcyp5xo1vlwgcmxwsocwbkcjolpstqomy2jgxz9d0ir4nfv20f01rxfypkbrc9zutmjrhpxpgd0qpaobjsjncrq92g',
                redirect: 'nr80a60860174phsmqgi9a9kckgs7ug3i75q63wrdqi904jnhhy449lzm9g383zb4bqbrlm71ieyj4pnhkgzgtadauvjkli7zfy4uur2luxxxuc54xmb6frq3o5ft8ws5l4uq3ppko9fmc323ggcf8q2n71jvwctf5eqy9zkngpr2jil1jl8tcfss91vu2zwxzr8o4m08vq0kqrojvfkg4zshxkbix21wbv9d3vsa6rn974h50vrfwq2jzjau2wl0fs6eeigcuo599nu7q95zu02cy0ntbfyicznpojfsmiv8193a3om7hzlmzotibmv3a2i0b5clmciqhu7saavo69zuml3lgp91qrvb7mhirgkden4g9fcuvck565kz2k0ktq8ab2tely839buvh4ep975b804k7reheo7ndfrkgt9vh4c0ikuido8ldbro119sx7fz50jy3onnlt7nt65dlf5q0e39oo36p1wp0rwsejl6718ks37thj0oh24st0a3r3wmucxflo6lfh8aww6sqm00jqa2qgpnh68pv9f5im6grk5hmid7levlbs78atnxi47nznbmou0iff3jeuna2onxd95zbvo2v1s8xka51d4xbmknf55bhpq3fmxqywbglasf67clm6ryipitq3t5xvfbwbxq1sdrbkjv9afgpwr0ji2kmkx3bqp4qs8gf8abopt32g24ti97n0o6qwva78nnyhrumfknxyqbvu1vmw18u4qkga7np94umncfr9vgl83empx44wyha9e52q2r74gijgxhy9gp3obl1cf84fkxi1medfo5ki21mqll64rabuun67k9h10uyuf0gqdg7qim1d3fvw7qsnzqzbjtg553omcmo63soydqhs85v1hwgu3o91pkfm33o6hquwx3npmtqanvy3ebc4n6bwlewywqllp8nfaxoikxhoifnpsius8ewnlmy0v8dhedvtvhse637g7axetq5nyfw7prwhulhfwof1cwir8qlj5uikzmskoqs33vxslsvbh5yvi53qcj8oqjvl9t4teepqf0bnf21iyvnak8ga7t1g5n7prsmpfmjhqpgp8b0mq41pyqk6wrnq7jxeu0n07wuhqai8hvjsrn8q0ibpelvrt0nz3c8mpuvjypwq95stkjdglh0qljc0vxbeqm05f4gonqd6qka2cc8kapzl24srzwmszw0pfkqybx85i2vm2f8jnmodi1mj8q7akkoml1adnaub89u5nexmvw8jeb558tl7z59o7bcbsqlldtmfyq893gkoy42r1tsiw2jue3tvb8jzj86a6202eg5mm6zr8dmj6olg5fah7jjxz7yfs4sow36rwvm4efbg1s4gmp2joxlv8xxslq8nxf8mztsa9id7l0m4or9km8wkd9z9apgfw7o1aqgxw5tukap5eihx5aeedks7dr1xso3ekwn44fzl50vbmodjuq2i4peqhjtt25chz3pdcxccx6cj9lkpp0lxjh3q13rn3wcgwazjnjls3m50n6321i7sm7jmkf52ig3n0mhkq3zihjgxhv0rpdadqhft316iev0imma16zzsapuc7w7m2b0pulwlry03hnox3461o8etbxcg5g07hlubmabwdtqgh58mz29qtzbm4e072tnhxh0iru8bhpzo00ipjg90rn657k8mv8a20k3w9cpmrtfu8tbirdia6h36bv6zxcr9usxyc1173b4naewwqjujno34l42v10j9ox6q0hlxn13p45civgttfhclvrs1zrl1k70flqm2mbez6b4jgokimx5m8o0924kljee35pt209c9uyl2gtpngbkn1q4v8kzrb5n5a9fesrsn5uqo4h6et19v1curkad9sg8dz0jgm9151re51a8xd61ow6mdv1twxz20rs2n20nmhmox3853h3ghbm32ckkdmt6nqnyug7v46h1bzill1pyd7t0djsd892ylmdr9fje3r7p09mvqby34mq7mkto2vxuby54p88d27uq6r5i8zezcy',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6777759150,
                expiredRefreshToken: 9224652842,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'qdd1l2yrovn2528qsl84v2bejz839f8cvvz2i4f63fve3aq4qxd8g1xcmvu31226qbty7u0yjwefshbkyxmlq9tmf65q2eurg5hehdmo3ir2yd7pfvtxz8jn21tmm0mjnh3i5utcxgnlcoysv4ydf6iz8m7o8f2blqrko81zh6h1fe0y2wlukik2lx6vfkil6y18m5cnuh4zzeaelfv1y04jxkc06tcxwjbq5x44jq441kwcxo86x409e2qty1w',
                secret: 'bk5lqfyuio3vbf0x1vgx9l8mqg0svc1h9cqlv6xnxz6b3h45ryhsm6f5lqiktrpfu3en13zgg860ddsy669cxek5r5',
                authUrl: 'y7g3zai6rdfmb0ah2gu7wwe350syalmrx5kygqzcel9x146pkujvpmcasj62quh1qehhuvn3grrpkk2ffn8w912uqq189df8ny9kpfcu5x4t89f5g37q1epjigqj67s01rt045i5jk14bi29zsemc30hfwvqjqvqv9m60hbfcoyfvh45y4bh163u3grwkvhhxjigpcssumyrc8aou07r4vpclqitggj1np6k3umfvcgdcs3so7noecxbfo0655l2pbwns2k20fw8ig9tq37y8w3gfugdhm4l5taj8n2aireqdovwlc8l7gusuw3n922pcbuxiigx9qbh47e29atuvq3oe1wy1e524iwp1wiyez8rvr5i5du1xw39c7d674g7tr15njay67qtelini5vzn62eojzt0q2pmldmt4qz7obrsiepsvkrp8hsczh9q1l24v2kkd5itw2bynwjy7q0mxyw08dsybehcz34vkegvwil3hl55fl48uyw3farplmpiz0nj8hlvcja3gn1mrgcurdp8jb3ljt5nrvts9h2sgaror6ibkvbmin0yfzu7vfd7hnyi5waba16wn8r26o1fhub2pyiifuykcmr9t69ij4n10tqw5fdq1qz5vh0o8rhjwc8h9fdjdrb7wioqx97w2v7wqcu456rnba0ewngw7avivyipq7eqgd1s3g7qbxfjsugu43gdoekh8ggfa9ei5wrei0wovyc41nx0ajdc5hi6g0q6dqd3coi7kpamt5xngr467bbi72d0aosuv0xonjvk3ev4948cixurkayhk36pu0ikkk18iyiutlrze3kt85mleos9rjbqum3aln24cm8zxy45jbq8jgu3o8mj5o6xid3452b7bt9exqeq43id25wkavrvapmnl7nbey2v2u38jgw39um0y1cqfmf7g3sor3c01tv5w6qvu4vb1eo983cff0u0y5mg38sjy9zt4yxxdmfvmjv2iuhxnq1bjk36dgsw0vv9jlt6stutcl7q1k7cg22re9022lcl3gbeio8zcnrez5k8x4aomhaza8g2qn5rrl6kip07u7n0xl4i4k2afckem27hln482edxikzeqisgay6a3k3opl40kos1etyd2fpokmk8lg68d2aejsidgraw2dnijjkp2iejefczxqlvr3cexlie81k2m7wg7gr1zd5b7krfzfdzcmv2smxncr3gbqkh8nrqqqwlydhh7h3quyfkt0rze275bjtw9av0fhoe13ymganmi02fc8cmsxj57kme23n9u4tw2e2krbrpk1as3bhbbtx1kpmzgxuqkdu77qske1m81ypnxy351wr0i91xpksivnkpi52i2ws3p0vhld4atxswudqi8sy0z6mgabd8in83ffquv30ek812x4lus9kg4wxsyf71d2lmc0n10g729tpiliwdkla1gxnosgmuu3rp89jyvm6dfcyc8zkr1fv6vhv1282dfn6i5iwomo8mfakxpmje8jxiozn2kdpgj5hvtnx1qb2ytiwzexih7gb181htjq1j06s5hbruvqag495cxbjypkfn3clxk5ef5ty34j4pi78t6d93nrdy33e3v5eciajyvvdorc8nikkky7yohoyv57n56k8anitl8p74gezwv3phvdwkw5uiemplvrtgnyys1pwdymjz4k7bgw14bj70ky3ia46sjmf00rq5n0w59227dveiqi00qxi5q95wh3krjp1yypf67upslnp45d1fvi3dco25lo3jaa6xer3l7rn75dlrzjjyxlqj5e16iv9yl5k4rwfflb3cx4nsj7zhz1j0hsyxe0lkx1df2ctbq0158mrs1efpuuyxi77x2v9xocxidsdbxtnz3mmoar8w0dy3w30xupm092yq0f6rus8fsx6t0jo07mshm6c2a2sc7yuehrpl0u188nwed0d0dahjagg2o59z4i1t3m6ugl5wrzw82jy3s9h2s6zkadgtr3kkd2shq9t68pju9ylino7wjqppbj8x8u3islt',
                redirect: 'gw5p6zotbgpe4kx55m6ieuzy6d8oze4txhzn9h4fv29idtfx7bah0brmh30xbhjwqojnin9a5c8ylcxb085h8m8fyt08vyrb6j64xxwk5elr3pgsvyudd1kvmdr2cky5l0bmh6u00vw4du2iag6hnxybpsdnaoz45sr3pvbqi38lbw3j87kv9dhxw6traxjpc5de5ggmrdywt5pl2o1nw2o0evxlbbd0x462sel41ukjsh65fbuxurpvfwtmamo2oh793dvn3egis1s322envjhcdvjhg1gmscsc6qfse4t09r608gma44t8kil27n93wrcscr7z5qzatmr67eyv7dxozzsvnmr7tppoveo8x7q6zwxql7isryv2iwp2zxbibramuubz3r0880y277r8ej064cfbebyjbxui7yodlo245nvmtqb0eoq2ehkypqqej7xffkqifixt14wi9yl9zq7o6ugipji1jrbvvqzchzj5g6egpvc63ytgqd4ef5ld2adp7of452lywz6y31d5y8piadtv3piaptlac02if8v8pvjr0m6v7ih9fwv2bjpkdydqgnlvajt0kui24crukrxtykwyx33cpuercnxk7w0gis8gad46hkm0sybsx5r5j400n5ez2gbzhfjje3wtk2kgbyl4np4m7bl5s6l7wre5mryqcspx49010jkpygfotog99an5fr1tru0cbgxlg6qlx5h4uug27tdmhjewkerv1vdd0x14ocwlfsuo6alucrx2wnjxqi8zl2fggz4frqw1pxfhumm9muz4vqwom3ob4gvjtvsnaiplffevq6w4ykx90pb336yyktth85kl9dpj1e31mjn64tmj0lcwicplqpzcl1w3dasr9mzeaivs2gbloir4pqsajqo5jg2773txdzzru62wil1tpzfxltim37cmu1o69qb985hkw7wi302j4xzexm6uf0znlmb0rmadz4p2kbi2n8kfn1tfwrgkomkcunkj7jnsms0dot712vekoeb2j3qvw5mlbwmcc8op0kk2brs32xj7mqjpica2bzzksy294n5zsp2myzb5rnjyw6gvnyrahgfis5wejdcjoaa4wvc9dz6a7qi7whdsxx4xxe72b2x539vgfrflnbu26npdgx1ppm33dpg5hbywim5hluw3tw4by0gaw1iolk8gikg2pygfgx1pp46oxkzpr59a3bt14807w4fn9n3izcolqwzrbaf9xsj91j199zd9q34xr0rs3qam1c48n7beo7btagsi0yziguqb264u4unsj74kom9c929rsqghinjjghfcfd41aw8sqz4jvkm01x3g17c20lcirsskjtwce7c0o6sficu2n2yccikxyaoy1t4a11sjfo2i273oyvrsrxf0wf5k6rrbzg0h5jvtfsmla9j8vikwz9qvayjklob0eumddvx1ecagoomdf4cl9en9nn0klkd98i4i4mf0yfj98o3zxs6qpbn0c9qzd7g03x8os5w82g8ekj4359pq2aamzy0g5i24tx2vg8b2vd4wj7t9l973xfhzu17xiwadp0p6429lwmk2a7qz4d07d7d824b4gh067144pchgbbz8hk9epce9957hvgpmz6l8jxjh7evsbos37tnyqpjwn4t4g3b449ttd3vqhm3e7kxref5ti5qjmin5w0t8iez3ywb7jbbuvzuo12tpahpy782un5o4ruwijfwx83ll9mc4by02letuq497wum80kjgmyiws4r1n4ngna1lppypv32mxjhghmzkuwthse82tpc2ns1c3ykexndjpph7n4g9ev54sld76ru2iqq1s45ae5co3298g6am16j1s6mghszmezlqp2suj0j6acwth6vk9i3awd8m10jskzje6bap8vria61qvcy10uxtzwt6a680ksywmanifk1s03q353gno06zbdhl2agagmgoymvkykm4kk7p24f7yeq8snrop5rcyhd86bzcyklmieuekvpb3adh414snv68w83dy',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1800931727,
                expiredRefreshToken: 7753995659,
                isRevoked: true,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'taqzgai6mtkzywixvwp82tvou1ev72i6d91zhky5kyfkreagbcwek2gser4d2yyrrs8owbyrb0xl13vcctmc1az3etfbjgdz9k3ahm3ad0gojljze3w8m8phw5hbl25bmmyys95nr0pf6iqe3ura1e7pput1oiwuulfv1ysset7vrvoq69b5l1vr1xe9kn7wbsmk3bi3g6jojqg4fesr6su4r1ckvtd1wgiio16uvf6u88m5r6a91y0phvisgyq',
                secret: 'j8x9fkr7miskadw8neuhvofmejjrvjcb1fdlbu3fksukjqn7g1l0vbnxfyzawvmofkbyn95cod664az9va1w8gect0',
                authUrl: 'ugrkg9wnanu8lgcqxrcboegwok567t3umbg2w7amla02vn1s26q2quc5p08150z61rdhlyg3fkekmqwubranf6d18x4rrzg6hmoxbuv9nuh4t4zl17mm27i197idxvxynf106lspyoklazqo95kxpihtmtq5terhi0fhmwpz04nd54otbx1cfj0bucq76u47l2bn86v4rhfqxj84q4x9owm13xst0c8adn3iahlkt8dd9x0ym7lry1i400qhi1qd5ulyqyhkuz9pebh6fwud67bv2g0q3w88n1l4gv3s1w57vlgto1f48o15jpifzmgw7ssurv1udpkc4t4q6vt40yf6abioj6k0ho34s20kbg8tnjvqftkjr9d446nnmieuhzibij2r3iwjslkf795u67zes63lybejq2326zcmr2kdbfzhq1zgkmvbl579xpbqj4gszhzrhjt6aehk5isnr7oymge71mnsmlw3fvsb3owibwo99l2e3fbyw8imw2mkg3dts1065ndz2dpwl71exmgezmxo6iao7bk0xj0obba21gsh93glnqn9e3pn69welgjerjwxx22ldblwk3pdwy8jwz1x6oopkv9bdad4vlgd8nadoo6bx36sq5xvu56bzu0osatutmd9nos2tgtb50mu2o9t799ney47zuqbd8ywwqvqgoho3idijr8yavb8emc7g64x5vt09pf56bpn9ixe7l80ymi79gqna55q4jbdq2osukldgveih33p17x73rrdldgwbql96ynwi0ge6wmzl2nid536hqsbzq2y3circlfph3vtrn09jru2lfjpbxspp52jwxgzgz47tiusr7nlvq41udxpw5ptfujjty8lhumufutf0vxsncqu59921edpqjjpty2os2q60yhx3uo3bvc487wagdffjkinc7bkdusuzto29qf9f0gaj7qbrrbtvsqon7c8tmylpdgra1jk04dei76j5u0ik3dswg7yvukgop1blmkrifv6gqzbvnlsk78olq8op1dsc1fx1yb7wezsjvknaz4fh5fetcky3331iah0tj0rvne48bzccvvsjaix55p3mso63pgufqar1ocewys3oqk0nzoo9wckxprj7beczoy94ajttft2phesyjqg7p23s9ztm7zbw73cbr1gqq4orzye7su9dy4lj066njc8ftmkkp8ery4ozsw3bn2s2yqrik5nji3jpzy7hdrpn3iwd265qq2u2b0u99ex5l5d0g1bt6c2m325883qjog9m3flcilvt4302y4bzazi30boayvbjnj7s06kxzs37jpxw4pufh1ml9jltqtmy6or7s4ohlehnd8j1q1tcodisdgraslxeqz6xw5pv9a7oruf12xofcl3vf0ze7juze8fbskfx49suy5ig3welvjb01rz7z76ybic4ihdl1dg0xah664wzkq4ohgj4jn64plcs4u2tred7ducgd3exlz4odfgze181972pmr4lt2yp2um8uhgkwlu44b4vavi6huxusai81ldlfn8hqmfcdmwfjruvp0jr2f7zcfc2mewnned8s4rw27cmviitqldma18jbiukfrhgtnkl8y1dhgfvdjefjrxu0sv4pe02989x0awvxz4x7oprdcf66d0heokhgag049xn52uzrn7aziwvmafvnfnyv66ndudozrqgz4pjm6o6kwpdwyqqpi85ej6op1tm8f46oldkxslmerj6ds734zdisndpl26mtfynfrupznmp0nikeuzzpamj0sbbs51h0siwi99ye5f4tpjp8k6pe4q6tihm02nlfl7fs61z0zlsrqeoy9zbnamu278p1ujy7gr3lznqjv4dn3zl6kxybt33xfl1jf2fkgnb0cuctpo1vfxlj5dzei2j1c2ri0dyky737wg10df8fkshwu8rpaovs51o3hzb3sb6ly1oapzpojyor6325wqq9ihg4nyitqo7oj54irdjcg64guywydzsy1b4bwxif8s9kjceiu2wzfgg37a',
                redirect: 'ui6nivqhvg42pwx7ppryq0q42yt6zo3ufdc8vt65qwzc89iaik116auy4pjsvfk7ezxmaz5p4u2dkj87txcvm8u3hgme02g9oa0bdr3wvxwsdsl6kvya0crf81jmaz1s7wbj9gcgodhwu6dyctwuo5m5pvys2c82nycpkrr4ftkjenaoe0rex5nydtjh7qm5does9zkuho8ybbj3ka5adjxgktua0kgw55qednvkti76twyupw1cb2ixmk04si91n0kgwhz8fex95kswsigfkjuas5etdt3wqbk0yjdyoq88eksib74crpaa72lu803rq8cfmoktol6eefr60pehacsmn65l71smgxbv330pyb3aka4anmoehegel7iocwrf615ddrfs66vwhgyppnr3khxx37wunn3lglwvyudl9s581dirpgae0ewal0vue75b43si10mesdosspc8879e7i6g6724p5zzbanu0ts6vt8tw360fg6fkjwh1qmvxfsd6ykh81n70u2eloja11rfcljrizbbipzcm0cdgze0djkha4o1dwt8exn9yajthminqpeu5uypz561dyse84auyvle524acr6bjxwlpg6rddita21v79jxkqlglkpp1vhgszrelj6ygye3bhskpe5yfi2k9r30m4lrcdn3iysdk40bqq1rg0g253u54l8q8uvsuj95b17lpkqlkp226itcp7jx37d3uzry5q9zupvhxpl3oatu3laosmndsp2krisjyzx6jij7m8af4lm0i95378pkvyrc7fgc1xqye7cou2q96dr4mooy5ykt46om3h2hwqc8vtas3yx056nijpxrfxp48t6n7acoex74bqo48e9xcnon9m97fi142121mpvncoo6o8rq97x8f3a2lymaclyram0e2x83gjuxdotrsfqz0253lsf122bgp14ulitrsi44tzhrptrrrgprajp0n7972tq7kd0th77j9eqhw8r7i1nd2reznru2eciy3ho5zgauos7eb2msj5y28h1h2dapvdur7n18dv7jmc2w0tvys2qspan34g75827fsw3snhria0xdmrpe6jy8onekn8wjz3408mrqdx7mq8ggntpr88wby4s8eotdqlfvk9j7wbs01e7czaeal83rb40jo5tjwbzl1r63mxxiov4pztmj6if79g5edrpc9lnsauz36lx84d1i5ubqyncz17z7k776x8f13btrljmmbyt2xov3wjfhj7c6d00f70m6406cusc157dobt7uj5fndqzfjtsa03uajeed5hw8ltlfi9fpheel1wlyfwr7lihmg1dil0vdnnw9cod2jxtkjuu53iczy9x4s73jg6e0s9if64kn6v5i8rtt0kpgdigbfpuhl2sredc6krwezkot88d0ssgkdc44ml49wm3ilqxstvqs2yf7hdplp1xdcdvcwycsvjc6avsxo5jlhh8ju8urtfiwvlf7cml29uvwi3n94hkrpby2ybfbh3z70rzg6r4lbqr8yj8r28g722ezr7f318hylf817mq5gi06g3ux3n6nx9eps39u2ivlhjzurtteluwblrx6alazlv2uv3fc3t631uq5ngvr7sbsp3lk2dwhref1imd20k7hvxtpch4eyhm8b44gs352mc93mch2mhj0e2jfsp5gkp71k2pvrvd3fhfr3w11yuva7yccnuyaeacasqhq6onyoiogk1gbbp44aat53dea6eq7takkbdk1gmnhfd27xkz33poqfw7y3eb0wr2iw5jzlwlhtedpvjil27zjlwlgsch19f59z4bedb4a1peg20eohtoonqrg5h42pm1n8bp7d3un874l4m0946wbbcf794tyrbo1mleg6ekk3uajyds0ne6iw0d51s9x4ineyene7w8sqas5oqnkrl2vaxl3fb6v5mj3h5vifmzfjrzdgqc4je9yzspux3uo6kxexu4brfaa2wn88k9elzs3dt22u8u9ys19fe0yqo8nbqt39m759qwjc3vj',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 72015385463,
                expiredRefreshToken: 7580325399,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'AUTHORIZATION_CODE',
                name: '12wygc51ccf4sa53pammei2ubztxtwdv6yvazeccmj8l6oqj2eknossqn6hdpv8oc3zsnnic61nxsxilh9lrry7r4hhg1pttfh49m7a69g5jg7xa9xvhqyrt612p5p2k776ifbvydweaf8fwpvt3359z1f78vqaa2slit8127b8foiuvqdixbnkzohcw9rq38gwcmotyt6zrvm3rqyqiavcbq7wtmm4jmb83z6h92l85qnohaunheb88xw5vcmi',
                secret: '2djnj5ye5mote0qumg126psblv22mv1qeextrd3oe3cl2xbmprkvloogrb728p59fcjrs3deb780bna6ojtr6jpq3j',
                authUrl: 's8pijrxhb5ordwgr80ixamz3yvzux5fzdw015lhw4edavek6z8quuiksj3mamrygaesj3kt9bxe5af0nn5lv5ao5um9i89us7juok4937kc0uybdnwxb90sw71uzopvbc2ydbkkd2km6ct3elqllxjjgry100x0a2qi2t3z0efv4yyyda5zsb1lnknyncq4dzhncfd2ghdki24y28evybt1advxm54za929q35di57fwj31h94p2hy01p2j3q5dnix2rzie1qgfsp857oh990bts2k7fmhmd8yt90jf1h29idt9pzvnomamrt2wstxjqr50iv35uokaora5ci79jp39dzei1ly5xbhxz5qu9m4hiy6ayfp41xn7xm4mzame0v2sz3j9k6z3hueu7sv3gqk5mu8elrryhmtpt23u2dxvcfe82rsjefn6bjeccvxhvwgigjb32gg8uy31dy1qu9jtp2d2tmlybycjiutrzja4zq98k530cntv64akmpvj3hjgukyeaernf4nz63sl2mh71bakimjcg2pibsoc9jn7i9zfd1ze505p1ju4kiopt7czaqr2opv0ti2xnqsmi4yfb7lbcdgx97rghcsl4oug9bhn8itfh8y8f8jvdm1n4ke7ofsmhnqdi25wx478ioxj9my1991eqvzwf9zqjevcfe2byjqx3t3ymqqd25623zr8bl1sllsyh7ikrhegpc5cfhmwt0oug7i3zguiulxiq871qtlhf8vumou91nimzepymlwlvnqa56ssbo7usjeukiii3fd18v6yj3gox4bbrnvvjuz8t6zkmuwz1uhb20pps7xihvsxkr79dgrpl4shmthlgd93yh7uhcj6769rqywcit48bh39agl3rld796wvi3zky7mscqyosmen2t0pc2k1dkz6hoigtwrh6cqh7la7a6obc7z76sfjjdiqc89ia72ljs15cjqivupxzx9pflp0esyg2m6ohyiofn3jitp1hwo6g7xx3szjl0e3olfe4rmwo6x1vh7dqbm4x9fkpuqwmc2cvzq2kyji6ut46zdoai1x0gljlr5mbycv183dnkm3f2fenom140jln5yf23tobgs2yvka52da4ge6sq35o8pom6xxyexaj29pk2kh115jtkfvttb4r1773ngwmja5v9y1l5otajutp1iqzhq91mo7fkwzvfakare7tqp5w6j40mdyp62r55ghbm80o49xyx4mb91cx4xzok6xj3l0009s3b7rzeph4orsfmmnaqi85t7kqidw5jrvqk9kyxwukd1cth8z4mduxuxdt7uaeenz0m2kn467g1bvrybz3qhjyandsgftewe0d0ven4zg92vofb9091scynm7ssrsqneyayrner81nxvmgnenm4zbpq6q3x76f6o4eij5bizdc20tf9mbdawt1ghqgxjjrgllp7opvbp5ogobqypky78s7g2260jqhdsf4230kt0yf37cqhn8fuzwgnet6ldy4ffypcywjyz39e1dcu0s1o0qa8fysjstrnvx92ag6i1fx3bdsvk79jz2toz9nobx9frrejtwsq7mkpm01lesd593ng7ozixekf5bb0dd6pie4zz15tu5g3a1xje6pcmfy8c60exikroe1y47o1rpivm9rroqf3t3wymx2b89oslmz5f6zosakz2s5m1nvhpm8j8ybgjrxxoou7y2fed4ea08hygg6b5p1kiyys8bc9piq3d4402yvl8qehecsyzy6iyrf8b2ik2akhr6l3ewny63y1f82xb143d9zj5q8bstvd3kt3qb2h5uvajqs6zi60ya1uj3g1hegp9oqavs9jyqtg9o320rdracp859xf6dwetnkoqvzb11iezpcw4hse2c6sn9oin876s9ow0dbdw33cl89tuw3ajvlj75zshh38y7k5ia2ge7mktt3hyirxvgnmc520uwdtj7qcuppexwdblf7jch1shq0wak7tiil0kyik8cpq9i5er9b5b1qsjdotafkgqatwm1u',
                redirect: '7d0ukd1szy05ab4tgm11b9g0a7o53z3qz5seir0npp0z5i8uykwwul30fcgpb81cmz8j6wromt4l2xb8nxh9sfou8zg12y1uxrsoflfsegkh8gw7gy6cztudb4l7sc4sjy0bfxtiso757t65d97jqtnctzyrrbmhbiphnjf2nbu1njd6srdk1j3tm0abzb7w6th2wuwcu2ltt2ml1gv8ft6lpt0jcye9t86q9fk7swgtirig75jgl305fuzwq8fl581fay33fqxokkr50gnyghj1nulh3sqabj7v10o4gn2jkbaik8yxfzoj5r4ntxpbyrg9rvbugih68e5ydcm8trsfl623bbvenhqm41k1imhslmnb94aeyzac7t2v2h5mh1muje4hdwwemjr7ldy8hjteswb3hpo7f7mpl2qq908lplc4p2ivu25b9ix4dqyorbmfak19nnwbpadgulvz3np847t7mk441604xrdy00jk74geww6obfrhy5s750hqly26fewj3n8gnsncitafuu231chg7ts0w2bqri2dyehlmlf71n0p1z30dvf2ilqqvbshev6zkkqgjmzdth7tdxksn96qgr4xm9xpfgt9ssh7pic31sidmv0o1bnuzx3vga45kau865z2qc324juqxncjcq1xohqsst64923w7l73d707hcvknfq235a5r4xt8uuajjzredcvun7bfp5fhhsgoqhrmkpzb5ts92pvfetplqz4plg7xa4jqxoa4gxvi01cxq0wh3osklttbigapogkz2of463x1zrs2uzc9c2tdeeidyjxw5s78k0aqb8ckwuo4vphemd9euiznrcwfgmqt4v7old6hhb43p4us0ftkhms3l11njq85lzk586ohl7xc0otg94a7p5cw07wqpoyv61p6xo9em2ho5wxnidw713vs11qkqwq9oxsep930bjaezdodfl3zllbjwt1qtn4ov82cw3zp430ezpi03aa2dtyx89jmnozgktj9nhezhmagt14kylmwckvbsbpmxflfby5lrrbqs1bbh4d6wfrzcruwm2wgtliuwgpa5pogymwhkpdp0vzetin3ur5kv290jxxmdcu1vm2do79wsxq7spm775oo73pct8cf0rv307dsi21ghrj3nvipc8ryfuc7u3wzy68i2yxhb667h2miv6qi41gch04pwv5mwtaru7r3s6z1nge6x7w3um32kxop1b2cwuqwn6fc1zb7oxm3ucazkgmw07w9wg8fdowq72dzasmqbzqgbrlprpl819h3nqaq3vkl1dgmhl88zm161agipr36kd7otm1lizyddsk7fm6jvfo8c16ttcgd9kilnnnss04kv734p81fkb3kfzcd8lzzqgjox2gzbvfwaz9ahpsojm649a1tnzx9hrmkheaaih07yldpzjhbw6f9ir726t05pvghi833g62pfkiqmfqeyk8peenz76wyesbiibk3vcfumhiy48d4aru2na4nudqb4dkxkst3m6h6sgrqr23sy3itoqts4pbdhphx2g502cna1iywdzjmfqzd8adblrfbdvq9tn3h67bel10xlqjiw8o3yzcq8di8z1vp7cp6w91epavfmel4qid2hcm1c1t5102fx4qggiqecl8gqh6tbtomsqry57rvcs5jq1j7eki7ekasv1mpydeg9mle8xzio9rcb3alnrb55x1w8b0pouovhvobugkhzpxq3ihnb3onvz11j5stoizepm7c7xk5pxc0sdwea7elz8ykn1islbgk7653r5lvjow5fn11gvi53asun11v0j7kduj9ko7u7b2nx13nwj5n4vuv4gdblwjfr4dhm4qku4ya6nxj0kvkecfdvg9cdgbuec73fzvdcqdhhhf1i7wjofwhjadmaoul2ka4fxu480f1rkjo7wkobn53u0tdg57cqqlnwzacm8ktuzh1jp1kp8qk7y87bq95ht6dg159t51n6psq2necmirz3k5f7lkxbiq4ggg5orkd6p7h42g',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1101655451,
                expiredRefreshToken: 39836400741,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'PASSWORD_GRANT',
                name: 'p4wt8arqfgda8i0h08l27jz3n99kttq2wo4mhab3nroco581bkudp2t5h8e1e60qoptz1eacdusjzlizvm0w1449slsal14wne0zgz2u2a9qnggur96af50o3r8prwnwkd1wapj0fcpi50dgm803w05cky7zwgsz69zey1cxnn2qvphfr7kbr5u7uue7l1a81yxn31sf6f7ufrlqw15irli9wz9rqj2hawhtkp4mjd9ipqhfp49veml1twprh9l',
                secret: 'eb5bsehadczed41tkyl2rq6ryc26qkiz0pkj5w0x2wbq99ee7gqfj7eivizjqrqfv62kq5qodyvigpxq2v7h5koc96',
                authUrl: 'x97l8k3pxcenvlkstd80rdhs4uu83coq54fsyojye3ai0vj5klt92paaim11pdlund3saawvlxf02m2ipmlm5vjzrykd1zkz4tzqaxyweo4dr0ur112jwyhtu8csc0d91m3s1ih2oe8877jkpfiam7brboqp4xuyi3lexxa17hujgliotp8xlp11o16dsdial4o8tikyiwoxora8wnd2qp7qfv490frtey8f7zalyvxi39cfuh6m3jw8qpm0692oms9tmyy6v6bf48qf5y9vpvj2pkhebmrni8oyd70cb27nugigxzkxkls1056qz5ilw0eck3nukxqn7pa1vyi49dbyuv1rie813gnrxxsn7316mv8imxashyp9gqg6u1eg46f4db8nywwbcj31izzfz7qv3tw36aeeb2tq3q06s3i2ltgqdgcdasimil2jldf8h9aiivcixxgg5cbhclqs3gy57e9oiuemwgmxe9vi3o68u0n27l6iwbn8xd0j0f8jraaoc3qfetq0x3ha95hm5j3b8wndqjrauiztzgnopdgrw1qk8id75vzrp9ecg9zfx66pn0zidcr9wy61vlcybktqrfo7lq7ufq9999oqd5s2lvmqll7demv37ylr2mtylbqzd9ds45gejpuxsdb1indypbqr9pkp14egw5m1xlzcj814muxjblqxwdtvty2xdmpu8y0hggsozbk5cb5oxk17z9hx1lt4cy7nflum2c4djtpekcf1h6c18do4t1rcyfuz28kwwkrlh80uhiigm441lwj3e6j3hcst5494mnc0p3ky175gk4dr8sor2x67ije7zcew1qbvzrp9td36xo1sj6f7rn3t4hqq5vm2ls4rz79jlfjihwtgiuvykzqefea61b6o6mg5vumuvonqjjckqzw2e8ee5pul2fl2kwpmi8vdnevr68ofmfi2rvhjmwglvxkjmiumoyizj0x1wzv1mt2np2u0o7zecv5geae0qa6avbicy793a7jdneyv2tqod8zscon89nequ9k4yci44btyq6y36opqnt5qhvwr37rpms6ll1mf18flyhvg2ux7162qqm8fewu2ri9k69tsklos77hif7cbs8plmads18oekdyjxfxybpz7ulfhfgc2s149xe9zjn4be1cnaurf3vprfen85d2qj2bro9x6bh98be1naxehg7sappcukexriwyxo3qiouuud8nrffye31a3i8efvk4q498muywjsxqbgt4q3gaujggzwlndo7k5eanoexqcu765joy8crk65f5959longjvj7rjilq46nmcra0egizcfv45j7bg8l3u96rnd8lhcrnqx7uv7gt3th6q74ca7bcrfxt54h0dotjhv5ccbnggi9o404vmuhaed618pw0qissnhzxs6ypodhecfc9alkw7n5ygcc202u5ujlxcbob33o9vx6iwkwnpjf1bnmhx4tpbio9zpshytdxpjy902rq90y0iahudymnnw9ilegdmu405tj67ktxznnbe85mr6wvyapjgl5kaiajiceqas480ijpnmijlpz7e3dtwsy2lgsrya56np5r1fbko9ld2oxrdnjsdupkuy2unmfs18wj2ewpdsuzua4zvh2o93oyfonif9t5v4hgeza91spi1f3sv1z75d17gvoolybegkow3it0n6kv6yiisb8bbmyoy2f712szpvrgynzpybbd7442cjet2tfeosdwxc05sfwsmbcpc4tv4unrsimy82vog8znsk480fksx2b81v0wak4y2e4m1mieq7e4enlggdv0w6ot8maj09lrfdstkgkpgbspdheerhmp5didyusirv5ij6qdq8u5bt71tdqubaaimyb6rko9nzm9dasuh7ecrrzzunvna1ikcnqfy3trwsqlicpgqvvv2xokgcuwgjxitaqtyfiuezck011bom2yq9gusrh1ato7sbjtp8ezz8c2b5o0c6a2s77hun86q486vamdpy0tcw7efkl9ekbwv142ucewt',
                redirect: '0ddudmw0vvr82ijc304k14t0suxr420ucx24ivlfcdcfef4qz3tfmy7akkvr12137r1krb2dpdzl78v8lzjt3rsuee2ug5ydv7xg9i3zo0xht23chtan2q4qi30kdk918c8gju3hs3u63roonjxzohgeebv79k01e4eosuhv3up0prokmo5gg0jcqcurpcn7jcbx0s5jsgr8g2pnwv4qb78y8wsrjmq6bx5pa6153upe6ave2yvb6y5987uynu8jh04cka934efkqqqpw0kubphj0kerhbw4uz4abrklpz086zxwuhvtb7lb2b3ec2sfa0uo3idpuc997sl3cpa6kbdygq6kkawwrq6kzdxxd5oxt2o35lfc1xfhdgbotngigk45p5sbyogdt16uxvraiccgg7eqybvvqeubjg7vdt17t650b5h3jgky8l5cm92j9bkr9bt58fqrlnf675nwbpgizwjg99ffj68ow8m7msa56olum3j457xfk4v4i7plym5ysyzj91zvx7dy34eei550dw10zdoos60nibkwgi94jvr230vqsciq28y45bo9r4lzhrcqdn2a7vy7gzhqxt47k5zx56utvssrc0ih3sdwsivw9d7owe8cn986os5k3wc8s928drei0199yoxg57a1p2jrr5pcsbg7e0ks93z2ex62l1vwan2yiptaab0yu3mclx2zsmi769r1kqbk0y4yms96cuxvzhns86sr6nm9ph6k9uz14qcdh8txdzw8hha78vd3ecyvuc51gixyau02wbm3ttt354n2r1xddvi7otnzbdu8hmgwegelgf4vmgcn4i8ec5uv1iwi8evxu2dlw9kt71q2qlrxozzn36se25exlvk0d7tvjedj9t7dl88q4y3zxaaf54ektdjvalhdtuogahvcp4f6c09m5e3x15s17u5piuj5eknxtbc8fxl407fjl5v91qujrwizlncglwc5b53gt2nxkg3qksmhphvcijgwihcouryv0rpu6ybv76qnfutkaqtg1213uiv39vmqk6rarcxbdk24csht1xiedvkep4v3mis3gbsh531g31xzvs0wn7o3mlyw3hxfroset2idqv54bfrnysfhira4x31okrajau0ljvkz0wepa770i0721nb5v0vkrn75zyj7uh98fwshy7vvatm9t7v6vlntavcbtv3f7gjk7qpd73xyp8v863smfjrzxwd8xemw6c72tutvdsh2q4z22e7h0m8xwuqpitf1jw9n29c40ao0u87d2ot1y1d1ighoz1jip6admb398pks3jahy9gvlkosxpmzh5kc38tchhljljwvxu1xm3qh54xide3zs70upozs3ba41p8ux6rst5yynkvx9gc7w5r1z7qycgyiu2dr9wn6wb6ki9jzigrazmtsj6flkzmjd4gh6728ra4h1bzt3s63vhgwhs5sz1s0tk0vr3obszxbsqd15rrth8wyu3d6tgk9o5gmnuzfqwyyyfe7eodjrpqrtw6ek0xme38ifc5fsz9vznt9inacqerbms3pt5y5t6y9kgu1l44jd9mlawfj7rishhtlst96hiwyfnuoy46fbchpuzthgvzjrugbh5yao45095luijzab0opzthfbnskqxuzwxvqapm27qyomrwfobqclxvaqd2uo3n2tmlbr8fgs0gy23vnxpkblw6nf7fzliozdrnxs88l0o4swn1ttaa73plxlfsbphjhpyt8o1req3hs9myue4np5lqjtv2f9anwhx0n28jj6dyegds9r6kbwrqx34dun0zo8w363cyqqzlolj2p03i4qpudb5lu2udu9z9wpl4o7en3qyj36y1nesfr3rt7ex4wyn1fj0g12cey031y4h5hxq3i6jrb1dwoxvjyaqbld8x1orj9vuis60wrv5u7x8b4lq1fgm75znwwlargxftu67w8ak4q930ta6pus4ttx34b9ymh7hlxvneuiu5uw314yl09psk9lt7bem7x4u9szs68vfi8kkdw',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: -9,
                expiredRefreshToken: 8326221125,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'g3ok4k41gnp9ezeubx82nhzb9itk97vu3616n5cu8mgoecb4os8f9gucboe9rw09i32sj041r3hu0a1n7c3m7ai322gk8vhysxmg8ykumkp8hmoqi4uitnsg06kf1rzdal4uu54o5znnqh97vf906g84qjcufgj8fjg6o59m847cvv75ekre90ufnttqn1d60ub1xkxf2cz85lyk7da19fa64374n6767dyy1hbos9hkgpnniyhq0oo9r04fcdd',
                secret: 'ksmdrctq4cvs5p7qvd8py5zyuf1gdjuwg645spwsrz8048frrmezpi843koe40xjow6usp8fzj5c5nk2ttctnongab',
                authUrl: 'of9fimaf5nsolp7g9onuqphwfsi9flhxkdw41sxvxckn7ue7b8dnozr4jlpmpfkldbob3nveyksuqpwvk8hp3tn5hsnll2z0hj0bv0ybk64o9zhucd0ijsqsq4dssqblww9i4kymffi64dljbprfcc8tgy2n23seotjiabkh1dtkg7l2mcvujk832zfmbt1pvidlien9z18ppphoedih8ba1jn1vpjybsyv9i12p3360u9vtbd2jyer52vfb7opnwmb65tbq6orndfq1alnzaiyjems67kv9hmb0vsxp50x0pxus7sw9r0s947vyi0mu5w2ezw6lvy3mr56vwrne4sr0tpu07cl9cejaxl27kxuze9fyxure2r58eqnhvdy4uf6kl0ntm3ws9z2xcx7z4k4n4airqjqf625wa4frwn6fsu950hxehy33507oiqq03vemckuju8pm5kkeegmwcqebycz0ksmxhp9sa5w4t0j8an8ayyxijcflhrxbtk4lftvowz8cz1hmvzr79ra44t3u92kk9ka20q28x5rr4t6br4xj7plhxd59r2z4r13nozuh7optjq4dspdmjl5yd9zqtyoydlh36lk8jlwhdsvt46ei3sk5l5an8bvwathv89syyui6v1wt22qdix6rgz9lf9mxbiiq9horpk0zlqoon38u8pepxarfgp8femv45u7b2vapqmj5rkowi2mgdci4rsomltut34p0b4az838i5i7l1ntunvsi10cottngnm2t7rm076vecp5ji7ps1tlb9xn1d6a8nbg6hr37gnpn12jyvbmoj7l63daegsexp0hvx15nibxsxgr7lovkfzejmmytxbl18wvgzwv634mrf75ia6qs05ipm09iuf2lwlnwrq2wdkvon8zsv0p4gjrt9mdl9qxdjx54jd2li9tuoxlzbool9pbx9xeotqo1o3yw4il4z5hftliqsfq57mpw4ah1yp2zaxvz8lhztdfs713p6v9j0u0s2b4ly4fmj9d1g1jci7owazqvx94n0b0230ml1i4c0aefyaf4b4wou0xk0z6jmf3yivo62x0dtybatzy5ykv55jcol9phfmlj2pwg5dysezqqjxlm5m2hfx4epxzj2apgu8fwog6ok76js79ztwfu9pp8rv8f4htx29gvouyivelks97152j9hfi9bgy8n2din71uwonbo0hucchmia05x69zhhe3xuyifehem1ndsngp1odvpl40ib4p1exo08s59yvy95a72wyvteypaw33le54vj5pi98xmwcksk21cz1b3vdkvt5gce4llysj5f3azyu5e4lv6sc9fajxb9scpjvljl83p0oabue7pa42kkfcjqafzuomod59hco7qzo2wwqkwobl5gmuhkrao1a9bimyxjseewoxnl6fpv7llv2f8lxcrc1gd0hesr5iu98iqy73rtq21ly900ymkkoso0zxzjmd0rdzyec7ugsu6j33fwajpe7ez12njd2eden12e5uxdrc5jxu0gor80s67lx43fyjc1727jjwqsiekt0m0oyevk3oazuwq1h89b43bizuuj2y4vfz8qg1aul0r13q503catn63vn9g0w7r60kbmna6lkmk9uzl2xwxblvqluwxfvx9ge2v5usw9hepqwojlv50tigsbx507uzuwoyi1ranooltwpyhjilt9dq48mjga1drqcp12prkj5pjc74ggni8hd94c5qulfw63e7u5nllk97njdee4nj6pjtg0sjbmk0eq8xa5i5sn6ydk0umhtk9z65obpqh3reud72fbywbdx7ez923ht1vrkaacsmm9r59a5mj4ek2wjploil41bhpkfv8oo46it91zzv02e7nv4b2lg0ofcvrkivvscfu6eawuoqa5q12a25dlqgv87gtkyw4x6728gaurnc3wnxlh47whmpywdkm76e6gas3nptexgvr4wlca0nfc5x5pfybnq8xfkcl15ht0mwo2eaqav4ivzmcugiwi2lviwfhb0j',
                redirect: 'pbh8rckt7o5jwswd8awttxx1hbhzrxvtasuem1yqklxhj5551gffl63vw78gtorerl6zh8vs849wxv82ecrgrco41j02hkyv4ai32iy1fubv2dmc22rr4iav2foxjrst114v0ddgd97ap0ounxuty15qh98guloqlgb3555zmfsuxcm81rculaoryi6gk5hpkt6prt11kiyutvadbs7hvgcj8xt0nsf9f6x48pn5dyzrfox7sw5qa6ok8za5siq3h48r0d8hdoa0aa83zb2gcgg99nzkjpu3sspnpg7fzojvn1ncweiato7j4nomtvyz89cjkdqm9p7y8gi7z393pdu5qyctiuti4h2l5ioxlbgpdmgxqs78qi0emrxsiksq8o1sb3bhj21cs3aeh51a5jeycfi0uo2a36zhlup42xoho79b99etqdcoah9eqrs1304zytyoagdzeqbvcdqefbko3asp0tg4bjd2k1xtx0uiun1q57yhczhjhdg4j1sgw21fa3wd5uwgzdh1upwlg2nfky5zn6a9pgfwyt5znqezn4mn0dp1tml67kpiw6i3zu9fuc6fojyzltpddsyi6xo913898co2w4rvsc9ivjc3ifrrs4cv2gc9xn3tsour6n98x8bst3ol3ti8kekgzx36v0h0banpa0ixbs378sjcverpaljf3qzoblmao06hrhy3er29fdgfmt7hmd8flxcchqenun3uqwdmtdig1o4i7njhlrxcj2akkzvtk85cksy3cocg30re85n2giwzvrbynm82lh351ohfy0e0boatzr1lhcp0g7kut6gly7nlotv0rtriqruiiaqx269rjcw2sf7bwjbvh5f9vp3x1n66k9ijmge5ixmkxay8zh49wlhess7p1n6uu1bm4gb5q0a5q0dbthfexltb278t74mk7tz6yamus99tsnhzql418v0ge1w2bszbfyytabvfka8x304tzzejmvkpheb9jtwpi7y0a6rw59235ava2ionvyntb16z60re35ej2qy2nj2vk3sulfb5hh1yh4wc9y9ldkn16dwfsvlspteqqpsyf83orisk6s84d4wbdtaxn20562p2wc3n1x8dy2ap2ecikpxlfv20ojrdlf8ztdy6h1rbmbxr13mxld1frd7siuq8xf8y7wzxbdug7unluwpcn8rq5m0isqcohuzn45lwx778u9vz06p5rounknkvwxo23syq2wcyjf6b07dj239irq7t14b6nz0g7jkcufy8t1abzzrgc2rjr5txmsjvg9is13cg1gqssvh1e6asigj1z5b2tsg54o9mj8rjli3m6book68tmuvw1xqhzn6vxayodl4j8fverh542zr5t1ebxlxg2ycfkakbcgwvt6t3y55pqvlveazkw098z7uook491qakudggyxqwbzrcdlmoq4n9m4g7kn3qi6rvcyujljn0t5hag4cn2poap1yo4b8eyuncxap55dlgczw2qxyk1axxdsg0ty3wuhlo6y9b8hxurr2cemvjuxt8u9bxsju9ktjdfnm0cd28jxpvokuzkq9stlhb57qkyunokt5q9evbeuhw1kzo0em7zuxcdqiqx8suuh3gunwdf867pilq82tlw2ci2td58jzzzvasu6ejkube4dut2lox2nv7eu20r4a6kme75l3zt8ew16lpocll87uyrm2kd39kx6bk78r932y1ut9qm3ak1nptv8lqo6ljb05ikydm76c18c0y9vo81emumcfh2fusg8gmqb2yyy5x06o245t4wucjwin54idap4l6y2jhxdszpd5z0a1evd9d0knuc1hj48zgbk3e9gr66qnf0gdgtyjzduays228wve8ece6nlemtilw02z3nuqte5x94baupxhxv2c15cp90p0ivu9aadakwwzbp6yu7tzahowrn01gemw15hril3ztvjkb5hk2yfsj112eei3ml6h3eb1e728hfglrv2b0ps3hlfqu5vrd3x3dk66gs6enkspd1xx22znt',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1270834446,
                expiredRefreshToken: -9,
                isRevoked: false,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'CLIENT_CREDENTIALS',
                name: '52cs51ns5evg3bixiwwwx2kpgbd9assztr8etw0g94l858zc8psd7alunh5ztlfnrpku0qcmmrrzp7bvyzqm3dtjdfk4fbd5t4qn25z1v3jqx2ekz0yp3n2znxgzycsng95oxafkn7qp2r9zvbsyc6p7zmfm72yz2975yk4no3ydobu5wa1cm3khol8bgn69z7k9hkoph9gglh14p2jkgtfng1ypiegkyhuw47mbtm305l4n832cgz3fzxv96jf',
                secret: 'nue2ug129btu62him0yyzv56c2hc68lsx2z1rvxwciyb1bton1w840pwg9b7jfj8ryi4qt6kxl2pnwmodnsscjp2p6',
                authUrl: 'kasd76jez8yew1gztqazzkxfp7pmct8okx2sct0mf5ugpb0h5lldeek25fp3v8m6u6s7asuimn05l69cg3dnyxl22drotsjfhnk8cievlr3c4bikb6frl518bhnw306wieuhmxu8xttyc2kca2ry5bslhy22o3i4w6e7aspho97xhh9yedwwlp0vg6jkrx7dvvhp3oft4a7drdnabvcwlih0r6gbc5xym6kdb09td2ll4ja9amkeszpx4kryi41jr2xsrqldp9ov4cn4yg3u655ywfvwzpxafb06m77v78n7swiqjgdupu0g1z9m3r0on79kezmm884kkjsjr35bhsvasd3ro6bdu28fbcorjv64v2d0g97925y71urhazqsvtcq567uyv8oasl9mz6lmr7lh9x1cmcm6bzv4itk4e7i5u3ouq4tnhb2lb42soggcm09fs6958anbie2wdaeofmry5bucp7kulw48icf53sorjloojk8p5vnb5bn3h477y19osq0ljczft3raf300dkvlwbfxj816ddaahixn05ui34h45idsgsefa3022uqk01bs0y1stk9crypivmwy16u98eswamtdh176ascfosr1adeejy7eexy00ffkbgy5yy3nnfjcfoigm1u1knr1ldp8cfziusa6skdqt42fx9re31fn5zrwi5v5o1fjlve95t1vapgz7eed1guslu1wyqz0eekh7l1iffx3y0eisigw96cfqq81smtrzbdloe3h5sqrit28zgwfrqc1kilrdg913sqzmv4bhg3qtzqzbqz7drhpjcpjzxx4uzzzt33p9apj2844mg4pxuvhjkrrlepehl70wwxma8ufny06bbas1h3loofnxsxdtzjgyteg5qtnmmyytmrkmvy1oyx3jbufm281107e5wicmgy0zic0aitqfax1vygdyyargx6593relbh72uzsorlcdhd3pek2q7bnd506f4n8p19py4df2yp20c2ppj8dyryjoout3q5gy3ctkdbp2jvxil9hn3naw700inhkmhbepzme0o5l9tw898bj1ty8r9hkap2bl21bd4x2goayuzeu37n3mvdbtbbsx1qe9pbc5mvo2zgf7kquest3ttha4m47a7q0i6ph30gavfpno8hioivff8d5ecly3edyxmno34twr9kx0pdnk7hwgxjx5lw54wyf6kxlnkhtu2fg5ye0rd088zmhqyn6gtpkja6z04qcdrp2ihqidcmqcu2c24nqi0jujhagh5yp63knlf61amtjt891y7rsyi93w69llkekowjgnwkbslpgy537ksvslwkqzyvw5hdaqbhufwza1br6c2ko72nc9fkwt4lg0utpu24xwj55hw39zicwsofvohter83lb7i0uyek2g910a0io0i5h2349fjjgp9uoenisrkf2p0ouzfhcc2a40wmb5kky9ue5ojbxz2394t5wvb7src44r72r3hlfr0e40llyxh0c9t4askmsc3108jqmfn3v6d0i4da4x55f9mcd1fzkwoirw8k8qwrc9tpyp7l07w79uob1sape8xw2239jhij3mxo2mmcvx6fwa4irnspgnjlcppy4oidu0rq5stmebneha6dvq6oazwj4ui2j4bxgtctsdycyafjuyfftpq5yi8pke56j82eil8dznbmfya98wqbfnrvrjmgzrkyijhlel8nxvs2ldxml03ckyd7yfbxd2xw22t3ibtrbcmf9a5m7arl7l5zuin7oilvofbd908ngmuqgcyv4jjiumyhriydkji0xicu6oy70joyqno5b5g28n2au6btri7dwdf4ydcmj769qzz86uyoiqi97fkdytkfh4ivy867uznp31ljvs7o2k16fou0voqnly3fwjjtjl9b3cjlem47ivt1qdo7ehnhxd06ep596wlirlmfpafl00xq7ypnnpgstqbybpt8c73yygo6db605r2xnrak8225c4crsvim29u8mptlz7dms75egza4icewsi0',
                redirect: 'r4vgwa0n7tmrngfijs9vg65amyo7278j5hm40zuyjtll15uwnceaog7o6d18wn0l4nxvcm1ehp2uq9lukgzrtu4khz4su3pd54ig12t7vltw90ryny25w1x61swv00yzj1t65n7iw7njxasz58m32ft4hxuctcoiu64evw77x994338frjkc2amzzzlr12pwnbfist1jnrcp8b8ures2u5jkyybyv0uvqgaf5wog8xchezdvpdd4qlyuydg3lvm54vcg674hqjk311yl498te1ookcgl5rxieluq00s0nigjsxuo83cu47enlvx5hm6gem13chxdiq44nv4gsq6bxd7mgfneda7hw34s21pf3p89rffpe6klg4zhcy4b50dowg9jnhu0511pp2a2rqp7al184hyv78bdwt9fa7utvtylo880p0zqa0b6ypi5ebn7sriu19unmptrz1e348ntw2skfer9bzfp513y1u29cqj5e8y96s5u5gbfdkbkqx1km9qfzxpxcouarh1yeya1lvymx5dlk51dyy9gmutty0xdxqw9k9i6m2a1jb683vi9a7t4deigw2tcphbf414ixbvp5csfrq36w6nzesw6p9yenqzhopk91fjmk9wtqp6x42uep3nw1jwxypqqv11wssgazxt8elolmxkkpcpoklh2s7rubyl6ffpljoxtwbm1x2wfhpodzywl3pv0swq62ndrnfttpetejlefzfp9e6xk53ukb78bychcbvynlojgzb3k5v1n8sfay3c8nq5zlrxw3nl9sgqetkg521lbmdlf00mdoqsjcumu3il95re1fiyjkfadl7o4ds56ec9po0k25ikn77wgz1qdlokcci1z8ox7alnj8tj9gcnl6spfi331ulwpbj9wen16p1b0s9yj8el0iq75evhrh29f52s68la7ab4n4atsqbat25ss6qimk49tbwer2fdbrylb3f2kt4zcgsqzo21j640vb9m0b5otildfhhs8jgv9gc7tl0v04tu26o7hrm9kt3zngyqu2qx2vf75w9p98650uvo5bzp7v6by7lbaswzd7bcyqrkbw4dkfxe8kjpkl2r357z9kdwj0kb1xi360a360x9o3dcru1qnp75mpbazk6qvjdtzeqtrv9eb1xz2ygd2tqon291wf8m25xyu9wpcx45dio3re1nyg50ixz6212efib63eea195tzq64rpc4shwh55aj69nmy6iywg61wsyr85xj8spdx4ojdzonydy2gtm99qvr6vz3r8qgck7vexr8fxzq89csc0n1a0ld39rpdn7u01iu31t0cvtmho3medk0elz1invvmvuryd72fh5feos7ev9xff6ot4b9h5zl4l8i8aux1blbymkhra6ya2z9cu6unzr86b2ctmmjpkw9ew8np62ubuof40i5m30pq8bx0qi19nnf0iahi070ma44hfptg0vkb5p9itgm4jtscs5mysgfmq3t54kg21h48uixwyuxqhf257skxtoy73g5hezt9ehsju2nr94gptttmze3i6stpzowhnzt467r7qcl5we0oranzjwo8sawp3eid6jip6ny3txc1h3xwbdhavyf0klac4079wxk5d6qvdf0k4t6c6o4wi8s0gal8ro48b80t8ityn4liokr5ufuxdz91eidy6c08gfr782bykkqz9zbjddexov044vt611agvs5p732vrd9lxubxdgpcywlwmhtcbq8bplg4n5f0bo74qzsip13xc1wwlz4wdzl4zgu7ug5qd6zae2ofour49328sokngb5jy4b9yx22y07ameboymii8olsf66nxy5b9je4kjxkz0q0d486qoy7jupn4f4kztqudvxbmnt7hupomhs96eaqvkpqqj56w7bgu3qcrp92os7tdnvbl51jxwwkgjw75qjqe1k4gqvh873im1g8xs3n0kr4o5xip5bmwqyq4equnqdiw0rcvo5nphmcwzb9vrpabq781765frrd85n4ykoc0vq7r52i',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6991659171,
                expiredRefreshToken: 1371355328,
                isRevoked: 'true',
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'm1lwjg2y5840mrxwdpk1qn58js6zfvk0hwn8exxt2pizq04iaw21msyahbrb0xd4u0pxlgwsslgjc3lc7xe5jpdtjq81sbud7hdtvh0voe83xayvgtfefmvlqznmh4jxyf4owg3pb80tnlo3pbnpr9abvnt1c8jk4v6v357ksoytpxzfaicopcb78u8jw5eqhogc84rtfpytl44c7nn82n3sn9acp1owhac7gedl84upy3tosom9qnl6wr1dubb',
                secret: '26viyhm9amqe74wgyikjruuysqn2fqhs37i5ekejkqzgadkj8qtlpsc5bpncip7ghi5i4x19is49842qc2yo831v88',
                authUrl: 'j42zc6qyb6euzdaksvuwfry9znpzz2x3u3m16eoozomgrzwm2z39wotfobnxc1gxc3c8kasm9wuouuutdr3dp9un55fz0frb6zcgvu147ozhksrp5jbqgxr8n4e0kkw85o8vxlkoku9nb7sb4ot8l7rwqug5p4uodqs88vujhaofmla7owd9jasze826d89stynv6v0bwiu3chm8b3wut06doq85j3ru6d28shlkn6taos6boejpctt3elqmzluvmrvrctbchl1cokzgc2s49b9tyghejdi07sxi47tb74lueuahcthn3z2xdx9zgefvvo8rcyz3pp200p4134k700npfj7mykrdjg9h7o0h2qm0ygbe6b3e15kqt54he314dpvvrr7vjr927amzcxb87trgfq4qojeo9mhiafwbrnggw16fh0a9w83tp4dnq518oz4qjrzzhoe2usoysqxpk2evjgf2x3wsobi3ji2unwmsmi6xsnp07fl87l67t5lwzniugqew9wdwiio2c64bqcc5zazt0bfw47cgcg2l3nutbqa7ynjff0phfds8yj91sgt3byrzqosmi0sryxhyjhp8cwiv61ivkczmxy6xi5d9g0bwr9ed819iyly6h0ipyrfzvf1aqs1ffkobr1tmk6rawh4apzniu4ps92op1zui3llm8pxf57wsr9vtczbomvli3qvsmj38frgumvkt9qosneq14vsco0bv7uhjcf31m6dj874x5qajk6cckxseu6f86ycmhnz4up2vuhllrtctfbk8zfzlkxox7e9ljr6844ctm1cfgqhkz7pl260dy2ueoegjrz9baqopt8yac0ob421jm2sqxhgbo3v694t8rg652xhhhpanwmwecmbuwj47gt2u7gz5hdaricbglg8duo6jvsl29omrk0cb3amhpvqrwog9cnpvolmmgvkoy1dlcufvp4mrhejc93t4di36jwvq07ps3pvaz3dlmpb4y3hyugqx3bj08stgujpmc514l1batfhmkjf6biyz3kpptem0ghxi7rf7rex2xke6ym58rkhurszf1vkbrgoq01vcjtmchm3mn87xng3jwabt7gigyh8xo7345045euxii623aejs3g6ajby2rrha6buwimcf57h15cyp61k8pvwvn1ks1774i7ljwa32mtkkl7pvwvmerb32k3a208ay3qyqse26w7hod1o3oikvme31r56svpn6e75357dx4s7we6k6nbdwtk9wvtk6c2t2pa9p424ae9e2tm3d5v81qaaxq28cvp4jr4oub30iqazzewk191swy03x0sj8hb1jnunszlbuurccu0z5j4dv9x014vnr890quhx6tl4swf9ca8wulg5hwicwzokl8m6nm112ochyp8m82i0hp9zdene80vjpmz35xvpjduyhf9j62t8k60dn7xjs0l9zbc891cglo93et7s0zq4g8gzumn78mfn9d1rs65qel2zrauc9jk17l1i88xdfz3sck5yw1gh11ixxl8l3zbwvh6xifj63eewr6im4xffuagacdchkhx1lqp0xoyscjbioitcftpkwk567qy1exdukyvb7x5bna3blnidfmlyhqe82kbs5bh38dxaudnfesjfpp4vu9dzhqnvlsbzr52rg1odj70icfno7td0pqm6cfv40s5tub9xx5d3wdz4c8evq4zzgkqs9w2bfgoqbxgcseitbbc3gp0h4onzvzs5jwxmnx47vmfk2jkonq88t4vrbq5ipa0xbf4jteoxy8hq1b8l0tfr4jycdd6io4b8hdcb9zbjhitaqibz5nxhboxdispoaza1reh1alup6ye9b1t17azkpocqoc10eor1nmh0x410lxv47mfoypu0hg5o0bxc16yp5z03wgpfzbqwfddth8c7enrgtbptokcs0u5i00aw91v0wqcq7uh2oi4iwmezf4hwdzgsx89jtfqslv3214pfwyxhrbxwlouewz0gxvh6t4ddlv4x1cr9sioziad0z',
                redirect: 'jt3057zicktyxj7hc6gnl2vnwallw7u656oxhsdzajaxrnwu8jzrfy8dscxsur84txewgjezfkclsv3r3ddu3lbhj1rc3t9t1x5lrdytgupzemxt5vi53it71oy1ap6v87elceylmnz12sa43puchfvz8x7fmmygw42y92cf4daoxrmz5qfcz56d3ni4zhi8hkwdm6dmyqfve896134cqllmayia1dj16l6p6br0m1yjogstwtyorvp7wx5kawvf1nnxpi55auof4oeg9wkzea3i7dk08h950y4ui8f9k8sman1qealwdlkg0kfoaln6872jeoyzgngkwrao6asr2id7ikcnkchaw30kxed7darba9xmifpeubx08s9z9u36kza1jq356o8pmc341je36byelhhgdc6gqytjpwy7oaq2c2f06myjbuwy13e4pbq5hhnmh7prheb1tmun02bf6lsfuymssnrmqtim7ukyvnv00g31qhihzzkusek5aoq554vgidq11rn18ubobxwyvy8y906vf4m23nl7gcfonziuv8o6zx0n7iqvzy7ded8exihvjpk2t5w1a1mpjwwh8ce99h38wmm8amc1dbka2c94z2n4o432n60hegv6hawxnctu1ijof9hh7qplnc0pblvy5kod04v9qgxdm3357dmm9l89xmr5t504bw40skapzqmjlm36qaw2lo59twtmpyt3qzv448r7bs148oll2shmg47d60jd8rhksxx0pv90acmzrq80qj2eklelx30al5rnp0ruuogley1jp1314hz017ucpz5n94o0dnrxdn4gwpphwqbj2xiyq40ajdgnfj8b9n0yrhisov7gke5977degeccc8r7b2rilohftfhywf64vrx8ilo4qv0v84sruh498ud5wh8mxeqq8g17t7230vwplf3iowq72l8deo3212c8aaqlq4bf9zns2et6jyc06vuwc9fq7bhg0lbl2928el9jijyhpgg4ab43a1df7ov38kc8mm19mdg326pcjp0yevxkikmjmrkak3l53sdzeuynebrvzvjtmhluwm0ild8673xj56flbptw0pvp7f18pyzijeu1ltw6bbzt159u7u7wo8hcwmi3gl8psycd9v06epgj1luw3rd6ey03iejrncbp80e13gl5ghoni8u7iudfnsj5dqq7wm16sed1lx3wpd4vmhuulj88ppyvfbwvjnfgt79cmgtylw2k4wpznbhcwhv05p26sl3fggd5n4dkd9u7kubbqvgoaz9xfds1jvwy702cg55ogj3i6raha7ob5rd8ts2dxrnzuw5yflb7007d9qohi9l6p78ris3r2j2swfx2zzywn8jdnuj103cs0y1l0oji5c2cyqmw7sjjtdbyh0o40diqjkge1ldm8cnrmle9i2r7pdq5bhc2726l71hn4kixj114u74rhmrgs3mgphbhdykw77ni06kfpn44r5s0ij8gwa04azr51xo1nbvtty2cq8b0ryi3y4c7fuip3fmdg0fidu0zocpsz8swgt46dhxt82djgu614r502hbbfh5w5n3s6be5xtiu8zb4rnfwigqahf9k6l7uzvh7fx7f15uji4kti7cm9yyd61qbozi3unl862jl4nzjq8txaocp3yew0vyjt4k7rumah8uvb78x7cma37ujt8r0qkbs7zwi7jqxay9b408hc31pf5b5tl6nuaga3bklpfyw83s9k1vqgujaevv3ky4v5t1pz0fuhuk7kfu0f3zgaw7tqkn43u2ggrpsvjtune4zeocz9n620jsbzus38ifpqvpfmmfhbcowij2pj5zuikwigq78drwftvu8qujtjfdyxpx5pw78sy2cr0rrn6tc5xqrvp0vsb2is5q3fsrmcmf003rii8rp3hsclnt0n3krjlxu1p81w36xly0w2fa639oe04ksq29jj67y8emi4ez3ah6i71049dxitbt3zzo1fpr6w40ph1r9m4unazk82003gncaqewz5utz',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8953462804,
                expiredRefreshToken: 1346941158,
                isRevoked: false,
                isMaster: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'XXXX',
                name: 'ebckpf6g9gjctt8uzg7dwb1uu0a2dmlxw4ih6wxqs4528jkqs3vhxv03nuozo7r8d83l8v2z7i00dra6a8qzgzskm4lgvsee6wva147ba0fz9g827bmz0hdesc21s0es8bjf52cfyg6dvou89x9zqo6hf2dk3h7muhjs7qc4c5bkxl8u4xr9hv7o84ky22w0pquel0hyc7tu2n9cw2zgyh9xrcwk8r35z632rys2zvq0uk9hnuvbmhjujlvvqtz',
                secret: 'tvi2ms3f8sizkj2wxrhrsigsh2n6jfehd90akoqhrjj2t6ausljq0ohj3yq1fwamdyu8aef1rpsn6wt53bj7vczl12',
                authUrl: 'f7udievix4x5mu3w7f3ogioandzbvijy2ktf29qtrjl768w46xdgt7s3pqkwkhz6btsq49fiw2ajg02bslexatho1jyvhqgan1qrezsx6x74ra3nv4v8ftnyr4vqq81prkxronq28rjedmf05hsass4v4b1yosxqumdimhjkqdh2vxmfqd8iegei977hwydbg0di7e08jah6o6ias4g2v9c304jdjgjyq756ud206u0akj0uq1yv1ma8davnp254aycdza54lw4tcbrtkyv089pqp1gqpo36f3lzxkoqll2ugc4ghxx32p0knjj14f2jyvbyqfvsfdq1wv0ds4ljd724w4qgwcy5milylwm9i7wsyafnak7cjr0nzthisng1xby18r5i3hh45mutddb4lu1us1h7nycwtq2pcm9ohqsxlwv2dgeyyi18h3ekzcbqs5yz87tfgk4e20x4brzt7qqqkwt1e8abglt5yj4pbbwyufy7wlzyy50dg3x6t2p9y9b3l8os5wd2f7avtx36p5x6txwdhsmjtcs91x1ap6jc0ppk8pswmask4nrx1a99hbxxfok5itzxbgratx7e4dhk5r6ymi0ilysehx0tgcqhcsy1qzdpw8zfb3oehojl9eg75m2l9sgnhw08rvrjh48vfdhzeh0dxyxc8awsdei4mh4hcv9kq96zz8wlenu5qjri1raz961nptb5z6gfbb6qy321ysjz3kvwbipk9mbnt5igdyoxg7sh52a75cnrtkk6km34x4qvy04blb6m5anto2uiii4i21eak3l9thpc7dfmvu86vie58slzml58iy26e6fqu8ncoa629yotfpu0e0lz205h0rbdb69fqfwgts8vq5il8ja0da3zisz8n7lvhm1jia12yulqgedms3obrvyqk5ww02j2b4upk7mrpcwddod2n3cot5r3xaiay1rys5g5tqt5cnfq106aejafg1f1iwcnb1sjvsghsd7wdg803tvmt9u5vi48blgqnmq22mqxdl6395ldyf9rx4f7rflddwtzgg2ih63id1td099q4urp9gozetxtkccsrpued3t1f38ybtm89rf2xs5n2b2aqi8v3ioa4jddd3yccshi127lyfpyh4zlkmc1u9m0q39596lp2ep4sk18ol872dfgaty1ipjvm3zsiljwtbm64lqbejfegne68ayhl6dmsehtlfmcvqc4056zv4l2f3069ihcrkl2v9bclufubuncvj7p7jkgpetzprrcay4x71jhkh2vlywgdqgdsyvohukzuoq1djg0t1mgp2duggd1ugq9m9b87fx3skut5jpoxg3mp3ceo70nu97jqfg80kmiob31od2yetx3k1ductm0pis4o3alpb0mb4cj16o7oivixoctncqalacbzd5ykf4hgcvs791qgmlfnllkkpjunbhobhrlzdvwvep30yt76sbfp5o6nk67t9yft7820q4zuiooakkinhp2oikrr8ysbyw8xm2lepqi56qs8z9a3sh4hq3ub8mke4e8kgthmw3nsk7d8f90ppzeczztdeio0hasi97e7guk1f8a5mg5f3qmmn78llx5d107g4m5wy6tlrvc21jopbperkfpgfl7lglivrj12vci06glnhx7gtvovoxkijn6e9mo13abx0ukbn8ncyam8af2f93zc6dxy59sx33ljaecyotahwfw30eivywk6gqnvbxkehteghoxmjfb21rblugwq15xg12hgdw38p1u2l7hu212vde2ty015yl5fam3c99e8j9xj4c4obr1do9t82cz4frl9mc3519okc9n75q36hjpyjwlexoybjpsebejamwoje99ydldfw01t116hxkyaelpn0bvpi95axu3qyo2b83gqzr25borx9myu5finqogtlhjswjro2fzd7m02ldubccxvyhps7rg7vn35orq7w6pu4qxjsutot9hero53ud0cre3repai15d6f0p91ije6smcou5pye4g7utgc1q6rsz',
                redirect: 'ktskh3wa23fkvzenj1wgo33umvyd7t9v1m5l8gtqah0fa346ibcfshd6pyyogutbnfgjoi0tqar3ybprchv7sxkqal08g79haxbvqqncuqih32gd2zzp6npayq2lojtsrahuahhww83c9ktxxxqt5iuztmzsg5ridihq519rrlf63fr903qypyoqrfsbphfvschofazddn0o30zma3hbwdtrmctwll5tgc2t35683a5bxrledi18lcstfhy5u304i8qm3y3wz0kffzcisbg9pczg719wi9hkwv6jmtn8jyo7xrpdz9s66waw37z7okll2wpr4vsy7xjna1xdql8piapa45wfv44alqhzbthwah157f6vyrmepfwik2qxaz25ozpmxytnbv3asw65qm9ru5r85ndt15y8vn94p2q0so59qhyt0b11z325lc3734papb0sjypr38e1fkcrryw99cq22428o774wu3x4kaosrewychewqzdsg94q7xcgngeplr7eaalbdlg9p02xxtbulm46diuwvxdg0a2vphu7ntf2pghuclja3fhenyeq6uflmgr56j2vu2gw8tixyy0rg35s019n5cv7f9uwo9om500scv9q1220es73vje7m5x47l9pl5mb2l91bjw52aeg78kjogy9tgpnnq22p56nbqxd9mg6pm8anhhpwolf06n8k0ci0irk2fp6mkr5qzh7qqds6i0brdftjfs3cdq18rl57q63v2u8p0yer4fcxhsbq7u5ei9qor1vzx7gky9t4jtvemla51ayv6cs04sjrnp2ygchdn2iir32j73w5itd2zioqs0dqo0xdcqaor3lezz26zi45x8jg03ppaaid6l4kuxtjip13m710chj1pydahsvj7wqdenx75bnraowv25ndmywwhkktufqbo4xluaml8l546z493pjuty1anqbjwrt0fmnnwaf23br4oak2t9o834hzpqk7zrvopn5ydvirprfnmr3w89mmqwl8u6fax5d696jm0jp3fbgvbcu8nlhc67375msts5owoaosr8hsxmw54tr2ixn6688l7r01hi1w1q3jv761sq6971c875ugc36lnpdy2i1vxidgpg75k77hdfzwv3oxzjbwxlhzi9c4l19k4sesojrtyduxhwrz91hifayy0myy8cn5sflvb7px20l5s1kvc7jrxs03etox9jr0va1rs0w7sxcccynz71si39ov22y4olwg8ts306suv1o1voie2hcx0rh6qs3uuyltyde4x9lia5shl85ifvfk4bnv9ili533fzyrgxn44qmlopzjb48vjw0k3mxkzh6enne60mtayu8jsmjkqsh3tbdyyts7ufes4xehzkb65076uha94u7lrvwypxtbamm63srefowwunwsui19z0sft88zqwetpexnuusp6x5m4y45jgz8qh0bz50u89qo9k39e6cywgwlu6o7ykymbsafhhoi5z38h63v2z9xsb2dtnp174d73dymo2dmzl711ur35bm06ecozzrgljzouvgzazq07yvlpqlnbyozqopro59eo7w5jz58p69er1amyhi3ym9qj8h8ld5urc40w4mpjb1d374eudu5p569z4oyd7728qygqg1g52o3uegajj5bz8puw9jghv8w173sg45zgs8dgqhh88jfxnnbz6l5o86bjee16j6igop396q9fd1g2j2aru9dfcvf7yn5t4gv5cr4gq5s9wzrxbq35wrsu9ltroyphwotp76afbhtcz1xmfqn8jdcmt5br5b7dck0xuvnic2gom9o0gd4uofuig8m3ruz4tr9l9x2zlsiguu3k1hbiqj2ohhi3t3js02q9xgk4arfnobnlu3u3jni0588mc3jrgd6hgwq8zvezzrvh82rqvxy3uc00gjbrnlewkjot1zzwsm1bomu4yggfqn5yes0oc8g1eajgfn23fusfufbhsca8wyqeo5q9klov30k6z9iob8o9l1cw8jpc3i6k964h3upcst',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7727521297,
                expiredRefreshToken: 9132734880,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'CLIENT_CREDENTIALS',
                name: '2d5dx0kofgq03ov5hfouxlke4wux16tv1mi936s23irjfr1dhbzc6v892qw8227als45p4v001vlpvtjerkx2o4fpxyxqzna8mu0heg5459obypg5nft32zams3ugbp47vpbbftqurcu6fzrjde8y8n45st9aqtf3493knbxgu6wpvh5fpebav32qdhr6bjxwn9pcxnlo3y2mkx9a0ch67gy2wjkpl0v5ny2tgtyxj8frgqls18djulb6w9gqdv',
                secret: 'nzqgafadih9zbeamb84m84tc8llqfwu7hhubz8rtb34bzoaf9p0xdhnvphekvvrded3ql8uo4rh1t77yz3615fes6n',
                authUrl: '4m02rcary5rbere6xgcdn3q0n32rearfvqkwzrsihh3yv07r4iokitm4xoyr388qkjidr563czo7spvaiy6fkphx1gmfuf0uj2xidz5u3z1x2r6ib9f2tlaz1fytockcp4i7lk6fh8xcx8wyeddejqyusfdugaufjwkj5zbx19z3rxv0a8q5f5loeml4caqcna69wpfgcb4ypabu2eqw45tprrmnvwni3k6ila8pmwbbmyeenc0ge0mio3xvctb70xt21k3ji4yljmxwj1hhyevjefoyhnv9uvpboebyow47muoefh5vrlmi9vtsr9dr8bv63l7ms51ig9e8xb6h26f2lxbfhm6798moahltp9ujvcjyx5z2vhog706sikovfiu2jg7a47yk3uvo34gq2c40bfk03w55drkkouswrf8ekous6i4dm0jt7dto9lq0wyhs9vaa3dxh73spnprtob2siuutp1wl86nzpv1neaperni0cj5o6xefxv8nalk1bx1la5azdypff2y1vvl5io91v0l429atxl11q5vy30414tiigvju7v4i1oc4mltsgeoapl482kb5rws2vb1gw9opozlh8csla8r086xhnlk3ha16nr6yi79fgdhvo2wrwxv8h2qvqf59mn3suhnydu86fduc8wwadafga8xl2gqy53pwvy8lmameifiws3srygj2bmjl6tsqgvwtrzpw9qyywid9sllreyac5vdh3mekpgssn75c8rfz3vqgk5mac64venfd1z64yj0tbckwtym09f1pzhtroe91kzyk5arnv7i5re7a9rjciapdpqacx2mq3upr2c7qphmvezrceefk1lobskrpmo7jtcj1ay47m2yt6cmnyvqk5zc3lehlo2p16x7lpg0y8kvj2l49pe8czajmf4hop2h59p0ygms6e2ik8dndydb3bl55925wxclwfl2alqxg4mvx7acib5g62d30kusi8qwgt9xnnpn6ac5dddv14afyhey9fmx4vcvs9olfdxape6nhi0c7lixyogbg9um9kkdv0d2bcxhuxje84onlr2vk9xa4moycfncki6erxrqzoqnbq705hgcqil1fmg6fe4baxkd5gpt85cyow9o5n3ry1e4q4psa6vnp2spg56rkyg2iuiq2b7h2f732y7gfi82fi4gfi9fzy1z404ojomk8161w1m7wdpykeh7an309xllvp7c8oz1gn2y2933gu8rhkmh1f7krfvcyxqsn5vdeb4mz3cucgovnodh9bqfv3kuxumz2z8ep3zufvahbljnr2pb3bnwjtcntbt645j0hoarx57d8s3sfycsh8wifm55pjg01z3hcjgtu3kdoy6fwz43sjicp7550hmkfqdizopcgdjadz9qkz3fnzz3kvlp804rd2npx480xqg2ujnw7elcljiuex9oektvow4p4pl5sybg5zbv8i18g7ku53f9kpj6iinosq91pg64g30rfmteev0q3mq6twjfnqzldzdqou9etyum3nayh6znz4vzr6dfd0k99wpfd7p9c9pz7usi62te4n3wtz04kgknabo8ypm14t755k2ifosiqgwzetwdq5td1ldavyybcblohkywzj5l7a4ac7ajwcghpv2d4ncen16mnmohg1k5046uqrw5d8yznnz9r8bv3tf9sdv14pekwtuvrj8txo1z2zf41jfbkyuzim33zb45f2e02m53ar3hirlexupmzo5t2wply2c8b59srtaqz06xmu96gd3ihglrqdt2vm0uz9q3nakm9une5oiu4euwiihfmqxhv96mnwy5y7q40whlbzw3r6nvwd3oig5ogtwvuytlqso80n4pae4o1ojbog2sgxqyhtpq6vtrzvzo6xg3pfrf2nv2mylyoppnauua67348jv4d8k8p8s2d1p5c2iiognaiilj30s3tncvv4ihao6apwl01elgs69zjhmrrmbxzdsm88c72s6ffewe5dychifhu8aqabxo6y09m091s81u76v43',
                redirect: 'lhnv0xame8x6dff5p0vl27ud3msn0pdeb71tsfef277emy5v4icw5d93jwan3gakredex1qk60jemqzl491d8jzcddxn8jh733dt4mb13ms7f1a2rwr0bagkpbbqqkqeuc4v7ydp2imeic9averm9z0d95gyb5i4f6faotfhw1p4wbhp75zvo0gginwmy90l1cg6olwuof15eku8bwatoy0qott98cia4cfc6yoz70w05igecpf38tp1sof59uxfs3teuqsb5b5mftk1vyczzrjg0tznmks5uoqmacic2j6posrcv891fyg18g133ullet9yjwzojeb9sbqqg7x60hqqs8qlxnlitdii8xu4eauq41coyj03k4lgi6e4dml9lsvpvoog5rln6wm7zglhejtr5x58jmm5zzgb9oqcc7fe1o2u4sgarruq7mapohfqa3c9qb0mgiky6bypwkw4vpk900svn9hpt1l7g20rdxhxkg0ihuichyqavgry8bsfx19qbekat2rfz029qosdxfosh9udt64itespzb7k3w8cbiteq9ll6m7j6l25ticav7pdcpvgycpzspxq04iy3gqzvzyf421ju3uu17ruf5tn027nevbixo1nrubakr6ikpzub8dd5jd8ys9byuzjo7gmeksc5m7q4vx81kermn6ji7urymzq2azptsdkqte35l902jt1enexy7xz80eat2rn6cergntdjoxs8gzgrzj8avs875tnd9kqi5xut72okth181ahrei63dhss70lr6ixa02mu4gl41bxjevzde6odymq61i6mussag4fsj6q492wmlstwqupoidku44qwydc09avzwka8o2ee1wucdjnfbjmfqp9czx1y0ca10ptrmjtkmvdkaf4h8sxjar3b2t51cgzx6kq0u0z27qoqkfkqlqj0majnxhkpc2j8qzq7dxrprdi3tsn5442ge9xf73rrtx5tv92sg96ynhx5z4x0xbf643l2dedm5uo0wmpca416tfkyywveov5rd89rh6f701mbs7n3trfhvl0jyknzn1ldnihd2e7tekr9leg216eks3vuq1w09m3uv3aqpdhbyoscbrf4juejy3x28xxcjlmz8goz0jpamppl8nat54vt1pnxefkdbvfwx19eqr7moxhrycau17iv35a8dqlsn8bmdnyju1zgls5c9frt9wxsj187itu24axjiq5xn4g0i9tmi3psqyaxzk1yusj2h7utuxbw7vio9zhv8pze119hw2gk8c6xt6gsmmvqpojzl96ul0gu12i67tv26ib06w5o45jozaiy0tp8yo5nkcor3znpwln71m5ww6m7up2f5epm0uivxgvaqznx26x812gex50u7kdsm9t74i788qfrtyym5qal6mj46mk0hfj75kbwaw2pyhwrf4wpr9xjz5b9e8tyeusjs5ai3eap1y5vb3dccmcp9elmthqqg9ymz7vnxbec5mx2rxjpkymph4yi63zimu64n9nd446hhn4a03eclrotsw8jzvcp03ds6rb4f8t3s9aefpoiaqc4bk6hrubc387cfpud7560q4j8rl6cp97860qxt7eaz8w0sgptlj4k7gsmzc1s9l16g3pf30vzha3vcbth22kyysrs8bri1z1ontb8t0cfdvkoiay2g65fh3rszwtpjcvxefwghyo3y6yafzlc14vs9ihngldbntpxy4yvv7gj1zegye0tauqaoj919i6cdxiaoytrroycdr3pgirec7cxg1828cw12n7hft7vtzgrj4i6ridw2ep45bfuhxu49twwd7rx7pl8jehnl2kv9qkuy03qfd0e5xrlq1advahkzltca88wk21w6caxbv3c1cmozf743hgitv3o5ekckofwbx5kqjkx1g7omd7m8fjjdngtcjawnpmnhcwid0osfa4didy9fpj6omsx8xh0lro4rj67ihwtmh35auy7avr67smxz905h3kosriyk4kxfr88gw84l1zcg0i7g8qcstm',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7726387891,
                expiredRefreshToken: 7644931355,
                isRevoked: false,
                isMaster: false,
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/clients/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
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

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '1517927e-c49d-4485-a1fa-3922247fa875'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '0176a877-aaae-4d56-81c9-6ce61f569e60'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0176a877-aaae-4d56-81c9-6ce61f569e60'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/402b729f-c800-4ccd-806a-a2730215aaa3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/0176a877-aaae-4d56-81c9-6ce61f569e60')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0176a877-aaae-4d56-81c9-6ce61f569e60'));
    });

    test(`/REST:GET o-auth/clients`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a1eb0bd4-a456-4a1b-a67d-f2792be1ba2b',
                grantType: 'PASSWORD_GRANT',
                name: 'px5lt63u9tvf0is79b0d3x7rqt2b8vvtydzv7w6jcxh7dn0z0pju3v67vqumngk30usc7pvnalooedeax058rtzhcy6fyorf5l6gy0a20lrmt4heetas403coc035eu1cgvdf2qgltq9e252izaxc3e2stpnr8hei921r6j3tkatc5utzhle6xpb2hfoal6kbgqzoubnytm0tzrw9s6rj3hofgis8abcjag5q51gzgw1br0nohe5ds63x4sksb4',
                secret: 'fhzzi3ptkx9og91i9wsge83igtm7ma93ewna0dqknrvygaboae2lv77ue06guv17xn3q4z73jqjbn7h9nf1uj9f6fg',
                authUrl: '25qp65h4p9szcoiz2i9bfu4fimwa166ut7zfekuhhgdlm54gbhs0wmbudlazjgksa78hur5eezfwt2uho6dd5g9ulg4p2ldnkvhezs5vto0as3ytci6hpl45wzlem9etvl4j6aqe68to1b2usp3ekwyinr1dbeazmf7y6ocza5vli8ofrdrhuiq029gje21r7ttww56ty34xjj2bxhgefx62ztw3et8vojizc4wr9vnfhx6w5ux6zax25gkx9rj7kbykub3w5hw8pa9gl8457kw1tz65rzdp64drbe9b8rz1j2pnrih628mvs1notze0n4xyfwdmeju0c7fjfckptaa38evus2r6ouxnd5v2ak75s0e02l2sgw77hsriipd21222yienfaahmybbgzpzrp9cz906zc5ms9qk656o7f5ugmg2og7bren185nqnmewivkie1qmzlgr8doh9osegvpmp7m1je4n0u0ui747st8mgamzk5hrram3c9e8igk5cprx6c6wz1wdwjme24qtk3bpkcfiyj3uh1lxyon1mj7mbbevmes569lop8zy9m45wznyh5nzhbolklgjrrrlgnua844lk785um13x0wmnpfllpmptdp1az59j0r6rl8cusvbhog20q1dc62zrq6i9fwlv6xpdl3gm4wvhu0jwygorbkz90r7wl09atsk2vsi79z17dpyb43zc82i4d771tw7nwymalcdmwdk2ihz9uj8ubansey6aotdknhxv92foocd0ad8j2m1thayzooh5n7ztzx1unvrb8gtxtmkx3bn8a6u7jf6334xjujy7vss5ej9a7qvbmyed2jle2j6g3fe3bdu9i3fml7cse6c5qiemeykwyubwqhev06btft3q2skuvsh5sf0taxwzcoxoy69mpe4bos9y87tj2tsleinc1jqzl2res9xh2wtyekac92dwhxi74paftltzazm4rzlwqilvxerha5j6h8n6qdfj81x2h693r6kocf0iwds6outqzgc0oeosricb1fe3x6363tpuf2gxb3yopzl3fqretwfir2kkvmd8nqh11oigshu3li8d5qv6ewib90gj3t5ycthmm1d1r0e6dgudovkbdjykpuk8ye3mg706kuy0y06qui755qd6zcmb7zmlve0pcuxw4at6bzl5kc5ywpdxg0bldxc8ozd90n9rj96ai503kj8kbg0x49hzsyjg0dhngbvhk87fhbwvilme0mr2wfqqqu16sv7lfzgy083gy4y3s8nt6aedstm154fuqa61gmq9bjwtxsnlnseb8eipj547avijga6it43kitdhi51ugjjx94k7fgc7nlrhnsamcd71e90xu5097lnm9b4q84z0c7ute4ofqyrrdobzewbicgie2e0w442vzc72kn7ohg8lgcb8sazyhitrtcygjbwvf0rr6gtsdwtisrhg7usn1fs2cty02o87khflinu9rhnu9r06ra6vz7ew6od2xb3j5hpp1294wrt3dzn11mvkxnryr2adiegert8t9cmvh2l1p3qs1edpqeepd9wt5lyjpcsvd8in5w6dkgumbjdcxz2vosvz94xiyq6nic7r6x9hurynk8p968qsb5oja614vzu40d34g5kuaeduilys5hign8h5409zohhzud2cn87tjkxk5bgbe6qamkwnd5ehwd6vgmlwgfbnue027mrg0rfak6bypb5q7v15jzahpbqp0oenck4oetl81okcweonz5x2d0sj2lp1kdo7sz9cijn0u9qqsrxs90v9r81io7bm1pq04t8f5craa6fqatjfib8ckcpr1qtim838wlrrk660pdywoavryveh41i0d2pgc47c9ftj3bmg10mz3rdf10vjqidmgr8ea33fx11dwbkh6ovbe5lb9vgx7ktvlsux7o67rfn21xta4u3iytdlapb6afhtsp7u81mx7c0dqzztvtn2mtivdcrypbyb9sa7y5ry5dk43d6ol21wx3y8m34bo360ln48hcu',
                redirect: 'o89f52md3l4dvinunf9eqjibg855sm5m7lr2npkoxqe91d9dohxfqkrlz57ahsnvniqn8b192zxyd2uwyinowmwa4xbw1xvfn9o8uum5wtdhiu8kfazpdxnfcc787qy1066dgm7q5nv4swgdqjuudnjr8i23andt0hjkji00b0d1czxq01ctfytrcacjhgcgwx4nnqe7ra9ufbzpi6ciza739yf5g4zyhq2tabrn6h9bypoz1e83op6xrsqvv0c70n9f0ve8b20ybnyltsz96kr9shyubf42pkkqbazqqykcw5bwxwax40nifkj1phz3afn1ry1okf4jhp7qllocd4ilpp9f6on84jyqd31lsb4nmtbo4c838pkm3y59yrs0dd3nwbzxuknk2zpdowd288f7drypoe2sls133fuyygv0qgx1srqc6px01usm5h3ugu363vchoi511curn051q3funflt1gy9mrhmd5xllaa5nes4l6y0xq8pl98r8mow294eru1y0xdpgzbivuaf9m67w4xdly07yipecl7c5ljl3nwxmp5z7nncb94qwbt2lxy7wb7yrhk5x77o9w7n1q0spcogos0q8pomlokyfa83bdc1hk8proqlt64bb0c74on44f1faaomcezugkwbshh6n5zkg95h3jv0xm1ctn5xogdq22tllnxqenhwhcsgqodu5blwcj4nq4aaq52lgyblbt0mu73ihty6dgv7gi1r05v5byl2htihpdqdccgaiv2rvmjyrfizcxsb9xz7ligr6lfihkndx469ybxu33srpi6tmkfwdrizowp7xz2hcekpvmdh97yhl2nkna2e7fkxqihgaccfahotbz7vsqfqxtq6ev1u2paefj922f7nx95ua4n00hr8z33dr9iju1rr93h1hc7izy56qgzjvs3bbvambu9a1zv2hs5wiwp8rfk64vma0ipfrepgjt5kr345jfjra4tr5rcyxcpsqnh85bur61tl1teg87mv83ba6lzbm85twt6i0hbf6zolppe4kxihyapa3ifqedk8gk8to90h710s9vxhk6w7f48unr96m6z7gphjecjqw71xul4wm68vpw9iyejqyef3et84zjhewhodhrtsavz1zmwps44n30av2fi8bl44znzxuv53o91v2g9ve5qou5fremeb4s1ae5a17llfu5lbgvyj6nw91fbhpllmxxopxl91nsh70qs64221a2u4o9jmnlnxg6sr0sq7wfvd6sgoql18bu4at0xbjosbmm00i2sl5medblr279rt8chiac1fkdrd98xki92ur0eqwlru4uwfejobkzvhvjqj5pg4lqo5zkblz159lv2kcpf89qmbxxj7xteo73o7f6rqi9ie9zbted9y69zywzge7ern4y7orkmfc1x1ijs94l0gkjcf25m05ar5ukx3kj79egzw8vkvejc2awp9santbrk18bzfqordkah3pz6e7j9uslgzdwwshqh6zuywm5owq6cxibu0qpjuh0or9g2vs9c3qxievr6szywxrh88dmqr0i978qgkhgm5jx9w6s06o1cw6qdll20295blrw2jptaq5pj4akm4v9h43r366zbw4tlbo9iq9bkh60s36gkm9djecdvz69ixld00k418guydwa63dg83683mouxvg7ar0rb5u9tvxa30k3lr042hlvymfjavhfohqbmti5ubkc23u8etoz9ms2t4r1wcxul98xoebp6db988t7blrhf1s8r1ipkxq5a9plcqvngxansdgltmk1pf1cje8g6j4waxv5m95we2iir8j47ca2aqvji9m8lyh2jfdnujt8oqz04ehx96gmmgtqmx6028chfwailo5e3exc7n563g75v73dny3sjz2vnz90h74vjqmccb7fz0p8ck84wqr1ninsibpkbjp9n2x6qehcpiw2kkehfi4731tfl9aj8rwrroyhr0tcnmp1fadyl2062v4wo1izov36q6rj3nykyormfjdtfz3mcl',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7378914308,
                expiredRefreshToken: 7586164239,
                isRevoked: true,
                isMaster: true,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'z1u8y8tqi21d83d7l25nsh24sekshlkop6u1nbxkyg5iibfsd2ujwiovk8wytoftwypivbqi73mrdyyiu6pueug4x936ncn3b4coj9e5avgc6mfcnch3s12dz60xvlftgart5m9peqcs9lrdl2l9q6zy9527k3uy6jofuufvifvtilotnf03zenkq2mj8907irs52gqop841iiwlnxcqkr5tex3o5v0zhhzqdrxi0punm5ktgk9hh8jcvbeopur',
                secret: 'wfu0rwry5nrk6q1mmfpmr4rfb1hiu3ov2zffnoddfucwy0ml68qo4cbrn4ovrtdb740kv1ox3dgmebl4qtc4x4cm7f',
                authUrl: 'v1rq86n7lqkokoaca7t2pvceq2qalwfb7bpqarpsyctwmk8ete11irbr2tc5fnkqogvjta3rvt11gszzw519lpgg077wpp74iahkud6mg4ej7ldjhrt857d90upftshoqgl8nlbvftpo514oqbte4euqy39n9wqp4q15znfpov2mecbu7dywu1fzbqsvwwo5huaz388lhal4dr3erfi0e2vigrlyz7r5ki7xhzk1kmhe86mq41dk3jv5nf7bdnlcwbflgl46pkmbwdm71iwgid2l3dtnhcjv9b9f7fh4z39bkyiwafy1noz7auxgo6tba0p6nhp68ih2wyk85xrjpk1iuurna8a4d87tvaxs9nk9xi19y16dyb747unu07rgdhiqok7qru37ebmbw66y4fg2s572yxodmg81r5233bl5091r995wd9jgthud956xymi0g6worvgft71wm6ic0c804i8l2463ci1ain7jq566htnpqpks7qnuep9dxyufefozn4c27ixi6c4ytyh699ryn80vy9iqt5te34ejmh4yv5hp8ou7nul5hwmlqjuyssy2yym5zts4va6ioat8vh5fvx5w4uyu4jmssye7kg4i90zo3kye6y6syso6xzalkbu4c14tbpmburxi4bv5co2ol5kuw0o7n6nfq73ww00h8lj23tqb7ucyx9b58e51nch09b5p7slnzmela5jiup0j5z04g28ux0wqvbggyn40wfeojyxwznp1l41f7gcg92c8ans2765c6vzghngpvlthdn5zsflu0ypi1064pntygcta0nx1r56tj05qpsl8q433io2awuxz5jr5464nsswi12xwfz45752oednemy5dkxeiyclr1madlsanx3kffngx7z6sz3955lfz4anfa0kc2pstuiyl5rsob2yowlxkuje8jpsv85rv6aqe9l00elubvblo5zl8hjin8n9jwqsmfd1zo612i6yauzh11bst3mk3fsbjrehq9jou45ytcck2xdtnguij1b87f1ytw6s6ggcmnyv07wo5bmr3nx85h285qoceea591c3e8g1yl1gfauqdm46sj5f252b36hhqc22kcvme99mfzwd0s1zc1m2ndsxnk5jpgfsj451xclbkiyf7wpx940zqeoteyvv6qv6oxcnnjx59sjc6shb7jizkswzr9tujh7n188ue2xdcy7je65khen9ouonas8gm9tua3ozmt7dfhew6wel388pynd6fppbv5lth59cajflvb8uqxqylhfsaqycjwv33wppeu5b8dic5ir8kw6gnudbfc81vp7e6ac2ihxxls4ua4ppd3fxc8b7x86o8ci04l5lkg8c7qvr6zhoeodairtskukwmsplxai3kj6wzti1g875arva1tgsvkwkqd7xep8yw3yuirfppx0mf9gm3v30akyb4sv1zair2rbk7esumwi3vjqr1nug186cs9vjkt8uuhn2u7939i6bqn4qzavmr3s88xhqxi7t6z223yrjhjjw20r7ukrqj0w93feaen8l4meif6b1oacek606uxmyo39y8umoz0sy2918aqmh1p74ab81fhi3lx2fjxezvauex7zh55g7yt7wizj6m29c7n3bjwlwmvzl8xv34xm3d5q3p87hjzp7basbizaccd93snpdi0fetv1awkv18i5gjluehzj2ky62wewes2c8u2cb0kvc82eiaadm4e4m2zloplxobfgl65lztkahf7gxaj9jyyi1q6henqbh6925i3z8aileun7lndxl0z6t9ij3vq4wewqy97gm6ivcfid52s8u2kmnr6a7q4h7kxdsn7z5guezqfvk56by9cu2n0k9t7p29zxj9g05o41cj6yglsjxsd94cxx5zuakdxd4t7wq07vo90r0i9x9ksvjotzukmlh7pxzgsxr7s6xezsbf5e9pfsxivbkygzg3wdddlywhyr53zskxfyz0ciw3jlqgxpvidtjwzh5zt7sppc0qalf3nochh5sur3mq',
                redirect: 'ukwilb6a6hp7xk611n5dzzzvi6i1rm7s3kh2z0jsdjo4sctra1x2uuez811otfa3ehsjb50pl07h6779cx3hr5u125jp4kokp8dfun1zk2vzq0qjlmgczoc6n4k36szqhp1ov8pvosawjom4nit23upc20eoltqnsuwhdtby3b0pgjoxu37jvav0c99sj6t3kqigdtui1g3vvxwswgfwg0twvbdl78y4bsankujdavb4s7w5k80fp8htk5gwpvpzzjocjkgrs2ats5u7wbtp5vl9z4aeeztr9sn964gdl7m9mz8cb6vkevoxh8sxxgwbptiqj8ug286n1r28isklaqh2x0vjw7bpn00pmhlbzqxopp9bw8y4yn8s25x46l3zp7htxy9aph1xhhy64vqik6hfwbdfafkjddzulv3t896pgjuoiyrjk0w7mi5velgpnnhucal2hku7lpsby5dk02qi3ggu03g21lilkkew24a2cpdnokytvjg0zfuymcubslvjv7ia98js5h1xoan9ecmzfjhwfyq6reevh35sepzknhvwm05r3tfuoi10cgrkb3vkygdvuzj0enun1ka0ahcimap6vomu8it2pqpocu56nanggzr7e470gsza21h7sj5kk0pm6wxigsrldp3mma10b5mbxlsp8ojnekheldmpx3v9vtskp0xawv98cp3m35rn81fpuib4lmx8l9rfe78dlzxeersijrukbslukxxxbhsnath3d5h1c08a6v8srixfvbudol8w6rfmb7kt75vfdmv2jtk0g6zruu3ilriv0t8akukp5xvr47hws6yqu4j3haokb5yf90663i6byvv2r8fyf5wa32fux0oxotxfw2b1dsrrjxe26mx4g79mqt71fd0hfj6ufauybqx119tdkex4r4zn7zq8bnmhura9vbcug2remghhk43tgjapivwe03nemgkmk8edhxt7p2w99q19basdltem8q4xfbe4u0d7nc7zx83n1e35ijb6jobqh7adu2w6wfj8npwtuayqzv007oz2x8kqv7jpewzi0waiupv3z84kejzgpwvvgsic5k2wulbnsdr8n6jdiarcwggnxjk4s4vf8flxi1o69e52nxg020df8wnkfbmqm3gmqmz4m9ahke2d4u6nypc5rv8aqwri4mxll73azjdih3lq55j2zjvhq6rpwf50uyqvhmgegha86gs8kev91aoiatwzwex4rh34wmlt58bpmtms2m0xry7yb2disgf9iriopk5ljwi08eu3a5fj40h6pmm6im8emftn4sy3c16id4oqjl98w8x0ic2b3ifzw8xyty1icyw54fy67sut6rspai4kyx8i27fmd3cdpnrq6wtmbmppchuagasw0tcxuagto840cjlxsbsi57wnupaiyym0uwapsiu98br94v0st3y9bb5csobj3o1ksncgzq7na657lq6vbkq7w6oetbpp1yy1qxgf2l12rs8od1oenyjnck5quki26n1ru941gfh7t0sda0pbj1004cxohrxk3z20fq2fy7u35jxq90sn8997i8igafkn04v8zz3ga3n2pi4oin7cor4p10v81uhqf0ml8a13esj4ontcuyfmsq7fdvse0ihol8uahg93jhuczos3onty8u6wu8zf3nilelqsf7dfg2liallun6lluqh1zvay74xhbw315tbwz8x90n0kvnxxnx7myb2i3zw52boqaigeg1d5kywk0ptr5hmego3zpsvfgt2hkpv2mqvjczydmuy32z0b0qb8ppeockm7vael1s132e35sf2qxe6dogdnp8a7cb0kp6hciezmf5rb19feff3u025mct0uqfns2m0aqs0vtssmp24bw6uafvf1d8x7c0x7i4jmp2uy5txjgxf7x7097vhuqy1oxk9gsefkrnqf27ynunfscqpauhyslrwssexekbi0qaw8zzsnnmi3221zomr10jf8adztef8n48953xqorsig6l1jfwqp39st56hgggdx',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7795791160,
                expiredRefreshToken: 4548611444,
                isRevoked: false,
                isMaster: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0176a877-aaae-4d56-81c9-6ce61f569e60'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/13dbc3c5-06f3-441b-8e87-185962a78dd7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/0176a877-aaae-4d56-81c9-6ce61f569e60')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
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

    test(`/GraphQL oAuthCreateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '897631ff-70d1-430a-ac1a-72f5191811f7',
                        grantType: 'PASSWORD_GRANT',
                        name: '0rkgm8flsbzvf1ozs3r6g81t6dss22uwovfrmukza4pehar4njfgpn6i34corhzsccnwxmzraor5cp6qmcoop32fxsc7upueqeo0o1pwaur012hi82vnsiqavgoby17e3znd73h30q07h4hlxy7g1m8hfx8vgmbtmk9ia4c9ips6vjwl5z10q89t3xnzqqbne311hzc11v4m19ssk35msmu1yxvc85j6klnnfieccsw9gz6wv0b07hl8fin3fez',
                        secret: 'pwo7yhrou585yd1ykdtocm9x7r94mkehs27yaxlayto0kgv0x245zfud40593d7g605os8yfspuy7ibwuxpl45t76h',
                        authUrl: 'kfixk6egykz24nq4pkh4glfed2nl5klijpxadzt3p2lnjhcvk9v5hvesuemeoj2oefmo8jw51jyb02phii1lnincxkwxqbslskqwicccry622y7rjsr9bbai6e8ilouadxbekr0t7lj0phf5ciortpwzt07868a8de0dxlzo7mb4vi7dk55222qeypjshmquqd1idd6ww4ejl459m1gjcx87bagqw467gzyxqhnwnjip02awkmymjc77i2z94zlcczlg6qmfccs6kwxtj6uspadgjq5ptfbs9pxknapolgt4ggmsd0mjg6yru396f36tx7ogg3c1oo41p2u4f3sol5fuzpx2ad0obs254j79y0ld3uc5tqx6lb2dxvs94jkdh1ulnjr2a4k03shxp164gts9mxgg74t1o0uwc5sv7gcy486i21gp8qzqhzk429vz5lxpy5725so6u57h0amyzc7ff6epwdq6059kvuknlenfu438avqq7f1ypxaoxyeqc3sy4doy1wvmyzqdhaju86dnds2o3n1dux4sgsejt5fvzspvxnf9v1mineli69tm36czdwfrqjwwywhb9eg7uen0p3tfe3fo628b7ba9tdtqbg7pe0ynsywrxxuiphxndg4t2oqbiulowx96oi4pwzg2s83uu94taj2cms1a2gcf7u3vteiyzwo65ucpvkw8noycgegsf16w5zr4cjy7hr6t5sytftcjo3h7cdeglexiiskqvuakj7u7k58ihefxd2pj3o8gdknowhmotz2dl946opgoylm28nywbjsqldbit76ljv3nt55sbydbz6a4w6s8yumihuhucbt4rlubck8lpnq0m0n5nkuv11cez7928jcrmkt9mfazkolfkdg0a84k2wi57ksoivar0x8tb21a5ajpf328g2e0qdf7se961e8353cauoac8fr3s2qkc8xpdukk5gd58gyo4iknqbnjez6nj6bhakr2w5rduggcfu28ik3wwp9z8gybxwnnluwn2qdr0cjt4a3a5cax6391ti2sh30ye33h3xwbc7tc9dj8esvyr9rtxw66a7ozppxa3l6xajreg0bjcd89l0v4yl4vtakrbneb6037g4z8etk7fzmftkrwb1rl9nn8cs14oekuonfemade7a9vpxpf4tihyfpveahh7r4rxgk894plbdxzx0zbty2ibd6eg2q9qeud1pk58aozy7r45cjkby2h9ll04mqdsnk8xfwee96pws68p8sh7a5o0up5zzleuaqv9on9fjzul6z9too9l876k8xz34ujois6wd5q8jobxwuvpgl1fjmc5ukurkd71x9y394tkmc163bx9x3soalz5hr7xyy343d1vpgj7wwpgtg79l8njmohehm6mqabqxxca2qsamxken6yt0y426xy1juj0xig4806do97e6gob9nv05y56m1i29lqdokigr4qipb64s3and8chrcnxra2q0hdxrf0tdg9pg63ofb07c9td3xyckwmwbmn86fnhf5e3sxn55ud85goqyhe60hpz9qa7f3qstwpowrbi0g00i41i1uocx3rutni9a1ysbi5mqnw409d376jw5rrfbakdyyop0jbm9y2a5d92r7ob2i4fl5sb9giedytofqjcet9goocqprhh4ear6c0gwzlkbusb5242idpwjo3xxtfu37pkf0xxclbq053vckgu1851h7huab3xv3s8lopewih57op4rxcpqkbt3beecgi0h6mmpy7rs237p2q63lnmkmft9cnx5s7tay5ql1fuosgb8bqbux4xqm6qgs04dwmnuil4wz8v12guqdmf4ldxru2g1s3o0pv8r7ttqwqbsi2d44s6ffcncgqd3v16i1fgqgssm67dpxwk8ziwjww7v62yhkqzhria945891igkm68xi0nxrcvat99l3quxiloordpa0mvmlhj0e3ei22yxtn5utim4dtclsgw5ss4k1dmym5wc0gue1554znx2n8gxtd5qrqekbnmedl',
                        redirect: 'mu304m5hzp10fdrz8xxntuondlse6nglf41qpyoppisqfppbfntaub0i02wt93068536uhx9l7t1ya9kptrp8ggvwleaoqbciygfulc9v0fd826if05rzyfzkparj6aintmyb7k304wgi13tydewd767x3ogmeov2rtm1poofnmrifbpb3er4cc50ocl4etvs050i02jya1zshalofl89h4qg3dfiunfsvll5gtjki1ij0iu650ie03yr2542723snlvvxto58yveureonag69r7tujv6r1dsoggsd592thuxmlh4vz7zn99u24zyf2lm443i6lx6pcomvg9f0ukvyjfeza15mmi9ucva48chpja1pw33leyhug1vu861cbh1h8r9c5f3e25si5aek4xgv2l9ecxg8hfpxyy1avur33dxamfou2s3geo1dz8tvly9eu5e0jeq52t2wwxgoqhzsf9s2fcsu8ax405ksio5kkw876nhgbkflvz51n2d9yn8rcibo404nknwr7j7byt4lpk0jyzufwvrbtqx57ucuqv33hdm5turwh16x9obo15z00728fs06joipjnk0iroexlqpzr7amli8m25tdw57rhh6l2qubhj15pxroft7dbnzo1a5wnhayle4zsgt8hy10wzougp2f98wwk5gonlegu0viynboxr8k6l3yxtv69xvm3xocqnkulktol0b6taee5vv5vsne60y5gbhpmv27rdf98p8evhv2awzr9zheiv8sml1jsxu5dmj6lesp7z6r6227p0bwkgmi4xnre7jhlgntwr1fab1ncf283a0g3zt0gwl3liwfdwkgrlzht3y8heoo3u1wp24jk556yp97n4b1enojmqfuuat8strj4b79m8rxch94pk2awfavjr3tqrlwpfxorv0nhzqk2xooljqnixmu0x8bzim83n00z73k84rqrt09fowv3267bc8fz5ejxj8jx6tf1l4ilwti3mvh1ts3ig73rm5hsmv9fujh5q4ednarnbc2n4embjhlbwm9eouupmphyfcmgu635cw87pn89xi8ao53ulmt6ij9uvnkiqu9jd5y1kqaon6qc1fe1f017ht5yjepm70nkawq1rx86fd8ivxf10mldvulshb21jbfhoz3u0cr3gajphfaz0r8r4wsk999c1y8t3agan0lqnaisxwx81b7eod7s5z4tmow3oqc8t8p02kvudxi3j8hgp10m6hpxwh94b05h9q18gw7itw8dsvxf28gdmnfodaty6xy6q5rx8fi5zrd9xdox05w0aoasyobmmaij9t1gawovt59w8ftb6tyfnweitmqb62c0dgdq9bbv2s77k6esj91jv06fxsd9itwop6bpptgstly08yopghk6iwfwohenqlso6lgmz50fbtmhxfoxq7nn6c09g3nezn2q4rnpqmna4wfwziern23t95mn58qlkckz5ntkj5k0w0nebpdbeiuwr1mxcwbgyv89um4clxhz3i9449uwv2wepd4snsfcp7leoj7s98b297e54pfr1sor3fchc6eoj9ocw49vhd097kw4gyshy6t4nil9qxnzud9w3f1ew1dq7jza329whfeuk0wtvg6c2f8hmxhr1l7z4tkc60stvpfrucsrvkpvdkhi5a1kwj7t2mvh5rl5eldvs7f757gaa7zqq28norakpzsvh7di03jiwyfj4wghjl78pj11jk7lh22p2d2du1tnynwvwuiruw27h3xr2glugln2136wi5fe5za92f2n8uskv5jj4vefwmkdrhl8byyf0m49zn977e31pl08kqjr7i7r96rwga9bcjqd0q7iilrdjnwfthyohqdih7exbqcrxnld4c1kcl9wpqe1yswytkmdw0s3icsk83wtcii2z8z12swe4oxngk5u9x6rkw19lzt0w44hv0hbrp900c1uc29beyzdfn51c72udk78tvc1102aglsc6bso3q4ofcyhigibf81lnjv33mlrzb70kg194uj9',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 7195267204,
                        expiredRefreshToken: 9367063707,
                        isRevoked: true,
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '897631ff-70d1-430a-ac1a-72f5191811f7');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
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
                            id: '05223637-f662-4100-a75e-36396d31ffd3'
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

    test(`/GraphQL oAuthFindClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
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
                            id: '0176a877-aaae-4d56-81c9-6ce61f569e60'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('0176a877-aaae-4d56-81c9-6ce61f569e60');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd6dca6dc-d8be-4222-8d52-010a338080ac'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0176a877-aaae-4d56-81c9-6ce61f569e60'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('0176a877-aaae-4d56-81c9-6ce61f569e60');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e286e54e-f64a-4425-a271-449b42969910',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'vcofq856ncnaw1hb9tulj7bfvyl2y6y10uq0qkc6ss8sc3ndo62b9vi88guj4yhf3x5ed43r4m6bvnsfqp93zro6sx25fzud1p82m0kluiaj6rfskukzkggggnq0run2ik29fd0xbs8m8f4m31blqmsw1kfnu3tmi72xn42zojf4d3wk4mst9fye9u4bu1dcwmpi6g28kb6nafnfcq1fzzjcd3wljl57h79x5gsuw762p96mpo0jbqerto1eygx',
                        secret: 'auzyf135dg4h8g9597s0dzr7ioxtv92z9eb2u5g7h4l166l6ytvoizzsk8lnlee94wq4wtvaft7evhwbs8mrtdd6u2',
                        authUrl: 'ro49mlaba3w3scbcgpmgzwlh9k9qtci6dffowun8b4fxhjt8bgmf7k19t2m3wr4himif15zr1v0okfx8gpeo8cedhykwrnv2ixonhzfwcau3qwvwyvm746iml7cdb6gmw1gtpnsn6w74q5k5j30tk4f4evtjn25icm47hd568i18g52lsqvtkt711fyqd3bqgkd2qmclt85nezrv3vdzfnmudpu21rfe3hlt5jcj9ccvmaemy8tne8pfj2jjcosz7wt5lcgnv0rbm5y3cfioxgwhdtgl5bf3nj2sijf5f699e2xhujiwc3ogtnjqrswqjmwyyd7jfnjtfzghzm2gd57j327aigesydlc2lp66fv62ni7cmwvhkkhgb20myxt6neka2ntmnv4d75a209gluq430ffqmx3bwi4rf12to32dvochpqbkvgvc9o4a6fy2qoawf1gabucgilnfqs2qtva6x8ynpk0axr7alv9kombecxsuwdfgqp12ol1uur5dmf2xhkm67pk5cbttyxndduun5mtzxhotbl7axw67z8s6w5vxpgfq5nruguzpenw8kt7ns2gvuswd4trte7uoi85b3fcw2bemy2o157b5k9gjj75hjp023keb4p7l4oqi5liwumjn61503lt1r7ascud4r9sfu992saxhpf9k3vwzr6wghypc9r3vac5srtj7thhggctbaviro4eenvmczatm65t4h4102ev4til1cm2nd65v3rm7ti1i9vc0ray2cg8telcgjfrd1bytq6yu6ei4klmf5obnrz5n9gv1bdts3od6vrr8q6ayxq7v9h3iv382ntnnyghs2va44ev72p2yp0b9qexrkq840fh0d3j5zfle3oy1ulg0iau6yed3opg93bps886vyjbc8wox22581q4u98o7ee0gpu00hchio9jfp7yskn7g39ecoxhpk1uvhag727tmbsonap8he95kcfjubnpx559xwenvo8xug5czk6no6f2yqrzhpqxcichh96kpzoadq3zsr2fhchr9eod3jhp6kzbi7ep2ttjesbhv1xyl1tey8tgayr97091iwo2lj7o17oby1o656q7iny1r1kbfjjtc5zqxiri6zmi3dtobwmg43c7s4s6qrq3fceejoa0q5t5gfowoio2269vc30arla7zdm2sysnvbgr81neh5e5bdy1vzxx0xybespt7urivn4hdy1lp42o5jheoptkw9wrp2udsv3vp051vap7t1cakvxjcuhz2q4xi01mpc9uxx8wolpuv9wwvk3419tik6670gw30cjrlwa1mb14otdomm4m93n0qjtemk9e2b08gd3cm18bsmf1gpd6xugiya4xke5nkjsngjfkajkmnbyo1k65xhknt8uobi8xmsc9ozl3npo9r41t7h7wjgq7byg4ovo2zksz46t2zxfaqfvmf2xpbtenl6wkhlb7rwnwtzuzz6mvsvrb0p39jok5lof0x9tvyzwbbr44qo8ftwxauezuefva4xy307wsq39zyea20i8ma0vmq6sc1nzbbvrrdmrz41iteemcz899wd1zvwv8lzmznnyk4vpx8ws2oizsfc8ohoxmjo9iuw906zmo4fwp5lxy94fqn4c6g0l4zuil5u37nmdm1mgud08uzidg354vhw28eg61s7tzdkaztp2vm3nc5iqwcmhpbl4jzhvvcl9c4wwlvwo173d68i3nbb6k9lez7wd0fu25416msjtdhontkb4mtz129oxl5fyephmcub0m8l6niwaw3omaru2jmv3dr1s5ow34h05z22h9f2ag9xpamewilxwqg3el5myp8qgb75qdf8v0wzjus2epoaphckrw5cgdpl2npx655qfxc0astycgv201nvicnnerq7gpei7902cghio33j17ic72x7jraxf7fz9u4c5h1dg2idkqkdcj1ksq8n9zeyohcka6a1b4zah9m191e5h4syea00tn204yuf4r0fucnuynpf3a4mbuck68kqksq6a7',
                        redirect: 'l5jvd9jnz3x1y39odri4uq5gjjivzp2twwvmx1jeq0jk6dfk2mxmn7rcicsbscg9b2hcgqqnjrvf5yxme0krbpwq1xxgfay30oub657br1zzt8qyqhrzfm4afys8dzyl04pur373tllwa36xa9a3q84502o2n2o2kiakptgqp63z2u1ak5tgcojxfy0epnchw138kj5u2yussaeccv8gnlvi7wuu5mzpy0q2v3hppco2ibylk18kiprekz3w52vgssgq69hyr850txze2eiyu1z7z27okhj7z8rcs7knun0wk5bmcyypvgayh2yrqvimzgnns4dapfkfio4agpg70payle17nrltnn0cq37nrxwm3w4o6ac7j1g0k6a7rvkpyd3t0cg5virbc2am5m0psff72pruch3nfsr1mkwfec86eqv9445ooy6buza1puzou52q3gtr61dw4kjlr22y5nht6r3cyxlo4gr06nb8h8s3qyuq7do73lp3e1pjjxg88k6n43ubizt1dqej3fwsik2eosnwbkb4opwasastzu2a4ydgkkrjtavgtvndgsgw5lberbb50x6s8hjp79eg15xjshhv80katl2iq9t9b3svhbx8bbx0bh0h5buu0p04r5lw6rvx89lvh5r58yswub7otkqx185xn89bgha8tqosfq39h8tv0r8kaz6hmnh2d5g6qw2sm9w8cehc409b8bcu6gnj2dn08dr0dpebrjycwpkq3ejnvpuyjhf2qlrdz0d1itmprev25wvwlwqartp7dkzq80vc0g25k7t8bvqtzh7eiie938yz7vyjwhlk4tfx2bjyhye1aakq3nricl1f4pkp07f2665o9nzqh00r5kuz6bbbnsras4k8i2r4jv7nissms5mv7p3qqnh8j95pzsrxgs6iklov4vqyc41shcmhp9vtazc1rhz93ua0kadty7lzlk6l0cedk51ku00cb9dt8vadqscc3pvr84ythl1a0hzceq1eygr71tgabrcn4mr3coef6gznpbynjmwamup4cha9t48mxzyjds0v6aja0nfut97s6yx97fv5lnilibqtv5m8ecxgqwkwu3z9wa09u3vsss72qpjdp0y3nd1jxsftx6luvi687oph84mehpen2h810uq5d6i2qrigeiwdgs6mzw18v7wfzrc68xoa209b4txxocr4em6scne0h50js83rf72bf0ohq0ximiuq5arhhzydtxvkh77y9dcccggqq0mq9h8b07keiqt8a1ir62emwm513j4zq94d9hseaijx322t8xqwuv6oz3dtpqdnn6a332tbmsc2rpoltaplpq3g5q8z5hee2toqcrxo4v0h0z0rspa7xmq3o2qkt86i0cw5aic2c1y5wmp5wjg4zaxgr1v95gopirlfen1jwye0n9hzh10xe0y27lrhgxw06l90ztqzv0th7smn1j4wkvnaq96b39bsppangqce4gawtiim2dtwhchntwtgr0a4wqfxnt3zr2ra7mz3640mwx9yjsy1qhw659zg02ta948nin1whcdibrjqzvlgre2l7bsa5ahcdvgb1xafy2l9ee8tweby393s5r65iknxywuix16c8qgdtly9ow46f7n6mgcjcguz2itrrdkryra2k6wrl7hwicvb0i0ytg8z4pquf074mlxvxuanh24hrnq10z11z3qwv5ebgt4z8issvemlhehgjayq4jeauxgjcbmjm0du4vl446shazpx9hnhaoefpcawxalmqxayoich7q8w72k1gx4my5bxiqbvb0d7zgjnlmpe351pkntgd482y4pp8nv7kf4a1xm5deevfd8la7854rvc7bss9zse0r140kz3r7tis3zszvwjljw1vu9nazhb217e5ry9lxix06q0orgmamz62yzsnbt1s3yj1bfib015n177g022zilrsxfa9n94yfyd6ac9d6ggxl83h9ku8vrez0vremm1itmn84aehlf4rhyfue88hay1eroysspa4zgl',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 5336253683,
                        expiredRefreshToken: 7918665357,
                        isRevoked: true,
                        isMaster: true,
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

    test(`/GraphQL oAuthUpdateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0176a877-aaae-4d56-81c9-6ce61f569e60',
                        grantType: 'AUTHORIZATION_CODE',
                        name: '42mjqsq6gd7hlkv9vy20a6h9ciantbc6r54sayj8tcjopfxepouk1505w4grydg91vydtltgnzo5dwsawgyr0ga97k7i527whrxtto8px35xgfm6qzbe6l7a6ebm1fmi9otu1aq2rinnc562ch8yw4sfbb3ukp5hhksxu0x0z0c89e4tqw66j14k59ime4gg0ghae048x6en8s5ots4i3j38nly1c1pt0si5jrj445n7zf6ntbyabr5tdv5t9ho',
                        secret: 'ogiw8thuqq1ddemeif3e6gc8xcmdkda48pugmngknktjp0algvgupipngzeyy7ypnhme1lok0b2jfg0pk8nj3xx8s9',
                        authUrl: '6n0be6rjfr7zsjklxdsbxj31yy7y27d3clowchdu791pvuibf58ssp93w48gg04oyfpsqnf6xtixbj7x6wsuh9nhkigie7r4hrde0043gacxdwndsh6tzrs45j4ucpebq7lecfsiyp7j95fjfcychpl27kcprl497z3cu21agl6k6w79g5t2yy22lv30w51hsoivt8sgtheyb57crqut7hvc59i90pbhatdihp4dstc5zfywbfbt4kfvokmyz4ak06emvmv5u2rjuoe6c2h7129qxvhrvjmu3o4ey00v0nqih15h9vl9loghmh4x1qo0pbrcqedtwltnpowea4qc32wka8i9yr57x7nll9b0blvdek4n4nhf9j516iawi62ilu88zw87m2b7ws9dnmusfrikmm7yb8ws5uctlgu6etc8arm8m9o13ml24xbk4u58a7v8yfrlmqz0e3aiuxpgz1y1o432j1qifudhhzt3rocy2jfmsi8az9qxq93kqa3v9v2ru91av3la2dbgmsf2x928xxt2j1ffx0vidl0lh884e64c7g1wrc97an44wpy67sjnimfepq1molkl7j5g1nxckfrlm43b0h59q3tfnaausp1vwhbv1dgb265l8jw4k1cr49wvrr8q2bzjob177whwlywvdim5haxq39hh09b1f6oc4d0t03ly1ps1k2nzkjt84p07foaizaqwf1oe54mz5jnkawbrf2r8d1dtrhifimn7tiq6kc5kgaac946dqea1qdh6b246ka5bwmlkqcbdr7pj1rqfvmho14hxkkitamdlzsll4z93j01yu8i550sms031vobi00aijhawau93m9rsswtnvrgjk5coc1owqkh1pohbvpftr2izj7oulunldytv28ccoc868ftvez66hy0fkp06oa5ejly8bz80mohyl4jib42bhthxvtb7nsyw9ij36gr6rzg9fwjz7926l4zin6d94anqmmkd5vl3c5roy9anedsxtn14d8h4894go5bibhy8lakchffi18g8cout029eqq2n5nm58yqpboi42py9a84k1vdv2un6xem4852p840or5im2isk0fg5la28dg95j3d7k18e4e4gnkbtlzy4ocv4u5udt9vlc7gkh4fl9a39t1rzxowygpp00g5ji8xvq107yw8pt5bgkbhatzf0m7lwls4ia0t7419dyoozs4rkrt4acbeoqsjwwuh60myezy5wl2mjrmmwt95k6tk17ktj302o6ufppb12qomy31kquvk7ohzu7x94wgcukg7koz7shjxofle9vnm3wowuczuf3dpv6l818e4gwjrzc9969blndtpfu4dh6j7zo6ifn90yhk7km0pbarxwsthpobp38s5eblc5i3ikqnb5fjtfsgw1y3qcloov6cqkfbjkuq6ib3bd271y6lyq7iwscl4it9xirviq8h1z3j6skn1ev1hoj0cym6fmz4e8wboh6l8nt641sgnneqhygrgy1shxno6po424uo7o7e5b6hh23imb5kpqm65n8r179bqrsuc7zuwmgsvfsm9waq0yimaf5cwadsb099j690sj21l6j062i3yg6k9qcjep3lls8tza2zwvto964l61f0yyfgo5u0tcr4z10e564d3rzw18gj98ui93cjsdse3glrfrvake28nbykcmlqrwbnj0vbxldfsc9js6y6tntu0hcuzzsyrco4sxfpsjexmxf63crsi1putl55ptbcf1xdvguc39mbxv9cw74fjxb56yl32znw6su2u94tmimem9hq20nhq701dxcgcttmgjmikwk1xe7s3qp87a834n9piek300em9ckm873tp97kpfx6dufr003anh2pg7yh281byamx1imq67gtblxjjns9e551ewd552bfdo6l6xutpegnsmi18lopeufxkpz6g52wz0mn0n1vf0iosmj6ac6m4wdxkmn0pgy4vfjx37nqu5qg6or9fuowvzat2j8u7fiyizd14oiml856sd',
                        redirect: 'egd526rmg0ksti02u4070sfnsexmom6nozlwhb5q02a4c2vsctpszkahchlr3dkyl4oal9jn9vkwip1gckev5uiffyiucyhc26nbjgrbggn4gvr7i2ayg5i6n1gzzaj3321o3rtwgpwflbzg4nqt0jp00ygltmwz8ci8b626i983k9ig0yqnqbutzdf5hpapt1ok6gctagsvgfxxq1gb1gwv9rr2tdjpyujw0dxg1kqjaitcyfklynl2n87wu4gl7qx900x2i6o7o4lhy3dwh5maaf7s5mousmwswt3cfc0tf6l0keconk4u4fyixd3jtfw4t4j92xqdtj4aekgk3xpbebtcitxunvqezyujm97476f3p3428upgbhhfpp3gym6a9w4c2cljkw9tjrlabloax3232n0ar52k2rafeqyg1my1iykxqbmh555tokyw5kxoxuubczrmz0ubxfwn29z1b91rt2lek7ez7bncn2h2tyulpe6tah0b3p1i5zedebydzm8fbtjnfstw0nkz1k30723pn2c2frd9ul214u8wcp7bf2q7idol7krp4x0d7f1bv40rs13xf3w0wws3uyj16xusjpxa8mcn6y8t1ceyl1mc2cpz40sjfzzwt90vcu4h5rw1561xpsaidkzeg7tjy71frlrkphxaplu1rbdp9e4vi9xuxndexujkymymvgtnsalliguzwbi9y5uuneddbepn8d082v4gzeaywszdy48h83o17rp10y13gaz2v4z7xgqxw10n0i5pksrhnbl8rtl21e9k14wm5rmj1hxihgekmfce459mjibjccny8ll2253y18yumzyo8ec4wzsa48xpmahrttk54luzu3neril6bsxqie9qcdjx9kbka5xgd6wxitmhsx8fv5cpx5h3w6brzpu2z9ycelpmdws4ffbi5i4ithd79d2zno8gpbiccz0plxf0096wwf8u1sc59w4ktjodo72dhx012g9dp5nbh9q63yz6bk22cvs3rgp2ukb0ntwkpjzkad2agcfbmwa7j6cbhwju5xem15grjoisgixjnzlsdj0re7cbu55yoqg9t81qlem1ebsd94lidw6l5d5y9jb7jvppz7sf45hq0o2jqxobnbbucye654qc408nxcwuxwb5cwob5ljma5g2x4b747s7awumyk9yn382k3cjdpvhw27bcbl2yiag9t9343yx2t4rsiw105m1tqw5dm4wxbpwarcux7yz8v0aoyi7shpd0vc83qko43gx64bvgqrwxos5qivqszxz9hp9fo8fc5y4kepq45bprv3e79mrhra77a0yjr2w2a4src08l9lzldwwccc4xaa1wnwuxqbpp0fjsj6b8q4ccqepcoaggohxtafa1vblevmipj0nlkfve4db9eh5p1uoff9ufff5s165oix87vth0hx7077ezd8wesyuh0h2syjxcm2vn5w0iq5zhrc3f5d1afyoirwpck0wytyc2z13k71wyk104rf5dtd757w6jbti2f12ik5jg8nf9q843fn101xojsntejoax0m2hx47vicvgv61rdszrkw9p8bp1o0ttd5q0b7arznwwoxs94bydjxpih862dgi1dssnnjx7nh3kob1ikjg4mnvm4cb6vdu21941oihm8ac7pf8wjz5dl45e5gz41sawbtimkeri8k7b4ljsye7mc3uemlxzakauxkuu9ymbgswg1oi1n9k3dcw4h0csx7n6qoag1fo4unyg17y2p61by2agdxmioaadvs8xapllg9vyam0srzievlu6azf3nr6rv6d0ypf34mk2b2qb03kfixqpb9y2eo87ai0u71usyullkd582i5fz96r36jt33rwhqkt8a6bhp5jy94w17ott3pxvfgl23gfkj99d276adbk9f0f88cbrfy765rcd7343h385hkcek95owdvywka2ahpakmb5g3t2gtak10gjkfj28rrniujvabpni8h8v94vmv98azqsyrrejdgr313ywfqx2z',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 3074902475,
                        expiredRefreshToken: 3078442731,
                        isRevoked: true,
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('0176a877-aaae-4d56-81c9-6ce61f569e60');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e8b760d1-7511-4e4a-a4c7-3cb4a3857b3e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            resourceCodes
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0176a877-aaae-4d56-81c9-6ce61f569e60'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('0176a877-aaae-4d56-81c9-6ce61f569e60');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});