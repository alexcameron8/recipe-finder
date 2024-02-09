export function Register(){
    return  (
        <div className="flex justify-center items-center h-min">
        <form className="w-2/3 mt-5" action="">
        <fieldset className="flex flex-col">
        <h2 className="text-2xl text-center font-semibold">Register</h2>
        <label className="font-medium" htmlFor="first_name">First Name:</label>
        <input className="block my-2 mx-1 rounded-md border-0 shadow-sm p-1 ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600" type="text" id="first_name" name="first_name" placeholder="Enter First Name..." />
        <label className="font-medium" htmlFor="last_name">Last Name:</label>
        <input className="block my-2 mx-1 rounded-md border-0 shadow-sm p-1 ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600" type="text" id="last_name" name="last_name" placeholder="Enter Last Name..." />
        <label className="font-medium" htmlFor="email">Email Address:</label>
        <input className="block my-2 mx-1 rounded-md border-0 shadow-sm p-1 ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600" type="text" id="email" name="email" placeholder="john@doe.com" />
        <label className="font-medium" htmlFor="password">Password</label>
        <input className="block my-2 mx-1 rounded-md border-0 shadow-sm p-1 ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600" type="password" id="password" name="password" placeholder="Must have at least 6 characters" />
        <label className="font-medium" htmlFor="password">Confirm Password</label>
        <input className="block my-2 mx-1 rounded-md border-0 shadow-sm p-1 ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600" type="password" id="password" name="password" placeholder="Passwords must match" />
        <input className="rounded-md mt-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit" value="Register" />
        </fieldset>
    </form>
</div>)
}