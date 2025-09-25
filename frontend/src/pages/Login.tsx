import { type ChangeEvent, type FormEvent, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

type LoginFormState = {
  email: string
  password: string
  remember: boolean
}

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = (location.state as { from?: string } | undefined)?.from ?? "/"
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
    remember: true,
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target
    setFormState((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    if (!formState.email || !formState.password) {
      setErrorMessage("Enter both email and password to continue.")
      return
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      navigate(redirectTo, { replace: true })
    }, 800)
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200/60">
        <div className="space-y-2 text-center">
          <Link to="/" className="text-2xl font-semibold tracking-tight text-slate-900">
            ShopSphere
          </Link>
          <p className="text-sm text-slate-600">Sign in to review orders and manage your account.</p>
        </div>

        {errorMessage && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600" role="alert">
            {errorMessage}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <label className="block text-left text-sm font-medium text-slate-700" htmlFor="email">
              Email address
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block text-left text-sm font-medium text-slate-700" htmlFor="password">
              Password
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                placeholder="Enter your password"
                required
              />
            </label>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-slate-600" htmlFor="remember">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formState.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border border-slate-300 text-slate-900 focus:ring-slate-200"
              />
              Remember me
            </label>
            <Link to="/auth/forgot-password" className="font-medium text-slate-700 transition hover:text-slate-900">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          New to ShopSphere?{ " " }
          <Link to="/auth/signup" className="font-medium text-slate-700 transition hover:text-slate-900">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
