import { Avatar, TableCell } from '@mui/material'

export default function AvatarCell({ avatar }: { avatar: string }) {
    return (
        <TableCell sx={{ p: 1 }}>
            <Avatar src={avatar} sx={{ width: "40px", height: "40px" }} />
        </TableCell>
    )
}
