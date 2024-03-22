const user={
    "user": {
        "name": "abc",
        "email": "abc@gmail.com",
        "username": "abcdef",
        "role": {
            "_id": "65fd562d427d3f2b5b5843c4",
            "email": "abc@gmail.com",
            "role": "standard_user",
            "createdAt": "2024-03-22T09:58:05.636Z",
            "__v": 0
        },
        "subscription": {
            "_id": "65fd562d427d3f2b5b5843c6",
            "email": "abc@gmail.com",
            "subscription": "premium",
            "createdAt": "2024-03-22T09:58:05.697Z",
            "__v": 0
        },
        "issuedAt": 1711105662722,
        "iat": 1711105662,
        "exp": 1711111662
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWJjIiwiZW1haWwiOiJhYmNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhYmNkZWYiLCJyb2xlIjp7Il9pZCI6IjY1ZmQ1NjJkNDI3ZDNmMmI1YjU4NDNjNCIsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsInJvbGUiOiJzdGFuZGFyZF91c2VyIiwiY3JlYXRlZEF0IjoiMjAyNC0wMy0yMlQwOTo1ODowNS42MzZaIiwiX192IjowfSwic3Vic2NyaXB0aW9uIjp7Il9pZCI6IjY1ZmQ1NjJkNDI3ZDNmMmI1YjU4NDNjNiIsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsInN1YnNjcmlwdGlvbiI6InByZW1pdW0iLCJjcmVhdGVkQXQiOiIyMDI0LTAzLTIyVDA5OjU4OjA1LjY5N1oiLCJfX3YiOjB9LCJpc3N1ZWRBdCI6MTcxMTEwNTY2MjcyMiwiaWF0IjoxNzExMTA1NjYyLCJleHAiOjE3MTExMTE2NjJ9.hxmQfRGy1bZxE0Bx7alC82jXyp91nxkn9TkLHtOkkIA"
}
export default function UserDetails({user}) {
    // console.log(user);
    return(
        <div className="flex-col text-center  justify-center items-center">
             <h1 className="text-2xl font-bold">User Details</h1>
           
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
                <p>Role: {user.role.role}</p>
                <p>Subscription: {user.subscription.subscription}</p>

        </div>
    )
}