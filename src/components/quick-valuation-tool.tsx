"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Calculator, ArrowRight } from "lucide-react"
import Link from "next/link"

export function QuickValuationTool() {
  const [revenue, setRevenue] = useState<string>("")
  const [profit, setProfit] = useState<string>("")
  const [industry, setIndustry] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [valuationRange, setValuationRange] = useState<{ low: number; mid: number; high: number } | null>(null)

  const calculateValuation = () => {
    if (!revenue || !profit || !industry) {
      return
    }

    const revenueNum = Number.parseFloat(revenue)
    const profitNum = Number.parseFloat(profit)

    // Industry multipliers (simplified)
    const industryMultipliers: Record<string, { revenue: number; profit: number }> = {
      technology: { revenue: 2.5, profit: 8 },
      ecommerce: { revenue: 1.2, profit: 4 },
      manufacturing: { revenue: 0.8, profit: 5 },
      services: { revenue: 1.0, profit: 3 },
      retail: { revenue: 0.6, profit: 4 },
      food: { revenue: 0.7, profit: 3 },
      healthcare: { revenue: 1.5, profit: 6 },
      marketing: { revenue: 1.3, profit: 5 },
      real_estate: { revenue: 2.0, profit: 7 },
      other: { revenue: 1.0, profit: 4 },
    }

    const multiplier = industryMultipliers[industry] || { revenue: 1.0, profit: 4.0 }

    // Calculate valuation (simplified)
    const revenueBasedValue = revenueNum * multiplier.revenue
    const profitBasedValue = profitNum * multiplier.profit

    // Weighted average (60% profit-based, 40% revenue-based)
    const weightedAverage = profitBasedValue * 0.6 + revenueBasedValue * 0.4

    // Calculate range (±20%)
    const range = {
      low: Math.round(weightedAverage * 0.8),
      mid: Math.round(weightedAverage),
      high: Math.round(weightedAverage * 1.2),
    }

    setValuationRange(range)
    setShowResult(true)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          Quick Business Valuation
        </CardTitle>
        <CardDescription>Get an estimated value for your business in seconds</CardDescription>
      </CardHeader>
      <CardContent>
        {!showResult ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="revenue">Annual Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="e.g., 500000"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profit">Annual Profit ($)</Label>
                <Input
                  id="profit"
                  type="number"
                  placeholder="e.g., 150000"
                  value={profit}
                  onChange={(e) => setProfit(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="real_estate">Real Estate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={calculateValuation} disabled={!revenue || !profit || !industry}>
              Calculate Value
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Estimated Business Value</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">{valuationRange ? formatCurrency(valuationRange.low) : "$0"}</span>
                <span className="text-sm">{valuationRange ? formatCurrency(valuationRange.high) : "$0"}</span>
              </div>
              <div className="h-2 bg-muted rounded-full mb-2 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-primary"></div>
                </div>
              </div>
              <p className="text-2xl font-bold">{valuationRange ? formatCurrency(valuationRange.mid) : "$0"}</p>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                This is a simplified estimate based on industry standards. For a more accurate valuation, consider
                listing your business on our platform.
              </p>
              <div className="flex justify-center">
                <Link href="/dashboard/listings/create">
                  <Button className="flex items-center">
                    List Your Business <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {showResult && (
          <Button variant="outline" onClick={() => setShowResult(false)}>
            Start Over
          </Button>
        )}
        <Link href="/valuation" className="text-sm text-primary hover:underline">
          Learn more about business valuation
        </Link>
      </CardFooter>
    </Card>
  )
}

