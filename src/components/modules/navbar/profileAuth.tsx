import { Button } from '@/components/ui/button'
import { LogOut, Menu, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const desktopMenu = ({isAuthenticated,linkClass,renderNavLinks}) => {
  return (
    <div>
         {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  href={`/profile/${user?.id}`}
                  className={linkClass(`/profile/${user?.id}`)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
    </div>
  )
}



export const rofileMenu = ({renderNavLinks,linkClass}) => {
  return (
    <div>
         {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {renderNavLinks()}

              <div className="border-t border-border my-2" />

              {isAuthenticated ? (
                <>
                  <Link
                    href={`/profile/${user?.id}`}
                    className={linkClass(`/profile/${user?.id}`)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={linkClass("/login")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className={linkClass("/register")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}

            </div>
          </div>
        )}
    </div>
  )
}

