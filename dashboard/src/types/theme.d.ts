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
      // add other custom shadow properties here
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
      // add other custom shadow properties here
    };
  }
}

// Add this for your custom Card variant
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

// Since Card extends Paper, you might also need this
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    "profile-card": true;
  }
}
