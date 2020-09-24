import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('account', () => 
{
    let app: INestApplication;
    let repository: MockAccountRepository;
    
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
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);

        await app.init();
    });

    test(`/REST:POST iam/account - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: null,
                type: 'SERVICE',
                name: 'tcrb48d05xviz7qbhdfqw0o129xcfdj0mzl8ya2upkxxovjqxsif5g28qlxpjknyqt678rle0sirkvt29wq44wq4wt3100rggn3solklpc1cut8b8dvngpvfj5otalpbvuql113pv3r126vydn89avan9eb1jbias9bbngf5mlh3jmge353jua4sto73me99ilzw69q5a3ggfurky9xvy9xtenmz85eb2p8aerbk71dfism71209isnmkoymnhh',
                isActive: true,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                type: 'USER',
                name: 'unw8cesygfh62sha8avod2a973q1abf1kfjhos1sie5gwij3bpz6q07h9sxpifp6sy14x2in5y14zt3069a5vygswuxkhgkr7r3tecnc929wwlz79v63t1v8dzfo8e2numm6tfdq5cbgieqrkbncwz0oy4r5hff38auyaabujlxd9wq9sh2o74acs3kji2yaka06larerxytj437r4rywypuahw51ynjd451gbcu5fd89bqusqjjw3dhiqwyzow',
                isActive: false,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: null,
                name: '7hrugnosg8rwe45qndynz7i9zisdvvg57inkdtx9d5e2zhqk2ei1gzfumxx00tou6xe6kri3888kxx4tuow8kvv4yqbbfio5xoingi11me6u6e0904mjylmbutga7lqqulkabp9m0y9tbkblo9cjk7mcmhqtyxu7ewo1a70jo4ag1aw1vaxrvkt7fbcjj7snwmjc2l6ztz533c2mieauqtylg7rkbgktqtw4u7llyohbr497d6y5p6thnzea3uv',
                isActive: false,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                
                name: 'qaxb40t93e10x4317fcz6zlcazic6xuixfomxd89q3kifhq9moemvg37nsc7nacmzt39tnjgut84txgy8nvlbrmul3r5rws4dfslz9oo694vx5p3dsyhn8kqsmqo14ak5yag1o4i963iqjrhpskmm1obyor4z47zde1mm8fjrkuztupgdfzvmfpstw0umsviz64l82odqx2n1v9mp2x3f5neh6lm5k9beirs47oo380x5xj6bdxqsitseo8lab1',
                isActive: true,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'USER',
                name: null,
                isActive: false,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'SERVICE',
                
                isActive: false,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'USER',
                name: 'cuo026mmvo1ewdyowx4ra4y2uytw9snusm1qixe3yune95notu65iklzxvsa911rg9mt0hlfu4kvetk3w6j2mrizqn59tfetqiyxmwbz6s94540visajust5oldczdk0hi8gcar65lylw7t5rp9wpvcmh4wnejqx36s4ipha2mj8l8hev1sd8wto24zmgxmnjxupww9q4sopy1fc6nobhy3z0nfryrc1j49ijwqh9zq5k9qkvu7lhin2ydoh3nk',
                isActive: null,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'SERVICE',
                name: '6rmf04fdkay8hq8vgut31kcax5l952g7yzidg98flvondqs5a0bgt25jbuqhrl4xunkoxcvb2dt9f3v6uu55uihirawgf95k7h5lsf6k3uygwe4d2ha9ppwg46ct4emvehsqnu2bbmrwb6hkkuuomvb9soooo6vg1uh67zzr3cjjtwg3gfuhxbnpj0u1yiw6iapn9997udjs5fw80cc3qt3wtb7nc4px57wqjthglvjawt0md7vd4xycjl9ggza',
                
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'SERVICE',
                name: '8bvedwems9e4mz43cqdfqcqi0mbs9dedpnyb1u95fsjl4t2i7robhr1zzs8bhruct69dz8cos8p0y6ay8c9lfpq0t4lxjue2mm9a62j3rozv0fjm5oiz2sf4vz7b9yxuknfdwzi9srkksp8h44bb1bx8idwn27k5wgv3vk1xhsprfa3wpjtxv2uesmvjv9h9nuygwhtgv2m71r9z1c27nus5c1y7of1evdrnkp85wc5yfywzwoecixc3mms1m7d',
                isActive: true,
                clientId: null,
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'SERVICE',
                name: 'sa8d9doy59yg3540fxtjqmjjdm3x5xp5ufhteelywf2bhg8n1o86il9dd2pvuh55uq2sajcjt75jvcjs8gmb5jyb08v471bz28iml8ljf19ostzp7875cta0kbfo378niob76veghekedi18vy1zgc2lpts5vcf1bya0v6m00e9090sn0zh4xx05pxuxt6d6tx7r96dvei67bpu3tiafmvn77nqwb82nd92jrngc0a9rtris94m3rmmttlsekot',
                isActive: true,
                
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountApplicationCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'USER',
                name: 'mqmazlywuj5w6knyj4g73vdfq8ke2dglza42v9f062dny5ars4led77w9j9al1m0sslghsxh4sysky7rpz81buwgd83mld7preoowstys8alc89z4lknaii68cimsb760t34qocsezjfivztwvn2d5q3u57c4ym1e2ry9d275u8l7tc75umo10mtzlka8rf9t3x9qiakpmszlu7yy0z90pww5o8l39vaj3wut5nm2y90ngdw50y813cwiuyyn82',
                isActive: false,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: null,
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountApplicationCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountApplicationCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'SERVICE',
                name: '26eureqbu9k7q1wx4kniv9jg6cgg8770mo1tyqus6ysocd0vlyi32e6ipam3zlu0mnnn0nucyg31jk0dq5u0yzww7a8ctzx5gxb4ohb8774r3r77lhke184bor3zhw7kqdyhsrstf0mu78ksjsssdm70h65u1g3kp2l6toiwmezaf81trjfttd3yt8iqdx4pe5m2k9ler4w3bowo42bh6lf4jtmg0n777nbihbk24wvi9z5iha8es0dt4cvj8u3',
                isActive: true,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountApplicationCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountPermissions property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'USER',
                name: 'fh2po6geoeiaq2mp28qmnufzfzioa1z34wb1ggo8i71om5mhdhm0hvtrsrntwlhk3zw0kbdcfb8d1e6pq4d4gfs0deko52jtx8ttbd3n26osnuhj36um22bnx1oq358bma266galozfax0gxbwxx0p6kez3duk7q3edkmmx3h8e1glh00ffsttxtrb11eilorpmxjq8jnw4jamis99g7r0kdvh3bvtncsv2fmagovximwxjvfwikj9rldcc6cua',
                isActive: true,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: null,
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountPermissions must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountPermissions property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'SERVICE',
                name: '2p5ank9ux58yurysgedhe8wdg7f5l12n4595cf6lkz78sct6wzkfzkjuzhn5ke81rnl1evcgtijgyr2gdhijq542l8k7z3iafqu8ol8xahljmo6mfbp0hx9e4dewwep70bvzfx9njbazacs91sjb2wkxc4if6bux8gmhklla4vr7nq5zhy0cek9h4zs1h6idjyz7ju2b965f9i7a0k8e05fw07d6f695lwm96k0vmauirsuecq4i8fj1etf5kn3',
                isActive: true,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountPermissions must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'drqm7xjd51ja0vtyy6pnt5dxj6qwqu1vp6y92',
                type: 'USER',
                name: '875pma2lpxbqs3cixylwl92mgsm0d3rl39nqnq32gu54l3qqoanfi7hmoy531l7t33pz2b3y6zhbig0box6przq4u6z44tcj2up9k7bo7pfp2jnlnwt7rh1mfd7uwt5sv152e0tyuxkgn2870lhqnuuenj5d6xbalpfhy7j5scrrp467viths6mukx0ke08fvugr4yl95vf7rq629ctit2xyphfn2fdrpelrvnj34pko0wxu5zqcd0wporewwwk',
                isActive: true,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'USER',
                name: '7rcs3kujt2xkzrcef3u69ywx65vfmujlrc021tcr9oo2pmfan6638obx4n4nq1ipd7sopew2nq48p8rnuric1y6tt65x9vxdbbji2ies7pwwquq6pbi6z6skneqgxj3at8jkoi1dkovsx4mjssiamu7sfjrpoft1do12ggf9w8an0la8cwruz0wljyemhk13mq5pe1vnzi2p6xivat1m2nb45ck7ktcg3d1afo9cmd2dkpxuhd38gkmyswrh0bh',
                isActive: true,
                clientId: 'p5upsk91ik5498r2i8ynh3xlsqfpuvbzep27k',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'USER',
                name: '69pudihool7ns8ia58cxn88pnp9dabehxumqig4ge6d28anoif17l19e0qdn9g4uec12ysncmjbbuxx5el0ocd0mgczgdwlpt2wrk4ud8zp8jwjwv9fkrjizfuzp25w3smra8285ak5c88oet6xwpqpva6yl0tm44dduued9vrugujrumo8o9c7mocvss69x12ya9mkwaxqhr95zajm4ssbfd6ulpgwdlm96ks9b6ix2dmy30axypfaz8hjuxmw1',
                isActive: false,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'USER',
                name: '3m9m7fpeys4sz58xgp6mqvxdvac007449i9a1jol7f4swzi2zbs8vry1k5noirgzez54rwojxhyja7jqr7cwcue3i90k2l50ssp2n7ip2kdw5ury3ha12dflcptw1vkjps56ladfpgdikwye6ufwvoca0m96n3qx81bl4bl3qwy3mbouzfwj2fmkoujs8ss8614hj9jpspyh28twtobmadadan9z2e2m0q3by2e9cd6tw301smu5e49ifahrohx',
                isActive: 'true',
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST iam/account - Got 400 Conflict, AccountType has to be a enum option of USER, SERVICE`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'XXXX',
                name: '8uvanwljgsql6xrveiwpwe7bpivh3m1g02hks62pyn8kwjd3inhr57aizvk5ew0wwhtnyhlabing093lqb48ow9kd9zu710p6evdgky4qy6r5x7d6u0c70w60g5129d7mf2cvscufxrtqh158fgx6rlyi7pu6ne4h2xh8na6rbv1mqk934h6q7n92fz74lq7svn4ixcedmo9tp7ww2ehny9h9v7kmwudpa2wulk6qo71g8ov3trg516245gpzfn',
                isActive: false,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType has to be any of this options: USER, SERVICE');
            });
    });
    

    

    test(`/REST:POST iam/account`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'USER',
                name: '9imv7od0fxmnq8ocj16gu1d48r51vvacu1av8j1ig49xmc8sfivt8y4pw2gsxmq4uets42u0h5zkqiyvy6ai9kij600obtdzy2l92gnu31soyfer79dlr4x35l8fh2f77ssvlizqkl9qzbg3leim1342em4xbkt5439ijknbowlcsz183ytgc212zwi1ih94t8biujhp054y62cy5cxt84c2nlgjtmnyer0j9zeakdykz62ki268chvlcgdhtx4',
                isActive: true,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/accounts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/accounts/paginate')
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

    test(`/REST:GET iam/account - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a3474595-639b-4899-8e50-abc6a5848989'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/account`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '4d0ac56d-f3b0-438d-8300-893a83247ff8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4d0ac56d-f3b0-438d-8300-893a83247ff8'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/f2f1d765-b22f-49b8-8edc-b860903f123d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/account/4d0ac56d-f3b0-438d-8300-893a83247ff8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4d0ac56d-f3b0-438d-8300-893a83247ff8'));
    });

    test(`/REST:GET iam/accounts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/accounts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/account - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                id: '33706622-1a31-4b58-92af-e631dbd31222',
                type: 'SERVICE',
                name: '803yze6te1p4564955phbmtvd3dhgt4u0gsxbiknsxvw0sycth2qemdf2k0kjknit8x265z9gpj1r468a5zho7n2z4mvsgk22g0p1og3v6bqz0fbgk3ri7sr851wmq0hcuzyytx6ninnoa0kftg7fk4q5uarxlqo5fbi443v4ojlmanzjg7ikqtq2n3bike5zvrhc5i9h90wrsvuzpvapmlodc11id9ra5ry6xm5c5w02nfrojt7eznv6ho6ba9',
                isActive: false,
                clientId: 'd3021281-07c8-4ebf-9cb4-0077062c7f78',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/account`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                
                id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                type: 'USER',
                name: '3nvfmuv6q540l65saoigfxlrlp3scr69peodfqhgg7q0o0837o64efzef0gmzee05rj6xh82xzq9ew35yuj6ltv7t4zxxudqb2e37inha8z6v8ko3r88pk25fajtdt1x8psmfag3x4hqf9hnanfwfz9r2slbbx110g7jkh2mhj305gluilbbx4wlk80ttatydwv1c3139jt73qpdeangv2vi0831o69b46hvkp574qina40byldu92qybm1y648',
                isActive: false,
                clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                applicationCodes: { "foo" : "bar" },
                permissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4d0ac56d-f3b0-438d-8300-893a83247ff8'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/c63bef00-45c6-432f-a330-ee6a73382ed9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/account/4d0ac56d-f3b0-438d-8300-893a83247ff8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateAccount - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
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

    test(`/GraphQL iamCreateAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '8ad027a7-1d0f-46f2-81f9-c74d8e680b3a',
                        type: 'USER',
                        name: 'q7e2a6crja7gt2xlhwl687hxu25jiwtemf3epyvmzorhesyypky7xuknxf6gu5bdkgtvzwwhanx9m16a5t46nsj4akuybb02flkf3x56c3xqdxiimlzwu8pkw24dl23z690ec8oow74bfy9580g9z2y34nsl6lgqvspd8o588olxqlnvfbibmr1z4iu51q8vts9hftvkaf0m79osrl6boxrmlyu7378i7t4idqpqf8nj8jw2sztxl25uzqki7ly',
                        isActive: false,
                        clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                        applicationCodes: { "foo" : "bar" },
                        permissions: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '8ad027a7-1d0f-46f2-81f9-c74d8e680b3a');
            });
    });

    test(`/GraphQL iamPaginateAccounts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateAccounts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateAccounts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindAccount - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
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
                            id: 'bbe297d4-3200-4f9a-9f93-45e136848eae'
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

    test(`/GraphQL iamFindAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
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
                            id: '4d0ac56d-f3b0-438d-8300-893a83247ff8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccount.id).toStrictEqual('4d0ac56d-f3b0-438d-8300-893a83247ff8');
            });
    });

    test(`/GraphQL iamFindAccountById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '44728454-f693-4aa7-901d-c3a2fa8f17d0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindAccountById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4d0ac56d-f3b0-438d-8300-893a83247ff8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('4d0ac56d-f3b0-438d-8300-893a83247ff8');
            });
    });

    test(`/GraphQL iamGetAccounts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetAccounts (query:$query)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
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
                for (const [index, value] of res.body.data.iamGetAccounts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateAccount - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b834267e-3de1-49c2-ace7-3e4f637acef0',
                        type: 'SERVICE',
                        name: '7ozawtxj1rt2wjkbj8ie1akq4kqrz0vwhqtzk2zki9uqlj2iym5edc4lu2lyb8vhhl2k9d7ivg0jrpejqrpwqsjlf263t5vca5mnizp2jj12gj7jqcmo1aqrtlcsia7iapukmcw2x77nhpyiv7e8h0zbdrx8n0opyfwzyasz6tpmbvgbgtau1nnfhf9fh5bswn1scyn5446pg8z75v22tjzabvmh4p3u1yr1og8npaqlfkar7tjsmij68jen3dl',
                        isActive: false,
                        clientId: 'de3dafff-45fa-4935-b90c-89b2013aed03',
                        applicationCodes: { "foo" : "bar" },
                        permissions: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
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

    test(`/GraphQL iamUpdateAccount`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4d0ac56d-f3b0-438d-8300-893a83247ff8',
                        type: 'USER',
                        name: '3b05nupspt5df9y8k39sopapjtvgu2arb7g3p9hoagz3ulosekh17ygq4pbvro34iexm0n3rys9zd7h3ybyx3llm58xj8ua6obwgedsihf1jdzqy0ot57t2de450g7ueplnc5wxtmzvb6l26avqcg3fsg7f16y3umalowikr3x4zsm42lfxgah7xrdgb9gqid7bys8patiolnz6v3sz4poetjpbj19wlai4v1lsgba6z53gzdfrck62buxedai4',
                        isActive: false,
                        clientId: '7f54f196-12ab-47f6-aada-06243f1d4b22',
                        applicationCodes: { "foo" : "bar" },
                        permissions: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('4d0ac56d-f3b0-438d-8300-893a83247ff8');
            });
    });

    test(`/GraphQL iamDeleteAccountById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2d214ff3-6568-4081-a341-8fa610ea04fd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteAccountById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {   
                            id
                            type
                            name
                            isActive
                            clientId
                            applicationCodes
                            permissions
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4d0ac56d-f3b0-438d-8300-893a83247ff8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('4d0ac56d-f3b0-438d-8300-893a83247ff8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});