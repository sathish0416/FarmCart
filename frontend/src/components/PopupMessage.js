import "./PopupMessage.css"; // Import CSS for styling

function PopupMessage({ message, onClose }) {
    if (!message) return null; // Hide if no message

    return (
        <div className="popup-box">
            <p>{message}</p>
            <button onClick={onClose}>OK</button>
        </div>
    );
}

export default PopupMessage;
