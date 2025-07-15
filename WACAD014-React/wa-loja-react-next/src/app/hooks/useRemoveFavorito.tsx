import {useMutation} from "@tanstack/react-query";
import {removeProductFavorito} from "@/app/services/produtos";

export function useRemoveFavorito(onSuccess: () => void, onError: () => void) {
  const {mutate, isPending} = useMutation({
    mutationFn: (id: string) => removeProductFavorito(id),
    onSuccess,
    onError,
  })

  return {removeFavorito: mutate, isPending};
}
