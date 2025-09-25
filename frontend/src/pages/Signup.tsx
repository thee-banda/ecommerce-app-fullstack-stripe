import { type ChangeEvent, type FormEvent, useState } from "react"
import { Link } from "react-router-dom"

type SignupFormState = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  marketing: boolean
}

type FieldErrors = Partial<Record<keyof SignupFormState, string>> & {
  form?: string
}

const defaultFormState: SignupFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  marketing: true,
}

const membershipHighlights = [
  {
    id: 1,
    title: "Member pricing",
    description: "Unlock exclusive pricing on seasonal drops and limited capsules.",
  },
  {
    id: 2,
    title: "Priority support",
    description: "Reach our stylists 24/7 for fit guidance and order support.",
  },
  {
    id: 3,
    title: "Flexible returns",
    description: "Enjoy extended return windows on every purchase as a member.",
  },
]

const validateEmail = (value: string) => /.+@.+\..+/.test(value)

const Signup = () => {
  const [formState, setFormState] = useState<SignupFormState>(defaultFormState)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target
    setFormState((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const validateForm = (state: SignupFormState): FieldErrors => {
    const errors: FieldErrors = {}
    const trimmedFirst = state.firstName.trim()
    const trimmedLast = state.lastName.trim()
    const trimmedEmail = state.email.trim()

    if (!trimmedFirst) {
      errors.firstName = "Enter your first name."
    }

    if (!trimmedLast) {
      errors.lastName = "Enter your last name."
    }

    if (!trimmedEmail) {
      errors.email = "Enter your email address."
    } else if (!validateEmail(trimmedEmail)) {
      errors.email = "Enter a valid email address."
    }

    if (!state.password) {
      errors.password = "Create a password to continue."
    } else if (state.password.length < 8) {
      errors.password = "Use at least 8 characters for your password."
    }

    if (!state.confirmPassword) {
      errors.confirmPassword = "Confirm your password."
    } else if (state.confirmPassword !== state.password) {
      errors.confirmPassword = "Passwords do not match."
    }

    return errors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFieldErrors({})
    setSuccessMessage(null)

    const errors = validateForm(formState)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setFormState(defaultFormState)
      setSuccessMessage("Account created! You can sign in whenever you're ready.")
    }, 900)
  }

  return (
    <div className="bg-slate-50 py-16">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,_1.2fr)] lg:px-8">
        <section className="space-y-6">
          <div className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
            Join the collective
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Create your ShopSphere account
          </h1>
          <p className="max-w-xl text-sm text-slate-600">
            Become a member to unlock curated recommendations, member-only experiences, and faster checkout across every device.
          </p>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60">
            <h2 className="text-base font-semibold text-slate-900">Why members stay</h2>
            <ul className="mt-4 space-y-4">
              {membershipHighlights.map((highlight) => (
                <li key={highlight.id} className="flex gap-3">
                  <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-slate-900" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{highlight.title}</p>
                    <p className="text-sm text-slate-500">{highlight.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="w-full max-w-xl justify-self-center">
          <div className="space-y-6 rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200/60">
            <div className="space-y-2 text-center">
              <Link to="/" className="text-2xl font-semibold tracking-tight text-slate-900">
                ShopSphere
              </Link>
              <p className="text-sm text-slate-600">Set up your account in under a minute.</p>
            </div>

            {fieldErrors.form && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600" role="alert">
                {fieldErrors.form}
              </div>
            )}

            {successMessage && (
              <div className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700" role="status">
                {successMessage}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-left text-sm font-medium text-slate-700" htmlFor="firstName">
                  First name
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formState.firstName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Jordan"
                    required
                  />
                  {fieldErrors.firstName && (
                    <span className="mt-1 block text-xs text-red-600">{fieldErrors.firstName}</span>
                  )}
                </label>

                <label className="text-left text-sm font-medium text-slate-700" htmlFor="lastName">
                  Last name
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formState.lastName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Avery"
                    required
                  />
                  {fieldErrors.lastName && (
                    <span className="mt-1 block text-xs text-red-600">{fieldErrors.lastName}</span>
                  )}
                </label>
              </div>

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
                {fieldErrors.email && (
                  <span className="mt-1 block text-xs text-red-600">{fieldErrors.email}</span>
                )}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-left text-sm font-medium text-slate-700" htmlFor="password">
                  Password
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formState.password}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Create a password"
                    required
                  />
                  {fieldErrors.password && (
                    <span className="mt-1 block text-xs text-red-600">{fieldErrors.password}</span>
                  )}
                </label>

                <label className="text-left text-sm font-medium text-slate-700" htmlFor="confirmPassword">
                  Confirm password
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    placeholder="Re-enter your password"
                    required
                  />
                  {fieldErrors.confirmPassword && (
                    <span className="mt-1 block text-xs text-red-600">{fieldErrors.confirmPassword}</span>
                  )}
                </label>
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-600" htmlFor="marketing">
                <input
                  id="marketing"
                  name="marketing"
                  type="checkbox"
                  checked={formState.marketing}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border border-slate-300 text-slate-900 focus:ring-slate-200"
                />
                <span>
                  Keep me in the loop with new drops, styling tips, and perks.
                </span>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating your account..." : "Create account"}
              </button>

              <p className="text-xs text-slate-500">
                By creating an account, you agree to our {" "}
                <Link to="/legal/terms" className="font-medium text-slate-700 transition hover:text-slate-900">
                  Terms of Service
                </Link>{" "}
                and {" "}
                <Link to="/legal/privacy" className="font-medium text-slate-700 transition hover:text-slate-900">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>

            <p className="text-center text-sm text-slate-600">
              Already have an account? {" "}
              <Link to="/auth/login" className="font-medium text-slate-700 transition hover:text-slate-900">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Signup
