import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { signIn } from "~/server/auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">,
searchParams: { callbackUrl: string | undefined }
) {
  return (
    <div>
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

        </div>
       
      </form>
      <form
        action={async () => {
          "use server"
          try {
            await signIn("google", {
              redirectTo: searchParams?.callbackUrl ?? "",
            })
            console.log(searchParams?.callbackUrl ?? "")
          } catch (error) {
            // Signin can fail for a number of reasons, such as the user
            // not existing, or the user not having the correct role.
            // In some cases, you may want to redirect to a custom error
            // if (error instanceof AuthError) {
            //   return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
            // }

            // Otherwise if a redirects happens Next.js can handle it
            // so you can just re-thrown the error and let Next.js handle it.
            // Docs:
            // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
            throw error
          }
        }}
      >
        <Button type="submit" variant="outline" className="w-full my-6">
          <span>Sign in with Google</span>
        </Button>
      </form>
      <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline underline-offset-4">
            Register
          </a>
        </div>
    </div>
  )
}
