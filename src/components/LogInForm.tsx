import { Avatar, Button, CssBaseline, TextField, Grid, Box, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useLogInLogic from '../hooks/useLogInLogic';
import { P, useGoogleAuth } from '@abdulrhmangoni/am-store-library';


export default function LogInForm() {

    const { AuthButton } = useGoogleAuth({ clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID })

    const {
        logInFailed,
        handleSubmit,
        logInWithGoogle
    } = useLogInLogic();

    return (
        <Box sx={containerStyle}>
            <Container className='customForm' maxWidth="xs">
                <CssBaseline />
                <Box className="flex-column-center">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
                    <P component="h1" variant="h5">Log In</P>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={sxTexFieldOutline(!logInFailed.state)}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    id="email"
                                    type='email'
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
        <P sx={{ fontSize: "0.87rem", color: "red", mt: "5px" }}>{message}</P>
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
    backgroundImage: "url(/images/looking-to-galaxy.png)",
    backgroundSize: "cover",
    backgroundPosition: "center"
}