// src/app/(app)/components/form-page/page.tsx
"use client"

import { z } from "zod"
import { FormProvider } from "react-hook-form"
import useFormModal from "@/hooks/use-form-modal"
import { TestFormFields } from "@/components/form-modal/test-form-fields"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  platform: z.string().optional(),
  progress: z.number().min(0).max(100),
})

type FormData = z.infer<typeof formSchema>

export default function NormalFormPage() {
  const formModal = useFormModal({
    schema: formSchema,
    defaultValues: {
      name: "",
      platform: "",
      progress: 0,
    },
    onSubmit: async (data) => {
      console.log("SUBMIT PAGE:", data)
      await new Promise((r) => setTimeout(r, 500))
    },
    onSuccess: () => {
      console.log("Sucesso página normal")
    },
  })

  return (
    <div className="max-w-xl p-8">
      <h1 className="text-xl font-semibold mb-6">
        Página normal (sem modal)
      </h1>

      <FormProvider {...formModal.form}>
        <form onSubmit={formModal.submitProps.onSubmit}>
          <FieldGroup>
            <TestFormFields />
          </FieldGroup>

          <div className="flex gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={formModal.cancelProps.onCancel}
            >
              Resetar
            </Button>

            <Button
              type="submit"
              disabled={formModal.submitProps.isSubmitting}
            >
              Salvar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
