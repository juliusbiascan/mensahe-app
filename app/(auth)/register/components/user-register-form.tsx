"use client"

import * as z from "zod"
import { useEffect } from 'react';
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import React from 'react';

import { useToast } from '@/components/ui/use-toast';
import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof userAuthSchema>

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {

  const session = useSession()
  const router = useRouter()

  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    if (session?.status === 'authenticated') {
      router.push('/conversations')
    }
    setIsLoading(false)
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  })

  const onSubmit = async (values: FormData) => {

    setIsLoading(true)

    toast({
      title: "Using register!",
      description: "Using register",
    })

    await axios.post('/api/register', values)
      .then(() => signIn('credentials', {
        ...values,
        redirect: false,
      }))
      .then((callback) => {
        if (callback?.error) {
          toast({
            title: "Invalid credentials!",
            description: "Your sign in request failed due to the provided credentials being incorrect.",
            variant: "destructive",
          })
        }

        if (callback?.ok) {
          router.push('/')
        }

      })
      .catch(() => toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      }))
      .finally(() => setIsLoading(false))

  }

  // Google Handler function
  async function handleGoogleSignin() {
    setIsGoogleLoading(true)
    signIn('google', { callbackUrl: "/" })
  }

  // Github Login 
  async function handleGithubSignin() {
    setIsGitHubLoading(true)
    signIn('github', { callbackUrl: "/" })
  }


  return (

    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name: eg. Juan"
              required
              disabled={isLoading || isGitHubLoading}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password: ******"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              required
              disabled={isLoading || isGitHubLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit" className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}

            Create Account
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={handleGithubSignin}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <BsGithub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>

      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={handleGoogleSignin}
        disabled={isLoading || isGoogleLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <BsGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  )
}
