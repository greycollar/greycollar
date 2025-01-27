import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Iconify from "../../src/components/iconify";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { fDate } from "../../src/utils/format-time";

import CustomPopover, { usePopover } from "../../src/components/custom-popover";

// ----------------------------------------------------------------------

export default function ItemCard({
  item,
  subItemName,
  subItem,
  onView,
  onEdit,
  onDelete,
  onGroupClick,
  base,
  subItemOpen,
  handleSubItemClose,
  onSubItemClick,
}) {
  const popover = usePopover();

  return (
    <>
      <Card sx={{}}>
        <IconButton
          onClick={popover.onOpen}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>
          <Avatar
            src={`${base}/media/ProjectIcons/${item.icon?.replace(
              /:/g,
              ""
            )}.png`}
            variant="square"
            sx={{ width: 48, height: 48, mb: 2 }}
          />
          <ListItemText
            sx={{ mb: 0 }}
            primary={
              <Typography variant="h4" color="inherit">
                {item.name}
              </Typography>
            }
            secondary={`Created date: ${fDate(item.createdAt)}`}
            primaryTypographyProps={{
              typography: "subtitle1",
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: "span",
              typography: "caption",
              color: "text.disabled",
            }}
          />
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack direction="column" sx={{ typography: "body2" }}>
            <Stack direction="row" alignItems="center" spacing={2}></Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                sx={{
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <AvatarGroup
                  max={3}
                  onClick={() => {
                    onGroupClick();
                  }}
                  variant="rounded"
                >
                  {subItem &&
                    subItem.map((subItem) => (
                      <Avatar
                        key={subItem.id}
                        alt={subItem.name}
                        src={subItem.name}
                        variant="rounded"
                        sx={{ width: 48, height: 48, mb: 2 }}
                      />
                    ))}
                </AvatarGroup>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  align="center"
                >
                  {subItem ? subItem.length : 0} {subItemName}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <Dialog
        onClose={() => {
          handleSubItemClose();
        }}
        open={subItemOpen}
      >
        <DialogTitle>{item.name}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: 2,
            }}
          >
            {subItem &&
              subItem.map((subItem) => (
                <Box
                  key={subItem.id}
                  component="div"
                  onClick={() => onSubItemClick(subItem.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{ width: 48, height: 48, marginRight: "1rem" }}
                  >
                    <Typography color="inherit">
                      {subItem.name ? subItem.name[0].toUpperCase() : ""}
                    </Typography>
                  </Avatar>
                  <Typography variant="body1">{subItem.name}</Typography>
                </Box>
              ))}
          </Box>
        </DialogContent>
      </Dialog>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
