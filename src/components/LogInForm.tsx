import {
    Avatar, Button, CssBaseline,
    TextField, Grid, Box,
    Typography, Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useLogInLogic from '../hooks/useLogInLogic';
import { useGoogleAuth } from '@abdulrhmangoni/am-store-library';


export default function LogInForm() {
    const { AuthButton } = useGoogleAuth()
    const {
        logInFailed,
        handleSubmit,
        logInWithGoogle
    } = useLogInLogic();

    return (
        <Box sx={containerStyle}>
            <Container className='customForm' maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
                    <Typography component="h1" variant="h5">Log In</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={sxTexFieldOutline(!logInFailed.state)}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    id="email"
                                    label="Email Address"
                                />
                            </Grid>
                            <Grid item xs={12} sx={sxTexFieldOutline(!logInFailed.state)}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid item>
                                {
                                    !logInFailed.state &&
                                    <ErrorMessageTag
                                        message={logInFailed.message}
                                    />
                                }
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
                    <Grid container justifyContent="flex-end">
                        <AuthButton
                            text='Log in with Google'
                            onSuccess={logInWithGoogle}
                        />
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export function ErrorMessageTag({ message }: { message: string }) {
    return (
        <Typography sx={{ fontSize: "0.87rem", color: "red", mt: "5px" }}>{message}</Typography>
    )
}

const sxTexFieldOutline = (condition: boolean) => {
    return {
        "& fieldset": {
            borderColor: condition ? "red !important" : "white"
        }
    }
}

const containerStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    color: "white",
}