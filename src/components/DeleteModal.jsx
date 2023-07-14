import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function DeleteModal({
  type,
  name,
  id,
  handleDelete,
  disabled,
}) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "darkred";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <span>
      <button onClick={openModal} disabled={disabled}>
        Supprimer
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Souhaitez vous supprimer {type == "utilisateur" ? "cet" : "cette"}{" "}
          {type}: {name} ?
        </h2>
        <div style={{ textAlign: "right" }}>
          <button
            style={{ padding: "5px 10px", margin: "5px" }}
            onClick={() => {
              handleDelete(id);
              closeModal();
            }}
          >
            Oui
          </button>
          <button
            onClick={closeModal}
            style={{ padding: "5px 10px", margin: "5px" }}
          >
            Non
          </button>
        </div>
      </Modal>
    </span>
  );
}
