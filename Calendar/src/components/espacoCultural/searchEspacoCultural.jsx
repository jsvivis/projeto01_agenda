import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';

// FRAMEWORKS - MATERIAL UI
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Alert,
  Checkbox,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function SearchEspacoCultural() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/espacocultural");
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setUsers([]);
        setError("Erro ao carregar espaços culturais");
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
      const response = await axios.get(`http://localhost:3000/espacoculturalsearch/${searchTerm}`);
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setUsers([]);
      setError("Nenhum espaço cultural encontrado");
    }
  };

  const handleVoltar = () => {
    navigate("/"); // Navegar de volta para a página
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
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
              <MuseumOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Pesquisar Espaço Cultural
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "30%", margin: "0 auto" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="searchTerm"
              label="Pesquisar Espaço Cultural"
              name="searchTerm"
              autoComplete="off"
              autoFocus
              value={searchTerm}
              onChange={handleChange}
              placeholder="Digite o nome ou email do espaço cultural"
            />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ width: 150 }}
            >

              Buscar
            </Button>
          </Box>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2, width: "100%" }}>{error}</Alert>}
          {users.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 3, width: "100%", border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Cep</TableCell>
                    <TableCell>Endereço</TableCell>
                    <TableCell>Número</TableCell>
                    <TableCell>Complemento</TableCell>
                    <TableCell>Cidade</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Ativo</TableCell>
                    <TableCell>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.IdEspacoCultural}>
                      <TableCell>{user.IdEspacoCultural}</TableCell>
                      <TableCell>{user.Nome}</TableCell>
                      <TableCell>{user.Cep}</TableCell>
                      <TableCell>{user.Endereco}</TableCell>
                      <TableCell>{user.Numero}</TableCell>
                      <TableCell>{user.Complemento}</TableCell>
                      <TableCell>{user.Cidade}</TableCell>
                      <TableCell>{user.Estado}</TableCell>
                      <TableCell>{user.Telefone}</TableCell>
                      <TableCell>{user.Email}</TableCell>
                      <TableCell>
                      <Checkbox
                            checked={user.Ativo}
                            readOnly
                          />
                      </TableCell>
                      <TableCell>
                        <Button
                          component={Link}
                          to={`/atualizarespacocultural/${user.IdEspacoCultural}`}
                          variant="contained" color="warning"
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
              sx={{ width: 150 }}
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

export default SearchEspacoCultural;
