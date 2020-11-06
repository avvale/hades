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
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'tieq5nc9aaw7x3t1xg6soby6mz9egzfrfvctcmebutgxi6wkpm804n6ll1gy6ayt56s9811b51izob33u8tebj36hsx56li7hqvjnsb4nitydwcuzy80cnwakxyhci8mkwjyopnqxj6ye0xgzqkhbex2o9blterxgzwt2n5x6phl6bkk8vr7njtpay5cl0crvmxu2n5wfl1an4rca09ha3rv8ykuzrv58zzrpujsco2rej6if7x7s1l808qsuen',
                surname: 'srirhr7vxcsns13g535j8ga5f4438crphtoqkq9cc8b9koxr8z4z69qzfp2o5n0uuko2dsws36rd3b81cyvkgp7izd4rwdulk6ta1pb7yy30gb04lepuci4y7kkvrycz6qr4axwjc2dburdjds3wwg74yzlxu63o6um3ko73xpnbp5hhqpnjdkqwsojnj62t6tgsy8x1f854znxjccoyoc4u02rzpg5cmtx2uboh93jp7rpcyghwys031grt2aa',
                avatar: '4n9wmhvz5pug6znavsuhh8d7pr9xf8eox7lgxs3v8bfiik3dic5snvgvr6lc1s2helmmhdtutoguybd5uwrvnrg3ijvk18dn2oaktfrn66ymx54z3qg3gjdxdqg0egeba3ywx097cqyyzp8xn307u0u1lljag12jxcyuugju5hml066di3dln536k8h0on0nca1x1lblt0z17gofmee1s2wepkvrdjr97fjyy7cdwwl607dqg040rx9bcpyd55a',
                mobile: 'zdzym63z8lxej0bryftv0z2d7eflypjskom0t5njxwmbfgveudjw4fmfqs9p',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'bcx2wzevd2fnm2fco8bn4i8r3i8l5a1i65g8meon9ew6efj7zk1fpuqx0j7wym4k9l7pzh5nw4l3z9ug6c9ppg2822pp2oo1dsj7nyeq2173hf7vo2few9rf',
                password: 'wa9o72m710qjmm6aef8gr4tpwdo012pz80dp5o32mm29s6o62leaj2mysfdsh8hc2p11zzvyui5gmldgg5xhvpg3trdr70wj0l9ygr7waw58ziaignr7qt6oeeteh812aws439vmdvn14pjj8h798e3d5lutr3wlez22mvj5z8rsuu0s65gdihlg3iyvhfljlt6wqbi5hixhr5otg39nw6xuynd7nbmyfuq6esf9nygnv3w30qluubrl95qf9t9',
                rememberToken: '94mgommqhfwujle5ytqchi1i8luo1zrml77biogyzh8490o53fepzgi1ag6xjhd6n65og9qlg5e9ow9r4ntmi1mgwoqp8jz62130kpnqyktgsbpreewtu92bafjst9u3xk9eqd2qzjmxv3l8l0m23sc6yubwtrvd1ogunp2qhgp1bns3tccsf22ye1881lf69rcqgs58tucbma9u149nrrbfmnq7m8dp63xo55upw1157lq6sj23fiigrsertwp',
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
                
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'c7pz84q3u5jcxkgv7nsfps1abi1kcgy2818nydf8a2fgpk788nj1evg04up1325vdiis822i57902dg3zjb97zwj1q2wxxv6822lg06wl9qodppih45ntectres2d7qwd3xocu714cco0k1fbfa9ai8vyogzuz11q7zaxfn04k8yrd3vas1gzvokbwlz9xt5gxic4z0vbtebsz7p4tkucluubu3rrovbk9lsxkmbzlnni56x7c9w59lnzlsgp41',
                surname: 'anj6t5gb5xtu2msd7wq35byuv73tdu53j5vj7xqc0wbir3g4ti5rusjxmd71u9elrjqqocv66ro7jod9ayhbtf0ahaulp3js7k2wwkjms2sew7q5rvqpf9en2rgglhlqrllib9tfwd2qq3n5ljs0wha60li36tls07kysem7wi14qe76l8yyi4eyqw3rizab7wg35s8fyq0fy15f2oft2y68nkxavmaed9bv64x8wyyem26uxnta4fh0kmq7i2i',
                avatar: 'gaacr5555f0z4ddjqw7szzbshxrqkz0q05qegvmua7m7l973gbuxzh6ppe9t0vkwvdl3ap4jvwo3znki6teyd3r024m4ck0ilb0v41ytpg5eeljs6vvlffsywajhgyp63aee2p1encijru5ohum86zue5annasw02d87r4vqwphj5jwqyt151jvxlsux1h7t9ksatyha2kgrv1b8xlugx3ch85gumfbuifxywovj32ovx450jnc18by9xb7n3kb',
                mobile: 'h8fzjlzgawe4qjjrhzy6nx0ltq4kxuxosvgtdyqu2420qlnk0e021lz29khv',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: '1uta7jycx5vab6l3fxeck1c5wzqm2d4kyh6fp4qlhknp8nbri4nyo5fu1bhhuqiczw0x340emtcwsi7gzngtbsrnjubr5bu9rtq52mzgm5wwvx7e3ks99na9',
                password: 'ty0d645dwr138uwkvc0vyt0c6rvj92g8oq1qtukji2xxjdlr7n3grxwi9kwgtdi4yb63ef7ndd2xc4dfm19eicjr179sowx33f6oyhiojqt4iajmkeodpeqyxwhxnj1tb4ty3sfzvjjk11mpg6ao8k6p9q1fbazyukhcq929j99cc5206wj62qb7sccgl1z1sqnrzmx6fvuvvlcynmx891yxjas8dv0dmlu2v4qx0ftbjv9spega0fcvjn5ynbf',
                rememberToken: 't440xlemsunqbl50zun956a5zoutcoz0bb1xngvij9cbmxy5neg9sdst00sjl8daw5hbph7h09gbgumdp9trovtdkt4944s3v091l7w2z38c8inkz2opnbj6efv7k1fszyx5tuzdi5qew1isfp2c3xto2och74kb566ctgz2evubjh104yf0wjd4iyhthyvq24hf2c4r9u4pdu9lfz6504viya04uhm0bgxjwvqlvj3mkjytoub3b3j3lbomn79',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: null,
                name: '45crgtey8s56mu4w5dy1q7cvr0xldqgef7upaxpf1gmmn2osyh2wl78dkk70xdj1k3ukbgymykoo3yuqvjy24q09oq1urqwnu2j1ye2e88rhqsd54vrck1q7qae2uzu1uau8ks7sf4ucxkw37pdjx6wx254m3deduu23a7nhk9knzx329lj7tkoprzv4sb3prgagaam2rh45m2eth1hjmb14ya5xvm9fwylvuc9lmw1r35in0mg9us5e559hhpi',
                surname: 'snhrxmdswl07lcdn6pe9ypetlqq72iflrcdi27jxvdm5ho206dn2pmc9177ujkpl8x8plf4w2ylr2krvwlemivgzragk00m4n8f7ckbk9zps921ls04f1v8xo6vo6lmmcxt35du1xaxmio9p642tuxaw5a8uq6eyk5qrpmov3ivc2outz7zjzqqbr52bbtg54em8fpk5g6dedc3jhllszcnv00fip0vxbr6hvsan114yrpbygv8bhqs8qkmojdx',
                avatar: 'rljfctbhjzkb0jgbaf65z062bdbef8ynay6m246gifkztnodl2c12pydlvqljtnizichzmsadwed7i6ojwou1hkrvirakzf5xgm2o8xh3vd1077hl85t9yb03yiyxc46kxzwv8c40czfmh9mz50xsc5izlozhxtepqm0wmqgh8vbihpdo1ngmbxd90qq0suaj6zfrz31msgcu692qb2vmofrkelftimpi8jycvntyd6xf8g92jzk4qshk9luiej',
                mobile: 'evtc0xlxhqirlgu4hyb2j6s1u94puqmobhiqeztu13qs6mykhtq937dtk0fh',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: '30ihmqpw1w6dyrsgkdeawfsfimw4wa3vycz9o7x7zi2rf2csxxbeaaac0v9igpdgl8kpiecc5k175f3zg831yebdlv1utv5yndcylktfn21q56oujny6k73t',
                password: '2indewo8i5q6gttcn8e99a0ozqc3mvxmgoap4vk6ueezpxellkq5dyoy1ok620yciasckf6fbhpxsz9r2qauy4ihhj3vch4iqmiqqv52rtu92lo2njljb2c3k72pbbnyg8ok83yndi4amitqaoydvzkglhbuxkvlvken30apzffw7ntlb43a414nixt67ckb26ffit4w9cdp0wmqcjiw72y3ho8iobmemdbhf3diceokke57fz91fzt1pkl8gkp',
                rememberToken: 'voi15rf4abwaz3k0c4e2pkieg8iu17uhmw1nw97fwvf9z1zryx9vjnhexqdj1t4wd2gzhgejbsz92lx6aforo2rxanjyizttt4dxpzmawnvkz226n67m6s3tx5u3o3rckuo6ns60gd5zbe1d512wtbw39juhg73n83r70cs63vclrcoe00mmoimirqm9bt2odksps34el3tco5vgenq487zdvkxzn3bjc5ccta88zpg7osu6p9a38rsjs4urupa',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                
                name: 'm8p37foppogltyzgcb0o2r9f4mn75qbhtfad8enwx1zrazc14txqidf0wls8acqisbww0dzb5rcok9c6eyocq1k3f2l0ouc64q7mi572ga09hp9useat6l1pkbawzgzuoytysg0298g3jtnw5rig78ocqut4pflfrap70yfj1rc1zf9r3ja4ayhn4ld33hrn8js4klq6he4ryl8absuubewcj44ozm5u9k5yw5u0tl4t7bb3x0auzou5pkdwfpk',
                surname: 'pnm0dh095qw985t9s475qxswwz4p7u1lfq6bz8v081jie9n5g0n7hvawnjfmet2uwptbettcd8vdb0ppyx8iwdybf3gzvgmdrdxbs1oh8o39jangb7h2oedkj184e4wp025hc42q5g0sbab1jyua8s0jmx0jkl753t8ejqz9um5gb1g0cdq2y5lpjnbb9ete43l6a5sjv3fbicigrm0y01tb5i7x9x4we2ybnbc57bmufe7fufws7agdr683scy',
                avatar: 'mwji4trybjhd9nguieoci4ehmcf42cgb76mpa7k2c2q1yl6lhnjee4zdekcrqugtrn4kjyytvu4emscoslggaim4mhgrtztq9mojnd9t0teqa9t404u6c1exa7ldb4b9w889f9sqdipf16sr81fwrvbqjnzzz98dt8r19x1mi2mgidrakgw6029bd0q5zo9z5smetc6b223pqxchzynz2prno4prltq5nvecmde1wt3dtmu4uudn6fjtrmulmw0',
                mobile: '5xzwfjid2uf9oqldu93klw7y8hwez2221cgzt3uhqd2rq6o0flu8hn9dt49m',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'ahedbjeselrx122n316ofp12ig8ryk2z1a5kk8x49t6ykfi8n31gx6nixahgfppofuhp5q8vx80vok0ci6z3qw41pybk57ctuorw28rofsuhuq7r4zjnjmqi',
                password: 'gzdwxkz9s6lpt8ssw6ndat74dqbqfjzx5iv57h7jo17zk2p5mn95kz55nrcdadm4jzpjdoav8tekamv2cp6pj3akfywytpdepchyddr2n2lvxh6ndu6wndav3ol4s00m0rrjyiw7bxky4tvdduhxup1lefj5pwxx43envrkxw8tcybin6rrxh63mn72yeb43jt6161qta1m43giwkbiduj7dmvswxb13i9lxvgvu82wqmm073rs4rnllcaws8mf',
                rememberToken: 'sw1musfw4km2yfss3rh4g2fpr37srmjy9fiyhz8v1j8pkuquq2j40yhd87wh3uev35xhbx8r8ds4vlph1tm4388xlynpc1wk4aurla2niri67gceym3tmrjjhq9t4pw6u945b594pejayuihs9nzh7yzmm6rpmi2l6mi7qgzja6hfq1y271b8e6nel5x3ajlnvuh4wd5te6uvego2sjdfat9w5jao2mqcpkrgn1rb9m0zsc53jknim4cddiketu',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: null,
                surname: 'fowem4c1w2ant8ffej6g12xpv6vav5zthn72vv9jd04awhezmz8um1a8dv1rz80n20ml8qi0b7ie7gaeh1vfig9nowjy7u751n1uzz26cwg9qpgil2cl0pnj3j4x1x4gr1h1d3pu7u7r49j7vvmvz03vojh7gox7ldj7p8281i78i3ku39vukkv7te59hnqn7p1t7jo0utd10o4km60n6tauv6kffughrgvejusqz97eti95hzc11kjk6fjf4su',
                avatar: '1dln76mgn5wyfhw7e0sj5npnr4gfgjyjis3aab2y3f7oqnt42blly97410nrqhb88lwxav8hhlz96ueyhy66hu91eg4zm8eezzmjkcqyijvx8ug6d6iaq4sk6higcu57xsk5ciiehychy6ddv1pngdt3afnkls8ockxrfhuunpo06sldrdlje1fs1rhfqdxobvabb28xk8od1gyi4azynuddjwdirj1rtryp2wye7oy8vtvtixgm6bnjsesdl14',
                mobile: 'hp6nzp36x2kujeqhjg36oogjnebb2bfni34zwr152m9sdcods5esjl60na7v',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: '93w5f10wv95d8o2y60f6ke60r003pn3ucexwzy20wchnya2bzoa7gqpn1r9q9y0ztihp48ph7apyc56l4o28haeuwwjib41icg86olu6yls2wyoygir4ntl3',
                password: 'swwrjnx0149p80lkxio83ig5tzmluhxyg6qff1zldxwcy0uv228a7te8x3bmizzbdo0tyb1wrjwjr6mukmuiegwsjdy6s2m5fn2hsvzcbk2dypofesev6noqp9yfq7a2g9mdkn5450prxkai06l41l7foabgx58vodsy07g9ang4cbrb7ldqpryiq28sasenu8xk1bn25kjb8vbzyza6sjaf9sn2ugnrfuaq0k9z9yp0jnfooehc31txn6m2ac4',
                rememberToken: 'wqa002jnmyhb7xs0u3awy45x4g8hsqmtcxrpsrfidt0hp0dy7zcd2xa7wzh5kjiskdx7m1d652qmllqyocjse19kc58r3xt2a4ig4j8fw3xjevmwnbzyy7wv78mvetag27i45c6hk96cfko06xtjip2y63bwpdz70hp3w3nr1mmeo0ln5cj26nhux5pvw88mcl7ja96rgdlvoweidksq6nl6yxlauwgpfnbloqyh50uyvw4hmp4usinx9vui9z6',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                
                surname: '9xz5ipgf0ntzv6gja6bf4r2xgsaujfvdiwirc2y8lnm1ypn356peyot3t16s7jqz5nel01v5e22en6ohqlhsqiacuq7v809lt2t3dlovgy9umi4jb24a8dmwjle68o6snkaminplnlvcded6f76xbdcof9wiw3ff7idrktigepnjfsim4to6rbxgv7h3q0z3ovrqiuthhi15jxc93oqywy6rbgi3k2487s1thb0vwaqvflp9gh5ka5hvpc884hu',
                avatar: 'kychwkudw8mk732q3yn1i52q7sa0unimmt0yjl4hu5s2rifmw8petc1l4x66emfamy7utoxcvvdyki7d0ay3x14mmcp7xp3i67h66fx7oaboo7mmgc5x36jsbhykwyptkemxsjsu85u5c4yvklb1cxn3fv514ng3lxzn0go6if3g6786ctlp8hgxj5qyduqo18d0fh0x9ypxpmgtjz3clvmi3q4jf0en1x1iorgk0arb1rzuq3csxtj3igqhjqr',
                mobile: '357mrad4sc4k60dr9s2hkdvmb1e23ghdvjvoxd85bvl9nf4a52u04e189okf',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'axt6sf43p8cx4d6vd6mltl9g9p3hhq4xsnntk8rr7usv4qq7zbatmngo6ueofu9fuuy8ynzij260jzgtb83jsrle0h4fksv8prmnr3fit49fs1vkgn7xf6n4',
                password: 'd4i6tgea6n5gn68324jo7kpchm5ji41vpso748qjhqm4031glzcgmxy1mkw3vkm939mfdc3l2aa5xoe7sjgtnxxwf19h4324a3wivo3m5kr631ivmpvaelm4mrms5nmsriu8fpc7ngkbr7x6301yjr731r6xfubvv37na7hnw45zgqa5w2n4pk0mtct8vjm8lm7quwpfrey07pt4c13f8jfstc5clkeow97glcjraed4l401rorlnd4cutyyeni',
                rememberToken: 'lxirqdo2yjx4rdh4fmxzlq74bocms169pu2puku4m3o6lkzdtb77zxnrhu0i3jnoldxb1taruu8meqhriway6kkipq67iuftgl9taa4vcjou3xlaxkgxrunvsnh3titt0493k3rym36wo0myp0qnj2ztgpf7z8rxw3lmvtgfignoozq91yhd3flr0ggq3c4n6k5sfwnx8d55ff11k6tmnpsyez9yvw0egmy4e1n5zhd6rteseg5rusqucgqjakh',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'lzoyl4zlt6twz1rbxvvt4rvmebtpuujjqjj74x2ek3z0psszkwm7p29iz55nozlqnaea5j8b1tsxwheo1uxtp8hrscstxb7bxg60rmau118hhas48ohjgdeuok1t7vue7y3u32xdtgyc1envpev2z322wyo7mjaylk9twtkzglf5q6hxilvy01fwy1t4u67gqpkyvyg7jvmiyil8pbh1xiu7sxjir4ihhp9rzp8qgiah6075p0zggk5frk8fyxu',
                surname: 'xf4q3jecxgnjke39hvyd5wpgylcehr35vh78nkzexpwff39uyzbjcxj5txzvqdbnz10byhoqx3bpc8xzb2b7uq868u0wltdr95v8zom6nfaxcd4wernrqc9kzmfrpo4s2l6j44kiw82vtky2f5ulb5bzeaul7h0ctm4we3p78yfbusg904lkdwsfdmmc4yecshjb2hljj37fevi07qrkcgxpn2igrt30l9i74b87wjkvu3n9985dzpwi0117jti',
                avatar: '0cyxfaugy3na0oylpdbb8iv8gc8wn57i9ac0tpic3mzjtrgyrmwgmkxjxaxdsnyg34h1h5pm50uxkwp80m4tpp1lhrh9737rffrtfdvb4hc12ojljuppei4qcsn1f8kyrnd6onkmdurhf0l86fs6j26fc9s6caz5x1o8342gc23s7rmlnnx2w2yplk04yhe18qfasyrzu310ik0krdx1h87u4g0rdjq91esfyzifg4s4k8scacq2fsav882z26m',
                mobile: 'k732xbq0c8l3mjlm5iuzs0jko7qzmb6ph8ud9nh67xnq8ch3vf0m0nwjxaxy',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: null,
                password: 'y2u433wu8121ekxjtj9jwkkf2oj4moe4bux6j2716n7zp8q9owfm8dvhg5smanjjnh4r4v3xhzmh0w63nsv23zxgsyrvngtgytczzftcdg5pvb1qkmdo5urhheqka7aycqtviph1us19siokh5d7t5vw16ica2u5gfdl3rwwziljugtyo3bfahr974mp7exiq5o9f407bjoxwpzuryw0ix485n87vjjl33ydtjjv0rry0mbsfphlojsn0lld390',
                rememberToken: 'vjxqorcrdvvs48qftb4hx62crqfiahuukqf1mli8ebgmlak8ywb8ge2tp7skmfovl739pm31gm5iawcqruvacapmdmb0cx2ezoj20c1qz2u5fah0uc10z45tp3gx1p1qso5yjeeawcaodsdue6h2a4dq1wsy3pyd0hthntwle7oncog58q59t3jc7bwbp98ar2f42dszyaaucc796ek781c4kbgqi2xm4tbtaxrp9rfgi1pn0jtsupilsl19tvl',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'w728xkprvrqdaukfbmiawgedyijr0fz2x1c3ejd8rr8c2m9rly29nwvwecldw6kbkhqmsy3v3t2cdlrvpbw10peiglqhk4e9fna97pztvn193xwa69ekmrsod2nll03jk2cfujhw61rh3233tl9s8ue5fkq41bqr3puhq2kkp0aifsqfa3iu9wpx3y42kdoyfqvqijd3dngk60q732c84jqcca6t19k6zzzcwhq1vwcvw1hj1cdgmo3y36w9pcs',
                surname: 'bxw2h5yfe9sxyja1vjqjencx50yzclpg65k9ignncrzsfb3l499b59m0vuflc8sa1s9azbhjrzbr86fmr6me12x0akr3ppo9xqcadq8laxvqustjitq9krak9s1q3w81hmqtr1v6sen42lxwdnryw4fiwyc6sjupeycu8rpo24zh6a5gafz0agq3mmnf3f1091c7k2jf6wa29pb2n46rqjo2msk682bt37zfr0jc3vpzu205ih9qrocdxcla3qp',
                avatar: '9xw7eq2wrz7jvg46qxzs50futhz9davsqa7a4cos96d07j03gb9g53danvljxlgwktmc2fwysv7w8bq46li5h580gh4ydxtft008z67e2vct9b6cxs8uk9kgy6nas80d51159p8713dig4764flbef27671nf4c083lqr8zprekd18oqxy3yef7z91aherv4ahwmnxwkn6t3vngiaf2f3zthfg70y4hvrl9tisz73ddcikcyxwsyhnv0wz84k9w',
                mobile: 'z7v8sb6ygrm7oqcegg64myls7kwf8zc7w4aypr9oxezx8sp7n87cyi87nxpk',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                
                password: '4zaerkhflrub6686zhmqt0chkp3rpb2d5i9fplr0q92s2smbynkk0p0x5g84kq7ie8dv17td1mrujb2slu5lzqjwyc18uuxswbmafn4hkdxz5yuz8u6lqdeyu9du7r17b0r9fdev37udporhkmuzzfebkcnngq3w2juar825009t4zm3j7xuoq43phcv5l2f58na8v3xdv8a0a6ow2eyq96fg3nqb8tkbfqv3vuyovott7866r6as7cqdnij0gi',
                rememberToken: 'z1pfrusiffoh2g1mwe0v5agfl7bgdzqrmeaoixeylmpe99kcq9zp5hxylssn12s9gyek1q444phd4glgfxgxp3aa54bi0573fxvc8qkiblrm334j1ba4c3atlyvu94tefv308ia3s26ogjn2u2j9lvw1u387ocp50ur7cddxjqk82mtrtv1vm38ngjwkyzp7n4l4o3glo9jfb5cnowin9efnva8iolsq5yzk23e9nr3qyx10x7ekrrfaic60hkt',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'fcbbot7tslkg0y22gfbwgkkqt0vv66yr0m751biwri5pxntk7mdxz8l7ysdry7f2zpjhqa011eshkun0ni9gate4kjdbei9u2gm3yqmeth6a168swnt8c0hk302veyy6gqoiyc66zk7608am69h33ivi4s5u4h1jbjvxpwwvff2q6huvjr4svk6rhtnukncq2vrqxgwkevch63lwut8nm4hmxrvhrs6dx8ukfrhzk9u7ulfxacmezx3clcnlalz',
                surname: '9akvtlxk05hz5jm72s2lqkb8go9jjyhh2n331ilia5wiw157aajd8gf7q43lo7m2hcta74xejoxxcgo514srbn289gyepqvxkoj2dza3w2lcga1mwklo5xn2ix1cpwsnjrskeu3zu45q31ppvzpeydydah59uqju9pt2sa0htr2htehicd2ecvkwmpxmjixv81jrv86gshmzhrwji7qi96em0m8s857k2x371fimgd8ge8uzhqscii9wzkas9fj',
                avatar: '4rd7jv6imy1r44rlzd9fmlk0gav7l38uowmk5bt0351e7yvqsd6hu5k805ilrxr3a4eudzksovf5912j6hcizyxpgkpahirlbvl22iat56a80pwppow0ixomyvf321gmfhyfgu8jz86lyb3rbcey5tfe28tf2ouugy0lg7hac4xsyj5gmkuuaur19hjgbu7xgo4cxd9sxkx7bskh3i4hefr15rpn12xl5m7c0zsfcq6u2xjgna707hg52zlzqlf',
                mobile: '0xdg8sy07n18uchtt82poomcj7e4thebiy7lnkqfvcwi3nklmam3chscv6wk',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'fp394roknfn8d8q05kb7dgxnprawkzj55fxrtjpjl0wktbrhuhb26txyfa45phlj79t1tef9fdks37erntukji3507k1fzffmf74nbap9qnm8au3g5dq8ytt',
                password: null,
                rememberToken: 'lr4grg3cw032bxb0fp4ksqymaygo3mzdp61bzz3xom48b8qcqvb3dob2l5xvzi2f609uvxpfc9mu3axvoxlljocrvijljfv6cw0fpj62lzfrdo9pow5oiw3vnoxsbu7siwlk05fhossd36medrw4m6yce0das97tfv4n50mlsfamvqzcw6d64tzo4to9lue28ysfggreqxb1wogmax3nxlcho1gfjh28riugouk42f3rd89zxhw07rn7acr05wt',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'x7oalm61w7pnbznr2p6nhx4eajx7ztbali1bxk6w58owr1g0ujuysxyzca29ocw2karvwamcuog2ffkwg2srst85km9dilfc7s871wfp25bi451w6tn4wi7b1nsv2g2kd7elcixoctn93rtb8j41cwbiehc4pqes1zm3n0mc6ar6xl1edrwj900e2ignk4wv6rtcw9v8c9fevdt318xr2wjt092og574oavbn4me4nw7it2q2oog78upn8e5i5o',
                surname: 'y1xj4ek5jdez9ft4y85uthjqtdy7yaxitr53of0jfy3niru9t5mo33i22vtmu9krkgz8mmtull195m49b5vtcir6kwuh7nhkaslmf4kp71ni2rkayp9i50tzfdg6zbul9v9p5pbew1oe1cpisskdesl7h0t0bmhe4ws8sg7o9feydiwq1wkep1i1b6dlyaxrtb2gf3rokg37sq5slxx8aa17idug7fxdkmz9qas2m22rzi5jvkmizjmalodya8i',
                avatar: 'avkzuma1ylxpayfe3ymc8uuo51pszc3lde57kuwi0ygjsztousllkpfasqs49crl862ugwf5zbmwscm6zxgbk6dmr9gzy57urr4ar7eej35izqjne9lsgijto4tlknz39xoysonu19akccfs2c8fcwaqir40hy7b20vuiljsjmlisqgef6petr13mz6ww88pgo5s3lp8lzpgpr2fbtrxr0yyf9dy7qih3xkhtexbvhzmxyopqlyu8w0xi8xfu8k',
                mobile: 'qa8d8zvo26mr3n7lv8hzmawzym6yhtll860c5wmp2ljr0oyz0i4ej8ygmgw2',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: '65ydusntu41m5y4uu9d6lnabo3ed4wn358bk7klhfnfoawez69p0ocxj8dy7lsbvz1vly2s7jenm0su71dzx3cqje23lks7bcpgmub6b2yp8ysmaxon6s5gx',
                
                rememberToken: 'htm9i1jydb4s29m8oioapx1n8g9r63e72hbb57mncdgr6wd9w7bncjp33durvtmujz061dzt167rwqjh4ojb9fn4jvrj097zo6temd4jdsdbw733cdvpxwnofbwltqe7l859u5x26ztf7prqq2q38mo5skz4hz6mtb5ijr1q8llnyigdhjm439webdotvmw5hbkgr48m9xwqxwn8752ejbjst0pq01qnvcxww6ja8mes0rlvk6zxejulwuu0o3f',
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
                id: 'zi5fn6hy00pz5494nk1p4dri16kilse1zll0c',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'oe1rgrgevu1djfzmwj5fr8qyykhvqz8ztdw53mvvbx651tritz92gqj6xdl1dfsl0wpkvwd0q3otyf9cz74dizj6zujztoi9ndq82ptl4qe0224okfp2g882ssrsa4vomaphsnbd3mbq0cq95hd6uexsjzmom3lwjlf11dorv2rgcbfly1pda4bdu3bcv6yk87kl2ncaid5ea3z5q6tybecpgiogwsypr9zen5wt9o47ynlauhdbdf7g9xb1oru',
                surname: '9ah8k0j1oht2m3m3nuy9dd1bxk3v0x40mgu7o6y45y9y660qwfj0qa2dkqnon2eq0c50tuxeawgupo3g2wd3u0z4l827okf55s0yxqx1z031139ae0kzgsq7s3qpv2ytia9hz7r4hvv3snuuqgkwr3qb12eqfqolalsggc495iwo9oqqen4kgzkrwj4bwj9rdzm775s8js6scyclytshbizq6d59apcvu4qgf62huqar1xz32c4pgdlqfnssb41',
                avatar: '4o74equq3uqzkei05yibhcr1pfylb400h7caxdd52s3ici9mjrys7tpp3kcwggqk8102ewqxcqvjoylqi9tjrr1a7nh2hbsohsc99e8il6w5qe3si7lznywgt9egks3grk8uajew20vrix5ip0g4uje53h2eevl2ap5tyvwlr02nmvj0wxbi7olzh9ufntejfr01pyergn3415xgsmfho2loeooz4l6ii7r4xfga1t2jdxnldqbuk1gb8jyjngx',
                mobile: 'kuway2cw1hfy02kcizjv27sicd5q1rh5zynj4yrwxe90jod5o816cb3m4u0r',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'jhbpri3n8vp9v24wzt29mz2g35i4qw7ybz0nzbtskzs33vjry2oy1r940nc9hjy9j7badfe1c9930zkphpzdd5sj43lvw474z9qs7w7sdslf1gfldt55rz02',
                password: 'kusvya0lxv0g5fxolcyujj012symjnynhwlmgfte3lwng2ru4d3tw0nlp0bze09qel6zbejpp2fzl8rwxbh92gackazz4wibm88i2nxg884kqwhi4my4xm8ilzh4cxk9pbn4cj49h02qrav9beu1eaiixo36p5kpeupxryrm85lhg0nbq1ffpgljri4x6dxszu12h2fhjpqj2se8209xtenvjymhl2kht7kfnukvsr93gx3cih6i0pffr63eaca',
                rememberToken: 'zkv7py95ed3nihjpvtt2qmd1p638nkscj6lz7pvom7xchncls8eqmlnmiyo84kdn4ba053ofcnv6cm1r76i23qhgvy4op2twsubknelcpn4gzjyji8cmmxisdwhajisn721jrlhdfq313oja1bbv27zfgr4xcwpmkzy086rcw479hxsb4qw20q6jny5slo4x6zmi8nq2hqbo15htrqirfqrgavhyk91qvljc58zn5pdqda5bvy4uka4y1j3u203',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: 'hk64824pdt6wy33zq9or1kb89su61tcdsfmq3',
                name: 'dveeiquy052j7g749lbrx9znx3dvp8mtmd6lowekyd4h9jb8tf92k6cfda1swl6as8ehpyaovadx8nb99yvxsua3745zvdg7gk1smrn88ctlj25z7re2f56peip3tqhor3811n8xpujfcmexz9mma3bhmfnygxqo10e4rfo5462uieq1bbr0nchv65usqmfqvxwhs83re3ek8aibalwsei1yz4sckheebzlf4uob58k257hbu1v04elbwt0n9dq',
                surname: 'rfqmzkxft22dcb1sqgxgptoobujox4qabmuxoyku3ep2k1r0dsgffvzxwenyafc2i2qq5jznv474aaphu6ui7hmgigdw8g0qsst6wi9m66v3u2qtwa8v4a8gfijr0uq07xkl86o7o2xflo0w86n3bwv22l8n5gc76rr3t4f8fs7j3y1p4pssggkznuh460ub8jcvriywyu7eslayqz8ltcimw0tfnbdc16hytaa5m67tw9ys80d2advmcf8c1gi',
                avatar: 'p7a69tuhv83846b6bn95auc7mwdmp7fx0330yeccn2syuw3va3n0zek8znwykbiesefwx1h85bcjzx82ir9dj5sz2zseq0nb3ozex9y3907kuiw0mr3lmgieqpz2hkllyjysidqa6oed9t0vvqc9jpawwx3v3ui4dhzf42mcwz2mzzknqoc0wbk4j8lg7an4idylykqo4y8m8puxnik1ha8o9sgqtm02xxv9rzd7fp4qnabqsutxmjstydp8fp4',
                mobile: 'b6eq5nie63wrtl43toduwzbg3zlantyt11i91rmop4nvjkjpc3z1036f2b0q',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'co7370j7m8pmdsot0t1b45da4gdjl4g6tg6gd5tmcfvau2kg2rei8fswsfe3vixlbnf8mnbg8gikdj8hc50ymse0d3lyrw1g1iywc75a8whc48t1t1dav48y',
                password: 'z8wzlp9vkfu36444vwngs0x4tptjei8hsam0f6xvzjsg3e0lupfah1dqko3d9scdj44r2b4w63kun9wprzhw4sbob3flvovhwlezbuwu2ge6oap6v9am1rdia6ham74xrh6tjbq6plefi89oob6zjq70kclo5mhbs0f93o8kvn1zd11bld5hiht8meb46begf4b812abx2fzhu7eepia4n2ybii2ynkpn54vz6ip5ae7cb3qjuz52gf7sbkt4ka',
                rememberToken: 'urgrdcyup6qpifojtxi5rkj3a5uif21cufq58xuv0hdhoy9phka9ogmhlajlmn1ojzwsufa3gn0n440w36qdzwbteb0twpmkqgxcrt0jpihmyi3ree407aq3c9f9x5cdocbki679rtx9mxujsvwvvpqd2g811wp42y5244ok2s3kbau1adtbw5q4np8uuw4tpuryi4p4vj3t9tk25uc0qb0308cj2qc9yxjisng6xn2t8kgv1a8f3qmh99efvdt',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: '5osd5c6f44fhvy8488o2a5j9adl270kmo7f332z4iz9qiqwn6pb2phdftpfwo5harlo2juxi36zr6zkbpp3h9c1wmprpa9kve2axl026j74czi7j5rr6n85x2tsx2rkbx8ros35d8jr1vp2utj4vh0afqvcfteqk06mwin1i0vxjqac81g41x3pybtjczo86ft55lkx591nrfq9nd21gecg0qfqfijrxbkp20wg63hvnpdx5fe8ikcapbm282nk',
                surname: 'l36bf8vysvmz9ssip0o000ay1fxq3qtcsm23lpwf3mcgk46u7xdvhhr0lkeocwygtfknfqb05mruu34n042kmrihi3crf36pa7ob0pm3tz94yh57z10n2qvozea1xaoathh8u666yfpiqxo1qn8knby6xpg3vsbgncao8hhgpg0fcllgeawrv29x83cczsvmvhaifpmntbq8enp3tusawd67sl3l0rt0o1iu47plosw53pcdjanjl6c46hha82y',
                avatar: 'fo2slbzddinxx4wcjpbq2rrid8leq2glrqan4eo7v1uzq6s9j1uhu473kzn0i6zrqza2fp5yje32swl2edsml00s8tnun801629d5htlga1zwq3tsqjhghixh90zfvrgsbmvl2h51hhfni0boe0gdkn6jewm4pctclmlo4r8frk8rw35q4c6n2upqzv42to8z7puk7glmkrmtsij6neznimmvpxsgxog2jvqxsuiz52z2l55p53h77p2uqg0mni',
                mobile: '3vr3sfyas9y4n8k1k7bupeitfk1mkah0btshqvq927iy19j6kuc3wv7zcvsw',
                langId: 'kmzbww9mkreecqh7ezr7bqhlu64sxadjcgjjp',
                username: 'z32sk7g6hosm7vxoaocsvu79gwirwn2ki7r66rjwhi449rj7dwxtam9xpdtadxztuvck2irgnlqcvkhhp73gl065y5cfk01nv80n1lkyfsdid7xe945hf698',
                password: 's6bk6nixtbszz3g6nddf0vbkh5qcpohznegejb5rlx9l71mgla6ptzxk5lbvuelv15z1xqkr0shu7y0iysybmv1xzf5j7o5k8bx698pu86n6ish4ps90m71yaf642wi4xyyb1v69g21di3lrcm6xpj3t5dymg5bo6ml70maey9f4swlnkhhddqvxnti0tbk3z88kp3sfdhnuefyxvwwx4iyzqwzjpi1qaa8ucvcs3pfr4nkehr6v51yigin1cc4',
                rememberToken: '3mmshxo7sb4gw9hkpn6l1nfef66wnsvqt65ncdp5gjkonjm3qf791mrya3hgj94n7o1vu5wv1rcrif0sq685h4h5wsqi02b1sjgd0qcoe9f5qgi4nd01dlbotezy9ykbmtqyjyxz381c5xw1xw0e75qcxx7b5dqow3pp52tinof8l1fgsilf6k84ey7qz23wl12aex64abu6pjsmkkivi0a09ksnhzndmwnkq79hs61y0hegyimxwvmxa3r1lnp',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: '9z0v4w5oalo88q8tdpelkfx2nyr8a8feq47ruoi1l4az455x2dsghdpwmvic2mpgpt3x76bll8y1wxt3yqorvwmmdyhdkjxgapjk8m0odprpm5mc3ko3twue78tco25bnb1wvku0qop6v9ruam9xjfjufxtj0ceowckxs4zlle1diu9d6ayd5a1u0tpe2xhomcsxzga1iby8xpn8lsgyst109iancr6nkc33wesllqtazd8u0ld0gv1tlif7wdhk',
                surname: '9mdsj6m2cqm0ysfsudarf0x1ml3xuooumbnphbssea09nr8731fi4va8ptehk7wftf59ansu2hd7q89hte9hh86cextc4z2idyup2ipaw8965bndlz411zds4fc0a6pkwnqmw5xah7w4r0tcvwsq6jy0s68r4ot9jxf36kgpc2bc9hnooodvdmpowaojo8ls1ekjogulnbasxhnf9vo0j46gmfa16llnui6lpfc49nylmnz8pjmuk3qhi1nb7my',
                avatar: 'ecg2qh4fj863tygvoki2if3g13htihm22hikh4rjrar2wdo36hok3evgp9uly6a8picgoq1llngtcp1jdaerroahj08i1et7nvqylcsb4jk5ype6ufwab9a2gv7dle6jodxajisb5mtwixrlewccot1nm3jf6mc2c19cirf7kfmxyp0d6kceybhsnbqkeue7rlupmnzk8gmimsfimds3ymsc8k97r3kaxkjgx0lw56x4dfft5pg9n1lxnrq4o6w',
                mobile: 'o275sen40siw2zo3xlqk7x8zxq02eqyvlsl9id8m8rrvcr4ys26z1jrth5rn',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'd0arzqdwmj4mmsrtv369oa8flbvwzr0oov0fa5mprxxicxxqc3w37yvd77jh03sxjuqxpzc1mfal9h9lh2yzlhkn7k4nxaj5jwq5c2rx1j0lvbqwuzlhgv0o',
                password: 'hyj1lcdjlrwx1p4j3e5q2y43fonpbmwbp3s60kpoa1ardqeuo8jhm2rj9p1ouxb3zh97cjv9m9exvqb38odkqqth7ju2ydmwa1xb49bshntwizv78rzbb1geoxd6f1uo5e9xeffopab8zbq2ny9f1ahnw34zqbshlktkre4qnz8qf35oqafndup2c5yqewwjunwwh9jrq26arer8uu4igtk9efagrg8gnheggbr3ve3tqjhezxijj8qz9ym6buo',
                rememberToken: 'azidgvpiz52jezq88t6maxpy4sw8sev8zayoahqmz13h48z1o8o2d0du8m2bmsqt3gc3jzdepd07vgwicjr37xlt8wmpyl0k45cbsx7fcxjla405lhrvnw73lgoc1uys8xfr0lezfvm5a24kmihpfv7qdrevtl2aex20fykospjciko9mdhko2eh99zb1rj43jmdojqxw2qoenojio3jyefc89q8vq1hxfm9og2jxacddsyvmp5rwgs848bnt3r',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'c7ge76m49mlvsgl2dnttghqtm76imxsc41y1b859gyysq5p1xd1iupz9dphywkdng1kq4qujgorx858i1qq9ujkn1efd0gvdy5g3zzrz70pr3ih91ryakhutemvmrc3g75fryzm3211euw6meiwknvdw166w3df0pfqagmfg886917abpxl0tqvc715g8wt2u8zjsju2ey94pg4v8dnkyxufjvtznp0sfxucd6x4ucdw2erpl6j51bducuouo6n',
                surname: 'nav1wefo8ktjs0rqkuxcjaiu4inkdnim4wjwjbgx2396vjjq67p2ou6gxpcd05aqn4zuwrpb9y39gyw2o3bspa8nnxgddr66ghqybzs9pnuy32rjmbv2lvf7nj86wjzzvjb9sgt8jwe5re7c5gn3h34de9ejbecnufi82594c064ex1zz3l0dcu17pnxp5bt1476jvummt6j34ocsmxaix7cjdbnk4zehscktsu6lcne87m1b4tu2yzy4dl9g2c0',
                avatar: 'kde3g8d59orwo0de6asqh4ayww3kxnm7lzckjmqc79tmlbv9qktglg75hv55sxagmpz82ooysq5g3pl5kbjxjem6c1g74zzs6ek0iitqlayhi9lo4i2b1pei0gv6n68426lw2h12e0wqjmmcx0ya139acbgvkwk285jd2hl55zwwhdr40ti36sjtm764jo5u9hh9hfso4v0sl6xkxxgb71kdrxmamqe4l8zvakrz40yasb17rbqxbpfrkphe4j0',
                mobile: 'agkitz4smtrbps9junns9p6c3g33jndtnfo3knwhnvqe8iiw2lq2xdfqy9qn',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'm7mptu49sij711sv4vgg4gcrd97uzttar3xsz2xw92bkwd1w0mt4vgeccxqiuy2xznoheym005q5rj1lkryawhddnuozemueedx5wg5p9mxefvcq420ejuoo',
                password: 'l7dgqxtz9q2nga31uvak3o0n5820ldafybedzt1ctli18z422tp11ebfvoeq4oorfks4h76luqhmwt0a09asu6msv73a7fglj7ef74larue5dx6hkh202ag73gfyeerohj0qwyu3o6ipwu72vyrtlu2jgxqqf5pszd1cwyx1ya16mswo8z87gw7n5zngshfqkmspxu3yju780s8b6yjbrznzvoyw1amokerut2swenx9h8k8qrcsft03riryrq2',
                rememberToken: 'r86nxh51aoy14dc6grjifcth61n5jwkuoy8wezirda5jwksdsetlnu75moomqeu9sq7isx0qwrw20qdymnm6mp4be72x3q8c720n9csza78b6rtpqj8dx1pnd6xxn7e4jow0iuo0yjhuyk3hxtvy5czk2ni7sou51h6q1i4i88itmltd4f2vqolhlmx9ordhoq5utkc2g3df5hovyjfszvuc1iudojm4geqar9ybpe8sy7q9wnk9ibxn7btqjep',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'mwq9u1bfjm9eud870u3e8knz7jordrudvsjtdun010964kn1a3hc7um4f8shkzba3kb0p82emvbnuab7gnav25bt2yh0cxvnh0iyssz6iu002xyhjwml3n8sxq4l1ci43ptaiv3iunxq1we91b3j83oghyj2wd5ie7ktrm50koay6f5br6i74o5qvoy8c1ifiqkw1jqj3m177eczss3s1z3c38em8y8uadcohscaq5bfety7vos8olr1zlr55ky',
                surname: '7r5j7v9zha4iuuslwkwt4yb5f6nx1wnh73fy01kb9dd8niwfa4v2smsha3o32ll3hv8tesawkjephlt3hszwiox1e33px6d0bbofh7dnm6nf7as0orp30j87bt7qby2mveaqzjjf8vm1n7c9frmszfynalwt6gqjw3kosnn4jrweas4410f2l4ejn8h86dnjn2fu624ts8dbpm53sm1euke9ua8hrgv2xi2c3227mb7dzqandeqxdz5l5c80fc5',
                avatar: '72khgmigkd96haffsfz7eaemu21ew6hzsf4n6hvgjhpjn5ytaocaa5tskwvpp951cwksud9lro85dk0akoms1vg5n0jwfiwxb7lfz6vv1kzsk41gdhe0bkzci6gvqhor4qtxpev7rc3dgyeby9i4u31rwbluo15j4z7q51h7y3d4hnxvyav99wgvxvdzdfbfcd82bx3ojb2rr8705tg4fqbat0upqumazv6naockgo1wklaavl3pwdc2dhcgc282',
                mobile: 'fn7cen9xag3qi5b7lufzoj0dv9psbnb3ufgsejcjsme5402i0fqlk9vcl8i9',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'ahjwq7m538343e4nk14tvh5ntperj3iuddfjqwodch2mtdxtwxnerpcv7lxu2j7xaek90vuji4ets4qalx8opxnxbunhenfzqxz03m1s7gqgc8p704h72ex2',
                password: 'qkqjjof5e5rb3kksuv1jopds4pqrropz9pvdvhjki7wn83yuzz1kap5za6fv5eget2wb82z0lnt6c8bbv7om9t4w5o32uzxzcm8aipm5zpcqzc0zb3i91b3m5tfh5jub5e7mjyrcxttn3wg591kyg2tkiyi49jdka1zl1fldwe29jv9gm0m1n6ysd0m0vxqtvjd5rhfd33eym8jho8ytgs07pay1476cqz7nbnxhn82x5wuiiwkl5gcmezg1jyi',
                rememberToken: '1vma9h9x4u2ax76w6q3bn7zavgxm8rwdysyoh1cuyln06n53x1xaibesb08vbknat7j2a841e506evhbnf21lx1myqqoo0outq33b4g5fnhdirj6gh5dcta3ogau4fs2veoqj8owrwpxx0ojmvd0vxf6xkxe3eiuaa77ceq208yuj25yb45gisdy9fyzuwk0f9ad2sm6gt2ahicgtmsqxw3d9qpatuvfp92mrso9to3iyov5bekhukujcvak7dz',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: '0m4h1d11ytfhli9z14779rl5cwe2yiil1x73pv1nn1iynbl7o2llv0wy9t7vlv3ut0xl2ne2vyifmlr621y8gupkaf9dnsqfaztqhh6zvbv8wgsocx0zq1lgb6zxxantqgg6juwlndqadp9notf47i9squtm6x2fasbbtjozofvdrb94czkfq4ryyo1ugj5cy8u6un5gar5yfjrhq93e7jsjd3v5u4o0xik3ilkwanmrq2vuzvfxze0gl353ksd',
                surname: 'hzfg39ees4ihgm6279k44ns5ilbkq8svq3pq9rtovofgwd8jv3jy5szfyxvg9faezc9sz0bmht6d6537tdvxy0li9f49pjpd8pv5gqgdnsxin5z14qvgzlwy548mgbzwqy56wy48uieb4wraica688wg4crheoez7yuyu24uizptdcx2siuvhh4g0l0lt04bo6xxapgyl7vc7tyj8afk3qu7pgmcdlb4936flg0n3l41aaj3y58f18c5c56zx3i',
                avatar: 'alhhx7p835zfz7bnekxchtpmac4458euvftafoc8yf9e0sf7feslhb3moh4byxqlmhst260blfjz6vw14fuafcv71kr6w93r0y9mpv9j54wfsyq9zpw75nj1j6vfctahkyt2fcgd0uwbpcpcjko3x56a9zf5htyxwqnu4da0rgsl8m2hs1c2d86z53zi9j2ngufi2dx0l4dkuxj0vli3nh0lbifdwqpmja4zrqvo5v0f9b0rvc0u01cyl2ihig8',
                mobile: 'jfsgysc28acjuxe1n42sf2kx5wnonqshrt9777luu4cfmlmtvkaes1liqseg7',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: '6c3zl8su5qpui6bwvw4gp3bca4jypamfr3xd9e0m5qtjun3k6lh74wn1lzbu4126ey5gv4f54qevqpr1d2fwt2jymgo2mt86t1ki544pz5n9u2v5rnjvai49',
                password: 'r6q7fwgi17r948gu2njcyraju68jeavasliqujs0ducg77sgq5vywjj0t0yibml6matwotnw102r6zholhxsgj6ese8u5nr0sh9ivww5y4yofi3s2p16nkq1qwojy9bip1amahqcv45829ys8axxw0ryp4gr0m0egst0cwqrd5jyoqsugj8udeg9gnw2wf8cdy7ejlbdyymqxfk7e5dfs5455pd8s7wp8jlicxeegkp8aj2kl3y93slvcp3apdo',
                rememberToken: 'ij8jehzw4za7dc36lubdoc6aht41l4d8w0xvmimm4tzy724wrjidczfqd6yhzhopt7o5r84v4ra7i2dgao3wox2cw23uvyor1pmepfr0yr2tajf8yyo6w2ovegj5jmep9712gk2yiwqfh9ba5bvtt5qy2g7342mxb1jj3kw4002zplssjgwk7t3csonnplkbjefel3vb8lqz01qx9i13itpggx2yl2a7l05bd9d82nxiclsjm43ex1lzq779tpf',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'lrg15evjmocacr6eq24q992znoeaji4dcur0e1z1dumwek501cw1eqjgbjtyv1j18cl3bsb9pwpjpzlbh4fzrrs2uuy2ylxj9cschlzgvkzn2tzaagdxcclm0icaom6zoombo7s10tqykwcp927bmzcmreej3kukg7ue99i74ing4hqfaa54pt7nkw72r0tp4dvohnycu6jupsn3u1583cq0os27zyqb64kah1bj2c9peteo87mngai0pkqagoy',
                surname: '3hqfm35w352pz3v2jihb5yqttijs4x8t2wlo1kedr6kdadqs6m97qfz7omlqqf3os617b40fncu847htw9fjsilqia49xecc0t1qi5nj4z0kz4me8j9l7d21fvoktesm9tlsobl7didfp5n6qz9rwk7tjnyhf6jd2znn28g6x412rx6xuru7vao7doh0rtf3fewbyifd77re4hy63bgfj4082dkh3qs2j4zjdg6mla9crq6go1ivlxa4w9gz95q',
                avatar: '7o9m1ulm2qfekmqku3movpe25bm5ylgmela9c8nipkyn2zfmkne8wo55y6oi8vk2m8rmq9w9o285txuv7wwqa73y6kwsm0zisrzhpbpa7zoeofhx25z60xxk4jw7pwrow9b4u12i4u0gervn2o1ys0ebew9g6ry2y89buf7xxh2g10nzxv1fo1y3von7h0cyskw9ufd3olkobe5lzsexvnltgwtglvju2vls8ngo8oklsnpw2rhbgh3qtv8jvt6',
                mobile: 'uebppni6pzxyl0bcpkjuxhlpf2iq3wlvg83cotabvrdw5kh8rz5ig0lclt44',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: '0xttpxnegifixir9x5k13idb1p404auv4hgghk97aszxgpv1s4ecyaix96rdp69cvra39s1ir9m5olvymjqtn135qu8upmmap6ski6d30qyy2cwkvgjcajkom',
                password: 'li2zhwidnjea8jdml1xga53g3oz9av1iy44p2e6le0o5yhk98iggiu3b320f3rwco8ve5rlyq2usj3cpofy7pxcagc5jz9fxohbmi4rub2t972838t0m7y0unm0jjksqa6hf3h4tfv2dot10hxydr67t2myicvnpj1srjumbixzxznhngs7xqtnxnmzcasrjy2yd9a2bxvlyiipy5afdxmgygzklerub61ytgq385ur73r5j9yny4ci1fh7br26',
                rememberToken: 'nwc8nae9x2qrbpfus3dybbgpmoci7kqzksvz24m4tnn4pb50ntg8qkgo69vdohyk52hr2mzx3b8jby0mqfa8nwlwinwe9bak3wt8l0s5o40t2j4euxov9hsj5hwp7ql96za3wd3x4siwun5965ksu67vnd7oku13rtvnjyo05t1npll8rhgauhhvctntr915e6sov29i14yrer51a1cf9aes1ce7yu8y56kf5rulfgck2jlhz1t5nxte6lu0i45',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: 'jggardqc25i3kyftiilir9g8zc947ri8di544q3mxvplj16smy1du5xfgy5lhyyv1zc276695alp8ta60rz8op63o6aprogky1apau8wjsuwm7bvsz94m5yla4o3he1u2fmjkz6161n1p246emr331kgykz05wlf8xoorg5lgj7jtw3fo5ns2o6c4e03qr8cpa0xnihy5n4jlc2sjg4ybkv6ftec3sh3y8ehtxk3yvy8pky8ukv2w50bskhqvgy',
                surname: '4k7v5zrc19m6g4y196nwg7sa7obiayjz9jyrdtv7sl8hcc5b3ysfqv72de5egtvc7dzn2y74yk7f1nfivgma6ysffcxj4bh94e8jdae98icukyvxzfttlqxmhgc5i3kyz2kx49otknp4eun42f056wbh4xgnva6a21f9w36soz0r3dvu4r6861brffba4oujfyo5v23ozn0abxgofii64fq9yy01ohytwio828d6mmudc0c4zdhrixmhsd9n37j',
                avatar: '5odxfnu3pa544sgd9rd86dxq641gn10io0fnzoipnp4vm3mbypzon5z67tpjap89holo8o843h8lsmcvpi5vnv68h5e6qk8hvq8oe5wr71pxornqzkv3lwhc2mod6qiev6leyk57z9uewnla34uh5bqzybwfmcifktjgs7lki987sbg4v6qdz6c92hd0kyel3amvy4cktgrsj0q09vtpmsj9kd7qh3eo67fkmc8q6zzl67301else4nn2458vwm',
                mobile: 'zxoe3mrm2giixzt50jjnvcvbrdkag9q7pz8q2wvqvy5hyy15jr8uzbcmgkvk',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'c48o1uui677v17p55b7ixod1p5mo4j866l7tf7x4p1o9zbdtnqajr7bwmco37wy3hzg97hlaj6ebf37c65dohqo1nbla1y602x89a1sz31urb1t68w0ogabv',
                password: 'zwcl002aurz5zz1qhev7cgfwjyxg8seqtd8604hyfi8g7xuezko3xfmjyxrzidx69aop23mxwugwg9ow1yrorhfbhtlk3l12kl4qrnlxyxl33icdpzf9woqjlpesa9ffjyq0z63iz6m6mycg0d3x2aavfa1jh9lmi9utn9in7ftvjg4quyc72r2mek6x8g16mm1puvwcdi8wgbutdfpcomsqby7h2ry48s35hnepljm402a6j60qzoc45jn4ggq1',
                rememberToken: '4z0vpmotrzzn7elxzt44vc004cuajw1uip3v2phkqf8080gr5llvlade4pxi20ljt3302if9edoc13qbyf9l96ikadnvqkqufbm4s5hvo9scfk4r09sitpmgzb5shn8v1oqiilu6jzei21huwu5onwvzhncw3w820961xwasqv0ura5551ndnac7apk3f28c5i6amqpldpsw5e3pjipcrhv5zgeujeiwaxnrptt7lu8fju5n70fk62otvsn3lr6',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: '4p0kwnsxqds9ososi1o5jjwm8m3b6gmyqi21nzw785501a9k1dwnas8wfdnglajov0pxibcwjnrgeinm47e2hwlkkir6dvfxaf95c808g0m23qoeclbiviwhotnixp6fl3dzp74rscfz3elb41gnm2zb3zps8odjbwixj7xo5jw5vd2rpdgtb91e90gw6gxj7hnvnbngcrzfxa832msupmeo52lwwdtomgt3mhd0a8nc9kbhyy317r3dm11kw3j',
                surname: 'cxxpm95i4c32077v74b4rdy8pojrkoyyser8vo8g2b784dmlasfvdrwpf4t36tub1wy8kxb26wkmji2ouo9ahvq3mnb584xvyp2koekramxusk88t6xgluk5w4nckq2ajkbw8uixq2ktd3nq15hsk88prvx0hb7inxglqd16ke5chyv2s5pj2mkebiea2nqboh9cfepk6jl5jdp4k2lonn6zxkqgmr0fm8ead1w9ihxyet11mceyaq2wjuf2two',
                avatar: 'xep2htjvdds07sm2abr51yqyc8c2gsk7bfrk40rcy3o3d9ixrgbmnkp3w125zlppohyel57nc1pf563oajwwajg44wvoja1m6t8t6z2eds3wanpvfw4scdwmhxapodzclngzjsqr4dhh0umqq04tbx1ivfrgoqztlxfbulae9gcts6ayjhnqwyhtdgp4q0qhoh2swzsb1z67g1s42fvleh8xvzqzszqgg9ul4rh9nl9r5vl8f1vvth0su40rwqm',
                mobile: 'aor56d1xt0ukk54wjw4wc43fe1ht4s8lc1mrjub4vc8qf96vvfpgepvqityy',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'x55fg9jwigzjbap51vdps2ri3y7nka02eexmqxxc7c8r9ucujg0kqw22r9i4acyif9cleisggprhu9gcqe691i3hc7htx1uiedgf8hxbtgwodulegykqqh5y',
                password: 'lv2wtsybs49s6lkhw7qci6xefmhxnmphd47mtkavh0zuq4ggz3pfg8fpgvrrywmzqpcucltz92o926og2j5pq26f4e160qyd2wcblxllfg38nbky6ae972zf88a07q9n9w6qnseom76pbwoz5guxq7iqbgu2h1aaxbqs4ck9fd3p6avau3vno15ug3nj6wyo5hzq450uaqxj1kgxjmpuj9maq2zlen13gbuotomspfiptrsmu4fz6snn48hztgc',
                rememberToken: 'jkp0dezmesvrtcl0nwtw0jnjxzvbismh1azjdmukjoa7fup7nk6rlekjvk1q6vbabqmkm75xd8u1t3udcil37d0kvyquizmtetb1na6y9oxkc9ur338ok2q4owcc63rs6yws7sie091sklkmn7xgu6b2yykni4b8asunimnsm488e546au17rqp92lp0jlv3w9mtz3gg69nuuez4khcrt53kjwzq1hzqt1njlszxh72utlihfebnrvvi04je1zf9',
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
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: '8bgizr5g243255mkiqxb54ayntf897xkgbnjnbu2d56prmyf4rf4n9v3u35mu197a629n6k17q3fbn8t9nfjvmhhueon8qpfa3x4ewv6dsxcb7e37cvdts6090gr9bxa6naip9ov4szpk4rhp73yuuyvle0s1fxw4v5w9g2i37aez2xfvtcwgqjxy079y8291bk61go0h5sia4vwrflj38knmjx311lpfp73jkrvylx5qrh7sdmsw8w3vebae0c',
                surname: 'n4xrwje8r8dc61pbppnxbq5i0wra4r4qblcb3rhxljhnm7gh4qczpaoxj5v9w8xran2ex6wghw5e8ylh2wax9rka9kn2wkkwsv4mrmvosbpzouf1a0tm38uj0xjmgjo949kmg6bmikxpna672pghyaj2n5dof4wlzb2qaqtvzbrbs1qlrfxtcj8h5vo09aurrmm3286wi3q8t9bn5unbug44pe4ip5djssvlqzpfd0al83movw0obemijyspcek',
                avatar: 'ecozm2a8h1uwp3n0wsevy0yqsbwy1yqhyyx6cqchcmx9028fxxg1b10l4k6q5cvvblmbjtgmbe7kquv41vahgnbiysis9f4l573k7hkrvfku395uzum97gba6nshyb10xnj4j3hrn7qkkpwkha640z7m1xl2772wxa55bzlor4agf2trag851zsi365ijxb2bm1is3ejfu5qweud42hsw7l4e6nshea7x69zwwek0xopd4lhjmswhzq56aywqnu',
                mobile: 'vksiyloaj2ydz2st6t1dyc5s2f67twh1qfcjxrcjkuwmi37jp8qj1xvvuwqi',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: '05erdss9j2gxhq8cc4qi0v02bd8ndp2m3xw2b5ga5wiujhlvd9g16seyfmkx8znld8cl505k59hgtfuelrf55eqxnyw33abbgtziecnpkyk75qcmmea1jbfy',
                password: '2ptlznfbxbwjydkhqszoaldu0dwy80s5ljxa43m1sw1dgi2gtnwx23dkfwe67x3trrsaxnzhcz4lihwn97ks50gouilcbezqibvu54uavu3t5xqtz3bgvqxokbcccuv381lbmlds69n6g6bkpulnubkp9vapek29256qd5f9yoxpcq47m1m2u1tdghz0eufc0blvoemzc9ehb8tvshu481gcs2wasw9t5rpmsdhp5kcmlnfwct7taf021v1vuev',
                rememberToken: 'ilux3nfynzumey8erh6jmkyxtdafa4ff7fygx7dav35io8agrbxpizarcm2e3ykdw6kdcacz52pew6ou9jovt66y09nm4ly5msv3ybcwtiv1oirzjv04vzh7lrxqyyfpqznkpkvdtmrnu8z21dj23e7kdqhxx9bglaq0vjg6o9n5p2qgod7s0rkn3ec6pnwstwkqmuge6zqa5tjk1y9he2uopvccm9rr2bnfj7ouegj3ejsux2teg97m4r6bni9',
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
                        id: '21af0c45-b2f9-4893-9452-1dfb4259bbca'
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
                        id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0f73aa68-0743-4b38-8e36-c0cdfc56ca95'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/226aad4d-c23b-4b90-8293-a8316ff6d6ae')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/user/0f73aa68-0743-4b38-8e36-c0cdfc56ca95')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0f73aa68-0743-4b38-8e36-c0cdfc56ca95'));
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
                
                id: 'a8b90f90-4f5f-4957-a6ba-d16957d79aa3',
                accountId: '948052c5-7608-4a91-972e-ffba92ae6cd4',
                name: 'wwk18xdkjs4njana7jtyy4mswxc7mru3rh36h4ula2moas2cen94ey1elw7e49y56wd5zpt3sa6bxmfi8i42ohyr3r6ldnb90pugtnqv7q2l3rbeu4p2kf56nfo44vgu8iypta5duay8e55009souux33xc2ivtn6shyjo9izlergiqr5y59amced1m3iotbyp37x36nepmcw7gdtipx9mzlco5x1h65xpon1eiym2csua1uvxw1s07gm79je4e',
                surname: '5jl12xbyxr0qqyhgixy3f1e4akmynr4yhemgt4ighdsdietecgdkoob267h1qq88iz365nt09xsugb4tf9olsbo8x5fve7xcy3f8x8l1pwuw20d2sww73vibgf7q4h18blikr42axo8ps8xdv3by1gya3xbcu7k2qh8ejcqfedsx82emktcwhw4uuasdg5rmulcoi4wgjk3wrgrbz7snfmsr9fb3momu59eht1uyjt38mbve68uwdu62l2o7uh9',
                avatar: 'bpfbaz9p9yov2m7iam7lrlrcvt8vwdhi9x4yjh923u9ipwilefun5x5ph43yq730mfu6akrpir8kqci912egrok7338u7grown9ykl90uzcbl23efj5gb23d94fu4vlcnp8h97dlp1hoc52u40kfg5a601hlgvp737escvqqtx97ck0y7vtgxh1gtlyoaawnr50i1907wglj4n6oxlxs9uhdf6hbclqd542roroy9i72nno9lf1qik1wwdznqjo',
                mobile: 'isf8jih73o023ohqseaphhyr0rizwmmk8bc6z7x386t4utg566xuq8destjd',
                langId: 'abc94d9d-e36e-4991-8d6f-7fa935724812',
                username: 'rlwznoqqapxwdc65f1nm7purcbqndg6ewqan82e9u28m73ptz7u7qpejsvnjgebnpdklmkq3m3djp6yevagu7rjy5c3zcxski5ki6zvpyamrvder4yij9ltl',
                password: 'd1xlkpqfcjgudjiqtiquepr1yur2w3j9lxunqsyhfpgcidwzbo1g9ajaqrn52s1my0n64xurb5i0rp7ncm70r3ec345ng9foigwsvjvubegesxyl2h74rz00s0xf73w9rveo9lul73z8vr9pqm11hke3ga5ersj1eged3ygfx62tvq8tgc7tuoicdkm67km71uz4vimn5s3ffw2w9y73de40ad45nyboreh1mmvy6hufhemrbcknlx0mlklh653',
                rememberToken: 'jxakq2nlewd0vc6dmy4gx0eyldhb056edjl7qjjo896boe68rdbnm748gpwizf3mz0ikx828k9v26zxyjdxj14vrbxnlbruxyid7cjxceixnb01yg941ywwlgat5k6ga6pwzfj0zguximy3xs1367eo5hypmtdigfd5xa4318an4kla0exk1ajtaysxc8xuy8kehkokwc2mhu10eebfrvd5cacbb4udk2btxq4dnh316aan40sadeeef4ehdwgx',
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
                
                id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                accountId: '42576972-4495-4215-b963-a73724f90e5e',
                name: '5ph4bga2761a18juc7rf9uo9bg5fecakvpckh3knk8nupnurmuanna9vfsjd5i3yhnq4feuv921gd7wswfecd9dmtau1qonk179kc14ldm6mythffepe5hl1ntstclzl6ifqm15xlza0cg5jprewxqgvhu60cfxm9fvy4fdz3fwl276oev29w9agsin1q2wxsoa24epnfevzn2m50iubbybo33ej09dlauw3h9c3vla6jcvmer7olvexxg1lg53',
                surname: 'o72wzf7j3wptoo9jp9o3yigev4mft8ehl0gybwfr1x15x7xa8ojb6rk3a1gq1fyl2zybqg46a6axv9nqm5ibthvj5tlm4yded5773amo13u1usz0cfzkihsk5shm6zk61pmh7i9jae9ysvmmhjd7k5k1o4e7ip7f2ouly4hpbfackwbq318ibmtr98pwzqqvr7o94pbxyp1fyw58ysoarq1ub2kn8xx9ysey7njbxqeey2dmljym7j7toeecuah',
                avatar: 'bs1n0os9c93dgbyipovqeb5jviw1ssaelmvdnd67ould5b4u2j4oqmktt0dh11dq6o8x0gub90b8ofjlbuhoaa067yo6nu792sju8fwt3ycctyim8hvgjihpzlf94nfe9gvmh717ezmwgzvi7crom6sjvozccwxk27nbpgltlo3ix2ivqlj3ar5y5twrnem82g7qz9hjlzd6il18k33cq6cyxw5xgnkm0ln1g7fpmt74bbjk2kz42p37sxffvzy',
                mobile: 'ws21sc1s5k6h2sj4brcfkudp1kmzyps0tpr1aqh4sqh4kzl69chyiihj93nq',
                langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                username: 'li5xcchvms0lub1u66csfyza940uxa05rshui0bc8wrskhp1izwzcuxapbgmcvqearid1aocsycapq6afqlqpb4y2s6m169h2t7s5u5uvj21gs0cb376jup6',
                password: 'f7aej8h8uxb7c9c1dlvjdfp824xvwe7aemdlxewgq7qd9c759sf0glsf29dll2ysmg6itbjyui8f9s104qtdsf2tfljx21pyffi1a3dymevv6qt9g6rjgevp9v161p3xpqcsg7tilrtjn07nttgy73r9lm96cotri5fo0fce9zz2yhc5elm0vwrsaxbpbu4wdum47fuux25e4ptr1xse3vcnbrm6t6cmev2gkfjk5n4wpf9115a51uoh45zei31',
                rememberToken: 't787kdrro2d5e2usaoczuwxr2uy4gs5z6vvxfsodj7gz91w5vm5me4pgnasvpnookiyeeau14thvyo2yccp5geycc36oazzpmi2pb2r5ariw9gwn9j23fvhb7kdxxlxwipnpdojux72mbz673jho4nhyip3gxwueyp8l92fff5br6d3kxp08uwjpip1xgmzhust9fucg17qjxcr6uo69p99zp5xm1ufos2akzxd2p0ruropprs0nirog17joqff',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0f73aa68-0743-4b38-8e36-c0cdfc56ca95'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/346709cf-6f28-42bb-b071-8d1cbac674c7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/0f73aa68-0743-4b38-8e36-c0cdfc56ca95')
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
                        id: 'a852335d-bf3c-4849-aba5-7702c555e66f',
                        accountId: '42576972-4495-4215-b963-a73724f90e5e',
                        name: 'heq7ue25u01n9fyyfsnamd7izq5lff5h77nf1j8otzb6wc5flsgrt0smg30knhsvy1xsnzwpmpk45vud6dh51f1x0tywr9q3m3du62kumgbheufvqs1tfcuj07taaans8q48dup71za4n1g4chtcrzad9nn0bv8rxzqym0d4aherrcbhnn4x6rxpne93uo7m94w11pnvjod3j7e41cnistaj9catm090kpkcqiyfscfmm5a9j3plubhtns9mh6m',
                        surname: 'l35kasm7j2qhs10783vu615uow0jodqrct41qj716h9idw3k0axdzbtdb9jlpnmzf8r0dv9j67pvyjf34239c0le91yo5hgen8qmadf2m54hh3w1rlyder2yzmqpnpun7n9sm5m5auog27i0c3ds183i4g8fi833a3crscwkc8sf8inkb5qztujku7z27020pjudo1zrlwonpb9y1og5wy9lomexn55zz2ucxe0v013m4dz3jwgegfk7i5earye',
                        avatar: '4r9aq5iplxs4hxtgyil6rt4xvm448u5w6sdd2mvb4y62wn0pmz5av16kd0fzf6gcmrjtl84qznix7vuhg7bbg6tx2j3ra14nxno0p1iblnvw43sjn3t1zpqffapxwrqzrwufftqolvs6z3ncc5q1nkf92iks5mi1qs4ogwj71mjlv6ymf33axyhvdq3vv3ij8xsxacl1x3wuuarvitfc9o99gm6rre3skhhawj8l39nzhm5oc604cx05qqma0fe',
                        mobile: 't9gq6giyu3ovsj9ne5km684iodizer34y3uavxkvzw23jvm56lf4k5vna6mj',
                        langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                        username: '5epsqdrt9g2bwomudakiibx80i3tpiw5l3llsoxcul6witd7kc6v29nzwfonp6tx71idda969qyxrepz40dwnwkmu6ezu4fcssybcb9qjypbl3nmuvwkw51x',
                        password: 'gjqi08fr3nkk8erbx35bb2beniyu9a05y4llhtyp295b5hlofhi6dxcgx6z5qj1ckreg2y9um8pzcer77imy20a884wfsi8g899biiw3yuqcftyvcgf81seee2m7u7vxywh6dzcogvhymdsjzg49cm3wqq1klwd4pebtgcf2mu3azyb8v7g6n7ja7gjxdt91pi0l6cuaen2r6f5phurgvoyacqmt81jg36ws7hxzqaggbo7yx9wj3kgxzq6ariq',
                        rememberToken: 'wj8twtw8jmhli0nonjdw3twz6jkz6h27sumtne0uet1jma6wv6tutrhtkrqpgeoe6vii2f52o6vzp7idqbkkbbl0no4c4wam37slay9sukgrlpiy9uzmh5h36lgi111lqpubx983zsaqo5ofz45o7j1e1ita7lgg1v812fcjnn3jqa9h7ghfqzor30bcz9c19ymuhdqujzmfmutw3fxuwo74n3axywqpujokp2s2kcmer5sg94587n2rh4qklek',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', 'a852335d-bf3c-4849-aba5-7702c555e66f');
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
                            id: 'ea471d0d-0ff1-4676-a974-f34fb04b2fcb'
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
                            id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('0f73aa68-0743-4b38-8e36-c0cdfc56ca95');
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
                    id: 'a7d9580e-88e4-4d8c-80d8-6bbc61f335af'
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
                    id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('0f73aa68-0743-4b38-8e36-c0cdfc56ca95');
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
                        
                        id: 'b55f68c2-421e-4dfc-8a06-cf3945801518',
                        accountId: 'e7ce21e0-ee2c-4d77-9422-a660ecbdddf7',
                        name: 'lk6vhbyrp25a4cfiuz41ixvhwahkxdltre27lfamqbbo5t220mxjya3ngug2ypziwx4v6q2jche16tk025qyp09qgcepke93lnfztt3yrawreb24ygc9t4ts7tjlhnz7unul3v2n8nq1j85jfbi4nsnmlg0xgku9iseg1yysqrcjg5rgtc6kkq239s23ufvra1kl3ofjc20je1rhfqc9i10yfzob624569l6mwjyhhqvm9wb0qswrv245btz9mr',
                        surname: 'v1wr1dfr0tpo6fhf3nswesh2ldgpy1mb9oo842ysuyltkh6cfbaev4wy9dlt3hxfifdld9dtmtfr3gcyrnzqbdjqloi55112vyh04pkr6uswnrt3xn7bjj9fj3vei7l0dl7f54avrtzia3uyp1qmpoiu4xa0wtx693lnzuom2jp0f7ckim6kelh53x3gkoqbxcehjcvlvt3gru4uut6qya2wgh9phm3q76sawnagecnex1bve65ijx7ovacal5y',
                        avatar: 'lg6s0ha9mt667fh55om02ma355phbr8vv6unofgmw6w5303lekz343l0sogi5jbeu7nxpw37sbk59g7ypv0f1ewyg06eci3f3pqtupvtrdinp5pei5nmi9s7u69ct3hgsvxy3vpxabre8hfcqoo6mkm6kx4bfu88qye6d0o3masl39x1zcoeczf23v7s71k7pdj1r5g73ckzhp8tug7l7pctmmoiab6e87w1tok7nqywrt03g7ems5z84ntupba',
                        mobile: 'm835rzzlbw4ljmybam4e6k1y91uhjb4wsnge9ondojyuuncodt36f4a9vc6d',
                        langId: 'efdcc725-0515-4b96-96e8-bef236a5cf77',
                        username: 'wlghg6q1duwuqie8e79egg9sxf9rexqbyhm122oybss6m9oxtods44b090mngkem7xp7g1t1u22pw43mbjql8s9iygul4l1bnc70dyglu0funlrdadve2i6v',
                        password: 'lrcr1isgeqeivq0f68xkdotkethbulqc2x4ilsegcxi72bd2bgnxx7l8uqc40i1da6n2pua7app2omv5bkby8d65eexs3jc16pig8uj4lugwcxsrnr1n31zdijlhu7od8asse9j6gpvut2u3rfx74oh1rrrcvlf91v1ydzr9vykz3eyzay72odii5cwul43tuupcog6tncat3xabs640t7j8pq9s8j8jtvzaxaqwm724yldlhxnyb0bivqy7s6t',
                        rememberToken: 'lp35qwylewsu8laxij75eb2ugzf6vc822q4k373oxti4y9zssaqdvvev82nf0wmg23lx3lftkyg5heceajxi0u8kse9udgezll5h7mm41qzy3wkps6o5jouujqm0v74uumsh690pc9qtb1z66fbix0fqfoqy4o8nwx1d6nsik4fkja8xhre0e7oiczv5ifdj286u1r4iln5lim7hctjcxjaprtc1symjkh6d05kp6wpla101e9zbfxe5an00hfd',
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
                        
                        id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95',
                        accountId: '42576972-4495-4215-b963-a73724f90e5e',
                        name: 'muc20nzjilvmm23qtftru0fes6yl34f67801hsyfgh9sk4j4dqds2g8k08uf4pp7bnxjl0budlphsd8dej06whe8m01r25ejibb65tzhbrr40t5cm7wxcvhjw7e9sifldw5qxq1syv8l4anmeufn43idi396vq7qajnwiw123e0iaytti3lnigy6hp8ro9b3pr67887s8rhuwm992bx0wd7v9hpm9nzk3oauybotf6k18onix4ydhmtiwxkqmtn',
                        surname: '6qr6ewiyib2ljtz4mzwgirfmajmpqrajpxdb29szs9qic5gsjhsz1ie0fuei8g34dyuiye9byxv40x0rkvhl5mpnmflyjjbozrou8qjtv0u8tbbvwax06ydouk8vzb41ps1bsnxjcgrlfnet9m9vmz1divrtigg8oxhvzls42ozgeth1smcbra97m2laj51jzug0r8ypqmqba41os5t4lnzjbm1r6pqhdihl4b5f9p63xtu6sogcg2y1jdj6f00',
                        avatar: 'jvzw3l6u4cvx19g08xx8a56b43drqad2z8jm932dclqqblps22xewmgy13o2kdg01tzj6a5vsbswb5033wj7l7drsk4ctgz1z2eakrbztfz0uej8o0bbe0vojoxnmojscn3fzsnjodeqp2neeakzistidnhdkpqcxlrlzalam600l1ln8mwpdelagqostg7p6mmvh80nsfuwpv5g4ya7nrba3ndjt1sob29m8mg61otdtue6boqbwrwpl63hlsi',
                        mobile: '6maeg4p0rcpi8zf9g1t323cutmm9omstwu6ywlv0o2oimhzyf6w56f3dkh8u',
                        langId: '54aa916c-631b-47e9-b48a-daae188cabf5',
                        username: '7766s9fzrxludqap19yyvfqxilkmk75urge87ixwv848f9kp8662q6bfr6d5fzrq6a2itv7yy9trl2h0n9odgiwmnnu95ndmn8v2fp1p2a6ywkwjhal0etlz',
                        password: 'oqmc7toaw3z6hyq59l5pp75d6spria1mmzgs97vu3lwb5f49nxcqz6sq92jud3d30zrdmgcmakykf1tqd8ljdldmjuo1tbyxet3w6u6tunq9lssst62pz0r1sjp486000c4ujo1t8iqczs2m8ad55m1l7k08clm0h5ltgwyw8xh5s0goz6pxzrd2h0a04s8mdf548ktpla224356aqx2zmqeij1e9bu3fqwaw5m8i3fp02v6f8px1wg1mjmastx',
                        rememberToken: 'qklhz86tskynb86z19h7jyjxpuxwp01pwvgkbp799skrnj2fesjnf6mkngb111vtje4hwezafkztpzok75hm4xt00vtmwmyza02c1zj4fmo7axryqku834tpchhq77ow36v5y6cq87tsnv1k3k3kycbkj95qr1ay4uo1b959mkidli8zdoe5k5u045shvuuw61q23hlm3ki50el188yd4yfle5s0lts7vnw5oej1alcv29puz8jfi48ig0vsqje',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('0f73aa68-0743-4b38-8e36-c0cdfc56ca95');
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
                    id: '9dd6225f-c613-49c2-a51e-83670953d00c'
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
                    id: '0f73aa68-0743-4b38-8e36-c0cdfc56ca95'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('0f73aa68-0743-4b38-8e36-c0cdfc56ca95');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});