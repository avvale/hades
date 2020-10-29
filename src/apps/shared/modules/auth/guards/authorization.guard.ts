import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate
{
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> 
    {
        const permissions = this.reflector.get<string[]>('permissions', context.getClass());

        if (!permissions) return true;

        // check that each permission is included in account permissions
        if (context['contextType'] === 'graphql')
        {
            const ctx = GqlExecutionContext.create(context);
            return permissions.every(permisison => ctx.getContext().req.user.dPermissions.all.includes(permisison));
        }
        else if (context['contextType'] === 'http')
        {
            const ctx = context.switchToHttp();
            return permissions.every(permisison => ctx.getRequest().user.dPermissions.all.includes(permisison));
        }
    }
}
