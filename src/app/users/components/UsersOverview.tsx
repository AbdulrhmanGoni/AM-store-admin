import useGetApi from "@/hooks/useGetApi"

export default function UsersOverview() {

    const {
        data: users,
        isError,
        isLoading
    } = useGetApi({ path: "users?limit=7", key: ["users-overview"] })

    return (
        <div>
            
        </div>
    )
}
