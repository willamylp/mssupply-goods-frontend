import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, PencilLine } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { FormUserSchema } from '@/pages/app/users/form-user-schema'
import { updateUser } from '@/requests/users/updateUser'

import { UserProps } from './users'

interface UsersFormEditProps {
  user: UserProps
}

const formSchema = FormUserSchema.omit({ password: true }).merge(
  z.object({ password: z.string().optional() }),
)

export function DialogFormEditUser({ user }: UsersFormEditProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      email: user.email,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await updateUser(
        user.id,
        values,
        sessionStorage.getItem('accessToken') as string,
      )
      if (response.status === 201) {
        toast.success(response.msg)
        setTimeout(() => window.location.reload(), 800)
      } else {
        toast.error(response.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-50 border-none bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
        >
          <PencilLine className="mr-2 h-4 w-4" />
          <span className="font-semibold">Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            Editar dados do Usuário:{' '}
            <span className="text-blue-900 dark:text-blue-600">
              {user.username}
            </span>
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex.: Willamy Domingos de O. Joventino"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex.: willamy@morningstar.com.br"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: willdev" {...field} />
                  </FormControl>
                  <FormDescription>
                    Usuário que será utilizado para fazer login no sistema.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha de Acesso</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="is_admin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Usuário Administrador?
                    </FormLabel>
                    <FormDescription>
                      Indica se o usuário terá acesso a todas as funcionalidades
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked={user.is_admin}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Usuário Ativo?</FormLabel>
                    <FormDescription>
                      Indica se o usuário poderá acessar o sistema.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked={user.is_active}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />

            <Button
              type="submit"
              className="w-[200px] items-center justify-center bg-teal-700 hover:bg-teal-600"
            >
              <CheckCircle className="mr-2" />
              REGISTRAR
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
