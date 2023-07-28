"use client"

import * as z from "zod"
import { useEffect } from 'react';
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, useSession } from "next-auth/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { BsGithub, BsGoogle } from 'react-icons/bs';
import React from 'react';

import { useToast } from '@/components/ui/use-toast';
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Password should be minimum 5 characters'),
});

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {

  const session = useSession()
  const router = useRouter()

  const { toast } = useToast()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations')
    }
  }, [session?.status, router]);


  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    setIsLoading(true)

    try {
      const { email, password } = values

      await signIn('credentials', {
        email: email,
        password: password,
        callbackUrl: '/',
      });

      toast({
        title: "Login successful",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" >Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        required
                        disabled={isLoading}
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} type='submit' >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </div>
        </form>
      </Form>
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
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleGithubSignin}>
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <BsGithub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleSignin}>
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <BsGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}
