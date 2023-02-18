import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box>
      <Container maxWidth="sm">
        <Typography>
          © {new Date().getFullYear()} Queen African Hair Braiding
        </Typography>
      </Container>
    </Box>
  );
}
