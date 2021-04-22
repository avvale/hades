import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('user', () =>
{
    let app: INestApplication;
    let repository: MockUserRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: null,
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: '9dno512xwv4m90ku55siomudlhtlkri2bzsxqlpqlc2naepq7ml85ts4r0a6ydmdzo5ooemerx5jw5aqm007eq692jafuzibmwsy3avf1q5xbpspejx8yx93j8cpms0kycaflhbm2kmqcpfw2n8kaib080a8ywhxn21ecvh9i60up11sc0dvx57cwekufta80i17y7lxtg1z2e7nbjp4t0q14jfpxbvedy9d4tmjbohse6uxashn0q6znc2mi01',
                surname: 'ohmt91ffhoqr8rfx5kottx518tvkfrf26mso52hjjochcgb864pyro5o3d0akqpv000vev6nq6j9cqu0z5atx2rqipvowu1tgued94rljzms0xjzoayhpnxyat5mbulz57519okpuab1637wwwbrfpwglxovxb9zejgx7ljvmjqbf4eirbw6n9f1s1tth7t5eljt3aymlsiuoje12z3qi6m7voh5r2jzzwvpa0q3pn9b9h009phzlb34cahtb7b',
                avatar: '2b0t4mcq8s5m21ir5wss2efoaccj281l6zlpor562s6h41pvi7dn8lh4730mta56dkmpf8eyy1hovanv626zto77ua035dy9r09gcwkbeyaco7u416gm33ozg2xrcrkqd4vx5uqg4soe6416a3linft5jvt3uz4ksbsslgtk6ikr2ciya6jcvs7j99hoddcfe6aw6hj970e5ljketn3sv19r2wb27yimtr3lxxu7mmhggsxq6n9v1bbrnzfs5um',
                mobile: 'dxdidbbw3hcgm03b21irqaaxg29crxm3ccqe28a0gh9gdk6iuuba55zw3kn5',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: '8bd2mue99gv0zqt1bc9ud30b7hbls2qi3zkljx4omf6xltih55vls5ypbttuzh7yup9zauanc71ek184soywdvmrzmflrivxi4vwar2l6ouvekulgwqok90u',
                password: 'u2qdlrsl6qxxz26c2wkvz06cptnyddugyvt3vwoo8ohmvgj1y5n10nguz789obu9vpje15g4s8xceilfdrgak724hkd3j58n6w62ro6crq22zvmiv1l8zp609vpt783vjuqxszp07k7alhkmenxngx4yirbykye6yklha91xi5n157pipwgsiu6cp12nk470js7688aj20v8ydi6ibimy3l567772xyl6r4u5mblzyqpo6ikvswrlswmxkny380',
                rememberToken: 'ucec0vt3p27ee9y87rp1vnnneehwnmtp4y4r5nz6i9rzr4jrvtxhn3cyvduhqi8ga4jftc5zd6nvawwaa5j8kir9x7j874mlpqcgb15hcp0fxfape90wx6a2xnd0p0yh1ukaqb8v6bzbx3mbhf5oma6hby38x3s9iefkate7anz5iysec8k3cuawtcyubsrswfuzcz1pen4mkls8f687uuz22aodalnp3cck6yovff6lses3br3sovnqnxmuwsw',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: '5l28tkwjxq5xyo1r4p7tzchx59vl6kew2p4mtga0za82gnfgv21u8ktwred07dzw2muai5noub2637s6iyxeb58zce1ng3beic88e5n9n1aosxaoqfp7lyuxf8d3frj622rt02oa9urb5pf7s771m99fs941fysyorq2ttzlo6enlsjxy1yo0759gjpdfcq7f9696ta5akkmaijm6eoz0za7sxtvnvo5haz8zs2kwtparbzimcecn60jszmf5or',
                surname: 'nfziuf1cs5ndn3teiki4i0dpew048bg4qgorvz4t273cf85ln6ehtde5kml0tspan146lqh6rwse39agivw23t0r9ikl59cp66ho5k9d1z91ee1dmy0l4c5fw0omaw02dmgpdhn6her5n4aqbaqd4wbyqvin8fap0wbsh4gjuzllpw8iqqv49hskwg6irzluf7u9xptizamymgoklsm5s6thih3c9eibyeud6dnvedxdr37nq0mkqp1c8anrpl8',
                avatar: 'lhaa7w4mg4w8e5j88usjujbyh8euhd1pm2axt2esius5omjgyk83upnkayz5fad469i8pxvmdlw15bag2tpiuwcta3fhfgqzshcn2vbwvyqs8pv2y3utvwwzvlzw568v5kit9phkzflm0ytqvm5dkdle65yuo3eguf8p32ewd9k65rfl7eqbbkzc3l91y1j3fln5414k9gxpt42pt8u6rwlbq7kruli5ixzyoopcf6pg55sbsoluydf09i6ravw',
                mobile: 'h1vra32bpf1dh8drth0pvmfdqnq8l9i8mf210lmhz397rprrexblh9lu2kmx',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: '4s8oqr0d1yij6y603duih90q0b5su0ddo0u3lt8ob8xcw7wm6d6b5kz60ydpt7ezgxqnq0y0k6o5r7xplwhwpwgf9nawirkzddc7xwl6qcik1n9g5mmtmifn',
                password: 'we0p0xsden2jnt3uqh6u2066aah7upm2r4qmhrf9vd1nqk7gxov6ckqw2uu8d3veokhborpd5u3xz8dg02dngks4n8re6y1akk1tqkvavl8ovaxovwddlkgt1xct9a6vl9utz7j4yhi6osdlrm60wc5231oyt95w9k3drachig864hjsywr97oxwru4lahva40feqmhh2vkebfjppfbv7q4ta5j1stqywmibm1xo0rv9i5lq203ubn33ibdnzcz',
                rememberToken: 'vhyirqxkg70clcrbxubts03n7mw21bjnwtnr8z9ln34i5a6ueody0msqbrzvssmwplwnbzlkpbe0ourrm246qq17d7w7gylvjh5gn5rqwd3jx4wnoky18lwpx1cf7nxi7ovxvyfr1dprnrhph2tj42xh3wc4kukx73edmon9qm5v89iwblb8gnx2sflabxfd04vkojhiodx5lb369fru3b594lirvc19wtnr5tpn30dfpzwv12hl81snhv1hp3b',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: null,
                name: 'rf05zi9vvh4jfeq6bk5p0jilil9mz3zezkwl5mzryy0lo5icwhgvz7v457yslwjsssh9k2gj254psz2hpophpwyfdecafyms94rzhrz66k1jf4ny3ljwrdkri3deo66ev3vzjn9867u2908w0vljy6nycehkc3dixktpwgcnqkxzbe007hvht66s99b7ki6rg9sakd935ngae3hye5x5lqmy4wjsjm5yzf0cqacw7cofm67dafglx3w469b9oac',
                surname: 'xvigri77ou5ncdyylnmbqvdzhwp9h2mxvwy9whn9vv3z1o98946jebhlpzyvgykrccg2hcxtnd0p2vtii6gi3ues3getyn0ptcrsqijx0prpi9lusoacpp90c8uc2qulwplb9r30ngooix8r6t7rjky32hublse6j3lkacx5msy2rhkgfgvarchqiq50bj2sfwe4bqgnqevecvvlxdmp8s31kl7585dvw1wx3ojocwab3mwbduab9nus4d748v1',
                avatar: 'mymufc2h7a0m0w15fyz4vjlk6c4325pyjff69n3ubaw9mjwcgqg6y5nxnia9l96rvyzlla36zwgqe6so3rjkd3tb033zjz3txxv2zx42vx5k9eyko5xr3fwzi14ad8kr6pxhocxnnynq331kqohag72pv1egm45q18q26kzcclzs3oepgkkt0y1oyl7qr4t5qtqihzf4gfeb4if3mz84306tvs659am8oytzlg9tcm3m63gm4f05hkw3qn0nc3p',
                mobile: 'edywgqzyqgu3024g10802x1h30ypk0c8243vk5b5k3ymi3ntgermya7ennsx',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'i2g0mop19uiylz3rhnrhjh3n18nyjfyy3jq1mequ0f20en7tkntqog7wflfix0o4smjpl9dv2q9kpmtclzk2l4mup66z4hdkfvyvrww6npqm22xlrrlvjj0m',
                password: '82t9osekibo1j0pvmxd3ervqh23822a8d4m9m76p079gpfjpyqbpmj4v483sf2lqywbo92u69lm9xwf5uy2mnnlxgdpyv3f4kmbhl40u8c7gkqw1jyt7otqvgculcszrca86pgnbiaje3l2wubsxo5y2lg58jlurpnh00j6vymv9qmkujipb2widgfzhtg3byh8icy70p5k2rivwn12sao6j9xbjz8nw7edtqzqnd2bjjsbyzh142n0c2ikq489',
                rememberToken: 'eup5mfcfjyrh8r778zcl20a5oq4607efjfycf4qqlb38yof5rfs0db0bm5ev62r0ukhhegisotuefgq53g4sccrwuiaogsi0qcfenydzuf6wnnq06zpqd2qgtlifyuzh80enx1sq65kpteoyzlustai7uyztat78bp61zqqe77g44qt8i70zubnpjstots4p6majidxybdym8ajlzg8gtj78apzhxfx62vrbjptb1rg0l9144cvca0d6juqezen',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                
                name: 'ksqppttyn1p575hvgxnd0sz0zzvqbpcjcp79vw4d7h6wjs18732kaxruq3dgb2f1s9gsy2son6e660xlzl8p3rzyyzqviu1l8fxgxc156x73zsplwdghx0xu1ianxdnx4zae7vy7m1quj3sqoknvs837ctdhai60ua9zj165id1uivxz0yperlpshhqvxhz3hnyrpnzmvn22t9kgvlu0eag0eand5yrimf7nbnxqwdwfozrzdav0xopfl75f7f0',
                surname: 'n55pum2fdybfp50uzopmzzgxedsvp429j3u2lthnf6svnvyrsfdo5qszf39341i6anlldk5epphtu5a3vobhljxtl5hz315pzwe0gpk228oka9x9clw24671ubl1alcnxwn2fkli69my8ltvgcyrwykte7l2sz5hbcewnndgt2ytuar3likn1r1lwpnoa2vo77iweopz3l5v88jt3vxuph2przp9hzzm10zgi1h92310iao6y21rzkkuh11hld4',
                avatar: 'vc2quilfx7xr0h607l0d5ie2tq7g3kujela0ewb1xy7zuk4c8tavtqzg2m2dxc0m29v7z1vt3w6r27kj415zlx4ahvsgkee2jar0df3qbdulq10qyjtaiqb404aozzzx5c8drput9g71ajhi96q8j92dr7933ylktrgk6ul7x5c4xqcu644lohuqjf3xmru473oj27oydunogze7w0lx4jh4xp94892v7zmowwk9rw4u4iiyd3tp8ubljm5pwul',
                mobile: 's39rvsby8k0dvsmk5n5snr14u4ustyf8r2zd0dlw8drk90b3fze4p7bh421q',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'ri5jdy8oyew09611eyubosz99d2ks6lozcp8vjczlrrjwjthj736xnw8lirc8kshu5qe0o5cklwxi12poq38wyyr5giiubaduivle3ykj9jbalcutv304zuo',
                password: 'c2g8jjrqsu5es00de5k1n3qcw5ji4ydmmjvmly3qhfx6xgi731y26cmpilxtgv6d8ywdeb3jfqvsz9tza1tynprrvq7gwqerr2gzx1z9di05ulj959o05rkdgo7x7hw0daysq8wjao5jylburgf7ndpztkcbv1yjpcorrhuencqj9mmv43tldxqk4txo3yf1fxeaa1q08qzliddugjz4u01nmzbkps1ssunvtlrlvzufy5vqz5ahrnv830vso6c',
                rememberToken: '7070wsiqn1nx6xvljbk3odokdhiqo8hbirql6lpnbto77x57d5hdq98effdq17gk4o66akrxula63ygkujnlcrz4w054xqvrsgv7yhzwbd7bz0stijoettx9zreyxd893yuu8fllyyb0zzref2ub73g38bs4d1lgrkvkwwoyhxz3mgnm71pv7gn5qae5t9epermn4jua22vjh4vfs51z6g1nio7d1vj1x2u1x26j529e80ldttowb7vik5zj8rf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: null,
                surname: 't23detjwtavwcbo7blkhfm6lycjf5yl55is4sic2uwuc1rnp0dafe5wy2atevbhzkb5eqouunjxcdl2g2bro6zc4reebv04b57ogrtwoud3ncwxjlrr2i9ja558j5l2uw4bu9f3xdeis3wlcc8ryyg1a8oklwbnbduj6zngfspmwgkoh78vpb4dr0ccr9doekdsemz7dm2php60n1kbsv0drqubx2g7apz4qpgiwnaciu6brz8zsatt6johce79',
                avatar: '7zog64puyobh0iq6ok0nz5mjmwa3rqtqlv3h6d5r32do1ylckfuiewhr1qkwm2g4win3ro98hof4ggmwn0ammw6hqb3wni7a441puzck4fa70j0126226ngysp5a3mk9l8op7u8lj408gch99hol1loc78vl4vsaap701vcodwhkrkzcdfg6wmoi2jhtd9k98vu5efkkvxizy6u70p3d8vh4cre9h3mjsgr9jiwtrimam3poc1lqe6l4fhmdaa9',
                mobile: 'nftgdmcb3uzxhmqzd2ss66obnqluymlzcabio3g8nhkuims4u8mm7mq9z8pu',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: '9ngl0bj48qsryx4u1vq8w3bhwkl6tb5v1dcaxjoreh3yjsq2s1jfdh6noir80t8d5r41jhqkibteow699t2e92hebj6ho5gs4hoalzslyntxgvjimd2mcsl1',
                password: 'vni2re4axegjek05h0spduqwjeqlxik1tip0y7aqk0cxn6bemfyrlib219s92vmkd2q6j6hpxup6v0visu0rkqzoq4yiaadf0to1nfn31lac6cdfl8alkhvu21zawzrou1k63sv4xoidh8qpivdj6vmjuejh8xz3r5wcwyv9lw0bgcwi4rbb30mmm8dhov590dugbza3x1og79axh2mf2670qnrljhsuqvc3f2dloumekz2m4ylh28h6s56vanz',
                rememberToken: '0m1wbhrlaaxylz3y4ou2gif7r7zkvk32kta9rw3soxk797saxofa1uilltytopzv0a787narjy5g339exlj6hnfv9txc0adst0rb79qulavn81fkb69ngiakfsu15xl0wjwec6poeb7orctfqmsmxxffg056er3sc8903gap9h9wfwdl34pmp54rwldzznm1ao4b65ndp2p0zdeivuvqf4sjqejbb63egw5uvj1npbkptwnt6fkzv259evj7hf1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                
                surname: 'nw1gwf2zkv9xy7mp21sczbi2f1rnamhsooxxuu4mufpswc2widoy851kf7hgqhsvea5rh9dsgeu4xeu5ivswi5xjviffu5871lmj7dceh9r1ylevycw1lncpaoun0b3jvr0shiqswsfvkpjvs2gmlnhll4ri5bpvlqdxksrmljon3cozqq1tthuqsk9kid08z7e5893pbw3kgu602yojzzmvmp349ttrng624gcemxjnahkhk80mxnhf99cqps6',
                avatar: '3o9yevqcffyfe3yldx9kvi6m5qfpae71wxv18yv64yesb025mdkr177k7urlf8whtaya0trz1y318vvg95jv16naswzitovk5iysp302eu4tp4nonnflbxvsq4gm88t7sj66q6orz877xgqkmoe6pu1qvoaj6dszfdhwmqgqb68s6smjdntkqrkk2zkwn2joe4wd5zab6e5mjt7xkmy5fom0j4m4r3mt1hkvcommtfx332wt645jjqptmg6d8n6',
                mobile: 'x6ii3rpl4hywzc2m82dvsc0czbmv1jp6lqtj9fagdw7pn74ofymg309u39dh',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'nqcl6mg3mi6zuitih8jfvey9hh88nr5gytv79g2fhroum92h13vnxz11aqltnltpprmk7nyab2q04uqfn0l99xnccdrwq3qty9vyl6rijlsvm5bi0p5tazeh',
                password: '9rzkxm2kfgwcxic4zbcinpcjx9atlxb3eg4dzp4ee1rw49nf83z9pi0rjkpfa813o9jroluhkmletzc1x87zqrctr5t9lc4rporlw9tx6r7sluiz06wuz0mh8y59srduoux1ttr6iu6h2qv78mteqh8bpq09dad0vb76aqhu2n1lhmv4ntnixmwi0tw29lxuc7llywfrpg4m3gugabftqlxi00u93ogmn1pns2r0wied8kmb6565ncvfywzqiyn',
                rememberToken: '48ko9cqs9q9xzsdej5mry89nbrse3l6k9mxcx238riymro5glflxg6776iwnx4nucfyrwuojqlqkml3tbq8z2o3ors4ix1zmsjg0r00hlfy8ubq3rvmi3iw84av8squgq6x89527bdwtam77hfqehty09v5ull37e5fu475sfzip0w8ffyox1comim96z2uuz0fnb2oxqwzt49kmwgc3rs0bpsolbag0zp490ro6jj67ahulk08cvmzi7x7jlv5',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: '4x5bp06ye420908impme64z7ijpuvzmko4lacgiz2qh094wqgwzqcrte2iuhknxfrewxz1y0c9fdfysskrjj32bf2c9oyg1uv3tvfstxeisvfr3rn90cjzmtwjb7nokqz2s1k6u3esy246osisg8yda8ui19achgfb3vunzn52euet00eusp7fdtz8k167ju75w4lmgeykfs6vga8a6032zgv1ebk1wfhjv6lvf2i8i71cyh56kmnu2tx8vwi2r',
                surname: 'dx8vvevh4v8zwhy7lxl5ap6dnkcuhfeqha887ly591cc2p3xbiw51qn8mfgyekhjs4aer06o9pq2lqeptzmuvcjbxn3n1rm7amd84kqntpyoeki357sk56dheg4cz1njvi9vyzamv688zj2wju0jxcwctrxem8jo944wo6vpdigqysyx09bt2ok7wubxy0edm1ppk0mq1np8j93ajgre5e9e72gmagiagewj5gsdzdjpuffqrxd96ez1isz36wq',
                avatar: 'g82lkh1fir1tojxu1w76atbim3m6hna97hbfxhhxta6qlr5g6g3cxgb31k5z1veczg52ec4jdmwaib60pnmfa6zpfhmhiimolj74kraoexea03ifufneo80smsqyx0j65kd5d6861wdenffr9rwnqxnytwzpvfoepm4ad9jpw1h4l0tgcpquhl19va7r7tjyt18rpx2gs9fcyjdmwljdo90c45cicrj44u73xh7mhqwrefyti5shws5hlmitxxl',
                mobile: 'zcdeum4emv95qtkpqwx9ne87jzfyixwigv57fqymjf3edd0ato2imrsbd0t3',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: null,
                password: 'fru1ci5tom54t1tcuftty8tf34hsjnncdrgp3royz08cua1k8hr39zyl9c495d6f1rsyrn30x687cavubfpofcz8l0d3t2mtt4n3inwb9cp8b4ds8m4t79y9l6r9oaigsl3k8exugolb0hupojcd0ra3fynxhk2yhsdtadhlnyhzt2j582hmfxvapobvv2tgs6v341iws2e6pfxb82ahjpptzpsawnkkybupvemaz74kw1b2fqao2n060rfi99u',
                rememberToken: '9tu2xvzd08y9z4gu4gbnp856ptk5uao0vb7r5bs8jh200ftp39wz0xd1vgrhhzmyzy7nc01pw8868mccvl033gioe4g20u65vdgvvnash4wo5ri6reerqqt6jcmy1kxihj9ay3v8gpyuydx7roz2gwuwmwgba4l2gue9zip2y58se8d6jzktkq637whyuhvmh8jh9z8dxmkp0psn02ag8uhqh5rcf6zxh9s4wld4b5tklhyq4l3g1uvy27nmwx7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: 's70ti9lcwjna83xypisgk3jh863nd5e0z2nmtcyruqmqilj0cdsotpitib7k02xjz0ag49ckmictucxtjvgqfhw0yux53aw7glssdyikvk2net4bg9mr6240tjuyj9gttwilw9jyg8knqybyte0g6e603cpq2p3dm9zvt5u78y0ujllthm5mvh3fszhrgttbt3ra951wdqf62767vhp3nkwp8pmyewq9s4qif8t63c3x949ibr4z82vj13zkmiw',
                surname: '1ljl9j5iah7tehe9ebtubm0xpl7u8g6uw748aume1tyqqj1o0oo1w3e6nhlbqph43qjn86xp1ahxr6oxj97hvs333s0c7vpcltaz7jrmyhks5h1b4ot8k3bk39fc1fkzc2v3kceajw31eifpit2orcalfgbckrgkvvylx2iqtx2tn07p28kjh436b6p0hifrwtmnap3hsequhf0q6wl94zel3mmj9ki06zk216b48o6ypynlfmq40i8r3538chs',
                avatar: 'no672g54en70bcd9xsvm8y3vgge21hta0gawhkieao6vbir8z40i8gu87abyjlynp25g80m7axah10ki2x0fw86n7jgm5ysrnpl1522trsdnn2tn70evwhmgjdkcuulkwkzdiopn1xof7qh9ybuacwyu1r6i0uuppcyemfuurjkzz0opzjvqh8nacmlola4scoen2huyvqkhhy6lu8blv555lzb6e3ymrsa2b0cdehn8stibrowatvmb9u7ugqi',
                mobile: '7o8rdqk9xi1tobuo4krt0w85l2qj8her78dv2l0sebvl0vzttruedmro4ra5',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                
                password: 'h91usngfi4cdhddnaxx8x0e60viwcj66i8hysh97v7dq4cznwm1n1mqfu3mjmshiv1cfe2b4hzgqhejdjljv4qzqjh85onah4dfqh101dsk6k3xer30f9i9fsfhophy7jlujb49g3zzks43vbkwy7616fqc26w46h9jy78e6ymvkb0psxic99ggihbkmttldea9s6msm0fr0lc2fqsfbaklbj2d6wromq9vv0k364syf8mj6wifesp87rvow5jr',
                rememberToken: '01xbto0i9k71034c9eobvra8lyh0qk9gi9myucquavvyevpa5vygfwdfy8ekqhk7gd42lerpphbxnhndlwdea9ptxw7zm9be9trot87uutvw8f2yj9y6c50rn48jpwcylg01t62tvcp7gsy7zxmnq37md42ic8d0u0uu0hrhm6ysoa2qdn74pmkpovfwciz8qhzd1r2clorolg7jxprgqrx5eaq9fxjgzrq4welfbeto6kk01a48up2krrve09v',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: '1gb86xqtuol215x33z9f0kc9uka2ipl71vh4tyaoakt3ltywfffqywon4bkdr78nutslbayd73p8tujfckmjej2ryiwcz0lppfle70vgi97a3u5743vs8cd27qc5x2v6y0k0kqv22usx27ikpynmnhynr4zmavjuan5xu5517psp35is12i0l6qwmiwkkjm23kaobpm5rkljmd9s5kzgu1myzlh84le8d0fgnpjdmrsypbww7m5i0if90c2k74t',
                surname: 'j1e3iiusbqdjy7dlky9fw65gkglv9j3o5y0ftkuotwtmffwm9u6r9d5wdgfv4vistjvgc61gf9axyl5d2tn5o0fs3nz8wdv4paca2jlxhwou7uir0729be7y7bol84sxu0pavnhg8bjdm229xqxthtxkkvfoh1mhv9ss4wp3g6lkdpci6yb4fg9q4kiycopsml70jr23bjrqbalx6jnmujvdtigs72piel1q38q2ys0ubhb9cog3bsd1ovkmok7',
                avatar: '8vqd4oudggnj9lu14em0cnsa7m52ydfkgddc5dee2d6gsa9uaz1ixxj50y1lxypcu1w79h46voxqzyw8vodrzlq5dij5xi10hkble2v9r3w8bj7il2tljn05zth1usbz8to3l3h3q41ceuj1jr2wytogmhyvf0ckyr91yjlmiknwrztll5v8qi9q61weclge0jpxwuw29cbj9wgsoborf6z2clum0m8k570lg8wnrlc7mlikhcvzettsrwppo33',
                mobile: '53g7pwih2uvyqtimyr7xkkazy1dngu8xzawmpfpptna8l3wt5cee6ko37j51',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'fhzmq2ovedhromggp2wmr6sfzy8gdaicczkxequ8l9sck11szxi53vbsncw90xryd2x6iw87dse3cu2jok7f4elv3bh1odz5r2e6wjgjj5tpjfzssnppc1mr',
                password: null,
                rememberToken: 'w30rako1i4tfak4snbh8ai0955xva8rllzxoeodberrqowbe7rtnyl5z3eektu823kink6zz09dm6ruwt91ul5zt6no8rw93lj490r9vkkfbi5b65fd6goh50sbyj83g980nhp577bjv94se9ioabs9njzccvhg76ymijstg3haniqkp7bu4xqq5odf0mgmr6z0g240y0xabuhegpugjrsb0glp1p927n7no5thicy7qrg6oq4ycrh5c2z2knva',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: 'o37cw4no7vhg7jjksi0cpm6hpg4uvs59njm153o9qkq843uxkduyw5gnq1xr28j9n65023dzwrkd6o2gkhg4terx8ujql15tnpmh7hmf2pkl7fqp1p9c2ld112vufy6wev62u815u2u6tpb1vbzxmwk3fmwcswg0vpmrigieu2765ymlmjjpigbjrdtlzffjgujuelytl92wy1wzyip14atfg40rbosc3vocyg4ki8idbeoc1wdazh7czqe7z54',
                surname: 'uu95a9807rtrwzlt4ks59p99dmqy10ii77ellm41lyqgcrxcwhyq2ey5tdnxe31euafupx4o402e05rv6xvhnr8aqjjve0r092advv75fkdy0nr1gp1bw3rp1oquif02g51ofivdxllk6bg8u0r3w04c5ve5unm79a8lwjmgqedym4rn3lsgx1w6ox6smsj38s3scnfq6fm0g8urlmdy12w9tkh1g9q3woj5unffeh6vtwbo7c67ue6cr807pag',
                avatar: 'j8yfwt910oggtmy4e6fjfhk2warx4dyma9y48k6eqtolrbxvp7y538bufubm2idwxt27qaltbd8f3x1oltlhhpcqweoapev87xjtxgtqt7h7h8vpptw8cxfemrlt372389loqhqcegumz874nqzuj5w6y4g54fcnngv6ac5l83f1s6dg7owoyxs0lqzo2xzvn1tfehlfw3mj1sfo0x6mx4bimlmu13eus8laydidx6qny6o507444usx5t19hhm',
                mobile: 'veb7colq5ocqbzo72ezjm4igjwd2958csajxf6jan2oz34a2sp6nbw1hdja5',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'nazljl3b1a7f4asx88tsozffw5ytwv3rs8dugf301kab2hg58teo3p31uzd4wev2pysngufkh7fhoqcbkhvkvqcl5undxe7lt69g88rqn87npn0zj2uvs9dx',
                
                rememberToken: 'xouqc55n7x0f4g6bnhq63ska8wf9js6x0xkhgd022rp83oh1jmzqy71u8j39d351qiaii6ptx6f905lf0aqzpg2wnqgtv9ervhxx99je331vpshnk03c3nxq0em5im9l5lhmwgadwuaq8765axzhj6834i7d37l70xvslzobj71yw858yilqhhmps8gdba1b3vjrkxn6qt59nohph1p5iwy32h2naxspl8gxibhyl5a0d0pcm0xoua1fk95p21p',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: 'tnakfedtdf7loreplzvmqrte4fj7y6rouz8ub',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: '7mwovrm47hlx7tjeue4y309aktuux0fc7z8jmc6vbukmqt4o7vjfc64gtqtkctx6z7zxpziqghp5enigy75bzmiq4wnf42hhi2ewserlit30g8srsufgpoeypfveygq8jbf3t16i8cz33wacv24quifyhkgdwoqq6jwj3l78r49xyrqufbi79isl7t8ah9hvtyd0ktr2quyvx6aa0dpv4m02bn3tclqhhaje1y1aq97iavp2cb270lyyhmqavbn',
                surname: 'si12qe4bc00qtzmno7251opr52dbgrfdmp9l0qz27r1txgihbskys86fyix4720xfxmkgqk0nwuxzfktd9hz6jh3ilhwaka2gst0vz6fi2ppq3oqzek71jgmege2nhrkvdraci2ypu3qugb5fawjpl5abxm5fl747e7ybjt8n4w64mmd1uc04iovib749i0rpv9e759a32708ubh9oijojswazaoi157bntb506lfqzw5f0hy75ascyymhna65x',
                avatar: 'obl0o6jkl2jc4v56uare5rtmattlpq0x6ca86gcguxpbanmyb8492b8skhoi0h7uk75gaa9wjbr91heyiagkqe5upuk7mpbtntx62h9jl4sq3bgt13yqw8eks3fzio8qaoesb8o49v7l7tqhgftur1e0jn3dsoiqe408a11t2sg8n65gxs3n98l4giz4d948odxywmp6453hynd432mgngk3wk1bvpww383k5ctzskhnqdsccyermj7yksq2tat',
                mobile: 'lze0ooflzdcomatrkidzgxsvj9uiwfc99ym4l27u1aun93fyv3zunzq13r2y',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'd2clax4v93j2mfwyuohzmdzd2zt7tcg5aypk8ul9wc0yqrh5es677p01xoh6x9rjd3ou7iovcsybrx4np4h4d1tmjld9b5vkfhf29jgo6s7lcxehux0epu0p',
                password: 'dfvvkl6067vkvjlyflwwf09nzgi2n1dih3t4qxyf4pewp519a2euomsoxgefz7fj3sysknza7c8edcekh33u9j1k8wdmewx4i9gef70x5z1rsiklsh3zjfpxjvjer5hiek3hh6ckqn7ldszrkknb5t2rwi850sx0msrxxabszw12i57jkimvlxpvhyjhow0q48gpkh983h5hp37r3yxfzcs52bkk6gnra1cij43u761syyli2ofzb5xvk4yraj9',
                rememberToken: '3cub9aewstobnuls8d5fby1iggq3uo173d81mex63w3cxwmjdkqic7sspykalc5xpvaomjbnxz1m610sq6tntd2lcc11p553d2r1dzzykmxlioo5nqnmlej6skpcn2pzvsx6ndag6364ctis1fdtnccs73duymbodwm575usdgtgdc1xqq6tbvcty1ujme6ghgadbl9ypeclgfy3mqrukxi8r87z9o62uzc2shqd93d50w8pm0y553iv3c4fe39',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: 'qqfe8uxk2oabbluexnu4smcd68z98hok008sr',
                name: 'fgluy17vrblrf9dktnlscxoj8yliy8bgu1oulk0esy6zecpgzu20cb4bhldwbg8t8g8hgdgdj8ov4lxresa0bf1u7v6oi2kdvxgo2fnzvejrtl10v0o0rgmr7eh7tx6q6rdncnxspjog2ivrrrfwep0uo62ixiamzwxsxrons7b43sgxl6ybn4wjru5u3x6z0uqp3i5a2conx9crayrq5zcawozdk4nppbpen22u9l5ng8mdqpzw5w36zwx0qf5',
                surname: 'nyltr4r6a75hmd9zdwb23ms5wzik7lbpel0nwo1atve0ut08qhevftlmlq5tumfv13vcn7m8e75mven3cqxpo39mvgs1oehcbiqpy0e9t1zqepyn2ghl4vunujivl5w61tq6e72qlmhk390w1xh8uv90cx2sl303c4q0f6kaw3ux9nfzy9670j8sphl4na0byl36orl9vtoavsl0bvui99i579wkqzgvhzeanmqou9mmf4gjs6qoci3kxikzwv0',
                avatar: 'hgqdzu1fe4ug671bp4c26ajntkx8ixyih277bjpx6k2hpab1blg0dty8499p0fd4cqwce4rzs64qlungal9iimwzhj7bv9mk60y63i4o2pf2yupb9wyloccp04gdmcimg2g98jylnj5xg7sxcb8fdv2eg67bc599q8n9wfd1gzoi0j2s6omu6em6tty2hjv9jopff5k4jhyov01atvqblegzjeonoaz6jzdq0z7s0c1bibeid0a069gf1gtv5ut',
                mobile: 'cu8ih732kbx1a7z2b2mx255l4vng6f2s907jn23rtxl7isxewul7fajan9v1',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'bpin4w5gu5pjibhailkjgcwkv7sfatycp27rdwwc1i8scuidswgxpuofv9u57m5pnbzo3d9lp76es8pszksupjkbhd349zoc8s2ci8weu5ll1z47af414qzk',
                password: 'yzx01cjun3xe0x3t4alm0cru77vue57yn503uq1g58zfo9vktjn7dcuid0pakwd9wj06kwzg2hh0q8e0f57166frscruf4gdekvdkl6k1mp9nl06pht0vg6pn9numddcmjhiroqbpl0fb41am1f7qtcx2mjjoxmxo2czwdhp0xx2x0elba8npfqxqn491ibtsc58z83yldlmnh1hmb1ida4zwj2ncpaeb5n7h3h69xrxtr5sl3beiszezp7n2zl',
                rememberToken: 'qzu2pg7w2bq9uolx9k0mm3xjjllipydgswkk0cjvv82f7v07ktvebnni2km8l8nt9gclodrcdljfktnyq4s3v49gr4bgxh8cfz22ubsqeq0zr984gsyohrjy0ru0utj6f69xjnckhkdo3ytnu85md5yun7ywvw5lyjxo3zg4z3tbn9gaphmw7wlyvt1lswtsy66idblobmxrc769qugx4habcvjzotk3dnpg1ykjuvj18nram5kt9hhin9l4ci6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: 'qhuohhoqyjctbcppoyo42ahmplau5p2ouptdsoz3ztx735ibeudptzo4yl9s9spnoof3hqc0hbjfr9x19ibndd548qj0u3c2egn34klqcj2qbl7z8ty3r3nhm6vt9gz3h0srrbi0u5iayb6u4t9jr4ltl240bjn3dxjjm3q2j654g155gisfipum7utdvr11quwrpeesse0i9zqg6pqh7nvt9fsvqckll6bhvdkv4v3e3ow9q76u1rql45d7hoq',
                surname: '3gm1knup3itw4vbnil9ljzolrsl5cost8l56aejkw45krhhvnxfpday8x1yqn7n8xeg3fi4d166lusp6s7sjd7dee8lxdsf6xb3ecfp9nhq27n3m45y82sd4hdcy4zrlnjzd40bp4zmadr2e1s62fmu8vfsb8b7x07dvegvuq8wzei231tfw8yrd7vahxjr5itr0k0swaum058a9bpbqpxay0iokpjzdm7wg7i2l5nfhu3flhst1kvfgz54yd2k',
                avatar: 'y4rq3butpf28dvx6wduzb8glzhzsrfubetzvniw2jw1lwi62gqqkiuj5p1xx0eb55u4rqd9cd3sa34dlby8sz86xq3z3zspa0dvox3wyk9e81ryu94s3dogtpqi4ngidqy70ihajx2q52a57w2fli81mqiuan0cebbr1zmn0c3271ihka9otc3zmnpxuys9njqmg03qikd4pccnfd2x8r94i95j6j16xdxm6mf4bwhp5qv0zsn7l8s10cu4o6hp',
                mobile: 'glkksopui1i4984bguibooauy401zwl81qabwkkcx1yh4nbcb3ffjg6j3s7l',
                langId: '8esbr52ujlp3gx716oqaavjr209174ta34gdh',
                username: 'bm9h01u5lgk2orfknxlp7pktqdixhfunz6zc6jx9l35s7fpud2d3orv3807qv63d0n01fjzcu2of1eu4x4vyl03kvqibaw6rbggls83lytsqgx2ikn9ppz9l',
                password: '67q5q2l06vr6msn9pvi3rw9cgpo0ko62cs8n6tg8uwc3dd2xu43i81qbbtgauy2kmmye7oaztg0f2b9bw72mdq4968a3j7mww7olctzdot8147ijdfks51rydd3oedccrnixxenj473dyz1576drd9abnmq6h4lujbxhfaw12hkr08tz7e375qtxi0ugsny3jbhi4lcdjfglyvuvd2hcfyklwtu01xzg628q6ngqcbhl1egzxggh9nogbukufyh',
                rememberToken: 'pdcm5d4pdlapbyr4l5i6371fcc8gqnh8864lytnzgxt157sjwske5td3q7bbqwn93mq5ffjl925mghvfxarq9yd4xn2wk9u5sqomr4q8bfkzdxi50261gi9j4pj0omnh6g95poo5m7gm849a7pqeltgfzyjm9per04l0iwia1zm11mzsp3y74mou08fugtjczsx0g1w4hfsfxfg3hdc3dc30pejkn0b2yjl5j9rgx26vp4ozz3u3gqx1flywrf6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/user - Got 400 Conflict, UserName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: 'et41fri5fsu82p0u62akb41uknd6gtukd507er3eo6eqrbvtafku21tjfc63bx95e2od7ibp044u92xwhydd73pi9eqbfo5880i7ygfvv7982g1b8qt9q1z62aob0q0tdzp2kz67hcuxhiqbpmimae8bt7ysae1iunjfohsoqh2y4qreaok9nbzzs7bek3i3cbrs9g5w99ynbazaenpjd8ibai60e1uvccv1p7eqavjfke8aesomfbtsmf932mc8',
                surname: 'o3uqsfsv6lgkaq2ar4ohiyjihvcvwu1uz7fl793wnwgufvg7u9msj6ekqf1sv7hlxcnysctph5kh0lmf3h745usg112ejcbszghjkgjlngyvdq4zrocvh6dqegxo486ta86gk9ynzv56o461zfmilfo7cq5cwn5akmli90fp9b0b0jf2n146srmghx068voe4sorlpgtz42qko76gt7hjb65q9xo5xca1bwjsizcz0rcm63ojimjsd1gucq1v7h',
                avatar: 'aswpkrdcd97u89g8qnsj78xxbzdc0h3pxw81nkvchnieg931320xjqmy77nr75jic6mkmhg72or3ngvluy3ikvtcn0oih2vzcx8sircvjpha9zpnc1m5kcr6v5v10vi01ixafv7w1i9xz7zkzazxuprv2i57poec7mfxrbfy0724j0nbmk6e3iqohm8c69qo7ig575b3g1atqnn6nqhx5o1cfkgqsqsykjiotpzgsjv5xsxspp867tgdfy6dt3h',
                mobile: '79wussk0x2dn9gxpdkdim0gev6j5sy9t46ug3dd42y8ltzipnabcz11ir67n',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'ebspyfniyp1sobklf6jof3xvijke6i2c9i2ji3xt2u12necmn7gb6e04cmd9vy856htydjbfzjrbwefzkufovlfybpcgnccih1yy0ohzfl6xua9ry0u9yoox',
                password: '64eg9olrmlpg8ulg1naetrqepz1vqyb06oprgj46he9riaxcqvkyb942ilfy4a9jlcay76qgcddwbyhncf6yo19xixrj7zsf1py8sa8b09ilx9ejbagsexxg6rz3u249fyjamo34ewju85zxpmq21f0hcnzs2xqr80pqfrhq9pttj123kzi9en47kaw45h7lkerd0uom6jqs7i84erdnhrrqp92m0dw7sdcigwlepomiqjrrt4yoemxssq7zxp0',
                rememberToken: 'ix609sfcl0gzbrynwyfvcxrf8yd6fy5z5sahtdcx221k3dioxoqwmd4pzd2sn39n3zvwqocn34awlcgj8tk7dj2de5wr1jdekqvqo49u8g939xn48x4a5u6yul0ydt7sg8ti1mmfhd0ix48jkljs073nk11p913b79hzqu8u0ncaxpxigc9kaom5x79hdip8j5rksypayg1p37c1et450pwipxeof0xu4tq9yx2g4le59ikctmd5yptw6zsr7zn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: 'opxnw7ve4tidxbv73f0aj0ynfge5v01kc6v80a3j3tnz3xa8x6lb5eukqktd5zx46yieh9tk5qvioszvqntcb27qw8qdtvyfr4hq3i1uc7x9a8nygi3ydzj52xl8r3i9e3mxa4w7mq9tl6uibkuikbhfyxpu19bmvxcd3sbcwcx7ie2o3ugtcg64qauix78l607mr8ywc1yyakrmkp6vgdmkxwwds5a88yxuk2uv5exibdfkjz0inxqlvqdwi4t',
                surname: 'tz18hteue51rsr056vaqdfyhcj605fdph7xtnqmiendio3qmhteboj6t118ck2nfusrogjgfu0f11sw6lbvfr9ynncqxcc95ptsl1uykmvpi3hqljd81u9gnlg37f9255e4oldrk9tnvsrffvxwlck5mhrixmn3dgwinp8k5tbzt7jj43uy078d0fyz96ik6zqwavehel3lty6tlq61w6o3o8zado1gr2wj5f6oqmiqd366w601jelw4bp2y3b4z',
                avatar: 'c8ch7ef713q78tjxpxtlmmbl73lk54eu7t6njxbkv7snr1kypwk2r8y6mqk6azabxncgfdzji4q79cl41if6ih5wmtk9t5bp1if8b4v07yfnmofy0z0orhwbzonw2rtt1qem7f152yu43r60iuylqbd3t9l1bovns32jyb031wpsmws9ippq0fammzxrc8vzcqhgtv4io0e4g0uvqdshnnm1mtuma4sxlgtwnlbnzmexjj8dszg9fouy2nauejt',
                mobile: 'hsrofa4s5qm4fuee2pheqs0vl8ri6m4tzmujmgpmiih1ygdbanjtzshcoe0b',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: '7ugli3sko40yqxyuy62bpxu4e667mzd6w32hl7znn6mkecfl75u7o77u1v1jpjmoo2yikg3a51p5ajisc8w8z7x9y31322qn2jbc88rumxn2htwazdklxqva',
                password: 's78jbff5qmzh2xz12aixhxyc1u33b8e40lixzrspk5ukmbtodevuq3ew3dsrfddr7h7y0wx1aq4nmglm3lawejth3zrqrrfeitqfj7pekdoxe7dqpo6thjyb6rh0vdj6sxdqn1h74zostv8p78japwz27i3uudxu3421gva4xxjmq0676a1z7a4fhynz2hfcmjjdn98i0wqko5q9o3nylnfujk78y18dvszr957q5j880qwrjwnonmh2dtgr40i',
                rememberToken: 'i1lrglxrfeapxc4gaw11qh0md3h044490nin8vzr7ctz8wp1aywfq7pos2c4nw13ju218swcazi464nz0bzf63l66tjb3cl733xujkrojptsyaqb09ou8h80cjc2de13cwya4pn67ngjtcmdmjswfwidhjrx5v6olojwbecb6xyspi1q6c94bvzkhbqc3gmrurz4coz19axloprqkmcwrhqz2ng4odylbaxymv03q3ksfqsmkmc4q5iwal4wprn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: 'a0pju337gmiek1v5m9s59vn6gm17ka5cixa5sy8je3wi4dx34i07quouulq6swecl4zpla96drdvsxkw5o9wmpepw3qtg4bsoqfrpk8taoredo5pmnwmeqnp7e2mz0uld51qj0w0h1bj2s7dmpox596w5ls9yf1nt9gr5rlxss36yjkiwev5kljf8xlfnapvy66edaz7d3ofars7bomxohdsjm3uwnl1x19xin0j9y8wiknm2em2e1eabrypoi2',
                surname: 'ls7cdd15s1ykgwbdesg9mocfv5pzov2981sa1t6422f2t29ewviyt8vhxzkpxbde8q3t0ufapjji2zzkyx6u2lfzk2t918xkk3eu4hdxltdlk4v5ps4x6it66p8ww9zvbnpc5f6f5hgww4006enpd8998nfptoo3ip9ouch5l8ko2q3rq433fj67tmp0q37hw5lo1v7elm1n030tx9vh8tidi5cckxqeya43zilm6f0k2ljz01eyyd74hhkmop1',
                avatar: 'y7btkglsjcy02z9tgqj89eel8pbrzhr01rcd6or4qeybt6jqdp97tk736cp92pszpc7fl51w1lbikpltzvzucbpz0f15a880axjj0731px06c1s9xvpxwm7jt0ufl1y7s03vt9stexqifi7f9z14kit3e4c44litnvusy7e1qdmle1u36q9tnvky52dsagpu1jxmafqmckgd3lua6480fmnwqvyufmehod52461y3k5ih964k82t6pe8uz20hdcr',
                mobile: 'tuw3zxo8pxze0sqpw5rzdl1i7k5q9bpyd76gvjyo0yvl2g1ys8b65cil9qx5',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: '3o8rxmy1mz4itksnix8fqn8xmr17e4l4h167znkp99md1342mdveapcunp7y84l9619swllxqg161esula5lmyqq3pugd20b146ze16ah22o4982amwe1u1z',
                password: 'h2evh69qmush9a25eweynlig8p9rvqfrct4l89crpgm5tuq1jhbxayfd3awltb4njd1un69pxai8w9qop2mb9ifz0fw2qr5hnal2x4n4s80jbrowlaa8kqspfhlidfr1rrwz502ck6rgiktvfzt2yjotdscznizofet3wdhsohitrbgp8476r1u3lhmckfyyqb57ox79ecys2sl8003uyhuiua7ph4j6572y0zaygx0nbb3gqscgc8n7f5ai8pb',
                rememberToken: 'hld83j4zuzksinrqf0uxmf9hdc13k5ntv3baaifll8jy2tg01ovxwe3ksi2h14cfhrtg16pypp3kx65ui2tlw78d62qyqwkb3730o2ep5uvzt1whtk0oiivtdlc5hznhwdwso5s9t79q13koblgn2ny7svtpolb7drtz1ny4qpgo8i4lgc45ifnrc9gfd513w33q65bn509pxy4mxyeluuxnl4aqw0ik5tcoelnmrtir3zrbumpowrdggohan0k',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: 'a1frv968orqpf9404hdkhixcm1zvupc5u1m4cufufdcc32akud0s6r95qjix94j8cinxipfxps9rs4k59ya8b72af9oz3rto3nfo354ok845n8qw30l0aisrss1p9ljzhunwdcq2b1g7x3y5o05ndnltkt3lor5wnzz81lzla7mjcznsl4cm25rcvb8g1jrztnvc7xklmc0nsi4yk1a7e18ozekg70llyf2vdu0j6ey8r460tq6gxerf7zex2zq',
                surname: 'y4524mbynum5u8fspox5h1fcgek7warsh1ayu7ad0c8hjtccia8jzhwsyod5xxifg1tjtcnwtqnh1dxsggf4mjihkp34gubijuytvvmjcwhc6qrevsxpd3kgtoq15clyalpi78k4ey6psvbyda9pl3pdlszhs945ud9auk13g7b03td1udm2xzxmswncmusd8c3neonmndomyxxp5n6fw31p7do3tzm1zh8e3fth3lw5bc7bd6wetxv5t0my5ql',
                avatar: 'dmdbq6mgbpstlbgrxrral6t2ced0jgnrw54hqbl1o8jatqiw9t67d2mut06x6sx45adpgpi91zmpvzq6uh2wk3w2kyrysc5r4wparrsq99u9md4wmecbtn14eszzvglq43itmv5i37wpgjoh115cg6cfjhvramwn0e2n3ph7dl5bgxth73mh2oxap23dxwsdgmgl47d1x177jf6ivynd53sli6uresobg1vkvq1ylk75tfo11kt5z7mb4z86cuh',
                mobile: 'wkvepfoxa4zibzvp0frecukb84e41oc1befanvmyfjjmogabvp59sgn90uyxy',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'ikvkm2wva4yofrqvo4xoungusva7ebqau741kkogm4gjuk7im0f6qhb6drl65avq5u0kkvbu8pfgfjlchimjmr64ozms9hjq4wvrtvyou5m7i3gd0aqs7zr6',
                password: 'wlv4i5ps12ox6n9c4wyphaeyg589lc49pa7i3pcr185atvenw9ubj05v7qo8xifuov96ssv1hglzjukunytj8svov16junukxf36t8hteol10kbb5tswdgn1ujpsq1u7os9ieopt51onk9yetefkbcvjg8i36ythnp82rwvuz96fc79ii9ld0kgenane9d4t0zzvueibdsupgxiag5f4hakxyhzwxhh0tpbg4oc092i3g38myaauohli1km72m9',
                rememberToken: '6h5z75k6i1zy73laftuwx412rct7td9ka0n92p82h6yrcpbbdzwou3olxuz6du34tnudu75kqvq823v4cwv7kuvgjawh45vydwyd5rgl3a0xm2bo32hp9aw7jlwx6d1aoum7jajdt3aid73cukse4t53q9m9qmocvvt9lsfl758sjwhhhlg9v3mqjey7mbrz3qspao4ii3v5jvbjfle48gw24k5njnzqgmhjz8ocsfx8zk6p8hswgpvtbgcntyr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: '1uzng3u1nd7zl26kccw1q5ve3vbo07v8w54ppda0qh6tv5w660whcl23dty5pffi7h70qdef4nqeu2vanezy1nv2qk5wm026exgs8dcgbrt4tcxsk9sorfwph0c5016r0mvtr4cz0jtf45kg32n5yuth20g5uj931i7g99ls4ebrw5tmvo3m1s22bs5gpi5b3jz73vl1stuuxshtpbeybo9is3s3s67lzgpp9gk78tyeo29a26snltdd59qc8vc',
                surname: '4vzsbulpoevphm97fpoxf7yh01g0h65npsjndp0aupvmwu0lxbep2ypv6do2we270e10eaw8zxeiy6m052wbvqvwcd5eefx1398caxtprs2wa4ih9itraapkqimbaup2jkv9htyref82ngelept3huugyall76dsdcelociwb29chwk9xpyda56bfwchid2ajw65yypyrlatotpmxjx280w04lulwk4641v0p85ct02gusbi04q44xooyxk25vo',
                avatar: 'lmnst6dmsub9nnlxsdaw6ra7gjzopao2t6qmp6pe94ck9ctl75g5agev27lf8rhyr7z3kx3ikgnf1zvfo70gti56ti6usravnbjccntn4wtkfzjanq5af7qlpf7htg53djlzgql7x7hy3wtl6mtd875umwh7rxudnjzxv2qnlplijl8why9425y35uvmx6z212mi8g8dguppy71dmaaun5gkwl45os4vcxl5klkxgl8ffpvkczt5ubgusndjao5',
                mobile: '1j42vdt679cawthl5huyohsez0dcfxynozhal02orklqj6xu5ubjbarl19mp',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'ing4eusuxufwh0ctk5y4j8fk9pf3lyxt845fc33f1cjfl1v7ijpa1k58sxnjb3crvihp2lwmlk8pxmvlhltvtvdpdl9vmo7yuegikot6h9y3dfxx1szkg0ojn',
                password: 'sm6v5holb6wzgftu1ybju9fl5hghe8ywuxto3f0ebmq6m71zim34lkwhi61xbmaluhti4ieett3xwv02w0w2m64gupgbpy3yr3ddfehn9bqw47mcyjpodyi5x9nyortu7okjc2ou9qmf03i2yg06po4c21tl81jcd5iszz2ddpkya40ram2gjomwb0gwarso1gjuvm5rz9ng27egbjn6nwycjp29od15h52cnd3nmospb74begv6z6l8fd5cga3',
                rememberToken: 'iz8a6w0t800lrrvxh3l929x7dgeo6umuyuwz7pxrstnnexg2rne7qf0c1f3hsedix68jbjgfe5rxzm1l15nnw57hli7ppfw8a8p3bdmhnlvohog4lbcy8ocxndo6hxvmrr6h685u53oka6j0w8vfh80b3fk7aa12efjvo9jqis88eufx46mjdcs0gryzshkj7ifmdwib06yamutytnzlt7tpti8apdo4qkjmmr8nhjo61g90kit3626535n492l',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: '2ygf4i16e1edlsp0arjr4eu0hym5lles4vxn2kgyagvy63hiysu4r4q0hh6t8ys0b7zvi8mu7vyiszve0zhpuhzzr4nic40y99msxg20m7ebaelyelu1nzjcacqx3ocoloaltz7ji83e7lmdtwo9410qr6jukdonj1v74sowh5gnemjntrqqttvufqogj33x02tcgss3q0fxpw6hd26dlztc42sq19l3bnu30hnijtm0uw88i8612ongofpj723',
                surname: '7jn0zk2xm2iocqbaxwd8ixki4j8e051l9mol0q983m2spxtqp7x017j6xh6isp0d80670b75keb14nevrja7jxx6ntmmu4zqliw1m36wdu245rmpa7m0vpf9ki445a1l7qwnd81mr5itbx36gpwlao97yup05a3gktxdg8wh6uruyvbu5g06ybh31vk8rq2igvb0exp2i3ndwd0sahwmf4wsrizhh3yl9zw9f51tow5anmm2t7f4ure7hbc4q92',
                avatar: 'ktzoww6cvz8azbrmhn8v70ljdcyp2kpi3ihov9tp4oq2an8d3pqgo5khvlyk6nsfxxgpj957mfhqsglu3yui2i306rvlh6rdgflasmeqvhc4ucmw9ojej8iku73g8ac87vxt7a1cc3c501rbi3jkbc8h4w0vsxd45t3i4vgzdtmfcicsgmgg67xr9tl2yaly4lmoyvnnbhfypg1j44hay8czy68kvz5pagp06vsp4572afrkpohwq3kdyg0g8ea',
                mobile: 'if804ldry0junwpzppmtrytj253qdb6vewpzpkxplchgo6m3vrhxvhv0ia1y',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'cces1hlan04jtp7ax9lc9ekp29mhvidf5s4wbwizgx18vyvxtmemjfmblar1lyjz7xti1wdo1abktts1bsk983lmjotg45fuf79ivv4qc45359hbc1krr1wm',
                password: 'fqyobctwhho1n45q7d10mzxj57ycn2vga9nf8p3g9fghr1iuo8goaqp5e511880wo1x4tzd34s16nv58lye5cg7vpo6krf8ebdfafwnwytrmtsikkievumcm1mpcesht7q9m6jlgk1bdh0ar79u5k4abpdqcali2zxtsyy6mdf87gidahsi274nn51iyr6hb0zv1vy5uvo866jp3v1nb8vrk7tcdfa6nwdab3igsijivugeogalmz7nhlitgatag',
                rememberToken: '54qc9oeavipsw0ptow9yng1roxt4kzcfh5ry8zidetai8gouppn4fecc8de1mvo8levzbyhkx886e34qi8va9sc3kl3gvmilrt5rahe46uebzvf3g3lf6224h6emlwv6slcast8a8ifuyn878yx8c7iv90bbd319z89yeq1pi5sn57ajsth8xnwebb0n0pjltsoym3kr3aw3lu1fvqa5zuhbyedsrxcb6m2i29vjxcqide47glsa08fkpv7vied',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/user - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: '3bwqhdwdea9ma6y1y6tbja3v21qiq30hxtylqt7tlbix15m9rktda0n3u5jlhyyhq90380xcik95hrene3j4hy49ksmnnym12ecdir75lir8x5ed3b7zg2nt2kmdegfnkwukd3fwoibvcrs1tq4xl65yk884eml8t9oom9d1y15paae1y58wwkj8cmqit99r6k7t79b0o2sn7ym910dizfnsu1jmkqytbj1rocrekenp88cpvmvxe2dt2u1ff9p',
                surname: 'g5utffay7sfvpgsurmtbzr44tpm69cqdg3zw0ojy0b218p4kai26rhdx0pj7dphqg4aqub9l7m2hfjohjlwzywjkqvfinjxrdkf1idhmnx918ovmhex743lbl3ondll5mbftubz860dchlvhf56qwgoj4zyw72wl4whcepx746v3cx8jc3gx1509h5i8gkxdknwqxmbptu8spseasjkell1bekpkiuio4vxev0aiwsczu6iqhw3fva8ep3nfih5',
                avatar: '3x4uioscqaz3p8hkndb5mpnpoi86beuh623r40356vhobwtts5urfz8xca8x9sfzanhs3p5w04befzfmoswln5sm4y8q85vttfuod3u48f98v9vtcp0vderng0zirmcu2qu8ezb67chmy77sjdulqjvk6vqn94emt0xfvw8tguhgx6gnk20b4bsg6b7j1u4pz9vngosjpp9ri1fwblai5tlvzix7gtqak6n2ety6sinoox8em4jgstqaqetzrr9',
                mobile: 'k6jwv016b82olrgn7tze2njvlevvhcfmhu8k552xtt85cg0rdwle3xbyr1vp',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: '5am29cwkqmpkj2z9y1po50lnr547tebx3a1hs0e5hv1l9fkblhxojsrhs2tkkn787u0797i22cja2ydib9amfj6bxhbmgrh9vai3d1ntkfdjb5jt7djra7on',
                password: 'n9a0tg0jkmprjnsssc1dp36j5e10t1nj8r8i9rs7xvjbxr5uh1ah9jqyfdvtbcfwwwycfo2ifi7utj2prlz6y89kuksv9vol1o8keeo731fqr7o97hd9ny1esr2e48om2bb6b3t460i4ywui2ghglqr4r4yy1oyxhh1cz79aahgruopgimwrvrzba3f2i54k3i4iznwx4ardn72tenw8jo5opuxog36969teh0kh729v64o9qy2zurzkighe2im',
                rememberToken: '1ubidx35jse65rk0265irjwubgemijqja13oo1je99xgdlmb78kggo6pmhqptyph166wsrvnuyi44ng2wffi2p2c278405vwmoujp95wjsxcrcztx4lo5a2xbik7siiz4h1rqho7wf7ogziroir7h2hoz147u2h65gx69j7d34sc95lxdbz0aesrrwdmac7zrrfu5bq6f1thgyot11rnnhkh0gohrat4s64z0zzm36e2iabaqspbc4eckucy8p2n',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserRememberToken is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST iam/user`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .send({
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: 't2cbpegltizx4po6a5n7v3zji7ed80831s49v1c4dam9cu06w6033v53c6dol949dxr5pkpnf2zuvnhgxcvy79dghlk44g5o4qjag8hehtcjdo1r71opi0wzhr3lhba3nirr4r9k28kwhlhxxka6pxjs8vb8i1aa5t77zeg0vhwwrfmvl3gxwna35ascs2aa7q578ckyqwvyuprgyl4oaf1ea4omyahuwj4m36hae4bfr471bt2n87ecjtc477a',
                surname: 'yvuoe2r4ntx0ov9lnmisnbkxwowy0kufko5naj134hrqhtk7m83vzstmkmbldlcv5lxjn38s0tdvvtgum0f425m1uxjf1qp0y6v8pj7nk3j48th1d5ja0sm01xxtx2h22nve7mjazxjiq3yodull15zl1enz3413y2l7n2ct7qrh002z2848yiemhqingjfxxiuyh5zgrlveduwpyr9fwgjgz9d41ixthtsj1ixz8nhfu18oduq8n8kipppzxaw',
                avatar: 'dq6qo0acnoizumby5njig5si3awjci9wm0w6guq3onkcwls7c696cmal71rzq61j1bqqugr4j96urxpbm04wne97q71lcwnlmve1igshttj9af8plgtttilu8wc0xbvvhc1zia2qctwd19jjt8obbves95iyzy4xmjrqilzcwxeke92z36shpzh75cpqyiv2b0foupw83ygt8zyfd2617ttin7ii9cdpmhw70w2qqf15sqw6eu20q38s86h81jh',
                mobile: '1b3cbwz7eheq18ff4zgwhjd8l6pw04hjnaxr60bzmodxk4jzf7y8b473wbrd',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'i1nh53qqqxny0ilmf4p88hjobghg9kj73o9pzhf3yefzp26h44tdjqxli5huv1qumcp1sodg4cf6c6wus2b0n4wswxvclavkoex3n92wqxzm3dvaqja5m7ew',
                password: 'alc2govfisz05jdgah94ltozik6x3ufuqszookxj8ih5hm2tgsthdwiqe7p36wa8w7tjth9t3a4ntqrwrwp676pz8p6wcb4ubahi1n1fhr9cjb8qpyrei0kb4lwdf12gyi7asqy2wsrfbho7faznmzs2btdrmlj6koxfy7kjvy5qca7hjhsktmvom5ycuwwi0g9pf9ichohyxe5moiz764x8bz54iowtlx0rs7gnwnnekbokvpi4q49fink5qk7',
                rememberToken: 'lmjf4cygkk456hjbwikiy30lgpvfm015pqo5cj8poxuxw3m01lglhzsduk79y56zxcg8n7huc02bg9et6vh1e88tk012u5pyedwec7bu2jgo83zrdqu1a9htmwlj5ulzujx3e99jpe7sl8z4ma2esi0z9qusf5mp4fn3atodu2auqcod8uj9qxmqzyz85hnztxllb17cmnxmlxz8xlr5t48mnm8cw9fj1asjpo256ialb1qctpf6sy10l0kcw3f',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '4a6eaa0b-b551-4cdd-99d6-276249ecec7f'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/user`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '43cae364-6f6e-4535-b5f7-95ef67db762f'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '43cae364-6f6e-4535-b5f7-95ef67db762f'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/21dd3178-1e76-4b20-bc99-4510c1e81a56')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/43cae364-6f6e-4535-b5f7-95ef67db762f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '43cae364-6f6e-4535-b5f7-95ef67db762f'));
    });

    test(`/REST:GET iam/users`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: '2f9b4553-7e63-4d33-825a-ec65e4fd8170',
                accountId: '2efed138-bb0d-405e-9394-07c267d5a3bd',
                name: 'pqubapmaf3hn9ll4unezzp1acpe1rp5bo7m93izt8htfux4wd3qgdllzrtj8yvccf1fzd0qtxn06s0j6fdk403ckltrks1zrzy12f00yf45y5dzqded8yhr8c0llnkxv3h5sp4ggirpyht1bzqtff4j9ji39jxef7wt04s7g1uaz0t6z014k7fzstj6qs521h43i3wvsdf31r1cohhak1ania79m8mb67ectfgzvrc1yave7gu9qsvqma7ibq5f',
                surname: 'k4p7af2qatase426wze35x9mnf98h0k1t2ok3e2i3jskkrylyixhaeh1fo8orp0z3sjlyq6v05jz3e9uw6u80o45cmrwqmnui309ye9k0hmiazyxk131ioihinwvsonfkazbzdfc8scyqtl7rpwm91q0r00btvtv84ypryq21wswaazd2jzybqetvgz58djkl9fqlcemh29jmpv94bt62yfr3xdj7q37ftici7cw2m7ih2qocb98sp1aonzxww1',
                avatar: 'ivnqzgoh0h9qk0jrf2ycgtnz5d90j6nhmdrz9anrmzgu54dsymqupdcid35uvd4ra7zkh8u462rdsuznrx1rn8igo33ryaga9o22a47fubjuqudlpuzghtr39jowr1fuh2la9ognzpqweqq5mcr9fl6cjrcy1b0gkl2z12hf34nd6vvikvg54s6jgif8kvwqhp06p9tywm5iiz9f8ximznv12z2ra3uvx8a25lv7ac9s5y8lsmoe3pztau8p9bi',
                mobile: 'v7gb6oilc6bnnprpyqu9nlzyaqj7qf43e2c8gi8k5x6f7uzxob5ldk7szqco',
                langId: 'f9a887e3-1302-4829-8694-afba10bd3fb9',
                username: 'nraaox8s25sf784bt3mtljicvgt8n68uz2vxugjfbds367amqheiyj8ebyn0naeib7ymui1hj54dyw1q1ygcvos1jd8dhqfh047o822visxz9tzx0h449dxt',
                password: 'pyge2db0akb1g5zvt6r8pamf2sga1gs9wt53bc9ga81m613yhk2a624mzqgyggiw0wbx9wb9wg4rw8bqwsm3xcheriiwzjolzpfklvzfi6dlrcux8a769h9t81hwz1ahooaedpyv2jj2o1yslsn1y5m6froxvqjae121odiqqs9v2wxygdyia8afe9i1so2z0kifzz5dzkp86vxatpaod93vvjw2v4vlobstwfkddsic2bb6ui9js2ds9sus97u',
                rememberToken: '3hk2csj5v8e56389xqocitl4eu94z3ymcp735b51myri3p5m4634egiivyiz6apn77k8u0l7sivyjcbypuo6rulvjpiv07eeztcot76l0avc102hye3lel8d8kxi7iwe6au5xm7tckj5ahvcl408dkywgcremterp8bq2xon5biwh3hka9k8vq11vgpcnuo7k199z5ms5ahs7bdry029hnj0i5lsec6dxk5y7a8wgibapvtsl4x0a7mkieaora5',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .send({
                
                id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                name: 'a0vpipeehajimvn12hoye8ob1iot1om1usflgvgxkm60ylzk7y2ulkmmhh7snvaga8su9k1en44d6fypctc2re0suacmiv8jocmq5dzvm3bjp84jmb110l9uw1mfzv9y977m4w0t7j7o8wg30s0a7z3tzi8jbwqittq5srsljkqtmq5jdyj5wr4276ewazpvkfi1n7kr6a23sfwbsi3qdtlposhhtb7q7gxnge98hfice3y409g44ehwvvdnv36',
                surname: '9eio5917s6ne232vz7xeiczj92gn93nzbrurrggdbzkrsokppcyt7fy6uidj2yvkpzdmuk0sgyagn8xyzaxky0b35zmwe5cvgp9az0e2uhvxcwfg2q7ljylt1syawn75l8taj1syu8s1wch2fgj2mip5rygek6upsxr0qhzn6auenjybxssj08s3p8poanlbey5frc9ghb8aakuxsviiczllqm9a8gxnumigyvtomp8pxwmczc4yky4n1thm64i',
                avatar: '7o9ocq9cfkfbsnrivcf7gwptk14umnjhxfdh11xzqelmrm51ksotjcyqg3to9k2b1iffxdiu1xl618nql0ib6ls3jpizu566iri76n945y9b4emtgydzw3z3vlw16vrfwdavg1i5f0nwe3xiki8igvtllhqj132sd1kwyaccyjwf1fxeolte3u5axeu2sfv2an96py1g09vh9gsbsfhl87jiqq32bzwurbrujfvgd6jvy40g7d6oyq18as32oxg',
                mobile: 'cflgx1zuv64lvt00g168pbwgw20sd0avil0uv9a5wl3flwevfehu0fdnushv',
                langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                username: 'ylklsxjrr4qu7wjitlh3re01okyilk7cc2vl5krjndp364lqezx34vgkbwxdi3lfph8krniein1w96aq9veydovyimkaqxoukqyoybdklv4krcau75k1kylv',
                password: 'oqdymc6kr2snwsc75wft1wppryfm75k6xjumjlnmt3ljzt3v98j7kbr7xbp1wykxkwf6g4ypv52ch0u5ifj0atqbekdy6zl7kvkbc3t9490asner94e330bsbum9ltqylukktgzs1jqh347o0gcj2ajaf32cbxv2qpjclkuvs8t0d1zcsx4rt6ubjlssgxtcih7k8x090a785qpoozzx5gdw48ci8ixjv673qkrc74d6ge42w7dzru3jklngzdo',
                rememberToken: 'exylbb9683hebf7nqyctx3pmrd9rgavwwqwy4ulq5my3i7ldn1mjvvgvnj0xazdjfwou9k8ikdepws0bdintg6yd8c2330i119rnkicz40qcoh8pp3sz0b6sqmbiimusi0bp506ya129821arj7yqy9d7rc3fgbanm70hvhntrc0zvok457h0etaenwegsv52xiwmj8bi35juo83ptjnezsgp5tjp6bg1tgxtag2uczvkf4k64wv7ozmei35se0',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '43cae364-6f6e-4535-b5f7-95ef67db762f'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/77aea2f4-134b-42e3-8c66-6ec7afbbf685')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/43cae364-6f6e-4535-b5f7-95ef67db762f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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

    test(`/GraphQL iamCreateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'fa833f72-a609-4b32-89ac-4a1de138eba4',
                        accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                        name: 'axtvnvx5oa0fnxyzqedyx1wwhvjaxqfzyi81bxbiaibel50guk6hwiw46w2svsl8ktnd6cq3s36c0ts1b79x3we4ovia3wqdvokilsljyfjng18vucunkl44bperwpjh1thg0mywh0sv301wxoovr6p54xk5ua2odvuh09uyfdziokv5ger3nip37r9evrtvn7ht579dweco28m1bokzyennqvme9o8ltka7irdamcsi075z1o02pui3de57hs2',
                        surname: 'ifvc6wl7xxn5ltmnr8vyiodz96eg0eb0lffhak1sbwz67eegpr3sd66fge6b0vjz1bu354qx77lxbkkawepuq6zxrek1o1oqxap9clzxxbhess22at4e4adc6scdca05i962r3xyo8bxnsj5h0b00u8jj8p6b67moehib8aip4wgbzzf6ljs3h7m9u9b5jpugd29wwjhem63jqubukuvex9mgvgjvd40yrqbdd50f92g0qlsesulnh9ibeyfdaf',
                        avatar: '7rs0zpc57u5xbw2u0jur61pp5p4t0utevuwnnh2ghcj2sl90pbcnlrvndcojcgc5aghanm8u477eq9jh33xrutgj6hh47ekfumfii3igilrbulng0tqmnb57y9wt3t2vs02gh48x3tpabsthf01m5577qh4oeme0p0eq0n4qt4f5na94uari0jxj9c6yd53sep1yeckyerbpx6pwmvc2m4uabkl0s47ldkrz6tsbwq0r0zlxgeexdymvp3ba0kp',
                        mobile: '3c387mb8kq5gaeotmmtt1vk6q1jf4la05kys783036to0c2rheag0retvau4',
                        langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                        username: 'rydt6spz3hkv2nqpt8hyrwy2p1v4udocxfmm44v3qf0b4qkprsohjynen2exrfc6es3bx7vmqkvzgbkerf0wmafd83heizm8lrt1rfz0naw9l3dcoibhmm89',
                        password: 'beja2irv6yfketz6ie6d7r502rgwupct4tdyqgh4wyq4m6f6fyxk3h3hm8iu55im5irdnj2sfm6tsya7dlsds9y99y4rtbvddued6hypxa000jj15awzx4o8qeplm6l08hdu6548wz7po1qhppwrx3euwjqswflz0w2w2ttffwn30s0ubsc68w7t0vfzn17cu52ccn4p8ownib5hfky8tddebyc9mxo5qsbdwn1s4adz3dqdcx9f7q29t4mrf52',
                        rememberToken: 'gu676gjuk1x0n28nm3aitsph0mz4p0vwg23vipkd5jv0r130d5iv5q971gjsup7dlsrr80arvpvy9krmwvnyecugmciuirh9cnkyxwiqlv6zyh4ei2byia94x8nxsjqgbhkmg2ykjh9idxjph9k0s6thllexi3befypsg4lwxgkr0e1cohb828iez3r4yeow915ue9nf1zpgpy03d3nbrhsi8x096l4s4fnoduylc3std8a038qqh6s1rqstui0',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', 'fa833f72-a609-4b32-89ac-4a1de138eba4');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: '704540db-a529-4961-b1de-5cb7db552baa'
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

    test(`/GraphQL iamFindUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: '43cae364-6f6e-4535-b5f7-95ef67db762f'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('43cae364-6f6e-4535-b5f7-95ef67db762f');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a7d95eb8-1a4a-4d5b-9fd5-65e6d5939c95'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '43cae364-6f6e-4535-b5f7-95ef67db762f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('43cae364-6f6e-4535-b5f7-95ef67db762f');
            });
    });

    test(`/GraphQL iamGetUsers`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateUser - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bc89a70c-1bb5-464d-8a73-69ece08373fe',
                        accountId: '6024d2ee-db75-4c4f-8c01-7023c83de3d2',
                        name: 'dznrog5p5bvkly8fiv1spjhq0qh89urehvik36tpozjpe6iozkyftezu8aumzlxgg7y3aqbcy0f7x3hemieq7zkynoq1igltz0itw5h2121xsp0fln9e2qz2rqbl65nql842br2fqcyuqigrijb6iz3kricj3pnuv55l2e0xoqdh2fse8biu4m6nbqymwywtmhlrch3yqnv6p62ilr2yztd0gmhn2i0dlvx470hsb5ahlotb3ci7a3nn4fx754d',
                        surname: '6hw6q6nwmdcgstgi77n9r01vgcqu5aej4rftiwql2mbrwq17d2nnhcq7ichnf8evnqyx4qw5durirqexipepod6nd2cgq7hu4gk8k83vkf3rxir2ohsm8abd6a8r4x5pz1deo8v8n1lh215nvobrmdyzvoszjpm0v39u6ip8i2v0l5utnzmjo9lnl1c5uqsgl2zofzk1c6o5gzuxr6bkbtg6dtxfybhkhfsyqqghnp0m3cwft3g0f8pauhi8ioc',
                        avatar: 'jbr300hiid9wsso6babrpwjmtokdbhlfeqgo2lmfdnq3rc6no6k3fy4gpaqjkhn6jh5gvut85nc42rp9opfao2kqlffy3uat4v8nrwc8zhz4sptbtsbyw7kdplrk1yq0twub0mi1q4lgvd55gmrzomldiq4b6ndculirll9pnmjh67du2gbq9guk1aohjoved70u0f4ktontla21f2pxuzsuw739xjp5vqpfp5bcqr1uh74t88p49xpslt6x1eg',
                        mobile: '8z6ngmnscfm9xxqveaqqz5kzxemuyzzuv92g4p3lr1wi2ts6bdiye5469y1h',
                        langId: '604dd26c-40cb-40cf-9fe8-5ccef7075bff',
                        username: 'gkprk3r4dm3u67y05d1suayfdnuri0sdlmgxyda5epu0jrwjz22zlpbvjktm72dz00qtb2iekyexgig5g6crg0r3qi3pyxuvj7vhbiktw3qaqqdfb88xw6zr',
                        password: 'wkoj56od6co8o00g8f9zkp87rwrwyzw0ifss85xffqvmqz1mcq3hep92x6o9dpg1wj8xbhibedsl24oezlknt9yqdegeeiciedqn08ezqda6plgivl55q1e9gxphjrjc2lw4f0tf165020fkllhu251sirhohgt9ut6ao1s92vk1xyhzb19ryz6hpy8ncicvokesim9v84rw1tp9nyvfuw6g5hlryi5gkncdo1pnmfmszfxo0lfyqrpaqwegav1',
                        rememberToken: 'os81clzv2nrx2xsbgvjmez7f3i6atu0g5ufrjc9y6oiimuutwwwz904p051j3qtn0m6akbsfpmiohf5sfhm65721ifrkyr68b48qg8djxj2n69cna6pjshl0a7hmjlpt504zlxzo7wm9j8hyof9371qxz2q5861pf6j3u7jfldlpiy51xa85fahkwsvmrh5wztfc49w7wq5wzqx1hjv09881swd71i8ex4tnevh5eb6jjwm24063mxxcaj9iw8c',
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

    test(`/GraphQL iamUpdateUser`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '43cae364-6f6e-4535-b5f7-95ef67db762f',
                        accountId: '2ec9975a-88dc-487c-9a55-6afa41282fa2',
                        name: 'at92g0t80uetpt5uarcjakcq6zo98pfn9au6slij044uvmojz2ejxput45sy36m36lfywl2buj847ya6w99y9zwcd679hdq295m24z9ea8x8o93rqlwxypf8cahqa55is6hjqykwhrg9dwickg4bzhewh3cz8734plnvbowde66xmhkys5ss3f7m9kznuje10leipbnz5ij54fxav0vg3z61s6olgnryuqhpv28gkc8ps2oub7h33kgl5ej39pq',
                        surname: '0ug8w970gypzynm978scc0lhslfvsim2coptobeleltzahodkeo0v2bkllbc4b9acjwxx2i52knr5aw5bqizftncah5xhf3e8bhio39u1gdceht496l3ggumvdzvy8n9isc1xo856nwfof2mf7nc5qd8y4mc0d283vhu9nnlz8w8kdb46uob73hf5z734etd42b7ig3cr26qsxvtqf48ywj1qaegkdunfyu49yj6z6m42kj0ivjh8y03lef2ddu',
                        avatar: 'im6jjjs5b1noo8sc9i4ejxydnxneulc80fm2ctrc43oma5lw7q5ox3tmc9gysv5j7vo3snd66wunub7jsc7ky6i4rvfhq40pml3terecd27m9ne0b62mqyie96dqu8nqcqllq3d4aqrxfarfwl9w48u5k4tchl3n3reuh8c07xopzxds47ia3nl18ew5ndeo28xp2vu4h3c7jmfwwu5deg96spfr1guriktwjb24pd4ng0m3b3i6jf0yc4h9jfa',
                        mobile: 'b77fij2doggifwm9sjbvml7hase9fif769cpc9424tn249dpb13q96mguy97',
                        langId: '5338e320-a800-4c38-a6b9-46530fc251e6',
                        username: 'm73d845jf349hwo79dw9w3l6gcxm83pfejf14p75oncd0cllnlekxn540rj3jkr5hlwtpo5jwtlq84eyhybpop8x3vfapuw33loqpn9rem8ppzsx9agunc68',
                        password: 'zn41l97bvsazorllllh4ckz88g2huqyygeqagsimqhov0yfmc2q8utoron3qdkj4gmsr8b4zg1sr3htc58wnlg870aqhwrjenjojt7c4n9btkrv6k5etil4ivpy1u7vc2d6l42ziundh0ui4z21nlgige7ln6pvs6e8r1eh72my6rx2by6bcdondbzzm2ae5lebb2rzxgqjr1y76yz87wqvun6jt7q987bso5rafjqnqist9hd6uhgqja6ej7gv',
                        rememberToken: '0erzs3188yd2xp5xkmcolenfq9icl9lsy47td1o6sdi8dejbi5tiqmgiunhovd4cmn6bkddzpc20sdfyh9l0etd4zcmc2m680226c1eyleza5kl6911mw6fwp4d1799nv7jz5h9fzm68rpe6ei5gq7jmvw0ouvrs7hfqiwbpgu1x9sv0iwhfvnx7twxj3txenw9ndl181mdjkmpcy6olrfa2k0etik5gdbnqy3fmfgep4274ry9zfw5loxz3agd',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('43cae364-6f6e-4535-b5f7-95ef67db762f');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7bc23359-ccf8-43a0-a33b-4700302f915d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteUserById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {   
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '43cae364-6f6e-4535-b5f7-95ef67db762f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('43cae364-6f6e-4535-b5f7-95ef67db762f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});