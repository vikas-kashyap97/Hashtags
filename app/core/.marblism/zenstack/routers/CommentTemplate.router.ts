/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.CommentTemplateInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).commentTemplate.createMany(input as any))),

        create: procedure.input($Schema.CommentTemplateInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).commentTemplate.create(input as any))),

        deleteMany: procedure.input($Schema.CommentTemplateInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).commentTemplate.deleteMany(input as any))),

        delete: procedure.input($Schema.CommentTemplateInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).commentTemplate.delete(input as any))),

        findFirst: procedure.input($Schema.CommentTemplateInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).commentTemplate.findFirst(input as any))),

        findMany: procedure.input($Schema.CommentTemplateInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).commentTemplate.findMany(input as any))),

        findUnique: procedure.input($Schema.CommentTemplateInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).commentTemplate.findUnique(input as any))),

        updateMany: procedure.input($Schema.CommentTemplateInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).commentTemplate.updateMany(input as any))),

        update: procedure.input($Schema.CommentTemplateInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).commentTemplate.update(input as any))),

        count: procedure.input($Schema.CommentTemplateInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).commentTemplate.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CommentTemplateCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentTemplateCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentTemplateCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentTemplateCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CommentTemplateCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentTemplateCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommentTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommentTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentTemplateCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentTemplateCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommentTemplateGetPayload<T>, Context>) => Promise<Prisma.CommentTemplateGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CommentTemplateDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentTemplateDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentTemplateDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentTemplateDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CommentTemplateDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentTemplateDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommentTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommentTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentTemplateDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentTemplateDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommentTemplateGetPayload<T>, Context>) => Promise<Prisma.CommentTemplateGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CommentTemplateFindFirstArgs, TData = Prisma.CommentTemplateGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CommentTemplateFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommentTemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommentTemplateFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommentTemplateFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommentTemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommentTemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CommentTemplateFindManyArgs, TData = Array<Prisma.CommentTemplateGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CommentTemplateFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CommentTemplateGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommentTemplateFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommentTemplateFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CommentTemplateGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CommentTemplateGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CommentTemplateFindUniqueArgs, TData = Prisma.CommentTemplateGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CommentTemplateFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommentTemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommentTemplateFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CommentTemplateFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommentTemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommentTemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CommentTemplateUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentTemplateUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentTemplateUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentTemplateUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CommentTemplateUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommentTemplateUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommentTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommentTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommentTemplateUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommentTemplateUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommentTemplateGetPayload<T>, Context>) => Promise<Prisma.CommentTemplateGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CommentTemplateCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommentTemplateCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CommentTemplateCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CommentTemplateCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CommentTemplateCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CommentTemplateCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CommentTemplateCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommentTemplateCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
