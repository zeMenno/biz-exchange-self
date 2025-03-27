"use client"
import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { cn } from "~/lib/utils"


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const session = useSession()

  return (
    <nav className="sticky top-0 border-b z-50 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6 text-primary"
              >
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 18V6" />
              </svg>
              <span className="text-xl font-bold fill-primary">BizExchange</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1">
                    Marketplace
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace/buy">Buy Business</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace/sell">Sell Business</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace/franchise">Franchise Opportunities</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 gap-1">
                    Services
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/services/valuation">Business Valuation</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/consulting">Consulting</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/services/legal">Legal Services</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/about" className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                About
              </Link>
              <Link href="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                Contact
              </Link>
            </div>
          </div>
        
          {
            session?.data?.user ? (
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button size="sm" onClick={() => signOut({redirectTo: "/"})}>Logout</Button>
                </div>
              </div>
            ) : (
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </div>
            )
          
          }


          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="space-y-1 px-4 pb-3 pt-2">
          <Link href="/" className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted">
            Home
          </Link>
          <div className="py-2">
            <div className="flex items-center justify-between rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted">
              <span>Marketplace</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="ml-4 mt-1 space-y-1">
              <Link
                href="/marketplace/buy"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Buy Business
              </Link>
              <Link
                href="/marketplace/sell"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Sell Business
              </Link>
              <Link
                href="/marketplace/franchise"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Franchise Opportunities
              </Link>
            </div>
          </div>
          <div className="py-2">
            <div className="flex items-center justify-between rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted">
              <span>Services</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="ml-4 mt-1 space-y-1">
              <Link
                href="/services/valuation"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Business Valuation
              </Link>
              <Link
                href="/services/consulting"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Consulting
              </Link>
              <Link
                href="/services/legal"
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Legal Services
              </Link>
            </div>
          </div>
          <Link
            href="/about"
            className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
          >
            Contact
          </Link>
          {
            session?.data?.user ? (
              <div className="mt-4 flex space-x-2 px-3">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full" color="alert" asChild>
                  <Link href="/logout">logout</Link>
                </Button>
              </div>
            ) : (
              <div className="mt-4 flex space-x-2 px-3">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )
          }
        </div>
      </div>
    </nav>
  )
}

