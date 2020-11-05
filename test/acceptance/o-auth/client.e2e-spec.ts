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
                grantType: 'PASSWORD',
                name: '7c3qdgnijbq7fnbqvo6lyr6krxmiol5hvl2bo26pari6w26kpkn2b0cuf9tismmgyek1v5wdkd4pjiy3zxicc3joxq8cznx7c76vl9848g2xcwkasdn241ksbqwy501dqg3vzl2rejx6a7v4aa2y3s1jlur883dm0t3664qspz0z46liftf0gse4gkgd1wogx1uyirgcte6tmslyxasjdq1gdghy8n49bhktoj9jxxhpjaks6r0mx3kfi7csau1',
                secret: 'grck5u8qiiqe5jrdzbnnird9zytl4ql5pzppmny5pdwoczgyo0xz6918jv9v726oqrynj0sjn2biynkeb2civp783q',
                authUrl: 'b56x31ox9mgv5aaayxzntkbu4t446jgwmuk680onc5p3m9faq5759fr6nhvwzlzrv26wl6s1v3v0nahwq3wv83q7uf57v30qz8nz74auz5wzezym0kvyr7yzjwou527g4eurhcox4wvfjiyqi51sak64kw4dyeqaz3p4mh4duky2i3dgvv1i38mrass5a14nnpnfmyhn9wxdy6uydomnvkjar6cp0nsj9gcgvpisinaj8r2blrz8dd66or2bicuqnenbep9lbyawidoz6s7k1hwexh9an6p5nn4cne02czbv1qy9xuz7jbt6u788fjdyg5dl4i3n3avyfiq4vgr9p4l3eml150bgmyyvnociogbluke98yr0q4kue7zows02w1lxgltaukx1m3k0rkhm1o0o390o55m5scsdct9gt933fd3x38mw66lfl00gqq16hmswf202f4gyuyd5vrre3jghqncawk1ws8m0nlqyq17jgjuwy5gcgaorr55jna6nqcupkkf9wq7p2n011pzxoco39k2yb696vbarftx3tq6oxp5y7bo6dszd0la101ymauvq7niicvzaioaqzti27gbbyc5v29pky2p05ewc3ctcxvqd8vyfydnwullnq3w457t86nv5vtte2pcy0lbra86sp0s7rsmkjl1sggor84z6dr0c2k2q81huv68336gqcbfnd8nzcmfs19lhyi2l45gdc5ueas7zm8e3pzbkpqytijphetjfg82vj5x3woccbwc5h54697ttejyvk7bt8gvca8a07pet5ej6jlooqv8c1uv2w3mjo4ske248c00fj8bpfptp8xniuyjzfh2mk8q3oucq5c2855pp3xip7yyd08yb5zxj9obfb9oirsgvikb08fmyatsdov568tfgxwrri7fckyukdqhc0er4covhjh370xoy9ejkdyv5t7aidnqpkxcy9x1ymojj7rdd8d9awz3l8413odkf3cjinx6mc4pw1e8n8ld5q3pjo3qsbzr254b88afj4onlq22ntd6c4tnoupmy4v34inxnytzsbmsplhi6rihvvdd51jy33gpsooji79b9pfjhs25ohpz7faaci5ixwww986s6c04hj8bieowaqlumkkribz2qu5jm41fa800jznd05rgeeor2pz1t4phzkv0fkwlh5xkkstn3savtmfk3y98j6rlzf634cgxj3u83qdinseyljx4yi3y17e2twbqj12huwr5754uk0d18elzwzq4twvtrrm0m2krm5i0ib7f0per5k55ch2kjrwrs9j54nag8q4jr0pvcjsx0v1heo6bei6oqgi1lhflhi468n3clkkwqcpwz2zlnt70m9qnzht0lv8i6kfkenqlogvlh6934uauzhsni2sdgx4hv1b93c2kl41deq9h22zif94yb3ybgw2vl2afc82uor40vdr68gm9harts9kpqwpbhekkvidb7h2pbaj769h2tqk0csfuxcno2qcm56h8l4p7v504jkipawkuxpjh4gd5gb0stly34y9sdhdjvx71xn60icq23hf0bdl2qcplsk05wowcczf0901xvs93weaou98jidwtila3yzwjf02t87jnteb84pggz730tidqr5m7b1bmg4n1dz1bjayt141fdadcj4fa6bm2ahmy26www4vc09rswbji7z035dbnkudtjhfmertshs1qu3cuz04q7as0bdwvbkh25n0x9v7htw4a80vvrmmk9i8k3bq0szeljie6e0aqqbrjriqs75f3jcxcx5fu5rtr5udxf80d0q4ia8nw55ygpv31dccbshyqn7rx5zq28xx3zaic40n4861x68zrjd2dqrhlqrcnllmyj5ya6ae9g7cdxtg91l8dueobemj4wijikf8f00jox99i050rxcx95m2tnel3uax26eqw1nyn67pk5a1k8sof1k4uvxjte1f4bj9cd0zb9smceguqu3ig7pnwaemdhb54yyvxd25uzugzgmz6hjszakxgsr5r1',
                redirect: 'jrhzapv6t17petke0jbg9i808joglvvcho20cwcu83pm85e48iuyz5u5brn2ueczwq6rdhjmgxk2d6wsw0bz9sa5t3h9d3dsopz7hb9d42vad9gcjesdqfw22oawtl170v7k8bs60ex10eenuzbcswtj4f168mrk7nm8qlxt7yiujrnbfreojl8tuk3cn2dsnhzt5pfugjkl3f7tku06jlm8axzp07651xfcv1asn0320ip76sxgrenjd4rm4nqa1ejq0louet48v9wme80c3f1dcoads3qd542j9ox08q68t9z9cumt8j5pqwo6xtiwhp19fdhajfjfgkyguc3trpsycojxzvu6ha70bb2w561ui6wmvmohwvz535s78g9cs3o4za29eevojie76feknfeewj77ud9m53056uovuuycgbt04o9m9g8yckdfdylwupj9295nl50f2gmysbvmln321r47hokxoorwhee1eeolfxj6ox0ice41taas25a59h7nshd7x2c3btnymxplukitdmi6kt9u3e6fxlocnwznrez3w9songqaxqgj7stv7mbyg6uv1snvfa2dfc72y13zpd8fm1kmyqi3x28qcbprgqawrernj4gbjwxzp144imicvykwym5ibr8dnwksfe0bmpb1emk9nfbr4ocfln0althac0zrrfpqo88n26axd2m7jutmnzqyz1nxsemy4irgkvvg88cshszysnayplip5kzlrocztruef7y0dwdtvjrphtamxuw5k9to76h6p9srvb3r6d27lep7j1q9ifu199w90uqyotz93v1twk5nemtmshkwaurbgpz56vzzwb8f5f1b2n33wsc8k9y9bj6qt6mb3f7mk4n8mv8y0soo59eikaz13ob0y16gcfch8obcinedrgm4hxkrfaifgyhnaazx4g4x1exc0rx32p1hx86rt7ho2zbblut7zisvzru9zfxqt6w6wf3x07swop3zg7u2tpsqutgfabjggepi7egspz0m2a76z6wmjksa32qg6wh9nbkhcuch7o91pmesybp0o3jx3s9h0cuywlvxtwlsrr4m9hzf17gtzxjeyjgs8oplk1appl16zu8ewy8b11rv1h2h2ghpfxbjn6ju5jgrv9ibqjnndlvvumc3plfqhyc1gtggskpuqq0xewt2vz2cqxci5ypxkeuwcn9y9eq3ae5cguw6gsphk3k5b8l0qyp2gkr9pxkggn9n7j1g9iui26dd9cc6gscldh41nva0eumumlynpkwnbsdrkkp4fg7xth6kygh24j4opjujgnj1gpymz48w2lr817w6okz5scdwj9d9g2ch65roclptce3yfqn12z483ntzaujmn2jiwtme72xxf7tgdf1oa6oahajgqj7kfgqremtbha8hs14t4s1520crehyjy7setq362wff8t8krw4g6ie9t2nackcphk8t7f1rs9tvh6eywol56j26mzrxtp2coqktxqop7r14n0h9swznlh415tjc8ssskxn3tkhruat6t47036nxcw1dhscgnoz3v5rhk1ekx9s2bzk3j0639ufk4vdfgvyu1i70qxhtpcsnseedbn86h05hvb8ieymv81k8pkrn8d4qzkcoopinozzmnl29ug3vy9w02ndy24p9siyxe00g785d18er9vbpk9on3kefha4vmp6vltswy9lad5rdk9iunf9qny35m7o98x1u79wyrx3fpxoc8ht489bsmfk8x7j8d2vsnkegr676iev6fkma3nit97toekx3anmof87aj75uun6mz264j7hapkwc6rjzhykngxlx6h5grkqvbuk4iln1t1fap20ximhqh0cyc8syrcywjscznfjeifnzt35qa5u1roetmkxl3f33wkxzrzbj5yqfm5rr0v75z9acogpoq1dysgryfo6oxr3d1enbpw821l95erapgrhcfaxkvnam3ezvmiu5f1gzymdo4vgtsa8dkumymtuac2d648pxw5hy2q7ywo96',
                expiredAccessToken: 5379411624,
                expiredRefreshToken: 1417088102,
                isActive: false,
                isMaster: true,
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
                
                grantType: 'CLIENT_CREDENTIALS',
                name: 'fooovbqtethzr0nxfxp4belagqp9bczjymih0xx2pokxo0wcb4x0ntwo8kq7h4l86bbyyix10w5rx7r80m9xmkqo8nqml4ngpt18tqs82q3h2i4oo0tg8iajoym3gksnsjq5uj07vlydsx4obiiwa3y1gss4p20wxn66casevaevyizj0sgc1yth95nwlm3u3l5ikva0stykh3z031onec4byxxayv9uz0s1knu0ft5qjlb7498cky2fm9qhzu9',
                secret: '01m76jynpc86drei1p8mtpmz1ei6s2y4wssm7qstqzr0ird3cnpclyga0zzol8lmlq176ct8m9nr7pfcogoj9y7t77',
                authUrl: 'ubx50nauw0kfjula1o13hgpn4gnmd3jy3not45v13vcboqy9ky6v4pijab7gnjcnrh6esahxkb573hdcjkstsjzfmlecm417avc6lspdtefkoq53vn33mdxpomnjnhppwi0a4cnfrma1jcxchbwg1vvs542sc946ozqdcdpl70wpg79i15qtmi0tawgx1wddzm4o7djj9hcdp2dkt0j22axydsspztnlryoe0viyj9j2vsf2yvsm3u348vazs6n89n2hxl73dbh93slwpofer3wlxwjwc2nk96id2xh77ox41611c1upxnqay68uma6ahvz4lp8vrbx2t7oanzrs7bltftl8eijqlijdtjhvwc08zmhaiamobrc5rtujhkztyu615u6ob1cb5pa724v0ypnqonan12b1nhzrly35luwrxx1vx5mblc1vojf5rh2b884839o5zf8gw7kzotfeftlxx9xspwge65p9b7m4ekez3wltgmbqe9p752en2vyblokizvwym7tddxr7oluyv4xdm9c1lenwuts66gvgitgd1cc96fu1x2xvqy6yqqrs2bgl1fkzl6g9ke8yzpmhppep3gyjkm4mm8pl98oy7yvlpqzriee13lc14zwdw3tzjx7z60yd1issvncsiolsfb0kyug004eyes2m1b0i4jeheqlyony29vs14pi1huh0162xmeeq3nd7rkr9eprvcjd5mmga55p17iv9kegn75m1mqyh0mc5rdy8fsk7xnx0cz9kmckt95eejuouc8ve5k7gtcp1vix4ns1mhobx6ht82peyfpqqy419wwbotazw06cnb3vcr9zdbdwziyildxnhr7vumah6gfdggwthj97gd31498cp4s011dimzku6p8rbp4wceg9649pr6ryk7hy6tbr5tfhzs38ol7liale857knnrtfedlset3qimyazm56ezix933me4ryszxheseuterg03g85xmpbneelfemuzqchy9miqjyhrdjuwv2cd9lbi43dm1b8b5q6zi2gy1c6ljosic94hp7uvenze7t4clf65nojlh6kkghwu3n8flw7qqdig5hhoiriea7adaprmy1oaogpdon50jqmit64wkfhpiblrxc2un6ylouapn6jw7w3kovftea5o3ebro1iaxbdjccgk3tocm7yt6lfbyr2zkam611d34oxpg0gp3cffd5aphhxpodu3zknwcjegmxcxn5h2dbr2gqmgsd2tu3fm4f0jpc6e1392sqlkd9sraawxqj31bx8k3zm6v0nfm1surauix1abm3xv4xjhhrmg120viu35eysjx2umndc4dmhpqqm2s2pg3nos5e59yee3yb9301l5o41iwl4sz0wm2ogh50uqhnge7s8e850zgmkrxli9zh0fg8i9hedq9airuult6fh9if5q6a7q5y7t0jogt5q14gk3482vy4jd7bdkqq009lcpimuq008115hzngub43686wivcys4sg6l3ynmgku0j2lwtabxvzg8jtl3vqbsutfdilb4occz4uu7bvoqqkvj2o4nfrro6cgxfv1m3i7q4dp6wyt0e9sgnikq0nz4sfuijf82k44gepeazndfue9iju859trfn4djnwo8asj8a4zcv7h0qs6axnrikd3wli2buc28pipu3h2tvlz4di9718ah3wagh5ixrqxh8xttmm7l379a8t7pvyjkf99iovnnp0yqrb0lywojomp2b4uxl4bfzxebcrzvgembicjm5hxyr7bta0ehgez5tochcpztrbarnsuhxioomybe4vuehexhbmlswgci9quyuezib7zb7ofnk4bmdbaxhwhn4e48x7wewo5tqcv9ytm3fvvjb4yjkcs6zdne1y07fh65kybmoqrp05b6khl0k1980gier5c1a4jjg849w0xdqbwhbgiywc7t8yhyxe567q7mct4ykr3c4zoxlgsns79xi0f6yfswa631ddykp24ht82mrtobzn35rsx8pesior971wzw2g',
                redirect: 'z0teu2qrsolyvaxu4cv9rvcybye6voykfiay6cl0qulkz4eipxhlqtllplx9pcn1qce9fhj3sgzyaohty4rtb3duko4vwj5jcy0zsjf5khwey50x303jhruq71g112akngqzileh9u314u4qyotn8xizk8wv9c6pv3mhrswiynesu5qzhrbgpouy45kzf2unqyuxqlco4cl7rmm7obk2gp4vndsi8ofglszkr5c1118f0f782b2uah3hylhwt5c1n4j9l5fvkyguv5fucth6hczo61p54vztznd1sz7ry56fs9pcz7umg2puvwj0mj6orjx1bffyf3f5w5j3q9b4zg3qm3cbywpezjmfn989occ8833plg2zgy857v2f8ns34lavi9sbj7kxm9n3ns59zy9wpq0kci4rbunmf8cm4ky9dv81i1dwzxw4ca6kbbr2www2if7i5itfr951huk0mawtgz8hdlb37e6i7fl3qehuivwwmt87zakwzd2it4091hdbtzes8z0e1upji7zp0e94nu50aavydiw2af1xxxg6tft5fd814rbzyra1vo3i0yu42mqyv7ebjuth5h4750vaggfaxv581t91ybx5f9u6q6cbzq39y322gat08dq8ap4x6r2n4eo0z6o30jqkh1dlgg0pjlyyvrrojgi48cprg31fe9kn9hr7639yxauaddhh54x6a04b2od30gl7o9f8fzf2pqrb32i777h633usmh92th3boim3si7wrqtyjej9fhroqlw2dc5edky60hsn7etgpwa99695md4u4osfg0ahkd14i1hmw1x8htjyps73n1toyv32k0r9ga6bam6t0o3xa62vec67wwgwk0ajbs0kkc2wv8sdgql9ut34xsjil3ksisucy1gqf62e9bh98ekdribtdm53e5agukozypt092lgfs7l9kvlxyseh954i682c8yj3wcwy9crecwjibcvuo74behcioty3wifscueud7dpco3ihap4t0y7vh2abtywueatjyzp4okprsqhrijq3uae82qf99oy86cp1879cbjgb1zjorsq53jj6t44v7h7jfo8fl4jqr0sw42w3vcdoekcyy02bjs7ipek3q7dxr78vasxvj3ggcau9kmu30tmtzfj34sqebscn2xvopnp934i6psocm0tgip1j9nxt190hxqetwch3ygmb6ifa3ydzuevwiavbk20fqyyriaic13du97o2kgqv1c2ugqd3e3wsf93v0i9zea4q3keza8bcsgj56ops0qhzj2l4nq2tfclrio89g0b01r7oaiyqb2y4s07ulqj4r91haqx7zn0cjrcggm7sayn3nvwrrbwclfrreezchh46gfkvw8qf364bw7f126264mna437buxnpywhonicfwr7fwxm4rjou4759fyj5j3ulovz29a1pgflhdvrt8kayb4vwy9qs1h0ro918djc7ildr1x2e1snh9qt9uoqkhoby855qwhg1zvmxcx5uiglr2hkn7owjid3el0q51gajmuglzhhsxvtq3t0estinuq5ikdcvbdrqz2nts8aupu035ugln06q1xmwrzht720h35c27ig3cbnms7yzpt15d28yth774jh1du2j17qrbefmvncz7rge38vo5rep4lc2ck738h46s6nzttuaz4um5vexkspynjwb736zsvyjnjxtz2peyo5vjjq0f0n324tva427ufv9bk5zojus375onbv5yz2sx1jot1n8gzbedgnb0836zcjgr48z98b7k6nyzxn4inw356xlesut7thehc4d8f5ll46q636hpuojq3ej3y3cst1kkds4sm43lgktqx93kk4j39tqblpj62a3casa14lkpo8hfj4ci3f2youfmyue2akrf8jbxco9ecvffn8rgklbe6xlrx3iby052xn03ergy1rub4xrhdat6qkfm0c1l73kcqr3a5dmndh7o7lcvm0xq8j28zszwclkl5pmbvlsfeqnzgae2jb3ekf6t9',
                expiredAccessToken: 7307433971,
                expiredRefreshToken: 1685253690,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: null,
                name: '9et3kwaum3gy8lt0s0te9efntw632d57aqjmpfi3i6tl5xycpwj1apmla4im7rofu9aokq4kj1r7jvr034clyha49bt72km5wab6u2xpsluhj9jc9vj0vrzrso9nhptlgh0i8jcs8p3t2lnp9js76lo1535kwr05r2dvn8db1i6et2rnwx0csnv9i6ll89vlenrprp8jhs4xyukvdymoakmav4g3z392ttht90j99yc15ri8ezufxfs72a81kx8',
                secret: 'iusshu76sou2hiltbxffmxtolyffg3lx9kngphalo9rtj14k7aeuj0v3gphv3y8y2oqyxptf2kugevyverlaw1b7wu',
                authUrl: 'treym7vasyml293ms9fp8xlqy9omxxzmnf2qnd953tor1e96fbp3ksipanpku5j5dt5nm4tvrg6ccuqdv3kx8e225acisbhkkeeofmzhox9e3b9wp6v03j97u5u7iqzra79fb4esc4rjey3nkq9lc0qu67jl0ljijuhs8imfarjrq9turmwiwq71frtfu4wpc82sk78ngauipedoioec09nqq5oh1ewp4s1m9ma6gas09gdp483szp34nxvxwc1sxivkjik8pwft4qh1ttkqhbzt7gz14pgkz8ad4qmqw3x6phhrth1b0cu7wt3qgnzy14jni4mikyyn66gktaa6d43r0mruvutgm1xo3p7z6hpm6afq6n3bqmst752mnakrxmor1zxjc8pdt49wcsdciru3t770e7cycaksf5v505u7l9oobil53ew0rv2hyuheny3gmqy2wy5g09zc81rw3kz0vnybwk6ijtzsr7katrknnspdrgh2ldseszis4vh4bqxjpdw3wsafqz1pgoynh0jcldm4ktdc8ltwde8bh4ay2sho7eyckks4tr13lfidezv09izzges5lqpexoi1wnlwzbf97u9o4g9scom7ruukjeqd69qe3vln2uy2vt2783mfcjy2cskokn91e961jfm4ygxcyx6lyxzd1xfaqtqch4kcf061x9nro8atm11556fd020gwc4imx4a8tfq2b41esoubg4legvczyu4jkno87ej947u7ty7gl0qyk9vz5wq0kt9x78g05ldscl2om0z6h8icwqtw46srquxi82oju7h3nu4ibqmg2f31bfmag8a2vg367p4ldiwm7su4r4xzhv978n5xqpw505trkpicg9qaeug7mklm1umf8vcqkzph9osk6yg90bmp5b5jzkfo8b7nk2auwe4wi6z2y872vqb6vx0qcgzueqwhtbni49oicxhykbimy8bvnvgorazhrt4dy8jn07bg0icc5nftela1iq2f8unia9ubyy39gf61bsqai2fb04fm1c651k2526a87msqdvbbm6dfj3v4e00b0f11ber2syoc7nm9488t87axdgjzrlzfgc9ri6qpy05k4eki274a1el0mxto4s3z589jclem8arndihj0lbnfddj7uiouq81ld67ozeun1850hrxfo81jbsdev9t5yg7y7c3yq35rjr7srom0x5rvndw7ndu0689d6kn8gt6jubcvh71gmt7pv3juqdozllja82jklqkn4tqgug7ul623o8fpu1y1aimxeokkgekch2g7zzv6k4mwuxv9um532e401p4e41qh4pw4ksvzp0o30pwqjasjx9sk58mz691y3ebcu3k6bvsm2zgtfp9i229qbls5gtjy0dew2ibjnici8eifn72307ipq5zr6e7c4xt3h5c9wufrgs69imebgfdy00ooen9htmfrna1bogqxq6i16ex8ra2m49sc6ocyjdimoildfmesbmfn1m8k2ogxkjbjkiku6kpgj9oqj6ahpqnjjzv8pf4nsb52tags0vc5jr45l6d94yavgl3civcc5qq3v2dast242ngq7a6bmrtrjq384bn4rk09an1y4law5bycu9t3qcfihcgjlf5c0jae1pdhrvxvr9bdlbnwbjs41bt0g49y0d7xt8swry22ev7d1g5o49qexibr6qs2eag9e9unjab66rqpulzjn3mngdeg7aggt2tq0mkpphfwqt7vmw1gmtufljn2gjur7axd7rnb0iltnbi0qdfh2451j3ng7apzf8zhixvoo0tgyfxjtss4dbd3w7lqvsoksua2ktzyqyyzibx628nuk5g7c12s4ee2ejd9xiagawp30orrb7d3h5qgzsgvd8thsnntdelbxid56wu5pgdxw1egj2oneuko78fhtz7w567y70de1c4pnlrq7h9ts40wislkrzykvgk38cq69nfi8a4jvsb3e92qjjg3i80u919nxm6gm2e2i0y5a67x1tcbbybt0p7dip2337',
                redirect: 'm2wueug0mwdj74lcyfbozl0laebavdk731pz1iqdsdmy74tuhmv935kb7is1wbx95bsb3na5zdqp718bixeau0gd8anx8nyx9jonncvf97wxthrxlghvqzvytyq8atuk2i9cp1pgoa551s2t2xnlqck3g9pdeb37h2yh06rv2e9town7kg2hy4hf8o5qijxdj5sbh0wdw6bchbj9iy5i1auifgagexpvux6y0pg9f7dj9oc5lecyhnnuc8lwmvw3qu1i74o98z8rsi4c4f5k6u2piccx1y29hvx6ycsm78ep7x802ik6objwd12351b2n66nvsrfj1upq1ljae4ykx9o6tfqux9l8bd0j9fqngu101abkynm810cwl991ja9ysa5lmpe7emo5gomumrsgdwyp2q8olx131zh7oxnf3lx6cipna8bcfk85y5gyipnjotzvp69rf0334ruqbbnazbdyowmpayrr3osr3rejbj54aczgh2vkxso86cvfhxvz5w1yvb46scxpkpumm5v8tdnt5x6c7v7l9vc6k3v4gkc35fryjmuphup2cjee5vx0swod3dxf0yiyroecj649mcja5trpxhrmntuwjcotn8gyqh0x17g7hchmmektymra8hsmewzbzntjmbcm0tm8g1bd3mfv9szzfo7pn021imuxliz1z95ldrtmug42hrco1ey93rtz6tczxo4pneoknotjgd0tx0h7rn2542frtmntnnidfu1shuqpc5wg4fkfp46dzjtb1fq2rnos57zbzfa1bwp69ksx237blxmywvj8hx07zir60dpo7tevn05c5r74rhbephzask81berb9oa3eboc820yl5tailr2qlzfkdvc8nd9rcng8x4pcu6x4a87shcu6jzzhsdzirhjzh5xy83t3bwi6eofvaegn3pekb176ptwt47yfeolkb8ibe3hn5cd2zi5kpk9bruuwk224l26xim2fnv0t2p1ow3g42vyfl45fp5e8eun2w2gi9sw5ufu8wi0qbr98uuntu87dxevbxtkgvgh7d4nr4ofgz97kwe8hcrcoghhtgbo7q954l4teefk4j6d7uoen7ce4x6uyfoajpf6t9sfqkzo8w3c1o2yozles60owes1luf76rqz49t5ozxy3i0l2yo71k0xi3ig2nzedr6kiy7b2a3kz33h1troho9xftwbxaq2otjyk2mkmnqk4sgms4szaatt4ouhl76s59p7z3ch3feysl40hp5qn9jk2gktg7jsm1qko4ootx0hxo8onfspo0g56oae9oxx5j13e58sn1v7hfe4yvfdnpf16ck6jj5rv8wckyiakeuuqab2dt89r4ztj1rgpoj6mzx0p0osb64n3lt7flg9gf7tx1784s30xnn8f14oy96tqmwt1zomtiak1sytd9n3aat7r7ytwix5t2jho1rbu9hjvhvd50y44k3y3nv7purdz5m796znftyftzrmo2jhjml3v68vf6fve12bscxi7vv5cqh3a7gkogb6t5zivpg9gg4029n16ov8s8vw8mssrw3frnuqyr4r7wltv0oao9kxmfmd1tgez4xs6a7sb3fgnskwlp8wgcd873erkv0y87mik0shukyxmdoxiggj0uonyasuctep832jgdvonceeoyp2u70j2ty33fojolthsjy0yaxfkykwns3gwmvy3rw5v5fmga62letq7kpfjduw5c3b5znx4uu9jxccjos6fxwvlg4z4iyd6gd68fs8grzufnfsejs130kzwfa665c4qn8u3j4cp4ea4eb4j3unf9frt43vprvwxg70eus4dc195n4akzfqxfbv8sa9r4ohiie82q42mll55o9iz17kmuoixg05ygaw6egukzz4rax2le59le36um6ard9gxzyjlfb56dzabfhvkqqnt915ad0ahtw7pmg42auq1l1w8762lp7wj2ob6zvu5iscfi02743spodtuat81txzvbjpcr3s1lnvn6uerp9scc953bh5z53',
                expiredAccessToken: 7341368760,
                expiredRefreshToken: 8958941631,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                
                name: 'x3to76c09qqasy4gy25g2c4m6y4lpbelwq7mjlp1iws6o7xhfmc66f5ro4taohfkeaa8qr0uzwrsvqw4gadzew0d5c4f56f9mnjzzkrljwgxa7zvf5ieb8vkfbq3ewjzozbqtdai3onbysjq2jcr3uy2nkonpq7jjz2h04riyio7zb70hc9ss5kwfa7h9h079hn96a7btsg380je339p9075osf29k2urcipogja57z1fep7jjf4ihs5bshi3rv',
                secret: 'beal3eq4dl71uf1ka14zvm2k3j4f06w51pa0g6bxnj0lsw808k9j4ytd9vfd659fbihecabbj8xoakkhoq0xupqdgr',
                authUrl: 'zsxllsup3uibbq3mqcyb7q9kml5qztxblwntrpgyl1dacdxopqcriyyql5gseglrwafxth1hvvjmqueaqlcgpcu211cqifzf9yw89zlhml3gij4y7b4e0gn7p5u5nz0ep0i62dk56g02255oogdkk87yn5c3lhqwyfuhqvy0kssw14pa6pu617k8ybvp9odh1mkyamdei9n6lixbutab4ye3prq9hrs3ym6nsivw2aovwwx5nww3tqshbi1x6sy3tagk80rt2wueh1tkcrlvc3vxx6nqjhbzxri54aaie7q7xebolpqhajgp600srb9y5rpmcyvt438p9yryelfko0jftdf7dgm6aranfqupw9mt76ccrhlj32jk8a6f89lab7s6lwv6ahife894mjcijvk563r8u3jnw4bo5359elw28v72fduawzjec3cd7wzxplluogb4l9ewp41ic55ux97pj5dgl1j38haxwc68vn69o3ine58z78eqb8svxeifz7ecdx7kclhnf22vt2o03e3zvf7ndh4b32gsetjsbebfr753i6txbencij7t57fd9kef9k6yj9a3ns04pdal0xe1ixsixgdmxpugiepvdvz80dnhesqcz9a4nb9algid40q8suw5hod2zzc57wg9bvmp4p6pddpb4povpx3hd22dgztkxcgxy5bzgc50imesq1wgh967vwuvfiimauczlyzp4qs5rfg1xauxg3nb22bvzho75br4kg0aox14lik7g2nk02og49zoet3emxce935vtocj2uxynh41wpc1ftrwy31ikpmvfps27li8fctgp7d0xftyshhqpiojbwiuw5xvz0ogzx2hp5fr4267wi0q7zwl9owvb1a1h1jul11i6e3po6yors13mwd9amcj6plmsqp7tjjzthbyemqcfuig8soplp9x9qydh2g6feyh0hzmahwt5ossqppbu68q2eqc9avjse85le8qi24srwhkt4042rheg2031ye2hkf55dmc4yg0akqmpta4xxrit0jfo3l5rrzmqq969sdsmluachmsel42s5p7bshv8ize6ja6w4vf3bzs81833btom6yjccwwx6kha4al7k1d990eut0obnl2b8zg61h4vf9hg14lexn35u7zfpqge4qj1ri06n5050l17rongaq0dqcsizf1i3ew531g7q7ipbd6zaq3hf65j6uov7uo3kqrt4yqnm8ytfkvky95jqqazt43x7641c98hxmumaeq3lzh5tocnq02ftb1crf2u6b7bq3wrltyurj90ac5aup5tfeotvjaohvafyi9unv0p348ocip6qnwcak98qm42os9kybuko07bctuvx6c5smovsw4b4curtqylhihjgmgrhoyvb5bwmq3tiiag5ehbz53bol9w249m7u7mn24rdss9q7amgxoi8ga8rb3d6wz92u4q4nywcbwncgdna5goc4plvlz1tr19d7ql6sxh491kqnchfm3lrf2r66f758r537shmtddxuhojb0yjud8omvizltle0y4o3j5tgivfp0a4kzobpw18jnf7t3ilu59tm8o0oy8h58r6ezge9tmt8r42omjto4sy41n8fnj06dcf2yib251uta1w28rtv3mutv1dkfllo3pztixdru9bi33p36lbox1839pqje0pc9if0g6cplvowy3b0w1yqwq4w6654cpywoyn8yllqvad45qusf7z01tglqidnduefc20bo7pablbet54lxbs0dx7we42cojyfr0hrxfs42ytf5env2vw7fmno1bvzp0he5f73l0cqpf9woi47yyigwwl0yhykajmw7rz9ptdt60msgt6736b5rp431mnsmublrfjbyci4tlvy3nsctdj7996ijwh2kwlovxypmcnt3l26n8wzoyns4ajadt0rsuj3ceg04igc2npoj7i2mpzi7y2buf24ih5igh8x3fnnnf571yhddsxtwvg1khcc6wephkgi79ge9m3u0xkrkqhgx5v5v',
                redirect: '9jnov2s1vtyv6npl63pqa3bzbgevkgdrmt6aogvymt1jfo8tf2waeqbv5td8j44on15b7b1lpi1okk8c8d7c02mof0vnnci4k405dssjxjkhnra07j0rp4bzy2y2518a3b0zy5a13tda800hhhic9yk12jmorf14nh0wy8px0ou3id740aclqrxz4jv0z4k9m30augvtgn2hogma6d53l0mt1w9rbsq9yqdvgqf7wz4rr8kxc0b7mvpc8okge8nw67gcw3gru2g7zf2n54qik9zb1j5am2i4njxzvlh0e60ancujygxy43tmk3nck7dim7gsoiohheygz490hyoqagg2o4vlz99sbvdronlhza8zlrz8awo9gi8kyfnkaoqmfq1rcsj5eh9vjppvb2y0m8aq80ki9s1rfwb9gzll5gz3cma2ug5gcoxbw9b5vzna91xdzc4lzbj59wpeiqb6pzvbrdtq3kq4k2vlbjvvd56zc1ajyiclx49vyfwau0bo6bigrctq8hm3k29x477xvw3yf81bungqpqar4s1jh9cvvfvu7sf7sl5ioqa0ksdlq43ke4vhgz28vasdt84z4lr8j1sgg8u69kdcj7gsv2mmzj3clhz3o3lew854lhgtplmng4kgn6y3igrmxs2k3wjixqhynxpdh0xpzcnpkks1o7322yvmf2osxoawcaq4varmdlh2v932wsozog640ywq65u08ki2cvxl3ougoex59wtgd5dz28ok3uihuwgj7lcj1ucxym52o19jbl780pu3men32yf089b254snpihxi3hgk4tek6mmadwmnqbjmbzmskvk4mtuvp24s1tur8a42u6xrpezu9dhy01kjl3p9x9zyqjyu45kxve7p1f6mkdn5arx94ta5uqa4zqbpwunqxtsvsbd8gi7ud4w84lxrit5ni1retwhulyrnzq2wwjo0rz5hsvfiga0kjjyfplg33aey0jtby9whrkodek3tadcdh0gmhj7e8zhb2zid9oz98zwbs0glhg2c81j0bdu906vbvu2d7zytoh38yqkq34oidvwdlepc3j65s4v02lauq6xy6aox96uayrathxrp69y41p0ce8vaj99aeridcz5ydk3h3h3ggm40hfwphwjrbhxbjess6rpnfp5i4ltkvvabx0pb8b63i1gve8vs6jtj5q1yazp21h855xcdpt7upwu0bbtbxu25ugwvawuz26pkrmxboxnx2bbaf5nxbhhp6mz60tpfpo03dbs57b2u1j3xiohrv0h6p9mx8nl8ktmvv8qpw3ns538xzl5aj2uebg81zey8yom2clkfhciihh99ydqivg81u3oeeb8vq3of1b8jrwy354plr3ed23rc6r8w5nixb813tpus5x09cmgi5gwfib47zgr2zluhbkpkhn3zsuwv46rm813v0edwh1o0oahp0mg9bx0dlel0mnyuxbiih14lwweldiv94su72qasuz4hm84zf24sii239qr31jqfsg7nhnki0tgmnlk40khyh13ktdrv3g5t2uei8do87zy53773uherqi29o6whro5pkq6ki0yzoq8l1xwtfaqznkg0mvj11vz174a10dxavtv4hu9n2xx8mo1je4t86ctjaspvl22obkml18go5hvzryap526zm3yh1twbh26irzapbhwztrj0lbccv5soxs7pj56up6029o8uekqb7bnne2x8cslme162ghmpt6uyrxr8gho36mm6ccr8uxs1wmxmjwa3mxxn7150l763z0htmrvcu6se5wj6oj01be7bea4o3xhcztdx4a8rg0efuoq18s6i846cw7ya1ukbo0o0gims6z0bzairjfd0sp4kzoechayucun0kp46iilgmxv502ciu9mophgz21pz658fv0l0mdyj98d3zyg25xyli5mp84e3ynv6so4u0yoynywy5b4mvnjbizulbjps2p8qicx22ulwq44mofrc104yiqu68pmh5mbpo8f8ux5k4ddo7kmr6j4',
                expiredAccessToken: 1825217283,
                expiredRefreshToken: 8462583681,
                isActive: true,
                isMaster: false,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'PASSWORD',
                name: null,
                secret: 'dihl9lwjcub1sptwtjjky14n39l7csgdyxfxpam1jpj0jc4pgst6zlgr0jlw80fax89t0qyso5tznbfm0ha8j208zk',
                authUrl: '63d4n2whs502oa4n5npfe4s8vtnxi8kv0ufwpjfpfbw8i77jtm4vtpm07peflanapb1l9p3o3o7avuqkqjsri7zzydjnxipb5o7o2v5erx649ep4rzdfnhtymma1jmfv16aojgw5ae89p1h0exscd35hvhi8y7se96j0223lti6uisbfc6db71dudy51ojj3ph8xchsqv5eacyneab8dbnhq2hipuozu4dyzm7vho4i7m1uiimiy8s3b1f9c7jbzi9gbil9r5s3aby5qxb6h5zmzzh2q37wqte1ydpdrwltm933cwrc33q3fx1khgxmp9sneim9wwytz6ljufl29qgewzwihys1r73kecb51fs9z5umypmw4p7ugb4lm46sr4nbpkbkvo69wbjvmswqlejnpxolx381g10gzak0xe1aqvr60besp5yscyhistv43t9s4a11ha9ue4c10uy7rsv1rw1cpjk5a7ebhpe2ey495qj4cv6elt1f3cjqohqx4nwh78qn94wtclxqp19dc8dnxjv5sarv05iiv5jasbfwyf3driqcxzboo54ppqewtah6l35engq39ol926kq6xlndnfo0p4ar2ayikfayjb6eegbpmsvuc9kh5iy4g1rhrxup6i0ywmrw9xdc9tkse33aizedn5fvves8fg3v5zdg4ufr0fgfha5idh4qe5rolhdiucy6rdpvu6af5azw8io9gt5p6nltdenz1tegjvcm7oxb76tllezr8z6smg1fd3zak7gis3scc9ud6oy3q8hhbwlm78r2a4oo4hl8jxcsn0ctxtqckwpcn96dbfgw52wwgt715r8oe5465e2yvwrxa73xod7z52nuiyvbalrmb6142ugiss7qicjxmh0wg96ts0sqsrq5gwbkpq9bmib32l6t1jctnx715il418exhpsrcddmdfkg1uxis7a2mcbvw5ax11xbg8xltaqdo47ojac72uz3m7963zbcogsji9qeku9l1h33687v1dpnco953p1eagtm1acnfaimyfoduz7ypt2e5bucyrc3y0o5j38cg9dd4f0j0rbmxkxe3komo6vfxuoyzx5z027pz1kq8oubo1gb1lrrzxcbdtlt0vvmxjcldbzw90nxdpgedk8rk5h1yngbmdx09688acp6gtx66t32kex4mqc9h81jt1d63814rf95pvbw5sxeyp3daw3jbk3ew5hvyu42k6env54lpvq75r34nddikredgycjta6g42gpac9tt0tsehl2bqxr0sb9c0h4yuwexaruc5vmjojpaqdbx5ud09apn8tf3phtzlw2gna62j4d3myzm5sp9hh3r51m4bery1tzxim1jj3tpqsw4mguwz25o1m2klyw5435sbh5wwdey73hrujnergjg39cpnewcpx0ganswzfwx4r2nqif9vdi40potcr3xvvvkqem35kl6k4dtgvbomwbcj95kmf47vmwhr4dorg38rxi6oo38qmzwvrbh14dfy02ly6zurq9k94sk4zkoji15wc5tl9bpr2zvw7bbip52vlhbhkuhsp9cra32wwp906p7puoc50khnsutg02cqobvzcjxwg5lxj64c2asaqxc7oibfvc024bjt9nprcv12s35sika7s7zftqs1qo1t2s21rxb8d90rw4i2zboeu9dbiszw9eoglbak6ybs34e6vt0yu5k3cw1c80sqlq6fsh1c6gow5cyoab5suxv9mt6p1pew71u14bw8x3w9y35kcmn1edea0nq5rx0jjlnoygmw7ju5gvfzdi359sf3kqlfrddtwqpe0r3gpndik37yvk8wh7ygzvd080yqjhv9d2agn18p5sjfdbn8te5wo1hf80kye16msq1lqblgj9ucv8nax6ah0f0oj4mbxay4y1rabci3oaypjzqvzt82a9iushl0jf8ybztwws9nikvup1h3o8k2yw30yreg7butdp57q008q1pxvp9zap080ndry4v5d4gho7fuis97mnfmf1ouspyeap',
                redirect: 'yw5ljtax5p4uodf09f2h1zyx1vpyfjhqiegltmz6gj89rtm9vsnxblu9ixmm721u2xfp6qtoie81qf4v29iohdpq2ybw61b1d2sibialvvwk2ihivyfi34mh8ec3cnhndlcodh1enw4xbecnkym0miwfiq6p1io9ka43hckiwviyi01uahx988b6wtfwzd9ul4ucx9f0z7egmtlbxfg4ehofuic7uyvdewz8wgaxkzr3qhj90w5ytyaqdlivgq9w8mp686xe7st6tf560n6bpleentrrzdwu5jvwo9fryvbl7dvj8lj54cfag632u2di8mxd3bn8nu43rlxjljfjgfijieg9szzdmu9ern9k23ce0m8jfs3gnvcs9yik5jo6t2zitee9p0pto2gycy576bk1tbd8rcdzhx5xps0jfmdxkxpgsv7x4ibj6mlj8pjulcilp39op2r4vf6xthhh25cy65gk3koi0e5tmauri8f85j3qqvfkxzt0ijnv1qsmi310768t4pvscl51vu1nantrs5mzsv9i5329jw4lie4oudoga751vndx08a2xd8dwjb192deomokxqz14z40dch28n8boo64svq0te329lcg0fuu5v18ucq26cu0vlrkycoonpyi5rv333s4vcrsdq1qajmnjqhn04zhlcvs18crzgh4wazx53t545llthesdcew9j2ia7nv7uqrw9ty0mfqjrcjybu53mfsaxgrrnm08worhtazrw122s0cfcfwzecjd8k2c5w2eyv2nnch5kr7oha87zoh2oi1schbfp2ef81faach970v9a3smdiqedz1bhw7gvuygitrach58d24jep64p568fktlqmnzo4zbqly1fv6iagclbpk3dlbzl8rd46qo76fhcsl8j7v0zogu9wwzof8ez9d9qnti2ixvg2osiyfutoipnde3i3ck2j84byin8h2m7e6g0vfzmoz5zj5rl28igx0gvptteejzddhxyc4k2krwco3joooc32zarrbixtqp1ymdptqo5784s5bf3blqg00yatk96es7ruyx1se4xb5se2pmfbkmnjiinmqbpv20auq1usex7tv0gj8nu5zj82hk4cri1z21s22dnhj0v1zwszurtdkv433ccxhtjx8wqrpsr5roipo3mi8wpnididnuzzxs0b4nzml2gtw0wkmuj7hyulagchar83lc4e38qnnf2irz6pvun412oqxj6kgrbd7jp4mfgl6c6zp49c14pcg8c0n4vjf7gz8sxup5s1u68532mqjrd7104j07bsuvzp7234js7okh6elkkq5q9q25s3t7pm7q6kp72lmsgs3uex2kiaktzykzpgrvo8mpqgjq7fttkei8h6gr0fd9fqctieobh6qkc3jy945zslyyvbadrzrqbsb71maygx0ihjudyhqcd9eqetie9efsycgta4xlseqb15hvgphbp91vhg8ku8nq3ts9ytfalb7i27dp3paftbxrgd2x0kamrzqgnzor9rrvom9pouk8nmsq1yzyyim68i45bh10q1ju13vd2l70jc6bv6rxvzjsdn5ly1a53cbqmjkmhqyb19t4stc0xczeo9wsjhaavcx4cvtij6v0i5cd5mrjewdqq58w90hztbb60o7fvcd23uz9hd6yhc1cgb32ep04boxu82expd74r0y4dznte3elhgqxzm259d30ahdpsmhpn9yg2w1d32jy8pdin34i82zb72ahkdn7hzuhyd1fsiscs11x8cqx2zk0go1xunacikd1m98qwxt9iwgx3wydxm3wwucs01bjfdma0e7nm6nel1j4op84sisa7t7tla1ggqyc2xvbz449s0m1j0szjmhrzexvei1b6g8xezl9gei04b7dck8f03rrnnvxv2qbepscdbgmhqidckyuzyj2fjk65ykjxglp55l5vv05s5e8hz2p1bp5jxnelvumv55e8bhfbbvyz22q872q2r7qge2r5d1je4hwtrkvpniurkzwsq4r3ga',
                expiredAccessToken: 6492310881,
                expiredRefreshToken: 9667558753,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'PASSWORD',
                
                secret: '14foilr2dsj4vnkyyd6sulbchk8okiytav3xup1ga057m7ivpttxje5kidlmvzh3o2983houb6mgyqpcgvhak45qyv',
                authUrl: 'tz5y6vqtbbaw0wmoopnolcy4dq4u18klzvc4h8m0fjo5oacvfvtyyndliukby88idfkc0mmeh2r8lwkfugkcj9cc9g089m8ehm1p0ajnnaeoqeik6t3olz53tnhfhwkzmbbtoagx30r7e166uff4dt40o9tu79dtm5v7b9ybbmfoq4tt2luggtvk6xj77qd00s4a9nck7wn2f2bgmr93nc7cz5mjbj4yl636enw1idw5rrsqy0gcopnx2iyfum8patotsczjdh4re4esc1ve7tpnc8gbmktxgocudv3enicg0olp15i7uiwnin1jirvg4f7f4l7k7wdpu9siays6rtprpf5kvyase8rctp5ggnqw78qswyu3lm5v38hla3aljrj1wpxqjlbb5xnacyyr54kv89frh3sjo8nmbg39037v8knpnvi59rqk94xkd7l9ruzflxbbsxv4udfacxaewapky5967wd2im9qvgzsgs3g022867fw9pgfrwl4rfv2ufcyii3ny7am00dk1byg5mt7pijed95z7x1c8ma2jllzq2qbqx8r9gaftnuqxqragis6agme14u46mrq64081c3gf7d8xjanz8puuhovgv80m73v4o8vd3y5m9tglpohkvxftinr9r6sbvvea9ihwktwmk59q7opevonay4nxfcnicf5j78ow7hgjm88g1a4t0ff0jkpgfig8fzru7kaz658xitih7pibn1pdcah4xcbkbwvfdzq8fun4f8od635kf5130bew1wxa8vu47414tw61i1k2gvifp0cgd9km4xl76tv65a0mo6pxy37436x57onqkh0zqfbxt1xnjm6lwk9mkpgk2howaqhh7wdntxo12fd7bou3zkf7lbtjrb4ch8k6rwinxvy8j3ety10g6zswewdqtg3qlrcfbgro0npi8ikbb0ivtewg4xe20sndn4drmcuv7aii544huh22swanyze33q7nkarvg29lf32fv8wz5uharn34v96ty3xaqtr9zxn0tnv1hireqwnblqdx1yezh0nbdcipuyql1fgxo0lv56s7rnu5e389v6e5y3d3tt12boykk18rlwm80oc2c6phb7hxs1jegdndwqb1i9ecwdi4u0c14c4fx03mduxt8yjxactqashzs2c9825528l8jpf245jmmq03iqmeahwjs27yl4ywp3d0vrah42c95th8hwi1titzddq7wybdiphd81we54zbzm5bbysmeh9a6px1ba7qz92uyrcn93tqhqc6dbu730x2lw7li2p38inqs2kxycl06nm3902mty8qh84myx2unk8n2098f7h3xvm0p8mbdme4313p77r271ahowdu0kkz8n3u0hgza15zqps5c4iz74iu3aeq7bfch414o2aiz1nzhmi344rou44iecny3b8ad02ijdbn9yjfs2dzvllwpfnl67d48pp98jded2r6z08fzexi7lwlg1ddwqt8uez2e9nmrlsi31ge4g69q11te5lkqtwj6tkaptpiaxria4ncwcft1x2btns0nf6r2b0be3palknm38ewtbmpbathzj7mf4h3t0fjj0sfdoefpevlexor3j8xztbylv99yf0dza6ef26pgrieft5sjptvbu75u6d3nxes6dd7k6m4jjhyz4wumyf07yq8hhpru52f5s4slrqlf91jq2fpvwscb20cc355kp4lo5kgdnfi0zabm4y2rqhiil1ekodqgcaogr65c6fegcmnxx5gedgig1r47uqa4i37h0w00xl4ergoxsp9clpiqfttwvpq9ob6v30dxmlfbtp70toi4a3k8one9oisr25mlolznx6efnyplmdvu732ziewz4zqtyh4phitubjw6h9dp1gjgh9aqigdrv3ttt1wggx8grzsnhe63psdztmxy6fhyrgxu78j6zkhrsjrii8hw0jq5iq3zlbrjdjjii6wobcb23tp57aw07twqy0wclso4ff75emickmfjmt2txhm2kw9s9dxqerl774',
                redirect: 'z4a8gj7aofkxb390l64cfpmp90m04ptpiljlyjpll8l3gvug3ytvd60h3kmlsab4dreum33pjlgfscx9g5ltwm81dy6fg8098jjk4ymtdp8vx60vx0d2ajrvdwn5pw99d7wwxh5r02cqpgur2clr9np33uw0faok5gf6304byrpewyhc5bhxnc4c52tnbls099yvi7u1b64dn0azyzcw9k6cs2t5z2dkpxtmvn48towzewjdw90lkbtl0x4xtk2g5u2fii989uz019vhvy0ax4kjr5jzsernlf48zgzwyq7en9ukp2h3titm9bangbs34a0al45tfc7fc8pqpzdcssikawvs0eke8jn75k5c4rc398cg41tzvcrprktq9zzz8zsk62kz3medab3bk7b4b01wdze0yrb3d8jeijle3ur5h9neghfawbaw1cnxyqhss040ydae8w0c5whfno43xdk4polb94c8doadt9xzax1qdd2ztlj31g6p6hre4ye2qy2aaye5o8vvqoomunycaxf0ifvwkn5fewntubmddnorkx5eh4q1fiourd6uy022bd8np2jic2aknh9m6oht7eqv1rfrqz41ix5ipuwemokpyzs4r1fy2ovy95lqx1ne494r29u8w84pj6h9u67josjnfp95o50luk8oy1egqsq7innfvi6pimjre9zbe948hapmqb6wlajkoarghcgev7iey891et95hpnygewh5rhr7plbt9jtg5sd2khincpuis2r5wn88ppua6kinardwvytqyf09dx4gz2tmlrr2as6uma0ci9vvckvetf7x736zjlx50hj9z7osmv15p1xk32cli1ylxunb3949sapekfcq59kjl0p7nmrvjsmehmtslb2mbbagi6b0apva4u629lcih95q0fnbq54v5f66su7tzjyo1koyjpmasu8zp0ic5b80sfs9ifmt3reqjb8rmco9pqg6x7jhqrn6hz40xt5tthnh7q50fh90yst17x2k3wuuayaqy4ow17w5xseujjizgr46flfn84qp8o4k6lxzz52dkalwkttjsirlv9w8v6zc224023xtoxcr25thcfdck2f4yog6ch48gd4807z6ujg939f6trc0m21s77py8iq1n6t0scvtqh0k1g9n5tzpitrq7uil8w99qinumqgxy35tta0nd3gukpuj3b34bmz7rjrw1lvhj30wloizowznjkebs85bqqvchbojzilleng4z78jwwio9vttq9324jzmppihu9igtmar0pzoovd90mjj3a47lzp638ywonj0abuouz3abzyfy5y2327pyud2onp9oxipx9699pr826we8atow8wpuhosbbewhcyj07iraazpe86i4nq9xryqv5t6qf3ke8ensle6z7jcjh158z775nxkcj2a4ss1s5qax58bbd9f5vhd7tstvva0b56aa7jwapimy4z0niho4wiiq9cagu35ue85bgupndca2qgi4z7acwindj07abtjp1h9z9m7x11731gl8u9q5rw0m77244x2qo0q4qyru117tpkgy21vi7ieezw5p9h9i2w1dowx0i0o8az9qfcchk5berirqyscsowgr06blnkq5aoto49ddledabwi7iec5rpkld0x5p6hb5zq1ah5ehi5ceewp0le2ktu7ddphbzs2etffokmrsq895vdnacq9pjzxylwqyyyy9cph39nbg35roa2l9aqjx8vxu6fyu95fi0ckewz5cshd5k09xfr2skd5o9czlcht374khkuz21i2k5ibi49u7oq98s80avb1ntyig2n4f6bd21vforsib2ps64p9z2su63epyvqls592l584hd5fl18nlvmdz2qgwn8qo21vifyamrut4teytlah4jek3yfd859hs6hxm48h38labet1l0kucdnzv4ypd07qn5zkq4ag094uc311sdnflc3w2h8amutrpsdf5n3wl1bkkylfrd83ina9ukepvt3g8u116d82e2zo0d',
                expiredAccessToken: 2428800090,
                expiredRefreshToken: 3297284093,
                isActive: false,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'PASSWORD',
                name: 'zmtkgfh39htpfo970z12y2o6m9dq2j2ytjnoljarnxzl7id2zd8f4gksn6a9j1ugsyn5p93f0rgh4gzb9t3cstdselrcxbw6f95nuqpbfxm9bo3vn4rv4elntqibhyyaf9wn6mxtkawwsbhl4huoo9w7u64ovsdlxvjiflzni1v9mat6fh0apv18xxi284nhnbbqbo2nisx2s6qt99sgv332182636xe0ufsdhmlgh6tik2nzhs5cgyf9p3sgbc',
                secret: null,
                authUrl: 'zqiodz8rnm3f1kbiy48u7dbexzqmixxhu0lqp9j8ynixj638eo86qtduaeceloqvyth9vlg15jbqe3y9z4z2fmpex81m4c13pc737xddewxy2xt0qsfdhgvpi4zqh501ywotd5glaj1hoynyhh4xq8lin9rsomssgimif3dvoqvkh413lmvrmy77w12lupaku235q49cst9op0keoau1hxaeltyhzmlvxipzdactjwze692clouwpmpxss6vbcbihbox9o21v9nvqbquohqekipjpb8w99al3mnblrzfm0ng812rtg9bjg3ih7u65dm3djblil476dhzjpg1e555nvg4f17fy91ri9ai8zpsdfr39o2mxhu44s71r4y4uqtq8kyrgpjcdj7b7fu30rz2q7i809xl5dl8xdyre0ojzq9lmktw8fzrw5gmv32icj2u9kym9xdw74v9z9igmene9kyyhsiwu140588d3k0wad6aihej1pyyy1otq59aocvuzq55tftarc9qs1i3t2o42xnkc3rang38v0zfiaer63av719oauotot2cehvvpt1eim96akuzwsy2loi88yx10m5fwhungwcisbz3wupberhj80ary7e59vojyg5gbjfheccuq0q4s4fsngafhytv75auqyomuwomrkms6cg0915pdkxrlddiz0q6f8llad60iob076tx0sbznfvr151xc3qi2uxk9c8xkrovtezp5lp5fe9hxh4jzh1a3tefk6sqzjspieha7oidp7z262s70vf7mxmz5b3ec47ejfkwdx5pqtlhrovcgn6yf5eezzjpeydyxc7sh1tu02rgmwc5rsgbel276j5xrb3nxcls5zawbhm66y84sgj454g6ud21ujtolnede7aa9eranhmy04u8i3cqsoge6mqpt839flpm40yr9ib16mc6v1dl97g3sxp5u7mzj4mhq5ik5kw3l2tteieu12yzrjzkdffpoxgobl24hy2b42gv9hyicwwh1p3giui4s52jbvwx4a1tjbyx55cgh76344urtsrand0fozu2boy5zdvwmlxgn5ukpxvw5wzrzoy70bza1jqpq3eopwab1njlnmv2wgqdtllz2xv9l61dqojlborvvzd9rzgsm52b6gmmq0ypv7oo4sep3odc8c0k61b0qwdta81ia4njh8bb891cjkzo3l9m7gkwz7kgkca3xar0wm4uzwfq9pd88mwoo4dw93zlwwmleohqb8103fxqk0twzgfo2yp21jnv2b6rx5tp0byv9u7da2w60atih19gz1rvytgcq4jp9vrgqymoeg9aqaprd7eap4siauarpdxeckzpy31qyptfjlg8r6bkpuwhjmoxjx2l1knpuz3w0gb3pmfk5ho6k1bolyw8sgkx2v4uzfrhupai5yf9id1u9dzq22di7fkwg624zy186rvl9qh38rfc3u8i7rk3iqfgsajwaxok2ck07piaafgjixmh9zg5leh0wl3thm510f0d86k87teuomd1z7xorrx0j6j0kp7ue5hohf1c26mv6ofnvk9unfcv7af0aavoe81igqfyl4y5be1pbkwm988oh514lkdc2719w0f2sj9iryy7wkvtixo7tjmpy32q2ssktodxy2vgn2ydk0682c59oivykprc3n8jeg6a7h1zd9jos9d2cblrecc9uy21jb5dskbjgtggld4v9g4lzqwxwwjn0l3g7awqv8r1y0hx0fw9ymc2asffrjqgu1y1w7lmwhxsqpml7p7xhru9oph82hcq12gr1uikuoy1gnp50y0yoku4vlkm6bq0ktgepjiahjnj9qwujvodxz8ud5xn5bvzmj0061dmg1lks7zp5nblrm6el2rmj4vt392nf6r02uxew0nwhcfrq7zry55hse0dhik7zy0okwcqfmkefikgoe2bv5s15lu3kdnsz5lq4nuelhomlqf7gkznj0kqx09tzhal4orxlzo8jtk3y18j0ymhjuvud0djerzm64mhi5n2',
                redirect: '1vwya67fi129ip0l6xqqlsz3vx1vqigtal2xe793p8x866ce2ct7z1nlxdpdlx6hky1xsaz8ue2r2qacea7rxtlisej4zjarvz9vz6lvtu4uzyaohueb4w11kh43oxjhoec40lyuc5ju9zjqf90muzdpz3fwz2ekvsqkey81w3lj1zfr94acsf7s2kq2stj33r7w5tp7gmd7wd5h1c91h2lkekxrr0c7912kq80y36ynxh6jydkjl4h436hnnrpfmxcvb6pzumcaba1kwxmhz8eyj6f44z88b143pemz7ifwq0f9fgm1hgfb5jptni25d30qr0nrhqqtmegkvqs2ghwz19ux4qwms8vjhtzrzgdp2k8lngmpt9ww6qtxmm2kzry1l8vmw5dysv1bgljsss0s8e2ngzqk5qyzb66etpwm2d16ahwqsmxnb4aw0g1bi5xhap86eqswf2xyv2do2jgu1kq8q4bginleqi3k84l8i4y2th6xtiatd61qfdvu8idc1n2uihg93gwb67t99netpyef1fv6rd01vftx1ns5yxvar5hdio9dj1fspty3zvyqmx1euqxunmyrko8dg3nsd5m1u5j8rm6pk5i1gd3chu7xpu4vs6lo89uagubaok8yev5men19agn6d4l87aero5owgqgvmd9of9also2x5rs9tgdm2eimx7kl5r9yyul6nyhqs9g3zy8wqyvxl9xe5uutcw2gmafak0ydisxru80dxrt1ntt31mmfwk9jxjm42qvn6ku0hjewkazlwg0pfweztb7gleqj6tfjz14xbmflz31wcbjoac6w6kzj7y44ki5dgfvhxvaygf2vxfnopg03mm4sy4i1grn5tc4mdzm41weyrtx9a2robz4qu2k20ho2wnlxx0an3rv5ytrwuigr5kambdqm4xtyk1x8t4nh829r2jzm89pw41590yk2jatskli57vlj6mxmsljpweccdfbm2i2wh552o5k98dnvqdh9fg0dcj74vvch1mcbpooxjhn1j3nc8zhra2bmk5ycrqyxvzyn0kng68230xbst9x1f2vcibvcsjt3mh2hdijum1l24w9lcx9m4q3cqcsc6mtko5aansz6kxyc7f3at290zy8l1bc1rb6mzn3ji4rk2kd7qrti4zj9iatp726ztwobg8ux6yzjvz7lf2qaa304q0xls5q71r8juv7282pe72st0auehyqyuv75p2tfsy8wct81g5u6x074zdfhhl76ddbumj13tov12rhims6grqixudanwf25jyh5ns1cubhv7nea1kqf8t3ujte6wyzjij9bv4p4rhn39gm9uu65tdc3tmca5uqqmouelkxc5qsabj0hk8w7tv2xw916ymmly745cb00wtk0jc5r6tvl6sp1snshtdyfrwzvx8fr1zstmgy5ypc24e8te2gm1053wpeau058bin7g2ny4wd1xydq5rzjft4lxw1eys4tu91jcxg53mxumu882jsnncmrvaz7fy2kwb3pxq8rucq750x6h1rd6wfj1ikmn0xrvwe62k41j89kl1o8sd4i83clc3donotmcujwlsudqum3we3q135f7mnbzs7aadsjj5kjnnosrmgnjec1xhqdo4ltqp4hnwk590wf5uoif0qf19vtt81is7nudoo7nhgfxqgy9j364itchhhrdil3b8263w50u6oohy3bzcd5s3mfqdh6087utoejdcwx89z5spn2ds88cw7y7jpwlj7z3wt7nxc2i5tokmd20hq7x2mt6ff8y0av3k11a2oop3213htckew6yhxviigg4w654yjgjre1kyw0y5id3m2sg877snq3kx7oe4gsxfhc9yqqxv2eljjrwp6i67enylut8emaq2yrl2uzkd008wcvy8jibo9mqnbwwcjuz8hnvktd57hyk6lp5a7ttyujypsqnpxmwk2rtse7zmix5rp6ezbf9r4cqzpigwr3pwqpro4aw7cmdf70isdtdlw6rd55iyw647oo9k0zeibb',
                expiredAccessToken: 4178793332,
                expiredRefreshToken: 8344500786,
                isActive: false,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'oozj41ql7i72mwzwot5yz77j8sl7gggdzeteulzl4hd6hd87niki6tiykpcg69h1ckv200wpbdc8gob7ky3x33dyuum53gowluiazzp49itqrlbijokrpxbax580x4xyye6ouep7swc4zfhmloqxod2udh2xsqi7uj9mwmj0gyhv2vzqy3q94akvtnx447dqfmdxl90u73tb67268wm91vam0qhhqzp9r3vt69zhzhyz4i214r5wn9ttvg4tnup',
                
                authUrl: '1ldl7wdjxu3di3k5i4mi7tk4zs794vmimixmt55n9djz7k60l7kq14u7yypxzm5cw6r2cnazu41os22wbnpo5slmenuifxi7rnemde06462g9knguwmim3g8bwnngl63cxhyod6yv57g57nvsbw80berv4v1ovg7zdji1kt2djjwn6ei9k53edlr0ijva0ggq2qkah55kqmi74c8vva4uhu1t7mnql6q4o2jphodpdaqt0ia68iytrxeqoit7h6sgbkncv8w1fq7ae5j08qtky8xncgqdn7add2dth5zbm5ukcej1xe57kmklx8toq2ry8nxgptchoozvdmc8r0xsrrufh8n3e2b2e6ukreqxe3y3filwd8hqap4mcefyoe40q3dzgg5lx5q66ru2mph4cchema7conc4plq1xoe3vlhqysyva3atxkblva3luoad328100vr18jpixjlqh1g3k38br9cl3y6o1inun14exvnx1p3n8rvuhu1yt7jkqkbbnr9wartf5j2oct6f5d58ppls60bdsvc80v3kob0vsg46s8tztfip9k1nb6333sddghvyyx9r3m5niycxz8zp59ay4ly1rsgkkbaz8e4wsigbzkjw9eeth3jmjtkqmkrc3cskifvhlemw650ca6q2hxdo5tfmokab10fc5k56qfa5a0sl4h67giz8k6cgadzinvu0aw1ehxa9ducdrykmvpba7qvt02rre0w1bh5ezdgeq9nu48duceaqm02nli8gwv0udmw0v2citcpdzcychdkxapyza5vcfymh6c7u4sli4q85beoh63nfz4gu68eim3q7knfdfq3th7vfq61l6m48e4tj9aomb17e3i1n2i1bhl8r8alkvdxn7oa80qeh8l1hn1k8m4n925joxfrefv30fadicu1kiranviag2094yjhn87daif57h846xqqt3449orjmje949gnjiga6gzlex78nl8cgpo4ix4xw6tqjwrcad6y9hpsjah38430ycsxucta9cpcqg96ara73mvifr20zhmnzsjehzofpc8vnvthneo2equ3qv9ytg4klb6bjkjnw3etwzafnmj6r79bgrk1jpj0vj79m44b1pilbbpn8avo9wapjlf7a6rpruy1xd72efjfupzi9d4kl0e42mptv841v8ovnfslaycorbnxi5mbl018nwnh3e4favw5ubkgjefnqe9b87j5hz99rpgn78tsg93ulg29h3hoeu9n949mhch2psqtdvh8cth7fapfuo5cpolcff6mbz2wbjw8sdzhcuocsoaksc3p3q0o2dkcd21nv0hjmwf1vzh7not0ksrsuosx8t3ytvwu6ro4iopnrfwzm56og3ae8ktbuz7dijn37wpu9b062p87ygob7z5iz4srk4rh4h37s2lpe3ml1kefdv722yp2hm4hm8k15qzb2fhom4syp719na4uc4ciljvz79g3czpsxn7xqyysj7hspuj0nrkcdairfojhgpzmlpzive38f2k0mnapscgljylmqthentzjk24z46lwd28y15i3nsngmtz66kohpu01szha13vtgzhb1go66rg4bmpajwms77s9o77dbmbp9sup79yvv009dg2b7wa4n5q79cck9ifzurgpg16puu5izxzd5b4upitpz1aoa5ok4rhwkzwm23uz6teh5nbjlgms8zk825tn1yyclddmxtsei2q8qgel22fn3p4rn0tdlv2l3dowjiyps6lzi8qfqxkl0oadh3rwh4ciiiqiv5hyzqlz05z79cbnrfec6avah35hrn6dtp8c3jt07kqu6u7doa46b8mpxxa5uonp5f1fhgvhntr2bdue05d514zvg5b582ay46mb5284zbnikkckev3rkvrs7olay0qe9e7yln1w9ig6e1pnzs6labemsiujswiv4zuj0ega88e33o7j5mzm8var3ie9rxomgtcrpsyrmsg1cepdkxa4mbeoahpw5gwd79nher14241wbp83l0fskew',
                redirect: 'isa5s1wgwyk28nl8zxktl03vkej8qc0qw1jrgxom4ce542nl6bgom48xnkemfpcr3mqm2c64yg05r4pmxynpkws1ny8qzc6z20b8p6fe7h32qrigrzlxxa39dzkq6oqjh0dgmiu0kvsxqsld7vzagdwvfo1mcyhh8531dqqaksmzo0cpju3pq2hkejiq1sw5p3toqy71f2vx4rzo7h8351lyd304ed8papazbcathab6n205bawxydkz5ka8uq7ylc6c39hmarw3i6xje7ah92ijcbzou51gera53kmg3qcoeu6rin6hlu4vr7g0r7zo9m3m8dli1k0q4vqueqppovhq3ihmptvh25kgvuza85wkz3i6ki6ued9s71lrnxc1abzp5yikry4kjt0nvzjyi55ub6pfhqddrakhvx3bhi8jq7wkbplol1ai5fq5719924dzjzrz84r2fute4jwz8gmd4clweu28vobd21xt6fzxgmjv15e1djxy9doj9yhfp3wv4pnv2ebp0j5av8t3mw2x5iyxjkju2mm44x038qfqklb8k14c97lj2h2v0a0i1tjge4uemfncbmfuhwqqjnwqzkcq8cndggfxt4gn9ljxb37d6i9w8dud2cov58mq3uezd4yg5axsg3h1usx6dl8gc4oxk0kxfrg7cu3azeshioi82cmm5fx8qrsg9lrsomcijx4llmed56b3r6uzph2nwgmayfz011e1ssys117bx7g718r8235a15goaayw1tdawep85vk3akn444fidyglw2x1dfpie8x1fydmsev8d4ok1ugolf13q2ef423r9b1thj7h957uw56rx0umlvafjdpqkroqpht1307tr4zqb5012ci1b6rkdlvvku00pj0yfmfdk5hj8ider4gdsknvsz89pai313le98dzri8bikmj8c1qyhcaynlu3qshbuvs0sk23tdu1v4t78vm600xcfybpczjf7whxy37hebvg7nld85k4cm678uhbk5tv0wcfo06ea672oevmztkcwdqas135bvw2e3l2xiza86qp1meqsq8vlintc778c08y38buhq0qgce4nnch70kwyytao8o24pw62b2w52jo28xe90gzo9n697iyxc1l1lc1nk3rzlzxj1v0e41ebgxre8jlymkberxmzgyac85mwcbfjb669bgmcz6hv82vdrgw4p1bfdwhhy5zfngv4z0brxd3tzti4fkrsbb9ock7m90vzztbjrqf839u5ik6gxwlxkxq7bxrwp2p65nh6rfy86jx5ktsin5shywhueidnnl0c9iuhg01uy8qv37hh5o9222quaoczm57ezlix4yqh1dui4yzsubchlcgtnutprsjwusn6ruck0ytlswrydoz7nx3pll844tt48pjcwrpk6lnrtetyqprgzmy8qat3v6w9kql5u0p6livfir2mce0tvuy08zav64dvimo9n9tv9y7cvcwka7grxtu7tht0ndq3p6nv4je4wblzqhlxfi1rz7dt67jthixqb935w4xmohurqnosf377rldao687e9u7vs0bvg0776as8l9wavw65cxwp0mub7zicka0m2asm1uemi03iujjxldulw4h33kd42xp6k92cjmz3yhlrrxsi169osa0on2gmh6f6393kbo0vbpt3tn7i7oamgwb15hfeufpr7j78vo97c2unp0gi9gek2kj3wragf3ehlianxps20u86ewytvforeoh8o8dhvh4yzy7fsha3ynlx3l903ibl0bf009nppfmpiukj9mfahbindwhkq6r5bsxqlqoccz4mbo01amqcfy03svq1xpcp2l5we3sj39rw442xe1bucf3kbx8c7w7z7t36s025654nxnq4w4gowoxhm6fop1kv7ji2ybz2vu3zygovdwq5r73araa0q8l446fun9x5mzgl6sgmhs5e0gky4v5wfy7dpvyao84tu832vc8hckzk4gsj0ngreauxlhiewtoybj2fpr81dktpo5csb',
                expiredAccessToken: 6429060468,
                expiredRefreshToken: 1160963178,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'CLIENT_CREDENTIALS',
                name: '5lzedrx8cu2eo6hzozahnygidjwtkttjwaf7lorle95kdpcj5az7z5248yyssm3otko60nfsr9ag4uzdqkuinwkr38613bz5jwk7v02fqglqa9ez0ykl8dq53udiqrqpx80ck45epxan0m07gky65vk9zenhnjn1hkvx9vf7d8mlwkofks2lbmz9vd1ehn8fsv64uuoo53f3fqvi00y89bxbsfk7bfygf0jy0eryiqd7w723ageg563r25uj0ro',
                secret: '2u7d3ji5632bfwbt7h13vv5vn2ua2ldlrep4oco1fllzew2rqn14z3n1pl2gtez0vtpm8bf9vv837tvpja22knhjoi',
                authUrl: 'pwnrxxn1r9c1n6wz9k0kuc6t6ufhnaflfq02bl3uyh1ppjh9risuashvt9eviag7qgzm8sp86cdy3i2smnw7h36g92y7nv4bb7y4e9i2jdbgmi15fp8biui447wbszx5ycvrbfhe7bbq54azix9yuqifdssd4fcfrgf9lme4s9d0higro8eq28h2aopeml8863yu9w18zjtkj7s8fxhuypeg2spz8m1mju3os1itna8sg97lsxfzsev4naegovfmzrzgnsmjygphunjps75ocqqcdn2ktwfw3aoyrby4956jyz3s6rl3ue3u2f8d6r7pvtmyqwfe1sseyq6m28pqkix6oy60kp6hupuh1xr472gpb91yon1mc5tlsi83kmug2bqkwc7i6yhvtghx10kurghh972nbq5uenz69db9c768ylyedtzd8y7lsi2ek39ukh82zlcpfluvr855m02on4nxve09orxngzvsu02aw69xarnz5mvvqkagak83bgqke7fjj8odfoscrg34boje9dfozuwoadkmzij01x8ei2zdhvmp6ynso9ykxu5duubtqk1r9u4exkmflgb12zjrbqxedy5k0rb1lsktcetayy8p5kwphz3i76ohnz83tu4gd5g327er5jo9d8iw1v8mqkx3d2qdxlyg9fp68v7ml763o8qrenmtsw66bfzdy09d02lnxg4ygwgkzm08c0mr6tcbr8seozxax29zrhak7muoz0gphlqi94a2ihba33hns4q9dqmiu29wnzi20d5ow44i9x5scctbes9px026r2scyf1bbw4c5izfmlnj8wn1zkyoa8buzphmq2k9sppph9i37ytvuqjhipy4ozt18n4ho614tz0lot818zntkge04q6fmucbixshpmbck8ylt340mgtkv3sujqr8vlys32rjozi3wlj081bqib7585m4ioksc4j2t8bfkixjqeu1cljlazzyhv21ppm1i98ascz2ja1qsqwpqdlusrmncxcmu7cbkd4lpujxf0j6uf8fy5599unijq69lly2kqug37dhw3w7np1mmben6pe0ofil97aj1u3lcu8xdt500gv34ysrav0jgqwg6qhakjy4yjlo05ajw68h5qbuikxwofpd3htvke0wa4iz9psoadbfcjlvsiptbjvh42oo5dw2mghon1xu11eooyjnw089qeh6675m0hyjigtogz8ztvzibcclpvvk0mck7n76g4k7goeba12hgzmn9t48k7xxvygob85pujlhutfr2j3negan90bc0trs3xyr8c3miu65czt0pyozu68qzykitzbipbi6lselbt64s5r00f202e1pirt9as6jhi02l5j485kbz1lora9udtpuovvqyx6wj987wt89kds1pv6i86uw0ayjrtxtarvk7qt4qt75apxqctfvc3wv1uy3vim0lbqn2easxcnszj5xxxwxisn7e5ct1u1sfinjpraubup6mgq2xo3onrwsu8epehptquggr2tsnu3ssh96chuggn1r0g6j1utshmxalf4fr0p7bsvwxume60nf54atyucu37p27nwu4j42tl8ramvuvfqu4bdur026eonon5k7kwkq14ol8q6je21jp8gh8i4xr7ibclfogu5q8r5kc6yp1ahh43sci59s75xxrzlos5s1gc6ub3ali3cjmgbzl9j21wsaesdazicpycp8ab1lyxsjiyu4bnxk22pnzowl18rmltwh7fth1shvbtear0b6fqyuon2sjf7hcdtjy8ysglqaanl1wzpdn5x5xabn7pi9ypmr7ivi1o3b9i16qu3myh5yaqm395tu5nb4sk0zs8f8hrb2uyjwfd014pzm3igym7jxfax5rv3a3tmxrwz7ynl8yskne5oey657429fs80gieskk3i3sjdv33st2rd7bokqr4vl42t8tormw6bsbzpys3rhg1bhrakfgahelwwp6fhytpw0sfkjbohli5jm5czyi05pjea26sx63fnq8o995m2z',
                redirect: 'oq9ggqdo03g5rvrb4uf616kmqbs8u4mnmd272072gc3y6sp0urfrl9cj0rfjzhwuox9s69pcqynmb8nactbogd2x7ksiizmyka0c0uea0tnhm36xko18c9qik80zgygn3ffp3qz1mws76tbqd3mj7kb5a6v86t0wb58yi9lwxw5y3o32pvuio2ezda3p2perh97cwx0izlug8svl44g9n6yztbpmbqw847gg725a5s0wjv3cdnqj3x67ci82q3p7csdnsg62hqy1qdomaqbh69qwem44zn382mtr8nrel4zmgo5dzy0csj9qppg4i9llgfgl1auby06dfn7t3c75ml9ffejci766z55tlhaqpnd7guw2u0i91tpviozpf9yzz4e794an5t2566ax4w0h01998e3lvdvp3ergfsds2ub0ikhskuuruz3sd3xcyhwxxvn4w3rcvlxe520ewjn41yaldjf17rek6l4lc126bqhynfhvqsny0soc8j46rwpxm52xc3y0xa0czshkz8ssnufh55qmfg8f3y8hzluesip1jc1vw312jusg5xq56d628u2zx81xnkjdoka74mfnfo1avbim0f01cjsjkkgyzmp3b63y89itabjiv5jh724s4bua7356qoacjnordolvl4dahd479136xjglf6xoobk6pyq2kji16fvjbdtqtnvzhara5h23afmabb46pfjz3a6m7q6ekt1ty4j990d1kjph7tgz0k671i4xcljdnkeqte6zh6j7kvh4sd1jjx5nsa2prfgtas3xz0xprqkzqxyjgmilbxcekzl3h2fw6hj1qxi6rm7fk09ijh8wuz158qzbergudn5m4aoa7mgea463azkii9g2v2iq56efubo0yrddva6oducqguiz9rfe0tyaa2q76vmupxhfsc9poj9la8rc729538qbvcht3n1hzdp0x8y10jjfo8zgis7wan4i71ccw9dfrein51680ap8mquvye99n5htpjxnidjf0hschuq3ghrg2h20b47j5uocdigxshsfmqzimxn4aivtwijinjxrw2zifpxn5s6b3q82r1yx9bheqbtleuzxvdcn8i7f1izua66d8sotmeoi5e0hah8rrp7l1gbjuajgspsppegtscytsgoo7f3s5t7own5y1fqz27xk923na2vnb65oyy00d28wsfx1aw46pe93acrvvukenuzzrgjr6hty3hhgaz3ztp8mz9wwi4x8rimq6j7kcqfdz071xd46yp2mza98svhngn2ksjv5emzhv60ufes63v05tnyowry4zmaehwe4xnp1jn7e5tpnyspq2ni9oc70n7baownjrrzw5ulw2x8ybe3sgcxcqzqlnxnqdgykcqur36jyhee31z02leo1wh1smh212m7qhvzkhymh74oxd9e451mtwlritli739phq0fnjqr3rmz23m8uk8wkxr4tod0j2wqewndclh15w4ist90960kyewck246bk456r7x0j4vildrbahi5p6q355nh2kmqughszj6oyzv7la9uvh641e7a822bqsc3wxftga9jnw5rv7o054h6xzqb0feuru2ecjkkk9gzabszha3r3f23vkpyyvbxsxro5stmrjl4addb12xd0bqdma1iika8ieokl3hf2r1pinq39zvvlnlcl6t8tau2ys2somtoa84klsub8ibc7o6gki7iob0bkya4a3rgf8zu9f934zshkd0o8zrqthe3fqlzwvl1zse173790tf4ujxg3pvndoxtnxpqgvabrr8lbze877m5lj6t5u1nw80ecffsmnlc8rx74peke4pgisjlttmh0hhfayd019nw13nnswyeagly408lpglzgyimug7vm6tk57bkbrhf2w2a3rcniuk5jhdkrguzqbyyop2l6zh9vlyk83i5s8fwv1av7qusjmmmyivh9e1gq8mzek8r7aut7fkf0lv54a45kdf4bs2x1v9coldwrx1vbcgjda60zizmfvkxftu1yww5',
                expiredAccessToken: 9793634501,
                expiredRefreshToken: 1541147499,
                isActive: null,
                isMaster: false,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'PASSWORD',
                name: '5n0s7jc743z748eeetkykvs8hbsq30gl97k6gvkfopqjjjcwz5kzz6iba02qcryj3a6yfj4w3warfh551pz8phk60nn2dvm8yv4s5a4zirzd0pe1lwyh5eggozzct5876g08wisuwbmwycs4o327vecm2a94n129pyurk5621t98urmp4x3x3vzlrw31whtck9e7c6znd2vfme1s0dkl6tuapcr2cgucqppupl6b27nnx35klmlszt7b4uzc7d0',
                secret: '66pskvqbqz4vm65npkldoz5fu7xtu4ioyhit9uhxyv9ium48go0n3sw9pdshp4uhzm3zk0wr4x2bwdad1hzlfplih9',
                authUrl: 'wmao8wydcg86zxitcb82l04ykur8bu8f4t17bn6kbol5sz1m2o0rkc6dirabzep85m9j95y0rowunbc8psqdjvxo27gnenume3gmsh4oro56jt9rb23i8ftb1q5liuo9i80zox5s9lm5lnk7erfd927sul1zylgajn57e064bkj31gj8dgm8odxb3xicpxgo93meap6rofsp9hlbgbpkomehui20gbguw188pcn5su34ula1f38dtp6z8yn70cy1cojck2kqro690cs4vwoobvfeiyo98sz2c73ucwpf3e4reea0yhi1hi0hs5at5xmyra4k9z4wtzhcwxdn6a8cn3yd6qo2hnu3etwoe95ilo3tq9xud97bk0rwhcrformt0iz445vis68f2sxepzpluedi6w0bzuh5yy287sfbbshsz2xcsh8s0c7sna4vupb2duuy2n2079f8tepph8a2aal6a0cid2x6z5niix5xrn6ub0m2ogpfibumdxz43943sckdtv11ibj2rwr3gdby86lhkjzkdy2n4bwjsmzxrkgbti7ndd7e5nm6eyeg3d2fzj6m8ypm0x063gywfmcfb7rpbejm63duiixszs33771qptzla0go1hfmlmtc72d07uul8phy978uovpmxwlpttkqmqco7g3h3e7x82bargl70d36o8n5j2qbr9nfkuxdeitn1a2xcooui8p1yx7z6wynhlni4552jeaotez9n6bkpl6t11u2o5vkru0j6t9y5qvakryj55ca38tg9q51xbg5ugs9d9sqtyzfawkzi32oon0a62snpko2kf9iri6oxv18ke3n17che61we53adm93io4u5bgih2bibp0g0l46h1fenzmwb0pksj3vy41n9xipwrkc5rdfnmro8sx3bl2tx9vas4gqz2wbi4dan7vvpgskw0f4812bjkb6tz173kaezi8lm4wv9qfmcvhicqfz4ja2681f8pts3kn8790dtpq0wesv7yvsgijw5b06eihr4ue2e9jeq0zg06uxcjhosrwcohnztgdwy39dsnyqhmqz8m738p3ozid0zh838ljp7gbwz6wqr5ojvbece7v0osk4km2v7kove7x2itoi2ul79oc9t89s57wqwdb7hw99da9rli7ja6umuidhprcooy1thofj45vxz6xmqt4e1ae1sai8vhsatm0ee3s7wlixmrpkj00naz3stkqji2m8kc46lbs90p0oe1t7la5eaoe9jx7dbsuy71g74govguqhu0ie0rzfu6tktfhrfsmtm3ej28563q956pfpd42wczxti7q0k6sxft384ts0urjdvkhul1eisn2arp6hs9h285cu8snu5efd578hjr3mod5veft93mryo8xul76jod4ulvh9j4r7syvz9virpw1qiewubjtsts0cndduwdm2n3ffy7z43kk7okfeqytmyzobnhm31kix7wjiy4see4qbj56lmc4i51qkhzerehqag51087jumto8zorj0i13fjvdx7i0s05auh3stx7erv2jxrfrev5yvhkvyn6ddacn5zjxbwnn0jbod8a58j2cubdx92n3uztidrz99jmkaa8ajirx5pk21y82vnddc256kqhe84uwdbsfhbk113ddnb4zdo1e7iat6eay2che73th8ka4yrjffqrt55axdr6q8ox0zu1jgm4gr8n1z6sw8uywmsmn7bt26eclwoyomgt4qknaqwz5itovvktc0atulqvvy1k35yxyfrl3sjvps8yimfl7mt31y67lz1cd91r4rokkfaca6fs97va07tlq3crnui2e8h7l4fx3zzkicknd9rj5e8bofvn3f4hll70ltlb7t3k5s7zxj3f1lc3pmahrnbn5hapu4ntmdcf4vgxl510t86pd43toaco8v51owayjzv1jo54s2y291yi7okt2gkoum4k8jsk1ok0qikd2leb3optv8s17759nbv45p54y3cwn9j06cggsqcyhfeag08bw99o4fkzmdhym',
                redirect: 'hls84mwivj58i3o3rh10rbckkh0z9zyx4rgas9dxt1tsiwanajcfyh6qcxl8bregav3r6rcknqd4p0cvj30txkhafk6grjsrzhb5vtjxjqgdbaebx8sg6wd0em0c6i6lz5ez9u85qzy7xcu3rpvibsctqnh5s59zvbi6zlckz0fjsmxxdx1c6u1ieppnpiejv53m2insfm5dvuxcl7ymyx5jjo1110ii0yxaztxq8uez30mnq6j05q7es9fitjgxmkgg5rhiqy1c67154zi0tmy4lk4y2wt90adch3lhb067yycxwvdid5ehgdv6kxjm9ra389negs2yuc7to7wncnomzcxd35nur4yvj205b9jdme54uzon4gw0vyphmnzx1txg3rnv485v3vu4ayjfcz03kceb0eseq0pzirjqa9b3ynwga880k2i7ztx4n0a6gzpu42prvp4di5seat10hoabf0genjloybuf1mljzz6u1j2wzf57mmp0e7rregn1v4096man07wc74b9oyf4atxbnojxmjguujr5o1qijv43vkfb8o8mqbvpv6vy4ufczvngv38cdukopycb52sqrbmnjoedo7vmk5w1qrtnx956i9tbjtl3hqdetrk9uam8yaqy1iskjhcmri68ueoyqafgx938rsp8nl0er2bz4ox4ebi61y6vr0yeupfqmk2y1qiiql4stfxt1nawsemkldkv8czfuyvgm5unsoplor22n7dfzux9m3kgwbwgaoyb0gqg5ywt0pkvris6toikfr5a9z1ntvye373uh4yyg3rmtj9vvl3k6e5dmv00dqhvss6pk61kelodsfv1pzz1mccbf8mjz4derlb1vwb4cf7z9zvk4t9hgc7ewyu60va3b21793zcqanx6op504w4nmgm2wfe7ohr5r6vxfxvlpcy14ewost76i7vn8krcculxy3benlq3n1qmctdbm6uuztuw8qwsr61ofli8rv8wzeoqq1zvgef42jr184rbvtt68xpgfgoq34r66ksyrac3vdefx7i7yr20qwsksg0bl0373sm7ypracnfybbr0lga8e0gpkofmrt9teben2icstbf9jd6f9r2ljrgncl7iym8tumqram6wvu7co92dfljkt5incts7j45r2ixjfbhmml1f3f03b0fmgq30hk4jo000f2f7dkjwn5i8xj5oynxvbt2fbowshwac7ggn2o8a8co4f8kc6vc5lnkrr3ct0ca6olsrcm1cfdn99vz9nidmjleu7mav93w8jmbii4qzxh8ji1qqx10ft1at9mv318j2zocy0hxiucq7h9dwt5kalbtlbiwl3o5wbifl9n9ur309vcil2djdteyu36m5vxvbzezrnj7eq5v99w1mmu3ows00ch4fyig00tqek86lmwe45rgyks5vw91mfqt6fzz0a4gc0b7gtkhcsbu1a3qtaczcllhi7pha2sto9ou3am8fny5tkchhr217aq5106xd0f399xvu341nkcate9dycht8xtuquk7mwg83nfbdx0yhi0igsf8aex8o2rbvdpqimrwhgvtv7aik2zm2qihlfzqn995t5by26eo363rnk91og3yfllaeujvh4j94q0s9tqb5kgga993hxqq8zt9g49a59vb9lnlc2q2jkx43cozasp5fd7x97hn5owrf8e3qkgx6d3fmecx5d40phymoj3y2qsov8vp5shrmsend5o5ppx7bfprtqcwh4mfgdpk0q6qi77vxpokxav3oeh8b3v5jwwjidmp6gn4juqcpck4cs631my6hq1ioh5af13di0crpmxf68que0e9g8qijv1adnu5g2wp2l07nh4jqwwbmdtsk8vnmglkq1ihoj8xzkjxnqokuur11997lywt1bqkjzprxwdzxg9niuvj40003ptg9cyjtxcvj2vndv54ahs2134j61rod3to5zgf8wucslu5cmvbsp0k59qs9k9rq6mzta5w8qsw1lus5bxbl2kj4sj3zycq3pv81vfh',
                expiredAccessToken: 1158992275,
                expiredRefreshToken: 2081968734,
                
                isMaster: true,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'CLIENT_CREDENTIALS',
                name: 't11f83diyxbdlbps67ydyq8hm341ezlbub4j5entl67r0moqj1nitq3zzl7k6z549vsp7s523r79bp1as5saycxwrtcbqnzols45xzfgntwt0vdn90uqdx3vuhvpl8p6dlqst7x4icq1m5wvfzqrn3g1lvrxi1qpvookkjp627ix485fsyjpj4jrxgpwf3u3w12b229itk60s1tuibrjlyufcf92ssszl88lm89gk21rlmzxol1nciajj1b4zf2',
                secret: 'xd6gn9rjxuuf9z8m4pbhfvsaiqd9xtwez6apjhqo0b1rj3woe5jik8ytaqutkd4he5k5d6klcngr1n2vbflxk44es6',
                authUrl: '43r13wyf1uwktvkpdxr7ly68ofr9pkax1s7sirhiqx2kyugbxrnmejximqkibs6t2pty98reqxkjubj69qgm41w39ogqbzopnmhb15uf3oclb983h24lu4gv7qs877dsoti1zq6dac94uktflga4z3ch7o9purucsybaeh3m6phejbwk70vs08a5y19va8psfjb6odlwqjaqk2haol3rvx76y94ubkt8vd5dc778i7exc7yrrl96c31hmql5metv3bbx6n8qlwk7geqzk29mlbdv4x4ff00ah9pe95g6r9kfrb9elkh5uvcxv0urlb6nvn6s3i2xjbabwdh3eps7kvds5uv062l7co30xwtmtipak1acjr4te2cqjb4xu6qjyt7ut8h77wwn7lywquvssupnex7mdya0rmy4vevck3gjoamoc5qikt5944qoopgl1zi2xmdkvajoq75roeyk7rms26f707tgrlcpkl7w0mfnyf3amxu453urcygfi1dd3yfohsd17xqsrcidvlqx71oee7kl7p3lkl9iqjki99fdgj1o384avaggoya13ircc130i9h6smagv6lacarnwk0fn06qqmkyglie54fp9n78riu3zoyxxh9px92kodzghqztuso71sotxu6z63brg972jppo8cy0qemow4gimqxc8jzmp2uz8y0n6ll5s42ge1gtat4yflj2vt4z7wfxrt8uz5e94uwwle1vrstftwx75w182e1nadyxbfa80ra27sx7q1kzccw9ebtamp11g26u71boev8g8jrlisxcgd6y8fd80cndnd4je968u4jyozg0xtybdeke33tujdma46lly9bvhvw69h4g6orvqxj3km93pjsfwpjrr8b0irfm6gz3hi2x8hln2ibyx2ft50tthkm0o8oc38vrtvycfep7yugaq9xbe4i8ajdlsn0qn6vt80vxthk4d2hu7y4q1eny0opkh5fezhy5g5pun0sut5y5gf0rtcvdhlwwrf4cwi0ijsrlni46dv4xto47aatwdg9xs7o78e5niw2k9z5cbg7ung82v6mtsh3hsgydviuetjg1c5jw8zewdcoh7rs5ak3m0837b2yt5mc7nvxeu2zdvrs5bmmumr3swpzs874p0cmpmecm2y5huln7oirdgf459id5kfk26t9ryqd19wpl9i1j9ln55aw116nu2e2wu0feyzr7ybsnytadkawq8v46p18dnz8jsm6u48wkb6tpr5gphkof3k200sokniywq2ylrztkgpncmpm4y4eejr6k3f7kz9p5pw48qjw35osw2hpje5ocjdwomv2cx2z60kb6yrsknb6nxj3dxf3vfvduhqvkqgaoltmpxg93jjo83wenbarn4rocucbap1o73f2rhng3rromxz0fi178chgsgz4iqh41mj2hctsn9k53ehg75unmqibm73qsu955tid8ozliilhaoieylblc1fl1ml1bf2ascdwgpwn4wffgh0rn0bud016teojtpxus6hxfowkt6qzex6a37whgefzyx1p1r1mzak4fq8ncgzrih7jtbqi0fyljdsgef92xi2a0g99zy7vguxj0tncyt6wpy9jc23vyjwm1js76gd0edaari5mcnqu1d2ztps6jqb0xh5ayxhln9zveny2k3x8o5nspcw9iwbprtrpv0t5fahqe7sqwawcykqe046ebnuw84trzpnu64c5l6ap7su0lmt9keqjcc7mbj8skyx5yrc2ewklartm54zr0xqr49ks85qc5662y9vdv2snw7lasrge7jjezr3urrxllwv5py155d54aijrjirgt02tlhnumpoqoikn74ydtlvntmviejumhlrtcstt75jhogw7erl97flg6c9vxzqv05q9eshi4lmc8rcg79l4tm73gv6ty7m7mqz5i8o1bdrzmto072b3jt3w4smipuw5vm289esb4wydzrns5er6vz01heheajok4dpzt4jyy2okzmuw3ioxin6w4ce0c1hvp',
                redirect: 'lbk2fmcri5gw5s9efn1is8bbfiti1dsbmh5x3ekgx4jmyqr9ru33dofy5785eecxpb1slexbpy1gh74lrh5f4gk6ssiwlo3uszb83zwt4xbznvqljzaqfmgbfvwg1x9afwyf6m1zv2cwshr662vxzapkvtv1xvsox8vjk38lc4rqv6qq76114jbsp9cfcltybnonjjb5smr0w6urqp5eq9uste1gicegp27dlhuxvkxaau85zeg8g1ipoguk9543din2f6f3464ze2j97fxiq8057j8ias8mbvr5ifqggwch6e1s4gxbblu03i44xeg9y7qvxwm53mhym22aaekkqekanni41uqp9dnfsalbqc7nt5m519h4hugtywla2y0fn95z56tszafwv8v19973acnnbflxfgl2xdcsyflnzcyaf582a6eiuytv4rsj7m1kcd5jscwaz76yhf1aj19v2jv1nkjh99q5ph22hz3odj9mo339ycbu5m1szqmitchf0a9uqkutuylgh0wewah4mzqe8t13c766s70b9srg6jy5k62lt3uoc21pci5b56er3lsh6hvuc3n1f16gth86f5vwo4f6szslds0n2w2sn3ohzhrm9spgtts5un4h51dpeyvviirr34a95q167zqnxlf0126og3ks1e35nr8ziil9z1yu4mn52s6p767ypggxq269vyupi81cfkslzic6jiezy332hhydumy9c9ytww8e2u1wv2kjb1k4bjw2j6onwls4bnn0og92obiu0o3b9u11aukf6x3g1d8rwsvyw1ibu18qksjer2u651o56hh9e9vn8m4ioxrjwm71vhpy9dmjgoizbgqgywraz9i787kpt2zz2i5tu2u1pijh5sy818u3a2htx70gnq5rbrwn4m2g24sziv5kjwc0o5catkussee0utwc4nwx82rk9fjjrzafh87p216dz6cmaow2niv4ybah4rz09f3hveeka358zceq7cfr4j7rozlagxhdu4uneamy053mrxh7jg8t37dbpdjmpshwdm2ldg0t9qcqgof81h4fr3slj03fn5yyfhqw0gy3kk34z47ixa6crwbi56kkudckhv39iemeu6iu8s0qtzi6r54t8wob6a8zx5k6fuxxlwzhb46h1ne1d9olxk6hvsxt2vwtuiz48l7yxjd7iiu6aqwuiqyacgatdbm38bdzwclhlnvb9z67ozh74hij6cylkd1890qsb1ln3qcj1fut15tsysldco8t54of1w4lka6te1cr55l0l5q0oj7yva5usxn7ctu6zfcz6clcu7vcf90b8x25yez22ns8xhudgux9ztkoxe7fmacwfw0azh6gmna8w14t2psx5jo365k6tfkcc1ebzgbs2f2sx23a5x46pcor1qiq6nxmrxujvyrvy6p55xna1lofi91elmdegqpdo4a591avv9fjiv31k07hapzmotdpfrwy8ckybvydrnqamncq4ab3o03m69aahqvkxuomve972oo7rwskfn5ak4h9kp197uspen77b8ltpigyu82okmklbfpi5sn4n1x5rxd8jq6adxcxax5jsip5sdew4vv0hq8he38p1bx6qzhqgvu84r5bhygpqina44euco4byit7pp7i5lerw4i7myv46qq9aosp8ojmqhxk4n5dzmim07h6zvf6ng6x4hn099diw3abioggttkmbrqknk2sk10xl2qyc630feppfkqkjqz9a9ny5twmdoztkaa0swp0qx9yupb5jf61fi7n22w7tw7jymp93tv8u6i4urtgqp02raekavqbuhdw4eziggiurltob59us87b2mnt0q9tqpgqm3dpxulki1a4kyl3zcu8a2th5h26cws7wivd0c3wdzk8nd858hublh07a3vk1rcpbd2aeuzvka1dvlvn2162nku65ae3dm97l3hb80indmpno0iavz2pkpvmdx4tjw48p4mt6az3zjrczsj13rm1039g4qab6y7ot8hydadi84yl',
                expiredAccessToken: 2531675705,
                expiredRefreshToken: 8186649846,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'AUTHORIZATION_CODE',
                name: 'bixcdx2hkye4roqewccc4ypcb58enysdtz3sr470hb3d759kxq1m2wrgf6j3ljh23mq0b9wkgx6xlf0l9r4pwrekdim8qt3b963gipyqsh2rntun32lsfum6zbcz8ge5j8ymscmeph3apzjqz64qxlrfygnzhhnlvtxjfvj3z9fmvezltgoeexjrg2pan5q8tuppt4qebsdm88pwsibu8r4qxu2wzluz2wb4wwedquvx61gwmhefpz08qy31wyu',
                secret: 'q2pjl8woigyukt06si6e9c5ke08v8gg2o6rc3hei427ui14tl3ky44jbasw2dm0viity4ejquw5gmqj2ecokepe8jq',
                authUrl: 'q0ll0vqoaemta47btvxlw54t1flsooezazy78q8k6oqduircqck21qkvhd0jzvecnt8ei3kdkk0xoyfc37pd448dhk31kwc3mp8dw2hy67o5kk7fyi1xxn7ihoezwozhs2y002o3cm73t2rvg92d9vi79h57eianqkforb535pxo2u6drwxcc18cwsgs1sb53p3ky4zkpnpoumibszpo4bib5rngfj6la1owzzx83ozefx0xtbwpgyspirb8igzrrwv3s81kod617gfai34lq169q865t05b9kkpqw0r5pu3s0nqsvu2w87l0bx7bckivlnbdmwk1tvhsltrcbwntp3l7lnfqqta9kkg7uipnqnzmxf2zj4ovzyt33xs7mp4pupouz4agut0bvntdhjzpcootrfuhca89oky73dsztdbpzmmubhsamllwy9d1xef80b45wrxxk5nlsr5vqx83e98koit2z7ttvc221w0to4onttalhcp5sb9vra7h4vroe3xm34po8l42zg3ga06t2j49lu983yf94ckfpeo7dqy9lh642fnhfylvpfdd1ylslkrwjvpgafe5qqxox9aoek6bpz36rdl2x23pdas4a8qmvux2yhic1riqyg7aqsh7man16ak29whtfwn27gec8xtp9cszlbdwkz8rp9rpslwcabby9e9bg4a9f82ps3zgcqpuxuvlzj7o7hucf6uxgokgb9n9kvvwkq38byijbd07ezfavx37tbiqn6s52podhlcssm9xcegt978tm4fd94mie3qh8hqfqbm9zj9x4zrr5x4cwpq8nhxhupzbdrsnym29o2bixdii1kbvgvk976sgv3apux61shf7xrmqwa2ckttb0mkp27cni8ja4mr820hpiwjn8i5c5nqfy6magmpyi6aht2q2acqistxl9pa09brsyrznt76ngy12txd4rt6lqy6gw45z8tzynfnk6b49oi84pt2tzptw3g8w7v7ck1ownz7oowvn0l1xrmjxsvfk5lnz5vz5rhlanr8k5q5oqts6qgvw2s84vq9qtf1oydffbwtd0tneesrw30gyy43wdh1d3q5lgqzekfn1m23nnffoo0g9bzfxhes9dqysgoem8vhclmhfbp6fsb61oftd1tbn1sx0n2hlan47vy2vk3e1un9py5otjv0wt6bu8g38ci4nvpxvaunr0xiymmnz1o5w1ug0lkqbu37asw5t84ez2rjg524389knfrvbegdbg9moxpm7vfpnhvqgx6uonub9hx67dpj79kb8n1ftqjq2lc9d5nud2dis35f4mfz187o8x9sq3skntg40v2bi6307tulvigx6eyj2gcqv9r4ifizrllycbl0dp6762k9miuwacvk6kdtdt0529k8mbmgk1q93wrzdytzctgf6wnp4jr8rxmfr4szay6sswq8nu86bwpm0qvzho0u9n0w32a9qnw8n54euews1hmk6azzcf6z8aj1hwvnyog76pqiz5sjlsb9dvbb07vqwb0z17qljsymlvtpgptz8vcq2rk9tz5qs1cragakvxrywvcdvx8x0mi91xc3zej7vevwbu3om2599e4k3rv4mjojgtbxpc9ldrw1rjq0rlxny271hfv0eykl1v0te0pok9r4vr1sus2euicckgsos6729u7lqejnirrlpfvxolnlotoeklbeeyysw7m60fjsak6ue6oyzgcpz2e02hwulvy4dldl3cidc9l6davbnccbhz2wb004at9m45m942pm67fk0t5chc97shm7rpvkwi0c79w9lyks0o7gxsbnwogc4s1k7i120z2kbhse2425njvrj33t9avn69xx117gktna540gbcqhhgyw5jt1jnofl0ag1zbg9x5gan0xf640930653c1gztmq0zt251kpu1jll9av1zqj1ia8dzmcq70m6847jctyxcg0bg13l77ltx2672kc8k2kqtp9e6kv9ftyylfr90fnavdcyc6wdpke3g06h6rvuzmbrqbt3w7',
                redirect: 'axtlpife7a201xi8vx7epucw3n58ktymyghygota8gk2y34ped8balgqq4py0056pef448kw6x06am7jkwbpdazdiuf5pj4v4i7j2jxmrx1lum6u41gzsp3o5roe5au5wri3yalf5wjhqujvwwqt8hgbnknj4uds5h4ykkdni4c8kcuwwpqk729aty2ks9qm8akkf65vnt4fyjggzbu5tabwwgjgxjvdgnk2efvr4vsr6661u7cu2dus9h2lfb6ghp8rqjp3lb2c67elo47kiaivd4d8qfl0ehakbaxa311mpp1nk8jd5lv0zg8i21empbr0fpvlglhi3u60symy0o30lxp6tjtkv9brffmvoxlw0mwdzuvnvjpmzeir8agxyn8iosj9nvbfx7b814mxi6jmb7iak0j0ctko2t6u0x8ac6fxu3zvk5rlib5f128euy9x9895ht918yjbd07nzscfg8wv4rluododhps3e4cs4gy2hyq6tktdzunv1r8adpuvmykturodn9335yot3qwxshnmbzi1juxwheepmb3xojzbxg9kc4fv5vgsmlu6w8f9d1xmzdn1f9pwi84qvgl8evptbowet0t3uuwovv7z2rdjup4nlj13mkct1cjpc5lczc4ync86392ttos771jzwpd6odxp1xw2cn5kmq6ao15xitdzt35t8r8u0c5gdd7hzeyjmdtnk2nxzbmwzn9vwl2vhfiv9m96xi4eoaw7cqjmcdd71338folaibzv23krkmtagmx1hbc2hclgb8v725l48s3j6k1s9wawksuh0ogbk1doag09lb9xmka3cac964fkhknwmgt2kmj7ulbrdcavznjvl0m3pc5qwatfz8g5vb6w7724unlxpnf20sox8tqyhewil9slrhwgvgvkbyjj1sfr9aogqvm74ydaw0pgkzurokkivr8msw03c0lj431ohblyf8zzkyv9p2fx8cgclequ0ynor8zb31lpt35e2eu9pneybd28bi2qlktk9rg280khhz05cyvruo4d7gry47liv63pqazlreoasvwtxjid8rzqhked5f5kgalmz2dd547fptbcudkg60n0swyxv3mzka9l8sdbgixvbtuhk19l5r2ymdo1rwbntiucatvelyh9ed5nzws7lo9lpdsfz1t4q2rwmmco7zrvrt2xk8kxdhm8lyuydk8ehtyx44dbj55we86zvgpdn3jhcgcqt8abhbrnqenzlwscv6d7ma8rq5dnaattck2vxvjxkesg8p6zbgnpkw0tcbbfm31f5yswavj6j7u789zjbidvw41eb98l000ev49v0ps2tora4fij7wkzmgj6y7jjoe6ex9pcoad2xh3kcmv3h97pprug8b46cfeqx9ej4xprd3zibm7xoe3i73v4624fr2utqeykhnpnikd59hpjs92v5jvn9whm1ewnxn6tcyjk5455y5jqb7szqltk1ckqoo9uvpql0q39vgttrel25518ut2p721vwfqfjhvybeghxomeiroj617pt94scq31xwsl4aw6umta8m1av53080qvuxvv0oujbxmb59xtorecvon10xipusmhdeuhq5suhrqjnmzg5fwvxq4zrpcwc9zlu5h44m4npevyxq2cwf89i21ror0snvwhbjyixnx9ijqnjoxbc6c474fkc2f6ni1ldplnq7narwflkzto46lid2hzixnr3ggfqrrmojdrp2ft19umkqzwfesrels0yquoru7y8hwb6su74omizptxovn0z98mgt0r0b0yleopo8flttcsqmt1fzd3z7a8plr93nej9qyepcg4urlu6r4u0bcfxi8nnneqamq6gcqjyqspfet0fvwikgga9y8ack3annvfoq0n3meir6icmj58xdbvnbk7fijeqzvfj6p2geuslp5fdytxgztnyyavslqihfv82b97jozupxfzvylqq3psjcgysfz8pry7z9ep0i1ek50wyn3wdzduo9jv6zzenzvce8fj3oryzclj',
                expiredAccessToken: 6504754171,
                expiredRefreshToken: 8375730098,
                isActive: true,
                
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
                id: 'tt64kbdcl28qfi7xvhcimydfbab5hsa5isku2',
                grantType: 'AUTHORIZATION_CODE',
                name: 'i3egzz69jg6pafykgc0kyfp5q578fipbxm3z0q8rto3a8fh7ka5x78wfgnnqrdrgcl6tcycw34dkp6z1fe5tsvps5ymecm9w06toaw6avx6rvjhmabsb1zkouuieihiasma47zwguhdaui5cs5bt7vbvv4vfy52444j1o3z279sr37rbo0e5zaakeadw5gyr1pqkmpo6ygpjkoaqgc34tcs2nj3nkcmvrugpgorzlyyqoabc9bny3aw40rz02l8',
                secret: 'ajxrhqksh1n03ypheja5hrngnexbo9sz579g7s0rlazzroz3p17z1asorq0exk538n99gmtc27liialrthwe7nakyt',
                authUrl: '94g9dzfh142x0hwfs9dtyjvcvr2nb85xqdzisvoyr8brdrzylxwms3euhcj0ouqwzfr9grvuoidcx7heinqnqsoi5v2q8e220uh3or0ivea0i80s1g4k1fnc43hdkr0fvsmctbpriaetds68ne2b1rploqz7jsu3ysttqsh62faq0it5fhtpmdcqg5g48woapmfnnrjah1ynxfdbhsijdijryquhrp9ljjwka9u428d71czhoiv1iuftco5qk4jnhv1rbbyallnbq6llwcry7db2nn6od37kfsg7spyx100ep0xavyqwt5ll4jm3tbspu8ubsk9bzzlxvoyflgebxm2s8mxkt7udu2voooehjj770reudc1ykc0zlucra47gzxvr6xjv6f4xrsgbz5vmqgniwhg05qq787iaepc89nnthbe90d5i8l9v7vy5sgfimlva8b8984jpqykqfsqpsjs9ejlcn8ezk9np2pllb7r083yvzdxdlhc98y30i0b75gvtxzslu1sgc15g00h2sc6m35cpb19g6q72olxw22b81939zuwz2hsfi3hq9pozkt0552zark75vc1epbt5vo1u3vhormkmm0q8ayxkf4y3cdsc5jm0052m8t3jwm8bqljk4wsloujg8leqipvz45mywxxwbwbrbfvcjgy74rz2op02jln2p5pc3vd1fuvna5p4ibmwmzqn8l8r27u5zmqhydc237fsjzbqofmvwvn20eotwrbm11u1sgjdbco0een8y6652yx4cnf7dr89rdp2ho8gt3i267q2jcge610w68ncby4zqt1c29zwt64w1m1r18rvac0x9iw2wh04wfbbzjx8nwiv7ylttrgl8bxc6j7n4zoy4rdgih73xq757grn1686mp9gk0q5dj7us933fp6jng10cof0cbzo8wrat9ri5805lco3erbtql7ns53m47oyolb9jg9kehgp5pq8o8hk6dwbulw0p7iqx8hks4qb2rt6wvurqxnciqzsdhyhl2s1ox811rm23tqs3qab98972nitienzz40jiy0z0owiq8ac8affx68lasllb0ly22s7r2vvgtcmfu2q8b3mh34kqc2cx2jrwmc5mebvt6p0l6mq43459de894kjhwgnk00byb226puxta4l8k359zxo4zuzevzx76rkat0udur3kolwk4bbqaxc9s4ahtblf1p2t9bp11zs1113h52ck1uawzqi86c9qqcu8fru37qh3ssmv4buvraxb92zg4qvn2kqhd3gkzdn5sxw4rpfcyog61g8hc1rlxmx15kcurc5yt7e3t4qtb0z1mgmcbj4b96sb33rn7evck6jjw4ter1gm30vk7zzori7hecf83dp273585a1liqs4xqyherskfee8vbfqmakxs429f0f2h4p46cdaycqiuychsn23kyn2euxg0bo8ny382y2of829okb8jl65ho95ytvbfu4n6e2qv2czvrhoffku50nxv52iw2ogfpequwxu3vfwnmllr1hhxy3ggkpp5xqd9gwmlooqrbumkxuu2t9zgrghzp3zq268e4kymuuoum31atopxvvu41bkau9trjf9dmd0kdl62fow838w4bv7b2wqsbpxfsy5lf0j1m9bfaf7gderaxttqmuchosdmn4iqjb1i837wamp33iip79xxoznh66zq7o0qiikggxqmv9fg0gavdei07jmrvg9a8kkc6fovwx8z41wokb9bhq8k0tjl6vvyzw23xo2xkd1fnv2blfjiftivr39vttrhrs0emwwzrwkjym65k62f3nwvm65pccxfonmsnvfcwtanj3mz2taiqexvvq5e59k6k4uxulrus4ua6v8lo8z2xchhq07tc7nm615berk49ewazyb12b8zn7xjn5j61ndvhtvbmyhisowv4fxjh25upne3yucy4hf27g4zadls9ms8sp4sj5ku2872s0af436wq3w9r39t3ehlw6olqjb7pvx9icdedlqqr3vtnk6ee9bpn3',
                redirect: 'tm92b1t0uknip2atvtucvhduakudb2fauao0yczyi06clk1pr1mym8bio2ww0f8zv9a5xxidvh1mgb6wb0saoecnmg6sl158vjfrg5hizz82bgq165wtdupbq3dhm7pwdpz3n41dzbbhbrakou5aobaj058c6wsmw8o1iqvyq2mczwm5228cttdnnfe9tqnnkjqd5c9nxn5vbjgsepnnza11o9qgt9c5ek7nxsku91m69wll5e0dm7yxdus29qq0524fxy2sb39qyyiewm7vpd15d9knn072n8b3s81vklxqzi3s0xzfev8bpxyqt37kxkdp93csq253z1uyxzknai9fu5fzcnwix3p9n6x2an2km6ub2qbymygnu92k8kfvgzmxme8l9md638pok7dom573f8soghi95wyk76r3bywopkfogxo147v0m5z4qb3lb0k3rgts0vve3bt8voimvtinww0gptgfiwua603n44qejp131sjr9fhw5v80yi2tu6pl2ve40ls51jxiipe98aibp1i0plbwci1pxrf3prgzsxgedf4mpi7py4u18wm05jy7n8vgxgc90fq2esxbgz57hetjylajmmh5zeahglbormnl1eqewt9e5zajbhikdn1mo5ez594teb9fvqywmg17ktlf5fioj0bbpdonrhl3isz1vstri855kjzaw9wh0aoe8ej3jbvvry9y4b0nqepg03ipa5mwppnnfnsvcddorf2h6i9fgt8552tpqjh50g29bc9n6vhpwk69jiktvrw4dh6mmru2h8i9wsn1zxuknr8eium7zebw1paeyekxofldpvw9qn23op0hy9aju6525xvrml3xhdrttyorvygr4dzw334kpswn2vktoldmk3b8e56oax9gq4t7skru8tajrhf945d2guo15wfjtlelvv7xbi5qz963vb8vbysdg0yda8kef73mqy5rf6lies4tcv5l0xt8075yiqxvm1a0172oomlxxz4kft0u3qx8xc6c7c70wp96xwfb1b1njomuw4aczcf6wzd75py5awdz8eaugkwycdwhllhscvd1ydabbb29qvs8d00y2dcalbtybpvew2waihk3ckkted5772i3lougyz537yaj078mnhd27wwqgmnudk7m09t5d0n5xhnjra9whj3d0dc3t9z8irzxp29q3h0w6gbudwxkmq4bt8k7n1meyowfl669e14icw5l5unj39buz2ozza588gmelev1ylv9n9j78e7k3rh01c3lq02g180bjfdgeqqc6xjk3u71zx7dm1htdsiqb24dh3bntmlk353yezlj8irm9mripnjl8sumopx35qihr6cjm8spp4f2upwfzhwmef5z5jg7yonz15lb0o9fbgcaraaec4p7t8xuqyvaqw45gg7s41ezxzwtitv5zcjmclujhp3rmr9kkzvnwh1piefu29jlxqoamtqu423565hrpmaoghu78lz76f43y4op0ljayu323dxam24nute6pdznothgcei57nttdrbkvz89r58d8en6402e2aumwfc1uu191xjiq9fi01p93sslbnred7yngasw577ogrl4a7yhyi034850qwupzpr0nuqix0f3rchf5yu172oq03kp1mogrwq1j04901r64x8n9rg07tmpmg06b6zq9nj1jr8a8rbgnknh9jm4vh29vt5ykdcgy8749of75bs5wd50krlebeyku40o1miqg7flj1rkap5pflb6m5vckvlmtlpma7gkdnq1azp9fyascwtx93u0jfes4pc3s9p9iesb22xkbw1pxeecqxm6ocm62tqc0ik9xnlqtm7tprs00vi2yk8zed3dl3ue3a3ffwlb6rscjjy8y8vv4j7p2xgg0nlot87br2nfys6vaotdinl5rtzqh3zwqti7twm8zhpmayg0qsnijw7xxfxc5lmsublocq04niysm5hmybh1lxed1gzs59uauu12xltput9mgfl8ejw97t0nnreo933rfw6o',
                expiredAccessToken: 1803667888,
                expiredRefreshToken: 7334731023,
                isActive: false,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'AUTHORIZATION_CODE',
                name: '3eejcxkmgiet6d0uwt77yjbpsknqje7vr8q3u3bs98nrsgg086uk1c2bvyzy9lg2u1fwpw2phxc1i0655trm9qvensjz01s7zkta7ghpz0yfszou7gatc9jdrtsupii9zy3qidjp8pujxcrka6312weyhs3zf3byziivja4zcgydc8ziwr7nqwixdwz33ly2u0lm4yco0q6nki2y42j9n3til97hhgmubrw4edu0ayy3fr8m8sactngpb00rsec1',
                secret: '2gaaawy9yzvylpd692bei350h4rrodi8e6mjf52h374qi03rj58i6snzjmjvzivf3ojvqniieoxj4iklxp3z92qx1t',
                authUrl: '1zqgtfr7qwu5rgdfx3nb6yuaarpjh2s4zxpzmvqwwa69ss7wa7itp47sa885kxfucljsmbqlysqph3lz44nre8f6psnaqpzrhs5rdep0rum407453obxri4cxe7iv9quu79s41krohuvhn5c86be1tphejf52ykulb1mvrxmf5955j6mkeoakimvsqajapduw8ajoacbezt2mr3nhw69c0l8sebx8424rx3sxs1rdbkw7lkeftgxmwakuaiey4bdpec9se4ikhg064iofy1933yasq4g7v5v1dijuhckuwieib0at1mu8cvdbt9ws3u7pdakh0yirbc8us331p0c1qjag9jxzw4myrl2ssvtqcyuzjlb6id8peq1wuwwq9ycmb291vqar2l72xg36xhtdfi72hysdrvyg5jnpmrs1lz4hfh5h3k6c0a3vd6etu87rea5kcn0lfbvt4a2th8lxsti2e4fhhd2qavg3fzryh8m4glonu03smfdbafxw94krn7nk6d2sgglmefkh519m1dixnif513i5getbs9a3siu5bzrse2mb65ad6ebh2c1650opengws5o11jxdv001ryatu7iawpiq0mqmvw4h7ol2r90xxsc2ue84dvnpld27hfd33hjde1kq7jgnj438uqld1jmf0c99yerub6rdz3s3ixtshqykoyz5r4y5vgj58mhhv9duhnsfm7o56gxr1i2edh7mjti1pcc8tefm38eh3jojw14dneu7sap1f10a1imzy198q5wn2zcbsjivdi7pp2mzgue2au2jljpgc5kw7lmp1ncvlne2g0jph5l31n4ooxmetuqegut7qqiwt4li06i2l7yc4uo60b62u0hncsrfylzqjd86a4vrwzug1rc938clspm6j9b0adosle7ivrfha3gher5xuxawndlxaagb1pkj0w64uurt3svnprec8bf8ihkco94jwe9si1z986ktby92hzmald9pift3bzkadvsjjsmstiz16a6fqlti9lh0vm80h3o876663twlrbv0p181l9hbs3f9s0ggjo0hq0dx3sb4pldc4lrh3w3v98uthz0mfglfl4dm0ir3ie8xmjzdfkboasavrudr9n7jbz080irzzsk6yjuwz90ywcbifucf978vbqqvwb3krciwv1agh9rbcefkgxug4i9jb6ne6k7uk586d4w2h70529b737ds1zyl56911gq6fkwzy3gt580zrkxnmihg4g7do1gid1awsylcf36lld7exk29evkgnj897vfz6ygnz8tvk730jxz5polr19gzroa1bp7qomwm23vto7ryjsqj6jud7i9fa7i34pl693ewso16x0xv87c7xg1app8i9lo9jo60r7cqj87edskv8u5mrz5ndkysks6s5vrfpf08zzxn27c64zm9tsbtqi232hq1ouqjxigidezr5n54yfle32rlv52acblhqzxl5le1tps8cvjabif6izxrgpq0bsjm6vyxjtyeabyywp00knplwk5hfd2bcg6if64byyuxbn3xkgiqlzisb9j1b0enfkhf5vi6hg8jroiwczukhfg0blx0vc1829psqnovplm25semavprdyx3fjw4cb389wk5b69dejilgkt49thqen4t7c1l9yyrb19wx1ybguup8w0rty1fvdfb6miha3txmfqc9qplxxowfu9q6jfuapixmzawrfpsbx3fmha11ffkqddoib15puqnj5yusv90906pd37s1gcd1gqtvnnq2icsiqwa9cu80dak3o9x87ccsc9m3v75pixnsrzb4v2fpbslks8r8rgur6ixtgerb85qea6j7u71nk54yimtyebhtgz8viht5hlvd1oz5ayg25vw6h616ghmjgtj8t5vza99ejb2o8yskr2yxpdtmws9n9qkc88zbosloxw1ske0giy69c1j1uihpv90csxj4i08ejwn4ze3yca1cib3dapk2rl52bukhra71prevlinl1ca9j95mb98mc20btq',
                redirect: 'qlnpautnpmyqnf5p3mpjtt19by749lu9ghplf1v0yx682qhz9e3zfm4fsedkdvne1dhav2svm7uwyrf14cdz0gkki2m8ub58jghl9epxpuv4ai4t5qbre2iirkj7iu69p1fk59mayf7qiuy84bzlcmf4t2j3uc0rl9a9axeqdpi6ctgw0odoj3tvjkbez9xta82rharg9qkbnvx3b9pcqwiq4sot0zzfrt4keo11x2sh1wkhhuw0hz7o26uyju99mb5779h3s2qw89bk36ft1drmpy4gu1nsrp4aa3i2ugj6nxx5g4f09dfwthfsxv3cknk8q7amga6185vv883fvd4ox4wt253iuo05qu26a08yojuv0451x2g3aa7ha10wi205cm0i56vxkfojyqnxo6ul7k7vvk18hktmrwrp17osx8cwkzuudjj8y34aq0l5avd3ve7427jdui4vz3edz86x33l9utp4knh8ls85hvjcl64zg8ppmrlcbvrbo4306pijs25vh9pggne5swkuwix4s2223qdmogbtw16pu6mz212y4neralp7dulqwo6w3xvl0padjbujy0c2izk3ppiw0qntg7akpudh2fwqxw5jby04bu2s0ydap2zxfxow4v6gws4ui0kd1lx92llmonr1m3cnzkqghsfw3mf8pf309tt64j9cuiwz524lrlvfbvokhj0cs2gs4gvhh1zy348yrl312rrqm5uz1fy4jov0r3pyhrpeh2peem1jpylg98s7z3mgk9gpwidlrvgv96fqy8bjze6vnedz48bihyixxdxvqvo0kugwhws4x9vyekqs9sgbfby1sevvqf88v4ufqb9crsiobb7nhg6lguicvc9i83ehc5x8kdvfh15lbwky8fd5gs68l1a6gzyo82hcq99m0ep3ugt6labv6f96t6976odvnb407ia23bbanjdx3oldj67jhoeirdqdji2iuvn33z02sf1psgwgghoyqf9z6b1hw4qzy6zq86rnrq9p0yakazudlnidhpvt4iju2n8qgclr5mn8zms2rjiqo94we3hz0ho8tvaz33e3xku55yzf8tqlp7m8z6ti371lve518eammx2m79ugbfm8wzfok5d08j6nz6iwqcmum4yhpti1h4bpr3zdu6dv5s46ytxgc3rwzcj7q3kp1i39dujsobq72tk4pk9s541xv8f7hn64cbfxwdy89qipdgf3209aepbrucek412wim8ftdw9blc4fc2kvuvyfggsa9yos6rqjriek8rn7l03z0saqie3qsx37012a75jgeji8uuus35m6rkbhtmhewlkmms2hy1vyqkn07qv2rhuacsic0zsz7fpfksby965du1wft159ev5c8prce7j1c04jxn9s18akjwr3i15w2g2vxcwixjf97qx7odndoamxnhjq9l9g9cfmp1yapq0ckr2ne6vzzi11k8kc52mm2tt57ktzgao3yau0pkj4mco4v1fqtn0imxj1nppmo1vbixk2a0slhwkvw3k43z5nwxajhi96peueqoej4c3gxkxmq67tyqzi0p0fjdk5cuh0dbrli8ubqa6zim6jk7c06hnbcqh9wzmx5q6tnr6276vlvp1uc573zm77swsjs8sd4wnv9nfo5hsc54su0mpp1milffv2c0q0bpc1vau6hd2gu2rchhd3bo5xf83r1e8p0t8lsikknkdp5nv0w7b7pp5pwe5tynt8ogbunpaond71y28n0wlfc0cb522vmjt5sq75hi9k6md7f0az1yab0ay2wziqq3vl48dqzuu96jm4b1f98m620g3j2nvagebg8wk0v65ttyrqvk4iw1gj4lxaxmpfvjjg06xurghur4bqrz44sdqwd18qpjaa0kjpet0liipzxf1vb7wuoy8g22163iw3qz30fu58p0em3gdi3p2svjmzi96l1fqgu880q5cpqiy6uxunfp9c4nxqyht62qq7vifs0aan9xhhp1m2abrpozu3lwz6766nhjv8zeq',
                expiredAccessToken: 8188766974,
                expiredRefreshToken: 1754531328,
                isActive: false,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'AUTHORIZATION_CODE',
                name: 'gnx05mci89go5hr3en3w6hj8lhwnpnnsa1s5ezayhhn804fufsl30cpeegm8hhrr30va86et9phh939ou6lfpwizp2nupli1jb7j7hsyaqhxv4pvhuoitd6poh1eajo4boubkk7vaqt5ol6rnlahyza9iho2frykcdmje6b382z10u4njns3iblfjvjjoa1vjryeomxun1ixnrik56cbpr9hc471vbho74x67bnyoktj7ej22bp2aab18wyfurm',
                secret: 'vwlkrzfh1bigwqyfx14b1hu2st6lgk3q5z2mlshhw2urr7g7dle6sqiey96sca88ubhy76tzs0dmslk9abbq5asta38',
                authUrl: 'jy0xp0b911kjehe47jd4mjyoq741ikhv548p67vmvjy20frsktnjaxqa7x7c4tf3uyn88e8bztxmgg15wp83pgkjnz1vxajhx8yp8ny4ehms0ab5oj507lmojni08o1a6fcj9jrxu2ozfgqe09juxmeaw980ge0kkk5atzyu24wklvuyjascbi13r1gzko7jnx2t6w6q0awmqvp6ujrvce7c5duzke4lapxmnkkau2tusjcwtz8zxnpmo2jjlm4055ictvsdzh8qy0hq33algh0b6wmippidcxhqwqt0wlau08754pmsei423ytmzwicrmuf250i5f1l01e0na8x6nk5q2ty1yap6qes4pafnfln4rkn1ml2cjb5a932isw577yx6ol6ndlwvtq0yh8l4v6929236g1hvo5k3wet32v33ly42r0tzoxxj5ql9e4oisxv2r9axeeecbc1jwhg5bti4egu5z59f1k4psag3hee3kvq0rp79v9j7gwx5gmb9rox4jb55oijp103s0kdbsf0l3s3232ebd9q0beismq3ww6rvj696eopsev6vsgs8mlic3esayqyydh4lylsvcjdarf71law6mlet7zshnpdz2o7mzad99yhlxoitss9iwhw1e8migs51r56aw07aupqwtvhbat483rp1kwuis2f9dpb30mi6tgm39hqv5uszqkzt9ec9kss9bfzi4rakevoor0h6geb42xfk4psamq0tyzniwdor6qeldlhy79daq3gq8ep7eneqio6t0d2vqd7ln4kbxmlwu6d0uz7ga3p2w8ysx96nug5arx2tg6xu00x40xirj6phiegm5ld62j39267oqvm10po6djmjqklq3y63bqf6ydog9w6lgaj32odc1hcnm49vd7le8yuyrf9oejwgza1bdczjsqzmb1u9ledz35c9v3vwtw8seqrm6c51r94f6c8n6k90sshqrkpeyd0eqii8khvsahbffh6o010zvcon6pqlf8g6yluj7qbku6mhbdhk09dtwh5tadagppp2cah4mmboypklyzs0uqy5eo8oph3144tpg65s37j7b1k4hc12pgmaynv44nrws9i3pgvr81by900nwjh0ax2lswwucw16n8siaxhnrqzwb37ys3s2oyxla9u06u3drjbmm9dazqz2a01ae36ogma87abepwny44z8f7uszjfnmswdbkyajmnflp5h7k7agba23q73ggc3qrg68t9gm0qzamvxxirl6oue1zuchsn37vrmuyq10xrsyqo1vu41j1rm12tyawny8yg0mjef3uzj9k0piay4j29r7pwbnflcffrcmpq7n8622sju1l2iqvmtueg6tnkbd9ede8sse78ol971y3blwv92hciyafhp8gvc8npxbz1kf9hj1u229hdcuca04oh8zcobfzlp634nc8cxykorv4ag66415nnx0bcxuesr3od5klv7tz3zli3ioloeank1a3dny008sccutqav9m0zp6xnb7yqx2pvkydc8ym98t0ihewpixtz3luqeveic9bnsccij8nyv4yad8kspsrkjd9cq7t699cgqao3lhvb2vu9nvwzr1g9nevkz5pzvfviifln5zt3x0e2a6zklbwvm9pb3j00vurpfv1khfi5zoqv2bi2mcwze8ah7m9c1918l6trusabdpzuzqsk9vyoc80vr2ltrfem6b3jgdrbrt9bdka27acqj0rhqlowr6k2t4bm519mxiv4m3loeh3uj40ih8lg2b5y3dlqrhplotvzzv54l9nf928wk7b1cj43o1kmk88e5jp2862jvbyryb6me1q9xir4dwm86851o8zio9gfvascsnnsmz63iaakfij3nkdne2d33fi6zz9paganf0hrt2gkrskrhwxmno9hzryxxc01n0dv41pruhmofgc333812p90chv4h3oxwdsswd8ofb5tkfh0yzfrkgf47ciglfif8kev3czmrxp4ckh12cpmgqqrkmd0pb27pk46fx3',
                redirect: 'av7hiygow7dq5z4g2zj2wb2w8e11oyqr4h976kj8suqlw0domyanrod1twkpmdn0hogpdg6j23j0u28vgnf179lexlwyk1kfyf0s84pucjzk3ym53y86mc867nny1xogvijvanmzvjvrqzzy0kjrvgqu9qlf33icg7zwahrhwmq8g2dodrysbmbhslc6kvrf1h17ye50hno3s7gm21dcvljdo6lynylx6mwvzng5oq7nvab2sq4hco28cxxf2xe2dvrhpsa2zj22ddp118znqc5ceh38ucvhs3spsfa8hbu1b1wk56olgdwnxymyk6th5ysmvz8npytfe8o3gqpifzytxxa763mkspqeqiyph85dauezlojbpz55thyub9v0fnzn3jjh0nqj9leczsa0ckz9ohds40fkd6uwptnf6gmps5lioa2ydkxt7z1uwdlsg62zlslmuiv4pdd01x2nah4sz6eyks11nu6yj9dvnfd5zs8xuugltnit765kwb93q7y0fj9tm9ddtfbvv6ss7ysnr9g1a1w7wydxsqnhojdvkgtwcc338eiv54ticjly8jib5xecaie5rlx9s56s3khow9dzytggwlc51kglhgv60fzlka7jwgd325uydruv4ujq5zuzsvdeus12tc3a7ke54ygdq2p7g9xq9wo0ycquibwmsuuzdeqg6oo4kf66mdc6rzol671q5sznsknrzd4tanr2qjextlt60s5p16gr6ropk9691k5wanzvaj31pld9bnrkuxhjjuh2d263tsza2rwx6cbjcla91vqkpkla41i91jik7fpm84o6dw3r5vdwf8js2nhron0z6w84ujbbis0w2s657fhjtsh75rki56z94xehfac78chdlyhvg3vs5mo4eerye3flkx318w2ogrn3rk3yhkiumokaea9vb7yswzdxgggbm1cuha7r6900ybd86d4ztxhlj0s7f3lvqfdpryp8wsgx6qa3mk247luoqqmfah9i1munb3euzawgb2qyz3rw0ipmxbnk536wbapgv3arjxgakvzvzi718cugul2wwotszxa603f4he7fkjymocnmmda1u7jlav4wdl4n4yygaozcba21w5w3g2ger4kfxw9k1j8pk7xlog5q4w3kfhm91oh3vuiburiopv94y6zpvhmx6mwmej4hfrg67s6an12gz55ljtqpo4behr031ob34rokc6jpt26c18nli3uja9tm9b0l89pek6r69qmul5tot4kgxvd981wzuly6d73km7qp50z6yve0t40va6v74gkp8jl028039vhqfluwpaeohp81np00huylub3lqr4ij2hnej88n0iv00zsnpspuqfgzopsj9q9aavydqkz3o6zyg08vgnh6z4lrq43mqw2v08dxrtvslflw8vb35h39wnzj5n29zyp5yo8061ootck9wp5trn6t4o2yb2ivpb6107yf7jzvibx80pwhwrq5dshwgv3qhhyi8mc8nb198e6qx5iua1i2e2j1g1y5kairkgb1y2h7wxikgs6g473k54y2qa2v2goln24cv1t9p252z1661857k1ecsnfvv9ugch9d64p4o8xs1k18ag5d1vp79clmhsklygg8lastz3n5e7npw6jj63w9ympxho06u9ea4ihekiktnyoygymfyjul9o7kuelfclvct9tknttz28k42u2l5uaxonycrfniggbnb3jusomppd0pznvcb48afzyn09hm2syviwiruq92mh8f4ogv4di2npgtmqfp2qa4ghlik27bxl7itjsat6hu0nxxw774gn9p92olaqoque25odhj8yq14x7khqp1fc5zk8fu5kg65scvcwpbuc9txl7mm6u1oms3php7aixpig2hqpgfxurvrb0u69m058eiuty05qatltz432hqgpdn1qk98lo10pziz0e1gn89n8ipvrank7kge88ezyuwuirzwwqh4h49uvdnex8dd3gab28qrm5z5o0jtd7w1qneo8u98ab',
                expiredAccessToken: 2765361511,
                expiredRefreshToken: 4643779016,
                isActive: false,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'AUTHORIZATION_CODE',
                name: 'uaerg7njuxopb0dp979ijivon7872wwmykjp7wrsnnc13to6n0aaf38judass5qhf1gi5gyetgy64lyvra4g4fe3pcjxbbr0je8j3nsxwoqmihhg57ozusshxyrjsiyktp1g0urs2e6jlf4j6succ6hdn2rt4a57xry9jogsv9o8lvc6jwfw22bg4xtsxcbpeuellsx948hhpqgk3wsxip98aqczmq2z6npvu9o0r5xg85jazi4sgrp6h8stety',
                secret: '75fguio4dy36pfd11w17ga1s5mjhya8kjbgb6bktyfb9bhhho8h5t4b45vb6is1vytwwgj6u47qbw1n2c2f0vtxp58',
                authUrl: 'x8323je6x7c4lwfn2kuv8mj7ospoal2j6yw447w10ja0448mxlzx976bm3o40csb22ot2vlhkbl13tawhdhocjbymblh9qjrcbasua5elce0nvgt4ad6e4gfmk7c2teltccywntfm56xz2tsy03lswymagb562vrrcxnf7676zb18a1vamuy3o6tp9t99igr8y8lwklp3ron92mo6ymjfglwpt7xd5nniyzd4hw7950prfxmzm6060kp9j404dolcq3vh0nl18l7wn1ypqcd95onn6ao1ldm8rtcax0i1igwb5r14xmi4z8td6dqme08vi32iprc6cukpf0ye08r3v0pxo67noen0a90z702ax2joxntvi7jcdl1k26s50dgdwj88ncs9d8zg9z3k4ql77igsp10i0z5arenymigdcpuydj243o30xx1vsr9n1zr7oc4hy5ihuj471yzi61n0rcc0uitqsx5nqhl9yg8f4w8w03lylefyqxc5il2ulvsy6litxkwuxzlho0lgsycnbq5nooqyyqczqa7jbgypohxll00wiwlxyso0n29wtihxuv12i3te9l8whgw3e43etu6czb9puod0d2hu1jff77b6z7dk7n105mh4et01m8iahzm2zcze1hv0yrmk4m1os54z1kc53kbntyrxx9sk96zvpic4ohp4clcwzbtue1wxslckbwv7qj4273bs8zlivdcbradn1sp2be1b59gvt0il05iuobqp5n6zvbmfnxipzqyfs77c9f21j4okfd8bl6kzrjgi537bk9ogvsrnx5cvtn17k0ihbmf5t0ckws96c57w4n906p79xrlozwwy6rn1crt4uub7gfjc1zdtvkokcbhf1qygiwz94ust9qc5mveiydi0wcn8rhtl97v1l0i85xtfzs032ek6tl2ktqbtaryu569j7h0j9b5reicsk2j5dd6qad8m85zl6aa5hzunhjov9iz14h44qgk8c57vud6zea2sm4a7zwmrjtcy0rgk6q4qysgd5sqlirm5vfo94k1cv97mx5b6i4kpdkdwbeq9ghgvjxxkgbs29ej4semda1yw05frf585cne0sh65f1mf1g9nrskuymn3o0fnhezml0hvtkr2cn83ch52f9uopl6q9jqnm5ookukw11abp7gcyns5tnwqy43qi5sowt4bigz8dd4ghwkuqeka32p8mnl3s2vcwd0dsbj7kldx3jhq17iwqn6frjvwpv2dboxskuuejy4o19z8m1z51e5erme8z3v37jzr7c0ssmhwc5eypm0uy2n2aa6edq5bmt4afj5n25bzjhjnmyyekb7chom6pvfs7zhixep4x2v3a14clcp7e9elmoqg6kiaynrcb8xi1ak4o549mojed0t4663l123qe1cjy44equo42dw8lxc3z7qq4otj121clbz7ppv0atzduzjldus65ym0uknh8c2mpfoyg0rlnrp9rpehq0ft2ujjbqe6m9ts9dmxq1hwj24svvewf92n0ke1pcbmd9a2246mjlnfx3hwox4bpf26spykb00trjxwq3mlge9g1uta3nqjhctlwaxzbee98h8e1nnx68jp4r16r04jv8ne7v3dbbo7mdxch9flsf504w28vgg1lck6f2grxw17sb2hczrdygsmrjpre81f9bzk2myz9kuezgy8atkblu27xwynh6fygixqc0y5vdhnrjgmeyc0qw1rjbcntygb5pabe93v6z1bmqg5j20l49ndn93bcudbj1eoaewa78feo9a7389a0t3wyy5jevlcs0tn798rhwr86i1yme0dpa28j315zdq83z81bxyiwzac90ftquip7wqnf48u7adbpbgxst0l9n79oqcqmjhhpbrs6pd9blcmi89urv434nfmujy6n0u675l8kkqstu3fn1tr71j1eodiv3k7s16bxb8vhcw7r9bh2k78292zq2d13e20ex7sn2aqtph9wzxfn1ymv8jkgiexofi01xmevz5hd45qwkl48iji',
                redirect: '4kzqhe839nfbmsik8g82sn2xbhtoya54dqmvje7lksjjmwdunqcm60ii5pnqp72w0349vinpia64814ec8yucfc0yzee5mevbrr2vs4bwqdcbkckb6wd5rivg30q8wq81tunldm6ytavl465etdh2zfn2hfvkhv7j4jii7t3e99l6h6rl2eezsx6uucwh3p4hyxsnjr1ovhmhxs24i4vt1cvboo0jjp0hasj5b82ih04pyfac7vhulbapfi6lbrolq7kz5behjw8hndqzmda6k1lgnbcsz3o78b9dg6395f1zrqtxdic2bfyg2azl6rumdhpcllfmsc7wc4pm7wlkbtogidogcza8wfsovh6n23ah3962hvqy2qui7qn0jkrh3vnlebnqlrz77zrxq5lnhyx6fgatdcojzvfw3uiggtz31thdqd8ar0l3zc8bfltaaki7p9w5uadu37r4xn18g3y351cjxlb970ro3nmwq2jr6xc5h84gjlty571b78dc6u3zntry2s99nc7egcam5xji2jw0sf93fwf22z5p5q529j4debbb2wp1f61msl47xbfsjs26cy80kipie9ts2zbw16ydgal1di30b5jecef05snhw0gen9hfpayzqsrhnj2uriy6k5ivwyhr44tejfe50sadcvrejgkbpym9gxacyjrv3oqguapd0xlw3tf4lm40g7g3y21lihsab0t2o1m86rvft3n212j5luoio6u5349ubildzjvsznkqqj96gl3vsi5qo4lvl327y4t6xvkrf6pxm162hkg17scel5pzilpnb39hh9k48m57dbmx45507caqh26e4r8symresdiyy72n5yz7drmdc8vrcr6q5h7v57dy4uwmtu20smuxo14fvbiqkvw65rf7ama3phg3czcdmll0htgqcn00a1bin75lnk36w77dk9d55q8zpp5yjmwfca2whoimrjn7frykzd7e7uqsxevkk6w1zjzal26fk764a683hady59xr10iq463gip0a40zq0y2ecj3hbayk64pw0vjtyj391y2qrd6qw5rcw2f4s5ae0ell4yvep5jmli67hts0jpw4e02upuivjc0y2sa66cyxev4ff2oo7hw0hcwdmnp83ixlwvbdmm2tyqe77jf4oguk9pjxqnglbdrzp1uqgb5uwiualdsc0cdt2aac2ue3vaxpi46r1co8ih2oycebt8iev124m5qs3mz64yy61lwyj7fek1o5fqoc9x0x028kw7w6746jy5mlacsejxk2gucb2d8x5d7mbqo84lclm5pudjfqc3p49tmwrnzub8bu3rdgxr432f9d764ycxlma7xrywczp9uo7d4pmnw0walqqs2kxarnjzy0cxj4fv6dhq0v1j182cesy4tg7264o5s5uxkdb3emy6mfrvdd9sto58oqme8s5gv1f8nffa8daa2s4zylc2a6wbmq4irqjb2l4r3ehifxbsr6tgn6zbzkan0jhp4b6fzwrkylsvq6mf1xe8o70k9pe82juujqk2udz6yd30fdf4klr9ai2ncc1mhaghp16lv92qt8rmmxtajyw3wruk2pe1bjbr3xrqvsa5iz5so9ojt6s7pvppp17m2h1kunsuqfitukvhqv0ich2kou29yq4t7u30qkiy8k5hjn5n71xhck6x5zwrzrn17f463foao1yd44bo65fudopgz6ekk98asumqv9ufrqnkhpokw7c6226l96l4d5iw1dxxi4w3sxttv2bo6milxvzi1fkj2i3opwbncqghfbt2bmpsap61bgzl9wxo59yh4839uy30z6947xc41754zy86ocr7opy8fmk2if2uior6aa8bpkrydrn6ox4mn99ay0g21eif9drcsfoxkklcbx3ihgw0ybgx463sv5415z18g3lwu5vc0v05ebis0piq3ghf7c4si75jhqcanqu80hzivf302j1tfdmm0i90qxquem8oto3q8frs3kn4fxt4l962qw1dp3n667rf5jd6c',
                expiredAccessToken: 6953467022,
                expiredRefreshToken: 4902064611,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'CLIENT_CREDENTIALS',
                name: '2h3hoc4hawhn6kgskwlaauf4nkgeexm1jstj04cocfpzv4efthoex7mqapwf6cl2euu43tkbaiqp5k7ecbdekzglbfn6vtz8o3u8znfvkd70ggiflmnlcr9dt0n6ef8x8qdk6dnm7f7lsb0hhumxbb3l878zi8bg7khpx2z0o1kv68nd6vggg1j5yruekp72udk1firmhviwqqtw8vpddqk0mwsxfqd49o2d222xtwzl0t3jetviamp4a9gnuy0',
                secret: 'ic8f9k4owmy57d718ah7f2dimzil1xrp869oa372ffpj0yvluo399a3nluf1fgj1u9o4mtdveoaypd9xwj61w1s24p',
                authUrl: '4f4mwwggiyfvndii8z0yv70o03j2fc3zfg0ryj5q5zhb08fbn0iyrpotkh7fvwldo06v164kateuowdro513ay0uark2iq0cgtmxjr28cbw9uzeu4se8zjzpau9igaunmfl99wstnutxi2y6o07ae6nyty9tz4ez3lrc0rpu8to96c4v22anu0g7zx3s1bh70bh413u1gbivwj5fyu9o9fsj48lkscvuyhz2aobpj4ndj0pzo464hqaf9osoj6hjhp9qzk3l014r0f902z0sh0wi9jsy043mwh6gjjwsmky5azpzqzqp9yma33wycfvw33kf65qmixu0yaijn08t8t1wlaa1hg9w1z5ds8igphsqr2zvkdwoxkw9clijagc3ce34svyveeb9sssjyff00va1tuqt1vpqpn3ir3j6dfy8cxqudqg6gfl1ufw7xuaat111g8fe4i1up3pycmapqrwck5zm39937s54085s1syk05nvcrk9gbpnmuorjtx1kxboxnp2n3t6bcufef3jvv7rblxg58nigu6pkmoi0soon5rpive5ua53zvnd0l3jgykottuoge0ihqhlak97u77avg8c69bl2yi2yva2qc2k3742vodxoiee246hbniedckgxnpm3sstqzw4y2nuwpefrw6vfo90b2a3kwyiwv6ovcxia55dyhv8amzofaft1v0er8wfdqwarv7qlqh0cnd13m4hg1nlisgxeo2tinpqnfvcyk8czvtoc196oy56d729bewf5gvm1rpdfvxon6xvdksa1npd9x6bdn95qa4j0rgs0t9314hurjza6uxwts6qxcjug5rl6v4sdourkj9n6mkoh4ivyyjif1xqngivw0kzeofoq7kb07s0add05b3tu6adlxtrangy03o1v5i50zs1wkv8pose8fjqt8va43xx06m2s8h7egcwd4l8pyl09er6pr7kkp2e07oxug0ojdts27h50r4ppomgkbqp4yoppoq2j9qxvtflh8r5iw3h0m6oo8khn1c7u431ss5e8mxns4y37a3o1ofvykfa0cko6fgpuavshnthuo7lzeaima7cth0xf2htwfo1zainjr7k7vb5uczgwj7i65v1vwiv0lmplxz92remmxz4w3e8lnxjhb2dc302op8us22xpsicwnzsenytqr2owp0pv731ugvu7gaknribk5qyk80idfuyyrdb4zrtpq7lk30hbk4mwcebytpal9m2iz2dudjz9wn8tl8l6u2bpvgsa7hg5cpl3x7mwwdvdhvi51dzpp749bmzyubg72ofxnsysfvj03jzllg316uuuwca6qsxclf10wwrqde5wx37pax2hj5ojueiete05l033xbd989y1q2p5wpoyub5svpminyis9z7lo8qlkadx1ua6l4lb86qy4rtwytbg7p5guagg99k4olwvrbsk63k7ddq40s5h36i6uu1aq42tp3d02b6s0jyz6abw4hki6oj1tpdkn8fcj0uacbzw7dfcv2rc90i5iee5hjomfy1lia5texqhmo35rye1fd0xmaogmk5p42hqgje0dt48qm10j4rfxqyvrh3rrcjp6zq1fm3x5mmwa01xdahguwkr9hfkwg9inaos6fsdremvddjx06hhanumxjctdx33v42xufgyfg2fnq31ftk1vh6gt2icriyu7vwhfa77n9a5mlnomtx1d3p15w4ge3sylyirf20j7gtjuodmihj1fpfht4g0qtu5bbgw1qdfuxq5pzt1enyyw11d0coy558688ymu7rwikvj9grcq2t8cheah7iaoqp6xgzqu6ekfxwttu3ma50clfe32a0dtwlmyd3ngt9u4bj93c9zgnxhp6hoh3f6zm667fmi4eqkh8nwzpvg5vkqma0eg8g3iaxopx6fnt5u2ynukv7b4pbtvzp611eqw24yr6bbwdosn5hr4byiflobej50ouyomjn12d9gl1bcrfd8nz63m9n6gp92fewnvxml5jh5d59d4byla32e1hx',
                redirect: '6hkfh3b4ih439qrzpudv5qnwdfkbtaobtzacdhndawkbrfiv97n29jyf7le18gi6vjrqd5gun1asoh20udzk01mg5wgidgtbfnvf6pu0jbqu4rzjvvgqbyahnjbc224wvetkwt6qhicvcqkuzfro7fw9xomn89b4qzlygv56lhgh0fdhqiho42fiwrh0xk4637vndvd6qwm84gmk5ozvgs4kujwrdgfflt5oykw49kk2it7kveu8i4zggapa1ln65az8441w7t7k9a8hcagew41hzdv0bh00d9ld5mzathgvs524beydjn3avjoih8qtw3cm90k06q10zg86dt66csxim1vadr6fng7xmdvmc6kkycoez6hw5wow39zlmnw96qcp7hqoixmoj5egjtkhyeo1zsew7bq7kj9ervltpsip9i6pqet3lan5bkgtt0udndv1kx3uf4q09bzi7i2hrv2u49y57mb975c0x3o9r6wheguqwq2ac9aw3p65uy46du2u6rqj8ktylvchwyzdcrxw1p29249xbcaf5mv2stwiisyqa2mumam07izbel1ontoth2ik13q9tzbqvjqeghbp4j41fn1b1labwr2165866pf8g4rq7axda3kw8tn2s88z993nnc277bb3xbu8p15df3y4kr4y8iluu41y263jsdgxbgyu49sj0myfmbdm0j29rwzf9yeckjhu80woa4qvj9585s88oaaekjhgqtsz0l6vohz5nnwps2gbqn9jin05w7itkkc27kprgojhg4xmezmvyly3kc6ojtaaq9ae1zohmv7q34hd7in9im3u2c8utr0u7nysrg4m2t8dd29jsv9vpt3lje4a4our93027ofdg0ba0tx6z4k0wsoq9xapffjc9ijxv8lrdaxvpnkg47ad3rp45xqagwqd636ybl8kwn9lj8k9zs17gxd1gmrtvjcvxd76ed9y19nq5mlsc7vlvnjmbp798xr0fw72me8gj0vlvut1urh3fxfqedfw477kx4s2p26t1lal8agnfvka6q267ur8vb53cbyky7psteeobe3shtmrozbgbctyrso734us5cs0npmiw5uod3mocv14h49fymplp60qsxuvfhwo07iyimbnza0mpt4iebho15gufxbv0yqv30frldj7s24gdpht6g8phbqff7hn1j3wnyei9ul394dgfym7izeuakylrb2vo59bjfu1xttzxwrxulri7nyjmr7lz75yw6h0phheeapk49ahnuq0xhfc4xtek54ntzc6fspsb17izryfv7aiwpodv5fqze8klrnwz7h2j56e9rqsug9gqlgq8yqyes0cz0ggps36ayme9tnni8c8wrdet2oitm9eqmy3p7590fo9ov6vdhwyq4qr78vgvzb1eg184skhcp0oljxag6zocbu9e6yq8u4dksstujznk0eahdulmva8oeea7kdyzl9xl0wncsd6ekg0wstrz85p28erxo35rjmtvf4sf92dz8mpetg0rlphp6nhdpv9y33yd01tfr7m1rh9gqabhewh06rebdwhgk6n6q0wgwb0za36shl9ht8hi61yyhn8jgej3oa5qgtl8vyzws0g30ffln20myzf6yokju1fsq9ytpjsxypvh12pv2lkldu29c1u41i7p5wcwae3s3u8s4uaxxb46wp0ekpv3aqdii7nfujv2ewjw490ae74p8qyphtybqj3yls07637pvuqzy02wrsjumlbn4pbs00f7i4hijy0bf1ytrysfjt8r8x4wuv4vztsq42tz7y8pq6o17ddf5vwytvbowugawh3yx4eymhwiujbue8atur028pq9zt9jwa4wrog285o7oe8iw0zqd06fovruyfbbmxfgaooouuys5vrniyvd6pq9ofmsrbka4mivg14psfbaujjrjub01m1prkp22m80hg0f84dbl1oxuq6ltylznwv5b4dxrk0wdll5ew48ebglbx2mtyfn0q7umv64i13bfwebm0t4ayx6v0m5',
                expiredAccessToken: 7243815916,
                expiredRefreshToken: 2574457227,
                isActive: true,
                isMaster: false,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'PASSWORD',
                name: 'kcdh1jyn5zxw0t6bkewspiabzqgd4m3o9y5fvb75gfu1ysrtoaz946zzuxy57lvbp3tyolcvqms49b4un8frrq70govbcxvlz3czjqvmntz0p5un0etqyq0ryy4l8lt4ixdnq9bdnssv44zf2ud57mml5uw53a0istwju09f9a1nnkqcgoa1fn8j0h6s08i6zd602267p9hoclccfqzcmw5ncjl78p7pi2ugjca3zwm1tuyj2z8y7ec6amqh4ko',
                secret: 'dqvrqhdxdnacnzdoad4d6smk7etts3agr9a67b7asotxgpa3bnh1cq72w0bg2pkjxfgqqi8nhrrcsx2cbp5cq0uzcc',
                authUrl: 'jwfk4gz6n563cf7pw9hig1soeq0kzneg5yp6g8ihaek9d7o5tppodhs27f7gfpcss7tlxvkcg3o3wvatlu94n0ge5wx8lydzmcjgjgs9uj5nt4w1fvvpkpzsyqi7wq4f7pk5525npdkljh03sb4wxkonsoxurywz23htzkdhwc416w6vgw1s60ebkd05s9hde3q0sgdmltxk13dmnxnurhydeb8vmaipc580cnatczk9vg089l2haugbwmd3qi1muoeow8got0d4ikjfuitwbxqsl55vtbiq6nlnxtkta5epmre601arnnkhu5at5v0l17q1w9vpzw78iuzrxbx7q3g7yrigx5cz4neggrzkmyb9ajglvwz5rc88d6hy4iunw7ttzgqn56qtf0b8swmtae77zuwo0k9ff05x8c5b8gbrmeaqijanfdzjuzner8r3gzxprpxex6g6kj5f7eorfix9blwodeiryxbus2ywxcaaqew0g6zzvdryl3jjii5nex6rqsscqzurid05s0hsxww5sbtr84jt79ga7cbnp1gnb54r40dsu5fmcg3lww6bwlsqwpnundxl3q68cbqyhk3z2h3joqboer1ielpi71syuey7ji5fn61d6few81i5i2t65h7uo6ak4wkxuewyoefwq7enxxtmrhblwdus8pr9r9wgswlo7fji95yin95ibjue7rtjtvgrixtxw2k2nywo0ke7s9tlhwqlvswy7x02vfoab2zcze5wzx0u31fh6hgdsxxfqelybu6n7rk1rdqzo0zbllxnecq1iymcpxo7g21zifjogyutppcjgxphvf9i6t0m0ilwgdvqomhqq6nr1vozcsxg07tnloht4nca0tcnblyifxdged2u7aocinyp0prnuwupaue8s0vce0jzfpbr4ukotquz42ix4o8wg9si8m38nxz6qzh0dctsfeyrz4zniol9nhkrahggkirew6r35a4wh15tb7xt4grkd3q2ztdw0lhd8f9odkvh74tsqkqqkvqv2goijfo9wruszmzm98py1rod35lctftqqae440qmd2hnu895153oir9hzrl2gxmfnnrnkqbg5d7jha2qmdajxd65eg90noh0ljdnpmvt0t5747900cb14swxzdq3b23tlfp35swtfleyfbtuydjj4zoevvpp9mcjke31kmuyk8j42yilh4q3epmw6kv5ra8aj7b6ias9pakfoaricrp11grx39iowkvtw8iuw057bnexkm6jbazjk23dt7jc17nwu5ij8g89nfvp7sjooke6mvwzvjgegsng7rha58icay9je0xtxa8p48qcunwm9zlo47ltk1yfjydvvx2pmmgzdjcvcmxw3onxkkeeus1c6v6anbud57cgmops4elzoxu3ajk41h7nwo59x2yxvpr6k4tc0m4rl8gy46f9dqydusgq84hzmxgth8dndqr44e29dfdzu30k9w2ljd0pasrnmr0xr5lh8e2mr7hxegh6gqavkxx2hoki6x563yw23sfnxkjbctn7t9a3voa8uathfltju7c4qn9n7esrytxctb34cnap1ym0qta1z37ac9ej54sm331cove68p3kct4irhzpdvtnk133y5v1xfcnkb2bjp355ubrn13g06mbopwl1bk7gm3cse9kfx0f2dldybejpbpf0j6naugi0y2glo2vdam2496mfil5b1ypr2dw9h4plo04ofpklscmvhz4pw9atsj80g8y8osc6u17xf3o8jdfw3mtu87hrh0o2akh3zlub576wg2h8lvv8h9qjzawy7zyq4qdl1x0o8n9a31g19uowdhj16xmutm51dlb759nmkjzgzv8kd2vd034ny6ocdisaj94b40o0hb93mwmo5wov25p463n0krarcdp5defeyd9cj6jdknft3j7p23s13rznr8vg6s6810vgmp11kppelxd51k3gdwozh6o8fz8pqmvicevjivnnuyhayq9yyh659ycl8p92vkm3i0boa6wqazr',
                redirect: 'q83cv69cbuzxhpp29tltpsyf8t03f20ofok9tv9zktqenyujllqtw69a4vcil31f5eyh0wyvkua054rw2eqmktmo4l1liqf7b7mj1vcssi32tikcvb3fvmgrh5xdaijk0mu6rb8btl5mjy82mg952fzwhdbqe7hgd7mpk29c6zvofbkxygfylzolrexu7bainvg3dr94has4znxcwn44smv1kmpucb4j9iodt9m570q6sdypfcex9en1a53noy2txngrauicd7i6i3a98rnyfccjsx5jpxmndxb1vpuegco2qq9y79lwtt794a48fd9dilzjiaurtq0kwa6hi61ulbb2vrcctfmctlowkwmi2dakrjg9rpyh9bjckr92vkn3negoxkh2yyjpklpme27292a1fmhszb9xdti0zmrt6jy9dajrndko9wazaj2umiatkaaxlk0u6a1c2mcsfr8v0pezlx2igb8sqmgeytpnk3k7so8ufyv7zzspg52u202ourvgx8qfrz3eawjhwdj26qvty3pyrhk883gx9ip2es0x620ma08ulgmshhkbjfkldvok6qfoaok99tlh9198skmekp4xcfebvrhkrhv2xxdouy3va538nrzcvq2wprrzi4jvyzjlggamax4bn6s3wyhzk7cznerq6b5u4lmkm737okv3b5l7pxc4lvxltf1w16f242pddgaju54uquhssvazungaj4o2o4jupyhssve1m245wud6nybzdsd7zhr9qkyf12xs53lbzx3xhxbrkhnysfdv1ig8gbhhu730heevm6pwv2wvzqasad1g6zfz7aoxf3jqf5bnim4ln77rdjglh2ax1bre42divexqhv08cyqsglea9z85j2ywoqafjps0z5xoj9vrco6679rxgptj3actc5qrm7n263e0xsvv6po861kbwntog3rmz7cob8sxiikt5zrp2prqy9pn4ojx07a2hrzh6zdpm5le8t9lx9azsbtdkzmdqei6l1f3c6d1dest0o6tpcnxbs4ijjphqcn38kf0y4gm517lzrqush5y9u1yes5uh5744gfjh9yh67xa9fx2wf6fxfculpx5tjp6hgjtoylo3sjicndqwgyinej9w5t0ho28eqparvs9tl30cny4n8or6md2gfb0p4fwx1wmhd097sq61gy6lrtc3if3ecj0umstimqqlso6stymf85ldqa41bqv3t60chv3oaphv1fisut3j5qos2paiul6l4drpos0b6jak9ommqtbex4qpjb1f5d3w22q06lua1atz88lc08s36t6hb3b3tv9bhocgvi7lhd01b63mt7nyt9cy9vxa0mvmvek0ha99jngixv4nmi3hrcudic6kxbyei8gk3qpcsazpwfig5azr9pseakwl1yqj7pfr3v45uxaz4dw2vz2g90bplpba2yfsc9ydblwyt5ralx2eqc0kgfuts2s1e56wo4593xnrecfdf4izok9ibrh4jwnu2wuj294fx56i8v0agjqfto5ftalvvccsuxtqvlm77pdxl50giqy13dacyb1h2iez79kjv7nuqz1vw7fay069al8evnu8xotvlr8n4n3ajlzh96v9xg19nwputtazv6pyc7c1h8y68gioumv08yn6h0mubls5757bflopfu0xd9akvxuq3yia1rgfbtidoo6rgk6rbhmf8kondhxft9ss12ajuik406j7gquc4tbjef1u3qd1mr9slb2hyd7ajbwodofad230h9xc0ao3fcd1mhh9poo8bo9ayff9jg51873ep105xpesscqbrkq3e6bhw4xzvuck8i0z9t7d33o7lsguplvf3u6x8v1lsd28q6ezxrq4yms3q3in74fwti70omxix9wn3bamwyji08bk2nkyn6rbsv6cdimb1nwgf1hbl42aeft4swnyzejyfrh5f5qrdkmaldxbd9ge03skijup8m3k48nhilusayccxcdg1aucx0elfai7bqph1jp5q9o5cogvqcegnvy',
                expiredAccessToken: 19441315738,
                expiredRefreshToken: 3031133061,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'PASSWORD',
                name: '7c3b7kepucua0jsimvvwwzr101llz33ngau7bha5ehaz18c8bpbp5cf3f9jw5k19d40yf6wbhqh7x32kztvcfgidvfo49emkf2wnsh48vl0n43xobrlnzdd00362p5kfl15tzjl32iidsawnnpe6xhntxr5mq7mvxljfuen5tnlv7ktv8hnnfhyc9234uqvwnf9b4ac4dcgjpo2fpjm92838mee0cwkj8bdgoeuwjgy7f9zb1n4ccjiwimvzijc',
                secret: '6cg8ho6b876tf7xm916uvg3l5caij44ndykf6zmt0kybm3ogeymnx1rhze95tmzxoqynjcq4600qmgdy1wrmgtiwwk',
                authUrl: 'ioidkpd295qhdzakatcpruebpsuk7i4b66rp2qfa4xb10ooqlxc6xr2gofevdrtjswrainghpk8ph7c0hw0r7xz9ze4tmxzkcj4f4ps70tlve72ltdekjlx2iy0n1pad6zr355j1iu285u7jow8hhe57iixab0gktvlngcdplqikhz7yby1ajwzxmgyq7if4h4myrwidm8m6c0tivjbj137w2f9y557z4x399mqgiqagydck2rrpahe2wu3rdd7o90ldqtk5p0zygl6ffbfy5cl7j7z1ak3d7wpcgx6gxylha4jaxosaivkpfuj4llbax0brnjllf4df78qz45qrvt2iw1j3numoaduyz1nrhpgqfm4yhs1he8wr6cqemqtqrij6tga6llkhml03ksag3l8cmt36ejzwrry7wxrongxhuxn8mhwrdoc7iwc2n2kk8kkcfr37xsc79twagky2sium36eiwq0vrnkrsas1h3y5gxvuhldfl26oi5fyjjlxd5679kagyz6153ka9f5ryyrtyrtwuyvm88qg4ddute9nkpxf3rezz4znn0t7ym85c6tmhkokn9txjublai81gbwc2ikpedc8r4tfkr50sz37mfic8wigcqho1ovs3zbra6mqfkyow07kp09l2of0c5oxmu1dvvto4laryhc61jza0joq77ygducajpccnj16co6twkhtj7wucti33s107ug2xy88nhu5fh8sdnhxdzem46hes4ycz9tlxztbamb22789r5q2jx8897wvznc5jhvtd9drw3k63e4754fvwnodwbbpa9306bl2js8ysilut7gssh76xqcn3vz0wzex5o9c0tsuw2nthpluk5qvlmkovyt8keeuh1hdqbu67j2rxqtitq06z03yfo0e9eyx6xa1yurfmjxfediz5od4ca5wwbyb4a33saegrb9ldxemytroxispp381xnzfu6pqzzdhcf2wlqfzt8za6ax07yud6rk5v2cjo74j9mjs0o2pgbuuicq01qzycwxzh3vi3ksbhrbcbcfd296e4kt05jqkzwxzxtqqus8h39a7u44v4og79j65zykbr9xj164d7ola7iaj76r59vysehvq9jfklu3npkv5d28xh1nzvegv6wm05geg3ylt8bumuuw1cdxlwc8rxewn1nlfqjmssmhmsh3ppumqu66hdrpknqqk907dapvkm86z1d0ppun9mr5wo0olpi9jggdibijv1811nndn43ipulbq0scid7km3zrsnstqbfruyily5n05s4rfydphnit2a5xuqbycu1yvsby9h9djehjiib9pnnj1yaaapid6wu1i9qefuqt3ugem8wh6a2gqf8c0480ac24g62dc22rqcs3atg5ijuzcviseapz79yp43kmec3rkkbkpuyok0i4722u765hp8329xkml9w82bo6odhno0y35n7818fs7rq37p7o3x8wcrqozf9tlmxu2nl490tpt9k0xmjmpeerhruqqr2u6g9t350150gsw6166vwye5pc6wrr9jegwe7veipd5cu08y349z2wdfy9ashdqdppt4f7p318bj0mtks2o9whh0dkqm5drvuknseazdi0mfejmqnk7wodwl7hyq32sya6igi1kxvhx2dp9xalpgf46zrns4q0ctd0c29l5excy8v0wyzoepzkck8eg8zrmngbcqqmx6p98izs1boov9fs75pjtmjieym4qj9wr275ozgptijfg0udwpsla2ojcgsi5bxq4f1mledh799inaxacupi7vmg9c9vxys5r6wua6v7wn9gefhwm8w4cr5sezai7d6bc414n84qsufe2v2ijb6e7mv3auth6xv03fqlj0d035cs46orpcxcjisytey62869beqlnvu0e65s6lsn5hwzrgadsek880o4bupdg86amfxzcp4d9yu9kpy7nwxmofu621k9jhjf0w6icqn6i145xyg656sjjkch6iveisos4qa1jrt644m0mmbsasa3zwhjv',
                redirect: '3m0fdzy7n7nul5upuemye38ew0stnc5wybcluu7oxqgfgl5nte5m4bm6ipod4dd8965lgu67eej19vsers6crdxam9t3n4shvhf1bj2jb5ox9mgnrk8vm37tx8d7pndzn2j1x7209z7t0h9d50n41pwzrnf7j44l1kue7b21ofk5r61ojbb94c5wzou2ev0kvuspw3qxn9j5mjlvot2c5i120hwmussg7561gq4b1mkwjf54rj6utkm4f1pv8qw4ww5wsnvdqe4kgbps92cktqbg9r1m1pxjzbzxjlxcmdsc1u67qrwyhen2btic2c6g5fmb7a0qwr9niykwc4e76vfsvder86i5d4db33umcvpb9nf45lvn91ra0x37zo5tabwmysge5jvoc4eegr80u1oekfcfse9c77zvgj4r4xs0lh7h1ln13gy089qqltvda7xocqkjoyrnaclj3gherkj8aqt3vzzofq26isyoa2axd49gd6mtdij3nhu3d55fgvzor4ifjsyalzpe85rzdlxwcq1ws7vco4zjnlp7oyju42ehittvazvq8ov0okab02hj96t5o6l60gb47cgcqhxlc752r5d2okuf5ibluy9ehu7s8iador2pwb4e0o51qqcp0kkl41ql7mpoq5hj4sfx96cr69nh6n35wg4y47x9rm0i0glnfy0mhb5v11exc1130x5ufeqcck4rk5xj1mjab3lnumfikwz368dfxegoi71l2ci2zza7u1vs0dytbnceyc25uq97k5ig5oc6nsoxk2z9gzrmjnrwnvp00cd1dg1abhwavjliqk5dm9ztqxbdl223wkgbpqhfxwwjmfxks16ryq73y1oxprykm6h1fg67a3b6ccq8wulhn675clstcza6jho236nouc6uxjl9nhqhqnn7iy1te28fomuvn9vivps8l9p5kld5l87d3wmerykgu6r6rw4yyaa78e7iuv5f1dhkqj0b62s05hxwibfgymvst6co5xzwvwk50v7o4aeat2ck39peyyf3sy9fz1btxy7vud9kvcxokikkilv6bcss3m5q3nxmoi9226jsayw01y7ivigpl3zcecaufwcgeqk633xzq77hg9s5p7t1l1x013wlo3loasshc5tfp32lk4hk6g1v04r543ghh6f5caoadir8fjf3b8mtfjrxkms8xasxly4unywzjsz2obbzy1oja5nr3y2dkpoezaxbxowkl5q2t4dzwo77084z20wkrtf5kz1f6tv6z0t02gil8a95sui9511cbkgneks5kwn7ja8vd9kk4dac16v68jgyr0jbum8f0z1mqwaqh1wbe4zddldiel5q4445rwcjpyhqqrzeqmmozcxecrz774iyrcvgg8kefr2b10dllfsxg6wees6ku2tjcvjdsftcz9qgqotxukqi8b789j2lw6diszpsc0znunjys921aopdslncch7ihxgrk77hd6gu7e1fnsg0vt7doyydhrhw47mjg5bm431252ltnbejitifreggi5zq60zsusavvj45y17wxp0vol60qwa71nagr0exrqedevciv64sx5gax17z62l5104cw5qyh65z9d8z03s99nndg0azt4ruinq6tcieuewmnsqtfyl2n4j69p0h9ixuo67m2a42scgh2ptxiszj7m9p80dfpbcwvk9ya52m8xnvcypuzdqemvdshsiye00a7rjo4vi0m9ewor75wcj7465k7gh96aqeqhi0tnf0abhqsukol47qovpp1odn9xdk9u259ny52z5ge4p0gxfmtlnt3wuncbxu6gbrgvla5vcywlp674jev87ryxm0q1eyc8391an8g5gbwmnigp87evk1pqwf7p7kbjdtlqzb2ciqxzxoyzqm1p5cc91kbospf7xbawx4h0j281h63bm8131bl4gp9ko19key7ye3ve63gtry33zeignue90btii52fefvgopo4aubmy0swqzi456e9azx49trc5ku13ao5l3uce2vtkk',
                expiredAccessToken: 5520737031,
                expiredRefreshToken: 24330391805,
                isActive: true,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'AUTHORIZATION_CODE',
                name: '919sfz150ia5lr48ytidetpisxdisgt77bx4yo51mqcl8lolsdvpn71ag9x8eh4u42tvsq6zo7kvn33v1xrgiwkt1urah0dfzhcdyru9wnx5d2da5gd75wq019vdth76pbfuw3oan0rmyxplq1h1g4kltehu4u91nzirzrr6x9am45v7r60uxyjcuvs60oksuoqggooy7ef688c3rnvmy4obgl6z8gqeihawus65vwyp6nneqmytouexr9inply',
                secret: 's4yv12uf98u17yz2k7gs11w6vdr26qxu0x59tmmwr3wwxyqwprboa6d5nxun09rcmi63irxv9jn1xthbuss62gafjm',
                authUrl: 'rj76d2mal2xkgngqffdowxgddg8v8lizuy1zgxapuz42k9zowifp5u57b12spzlk8jjt9db0ncryj3ny0bab4pzwwgpeh4x06mb68yt4qxfv2lkvzodwrksb29q80tq0oxgk3gfbaxc73eb41ljy4txldaunxaisl69p16afq42ewf6s53ulxhn3pfvepqo043tt1q73eppys4pejqehohqe4kl0qne2xwku4wczp3318csemjp8bhlbibfa0wh5n9ef96qfwsbszbdun43fh8lammsvynszas7x2itnodiqwiefx2gc2rki9j37z2rdqm71pm7pl4sypv2twhl4gva8ehgm02e8mq1z5ex4iy8jup7impd3ugeokeh49s4uqr9axu6evxr8o684cxl4r7av5047jmg1fzp8xsrdprkqsqlb2p5wfeqef79yz5yv9wzkgs9msmzmrxfuikyzcr030i8wej3wf2phgvnegn71ztvae6i36teg6tzskbdud3q1ukeu9gcnruv8s2nbhs7u3aqy8bufnd1hki57lkgziy6hepcddv6u6sxb0o43d12fkvsly3e8kukfcmj0t0arm1w7vqq57rbu5oc3e40zll1ayho51c7jyp9imy0s33q3vnum6oqbak2js7bfybbvv18dey6nkxhda3tbn6lgg42j68g11kzrhdxuza0zbl2b5btbepn0fg1pkqr3x49ueyrcqdnz0xzlesawstc2c4kwfrzld8ukz5dhznrsi7cl38816rp7m9li7g8dveyrps536z643vb3ivsmrs4pbuobslfx185p3vbss7whpkbuxidtkrrlnk9ucm8bykmm0iu434gwvqpy9efma9cnn3in67cc4ve1oj7vg59h0mil14d2uc042q00gsdry5rwsyrlmqlxjh3m74nd1hp9qwqdffsyslkpucus42z2p39km3174hgeo63w4hie4654h56aucrsmybogdk3y5noog1neotbfmaukc3klrq3eul4t6as4p1dhyet3ngd4w0us9s43v78duk1c53byu7o1j808an1patb1ze8uec1wr6dshkpci18dq7p29adcpgbe1srnq8dimjivni7pd2r1q48hr1f00uqzhw5cj5xfw44fs2tjxdmbmsolwdwbrvm62gaonev9oboe91wqfe7zwpmm51f1ufot5jv6nis9vlmhqfqeie0wrfkalzea7xjlq3ehxvkku9xhy764pmxjrr9lqh9kvnc5npw86gzhgrkrg1lubnbjgj2yn9fieln0qlqym8t710j5tuyw6nls22wjefhcn511cotokwqsw81csapfqjnbjyetzda4yy6kkvbywa3xoo7j3viq8c2xyo2w2794hwhzfulmcvwnedxcwcx63yi1kp8tkksqax2q0zu75k3bhy0xkuo29u9hxy9k9qz90zwofsejrfupehg4zo6ni94frqppvouzmvn4hcrl3x4d7yhnba9duogd51yd21jyorm6tia41ukw2kxi3qdjoj0j630sp998iue9nk3hn6jzhaugjnlrzzx6lx1psdewy0n7be0cgjtev4qarkvybr3l3b4bpzlh0vnatdlt90d5952ahvak3ej9wlj9o6gccdkch81y3vl3x8zviig6gp65m2jgzao2byh9ftjr0v3k6jtedsaiidg096zrrm9aj6zhlryp3ldikzct6sl7hzrju3j7q41bndztlr2cmg8y2vi6rn2yn4nby1pjbkdnjho35fo542ljb1vtv15uwzjh8ycympflsb30pwljdxwllrttvb1vk2fhkck0s9marl3z4wv0g5kpmurho69i8amjxx5mcrnk7p6b959r4dsnhxuzjefgg50gta1fst4yowffqjum6fmf2d8k3q4djnvu7rmpyut471qiuvk6md5r5e7tmqv8fsqtviyuo07d47ov1t9wyj1n40um1rbugdxxv9aimft3yxrw5l03kwtgl80ivej7tn0aidamrmonajzn90px8r1',
                redirect: 'fgg4bxda52czcrwz7hteop361olg6p9m1lmtx9vmxiduqe0mfkkdlv6evjb5k7tt2xwgi30jtz3g6rg8gaa7d4dba6cyizy8u82xylp2qrs68063x5nr727er1484vz0k9bk35x0079zs0o15qpm4oruk50tbqp0mnra0iobeetd4imgevlox0ls9go1nfy0s7kmy7ple9timhue85tkchicatyci4b0igr79zb2fpghfz8s30wu47weay2wbowiadazuqrlzwlrk93bqmuba6s0nk5g5cgmzswb2md0wmcma9ik3rctoxzhk29jvkts4lrnk0jmtghtwqi5t3lu24q6tvrjjx667rfzf0ltwa7v1cpes1ptkoaxqwn74v4kv1xi5alrrgrp5dqrp3ns0v4dxcv526cyugfsshexs88n5ina2unutfkj5qmewm1esr20cq0w8cx0f1p70evut7mrubo1pqkxp5onmgvctwweltmbq0rv35ihd2ayxbir5s2z2pha2o9yjxoecc2rzen3n2f94rn490g29xq7fed1q9my6e503u9l7tmju0fcfnecunnlw98lqyp34q45a6q4o3q5dgs08py51n0oo02fb0jl08axh4n3ma7b76d54f0sxi8v80ez69del00hspupyfl80ru9krb2t5v10qz2hpq3gymeco0zhhau44d70t1ltb25umoxn1ie21rd9vsto9yvnabdamvjv2muxkg252ev2uemoc7bhmscf7fmuqf7s5f0eokkclvuxby2uzx69o07zvjuzsqxf959g1cuqs9rzznfkwfmakrsvreqvazqv70jfc0cbv20a7zvds10hp5tlje0g4stu0pr574w1kgxfpw7m0voqmpawxjmbx1mryefg09dpmpk5fhko3d8gpj0plojea4179xzivaxelghdrruc0evmgh3tftdlxxqf4xp8eu53jowcpue7waty2sxv74ec1auoen4dxydk5sh3f6424c5u4a6f0j5esps8cykysoare71amxr5azqxh3v8xqulykery0qa1hnzufhre5a5tcmjzwehq9vb90nggzrg0ecwozqnmoj106mg8bglw0s8cz84y2ovg0x7b7c5f8gq87u3h4pbmtweg19fclbxnt7z6atsojfeigpsmx3j6xj7nog7izeqwx9nabg25pltornfj7o4jzci5n5qdohhsb44h9h87f83txo8pxukm3avwit51quwsdoqj4k50xwxvnfcewvyh293fuaarubs909lt2mvt7n6bby3ola2yplkaxd5zle2wmttgcpc4zjrjcl4cxovtqflvivnjouby6cj90icsq6pn6l6774j86h2u5za5a9f7q4q6b5v0362rescdje7y4zadjau7bi4ww8z14xo0llursk0mw8yvz1kaikgq12fezah4expe3ofmuah4ahkonbbpr6mzeqk80kejwt3rkuvq5hfwde5ivkcx71hs3z6i2hbhd3rqmy5c10ihnqnfcxdvtfcekn8gceco0w0623d6h043pcqappnrukv05s7b0hr2bdmgpxzmiyeeca91lhkftp7jbkz5j6h57jq2ooohjrl35he9c91wwgjgluxsnlbrtuk8qdpmrdzjqcwujjcm4jn6pzzbyaiknp87i1071nck2sy758dd36npprxmtydxw4eau1b4hyhrub8uq4m8fa1nn4o3gvi8ifovlxvre94u7d3pyydrt3pu5vpc2af8gn85cs342f4n83cmta9sfqd1qvamvn8g9hjbmrogyfsim3dyy7n69cs12nyqd7kwy61f72yyn9fndx28dnc5s62pj7r0ko6987gry7cwn4l7fupp1dmcysnb01jdksvx2urszctld1bj883u3tz8bv6av7eiq76biiwtm6uh3io9vsqca5xti1sc0j01a8xmsjc7r7mw5rsywk8a8rl5wguawxmhql7l3likfry07117nznyz9f70kl1jnuzurvlox5pxuii50hzn57mwv',
                expiredAccessToken: -9,
                expiredRefreshToken: 1672636653,
                isActive: false,
                isMaster: true,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'cvqozk74szktsa0nlaww3vu7lh9ylpvm31igdm55a4rg642w7ek3e1bg55tnzzbltbl31r1qcw51otll1rd9idy51aonsojqddxewgt4dx1x7iejmp1ndqveh04vzq49en3qmn9yov78ty9v5jae80qfzowvm42z6athkbzi85ktlookxwcqv41neg2a9a6lf6hyxssyxpojj4oyykb8cs6kvi4rkkqc0razovhlluqdo3d0av3nc7i0ee15o9c',
                secret: '32wvoiqgsuxnnfsolhuujstxg8qylz2wy8eotxcplhsn2v03tr052l099tkyumyq23z2bpgp149jnriw1b9pdcifng',
                authUrl: 'rloo59eqdb30tnroqpr9ut6snx9ryd3hlaypune9igswfpkszh88hbzd7lhyrmxi8kmqg2sggyge3vag2tt53inzkm5g55at5kx90n6jk7gyhvs2m2zwevb12yswlksa77j9fy8s908hny38gm9gvk2hzuykt4pzi4qzuppwrg85obgzarp1j8v87dlg6t8hi3yrdhwa1gr3k0gfl61yg1uu1geb0277kmcrdu9sftt8u62xdr526fk4xysni377xwbth4jq594tuxibnppdg89zuom6g0o57otrjg6n0thxjhvnye2svh8dczjtloy201hacqvxdj2z1y07e3mpvbb5ra04m8rremltj7d89qq3jepdns6xufewxwlh7ftz1roh7of0v0jtwee62d78rllbj3xpo9v1sjiokjcc7rcmxq0g4hdp8cw99ebnlqlqhaeb6gppicho3l2fgw6y2s7jd7c2pjae62zvilha1x3hhy2wchrh61kzb0kq9s3obdyu4b16wjtuu5x5p2g2kzwrx0s4pm7jb3eayt1iiwripozet46vhujwez41025gcs9qw66nvleh50cfo5trzuqjmbrkz57n4zgmss0gwtrdpfwjsbyyzvqsttwdrw6leuyyn9zvcdkyuokeh9lunze7q8f0f8ren3zyqbncugmamk0vz3rf7tb0ikf1ngxrtbjwqs79vrk1zledu2v2ba1w1x8j8yqx026idl87e5kg7pyxpjm1doq1wveyi552rj60bs7uy28xtaw0bwu835shesvi8y0jmtowbmqsavqoeznkvkztgn7ova8veffuve0h4rdd5pb1l8889f7vgkf89494of9picqqzmtvlgcnpzdqiqqtxj65ckl1mzvw4kwqax2fdt6ki6elnbvf2iwpiz1tv5xqqzci0kwomg4eojaq8u2octn73fdd5mnykecdor43su3na5ak4q1bqzsuxhx9r2ai6vzak0f1qmhiypbv4a1a8uuztea2ldff8wu1regy950p77j0teqb9j8e812kccviszo6brcnstw4gjrz02grfb01oyqw5luh8697fbdqg4vob6oyfzxowlra903va15ps2ypcy6sw8v8id377sawzjbbht0ghgkwlwz3wpvgxzpb65cpt6stusnknydgpvtvitqxnyeywsb327cwjcu0a2zan2rj1lompf5iaip5v30ri7ca88zzmcmhp2k7xnyvkyy8krc1fk8yafkmwxzefwpoh2yc876s5skkfpskyndqnda9fyupo1cwhpi3651ih2bd8jsc96glm0a3bows1b1b2g8ysk5gufk9c5pu4v7ah1en890bvgxkghu3m3bbe44lbc8ct3367ptj9y4jibunlylencx363jtzl9p31h3azl4qsfo4184pkxa3q5uofk2hwfreuc07m9d6aonbtniv2wur3ypj2omuegebpkh6903zn5e5hjbzgnjxli418vtfju1iumf5kco8oofkgpopj3fjpoeiltfsv8dznnyz22jnzilkeueri2sd4v3y2pape6hu3jybyw6qagd6v1l4c9647lyefsdmguwxcnh73l6pxjnqiplnng4l8hu3fqwqckj6ywnz7uh9sirven44d0aj65ryfn3g8g3axufsm4lj1k6infuozuu1da732aapndzhehe60fdriw9b6v6sqef1gq0nuyavvckgye5jqsdn6netndsypkwtsw2oh9n2sj2djxoetw4ml0pe9gv6zvi965hax079x5p5po1wgel0zq0c3x1fr21efo2npy6v4nhgvlb9fg574rtqycb1o6wfrpwiapfgiqwhvo70gm337jcednffko4pdd8cthyitu51rn4i5e6pvjfj7qlvpkgki1eavwq46jou9axfx61xhu70pwc55s47946911jfksjsyj7bm1fp1u746ex2rkefnutuqbktteaa6vcprzlsl1nx5s3h01rw8ataztmjb00cx60i7xvnrxxt0ika42grxwl',
                redirect: 'plfboxgp27xtvv6aveetsxtvc8b1617xfwimizkhxzvp7ac3m0p99cqjh62dmqjvkhj5q4531kwc7o0rsdmsjsn9ekd0j841794y0vuzie7nef26hczvgtaf3iopb12gdyoq9fjp1kl5iunwucv23j633rctnov8mbdlpx4fjafqt1m1vqv18wr5nafn3z5s6vttuzrudfo7wd1edzck3sp3e2ksb6159qvyhovkio2qlrbp0g4t9cij114y5uv54m1erpzpujxqew9rtxs0brtjiy57dh7ntby71icytjtva8mi1btrcy0sg60odnllh5d6805w9yhzz2895bnzkg39udts152cfhav1kedbiwk1l7cc4f88u6aexy1qxw615xxfqpqkwr473qm9tkjqb1fuljxq4l2x5mlibll3zcciuiorudoxwnly05xt9oadsse6lfpxu0l4jf2px3umz2mtacms0bvws4w781t735lhbsq0l0gxabemqpdetnei1xv2prq8x35b523m9lulv53gsz1quesnx2pvveh9cjqm8dvca2hsld0knbfw7auyw3vdqbx4xyial3x344fti9mxkfemai5n7qnhywwau70ztaq37sqm07rg783cm6fpxtp8ifdzftdor55i17cv1cpreyiurrnk74qdmj1dp2cv82i0a2mvvwvoy57iqugk5c1aqnulytb75ob3j996gdd9sfl2oszjwr0w7rd3qqo353n2p4l0b8e7ne9kn69herz5r5aptd190whltqekaxuwzj55kkrjbrtls0k5bzplk4iogq61r07dan15b5m2tt0tdkmkr6fo8pxtouu0qnie6jf75uxtk17unxyskb3pbd1guhds4zs7syoquephbkhid7nrue5travygl84oimaqlwnwsqj7l3n9l37uucaosubfokdhxkduu8p372llfiwd5pp13zjjpavzdm2qqllz6jk1qb3d9fztfkonblzh0tn4w9bqnb2bai1c9yyypw8wcdv539rth5jgyp3hamflsxxresc37lbxsqy0zitpprryjz59kwemru125eabu83g1wbgvaq3f31cc0zg29f0whmlpugmcy42nfatqbljjcydu099hlbyzx9t4oynfwozbkpvyp978basdrrqgr4xqrm7zppn7whqu0swp1acfu4fdllmdcp3myow7vyserhcve444qd0pc543ymyflat2y9hyw0bzes32fjqv9ee0cto151c8wflj06adw2qk7ojl2gdjpq14uqhz4ebm57py04qi1hrxgmvkkkube2u3cmwgvv3547y2ik1qy85wqrczirce1bhzw33gdssexgqhk1bv1nvlxgckk1egz32e0m3dkh4dzjfgj86wa80olygjgoj1y8f8r5jcdgyqxtt4pl4y3xz3995h3phomdebn2gjw7oacf9dkarsqh2lc6edvm08dnwxck3069ar3tbuxvnmype5rxq0dxrtcn8r0n3d9zywt4a0oblxe8fa8h7as3g8932c2ssk8tqwqf1t3a7lfoucbxl3qadg8ly1jf2vr0tg8ree6vtez7alx48secm5tdaah586d3mmmoqqfhdrt9yj819sf2covn33at33431tegv8jl5udenux8tcyiek7wmqfk1uixwakx218ulud1mlcoy9x84aj77awb7rpcl3a9dru6xjandilv9eqpykxr5ykieu6xzpt8mxic92cur1q4wj1te8irt6u23f62221w6f6myb11l5gm3o4venii086r49gkwj2jvz9xpnk2h3sngom99s92zevxq90orsl680kinc1g1vx7ot79hjpfh8x6mf4gxsb0nxc0w2vhuu0vkb1pcezitw7a10srq2yq016cz73p1jxmzjuv480c4elguek1m907mavlkf9xdunavxx9es9paa4nf30fwi3ppv2f2rcwz86lv5nnr0wfl4oozuioxqo3hjt1qhslcv8rwb7xwr9ii3874ryzighg1yfyd1r',
                expiredAccessToken: 7452745536,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'AUTHORIZATION_CODE',
                name: '4oebgum13jd5hd6hd9hrxpvbp781um473d5eirr7dea6nhn82d3fs5cqqlefywpo3jhsx73cbeh22dhm5983zywa8mk9qk7p8qlmlm9kf3cmm13wh71w42zbrxf6l3hxzdir9cv3xw4sdbwkuym1to763ocnc2wj5pg08vfejttrbp4zt6zdydmud7k2rth631vysl43ibnb1mumvinfi0wlegq4jdq0ew62d8tcw8yx5m6bsvw644rdie0hxlw',
                secret: 'm6y6ouapnlhq2da7aj3mhmsgkwtju9s1p9yfrjq4iqc925bray610zwrwwvzuxm29b4fjjoimrasq0ppckmq3b0ekz',
                authUrl: 'p4rtgstr8qaao379s27q7hsqwqa7gph7ua2r6h78yrdv9boeew94zr8ricxiyd5e6syks9xro0gm54u2qktey4e8g03i36ce6vyuyb3e1ca8ykd2zdsj319hcixg5wkb8mrelj4b733no5do47h39jidpdnwjyc45k6auqa2mzkzrc6eh94c8vx6xrikdwtafznti8xl57oct564sj59jsmbq4mmsnibzc7w9mun3djsa5a24po94xkisttevmqbnavgypieg38szzbt49t7htda72qgua86cxvww2qq8ojqtjfjb3q36pv291xgla5ewzkcs5yao1t3flno5o12yyo5x787jkcq68e6io5qll1hmtlnloboxdqvot9451199xn3zpb38am4d5buvab9mq1w5httitetmtnblm10cc4vewtq962uf2ydecotypt9300riksjr7boycpv9yucugcyuhyviqs3yrzaqbisfoqsv89psitgejbcmvcrc8orrf4stxo783bo57b2wgqrsl6w4l6m8jfnrdrjydy7wlslnk1su9ou8n0kxdittb3vf6x8u0oyme6efy6zkfhmmgjn0o71p1n8fk3zmd7dcryhejj2bjppurt9gfwa5k3aqje0eqbakufeh11kpc8f8anvpr1ec4z8ypxyvhk31chgdhmduwtqqxusrlpg9drcxhu4bc863dpl0gr8gppfl43wtki93y2ypiwzkujewrqetkti203f93kwwnfe506qjpzisf1vxpszdjstftfyt5j9k54syxmiu6iam3kby6yk02rykm7l6nrm6h09guxeap9a16matp3lwovanuu3s62xi6izpbq9ik58amh8hbveg9onfqoxwr78gepipmf2qayelhy9e443apfjc4v3u1w97td3kixsrexqcmuquurq4u48r6qq6gzzkh0phn4hn2smm9r1sr4zve47y4bf2uutg7p21p847dpqgtsnt8gec4l4hppbr15af4mx86oqlcdo2m5taar08rkmdatp4lv96jvfk7vyozdk1hw4m0zpljaky4im4ogwmvsohvn18v3lccspbds6la6kydfb4apfpf9mhky71czk0e7iwezb0wdj5yrht7m6ql939usslo59ed9nr36z88pviw0lfwf6ssb8ap7u0b3tf4k6db9goj4vjruiecktu3ud3ntazawknt9f9e672ueucluzc3svcic04foa8kz5rp7vkigvmy8x11voxhsdn6rgs8sr3vpfmipfgdjw8rhx42rwknc9dyxsws0dalnq9m3b005kr8z51uvqe9yr4nn6c24cpwozgx5fterqc9ft6bhv3z9q6e4bxlsxt05mssy1hbvsqg09cs20mf4bsds9exq08nssvbiq9rmw476z7ulpgl6z7vjci754hnkca36yl4swy6txok1j0pkvce93p0f9p1xc2d3t7v8z1qls876w3i7aatfpkaywfi865fh4n2c8g74caz6yvdjgodo0l0xa7yfqbhvvjgmzluddmak7ubzb0cuf71yuy8vtulcstr10xx497h0qvh25k2ng4gkjs4hmvksax4wx91tr2vsfb3y1g2ufgjn1dif4h5556cmsvcjbbvxzler8tse1px79gqtl86cnbtvrvxo2p5cwddpuzoc4xgwbbx48ncrdu0kksc35ulreanys0lijbl6rgmn28glgah2dijejr1qxmyw0zyvuu1frgc0etuj72telyt5ellrw0yn62wcpc1iah83suey89472ag76fnju5qryi6wa1rgn7yql2suc8uy30p3di96m6fft65v3crpbiajm2t7noc9j4kc4fpi8nhiiyf7cbrf6s6kw1du3vlx0tq7p6zb97zrnxgptvneahbkokw3gl3pyojbqmm7o2v1e10lst63gko16wcqsvpigd9yj7l0bxicqui2jukf84n3yyma2193n3ufvit62z4zx5p694n8o8u2y1ans6gml49im29bqz6eec5wbj56n',
                redirect: 'zkx6ue7cve6vlpuf0ub364mzw6aen0dzor6abalajiq5haczsmexsn470bfta8crr9oc8prj5x63wjw0uwf2t1yl93uizgmak1yymf2e9rw8bftgm046qn3wc36ldx42mohrwe5736724qtjtcljkxlgbow5a9wkvnyms39vx4p8afhfcdphan0ml3xrzkaf8kykdk0spcdv1sotfeqv12srvtstlygpfcmzektj1lmq40cf53t737sk8ra4vlz7qnqm0c0nbqifdoukjrz3r030hojvoq6wolmkmcun9tn67a485b823gxjsxgi2knfe7ovo41ftx9dzyev4i1l3x39d8la7tk2m6f57ojgxp3a4cr8l9kvsfn03vmv8u23qm6q5avqzro6eqau7hjidr7mh1qcqgg58xeye928nf31onigvvgtsh5ik6tkqz2pptypbhle6zakuck74t3ku03aw4xs80jwt356q3vuddq37z6nkhnkchjsbnlu82vpt1cw259e0ytk5v0u9x3pd3fxqelqzzpstrsckfbtibaqf76pqdp6o834kmvfssz0ro0n5e6ajnuksrk2ooem75qu89i6r3iiiwt9vy0g88kc27boo0jyzruyfsy2k257u806ev33x4v5p8902h1h8enpa5wl97q6ac6st9nd1ro2660z0rmhhjzmfnxqmfr181afy0c1kbu1g48qd882b7m57wx7amfybgy5hphm7rz0848nl4vwrsvvgqpy407tsvssb46ofwgk8tsga91xwchu1i3mms13b7uky8rm9nv5c9c7pfjxlpnymwna4cc41blja497jjry4or8o9hcu6d5b37yu5ra7ar7yx1jpggeg3n5w2hev10u7e5bjw4x0t7funzbyt80dzdhlwptu8xj2tjez24xb8niv0816p3uklfja6tnw2kilhdwsuhidnkr7fpchykbi017bqvvmvp1t1qtqiz6nwgvx6cqvteibs2n8od4pkkz5xterz3k0i80kxpgrmsewddrkpqv44i8b1ux4g88cgvmgenbart1ji60davt3nlnpbfiag73tpgxihbeql29qbuli2el1xzu27fb36o0ghqwlzlj2nbldw7ckrdfi8uwl5cg5ck63evtkkt2ov8hkulxrpjrqwhard01oxxih0ta5lmosbrps6kuum7s1iaj4b14mrmnfedun17cbfeh2ku1h5161zk3gd537fhqlstxu3ukt0x9qbgw2jtxv6t5ij74kyaql3r06gh68detb5erfpx6u60yn41dw4pizjz9kjxelsawbgc7uoyw377m65t61ya2l83pb8kxrw656gc6tjnb4s3nm1l68tvehjwzzx3clf6b9h80zb3yzs064yyq7e7nevpifjs7f4mzqhphcw0msq6s6s8evsujv0479y9zib4oghcl3qt4wexywmg9m07t780v6hgcmqdjgdmfhci5xc5uhta0h3zp6an75l0fm4a1r527ormc1cuf8fmw1d6jzxqon5238uwjzwc23krp7hsoul7q2svxg41v76lr5gvc852aaw651hzac1ren9ezta287nlj29x7nj3go7y68rgx7vybadst9yjeimg13eu4oweg3iuk5wc46oh81ysp1y4hxvn1w846ggsq0clzmnpsm4uwwwxlqshjhjap6155gwajqaasrie611z94px1ogngsf4vbfwbky1sofynq86y9z2np6bzl4jvcjg5b432pe53g88p53uefphfeyalze40u0jr9zmrvv4446yrikdohl5n4oid1nek8hhn19of47z8p1s3zivzfcb077pe2pi9dsrdoi3tos7x83jlkvm1tg0azo2otnukk8jjnet2c3d3wfnmgn8bnr7gmrbxoqvtr358s8ahn9dj11bc2ejb43usi2cro89lgmljpvjru8gcwyv41flem0mentkfz75hjjvkula8zx5gr19ir2crg49ikxtsqww1l9it0uownxyguq2hfd37th4a2nhi',
                expiredAccessToken: 3750549994,
                expiredRefreshToken: 7197449270,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'AUTHORIZATION_CODE',
                name: 'bmjd6x01jxqieq32u6py3zso82ktvcuel4munfrxvyij929dbugl14omzs1jt96g3gvsd9056wxk77kl40vrvv2sivr33n2ue05szeztwhid18cm238uo69gdglaqhcowv55znqxs4aq2jsjwduxvxmrz8vepv34zug6wabu7i8jbg41req59uy3kx6htwu5hndw61f60jd4b1wonyjuychv4drgcra8slkiyk2dfx09gzk4i4t8rpkfngfkmep',
                secret: 'p7rlcygs9jm7v73qiqu5zau7292my9iaisj8gm5u4fo0hpoe902hhhos23xxh98rxnc4t1k48dmv5leik8ygg844fk',
                authUrl: '5joxhuezs0bi8eteuwfujkq526qfleqqsijtu53v61jdcon2eytdm5rad92kbj4nljcu00nl67epweu9ccti31shgsosj8595sny9kydh3lh29zz1s6vpkiwlyzotrjnjlcuoxyxc64rn5fyiln4x7cym5scxf7rs1d00vg3df6w0s83e4q5zdls3a4hirh4gkrcij2dsu8mt1hdk07z92ydu6qfd9mieuqrtgi3odmuca4w69w0fyt8bljvjl1e41v7ibkgcl2ksm8qyx1i403is4ye4890gpfz81gzwp6u0bsalwf5qg1nq0v6y98uqulfheincmz4fb4bmte0bx7qlbrvlde3k7vwgq2lxwztetyt0elcc78uwdym2t96m3ii8g9piggubvhyuyu14g46pcyn9186wj8xonh37tcguzxmbf6ivfl8djk2n7da3cjhjqf9yf47t5kloim6qujxd2grq3x97hkpkrvzkad8v5y2cwt4ub6jf7u51w2tdo27cwi1eggr8p47dx3xsqqff4irj6mucud83jdfkzu3zjxd4n7ci3h4j6alpb0ia9ro1o365fiaqvrrvy4vzc9cp81ghxjtei0dl4dnw4zmc6ba210d7t8l9k7u9nzmrogp8pi8zlybqae4sugod4iyhcla7eg1ev9e1u813a6bxf77xn196ddmtcyo0qvejuxuk7mnp62wh15q14km5jgkql7w1v5k944bedhanp1c8eqoeslbakbn1yut2dr49j6u5wekp7ddrsn23bb5an2cci8m5b7mneakpcgvxiommglzkycnevftvbmvqxt1eoi2wnzxes2uwqhamkm3d7dcd04ngqmqmc52s05trikdqp3gra4exzm281jet02rd20zab9lj7oqdilb7yal4p4d89jgifshy86yphk3ysx8tahtu9nuh8y6z78z5q66wt9r8dkoa2kbej3kr6kxs42n7ekwtfzj6lrwe5j725mihr10vojw46slb6o44ymjljdpjbrobkra1wp6jmlrvx6gqa42e9iwm8hnqp6x2rdomw46k1rjs53s9kkhryvi0w8logac44jiuqr59dxv5yse6bx36ha0au8qrzp8914xfomr4jqzpv2p637u3eucx7wga6oi0fvplemrb0xgp74tbz2f4bp7hi86443hbvq11w65dn37metcf7i9ag7hh6968b5mtlcla0qjfvtpte82q06w0ivzqp0kt67jumh985uvwiu2shzowrqvcv010ndlu82xko2mey7zdc3onctvrgg6uai8ge6bwbvgz0ov1gwurdmzrqtbxtxiyrya5ml3uj1pof53eu94embabgntgi2fce5cahw0cmbtu6hand5foemailf3behe9emkwpk26xi2gvyuq1mbgeheu90lvw0vvfiv4ei1y5d35wv22wtg4yxs5caw84tqj8xugvyjrsonu9h5hgogfjcxuyhfebc41om676by3l80dzqm5e6fwopccln8zp54ptb13jd3arvmvxcdla1x7l9pqz2ytrqaktvoudp6cvvoligna1vonein87wkccyg3hpmimx64jt1dsn1dvkxlhoonghktpbd98cv4x7ewpddi9fyapzl66ysyruwf7gedzkz2k6dmxgfqqmtwd65l9j03d5c7hzp0r579katz3d7l2ux7ui38yxym4mcicminy2gt3gjcr4gnrp7xw945htz079onposvs1d46rz3k2qb2tb9p357vce83mwuwft59xmp1ikitkdh3cdy727wps3z2prpieg9iqqtyi78u8c78ia6r5f6q7nko6r3mm71g8f1tz8xb9yo2spe08k3swjhrovr21z4dub40uafkuhkn51cfhcfsi2x28bpdewope1r3ymikep0olkomgolb3caqf0wmxxpaf4k8mzlrd4d7sg3rxr93znzjecq2bytzk84c70dzr2q1dy6l0trbara8a3u27b8r1np96xr0bpzlbonedo53yafobrxo35t5zi',
                redirect: 'bvw3mora73zc00tbz6186zof97z1y926eekqavpug3qrlwpofnxrrk9oa9whxszpxe74asg6e5n53lm6tf2t4rbvdh910sachngw1mo07a9ngjf29kwwvsu7aebsnd4vs2w5wxygr9wdkjm7fqtqnht5b0s5bkm2nrq064frrapq17jnqzuofqet9n3hmu7znpqawxj95zlapprbmmskx7wy717hd7a34fo53ye8iuny2qj7gtif6en3b2ppqt50hseehfcmx558gh8sco4rtz5wthp0zdyz9kh1p8uts2y1nztmzrodfjnu8rt2d0yzixrs2z90y4iba8mqixtb9zoaq3d5aqeogput8ttus6dslvjxu9iqhvm0v5eywy1kqww28axzaoh2gdcd4va5dl03ryx2vvuxjcepyg4npd64kgge9etgt3fl7c0vihxydkl9zr4wjyz9izh0imfa2wbt4od39zbkijbmog3do21kk9ichr51ll32tt5gykf81dkcevt4ccuzmdxqolu3ypk4ixep04rjxz17xn4sijvn0sxes41jldn0zlmwntehxdt4xnzqvdxt6j3y99ixzpnnntejn37gduhaa6w8t00hwtkkdpnhybwine7xhrgfoxndypp1pomq50fxsd6ubps4iex9woyxowyoktphha585jwpr3hklojg7c0h9jkbpwpx3fakuw8pu1qrpjp5tmprmp7ib4rt7f2mec488aum1v7ru318r5gn0en5t1qd432nx3aj9nlq0des1dcb4s6bv8ftwrcl16cdsnsak1bswnvbrd3qi4dwomm9suk6tmg3b9n02zogfubh6935oy4m2ezs0iydjbyemmbt4za1lnarei8u2x8yq00ngbwxszob0turhw6v9ghniq6vgb0wgz5dqi4f2ssnufxe8tyym9lscu0fj0fv3s53dabs96bq26q0avcpkf0lz54fsubf92radv3bwoga6af15o9ap41jebic821fwf51d7q3nhlkwf0o542ep9mcuanjwp982epe0duexbyubeu7hc7wlvb6exee8pfel63t2mms0ui1wp7pee5egfbl3rgfue69vx7hjfmvsmn89qrt92908xjicu830cpyl12sr1x9fqmlbfcivfbzozuqdqdbqf2jytzdsbdq7otv2vm5srjmw8k5j9xcq0qsneuas387uykuj9mf76yu1ozag67oss02eb3sgsixtd4hc892aq5hcr3czzvl0wp501qu61pgxdr9hgdeq9p0po0y3iaiwj5cvnarufsdr5gnnwgyca0z6hl2rcx6yo31kown5tl00681kqxjufn66x0yqbvbovaeg0b5t3i81wc8w8xqwbk15yrbqjn3zwgqt2389qly7deqq970gn4twaydzbz6rk40sufe06xsjne9447d172kb7eecaudpojjs0myv3xa6b93wp872aaavpli77u96tn7yd63ulsr3y47b5dc3dotzv01jq8y43m35xt1bwucchrriwn2j86dihcixix5ka2ks8m6z5xr5d4frplursiq0m10f9x84vl6s762ujjywqtoifa2vzejrta12ktaoo5svnrejpl7ywi6hv7iwgblm20c37mm2japll7p9jmvociubxkq06qpkyxfq770aohvwd77sjclcjk3pzpjwdlueyu2mm7qy3jxuvjrj2plbt5d7om3v7msi3coodhyf7ztgj9h0ims1xco1vu49d4y9xdbt0cmvu4l6jwtwvc2lc6pf9eb2pav65sdq1bstvii64bgsy89bhq23xu9auz5pgkw1yhijnfoupvebg21vbdf74sk8vfotswflbzo8q3psoh409id5hxjbwhdva5bj8mu2hsqzahbjbogjasq3lpkts8sa5t6sqdayafd4rr8lo8vjm4q2mzfk1pxm98p63ci27nhgb8ryrroj8isvc9cn89raomd7v9wl2xz2kuet2ikunjevprzigrfhnjvnrdbh3u5m78ye8gi0g8b',
                expiredAccessToken: 7958206940,
                expiredRefreshToken: 2292692674,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'XXXX',
                name: '9iv14cq96z91mgqu4vld1akeiqemkvx0lp7xfkc6byv6ptrc2yi4hovhzxg9k6euluzl4ht8hyowdhsxlqy5utt11jeqz9ogu6sru1m63bgxm2qixkj63orz3h7c76bzkrp0kvwo8rs7qh53uacqhlunkb9oiqt6oec7imp2pabv2xssq9dlqsm8xlojpyc4540nlvecyh39mmx4fmrtkqcp1vuu3sy16khh67mh8z0vk28tcyjk7yri9olscmr',
                secret: 'ybpqv8m7jeayhlrounehjrmcqfgqe6ahg0f2guxa3lle4j7a2rzdyij9mue56prsuqybl0902na6d4t2xx22p0jbcy',
                authUrl: '7l5sfrrzg9isrwlhfy0gclcclrdzl350meozka8836ylj9citr3f98j54e5lpplh74geyv0s5oiv5jpbt65xghz9rg2p3tsl0iks44kjczrmrxdpgt0omtvbfkbpzfj948jresd7666oau1r4j3xqnx55isc5tf7z39k37wobkkcwnky54ir9ug0kv5lhwoqwramzhdekpe6mjdt3ogr6x1vnojea1olzz0wcvjnx9bgyosgqpd34barob48vxx0b166l2aau7cyx4kl19spa1trg4qz194ftlbe591f8rfo9rc7j7zs2k142zg8f9rm5yau747fpg8k1jpj3stldmja0jqmbyuyttfcle7uerks1gv36vhu03ayjiwkawld7lx8eqhsg6r31jrgk3ha0tjqgeqpxwbx1e15nkrqft5zry9a98mkegq8kota5rx0aqxeo5vksd1mh6275hr2vytq1n8nnsc990ztwglrvcaj5enj8b6e8revhgwc5d9uz12hc4l498o8v0u9fdie82pwdimnsiqn97kwq2q1qgl90j4m3zl17qtahl69o2x6w9z35u12622ck3m2wb0wf2b87dfyljiyw4bmfov6zp0z58tgm1v9gk8rj53zr6quz2j8ddouekgbephhwvzp9htcs1anz3sqayimazus2oxbte7znnm9jqx17fm5we053nv7270wozn9v0pz3h9bwkg870sajj8sjic28u9hwnvqfm9swxoasy3ko32zpygt40g6dyjxvnskz08kuukbmlym3lkg118vftiylb91ksl076fwjg62albbjyuiau3bi8uu940i3wqtvyn7cjbdmqmeoll418re9pfeyaxw7nefeptisbmacg6160o2ir9m2pix28gaquzoiqgjojhh8xa2bgwy5m08an1m4z87z3i0pax3kemo55w44mxgkiee18j8rcajcvzlz7oeprc19os876awt7qt5b82yl0amcippzmtnt6yuf6668k6sjyh1pcih1l07v38fqo61j3b37yjrnnkbekvsxmlxl5i0pewowyzc3u3fq4popgfsuesazn8t58g7xyppmkkrnygygil1faw3ywnto6ei5yfnnj8qjx6ibsce950joz3dpzisrpcjyut4u3yg8qtnl8lwtaz83mwzegal4r9fdapy0gea5iih9rphvoy165yyzrqw7wg01xhaotwhw03wouiubgc3dk5chkfozzgpy0y21tjsw80mb156oi44yxezkheiim824b3tcovl71uattuxfeysdoa6tbea0jggl0gqauvoaeoey4knciv6o2iyradlcaj2tj9zwzutbvoloa4z1pzh9cw2btw9fo41tu06nl9r74jqm76ellta0mttv5b4aacjzi0t0h10p20bym34hyqdr3u4x8ndbtoiorhzmvrudc53zhlkpkwslipkl6yagoaqeje7fnmu3oc9snafnh7sv1zqekivmkes5wgcocs2t3apia9kuzlcp0cas6vrkjjnxgz70azlen3kl5daqheovv74h8uxwvfy82ao35w8c2tu2oio2awebnhno9h2ximjkpy46224mq6zygqaokgvw96w7qisa5iw0guedjk4epvc1nt9agblgquubcunli16llga770nlykzcces48q5tas88vyk743yilog5d06t6rgvl80gcea3st5zg2ua6t4gsj1v87jjiseose4qqx48lmjv66quyg6nbfnnuoy2ezd08kqpoan922wrqs6u6tlj1a620v1g4qhtiz9sfcir4yv83sosxtgorsclwcjjlh9srjog9fpyg0btap74jomenmg9jf6s9lsz8kge8zftd61gy4xq4tqdsd3qhkrajzxg831dayz17x998fo7uvjyqelk2yq6d6gu05kwgoguf8xh2w8jwaauucoftlagt9s14ewq10248bewfgitwcrzlmhjuatctviu09qw5obk8ebus1bbgabxybr1glo8slslcn2fo2vumwwe75',
                redirect: 'kihytnbpn4pf9rhpdcukno1fr2u2kg6s9cchisitqw3bf7es88lo1qtobi0edmuo26m60kf3td9x3r32wx8nv8g1m8aakhcxn461o9aau2snhi22wg5rkmx0giyjrj7vdc569xz728mrd7w28xaw345vu2zf6nhhni5g4mrw0v19ll80q3smczs9pkla8qpc2grnalnxjruyzf6lbnx53owsy6rci2oan3cx7wxkcke9po5s8hln1gs3liebattb9bgpqofr50cw65gwqlnnd57p3g2elhd1ronj1xmauua9l1ld90ykzbj7xdb14q8ll4t2lvviphje0we4gkad3g8cji2dymij3cfzx4p0i0ht8lrbptl7l3mclfsjlm264s19t66lo6llpcw4vu0jebt38i5oejm13azwiie2fddr4l2rnelpeq9yepsoammdpo9pf9q7ay5pv08hll1wfcqm5kx6pec7oywclb7c3e8rh7v05m7erkgqm8jh8hil9x5u7dvf5wlv9uc3t7mdrgqxdg91kmsvlgdeoke5gruf14slqwhxhgz565hey3oc0dmegxwlgkxyu1slpg68r4mc3ve6te2x2smu1m824tunkfzsuyr4s98i2lmx970anaiqifh154bbatxqk7nqh1dqzo8ntch18w5dyflt57uar8yktb77wr4r6r7unwqbljzbh32lly014mb0fusto57lz8u0lcooi1ovwn1h8wl5gsbob8gofzyuvin8dnechs2yfptaf1ca5ubh0t2wgknfv6puighdzlsvyi02ma2wbs1olhn7q94t9xo33h9qts4i217j6mef5mlns47cq8ptrn1lhu8xv3zx7qupj67k9tb5ejuor85uemzjmazwu317bcyy86zgps5t84l7xavxff5gwmp66njcvs2768ikmmh1l96ejeywuz7foa1xs25d2zk4n7kd5vaknvp0g6fn8lsloj9jroflkljmivprep52jxw9ngmgtog66dxmozz6mcggba3880bxcja2h6iss9zqcs63fgtatfm2lk1qan9sqq8yw6f2ch2h8mw5yhl1solqqjjgdu5ey19tlqrdf65z52voaeuop845b06s936tqrtj8rb27xfbhz1wog4kjii2ekowpccw3vhct1l49f9tzlb2hfly4n7sz40tiz8kfm1l915t4sulircmba8gc0grp47eweq188fy3nv0df8pbfl3scemqvik2r8xyihw0oi26zaqn3nn1sdxcoqh9mbga175mjlefpvz5o8o846ewnh7ut37kj4d7hiwawyocx30lku00tkryb8jxtzotksw0oqi0wsw84cglzg5k37c09wrovieydilr2mpr080h8x2bkn8rq7gqcfs8akyh9zzb65u8t8iiekxybc50j3rxtelbvhojkjkes8w6odkvmem5xmvuq2oq476kjhc9eqitct0vm5e1e8m868u35fhy8kr7xgrd6fjj1ydohjkoemr8wlx950sr986wp4dpb9a1wng2ar15qwvs03twszqog6ta98w5hf6dgjlpctvtk0g9v0010qkg8fxn5fivrsmn4cyjcfavfj7i1kvl9gs4o8d649vy2xicefjzzzc7u7gldh1qs8hm2et0d2zbdt7zoq62p7maqlz5lnz2j1fggq8zjlsdu5qfxwkxwjkbpv23au0nr5d46gcu2r6bszk8kxfiphtda6p5410vcyh4sib0b9d0vn8lh8n01kfi07fpv0ndtr8hloauoza0f2ukm6ayc8v7948pgrb9tdkr1ee8f2b6aekva45z34doetmfjz7smkodm67lh2bomp0tqixek7lqjwzroq8m013slom51pt8ubcrpgbmuodrqz1p7dpfe7kp5jkakizfoq45mr5tgz4aeb5wqhbxzcstczeoht8gm93lbb0wxys2ico2er5hesix0400rncfspseit547pje3xivqtutidxr90m1aou3gv9atoz4h1xtd631s9a3mu4zl6p',
                expiredAccessToken: 5770657850,
                expiredRefreshToken: 9371382799,
                isActive: true,
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
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'uiwztwplzkuehowohja9j7ex7egve0k1oo1y9fc81geo2wf6qa5lqos1l6ria8btg8irmltnrgsqh92rz0611fmnkulfxvmvp4ggjwptvodmn3q64py95okp20ryyyu5ov7d2cfvom4ps2272up80uu92up7ot5ruu20z3wyd3rul871l5giuxdqsce1mwfa4898yodwv2ob8d9t8crib1z2u1umw1i9svw52ahu4unyryvmqg4ylyoap1zr32l',
                secret: 'iswksk5hos7nrnzx8f2tbicb6u3oessttjnbhd1xf957b6dam36nz2g7ebyoktr4df9gbfr8m2gm2xq3g2jrrat3b9',
                authUrl: '1lx0g3l45p0k0a2sqfvvvoq9zhmcs5lx6lkzehce6w20d9wl0dp9iosds6hdlkym4nt4jnyxhywax7xnuqxtr6zdumhd5qaj850lvvcktoceeer8efk6mktoghjn51kgmq57l159x46o4e1lo9nqih0dmh18m3mnu6yhozjm6gxdts5cz77ujh3kf8wkn2whuu1m936t66gudcz7ycm6hhzyfzlhemm3l2qtpzg0d1jrojflsbfbuey7kgb9hqgb3zdcg99h3qqtyzziu6kbha3tmtgpuuks1qakc53igwutwz4rc1qs644dzihvybbnxphdmcl34iq7wn9xob98whp8jikb0cx4n6cv1wingft18rrscnsjh63pnohh716qgitm2nkb4h53zj0dhg9oyv48sa4oimnc4dtnjehxsesop81ykvx02z8hqvzl3qey0lcp85f6yoo29f8pwoj54bz87ucorup9xktppp8foa6plxeohwa23814b4eumlrc2zs3wqoz3gfl36s4gxs9jbs08q1vkm73pt972wl07cuoetuz2lcu2hdk8cw5zjai6grpp1ljq7yubqkytpsdgzpypamkai2aboycr18yhzixdq0nrkvkda8f2nyi8vgkjrew5hi48kohjmmxgr9boltbvyvhbp0ruwh7ufhtffunt6cj05ecn4n4gda1y53du4uehfabi2n0wmlswsodkcssxy444ivd20o4r0vb5xbij88igtjmhb6pylp8bvlqweycunx8u3pjuauqv7tydp9v8qdyyh8txvfgnt42aeutlucys0vd6e6webcy8ptf21pwj2d9cr0lubd25iipse0y9j7rgfh4ljwuiat5utp49joj3g4jnf6zla0qua0txdidn6nwnpgmoa1ijyq7mfv203beljsqxuqsw1e5qp38tupuvmrauvmqx9st4h3xcan7j0w32t11fs3mtmrk9nt41qn2oe5n6x3lw8cwu7m4kh9ufz4919tzn1g5vo07z4ihd1mn6rpfy3n0vhb3wn6pbwftc3b2fhza6ksbqp4scrc6zdfpfcz18yqhdwrogrgmpqe782bc8w80zdji6yf5c8ljq6tlg31978flna1vne1alk4fhh03mruus1b8grg16zy31mdhon9ru5stq25i2bk3xh1jmqfl0mn399n5ijvzauv764t99yzztv67151irsrh44ditjtjqrza00hxpcp4p8q1imy103kw56u68fijx4mio4o9o0nv15652vi5cpg5lkpxq3fgxmkcjnjgwxvr7v0epw5q59prshuarasw163gchnii53sho02zv8bt73jo5f2frka030i7obapfxuah1r4dkf5mqr1ql3dr7ev2s583jxtfy224yd6k3j7nd91cfdnxb135jvakld0vga5clx39e17oihopfrehmzkjjscxgwzxeek2fxkn6t6wce5vwcrovgbpzckr13vicnks7yk4fnbc2t7tjtztr9dd06826tw34jjifcstrxz0r19vi1rtrx6adutr1lmy5q1cpzc7ygf240pfynhk4dvdsydu2b2akb2kn2lfvt67ec1k81f03b83tkj92xhl0ihscfzajivfz513l40cwe3a8wn3yycmvejvd7wlw84o9qaenagzey5e7x94tem43j39zz4egaqipauum1rtu17k6863rri2kp98bcyor6hnrzg29zexhnpom84449rdrh8kibly35y27h19vwkfm2ky1ay3zae0dhdtyl030hs9smbejt5gkdtllrbqs8397hh82lx0twe50cec1wjomn7anhq4znf9vinme96a8xofs5va1o2bcbrqv4cqwhqlgn9bnhzdoj7use9q2khq5722qqw1n42d307111bx2i6k3w12oijc4mdmfpdywb3kug11mlcc6rt8pl8ubqi0awo3vetvdsvari1i1l1nz9euci1j1tznwjasetd24eir19xa9lz2l0x55faqejskoo29hh8b4sn821klml',
                redirect: '23629vdqbnvlsl642qkr5hbp6u69lfcuteteu6z2kvikusykxpbxahrufomby4m5lnlxdpb0acwcqnoc2cw86u6td9ejujignpdazkhjtcfcrpl8yefjqw7s1w3ecqn07y6c2mocsj1rg60pdywerx3grge1q4w5vetqn2yb5irq2nf1zgdes2ftcpz2v0lyrk2jvree6stu2f6nk3xf4ixsbe9rvgqwxj4ophndfa7i8y97pjppyyp358oq1t9foce310bajvyrumd2xvp77mb0xflwl31zrgmwbkkb2hsyiueiuigxjuy15jn7071cg3z9sy0z7c9copue9nctynf90ehjrbl8ar5p3ok5d7i53qwdxcwvyjvmsmw7zkfxbwk9h9n8zb4hu49b8dy8netr1e9qrb8024xxyd5erexobsch3npn0kddpl89eaqfnb6l62p5wh8jf0ggjncmt9pe65isuic88k7fbvnyfldbg0e577kjqhsxjsjbtmvv9j8muh6uddsg0r38corinac98ohfldgserga88c3a047fp3nbretyz7hww5gll5f5q5tdn2o6c9khf0bcvlwdq4805x4qwea3c919hbrcmbd8z7tfdq85b8ndrtxzpbzx0j7j78iw52lttboh50ywyqqo9581a4tac29o844h4rbgqxqtd4ec3mglujakr684oy43mgvxx7dl9uw3oxfeynlalvy2ar565u72nj71p3x97dyoicoscf3e631sjiat0hk9i1cpvbt3chbevkt3z46bw1tgrd0va6jx97k3uch9skd8tgo34cu1qs2fy8ctj05cy3u1z3kzwa1pmvcbnz7582lmu0xdcbxkrn8rj89i8l721p47007fivpq7wgbzi2ab4lju4y87a2xhkcmkkg6luo4vkzyu1pazzyxt4zqtjlsqq7u7es9i2e80wcp5mg017yooaq2qez07n2ecte40ae4e9f2uglb26et0mcyo5nh7294ma23dz9aeby4pikcwxqgmcf5uymo4grqqeaehy6u4496h5z4n3uyzb8nvavnkmv9o1s45nb79o8vjgpyyikpiedyoyb3rlcqqzp9him7xvhzgbcq93fhezedu8m4svjhom5fonbe99hmdz2vjsxk20qgwtt7jrjxgzo8onqeubo39dje83hkf71l04au44jsrxcqnvz6z2adf0ecpg32bjdjpy62nzfzyzm6u9n78pqoedlthniq2jhioq6c3309dcvv3m6qm295wypy0ri1tt824ec531i7cebus40k6j7nhh8xjks1bc2ie6d8z4vdht79rtdpiviyzhnec2f0ygc9gehunppts07imr1sdqebncvu85ohc0lqzsh10j1rw8bg6733b3n1prdyoy5vw9fymvsn0i89e8t4i5ibxmno2uwe6tcdd9jvmv67c4ofsde897zqza0n6z3zsa3l8mnjxh6bors1l30jacoebxeijli2ui013egsugiwkubu8g1mfzbyxzeu0oebwpj47ybyncrurue543kns6ezxp3b7s35ue871s9d4w7y74tw9ftrg4r2qyy5uiq7281u45tsagtoanb7urhtaupaaqellbqgp6oha3tnxz3tzh45lht5diuljewlmgn5gvae4pqs046sjdwz23fpn4majimic0irq5nj8l2u2owqjvcqwh5zzsxaatmqv6k2f3m93wm3iuxnx0d1d97glrok3b3ut7imj6r4x42sw02kfid8g4debr1tp1db1is7iyecx6vxviksu51ypdsl8elcaa2n6n86yj7u6p2kdmrskslybyc0yi2nytcc42d0lmotk36zsbb0e4eurksxrh38yg62c52gj6va68vvj56tzwbzob6iqwm6hu7x8tsm1sf5gzmjcsrtsyfzqxc97cgpjm612r2ht6yt2skbrjv23j6xjt757kvx97tgi4jxh1fz91zqg0vy8wwofbbw1suhjv6wfkcbs7bco22hhknmhs2yfjf43mi6t0e',
                expiredAccessToken: 5948953061,
                expiredRefreshToken: 6266283593,
                isActive: false,
                isMaster: true,
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
                        id: 'aa9d9844-53d1-4103-a870-b44256de4251'
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
                        id: 'e5808186-b264-42ca-a5c9-70f3db2c4434'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e5808186-b264-42ca-a5c9-70f3db2c4434'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/ef457698-71c4-432b-ba0d-8160cd088eb9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/e5808186-b264-42ca-a5c9-70f3db2c4434')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e5808186-b264-42ca-a5c9-70f3db2c4434'));
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
                
                id: 'ccf62d57-afbb-4f0b-8aca-9ae16f82af49',
                grantType: 'AUTHORIZATION_CODE',
                name: 'tdpqq59d33ztjasd3h8sqb5q029jpov52iencvyyoqoluizvk3kbddgws0psysq5p5c000e9u3yw2l4fc6x8c6q2l10dnd31adm8crjuxulsisxlt87xhf2wp76p9xed19wfb9wrtygv40u4r01a5nf0sy42ha52ts7yh4f3usojzyigtyz5elskbwvcekxgpsgmit36xqueohiyno52x66l7lcy9qknt89o738a6blvbslrxixxr5j5r46tj8g',
                secret: 'v5w89s0tv8bj6k6polgjv28kxf6sqsaeaszwdflvto0gfvdyrcw3o4nrkaq95hx6qrje87x5fxr4aytgoz4bqjgup8',
                authUrl: '07e8zdgs1so9389yezticpfb6d7t4zgm46v3pl5ssf0fib85lhs2jx6ijapdbt76x2opvdu475fsie2fom850a69ab4e7bcp1xzliy7ix0pn0wmnrt5eph4kzhvca8ws8mqycx3i3y4w83c7dxvq4owi046y9q8edrflh4q0eb5bh661tgjzm0u6ae1gmgp5ckce3wu2q7zv03xj6gjwrmy82lrju51pfrhomnxwspz36h04h62nhx09lft99f8eum42q6g1cde3z8r0yep3vjwhpnn29ltfwfs9sckrxw8uco23vbgufvg3zv08hrluqjpizv442pix3xvqbukx465ej2si6ve1a6w4fpkrhu3ijasusdtk7aplnzxky4g50x609kfjm30zjkw4lobj9h8670ig0rdcliw1vx006sg2fuq4tm6ydhayaop0zw3if2m3x86p5e5666glyxk40wzawu3rcp43aoacvgitk4iltqyq60yjdznqi9u15g9c1r1g4gmw6if2ks02gqlqi6wyz0u2x0v3e6md7jaqogzf4mefvh67se0yr2rhhhawoztrepr8rbq36c3f2qj7b1h92l4z7uya1pt5vrbugcvdakyyf2phs5y52awne8byk3bkeebd5an70elloeslblferpbsdfulsgizcxw2xihu2ea6ecx0px3k1rkcum3u7xn9oasuvxus37cuxcwokju6cbwki8u2zew0dcldj8tqpcdtue1ygg72b1ewb7w4o8gvt2ovvzx7msklo9v6w50l0xgikkucple0k2emgp2frotpq557fgk4o90zl18lr1eltuabs5vyszmz1mpkpvyadkicaz669779d75djqz0exjnmtdem2re994wnflwhzt8y8jz1fknqnkhdkgws10w6vmfhwp839o2u81mrwc16csga0zpdij3r0u450vbrtyy02i4dtpifk4yakvk2btwnw6l66jfkcd8y7xgkv9pnc62n9tgnu7yfv826x51h1yc9uenzr6pa2ggd96xi5t0nvjiwqpx7m14xh6l61p0lc13r36go58xuwwzhkyx2wz8y33r4vxb3o60fp48jh3lxfsm14w4bdlwp88hp0t9wyvjs5a8dst8cy2frx1wc4wvr1sn012npalz47fshkjixezwade3rb0q3adyj4ej1fadxu53b9z2cjblb82ccb64go4r54igrne6se5uvoa5982srplg87ws3sapmlj0vfbemdynsai1meunp134dgral638jncqlcniwx9jmvcq5rl97gnngntdcodguhhdy67c87vssvjvp2aqp17oy2gljmb0wluhr6apckjqbh8xlv8o5ema5keqo6nn0p62zl5c6k6h187xiu3ocxdjkilvwhkvssxdgcfxk5d5wwq0hb0viqmb9yevno627pu6discqy2awux6tz3ifupk9nn61oaslorsc5dex8pijz0sz61qrqoyxijiz1ks4wi17ddyemoh8hahb87ap0h2a1oj9w5eov2dmrise5vhxszmas15uo3qrgy95bgahgw94baibae57qvnlxzzpnounk2h9or7r65iky2jucq55sjcyzmhirduoycgxx28b8h1t4r9oybfxew5w7mwf9xxqlh504gsdfdgqm8vqsyjsy8514hzoud5uwourbudyfj69cpke9m5w12rbl7wa25pcohtb52o6a0ia1dmf96rq7ppsqrtwqahw3gqv4m8vsj167r7updbq3k4hrvfe5u1pmo9fmklm27ldvd47vwrhd7xputty367puzxoxyihwlwz0k1zpvbkaa4hmao00ohv6rzhu7y24oybh51m5jv01svvirxma0e19l201qdxfjn5qh6ca77z6ln6vdyfwbujgxzxobsaeh9njfmfubrrj06k1llhbeatzfkiqb5nzn9etgyts2ln69n9adrtp8gkulfuy9jvc3b32hajjzsecz1smf7ewxf3m30wowghq9nuy1luhgcxihbujgevg1k',
                redirect: 'tqujgpbfypb0yqeu8kjzcsy7f42qtqt47mmkrdfzdy3ii11k3kgzymo9t6meddg8z4v0zaiqov4s62awc8tj9miw3732wjxio5vzs21473w7esror6ddbj8murdnzoss194j9c1k8blx0ggb0zyp5f7pct1hxxhrqqoie1ggc34gof5egvdhvjb8m1ouo87zgqfsk6l3s11wjs65d13pito6b46ld6zoopz2wlbk7y460vlrcvk14hcu821bm9wvgsrutwnw2s9br7xofa7ypxgpzptrujjqzs8gdq4fjcllifkkxnwnolzajy3uqr3si7feh94t1h6ksgw7fc65k0kuzydtxq1xayfvudxkkazyz6xtmto604yrwkic2x93c6czmu9e3govij7b1m9nvxi1hn0886stf45vyrv5hqf9aqxgiq7mvn4jfmtto1pegop5cvcpogd2wi8tb84uor7ik5j81cy6syhr2zme2di4s2yr7r4x9rch6z8nyzuz7jsfhvtkc2gahj2bm84fjzmr1lh5kua49vnllln0t6xwzek09r43nmdnhzszvyhbqpfbv9hlpeumk31rme9db33gn5whjsk5dsux4yodc7heauds9xva27ockvsea52u1r4ttbth8cc5mplwowxe8avc4i93z82e4qby1oxx9mwvpmdb5fvsd5n37y26y2ccjcj92me5guk3dfjixncrgtc6a4s6gp3iwcuzennzjuutdhtywd86v96ar8vdrygoulbi0yiuy34ba4okk8nm0uszfzk376gqot58noo0goipwpaqdfl92hf6rsh56mfwxk1fhlmgyb1vuulh9s01n4dli4eb4s9kxldk9n91yx9p4sv5hg00itpcm1fpkavgzypugg6tybwljtonv4q0hcnxkz2xv1mk24ljhe646c9rdo30dyjstky428oj7mz5jrhrtvvxl0rff5qyzg96s49zv00jel6argm2uw4tbm4gm5twv4hwt9hlq0qm3i7b98hnh6mqcm5gknjjkiq6ugh9j5ewte247jrk9utzgnyjb68mrs922z2jq17e1ql7wp0pq2lbqnqumc1ffu3418jfywh0zp6abwufpkmbpgdvsr2r4lfnxitzw5civo1o8bxs0leifc1shh7xwj7p9heyrw5s148d8wqhdybpvzj4ua92y9gejm3hoegz8oauvj8568pg98h5oierwj63ce76mshwkovbhsup16ht25sb8014v70hg9fqyrn9w7doy7scdulkxn1ms1c312wsod2fwryocbkgetsdjn7reof1ubg0rjtmyt0hb0zb4g3mir9hqbvxlhn6i16aptk3is1ravh9cvhxw2rdxadkey9hypsrms3sxlqtp3umyhg3ap69ipyh7pdr2gtkeuppoo42i1wwddbzl4kj631o631xldz4fsp3z9uqx9g1ffi1b55nz5fhzh5ziwlpz3htp60k396f3ywugpsugjucwuada8sjrhdijp5mtm6gwtzy7k0m9n37kd577axx4roi59gb320tkcec3eq93oq8i6apfub1kq978zygz7vnmoz8f4ci0u1an7s10eowvqkk7u6qecadm2zqm7a2y5sb70ymnhmvs4jol3gazdyam64nvy5gnm8aevoddqm0c08777rnpoxc5pskppeg1wunlpu8ir8har4avfr8k8v3bn1q42m2jm962fmaw1qh9jevouwphlywbdclablz7u4q07r0qdbmygepnzw6zy4wp5r2qx4k48ilkig2d940x65d1ufn3nbxg5276se6vkyd5wcrdyxpped757a5h9su27wtrkz1ysf1682bpfoa3fnky4gwpr4maycqa1zga5bqb7836krnrdilu018c14sroyzyfx9lf7htcibrq0r5jurtiy09oh4nakxby3ljjqrd2ifzzk3ysz94bwkbideieettz5q1di8k1ycax0e8nj0jb3nl0vtygyszld0hkf5h3xezgqr317q95l2k7lewi81',
                expiredAccessToken: 3779545898,
                expiredRefreshToken: 5979876067,
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
                
                id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'ct2kkefo5hb6y1v7zi7ah769snvsfdfj5zvboiap9xa5ojlcc92dsg4imr5l0o3e3ot4v5ohsdyu14x5pm4chr8yvvhd9x5umtthomdzxhp8v45tx2px1gghu58gyrnxzrjldzs8mttfh2ap3gj9rk8p040b3vghr3nc8f99ha119xs6efdeiecf014653z710k9pvhvi6m7fl9uh1lws4kpn1t0s6lioquuc8bmo3inkldecc4mtg7w6gql0ym',
                secret: 'xxcm3loh1m2deqpiu92w7ahnjjw3xvsttm56c20a1rs20eflo54z62atexxila4no51z5rwe5n6mes2y8douz53ebb',
                authUrl: '84xott4xc4plitmgirs3909fp0dq09jwz8ihncanon76t4jq0rvqwndrnbmx88m6rxzo66k2biu6y5mag8mnqbmwf89wy5svuqzyr1kev7t4p5pc8iwbwa9krh59wx6ahjgkujj2u48klg1t1wni3qrw8x61u38ov8ywcqwad2idu6kwkk3o2b0la7u7r62w201z1ey1kdl49aunvzclkcbeqsvry5dg7xrlow7hraua140ccpgljhc277e0i0bpa2p75inyh5ovopwvwf82i2hfafd6c7ez5vmm05rlwa5r9jdkgr0x6gxekfak1oba1vgfef4g4fwhy45te0qc1b9zwntko3rlorii58ckhrfiomdi41iwak46athvhmvcqapyxw4611ebklt9cxmy2j023m0k5a0zvzcggc3tt85kjmutp7gw5p4b5ca5z5vgirwc4a4irjmdaqpvtej2k9woair09l3lhjnc1dnh0vk84uxynphb89l7g4fi2q49eh7hdrj1c7lop9v07zc4qe0pegvxpodr9c30rdr871oloyjromtb9r8g99ewir2mps1v0ucqbsmrttrbtvcie5tf0jhqdxxx3njugrjlamqgqkcaixwitd2f5x5x2h2tt68abw94x7hjiox2n5jmmudvzbyekl5j36r5smede074pb25213nihjzkl05ml63d9dkvegz4547a078zrcjx82q7q74435xai6k9m3unyv2m631579q4kcwujqbnkwopj7hnvpm4081xeioouhre6amlpq9aa13dqzdhv1kg0i8ud5ub3090q8x3gt41u30jjlvvp4970ts8j5xcww43gufh584ww15mhwbdxpzxrniyc9uvprwmwshdel7mquqvcth2qr6li0elks7skwl3trgpnymq9g4mqjllf8lstgnsw7vrla47wjfie0jt617tjpqjn2waejmpmjkfp744is3kumpomxlatrrx0zv4wxojpqddtb4m8iebri8vpjbl0fs4auzixr4ikcwj6v1ljm79pptmda8zmm3d6hs97idneshf9ekklegqspqdo6laet3kw0vnr93ecjvm1fc37oifeaos2a4svghy7lglqaqhlyx9i9aggzi4iis1by6j7n9nq2918wmpu5nv8bma1krt0ut0op2hhokhw700fs0df5nw6gobcjpevwsqry2vv6y321pqti96k9pcraspyzw6w72jt2rggkejz0hhjkk8w78t62764163zwt8lrv2mm56vuxfq0tpznrudq4a6mvs2t2qj0k18b6w2a034zz21z1tvlyzcuxdjz7h4weahiprysiy1nuvp0t9h3o23hlugc3d5jgnlhbe39fpyt8s0zdgvy4k662ohcdb135eq5vvqebchjmkg5gy6w6p10z33j7ojmwgdgsb9q71qx0tm2fvdmyc0uzo9mkdyz2ihn3dfc19y88p5686xxocpygeio7i24x12gq24fr25wp3xkewcv2pg6938lqxgm6szsqn8fsgrmvq03p48tjri2ngkfqnbaknqspmvar6xtkfn8s9wxat91gjfx2l1ov6yobfa3e5lzdynbs0cmzfre0e4wkko1f41lx3y8ucfn5bq59440iftdfkqvgm45pizz92ckvh4xbe9ezolgyz2jrwvhkyk4tukyvncyl78fawh3twqghf28tnmh55voo877lar7zfx8gp0icbj3fs448izzatyf96ic2y8ibf72ufl5bdrsisnzw29o0056i4q8sm995lpb5e2rxpwhnhv5fwaqb3yb8a832spp583l9zx38rv61wa5s56oaup71lpmbqjgcs1557jqypg9eag7qnk5fjv5f3cxdjfkprwvs0sjw42ca9ca0vlw9vjjobf9lacw3t8nqixjuucwrn6b43ciii9jr4565l7hibojgdr7e0rzb9gvozcjvk4itxjkioykq6y0rja0ezw239xgenujhkkjx67rqbs92i7lgs5kucl27obsu658pxhyo',
                redirect: 'dc7bovtsjlbn81u8e0aqpjzq6r4b3avgameeoygqkn4dc6xa1epyc744e8mfu7av02fw3sbftnf479odet8y6y562zknil429zeaah59r95x3r4ttoj79lq8a2hd4b59lcylujiqcdltrq09mewbd44w6f3ox0cq0zxkfppe1lb6wzfpvbt6yjald8b7ignhov2lh7uuozoudmni3f6qfim3em8cu922vtyl1cib6zfgn8fi1dj60a9ek4vqmnl82j2oh6zdt2vafqj7ffque27kcd4b3uzl1fj07plz5kh27ijpbxhzz1rrvetcgoftidahto875zd677om6xwxtidcn6gl15uxxotl193omd007p4rhhzy8s63e3pq695m5ebo7zgdukjgp47mae7g1axoj2kbch4cnu3r7w4ssoocwkp5va0d8p10dl0dolbvwrdvfhaavnhrx63s0x4nh3teupm8ldfxue99whp1eft08wfr0pqa32rnslx6ptqi3d3gghklmie2726t0enqieqbyw8jc68dy5mmzwv4wwi1idjech50lih5sv879mx80fjg377vcqens9nlcqe9oedl0i09a5g90rfcvix7gs30goo7byxh62gw0im5kmgv98b2567annot7c43dygzxykrypinpq875t10uozglvlcgqkwexr9cc6oac42bgsqoe0vnwmvf13hl2hswe3xn24efw8b37yr40gv2d9m46yb3p2lamqgfot3memu06xm93zgq9nz9j9f92yf6o7qfxlekqdw1va93iskmngzb60ha7pvh6s7k737obtww37dpoqcrr31fjellur2cwox75a63qclbtskkws5g5fnc5k4ud3wk5mlevavumilsxjdpzaoun4430mlwqh48z0s2gtyst9rj5egbyv1zreuwe9140unf3gy39t6ihdxg3x4f2xelr4knb903v6mrzzno19z8bpelbt430b0y43h4hi3h447pxwv6fdr5s147gccna8xkrn502nia4u5adyljbs2hhre79sjraahp9mezv5b5lelglv21826yg17uzy89m3cggr43rr6uqsyn8ck73me2r99h44ox9r2qqilrwa8e8cpzmzbbw72zrqvv9oi49fp6tmoqri9iovqkb3cqq472yo3z9lyiake0wg6ntbzsiufxhc6s3gyfrcosjwxm74uje1mpe5e1uztend76lzjd4dud3sfbufapwlrbatnpup4bgfpb6bdhdxridvip1b48jobplx7zkfqbrwwps47u5s3rlbo99kl77fn37eujb495mweum041tcauoth42dcso5czb2eibdb126953gjnpu56hf992fjy6amydfjc788it929idlbdgf8nbuoodo8u1ogu3hdz2yo14llpw3655nhfqkfk5ym4ihqht51pd086o2ogeaz5b0cjrfe7lusas9afxjyfczjqtd17960kashhkijcq5l1ttyfcwk46q54n4ufv3kdqp96pxbye0d8a6fuefhhybhw2tpt1he8wsn59p0i9e6id7onj5dg8nma6atyqnzpb6vn4ae7u53hd7my7ij1v65tzb0tezchfuzvz8kfgt1wcysbpd4qxe9kwnkezikr6wwjo0aick8eo212oq7x26lif5obm4wihjnhdqzbjkuvkjlodlq316ng49ks7wzmyhmg7lqbiqurbiwp36zgt1dcrjid0gzmizfy34asw4tqtu4ly6iamcokgsk1exegzoqvxxkwvmcx5bn9w2jcoeepiacx9pzdnxdu3psxgnj5j9690nq3e4k0jah5tcy9f6j0rfitvp719tsp7p6ot593e3ln4s7h4c65swh37zhj8p0rogv6av6tgp5ks05v77poygne9c22vx85kbimwu3k9fjegfrex5o6xecbjn9nxt8rq90tajg7t86y2unayjvo3jgzg1r4hhbszklzi8yz8c2xljzt7870vhliwstok89u5js0702i3cv25uriyjakb6',
                expiredAccessToken: 3565711598,
                expiredRefreshToken: 2514965722,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e5808186-b264-42ca-a5c9-70f3db2c4434'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/640dd404-919e-490c-9280-d14f4063f8fb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/e5808186-b264-42ca-a5c9-70f3db2c4434')
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
                        id: '51bab009-224a-4eb5-ad0e-1440264cbdc4',
                        grantType: 'PASSWORD',
                        name: '4ew12s40xzdonqtdqdmbz6bxbosz1tkc4zsmka0xhtrfx5hsy7b7eyskttlvj8kyfxn1dqfn0md1cz2nvgjgshtj8pc2kw46kk5shxcy8p7d22cwon7xde3ok4ifg0ksm0acrdzw4sd122du616dt78edam5ofmh2zvkosj86kucauyu9coe0z03okhai7xovnc1bgh0f591kat9q9ueywjk6dnecl0sbrghr6civgi1s8hoi7pkekzst1t5y7v',
                        secret: 'w0vaoltyj8d44e01lcwjhbcvwt4wgakjcc2xyx5qvsnwlaidg7ncqscyfddz2qb7bsdpgvkfrcnhsk1m64fac97kds',
                        authUrl: 'g349qx3id1cqh7zj8k3rzog2lm6ahcacdojhhk5ohzzvdzl72wjn9mrsyse4gh9mifrhcciw3262o7ph5054ibvxbbai5gfn3vhxj8xa4fehpam5a0iyh8ntmhneqpf0o3tuk6oz9w0i6b017dh4njmliykg5esm1y46oj3eq8p8hbmwuafxwpp466bdgsdjt2dfj9cky4g4w0b47oyaiyocrpbdyct0ae728listtg4yl7o1f0ba2z1u0slp7qv029zqi1k2wnjim2hhuwh4a41x30d6dmq4yzl1uk15bc9iclhz6cf0aun1t4ixfiuys2jxepi285icm0ob7sr6khfh1f820h58x3s2qpo0vu3jynxtvrfoix84ji0m9g5siwj5rxgmz1349ob1bubmtb1yl0uwms3h53r19saph8o60ivnb5hw9nfaw46intn4ugk9mo7w0wmwagyxt8fzz1p1o3fzgiey66v05cn21jrmfefa75l4bb9qlpntf49tog2dqu3xkm1xoprt93k39u5crvv6wrcut310fi7f6ne506nzli6efhv807tby77zfpo61a2o0nf9ocw3uiadvwyjtfjwo0v4um2ehaqoqeshfoow0sft7fldn5dumtweixq4tf2ihu9imli7p21td3w5hhofoyshknvv7734r8ev64zuzwa4czg8j6c76xpjm3yja8fse96qh3co7wlu0bpyjr2b6tmcwy7oze2srxe1z0h5xp6p9bavhopb2ectkmkwxpdwazdap8s859fu9fzkzj404vvoe4iunp8hpb7hhq5p3x8s6g8dyl13wa669c259sgl8nd5kr1h4fm2286k93ukrg62xyxgxtopj1pg099r97zwsmuexlshvlheslfw9tvoi6bff9vxilwd62a10weqsuv85ivmnuq4lt0wksbz2h096426kpvzyeffnzikyz3098f7glzdt57boli8sqrauszaq3yrk2zbxc1014cqkuin4ksobd3wnm9r9pbjg67vgh4u8gstwelx0m3arb8n2qnrrs68sv6bnbhgscw347xu8q04bgiyiwol64g49me13thgh7krt5ls3vndbw3smjh55qan0u9d7lmg1ncc74uyn21rqsf64slyts1nxquon82upq2o0ttlu4yw799z6xvm2xnbapslrw3q6nutt2pkeqq66k934nlfq2caznr32d4g1c679j57mt51rhlum7bgfs13itk7pk0s7xudyyqrsjp133duge1bncdtrygm4dj2bgull82iyl2tsuydp8msyk0mfqb60mcbk2cxwy5bwtvg682lpvnltqb8v2gqjv2l8uihkutq1hhyvrz585s734uhagll0q1yq3uwsznmvldjgh4v0ikvz1kukuxpib5nknpojk67svemce8yil4bvqz3oz5p66s6vunzmvi39nd63ovpai5vfiftvb4m20y2xpc8llli5mjil8dxoq563p3snt6r86mdausmd9bhcjwegloowz9a0byi3b6612kcm4k2nfntjggbvu4d0r9i6rawwrp5fveica2cs4y7ck0qdhl0187bxgolbh4q0w2wywrkutqold4x2ixxfffz85blxcg4i40aiawhm6g0tc0762n8hn7miv3vo1bl5vaz006b0bqy0zwdz7fdzq3vvu9qmhm2evu37z12zx9lfu5ne433i8dptk8105wxfzle9vap1ubgs3c9ph5fs0rct7ith3pjexabqzcx5ftj07iqq020q7pad4hvleyecx9nhczj8yzfhols618hy7jkkobdf8if0hhrfg3v7pbe0l5rf41e6ip442fiupzyc1w8fu1izyyx1wxf2zlqlbonv7yhflvwich1lp6s2p98wldky8yg2miuz0s5ybyqu72a2qhj7f67igjbiumprifd0knyfeexa1v54fsugal3qobgzlf8ncsefucf71r225tjgf4bgwrub1r5ev7jem2r1hv0w2lj7d1tsz1pi0qcsqbmupoxm6r',
                        redirect: '8kyty8s34oefdmrhl4axonqyl5oj7bbrgslndgsh74h4dhkczjd6835xf2re7t0wxpvsf5j3oh1bxvyifjc98uqh6xk49xr86pn1718z0yon5ug4fdumb0j3wmwa6oht2xh8n115d84p3gr4lkqtr82kiplaanyu43vf592zaohwza4bfphlnigd9wntkbc7r855p3qlwl1l4nhx2g5kalkthf572b2eo3gz1zgdx5gji6ih59q9pipxd9zgemyf58cgc4d4jjsw0rjmq5pbahub53iq3u4d3ns8l07h8d7qx6rpuoqtya5o4puz5sur6detfaeoez8y6l3w8l1d8yonjpha0ozaeborkg0a0y22qb813g6dfnfli61qrgy2ufvjqqsil7btarue7v3wt6qifb0ygq8wye48fjqfono56x61ct539lb9tg2vql5kjrphtkiu9jo2w11dsh34ilogn6kwjg7en46kaxett444bbhpaasq4l6rq6rsnxhp7g1q8nce2h2j22a2haeriwewgbz2k60ir6hmc9xz9mju8v8ef3q4axoe4c27fqux9giqt566munjxm33gi9n4xcheegn63tfk81gk0dh0sna8vrmz3eye98nx5x0eo7ypj4sb0u32ux4atr8kw4dicmboeik8ahkabajmxrta3ct2auu7tmgp3nnqov2uqe64tczzhy2vjo035m0lrq4r1hcti4elu7o7lu0pbr6zf2kl63xk3hukbw8kmyu6zv7ahgfvxdu59yelb8ahsmyi6i35dky5489uokbujfpgh2necih3xxcgulwt5soyj775bqnb9ljlv6r05tr3olhizotl1gx2bb320aaj7jdp1t7u7f691bbercelns41ovx0s2h8vc6om51x3j0aeehr1x4f83g587pnqyrn9xd3yvtlc3fpjvv2enizeezi1ktc5cvhscjsspa40akz174herysk5m4t07luio32ofef5shh190fc5zpc4b1ygcbmunnxt39u1azlhczv252ic9rx7sxadsfdhlr3nwux00akilh08sczbdlasi0xrnu09etfikl5ox3yc7zi1s034xei6ciu29u4q085yvw2v9qz1ip95ufs383uaqh2gqqv15c0d45dtn7v3t3zlxk5xk7fjgnnozodcv99ra2gtpmen5n1rfv8gb7pfvsbs4dzhwqn8duwqlvdapu6iz9l5zbg9uw9s18nwscdv7ymghu2puk2x3ajggt0z493mpy0uszggnodu5tdguwia199f5599jfab3x5f2deear3jnqsgbhrl3537hbcrsq9drrzfe2tl6y7lizqtb0nt1ql1eof23bkw3dlw7mlk07sa3q41aocnnvl63il3n87kex9op3k7anzqj8tej2tvrmo3i9617rsyh81oqvso8tzh1ntj2ppor3x4u5aj03cp2kbdbklvdkyllhgffh7a8beuf2gz70cvm201ux3rt3is6fyfuncw085l95e7lnc6o0uwfs856h54oi3libbr5hw7j9uns7enfg9zrnmto2qh3lbvo9fqiudnnc1blqyzgknx560cjc144bhk9fyfnflity9zrq58w4oxsucy3ypl81emqdemp47px00zkgut7fam9b1fulyylnq4el198tnhay2h5gb51tlt5vh98j90r69sv7ivwru7suzdcdqps3q2gpmltz6vz7q6xtvhdgps4q9nqr41urb7kuwq45xx2087x9tt91nql9iyfghzc5x03fjr880o7fmbzzuhn2u9c3ffjw4sdhondz514rjbblkqtimtkywszdvbsiel961pwz6h397jg0i2u6wfiz6yieh3y30mq0fl5fd4unlck9vza2y3wxed1myz77r3t91b9bthuhf10nk54i6tbh4dibmdrdkeme5tx0b1ei75fu4r86skz1j7ooqm30ymhcc7ihz9tf7pszaetrk8188sz4yujpjjbouytc1sfu63qkfedrg1bhel39xgbec8nlh9',
                        expiredAccessToken: 1902681768,
                        expiredRefreshToken: 3541924486,
                        isActive: false,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '51bab009-224a-4eb5-ad0e-1440264cbdc4');
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
                            id: '62222f34-cd5a-4637-92ce-d58c29b316b2'
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
                            id: 'e5808186-b264-42ca-a5c9-70f3db2c4434'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('e5808186-b264-42ca-a5c9-70f3db2c4434');
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
                    id: '29613640-11a8-420a-9e54-2cc1b81064ee'
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
                    id: 'e5808186-b264-42ca-a5c9-70f3db2c4434'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('e5808186-b264-42ca-a5c9-70f3db2c4434');
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
                        
                        id: '34043c8e-8104-4e21-a0d0-9b3937a55ff4',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'vf1ekmqsl2jc0gpr57rru8j74rlnwucn0vn510i23zelzommebi4qjnvvj5uizwid0gjq6pahd7rw2yfg8es6d3s0p2q8n4ifb6e98buif3bcwihemfspreq6nny4kgfhnaihiqx9cqsfoim18lvgbclpeyxu4veammmb02ecr6v1kcy0mvvrdc1rlyj776xh3jeg0k11ox6774gr62b7ujpv718hxqi1pp2goc843s9q9t7y4jayjkhty2ytde',
                        secret: 'vp2c3mrnvgcf9tksutv1xbikx1emgoy8shgwisqx3i53b5oiskek1djbr5ta7sa1cje7s3gda31p4tn7afhoae68dm',
                        authUrl: 'bs47mhtjttl464tmub4udhv1kz2wpry18shztvuer1bdqhk765238ed7fx209hj5j4sn73pf23p9fdvpl4mry28py44ogxqlup665h807ggbtscaw1vppogljj3r397unqnl3undfqv09wgkdg6dyhsghfkv8sx00vt5b4m67o99h2k0uhxydo61v0u8iliqib6u5qkvmqjbj4cnjihk9o4p9lc35bbbpki00rkpxhv8ubusxxweotc9369q0lzd3istan2aqw1ml9sglxgb6fp0ifp0qjtr26cdlzer6xyllrhjmarucbk1limgb3jd5byz093f3p32fp9tiud546a4yaffxnldrg6fyk2thmh3p9rqn45ymnb6errbifwd0qxg4xn7x9m5ex783najus7hxk4hpzwp2feakmj519rk99aj3fcs9iba1be43z2fwinyisahl6balcscp71kplewwtqe9npdb6pqx3t375b9uk35wj335f15275d2kz6k6hahik9j61hpp0me4uytnrtczli0jjop7fv8jf0s1em04n8tjaqwk9qn6juz1h5zvkhyipb7b8np2sxo93bborgbf90l9cf5ft43dbmlyyy2n97y002blraa7593hzlwes6fvml6fpaz9rvlcxazuz8rh15ltoru2pil9zfezvwqifc8lt881qiwy2xmt8orjajfm9axnjcmts45zaefjfo9cidjtgfdptsotfiodaynexa5fwv6ntrgqrdsl7ci8fer4zzgjebuqkpjc1ild09cz7km50ma7mpwskktx4sv34vix9em783g5q59drs6y7e98peyevq2z8vakb4jz67m0aoyzdxmpuo4ga7am5cum8m35rz9oeggu6rjwnh2r3njv7fkzjddos65zjp3iv53a2v9xtlghvzdn92g8pbq1axhodnkgydronu82lc4irptqdy7ao4k4a76g54jsw4rsw9cmw8y4mcmx8eyglivfbel9ma6t88g4po0ji8yinxzzcsgx9afd49paguzcj7wjk5cak0ea3pmxzzkoh1zqdmdgaxkdeqbvgv90zv1bummfozl6jary3yrromgohlq8kqr9ba0kq6dkp3hs2cruzf18uyfrkqygv0hr5x7rvyrc2c92s48s2qtfzvbelh14ao04qfu27qhcrf6nl0qp9hukihtvlofzy1bu3t9olppv1lth345bvozz2svfrow9en0gta8aqiackwsf6kx73kimbn4y5hitayn4f719igxnfcc3e8lgn10u5gu0fcakk0svfbdbqxqyayehc6buvy562gwplv80f58880hbp2l3zzqdiq2wo91u1sjpbgdqpls31zhid5gkf6xdvz5nhdziny93gzqxtbhpu07qbwfudgk3nafw3fxopvlsol9akkntbw61hpk4k0tw3o5u1m5exirs7gsquo354q935q26bur1ewkqje8p79g5qfdxnzxfhg548un9oyizzqn7xczlid2tv06oy0q88737k1d12tvsbm6l8epc4es6t1q65wu9mz293skfob0ztn98ip2wq7ji28xqw4y9h1ci3b526z4yekwa8t9vm86a8bak6igsoclo4eq4h32f0lo7qyoi6is9kmcg6xzd4g60g69cvjrnrs58e7dlt33ywfgyy7lb2jtemywyptdfpl3io3b5qg5mq79tmm6y75ozmdo8myzhvegyew4kxwnjcxufcj7kygpzn14m21cyoaijt6ehl2wuie39huy3zfixwcvdrhgoqb4ccanqv8dj36agpd48jl4bbe6lpgpkvc8umvqr4gzzdfzfe8bu1q0wji8v4hba21fsikvsgkwygzzh5kx95t91ty640yr2g1oik0u65ciimiqk1vsf8wc1nmig7qaid89pq4in5blzq5b1iukrx1ecmf74y916g881c22tj5tb8abu7fcyqwonbf1vz61p01hwtcit9j7goonn4nycj3iliufl7p813x9fgoqxtrjvd6qhho48dq',
                        redirect: 'xrhan7zq62r0m8ep6nq2vk6i1tawwdqg1qguhsoankrsay18i9bccclcgviqlp0ysnljwc89b3rmvuz27ndh8a7wzyekzemfu64klwff5ewik5pdk6y3x1pt58n4igr05210qt6b8y66q50db9w5wq5eqrpce1htet1ie75o866l26w386dbhfcbfka7bpuhonuxwpu24al68b8fz95j9bmcbd6c71qui60rg9guq6n9z3789mzbbu843klg9jb2apfv57zir4z3vnycid1epy564s249zboclkpkx5nxjl1v3ia4m9mehqrco7nt9nfntev16u5es6745lxuccdum1c9epueuwun5wlenkmwjhwejx4jshyn80pypjntuc7q32yzzx3uqll5q6doilw4wgx1yll2ix9e2hhgnpn36ulwcr5johxn37bz4ke6001m9s156jdpa0277xkgwbw9vyeirnc6zmpcstozh4xffqsq61975f3i964x9pmaz5matmmebdt26vf3j43s6shs0l03d61v6p06aq3myej18p6cev434fy6ztiuz9wbiitvpe2nyk748wqzgz6l54b5yc8qvfi3rj9z2uf8j4b9k2ff10vuwj26au15lnl4vhnqmf4as3vzwy014b0mquax67aim53td1zhcfhu4u0thhbrmj5nbaku9uxqvs726z3l2eskfio5wtepmn3kdcs8izpv620kmrokb0n3xuslt89g9qn5y7li5j94x5scwytlz705b6eqpolr8us8h8wdj6mqqld4zy30e0oy192smt5uvt0f1bx9rpec52tl2kgl3l7wtuys3l4u2csq4w7pa6fgupl4b9h3haefxp7ej67jl4ksymdhg5ntgmmk4tvvnraogtgm4doxpxlty9o5qcrurktpq429zx5a201pgaw9cbmoza9czyjq465yu06yny7a2f7npz5cbs9dgvq2w65lne9qin8qbm76xvfvuzprt5u07mvrjmnxbybbxe2krcxpbht41itf3xd5pggkodmbihijypgr3t5109c9spihxlvp29rjmsr419otlpeb3cym3j2q5ksj1kj8n3xs3rq13d6v0pwkzxy5pv2nard7vsbdovpz2nz4z6bb2nblf37u2oghkr9ncwtkz4rxbwzgwnj83if279donxiq0qmi5rid0s8nwoyql7f9mgooa00waycdk0mtk4zwyvcil9l7g86aje7bb0yn73hk1mu0lpbsz8ec2asroyhnm8tg8izlt5v6wjive7sntnljufnhok1yl8xdvhd37yoka6a65mgvwkhh2vt9svo2xoniv0zi71h5aidnor8333c9e2l4gvi9v1tdivryn2vpm84weupien62gmt57sanndfjtozci0g4z21gwjj4iwa5hdfrlf5xu32gn1k40q886i5ky32qb2y0hrr2xwkuubf5ogqsf2qsxx04850mtay05p5wxqd9r4qy6aj8x83vn95kwjditwxdf28q28wfgxqrfivqs4n3myo9ukcbkeni45orzatb49o9lbc4ckw0andxpge7ypql149gaayxql79xo4wfqlzcd0zmjdxjtci8jg64ku0j92lyostaepy451z13zuz86tph6md1ksdrjfe4oiueouy5fpc0h3za86thr4iciwvp0qkqmorr60t2nb57o7xsvx95uy5huwghx9pp0349nbshjil9uf0d4sf0y8zfyix7hdh5qjjikyb8ro4a954y536mi0y6k7nyq3w8wvsaqkk66e9pxfo8qwjpg2ys3c5atqu0ey9e1flb99fmffdmdwpgt0qo01guxkm61dfjsc74vve6b8yxx3a756y8ef94cyq7i8vdyr8vdsxb8qgx9amgf7xh2grjxqiqta11hg017bdj40mnffwemttylye5m3gn7ducwubrgf9stnns1bsp9ud77mw0fvrofz0gpa6vs4pg94xpv7gwpypvk4gkiykd00madxk30uixk5qihdv65fe9zav21',
                        expiredAccessToken: 6465589357,
                        expiredRefreshToken: 4347998520,
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
                        
                        id: 'e5808186-b264-42ca-a5c9-70f3db2c4434',
                        grantType: 'PASSWORD',
                        name: '4p7sjvvppiq8jdi0vcd2dtj5bky9zjrihph1q3mwky7orodz1v2zt7j7uxetn2nldb4j36dcf42pa1an61zem367y7gnivfdzxnany2f264jutom72mq846infwfoo0du5ywfpcrs54pii4eb781m0zfmuv42pib8nfe45v4xojdhkyxi4rg2gxku4yxp97qpbngzq6ts08n731cd29pxirn9lty22m6x4c4xedqpqawszkbnlve0lwd9dqhlm2',
                        secret: 'u2q4ecnpzbf1xhgszr88ap8dik4sqdj0sbave4mp2dzzx2hqq33of6891kfu3064k8ti8zvaaxzkm2wo36pq7y2lg1',
                        authUrl: 'jr57cb9qhjh119tgw64moux4hlv9kezdq5zj0u5acams5ytt34ubtlg7hfo1ftssvhhy1e0db3oput1sdicj7g469vqzz28zswfp2reikzvvsew8jwspsqzh4h2owaz64lycterbv9anxx51bqy8pj38l1rzoghjuh2akahtne163967a9yy4vzjswrgkbppo46iw4551voneyimqmm4xejgd6skc4rhjq3e2uak3hikodqrcn43uhnfy3mac15z4bxehwh3pbs9svqvc88gyaye9249njct4vsx2ol3v25i6vyix9v3e7f5iuzrni6rk3tkjfj1zlooe4gwb2kje8nlmpvxqmaqsnhhpltuicor749pbxqn9py3zt4t73fcbtpctbpk3qhz66jiux35kqx29hs208thvgoc3x97lvw6czwhuyj5s1oxrmnwhfhn9vui9oakv5v1fthwmmv1yqhkssgz2q36quvvrzo5x0myy8n6fmsto80xzqy183a4hg6mrg6dheujd6mlnhpcmkye6furzthli7q1wmx712v6i0jmbvzmejhlujmuuvg5lsoixdwvmac7q6gt6zzlt7emotac0i93gbgtcaqn3auzld7al7hcdyhf5k2c3uf0m4q8tcmtz55ld5i6sc4aw515zi6vlzk0vuiyx612ovsvd26ssacnunb3gg7tx0puh0ua91riwkhg841f75cubq866yg9ae7m09otltltauzdod1iugq9e4tayxdkedio4scc36rfe4j1od3caq9rsrvi15gmn7dbxzlh2rfi2g1g5jmiwi2ilzl779engxstxxmhnr1d7nyg9eutvuft7fghmbohjhk3ix7rakb2ytg0j6zadouy5msp55u5ugy7qn0khmmm6ujqryy56oum8bntg3esh2x7qz0wzovfbq6ul4ku8hcpxuv5lbtpx29xajcjbnruabfqr004ihs3f639jq9wf5n0sv2ro8uwfp2budo6ql4jpzpjtsul37ex5oo1lokqyhhw2ul8rf20krepr87cvc3i19lmdhjs986w1nsypogcn3wcrp97ovcsk278op6warbxdsa344d8gisdvq1d8wtn0n87vw0slk9o1kxg4rvdq8gwzt91lb6zvozusubr5gdgovwu47hp2v8cu7w28gv5s0dwtbo2drsvzk03o3fmjpmq2ad0ol9v1kau4rsygxnmklf66rq14b6koc0gxi396sp2d434gzgvb1t8zbkllnl4c0w36smahkf2o7svzja10r4x3tkd4x45uqy5479b9sngz2g9acuwyumg1iibe6egk2ksp1gk0iiq4wa1k59fxlwf26ohz62ue14yhwc0o45qh1jmdikbpwtnvug4mq5hk6o879pat4j4uh7f5ig6i3audm7ij8zfms9k8do90qg36y77ylmqeg8hg3uf0ozx19ga9esaif59f970emz2pl5mc7chrjc844cd1o08l1t39utcw08dg6gd7klk6clbh93e5sd4ajspo1c830tcw797f27r0zuki1hmecm8cmkmbkz5y2lst1lj8nvu0xr4idglyj4gtkkwwaz8yqv8ez335hd2ln3vhplke6hjc1rf5n39820rb74ucceb9a6y2crr196p8l26wjp16w1vvix2fkmh5n3a17puf8y5c8kler8y0lilslwhvo1fwhdsuc88x5pmz7li6kx1rqi9743gatlu4nrw82ei3fjwehwnjr1qhfs422hppo5i7x0n8wfj6gr5z8utq6z0vrs4w4haelgejl7i6qjqu80rf1waiojywg4zdc9gu8ozmshzp8mrw6x9lec64lmzg636xqsk3lw5sgbck6dntf2qb8xzndqvjpnyvlfbzwf3zay5rqh9bnv5qbhfo12922si4gxxuh53x8fzebpw3gw0zfv2oxsqxik7y6gqy9vefq4c2cwl8mwv1848k7kwtefx4se5mfv0jy9ix3pqbx5dtzmivb0262pq7ksapg38up3xfinrxslt',
                        redirect: '5vw4nl3zs60p1jjejp4fsz3tt9eh08mcx8rvgjf9pehx6bpsn56ypwg1do4f9w4aanzew0lhkpnkxt43pqpbndve1hhff6x7uiylngslxavbod1crej1z4qvsjw12jnzuac5rkxhd48k2a7mh2bx6elgc0d4z1elqpjvw1ew6tqc0xpmkc0ium7bchp85k05wi441c535lf5usd0udbtn1bjbm7knvo9kzc7uoc28u3bnl5lut7vzu4m0xkld6788f7y68pxqqz20tz1gj65qka6rcwr43ycvzfff83g2cmdsd729ehkrvlof38vm8fdii900ec7xtb7h2m1eh62uv6yepdjoaw0uf89gplgui75fyi4pt3k6w0h2p7dynndpi1fdm2rw99js4zzz92tvm1nbw5g8cw83cq3cgxcb3trweum7m4o3e6esmqzfu3l9nxiacttju29yhg1lrr70c7ntc6f8tyxdn1i0rbyl9sny9aqcrr8cjmabpvhkf0wincuef8pdjolc56q50ltts73ysclm8xndru2g6qf35557y5537vjnz913m1uqt1ctsvtyx2ygv83bzdivca7x56la1drjrmej0lv8gzf5nnkhk4d1msnrautrpgz79u3uc7jtqp1x6girc9ztias3uzg4h4o6yoq02xtp8nbe7z8iu5m6bbnppwz560c90d6bwnzyacrm17vbhqquooz1mm4jy4ze230iwyokmp2x76bimb6e1xc0qkyednaaqsi46kkuhmucx1qno0ilkf9rr48y2khoxsyzm30l3tp4atveakp5welknich75k6wc1l4egte3f61kirmndmajikm9xur8y63027yph2neyh7sg9460wuqnqkku3xfvns7jfsztotmc3by6aba59zapiv9is6ht8aspa6imlicwngnc9qar8twpd3btj1yeuqf2deqodwv6oq8zdyu8wntt24nan3r06ucz9bzm9wvdj17pmtpeoy51f0mnl2weqsvamy8rynwxbhu3rthd139z28foee86eiyos7nkvbhg8nod5of07tvygxfw5adlougst7qpacqsuhxaq5eu7ir8x0rju1jcip1b83wco9zr66vozvddtfc99ooaymwh0hw3jc6xr1lokgbror8p636fssfh1hz4efq5lw7k6ct5z86nywdpuq53q4xsfet3n7zdds8oe16ii92kr4miqjnkxe6njmz7fkvsrzdixfnzfmpnj907aqickwqzz53kbt890x1evl4bos6fgv00kp7znuwe4k2974slnbbr9h9v25jajnauyvqnmpt1z21mlx970snuj8voxoky4wurk101przuiims6eisp6iwlsablmerncq7lyymd2ase1joffmef63zym3soi7twiek6hdjk653x22yk0kltsk9geed9o4tb22vbbu75knns1yals45i2nxqt59ftj46djjtwuhf3091uhilcfagdevemk6wviarkdj4p768angoiqmp81aq16ln4t9ozbaai9m23ege9w5salyj1uc1znvzo61kls4h8j3h2n1rllcqpubz8y58mfx63d0e0s2dsccfyavvshtyzu5cglcexmy0x4i87mwir9b5qo9tz3nmil28ja7aip29g44fu5f67ve7gw33t9wwu5uroc0mvgrq8n2uf3unl56n2ief74d0738rnr5vkdpruz5buozq5g2v4qcybkc9qd3fn8tnjfhkxbju7abog0z8j7t8fbvu6gsfnennntkxafviicxformq0qzxreulana03mzm94auyo5pxx4501h20j47ndwyes7s6ecrjphyeqmz0hr464u7xyl5yeck4isfz69dtrzc16p78qvuytusc17l5rq2wjmf2oavo843x6mab77t447loyv6tqfhhlf80d8kzdwqpa8a4eowvdlpod9ykagfuugs1en2cis7qi9f0jppos71misseruudf9qnwvlmxjrqelf6hjri5u6jcuw77in2ipq1jm',
                        expiredAccessToken: 4444469302,
                        expiredRefreshToken: 8810208814,
                        isActive: true,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('e5808186-b264-42ca-a5c9-70f3db2c4434');
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
                    id: 'e80cb8ea-a242-4195-833d-9d8d5a9bb12c'
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
                    id: 'e5808186-b264-42ca-a5c9-70f3db2c4434'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('e5808186-b264-42ca-a5c9-70f3db2c4434');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});