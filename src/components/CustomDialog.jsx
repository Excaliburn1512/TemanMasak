import React from "react";
import "../styles/custom_dialog.css";

const CustomDialog = ({
    show = false,
    type = "success",
    title = "",
    message = "",
    confirmText = "Oke",
    onClose = () => {},
    autoClose = false,
}) => {
    if (!show) return null;

    const isSuccess = type === "success";
    const isError = type === "error";
    const isWarning = type === "warning";

    return (
        <div className="custom-dialog-overlay">
            <div
                className={`custom-dialog-box ${
                    isSuccess
                        ? "dialog-success"
                        : isError
                        ? "dialog-error"
                        : isWarning
                        ? "dialog-warning"
                        : "dialog-info"
                }`}
            >
                <div className="custom-dialog-icon">
                    {isSuccess && (
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    )}

                    {isError && (
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    )}

                    {isWarning && (
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    )}

                    {!isSuccess && !isError && !isWarning && (
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                    )}
                </div>

                <h3>{title}</h3>
                <p>{message}</p>

                {!autoClose && (
                    <button className="custom-dialog-button" onClick={onClose}>
                        {confirmText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CustomDialog;