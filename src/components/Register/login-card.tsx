"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/UI/button";
import {
  Card,
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
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <CardCustom className="w-full max-w-md" variant="neon">
      <CardHeader className={cn("text-center space-y-4 pb-8")}>
        <CardTitle
          className={cn(
            "text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600",
            "dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          )}
        >
          Login
        </CardTitle>
        <CardDescription
          className={cn("text-base text-gray-600 dark:text-gray-400")}
        >
          {cardDescription ? cardDescription : "Before Register, Click log in to continue."}
        </CardDescription>
      </CardHeader>

      <CardContent className={cn("space-y-6 pb-8")}>
        <ButtonCustom variant="ghost" className="w-full mt-4 border border-border/30 hover:border-primary/50"
          onClick={() => openAuthModal()}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <>
              <Loader2 className={cn("animate-spin -ml-1 mr-3 h-5 w-5")} />
              Log in
            </>
          ) : (
            <>Login</>
          )}
        </ButtonCustom>
      </CardContent>
    </CardCustom>
  );
}
