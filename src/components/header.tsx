import {
  ArchiveRestore,
  Boxes,
  ChevronDown,
  Home,
  ListChecks,
  PackageOpen,
  PackageSearch,
  Users,
} from 'lucide-react'

import { AccountMenu } from '@/components/account-menu'
import { NavLink } from '@/components/nav-link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function Header() {
  const userIsAdmin = sessionStorage.getItem('userIsAdmin')

  const buttonUsers =
    userIsAdmin === '1' ? (
      <NavLink to="/usuarios">
        <Button variant={'outline'} className="text-slate-950 dark:text-white">
          <Users className="mr-2 h-4 w-4" />
          Usuários
        </Button>
      </NavLink>
    ) : null

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Boxes className="h-6 w-6" />

        <Separator className="h-6" orientation="vertical" />

        <nav className="flex items-center space-x-4 lg:space-x-6 ">
          <NavLink to="/">
            <Button
              variant={'outline'}
              className="text-slate-950 dark:text-white"
            >
              <Home className="mr-2 h-4 w-4" /> Início
            </Button>
          </NavLink>

          {buttonUsers}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex select-none items-center gap-2"
              >
                <PackageSearch className="h-4 w-4" />
                Mercadorias
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button variant={'outline'} className="w-full">
                  <NavLink to="/mercadorias">
                    <ListChecks className="mr-2 h-4 w-4" />
                    Listagem
                  </NavLink>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant={'outline'} className="w-full">
                  <NavLink to="/mercadorias/entradas">
                    <ArchiveRestore className="mr-2 h-4 w-4" />
                    Entradas
                  </NavLink>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant={'outline'} className="w-full">
                  <NavLink to="/saidas">
                    <PackageOpen className="mr-2 h-4 w-4" />
                    Saídas
                  </NavLink>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
