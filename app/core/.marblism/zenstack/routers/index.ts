/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createSocialAccountRouter from "./SocialAccount.router";
import createCommentTemplateRouter from "./CommentTemplate.router";
import createHashtagRouter from "./Hashtag.router";
import createScheduleRuleRouter from "./ScheduleRule.router";
import createActivityLogRouter from "./ActivityLog.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as SocialAccountClientType } from "./SocialAccount.router";
import { ClientType as CommentTemplateClientType } from "./CommentTemplate.router";
import { ClientType as HashtagClientType } from "./Hashtag.router";
import { ClientType as ScheduleRuleClientType } from "./ScheduleRule.router";
import { ClientType as ActivityLogClientType } from "./ActivityLog.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        socialAccount: createSocialAccountRouter(router, procedure),
        commentTemplate: createCommentTemplateRouter(router, procedure),
        hashtag: createHashtagRouter(router, procedure),
        scheduleRule: createScheduleRuleRouter(router, procedure),
        activityLog: createActivityLogRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    socialAccount: SocialAccountClientType<AppRouter>;
    commentTemplate: CommentTemplateClientType<AppRouter>;
    hashtag: HashtagClientType<AppRouter>;
    scheduleRule: ScheduleRuleClientType<AppRouter>;
    activityLog: ActivityLogClientType<AppRouter>;
}
