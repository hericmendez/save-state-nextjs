// src/app/(app)/components/form-modal-test/page.tsx
"use client"

import { z } from "zod"
import useFormModal from "@/hooks/use-form-modal"
import FormDialog from "@/components/form-modal/dialog"
import { FormDrawer } from "@/components/form-modal/drawer"
import { TestFormFields } from "@/components/form-modal/test-form-fields"

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  platform: z.string().optional(),
  progress: z.number().min(0).max(100),
})



export default function FormModalTestPage() {
  const dialogForm = useFormModal({
    schema: formSchema,
    defaultValues: {
      name: "",
      platform: "",
      progress: 0,
    },
    onSubmit: async (data) => {
      console.log("SUBMIT DIALOG:", data)
      await new Promise((r) => setTimeout(r, 500))
    },
    onSuccess: () => {
      console.log("Dialog sucesso")
    },
  })

  const drawerForm = useFormModal({
    schema: formSchema,
    defaultValues: {
      name: "Zelda",
      platform: "Switch",
      progress: 80,
    },
    onSubmit: async (data) => {
      console.log("SUBMIT DRAWER:", data)
      await new Promise((r) => setTimeout(r, 500))
    },
    onSuccess: () => {
      console.log("Drawer sucesso")
    },
  })

  return (
    <div className="flex gap-6 p-8">
      <FormDialog
        buttonName="Abrir Dialog"
        dialogTitle="Novo jogo (Dialog)"
        formModal={dialogForm}
      >
        <TestFormFields />
      </FormDialog>

      <FormDrawer
        buttonName="Abrir Drawer"
        drawerTitle="Editar jogo (Drawer)"
        formModal={drawerForm}
      >
        <TestFormFields />
      </FormDrawer>
    </div>
  )
}
