"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DeleteJobButtonProps = {
  jobId: string;
};

export default function DeleteJobButton({ jobId }: DeleteJobButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/job-applications/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar vaga");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar vaga");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isLoading}
          className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Deletar vaga</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar vaga?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. A vaga será removida
            permanentemente da sua lista.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isLoading}
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
          >
            {isLoading ? "Deletando..." : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}