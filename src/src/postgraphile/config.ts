import { PostGraphileOptions, makePluginHook } from "postgraphile";
import PgConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import { postgraphilePolyRelationCorePlugin } from "postgraphile-polymorphic-relation-plugin";
import PgAggregatesPlugin from "@graphile/pg-aggregates";
import PgSimplifyInflector from "@graphile-contrib/pg-simplify-inflector";
import { JSONPgSmartTags, makeJSONPgSmartTagsPlugin } from "graphile-utils";

const tags: JSONPgSmartTags = {
  version: 1,
  config: {
    attribute: {
      "public.thumbnails.entity_type": {
        tags: {
          isPolymorphic: true,
          polymorphicTo: ["Album", "Artist"],
        },
      },
    },
  },
};

export const postGraphileOptions: PostGraphileOptions = {
  watchPg: false,
  graphiql: true,
  enhanceGraphiql: true,
  exportGqlSchemaPath: "schema.graphql",
  appendPlugins: [
    makeJSONPgSmartTagsPlugin(tags),
    PgConnectionFilterPlugin,
    PgAggregatesPlugin,
    postgraphilePolyRelationCorePlugin,
    PgSimplifyInflector,
  ],
  graphileBuildOptions: {
    connectionFilterPolymorphicForward: true,
    connectionFilterPolymorphicBackward: true,
    connectionFilterRelations: true,
    connectionFilterComputedColumns: false,
    connectionFilterSetofFunctions: false,
    connectionFilterArrays: false,
  },
};
