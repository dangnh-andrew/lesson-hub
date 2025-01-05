import React, { useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import chapterApi from "@/api/chapterApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IChapterTableProps {
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const ChapterTable: React.FunctionComponent<IChapterTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [chapterId, setChapterId] = useState<any>();

  const buttonStyles = {
    edit: {
      marginRight: "8px",
      padding: "4px 8px",
      backgroundColor: "#4caf50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    delete: {
      padding: "4px 8px",
      backgroundColor: "#f44336",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  const columns = React.useMemo(
    () => [
      { accessorKey: "title", header: "Title" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }: any) => (
          <div>
            <button
              style={buttonStyles.edit}
              onClick={() => handleEditChapter(row.original.id)}
            >
              Edit
            </button>
            <button
              style={buttonStyles.delete}
              onClick={() => {
                setShowModal(true);
                setChapterId(row.original.id);
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEditChapter = async (chapterId: number) => {
    const response = await chapterApi.getChapter(chapterId);
    if (response.ok && response.body) {
      reset(response.body);
      setShowModalEdit(true);
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
    setShowModalEdit(false);
  };

  const onSubmit = async (data: any) => {
    if (data.id) {
      const body = {
        title: data.title,
        description: data.description,
      };
      const response = await chapterApi.updateChapter(data.id, body);
      if (response.ok) {
        navigate(0);
      }
      setShowModalEdit(false);
    }
  };

  const handleDelete = async () => {
    const response = await chapterApi.deleteChapter(chapterId);
    if (response.ok) {
      navigate(0);
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container modal-delete">
            <button onClick={handleCancelModal} className="close-btn">
              X
            </button>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this chapter?</p>
            <div className="modal-buttons">
              <button
                onClick={handleCancelModal}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-outline-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalEdit && (
        <div className="modal-overlay">
          <div className="modal-container modal-edit">
            <button onClick={handleCancelModal} className="close-btn">
              X
            </button>
            <h2>Edit Chapter</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="form-control"
                />
                <label>Description</label>
                <input
                  type="text"
                  {...register("description", { required: true })}
                  className="form-control"
                />
              </div>
              <div className="modal-buttons">
                <button
                  onClick={handleCancelModal}
                  className="btn btn-outline-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-outline-danger">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="chapter-table-wrapper">
        {data && (
          <table
            border={1}
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ padding: "8px", textAlign: "left" }}
                    >
                      {header.isPlaceholder
                        ? null
                        : typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ padding: "8px" }}>
                      {typeof cell.column.columnDef.cell === "function"
                        ? cell.column.columnDef.cell(cell.getContext())
                        : String(cell.getValue())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ChapterTable;
