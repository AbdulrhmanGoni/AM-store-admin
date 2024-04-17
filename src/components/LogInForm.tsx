import { Button, TextField, Grid, Box } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import useLogInLogic from '../hooks/useLogInLogic';
import { FormsPagesContainer, useGoogleAuth } from '@abdulrhmangoni/am-store-library';

export default function LogInForm() {

    const { AuthButton } = useGoogleAuth({ clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID })

    const {
        logInFailed,
        handleSubmit,
        logInWithGoogle
    } = useLogInLogic();

    return (
        <FormsPagesContainer
            title='Log In'
            icon={<LockOutlined />}
        >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="email"
                            id="email"
                            type='email'
                            label="Email Address"
                            error={logInFailed.isError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={logInFailed.isError}
                            helperText={logInFailed.message}
                            sx={{ "& .MuiFormHelperText-root": { fontSize: "0.85rem" } }}
                        />
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
        </FormsPagesContainer>
    );
}
