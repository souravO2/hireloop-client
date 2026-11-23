"use client"

import { Suspense } from "react"
import { AuthForm, AuthFormData } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"
import { useSearchParams } from "next/navigation"

function SignInForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? "/"
  const handleSignIn = async (data: AuthFormData) => {
    const { data: SignInResponse, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: redirectTo,
    })

    console.log("sign in response", SignInResponse, error)
  }

  return <AuthForm mode="signin" onSubmit={handleSignIn} />
}

// useSearchParams() must sit under a Suspense boundary or prerendering
// (static generation of /sign-in) bails out with a build error.
export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  )
}
