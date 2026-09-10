
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model FeedbackSubmission
 * 
 */
export type FeedbackSubmission = $Result.DefaultSelection<Prisma.$FeedbackSubmissionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Audience: {
  VISITED: 'VISITED',
  MISSED: 'MISSED'
};

export type Audience = (typeof Audience)[keyof typeof Audience]


export const SheetSyncStatus: {
  pending: 'pending',
  synced: 'synced',
  failed: 'failed'
};

export type SheetSyncStatus = (typeof SheetSyncStatus)[keyof typeof SheetSyncStatus]

}

export type Audience = $Enums.Audience

export const Audience: typeof $Enums.Audience

export type SheetSyncStatus = $Enums.SheetSyncStatus

export const SheetSyncStatus: typeof $Enums.SheetSyncStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more FeedbackSubmissions
 * const feedbackSubmissions = await prisma.feedbackSubmission.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more FeedbackSubmissions
   * const feedbackSubmissions = await prisma.feedbackSubmission.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.feedbackSubmission`: Exposes CRUD operations for the **FeedbackSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeedbackSubmissions
    * const feedbackSubmissions = await prisma.feedbackSubmission.findMany()
    * ```
    */
  get feedbackSubmission(): Prisma.FeedbackSubmissionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    FeedbackSubmission: 'FeedbackSubmission'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "feedbackSubmission"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      FeedbackSubmission: {
        payload: Prisma.$FeedbackSubmissionPayload<ExtArgs>
        fields: Prisma.FeedbackSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload>
          }
          findFirst: {
            args: Prisma.FeedbackSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload>
          }
          findMany: {
            args: Prisma.FeedbackSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload>[]
          }
          create: {
            args: Prisma.FeedbackSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload>
          }
          createMany: {
            args: Prisma.FeedbackSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload>[]
          }
          delete: {
            args: Prisma.FeedbackSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload>
          }
          update: {
            args: Prisma.FeedbackSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedbackSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.FeedbackSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackSubmissionPayload>
          }
          aggregate: {
            args: Prisma.FeedbackSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedbackSubmission>
          }
          groupBy: {
            args: Prisma.FeedbackSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackSubmissionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    feedbackSubmission?: FeedbackSubmissionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model FeedbackSubmission
   */

  export type AggregateFeedbackSubmission = {
    _count: FeedbackSubmissionCountAggregateOutputType | null
    _min: FeedbackSubmissionMinAggregateOutputType | null
    _max: FeedbackSubmissionMaxAggregateOutputType | null
  }

  export type FeedbackSubmissionMinAggregateOutputType = {
    id: string | null
    audience: $Enums.Audience | null
    firstName: string | null
    lastName: string | null
    email: string | null
    emailNormalized: string | null
    phone: string | null
    phoneNormalized: string | null
    locale: string | null
    sheetSyncStatus: $Enums.SheetSyncStatus | null
    sheetSyncedAt: Date | null
    sheetError: string | null
    createdAt: Date | null
  }

  export type FeedbackSubmissionMaxAggregateOutputType = {
    id: string | null
    audience: $Enums.Audience | null
    firstName: string | null
    lastName: string | null
    email: string | null
    emailNormalized: string | null
    phone: string | null
    phoneNormalized: string | null
    locale: string | null
    sheetSyncStatus: $Enums.SheetSyncStatus | null
    sheetSyncedAt: Date | null
    sheetError: string | null
    createdAt: Date | null
  }

  export type FeedbackSubmissionCountAggregateOutputType = {
    id: number
    audience: number
    firstName: number
    lastName: number
    email: number
    emailNormalized: number
    phone: number
    phoneNormalized: number
    answers: number
    locale: number
    sheetSyncStatus: number
    sheetSyncedAt: number
    sheetError: number
    createdAt: number
    _all: number
  }


  export type FeedbackSubmissionMinAggregateInputType = {
    id?: true
    audience?: true
    firstName?: true
    lastName?: true
    email?: true
    emailNormalized?: true
    phone?: true
    phoneNormalized?: true
    locale?: true
    sheetSyncStatus?: true
    sheetSyncedAt?: true
    sheetError?: true
    createdAt?: true
  }

  export type FeedbackSubmissionMaxAggregateInputType = {
    id?: true
    audience?: true
    firstName?: true
    lastName?: true
    email?: true
    emailNormalized?: true
    phone?: true
    phoneNormalized?: true
    locale?: true
    sheetSyncStatus?: true
    sheetSyncedAt?: true
    sheetError?: true
    createdAt?: true
  }

  export type FeedbackSubmissionCountAggregateInputType = {
    id?: true
    audience?: true
    firstName?: true
    lastName?: true
    email?: true
    emailNormalized?: true
    phone?: true
    phoneNormalized?: true
    answers?: true
    locale?: true
    sheetSyncStatus?: true
    sheetSyncedAt?: true
    sheetError?: true
    createdAt?: true
    _all?: true
  }

  export type FeedbackSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedbackSubmission to aggregate.
     */
    where?: FeedbackSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackSubmissions to fetch.
     */
    orderBy?: FeedbackSubmissionOrderByWithRelationInput | FeedbackSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeedbackSubmissions
    **/
    _count?: true | FeedbackSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackSubmissionMaxAggregateInputType
  }

  export type GetFeedbackSubmissionAggregateType<T extends FeedbackSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedbackSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedbackSubmission[P]>
      : GetScalarType<T[P], AggregateFeedbackSubmission[P]>
  }




  export type FeedbackSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackSubmissionWhereInput
    orderBy?: FeedbackSubmissionOrderByWithAggregationInput | FeedbackSubmissionOrderByWithAggregationInput[]
    by: FeedbackSubmissionScalarFieldEnum[] | FeedbackSubmissionScalarFieldEnum
    having?: FeedbackSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackSubmissionCountAggregateInputType | true
    _min?: FeedbackSubmissionMinAggregateInputType
    _max?: FeedbackSubmissionMaxAggregateInputType
  }

  export type FeedbackSubmissionGroupByOutputType = {
    id: string
    audience: $Enums.Audience
    firstName: string
    lastName: string
    email: string
    emailNormalized: string
    phone: string
    phoneNormalized: string
    answers: JsonValue
    locale: string
    sheetSyncStatus: $Enums.SheetSyncStatus
    sheetSyncedAt: Date | null
    sheetError: string | null
    createdAt: Date
    _count: FeedbackSubmissionCountAggregateOutputType | null
    _min: FeedbackSubmissionMinAggregateOutputType | null
    _max: FeedbackSubmissionMaxAggregateOutputType | null
  }

  type GetFeedbackSubmissionGroupByPayload<T extends FeedbackSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audience?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    emailNormalized?: boolean
    phone?: boolean
    phoneNormalized?: boolean
    answers?: boolean
    locale?: boolean
    sheetSyncStatus?: boolean
    sheetSyncedAt?: boolean
    sheetError?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["feedbackSubmission"]>

  export type FeedbackSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audience?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    emailNormalized?: boolean
    phone?: boolean
    phoneNormalized?: boolean
    answers?: boolean
    locale?: boolean
    sheetSyncStatus?: boolean
    sheetSyncedAt?: boolean
    sheetError?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["feedbackSubmission"]>

  export type FeedbackSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    audience?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    emailNormalized?: boolean
    phone?: boolean
    phoneNormalized?: boolean
    answers?: boolean
    locale?: boolean
    sheetSyncStatus?: boolean
    sheetSyncedAt?: boolean
    sheetError?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["feedbackSubmission"]>

  export type FeedbackSubmissionSelectScalar = {
    id?: boolean
    audience?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    emailNormalized?: boolean
    phone?: boolean
    phoneNormalized?: boolean
    answers?: boolean
    locale?: boolean
    sheetSyncStatus?: boolean
    sheetSyncedAt?: boolean
    sheetError?: boolean
    createdAt?: boolean
  }

  export type FeedbackSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "audience" | "firstName" | "lastName" | "email" | "emailNormalized" | "phone" | "phoneNormalized" | "answers" | "locale" | "sheetSyncStatus" | "sheetSyncedAt" | "sheetError" | "createdAt", ExtArgs["result"]["feedbackSubmission"]>

  export type $FeedbackSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeedbackSubmission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      audience: $Enums.Audience
      firstName: string
      lastName: string
      email: string
      emailNormalized: string
      phone: string
      phoneNormalized: string
      answers: Prisma.JsonValue
      locale: string
      sheetSyncStatus: $Enums.SheetSyncStatus
      sheetSyncedAt: Date | null
      sheetError: string | null
      createdAt: Date
    }, ExtArgs["result"]["feedbackSubmission"]>
    composites: {}
  }

  type FeedbackSubmissionGetPayload<S extends boolean | null | undefined | FeedbackSubmissionDefaultArgs> = $Result.GetResult<Prisma.$FeedbackSubmissionPayload, S>

  type FeedbackSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackSubmissionCountAggregateInputType | true
    }

  export interface FeedbackSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeedbackSubmission'], meta: { name: 'FeedbackSubmission' } }
    /**
     * Find zero or one FeedbackSubmission that matches the filter.
     * @param {FeedbackSubmissionFindUniqueArgs} args - Arguments to find a FeedbackSubmission
     * @example
     * // Get one FeedbackSubmission
     * const feedbackSubmission = await prisma.feedbackSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackSubmissionFindUniqueArgs>(args: SelectSubset<T, FeedbackSubmissionFindUniqueArgs<ExtArgs>>): Prisma__FeedbackSubmissionClient<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FeedbackSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackSubmissionFindUniqueOrThrowArgs} args - Arguments to find a FeedbackSubmission
     * @example
     * // Get one FeedbackSubmission
     * const feedbackSubmission = await prisma.feedbackSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackSubmissionClient<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedbackSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackSubmissionFindFirstArgs} args - Arguments to find a FeedbackSubmission
     * @example
     * // Get one FeedbackSubmission
     * const feedbackSubmission = await prisma.feedbackSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackSubmissionFindFirstArgs>(args?: SelectSubset<T, FeedbackSubmissionFindFirstArgs<ExtArgs>>): Prisma__FeedbackSubmissionClient<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedbackSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackSubmissionFindFirstOrThrowArgs} args - Arguments to find a FeedbackSubmission
     * @example
     * // Get one FeedbackSubmission
     * const feedbackSubmission = await prisma.feedbackSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackSubmissionClient<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FeedbackSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeedbackSubmissions
     * const feedbackSubmissions = await prisma.feedbackSubmission.findMany()
     * 
     * // Get first 10 FeedbackSubmissions
     * const feedbackSubmissions = await prisma.feedbackSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackSubmissionWithIdOnly = await prisma.feedbackSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackSubmissionFindManyArgs>(args?: SelectSubset<T, FeedbackSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FeedbackSubmission.
     * @param {FeedbackSubmissionCreateArgs} args - Arguments to create a FeedbackSubmission.
     * @example
     * // Create one FeedbackSubmission
     * const FeedbackSubmission = await prisma.feedbackSubmission.create({
     *   data: {
     *     // ... data to create a FeedbackSubmission
     *   }
     * })
     * 
     */
    create<T extends FeedbackSubmissionCreateArgs>(args: SelectSubset<T, FeedbackSubmissionCreateArgs<ExtArgs>>): Prisma__FeedbackSubmissionClient<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FeedbackSubmissions.
     * @param {FeedbackSubmissionCreateManyArgs} args - Arguments to create many FeedbackSubmissions.
     * @example
     * // Create many FeedbackSubmissions
     * const feedbackSubmission = await prisma.feedbackSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackSubmissionCreateManyArgs>(args?: SelectSubset<T, FeedbackSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeedbackSubmissions and returns the data saved in the database.
     * @param {FeedbackSubmissionCreateManyAndReturnArgs} args - Arguments to create many FeedbackSubmissions.
     * @example
     * // Create many FeedbackSubmissions
     * const feedbackSubmission = await prisma.feedbackSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeedbackSubmissions and only return the `id`
     * const feedbackSubmissionWithIdOnly = await prisma.feedbackSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FeedbackSubmission.
     * @param {FeedbackSubmissionDeleteArgs} args - Arguments to delete one FeedbackSubmission.
     * @example
     * // Delete one FeedbackSubmission
     * const FeedbackSubmission = await prisma.feedbackSubmission.delete({
     *   where: {
     *     // ... filter to delete one FeedbackSubmission
     *   }
     * })
     * 
     */
    delete<T extends FeedbackSubmissionDeleteArgs>(args: SelectSubset<T, FeedbackSubmissionDeleteArgs<ExtArgs>>): Prisma__FeedbackSubmissionClient<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FeedbackSubmission.
     * @param {FeedbackSubmissionUpdateArgs} args - Arguments to update one FeedbackSubmission.
     * @example
     * // Update one FeedbackSubmission
     * const feedbackSubmission = await prisma.feedbackSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackSubmissionUpdateArgs>(args: SelectSubset<T, FeedbackSubmissionUpdateArgs<ExtArgs>>): Prisma__FeedbackSubmissionClient<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FeedbackSubmissions.
     * @param {FeedbackSubmissionDeleteManyArgs} args - Arguments to filter FeedbackSubmissions to delete.
     * @example
     * // Delete a few FeedbackSubmissions
     * const { count } = await prisma.feedbackSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackSubmissionDeleteManyArgs>(args?: SelectSubset<T, FeedbackSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedbackSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeedbackSubmissions
     * const feedbackSubmission = await prisma.feedbackSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackSubmissionUpdateManyArgs>(args: SelectSubset<T, FeedbackSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedbackSubmissions and returns the data updated in the database.
     * @param {FeedbackSubmissionUpdateManyAndReturnArgs} args - Arguments to update many FeedbackSubmissions.
     * @example
     * // Update many FeedbackSubmissions
     * const feedbackSubmission = await prisma.feedbackSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FeedbackSubmissions and only return the `id`
     * const feedbackSubmissionWithIdOnly = await prisma.feedbackSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedbackSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedbackSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FeedbackSubmission.
     * @param {FeedbackSubmissionUpsertArgs} args - Arguments to update or create a FeedbackSubmission.
     * @example
     * // Update or create a FeedbackSubmission
     * const feedbackSubmission = await prisma.feedbackSubmission.upsert({
     *   create: {
     *     // ... data to create a FeedbackSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeedbackSubmission we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackSubmissionUpsertArgs>(args: SelectSubset<T, FeedbackSubmissionUpsertArgs<ExtArgs>>): Prisma__FeedbackSubmissionClient<$Result.GetResult<Prisma.$FeedbackSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FeedbackSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackSubmissionCountArgs} args - Arguments to filter FeedbackSubmissions to count.
     * @example
     * // Count the number of FeedbackSubmissions
     * const count = await prisma.feedbackSubmission.count({
     *   where: {
     *     // ... the filter for the FeedbackSubmissions we want to count
     *   }
     * })
    **/
    count<T extends FeedbackSubmissionCountArgs>(
      args?: Subset<T, FeedbackSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeedbackSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackSubmissionAggregateArgs>(args: Subset<T, FeedbackSubmissionAggregateArgs>): Prisma.PrismaPromise<GetFeedbackSubmissionAggregateType<T>>

    /**
     * Group by FeedbackSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeedbackSubmission model
   */
  readonly fields: FeedbackSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeedbackSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeedbackSubmission model
   */
  interface FeedbackSubmissionFieldRefs {
    readonly id: FieldRef<"FeedbackSubmission", 'String'>
    readonly audience: FieldRef<"FeedbackSubmission", 'Audience'>
    readonly firstName: FieldRef<"FeedbackSubmission", 'String'>
    readonly lastName: FieldRef<"FeedbackSubmission", 'String'>
    readonly email: FieldRef<"FeedbackSubmission", 'String'>
    readonly emailNormalized: FieldRef<"FeedbackSubmission", 'String'>
    readonly phone: FieldRef<"FeedbackSubmission", 'String'>
    readonly phoneNormalized: FieldRef<"FeedbackSubmission", 'String'>
    readonly answers: FieldRef<"FeedbackSubmission", 'Json'>
    readonly locale: FieldRef<"FeedbackSubmission", 'String'>
    readonly sheetSyncStatus: FieldRef<"FeedbackSubmission", 'SheetSyncStatus'>
    readonly sheetSyncedAt: FieldRef<"FeedbackSubmission", 'DateTime'>
    readonly sheetError: FieldRef<"FeedbackSubmission", 'String'>
    readonly createdAt: FieldRef<"FeedbackSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeedbackSubmission findUnique
   */
  export type FeedbackSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which FeedbackSubmission to fetch.
     */
    where: FeedbackSubmissionWhereUniqueInput
  }

  /**
   * FeedbackSubmission findUniqueOrThrow
   */
  export type FeedbackSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which FeedbackSubmission to fetch.
     */
    where: FeedbackSubmissionWhereUniqueInput
  }

  /**
   * FeedbackSubmission findFirst
   */
  export type FeedbackSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which FeedbackSubmission to fetch.
     */
    where?: FeedbackSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackSubmissions to fetch.
     */
    orderBy?: FeedbackSubmissionOrderByWithRelationInput | FeedbackSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedbackSubmissions.
     */
    cursor?: FeedbackSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedbackSubmissions.
     */
    distinct?: FeedbackSubmissionScalarFieldEnum | FeedbackSubmissionScalarFieldEnum[]
  }

  /**
   * FeedbackSubmission findFirstOrThrow
   */
  export type FeedbackSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which FeedbackSubmission to fetch.
     */
    where?: FeedbackSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackSubmissions to fetch.
     */
    orderBy?: FeedbackSubmissionOrderByWithRelationInput | FeedbackSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedbackSubmissions.
     */
    cursor?: FeedbackSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedbackSubmissions.
     */
    distinct?: FeedbackSubmissionScalarFieldEnum | FeedbackSubmissionScalarFieldEnum[]
  }

  /**
   * FeedbackSubmission findMany
   */
  export type FeedbackSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which FeedbackSubmissions to fetch.
     */
    where?: FeedbackSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackSubmissions to fetch.
     */
    orderBy?: FeedbackSubmissionOrderByWithRelationInput | FeedbackSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeedbackSubmissions.
     */
    cursor?: FeedbackSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedbackSubmissions.
     */
    distinct?: FeedbackSubmissionScalarFieldEnum | FeedbackSubmissionScalarFieldEnum[]
  }

  /**
   * FeedbackSubmission create
   */
  export type FeedbackSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to create a FeedbackSubmission.
     */
    data: XOR<FeedbackSubmissionCreateInput, FeedbackSubmissionUncheckedCreateInput>
  }

  /**
   * FeedbackSubmission createMany
   */
  export type FeedbackSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeedbackSubmissions.
     */
    data: FeedbackSubmissionCreateManyInput | FeedbackSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedbackSubmission createManyAndReturn
   */
  export type FeedbackSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many FeedbackSubmissions.
     */
    data: FeedbackSubmissionCreateManyInput | FeedbackSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedbackSubmission update
   */
  export type FeedbackSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to update a FeedbackSubmission.
     */
    data: XOR<FeedbackSubmissionUpdateInput, FeedbackSubmissionUncheckedUpdateInput>
    /**
     * Choose, which FeedbackSubmission to update.
     */
    where: FeedbackSubmissionWhereUniqueInput
  }

  /**
   * FeedbackSubmission updateMany
   */
  export type FeedbackSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeedbackSubmissions.
     */
    data: XOR<FeedbackSubmissionUpdateManyMutationInput, FeedbackSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which FeedbackSubmissions to update
     */
    where?: FeedbackSubmissionWhereInput
    /**
     * Limit how many FeedbackSubmissions to update.
     */
    limit?: number
  }

  /**
   * FeedbackSubmission updateManyAndReturn
   */
  export type FeedbackSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update FeedbackSubmissions.
     */
    data: XOR<FeedbackSubmissionUpdateManyMutationInput, FeedbackSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which FeedbackSubmissions to update
     */
    where?: FeedbackSubmissionWhereInput
    /**
     * Limit how many FeedbackSubmissions to update.
     */
    limit?: number
  }

  /**
   * FeedbackSubmission upsert
   */
  export type FeedbackSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * The filter to search for the FeedbackSubmission to update in case it exists.
     */
    where: FeedbackSubmissionWhereUniqueInput
    /**
     * In case the FeedbackSubmission found by the `where` argument doesn't exist, create a new FeedbackSubmission with this data.
     */
    create: XOR<FeedbackSubmissionCreateInput, FeedbackSubmissionUncheckedCreateInput>
    /**
     * In case the FeedbackSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackSubmissionUpdateInput, FeedbackSubmissionUncheckedUpdateInput>
  }

  /**
   * FeedbackSubmission delete
   */
  export type FeedbackSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
    /**
     * Filter which FeedbackSubmission to delete.
     */
    where: FeedbackSubmissionWhereUniqueInput
  }

  /**
   * FeedbackSubmission deleteMany
   */
  export type FeedbackSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedbackSubmissions to delete
     */
    where?: FeedbackSubmissionWhereInput
    /**
     * Limit how many FeedbackSubmissions to delete.
     */
    limit?: number
  }

  /**
   * FeedbackSubmission without action
   */
  export type FeedbackSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackSubmission
     */
    select?: FeedbackSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedbackSubmission
     */
    omit?: FeedbackSubmissionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FeedbackSubmissionScalarFieldEnum: {
    id: 'id',
    audience: 'audience',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    emailNormalized: 'emailNormalized',
    phone: 'phone',
    phoneNormalized: 'phoneNormalized',
    answers: 'answers',
    locale: 'locale',
    sheetSyncStatus: 'sheetSyncStatus',
    sheetSyncedAt: 'sheetSyncedAt',
    sheetError: 'sheetError',
    createdAt: 'createdAt'
  };

  export type FeedbackSubmissionScalarFieldEnum = (typeof FeedbackSubmissionScalarFieldEnum)[keyof typeof FeedbackSubmissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Audience'
   */
  export type EnumAudienceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Audience'>
    


  /**
   * Reference to a field of type 'Audience[]'
   */
  export type ListEnumAudienceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Audience[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'SheetSyncStatus'
   */
  export type EnumSheetSyncStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SheetSyncStatus'>
    


  /**
   * Reference to a field of type 'SheetSyncStatus[]'
   */
  export type ListEnumSheetSyncStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SheetSyncStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type FeedbackSubmissionWhereInput = {
    AND?: FeedbackSubmissionWhereInput | FeedbackSubmissionWhereInput[]
    OR?: FeedbackSubmissionWhereInput[]
    NOT?: FeedbackSubmissionWhereInput | FeedbackSubmissionWhereInput[]
    id?: UuidFilter<"FeedbackSubmission"> | string
    audience?: EnumAudienceFilter<"FeedbackSubmission"> | $Enums.Audience
    firstName?: StringFilter<"FeedbackSubmission"> | string
    lastName?: StringFilter<"FeedbackSubmission"> | string
    email?: StringFilter<"FeedbackSubmission"> | string
    emailNormalized?: StringFilter<"FeedbackSubmission"> | string
    phone?: StringFilter<"FeedbackSubmission"> | string
    phoneNormalized?: StringFilter<"FeedbackSubmission"> | string
    answers?: JsonFilter<"FeedbackSubmission">
    locale?: StringFilter<"FeedbackSubmission"> | string
    sheetSyncStatus?: EnumSheetSyncStatusFilter<"FeedbackSubmission"> | $Enums.SheetSyncStatus
    sheetSyncedAt?: DateTimeNullableFilter<"FeedbackSubmission"> | Date | string | null
    sheetError?: StringNullableFilter<"FeedbackSubmission"> | string | null
    createdAt?: DateTimeFilter<"FeedbackSubmission"> | Date | string
  }

  export type FeedbackSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    audience?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    emailNormalized?: SortOrder
    phone?: SortOrder
    phoneNormalized?: SortOrder
    answers?: SortOrder
    locale?: SortOrder
    sheetSyncStatus?: SortOrder
    sheetSyncedAt?: SortOrderInput | SortOrder
    sheetError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackSubmissionWhereInput | FeedbackSubmissionWhereInput[]
    OR?: FeedbackSubmissionWhereInput[]
    NOT?: FeedbackSubmissionWhereInput | FeedbackSubmissionWhereInput[]
    audience?: EnumAudienceFilter<"FeedbackSubmission"> | $Enums.Audience
    firstName?: StringFilter<"FeedbackSubmission"> | string
    lastName?: StringFilter<"FeedbackSubmission"> | string
    email?: StringFilter<"FeedbackSubmission"> | string
    emailNormalized?: StringFilter<"FeedbackSubmission"> | string
    phone?: StringFilter<"FeedbackSubmission"> | string
    phoneNormalized?: StringFilter<"FeedbackSubmission"> | string
    answers?: JsonFilter<"FeedbackSubmission">
    locale?: StringFilter<"FeedbackSubmission"> | string
    sheetSyncStatus?: EnumSheetSyncStatusFilter<"FeedbackSubmission"> | $Enums.SheetSyncStatus
    sheetSyncedAt?: DateTimeNullableFilter<"FeedbackSubmission"> | Date | string | null
    sheetError?: StringNullableFilter<"FeedbackSubmission"> | string | null
    createdAt?: DateTimeFilter<"FeedbackSubmission"> | Date | string
  }, "id">

  export type FeedbackSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    audience?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    emailNormalized?: SortOrder
    phone?: SortOrder
    phoneNormalized?: SortOrder
    answers?: SortOrder
    locale?: SortOrder
    sheetSyncStatus?: SortOrder
    sheetSyncedAt?: SortOrderInput | SortOrder
    sheetError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FeedbackSubmissionCountOrderByAggregateInput
    _max?: FeedbackSubmissionMaxOrderByAggregateInput
    _min?: FeedbackSubmissionMinOrderByAggregateInput
  }

  export type FeedbackSubmissionScalarWhereWithAggregatesInput = {
    AND?: FeedbackSubmissionScalarWhereWithAggregatesInput | FeedbackSubmissionScalarWhereWithAggregatesInput[]
    OR?: FeedbackSubmissionScalarWhereWithAggregatesInput[]
    NOT?: FeedbackSubmissionScalarWhereWithAggregatesInput | FeedbackSubmissionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"FeedbackSubmission"> | string
    audience?: EnumAudienceWithAggregatesFilter<"FeedbackSubmission"> | $Enums.Audience
    firstName?: StringWithAggregatesFilter<"FeedbackSubmission"> | string
    lastName?: StringWithAggregatesFilter<"FeedbackSubmission"> | string
    email?: StringWithAggregatesFilter<"FeedbackSubmission"> | string
    emailNormalized?: StringWithAggregatesFilter<"FeedbackSubmission"> | string
    phone?: StringWithAggregatesFilter<"FeedbackSubmission"> | string
    phoneNormalized?: StringWithAggregatesFilter<"FeedbackSubmission"> | string
    answers?: JsonWithAggregatesFilter<"FeedbackSubmission">
    locale?: StringWithAggregatesFilter<"FeedbackSubmission"> | string
    sheetSyncStatus?: EnumSheetSyncStatusWithAggregatesFilter<"FeedbackSubmission"> | $Enums.SheetSyncStatus
    sheetSyncedAt?: DateTimeNullableWithAggregatesFilter<"FeedbackSubmission"> | Date | string | null
    sheetError?: StringNullableWithAggregatesFilter<"FeedbackSubmission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FeedbackSubmission"> | Date | string
  }

  export type FeedbackSubmissionCreateInput = {
    id?: string
    audience: $Enums.Audience
    firstName: string
    lastName: string
    email: string
    emailNormalized: string
    phone: string
    phoneNormalized: string
    answers: JsonNullValueInput | InputJsonValue
    locale: string
    sheetSyncStatus?: $Enums.SheetSyncStatus
    sheetSyncedAt?: Date | string | null
    sheetError?: string | null
    createdAt?: Date | string
  }

  export type FeedbackSubmissionUncheckedCreateInput = {
    id?: string
    audience: $Enums.Audience
    firstName: string
    lastName: string
    email: string
    emailNormalized: string
    phone: string
    phoneNormalized: string
    answers: JsonNullValueInput | InputJsonValue
    locale: string
    sheetSyncStatus?: $Enums.SheetSyncStatus
    sheetSyncedAt?: Date | string | null
    sheetError?: string | null
    createdAt?: Date | string
  }

  export type FeedbackSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    phoneNormalized?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    locale?: StringFieldUpdateOperationsInput | string
    sheetSyncStatus?: EnumSheetSyncStatusFieldUpdateOperationsInput | $Enums.SheetSyncStatus
    sheetSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sheetError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    phoneNormalized?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    locale?: StringFieldUpdateOperationsInput | string
    sheetSyncStatus?: EnumSheetSyncStatusFieldUpdateOperationsInput | $Enums.SheetSyncStatus
    sheetSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sheetError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackSubmissionCreateManyInput = {
    id?: string
    audience: $Enums.Audience
    firstName: string
    lastName: string
    email: string
    emailNormalized: string
    phone: string
    phoneNormalized: string
    answers: JsonNullValueInput | InputJsonValue
    locale: string
    sheetSyncStatus?: $Enums.SheetSyncStatus
    sheetSyncedAt?: Date | string | null
    sheetError?: string | null
    createdAt?: Date | string
  }

  export type FeedbackSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    phoneNormalized?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    locale?: StringFieldUpdateOperationsInput | string
    sheetSyncStatus?: EnumSheetSyncStatusFieldUpdateOperationsInput | $Enums.SheetSyncStatus
    sheetSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sheetError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailNormalized?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    phoneNormalized?: StringFieldUpdateOperationsInput | string
    answers?: JsonNullValueInput | InputJsonValue
    locale?: StringFieldUpdateOperationsInput | string
    sheetSyncStatus?: EnumSheetSyncStatusFieldUpdateOperationsInput | $Enums.SheetSyncStatus
    sheetSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sheetError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type EnumAudienceFilter<$PrismaModel = never> = {
    equals?: $Enums.Audience | EnumAudienceFieldRefInput<$PrismaModel>
    in?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>
    not?: NestedEnumAudienceFilter<$PrismaModel> | $Enums.Audience
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumSheetSyncStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SheetSyncStatus | EnumSheetSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SheetSyncStatus[] | ListEnumSheetSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SheetSyncStatus[] | ListEnumSheetSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSheetSyncStatusFilter<$PrismaModel> | $Enums.SheetSyncStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FeedbackSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    audience?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    emailNormalized?: SortOrder
    phone?: SortOrder
    phoneNormalized?: SortOrder
    answers?: SortOrder
    locale?: SortOrder
    sheetSyncStatus?: SortOrder
    sheetSyncedAt?: SortOrder
    sheetError?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    audience?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    emailNormalized?: SortOrder
    phone?: SortOrder
    phoneNormalized?: SortOrder
    locale?: SortOrder
    sheetSyncStatus?: SortOrder
    sheetSyncedAt?: SortOrder
    sheetError?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    audience?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    emailNormalized?: SortOrder
    phone?: SortOrder
    phoneNormalized?: SortOrder
    locale?: SortOrder
    sheetSyncStatus?: SortOrder
    sheetSyncedAt?: SortOrder
    sheetError?: SortOrder
    createdAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumAudienceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Audience | EnumAudienceFieldRefInput<$PrismaModel>
    in?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>
    not?: NestedEnumAudienceWithAggregatesFilter<$PrismaModel> | $Enums.Audience
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAudienceFilter<$PrismaModel>
    _max?: NestedEnumAudienceFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumSheetSyncStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SheetSyncStatus | EnumSheetSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SheetSyncStatus[] | ListEnumSheetSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SheetSyncStatus[] | ListEnumSheetSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSheetSyncStatusWithAggregatesFilter<$PrismaModel> | $Enums.SheetSyncStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSheetSyncStatusFilter<$PrismaModel>
    _max?: NestedEnumSheetSyncStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumAudienceFieldUpdateOperationsInput = {
    set?: $Enums.Audience
  }

  export type EnumSheetSyncStatusFieldUpdateOperationsInput = {
    set?: $Enums.SheetSyncStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedEnumAudienceFilter<$PrismaModel = never> = {
    equals?: $Enums.Audience | EnumAudienceFieldRefInput<$PrismaModel>
    in?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>
    not?: NestedEnumAudienceFilter<$PrismaModel> | $Enums.Audience
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumSheetSyncStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SheetSyncStatus | EnumSheetSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SheetSyncStatus[] | ListEnumSheetSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SheetSyncStatus[] | ListEnumSheetSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSheetSyncStatusFilter<$PrismaModel> | $Enums.SheetSyncStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumAudienceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Audience | EnumAudienceFieldRefInput<$PrismaModel>
    in?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>
    not?: NestedEnumAudienceWithAggregatesFilter<$PrismaModel> | $Enums.Audience
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAudienceFilter<$PrismaModel>
    _max?: NestedEnumAudienceFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumSheetSyncStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SheetSyncStatus | EnumSheetSyncStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SheetSyncStatus[] | ListEnumSheetSyncStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SheetSyncStatus[] | ListEnumSheetSyncStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSheetSyncStatusWithAggregatesFilter<$PrismaModel> | $Enums.SheetSyncStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSheetSyncStatusFilter<$PrismaModel>
    _max?: NestedEnumSheetSyncStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}