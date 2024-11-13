import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Home, Moon, Sun, LogOut, Building2, Users, DollarSign, ChevronDown, History } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Roles } from '@/constants/roles';

export default function Navbar() {
  const { isAuthenticated, logout, role } = useAuthStore();
  const { isDark, toggle } = useThemeStore();
  const navigate = useNavigate();
  const isAdmin = role === Roles.ADMIN;

  const handleLogout = () => {
    logout();
    navigate('/users/login');
  };

  return (
    <NextUINavbar className="border-b border-surface-200 dark:border-primary-900">
      <NavbarBrand>
        <RouterLink to="/" className="flex items-center">
          <Home className="mr-2 text-primary-600 dark:text-primary-400" />
          <p className="font-semibold text-primary-600 dark:text-primary-400">Exchange Rate</p>
        </RouterLink>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <RouterLink 
            to="/" 
            className="text-foreground hover:text-primary-600 dark:hover:text-primary-400"
          >
            Home
          </RouterLink>
        </NavbarItem>

        <NavbarItem>
          <RouterLink 
            to="/exchange-rates" 
            className="flex items-center gap-2 text-foreground hover:text-primary-600 dark:hover:text-primary-400"
          >
            <DollarSign size={18} />
            Our Rates
          </RouterLink>
        </NavbarItem>

        {isAuthenticated && (
          <>
            <NavbarItem>
              <RouterLink 
                to="/exchange-rates/history" 
                className="flex items-center gap-2 text-foreground hover:text-primary-600 dark:hover:text-primary-400"
              >
                <History size={18} />
                Rate History
              </RouterLink>
            </NavbarItem>
            <NavbarItem>
              <RouterLink 
                to="/conversions/history" 
                className="flex items-center gap-2 text-foreground hover:text-primary-600 dark:hover:text-primary-400"
              >
                <History size={18} />
                Conversion History
              </RouterLink>
            </NavbarItem>
          </>
        )}
        
        {isAuthenticated && isAdmin && (
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="text-foreground hover:text-primary-600 dark:hover:text-primary-400"
                endContent={<ChevronDown size={16} />}
              >
                Admin
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Admin actions"
              className="w-[200px]"
            >
              <DropdownItem
                key="institutions"
                startContent={<Building2 size={18} />}
                as={RouterLink}
                // to="/institutions"
              >
                Institutions
              </DropdownItem>
              <DropdownItem
                key="users"
                startContent={<Users size={18} />}
                as={RouterLink}
                // to="/users"
              >
                Users
              </DropdownItem>
              <DropdownItem
                key="exchange-rates"
                startContent={<DollarSign size={18} />}
                as={RouterLink}
                // to="/admin/exchange-rates"
              >
                Exchange Rates
              </DropdownItem>
              <DropdownItem
                key="institution-rates"
                startContent={<DollarSign size={18} />}
                as={RouterLink}
                // to="/exchange-rates/institutions"
              >
                Institution Rates
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            <NavbarItem>
              <span className="text-sm text-foreground mr-4">
                Role: {role}
              </span>
            </NavbarItem>
            <NavbarItem>
              <Button
                variant="light"
                className="text-primary-600 dark:text-primary-400 font-medium"
                startContent={<LogOut size={18} />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              as={RouterLink}
              to="/users/login"
              className="bg-primary-600 text-white font-medium dark:bg-primary-500"
            >
              Login
            </Button>
          </NavbarItem>
        )}
        
        <NavbarItem>
          <Button 
            isIconOnly 
            variant="light" 
            aria-label="Toggle theme"
            className="text-primary-600 dark:text-primary-400"
            onClick={toggle}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
