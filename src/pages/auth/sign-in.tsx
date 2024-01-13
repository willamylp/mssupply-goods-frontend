import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { redirect } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  username: z.string(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const response = await fetch('http://localhost:82/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const accessToken = await response.json()
        localStorage.setItem('access_token', accessToken.access_token)
        localStorage.setItem('user_id', accessToken.user_id)
        toast.success(accessToken.msg)
        setTimeout(() => (window.location.href = '/'), 800)
      } else {
        toast.error((await response.json()).msg)
      }
    } catch {
      toast.error('Ocorreu um erro ao fazer login')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="mb-8 text-2xl font-bold tracking-tight">
              Painel de Gestão
            </h1>
            <hr />
            <div
              className="my-2 flex items-center rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 shadow-sm dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <svg
                className="me-3 inline h-4 w-4 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="pl-3 text-sm font-medium">
                  Acesso restrito a usuários autorizados <br /> pelos
                  Administradores do Sistema.
                </span>
              </div>
            </div>
            <hr />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                type="text"
                className="shadow-md"
                autoComplete="username"
                {...register('username')}
              />
            </div>

            <div className="mt-3 space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                className="shadow-md"
                {...register('password')}
              />
            </div>

            <Button
              className="mt-5 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Acessando ...' : 'Acessar Painel'}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
