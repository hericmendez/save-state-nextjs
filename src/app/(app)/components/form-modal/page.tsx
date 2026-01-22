// src/app/(app)/components/form-modal-test/page.tsx
"use client";

import useFormModal from "@/hooks/use-form-modal";
import FormDialog from "@/components/form-modal/dialog";
import { FormDrawer } from "@/components/form-modal/drawer";
import BacklogFormFields from "@/components/form-modal/backlog-form-fields";
import {
  defaultValues,
  gameFormSchema
} from "@/components/form-modal/form-props";

export default function FormModalTestPage() {
  const dialogForm = useFormModal({
    schema: gameFormSchema,
    defaultValues,
    onSubmit: async (data) => {
      console.log("SUBMIT DIALOG:", data);
      await new Promise((r) => setTimeout(r, 500));
    },
    onSuccess: () => {
      console.log("Dialog sucesso");
    }
  });

  const drawerForm = useFormModal({
    schema: gameFormSchema,
    defaultValues,
    onSubmit: async (data) => {
      console.log("SUBMIT DRAWER:", data);
      await new Promise((r) => setTimeout(r, 500));
    },
    onSuccess: () => {
      console.log("Drawer sucesso");
    }
  });

  return (
    <div className="flex gap-6 p-8">
      <FormDialog
        buttonName="Abrir Dialog"
        dialogTitle="Novo jogo (Dialog)"
        formModal={dialogForm}
      >
        <BacklogFormFields />
      </FormDialog>

      <FormDrawer
        buttonName="Abrir Drawer"
        drawerTitle="Editar jogo (Drawer)"
        formModal={drawerForm}
      >
        <BacklogFormFields />
      </FormDrawer>
    </div>
  );
}
