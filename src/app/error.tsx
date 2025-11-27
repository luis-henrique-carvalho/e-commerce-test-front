'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
            <h2 className="text-2xl font-bold text-destructive">Algo deu errado!</h2>
            <p className="text-muted-foreground">
                Não foi possível carregar os produtos. Verifique sua conexão ou tente novamente mais tarde.
                <span className="block mt-2 text-sm text-destructive">{error.message}</span>
            </p>
            <Button onClick={() => reset()}>
                Tentar novamente
            </Button>
        </div>
    )
}
