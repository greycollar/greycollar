import "@mui/material/styles";
import "@mui/material/Paper";
import "@mui/material/Card";
import "@mui/material/IconButton";
import "@mui/material/Fab";
import "@mui/material/Stack";

declare module "@mui/material/styles" {
  interface TypeBackground {
    neutral: string;
  }
  interface Theme {
    customShadows: {
      card: string;
    };
    neutral: {
      stack: string;
      card: string;
      paper: string;
    };
  }

  interface ThemeOptions {
    customShadows?: {
      card?: string;
    };
  }
}

declare module "@mui/material/Card" {
  interface CardPropsVariantOverrides {
    "profile-card": true;
  }
}

declare module "@mui/material/Fab" {
  interface FabPropsVariantOverrides {
    button: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    "profile-card": true;
  }
}
