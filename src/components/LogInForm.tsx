import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCookies } from 'react-cookie';
import useApiRequest from '@/hooks/useApiRequest';
import host from '@/CONSTANT/API_hostName';
import useAdminData from '@/hooks/useAdminData';
import { useRouter } from 'next/navigation'


export default function LogInForm() {

    const { api } = useApiRequest();
    const router = useRouter();

    const [_, setCookies] = useCookies();
    const [thereError, setErrorState] = useState(false);
    const [, setAdminData] = useAdminData();

    function complateLog({ accessToken, adminData }) {
        let maxAge = 3600 * 24 * 20;
        setCookies("admin-access-token", accessToken, { maxAge })
        setCookies("adminId", adminData._id, { maxAge })
        setAdminData(adminData);
        router.refresh()
    }

    function submit(event) {
        event.preventDefault();
        const data = new FormData(event?.currentTarget);
        const adminEmail = data.get('email');
        const adminPassword = data.get('password');
        api.post(`${host}admin-log-in`, { adminEmail, adminPassword })
            .then(({ data }) => { !!data && complateLog(data) })
            .catch(() => { setErrorState(true) }).finally(() => { })
    }

    const InputContainer = ({ children }) => {
        return (
            <Grid item xs={12} sx={{ "& fieldset": { borderColor: thereError ? "red !important" : "white" } }}>
                {children}
            </Grid>
        )
    }

    return (
        <Box sx={containerStyle}>
            <Container
                className='customForm'
                component="main"
                maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <InputContainer>
                                <TextField
                                    fullWidth
                                    name="email"
                                    id="email"
                                    label="Email Address"
                                />
                            </InputContainer>
                            <InputContainer>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </InputContainer>
                            <Grid item>
                                {thereError && <Typography style={{ color: "red" }}>
                                    There Are Issue in Email Or password, Try Again With More verify
                                </Typography>}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Typography style={{ textDecoration: "underline" }}>
                                you dont`t have an account? Sign up
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}


const containerStyle = {
    display: "flex",
    alignItems: "center",
    // backgroundImage: "",
    width: "100%",
    minHeight: "100vh",
    color: "white",
}