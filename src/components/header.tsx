import { Boxes, Home, PackageSearch, Users, UtensilsCrossed } from 'lucide-react'

import { AccountMenu } from '@/components/account-menu'
import { NavLink } from '@/components/nav-link'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'

export function Header() {
  const userIsAdmin = localStorage.getItem('userIsAdmin')
  console.log(typeof userIsAdmin)
  const buttonUsers =
    userIsAdmin === '1' ? (
      <NavLink to="/usuarios">
        <Users className="h-4 w-4" />
        Usuários
      </NavLink>
    ) : null

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Boxes className="h-6 w-6" />

        <Separator className="h-6" orientation="vertical" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>

          {buttonUsers}

          <NavLink to="/orders">
            <PackageSearch className="h-4 w-4" />
            Mercadorias
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
