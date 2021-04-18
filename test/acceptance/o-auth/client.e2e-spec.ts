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
                grantType: 'AUTHORIZATION_CODE',
                name: 'ql4a0ng7dp6y9n602rtdd8b4s8t8uepq9u55geop3z9dnff4y80x6ybz1ldagv8p8wr7bgvn2dtyxtmho548ma1vpw0gw8ygkx7ita69tuh656mw0ilsq7fi3wzv4z0woadh1btgv92darj8duphysom7ymh4z8bek2pxyhuz229k0ega4xeo7jf5pk5f7z0ujlxc6wotsubkwo67xb83ieuh6a5nyeysxnn1qgjz1ywacl01fxac5rion72miy',
                secret: 'ps675ar7nq8y0v6b1hnzphtstdmwejd1yuspqsk42d46cfqog7e2kbhfjwcz20v1zs781ytkpro2pgw0zdtogowwkx',
                authUrl: 'b8k7gr9d0akh438xqge6eu4oam3bnqlnhtjqdiolvekoljuo9qsugxf9n2ogivbx9ap9o8i95m1qxyn0xvwslq5ehv18qltcdpxuh0iil14z9fr0yqmq74vvrfn4lf2ft8jb6m34p6u57sbdome64zn4gu4xeljedqydfh3xy5z6tpxr0yh2as3ry0yxx5hrkorfpsiu1v16xnh6t8kgm99wkfqohsyl1c8rua7knqllz42jsnpq5y6fkhwq4zhnfw9v65n76th9194u8xmdd2z60urhbyiq1ksw1ueaz5s5fwpw1go9tul5vmulqsla2eaxcm2au0wdd2fadvr68t5fgdff3iqyep4skie5s6odohhx8cyfb8hpbqz1fvkgcw1o2a9d4dtr5nb5qo4kyng76ddepgso3g3qjuexcv7o542j66pwlc2q42kf6ez5yy0stk044o7gdpazjbt87yik4f45013rgb5x91pnz93xvmakxel743ayin4cbnsrhtkc37xsu8lwubneo6emvrjciushslol9bwti54f3xm935del75wr6mag1u9gz3f36prcvbztvpn9dvpvuwsyk4kxmn1iue4mr2zznrfalc0khd4jjclr2mcbj9njkdu5zw06ywidh6ljrl1qehz34fan9qrkuglox3xyumvm7kxitkizxdtv4f5firrk8zpwwnwp8d8qp221t6ppzx43kdec3eeexd5ndoyk8zsjzg6w5lddk0b1lqoh33zja3pc0j06av9zjqj3kz6nfm6baf9d34evf1pp0zeglolja8184b0tcg7k35p7jwcf4gv0jkmpe8lmpo2toqwopebwv0b8mqohst918x48jpjtj8300qz9d1bqvw7nl8mvuh6ktg3dd4o4gp4exbtcf2nzcqpurkamfz7hzjdows0c8h5dc264g1q4ah6yfbkohqanrhkuzs7hx1jqm6raurecrvqd654xogj0mrrb6ykkuoayqir0wz32gyme3w7yds6jbs4u19645gio3zfe1093si5mkhw1yc6z5f03hsq5a5vyov2rw5l796iwdiwpp3pk8xuuhylpqa9p4kfr2horpoote7mz7fql967yyzaowhqf4nzgysgtgxcvwx2qyzi5ofpe7ulnw273xfq4lu5e9iuo2ncaibedaeuirw7266mvoh8klopgp8y09e5oggy51tx4rftzwmb1e3azn1x2jnz1ody359ypojdzt9vfekxxi6h5bzqdcgied583jnfkps1tim09qgiybwldkwne4ipn25p4rhe6iku4oxkt8vvto5bf5m3y7gur28hf1m6jf5wpxhs2zpirmxheyf4l5rklqjoa3fd1h7qnsctm4tglfn7ecs7oj49iqgvde4l1ophjrfs46uz8w37a9zympsqt0zaltb7lbs376v10uztynbk0aswgm7lrz9i70nanjcd0oxfxou4jdy0j9bqb1ckf9uj8mkxn6o2u73qj4j1zcoler0v9izhf7bn4urtv8htcw8z6robqmj265etvjrmwxtg3ulgx5bm58e5i9k870j03u76oco32w4c7yneev3sj5ow4li9ans8nbgan91pbiu2wtkgxkcwety47b6jb1mik0nj927blgg5ktv3bxbfdj9jeggfwclz87o6z24cfw675o4mi77ofp3mlituuuasul41sob9oolutgjufiwy0kh79tlj93v342q3z7ce6phedm7yoa9y4gyizlf05b3d7rc6d2us9yu94rdp0twgoug58oad7i7558zxzn9839ydy7z7a5zp2rzb3ahrryaw72ne3iwanq3wwpav8an24wt645mmfkzlmzupaljeuyy65vxr1fgeuc62bop5ldd1e9fg7btyaerhhlh2jc4uzg6yknrg77xqlb3xt94le0ba76l99s7e1ikvtwn9huhvjdxptg2p3f34k32mx1xq7ni8tfhhiebezces925hopd7xxsvvygzb6gys1udt8xoyw9qa2dzjwadkge6',
                redirect: 'ps6d9vj8tqe2etyrrvxzpe4kxpfkll3b5fipzfsllp01g39m2kl0mkwi0p5pbm2flvh8dh6iglo5ybmpwpf0hy18tcatkfbj8xkxyt9e24s24ldi5o0kfpr3aqgnzizzku2bb3l7paywv9c39uucu71rpxnypreeaqgcrym5gmhyhy6xkqjn0co4wm065oatxd1eqhblbbsz7g9cagzj44nuj1tf5bptl67ovh1ikojxlzfn52vwsctx5gcett7md97kbm3hzdltp3lc7lhxwmb1sfp6cw4qqe5ab3ot2shnithre8l4gftg91yjtusolptmb8q8tgm9ttodn8kjc1a9dhrr6uoebhn72ie5kgjz25mmc2zhj3owbacm94ybf0afwht8ccu234euz35c1d8gj9j2ejqbkzgofd4z5bg2uwgv6gxmd145j76clqtuv27k7ymre8kxr0cgm766j2vpxjyi2p31az0oi73ismnl974x7jkvf8sv8jhdbzqida0h6bih72j6v1tkcksz8tt52btns8fdrsydwzipwase8bqax1xfj66uijpqxx0xycj2x5q0rpw5orzcqt6sqkhb4rrfzm8ttseq1exe426mxdqsd4h098rw5wmcyrckn1jzao9sf1ujso7it4gfkxwl5b0iixcr7irzw3jk7uit18vvulpz9jx6qa16h0pj31beqj3moxhagvyh0zysl301m4ifvm5la4kuj7pqmgq2s7v37eysfdmyxqattwg2upxyjukt8ps6idwq9t8nzjtxk4aavldsrh3emqu0hw7tmghcwdcmr7zg400uc0tdbfqt9z9t6v3hheulwo23ssyrhf94ef6qnrxhxdzuz8jtzo2kayn86l3edh0x12524mpcbwj7klk67r05m99v4rn1997itmt7hk1pxn4wwu2i0u1qbojd2h930azbj0qbx3njwqjg75ngvhik6kzni1uz15qbizi1s6sh9v8lv4p5wjjx2ehplmgb5ged1e9k7dz2nqra0yfwf4zyxcg41133ftcq3pm7m2thca49sxx2ftr2c2oeaj1n2dlz64lsdfu4ob2xhnb8aiw5qnhfonglk4vrb4kprpl8h4fv31b2t2iguxmhk8xrdlfb9kgtdcmztxss4mb7w0l3ccrr8izire9jwvg8ndnly23t99a8psezopg633mje9l42o06e5rvihjsemrevo84zrd67fmhvbfgqntot6of2ctbgi849avrdr3a73ut8k1assaytr9lueqkbnx9o8df1otgk8y9crmm2zxnz4j37rwaauib75mukml9i6symcb7f6ad13dd37717xe3hk2mgmc0dzrcmyf6lduq6wwgpq4u2q98zwxaiskf1gwim36q8hleuhnh627tjfrra6y9qrji4o4db0kkjnnkmo002eh3nhjldw03v6ha4ckraey4ib88a1kangw3d6g5toxaat82rawgvnnbklnmgh2ekni96n9tzvwu106d7jfeeol3017zrrj8ji1hq9f7tpy53yg0wx5w6jzv7zikes1ylyv4531ci7j04gci3d07jaw5bkda329kr9uf22fql93be4zavs0yc07pw2kdgpoj0831mjxeep4ih4jz7zem1tuszgf34rocqwbfq0bgn6c4ugfqo4ekfty3lgkmar10lvufts31kix6hb4rpl55wasxa6kcm9726lqny1kqg3ltil0mgq56da7o1e2xg5h9z7p5vlslntvp7i7xvt4pxqm5o3x74nzbpsisv1lufbk38a94ogd49bqpde42p4klka4g3fyrfjhx0b04bfncu7rzgtf984n0os3rpk3bib7tfk6qn7had4qaz1dyykt39vooe9krnm7c1rizpo2xvibihpw4mdybm6vvcofnrzsi6o0rhe9071feftexxnjsu6pfdr8gvcqngszwm5h4xkz5ax1yk6jghkkp9x1jc5ve0q3jue4nddu1jw8uqdkg5j4d4ujpdcfujgcmv40w9awx43mm',
                expiredAccessToken: 9229178684,
                expiredRefreshToken: 2549818003,
                isActive: false,
                isMaster: false,
                applicationIds: [],
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
                
                grantType: 'AUTHORIZATION_CODE',
                name: 'a57r5lyk52mnqyr6cgt6uimwgroc3hac014do5cub8mtndpfydsuu05zw0o5x0uvldy35uhpfuomdt2qrlsmkxsx6dqwb0n5pscigulil1dsl3d3sdtmakk7t69iimbgrono66p0yot91je5i9z75t6wyrs377h3a72pq80bpn7j31hvytkz9svwiopkcspe7ioou9ftkxa2twvicl500jpiqoc0g4db5fgh25u0cc1r9o4g4i5dsyhebeb8mwb',
                secret: '5cfd6ko93zxeq4hdq1tq7wrf3ucefis01i4ijtns40zoqe8ryd2eedc07ot70mnqx9mjxzyfxojd7nsjskc8xzasjj',
                authUrl: 'lew2tnomewb4lfefdop0xdtkg1uhsrrdxc0xy1ml6bigyyqqprh8pshzc8hjrpcttmm501we0hhx7jp4t9ztrqpb8gfwlvwvxsxaljhki2gd97ndfmiqx2qn6gymqh8u43afo3l37y7penxq7o7gpoh9yvakwu4eot6k9ioh8v5tjkjlc7tforbzcy9wb47nlyzyss49m14sw45q4t2wgzq7rsvomc8svmektcn0bak8vff4ukvxdcmgyr09ezk5h7ppwpm3l97x0p0v51eurycuvf6wgc9outaievvfb5lezg4a6khlha8iwsgllzzi8ksw161j8yu85p70772knk8t67zm6ic3u79ek7za8n5tr5ufp6h2fuc576qjbiyu72lqgzbxc7jmvysugm8t9tsd1zonthk6k2hfip26tv4tijh6xybc0yok2oh1g2eu3n8wcpg0verdeblgce1br74btn5285dalw7ph30gwiv9bqmyv6tplomxcipuh4y874l0lfzeu26t0prdajmim0c63ledekyp69mdohdxends6y8nbmdm7l4cwkjwcqcb90l0n5yfn1uviby9vodv47jk2gosy6cle8f4swfpyil1mbs2j55k1okkdv4gra4pczrlnj22j7a8w56f2e93odjr3ha33ynh5vp4ayccl5tvmlb65akf8vx2e5s1lky3akzgmm7i77l3z9vej0by6385fm3rgk0adqzvcbx1twyre5uk8rcfbesr8xneoa67ias0fevvi191o7yq5ejp385flgmwk7hpcwxll5x0ha1wosd3aiq9vjqtrxmij79y3mc5nxb5ys9n6xqfiq0csq5eu8xdaa52hxjeagxjeixcypz60qs6yr1nd7qjpubaptzre3th9hbmo3z1b0ue897a1ixk8e1ar9jxjfjgfw93pm6f89271taw8v4luajual12logrt9xempzobxd2u6rhjcf76b1f45scxsuxbv8kq12aa4aug1o9yznqvhtl9q0k8tat3xgqig4cqom3c15gnva735xvj6jj0fb7jzpav8v4jab3tv37v2pevq2czpehr8llup948sznfjpnwhfzt84h9lgydge7f528n4bckpid9x47jgurcun0colmh7p3o6dxcfuz5sovnmshi3f11payf9kycivqop8g9rocef23wya1z1q8fod4x1skvimjvgla282uqn7kudqa5go8i48rgf5yjesl8kjmx1a86v15fvs80qz6vtnvh5kljaefkxp18wea4n2zrxmphbis6xz25iwjue9w9aofzuh5d9gr0l4wpmkpaiaesmvixpvy7984deyfkg8icwk1s75vmu9h7uj3mrniosb9wfxizm725g34gpynh9oo6rif791i3drxhb42i8zhq8lj4wnwne1evupepd0jtbu7hc1rkjt5u5u2ky2zn4mxus9eazwdcnz7q2c8nv6ut3mbmf7g4n4uylub7k5cjbib1yo43gbv691jg2dnesfmdxi80n8csqnnkf2ptmpwdvw0dxcsldd9smsza7vio6xmumkxfvihwk3lrpywpkkyr4sv1kmdk4fozvwjvr6ots2448p8biwplvls7e26mwn4o3c5l7q2934mnd8vincg79mu6jpgorg1li18rd0rehdwmsgq1w7f7sdwll0qe7vmq7wcr8h6e5620lwzugefenia95yfj8szrgnji7ypy8si7q0vuxi1sp6q6avualtcao52hlro5tgzqr3xeemltoc21eo4ipziyoz5bv42x4sux613vi9qi5yu1tfvlxsftumxion0vnsdhdueyec5plavcrre9s5nlcoi48sgu2l35qqe2e75iho3t8vtw6ei2ggi51k93sfuzdmkdle79c99b54f5aelq4ogmmre7p8bwgmziw79tudwwzlnnl8n3pxsmfkv0q4o349qafgd6m6xo8os2xne2wnnh5nj60nu988rewhhyt62kra5vmrfd43acsa6hi5opfsjj4dyl2k1',
                redirect: 'ibcbyjn9uqt6idknnq2mb0hz72xqct4d2t01nptasi4f8uxg0gul2gjqjr03j80t3krpyhgfc759hqf3etv0kyz5lw3cg5i1qce1a9i3p6ipgpt4rihx8r953twg90tjt11ugcukh8lwaisd1mqtrf6iluw9eo59hvdtqiqjn43rns57c2ukssvfciq7i27rkedp4sy9kvf5xpbja9n1tjtnifusjyghfzjp6xv4jrxprwt9g3mo8ip5jj5pxffcrg21x8kasyhx8uhdqy8v7w1tb74qpe8uop6f3srvxpctbv0gm3iuo17pm21yqqlvpyrrzvw3rjwwmdjf1ujkjez5f4getgvikid83kitmkgqkv5e8eudcr5io9ezfneayy4c09kk87bt9fr8np9m97p4zmi06xx6qd6e5few1w48rz2t5cidn6nocxwp4c606bqw6b1xyzcmd35gw1rp9k3gl14exl4sf83fc5mb4ws9g90m19py5p0f8cyjhtneaffa3l4booaq50vszwmig4wtq7vtr3ng0jp735175bvagvsxk5z1my6o1f8v2vq42dc6pyuimw3kjwim5m713x1ioi6ouvbof4w9bqpzuy2qwkr50x1tpw2vbjj1fqowb3oiouovd1ow7x0mjaxt4f4ycxrwpruwds7cid0udve1vnuydll40hvuuwojytd26qccqt4fl141n2y032uzycjx3sujlr00o6rs8j8v1fp9xjuvm1n9r78pi1y5rsnktepaqywlkc0uip5cbbtrvmmoxcv7habve42u1j02zxrjexmyjbl44b6p2c7f2a17cq40r7ksiyuygjzo298kbnqffa1fyeq2t07rkgs1n9wyxntce65nco0r8zukd3ad3qpqb0mcvuz586aon4hwdpbzc5pixrl4ylv57iwhn1ks23zvouylv2m7ls6t3wow38cbh21kwwuxvvm2cpdxy5jwb3jb5lj2e9zbewxsds88i6gevn7v826p46ql5aqupvjr6okrtt930jloeb3mk2w1kcq2h73eamc0fkt8t03p0k78rsinfmou46miwfy1dpclns5y7k64g9w52wi4w8zn7v98dmm4l60h3vmfqv5n6j5vg5iij9yq7uo9r3c93thmvaya81lijaucwbr18qyp2t1yu652wvzw59n55lx3q3fe72l0rjt7rec8fbpdi8dt3rhifocm0qa643a9wuqwow5nuvglb5dvgiaumq8wsjvbtidwqcp0qzq7doxw0x0h7754fln3m1sufbavmqrc4atv89i9wp0sxsz7hle0zcoz9dmhx0hivzgrmyaklkc4cgt75ptf9fpqr1pz9q3nrfmcmhvsglc4m7akod5nyjlk36mr23er6ap951ydjw76cqcr7lobd1w51j987dcmqf2c0wjbszqqpuljsji5szu51qy0z5227hvwwudvppapuhqx19wv60j1kl72kdzog5pbs4hvr2icz4ujheaoh2sy4e42lgmnfzbyzs3oxtc27d3b5ozmvdfm4rq0mci4ocmtwpe6guxw1y3k9w9bcpvyy0pigkj051gqoqz4f3ge0avsjt95az7ht47u4njxkxhum6vfvj0ybu1c6i25zjgn0rpop8knqh6vuccuwz9e399tcqsly7uuucq7t4svx17b5ovunjh4922unls435obdqnwvahd5eb099m6gyytbp7oivp0czrwgadkknrndv5sub7woyyczzfgmh9ewy8bd5peh88nmd7fvil01hwxmn06w53is37we7s45iv75okcxqoibme5hwl3krkn2lwvv4lwtqklwqjwmhz5jhmdraei6mta8217xt7yo6cwrs0scvg92bxxprpask779qi6t36vtrp1ei8th4lm1tjepuvyxg65hlz6u85f46i4ag9nc2lrkvuf03jggqtlqka6ccqkczg1qbq3ak58bs3busr3zkp2cvnjehpwvwlq0buznhk5y1n39mfhw20cgsqi3xdgq6ljpuf7d61j',
                expiredAccessToken: 1500239030,
                expiredRefreshToken: 9542622706,
                isActive: false,
                isMaster: false,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: null,
                name: '1hro3f0smff2o7u6n67asy8fdjt6b0xma0ym4bx4keomur8thfkqzf07u7z6nvdld66oylr1kikxphqz9d69kbrjt8pmq9j8bzuts181vd7paii5oxvx5ix2tlbdmkizk70c7zyurkspdo1jyn2a2wh29k3gfzoitfy1poemni160qvei4u8h98v1h70sksh7zugfhvnwkto6xtblq83lwooq9uorrfg8zxfdgy534i23p4phsi73d1y083nucw',
                secret: 'ec32mb6f20i2zqktznjaqoe4656qbnk2u9jym6xiimp31m4vkaqo0l2znezkjk0z4ww0ntxey7kbtinbu4r94p7u9k',
                authUrl: '2l5pckiyw2aqbd31w0worvfpa5vdr8o9ewdz1o9r77h94aq8eqhurrufcboilnqnuhnk216n16mowqoxxl53q9a9k056t8m0y00vwcjuhx3kywozplqettupfnkkwobrb3jbbp4jh00dqtvynyupy4cl586i05esnjp9kfht1cai1fr9ydu1lffu28j9rloi02g8v6x2j0mi2973fmlqt1873evlnqm1xbziygwivp3j90nxm9hrk7gyegrl8o8ckfkqgmokosscplrkgefj2tgb4iumq4u1dw2ukyl9ixjkfuiallu1rjt7u423j5e1a9zd244ya2ezo8yal1naomch9y49kp5wfi2cqwbdzxlwoqzo1z9qc378lbnhf0qw6mbpur11mpko1lgind4uqu9or3sh0tuz4fozcfnj5hp1gvg4i5dax0d3fb738dspyspoo9m0zoutnx9heeqhmvjp1oup5aijrphp9kn9ae9rps7xra9kzljidoku7ncej0kqetshtrb42zgci1uht8tpy5cvjvlrj9k0b9qelhur0lhgmbama3x3zp8z6f7ecru7e34uu3zkdazi35dm5dsdmahi06som6i8ktnqeziia5kr6i0z1o79nl2ttmio1tnlg1ozuxavqmxetyhkkckfboxz4u7iizarw8a3q9pg0xfi9zcdsclmdgwvmlpst5qlrb7yqco8vjgzvmcv9fefrr5nep89rbqqhheox8my1u0qu4pvmmgqea1p3fexcm2sxsaihdea07eyvn37a5v01kdx10tmvss11lhhs954mc8ut2uz7px1ln7c36n08biefcap41i48felqx0pel1uw8tuo3qzsedd1tgvu7wkcienr2c9tf7h6934bynhnogfw917t4k5b9qwk01enqthdfo3qzcso39uo0z7vplzftwgcrhgz6q4bo98bg42nb5bs3powd8dhl6f2u9r8ucg0a9e98w0ttclpu8cdyux88z4i6v88wvpvklcx6zoql3wyeqdei9if24lkmjz7wj8wxgn4aahkkoybi0iky614kvx2ci24wou70b7hzlj40h79z3quofvlwudraymodmcz6hs7789h53jz6ph9w8uj6wyl47wi67zj674nu6a62u2dgrg9zgf3xxodfe48f1dsmdu3fw310a1y038dhxfv7vi4ak68xmpv8yqtgimz64ehw3vtlf335310va8vnyj869i5kbpn1fywc2z3pr555nz2ocm6ngaxpsz0bkpm0vu62y9qll5iq423kr4j14zorf1r8ktfd4kgq2dgodsoy3fobisdo2mvfdrb4p35l7mvjlayf03n1twf0y7z11oyq2f9e98o82qonh07mj12td0kb1dpxtw4j5moeey4sm4zdqz3sc56xblox6s0fnqri4p6m6v6602b0v3vtfjq4661vxx3kdv26z2gwjpo8eo83fj7c4mfnovjz6xtb97veefhl8auix5en4pbuo9vqes3tvhydo7cm8svmt5rkvgq2j0oml690gzlsff8k4cnamb8w62yj8qy36td2arvntg87rbyvyr2dbpsc83vkjlf7yn9adw0k8ghlkg78d1cuvyao1biizh7zrjroibz7ghbf6qk51g1gl2vq6rfwzfu0ir13f4eukx01oza9f9k3wjlfm064sfoylkkabpxgoaloyfb79lfyn65wso1b7obyazs6mlbir5fqi4it1ldeme40xud58svgnjd12uww00cfblv9mxtyvrjqxycxpgg0gf2ke86qnsmg9sjvrutp4kutf955jx1y435lb8uuh6zi1ku5teikpticgv8kka9ktg95gynm48gexjkn5afjyfxd4wnidb33g5wotu9g169fl80l9mm3efkewxb3ami4vqckbh6c5fse5li0bcal20adwl9in56tojkfe1x73vra88ylrvhb5rkpfp3bziibu7wbj1t581x3x95h1eiex7mf5ktgp8wnmv6d6j53p29oluqzkcejujp2z2',
                redirect: 'xlwey0cj7y75vjkve23fh8yrrrr4lanrh5xfh7ep0v9ptnqboiljr7touapskcmyhqpsxvjvth7dgn9mgxxy2hqgpbm0hv2dixc5sqb347mrghovql6anpx5ymnqty41733b49bwhglt5vhzxo53gsp698efxxrpkbnhaywci1k3c1ku1incv7lcvuez3x72hdm2hcl13zqaq07oke6bfhu9qxoo0hfdenf7lai19v1eszt1sp5mek0oxv3z5m35g9slh9m7vxn1bqtzy8yfaw6nfyemqzc7co84rov2dhc94w57wtseyfd9o0wfom43bs7zvb0b8sigh48vqb1mrtuagkkpatqt9sogi3hpg7dk69scvw2v7gw8bz05tcmcukychli2lwq8clbhyfjz9pbh1h7aj0382n1w2wx523xevmakpafm5idd6byhu546cmbb82bm9n4g36odygacy3syttln457cfvokzyyr711ff2k1d9m724dclkiwn9u16ghuyagj45dqqt4kbtg20hp8zv5o5v6d5xe39p32e41ujqgan5n29luhdgf99xpvs3pydslktndfol2dbdjcbo9uxht0eqt4g9iju43z1kk78hoc47kxjmtv4ot2aqwb09ddk9x91l4zua1fob166c10zajhsvn85dksvaum5i4nwou0yb3isiitfvi6ueir5uv4e35ea0qcdu6np1pcat3arsbyu6xwso57hv1iof65evy1n892fgd0h09xfzdkah6tym0l3ibxoqk5u0pmp9tt3ja544gjgtxruhpq4e14jbuet7enezoz9f76t38rk9ac4ab0idlc1qgw3pwgt1gfgbfvnw4xmrdwtemyc5fj280k7a05u0ybjbq5g6w04cby0gymzdrxvd7qwyiklt31tv40qpt8ec7s9wfam0b5vsh9ef00qpj89uprn57sabrsmvbz3c07ssj6hy20h48kt2sf1qq2c6uoh294a8k1wojpga0dm837hv5oiggm07avzoibb74vr1hys148q5yq3e8fgkwvscpzwr3j02bj7z4jc3cmjxsp8u53zdvy8o79z13et9ohpgknkkort5r1fcajokm0zk7ddfuqw232w6d365g22eamtd1o6808jvqk5iy1hhxbai5vm5pfjpgh65i3lqv5667aqmy0jj8d553jb8nmnd731mw9vavzfd1r5o5wp19arietk7augp16bq78no76jxx2c7gci1yqluiugtwa5t3bvh3tnslqkr4gq0lq8hn0dqxbknb12eas257jo1ah48bfgiulqx4j6xehxssnlxb1l2nsdk9g2aiq0xdd8a9nj96rd78dnlqw2eb7n4i5juyw15ydikmo9j1ghmb5h76dy99kuqp1pf9qpb14l8rmil47twrymmmxczqgaye0wfhpu77ew6a0jwyae7xutu0zprqubn9zxf0yj45zn2e0w03wpjd5ote1089huk2oey118mk21evngeqduzemd5fr4twzbulkinj51yjisbjultxdrskii4l9yjax7l4er6jtef92lc330b0zxtnvpopzvl4yxign7yg68peiqkdae9s164t9brlz45g3kf8bwcsamf4alzucjbyfwuv3civ88pmkbxve8dxqyftw9gles5ygn7hijzav7wljtmje2kial598rj3kuvhpofgjjvgmfm9y6m84yh4vjvxh0y6k63l33gkfk3bea614xhq8yu71xnhv68zmj8v0ux4z6fr821ny16ixwmekf58hc5sbamuxrmkqvjlok6b16g1cempdnya4ysaams7khsyq2f0g5oceit46ely8fj5c5bvhg3by8gawrbm4fa573lf2mdb5fqxzl9pi3bgdh9rxvc1ihce21oi3hocbxe4wuzpeaftwnd0jg1bxg5khhr6v1y7fd49g3oseog0y3ef0jlqohsrk9q7cs822kbn3pj74skqzbil51porvf8bah6ujqor152sh8e3rjg7lc17eiiad9f2drf5',
                expiredAccessToken: 2569567361,
                expiredRefreshToken: 2367646544,
                isActive: false,
                isMaster: false,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                
                name: '6ot3haox8aknstfv6qdazio2hi8n9tqeb0lr9mak6f8oj8uavffbxgnik381da41w1k98bzd5r51tktay3lfu7uwygfnebx02noml6361ffscrpg1sb4crnfrmu0a932n8jsjieoefixrmlyq4e0t2ykij7jsioosekuf3aq0zqnbzv5uks13qe86gnokh5rgnyzyarar7p0ssrqfhoc87f4h2zjae6w0hykq9wq9vssyxzdf6wfbcizax0yt9p',
                secret: 'ppnicqib2g352tl8multdiw7dk0w5ryxdwq1ohg0hjbl49eqvrdyu3yp3eg2rjhiyot15bajppr432o4z7oh703zos',
                authUrl: 'fv9c9mvjx7siz4k9l69oenni9eugdhrflw2duqz56nhjxyqolt7m2x6g2l7krgz2mws8xdeki07ihzcdgtpgm6xi4u3vizh9l076kpqd3a12rxwgmoj9o8xybawhjtk7eqdn6pto8m4o86jve0b025robyg430syh238uj0emg2q8v4t9pnpr5idebclg8wm31smvo8r2n7fosh0dcz3yy69re92pnvueqdy0kdv3k8xrk2uv3pxpmw6h285gp9rkaoa3uxw6omyl8uq9z230z2qze9ackavtx5w5k1i17w90faado7ont99x7eid8jht9wzmz9nyrcmgucjrvijyozcyfi5j4d6i7c7h7mzqc6cu516jsvenyuqnb5u76h3lrkzu14lo7etmqz0cefjxkg0jewy7s25522hj60ei30elplkyfdwh1iz3tt268s4jdgzraabetinh3mq03ut9z3onmx4y3uxz1od4bcpd2iq834y105bc9rpqfs5bcybi2b928xk59ob7mshj0szmuepwhs79bw6alt1rmg89gpgkuqvnw4gajqv5qar17x7z4dliie3sy0er6eazy44zbd78q78tj1nagcjptzt694dojy1mmjri65p2pu1ocyxfcdiac71sgk8gnitlkfoz2h4ougc91vdp98gruuw48glrkxc8a9steuars4s724h0njmqlylonkopk8igjdqnlbie26shlou4kjm4ra1lvvvlia9n8vmdnqqbc5ctk4d00h46t3ewcey1xlgbz5skiqkmg7z58783k79zj96uu4ggoho4le030woi6yrssd6h2bjjkwq3ocdnzgbqjiu7em9l1k4e4l0a1gqbh8vjwy5fq134af5z9wnv749cfnqhu3xelycemwhs9tlighuz50fl9jumraj32tyq896keqpfl6e8t40lkdwgrjts8ooe3jknak1bz5pd0eywuy1niwxwd01w6nydnnj7jbeumzdd1f1ho0p1gy7wfy9289ddpkv732wowq9f589bzle8skm2hxnes2ns5euee8c43yi4imzxif0p88qy0krneuum9yhqem2pbcxw24bh6zirzp0b0lapsszkep6o2miqn1h7rfc8hmc005ez9wnolfd9pxubg09d40dyl192k4g8tu5k2uij7839gvrui71ekc7dytckfje6c7q8v1wpbf7k9y2oiq3ynrd0kn9exejav0gxbmr10qkqs0l74evbgeiue5cobg4x7gj5mdxwqni8fzbnvksqqktpb8p1iv8vmt320ae0eji9vuybeuk6lyut9lfvxreaeovkf637ts4zqjjp73a79vwmkinbaqqxexzfbhuqmv2ro95m8cyplims1ibz0mjx2wfuauc282g4q529368hss40bjv7k36ontaktnyrs60f4c1teqhg1jjbxyv9s382nlerhz7tedr6o9z3vd783dtfoyi51t5v4fd8qr1axcgcsz350praf2cnmdnlwhkmd2fb6c1dzkfali96e08fic270a11gt6l034adu74eq340nl9y3h8pm10zozrw2n60p0iiok5eqejhumijyq9fpb3d4d76gao3chas9ns3ftyj6phu5ql4kleca8hqexdibzhg1tjvun0yuv8mxtwhj355ai0tl08cnv315wok47yohcmdwlr21m8y2mpd1fvm9sa5tk8brne4zgh8ditbbo6uvvon985kdgvhyws9xmt8x0zz9zdkxseleorhesnb129ix2ehi9bse73ueeew8kba7g3p1ye63hzxmoloopbwecbfkzhlqnrzkak9g1ahy6qgnsf9izq63uj3r9k9x2knrpxahrdc8uijawt64iw5vo2lu4pymuvxkleh9itu9yagej1re0zzu6duttuqygo6eon8lmkvtgn3cfql2awn1fbuoy606xrk0ttiei6v9g1yummok1bjx95h4mozsaytpdfkqbwadkes6ifxbyp2tkx0zxzejk8nlallz4xv0l8dalzkh1',
                redirect: '1o2j05wjahgphv2uiexnjimyzzfpnigsszw1o8ebkfd6teg9qz1fl9cs2xzlre4fpdwj0ic116zhs7dyobrywc6o0gadyy6gy97gbyu8fua0l10s05ulrgcdz1ca14jfab1wncpc6ffye2d2blmuhwjehkoiqs78q8n4xtuz1k67tygnsphv55070sartgyeyalq1mst9ff3ukjmnwm2wmui4009uop8zc5qnc9ogyp110dk5r5x1c3amhrdmu3hudkqro6ncbq1nel1e64mt6l37fwbz1zsiz4ex02fkdklu2njujkctdzy8vjhg2h0j6jd7azbmvlw7sbjdt56a49i4dwe3c27ytkmltwbve2ivxvfjtaxd1t8o2bdo2rdeeoykwqa5gk1igyba6udg2mgwxxyes53a9xm0olhhfdznlbfgd3523ilhs61co7yik8941y8bae38xtutrufz50svymlgt78c2ryy59vquggrabo7ei243i3dwo0i757eoll7w7exf03qjabpvcsal48t5jjqknlr6j1izuh260sczjhu9eovwlxcckt1li36v84vct5mrju9pkmupivqafcfa35zp5gdzchrf84mr0uylr9tlr6zwdapnje3eokt75i6wx6p7nvz0dgjw57qv0xe1rl4dv8e9yjqla5iut8l1n27z7q3r3ng8efig9g8q52ofyd3i0no5g63yyarh5d28a2v9dxdxfgrmuerbdla4e5odpkfpawnobqjltm9ajf36wf6ljqkbifpvjc417mvjdsqbfljhvx872gqrmlvm3rstycxtzjya6y66njuwvrjkq0g36fxshsbyoir2ch4l15b7123y6w8tgoc8c5rbav7zxvbz91p5g1ppz14keqmhom32ck5xp2qj6o1zp7mdlv40782175gypyf54ycrb09dkn1b6kd0cav4fw5pn2a0gaj69it41e1q3nw6ur5ja49nj1ah98c4j5d0xxuxpiidgwhlnxm0bxgxxsdwrdj0y8kdvsfqjs9c1pc1nw9ajak0jszi55o6ph6zjybqykcgr8jz72shayz76l1ed0qsl249xmcgibsmmrim19m9f8i5tql7azw6k3vz3rj7tzeeev6iuy8oue3i72c84vpgna1l2fs2o7d7g101j6forzb0am5revrvp9mkywpdfiwqwopvjsqc9yteq49ayfxftr6ojew834zoffwebuu3duog8xllrgir8s01b4tnqhq0xz5ptrjs686ktuahzo9ucq5mo0ssyh2k6msrdz4u8952irby0dqf3mzpic48o7fd4uovxsyihddapg01rtrzmyff4v5fl2sr8itbth10oj45wsh5926eeinrb3da6739dyys3jtp50teiag6f97ilsrb7wi4emfwjai5z3yzyzkywlamo4pcb37891srs5e02zgqtc89cgl7nhtxgngblcxth482gw05lpoojqw6c9tzd29infk7sbvvvaclzd7hhtt87iva1xuxo1ti2bskvte4sxq5ful7z6xz5bxgkb9z6r2qn7yaoh9s41092d4y1r3ws0s7ccjaqbzxpixz8d36bd0ko2ptebf6kx0cmb6gy1mjd4xwy8n6cnkmbjgac76hala6yi99ye3xjgcphhhrr17a8wow6wjxuithpnf6ikr0a6aa3igqyl2zfrdwpyd2nsvew16xq5fwo26ssugg7z6guo0ygt5k087uhr7149xiawsozrdpa1jamhphkdr6pkv2pix1j46fgxwgg8wc2efr5psvsb318yhb9r09dze89p0eup32ev2q4qrozh11s66mjlb62n4ce48kwrnwnybzajqvozdqcmvikmvorgi2kbar02awo0n4ovzx4b9swvfmfb63x34kjszxxocir86tn5jyll61v03n0yvpstgh8qqmzimrdkoczqehcz03fewinha14wu1nf6q6m1s64epogo9tmevd1f4gdb41amwps05u0hzcz391h78zxp1nkphedxul2',
                expiredAccessToken: 1099912321,
                expiredRefreshToken: 1391169268,
                isActive: false,
                isMaster: true,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'CLIENT_CREDENTIALS',
                name: null,
                secret: '9r5fpzy0jdlsjwe3hehqwkxhxikyjflf8aecqvv1hpjg5do69nj0r2p056qc63lyfc0um6mx4k4eeqzh3eh78zbbhr',
                authUrl: 'jh5ciobzbu8zwvrel5h7oh6esh86eaxrqhrvj3s9z83cpfi6l8fswgvg1kkpq0ybkuplxdnokbz31o859btu3keqxzuw7tldukfs5c5nvna3h1l3aesyxahbpzisjyxcg6fn66ntsjudvqxkjq5xw5jkc63x45f7a8jnuwtvyd13wh6epnyt91hfvapvej8ltxgnq2lg29aonq2aesyg2a70xbwqgp9b7p3d72kszvl11nevv46lkvcawzlhtpa9baeehop1g6389hq611bxkhxqybcv2mnb6d3n371nc5q8j7php3pzuugxafxs698nfu6jpejbiib3p4q4uv8ubvdsl2xigax57uubn7pvyvlwkn9ynbg2nbhynmcd43dmw6u95v13bx8wf50awtos3hsc61bxz9m850cheengv8egby3opidnhojt47chl9exg6atqsap44r1a5y7ns22liaqms1y1mbzj2qlk0mb6z9omqlwcv3y3aucet5u9b1uo3taojcgv4djn4k27onx1mefapt2qzj9bk9yxb4hgmh8rx6xcpu99yxmfckld67ugp9odu20sgr3l7nemv7bf5jm47t5o4hug6pb7yzpe431r6dniikpy4ytg05854oioizfxnp5wtz9n4umz9evzwfi54x6xjumv9umk2kszqdsgeworgg79t37kjxa2u776wgzz9hmyrwd6409sp5kxxybhn734yvi5fx2yteqboxmhvofbo8xtz83gs2bgqlmh5ctz04usenkvy01ehzm9ocjkk69uc32u0b1r2hzwdvpnsuezdlq4sodoop4p4bhc5b551alap0uf0j2xirg9stvbwnadxozhm9qlld94bv6tqvd89lk8ow4h9g08o325gx92hoffgz31hgm13m24duh17zmx871i450gvxjc95xslu7ls248mbungtgdxv5wo2ukln2dwr3pmiz4gys364qjg4qbpucnb91ui0ceeotd47w1isf630vmgrxz1vxkz4nio90naocjo2hvuf9mgoqrgimvnqda6tagj843e1f0aqa1rov4inzdpfrpnalzmcabpdqlce0kzl1msibfhi920e8u2i1b8bt3t5tkva4s4q7cyhaoabls5r7zfqkckf74oh7gh5r7lrrr8j7xecxqc9mmh76l5snt5dnldv1iq8ud3dm6h4yt5qh39sktqo72wdur8tvt3l0gvy2yuuafhtxbm4q1x2b4yr8se2m37hnvjaf905mo73iqw00e6gti0ge51jh1kpoui9eb1fu61rok41t2otcycdopquhlbyi5peilyo5k8ada4dcjfqi5jvejelkxhqxq92olg63po7kl8lwh8eljsz0br18twm2bk84c69m61ia7y2px96wr1xusz32coriwd1nlm7l3z082kowq43whuexev5fmcx1yb5p7xiclevg8seodg2839an139iervji12fqtypt8yvumdxjz9qqenp9c4adm17726tsoha4b4aecbwtywpvk7fwo2ey9zfvmvqn601pugm1ata3tajzp9pblohn5fpl9rm9rgas37x5rrun1mkd2e69ilqga0yhtjol2dhc1n7godrq8di0gi0nvvoe8wryae8b2opztu6haproumn4yd9mcr3nv8vtywgb5udyq2qp6sy72bbm6a8pu8c0vr0ep8wjjeoyrxz8lapu40dimvxxhmb3xvddmxjtenxg4gn7yfa0r4mfr7pkr6wx8naxkk08guzwa56txrcrcp710vuxen8cpm5d2aap8afvvjjb5z8qj6amn5g4zvhhyk88lm6wzirfro6l43ngr3pmw30s49300wvg4dg1098v5eae1whywnx91e0zzts64zlmwmlf8aaf6gv5yxiwqn5f9xyit2nsv9oo7f4mhmvx0107u36u8ngiqocyzv8usuldw21gc67ys3cfcew5keskymtcb1kmnlpojyntkq2mh6sbgljqxuuw249r61j96tt7t8fvwg4037c4sva',
                redirect: '2rq2jlyubps6txoi56ytf7lcw48aebj9nl8bkghp3wo4fingi7aabvu069q92hy16xbmzosgj2fdxb7n57n9ivhviz7emagvu5ekk28q1nk35i79ctt04fvqf5yqznkxgudrklr9r2y2c257dqv63554hw0bn50asu03enb59h80xjrushw1r7een8fboayo5dpn1mtcc78du6w7rft6dj18fhdsdl1yhotoh6fhm4efluqyyh5h5lw6as6jja3hb064q8phqx3xs32r0jxrd82m0nlvfy3hspttx3km8wm9496glve5yjxdou16v4stas353pd7cwnxyctvs6pmefrn6klbbz4en16llborskwbw9aenzui05x2kvvp3rc5qvncn1ntwa0ndz488vk0d10fxc5bd01fbkw1oc0fcvfybjy9yr90j0i6gmiv8esqj21q0lrw3s9d5ymqxkcn6i4tdcqls5kzhxmrxve2dtkv3eptiq202n4eufai8ma8tbuoh1adk4zjj9j6db3tjpu7t1xrfd0udsjjug9zyeun490xff3d9iqa3qwzkpw9e0legaqla6deuittap9xawvvjnbt3pg2yxt5s7ijvczlir3kvjzmadnkizc1qrp74ik1h2f70uxb5zu9b5xj9it4h4ev04e860qrfhd0hlfe0amzvub6utdvx3qvt7keq4bkvfll2sp736x0yfkvtm2fp4nvw2uzecr76pb875i0gy2uyv9am2pq1hluvbqy46dsksk80km94yqihbnfxzpvbpnc7ujhinon9cgnndfn69bebe7ozxmd8hlj4i1qkjwntgs17bwxpx48z7kum5dy9tsnm85hgpxhoiapcz5tzopiekgvlhjnxsmsk1j6i00b7mi7l9at368ot0a9aygr4ormu6fxne2rr8boq58qzrkvjnwqhzml1hn4iuebwl6dnq2j2tii37lwrniko33q0yrtlecw4o9x5u32vz55m264jb7hllv88cn44o9u7uyth75n0q87zbp75g48a0uqgq1kajhi8oiq4fcj0srpageq25t7yvy3andj11vo9vonehoo05drgl7uvdo7afkjuiqnbge20m5a7k0j70e7znwcuaqblfuy3hisprod9mgz9wqtpn71l2a69yja5w2z7awl23rp45cuxlbtg7qsdixzebe4o18vaef065v0l1qhefu4koiquz0c23gebocgc3ij9ch08kml2vhnqbhj04s0lzw3fr8ouh7bn1sir5vhql8ctn5gmrxfjr16safmijth6k2phdjjzlkoqa60j5azzl9ik92nm0lq0gb1h2jfpc41cywr52e1ci5jx0epzdl0zmhy0tgy0tj3yf35r1lwxplwulau1try022b4iyu99eysd5popdxmha21j1ijo8madz7dqxx6jh1km92xxf9ekig1ez4wh2uxdvemx8w80g7ytyoxdegsckov069tkd0inbvo7w2igvum0fpyakcxz68zs4dan6hjhzskwdpt6099ou3f0fog5onqipzu3t7z1hg0fvcy5iuch64rbq275oyohou9vbtqp42f2kb7vl2qcq2u7uwku386dl6jwrkpaemmqsltegj7uc3co8ezmj0vz7ky2moqr0s6h83nl10548zorgc4a3pxlpne70x681svks2ydeh380jxhhvjmog8pcijghu53r82e3yomlhj8t3h2jjfjxydi2bspvyieqsj2feqggcndiz6ncgqowlsuas4mclv7dd1y0gadj0kme99i5rkkw2nl33ev4e1n477w4vaeb9zd05d4717hva5cpncotco9hr0fjua29g8fir2pcsqg2z91ynxm36fe2y5h4a79h16cmtabz436qhgq63tsme0n64asyrj755sp924am0pl0de2ty7pkf2chji0ve5rbo932wa933iue4d1cv0asjys5wsy7zmgjb19z381kb3k7m2duy1heur12oprt7rikpmdaah2va07l8uquojumz7jjm',
                expiredAccessToken: 5724634319,
                expiredRefreshToken: 3440586798,
                isActive: false,
                isMaster: true,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'CLIENT_CREDENTIALS',
                
                secret: 'kdp3dne2kl9du15z97tkm7w269y6dnfbzfaz0zk47fzv3bjymw0vcuhwj3rxxyrdvfm9tl5wpu12ohu7hxdxzg6emt',
                authUrl: 'u86fkuna6zoyekbmux45047pyl6sngqlkzawxcbmcrlu5bq762rjnyxewf6muj6jdm7dt7ebafsakur7nw3cerw2zhcyjr7eap52ok6y2vmq523p2t303746xym1sbop1ai6unoe7dbzjr4owlopml9hdupl7q4c8balw1gmpklha2lree30k5ygdpuciginov2g41nl3oah38cd0ci0nlpq3dauy4hq2sl4vqby5dq9fmjq7ynb7no0ppy8x14pwtn16p2wjvtx9dtk8swrdhwhjm3na1xrlon7u27u1zqoy7kyi4dp3udltqns549nij8yvklwx29w4c3nmdav2fdyo2tznv4knaf3kjy3wtj9mpg03qaobo5ur4bc4431wtabtgfyjffz65ppi0kcvc91radf6a9sezuwkdk528joa77kn0vopum56pd83nf7egghz73yesqh572tq0ytgsh98j04b0231xv5mdbcxxnfvirhwukan14aaievijbrrt6fmlaysc4lyprpd498l7q27vhlkhjnrf34lp2di2zjz6czq4gi96n035q25zn9pw6bibczlsdtu2tsv48zaw5x1ad53me2cowr0dbne6delvlqbnbz1uj0eqwwpk78r25fkd76c41ceh80nx6xl58ra7mjltkmmkoh54hx9c2ga0pxu41jl2dwfloggs8z68psvtrolb474b6utvthhb0cszw7ru47on1do2qk8tji6seun8c2hu8npsknoajmqgv86efacouocwiwqfsacstn4qz8n1xdf3c46zkn0dl9ftyb9y2rz0fexcjgefvb5vgw3t9n5ujs0iedqbqqhpyipd1gff1voy4nou161h9wv8hrw2k6wrf1h1vhdzh4lmvyuykhuhabowrl2e81affbmymrlysfqli62i44rv6p1f80p4yehbjozaiy74obqfk76r9qqqj9pie3qkuwws4ww0kqi1e8omy0woqrte2065fy9gpykxervedg347hcwu0b4nyihu63ujtrzjt6m5lpjzdbx5yiwzh4rs2kjxed3lx0rrsqry4dwudvxgdqmlmmgmzghbtlci3p0p7pg2e1ja2issm2qfkc6un5wfuvrlj58kj6nwdvj45ylg6zjaju2p7tix2jn8wq7gykunrvkzmzbbxznnvq3vwrht3ksc586tp1ni8sjsygvwi2opmvrqtt6sjdyeqj12g7j76lbwzhbqhohuhrxzlzkfrzkh5nqsgq5najt3kk7k3r6vo31kjwdibccritg2ouja4f4z6ga7z97af1m07gg1l5xkle8um2k9bcntxegbkhi7qjja02ys2zbe0gb9n37v86ezimmmtfnd2vbf3s5cqtqhsb878txyuf379ah6cnhfb1vbl0n370yotx2bjs48k317s5v6y06yd9ey5deyph2ojfo41f418o41nhggqjl6slrzspb6ygsc62am9ymmq1sbjftfa4eb2usecwmua7umn221gopaig5pia1qy4yel22uddivqeziqqabkundsqr2xm825lpdj29ahrly3imry02gf946nj1gjut1ipuh2rztxwgisnpbp8ga474qscluy4vklbn3drlqidi377hfub03sm40lyw7iqv217zr1bewb3pidnj842b1ndh6jmz7wqzox5ul2653qwbu25stclgbtd55tcmuxmbsozvrtfjbxpitafdicuuuud7md6daio9j9qs831e9e0uy350gbdtuns1ljgsbcr0arvt13o3ucfr7e7brsg55qm9qkbokso2rl2s4liewhr3za4sp7ecxejqk69281py6irt7ghxz7qiqn3so1bh8cb2ewn6mm8da7qnc41aqorpnath4btb3gnnpbs9cdf4522teld6og9nwe5puvx6cfrep88votx3vubpvendp9ifhjrxetgsu5zt76uyq2w92id7mu5dzcug0f1xtrwcdxraxnjvo7mqfu1ebe136cru36uzlvth2ec0rrzfnfqmv7',
                redirect: 'tmbw36h96683mt9pdai1eqci36ovno583bwxk1u4zvubnymvtvj4vkn7iya3a8snss84oh1g9xy9ig42mpynmcl910e725nmxgtoear8aj2ltcxajs9axln9hf3w6tdpdak30azt9gartvksvsuh1tdiixwfvr75sfbvu7009a1niw6yir925g3uf1wgjcmf94dtze67cu6d7juoxlc4i5e0qg9h66f48jpu6z9vwry27u2xz97stamnbu4bfwc1lw2v9p8r2ucb4km5d2g9prid7hva0rm5icf9cc7a8enshp2ui3x2n09yrdelze0q6fu0shp7obnubg3c37p5ngb2srbp2sgxidjfppd2kg9yc7h9n67gc8nufz62zxuprms6klqolqdjs1y1wm0wc4yhmoooyvr9heokdlwuoq9v5ruugzlza9b1leb71k1q58yv4rgttk4chr6marqxs2j3knjlmr91wtszl8n4pd6bvx1s88yndkr5i6jfxzecl3t4whstd1xw59x7pggzq0ne8r0ltrczmjzjizovjsqmibael4zng4t890hjuqyuw5xjddb340pos8x2mo77q5lx740ebr5kdk652nnabqkpuoiru12xgna5kqb063699ptinav89m0og1jj88ss3orxgk9259ccwko4gf0zohprkidqf7db3kmzu4pkdzm0gbwd2y99cqgmsr7b43vpqeignd1lsla96bax7mddr21ssxb3sa82stsxv9rstg77gz49gdu9v2c0h11bk0naqokorls9ej7s1579j5u1vlevuxk7dotikgepkpdm63xe5k4avhxvczy6nv802uypz944451jt8i6zs7ked9zeu5we10qv0lbgu5k9hypn0rcezdto4g7jpnvqr33a5tk8z0eib6dys8nyvf0bn69wcw8ir7pewkso4rksml1wl0fs1hjl8wraxlamtlmeuz0qgmi8uvcxsu4ypynj1vvqr6ub2smhlpzox26puohfqsyg89fc6y2cnb61beda7tdj32olfm2gd7dbkppwzm932osq62uvxd30pqbm2ta0zbqvbkzyn2bfbek9dryg0mfnfh9ojsypao0enosbqoazrzc5duiigd765ic53tyxyzetry7o7ci03h347v79pudw5gh68h2dm902k3iuw7xj18mmrezcj3u239zlmqve3rm2oanlzeia0iyppmn6fkfkgsbr72ffxkkzt8yc1j5oyhlmk5e78vsij2bpcy1w01wbeyxunfx43xjl04nvkzzleyqrrw112r8jp4sz3wee7prxcqi0g13ca9fa492d323l3dc4x66kopf9oacm100z9zunaw0y06o9n88h0gp76r5jngnlf7h64fiqhjbm2qs55gnmsclueecbti986ynxmjcfmf4v3k887ohdp1vny9ylps7qb1ryoblyls5asqrdhpfle9yn012697m0c7bzql31t6r75mi8ldrqdo7sexapmct6nm6cgb6wvn3p5xgylbiqo4m0eek6mqjnlf367wne5mixxofgfc38b2x85yb1fhbsfim74gsr3xa2bytncsj1gya3qaflnl5xhl45u6y7j2jd8hl89z6kls2rxcm422me0xxihpbfslsunwoz5h34fm0r5uc9vml3v75cbmnhwwll910aabs52zv5vy86jrtsoin6xrmufudzbs3wg9apt6gyx4bmutfeel4w0br3q34sj1efrp2lvas0in4i8b5o7wn40hbh9jtp8h74v4dndnzggrsgxuogp4ap8ujkxf3o1slbdb0y4fhvq9y5lwxefofx170a89hwbavy6m5x0dtecgbvwmy5a2rcx6g39msx7r91jb7ew2b4kxgjpn85b8qfrmpyya22nqtrbxjgg20vomr4e72rkqaztef9ub5iwygh6felnqq3lmnqs2pnow99d87gw76co2ef0wbm1atepeq4c3ptu0qxy19l6nyqihgwi4ulky9c0q1ybhc1wec3r2aefe183hf',
                expiredAccessToken: 1993015179,
                expiredRefreshToken: 9758557760,
                isActive: true,
                isMaster: true,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'fnfjewv0a0stwakwa020a8e3fwy3plxrk0sqq69h0omq5dmo052j0pkdbyfm8tqdtdaz7toclfv6ffbkjlw3ufzf2gw0yj1gtcub5drhfi6g1yq6yk8pxwn6hjff1fabpfvqzy3m3eo2hq625if0vts7l2o1shdmhjluntgvk56il2wrp2crghathiqoq9zfsdul60smdp6hlrtg76oneb3p11suavf8eh7qnhc5sxvvjog3ocywgj88hp9f6hg',
                secret: null,
                authUrl: 'txrup37bd5jg0jzx7vf0xyqm6kbakvfavlbrfsewwueadgzx2zhg9c41wviv8df0v251vb8z0djaop38ymdqkdml5owxv9p6161yo619d116oygf6ph687e8zst8r2h8sb82ro32gk9ay60oeewxlz01x7haeutuxsrilc0x0ooykfhpoamw1mqelmjih4yfscxqewev2hgp1i5qp7zomlq9ctthgnqo376kegyvvpvzkjbrcuj7bx3xyshoel7o3bipnx9nymauz4k444vtk23ze1wx3ok3gtkoa0irw327t4hnc90kix3i7sqyznxxi1kznlmldnzdvartxr4lfvhwhzx8hw8cfpm5mvex549h3ldije9mqq4h83rh5e2vhtwt7xiwafjrzz73wrejvj8tops7dqcl1j79bz5tk4iabnizhlmqqpno719gcsvekymnyysm90y3xod1jc2i7jtfuy7vtgoyfycg77wbebqun3d2lfuzsuxoovny4iscxpdjgfp803tdeetr3or18i95fgtpj1cdbxdeg454t2cs79rw45u40fgpbp7q8eapwqoogxdvdbcp0a7s6sj4c2fbs6hj27xr2f483f4meyq52604i2k9betr9aw3317gsrr2vv3xrwwfo66y9qduaykqzy3e1oodml9wh4hns1o9121ypxlc6xn4vkckke3ccd1edp7p33smpmf57soeyz9p393kn8pqqn7eh9b1sd2djp0il4o2kv5ufjvwdjcsexdl3rd8iuraznfzxta80f7gkbrl5u6trhqqajpowmp5ibyozeiawinggn6jm5tb7f5osr3b36g36a50v8oinnnbdpmyoywcp42f2lm8d0p2ofzrymwpcnp1ubtv90ov645qizhc5if6zipohkd6znwfuvnme5aexts62gw2hs8eb6sr0rtkzsd4g93o3ucwis90lxq12j7tj8a7tly1vuw6wmyokindq3o8dnnlocw61bheoz0356gdn6vb8g0j4yp85io5zeksu861zbh05nd35ibelds6rz24fyr344qxey7g0lyvf7ut665rc1r9cmrn178cudqulxiuisi288ld9vqwt5rjvwfmmsetck60uqgccsaxg6kziev3l17cot6b6off7yz1lsln2fflwfwujtxwnwkla0s438kbw0blpvzwqhpnnaagyype60bq2poidk16oamltis5woo7itd94y9pqjscapdw4vmr52vgdoykos4k61jraad8quq46ttuxx887doq5ubodist21ub5o967tcbjdrb3kw8yrt19lodvgtwoceoh49d9mtpkjmiofbu1girmv4g0ovl12a2kqnlvah8rub54uua4w8gkvqt15j5nbrxkwtaa3xqbpukx5m1fgbit5g3548xv4chsn902x4yrhskeh46adu9obazsh4cvs8lbdqusvhwtq4x7ypyxfa2uqi3azhj4jsktesuh6bx9m2bshp1zd757yn3pm405g8hvkfi4sd4cela33l7nzyyqfvyvih6bjt15oy40k5w0q3or3kh4woinw66799s56l0v8du9ood178ozms7lmu3pl86e4qlvy3sikn7i7qktpwd7b94bg5pxe6waxonlnvpigw5ixim504uep2ggdx0l06yx71va0yojo6nuyuay0tz597spbgkk7hlym8cp7utkqn934bql4naobapc79fz3pwlgsy6rgbqh5dhav35amjty5p64j0e31v9f9i393urmhk4smosqebfrh33rkaraz9i17jasuxx6kcq267oowseq4yhx4crxj1sq99xy3isvxi3zun9948r3tyhlq0d7bm4ab0snoxju1uiczfflm4i6ja8fxq7iov6p06n6w8f1cyxnrizagldkq2x7g6m81h17pwe412z9vggslm0ft3webe4ul3hh1ikd379tyuahhc9gg0d52fzifjyrj9o6gwggjmobwf2xu65h2j8hr8mfo177miqd9cnnv9vh8he0c51f4e',
                redirect: 'rebw3ju8dh8y2tbz5awp4qi4uhy4o3ne10o4ij57qp61lr1ixuo4krr9t9iv82j46kr0e9nrlqxfmgdh0guqi5fei6au3b0rgva9jxl8yysubk6scxin16ohdgn5b9bc2daeglvbxo4fekuieogatzj3q51r9lw3caq2hpxwd6hrvx9m4c9kahq1qbpy61cgnxyjmq5qhwfm4626eodz9zlbor8qso2nkxx69bopwd65npfih1iw4whcctm2khmg1bzwyk7ii7tte1mb4jtxpgs15js2i1tviui00axa28hwtrl4wf907ly7ezly7hyaq880mnzay3bfq76j6ltfcaqd6xxioe4iq275wfpajshjvzefrjp9i3gv09oaspkm0rocraa2lsw1mra6ysslml7b36tb28wa2zjjwnxptgapmb0qffs4dr2sa217v1rroeswz4ew81pi8d2s8m5hvml5ufc1ufyfcuemkzsyjbmcjm4pjx5jgicg2ncdexadpjjcdbyzhhfyazjng4ptyg6yc72wjw02i5pgs9xta54fy9jkhtr32qi2ijbrvu3sv7s73hucwctmynegu7yrf7i4slwrfwwbtrao1nd0ms9pw310h3kjlofod3xedxabsl9w9u3y7hnmujprgrnxfzsxcy8yv8glqx7acq7l37qvh6xp741547zmypts4q8g1a1ysws6kvtms1h0qfwebeud7b2ezy6d7uvng3so1rvnpk18sjgaoq2qngflirp2urqviog3vaegspexrssdg2ztdgcu11li7vnowmdi6u5yn4s3ew7jfqpwi5ky2qsjj5bfulf5pp47pck0g72m4jn2yrwgy1wevsu7a2pzrk1i53azbrqqxu0if59t531p0aihynn7xp941ao0gh6un31u7h50f9xvcyjgsx6xb989bd1sb9sept92c9k0j7yzrsqixrlfbqxbnxijq7n4xj6hhdjbj2eph02kwmncs0juwx1o7bd0hj36frog35ht5tr7bkepdz1hrqngk4st9kpi0ph0ht74f630susa4xygns1eux1zn8du62kgv65csrx0a3lu6z503jp37lqwduoro473npa5xcw0cov9z9f5dtw3n90yvr9sj3jqz71xj2e0n9yaxthxzf5rduxjx9nfucf032qrmj3pgymty6hdi4edtev6eaou6h72jbqqd9t2i7jtdcktfvs74uv0ifrxzoip49ih50yggq5i442eusoledvusv3la0i9s62y96g8cyd49irprp168yd1zk168jt8vpri8sa1cqp3jbp6qe08zmltmaqqm4d86svzew8lnfe7sh6fgbt7lh24uo7v6punu1lh1466gs8isp0w5phefe2z841r3qckenswqnkvdq9yububvsncaczsekiyvubjov8bndpmzlbjcitpki5kh1aqsmejg2q2bs4c3e0nogqsp34l06wz9066ggtgxa0557ygyukrbdnxwaqxpold7ykkbb539q01baag9x3kvhkrwb3kjyihgdccm45yhob7hnnlvaz74uq69ilxb9zu1c0ym7ljw81pmopdqli9ivl8qqaourj68kidy0w8qero75b1vv2raa82plwtfr7s70rvamcg9mqti1y1ki95npanpvgpu8qvpdz1in0l6cvffhbajx8ta2ozrr0jtc8hh4e849wav0xe7lp97tp1a2bk5nk2mkhyfy6uka0q080gxm5dj6ve8s8pw1ubqur5myiu15yf2ycjr3a19xlklw10tg5bu2ms4185ns325l608z55dkf6e5xupawfbaiykskk4pa10gil4jc6h2it27cjb82obcyn93eerd2hy0g5otvpc972wc64a4scrqfhr3m1ladplmuz7eyxtp446ly7besbi7jnt1ychsjsz2j0vuet56mt2va6a7zab2foyd2841sk9f0zfpjuijh5xaks1r8yitcohtfcgtmcfunlmje1eiujij8moi7xfjno8h8u7xlvslne6yyj',
                expiredAccessToken: 3306731852,
                expiredRefreshToken: 6560468440,
                isActive: true,
                isMaster: false,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'PASSWORD',
                name: 't69wzgp36jrdxoed7u734p3459zwmoqh3wyb6hyiztjtbbtvty2eloezjja2ulgc6tvcq63los8vah8mvinst94ooxbpconwigjeigr6pjqdmw9fl23sl7shbp0l9uls464uczrazr4yb8587csfibd4g0um0vibnwvbna79bqz597tywqaa48wobtdk9r0hnpn3qfpejxyvpc1s0alp6kbtvvgi24po8zenjfom3u11048gcm96ti4tjrbwbs9',
                
                authUrl: '419rxt0ekcccr1yzxhqi64alt9wee1wqc7t16eeckypv66nowwwoy2j1tcw9901fmiql2z2ptkwx7gtv19j0jmtfgihjqspa0lpqw24sizo9wy24z9x4cg3frs26ti3r20kawb4bmtdeeyz54f56nkq3cy2h2ecag0sdxbun4psc9voc4jzsvhoceiqsda3dssva4q5g96ctco24zqflbh7u7pw28yt3q4u9845stzo31lah15tljnmp7twn2aec3s113s5tzmwr23z4npazeyeoluhd21m7e9yonpdm37ha3zxvlnaj5hpz29mlm1j75x3hnj0px4uryvs3tnzgrt238e7zm7qan4hk9m6sd232j4xvs7eiuiie77vffapa5bwu6nh3a4s6u69m7pajoi3m6m1uzzlqp4rkw4vfpv14a9c2iivrf660c052qqh2n6e8q2rqwbld41i0uzpaqz3qk81hmbq0ojdkdd3nmdtr8ut92uqtvb85if6xmbztwyf8wro0xpxgtihk8lttqd27tqao6kuwc0y920lzqczwb6cp8rap8eynu8i2r9psojrtrgbrwzytz3hmqug7qzx6i0kbp4lsdpx4mytfbaklvvnlfjk1ui7od0ymhdlrgleonu4hnksksqa85sn9py7p5ilgz4fleewz20q21bzg7pbx1ur823q7d351v1vua22mduzohn04ylfykt6tqt1utmfl2myy4hn482ugdoscijvi2dmdgin395tnc1yiqnq2swc7jdwmckxsxb8hv8dmavy3tp3vzdny0qzn12invn4oof7nnu3fzdo2qq01lougnmmy9wk86r5qxijeg6gdbu8oue1ag39xtyxfoa3tjkmza5ar72pbn1ipuum3s69e4x7t0g31orckl8e1edelx8ahja5m3d10nn3oc0ddzbwbn07e1bjbhawcehap646gjlpyvljiu2z8qk27qf1b10dzq8c61gwhynrl433fr4kfec46rq9h719x3gwq4e7cc3wio8j87x6cavv7hinpz9hvdz4e4l7qqvybyccti55ol5kag7ozw5zwoiym9md8r3q4qkuqch3fs1ivg60lfngk62lfwnxl6h3aawjnszxyhh0eka4cjnt35pgjum7341ma89wkbuza7v619w9bgao3x077rkgptx6idke3hgjtak73cklojnnw42n3fuqjgibca9p9deii2q9ktrgvquwkpjs3glyfsw69vptjzgbsi9bbmnyzqlbhfxnc68fsjwlmpcafjlshf505mpjfj1k0jvninqqhgrq761kx66on6p91ry6899wfvt7dq4eam5fe09f2gft9zt1lj95pv316u4izdzgknrc3yfjgjiyzagiqreuhcu2ecaya77f57l5wg52usf9hyre2y9udner44fbgmcmbwggfqi2amx5lq6pshe43xdetu9b88v7imt2ksfcszdd1qfhssajmh0hbzomc4g5h1eltvg9uuez8u8smx8gz85pw56qv4su846r7g4sukf7hnsudtns3nkmlo69tdiai2befg67pkqp6rs4p4dlbs4l7stzj1q4jcxpxild189h465l0no8oqiit2z8psl6mk2qjzx5jcidfp6y2co150artptbar7d89nhy04b4gvcnly43sa9atu562u0pdt0jy2lcroc32c2ulodr63alo0cz94i9bm780yc4z1w7dpmg5xfawumfziqvrpi1ndh2dxlkzfiy6491aptsqavxhhtwza05ck39ltrr5x166x25kvsw4unpjkwihhdb69sb3g4k1tyje8fapnyvojempo60urtj14ykvcao6zwjuvo523osj49p3pthpoavwmgxxlix4l0kmsc69fyocqfmyzupv8wk5glrzo8i0m7v6rxr2jiqbklcn2eyjtt94det0ela9476qcti4jlb5l44w2ua6n43z8bk7k20lv8slg10ltbl981lvc2r8hs3zsg8qu4bkhfw60196v9kx4tuqfp53bba',
                redirect: '89blc8657mfz08o4r62o55jvyrz2i4b23y2pmyn4pithi5llr9zz770av3cxvhplro0p38rxclra3k4l0e9xrazkdps8nkign0f9b9iv9bkrfge0wk7j0f93cfgbohkb1bkob6m5o8jbfbzq7u2go3v9ky1xcftxh49pjz5w64xphmvm5v74zpevj9mkt8tx7yav7pydz3xpiier270zvqbu2izz368lku8e1px0duzgjs3ax1ywq97wrjc2nip7b6wx0pl7b9ado9pk2cdztodohdpb251fc7jt4y916zvdxdvd4yr0yqg6liqzka1vidngofnkrdmg79eo7p3uvk5qmcvdiz4jghhqfq37h22vxicbo7cmgc7zmbdjcljm72asngs10gz1s6kt7xy4c2s3nwsn428zwtuwdzpmj5ek2x1qkizo4ohhw5b74corivo9jahbxce56v3axduxutuloyr8p9hc79ehu7bz58lujxa779kuuw5ajtlboxqe8zt2z1xxa5kzvb3f6s03h7pcvkpvzjg8fvjl04ib135wz9qyl2h0bnbl922kovkpr19chnxltowmwrzia99ohvizvo8mhjqet9mdhnpx678r38eg6icluvma0wkn34d93vllwlw2ate5ta7sboiphzdd797kf4s6gurlst2ba3td478tswqmxy8693upbxjpp1mdh41r4cj7j07njz60bzrhk9sjv8apg9dxiicz81tycqy6o7teo6k1r5ttxmm34211yyh89ytz1vzq06vm8whk5pfwzf7gcul90g6kv9v6t0jpq1833xnjjaf56zmr9s3cbqgpuhodn8p04pvpazmz7by34cu6vwy0zw0dikqbgwyyuyaakdw7ldhde6u6sca4edv8tsv1uzjdokmewjuwn12p4kit5gkbtyozsl7m1xy8jdfqor6pqt7m8ezov7tw7l5q5o7748r0kui3xc7cq7sfojdeoez80rd6sk20v8hda2xei6kdg1u94sse9p8yft5i96gf1ccq0j6f1yye9e9jc5y5op0pox75gdvfhywju8fn24pxgqrl4tuphzfo3mb1effy98oetlk9ai0ooaourva1zn6p0ngg1tfdysw3z1bw44rn9icm0wv60cf74tl7yui66vzoueumidaqc3zdxpjfcaj6wjqjsbcs3l0hmoondf534mspos8udttwooyv7ixe96iaswlk3bau3s5nikrkxl5k0ysqqci401i4zx1igjc7zsi2z6pbh24x0wuq1qo6zdkm747j6pxpv92uxfi4w7z460tvuavqy47lym5g25co54gtaivsc46wivd0raax8jfl95vefyqgvnw36wbqezsiavy40wz6hwinf8g2n947wv4yyqjtu3s7gcvdryhux9sn04ns1lznew508j2qtkicxjvryd4hrl5z5hw7ilkd8574bfj0h9w5clafl33howoepee2tedgyfr54qsxnsfbvng8gxp5pkml5jysthqos2sp8jvl211qxesqkzfbjv7dtfv7la7cg896d9mlfdek22moqg19tebtzu46m92yxgw62vlcf1c05f3wgmxfchgf06a5se6ectta70pztdsy9jcxfxjknka56ugfiya48acfv8h0jaraumrktyf5yh7jo7gc5gyy191sza4u49ubazamw4o3re9n6ccvue7slgtolpdywd09kw1lc24bnz8oly6rvuumb80yf8fqw43og1tdfil37gsu5h7ubisisf6q1wy3r7uiv4uii55z5e396rh6zoia47xqtsj1w9s1gy07rsg8cceidvcjxiwgq43892yux2zc14k4zcstmk0ehiy9mwx13coyl5s70wdmdmghp0hvbneaymadxih3cz0dxfiase8ugt7irky8pmpo6nji39370bnuivr7ny055xamwt8z850x73y5q4g0fe8jieyk575oxhnhitj2037yv72kov2yndtqn0hjg9v2oq4j16ne9l6j8dicdh5aha4hk2y4',
                expiredAccessToken: 9873851058,
                expiredRefreshToken: 6887955967,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'hnycrqukgpoqjq2urpdrwvm4waxxa2xuofa451frfpmwxjshzer7tu1jhs8fsczu2sars39nzq46ebzo7o21lhefeq8xyevsptktcvjsbgxfs3ejzpipcp7go2cvjkszxfhwb5eyg94g2jkwgrckglomgulb1qh1uj7mgasotn0f7spikhu8xoisnbjc19fta51yem6dyqwzj6zvyeni70zj5tj1sm5tiemuzqt4kkhmam16ayf3pu3gv1ga6sz',
                secret: 'nk5r6wif58b6w86gmru7mtc17toumyw03cf1n60c209y8dfiuizx3hli6i7tspl8hf8hkvapds8tnme9xchkueap4w',
                authUrl: 'oq4cfr5gstxwi0ji5hfn75xcz29f92ifam69rm621qis64aqqmtn59fy7jr6tafkyr5gumh5umc7twf14tdsrvgp2fyswh9wqlcsa3tcs56qioeek8xr1apo8ubv63kt6cejjb3cm8bzohrxcei477h6hw4701a03feguhr8n7dwkf5vmkhma2cdpm0b4r9xtjoch5nbddp3x8aez8j9yi1pqr7pb57s4jmbddqhligyoz8wh5cp098ds955sxm3iuw5uck31siphru0idvky8c6bkf0jpi4ylmd76cdpmpeksq87ebr3cfjvgi2zaslzmxiu0i5s50tm4xzmdi7bs3o9sdpg2c9xgdpnw8rd8a3pd8d5pk6e4xjh5l41wv9130h6wlf38puxca49n7ylx6zvug5wdpqsc1jcjg03z3fao304j6wtkt31ubdft3ivfdn1sbpw6oc14mqktaccj0y2i80sd4b2qslgxggk2kr1qds8a3bsnat11v434qjqxpvpucz9monap3sfls6qfqgyziif2cv0y6ed2a7hm8yr5jkb2z9ghnfryo17cg7m8smd7p2dir0hnckgihrn2ixz89b0loklze65p6ob10u63q2wir5n61cncagp0hty923vszcynikcrfsiew6b8pkvz2plq32idc1ca8ukewm2621rektfu50rlyycm4ko6iyujuydtuqketco4l35t19eq8ec7wixyw9h5rftf8okhftsq8g9fc2p6c3s0zj8e5fcr1aoi0ra3pdlnjw2i1maooykodxj73tiden0ygt30b268vkttb5q5mq2eoqasq1ld9zk4h97nmzzrflw43uy9svbkgufmr3l2eesm03bhzanalvnl894zsusc2vyxax925w2tulge6clwmhjbbeak500pmv49kexyknfclkszcwm7uxrbh6lpc45yinabxn8p3z6t8m5l5d4qcpt3dy7q9ia9cjxxw6fbif1kdfuwkbldts26rojibd2cjedzvhb2wuyt5baq75erogketismzmrlufg57zp86ush3nh7zm9b2ais701ugbi77z9y4hedrtdoggr2zunrbu4telbfirmgtj1nric27fd9y42hkgynxodce1nn91uhlgzpqfb8a46mqg8e1ez8gff067ehzcst3prcztsxogwvlyaajys50qpa6dpfv9x8e05qf8opjc2tah2mixmru9z2m0knnpw1t0wto8ruqw829yfac1zalnd2s3c9k8wut3dvit0cq0cv8joa7f4gcibt2v3a98ft9fvgvso6t6izb5x9r3wu4l5o9hpiv7qkhvmkbpdq7l9sqv20xr58v4c1507qbjod2yzjy1e69b3em960pm82dpjea72gak73s40jbrd8s597ufq4shk4tkewj9qig7xshh6zzldtvmlto7yexuekit6nom6j8dfc2rov7ejzt3pl5136o5kwb7noa5w51xj4grtazw08aavufpkvz2pmu7q9uqkk4orum78za471pr1h8gwvmusas61wbv27xy59lpdk6eb7llxu73n76tkjp64zgxdqw8mkdco0hdto0axsayzqforinximj6dlylxjvz7jj7gftseqji6nqv0j5wynyg8ioe3nr5wtrks3b3qboca7gn0uhi08r6xygp92v373sla9dld9diewdpqfz828awf96vfyien4i0dtheg4c1u9d685z3z6m1ekjkq5sz5p86pa0ctgtdrm7sfwnax5qwzcmwl2pl8tph7nyy57rif2u5rzdsw4muvblgflis0j0wxutgi8r3imlspue6se7xax78c66z4e4di8hl4v4vna3c5j7fm0kgz6vy6s8zoly0yfhx5rf1efenipijvvnl7uwjgtah5ci0k9wbvojlsw1x6f4l06mnigsl5ja5y3arju56ycxs4uc2ilvapwxxdoxd3tiw1zvzr4wovrrd05j3awl99vmofxhgpwiodss4it4752obaraks1f2uv9sdc2oxysg',
                redirect: '3d485dhbe8vfehbfnybvu6k7urq6zp21posspf0mej69jid00mp9dfnm3n26i2fr929ol645pu6bfru7x9anrumaylr2fgt21t9sf5tpxl6orqn4yxsj0z7kauot2q53hb0lfh1fgl0r588h2sxfj6o1nkc6qx6gxnulbs2f4tav1mwud704cjlyzs6nxzui15w1nfwoejf33ozw7zikfsvv17wq2h5p29u2p0iycha7fir5hq92hp5vasdpdr2ha40s30yv6v0papehjqglhjkdr0x9fb0lj829pss30cvu4xdrjyto1vtee27726rqcj0adx43il2rq5jk29k67199jgrcmyqx6kt5brcrsety2ga694r275h1mkee8iumvyuufd592f4b9zzubpodn618gieopcluc7c9dxtpdkang1d1clhmt6anu220iwincak5bbkr9x0sm9m8o9ym0b37mrrkcnmetc4c22wjtltus2asxb2hcsrv5yahix6ixsvf49jeo09dakptv05mxtwixba3d98rq6np2yiqai5f5x11b8u2ag4eb2kc1ssbvmq7yeq1hen6zlnrfkjulzzhtlnvqqcjoai8tx0g42lqoi6gpv6kzhyj6i12fbdfz42cg7p5ic2fdz8ypjtggeaso65xg8ecbmsecn0ozb4e2eas010ofbyl2k63l8qpqz7nbfewwe4w8oqkon08uoj80d8k82axs6w122juvhrdhrx6jhy9qb1knlb4kj35709fk5zk8kcmnoe2m9ll5l2f7mul9o8i27yfmqukpdxfo4rfazad4j4drze40dci4xzldcc5iei6acusrfae8ko79zlnat4kmuilarbobvcxrkomvkzlt0ips7qjv1akngsxb6o8vbqbd2v1ns4j5qifoq1gqd4viwxeugt5c348gt3ueugbdf0g5lo9uo55ohph3214dyugu8ay65bj0oc2mcjq7emgq750koma4845bd59vmmahw3l29u30pmq3crodykyvgvqda42td98lvifh60evo451l5ob7nrlw9olw8bk1lzsb5jrhk6qglkhgb4xjt26utnn7mv33duqzb8ic6stjypje3y85zth21kxcwz6ffirzgkiku4hhxofk8j8y4omsmbl00drx1swu08ka28zwkb7hfdnxzhfakefcybb229dhys17t6epeoklil6c17bhv8gfuthuhg6asaelagjwn3uv7wivyg5sgs1y9u1lis51omik2ypfzvyt6lbhmj78vasagoz5cv009yyhc39nk6kildf6lzt322kg25whsn86s6lkv09fd8n0m1md8na4j3ybrk6ev3t6t6d9leh01a4fzvoivaey47r39k8caq3mckzaunwe3yeirh5zpoyg6omgldc6vz18e5x8u5m8r3496cnxuhssfu7j3dmnvvxuk2ldqjnb4l2w82sisa70ql7lsf9jfm0685x752cjs4802pk5etze4eembw33wkqu5zn8xoh3q3tagsef37t0pytxyiu9evh8qd4iiy5ogy45eviqkjqxihckav1e0gvyu0rav90nt1dada50nx7gfn74wd6gsahxkcb4i4sko3a1yyk70oar2s4l7bed2spiaxt9xpb4mbmxn89gj0mlz7ag2l86wjbmzie7omii3suqa57tfmc6lpf7cy5ztytca86nz4uresw73cxhuscr39oriiy7yaa07rqlgdqm1ooki6eyz5tgepsdoup0vqumn4lqjt6k7z2h8avnvkcmrmsn371kg57424n7k91ssxx12jmh10zq74pw1wp48aavy2uz51d2scsupvm8hs2j4zmrlv6k552um3jiwhuk14agdosz13pnm89qtdibugv7j9yts0d4rhjfkzrunsslfvt1a31d4ylra0wctjx1id7y1zlh4odc7fkgnx5acbp6h8nvzlmykujd1jm3jaub3wh7orgeoy4uzhmtp6sn1coji6gxhw4igpi3x05fkt9mv3tik0lofi',
                expiredAccessToken: 2309513270,
                expiredRefreshToken: 2487714483,
                isActive: null,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'PASSWORD',
                name: '7a3hw1ndiptyxdo433o2a5e309yagpmkwckv3968htptzr93tfqm1hsoiggxtgq2rf8rs3icfo75xwvsmgz8y2169o5pnhvvhytd6ftnc9gylyer0qcsp3wuhwygaxe5055iai7yiw8a2qz3i0komo9811ts94pwkgz0x90nf4wkbu8npjprvgy3zwhsfl3ls6amkzxxozsjudk27k857sh6ff2fpykknk5v0ycbt5p4t8dcymq31lh1hujqmf3',
                secret: 'u0mbezto1hhs4pprq7u4fe3emwlenu6awsvd5adi9p7jkdylgl3ofvxzagj0orcewh383fflm0kseiqxwi3b6b0gtw',
                authUrl: 'ki13l076969cvqii4slsgwvojdbutkzt30201re3ai4csnn0fockewurmshy05cxtn8e40kqcfnr027bg5qanqkdu2yhqjk2pwfd3n5ro10h19kpv8nkifd1rb24j0e82m3bgvx0c79wcqipf4uejr59aat99a4gv9q2bth1417rnelny7hu0w79syae1zwbw0u0xxtbn7p05pcl2uc8g1vbusr2r0grdxo46ja1gnfmj61holnqct2ezezoedxuuh1mqa5wnbw5uzjrk1u9p3sljqcr8n9b5gwtq07nzmqrhvt4ga6uplx0w01fyy9evpyytyu1lmgkxmfyrntde2re8z75m4c42h735j5nkvi4vi5itmeqfuh6ugxpyovz8j815w2izrqfrobx74dvb0s773rx148hn037viunebhntwvt8hccur1vprcjoj68t18y36kca9xk4qyo8a6f5cflayvvmnfrlmtghlf0d0p5q01kfdkytzdp0wnofr9kinf6hqoi9x604vfdjxas1s41j83k2dejgtlk1ait9qajwqe84m9l8qbsqyg60d1ccxonsw7hz6qsm5kaidyh1skq9yylid6ynpckc4pv6aw6bvqeeedhq16v771fy3p7emay94p40wkrdbkohn0c9qlmdgwjyktdw60g7sxvqg7br2rfiam8qaqobtz54gqsr5p23cbz9gk9ppp7vkrus07o9svwcrtmj470mgmtsplaevrg329s3qls7sqxgpfosm1z2y9qfklu87l046krx0foxx0lms4be5g5u2yigoqz3gh2jnanqpfptllqe3xnn9sq4b7r7avxmji7fu1r75kz4y0u7zl42tgpv9eavw1vjs9uq5zi00biydol3ziylknltu7b03pelhmcuompeaxugd5y9cd3niyvh28q49h8ne54qlpf8tda3nrgs9pju78m8qtn9czl572b4s1jtw6wnbowhxm5yj1e8d04rk6lhtoo3fyljn8wic4zc9c3v0ov9ld06hpifkxrwn2qjk7gecvk0cfy9mimdr3vsak7oog64t9jry83upqqahtihueb6635jmanzrntrcw16abbyydjkk2t69qeu252913ibo6ogvb0gbhbxt45xhajmkffo8a63vocpu9nyh15jylgsgqakthw6o3t1ir5py83iglhcf35g2iu4cyzmriu3vae0og4pzfwtlyv8mwrlf8hy6acp8x6ge0sgip9tk1afqdbk3ve0scbhzjx7ge4axrcu3j8aamnud022k5a8c2bv4g9fte6fnkfp7hx24g7atwv9ps6tq1fjkhj6lbygfzkc5uvrcy8gfd9guqtx9zaoik97bvzc7eqcrf0wtzuc98cscuegeuinkll4shufgxoo2mhhxn92xp6nrfxbw3kw9izp1md84aelms8y4ucr47w2jjieiertwjkgftm5orqk8sj7m3cshz3uvz7diey1squxyx4ofw2d12gbmf7vnao7yt5fp71t9k9c66r0ojl24bv8xkd8swbm6v3l5sgaf1o1f5fuwv8khb7fxjqwhp5z7j5qiodtk3u7aety0opz8dp2qlhu2201fi5dty9aojgb7960g23ryf736pagav75c9e78b8d44lngx0zhqgw0k9ydctkrpbibl51ujwfw5b4j7nxl3oflzop8otuffc7ofvahn02hmzm6fl7nvoeway5mfgt2t8jyn5uurzihac815atl6rr1scug1ph2nos442jlbt7ln4da0845fkmwb18mgm84dn93olepct6e9n1e6pksm8u81tmngjq2s61i9mglxb9lyyikhnio8dttrxesb0483sg6gpm42nbsbdc4gssnmkexqlaa2te7uctb4351dmshz88ztnznwgn792a0pv0i6z56gy4y8otc26re28cveglhql8evbhzftuwn2e46zvbl8hex1laa0h8t3ijr3qsjkmykl4kf4qv2lrrllj4ojzq7nedp0iuipacyocf2g6cxg38n5',
                redirect: 'gup3u587ocz4bbuxojmgrpr26cgaqhwrp8cg7v9xr56lnipiptzml7iho976tgswzqm0tcids2dhbc1za9fqra8l2bl489i1lbn3184wv5v43ppon8gm0gzso7wema6mo22wl9ig6y9wzai6h7tt17elzmp41vvgvn4k0dtd3puwgyq1fakf93mg4jftgpzfxy8nubt4fctmi9yue9mhx9a3769c95uwx5osfqnervyrasswoe9q8rqy519wnr54iaim3rlm8wjv2pvkb33wuxur4r83qy78za08w6ahrq956tjbcup487tz00emgtwv73jlkhvoiaocdw3jvb5rkq0tj0kx2ln34f2k90c1qiiyjxp7gfqt0z4w64e6iyizhnq6xe4zhemj9d88xn1b1b55euofjcw6dzdnmar89gekpowod20rtkfnaz0keqfmhbcj93xgbqmwypk5ebkzp68q2wnu9mi5208xwn1sb2y6de67bb5ke3zrdcax9khziv09h594ofsj2l18fwb0c6adftd9qo8mu3kppppvn1deyx8xut45jn0qtoe6r1zkefyiphe5oo664z5iazqkl5ioi2m7f5txzayuzzj104w2dgw754sqgkogdhpsba09ii0738i3qk91ef5jhyx3clplhy37sgc9smztpxzzwczgq7dbuw6alvtpn0r2pexebv9or88y9qn3jmpphezfgid5ekp04y1pl6zkv47kapth18pk5fbbvmzkbdax2cek5rj84rx35pu22bjva4bm1tpbid009x0c9fbiok13byem9j50k2i3stsrc25acd6f6diuzefmyj1a8i8es6t6gwba7fsu1vcyh7j87nhk4scvtokz9jfksi4z9y6pez8d9s9rw6ebzoou840nol25q6emvt5ucugzypkn1s5n3vknr2qvp0haaxc94j4ksc2t04toy21laobdzv22p3srxbh5vj20f3ubozevddsn6zto5wpvyr27x4qvl0qfqtu8dophzr2tseccntfhu1bpvfwz1hac20au1u0l77uotfonsn7va0osoblptxkhax9obk4sl3pzpu317b0lk7xy4dyb4j5jx1skzeegcfnmgf5wudn7r3fhsfccwgw975qkqy8yz6jubfaqajcr9qinc5oh6o2zrgbewp5y52f5jqjzvqbphp8hjwuu09mtq6mp8xpyu1kp8rtn1lvkbnv2z9ffimbx0fdbjlt3rib7yr61er122ojysnwfz3xpgfy9w20zv6e9vdxnjf65dprrllp71iypiap0dxwndyfc6knviesyp9m5rkkggtk01fu83yjky0bn4ijn2x162cpubigs56pzo0gwv37n5tddl23b074u3s1ps8yt83tlhtjg1cwvgskbku8wxo71d6km52cqo0in8hsxeuj6p4mk3h3d2lpdzjtxqcjeiy4696hznsr60dxbfriydl9r9bj8upper0vohqavemlr922o2ccc70uuuas55m1vfih5piw7mqyrh42zt7pacrj46vr6iq3nizuaoll88qm5awfjh9oyy6zca8dhu75uc0fn17uyv6jbf0tiexciihi0rlohot9a1kktvpzvcnqozortmrs236ipmwir8clofqbvhamy5ycwwr0cvizop07y5rvb25vtlcqu20uf6dxzk4u0ci74ighvwx6irwh240usqyb1f600sibmz44nje6x9sgxeahuiwok5wfy1j3plc3r01gc7uh22ikoe0kigt1v3fzfuxfmo6bsz9u52ik7iq50m3wpx2gcwqh6in9rdk1ov1bes6qqrpk4jm70movci59hf6ryle6kap3wxd2y2d5aucffyrtczjmmsp2bizyiefjmlkn3mxxyu7di3ainf3t0vhhmxl7c91xlvvrcr5pzevnzy5jj87b32nnhxtbu9mpchvcqtj6esy9h4dti0nw50hqgd6jjaaw80769gcdevkjymw54r5zzq3obwagbsuo84qf5fw8ibupmchj7ampl',
                expiredAccessToken: 6023470671,
                expiredRefreshToken: 8315331067,
                
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'q0iou2up9wixj2dkrqyosha5608qaelldtqrr8afnpn8vluw58avc5h4ce5mcaenkh8do0umfmcvc4slace9ub15z0lgogph965srz8lhzz6pwqdhb4eqv9iif6ytul9kxo8h54v8xzv4m870f41xxuqahtk51sw86cagbtph8k7ivu8tzavnuic34fyivp9n25rgvcj5ff2x8vkhkbbms7zylfj0hkgbnj65yukrza5yu1jgncc08popegn1i5',
                secret: 'bzfd6mkj8vcxbyvhcrcs1zznk1u3exbgo4qe5fcr41ay7ys8w1jat7atnisjlrzmt1i7qcq4zhte46mxkkxcxqf5h3',
                authUrl: 'z9r3xydpgqsbc08te1fwgek3dqcjmbx0kcoaqme2zzybk5xn7p36517skn230d9meoe4rsm614jxrgo4xlj9xh32yus6gpvrd13tcrv4hqihplaqtyn2jxkdarqaykmem07lak8lfkg7evidhkg0sr4gzcb4hm72ajnq03p02rtj1ace0n200esqnegvlyyvve9vk8p0o9t7jbn976m24fz6m7ajnz7y0zvl86drjak4s2r4pnbp2hbyrw3ey1gby2yngvxxsswzmjilqq52czont4pzg15brvwu085ryhb9bclbr0ik95ifa2f9lhhhgunigyj4fyp9vlb7o5g17skugovqgyby4b9lfbrvq6411ynnhmpzurixv0x7ssyiqlw7c1nchmwewv5o3iy4za4tm2rbh3ky7osw6rvt2a54ire3w6y0gbn5q08de9up33gnsg2tx97ej3ndh4ej59ebm9ni0mzymejxgz0qpqlcwwrzmf37ckrrrkrw8x665hf2unb92imp9id49tlfr8002spppedo926ai0tlmdb3ew7scgdpt1wi9amf0t5z2k1bz83lx0uwkbqb1gv7lj470pw1x95t5ngb5gh619ptusrr6omufxfy7gkrfusejf50b14k0pr92l9ospzlz4tivbudem4zwxfhapb1reu82c6ooxermwoxvgacnfp12ty8qvk4rund9vfsd43z2oqbqxo4n4mtxjqhu6e61cbw41hq943vu1o5k852vcufh43r4afgdncwys082w4kke5j0lszexp6e7uzac1nbye12j3xs2mis1ga608hl1ogl1qi36n8zq5uvf4rs763gra5ls80enug88n7lbnmnt8ajg91ox13aoil2odq2dq2s10u9q05lulez2w8r3puozyaigccbsgj9hledsvg082npfnpiyn2rkizlo2lscxx4nh4p9cd5h8rqoocdd1yrubpum8d1a8utaw57ux3g6de99sc18pm6jwilgybrznobyftayy05z6v7fxdcpuegfu1bi4wvlxyv19l316xcob08i9q3sq21w24gsb1qaqu1rbfl9nyuqtl0hoddxz0rt5t8chyobzrq4zy21wjjy8p8uegexaa8y60mvdmjz3xdkvkdaakfnj9dtr6vybxa29abx12im57z2yr2o6wqoacujfpzufb8y2ickhe1s6hmmblec2ebf64lfxqnmj0erdm2iwtsi0vefgyd3qayz43rq73rzftk9xtnl6j6vxrqo2sbmognsxx5q98l9ej82rxdhq451ra25ykgpdu27sxt2i3fliu30vld7gyaao4jkuz1mufndi1ffkxkzb162tf5do6h6wtqoruiry1ugf4k7falx6ju1p7nszg7cvd0j2gzavn7qsde4ufcp4b56unabocnhdlo3quyvef9yqbnzckyvxam0qskq6tlr8aqiymi84rs4vs9d759tfsxc5a6ywnr2jipekknifgdo05xvqujrlqmgo27jyrzo5lq54ckqnpj6m3a04k1fx81ncbvezigviiyjtxdfw5e6s2l2irzdut9j14iuhao14r3hipoy3wglzfm7pbx8j87ld3hcjau5y1py2fr7v7vwtoh815o27un0ux6x4kmratfip11m1j2cpibtzgaqitqzzmw9iskj4vo136dwwnvfbmjgm1sgqzd8un2dzf4ed0evs4vzd6d9ps80v3vjuxgd5hfcbw3ajrcxz7b54fm8t27jjoktrukceioci81chflimnlonpvbo3bubf9br5wsx9l16ol1oz6le8g7kvahsq953fyyvibvx3mzzgg5cwxc5dxqstzjhv19pj0eq4vhb0if1g7uxj5ywt94z14fjf6nfap3aljqhfr41rmf9z0tfz3mq5eq4qty8o5ddwbo9nl9r6hp9snn7x4c9kv4i9lzymoil7v8nol4d00sl7yx5d0hueziq9p0715oujadbofvq3xx2fkp9v1e8ttqll3b4fpiurylpkl1zkz7h6',
                redirect: 'dql7czwmthxsg3wd5lgvy9vpa0znxluoddu4l3rrw9j9vcbd1hbqtkgdazvyiwkksyanmsuim343aodeptgmg6xha7dumvwwhdw7pzcnenydonzi987apv5ohib9awzywthp3hqa2f29g39jlcnc72q4qyloc6qstvzh8biz8r2edresl1d91764krno6no2lrktogy7k0f4ql74kyf4t292o89lxpr8ayq9s4al4ezabvbbp722avz42evvt92uu4xekxyowkgf1r97c2fl1z19rf07vyjmqq981kzfuxfcyhzqlnukminq8hss0dgqqrxveo0c5x451wsufiwyglnssr02mjegazw3i631fl4j888sjn2u2dttrtbi9q5mzo1sl8ykusf7tlc45yhdenyi0pxiq9bmg9ee80tb9n48wyw0ci25xb7kklc64rwu1nnw1ahbyf5zn1ryjy04vaw9rjxat68bqzivauj2odn14mfadh1stu3yjoq5y8kkdb8ourf8e2d0cfqvgxlv6tpw837td876m006yi84scoluh2ubetbagntlx7f3jpdwksq8zornuvulqlnwa5ci4vcy82ao6mzd22m7i2lw0w8wh10dtzqpie4yk48e8s66fgwbrx8tsm37d8c6qf6b6badukdzfg71y1rqqsxqg0ibbonk5wimx6uq611e86wh4g7qo05uv1cmecuqiedwi404ry5ocpzfuz3sl85ley9bg7rg1x9cuhgsbbv5ulxdmwioy5l9ikk40maa09bc9nmrtsypzf9f8znksf316ex7rnwbbowceg5eqto5lt94ueepux6q9s6jgj6zs2hygxe706d5u2hhbkf48xx3c1wu66t9crwl7rfyk6sd9599ru7wkpphmtn8eaakid7fgyzh7viocbmco8mudvp6sg4pg0l38vvgen7ggu7wat714gvknq6y66bjbvcnnsrywjeyluo8i2xs1ilwjgdp4bvbdu2ub4frg7rqan90arsjy0gnbzu1kfitd69b42q0yo7h1tb8y8h38mruwx7pbnfib1lr8pnz72d9qgjxdat1q4xlf4ersdsohuihebzf0ogalnkaa1veynpt2bmmj8o6fvc9gqbqmgniwjzcpn1yy91xnrx23s6yq8lwzs9o02qlhovbsukusoe6v9u4tyq3ksj7nsol6jchgld8hj144cto0l1dyxyrzl5tkeiu73p8553gm917x19uvywxfwv0go5xtfviof3qra5z8icd1dneeseewyy5lqkesdymmynqnqpjzsmzaj92w6dynqryvuv7f1x5ip1ljinryy15081ex1nvz586bxz8jbkinwvng4tmgzmsi00qum5rgx6o23mum6h0m63c4skt9s6axbmi786rf26ids5bg1d6yi38lwa2xiryxp3qmta5nm6wpvqvejqfrq59pr9bid75011ue6rmkc22i2t1qa0d9g2thiabzkf2uuc0lv68a33y18fiwjeip5byr2r2sz4fbsd20ynjwhw87twi2a56nn2yhwmw6spa83l56alyq2mfhe9kkm6hyub24nt7nhgqzroai6x38qh0igbigj656qfuxbcipgfhvh2sco9b0vp2h1lf311a5dcf8rnivrxgnnax7e9jgzkyaunw2cv9laxcv8xf9u5pi85i566ecmud3peby6un747eetb1japa3jc3bex4lifg9sylqvwe73n73mkne8lr3427fay1p3m23ksce0rqsggw061g97luj2aaruybxwvqrkkyf1m2t3epater0wwbye8t9i9ntt9z395t59nkck40ah0cdhnxhtsv4ltraxfe73wn9xiepnhmfx8nrxkroysqj3l3jwwh8lx7z5n4ihpr4zkypjcl9lzv7p5tmptzyu9olp4mqxd8j7bih8blvmmrsb4lq2rf7azaoyiwrjplw1zxkpvbagqweeofzre25729oa2cc633qun69ziji8jgvp2d7mevnupzpsrw86m3ditffyq',
                expiredAccessToken: 8139504259,
                expiredRefreshToken: 8140540031,
                isActive: false,
                isMaster: null,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'PASSWORD',
                name: 'by442lwr0o8volw1cnjipqty8zwjs3s85g1qtxwgilf12zp7lgu7kqqmgzewd2rqpo46lbtgnd0bxc1h72xy2dt3g298io3vh98gqzn4pr209s4xrtiwki004izp62xccc0rb7qbgsw21ysqgjh5equyp9ft0dvw27mx64fgfb814xqqs26j6qors01xm1954rpuzty7s821ua03dwnyjdhmcvouymqr2m9qeuyv0omlayx7q7pyeahthlds38m',
                secret: 'b9vpi5gco8fm244k4lcy7l9eu84auly02sklm81mxrbxjkn8ts01i47f4j2zby7cegivl12wikrgc7k8rg17u14med',
                authUrl: 'yuodmmcx6fu0wtbrsja7tflg90vmbwlvm1drektonw1q2suu4ivnsd8lqgm71kwpn9ldpo56pm23m1sv7o8yz7d75dzer8f60vvq7xsbd9cfs42zzrgpo0tzwi5yfsmbbkc0ok9gbiyotmvfag8rvtf8x37swta1m4f2h49q0znnoo4fmpgirh7asjt20pybvwggqcwianqo471rmdrol7vfyhhu1boh7h0u3h7h9aryhbugylxt6zpia024xp4qtc4bnidjyzpvq4awtygpl1v3llphmq82amhmrbcloxh9g1sj9jhiyhj1kpcyqckhnxp79e39scjomz076nsp7ekvp2h1guogbz3fbjqk5sor10fn67ihc1rfdraajk4enurdg2a0nxjffkmce793es4i5e2089oka6z8s79y9o64lca92l69kr7uz18fnzjrfpor332qnqgrhmwtilq10zo0uz3bo89seelpmxkgdoaeif8g6futj6xhy6ufb6sig93rb25oyz2hoe1tqembxc49iqqdx4419m9mmgctt774evtknqreab8aqnbc0zhh9nr3hez3zd68m7uix3hqu3zh1nqm89osp7wle0fc3p2x5skp7mjmvlbijmqlsunqt4ug2p8e5w1e7houjbjvrt8z8d7ciwiu50f0bramdm73scyillmaf7m3b77kjifys0imvibyduxwqdkacd0y0lcgyelcuz3ls8wlmemge35q0d15u0ue4quqaikqpv9ebeipvkh887j242qccj4p26b0f71ejzr6adiz004s2gs81cu6103f0e7mb9h3dzue5blg2z4migkb8ue20gf6dr8x1d8zz8wgdmy88hoh4jwmk244lyyj8qm41vf70ofgtf262dof1o0rf5mrlv14ykxbx8cma6j1ox63rkp8c8ulcg9iam8jwl027z0fz0i06vx5to7ap9l92eiji5jbyd9l95akn2kfk3kw6uibb95gmbhz7wh7oxse39rrgdjh04wk5hjkartqfwsaxzuh9y6nr74sew9ra5xkpori3f6djwrp0uhcq7bivis8enie2lm3qv0qxho8i1ioabjyxjouz5usa3t73h0knpelvexbuiv96ibv6i0z8k2mwpamp95omv7ou8xa3upoh29syohdwvb5lsbkqcvf6yrkwx8g5eyro89wpoql4rob3eoto5oejyqrtl3sjc6kocm2jj98ac3y0vb7v5u9fv4robdo3jmt7ymrcd0r1h800f8v77g0iw1m7pbrw2sfc8xtm7b0vam7av0k2o217k8tfczyb88jn7szr7f4v4qlou0d0fbpzbqputofrt0d5b92xs6tjignup0jib8zp7slz22ijmya08ktw59oyvcw0zbq8lxiop2prsyhupowvmqjo2fnrbmvt2usoejxdln49dvmffj8louekmo5gkbnauei6xi0hgifo3rgt6efrorvwr8d32k09a364cr83wd6qy99nz1osh8vuuzm04iuaonaljvfz4ls04b3phdp4bkmyu4zd64hkepq2s2t6iyymfpyy7warp57cclqwrsoc1pa3l5yftu4ugmk4o9tou0g7r5rlacydblat3vz0vesbzdoxn43lfvfwaoo7gugxvirfn64lsfb35zkxb9zwr6wk1cbly4bcez9v8eie2xjmktxflllrzq1rh8n25uqf0ytluvbl3p23dhr9yguh9q0yi76sdb1gbmd6m5bf7dlzrqxmbg5ptevnxzlviht50a0pyaw17fx4xdfmhuqvwxe4s3ioiq79sy3er84u7bp6m3bfrtjsmwzav7cj7pu2342dbv7fj1w56eryp2qouktha4ga3c8rqxyjui54873vbzdp36ztzjqsa0stg4s24a4t7qh9yynyq0lxqmn93vixuk1t4rc79f000dmg1jmlwivs9o0ec52vcj2hhnibv3lffke6n7wq9utdulcezegmmzcdaezbsjv0shyrigwqrxz7p0zxc01gdgm3patbiuk',
                redirect: 'a0tiyedswhxz7vt70gjog6aze3b7fy0y9ogvhcjuehu0xm5th17znnjhedonhv3b9ir988od3i7cho79bpb9o1x63hfl6jvmaay2v94zch8a43kr6gw8wowo2lb1qa7adtw6ua2a0h1pt5gma2k73f75uxptyrhq9zo6g93qxiskt7ggbub3px2fdsuknlxplfc6g0uttlxfuvaeu1d4cznlgv8acgwo7je4k8r5bl3ul4txr8mf4zisstn6o1hc1hx20ap2y3086wbbjrdabgspis81p4xap0q9of3165l1fq0n07ddu2ovtj3snqvubrnr8okoejmgxsqfrg0aoknc2ardtazlvv5kkbufdo4bxh14wbq5fd5t8x0ug5q8twmf8dn151mawzs072vymdtrp5wrinirl7mhgu3mrnwvefidzqyioypbsf2wyfakggy8d66occo3dwbywiynrlqw6gtcil1m33b0riatgpjptsotrnq91meo363to3udtkazidzc9jmw92hdznt773bavei3tkzswdjun3o9eb7ngrty2cpw14dnk5h9kd7rhter78xescptunm3htv44wsm9p2eo6253y62cv710nyvnnph7xb4vt2fioxq3qtwds8e9wii5vmv3sgfxhlfqy6w76uiintnxgh05iqbc2j6uhr00825m7x0gyyo77ew62cu7ashhyp5ptov3af4ubcythva8kgnycdhn0uvgdmzqwxn4dhni31bpq97vzdjy4743zmo2uhjntkd73o25mrd6iw43wrxc0vi6txeiunevo5kqhp82dkro13ysxqusr911ncqy7wnvctwcjak25tjljr6gomh2xndza3yzkq95jctyahlywvfjxzr4lbky1vs4goadihjh6h10op1wp47f8swi2ss1i8uln9f4385edmvfon62cmxhdhfktkdkchj5yq9lez604avdwi02xe13b3p92077louzj5ubuy0nwpcrbsi95ljfjx26y7s8slx2th7qevjyr980fz67vo7cwo6gqv4oc5t1narodxasv9pmgtmlpgzxbztc3dl25wiimcrcb7n5asxjghvik21plzbq6ba2d7idb9an254nrcxpfzh84opxrfueswhq2jtbna0eak98wwg6j8lst6z8bn63yhcwy76jos3v8co3uyq6ukmiamk7pii4m8drlfcgpaawnltyqwyw1nftiv8oqs5jz3cieeer1j0v8mlwub60ywj4n6zyaazcxv76qcydhi457he6d7xg9eom5nttrbn2e3zuz5kcoo4fs15nq7zwo7lxxu042nwy3yq40abaa7uke4xcmaui0xjcawjif5h2tvae1xwbboyy2fuoj1d6on4bhr577oix0r7lahzy9p4c5606nrp6gsyk7u42lq13ii9xr6aoj2umupeynillj4hprnc9rbz49a7s0fwkydor0kcb1623a9krtj5za2f7qhw4vgg4edpvf6eg248ug0mbnumb4qil06slfbw76zu9hqo5r1h9r64ebbtni7jxkl2lklzufrujg6lggxo3zw5kyr44xvfs76mx5iw9ynp2xgcgq63usurjmrdvai7csx6ccx34fzf7f3apttz8w4zv88o9dbk1pxutbk8v47km0x80xuom5suny06qjxx99bh3le1j6kn0zac0h5kyd2w3qc9rrc8el9zfo2qlx5i908oykq4d8xwdwgpqfwd27zvnl4c8e4nu6rsu0m7e4d5bplcfz0kxxp5epy20q7l81mdfs1743as1j5rokp9jw7kncgoh9j3esqjik4h8a1efxh82g4ve1m5dsjp2axtua6ey6kzcfa457s1kw4ydv3lm9o8rn423kry9yrz0yjlqggbwkhuoi2nx8w9suy0cdjusbexeq0tr1k1w0evnwa67a5g0axudggrsqck9afyingjjwiw7r1nwik0aak0wz1pk818ukb74dtbt5asrtduc25i3i955wqpobbaaif87k71ssmsa6ol',
                expiredAccessToken: 2217748958,
                expiredRefreshToken: 5373777107,
                isActive: false,
                
                applicationIds: [],
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
                id: 't0gkmkgvmpy3ylx3avj58vrllmwfp6s2yltoa',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'og11e2mfrvvqcjkkuxa3txm2iz2h6iwogvd6dhpviy6qmhkyig4dgn09yqr6ecxdefqj6b0c73f93z9hua2d6laajk3qjcezzk5qo3xy0w9i30x2j8wixv8vc9akedy3y4u4y5nlhyln7101m9mgx6a9ihdqbd0zqo0hf5z0ttpss8z57w0cy33dmmgpsbil1upuite6hmyqh2xwonvltgeib9h01zarjyk3dvy0pmz9zdc4rxkd4p8zskrxdvb',
                secret: 'u5fzt3tdu5flwv96swh7g4b41ypjat04ns605kdzfayllctzmyf5ausjfsoc8q7zi1ag2fuoec98sxyeykd3ggs68q',
                authUrl: 'xprwzbulrxubtq8jho9rwlyoqbgzx6frmrvhp5jh2e1oxe2vbzu2vfz4q1rl73nhp07jy9aef4616ll3net803zv4gv5zvp36xcqdg83pmfbr49pl6a8kri9ixt9r93z05f7nfjzo5ae2nhiy41fani3mvcqcjcnb8dmvbxbqjdyrx3h79d3t7fz2kfa098wroa41htx3f7cscsci1jdc5vs8ctqp5sqt79yi8ja6bgcg0ap67yw32bns6vdbxtd9hwr3c5f66glwsp6qpjxmuckz3gicxmlm83yvob1xytdskgrp6pr7z8udpw0d5ld45fvvkifz5ruy8149mtbf719ug8og64z587p98mdckyuz6eyye71eew9vyeebvi6f8ube99hgsfa0a4k85yg760rh8807mm2aaeixn7ntq51wjh3etluokcwlsrbxid7w59d2yjcmet125dxkjqil7qju44ktxnf0skk5cqyoglx7eqcxk8nts7wm5fwnwtip978m159oiqad2qgmkjuvk5wn923zlgb7bqqg469ljz7twpentmgt21q7w44j52fs20fxqsvtrq4594o812csvsyyxzudkqtr6mbi1kvr1n4m8ug44p90qcjqxwvnhf0t28r433phbhqgzgsxnmhzdgdsf1afcc5576l3iyyuwnu3t4m565dv7ktd244nbatz1izea2no6s2kzgdgbn9xob86sm6a0yx1ntaqvegnsg9acbarrdyk1isa6q212op4323a7wa6z0jtmav36l3qbwnt6c87vwxwwp8gzwyyoxxdudt7bg17466fte8csbjbh81rzlsj1hoxynmqoy5npv7u38t6hoft3akesr6aw47sgm2pn6mrouuid7b8yd9u3c0ha4pyae02et79diwt72wj5kxqf7wk2rjoh2iqznr7mzsl5vq8ee60bacrik14m9yyhdvm0di6tczjna3o4i3ajpyby7zgw9hugbb1kn3bv9oneek8y4ryhxje0f9ks1i6x7oauc15r2aj151mksvpo4vc3ns390aqvrxsrqw7ey5imcyol3jv6cteslob22j9wz8tvocmkggbyev07e4b4ki887ahjhlrw2mkel8ms6kd9k5spz62n5ilbs6uivgz21ppxgwebekniobwsd2lvphqaj6xbn1jp17uvp8kj5nujbl2x71iy05qfqqdmtbzdtohvoz50kh9y0z56v3gagnq9uks1p21qpdxbdd5zvg0hoo9qny89ymdnuah88vlj9zu3i09vvndz0vy0om8s6l0hp6l4x3eoy4kqnm9o6z9c7tvhe1wsc0c5v504qj1uth06gotjjp9vygb0vu4zcp2mncumwped155upmbe736utt3jiuzpkuzb9667sesya7pfjajf6qsgnds5c4p0g631swywhzeya3m94am0yonml00poy51hf17qgyaie55dc7zh62tigxgb702axlqeq8a8jgx2ks2180p7kia5ebqp741969e47d9auek8f2bqyyfkcsfc3xcua65nhofuxss5600q96jrfpxiyr3h9ef93j043dg2vfg6080lzfd4vzz965mpdfqyhfpudo95xyl4076tj4bq9hlhtzpuc4s1zzdexyk9rv1oqg2z0yvprlulzujb3lsiu1x1ty8hmmkh9yqr9kbvwsq34il7wfq9zzbdz2rchlunfq7skhclt82j4mhmcxe51slyox7w8wio2kp75p688nled3byux1beq2y8muh0ow4gjnobjo18vpp7o7x5agrrs8igf1rpq7j9tenizzjwd4woem6d5w8g6b9non5ddmdmdba0iz18t9si5cawhm7ipsl7ivk4cjrpa22swb2a3bi6gixep4z0ntx0zj7u1rbadirsnkdy5hvc42nc4dip97fzsmcg90c7b7lo1i2ysnjyfktv8riq6lefft2jj0neayoi9m9w63f0t67tix391b815gp26vnrj1h116a2ddwhr0aoc743m3ebb7gpm81m',
                redirect: 'lftyxrkxikrtgp33wv8rnpdjt8r8iyfzoovpalwhts7l33pctacq0x0v72f5rjuywz5t9tytmse6g07rlq1wglkr3ohh5e586xvs2muc3a2ek31fd5orx8iz61mhcra2j1na2552l6wf6l7muqocg8dckqjtmcx07e9xeecp8kqqg76q686pz4extdfkc6d9l6mju8ze8ib2052zqdluvvvlb1a9h3x56114t4m6zxoi76vog1gfpgwztuiomqc98cacqsplee05d9iizikxqjsv1erv8nndbzrihznl3ypxmre9ruiagrkjxpbe7f2ra7i9ucoh87a0r0rxgl51p03zzv85ujrnrkzmn08ij5hji62u4ble7rqllt07himcvztfc6yp3v4uiuvi3ch2kk7sxmzx6sv5qdzihbq5oyu484d96c8km5mqnuodx2inschejm5zlphrefeqbqtglm23ghzh3qyz1aryt0bazg61koueurj9n9g2cgjz5h60dn90w5rg2gai6mdlkjryz0c0kpuyri2no2xuy4o79lpihoalfk2iy6bp3kb0gmhmmrfq4yzx27xmryckgs4see3xdcf5gztz0r6xthv47no7w3op3w02f4xerszd5yk3h43r3egpknrme9ouuvx8cnzsufsf2uvdv6jcovfyngbr7hnasgpo7uccxorhla2bbwit3wshyxrxgj2onbkqawue3putvd2wsdfaelxw0uwk5w7n1c8mxjwv46in3q1uj80wvuy3ls88p4nswtmlb4bayown8watng1qcjlmh5pfxkiv67wct2vj40io5ybei1ccuihdo807jybud94dpu51shmxr8qmot566yd5fa4pgiqqr5xk5nmw94z1trw8vf39e965mxkr54065wuxyag4p39jl1q2cs1gzqv73zw7xvmmr9e4m7z9hxfb7rfmmycwyvsh3tu3someftygydsec6n88108vr5uqzti73nb81t0tkodluvu6wnkpe3ocf6q075db4t2pgh1hu3fchck6282gslujdq8bwnfjswv2fl7n8ffqnx0npat8xu8roxd0v7amw6gkjqozgtg7czjweyox8y59rww1if634pddhong4hcfhn1tw2lajz6phreoys0earbnaps1osawoupahqwysgiwcn0v8w3042gc9a9qa3s6qjhgf88o3dy0w0d2x8pfyts20j47tvn7puppm2vjqjppvf2bx56ylmtmbf07k65tiu4i2424moraf1167u7ini4i6ei27r0mudg5pxucmw5jic900t70k9lo1hk5nkvelgitsbwvi4zch5w1mefw38eszn6n2hqig2721b2kgjx40n0yontl60wgpsyo88gb7v7om0fy57oh0xt3gc5862x7gqpy127tutf5b3rp5n4ilktwkmynbdbdy7mvfc8z4nkq1rw21h3oom93vs08w9uqyv3kqgyqj18dsd7htj2whl4rxjtfm8jtvxb3gj3e1m3olv1yyihc7dz6xknh98cu5ki29fo0olmx1ngvpzed424cn9l61kgu5tc6cifwwgi0yyky0wxvf2dgp83vwn1zc1jxxjloxuftxm9mg9tbykz3sdjc7t09dvkygoiq99nyzn6cv00gbth83xffs2y6hxtep8lfmpuhwo381plbigbzlg21kep57x3zo47d1aftnzz8oc9c8my01dlvf15o2s5me8cpntflxeddwlw71n120mjj8vsa4swnh5yflsal73bme5i2i6fnu5l2unqn8xxqwmmxb3vf037e27ufz1yr12t92rusmtufzptydb8vhe85lbncoi6ih6jwww9zzaih201hb4as4ggqhxvi2r19y0s67bcuv9gppy4tsjsfuvtxovavzc65qj059uxb4puozc9zc24d4h1w673vshnl1g9s90nwxgxfpg6u5520m0ibwbxn66fgzxrozvlur0krcfn61hk1v888jlpo7srf14rt34o0fxoihohorzpisxge1qy',
                expiredAccessToken: 5065219725,
                expiredRefreshToken: 4872975257,
                isActive: true,
                isMaster: false,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'c4un86clkvw7y02ku28l0zbmvc3a4o8olo943lxwc2kqid6dgapaphuh6fu7q5tf9621ryneuq2uu2zwvo329lphz6015k7d53wxqmpqv1p3kqbkyzvntrg9c30ldwxjc7gl0c13ed447hgr2vd7gwats39r2m7texg4p62i7tuqdn3a5ziyoykp4z3vsirf18exc1un4g162upksp530wb7lpehcvfiwhq0w2h2fqssh0rsd4ocujczc39aw2kz',
                secret: 'imu6zpl706ljpl99yjenabd7n9ia34785oxetc4sq24kpi0x58mgnwhezp5eigast1z8qcd7zpjfu32yt2g9byeasf',
                authUrl: 'mvuy3m4czsoozaogfzr8edh3sdpm5t7oi2g9ov1pcypw4gqb6ptzbba88nbmhi9j1m8hfxtnazl945batr4o2y9qp14h3kao85co2d6betz7xaojz8i4wwtgkveo7jrd52m15t82zedd8bwju3cq6wdz34c5hr3hglkj3uz6w680ia5ga49c2x4qq82mf3b3jy5okqnre72qyh60x6rm4vhehde44xriggm8kvuyw0g68r7l0pscv3hb5ubwhhwbt10o2kx1xrvaeeupw8fp7fgqlu1mmmpsf7g87shvmtzk58vi530zwwnwjv2j1r8586bgo3p9j9ldtma3z79b35rmkn9nbwf6k42v4rj92of5qehyel404fch6ao31yu9rg5uibvoh0t4tci6f77xosze1g22npdsnishz8z796idlhjc3xexoz6e7rsn2nloxkfz3113mylqhh0s9eo7ww9jqab5kzkllpv22r7ant1eqpn2tip2qzf28uifonqo8fdnr6726zuahg77i7cnt0pnj96t770q9uksnm7r1hpcao14x22mkql8t9vb3wajmrxpjh2xayvo10ohr6iyd5dh44vgp79uzigjj5oubzvddjt47tifejwc7cok3g2iwm4vz6buih6ceifjt3r8wysljgkb9kbelp81usw3i095xq5zu0pmhd3drakbsdyo1pxj6y3q5cxwuosw5lprdqw5a6ma0utjzi734n3ue2qy83714yt0v3j6btcw0vx9rdi1026tfzagjoef7jaz4lkybfune56netmj32gjr879t9bfgi067ni1he5znpkumdytt4k91q13kpwex6kbtuqtxzx3rpvexehyxj9ssypzmeerad0o2t5lz4cxmnzec5s72sml114mqezt5rridyux7cwoclbp6lulhdr6tgqned3bsv2qozlcgvtfl14hb4wm8c30ih35oigp3aeesrpj8nh8zaij6kqvcclngbur1ehe13hrufw366we1jblhvdpq0efn69urid7dqrlpt6hw1e3olt2us0qjqophtilptpoht07s3a5lgz47obwiqygibelx0oraa63sj4noj8pddg7pnchkwghm2019kwy128y3nmm2w5nxwxfnhkvy3jmj15m9rnibkk19pp2kowy11igy3b09eaxaomz5vg7u8g60n0kengrcv8mc8s1hssklxeb2uj4wunrvjx6m1eulzhif8xdyb81itlwib9a6n35tblw78lqmaefrwq1p142kgec4lnbk8tjn9u46d3biso87znqrjvz1f6rqy13vz7z9havpdjiea3v0s8pa2v8871l1i4311nydwtmaorrowuiizkuj9jedkasopfye8l68bqowgt9twt3yel7p95uinr9pd24wp2w9i44gxkw5tmx4aaweu4nw7bxzokee7fjwgz3bixtvrou7gtcmvph3kimcaowouxbr1anwlczcm012m4dw1jbd04wtl7wlmtxfy3upvgrfhpd182iakhmypa59q8x1cq6l014848wp9if8awrpihx7fqeutoezfzvgrgjotwnzy42u5nzupkjlxqgbt2xr4xuq2z6r2ybe89hlu2m2klyu2jhrg1jfayh359dxjncg7r0ff9njir0dms3r2jusjunbc8rd0lr3ykifiv289cw7ybpp58e96vrhkly3czdtnbjg9gzay58nsz9dhfqi1edv82wlkm1am0mhn20to13ojzj46xdyefj9dytalug6xydrpini7i1kug4n0gv34zze4oims8t4f7wf9aalevs48egc77asyw86oqpkdhnezticyipykvs009p5epp1qhmb1gsltetcuc4g0hhol7vea0fgrs54ujwru8e7sngaaa7eigpj7s2kp0bgsb8or09dsrk6zoffjege5wt4pbdjyg7ij3rxja7mux8q7owug9mz6lmcx2pabnsfjfvplkazpa4dwv4fdu6u7rlvogd298t3mrtmkpr4oszzhbkxqbwz9p2',
                redirect: '898v0vwcesa61tppjgwdmi5h069ar985cksb7tmpy84v0jbq9atvxt0e6ayygirsdms1f3owz1prm5hxcuce4f7xhxm7n0seimpit6nie99ldz74i3bjtlcez4utj5gff6vtyyez0u91fsac6g9lnmlmwrsc259717b32531g5v5mw1i7jl5y8peki129m5mskqn7gpqkpe86q5tq5xn2yfl19szl6cqh9rqoewcblm2qkhqijajvu2o5aaazbq2owxwpi9pf98zr6ka9123rx7tbm855cfiblj0iy9dcw9z2ckqkgvg9h6vf0jt4k0uacxtfxfhey0nprvc03st8ywtj1976lncez6gpbvfwmx2d8qf5uajab2sgn9s0u6a1cenut3ahkrooe3awzm2bku1w5jkdh4r8wi83cx731be9g2tjgo19u2ovqlbwq4f4dazg19bcgxc132ukbx12w4hvyc757n6mnqqnhdo2un8r6yomy6w08rup7tbjzx64jq6u9ghhitav1qb0m0iewp7f6f2w6ktwb2nam3iuegzrjoiet81eoahkx8hhwg0owjkicxtk1ushgd1pilwgqj8qfugvb16j1oz12g9b4ea57h7pdrxvmux8l8wvrbcc2gv1tyh2bqhl641ya78yluf5qcrw11m3fgs9q729h9u7foghqk9936590umz63030o9bx4qsrieawpkib0sn1qwno07ewrcthzy94afclq5x8q0g7xmbgxfdrob6iffulbkwdbfhsnfh2sj7x2tosmvviavyt4d6gl4ywf4bvfi5h1sw017zh271evas9wait5pia3xgjwe72j55du6uusb7nnvwvpe6v2ngwh297e9z2oqe098x4q5u6qxq510pmyslg6yid39tzq686wzvwjrb296py3yk5gdrqvz9oj1b98nqsrif4kh74awk6oh6btci91ddipfmmfuq7z4ppn121xxyoeoxibuopi91mt5yseo6z0m0sgmmj3c0h4xlgmr3pvoefdlhma7cj3nk16ks3sc3qu4ohxpxxe8l9u0cav639m398x2xh44rrq2x1776nrctrsgmpf2762k0cv73m8rp5ir3hpbj2ayxhd14gzrb1td1q8qtkvrkt6ptip89t0pnignuan71vvpgj352e0xzb2lfpwf339ichr2qy2flpupl1k7ukam0jh3bx4ye12g0qls1xke10c6734zwxw5um8fywielqulm15nu0n30r9wkfcdq2c3pxrhw0e7wf8f0hw0d1b0sdpb3u7lj41sw8m8g9rwhw676lgxe5usip028lpo2s32kc3834zbcwwn2ypd4byst40ohcrq8ual2d1zwfdsm2rj1n9ame4w8d15pumkpr98pzkpgjt4elotlkk0vwbssr2pyux4f4wblvjbwzug5ughw2x0182lv3tbtlaksggrmpnu2ca4n5u5gkncyzi2q2uurgskdzybndbi6wlu0p3uokgas2kbjdz1r951v56v61x0w5dovvvw805f25pqb9q8znvk6rts5uhcysplb89n3m812kn3ye7inhicgkx4f0jiq78ufcggufvr8i14yw4o859vw9ivh8ia156mgi12aq0b0ahw4wj31y2bm5qwziy65aced7xsv82n7ksrhmi4ggrf7la05g6dwgi2a4lz7sig8ldxcsg1viaq4p053px3bk7agyr5hn6871gob5nz7akuulodu6sbgvrxsw750gv249zk9nhydl2fkir8v6rncjk071wlzhdthpdqyqar0dv97yx8bbmsxmjrc5z4mk9v5pxtah5vk7zp9r65m4wh49km2g9ywp1v8lfusz954w3flhbz44yl9ghsitvkux4gbd8846auknayllcguqulmjvwnh083w7g3webfr9pxqsor4swqmkuevww2zwb2elmul4rak5fwqqmyuxh47yf5dyalkwm7yz2pylm5ge3nv8bd6yhgphr5pgaiciyh2m41hx56vx0yr4jf9pwhy4n',
                expiredAccessToken: 8500880542,
                expiredRefreshToken: 8256112864,
                isActive: true,
                isMaster: true,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'PASSWORD',
                name: 'u79itww9io8y0708001mxv46kc6hml63x1up8hll53xi464zds5t4ir0ubka8qfpo1li8z36qldty661uo1r6u91h4a5w93724uwuld6zxk034m7vsp2b2lxyo7ckzvys1ugw3sm20c4m4ffzi8reqsy406d07ohmc2p35pk4xkdmoxoozycr8b6sfklikdw8m9y8i781rymblfqwv9ww9rq5ycrw3tk1rr8twibksa9sbo1gvoxw4nxbh1b01j',
                secret: 'xba5kacorq6dpqxtaklxdbp9i3ydy3hp056nlqt1jenztronqlt58m4ls8dpew8mziioo8y07exm5t3cuk3pt5wqkvu',
                authUrl: 'i6d36928349nbwqj94i2c1jlsj2weogmgp40oh8qqe0aeqbx39d31yjjr806fwftbji2icsnpwpvv2iqwsw93rb1xj54hhbm3j7na5wrz770gc6hs6bebfev8oe5wnhrrynoktpwxm5jhxusigozwiha4ema6515jwg7rs7axir2q9kd7iwbzw83y4xsputrdb7k2x9ygqni3903g3mhodkuulbpdjjx3wxqsp897ogkth7hllweyd2fkfny88x33i2icgy9o3t3d21tt4l2gp399ls09cd9lnnj94qw93luoc8d0d57qm2pi7xldoph8n7mqs9dt7ub2zjbf05schtvq1kh467uzkpzct57wjt5mqkh0r9mfc64m3w1c4w263g5h8wju6ueb9i9sapvcpl39nziv96pyqvb25i97cjz8ybean44op8xux7uv3lbpq4c1yu496tgbtbfvjctexka9g9luy0gwp90nf6pxwmgjeb7fun9gyppc4slajhqjnjn7bfr93uczvhbikizcwwtqr7cc9r4o75c9oh60wvdbrn5eq6er22xice075qliu81p3iy982063lhbzwwdzf1rf5pukg1weuezfo8og87lnlkoam5jvl7a11q2afrmweerrhbp7mehmomdby8nvoaf1cjs4hdtllz9ntuvff0wamnf0xzpw81w2m6p7umhp75moaf450xz8ra7boz0w3ahljq5e2lzak9jzfywubn8kcqqvhszljxyyh6qkeltbyjigfl9emkv469qni5dqt2ngw6y5tppfhbo7afvc9sluozqaujn79iz3jvk7pnqosbqmo09e96jqbejaylwq0lye7g506ys91duyxz1qixd851be9yvt8oxh7y8ugojnxgz6cjemxt1alwwzp61czvau989jd6yarbbuok5d8daspc9ithdh48x1m78i6zxnoq3hjhu8gu2ubbbnzk1lkfmizt03mof1jtw0g9lqk209f6skqduvdyak89e8x9kkfyxrrhc2c4l3iqznkqk30fk7osv6o4o1q0ejw1obv1ueu5ffz8jg0p01e35rc66ih4s5l2azl1lm2f9dmdv8lrs6rmhxlmj6zwdrqnzvq3ftlc2nagpw5oaj9j3w18h95018mzfi0xdelq7htoep57bcezh85l1ajcz200yq0q4n3btdy3da5nkp1iu4mocvyct3fxw6rbv0d79pxgp0ej45qmhla3iimh3ycatxt8mjqgt5fe5oxls2sqrlsuczt204kx89k8o1mg4ekh12yq23kakoxg5y5bx52c0ctdleqysi2go8dsxkod40d1o6ilhhalx9mcwkmh00t034qe7qzwb6c2bb1flv43erje5l6wqjwkw23r6h6w75lv8xwynmz5tzshqthikt3adt9p7j2dmcc12nqbas4ccmint965pzpuurwuvcg3d0gikcernfqux39o9jiwtj6joecooo8xszxroxz7esg6wj8hzrnmc03nz5mspev32hc8k9ti70hh7mhor6zlvgqdm17q1pa3h4ys4bgddm79z6ckhdwyyh9iavkij1zfvvgjbk9y9l1irecm34kjy9wym8lyjx2i0fcklv5ycynoe7rjmuu4pa4pksdeleoqr8zpkkcqemmjswbkc3gondpdfzsr7sihqirnl2fg55tk9nw436odhyxc9on4ak83lhl2ybmewceej466ibl5oxuq1wes16fxj7dn2ocgbqlbfgr968vifali4oexjswfsvgkyf6rfkn6nsxzq22slmpiac1rkgo4t3v9ljyqdzamc0l8hnbf7hvnfadb21tecvg5jo6f73dfiojtg82l14h8b8nrh6nuhc0oa0ywrrbxmew1g7tszqbpuqb36ywynif40ctmdzf8tvpqb11ngza5h3z2lw836f4ni98zev6bbcjum59u8bbab6iqh68qvhrlvypxwkb5u72w7i41ewc90imy0nsiavq9xvk6jaea7vb258ehn78kbhl5snm8pruy',
                redirect: 'u1bdlt0ujqsrzzvsl9awanswxt78gfl7zr4gdtpz0nhzolv7upkrh4pkn2aybeouov1wkkjcn0i6cz3f0dzbzr65fnpss6lxr3yg2396ozykhff3ujilgf5evkau651l4djy5aqbtiusxe9zkxk0aegstqokou4zntff87u8all5cxv8ye4lxrv0hgtvvdv8gxzkjju20fecakxd00y5ovwyk4r7dt92yujm4qbor8dibt94206dgyb3y3sqv2bk0pfcxkpr1x6itlmj0hqktm9gmwsblw32gunli83hm1laev7xtqpllo0bvzrbo1hj0px33nb5kyynn5mbiw0e15yyvla1ylelby7yoo64o28nksimw16q029jhylmsl8b2nme28ewk107md7ifawpjt8uilu6249bafotge5c6qqpmhw4etytu5aoerw38qc33ew0wrlqgughhrgraf440501fzklbwqkgvr2wllhs7ln2033lxw5kcmyw5m7gz9uvv0o28z8a321884gtrh61m3anisc4fwl8wgo033b9fut85s7i3dxh418g3lh56yi4juu0j3ui7odpt2hcdgk11b99se61ba92rf8srxhuu9menpdd7pwhzjwgl0f11cahn31w225mxdx1tkkwrtx4jupz2ecmvnqmex44zz498ufhgxu1hi6atmy2k5pyc2n89jnqg1u4vp5g7nu4p3nq7lo9pq42uitmyd0hgudzsg3nweg83ponsgswrqtbor8wyikp3thrmo2t8c2555irc62ep63m8q2b16yj7a8kg1vrojm6p30urhre6flk2vilk1o4kih0ydteoyusx4y2jhuo51tei7ubek8jne2wc2mxl3ejvk4v1n9boctgsr9m0ag3efuwmsx96gdgg2k0l3iioyiffk5i6uvq0vyj0zh67g3q0i5det219mwis4jj7scm1mjllwsgyuzvbub7je4aj9uxaq6aro5h4g888m1gj8w6mdcrlxzwoksnc3ve8jvn60gjvlmkg1s8ui7c2sn2jd9ampia03e0qhua0jmf52qd05frlxajb8xfm9ywy6xxgjtmat9dadnnzizwsvit8zv8060v0c9zvkjbf8m972idjrtgjx14itla8dyx0dfebkn3d7od0ph2vu2ew7moodf1d2ytgvb4jrid0cz1qhudr73gg4ovwhzbt9ms67q9419tufj05pfib5cfjxhz0rg4sqbi70g6fi77n9cgdzp61d6l5u37d5qirmhuu927iaj2lwqif594i2xj61gla6e1q198xot7jyf095hxzireuevt3no8vtg2zwb6ayo9r85hblkmb5fmgajqwsf8o7zachrb2kjrho3fgtzpzpsg3okysvtrexjczi6u9xjbr0qggbxf9yal4tgcrnf8xm7522bawdhni3aiz6gl06jg2m2s86k3sxv6ivtm69y4cmb6pxmy57reumqdhexc3vl40monman0rvsjs8fte057448ql4ak2xrn04dr9zqy2ew22fu7p5r8d38aqcg1a82ktbm2k20pe424pi8wdisu7djmomeji990333d3ihj73ioh2kvmybb03tkr99vtngid6momr4yv1m97azt7zfpjlo6hz7tqra1pleul76qf4a86wdb23sv9db8i7gm9h4zfwrkbdheyh1nj2tunhtlf8d2xue201yx4jvm30tnfts2s68z7uasu1aczhqlqzc9y48lvy2rnbxwobtmlntms46twk2qtwrtva1y9r11yrd63puqn9h44etk2dwge13va1x812y4120gb1ogrpxsed98txgfn5jchgbjv45rgtk0i3uxx7wqahc5snbgtmf5456o8lob1dstt97t75r5luofccg4deg5t4hziman65z5dyizn0vp91czrsztowm7t56orvbpxdnmdg88vnsn3vvfgxuyq39bjhicjw1dueu3svogbvtjpy3dcshb6ho0cbdk18lhg65b8r9g9jhazrntvjvzcc15wth',
                expiredAccessToken: 5841539158,
                expiredRefreshToken: 2019113788,
                isActive: true,
                isMaster: false,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'AUTHORIZATION_CODE',
                name: '8hjddch5tt3qwfiej2p2g4uqtaxuvvrnk1383255bvxlvlq9lpcppw80hn942fh7kf9umo1dp6xyi0fli49prw5uczv0mrktsuavuxb7ik39eprg7ox7zck2u2njbc98rc1h0nkqkjjrxlvpd0dxbg4fc1x0gd8wcfzfjg8jzpn7xdkexfhznmjdgn26lvoctunrwhfl56jn2wsmain9il0sq7igxst9oqxf3y7i0tkk3jpmdu0bjx56gbqz0js',
                secret: 'u9qdcyenbz4duseede3oa7nmh1mvt98w5os0idfuvxwkmez9uoog3jajuzlnzhet96b7els7i77omc922ysehd2n41',
                authUrl: 'u038nz1js9885lnhg28ipmva5csthp6knkv9m80egppx4usaelm3y6n8upr7t6y13nkfh5z1wjb77umv6xjflcv4gamw29inlpw3kzf0k1w3fwhhd0onifxk7l7y1szca1nqfznr13if90eljumqmsaj32a7af305om7n89599oawikcykymnzejjo57uwm5yx73da0qdf8vlbe8nl7os8561i6mm57aixz87ywwoothnoshl31ckmneyby0d6meow14y2oi9j8onxlvr7a69cnre99rurtmdbendrnpmkuh65cj9sl24kppkxfjcpuw6fyeyo7d8ulkv8blk3t3so1xjtpa1iuyihc1y7dz70ggcift45p78qc3qfwa9ebjvy50v3tndcy75oki1llt4fz5op2nkikncdhkbih87lzteu83sofgoox6re6vfcyqd8ym9opcg9d5xk559wctma8shxqjesxor9flntxn7tvqyxfqhnhejby7227l9095k8ep155atbc6bldlfyt07yhmjcpde9kcuq61rxxcs4azl7rv0dnj7ovw8z3favfnkp5mm9bsvyftfgw1q9eq5zv2dxul0i9jzkj01u7qlwrl0iktl1ju38rmswrqomja4ipcobbr28jmevi8nev16wqr3x0p79j1x56ne4mir3tpep9roxj4gm1dl8z8yvchgipp3b6mky6mc219etysse3byh8p3ui1asiywjvaxgx1slskieziho5aoeti5gzco88xawjzeea7h6ucunhwtlpusry7t31fxmxch1ljddbw78da1lv83o64vjm6es2qpkvqo03vcr8e1geeez8x4rr71zprrxkg2h0zxpyhipvlfszof2gcqpzmh0zs9i3h5w8ojb84kuxcu6sc7vjhw5i1gn47yo2mxiur5oz3fysp35irwx9tq5he3kcpybumjhxknxp2u8phc9er2qfbi1s5doibs4b5ebl8wd5m729ja44wse9le10792369u2bb2ituo6fskyn9j5dpo6ox7nnsjuhhk5xk1ct1k9j6hlmmgq3y8zlqbsiw3cplvg5wllzga61g7cway2kjxhqoj2j2gncfcr0mxg0d2bufolrfdcvkvry1p6ecl9o8d5up1d178q5y5lq015jw1upitsd01lulp3qgp6j0a2k99smihr4tb7gmi73s5dhgrbfqfqbrixpfpj1ymcr7c6oq5tmx7eoqrr8j7wj8ir8sm98lfqzodmgkn6kh60voxxuneu4gbbyg6102znc1lekgqivxnk69g109oe11aj06fd78nws86iky6lk1a97df0tncrgez6qp2wn61547t8y1avnq7zkqqlrqprngzxy2pu8h0k34ljy2qqsrjc4abkw78uh3thqcwzbiexpamumsyvl3fnxb3vpt21xxnry0f9kj72ro7280kuqipkklbyy1oz1hooc3xqhw8ci2ujz9n93uc0a6ogzqhh911fmg15jabupxg75euexbl7bd0ka0b3i4nq71pw8xfkof6lybs3n2luigt1gih7hvcsp0q2wqoozv9ttk3zjaaw2ejxrs0syx7ftdcr7xu11en1pp8hjv2k87v9xm1hrska6vwhs8heup0gyoayt5kra3ex3878ysf55xb2wiu72296jnejs81wgfjaxeuevpwvc0he0e211zbrrojj0dw6gwrfmwrggfdad7mhq6lezwg3tag9pvanm01g1uj66ajzn4jztxgb6rdafbos4rtibcj3tigswa2vjf9s3p3siypx9afj08gntcwnx8t4qlk6k4q6dl2on9upj2z09rr60rc1bfo7421nydsvek65uftsfw195pm4xtxm7s89o1q9t6lvbcssif7jf34mwemluu092fy1fgclrx8i95hahb622nq9qtqmtkda7t5s6xqj7ort6vb5ay70ypoxh156q5av6fqwlwdqv4duqzittajjlogf5m82yf7ssblexnp0s51sj8m1uyj1isktd8243vmkkb',
                redirect: 'cuqpmwcb62ux3mky6i94kfzgeagd3wae5hkf77hmje28vm7u1ddh3zormm6bmpkvfrmdlsisf058l9qztzb5ffwwrhoxezkp2udba0jpbkdfz0icz2g9nxzy4le3uo0jsd0ulh88testastg6ab7va66ynagtlpke38l5m881v0whuam02qedsepzonqfx8lrkqtaw9s2bv12aq0vzer5p33ovx1b18b5hpzfr8uwb5v11z6e1v3scxlgyplhbyv40kyk2p9nel3i5gxjprom7n3982dws3mcxic748i7ezyw9oweddzetsg60u0nars2kzddlf0jgljtsixofp3pad5f0z2j5ly72pb7nm5chb7kgbbbr8uws0kygr15647y89utsibg7n7sps0sqmqwfe9rxn5yzgc070q3xatcsn9wt5kp838druqzm5rd9jc8q4vzpw11r875cb889rob79gvvik6rsect299pq6xv4jqwder4rkn0j24ddaxudgi0mxex714js8woxw2qtms1ody6rx06e23o1y44a6pfhg2evtluhv514ua0cdao3xu3pgu8h749vzy00aq6rqqz1bnelptzzvfyzrzfi8gy9x89eiibdi7kxmlgxje0gubwcbztp4a2v7oijfcha5fk8mkc80z9bymrgaso4h2p6dpzicvbytcxc5c1or1h3avtseefwb9ai4bc2b5au77bim833j0q7o24qmy6v0kw7q2a0y90k50nhknzyyyd7sx99kjh3dnpm512zfwo2sxpuawp98141a0qc6qbjbqi47jdjjhcoogtuw7l1ozhbvc8x03mva0b4mmk7zkc9syeksk04ccpzdjpcr1mh75omvj219fjf4reij7cvlya5rfo9lu84osw7cs3rm9ffymyijh0qh8lnujvgyl2uhtny8msehregrk8jcckdvepj376yhmvzmicsg6tmefoctl2kyjt7o89g0wwb4163fh6dfanthtgyyjjid3f18hec1nvyigca8oyo3kvugn42gbyitj5pi0wmz0tiryp128svii42xcgu8lk3xz1m4jfjqmh2z1natfnclb6m50veeve0gvckwvrj2eswzr3xl7hv3ecobsw5rydwhzvie40hloqun0a9pr6rurvl3i97x4ta9fhpbtr20dvfk6ti51w23mum1s0338jio430ityfzrdw8mjc622kninbutpl91f1tf57ultsv4lul5jq65a0ngnvq1jgfglv1wwa0t30d7cy4t1jqad48ii0ezqwlhxtqsg06dvapzr30uggeqi42axs1mnmelreoew2khw9rhb7zuz2rcqxqrna71ouuj3nsi9skb0ps8hxswxlk5ukv9m4nmq65d1rbbjvb08jlz6kv3j7ig10pwpesqlu1igvy2iigpvl234impm5vxxor5ts3715exxdbldz42l1694d7m766sa7h3tzdf1ed8jyfwvyk0w4uc952aug8w236fxh5nwcbx88o28vipcrd695pskh1pjzxivqf6bd2u413rq0f6tebnd13fqg2vvg5vgjbyfyg0s69ldvhgivpdy8g44y1xyakm0ep42y47363xcogv2d31599yvoyzlm7v0iv5tydwr9cuhqcwfe0nqoc69pu1sqbri1ieqmn0f0ir5wgu4cuurf8hdrmnk4c8hvbq0jt6ykt3i0n49fe36hc0cleutv38v5gswpmx3ghskajtbtrcahrexic8fwvtol3hwh54scwv6l54dr2cvdadghec1qaljjb0x5zk08vizh01hpz2kb1lkxw79j41hn0kcgz08o33xyx887ylkz7pithfenevjnzuz3tiblrq3mi63kugtrp94hv7lhmgmuubtnd6dsuods40ievr7y1smvw3snv8llk1n11fra3lindv9hbg2hzwoymtwxp8qkyv7m6kdtinzy3qnx8owevfwijt5kvnk1iqt99v7x7ggf56h9ng8xc9ltw5fsju30l4dm7gjff73o0flmx',
                expiredAccessToken: 2636317240,
                expiredRefreshToken: 3226072829,
                isActive: true,
                isMaster: true,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'AUTHORIZATION_CODE',
                name: '1a3b8ffh1r5c1tl7a9d9m34dov2ps1z8bgw2d80og1d2vzqokflwbxsq5t0vbtbyjdql49yyqgd82yvokcx3vwh564tfy1k8j68p6e2wq5rakq4w332nkfnfqzpchlrdlh6fjfjc4qrrz409odog4rtohdnmbleuv65vqoluos5xkaw2iy0ukrknaht7y3o09zlbc3bev1lmtt6vvodaia1x9pxcv7rac94vkkmrxyvn5u7uuoi33xq84loxmll',
                secret: 'fkld5x4m71pnjo58928ro9g20qlxifm648pjqvjymg27ruftkzqovzqv5xpvie2otpm5f45ec12yo63sfzjlv2sved',
                authUrl: 'llsl89w32hzumil18bq0jg4g5n43uej7dfpb38wmzz8vuwiae541eoo2zox7loezlrzxebyyhnihksxnuu6d4h84lxnqvj2t3t692qsuqj2gzk5rzw9hqh6pqvg1y1jujjerzv4np2mze4smvfq1o7q82w0k68ejt1eg6mg9aoc668rzd7a24ylruqj0uouhqt7jk7n4d64cdg2g9wdtugiyu0qmp6hiekc0yyjioy3vuy12md7gcx0o6rffj07xrywy0a1zviyqdxed1euhrpp36g7yrs3kod8edccctkjo6x4s0wvinfc0l9sqdh1iw9xb5gv28dbmnpatukvoqdv9tgng1n9jni8hjm991n9bzpquoan007az9xodk6xw1nznfixbb6hwslerhds3qc0snj960ocjrrdg1s13fsj11au0gkamxf6qn13vw0uc8mtq3vwdkqkymlwjeqtnhmux2zxamxrsy06nzeamxj6hxlv8wjf4ayfi1tzja264hsz1caik033mv47qyiaufwo28lnfgy2p97tcdd2861oe6efbfxtqyd8j53ka24cqjr7xzcx42obsxmocuaunnbwzgrqgur5up4p5qwxxk8yqjekqcbdy1uvruco8fho5ilwhtvten0tmcxryyujjohuy6euoo2v6mfz336fbx6g5h03zwwautqech2m2yxx602klr80um5dhujeethf4wniej6ksvvvswihcha8rk2oaz42arg544gsx4q96an555dnmqmwty357mfqe3ptkts6jx8o3myaqzxdvk8jyohe6uwy98ebtavt5mlmulzv0n7likk7c3yccza92dm3fgqw1rqd335kliqm8q8w7rlgzm97z7mi8z7bsi95kgqjd816bw27pl0j70kuvta0ti8q6n8zqtcqki6v0aau5l1q5mnzfisrtpci26hsfgvrj85x0gucgchamb5yzkzul7rnouz7stwuuvwovgc7ss50zrqd4hsg4bfhx6kmcaa58yd8lyepg32cwjxgh4xadp4t2nniqf7urpp9150d5i7r9w1bdnewfa3mp8s1dk1pfkq4svyvwbo6g7xry0jw1ibqgw1sjs62b9weenjd072jnor74wx6nlmfht55w3qj5pews1r4r0vp6cqkq2ihm75a9sdnj8r35j6myitd6segnizb7878buh3xw8osg9lrbkx0r71v58ys5mrwz86e1yg19f00he3uckrkh4nuaqwk5ptq1in23g9fh45y70rc4vzb1riiw8a9b8uptue2ra9otzbmk2sengv1a431m39m5meijgd353ezdc8tm5t48yexrqqeo56cr95lgy3ctqojazjgurjga3hizpxd64nfsffs8lyyu5137s4le71i6smulkwi40s6soq1ice5qefp9k1wqyecnwwla6hq8mfjk2w26o54g6ks623i4pg0k4vijaskz2om1vbra306mmw7luxj7rm6jsnv5otmcqddoorohvkuga89wmjpkfpqbm4hoxo023ophywhwq8ymnmiud7kf6khsdk2kvhg5zd8eym7yo7e5ljk6n491uh1ekyqephw6lw7hwcqv8qokxib4nzhmij6cbm0cvuek5xlzgr61kxs1ov1byjpyubqbvvbtc0rpftub6q7dwxxv1zrunbvp2weetbotyar4vjic36z9xmo1v9u31wsv33o0h7yzehylrg49bl2z9thxbi3as0vidhnoeem6zcalhkj8ksb7cicsatz3qxa9im5zq0kdof7jk3ozi0o138zupbekiw1z58aq8xs4udcm5q1664b4gewlct8v3ds1mx6dk32rkkmkglq6xm3e6l224fiey439lcz8u2mulgd26zwjrtkzg3n065p677w2508lkpnbbnbwihoizroltxszr5aslcarz1gqhrqpw9me42o17o9jyg4z25tbjv5rz3y3kfj8ubv2f4wrlxm3v9xwc3wdb7x2zu59rl1o56dqcuerdc2y0xlm82ow7et0e98',
                redirect: 'lgtc6ebr98degexewuggpi7940uukw7tnwk3usajooo3y7pp0s0i583gwus1hxdizdwro8c6or6zj4dirwlgskmgv86o3t5f7fur2flqac4h60udwh3kzu68ebqwmxlj64bz7mnnrjxzr5w0qxrfkd6h9v1j05ryas5i8930573mit8kkwrw5ugec2vbvo53uq9s91kc808q25hlcsxzvae5ebtfs7gsz4umvb33wr07vri5n6xl8rk9wwon2hhehw152ax5t7tbzr00e1xk7l2wzv0aywibm192ujz15hdv6ypu11sevr4dddn1me01k7swv19znr015mh6q68l0detjykv8z2aamvhv4lvceda07o9u4k2t7611ne8bh8fjpekbpkaukxd71j8jobmxlnquaxr9zensanmz4c46myatjxz4l6lk8kxh0g7x15ll03jm9p9k3yfs4tt0c3o1phay550yf1dlfzh8bx1yc2n6cdzhp2838hm1ig7qtzfbq12cyciyqp4ditqngnhxwwcpig48hlf3b6ij3xqvzwmby99wl2u1lav5ok1mstg0a606xkbvwbl77vukb45ro7cncds8f4zkrhmyak0ezeka6w903zxzsm1vry1mujjqehcgtjkzawi451spdeyqswhfbbqlwcocs866hs0b6tce073apvhwaxz3ax8hi2yg0s84fuf67h5thxm8p4o3mo6zmed7phcxwx3jbb0it9v31zqjjdo6nwcntpangjo1q2zm0oisvrqmftdlx6ypxsedeakwbzygk11hnvkmei1ju9hvd5lmhmxr8cc8nrgthm0wrtcu7vpfw9t9lhfq08oa1jp8iemnwhzzkr0wk65lucx9cohi9hk6e2b13897d08m0zbyxbovd9xntnjyq39dj5b9ctddv14643xxpljhg4pm40o5h3gx6z59qiwgb0diiya2f4dpp1zrz9j77beb3ex65iysf4v0onn6i3mhgf0jkz52ish67o48bw1b2wjc24wiw0r3txt67pdtlgctl2xmev55wtbtq7976ahopbkvaikzfgsfj230yppwgnfd9m4bbk9if4xeujs57wy86ljl4he3aa5yul2eraasmxi877ropznsniatpv6thu1cz7l3b6yb9hi32tmtk5n91oos2nwo9zu44tctrwfi9mdqzwhj0izli5b14vu160677i4k85e44waii0ofxz2yjpnvrbhdzb2i20ztdcpyj0z6skvljrxt7cnzuiowvd2v92zi5qe2w4mjw15njpnehuqyieb8xhwgrcatd27m9ih60ncbqpzsmrpzllwq244jam093p81wku0b0ryh9dxunqm8bdxaa37gi2so25w4ryfi49a8i7fwd4hwysgfd9pyqj0pz4jvnksk6tmbwo5gdc1f31bytg7twhn64c98xy37dltd6gbuvn4uawdvj7dwejkwrq38j328d3qmerzra8azhiib4d09mpwn8l408hx2rp31vxgcfiyelbfzdvr9a782denryqx6b23dz42r0npc9sdz8avwfn7getpw62h4lwpqojtrsjog44tljkweqdvax9xz1akxxn4gblcw8s40xltixrskvrpmfw7i6eirmnq7hp188lnbwovr0tvaxygpu8onlqktiq9ttytja4w5ahapiqioo2ykzaa3cd5c0z4gksb0rna4r0nbo34qx6dojinrbd0bs3ne9go2efqsxnxkqayvjxr4zcofec0a6iyhf4362bsd8xkdv46d2wzd6vqbb2bybqac32bgy6msdl4c6rkk7ytktnywug4y1j8daw4u29mt5qhrhxt8h2n4a7gd5frfjg1haojevwt3gj1oy7d46a5egoy1j5suivv7h9dhpkp2rwz0lgrngvx7ekw8szmcb86rkbmklf6pe9yhqicc9629ckvcb6gorkr0tbh8d672whhsdhkpfatz9l09gywecns0fy6l26cl9322wfqpepeisr42kta353hbtuxza608g6s',
                expiredAccessToken: 3730787494,
                expiredRefreshToken: 6511418584,
                isActive: true,
                isMaster: true,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'o98i1kqt2sgpo5zop6txqxp3134l82zjif4hsfeicgd0ial5zy0ieazkoo3d279jd2qx3vm0bvrfetpp7qi5pzn4w91v66q10ccj4vwq3hdl1oiu9lh1domldlbqb1lc84uzfc6hyba0z2e8xgf71m76zngvv61ye377fb6ejlyvv5ysg6s35y2mxvok85pz7rekdze1gmxlhrny1sywaclzns5w49tjilj3zh33e3ekdsyuruwj27a88t2cwf4',
                secret: 'aaixfy9t43q34fldou83pxqkyq0hhfx8y44lbt8f03buwj2epr8f68b441yuuq45p2ji0brcud2pmdn425ftba9ves',
                authUrl: 'l7oxyya0bg8vogoxam2c1fxs9yk3hxalwo816103ajga3u60z3ie4dvdx2ty20mgs8xbpbivwyw32vd4mmyp34q7sopnjnjm2s4wjt8255tpz2axoz1s2wdfu6ih491unq586uzohqnuqdtf758y0q6z1hkxyk3627071rfegoy0ocaroypbo8tofq91b63u5l6l1lmvr5o24dipde6ltlcvvlkm0zbuxjjm7cbna7y0bz0417czzay9vqui6gh5ktxb7ym747v7xywjlirisfgzo8sf8lfqysz4s81py3bjxioakekvt6b21reddslg5ays33sts9dzcy9lkf7g0pte8uq6dxu3fo4txj25k3g5dhw57p3tqm0we1apef4zw4jafl5i0lu5fwyvelg29rmwsfjdlo5s264vwksu1lydjp5ckduhpla7ejke1my2vhscvmrj15gr5sbmb50xka9ikddistvaf03d3x04jpp2ucr03xqdzuj0ol690bl7ik4c3eqzr1ors07dzd71f6e6z82cd9s1ihkry4pgg447ipr6tb3x2gzv00bd75cji2u9wxy5apqhhxayu3zmlrtr0961f9omy2xyog3sk1ejeky9n3ewfw2fi91ld6eohmdz5c9auh7qx0lnqe0s435uhlmi88886zy2lpzggwu4yupl39uv9uhyu8aur6hauhuhlnzicqi2xwptgpz4yhbno00y7uul91szpkewsvjhd1zr9csjnoqixd24dmpp1at4b9yqaxvh7u80kwnsaw5qhnz49xykozoxqv13cgdaqwdi0jubxia52nnzujtxgowf432rizhpoeebuxlhio39dt0tfbp41vrb0i6rag6bt4hksegy9boqwvqr1qsc92wlrv3lijm20ej06axundd7s5sv6chjy5uk7wfvd3bbzns0eoqtf9gbiwsdakj2eig9zl7xkvf3zgl8qi87jyqiizw1k88sjv7z4tcso9qs8yj9pgobjv1crpd68rgtyz7q1tloliysufnmtxx8pglbs3npfxgnuv34f9sa4ozzrucgwk41xfi4tp2svn0tsihe3wk488tjun95ifna0k1qwsg8lhiniyrb92yhimpy2oacgvloequu9tpu9l0svk9jvf2tec54nbt91nm0r9xsmfa23gdr4lbmfjteng4rvyapknvqszf1et1ftacumab44aurvfmjzzq078z5s8abtleoouizowzphqwlojipyfac6xguy40vcbg26v9ulutdcmz872ezxrfe4fjlkxfg4cnpqvbtgylfh850rr3exn71yxi976mbrbx65p0iet1yrlqsm3sus91byifnqyis4yx0tbamdq3mwb8cstxdavyelme2lit9xxpq70p2enahsogl84121dnpvobt2409pfatfis3qcqxgwh2pphb0d2o9k9q2lfyvmrt3e1xcq4h8gj08zbldet6x2prc2pecz59qp6m8d15ic4ncl5wcahn7rkn58bff3jyqvc2cp75qxs71qj2yx8gc2757moom2edb6w8tgry71qndqfeite619ql3mxlw4mlru8f8vwfwjjznh9ya14av8vwnjz5db0ttj7bxjt8esud18kcekhwhdyz70xab4nzpu2vmd9q7pki908y2dmhujgvlp7j5w50bd7ik1c1yyxbr72hgl2nfwrcgiioamdvt0w1nfh9f9skorzlca2czdagah23y52x1dyxatghqciq68s5ddm28ok5w9rh3njfmtgyal3b4u75j7d9jlwo497u0sl9z22sqkd62bga0u1nhx8a9qtnt26fr01lhv9uir4hijex0qvyqz8kw40ju56twtxxdijddl8m8dlci4ovm1ivqg0kxnj99anfdck6gf8tgz7add9mss8uha3bf9xjhsva1llhx4vgi9uqybtl83vgve2reu6s4pf9w28afckwrp0w3il3mfcobqz888tyahiq42uzi4tbnio3u036y1v1wenzmm8m0nj8cytr895v',
                redirect: '9nmoggw9sdz0vb4qs2elvcwmpct25kret2x90odtnv4fhkmolkz87bq5ca2bokvjpmk4pgu82n4vf79m5wl57je8w2hrq0cgwuglkinctam9q3ianjghef1ua8h0euzxm5ahhoglg96niu9nk6c5wtuu4z9dkd7tdg4nmigaynkevfuqk5giynzu0f8bv2b9cf0h3fyat0qqfaa4vfnbdtucakt51pwxvpetwkjd85u5k1e6htcuvcl8zyo637d7qm4patnce269v79l1lhs64qhqnezha1etugdsvjy5mml3oic8n2qa2jyax2w851w6ntmpo3ahlij3zj3awbpld6inmtns0owf8z8jhab5utlhqxdemhe4m7jzlj0vpaakvtcwbvcscmz1cfbghsj6ips9ra22y9u1ew82o1g1kx9yn33angiaj0x59ecqxgpyl3v1vxh9m21kg6cd6t2dbpr902nqowmly9s8f1iph2zskfmaroucubcv6u44kmnenqs0s3ttoplpfnotbl493c39un0qc3z4qapfj5miav59qse5p0o5gadam13dagc70y2td7qckrc43qtd0twhncijsb1875rhxadz95sv6l39skyagnq6wb7u8qrup0emz2gt62pccwp4piucl60bkr431c14y5rqmueiabpxiv60q2zfoc3k0fjckr5mggfszp1oy7kyra6ps29dy59wp66ys659rbrh7jluw5x03nd8ka16cqnlm1guyll5b8f7nzf64s7unvhszyfsr5gyvsham2vrv4cfe9bki3vew0351f3y6vjbif1mcaf8t3bf41p6hruh1khbqrxhyayagyapbguleog896fr27eafbs28m1xsbega7gzr0riniola404bncjjkou20ksr852f1e6ewietwabps9qt05r0nicfku430q6zln83970yf8nmb8yw6j9thzmfkvfcfoyh3cjmg7f54kfipntrb7as2ylfq2vaqssavcdyez2x6jn816g5l2si5klmcnkaqxxlg6gmxm4799ceef3e0yvnsfmpxhc5xow2eqbpc7e5fgi9jyqtr7n0bpu9ooajxse58j42vqiit1of0m5217qx14etru5qmwiz418uotrqm4vl8ms479t3qj45afqqg6cbkujvpczpopo1bxvfzsilv4c227vaby3ovh2gwm7fli1pn96bkykcs6r8y7qcwq8kzqw0yzhdqzshkdn8kxif4pi52rhhk43vytn57ez61bas65hxlj70sjx8hphi83pbd2eq0gcg21f8heq7aleqli9wdpfavdk77xy0mywppfgrmyswk5di235g660ptu8wkf6dem0ge3urprxypi2o5ljrm84crvsdi8htp2ymmfwbrqwpahemrru7ufxxhwk6su3tsph9ykjbdrncw9d2gmnbxfd00nup3lwwnckz6yjd3n3zdp03upasex9pb9gl0isgormnbo6u4n9uv5r6hmsjne2a8o5mpwz9d552tgzfrtboy8nym7won3mwu3ueaa010n87canvns3zwongp0zmox2d44e21dbjau401zramjwiuf8jl3s0wx6jehahgv8ssj7t6w95knqida3j84muuw1okyal8ym56g8jt7q3qu6j7dc5oyn6lmhoujffofqmrpey8rysuq32piu0841wthx4mzoy4fqko347x6uoj6ylwe4cqcw8hkgzeztiait78ljm5aptqh5z5k6xhhzv52rxg3inqwme6jmhboz63n3msq1jgoa82f8ubimw1sycfrktk538n4qra87cpy5u62dcpmbbb30jprr3cds6s3kimh5v1zjsfxyb8dngb5l3iu4j9cf7iv7m8ity6vkoh2gvooooyedqx94s8897ox4gz6s8g7l0uirtsjpx0wo39pz5zq5eods5mrn6q6696yjtbpqp52q8dpam94jgnuptdn84tc03km7u4ufn8s91rwcy8wm0t1rw4mpr3g8etwutfe7u14nb2ja3kf',
                expiredAccessToken: 60502522516,
                expiredRefreshToken: 2774465579,
                isActive: false,
                isMaster: false,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'AUTHORIZATION_CODE',
                name: 'sg10g5dov6tjqb95oejilpncpj1pbalxlx4aynx70x8l7o5re1hf8dfs9jb4njn7dx6b2syce5ab15oo95xwrjfn7qebnsdylg0pjjae667stze8fmlk9tulndwdjvsjinbilpmipem46di8cnk3p25rxndzbkjgpij5iulqxf4mc9huchyjlahmcm3c5v9ayshl6h90t16o38eb6kbm7lw60z4wv276dqindwqqfigg21ggaj1ak1hp88bo04e',
                secret: '6ke2i7v26emhmicwn2tqnzi64ukfhiakpacmcuun7ras0cg332y7j9gwx1zk4pqn56z8d5l9xq7ixntm3unnqb0v8p',
                authUrl: 'i4fzj0mxm85gt76ai0uvwpoboxvw3cc2vool1ex6yp8z8tydnq4ethaqvmpus0y2123yjn75rlqd1qujif5gxjlt2f7hgmdfnm3t7c8fbxfm3lvapw4ph4g0umo7amewf2fld9fxcxarxtn8v5t6saoj66ike4b7mu4psfv2xmcmlbcjwk1yltdms2qzbsdk7ive3exwxqjwu45ymtltrh3uulqyosgkcqr2mrl6xnkdp0vvvj2gv2llfqwbk5q377bjocemhok6amq04uz0tuv9h3y60n1yschc3khnvbmloyows1p3brieazu2dyrifxk0up9f0rw837970lecdcth1boiattx5iy68fz1pe4e2bhn10j9s35f8npx14dlqzubcffuuhy836hrrsbjqk97vk9imm9r4767bx6cwratfd77q8tam2qlr8kszgc3g2sfrxbyxo190rod1y75bu41z3wx1k1blkpsirvegbtbtb7qrbs1sfw49kctxopjnw0gkh8dnfeb41t7xmtimquzuivb15wzmtct9lo5wjc5i1gt1h90v36bz749nt0qxzxromxv8t3sbyxs6ta022osi677tt6ig1t63cba3sxz8ay62vjapq7byjf5jj19hwfihbxacrqtzthy2wn0171bozcoeo481921nll65pcz08df0p4ywpoaatxvot7zg6t6y2r8z69bwrq2pq40clnnbqj3bls88o9bvqb03qedadyy42p4dxl2iss3y3eb5fbc6x9bltvlluy0axyrgkqph2v5uwiuaxm5yjocaf02dx5h5htnykllzbg8ss8v5vysmxpqs5hlpg0qjzi9p2t4ckrbyfyj9plzx3r8memn8drf3vxwij157fvo9fonww9ink9xg4cxzt14d64fxlg778qrbmyylphrc5flpb3m94d13lg9frapclbx806hhtv3ck761jakv6hovaievht3ne0f89zcvh9xg02t7vlvv494xrcd6a77hwfxfvebbvx7jq7s5z87k9o8spxyjoxu3611nn2934rp4ndo9r7v60oafg0dg9gmsteb4ak3a7vdv7j1yxd7q4wzv5vazcf5c3mg5d8je4i4ty8witvw0wcygn95dphiibgkeusvayf3f4espnysbxlqnfth5e7sgmlpuknyvgryydxpztbt4aqs1c0gepx4tshiz9gg5oys60aqmut7jz3lj8jd02ecnunzj8wq2he0fa2l6appoft6s6ez81v0u9qpdrdztntnk9335upa5997gj96cam37qlaiup5l8uxot4icm29idvvkg3g3xlx1el7mzo1ni00ofoa1eceig46g1sdocru0f7zn5h3p6wwi3gmsi8q68zojd077ix5uxzzgawibjwlhj88pitpt1h4v41fe9s099ap8zdikf49zi8scj43yf0wsg5f6rj7rcbzq9yas67vd4mb8jcty14ek2a4et8lvuyjqm2d4dq2afkcs8vefpt54vzuwl72b7jxnsbz45u7p9gnbyqfnoxg5tcjvkrqm9q14abmdeshw7ozuokwy7lb32fmdzr6favb30rsg4nwvff48a53xhhmeccg203x79p67nzwfrrlkkvrftuyo9uai4h2i221az6s1aqnlvzp5axedep17u39805c3pp7ft8ej1apsh8k9918zel6cu72j6jvox1ir0ijvxddbsclh8dk5gsiq86skpp6kr6xavbq64h9p3gyig0glzemazgbfh3rifs5nh5daxdtjescz6z5n89nppofdqzgdyfbw48z9s7dyey7al4v13485onkes68ii7v7ktbold4g3k70fiy7n70njwly39hby7ezui1c6a0w7njcq2w0j6ikke0b7l71tvtlt7mtzd0ki59xi35scs60589z54j34rtb0jfjgs9nacntyvkjh4apdua31wo27ayy9dgcfhp99jw3q1qs2kk9ekrp4dgcfon9ur3x9u257hpxicpjuy4w3x9i8j27zroa6jilzrz',
                redirect: 'q7bo8w6o2m5m1u98b5ao2h5tcm0l53rsfs5zj9fkzqx7z6adrrqww17cahufbkxby9e3kkws7xrhsm5t1c09geplwyq7dfx6fs8juinwvoylbexm54be3d1whu55dmyml69qbz1ll4igmmdh5j7qr0zoiiwlqg43jg8m2sye960hqqeip7wzam7ontp47k584bhvkfwyq21ary2unurl8b6bufedua1v9vas380bicpk9pdvb9wppn4wp68sntxl6pe74qzl9p439qa87aqyo4k85ynvfzq60mlx4bwqx83swzyiwpma6gdm53f1gewzlubjrrrv3gx5s42r7lvzeyyrwna1b9rf2l1otqwvlma2k8xr4437uitvu78gfsla7h7viaegl9zqix3cfmxpfo0qiqpjn3ljtm3g2ape2e36lu8yrrc1gahrx8mvv66gqpqb5swb5hggizdicpl8h2gln76zjeyglw8qzporzje6f91cu70ygszr4vj315s9r01wj0ybwloh1s41uomvbiedjnqnuy1og81x4ah3avdgj55rs1t65fn676kwjlgeclt5mb4t6djqoia226wufdbpxdiguty4vvjq76rwfzmv4pikxpyndxk3mnl91rn4n1e6n4sxxu87dhb3f1ss9du5l149qh7mlewgfxvvc52awrf3xquqr8vvdssi6cuymx6kzwimfoj7yeqo09ngjfu4h386w6icki6i8ucpqjygcylu274gzqubmbrxl96xmwxbo1n7i8hyu83vfq25gpp7vj2qne9poypgy31cufduhz1w0xgail9tm0sxbxpdcq39qbk1yab6649xv3zojbt66q80zpp18wqgt99y7wrdul6ky7upjcuwrce1fxl03xsj4t3wt55vd1kjcips4eyrbsc1xavgnx8xu5a2go3kt8xsja4lwphrq71vqg43b9jm3gbi94urapj4u0a1xaa6f4i6sijr9djrz249cn9hnrip3hs1ul73shgma4zsah52swhyj30dzzzfwv2qvaiee64oo41ogyqm44c3gbdzrsn26wajileq5lhj5fy8j36o4s6zoymy7vgwbj7sojlwvyral91rsdp2p4h2ndllxtuz7rjztzzutpyt35vchsi109t6zz8eysb1sscl0gkfzopmkc2nh11umxoc4kgasn7mu0sh7agueeqc0hped2jtdyqnvjy2mige51taj7hzr6re7v08zti4yyto61kqys2m7bs2xi09q8youj3hwrlg71ev8c0a12hig3nczy7cxp1keano7frlkuuoae27c3s38f5ynoyze0ygpi6b8jeq8bx6alsmy69637rw9iidwqy3vdq0tx541tj0gn45nnofhx7nkjir243wz12tgvpq32gdw0cmsm82mze8cjnq4vqfrh8z8kiaglz6eh8zccihwdybm9bg9ptr3n04t40k083dvflhp5l74uh5jcguv1yaqj1trs5ddawikhsrmelaoeedjhwpdk5ggmmrustxtja9e8zlkvb0nvt9xjfphov9272i89aeeaxpjajuarsei46588q2dxngb52snwejm8avunvtmfwbt6ckame2mpiwa98mtm5km6ln65i1dofujkryhvvvinhi0twg99j4fp1432tz4ygf9qy5q4z6wozbqwj3zhiwzzkq0zdvkvfcmvzposq4lvedrrom6fyel5pbc49woxma37y8iwrr5mgartds4qleo4ycmm99yb0u5zpvps0gt0tclr3dr03vuee6e6c95xbgkpajhgujgg9ktcaf1suryfcat891v4t4z6ij8ipfvksk8g0rkhw50n89en6ru36w1m9pz50bs3giqhhb9k8xzl6imbk70pfzc3lf68cfbjzmtnhhpx7amyphgkvkgw6ctwirhi6w327wlpat2lqk10ogvb40fu1plwxbcllpjsjitudrfkwb486lojb6ta6327yvijlowcojhjk1gy84v998j2u3ils42j1eindnxycxbrx1',
                expiredAccessToken: 9132040754,
                expiredRefreshToken: 87868134507,
                isActive: false,
                isMaster: true,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'PASSWORD',
                name: 'z14otfdgghehw88m1le63d3c4zubkj1hdps5obtcd6tvv1lvcqr0y5tdnoocmapn6i5h3en6n6qw3xu1yl5typuuj97vfetx0ssyhz3pkochb76pbiijpvd2pi7bhx7hpbpbbceb0w77fenmqelfw9i8bfp1s66w5g4l2vqcjdnlgtddutofjougkqhwy8m1vnszwepna5t31k6l5ex1bw96ixwf2996k5x8hb0ur4136ylxew2mngdtzmlx6yq',
                secret: '1sxmmh6rrww08d7wcep3gi4261hd60hlqvcati8y89aznqfrf50jirpcht7888yyfpzhw60ja0xtm7dql7524rzi9b',
                authUrl: '6gw1kki0xj8v7mnstivr2vi5rgsb65igcwgb5907lff9hwjh1ke3x3bumyu8tt3e8nsaau8vhzr18fmxyjoktz2728muc5iz62jdztrb7p0dcia7yieww910kj0z0ako7kkitnivz8x38ejibj2ilnhsfq7wxyqmxbtvbm4nxjvr12epxqyft21dcnhb5xe1r4fp50b2sz33xckdc4q0q03edhfc7dlgukhrohguhg2hbqp1e9uqzlpo704chdcb8kfq7hzr57t3wt79qyig66nscp2gs8x5hqpwn9igy54vf2p6q3r7t1lo6cbzbz4tzm0p9bgaao5fhu1btob45r2v7nd99cis1c5hi0614klfw8ricsjqvtqkf6kc4oyf8b2na99chihsfro1i21rlnyd8wpeqa1ua86ddhiu73np8abwczkuqhfab7pcd955gnfig6n61o4bwm1jyielr4o13ge1gbp8zzypskr5uucuj0xofszdf5qwj8hqx3582lkoq76x69pxtcc7xid8za6jhmzy0le9zj2zuk9jmpb0cbbjmlq72azev7fs1qkr5tglgxl2wlkejhw9s88rf3apqai1y90qz188njum8n6bcuvw2ox4c77i6irmjwzi1utg0v9bw8c4i2rev2l977x3yrup1djgk1gzbjy392wif9qc8hq6f63i7i2te0vginmq2i4uzzi25hj3g0fvsn8phc5ddy4qexqtcqd6qbg040l0xaqygws6seq8c8m0zhoueceibsav3ld1zd66kdv80h65d2sodwbspij23hm17jvmijxq03roig3pi0lo3s7azfwgszzfidv22funa8xcoavxdco4f5bbc4p7xpg3ib6yzqvpm3gm2bjqahaodook5xhdmjqk4hbav4arhrrlmzzj2tj09cscme3zrmyh8tnxobmfnsf5axg33uwy1dfdke7dj4jpimwkvyf58mwlryzjwqxxsdth02wo5b26u5c6pn6b0c09h4qgkq5ob2qkdg4mlzz0z42ptsz41u6n0h5qwt5lv92maqjgrqiah99xwcs47km92eaekgb6aa17w0cu45ra2uirrnnkjcorfzvtdu8yzujdhcrhaziembvkqnblqt5w9cdfxioh4t8fd7tzcgrr82k3efej2yteaxt838ocpifsjd9y9bbjx2lsu33qykqy7lmqnwlahid8dtkpmxa6fzi4x4qyzn4xvx2n46j2h0dhqey4f0o6ogxvjs09b1opzcalub8mzij2la39al6k9txquowudd222kexx55hv2yne0bt2lbhvut5thim92w1985z2vc49mn8uwg66d5ec04sar2r5y9tvqho6ayo00beqlpcsht1pgx7nc25onzhx0jsyhesilhjshr8qad76whlvesshw764jxc50qdksur0q69sb5ivde7nlb7bkwr0p1iy9tahf4vqwcc6m4ejsh0k2j5ynnqec15cmq0oyxmqn13ofsfk0x7tw0yzkny5k87m110e7rr86h5pzbujsamuo6t91yam3d6w6yw3xwspzbc7il4tretk9k935tiah1lyr5b83eyas4a466rh7yulsr0njgnm8fbpnlo32i2v0agj5m0gwu51xnx0cn2ej32peza2p59xt1g9ci3jh53cab30ta62iyfwxd7iltvnmmqjtji6d3kawh4z3kcoydci7c4vw0g9m861o1qe0xzl837n6h49avx39naecwtlnt4pbm5yy87f29b1z6smrpk4d73wnhj7evy2i1fgu4mkcj2obc4fbz4k0k046xypzl33npunct9hgoefok3gy0cfmv6qcarjafrbpeitwx5f5hr445klqegiqp9yducd3hpdt4j3g1eoad2fl2b90zwli4crcadve23bjfpovq5vxyn26wwn53d4gdz26yca0798r0d17ehbycuvfb50qziaimdt2d8pphzqj7gl9oq3ygjdkklc1e7uk20p7q9oj7sewk0skuozafhmb7w020iy6p7',
                redirect: 'hlkhdtb6go4fd32w8819nraz11zxyb1nmwpruz8ddbeafdsi17mz1dy8nu0lq1ncnk3y8h7wc0d7cg1lt8zffjd8w97ucwrlahqcx9ytt9ioqb00prxwcvttt35udc5q0c5pgp3xl3pdgddj1suqppbyc7353jsf8xet3z59so8crugdmmkiigwxvt49xscd24swglfvbxtzhgur71q30ohr3ppkut13end9sfvkq9mwgk6cx0yfxyckl9udn67fhgk1kvfsgv6bv7qsjzmn4gst4nvn4apm8eritf5qpk461wxgtiwj4jz0a5majse5arjqjrx457l2oe8c6cueu1kjcgl4jd7zvsm4vyyiu78vagk5b5biw37c57ve6bisxbfysdt1kd00c6ghvc2awd9lqsrc6jymiegfh6apmom2zdpszrqar8g40asqw1z9jxn668ls8sst8e3wu7cpoj4sib0xquq8rq1iqdwtnet9sjevocvlyl2rxrarq3imrd3d9guk579n8x85jkog6b60vhuk0bbt51zekq5qpdp96vx59s4ick1j0l4bvrbrmx8emqhj86zbrd3llcm3ksdmkh52rx26r54a4ik0ppsv3i3pmuergndlcanp0f3mjjjwliw3hmfritoj502q0hmur2d2dow0m9idllzovytejvd521aqpewespnva3rpro0puf1u57b3xc6l51k350cwt87dzz15lvjvdlsg2gyv2d7ryw4zwvgo64mc1uaxot2qd3dbn9zwvfuv5ib8mde6ci0n6sfrkw13uyj2hlu55n1tpvrqaee6ttnup6d7wovavyzdjola74zpiimicafdakdjlduferynvb5j7b2oi5m5quo3sovzm47vn4rpyykvir7s5brnb8v7tixta1aqnlxfqert61hgcge71oi95tucjx88tjxs62ht7t05wtqberty5tjdd4ej7n45ewg3m83wbbjqz0k8g5n036wb89q3b6vm0bql9bf88l7z4n9gufuf5ybptz29i8fy3g50g8oszkt5ywmvdw2z3s6z6r0l5jsnmw9hbpkvtrjiovymrntfk046sovdaahbbf35knbhva4xwrdy0gr3ao5uakzvo8l9dibgz81sppqyp5cujoqmgsdxps4uq1cwk21w6be2zpjvked89vzie730q6nragppmvwlwpucpz1txh9mm8b4c1qn26xof9b90q5tc5zgx2cfx0rk5tl0njw1uapiresrtpow1urhbuhwmbpl53k6spwpe6jfd2ngzkfkxfujllsey98rsu6dbvx7q239fybmsuyzekz3gd9gikfbsqz0rif9e07wxulrvmeot8hmulr62ovbdjbjb6pe08cr3t8cr44iotoevdge88gg360looz6lf6ngzmvqxzui7y658v5m15m5pzsrg7wkmhivedylp9f9i9hbs6dvtdrvwzb4ctgbptjkyppb1vcy1lpzk265wgomqblwuot3knpxx6tbs4owldfvlqlxj86uivfuos9gctuqrg48lpavlk5hshyj6nllq51mas71583ql4u9btbd07ubvdmk19nw2nhyyc70zv2uuebq1gfdmeicu42u5pndd6x6yddclrs12ij5523nz7nvj441w0xciy6ogj7898adw4zcg1ntfx1itqr3b8hihf8yu5zkwz06fl1gvpcax0lb4sc5itwlhej0br5m9qdb4dn4ovgrt8nhmvm1n92oap1pav213voav67dc11fmz0pktvf2xrylexk4e33y5sjx5svbvt8jbfiq9uh901kiuff1glr2inbr4nlvqxev9hmm9dv4pd3z9yvrx87ba6882h5l8dyajpxfjroltoab8r8fpbmyiwfkhmxu0oi843et99s35wsqemo3lreflealzuos4c621327xrkqv03w8q1v3twi2euxdb52zvkgc2bfascqw4eknh4t87zpmlksc1nfqk5w1vbvbsmimq10dp159zxea01d66ipfvvjlmhy3r',
                expiredAccessToken: -9,
                expiredRefreshToken: 7376827609,
                isActive: true,
                isMaster: false,
                applicationIds: [],
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
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'AUTHORIZATION_CODE',
                name: 'e2snwzh7r3mdxzh98ry2emp29aff8m6reavm9a4qzlrpxls3wguid2fs1lbcat8oh2tsoo3oitlk9f1g37uhdjhtlcx75obq73pvxp6ruqr52jf9dc095jz5r6f622uqutnwrq5v2l42djno886alkn2d3bovvdpzcce9cbk1uolzse397xldc9seveitycc8kdzbeweu9q2a5xzq83e64olsyjsvnm1p5lo1zztpl17jdtbkcw9gjwgm3evwri',
                secret: 'kqkbmsmw40mujvugb4wjlwtmc64i62comloioxshy5fpvchx17kl82jkr9t7ty4qt8bzc27pnd7lxiynbs5nntp6wu',
                authUrl: 'pcn56sqj9syt1yl31bj5wspo3td23mlw0w5bidzupzpc1r2nl7l2ai2hg6kp8wf01ifsm0digqhjsw5wowmcgr9z7sqc6c44fpgatfj18mnzx9jw4js9ban8d0bu7rl9ben1msok9hmfyyzhedu8p5j35uub1kit4z8k6wppcijus7qalru6fzceidxyzdsgyozpmbu5mm96fwx59g8izm0ds7ozuq8vdr2e5c6cqhqobc7lw6m02vqfrjg9aqt4nhpetsquqjkiiapswfkeri2vm8v3am6rp4wr302jsn7y2oaaa1bw4e0cdeh277s6pl674bvf154vcs0ipq3bdlbtdhvsy8yts45anjoh41obp6e7wvl7acorq844qhshaq9qipsj80kzfppknclvehutr4roy114rv74wpgfh8a43gm1l2s7ruyqt62m7g4rqrxicaub8475pmvvqjrmdd2o4ldn4hub6oiveicxl33quj9ffzikot5igd4ops1dsfu7bwp0ph0m0zp4rq7vbwhy54t0ibqn4jhrbujoa0amqtkiyv1wamupr00aipf432r5cm00brio4s36nelvp16qmojijjdx6hqrnyhgp77dinslozb57nr5fl4f975izlrhrf3l4slcmpwj3mcr12xjjvenn9beb49j78m2fnyxefunieqwsfcdg8yjk7ivwcn6vgvp58gur46spjled7oui05p7um6zd3eb178xklvisg6u6ave2qf7zst5quzrablrglzbyiqbguln62tcmhg6drudffutrvju4ptgw0mtkpc2wnd2ps5djcpfjo7bva8j1cdo94q0qg3kslote7be6dp99rdwpqdb7bisidym4dzq30ojbr5uo79b4479uq0iecyu7pjnxkv2wpfdblohct5vg5yrdi39vx81ogeww2nlxrkwa42566jnsyl6edtgba2tvrul3nbri4xqo72hgwfpizqal5j99oqgerdaxn034qifawtrbmynpdw9dhu0h3lpe2ul1427cfb7hiwb8cntxpgx14cckbay0htzh2g9ac34qmytmn31luebsjk642ty8tj6cwpmycez821slrxrhwdjyc7hlr41hf002wb58xgkyedsgw9ir0qu21gtprlt5rehg7uqwxi7x194yjhazu4ksrnyurf28ozu8zuxs05pqnfsgnzb61n75geovsfh4azd92ll5rj1p7nw6jqqp65bx279hsjpz73dfg7jzf1vcyv59i9bgwblc48gfs0idh77cdchhhilubod85ee2lcq5g6omhjatkt6146tfnjj1yy69deoe06vuobilm18rtpp77tvqksllfvrnw01x5bs7l7ysjiydvdqykd5bm2351ihh1wxvdrfwhrd5a85lg7ozupfce79nd5tcrah2dyj7s34gl1fz7v9nyc8j6zk55is8ts4h507x9mb1l4dhz233u2qth7r8osurc23ig7aznj13jwylgw8kyn21vce5s2sbyjogyqy3wrv0c4lv7cmgkwtsuqqf5wq38zybocxwkpjnutcsuke6qovtue87sayfgunm9b56p9fhbj9xp6rzlvgn3vafrewg9z29mtrjqk7evmgaye9rj5d5mycfkv2w2whcrzvmz2dyry5v1qj5elnri1lay2cx1ymw56qq2mxfky706e7ah7b4k5bmjgdor22wz7vmh4425soktr9yos2fr1py2j1uq340ub2gfidy72g1ipzykk9hg1c2rbccfdym9kmjhj0y1vsq1ga4isgaz1tfdurvgjfpbhqymr5y7e4p652dwzvozllslaizfdprp5qivwdw2i8iquowggbfewpk33cp1cifwrflmxpkg8aey01xh1gpc8xrf2rj524h5e14p2qsd1b4wz0paksfcsezcv3cw0h8uu152bx5knaxg9ur59n5ljx55zxekhxz9dsxxmkuz77ia0hij1blq9wsz23zup9si8lj2qni8m2pvipkhua4grijnl9a80uwma',
                redirect: 'gxewy160nmg9q2xqp6kiggv11tn5vdy9c2ud9wy981shl0q9pejlvdq1pie1r6umwx5mqh4jjft4fa1lvrgp841ppy1homri743gb49q6nct2gh5mzgbxu8r6kjj9wr3gxtbldwvzdkek6t0pmc8pnxdln91cqg89ddww7oahd9tyuf3nwdxci2f4v9vfuery5xf6y3jdfjf5e2t21p6m3pssg2cpjjzppu483tbn2cba6e2rqarci7acop5yykzkvm3pye6b8jpijqsw9xdgc3jsw2schio6tua3lnp3obb3t1vs5byepilyuo2ccjtmrg13gsirhr3kqg9ff4i8x2nfxxpuzhixrv8j84f9rq0cp0v3nh6hwh2m4j0cy8ki1ftn0rneglvh3vxj0zw7xeku1ffipd0xml0j90pce37szujm6r8ktus43y184vlj21s8kkwy8riyo6uutzvefjf5oh2r2inet65zylkt3rd1mm8e9zeya5nkrbgsuqmafsmtfawl21oktjz5571bzu45y69e3yavumj3mpwvpjf0ee8n2yt99v53sp59bvwe25807gxvevnmrsj7u63mi6msa3xlcq6zbz8pyddh3pamdrmt0q2kc2kh2pttisg6hr823pi4ltey79k7mec2ynd4hu02uzkivjvxne8rktta589f889p268tp2m43yvxjxwuxpgw0f0nlbfttq906j26l1kyjc6kkr0qeqd6j6oz6ucdffnnd9qg5ug29r206q3whly1yfptjvytvo781jeyrj9u1atxxjc9ut4l92vhrrzojdhyce1jnrcfrcdgvnohciwjpq4g0paxjt9q7tduuzknwocle1nl5ldwsjfcb50aed6dby3l89y8olepdajumibf9i2q9brvq0aqpbst7g4nzj9dwd823j5h4rytkb7o9d3r7h72bd2cl0p9skc2lc5lnyugwv55erwbfl31eaww59okiqqrq96cd3hme0rugnn6ubciwu3y6lvkiocabnp8077yc18skep1kgx79ivmae3jl5lcbfgk9z2vxf1sswrvq8616onztp6fw9xlx2ydyxmcejilajt0ktwxqd6s5l3bgop5fesi6qon59vz1sq1d6lqntrw6bowv5f7oll3q36q5htegk02eie04yq5i571uj0nwe97kyk14vltnrsmfdyv7suhsald7i1n7gidcyeh1wl4l86y2b0aor4b6gpogkuxagk3jgzhecu6l4blcjfpbue00du4jlk23r7k9xj1vdm5qod28xhk8ro1n83kr6r02b1lty50pq8x8t79l3zwgnqxy5yeurtfd4jbwbmxqtnrfsdooadfsh7crzc0ybora0ru568j1ooqb8eljyqxjklod0wpru7bo1u0miydirqbtsctxprualylh9r6zyzrx00stles0x09xf59qihzjpj4qipjhopklarkize6092oq5zvgsqzx7t42yl7h61ni9mlxj52fkex96rog4hpd9c2m9e1hk0lpuiahldstxzwt3u042o8a465fxlbt0xf4fwzujzvt0xssho0iqedhy8ve2xc2wwvmcjyw8fbdcphdwh7fzneodsu2a9sydvzbod75ga826f5ordo1dz7cucq4msjh9aza1lszqsy9z60nybgg5848rkb3aephxt477klf4indv4n4060yvx64y7zjw8nd1s15je1ueud5cgjsahsiogx814q0qz2084k9vfjse4suyl40q1ip0lc5st3t0jwuew16hmzkzjwslrgqha3ix8w53uyr5j0y34lyv8ry01nqbq3qeeiq2i0bmyq57i65f3yxgiimkbielz8v2l5sjmf3m9jpqsbe9ysj8lutz3phg7n0y6jny20ri12hzlgdao3jk1evbcpkul9h7jmib28ok27rkm0rvnvckb1u88e6yxoxrhqh4yn607lonugsaogw502ogsfsjximsyfmcl123l4ugl3dxo9l7cicldc57gtpjv34haqiagnprs',
                expiredAccessToken: 1720388835,
                expiredRefreshToken: -9,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'PASSWORD',
                name: '0u79l2ulj01cjzrncg1roarlbu6hm075efsep2835xzi2lt4e0eacr0lxvd7kjiwyufktclf1u1gozwrj3w2q4prjx2zz70k0cwy6g6uz90e5iyeh1z0pq5i88ye4sjpqdi4nmhs944zstr1hbep42kxcanhgirnza01712a4i9ftukglxu582bf8hd7ibg1fo4m57dnitbb41kqdllzwaw8pc0ekvd1fu1d4960qsfjn741vrxifol3p43vdwh',
                secret: 'olikrz0uca6p4iif9y1o8avg9z065x33yht544kj482h5jzalbbc38fpm0rlikq9vcdb40l9c5jg83avauh0a83n16',
                authUrl: 'd4hj6c5u0h2clyguvg8f935vplxampnq0qz6z3n65ddfevf9c5ohr149lysqk4rc5ceay2veh3mzrykfvfad7ab8rykwatf6gkbw8nn6ojuzpw6qpxk9epg4tat4pdqwh0ftu5tsi5ac8ztg6qsp3jlvlredbdeits2tghfosboqrae5z8ltjufjihp7buwzwrt3i9k7e0kr7gtslqbhnpx648zbjoihgufsx8a479e4bvtufde1wtjvb49yiqfpie17iy7tz1jxh89mhw03ifrnknrdo7w3cy3o18rg7cdtv537mbgafbbpebs2plyizilak8w0vg2ox2pb1g5rj6wu6khv13ap3gbtnz40ko2ox0opi3j292hhbzbgy4gsk6gwrtop8ruhv8kcfr8v5viqoch5vl6zeff3x8nvghxzxola8xngvbbmyueanjreh9alfvlxxudn2ng09jjcu2n7n3fsyfgk6bvulpdzy2ocnkrh88reo8v3n59710ak9ap7tuxj3q24typyf9fls3k1t7h8uof83eem13gcrw3ppfsbjc3aq6du6dljhn5w6tbc7vnvm1ibwau554nr04t9gpr18buw5l5ymnebqywgg7qkxvx9y1wtf0ona9705zftf56pcjy5qu35ipa25x7x1b4vq4m4pvdzta298uekwpyk82pi0k1sw5k2v7tnqghq9vsw615h3lx1j8dmosoag04h3rz4z85ovydfyf3wgcvmf8jbx2gws8tgk7m5x3rxn388oco1ss98e4grqmfdzalbhpmfu6af1usszkwvugz0wqn2eqjjlisw6wxwf98kqnon9cjzunfkcnjxg88sbd6mcrqairmodpkyiux6m2mypfk7e3r3j9lfxsh0a1174npkc38wipry5uw32k8mm5413jg9163nswom1lhpkx6tuixhrusiqdlxb4cqggevdienoh2uywzdakiczxb9r7evq8tpbkrbbgthxcfudhahv10pzfd7o4hlhdiafzimpb64cja5euuzyf47lcrd1ks3ltcy7l2zu3citsatwxtygma4q9n9uz1u17zino2gpzm6275uz23gcm3qgsswyrehdqtd9n4hgm8xpnoc9qx5i18musrrxtnravkpp30uttozf9oobbwhdbnkvurxywwk9ttgcrei67ku2501qqmnwo68ucoow3ubxqc7c5shgibxim2pic83p4eewkwpuv0zydnptxxusu0l2g8nhq2mqnpj65iy3rekq0fh92ba4yrttl55ylstixmycbqijdxgdni99c386nrumbsugfevmdhgeohyqkpxywxevp4akbrmh3zbkp11cob080mhgeq5sj23e6ox0abiyxnxmwsygxasthjsz0nzket0zm8spcaqukgax5cvwpmjyhhxn2e2majc6tiavrkba8mve0yvc78jmryzu4at7k1e9rhuuaird72akqghg1k3miyp2a4hl51ponf4vmmeac71bus7tf71teb8ucwgjs9zwcm1aujg898tjjk725hh99c1oafm5gy713do3s5orw9ogeohzg8zfwd5pvc0pe4ffv8lzyki15x5a15t2lvte1hhpk8tlxlg2ksegbj6cp5bhgloe29ah68b6kpw8qi4uu5nwlfvsgrwc2c2i0m2wi9x4ax6qtn86bq262d1j3xj8yxfil7u7if0jbl4nxbr5567r0hsw8o26y5fwai85c5z0pm8n0lkzgcj6m6rdk1730rufarc2u1ahwg80mqkg8ivrevrem0rj1gw8rg8iy5ib4x1fouu4qrpbrqaooap90yztcp5jjo8n17cunn4cqx429no9e6yab417irqwh0q7hi88l4owy9wrauqbsdc32sffc53hyi0xyacpxroapjs3p555x8jn3qu2jd500k90c8a12w0cbj0uxm04gzdthnvilw7bwvg6zi8a2zelzf87myze7b8z259hxz9ydumzhjbgtjyy34wfsx8o33y124kfrtdpsbrxjvpjogn',
                redirect: '4owu0epf80lmru8imb357iw5gd67ly9owuvj6vr5041n8gvnngwo0oxxcsawx787m1tgshvy6pg8e3l7td8mmllzek2yofc89tzcxz1zbukfy2np1qb7paf8o8oi7ewwholgrlypievxefhzaf06rbcv7yj33rjtga3aufjutsj5qyakhr7oqkydpn33zvnzfdqc9n3o8g2ih9y971ieospcae6davzcd84ey8tajfmssnnquw5uivziechs9pj0ceh9q2ypag2n09ipj9m96pgwxoqlhfrjbw83idq4e5jgmawcybhy7p3jf9p3z8qb6jv78x8jfudmsypvivvfe9f9y6hh086ct2jse576nf9cmivppn3qyu14dmlrpa18vipl7iossic2wu4x0vyq9ul92rm4wjb6fznsnfzd9may0qv9srrqdu40isgck8hnh73fzwzbhtzc0iclnkh61nou0nylu46ndxgv16wyxyk6lvaq0cc1uixrc07uoy2uw2dwpl75q19v61wheizovrtd5w9lohtsix8xdj17onmghc3s1lgscp1ptfr6vy6zbb4vip62j877qm39ogxpi9wo6zag5drkiw4etjo5dgf0r1juzq9ptup29i3aipo4xmipqmc9mi3upzt96go4uxrrmmd9zw2h66656cslgdj0fwii8m2a45i13riznzc3ow63oi4k75k212553glkz3ymjv5az9y8uzspli35et3vq5gl8fsm3o0716lf32i34150k691geeizgfz57ni87t6t2r963knfr9gwobakk5d7gll7ofoe5vqzjxnoagwrns1zmrct39bkk8tuonhdtpx2avdtvbeeosfh9htm5rs6pq9nhz6k6vq14inc67nzgzq7c1p9nl8onp8teh6wlwggxiqqdvayux3sqrpletf2wvqzmq1fxgoxx0farg6pg0f2hto93dhs7itg80kcxeh6vvedny4waomtyegdv04dzxucyr5ams7ce4cd2x1hs06jx73kh80cg0sd5l7d6kqoczxrqe8qof9rwig388zpl0izoozaugvs020b5gs12enkzw0679ohaqm5oa104pq2ryar0q1erl6tpbu0cmdlaoz0n9zo5b5p6o207xvw55f7g2swa1mmc7392rb7l99h3n82iephw4cj6o2frynwj57j6totypz9bgdjbv1g7tagzai8u625hipwv3od5rfio41uawmvw2mrogw9ndmdqak69w2dj744qff30n9kj22sn80ekqt2xdxaooq9vrm3w6eekb6w1musdcsx5bvrr0bbcjywke3imnkszj2u0981y6hdj949vorpd7jeogtvtgp9wv4n0co4fqy93vq017gaygnxl8nj2y4b2jj3p671knqirulurdbcqrey9hu9yxh18sohic6pa62y53uehd1stwa34ym8t66diww2kfpi61bocn97j2v6a2oc4vr41k1d1acnx7itff8nqojuhfvl373ww87zmotg5g3rt2l0wmxmnlkj0ifh2wxahx09873zkdvu640ppvdzmset8kej4ry3pna6jq5mn9ldt3ot4xkc2hddyc0akd5xsp2n7esy79c1z4qlp7gwig3amu40gy81t7jvahncpyq2vlltxa48f0ous9mftgvvp322v1ghimuuermvkx0hzkwtibfmt6ig9x7fhcd3igzzmvyzno15icwxb1005erg87o3pou61d751z8aop7nkn3cs445sumvf7hsm3y678ibwzthi1th3t3r265wlbg1c9jbztoky5cfua14ogz91z829izh47djj8eci9r2sasl1to2735jt319kthhsqodoc3r50r8vunmywfvob9gjb8fguspkhwq025ypvbh2eso91is0uktrs4lsowkadh8c587qvt64g1brqxnkpt23xn3k2xppfxjwiixsj91vukur0ldqhj2rj885p5imptx0itpbitz887lcea9yoruun266pe3xdes66o3nra2pwx',
                expiredAccessToken: 5407861600,
                expiredRefreshToken: 4148393307,
                isActive: 'true',
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'bd1mbkl51myq8t0cceadwikajy2rrejx68h66tyyn4ztl3n1a57milmstaecxuzoor7omkm35hi0dy7wbv33k07elr2wwauz2yrf1ndzgmy411nuq6huwayd1p2xe0n3jx535879w1ivrldru0fz30bblqxc2dz0gl4gxl3428hifqumaaml5nmab0x2bw6lgmlxzk1turk0boc7wvqqthpgq24n91h4ksfymd5rao8g0gbolfyekh0a62vt2mr',
                secret: 'bug4tkj3ig5dpc84k97lpwr4ls8s3h561v90i9d24d5pihmkyter8v65afrqljpioul14uz68955im4cxy3cv1ak7o',
                authUrl: 'p2eao5jafjqru8qojq8oe1feed2852qtwnz7gi2wqph1jgjzyrf3en4u0i74igvafcxt4drx8ml7432tqsu6tt0gmj6zzz268a120pftebc9pj4kqmlcce5jstkvub39vz0z6yzltfkzdfol9er5upqg8ow4ogphkpw56yoermvlrm371bjnw9g1hqyp2pswzllc8rsoll8f4wx7xrb8h8s86k3aeei8kuoyqt1o19h4b5ht24mboadtyqg9v5w6dtlb235vdjhhywq0jaqcw3jhqtrziye14nw3c7lt1kz4662kan0bvfoq024pqdh7d087nqkvx1ltx6cjfbtc6tzohfe0v63pblb0hr2m371zwkt73tf6kadfxdoof6gjjmzf3en8mu4hk6kelopwrh82lqznk0hin7pmg4uhtfbjfiet6y3ia979fyu7mzeqbbelzf7vmizullcxxz8mbjl8lyyj1c7h0ea6sxpptkabp0ngml91d8xjav4sy9g36jroohlvlkzxamsllx7qwbr73lx22dj37px3c90w1md5e620z92kvya31i4uekn7um8v4e3mapfnzy8sik9eilindwm7f0c5thzdgbczzrqjfyhvm8yuv8nz7ayd6wbak591bgw29wo0y53nf05u64c0t5oequv1ve9nm4pk51pxi4zidzfxzqzxxmzta1t4p99w87z5k0n16w66o651fhksvzfzsidyc0rtsx1ltv7vlulfupms0c8l74w727ijn38yr7zt9eqsaiai80hdyhjr1n7cqcqilnqokntq3303k7n82vtdka3uuwrf0c5jzjw07nw0bmk0qqargotwppagwe4bl2xdr54ibdkesrk39m0gqzl485qddez1zyzqwfjzyox9l9phewe5u6bvg73skntfwvefueyz9h7legmagjy1gp95yecx08g32xeg7966sw520inkef8pzonqq9780q1gezkbdfwg7ryvvu7wrcj2yutj9e09kehs7qaxez65mlvd8qrrv4gnnfeo6ovv8bmitdkuh257lja8to1zm0e4qy6khcin4tahpwklc86frnchy9gvjx9c179pgn26m5prtxkomweiqtnnfo1lwqssyyc29g34jr1fra71tmvx8qvvbtkcaj96f9ilofu9yz555qcyfzewqs1twqpz6yfkksd89d0ti11ilqzkqf62yjs3edvoi4yro4dagjxugg1lg55bkmlgic4aaafhyes3r199h4isw68n5lc60x956ufufyt41sfm95wuhal4vrl0lc6mnpgd0fkgfcexbb3a64ehc3cya0zl9p4ol00d7vun9soulryeva8i29yyx6lxfctwonui9nai4m8wkm40fom7ck3vbr0xf4itnl161nhxwdfg1flen2xi553vyi18e7wb8j7aibjahjmf046a82vbjcyo6ygyjrldxmkngdby66uqfdi6i3p5xyoa2i8u6qqxorsor2r7kpw2yfre9h8gytxy3c421k5axa0aetugle3jyog4lws6x8vfpohy632pkalk2spesy07lszneclvcqy386yo534ogmnt9uyo5mlg8wxewl3fgbzcvyvh15cq7vbblulsczrhtqvbf5nf7dvgr9ky6q6z0wkl0uhpntqcdeqm6q8dcpsafuolwk4hjix304njiigp24t9mmk5a5pe8d5olggkkc1wurf6yfj8pm47kkw3nphz2vbkhc85k543pxzqsxit1pgoy74d4su3ymicrvzel3bu60ydo7m3m5q8jhrl7kdnfoh4i6w4hska8iqw0628cedq5bjdaq1ozyv36313h5bk9ue57e93n5xokifnl0h0mkwidh3opdic3smeb13l4zdm1q1fhc0qawrn18a6btb6sbk7qrsfrg2fgf3y8goxtkcvfi74f68aidtuag51avra0wb0k7bt0men36jzplapu3olgxa9uhdv43u91kc08kiotmj3va0fp9q9aynqch7u93uyitdd1bfig29j',
                redirect: '4c38gxsdscqq1a2zsiy8go3ctczhv1904hhrnwa0tklgr09kn5xf7xpw4hai9043ba6z4l5895cpu2ngxpqb60pxtf4exnvb75vlc78ao8r6dbz29kfnv97x2cul6wb49ltrhv8keufqn1mzuvh12hbf4z92uhg8a5z8gyilqzjs2l8ne6zg1v3duhm7weyxirxomu4gdspngi3aaydybj9nr2bo3f97jzp4iynqunznznz8yws2pmo4knhgyf0eejch6hosbrm5vd2t4um5qunm45i5i6ucjp9qmlfyybgvoy2xexxm10vmms37m2gagsldzrw2gxf38hgk8wkurmjax4knpdp3vrasxt1i0kwt5l2c879i9e050sxc9rk5178fyft4ayjwdpju6gdgb6ltgnj7i98sv9ibwytip7or97bmfowcargrj4gdv7lby6zxam7gx7374a6kz8l8pszk0crbospdzzm0pb7kgx504f4yknd5b16xlese61459rezhkvjt2q9y0myepx608hi4dbple1rju8qc96v4j5gt3u0sunqwsp9ncrmpf80coqx7y87lfop29xe7t3ijy7k8290v9c2g091fqaf4vzdahn3mhx1khpvrl9d5ddf4vdhvab7qpqrc8najlbvr24rn1n16uxcmlp3t9a8m20kf35trbqjqx5z7rdyv938zoocu27lsbbnxjb19h0glhjg5fwcnn0s9pi8l2q62n1k9u0ngsa1m2assl6x2c0i8nifx3czzaddwg5m7aws6kdrtxuyoyqfk99hcbxv7q5ijfx1q9f3g5qy9j7gbow52aybyyns437y9wq2vkoz68tfe8txvalkxts16m7643lj9086ii93xi3xpzup2ix9pgdr4oadwybqpo5zj42vq9dpbjmgwldr8q2w4b0tke2rrfywu3c0zu7vkrcz2y8r8l81xuj17cj3voq9208h9xzmb5ervi7rjsi64jsfmwtd6sf1boinqedxj8a0l50mieg226e7mflcp8myoqka7fbu5w6f9m60qv0aeysehwzgr4x8kgf9lg2ubw5ajq6nga2u9mkny4sl20jhbwpqztrprz6lgjipt98l86jtwgso3fra86b5w137416414hly36hyi9zrangfvjjvg0zpmio4vkhonmpg5xoke78vzk0rfbosayb6iop7zlhme1s17ighr7e8jdf26ehcw024x7q61k1npnj8n3xl77bewy5a7erwihmohk4xe6wr64whwc37kne7c425s3b2ut3u6oziouzk625nyqlpgum6n7mq9so5r9t7er4ra75ayj62ketyhg600ahet1z1mzxlharqi6qmm0285iknq5n85d3ug14d1vyou416tth9dv99vofz2epyo4asac1r9o85cp0darue187goq0wpwdsvgimzec7u8rajajbcdicz6f05o1tt1m2eyuc91d11x0wjk0t4b46jwjdutd9dtb7kfgutsyqoojfj59c5cfk4jiyn113k6bm2q2x7l0fj7wkxggpg6obp5zofted93ckmbhf6d93kp7bzlyb5k5pi5g1q18teqlxsgue7k7lxbfwyg3618scydakqn295l32jopyg87pek8ydoazvdw0sh95bny7qokjyepz1ez8442ufiivk0ggt6xjjj7yzk05rhbc53hf6ekqiqpw5tcui172ykto6pkxft9jyllyml65r49dj2zwbd2dv4biiysu8gb5oknldlnuo96323hgi582d8snn11o4z2mgsphpdw1t9jtjxcixrbd2juc0xx087z6s707w29yzucx5r9snwjhyanfjdlb92y0q1rk5pm7veohwv1t593nt5tnd8lhg2idqbed6k7gfngxle4hnln3ui9g6ujzssfezjze70x79ey9202dnm3rewecrmjwg77cfbq2tuavypsz6xwrbehng5po52vp39047f0u3erplj6t035r17ohf8vw266o9w1qsxhdlqfrguhy8few82j',
                expiredAccessToken: 6932581193,
                expiredRefreshToken: 6580955914,
                isActive: true,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'XXXX',
                name: '3n1a8l9zv86n5uhisxu8d2nhld0fjxql9uf4omid2ozfg4z5719a19cywhnlsqjoiejr40xru4f6sj8zthfcrwc35grvaiv1oy1gxjttvk4cum1jh37slwpjohm2mjxruoi8z5aie8w9cohpb90m5xdiw63r0q7nz5jlj3zyek3h4igaw375lje2t5tcs86neplv51t4nzbtjma7dpim6rg1o85nsjbj1gp3jf28qnoslenosxl4kazt6zq12wo',
                secret: '6j4y60d2ocwjg1o1874ogjp4xgzmta5ac4ctssq147jsdwvctrwozoels7wtcgz78nswlbde6aih68goy7oxcq1qi7',
                authUrl: 'ctips5gg3j3ybt2ky52floje0tx1cznph14asgo80cx0aju02obqq0s5ee8oi1uxnttg8f2z6asd47zpn85ypp0frkjr1qonbzq46qncmfvfrncjkhz8sl0sod3y2h0lk67cy414piksm8e6ivak5tswn6sp16t031s86xa2k7zbdqzszuj0nnxul4mpin4xdeqy3jl33ljvnrxtkxrfawy9ctfqt3rz96fn29fh036waotb0wkxb1elin8o6aj178qvwvyxbjnklverc7d1dpww994qxt6od6fskaob89yadqk6dckqiuvfchrqw0pgjrnfw1zzk2bckiqsd5pks88f0lmgqp7t9a349obsbc8s3m7ocipetnefiaijuuuvxj9d56nbyzhlt4vu5wm3n4ezmizuoppn63k1p7gl22p3kjpac43uyokivr6h0lvaruy5c1nwbj6ixwuglbp3o3cv9d2naelevp49wao26332lte3c1xj091835bwkydlr1b2t9vckqf9jew8cwq6atwda8zwpmobc6kld2j0v7eqf0ym3ai5bohxqcbj2ur6ry1dwawjxrtwxy01vcwiwi0eqtnp30jflntjn2s0xj5tjdw5yqy0eti70pkvrucm86cl6oxgl4w1hnx41g4vul6o2lkoog2nxrr5pd9rt426x67sq8utqjlsxrt656jkgf9qmnkrf9d76x1dh4rvfa634o2olv8am5mtcud0368s0jqwzjq4mn65te7ni0gbb1g2t6tca01zaet3g32awnhsodquvndiyqqmylfyxx3bpllisiunsq0gwrc4np60i939nycmo7j08ryvj23e81yjc30c3l5wqqt90uosuka5gs79z1gffc1ble74dcl7banbqmgwmx1j26aoka36hzn37oetxbwg3s48xucc2cc5rhlp8mwh497wfec5che7u6411z4unibwig7mcfgbl6tlci7pni0cx520m8ppwq59ja3tbb9na0l8udxczw7x7onqb167k3gj3h7c030o3q6dd38sy6sict72qpd4j5iq18qv8szl3wiwjnbepp1tmk6wonc02iq0mgyszm9rwubrkk2vm89itlhub1m63y1hmbav8svy6jv2nkin7u7vniqww8g9v97f1cnzrihacyxkodyit7h2vinxlzha98q2nrqrkhsabqy18ei8vbb3v4om3r9wm93hsqd5cva8xd9nf63p48zuxtnxji59cgdcqmq6lwqpcvzi1i5v6oa21gqt4uw9x2ibvxvekhkcmi99qh4d1yqvpwz031jn6klqjgmnaak5dcjgv23oywfst3cpnlk5rrqe9fv1vtc4osnrh8lbawxt9adh0vw5du5ivelhwt77l052c6kjaovodfriwudgqsir2wgucbqdc4zwotg0c5pt0mthrm7xygupevz250q5xa0d61lbvoqqgtshlhhlsk9frymzhz1vxwpkah9qfksjon5qxmwn2umyo0kynjdzy6govirrmfflcz9tdl33qvf5swtzo5fedx5vdm4cmcxr5deukc4fyy23ok0wv79uwd2rxt21wkll2p9qej0wy10tvynybk3q8xj7ylecbglli3leq3axu8h2u6p2uxi8flsuq512xf0xr8fdflv1dknbkzh9hen9ximk9ih67mhj8odcffdtdsrtdf8l163hphe1o8vrvsuitr6f44c88k6nmpotvx1ns1s20fl6l8aosxfprmelohih9ip13b3l91sj3z13wdl6ho6hegiktsa9o1fvklmglb9w1j1whk5n7igc8q9btxn34e3zsqyl0zcsoxpt68vuivgui6domy3my7i1iai5ihyrp42kx9s5rhv9q5k0ykly1tkjc5yh6caq2ibjdx0gk7q0b7og3urcqk7ybdzl4u2r2pdgt01wmlqgqn7zb96m3lxsb89ldp149ssosbmllr4ig5tchhi1xt4ie8ur501mfiw3pkxnzlgr5b2uniqflo1aift834vg3quaru47',
                redirect: '6mnmgaja2226e1ljshqbvhu66sh6wfacr44wtpv4obuztxdnkv1p4msuepe6ph2lh3p3u6tfxj2ns625z4j28y5zuqyzfqdsndqbvultr89m76lhpdovjp26z1hwybm4gnt3uubbzz8hqx3qz60e2tt7t9tg9579yoxh7jykawu6nsk3n7any9645utofjljkeclfzfeojpicayu848ep3fa6ze4h6xwhw59pactxx6li8l04g2le8um9gtyrvemvbsyeibfgju41lmxxndmabnixd3hk5wjhikkt346ieskriz5my9o9c8zvpxypson8g390uxqqbs2g9a2btrw7g15h63pu4ia0o8y0ebmqx09plrzz8l8xsh7od3idtae3z0a0mrqfm8zdzcquthqot4aasc41k3in813qqjcq3htuackoex0kt55cranvcbo6eliuxf30i14hukaavj3u812n4g7jqk9mlcu4ccb87gqlxrio11t6jk6zcd1q3y4ij83q304o9orenozmrwl0s4nokpivrdm1319c7cjf7djd668nhdfcr0it2ci3ddavf7fosceli72b1c9hyzy2wkzpqegffwzkg03c28e4x5wya3t3y0c8u3ef1wj3j4n6r22els4zjda31uj892acgr8qehukz4xr3i47bmo2cottacufcvf39et8emftcmk5k2cityvazukmzb6q5ytd1bn8qo2n306usrynphfjxcjkaocg0p1c4adeo62sohzpfkohrlnkl2tdjstsyivty6u0gtsoycp3018ji3tbabhfmvpfc07us9a951y4ciqq5acdovwgrpmezubzp97kgqy4p4054hvzks1joheue7t4vq70ram2vbyr2sc6va6af73zc340notnnhz45xdmtzpjstf3i81xprqnlpqwg9oqq67dop0rts381vhig43eaiv7otq32dlubaiu63qt6v2hmeowh9fj0bn2himxr4zocjyuuflv66dx0lgyx61tvqgpbkaegj2lgc6cs2cx3wo97gwx8ypuijqz5shq3nlfxbfq6eting1jt7fezi0s63um3cpsc05m9ak8inlr8kbcw1d1xb79wa70o89gcd4jp8jvj1k4gdb2s4lyevpxagg5sl0rdic85sa2f8uwl430lb2aakoc0d8ipopmptrxxm7xabbb14d9h2fvriwnonwkpoq7jse620n29dxzvmv2adzw3g8wx83p8soeefmtxnpofk3meg2mf0nhq26car8o3pgoyi9alxshhcqnogouw20be8wia9jwqkwpbj1opi55b5zp6bk69pwum2q45j5bl1gzzvdyerr5kg48nrgmp7gb879vz0qxmwvnhcgmesrsxl3xq4nbyt91d47m7wwh44o7k1jsy072ws7pkhqeft1uhybsedjtl64p0czrd240bx0wyghyft3b9bcmhdp6qsa6x9elawczyx7la2imhw6fgs31l2gx4x4sy7r7k1vuz32fg9wg8nx5zmtdf99z28xz2r2rix0u4npfkd492roi6tkmwab0bnarbs1jbyqmd2m038drcgqh2h1m0pmyydiezo8wqd3ghqjiyr96uqrnrc8ml3niy6z3ziakt1mziw2bxu63rpse8fbu7r3aaqgnbngu5zdtpwv8vkn2l9srdctxq93z31aahr9tft9r0e50zgoklimb2e943fznr83zzemgoeheot2a19pean4yc8qbuqy4tzj615mrx1ftxals6newt5gnu8bbg7bmqw4tkjdbm1jzpla1uaovu5kgjda7fli8k13okh5eokti85fgl17wiyf7yc7yhihf2lpqur3hjtjmnalua1xbs2e3xbjbsbdya8ugcl2b8ckfotot11s774900oh8jevt00rnnjfo62poasamjfbckn2zvsvb98azvj3tdqc9prt8iwdrkrkrjv36mcksakhb5yk3osgvhwy94qbh0qfxc0dpx6ikkvuj4k2zmzir0x300fzziv4t4r5ugsw',
                expiredAccessToken: 1129351364,
                expiredRefreshToken: 6514491923,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'PASSWORD',
                name: '21qq96xaaamb5ehujivk3hwrufj3zhsuzzrwulbq6xbib54as5wcsa6pd2rpnfaiclaea5apvfhcwtgtbfzpwxe3c3k2lh3qdwv7y2puzdzhm4ejmpqs6f5wlfs4b9npx2c40u2oa0h6k3wph9gin5xy7lgtl9ar5f59eg0zswf43dbjkgttpfy36vya8gpi9trry6qwqomm9ofug0zqxgud3j35jfadzv11wkbsz416imdlqcbdqbca327pmrz',
                secret: 'blgl3m722kw6vz1nf1r5o72ulo2w1mfywfsiedkhvfwgyo45c2jy9l0xfyxdw0ghg85um9so5pdm5ruyj6ssk01to9',
                authUrl: 'gji5s0kqqupx04eddnyj5yxz7byy3cdm3in8fvqajawc96ovctjhwbe5mh5ormmif3k5b9f97x9wu8dik5rbmd095ijh08zinb16732jra3p45lkfrq569wjs73049q6lt2ajua2fhrt8nihh1ya3dmitf7waxsyv4awznosy560n39teodho4zwe7o8z1aq3ci6eghi2afy4hrymai12dgzusg1nzes0zqx5ulm20x0syv0actg504cjqo0sbdjuea83qzq9x7fan5s0madl4r494o6gq4xm1outb67bku6yqd00sdr46n1zunugpx1u21jns4fj0xoz9lpnnolr4m1musfgr1pzex5qw8hdz0dl5wlsd8jlvs1w2m3foa5htjrtsxibhzlztsvqhmcegefo4bnblxzex0fjqjz3ha2hopxexm7hzojyo6iikgh24dkeb3lef0hhx0qkk0d9gfex1urv0pcqmjw4px2unfj1aw5yt77jqjuargrzd9wj1yfvvpc9fq87jcfk4weiar2h8il87ryk6voisrpczgqco64jjtntamtt02jj80s6bckn8vbr4nrtl6hw6uazycjtrspyk1munw3kho4u3ho7m68230z4ua1mavnqmwhdkqncmgdkjw636tth00k8e3ya4k7jz6mnq998qqjg76plcjtg3kqi4ftok9fun3f9un93uc0kve7n6fv4mk5oc2k2ktnhe7myn713ra7qtwwqmrj8021h4m07lbqxjyfkfropwa6ceqwxafys3exh7kk61s19osbluk3fghw9q9nnpv462mro3z71qtk6ncgu5aow8z9obmyjgdkal0l0vd3akrxokgqhswkm55z1m7i34tavtk6z5d7lbkexb4ur3on92zlinftcwm6su2lz9ghcw2d1ko3h5z5u2utxjn3ztkdb16qqffcybxk9w24l0nsmtlrb7x0og6inumk53zpua19aqcwzy1l5rajlxv8y10bqhaptrcq9wutmqwalcecp9bkpa7p18d4l54ktwxjhusn8lhnwhszfc7a13skffdub8ucpa47r2h14s4t2a5fehadibxg7o1pde5lu3kwva1tr1ceu3l4yu7rxrludtite6yd0e66c20jkwdru21k4v0lmzsj21ypbnkzueg8l3zkm2qlusnyy40sh3un7dwaom3fc0t1ew5y58ogt63rj2hkkvy3h78smu7p9uu0vcbzw19ublvfmnk1s6hgam55oz824aexeduc76gkublj815sxznbkai3es3o54sgao35jw3bgqxhj0cut51ujssbtsd3qepqq0bw7s65pz4r4g9mgse3gx9t541va1k9qt4qwvydfzzdm656j5vrra6ic5ay78jscasxubifhhy6rjygvf15k55k6aqa0kruugdu0pbk47wg0xddlp8jzs5jhddgdlk4wu018zv1alc1wo0plgtp93a5nxx4caqz89a9lm2532opr8drg9vwy2a3ywg0gbuzzcb5b01dbg6b2pbvfkfy5hbh962weumujh41ttylehfc9olzfv3jz3hurjrcthhtl2xm59fsmw3dykeik3rptat1otpmdrtpmm10jy7ktosfyq9y3d3ehgzae4efk9nswbjnlykx4pmes9d9ccs2wespy1xy4otfbtagsaarlkdpxiqgm9dhnaizdgx7ekda8uikequmubaz3x91h3jf7jr0x35t6w1cyrj7z32qqyl4gnywjhu6hrh08m2qybvg1z2fv3g3bzix6gpbql7pa5jpymqzq43p4qbbqv4cnonq33i8gw37z0nzboe0eizzowylywi6diqje0sei1lz8mh6witr11ctmjlyefnpbfcvhwhuvmut6ybw2vdqbdpgzyxp0aear09avg8mg8jwq3o9a2ov2bn9m1zkzatbzx3lygap66vmx7hh7ddvhgyade3jk861s4yparrkjxsj2m19oaiclnwtj13cuxp6pq6771uudztt61s89w0shpgstppikz5e',
                redirect: 'ou2hx8qxf5tfme2direwf4ic2zv3cvejsuknffi4z5u06ygw4bfbp7k4get5xs9vtfi428vgoxfvzegpgxg0lrvchqwji1fay8g1tvjyrqqgp9h2s6v09p5ujkeq4ib2nima6btto42d9enjxv7wnd5rdhorakgmuylj0x6t9c5759ofp857797qsijbbkor3syvhh6flzlwkpa04l2bfl2cbgfsi1zj2gghsqx7hf65gc0feczvott6nhf31juy6oqirxizfkrsk172tweb50z58w9suznrlx181fs2fqcjt8hxhfgxz2fn4685d74re3hnspsg9vansub1hvu257cr5tgado47eoino3rue5eardzavb8ztso42u6su4iaqtrhpw5cea7mmg5bklc82vh8sd260vil4cf2khl0yrw5gac0y3o96b15quubg2qj359yl4fa4c700xqt2692ls3k7zxacbspckx2mb9si0r8ukdc6mwh6iqfco38wrc1kjk9loyhufc6oknjq5ro7a5y4y69ydiep0f4bopwln9nx7cujxq6uxnfvy2b76b3ouzbi6vwkd3ohxu6iqkkebpv44bz0lsa6t24hlcrmzsja8smfxtelzo1j0uob03np820dkx4wl4goxerceebmo18cuqi8npi7koz1fynl3qyasd0iiqxzjjp9q1wud34q2i1ylpvktbt0xjs5ml998ar5rb3np9bkw1vbdln7sr168gvwbsmycifp8sw2gnpzullo6smly4mjdt3nxkf27hofpwy1rtdsvx86s2ayxxoheoeqdylcqayrfizb63lg5rqjwcml8kb4ztq9ot2mxemvjfrzw2016r3ozqo7906vo5xb5u0wna72bz36np4gia4hkq1kgewr31gtmn5fjtwnqvolslou653mw1b2meu4khdyes389gp4tx7zixm3243864gnxqgskmb76exbtl5zz0utsr8rm37u42bl7ubu3rktoyast1g7ssfd6txmwibxqksy6tu7vrwywufu60zwzrmm082yilaw0qo43nk9qtw26gthde8tymn8axh92hbpxf3momshn3xumkzb2bvy2r0hsmc7nelqnsujoa80k184v0qxwtomthtpsddarfybpe7h3tas4klprm5i8sq2ijaqmvwjt6ztwze098uay6v72qvfg0ld470jml4zp8ctipo9qj24ry025aqj4o4q03ot812erolvqsasfcb2q6p288pe01fno1m3qalf69pcsxhdqjvux2990ug4s2lvyaygl2piwyefujvlhnygoiddav9p862vojep3nhah64nu2674cth7j8llxmf03w6zv5e27mdmby02a1aamyis6c06fm73kv4f302hgqajlb48muyw55i8ws99x2kika29pbtzeskpr9kh2ydkwjbbzu3iet3fyjfawxruun1igrdlg4gj3oxud3f7p8iiinmlo483v7vfaffni6kmdvce1shmmsc68psean4dqkj16epzqywrc8o6d42aperro0ifphsl2j9e1qgtwut2om0td2jvuaxessojl9oo2yvihu4f6m0eqrrwghnyi569bi7g1y6t0d10i3e19clrid0hopvapibmfo4uvrj0twwrbnankaqubiimee03q9xyqgmmp61vuud53taagovskfloi9a6fgp9z6btvoqpvwcwhyfc0zamhks2rm7ukds8k5efjtxmy8o97in19zexd8bd1tp7wacfw9vlv29xx2uf3znwr46ebp2b1eq9wdnq3wzjrfa9azpoe1iky87ufld96a6ndho5nxl63ip5lmsxgjq1k80havpjv41ax473ezv56l61f09zb4bo9lrui6y6p3e9ol88oyavinlg20glp6vp0flcajuv4l877q8m5ror45ezcrw7ys87tn0ytiu44fxysyt6nu9877wbqar2b9vxkdifj76ib163csyd1bbpeohz3fmewqldr74ygtv8jhkmtkpitpo94433ne',
                expiredAccessToken: 3138211867,
                expiredRefreshToken: 8305816035,
                isActive: true,
                isMaster: false,
                applicationIds: [],
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
                        id: '2a14b484-28be-4fa1-bad6-72a1a8bf3207'
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
                        id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/2630d495-20dd-46c3-ab39-9f723fabd64d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/1df9828c-d358-4fd5-9ed1-6b5c97e14f6f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f'));
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
                
                id: '46c3ccf4-d043-46d5-bd4b-558b13303c01',
                grantType: 'PASSWORD',
                name: 'gv1uaszpb515x23nte0e3ht0w2o3nw60ok1c6aqm5h7ipowdxn7nrt88vdltvspira0ixs8fg7cvk5wrxvacdze4ns9yqrxhsmhg81ktkr54chx3wp8qhw3ggz3d7e8p6do3vi8ixbw36y6cllh453ahpv69sya71euycrtm35pnp501fapb5m2x923yf3bqvcie2wcp9nm7q31v2c65bknmk5z5u3q2s5a05qauopfx9c0ja4yu5n40gasgbzd',
                secret: '1bce02aezscihbpuhw8jngeh1walag92am58sl2oagaolameudx31kj6e2it3657vd2zzdly3n1ocvtp536t3d6gc8',
                authUrl: 'adum4878n26w5alawmjsi7xfsm1u65vjv5iq7pyivzv4bx12qrr460z97x7b6eibjya4uvfqvqj5z6b370nvxzwqsu18iuncmdl4f3ceci1b50oag5rxa3vmxook9nhpnqcmzig6ghvw3kfh16e4upkqb3d7wgne5q92vrqmmz7v11xzuf33on02haeew5wd4yohit6fggar7frxnxew31o37lskfh8vl58azrwfge4de5a2k69dxrdfo7ll64rnz36ib38gts6j3k5qi9gzekarcc0f7x1n7aj0kol642o2fsrmrz1ciylvycvkeop2vlhkyo21adue46mv9iraovy489sxa5g01dd13zyrkh4t7ox3bxusca7k4rca06hykbfkqk0h3ynqehiga5o3f3a9xtgnjlzu3c6mq753bj2krr1jwiq91mn2np29a113i5jwytyl783e6ff7koxljh6674tzuv60nmv6i373sl3cwqk924n0oukll20qaum0ow7ipunbmqkkhf5uatv8y4l2in6qf9da2gmr3gcloqaadjrbacl40wwb1w8i7fb7v4hhlib54mgjrly5vjzywk8v4e8p3cuwbkgcrliaz9sbkrlbvwnwpdms57kpi4yhbuuzd4jncgls3yugw6ktn8dax7r6yp9ah05qbd2ucqivv7yrmzokwqbqekljz28stw23yzlnjb1wlg1qazs5h888fyi9f49uho53m3puxb2kqnajf8h53i5w2jdyeoqqntix8xyhxbc7nwimjbpze866s2x71zbuavixz3ma3pdqtzxn2c92lvhfk21nqj53ylzvvjkqkwhfcfbzyymalfd9gcw5rg6o7gxyk6iz2nyu8pdcj1imj3ogvmjx9klbfv9m2hfuuy62jstgykgnaypsa0upmwaqj1qyam0qkwzuupezrah7svhazk03heu4kl1w9kpk611x0l8ic9tj7cm6d7xptz2qnhkwzups3xu8fe3ne712n5z1mb8ecp2zkw6pvn6y04s0wuwjl3eff8b5aflizc0e59wtvjba7h4u51013slavb82ak233eli1ia5694g6btutk3hhx7ednvg86eafqs4978lo014ti8iue2cx8yr6btjxhfgiq0icw1nq2culue575wgudqzztljnjvb62wlkyj7s76seyrxw86u3fulakm1vseatr94bn2nlmn8cwe4rg9sge68gt2oscwbiayp43gdknhj7hmsj42skym7tu2q00vb7qeja52el6ztarze2twyn9ty8y92tidyr5cpqrfv3pnzcsrxawlzlrnssg0zsaw56y24b47wjc70kbvvyrpbqf40co8umkqrdbqz3fbb6tkhx4a011eu1ad3evx2qonmfqds9rnltwnhn315l76x6cgao0khzt7ipxk13jlfge472zd440yolldhl71zopdva3zt0jnl9p34kruhv23zm26xp7nvf2gy4fdls1ylfwt68pjzv5gtrqru7kmjzeqj90z1sgzkeoaa0ipk6kdn64fj4fv2d07vq6r878t57nsjobmt587qx2wyejm7auloza0vx2zgpa8hmege8rpjqgrqgnjauchuqvxvzxmznfxrebf3shpu9qd2a8zlhbj67170vqgq804y0dml4vhxehl9w6cqmr2xo867sn70sx6o4l8kcokdc5lg9ixpchdei1qefs316na4vca5ywvsp4yfxuzk3gxfo3e9fsefeynip28hsbkgp7i8q4tubcfwxircg2ikpqvojrjla4k3ojowy9h06cofrkgtlv0c9p0q8v3yntqiipfrxdeqhdu8jii16ro1krrzdwy89446h3wpshz82x7kafdtueu8l66fio08rtx33sg6hhpv8pzyhkmroeg2hj72zzkdsi2jkiwva4z3ifgajhxed7pd8f2e4vd63hdtujae4rpz5wxnoqe1gv7y7mooepwlhuqzsj0lk39lieisgrz7jf46j9kj9rrmtw3erm7rjf6wyc7o0oua',
                redirect: '1myx5yvjnlpgt57kac0db8nxfexnn8sbyp5epeex7oagcuadrs0nuezyd3905pqekcdvqxfoilwypyowlwgrh5fgqn3gcwiihe1g84gekej3ogmkw20l5f8i5hp030aqexw9gyjup6i3i9bjaxlfp01v5zbsi13dkasbog1x3jn7s1xwddw88k422p0gm5xq1ic7r182960wjmmwhae46uyqd6m3l5hswhhnx8ozhhrpi7k59n63frcvm1tuk82bhd5lf6gkmmjzsewhxjfv6xzcjyn1myc60lvmhm0qlnoda4j2ht3vftdd624k5ofzdhjtwaq4yaz3nf32282ju27mwny27tbebji2eo0nr0rq1m8wf48xbx2uzqnaxy7r6x9kn1q8pqy3rn8u2r4um7r4tkurvxqbbog729h8pjo8kjn2fmnmex4rq2lotwitcpl0eppafkre3xnd6pd8dt1qvvkwewxhaxk0103pohtmc21fcs5g7gg78ziak39yenr29djtpah8ax8xf6vqqdlnkoc1pif3hyy2cbydjfoiz1qg4uspsapbwh07heaaxucrvfytm15yia4syynoataqahkoaiiwkl6tk3p9c45stlc2lj2qbm53rcyu1mp12jyl6n6kmbub33x0ry1dc3uvsqcbqy34csjx9iarisif3a3ipj0nyvav804kinnwaauhqh3szq11ss5aon6h5vvlktoa6rjsvt57owh0hp9mee52nv5peuxmytskqnrfb3ggdyu8ga8vdaxc98v0q8c7ikg5lpdaul6e1o1jnhpy4yswsufjkvk0tvae8qopfq1vcix9krfguyhef7nhjnbp2lq1ofogm8bd72uk1xgixymehk0kghqvdd6p86q70u47t2rq48hjvlkxbcvef281l1cg9son7ztxje8sg5z96fnqzp8i1rrcmixgys8vktsxht12khrhsje3agv8rzomglru1gqk3keaxqro46hajk1p8sckcybjwt7j2g3mrqzjrq89i12iuzmffixf10fygmym8ke6fsuo12qf622bewdxnka6pzlizzgfkgvcoh9icy73vtatdrydimta08z0vi5k95zw1nfq2oyw5su9n470oe2q7qocqlbkbehc8u39gva87hf02pj6a6li2fq8k5o62133tribfryf2jht8jlp1p137z2spwh12wjq3qx4e2xp3pctdxo9mo4jke7rab91ea1z4ewqstklnyf2wf4c3z8p49994tfqjtt67fthapfunmcq5btw30d2ed5tp2dd63puflicrf04v18fziyturxli50u4nn8d86w40gqy3wye2augqwmn6he82fzsm889fpixqtvlh2zdmcm2q2a999jnge9f50sv37v1wgov7o61ljob8y89vqnwlj29e6b3opqpy7uzki5cmeidlczx5jh0r10st10c265gt6qfgqgg9o3j06ofbyd417srt4wh2m5nnbxphf2vqisaczx6hu2qofmxg030yxhkdjls8hhhozvfjqkc4nlzfzllc6j9fvzcudmv6nqhjepusrofbyqmule1whxpvcokeyj1iffe17igr50mhyis2uwzczev73j0ycvrg1uwqv2k6b1zdc35tyhkg81sfyx2p38ox2hvd7ge0vbjh0szbhgiihri1v0hjlnt5tq1kqhm7tzj1r54azm049dnrwlxpdtbftk1s74zdbbmzhwyrjuhgegjcocuibsjlloi25fpr2fywmdur4i1h6noma2uvp1brogri2pth59cndukkyat2cmlcx5bm7vmihhb3l3uguoxkgh9y05yf9yax4dwhk3i4qexqdvtyucqstt9ukve0dp2psntuflx83ewhsw014452addeivghpmukwcctw92opq5i9l0e04jj9jkx2g0mk8g8yxxdq7zob4r6vodepqtqv5jc85ux41jed4r1o0b8hziz1r4tn0pw1l112x5m7n9lphjw2aqwzzlqtg3gmugkyi4e0y366lonuv',
                expiredAccessToken: 4441172977,
                expiredRefreshToken: 5581356351,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                grantType: 'AUTHORIZATION_CODE',
                name: 'spjfxv5tj7kdew00z2el4h62b5g2b80uvoyajsnqehiv1u48gxp1mja9xbsnumwr5d4tzrqemexmfjsqjwq6m9eelw2v5ytwvq2k3uf666rj7fl6xgavg86egs7lsfxeuyhy83o6c0dv6ey19idhwqtwd3sarogm18fjj0n4cu25sx6wllqiawr8xdbb3jmrzt356atss17cyqxrqctdnob2yaewmlejfxunoiti7xu9fp79a3fyrh5az9qutqb',
                secret: 'xkb4rjdijsxtd9y4wytwmrcpsrwq9u9chk3d8g5yzng59nc3ipzsr6r0krgwj4ftxdpwr82qib90ik3ysutc24p80z',
                authUrl: 'hekpgvbzq8dztzd196k3rdr5nyxg2jhjwgx1ruykhrec8rdbxccddyp75vlnv5is9755tolh01kzzg5eeuskoubst3we5yvd5oyaw50q0mbom63jugxmm5z498o25m18d9mkqvinmpx2b4z6ca31twj09i3asnskkqo8ye70qz4mvfjjcwedgsvra39zpn9dj4vu6bqyzgvpnmbvfdj0d6jmalfa3oebkunlqhtongqfko2lo3k99e311qc2x269xmt8810iu1009vua4zyqfd7si77sxec4c9s70hwkwpeqyl1ba4jn6f0den4u2nznvo9bllaukhblx07i5itreveuqmof5y7bpnf9ho0wnkr5hmw3vwo8070s3iwb151cal7xksr8z319odi5ikivxfgcsubm2m4rf7cp4el8jreos24m95r36aq2ps0i7dnw5qqvcqm6sfsiq4187jpuyrrd1vc0scc8dtpaax2gaaxinz7ecpb1jlufmsca264u4iu1qj10qwc8todj0g7n0stqexttu2hz8dhckc5spxd7f6mw6yclzptdl9o867upr3w8pozijvd4i8oyor02vun6daosce2889dslb0hnf3mza8z4teau001b61lwf62m9gtxvwi04s96t3mmphigfh7ueh3ojg6hs5nmdrukjvyiyq8cqlte867re0bvci4bphtkm92x8zy1r2hpfz96n9zdre2tzgr3bj1gmqcdqk3jkk52is6bydvajiw6zk7rkfh436zk09wmimkitgnusmy0svf5ufvqkb3immz7hyl0pxenns6r9ukkuzv0qiq97ykw3va7nowgzjz13mdfrvyqjmwxqu1ekddu6s32y087b2swfir1hxslqzr07a8wm8vejqmxnf130c9oiwsu6lstimaqg7rn2n8d8g3g5qziylvyy8hdbebzuajlyf4l82chv4ql1j2lude3lr0cizzjua1xvlrzuhzdrp15vmnklgu2ng6p14qm3ihsmij748kc0ku11925cjuthdqlfwxirye7bcc706me94jqur79zqu5pthotc1j534msjwqzd0m0tw9cilryz816umkruiu2679b7en6yi3cpp7wqs5foepq6x16cujeslhrtjg9lnzohfxac6yyzhtwldk7b0jp5ni9g1oysp0v4w6k4gqi5fbhm3c91xpejy2j0c9nib71v3shj2ye0u73lawxg7p4whnafvqv37gr3evqzix2ti17h742u1097tahg4m8vm0byoor16vtfadd01l428okzek7qnejuqe4nxx5yzrtsbi473892vl0pcg3kwnpdzxispa5qne82y2t5z21qjhgoucegkk5hkqwx7kiqcdjbrzujgdvovoz7y7njg42ybe02l0cmednx2w791ah5gllpslpv2i5v2ix8viy2xc2ticfkysqnzbwgsb0yy03f1vaa9rjp04j403j9mg43zicnyvnyd02zpg0sotzxvtp5z6fcd5ld9p4ox6n9vbpntehigc3ycv0ji4fzgpu958fbyzvx0l7kdlm362f39aeinpts0e2zowdpm9sacvjckyai3rrma3ywlgmpr42limpfje67kmyiyq09pwqbrxgyc75upd0kgb00q53pq4dir3kuvw13yss12sxeafu4gfxiddulsuidn39dwkevhcbgndc7qlpcszi6747dry5pak2ixvp8n8d31khluokwq5c4hqwbnhrxsr38xoyhqaxhsq7lh2pk8fri05qt08ghqpjdek3dg9v7mlpbr835u6xm5ih6mdc0njbuj9jkow5v6feheyg8f53d9c6lgkmr27nefnjmalo319cktyhi8a11fjx0xp37j54yqnd2gfrwrhjgvldkmbumgsocdkoff2r8h5zmlxk1eck3heypuriayht5edlqpodl55jeuhxblwlni4drfk1rk6p2cf6b1a7pg31ute4il5xuk6hehkna53e1e1wc03vv2b5rradqnw7k8fvyu2zs2hoey',
                redirect: '5vzz2cimaun4adqkodmv9bnjeny3g8nse0azyfblqs3bbpfs7div6xmu1vmhp7ojy79gi5icxd3f7je91ur4wxm32n20gjj8r1490brw3lf7aqsvmrtulxijl24gx0qns75sya96p9ctj62u0r3qkr0iqtfilo11mmtdb7id5fgqzgvkjcd8ccpy4n3ctbo3fhiyu4wtqbfv2ul6iqmbz2dyips0pbmnwrymmkukvzonb0rx0a60n93x67kj0nr8g4qtodwtskn1jvgtsg656pmha0m591nw0q8w5kzsa9ckh09riwtgr6sy0s1jnxu0du6c1ljyp8aarbqq0x0ckew7wmbklh99dx7dkrt183t1eugk3nlbm8133226x3norw6s0g8la6j4n6qc9qt9siu4foktt5xauvnsakzzcd4wi83ybdo1l1wwucdtaq1mrj30jnpywze1f8672btss3175qtxhz0kqp03luin2ig8a5g2gcqa9i2bv71k8ytd00g3wo9xrt4qkunlbxjqjrnxvu6gxjq0wp54dq7gldgznripj3ra3j806m678pu850d6evv17aatw8wmc55bclqv2ni4sq361n0y87ouvz3lm431qiuhob3bgckmwwvamd5ajg8iq21sce8uymipzg9ndxc9ktmpe9wyd8bxfqx1g6uors4sluuf3zy9gd9u5e4umywlcj4ipijy3m99q37y08zrn0chrplw5z5bjwt9i839m4qiq2zafmhxugk16ka2zrtrnmjjq3rukxena3kxtvob5o1eqip73o6ezow1ggxkt145n7jivwt2xqsi15g5x4xpkmxpkj6pltwoulc6iiytu498pcgk29vmr6h3yoqwsp2afqah9he2o1mkgoppt4fq471c9wjqk761n00twdhiy37fxqc84u3g2algwxagtaqux41arif5c66cevoxbnd46wj7z71q7da0xphejgmdhelu8848ypiptt86lw341rc4a8pnmspoflujajeip9e20li5un97qo88wibyekfilrud2zwuot02yz3y4dvmnm7j5aqpk03ekz47l6q8t33myymsliuap6rd7vj76tq27p5u4b7oacidc4oqdwjk38htzltbfhw8hz9om1nkpy20e49qne2hd9ib58cmfu109aasn3ydio8rzg2d0q3ci115bsawakdu96z2d4f5ca2xcbhh7wbisi22godie29rwtg29090hdgr1q7kdlpc1wbdpgalei8kqx08wrynuhw9ytawdbp6lkll8q0uz4jb2v5n8uz8c5ktruu0k3sydy2fjkh50al2kywyw3lcy5mjk6wo1cb1xwmlt1o6ccobqwelh9bzjo0r9vsf1skd34fma9obkskrj3hl6ykaom5wvi4rywc7zl48gsjlasd8szgagrkrin50ln2c7l8wlsju5fs0ham9wltzb56wubh6qvnku4k5j1ye0dof0lekyzes5c4c7p5lx6ecddtjyh6hrj4lldgsg6tw4d2wg60yifjfvi9qzhbihtg0qsbzay0lf0n4x4w9ulusuo61jnv5yhundah69uf9j3u8ho558zwyq9kykey8z6eeb1buloke9h0o8qlg0r2x7jrk0j73glmmee7ppur7ruel8pnsjqr86wd1vaeolf2m6x0ku9t8ca67jvq3h584xun60bsum43o5scumdw48nakh94wwvn4t4yei29cbz001zqyeyox2mj3v2m1duyuzdcq5j7lmz3kv84vgd69tnn75i9h3uj4jw91aldn0b3yk2za17uvku2uk0vqwidm99g6ucoig8pl9noyvi20uwfowb7zv683ud2mztrirbugm2wsyalk9k743vweg8umx9doa1hkeu72dqjqun7e5mtn4ioz33ldog9uu6wpjuiby906j6pc02mdbjkdug2u8uzo062ef40fctxofy0m2pzezymxcksf9qqeieony9k51328sj6j6tkaa85xzzwjn32y63bp40funee0k50u',
                expiredAccessToken: 5181406254,
                expiredRefreshToken: 2529324593,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/ab75747e-4c80-4a6e-96ea-b4de9782b460')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/1df9828c-d358-4fd5-9ed1-6b5c97e14f6f')
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '3c0dfdf3-3c96-4be0-a9eb-eaba8a63689e',
                        grantType: 'AUTHORIZATION_CODE',
                        name: '3cvobzel6k54r8onmkl051k9u1g232q0x1e3ci899z91121s8rc7oe1fj78kfk172m2dzpom7441jhiit1tppl6cb1q3ng33p2dnu5jhq7shn2amixksna3wg3ibgvvhwiki8koleg02nt2ey9o12zb7t3oqw5ssld1scieujahz0khuqjgb9asik6z8vwofni9wip8knst29wxu95idr1xkkhefz86velh3qgwnbbnwnm9qby9lxgw7qo8mxqw',
                        secret: 'aa588eipyn0l5cxiybhnzbskuygv81wtz1wjxkwlztmeu0x3kjgyjdh7uplg4d6ylnwh5ukdpmavauqxm1cnzzk3dn',
                        authUrl: '7cxww4r9jem1rkiqiakddjd45t002qt6iy4ag485stwy1384i1b532428tdrbe1g00ojf4wrlt4tn4ah3xwrvxbtn38z62j2fdmo99wxh54j4emaj8zjp0ql9b7kjcntnjtbsbcn0w4tcpcvlesjdhxtbobd2vttmbg3hzdt7nqp598icy68xor119m0lmiqob83k1lwqkd3p4qrz8erklfvbjofupjn8bzxfpys62wxw7e87272bi9586pb6vlh8zhfp2e7752taob2zzws2lxapy5gfyopub7u5wk6x8tj107ts2k9ktjyt7b7rivrg285g5330tctx5dvqi37e3ulba8ghed0cpwpv9t2x4dn5kspiqsadzr2sm6vrpevtqtbi3l82x6v80l0d3rnf60kzmf85xlk97v6gryuq3hr8v2r20mf9hu8qhjnzq68yp6bg3a3oxkdmomw0cbvcznp6rtqgredzz3fotqu1petrxozmzltgaduoys8j480refafr0ggrua29grclewnx219h07qwurbwu6rtdneby47sqsahxcfom9txr95pv8z4u7vfs3rv7geoy15cbc7l7qye790t6mn0h7wxzlinx9mn0fxbnqfzxuu6zq960u0qz4ygi96x1n5ezm8h38upklytw84c0f54g5oq24qo1u3mi6tgmvmbdfl5tj60vy73skdwilrauctymv15gbuw4i6s03aq7sp0d4ssiuigypqmrvxhk7suyxrhalq9oci3by75dk024gsaj3lapuzh5em0wgl72k2oubt9lrguqp0hxs1js74x7fdj1shx8808ugs8phk4mzcql5zn5a843bwlo07posqcth2dqbtkwiqgso9t9yrq0v99cwa1qd6pf7fztmy9wv6f75q7k36ug4a3sqsc9mdk04mom9jcz1hs7ja6ddcsju13r0ve7yll55u4vx15dj2xag05ic1vej8fedk4xs7hliklt9polxa31sb69ipq1vtn634ikyt7u87eg82dw9rlh3pcovq2fujc0zaftk3gt0zskk3rpy0rspgt9kd41t63adcjc7y9m794leotf4apo2oyf9otmwxjv2c9x5mqq60zuodw6g91qdymyx7jichl24evmwhvbzgh1w5xcckinwwknsao7omnjoysgccx2py7yp9te3g5cg1h3dbd5oni6qkagnk3n2vousbsp5vzcozmytk0sehem9cai1ani40o6ccpx78q85ktfmf7aezisj1qhvfqks0cyxh682nbt6crnmsc3gxxxmh0wzf75jthxrky0nym88nsuf6ns6k6bkh9ea7ie05m4rbpckbn26kn0fgoi2nzjfr7zc538hnsuqigl6g8mhndmovouvnea478ht1nzcs0pnt30vw1odav5nn6a3ppt9brjg7ngm5x20vajadjqsshtd6mcgxuc1n06g8sq680e3uotm50iv8wqj6jk44ntdfv5bpyu08idd3tvc3vgnybvwn5uoyo1hilqyt0m68zjyc2lsofmos8lgrhwpoo08bimsuqc2iveyxjy1ed624xej45iba12pmrwfe2cd5s8nfolenbrc47yv7i7n8nfvmgeclw9lnu4ic0t667m7fnayqpyft09iv7uch9kfyo2b214egq0m7e6vod47qd3skl7x5zlrut71pgstyhnaxivtmfqul9t7t3lqx2x55v8i5avh3mypqvg7swxpi9njmpavj8i2zljn9fqwjb6ndpz1450umdrk6pok9qrmcxlfqfd7ozegf6e3cq4mg19xrm20qaygbh7ffuq19s58nvrwz6palpa611b85ooek95ljlzao77pkvj84ylc4et9g96d4t6xdiinrx5trlutqjrxssxo4jcik3byzmu0gwrgbrahb9je1b5v7qzz9vgowxji3uli0x7kxmv49pm4lllwi3021o3ovz8fhlhk8a3gtzmledzt9u2nrra6pzn7eykzvwsrwfxxcza2igtiba96uxslp1pom6vh',
                        redirect: 'c23w3qz3vnw3chiak3y2cw9fzvxh5qcwamro9iq4nbbnwjqyonie3xn3ma18e30oe9ylecfoanx3aqzxrujelpyrllda8qr90pv1k41hnrtrbel7gup5uan0guluo9cd3zsds14y90tpu685wsizoix5rtbzfqi1jomqvejo40n06kciy8zdvtz2u7bnqhxhj7krld935wgrxmtttv05149shoqexrndo6cfy62i8y9bz33m2m7d2mq85evqzs5yjrs8fvqhcau0tb4ttegltux7p7csd35om3wexbfiofaiscrcb9ujwh85hfeaag1f2khsetx8ea8zcejxzy5r9mlf3wzev5gd6pfevkhwct5hc140ea0fomfm81sx44i84ji1cmgokffodxvh0ajnk03pjwt6o5xk1orl2y2n324f7hkrwap1vbv9hyj03xix00r1b9g451pil7algf6hgvdiuscbyjw7hc7rgwyv5tsbzvryoifhkhlyf8awy5q9vlpt123d3kln3e0ru4o4cs0b8z0m5sodcu7430yxz338bvbvlr0wa5rir95xctp6rkro6a7hx2dnvhrgbabg48fvhlsl41y57s45g9qpyhgli69a74wr5ufxncs25ofmlaczkoat8or4rpgf2tnikmwptxrg3d1irpml93q8teas0smsw9byqt0z96x4xlg2cxn9dl9v3t18hiw1t5f7wod1doh9vje4qr32w00bcbtvb4vj9i4p8cker9173toj6p6m69nbt4e49uk1xoejdels3678j7j2p72lbx4fkzxozjw1uy447a85o00el6furvdn1p49suk0zznouplxob1ay46hlhuwwha3waw5kxtqjdg9p0hn90a3cj0ih8ot89kw0pjm6ahvd3koc118c7e8hni98emfj85zw46vk64h9ycxl4rf5edrd627ez45zfxicskoa4r4nxw0tac1gfy27tc7feh0icc40s69zmxz82g9b6rgf2bdvztcg8mennes72wiey518c2x9uepgjy1oyddo4wdtuvxvoh08d77xmhf1w9wxrb2tffb4o4ffpn69i7on5llak34fr5mfmwhddo4sfgx2rjq11j7k7rnew16o48spncvz9xgm16ehanm5dyci7a5yxnn7jlz8h6lz5ljx2dvcempbnxnnlki303r3ba1wv7x36jk2d9hivfzs4qp4geidsbdndrpn96a4bbpghptnkouwvkuenuqkc427bnt3ush2inufibe837v0mmn6bpdqe85psjb1kpp7m4khp1vqsohscw4sxdqserwica8mociasxuuwavbxhw7ew9t3yn4iv2iqognx9fkw1sneblqu3gd67iar6x4l0e2poigqdktb2c2bwv7zlbcq7olmznz3vfkklmruij6exhjdf4rhpq1e2xepl77fer43260z3kx5z16r8v5fdu84q71cq7bbqqpyl7flwaajvglywh2mfyiwxdb0fd5cs0i2stuot1avima57h811yg1g8y0ia7rp63mb5tuvubn8ekt86mooziibqdfj6qmod3ww3scmcpouonqcg63rx0smrcdkn5kjp2eybxksyeqhwfa4fc514mmzvs5qfygfkv901ekrzho4y6iojtzuacm9ucimtr36xirvfr8z76riaxj7tncj738l8pevmpsl0p8tpxe0ut7plpax79izctwrxdvck4tt5ap9896tf6urtci497wbupn8fy3g0u4kj7zynesdvr58577o4hsl2hb4qvyigbxr542za7xp4uv830qko35gyzz10hdcftzer7ior0yfz6jgsilqzzgxc1db3knbq96072z1yvffcp05wu6a84ac04k19snnwcgd16iq1o5hpt7amor29ofn27r2un9j8myelupaozbmlve3htd7pklp0opb4sj743i1v9bsur3u5262ilees3mafbgd0k2ptl9jkdk4skr715g7eh2t75tn9f4s66pdm9ylf1cajlk9ijsrwpdta',
                        expiredAccessToken: 6010766312,
                        expiredRefreshToken: 4181785433,
                        isActive: false,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '3c0dfdf3-3c96-4be0-a9eb-eaba8a63689e');
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            id: '27f1bce3-68e0-4666-88a3-514cd867f82e'
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('1df9828c-d358-4fd5-9ed1-6b5c97e14f6f');
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e60ed956-ede5-43a8-a576-960803fd978a'
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('1df9828c-d358-4fd5-9ed1-6b5c97e14f6f');
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '30a4a124-8cb0-43b0-805e-d17d5dbe29fe',
                        grantType: 'AUTHORIZATION_CODE',
                        name: '87bf5sq362zhv9zvh9lm5rcsrh43w7d3ilhg2ooeevhw0hupld1a337nbecq1vqeqa1b3zqne9b0bbr4oi11picogl7ezzok3m8kgztxgwmqvjeqzi1g47uuifkamuuwd676hbz8fttdjpvstsy2y5fc2lcdd6m91nr81fh4u0xg7aib6b4gde4isgsefifdzrljnpyli68nqykd1ui0jquvb0zb8p67c6e117kn12rz9zi1cjboffryat6s4lo',
                        secret: 'zxujj6auwuoyyt8vpkbmop4iuza6qps2l15wvps6i42rww35y23cjjbcophamecg4az2ofpq4bdlgprjkvea8pz2ey',
                        authUrl: 'kt9hkrm6bhejpd121k0j4rs4voyku40j58xyjswivrvijvwpe7azmmskr658w01l1dup708kr5e73ty9pu0witw0lr5j7rlkj3lf00pig9j3yn5n5bamigjf5ht21wa2cfwpwi7akpfl46tmny9frzjjkv9bggz7l3xjwnqryn8s7dmly1ugxu3l8oaujota6cogyfcyqrh2d51q7pjgkfxki3hmeocachcd4p8mo4c9yhbknljtqdh4kwrc20ciodoeswm4nwjlo3zzlp7kl53hcafrazw38kd97amsvng6n1bv7bfiz84svwgww3vom3rke4i140si740609menbr0vlf4n0rc66n5oylthki0x92ckbgber2ztyovafm7vh02pex5yvoq8oskt5prx3anzagoyhgs5nq7su2ouv0wipbqttv0ov4aqb1ztml1wksp1q9vw6lhyi7ffazeyj3rpqjyopjo4fi2bd242n94it6weew7s61kkftnorasbcqxfrlam6wqsv210rt9v4bzan33uhkabyx9xcb3ah6uvzopwsemidbmhy3nqy8tmwumi3axun1v2ymldpw7y32oeo8phhscjixmr38uj62hxcvj5we46f9z8yuxb6byn7bozwomp9p42va3p3254erfmkdtqcd2cpms89stxqnwjxyljt59mrsxkmass5dpy5lufmz2kjtscf2epo9n4eorwrazbzqpg4b6g70z2ymhc5rmgrp193v2otps4nnnjtokaawj9ixgxq0l1rciwkmejqr9467huoga3s94g34lfdw7ueas5kf9hehe8uxba2bzjt5qxfyhpgf9v1o441o01l945fuhuhxb7d31owt9rkofi84y0c6lhapwdk3sj5h2195wmlxkw370215qtl8gv372z0od0cilmo6zrkn0p3uqc5v42z47x0sr0ceom0j90s1g02jgpbrc0j31xe6m06qfzpjk0a2tohvpf0ytv7ofacliai9eio3bg8a92th94r7gn50o4ozlp5uaxekc9mqt0l1qusmuaefwcww6m2ssy49surbev4csbu0ehlca28cu6adnsa5yq24ijr1f708n95e356eobgx61ik5zlehgt1hh684r2i0o29f6i9eg41h56an0kr1j5xqgsx7iqs7zdodxbtwoir5wa9qx1gkvn21nj68yz0zq5j9xpxhdbz9hph1w6lt9lqbu34x04kok5n1elxmi329o2qb64naw1kv3a8qa6cf638dr93txam1mtrkft0ahqg7do520aizme1izy2ocm0rpbnt8qk1bb4g8ph1jfpzfm7v85qmsumgaaflpa2nsp28krv32dosvgo5zrfr5ujnktqe1dk46nlye80skqzhpuircffnr8hukehoeejgafhv7c9jijvzqe79uyhfrbw7knluacnxa2vsv7vw82b3553bxd8qmwehk074gusoy6zykjixaps1uko40sp1udq83h7h4g2qx30qq1zh4eppz0mqwye3thhbe1267pkxmc36tx03hnho1u7021o6219q0hzceaypa30033yiehptzuabwor4gfh6e73cakynkalg6bmpo0ky52752d0r1uj0puyrjrp0rvorisha375hj49r190l09ji5rml50bu4to88gmqndxb10j2jeapsrpapxvzuucl9a8pnpi7hgghowlju09yky00u1h5d486dea2jhq3ao8neeynw1k8x49hxzt3iyytyd52xkvhd8o7153a065e9s2cuhruh175k8zyux0m9vhog9ui7s4k6prfc7i2wyxz73tvzxx3ioaln96zw6028g5a5kfjnft4zg5ce3rhk7uzojpzxasqjbw3via66uywlupijoq6dq2vr9qeijzh2jsfexi9x4a4205ht1r441e27hy5xz1v8zao1fwjeopr2h7q3e9vt7dmdjjq66q4g2ohgu1p8i4tbqimxjnsypjd5x1qm2fna830gjsjazgqa58303mlp15ebqhk',
                        redirect: 'rwtza3nj23zbedx3nrnwg4f7v5i2s0vrut0mbxwdlcivg4ap8t8lxcjqshat17zl02jdgqt1osgj4nehyl78knsm1stv2m2vyprcu7l6bfrsmdkxzjz719b59gf54xqxibjiqqe7adxg0ykjv4j32lxsrqw6wemo625xi8vhib9mbc9z9w5fr5komfbtrrhr2674sz176rhgejdghsbwju1zo6j9rglx7kn46h4dyuzkfttwgscc400028s9tyqzb51c2f4sst0n6c9jm3zrn4t1geumbe63096ddtf44m6tf9qsauhv4tdonarlkvfo8udd0f69s6ri91f3rnlk00u7mmda74ppbcyw61vdkf7lhssucdxvi4a8oklghassorublo2fav2cql9jlk8yyajnouq7rzjiuyppntvvcl8dgmhg6aahq0whajqsemjr7lsp6v798b34wcv60o8fpgbr4qfm7wvuc6bb594liqub350e0hrvvw7ghmz2lbhlt904sl176y5d8nr6h1l9zbdfmyspkg54rlhdbr2n0lzm80xcpj4dq1ij0az544fvzo1qc0o9gvsx09mfxi3ldtghs9rm79zf6d0gjxdx6ftv1pdmg36vqg8ughio924mdokufofebt1x27y1ejhw1fuddj787kvowlyjagftyud5cq42dm1d5l63oo23sdd7l1b3scu4i1twvthadel38ym8c4n92im7mkrmxfoi7cmrnpk2wy17x9zjkhhjszvksp447j3v9yn1rjai62emgc5o0xvai76mo6df5zczvzpaxedjvi4q8td3z17s42hlxyc7bujxno6zk98ef3p0rsygpfyvnnt5553ka29mk2htbemxxmvv5xawfp736fp8y8fn44afnh9a4jp4dgofxm3meje99juna604aqq3x16nnlhqh3w1u3r7tblvr2ok53y4968zmwifxrfrvzq18ms00cvlcoxypsn6toox07q0s0yjirfj26zmbqx8vo9jk86mclzarnns4z4frlaf00dv0jrtpt7s9kqx8j94kdvn5gjq3dfazwtp3hljb0lhawka21ela8xb0memg6mmhfb4o2ou3osy97tyeom4xvt2858xsxlm8t198j8f3rcwkhqfmxqcb2c5he6nrlymxlicvvx2e8ah1tj7x85i0h3gh7n7yixqdxmx5a29516bxnoyra52pgr63skesn9zlp5s02e8353nt5fdb1eyavzg796zzj7r17demu9vmmdk1xyahzkqk4r2der1bgv12kvvo1gxnr5f6ipj11q9792dud08zus95w3ggpclti0futa843nyosvu34ve4y1zv5u58070wwa83gxrw4hnq6zvd3mcb90exdbat7i6nunj8abofi0raq81t03dyazrjk3lhizfr2oehr57e6wtnvhccf0odrkbqyqrfno4hghelhmuyien2b952pet0ucnt0t35j16i5vwzd42j63mqna4mcsk1mmgljwh10jseegxy8gus8xkwwilbdizzeyz98gb5fuusjfi4e8tpg1kdnkpjrapasqvw46apsbe2frsbs52l1l6pbeu68o3k70cqf3wke9t3o8z6wjb99frad96cewweax7h0rpazq0uiu8s8mcb3r4227g18y7vqj1jf172wp7ya64hqixjjhla1h4jy1x02vt55y4xh2kmshmged0zb3kwvwk8xmwrbdg69elfxbob61u3oid8rb9z6yxartk9seh59v6llf541lg773maete4vxhxjl58zrzc8gxx9ie2ajh6ot03tkuwx4sgs1dlxxr2od76vr86bon6tp7xa00tub6ywiqccz038rtslcttejfpru9vhy4e3m63az120j6mc7sigbab3auaoioijpooigq1tby33e6p0ls6s1zdxlystwsu5glocbpyjza2ir2es7w3yuqzfyqi1hj6fgekejsdf3664kc33mo22mcx25sk13x97h6y0vhd8syobq8tzlpkwdha312',
                        expiredAccessToken: 7209006113,
                        expiredRefreshToken: 2495606977,
                        isActive: true,
                        isMaster: false,
                        applicationIds: [],
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'ya2pzhznclegg4vb9whm7k9fdveeyeb0fi6lwlemfpniivfsvh1q1asp6e14041ha8ssaj372ecjtnc62bbun16919rhweu0es3bwytitzq6b2dn2hah2or6bzcnfb9jgwqqu1dpc4v2x06vaucy992uqflht2i7efrai9ecoac2tozsz8c0yl4b66mvmstvczrrs0farezjgqxcozhaqy570tbbomf1h2n3dmxnd7j29a78ovqq3vpcbpxuvup',
                        secret: 'arh9mndfi7tx48ih3vcpuwrfo13y0y17sikh1c97d318frx4mki6j4vpcm978vllu0m9niks3fucx7gytkl67farrx',
                        authUrl: 'j078r43fv54346z8kppztg9x3g5hole41p7nu36a7otui4ge9zudshceogpukmkremy0ae9hcimaftgpdzj64hkije924z72i4nkdcxxryrnh4fomdc2bdxyksh5mv4ove3jnrvvalhro0a8ciokkql3bvm6leqzxe9umf64dpt114ggv4ltllk7kq81bftywgnjdgyu4k7878jqcz5v9p49vcoeus9z2yhihtt2bvjupdth914jsplqps4p7jy8lrloci51wp3rmf8lpww3c1d9ti92aba0u9t7c486b8be1a1krd4lag2ct2m9662tm3bpawjo5bf0lziaomfag3ztijve5e08uvgxev18hr3j9q1vfi312c9wyh3jl1p9c6km3swpuggfxi55wvgqy32o7t4wpikivuz5d1s6nqdas1qbppl3d7bhfcnw3mt5trov45y4tuslror89wosuysop8xf6yi8aufqsyom8pnmhs52afs8rl11ivqeebc8rtsskgev2kap7wfgwm1hrcykmgkw54px8d3pjexxfxzqfu824eg2vufy9iucu368pk316s6yrmwj0b21ifzsuv3qmux1gmjtvwbsx0g6l8n2spob3pgbdpsorb4ymb82mh4r4c3xo9ka0lmzfn0ot1muehaet3me3mixr81x2ueohw9cgl3wep1jqfnr4l6tvhrhjjf4jttn40fguoyhwjmywr8u5h4gwr7let9nvu8zuxbgipj6jwcqtyv3sbb3ivcoihigbochkny8zhzhaxh5ertbztjzu8rzttcpxqxuw1n1ex4ims4uszqys18uvuu195j4od8kels7ov48ipl17to6s7a42yd2a4azi5nwyb32i6qn0ecctzbxs5ibwynu40p9gfta5iypzsmjchacm5rfb50enyq4z09iv5en6e2vm5pzflmn5kr0hqqsfcjj6yc5ld0f5k0n56m26h6l88mfho2g0pr7l5luh7noyvvhcjm6fipant0u5osb5yaw7vqzn9xdqt3n9w3ywlocbawthkhuslxp4q0dn7xnxtvdekbfgmsncfs1e9zfwe7abkfiad92o5rv995b2nxlfe0eqsl1xphb4m7ogffxh00gwh5n5gusmjchri5t6w86jwcygkm1dk267y4ula99o3job34d8jgd71197yqfpfk1i6n0c6r6ugnwog05oup1ajas4f1sr6v9zx56axjhqmym98a9pzr4wpx6yugwyphgrcbgj84ubrlnuck1kv554zo2i7rwxifi6os0x4d2q1k33yc9d76ujuxv8taajzjxd0q0zjx0y9yt7cm1iho9d0vmplyl4boih1p8mwnglv4er8cxc4peqqisbnwfy7tlgajj7emjdmnbh9qv3o1xaviy1grxf6dr1fif57urqd37j7xkmtfcbtvy0j7gh37l8m77sovq7ave9yazqlc5mgjflafh3mzkyaasebphdn2ivv1e2ye9v5ykg6j5nugcua1rr80zcrbqqyaxju8za2cunoqc5tabgvn1b0avnmyztqy9fnzzconlut7rabl2b88gid3psinbuv8d0e6xv04u2zgo53tv3sqoc5d3yogr71qiwn4v0700yovmu2lv8wko3qxoisi0vf8sny0b39sjq7y8ip8r4b18mnqejsc3dn0i4ztkcnd6ck2picigv22gs99wh35te7ooxtixyl0swwignz7t28em59v9343my6knbs14c1g6tovom33hyjtjb1s18f147bsy1z79wnt8k895t671f1h9nz4t1dg20i3wxbhzva91k8f8g2xotbisovvkyh60kd6xb28nk5f3wi92vh2eog42lzfrv141btscuacnd3d56pynj8txjbnqi4omo4roztc4uy54jo54i9fnep8a49cd11hljub9rpgnjgll9xq94xg1j4yuhpnhsor1unyf4exgj9couchnztjuuj0m6sdnld0euaan86fjxagrgsob8uvaafik8g1f838m1ayo6akf',
                        redirect: 'k6lkas25r2qeyujpthed1wiq5v16ygu2au6d3p8633c1zkzjal1x73e2x7c356wvgxlif5iitsbuvvh45law731dkjn1z4p0p26bmnz4d984rfmsv0g6qm3qb0kripgsrzoyikssw25fniq378yymirm23h0qi3ioz5cmii7asxa4evygryk76a6f93lzto1u84lgtdn2prjcim0i6xjxbdgcllwnrglqhlq8n7l8dmfg970t1lwfau7o59t4ilclpk2qzlz8w60ee9ec3gik614k55anqlggrotmayjn2ab8vr3679pjm7sezqg49rkja3wa0j6o6hp25gh4bi07akbh8kp1i7im4467li2dwspzookmy2hx2q49w8nw1tqg094eel7acymfkh7fpcubd5ivhfx6g47etct1gaq48et0ucvs6n8u5bfwrg1kap22ql1sremag830fyfh9ko6pnczf0kwptibeuoeva5bos6ym854bexoj7h13aphtv2h2v57w3ufv67v5l9rrikp6rkze5wpx6xi42gzr90h764ymgwzph2p3cvz8g1pgdmdrp22goywah6ectc4vh5xj8gp1dlok4gzf7b2c2lblzeledfy1y9ho2rz2j4s293pck6qpz512absba399fllc03dcba4byz5d5ikzif0rnphxvd9a39k6i4lhbwh2eajecu5jnolz215uxv34cef9hkktyk1bzdrfvf8b27f5na9te9pe2uz8kdgtgzpip25e7sxdabv6xqchz6sbeh7wx0vqdendblemz7m70augdpkv2kz5ft97ywl2mvzj07rvgfbygrkz6fqquri8exsets9t8hmxxz07dbkksmu64lpp907xq46cd3jl3b4hr8q8emo5d75aod3fwas1z8i3cwfo9miqo34nje22wl1et4wjc65vbup147oa0s1hi0kt26kxtwq1nm5l1qzykrzhyztq7b9ns1b8rzhpy1c17sl8j3c758xkw8wokn5oqao2sm34m8mvy1htenbj0nvkyjqnh7a9ukjebdyohqonll4dshe9u4m8i46llfirpo6s42mc925vi2tcxef4ymwvizr5m88krcmhfoj0hs4wgqrnp2sv5hosv3gpcmui9bbpt6d7rnvbmgayjnjo722ck0gwdyocjns1vwgm4y8w0gg9tpxcs8v9mfbw5wrg05axqm6xt4kh3okfwwr66n15v6fuo6ytbfemlacfzy5tylnl5mngxeuhhno21i6e551m75g1elnywdj6qgnnok37zy9ohsn3pred46nuczd1hde2b8uboc5djvhlxs275bo8142l412x28h122alwzss8c6jfkcqq30pz2gxxl1d2l2fbd6c4vz1s1cpkzvmsc3ye1mdpvfre5biiuuqcp8tkmizmv1watp5n8u1wly7ds59s59y2jppp1att8tu5imuyadg2sfinpd3r1hhutl8ue5p5j7matzj1r2qmbdpdcw2w44vdmen1cwylt6bsfhiyxidux6rrvz0c1ci1qqnxuqy3k2uc8ts8mu1ivcs46zx9lbp5q3nalx46sbqyclecdth82itisdoznjm4th7ovlkwbjoiesrkz9xg9y46c9yl365hbzp65i5ebikpn61k1wr0lhlzoy34qo8q52rss9ffvi2n2a10vl7ntr95si2szgyeiomtr1whuoktlh1uj3oz75eiuyqvgmpliivg77j447xkbnyz4aatfw9xqditrfd9lfngnnsj0xviq09c5ylfc5fl2cpleci4vucf06qnmbwupgyxlgyd7sm89h9r69xqgboqiw92zriwxq4r3dhk7q6kab1gzjsr26auu645uvpkpo79x9l2q9hgbj5k0mj334brxycamdnr616dy5jyjimrtqu5wlno8l1ipiftk6vunrdhnm9a9sqsvx1w6qp0c7g57bt48yand6gichekjxnp6bfhondvcbikna4vify6a8bgaxl7ez7kw94sg1mpqsuzp5iqgm5l5',
                        expiredAccessToken: 1181024991,
                        expiredRefreshToken: 4453799468,
                        isActive: true,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('1df9828c-d358-4fd5-9ed1-6b5c97e14f6f');
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '33129e57-2332-4cd8-8b6e-63404571b9a0'
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
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1df9828c-d358-4fd5-9ed1-6b5c97e14f6f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('1df9828c-d358-4fd5-9ed1-6b5c97e14f6f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});