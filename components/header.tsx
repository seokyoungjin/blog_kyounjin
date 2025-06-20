"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { user, signOut } = useAuth()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Articles", href: "/articles" },
    { name: "Admin", href: "/admin" },
  ]

  async function handleLogout() {
    const { error } = await signOut()
    if (!error) router.push("/admin/login")
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-black hover:text-gray-700 transition-colors">
            개발자 서경진 블로그
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black hover:text-gray-700 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Button
                variant="outline"
                size="sm"
                className="ml-4 text-black border-black hover:bg-gray-100"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-black hover:text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 text-black border-black hover:bg-gray-100"
                  onClick={() => { setIsMenuOpen(false); handleLogout() }}
                >
                  로그아웃
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
