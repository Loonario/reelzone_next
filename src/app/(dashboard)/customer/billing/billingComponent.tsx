"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PaymentHistory {
  id: number
  date: string
  credits: number
  amount: number
}

const mockPaymentHistory: PaymentHistory[] = [
  { id: 1, date: "2023-05-01", credits: 100, amount: 50 },
  { id: 2, date: "2023-05-15", credits: 200, amount: 95 },
  { id: 3, date: "2023-06-02", credits: 150, amount: 70 },
  { id: 4, date: "2023-06-20", credits: 300, amount: 140 },
  { id: 5, date: "2023-07-05", credits: 50, amount: 25 },
  { id: 6, date: "2023-07-18", credits: 250, amount: 115 },
  { id: 7, date: "2023-08-03", credits: 175, amount: 80 },
  { id: 8, date: "2023-08-22", credits: 400, amount: 180 },
  { id: 9, date: "2023-09-10", credits: 125, amount: 60 },
  { id: 10, date: "2023-09-28", credits: 350, amount: 160 },
]

export default function CustomerBillingComponent() {
  const [currentCredits, setCurrentCredits] = useState(500)
  const [reservedCredits, setReservedCredits] = useState(150)

  const totalCredits = mockPaymentHistory.reduce((sum, payment) => sum + payment.credits, 0)
  const totalAmount = mockPaymentHistory.reduce((sum, payment) => sum + payment.amount, 0)

  const handleBuyCredits = () => {
    // Implement credit purchase logic here
    console.log("Buy credits clicked")
  }

  return (
    <div className="container mx-auto px-12 max-w-[1440px] py-4">
      <h1 className="text-2xl font-bold mb-6">Billing</h1>
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCredits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservedCredits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCredits - reservedCredits}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mb-6">
        <Button onClick={handleBuyCredits}>Buy Credits</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent payments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Credits</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPaymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell className="text-right">{payment.credits}</TableCell>
                  <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={1} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{totalCredits}</TableCell>
                <TableCell className="text-right font-bold">${totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}