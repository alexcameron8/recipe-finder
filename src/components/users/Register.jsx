export function Register() {
  return (
    <div className="flex h-min items-center justify-center">
      <form className="mt-5 w-2/3" action="">
        <fieldset className="flex flex-col">
          <h2 className="text-center text-2xl font-semibold">Register</h2>
          <label className="font-medium" htmlFor="first_name">
            First Name:
          </label>
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Enter First Name..."
          />
          <label className="font-medium" htmlFor="last_name">
            Last Name:
          </label>
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Enter Last Name..."
          />
          <label className="font-medium" htmlFor="email">
            Email Address:
          </label>
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="text"
            id="email"
            name="email"
            placeholder="john@doe.com"
          />
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="password"
            id="password"
            name="password"
            placeholder="Must have at least 6 characters"
          />
          <label className="font-medium" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="mx-1 my-2 block rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Passwords must match"
          />
          <input
            className="mt-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            value="Register"
          />
        </fieldset>
      </form>
    </div>
  );
}
