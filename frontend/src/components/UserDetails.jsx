
export default function UserDetails({user}) {
    // console.log(user);
    return(
        <div className="flex-col text-center  justify-center items-center">
             <h1 className="text-2xl font-bold">User Details</h1>
           
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
                <p>Role: {user.role}</p>
                <p>Subscription: {user.subscription}</p>

        </div>
    )
}