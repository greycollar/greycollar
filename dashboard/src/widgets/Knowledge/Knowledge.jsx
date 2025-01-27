import AddIcon from "@mui/icons-material/Add";
import AddItemDialog from "../../components/AddItemDialog/AddItemDialog";
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation";
import EditDialog from "../../components/EditDialog/EditDialog";
import KnowledgeTable from "../../components/KnowledgeTable/KnowledgeTable";
import TypeToolbar from "../../components/TypeToolbar/TypeToolbar";
import useKnowledges from "../../hooks/useKnowledges";
import { useTable } from "@nucleoidai/platform/minimal/components";

import { Container, Fab, Stack } from "@mui/material";
import { useEffect, useState } from "react";

function Knowledge({ colleagueId }) {
  const { knowledges, deleteKnowledges, updateKnowledges, createKnowledge } =
    useKnowledges();

  const table = useTable();

  const ALL_KNOWLEDGE_TYPES = ["ALL", "URL", "TEXT", "QA"].sort((a, b) => {
    if (a === "ALL") return -1;
    if (b === "ALL") return 1;
    if (a === "URL") return -1;
    if (b === "URL") return 1;
    return 0;
  });

  const ADD_ITEM_TYPES = ALL_KNOWLEDGE_TYPES.filter((type) => type !== "ALL");

  const [selectedType, setSelectedType] = useState(ALL_KNOWLEDGE_TYPES[0]);

  const [open, setOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const filteredKnowledges =
    selectedType === "ALL"
      ? knowledges
      : knowledges.filter(
          (knowledge) => knowledge && knowledge.type === selectedType
        );

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleEdit = (item) => {
    if (item) {
      setSelectedItem(item);
      setOpenEdit(true);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setOpenDeleteDialog(true);
  };

  const handleAddItem = (item) => {
    createKnowledge(item, colleagueId);
  };

  const handleDelete = async (item) => {
    if (item) {
      const deleteResponse = await deleteKnowledges(item);
      if (deleteResponse) {
        knowledges.filter((knowledge) => knowledge.id !== item.id);
      }
    }
  };

  const handleSave = async (updatedItem) => {
    if (updatedItem) {
      if (updatedItem.type === "TEXT") {
        updatedItem = {
          ...updatedItem,
          question: undefined,
          answer: undefined,
          url: undefined,
        };
      } else if (updatedItem.type === "QA") {
        updatedItem = {
          ...updatedItem,
          text: undefined,
          url: undefined,
        };
      }

      const updateResponse = await updateKnowledges(updatedItem);
      if (updateResponse) {
        knowledges.map((knowledge) =>
          knowledge.id === updatedItem.id ? updatedItem : knowledge
        );

        setOpenEdit(false);
      }
    }
  };

  useEffect(() => {
    if (
      !ALL_KNOWLEDGE_TYPES.includes(selectedType) &&
      ALL_KNOWLEDGE_TYPES.length > 0
    ) {
      setSelectedType(ALL_KNOWLEDGE_TYPES[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  return (
    <>
      <Container>
        <TypeToolbar
          types={ALL_KNOWLEDGE_TYPES}
          selectedType={selectedType}
          handleChange={handleChange}
        />

        {filteredKnowledges.length > 0 ? (
          <KnowledgeTable
            table={table}
            selectedType={selectedType}
            knowledges={filteredKnowledges}
            handleEdit={handleEdit}
            handleDeleteClick={handleDeleteClick}
          />
        ) : (
          <Stack sx={{ textAlign: "center", my: 4, color: "text.secondary" }}>
            No data available for {selectedType} type
          </Stack>
        )}

        <Stack sx={{ display: "flex", alignItems: "flex-end" }}>
          <Fab
            variant="button"
            color="default"
            size="small"
            sx={{ mt: 2 }}
            data-cy="add-knowledge-button"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddIcon />
          </Fab>
        </Stack>

        <EditDialog
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectedType={selectedType}
          handleSave={handleSave}
        />

        <DeleteConfirmation
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          handleDelete={handleDelete}
          selectedItem={selectedItem}
        />

        <AddItemDialog
          types={ADD_ITEM_TYPES}
          selectedType={selectedType === "ALL" ? "URL" : selectedType}
          setSelectedType={setSelectedType}
          open={open}
          setOpen={setOpen}
          addItem={handleAddItem}
        />
      </Container>
    </>
  );
}
export default Knowledge;
