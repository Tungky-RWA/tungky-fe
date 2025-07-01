import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/UI/card";
import { cn } from "@/lib/utils";
import { useAuthModal } from "@account-kit/react";
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';

interface RegisterCardProps {
  cardDescription?: string
}

export default function RegisterCard({ cardDescription }: RegisterCardProps) {
  
  const { openAuthModal } = useAuthModal();

  return (
    <CardCustom className="w-full max-w-md" variant="neon">
      <CardHeader className={cn("text-center space-y-4 pb-8")}>
        <CardTitle
          className={cn(
            "text-4xl font-bold blockchain-gradient animate-glow",
            "dark:from-white dark:to-gray-300 bg-clip-text text-transparent",
          )}
        >
          Login
        </CardTitle>
        <CardDescription
          className={cn("text-muted-foreground text-lg")}
        >
          {cardDescription ? cardDescription : "Before Register, Click log in to continue."}
        </CardDescription>
      </CardHeader>

      <CardContent className={cn("space-y-6 pb-8")}>
        <ButtonCustom variant="crypto" className="w-full mt-4 border border-border/30 hover:border-primary/50"
          onClick={() => openAuthModal()}
        >
          Login
        </ButtonCustom>
      </CardContent>
    </CardCustom>
  );
}
