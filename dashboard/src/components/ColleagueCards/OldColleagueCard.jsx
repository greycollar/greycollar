import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  CustomPopover,
  Iconify,
  usePopover,
} from "@nucleoidai/platform/minimal/components";

// ----------------------------------------------------------------------
// TODO ADD OPTIONS PROPS
export default function ItemCard({
  item,
  onView,
  onEdit,
  onDelete,
  onIconClick,
  icon,
  onAssign,
  dataCy,
  moreVertCY,
  opt1CY,
  opt2CY,
  opt3CY,
  opt4CY,
}) {
  const popover = usePopover();

  const { name, createdAt, personality, avatar } = item;
  return (
    <>
      <Card data-cy={dataCy}>
        <IconButton
          data-cy={moreVertCY}
          onClick={popover.onOpen}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>
          <Avatar
            alt={name}
            src={`https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_${avatar.replace(
              /:/g,
              ""
            )}.jpg`}
            variant="rounded"
            sx={{ width: 48, height: 48, mb: 2 }}
          />

          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Typography variant="h4" color="inherit">
                {name}
              </Typography>
            }
            secondary={`Created date: ${createdAt}`}
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
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ paddingY: "0.5rem" }}
            >
              <Iconify icon={"ph:note-pencil-duotone"} width={24} />
              <Typography variant="subtitle1">Personality</Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ width: "300px", textJustify: "start" }}
                color={"inherit"}
                variant={"body2"}
              >
                {personality}
              </Typography>
              <Iconify
                onClick={() => {
                  onIconClick();
                }}
                sx={{
                  marginX: 2,
                  display: "flex",
                  justifySelf: "end",
                  alignSelf: "start",
                }}
                icon={icon}
                width={36}
                height={36}
              />
            </Stack>
          </Stack>
        </Stack>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          data-cy={opt1CY}
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          data-cy={opt2CY}
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        {onAssign && (
          <MenuItem
            data-cy={opt3CY}
            onClick={() => {
              popover.onClose();
              onAssign();
            }}
          >
            <Iconify icon="mingcute:transfer-fill" />
            Reassign
          </MenuItem>
        )}

        <MenuItem
          data-cy={opt4CY}
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
