import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FestivalIcon from '@mui/icons-material/Festival';
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { format } from "date-fns"; // Importando a função de formatação de datas

const theme = createTheme();

function SearchEspaco() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/evento");
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setUsers([]);
        setError("Erro ao carregar eventos");
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
        `http://localhost:3000/eventosearch/${searchTerm}`
      );
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setUsers([]);
      setError("Nenhum evento encontrado!");
    }
  };

  const handleVoltar = () => {
    navigate("/"); // Navegar de volta para a página inicial
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
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <FestivalIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Pesquisar Evento
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "30%", margin: "0 auto" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="searchTerm"
              label="Pesquisar Evento"
              name="searchTerm"
              autoComplete="off"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Digite o nome do evento"
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
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          {users.length > 0 && (
            <TableContainer 
              component={Box} 
              sx={{ 
                mt: 3, 
                width: "100%", 
                border: "1px solid #ccc", 
                borderRadius: "8px", 
                padding: "16px" 
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Horário Inicial</TableCell>
                    <TableCell align="center">Horário Final</TableCell>
                    <TableCell align="center">Valor</TableCell>
                    <TableCell align="center">Público</TableCell>
                    <TableCell align="center">Público Total</TableCell>
                    <TableCell align="center">Usuário</TableCell>
                    <TableCell align="center">Espaço</TableCell>
                    <TableCell align="center">Categoria</TableCell>
                    <TableCell align="center">Liberado</TableCell>
                    <TableCell align="center">Ativo</TableCell>
                    <TableCell align="center">Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.IdEvento}>
                      <TableCell>{user.IdEvento}</TableCell>
                      <TableCell>{user.Nome}</TableCell>
                      <TableCell>{format(new Date(user.HorarioInicial), 'dd/MM/yyyy HH:mm')}</TableCell>
                      <TableCell>{format(new Date(user.HorarioFinal), 'dd/MM/yyyy HH:mm')}</TableCell>
                      <TableCell>{user.Valor}</TableCell>
                      <TableCell>{user.Publico}</TableCell>
                      <TableCell>{user.PublicoTotal}</TableCell>
                      <TableCell>{user.NomeUsuario}</TableCell>
                      <TableCell>{user.NomeEspaco}</TableCell>
                      <TableCell>{user.NomeCategoria}</TableCell>
                      <TableCell>{user.NomeUsuarioLiberacao}</TableCell>
                      <TableCell>
                        <Checkbox checked={user.Ativo} readOnly />
                      </TableCell>
                      <TableCell>
                      <Button
                            component={Link}
                            to={`/atualizarevento/${user.IdEvento}`}
                            variant="contained"
                            color="warning"
                            sx={{ marginRight: 1 }}
                          >
                            Editar
                          </Button>
                          <Button
                            component={Link}
                            to={`/detailsevento/${user.IdEvento}`}
                            variant="contained"
                            color="warning"
                          >
                            Detalhes
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

export default SearchEspaco;
