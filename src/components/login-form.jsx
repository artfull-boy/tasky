"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassowrd] = useState("")
  const router = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        "http://localhost:8002/api/auth/login", {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      )
      if(res.ok) {
        const result = await res.json();
        localStorage.setItem("token",result.data.token)
        router.push("/dashboard")
      }
    }
    catch (error) {
      console.error("Login Failed", error);
    }
    
  }
  return (
    (<Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">

              <Label htmlFor="password">Password</Label>
            <Input id="password" value={password} onChange={(e) => setPassowrd(e.target.value)} type="password" required />

          </div>
          <Button onClick={handleLogin} type="submit" className="w-full">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>)
  );
}
