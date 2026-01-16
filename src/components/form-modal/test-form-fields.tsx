// src/components/form-modal/test-form-fields.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"

type FormData = {
  name: string
  platform?: string
  progress: number
}

export function TestFormFields() {
  const { register } = useFormContext<FormData>()

  return (
    <>
      <div className="grid gap-2">
        <Label>Nome do jogo</Label>
        <Input {...register("name")} />
      </div>

      <div className="grid gap-2">
        <Label>Plataforma</Label>
        <Input {...register("platform")} />
      </div>

      <div className="grid gap-2">
        <Label>Progresso (%)</Label>
        <Input
          type="number"
          {...register("progress", { valueAsNumber: true })}
        />
      </div>
    </>
  )
}
