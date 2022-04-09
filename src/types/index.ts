export enum EMediaQueries {
  "2xl" = 1536,
  xl = 1280,
  lg = 1024,
  md = 768,
  sm = 640,
}

export type TMediaQueriesBreakpoints = keyof typeof EMediaQueries;

export type TMediaQueriesMinWidths =
  typeof EMediaQueries[TMediaQueriesBreakpoints];
