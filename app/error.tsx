'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      console.error('Global Error:', error)
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full mx-auto p-6">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>문제가 발생했습니다</AlertTitle>
              <AlertDescription>
                예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <Button 
                onClick={reset} 
                className="w-full"
                variant="outline"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                다시 시도
              </Button>
              
              <Link href="/">
                <Button className="w-full">
                  <Home className="h-4 w-4 mr-2" />
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 p-4 bg-gray-100 rounded-md">
                <summary className="cursor-pointer font-medium text-sm">
                  개발자 정보 (클릭하여 확장)
                </summary>
                <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  )
} 