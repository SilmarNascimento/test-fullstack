import { User } from "lucide-react";

export function Header() {
  return (
    <>
      <div className="flex items-center border-b-2 border-zinc-400/50">
        <User className="size-10"/>
        <h1 className="font-semibold text-3xl">Painel de clientes</h1>
      </div>
     
    </>
  )
}