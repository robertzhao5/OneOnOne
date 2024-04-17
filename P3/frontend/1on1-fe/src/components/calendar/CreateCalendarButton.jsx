import React, {useState} from "react";
import CreateCalendarModal from "./CreateCalendarModal";  // Assuming you also extract modal into its own component

const CreateCalendarButton = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <button className="btn btn-primary mb-3"
                    onClick={handleOpenModal}>Create New Calendar
            </button>
            {showModal && (
                <CreateCalendarModal
                    show={showModal}
                    handleClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default CreateCalendarButton;
