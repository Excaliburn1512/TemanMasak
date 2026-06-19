import React from 'react';
import '../styles/confirm_dialog.css';

const ConfirmDialog = ({
  open,
  type = 'danger',
  title = 'Konfirmasi',
  message = 'Apakah kamu yakin?',
  cancelText = 'Batal',
  confirmText = 'Konfirmasi',
  loadingText = 'Memproses...',
  isLoading = false,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;

  const isDanger = type === 'danger';

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(event) => event.stopPropagation()}>
        <div className={`confirm-icon ${isDanger ? 'confirm-icon--danger' : ''}`}>
          {isDanger ? (
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          ) : (
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </div>

        <h2 className="confirm-title">{title}</h2>

        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button
            type="button"
            className="confirm-btn confirm-btn--cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`confirm-btn ${
              isDanger ? 'confirm-btn--danger' : 'confirm-btn--primary'
            }`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? loadingText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;