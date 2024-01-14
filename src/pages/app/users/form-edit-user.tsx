import { CheckCircle, Loader2 } from 'lucide-react'
import { Control, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { FormUserSchema } from '@/pages/app/users/form-user-schema'

import { UserProps } from './users'

interface UsersFormEditProps {
  user: UserProps
}

type TypeFormUser = z.infer<typeof FormUserSchema>

export function DialogFormEditUser({ user }: UsersFormEditProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TypeFormUser>()

  async function handleUserEdit(data: TypeFormUser) {
    return await console.log(data)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          Editar dados do Usuário:{' '}
          <span className="text-blue-900 dark:text-blue-600">
            {user.username}
          </span>
        </DialogTitle>
      </DialogHeader>
      <Separator />

      <form className="space-y-6" onSubmit={handleSubmit(handleUserEdit)}>
        <div className="space-y-2">
          <Label htmlFor="username">Nome de Usuário</Label>
          <Input
            id="username"
            type="text"
            className="shadow-md ring-1 ring-slate-300"
            defaultValue={user.username}
            required={true}
            {...register('username')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            type="text"
            className="shadow-md ring-1 ring-slate-300"
            defaultValue={user.name}
            required={true}
            {...register('name')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            className="shadow-md ring-1 ring-slate-300"
            defaultValue={user.email}
            required={true}
            {...register('email')}
          />
        </div>
        <div className="space-y-2 text-center">
          <Label htmlFor="is_admin">Usuário Administrador?</Label>
          <Input
            id="is_admin"
            type="checkbox"
            className="align-start"
            defaultChecked={user.is_admin}
            {...register('is_admin')}
          />
        </div>
        <div className="space-y-2 text-center">
          <Label htmlFor="is_active">Usuário Ativo?</Label>
          <Input
            id="is_active"
            type="checkbox"
            className="align-start"
            defaultChecked={user.is_active}
            {...register('is_active')}
          />
        </div>
        <Separator className="space-y-5" />
        <Button
          className="w-full space-y-5 bg-teal-800 text-white hover:bg-teal-700"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Salvar Alterações'
          )}
        </Button>
      </form>
    </DialogContent>
  )
}
