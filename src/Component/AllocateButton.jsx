import React, { useEffect, useState } from 'react';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

const AllocateButton = ({
    actionButton,
    onActionButtonClick
})=>{
    console.log("Hello", actionButton)

    const navigate = useNavigate();

    // Color theme
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleActionButtonClick = () => {
        if (onActionButtonClick) {
          onActionButtonClick();
        }
    };

    return(
        <div>
            {actionButton && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'right',
                    margin: '0px 20px 20px 20px',
                  }}
                >
                  <button
                    onClick={handleActionButtonClick}
                    style={{
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        backgroundColor: 'transparent',
                        color: colors.green["greenshade"],
                        border: `1px solid ${colors.green["greenshade"]}`,
                        borderRadius: '5px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                    }}
                  >
                    Allocate
                  </button>
                </div>
              )}

        </div>
    );
};

export default AllocateButton;