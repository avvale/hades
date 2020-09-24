import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenRepository } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('access-token', () => 
{
    let app: INestApplication;
    let repository: MockAccessTokenRepository;
    
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
            .overrideProvider(IAccessTokenRepository)
            .useClass(MockAccessTokenRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/access-token - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: null,
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Cupiditate ea necessitatibus et nobis autem rerum in consequatur. Ullam animi enim modi voluptatem dolores. Soluta neque nihil amet ut voluptas deleniti officia. Autem consectetur nobis laudantium ut est consequatur dolores ea nostrum. Quo et praesentium adipisci molestiae.',
                name: 'hrpsgt4ijhvhs2ef9rmoh2v8aj3q0ynidf5ccn126x3a6bz5iaasn8v5azt85d7h9mp7a3ejgvxvz9lh5ihbpc24sxm1zjndyfbii7cegqclm3fue9frm4gd0zpg2yk0he9tlvbr77sg8k1dadgtmki5kik42lf10yszwk6c6y3iuylo3ykbz1ylm1sse3apjpooeuys4ik6alanzxs785u6hr58j2dp2usz8s0e78n57wgacu31kgqm0vfkwbv',
                isRevoked: false,
                expiresAt: 5012490322,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Eos aspernatur suscipit. Nam fuga vel ut ratione sed nam. Sed quia nostrum odio officia officia eveniet nihil. Quis et ullam quo. Quia ut in. Consequatur iure ut non tenetur beatae ullam rem.',
                name: 'x50hxwxfhphhcdr1py89c1t3nnbysbxzzefg2yulm5vg8f5jkaaf9mt5ss83xjwfmo4rda2uxqgllv278m9q0prqk4t05gbjonl55au3zjxip783yp4el77hxinhk1grtoeie6gpxc65zl7hpgzr03djz45azg9lnke4vz7k62m5sofuu8yvgw8yynhvvnarnki0tn35h6cehxxnchgs1gq6qms740bgnr79vkskpg8qgp0gdxmxvp35pec2u7u',
                isRevoked: false,
                expiresAt: 2950801485,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: null,
                token: 'Ullam officia non quis et omnis ab. Et id inventore accusamus cum ad accusantium vero. Vel voluptates quia animi aut consequatur odit molestiae. A corporis blanditiis necessitatibus inventore aut. Eaque consequuntur voluptate aperiam nulla perferendis temporibus. Voluptatem saepe occaecati commodi consequatur ea exercitationem laborum voluptates voluptas.',
                name: 'gxkza9gwjrsol3cb1ag7gei0c62yve0l8fd9s4ndycr6wdhhyikazu0reffvplxnb9hrcne8i3kje1hx2xh3e489moybxp4dcfs3ovejsg9arsv59uta974znww2w6nre9soed265ltmig2s28hxf3uuaz98f8miykz9ud5xsq9piwnnfdxy8kj1zdcl1djdt74s4t5a3cmirar0vdg1yaqobylbh262ilglr6mw7td38mhmq5plt056bgur4yw',
                isRevoked: false,
                expiresAt: 7578701251,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                
                token: 'Neque magni fuga aut necessitatibus aut mollitia et accusantium. Minus aut est. Esse architecto molestiae sed itaque.',
                name: 'ef1ficiwk62eih31c89nrzm0v48spwnnyhd4gemomogwhtpfml4vp12vnud1xopxbqfey8fvyphpyo4a6fa26u0qbj70vl8voisexyyghff2eap4f6ima0f1suys6i6pfd9j0nvyfl7cajfky1xw3kiulq0dqvfhpgae0ar77i2oxe8sxiaal83inaxp2m3du40nbdtln6j1kauvhredd0pvpson4gxub8ti157ip3d2m3an5d5pdty44w0i2cx',
                isRevoked: false,
                expiresAt: 5629458494,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: null,
                name: 'zyxnb6pnd2pu9zt5a3eeia56nr0p80qmo2sdkgvdg3nq821g4n3oun5myl4lqxrt3l22ybfvbt62ry1p9cif1relkzayuazd006bmfnejs6buowtkwibw2f2xtq345i6n1pndn9hjijd17uk6mee55tdx5nz83jcs9x3gp4i7yat42tb69ai4wo48uyrui2qfdonp4rz1jkpp3wi3oy06016mp8j76bmja8ry1okrgyyqt19ltoykr2wvlgqole',
                isRevoked: false,
                expiresAt: 2712457452,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                
                name: 'b33k2ng8jl6w69ys7rujt22oq50l3p1xbu8ggjm9hxqh2wcpg3nsjjwy3mb2vbmcq3yk80uagcazumemqv996td5fq02mf2f4bryv7s8nukndwrkthu69hcoutcyt21pk6pslepou2ss55q9vh28uqq17ms8c160kxa1wt3b6pmkucyz0dq8p25fmb0jipxo8awtohfvisly54bbq4ib8pgqn4girle1cjui3c9sok5l6kqlhin8rusvq0xk9m8',
                isRevoked: true,
                expiresAt: 5838710673,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Veniam corrupti voluptates. Placeat a quo esse doloremque voluptas ducimus. Saepe quia aliquam iusto.',
                name: '0jrv8e342iss1xnqpw3cbooclodq0c0dc6hey3e8uqm2z1m980uxjjvnbqix4ee7aeq53yzqrc59jk28c4brr6dm7pwr0evyx5boegfsrdfmtxj1sbeulz7uer5pflmip8k3x8561o6jywpo8g4ju1qk4k04jin26e6xcldn6ws87o00j98qey952245ebv3up56nif3oe74lgk7lfqkmzxazm3042dso1evmcqmaily2agsju7uzvltvg4ft0x',
                isRevoked: null,
                expiresAt: 8698596896,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Maiores est aut sed mollitia modi. Aut amet eius expedita. Qui quasi quaerat.',
                name: '4mq505uogd2zijmbuqggl3zrvyy083kfmr9sbfizsfwmz516vgr7efh1nhsm75csrevlg6rtk87yugl9kmad38cxwfr7uqrh999z5f6wiqb89094j5h9w2tyfo1b3q52w6zxdwo5r5qoanojp1nbonn60n5mgnc3g460iuw8xxvng5hfbjk6v9f7ae932nkgzek4mtwp14jpkx6k4e0ohc2b6chb7jdl6f1n83g4zuxfnrh1h9njzf8j4xhfvgv',
                
                expiresAt: 6710704026,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'v0sippdop9qbgfo2iikxmtjdc95hvoxms57dn',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Enim debitis odio praesentium ut illum. Aut libero consequatur mollitia dolorem ex accusantium. Consequatur sit sequi quibusdam expedita molestiae. Aut ipsam optio tenetur eligendi nihil dolores fugiat numquam quo. Nulla quidem fuga sit quo.',
                name: 'fffsz0qpmj1v64c9kq28n4923q8x0pcxe5rtnlb7x4db3mjkc71ti9187wdauoig2pnpzhakzguniuuo488do69yr1oltcnzp39wiqzi4nbb3cphj8m2f1zmrjusvzsuesvu526yguk2rt2zc2ok0xgt5jd89b5o56kp8904q1lwuhz7cuovz3x19zdykybtfpf3wte66s88nsjxoo2180bdorxjhql90sl3dm5for2qjtf7q84z8w5jqas52rf',
                isRevoked: true,
                expiresAt: 6261231224,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'q8iyc5am9anbl7tmxfbme2c87x64avi9o6vms',
                token: 'Dicta vitae magni cumque exercitationem ut eius id alias omnis. Qui sit dolores dolorem sapiente dolor mollitia ullam praesentium incidunt. Neque aut sed hic neque non nulla voluptas. Placeat deserunt voluptatum similique aliquam voluptates labore reprehenderit sed. Iusto quaerat dolore dignissimos perspiciatis.',
                name: 'ra3gkdrfjzk8qhtzkv9zeysnnmls5hud4nbjpx4bpb8gm4z4j2s0apiaj0p426j6oofv5tuaezr9dijfqxsqu8vftprand6kjr4jypy0uabhqnroynfd5pv0wcpfxzulwc7n90xhpnnakqvqj1hqs18b3xvdswy3zcdylbk8houmuhrwbncou9b74gzyr3yj774vlwnnef4i9a9edx4ugte6ega4l262xiy0olvu6ubom5l7fan31z0fb2yunxp',
                isRevoked: true,
                expiresAt: 8880275200,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Error aut deleniti in fugit a quia totam dolor molestias. Non corporis eius ab. Iure voluptatem enim alias ut et. Debitis et odit porro architecto temporibus eum. Ipsum velit eaque harum eius eaque.',
                name: 'ydkf2l6u5j3g7swpv46an3p5nx1p489xpn1p26bja4svgbtv5h15s2q81v42q4zh2hicks3bbdpe7792se5shp89nki9615ylqk6jv7wpk8emjgek8osm77jgyqgff2qzb8vmv2ttn0rzoedq1dpswp3v3wbwwkhy4rrehdh4cn4n6weldf5w6476otl95sdzcyny5wbqcel887dmp8fepz7lvgt9ckyof58o4pb69zlwvtdayp7bjh94iol4sps',
                isRevoked: true,
                expiresAt: 4887627119,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenExpiresAt is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Aliquam doloribus repellat deleniti aliquam aliquam. Qui dolor nemo est consequuntur et exercitationem ut rerum. Aspernatur rerum quo. Soluta quia sunt doloribus. Aliquid amet qui deleniti. Repudiandae minus eum suscipit deleniti corporis.',
                name: 'n0cnx1r6ua90tcbkg8v8i2vxpk54buhx0hvlvs74sxnulycs2o60j5sue6iy346mjbutm1uv0vjkl0yemdfu1pzt30kkj34falx7mvzbl4jpifp82sr6f9ir1h59wx6vbm4xo6qnu1ms4eue62g399ar5o4t90h0yevla6gmwf2fzlzaq7u6twsojiz2uwtbrv6p01hlfy4bw6le9ha77yx5rehyz543u3ot1hc9gawsznnbb29z633pliq6lyi',
                isRevoked: true,
                expiresAt: 61790152848,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenExpiresAt is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenExpiresAt must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Enim suscipit neque distinctio ut ut ut nobis nostrum architecto. Quae aut doloremque. Vero sit iusto cumque ut est quis vero. Aut possimus unde doloremque dicta praesentium quia.',
                name: 'ixh42gmncoe1a9jtu3h1uwlyzzi8mz139vr7l410wh0fjjmcbbb7kwf3i8zbwvmb3x0k8xn7vbzly217uv95hycu25j9lg92oke12lf55n9z38zhueo7a7zcqxas7fvxwbbh8p65wi58jznwj2odgol61xbjhtvdcm2g41fxs70h2zxuietgcbq24evmyyep40vig0s1xyjvdoiev817g7hhu4nixjetaam01r3hs46h2z6idq4jhpeszv364g5',
                isRevoked: true,
                expiresAt: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AccessTokenExpiresAt must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Sapiente eum quia beatae omnis ut quia aliquid. Aperiam unde et porro qui. Error fugiat cum id reprehenderit expedita nam iusto. Harum recusandae necessitatibus ullam ad repudiandae aliquid qui odit sit. Qui cum voluptates error fuga ut aliquam voluptates magnam.',
                name: 'h01sak7fdnlfj6hkb9qtu2pmfcoh33206zclxj2idvowbuq86u65wu6z5471mcnrneug8e4d6j3cdgurlyk3hk8o4tdxglqfv4i0141eh6mj4w78113ugixr82qsaiajtncohvkcyd5dz4lot3cwud5xtnae4znc7rw93nrrs3rigmwr6wxrnihkcxu2xzs3e973pi6hs4lr9futet0pjbuayjbsn737281eki0un03xx3s7bi8r3hd23yk5e20',
                isRevoked: 'true',
                expiresAt: 8767018695,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Nemo placeat et et. Recusandae commodi eligendi ullam excepturi. Cum soluta consectetur ducimus eos facere quos consectetur. Maiores temporibus quaerat non nemo.',
                name: 'm530luh80mtc89kl31tjip26f11r9r26jlfcyaoldwn6unru9q4bo2xmzn5iw1d62pfq85hs87bvm9eknkywe5trt4qcxush9jxnapxjqfdr379aff8hrs7gmhqqoq47hggmesg1msv7vk724lx0vwbioy85p195cv9ne995asyu6p9a7s695wg6dq9mo5m41zxnvyupbgbre8c7e6zl52bdhrxp85g0prdl18cprx66mhjiywuslky7zro30gh',
                isRevoked: false,
                expiresAt: 9892791784,
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/access-tokens/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens/paginate')
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

    test(`/REST:GET o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '2146e530-945d-4041-af7f-62852fb9b946'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '060fded3-7730-49d9-be73-7c0076f39471'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '060fded3-7730-49d9-be73-7c0076f39471'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/d0a2aac4-d5eb-4851-85a9-2b75f0d35d6c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/060fded3-7730-49d9-be73-7c0076f39471')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '060fded3-7730-49d9-be73-7c0076f39471'));
    });

    test(`/REST:GET o-auth/access-tokens`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '62fc7eca-7e1c-4c0d-8b87-717c9851ffe3',
                clientId: 'e9d90f0e-1934-481f-ad21-96e6621b257a',
                token: 'Eligendi provident doloribus qui quis sapiente repudiandae ab. Repudiandae consequuntur explicabo ipsam veritatis optio. Reprehenderit assumenda excepturi non ducimus ut iure ut animi. Modi odio dolor temporibus quis modi.',
                name: '010dwkylanfx12gxcwizwztadcoe35w3s566sr3pk64his4t3pdrt69c06l243ng6hjef27hhoxp4ebtu3z6sk33c5ttrpwgrbmz3caq1m0rl9b46bjhgtysr6q7xxx65sdlq52mwwsi99n84nbaqwvii1wjpj09fy3nlkhyk0mhnst9i32imys9v7x7puq5m88satf40srjgfqiv4m9lcr59l3benkei3zserf7e5imnrg57uzqvas8v5cg1xv',
                isRevoked: false,
                expiresAt: 3906676057,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '060fded3-7730-49d9-be73-7c0076f39471',
                clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                token: 'Explicabo soluta aperiam voluptatem ut aliquid provident. Quidem tempore et libero voluptate perferendis cumque exercitationem porro. Dolorem unde possimus ut quia perferendis. Rerum debitis eos est. Amet aut modi quidem earum inventore ipsum eum.',
                name: 'cxncby79wmca4tdaoj84ncvn1s5onlke6zflhg6zjfuosvrsn2apgikxsc8l9jdidvds4hqmyh0qz07amg43mge5yx8tdlicrj4qxhc8t7uiuvd2dn8rdm8aliyss7uwoa2100x3yka9w2r0zuia7ds5r463xi1r8z64kohig0c4mnxotj3he74ytudm43pf34l8vcj8nreqcbhou3hgczlf5ntf7szcbmwobh6v04h8wdx2l7n8o3pmp64d3g1',
                isRevoked: false,
                expiresAt: 3035021583,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '060fded3-7730-49d9-be73-7c0076f39471'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/a3c8f2dc-9684-4e99-84f0-7e4d8d42e577')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/060fded3-7730-49d9-be73-7c0076f39471')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateAccessToken - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
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

    test(`/GraphQL oAuthCreateAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '26889a9f-186e-4c1c-a7da-208e4d66f83a',
                        clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                        token: 'Aut omnis illo. Voluptatem reprehenderit eum dolorem. Illo fuga quia voluptatem et eligendi dolorem doloremque. Voluptas eius eius voluptas.',
                        name: '3m9fz0lq25agz4qqm14mevlscmo18a6bwhggv89x4q0oogtrbj2gze1bgsn4hlsv26k4pumxhfvs05s1hmjhqmtnuea05i6ysgq386y2ghrrwdlr32mu3685o3qpk3smk79x7ng4m6w4103m2ev039wq1ijgh8wrk953tgqzi8qec5igsbeyf0j2bbtmeucbs5qi8tuj2teyycarmei0x3ievpdw9ynwzvmf3j3bi96uua0ggjvn403a2r4zk6h',
                        isRevoked: true,
                        expiresAt: 2192398860,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '26889a9f-186e-4c1c-a7da-208e4d66f83a');
            });
    });

    test(`/GraphQL oAuthPaginateAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateAccessTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindAccessToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: 'a922bbd3-d1d4-4de8-a874-01ffe5c2fbda'
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

    test(`/GraphQL oAuthFindAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: '060fded3-7730-49d9-be73-7c0076f39471'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('060fded3-7730-49d9-be73-7c0076f39471');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6a5a95d9-1e5b-4480-9077-fcd135e17f27'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '060fded3-7730-49d9-be73-7c0076f39471'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('060fded3-7730-49d9-be73-7c0076f39471');
            });
    });

    test(`/GraphQL oAuthGetAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetAccessTokens (query:$query)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetAccessTokens.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateAccessToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0fe4614d-92d2-4563-941b-67f850226506',
                        clientId: 'b7420030-0c25-48e4-98f7-8e8e77ef49f6',
                        token: 'Nemo exercitationem nobis aut accusamus fugit sint. Reiciendis dolor ipsum perferendis sunt ut dolores. Magni voluptatem est sed blanditiis quia illo nihil magnam nisi. Ut quis sit.',
                        name: 'm90b64aofcbcholhdg8ejc2066klk8pc9w809pwntoavdttduvqqly6hpx2k8jxqsg4hy1gc4tcmej9yw76sl1gihfmitp7zfpi7z0gqh32pfnlt66o7ishnf2e6b3633pkziyxnyxpirr0w90290j9qu0qqntwvhar0mjs17o0e6zm5j23j3qtjoxh619bs9lhu8mzoii9u0g2eqc562vzhiuc09fxznyqc5ejvuuqcyepy86fakgnlmyfi0bw',
                        isRevoked: true,
                        expiresAt: 2927635150,
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

    test(`/GraphQL oAuthUpdateAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '060fded3-7730-49d9-be73-7c0076f39471',
                        clientId: 'e237907a-6d33-4f0e-b77a-103d6bff5a35',
                        token: 'Deserunt aliquam in qui ea ut ipsa quaerat est exercitationem. Numquam rerum qui. Impedit earum enim dolores illum sed. Fuga similique perferendis eum rerum quis sed velit corrupti.',
                        name: '8mek1p1i6c3ztfcovdguh14i2po11x9h7xtacbtfy1361wi4wkrqmxkepb03lr8ip7cccqbzvb2d3legeb3qiyfvv1e6bd30hcoea4ltu4wdh7abu0nat4e87711tghu8cg6qwcpqrf0iwwyf526jnpb6q2hsgvv473a4spvjriktt9cwxxqhvvn19j1smz5vmf28cj4z3pifjsssg56urbvgdbn7jgsyeif7ia5sxbtbnccao4bwmkjn2bxltb',
                        isRevoked: false,
                        expiresAt: 7626332643,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('060fded3-7730-49d9-be73-7c0076f39471');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '20eabe14-6361-4c16-97e5-77da991f35a9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {   
                            id
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '060fded3-7730-49d9-be73-7c0076f39471'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('060fded3-7730-49d9-be73-7c0076f39471');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});