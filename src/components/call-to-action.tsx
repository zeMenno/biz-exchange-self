import { Button } from "~/components/ui/button"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 font-heading">Ready to Buy or Sell a Business?</h2>
        <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
          Join thousands of entrepreneurs and investors when selling your business.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/listings">
            <Button size="lg" variant="secondary">
              Browse Listings
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

