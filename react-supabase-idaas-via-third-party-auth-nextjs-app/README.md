- Reference

  - [auth-github](https://supabase.com/docs/guides/auth/auth-github)
  - [auth-google](https://supabase.com/docs/guides/auth/auth-google)
  - [nextjs-subscription-payments](https://github.com/vercel/nextjs-subscription-payments)

- Memo
  - @supabase/auth-helpers-nextjs と@supabase/auth-helpers-react をコンテキストに応じて併用
  - サードパーティー認証経由のリダイレクトオプションはまだバギーだが、useEffect でうまく振り分けたりすることでそれっぽくはなる
    - [サードパーティー認証経由のリダイレクトオプション](https://github.com/vercel/nextjs-subscription-payments/blob/main/pages/signin.tsx#L61-L64)
    - [useEffect でうまく振り分けたり](https://github.com/vercel/nextjs-subscription-payments/blob/main/pages/signin.tsx#L71-L75)
