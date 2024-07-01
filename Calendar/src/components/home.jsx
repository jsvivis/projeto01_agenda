import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Paper,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Gerenciador
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Eventos
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarevento"
                    variant="contained"
                    color="primary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarevento"
                    variant="contained"
                    color="primary"
                  >
                    Pesquisar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/gerenciarevento"
                    variant="contained"
                    color="primary"
                  >
                    Gerenciar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Usuário
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarusuario"
                    variant="contained"
                    color="primary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarusuario"
                    variant="contained"
                    color="primary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Espaço Cultural
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarespacocultural"
                    variant="contained"
                    color="primary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarespacocultural"
                    variant="contained"
                    color="primary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Espaço
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarespaco"
                    variant="contained"
                    color="primary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarespaco"
                    variant="contained"
                    color="primary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Categoria
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarcategoria"
                    variant="contained"
                    color="primary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarcategoria"
                    variant="contained"
                    color="primary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={10} md={8}>
              <Paper elevation={6} sx={{ padding: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Reação
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    component={RouterLink}
                    to="/criarreacao"
                    variant="contained"
                    color="primary"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/buscarreacao"
                    variant="contained"
                    color="primary"
                  >
                    Pesquisar
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
