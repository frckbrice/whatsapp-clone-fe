// import { createBrowserClient } from '@supabase/ssr'
import { createClient } from "@supabase/supabase-js";

// export const supabase = () =>
//   createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    realtime: {
      params: {
        eventsPerSecond: 2,
      },
    },
  }
);

export const REALTIME_URL = `${process.env
  .NEXT_PUBLIC_SUPABASE_REALTIMEURL!}/realtime/v1`;

export const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
