'use client'
import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ConfirmationContent from './confirmComponent'


export default function ConfirmPage() {
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Email Confirmation</CardTitle>
        </CardHeader>
        <Suspense fallback={<CardContent>Loading...</CardContent>}>
          <ConfirmationContent />
        </Suspense>
      </Card>
    </div>
  )
}