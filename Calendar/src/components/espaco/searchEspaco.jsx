import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WindowIcon from '@mui/icons-material/Window';
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Alert,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme();

function SearchEspaco() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/espaco");
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setUsers([]);
        setError("Erro ao carregar espaços");
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/espacosearch/${searchTerm}`
      );
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setUsers([]);
      setError("Nenhum espaço encontrado");
    }
  };

  const handleVoltar = () => {
    navigate("/"); // Navegar de volta para a página
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <WindowIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Pesquisar Espaço
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%", maxWidth: 600, margin: "0 auto" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="searchTerm"
              label="Pesquisar Espaço"
              name="searchTerm"
              autoComplete="off"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Digite o nome do espaço"
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 150 }} // Botão de busca menor
              >
                Buscar
              </Button>
            </Box>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          {users.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 3, width: "100%", maxWidth: 800, border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Espaço Cultural</TableCell>
                    <TableCell>Ativo</TableCell>
                    <TableCell>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.IdEspaco}>
                      <TableCell>{user.IdEspaco}</TableCell>
                      <TableCell>{user.Nome}</TableCell>
                      <TableCell>{user.NomeEspacoCultural}</TableCell>
                      <TableCell>
                        <Checkbox checked={user.Ativo} readOnly />
                      </TableCell>
                      <TableCell>
                        <Button
                          component={Link}
                          to={`/atualizarespaco/${user.IdEspaco}`}
                          variant="contained"
                          color="warning"
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ width: 150 }} // Botão de voltar menor
              onClick={handleVoltar}
            >
              Voltar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SearchEspaco;