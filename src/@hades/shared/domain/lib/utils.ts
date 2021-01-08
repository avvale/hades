import { Moment } from 'moment';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment-timezone';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
declare const Buffer: any;

export class Utils
{
    // TODO, create interface and decouple
    constructor() {}

    public static now(): Moment
    {
        return moment();
    }

    public static nowTimestamp(): string
    {
        return moment().format('YYYY-MM-DD H:mm:ss');
    }

    public static sha1(data: string): string
    {
        const generator = crypto.createHash('sha1');
        generator.update(data);

        return generator.digest('hex');
    }

    public static base64Encode(data: string): string
    {
        return Buffer.from(data).toString('base64');
    }

    public static base64Decode(data: string): string
    {
        return Buffer.from(data, 'base64').toString('utf-8')
    }

    // map deeply object keys
    public static deepMapKeys(obj, fn): Object
    {
        return Array.isArray(obj)
            ? obj.map(val => Utils.deepMapKeys(val, fn))
            : typeof obj === 'object'
                ? Object.keys(obj).reduce((acc, current) => {
                    const key = fn(current);
                    const val = obj[current];
                    acc[key] = val !== null && typeof val === 'object' ? Utils.deepMapKeys(val, fn) : val;
                    return acc;
                }, {})
                : obj;
    }

    public static deepMapValues(obj, fn: Function): Object
    {
        if (Array.isArray(obj)) {
            return obj.map(function(val, key) {
                return (typeof val === 'object') ? Utils.deepMapValues(val, fn) : fn(val, key);
            });
        } else if (typeof obj === 'object') {
            const res = {};
            for (var key in obj) {
                var val = obj[key];
                if (typeof val === 'object') {
                    res[key] = Utils.deepMapValues(val, fn);
                } else {
                    res[key] = fn(val, key);
                }
            }
            return res;
        } else {
            return obj;
        }
    }

    public static hash(password: string, saltRounds: number = 10): string
    {
        return bcrypt.hashSync(password, saltRounds);
    }

    public static isImageMime(mime: string)
    {
        switch (mime)
        {
            case 'image/gif':
            case 'image/jpeg':
            case 'image/pjpeg':
            case 'image/png':
            case 'image/svg+xml':
                return true;
                break;
            default:
                return false;
        }
    }

    public static uuid(): string
    {
        return uuidv4();
    }

    public static randomString(length: number, chars: string): string
    {
        var mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        var result = '';
        for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
        return result;
    }

    public static basePath(...relativePath): string
    {
        return path.join(process.cwd(), ...relativePath);
    }

    public static asset(...relativePath): string
    {
        return relativePath.join('/');
    }
}